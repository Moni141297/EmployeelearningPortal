// Admin-only read models. Everything here is computed from the live database
// (Lms_* tables) and the live socket connections at request time — no cached,
// sample or hard-coded figures.
const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler, auditLog, deviceFromUa } = require('../utils');
const { getOnlineSessions, emitToUser } = require('../socket');
const embeddings = require('../lib/embeddingsCache');

const router = express.Router();
const startedAt = Date.now();

async function onlineSessions(pool) {
  const raw = getOnlineSessions();
  if (!raw.length) return [];
  const ids = [...new Set(raw.map((s) => Number(s.userId)).filter((n) => Number.isInteger(n)))];
  const users = ids.length
    ? (await pool.request().query(`SELECT UserId, Name, Role, Department, EmployeeId FROM dbo.Lms_Users WHERE UserId IN (${ids.join(',')})`)).recordset
    : [];
  const byId = Object.fromEntries(users.map((u) => [String(u.UserId), u]));
  return raw
    .filter((s) => byId[s.userId])
    .map((s) => ({
      userId: s.userId, name: byId[s.userId].Name, emp: byId[s.userId].EmployeeId,
      role: String(byId[s.userId].Role || '').toLowerCase(), dept: byId[s.userId].Department || '',
      since: new Date(s.since).toISOString(), ip: s.ip, device: deviceFromUa(s.ua),
    }))
    .sort((a, b) => a.since.localeCompare(b.since));
}

router.get('/sessions', asyncHandler(async (req, res) => {
  res.json(await onlineSessions(await getPool()));
}));

router.post('/sessions/:userId/terminate', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const { userId } = req.params;
  emitToUser(userId, 'session:terminate', { by: req.body.actorId || null });
  await auditLog(pool, sql, { action: 'Session terminated', entity: 'User ' + userId, userId: req.body.actorId });
  res.json({ ok: true });
}));

// tzOffset = the viewer's Date.getTimezoneOffset() (minutes), so "today", weekdays
// and hour buckets follow the admin's own clock rather than the server's.
router.get('/overview', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const tz = Number.isFinite(Number(req.query.tzOffset)) ? Number(req.query.tzOffset) : 0;
  const local = (d) => new Date(new Date(d).getTime() - tz * 60000);
  const dayKey = (d) => local(d).toISOString().slice(0, 10);
  const now = Date.now();
  const todayKey = dayKey(now);
  const monthStartUtc = new Date(Date.UTC(local(now).getUTCFullYear(), local(now).getUTCMonth(), 1) + tz * 60000);

  const t0 = process.hrtime.bigint();
  await pool.request().query('SELECT 1 AS ok');
  const dbMs = Number(process.hrtime.bigint() - t0) / 1e6;

  const q = (text, inputs = {}) => {
    const r = pool.request();
    for (const [k, v] of Object.entries(inputs)) r.input(k, sql.DateTime2, v);
    return r.query(text);
  };
  const since14 = new Date(now - 15 * 86400000);
  const since24h = new Date(now - 86400000);

  const [users, auth, learn, attempts, exams, ai, expert, certs, modules, otp, recent, hourRows] = await Promise.all([
    q(`SELECT Role, Status, COUNT(*) n FROM dbo.Lms_Users GROUP BY Role, Status`),
    q(`SELECT UserId, Action, Timestamp FROM dbo.Lms_AuditLogs WHERE Entity = 'User' AND Action IN ('Login','Logout') AND Timestamp >= @s ORDER BY Timestamp`, { s: since14 }),
    q(`SELECT COUNT(*) total, SUM(CASE WHEN StartedAt >= @m THEN 1 ELSE 0 END) month FROM dbo.Lms_LearningProgress`, { m: monthStartUtc }),
    q(`SELECT COUNT(*) total, SUM(CASE WHEN StartTime >= @m THEN 1 ELSE 0 END) month FROM dbo.Lms_AssessmentAttempts`, { m: monthStartUtc }),
    q(`SELECT COUNT(*) participants, COUNT(DISTINCT EventId) events, SUM(CASE WHEN JoinTime >= @m THEN 1 ELSE 0 END) month FROM dbo.Lms_ExaminationParticipants WHERE JoinTime IS NOT NULL`, { m: monthStartUtc }),
    q(`SELECT COUNT(*) total, SUM(CASE WHEN Timestamp >= @m THEN 1 ELSE 0 END) month FROM dbo.Lms_AuditLogs WHERE Action = 'AI question asked'`, { m: monthStartUtc }),
    q(`SELECT COUNT(*) total, SUM(CASE WHEN CreatedAt >= @m THEN 1 ELSE 0 END) month FROM dbo.Lms_ExpertQuestions`, { m: monthStartUtc }),
    q(`SELECT COUNT(*) total, SUM(CASE WHEN IssueDate >= @m THEN 1 ELSE 0 END) month FROM dbo.Lms_Certificates`, { m: monthStartUtc }),
    q(`SELECT c.SubCategoryId topicId, COUNT(DISTINCT p.UserId) learners FROM dbo.Lms_LearningProgress p JOIN dbo.Lms_LearningContents c ON c.ContentId = p.ContentId GROUP BY c.SubCategoryId`),
    q(`SELECT COUNT(*) issued, ISNULL(SUM(Attempts),0) failed FROM dbo.Lms_OtpRequests WHERE CreatedAt >= @s`, { s: since24h }),
    q(`SELECT TOP 6 a.LogId, a.Action, a.Entity, a.UserId, a.Timestamp, u.Name FROM dbo.Lms_AuditLogs a LEFT JOIN dbo.Lms_Users u ON u.UserId = a.UserId ORDER BY a.Timestamp DESC, a.LogId DESC`),
    q(`SELECT Timestamp FROM dbo.Lms_AuditLogs WHERE Timestamp >= @s`, { s: new Date(now - 36 * 3600000) }),
  ]);

  // ---- users ----
  const byRole = { admin: 0, trainer: 0, participant: 0 };
  let total = 0, active = 0, inactive = 0;
  for (const r of users.recordset) {
    const role = String(r.Role || '').toLowerCase();
    byRole[role] = (byRole[role] || 0) + r.n;
    total += r.n;
    if (r.Status === 'Active') active += r.n; else inactive += r.n;
  }

  // ---- logins / sessions from the audit trail (verified logins only: Entity 'User') ----
  const sessions = await onlineSessions(pool);
  const onlineIds = new Set(sessions.map((s) => s.userId));
  const events = auth.recordset.map((r) => ({ u: String(r.UserId), a: r.Action, t: new Date(r.Timestamp).getTime() }));
  const days = [];
  for (let i = 13; i >= 0; i--) days.push(dayKey(now - i * 86400000));
  const dayLogins = Object.fromEntries(days.map((d) => [d, 0]));
  const dayUsers = Object.fromEntries(days.map((d) => [d, new Set()]));
  for (const e of events) {
    if (e.a !== 'Login') continue;
    const k = dayKey(e.t);
    if (k in dayLogins) { dayLogins[k]++; dayUsers[k].add(e.u); }
  }
  // Pair every login with the user's next event: a logout closes it; a later login
  // implies the earlier one ended; the final login of a user still online runs to now.
  const intervals = [];
  const byUser = {};
  for (const e of events) (byUser[e.u] = byUser[e.u] || []).push(e);
  for (const [u, list] of Object.entries(byUser)) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].a !== 'Login') continue;
      const next = list[i + 1];
      let end = null, closed = false;
      if (next) { end = next.t; closed = next.a === 'Logout'; }
      else if (onlineIds.has(u)) end = now;
      if (end !== null) intervals.push({ start: list[i].t, end, closed });
    }
  }
  const todayIv = intervals.filter((iv) => dayKey(iv.start) === todayKey);
  const closedToday = todayIv.filter((iv) => iv.closed);
  const avgSessionMin = closedToday.length ? Math.round(closedToday.reduce((s, iv) => s + (iv.end - iv.start), 0) / closedToday.length / 60000) : null;
  let peak = 0, peakAt = null, cur = 0;
  const points = [];
  for (const iv of todayIv) points.push([iv.start, 1], [iv.end, -1]);
  points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  for (const [t, d] of points) { cur += d; if (cur > peak) { peak = cur; peakAt = new Date(t).toISOString(); } }
  const yesterdayKey = dayKey(now - 86400000);

  // ---- today's activity by hour ----
  const hours = Array.from({ length: 24 }, (_, h) => ({ hour: h, count: 0 }));
  for (const r of hourRows.recordset) {
    const l = local(r.Timestamp);
    if (l.toISOString().slice(0, 10) === todayKey) hours[l.getUTCHours()].count++;
  }

  const row = (r) => ({ total: r.recordset[0].total || 0, month: r.recordset[0].month || 0 });
  res.json({
    generatedAt: new Date(now).toISOString(),
    users: { total, active, inactive, byRole },
    online: sessions.length,
    daily: days.map((d) => ({ date: d, logins: dayLogins[d], users: dayUsers[d].size })),
    today: {
      logins: dayLogins[todayKey] || 0, activeUsers: (dayUsers[todayKey] || new Set()).size,
      loginsYesterday: dayLogins[yesterdayKey] || 0, avgSessionMin, peakConcurrent: peak || null, peakAt,
    },
    byHour: hours,
    usage: {
      learning: row(learn), attempts: row(attempts), ai: row(ai), expert: row(expert), certificates: row(certs),
      exams: { participants: exams.recordset[0].participants || 0, events: exams.recordset[0].events || 0, month: exams.recordset[0].month || 0 },
    },
    moduleUsage: modules.recordset.map((r) => ({ topicId: String(r.topicId), learners: r.learners })).sort((a, b) => b.learners - a.learners),
    health: {
      dbMs: Math.round(dbMs), uptimeSec: Math.round((now - startedAt) / 1000), liveConnections: getOnlineSessions().length,
      kbChunks: embeddings.isLoaded() ? embeddings.getAll().length : 0, kbLoaded: embeddings.isLoaded(),
      otpIssued24h: otp.recordset[0].issued, failedOtp24h: otp.recordset[0].failed,
    },
    recent: recent.recordset.map((r) => ({ id: String(r.LogId), action: r.Action, entity: r.Entity || '', userId: r.UserId ? String(r.UserId) : '', userName: r.Name || '', ts: new Date(r.Timestamp).toISOString() })),
  });
}));

module.exports = router;
