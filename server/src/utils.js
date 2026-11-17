function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

// JSON columns come back as strings (or null) from MSSQL — parse defensively.
function parseJson(v, fallback) {
  if (v === null || v === undefined) return fallback;
  try { return JSON.parse(v); } catch { return fallback; }
}

function toInt(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number.parseInt(v, 10);
  return Number.isNaN(n) ? null : n;
}

function fmtDate(v) {
  if (!v) return '';
  return new Date(v).toISOString().slice(0, 10);
}
function fmtDateTime(v) {
  if (!v) return '';
  return new Date(v).toISOString().slice(0, 16).replace('T', ' ');
}

// Frontend Role is lowercase ('admin' | 'trainer' | 'participant'); DB stores it Capitalized.
function roleToDb(r) {
  return { admin: 'Admin', trainer: 'Trainer', participant: 'Participant' }[String(r || '').toLowerCase()] || 'Participant';
}
function roleFromDb(r) {
  return String(r || '').toLowerCase();
}

// Frontend EventStatus uses 'Waiting'; the DB uses 'WaitingRoom'.
function eventStatusToDb(s) {
  return s === 'Waiting' ? 'WaitingRoom' : s;
}
function eventStatusFromDb(s) {
  return s === 'WaitingRoom' ? 'Waiting' : s;
}

const QTYPE_TO_DB = {
  single: 'MCQSingle', multi: 'MCQMultiple', tf: 'TrueFalse', yn: 'YesNo',
  fill: 'FillInBlank', image: 'ImageBased', scenario: 'ScenarioBased', match: 'MatchTheFollowing',
};
const QTYPE_FROM_DB = Object.fromEntries(Object.entries(QTYPE_TO_DB).map(([k, v]) => [v, k]));

// Per-request context (client IP + device), set by middleware in app.js, so every
// audit row records where the action really came from without each route having
// to pass the request through.
const { AsyncLocalStorage } = require('async_hooks');
const requestContext = new AsyncLocalStorage();

function clientIp(req) {
  const fwd = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const raw = fwd || (req.socket && req.socket.remoteAddress) || '';
  if (raw === '::1') return '127.0.0.1';
  return raw.replace(/^::ffff:/, '');
}

// "Chrome · Windows" style label from a User-Agent string.
function deviceFromUa(ua) {
  ua = String(ua || '');
  if (!ua) return '';
  const browser = /Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox'
    : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Browser';
  const os = /Windows/.test(ua) ? 'Windows' : /Android/.test(ua) ? 'Android' : /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) ? 'iPad'
    : /Mac OS X|Macintosh/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : '';
  return os ? browser + ' · ' + os : browser;
}

async function auditLog(pool, sql, { action, entity, userId }) {
  const ctx = requestContext.getStore();
  const meta = ctx && (ctx.ip || ctx.ua) ? JSON.stringify({ ip: ctx.ip || '', device: deviceFromUa(ctx.ua) }) : null;
  await pool.request()
    .input('userId', sql.Int, toInt(userId))
    .input('action', sql.NVarChar, action)
    .input('entity', sql.NVarChar, entity || null)
    .input('meta', sql.NVarChar, meta)
    .query(`INSERT INTO dbo.Lms_AuditLogs (UserId, Action, Entity, Metadata, Timestamp) VALUES (@userId, @action, @entity, @meta, sysutcdatetime())`);
}

async function notifyUsers(pool, sql, userIds, txt) {
  const { emitToUser } = require('./socket');
  const ids = [...new Set((userIds || []).map(toInt).filter((x) => x !== null))];
  for (const uid of ids) {
    await pool.request().input('userId', sql.Int, uid).input('txt', sql.NVarChar, txt)
      .query(`INSERT INTO dbo.Lms_Notifications (UserId, Message, IsRead, CreatedAt) VALUES (@userId, @txt, 0, sysutcdatetime())`);
    emitToUser(uid, 'notification:new', { txt, time: 'Just now' });
  }
}

// Pushes a live data event (not a notification-bell entry) to every trainer's
// own socket room, so a trainer with a list screen open (e.g. Expert
// Questions) sees a change made by a participant or another trainer without
// reloading — same idea as notifyUsers, but for screen data instead of the
// notification bell.
async function emitToTrainers(pool, sql, event, payload) {
  const { emitToUser } = require('./socket');
  const rows = (await pool.request().query(`SELECT UserId FROM dbo.Lms_Users WHERE Role='Trainer'`)).recordset;
  rows.forEach((r) => emitToUser(r.UserId, event, payload));
}

// Every SubCategory ("Topic") has one primary LearningContent: prefer the
// most recently published one, else the most recently created.
async function primaryContentFor(pool, sql, subCategoryId) {
  const r = await pool.request().input('sc', sql.Int, subCategoryId).query(`
    SELECT TOP 1 * FROM dbo.Lms_LearningContents WHERE SubCategoryId=@sc
    ORDER BY CASE WHEN Status='Published' THEN 0 ELSE 1 END, CreatedAt DESC
  `);
  return r.recordset[0] || null;
}

// Every SubCategory has one active self-assessment configuration.
async function activeAssessmentFor(pool, sql, subCategoryId) {
  const r = await pool.request().input('sc', sql.Int, subCategoryId).query(`
    SELECT TOP 1 * FROM dbo.Lms_Assessments WHERE SubCategoryId=@sc
    ORDER BY CASE WHEN Status='Active' THEN 0 ELSE 1 END, CreatedAt DESC
  `);
  return r.recordset[0] || null;
}

// Single source of truth for "a pass issues a certificate" — called from
// both the live-event completion path and the self-assessment attempt path
// (server-side), so a certificate is generated the moment a pass is recorded
// in the database rather than depending on the participant's browser staying
// open long enough to make a second, separate /api/certs call afterwards.
// Idempotent: a retry/duplicate completion for the same (user, topic, event)
// never issues a second certificate.
async function issueCertificateIfEligible(pool, sql, { userId, topicId, eventId, score, result, certEligible }) {
  if (result !== 'Pass' || !certEligible) return null;
  const crypto = require('crypto');
  const existing = (await pool.request().input('user', sql.Int, Number(userId)).input('topic', sql.Int, Number(topicId))
    .input('event', sql.Int, eventId !== null && eventId !== undefined ? Number(eventId) : null)
    .query(`SELECT CertificateNumber FROM dbo.Lms_Certificates WHERE UserId=@user AND SubCategoryId=@topic
            AND (EventId=@event OR (@event IS NULL AND EventId IS NULL))`)).recordset[0];
  if (existing) return existing.CertificateNumber;
  const certNumber = 'CERT-' + (eventId ?? 'SA') + '-' + userId + '-' + crypto.randomBytes(4).toString('hex').toUpperCase();
  await pool.request().input('num', sql.NVarChar, certNumber).input('user', sql.Int, Number(userId)).input('topic', sql.Int, Number(topicId))
    .input('event', sql.Int, eventId !== null && eventId !== undefined ? Number(eventId) : null).input('score', sql.Decimal(5, 2), score)
    .query(`INSERT INTO dbo.Lms_Certificates (CertificateNumber, UserId, SubCategoryId, EventId, Score, IssueDate, Status)
            VALUES (@num, @user, @topic, @event, @score, sysutcdatetime(), 'Issued')`);
  await auditLog(pool, sql, { action: 'Certificate generated', entity: 'Certificate ' + certNumber, userId });
  await notifyUsers(pool, sql, [userId], 'Certificate ' + certNumber + ' issued');
  return certNumber;
}

async function userNameMap(pool) {
  const r = await pool.request().query('SELECT UserId, Name FROM dbo.Lms_Users');
  const map = {};
  r.recordset.forEach((u) => { map[u.UserId] = u.Name; });
  return map;
}

module.exports = {
  asyncHandler, parseJson, toInt, fmtDate, fmtDateTime,
  roleToDb, roleFromDb, eventStatusToDb, eventStatusFromDb, QTYPE_TO_DB, QTYPE_FROM_DB,
  auditLog, requestContext, clientIp, deviceFromUa, notifyUsers, emitToTrainers, primaryContentFor, activeAssessmentFor, userNameMap,
  issueCertificateIfEligible,
};
