const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler, auditLog, notifyUsers, eventStatusToDb, issueCertificateIfEligible } = require('../utils');
const { mapEvent } = require('../mappers');
const { emitToEvent, emitAll } = require('../socket');
const { redis } = require('../redis');

const router = express.Router();

// One-shot "notify me when a retake is available" watch list per topic, kept
// in Redis rather than a new MSSQL table — it's disposable preference state,
// not a record that needs to survive a Redis flush. A participant whose live
// exam was cut short (Incomplete) can ask to be notified the next time a live
// event for that topic becomes joinable; the set is cleared once notified, so
// it only ever fires once per request.
function retakeWatchKey(topicId) {
  return `retake:watch:${topicId}`;
}
async function notifyRetakeWatchers(pool, topicId, eventName) {
  const key = retakeWatchKey(topicId);
  const userIds = await redis.smembers(key);
  if (!userIds.length) return;
  await redis.del(key);
  const topicRow = (await pool.request().input('id', sql.Int, Number(topicId)).query('SELECT Name FROM dbo.Lms_SubCategories WHERE SubCategoryId=@id')).recordset[0];
  await notifyUsers(pool, sql, userIds, `A new live examination "${eventName}" is now available for ${topicRow ? topicRow.Name : 'a topic'} you asked to be notified about.`);
}

async function participantsFor(pool, eventIds) {
  if (!eventIds.length) return {};
  const result = await pool.request().query(`SELECT * FROM dbo.Lms_ExaminationParticipants WHERE EventId IN (${eventIds.join(',')})`);
  const byEvent = {};
  result.recordset.forEach((p) => { (byEvent[p.EventId] = byEvent[p.EventId] || []).push(p); });
  return byEvent;
}

// A Scheduled event (or one whose waiting room was opened but then abandoned
// — never actually started) that nobody started within 24h of its scheduled
// time is auto-cancelled, so it stops sitting in every participant's
// "Available & upcoming" list indefinitely. Compared the same naive,
// no-timezone-conversion way every scheduled date/time is already handled
// throughout this app (see src/lib/helpers.ts's canJoinNow on the frontend —
// same convention, just mirrored server-side).
const EXPIRY_HOURS = 24;
// Mirrors the frontend's JOIN_WINDOW_MIN (src/lib/helpers.ts) and the
// 5-minute check already enforced in :id/join below — the single place that
// number means "how long before the scheduled time the room opens".
const JOIN_WINDOW_MIN = 5;
// scheduledAtOf (above) deliberately stores a trainer's typed date/time as
// literal digits re-encoded as *UTC* components — not because they're
// actually UTC, but so they round-trip through MSSQL and back unchanged no
// matter what timezone this Node process happens to run in (see its own
// comment). That means a real "is this in the past / within N minutes"
// comparison can never use raw Date.now() — that's the server's true UTC
// instant, off from the trainer's actual wall clock by this app's one fixed
// audience's offset (every trainer/participant is in India, IST = UTC+5:30,
// no DST). This expresses "right now" the same naive way, so comparisons
// against ScheduledAt are apples-to-apples instead of silently off by 5:30 —
// which, before this, meant a time that had already passed in IST could
// still compare as "in the future" here, letting a stale Schedule through,
// or opening/closing the waiting room up to 5.5 hours off from when a
// trainer watching the clock would expect it to.
const IST_OFFSET_MIN = 5 * 60 + 30;
function nowAsScheduledAtNaive() {
  return new Date(Date.now() + IST_OFFSET_MIN * 60 * 1000);
}
function isExpired(scheduledAt) {
  if (!scheduledAt) return false;
  return nowAsScheduledAtNaive().getTime() - new Date(scheduledAt).getTime() > EXPIRY_HOURS * 60 * 60 * 1000;
}
function joinWindowOpen(scheduledAt) {
  if (!scheduledAt) return false;
  return nowAsScheduledAtNaive().getTime() >= new Date(scheduledAt).getTime() - JOIN_WINDOW_MIN * 60 * 1000;
}
async function sweepExpiredEvents(pool, rows) {
  const expired = rows.filter((r) => ['Scheduled', 'WaitingRoom'].includes(r.Status) && isExpired(r.ScheduledAt));
  if (!expired.length) return;
  const ids = expired.map((r) => r.EventId);
  await pool.request().query(`UPDATE dbo.Lms_ExaminationEvents SET Status='Cancelled' WHERE EventId IN (${ids.join(',')})`);
  for (const r of expired) {
    r.Status = 'Cancelled'; // patch in place so the caller's already-fetched rows reflect it without a re-query
    await auditLog(pool, sql, { action: 'Examination cancelled', entity: 'Examination ' + r.EventId + ' (expired, never started)' });
  }
}

// The actual "automatic status management" asked for: a Scheduled
// examination's category is never just whatever the trainer clicked at
// creation time — it tracks its own date/time going forward. This promotes
// Scheduled -> WaitingRoom the moment the join window opens, with no
// participant needing to be the one to trigger it (previously this only ever
// happened reactively, inside :id/join, so a room nobody had tried to join
// yet stayed "Scheduled" right past its own start time). Safe to call from
// both an HTTP request (reactive, immediate) and a standalone timer
// (actually automatic, independent of anyone loading a page) — see index.js.
async function runAutoStatusSweep(pool) {
  const rows = (await pool.request().query(`SELECT * FROM dbo.Lms_ExaminationEvents WHERE Status IN ('Scheduled','WaitingRoom')`)).recordset;
  await sweepExpiredEvents(pool, rows);
  const toOpen = rows.filter((r) => r.Status === 'Scheduled' && joinWindowOpen(r.ScheduledAt));
  for (const r of toOpen) {
    await pool.request().input('id', sql.Int, r.EventId).query(`UPDATE dbo.Lms_ExaminationEvents SET Status='WaitingRoom' WHERE EventId=@id`);
    await auditLog(pool, sql, { action: 'Examination modified', entity: 'Examination ' + r.EventId + ' (waiting room opened automatically)' });
    emitAll('event:opened', { eventId: String(r.EventId) });
  }
}

router.get('/', asyncHandler(async (req, res) => {
  const pool = await getPool();
  await runAutoStatusSweep(pool);
  const rows = (await pool.request().query('SELECT * FROM dbo.Lms_ExaminationEvents')).recordset;
  const parts = await participantsFor(pool, rows.map((r) => r.EventId));
  res.json(rows.map((r) => mapEvent(r, parts[r.EventId])));
}));

// Real per-question correctness across every participant who actually
// answered this event, computed from the answers they submitted — not a
// placeholder.
router.get('/:id/question-stats', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pool = await getPool();
  const rows = (await pool.request().input('id', sql.Int, Number(id)).query(`
    SELECT QuestionId, COUNT(*) AS total, SUM(CASE WHEN IsCorrect = 1 THEN 1 ELSE 0 END) AS correct
    FROM dbo.Lms_ExaminationAnswers WHERE EventId=@id GROUP BY QuestionId
  `)).recordset;
  res.json(rows.map((r) => ({
    questionId: String(r.QuestionId),
    correctPct: r.total ? Math.round((r.correct / r.total) * 100) : 0,
  })));
}));

// Every scheduled date/time in this app is a naive wall-clock value with no
// timezone attached — entered as-is in a trainer's <input type="date"/"time">
// and meant to be stored and redisplayed completely unchanged (see
// canJoinNow/isEventExpired on the frontend, which treat it the same way).
// Handing mssql a bare string like "2026-11-05T16:00:00" breaks that: tedious
// coerces it via `new Date(...)`, which — with no "Z"/offset in the string —
// JS parses as *local time in whatever timezone this Node process runs in*,
// silently shifting it before it ever reaches the database (e.g. 16:00 IST
// became 10:30 once converted to the UTC this driver stores Date values as).
// Building the Date from its UTC components directly sidesteps that parse
// step entirely, so the literal numbers the trainer typed are exactly what
// gets written — and, since the driver reads DATETIME2 back out the same
// (UTC-component) way, exactly what the UI shows again afterwards.
function scheduledAtOf(date, time) {
  if (!date) return null;
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = (time || '00:00').split(':').map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh, mm, 0));
}

router.post('/', asyncHandler(async (req, res) => {
  const o = req.body;
  const pool = await getPool();
  let id = o.id;
  const scheduledAt = scheduledAtOf(o.date, o.time);
  // "Scheduled" means a future sitting with its own waiting room countdown —
  // a past or current date/time isn't a schedule, it's "now", which is what
  // the separate "Start immediately" (Waiting) action is for. Validating this
  // server-side (not just leaving it to the trainer's judgement in the UI)
  // is what keeps a Scheduled/Live/Waiting-Room examination's category
  // actually matching its date/time instead of drifting out of sync with it.
  if (!id && o.status === 'Scheduled' && scheduledAt && scheduledAt.getTime() <= nowAsScheduledAtNaive().getTime()) {
    return res.status(400).json({ error: 'Scheduled date/time must be in the future. Use "Start immediately" to open the waiting room now instead.' });
  }
  if (id) {
    // Editing an existing event must never clobber a status that's already
    // moved on (WaitingRoom/Live/Completed/Cancelled) — the edit modal reuses
    // the same Draft/Scheduled/Waiting submit buttons as creation, so without
    // this a trainer tweaking e.g. the participant list on a *Live* exam would
    // silently knock it back to Scheduled/WaitingRoom. Status changes only
    // happen through their dedicated actions (:id/publish, :id/start,
    // :id/end, :id/join, reschedule) — this just preserves whatever it is.
    const current = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT Status FROM dbo.Lms_ExaminationEvents WHERE EventId=@id')).recordset[0];
    const preservedStatus = current ? current.Status : (eventStatusToDb(o.status) || 'Draft');
    await pool.request().input('id', sql.Int, Number(id)).input('sc', sql.Int, Number(o.topic)).input('name', sql.NVarChar, o.name)
      .input('code', sql.NVarChar, o.code).input('type', sql.NVarChar, o.type).input('sched', sql.DateTime2, scheduledAt)
      .input('count', sql.Int, o.count).input('pass', sql.Decimal(5, 2), o.pass).input('defTime', sql.Int, o.defTime)
      .input('status', sql.NVarChar, preservedStatus).input('lb', sql.Bit, !!o.lb).input('res', sql.Bit, !!o.res).input('cert', sql.Bit, !!o.cert)
      .query(`UPDATE dbo.Lms_ExaminationEvents SET SubCategoryId=@sc, Name=@name, EventCode=@code, EventType=@type, ScheduledAt=@sched,
              QuestionCount=@count, PassPercentage=@pass, DefaultTimeLimitSec=@defTime, Status=@status,
              LeaderboardVisible=@lb, ResultVisible=@res, CertificateEligible=@cert WHERE EventId=@id`);

    // The invite list (o.parts) was previously only ever written at creation
    // time — editing an existing event to add/remove participants silently
    // did nothing to dbo.Lms_ExaminationParticipants, so the change never
    // reached the DB (or the invited participant themselves). Sync it here:
    // add newly-checked users, and drop anyone unchecked who never actually
    // joined (joined/completed history is never deleted).
    if (o.parts) {
      const existingRows = (await pool.request().input('id', sql.Int, Number(id))
        .query('SELECT * FROM dbo.Lms_ExaminationParticipants WHERE EventId=@id')).recordset;
      const newIds = o.parts.map(String);
      for (const userId of newIds) {
        if (!existingRows.some((r) => String(r.UserId) === userId)) {
          await pool.request().input('eventId', sql.Int, Number(id)).input('userId', sql.Int, Number(userId))
            .query(`INSERT INTO dbo.Lms_ExaminationParticipants (EventId, UserId, Invited, Status) VALUES (@eventId, @userId, 1, 'Invited')`);
        }
      }
      for (const row of existingRows) {
        if (row.Invited && !row.JoinTime && !newIds.includes(String(row.UserId))) {
          await pool.request().input('row', sql.Int, row.ParticipantRowId).query('DELETE FROM dbo.Lms_ExaminationParticipants WHERE ParticipantRowId=@row');
        }
      }
    }
    await auditLog(pool, sql, { action: 'Examination modified', entity: 'Examination ' + id, userId: o.actorId });
  } else {
    const inserted = await pool.request().input('sc', sql.Int, Number(o.topic)).input('name', sql.NVarChar, o.name)
      .input('code', sql.NVarChar, o.code).input('type', sql.NVarChar, o.type).input('sched', sql.DateTime2, scheduledAt)
      .input('count', sql.Int, o.count).input('pass', sql.Decimal(5, 2), o.pass).input('defTime', sql.Int, o.defTime)
      .input('status', sql.NVarChar, eventStatusToDb(o.status) || 'Draft').input('lb', sql.Bit, !!o.lb).input('res', sql.Bit, !!o.res).input('cert', sql.Bit, !!o.cert)
      .input('createdBy', sql.Int, o.actorId ? Number(o.actorId) : null)
      .query(`INSERT INTO dbo.Lms_ExaminationEvents (SubCategoryId, Name, EventCode, EventType, QuestionCount, MandatoryQuestionCount,
                PassPercentage, DefaultTimeLimitSec, ScheduledAt, LeaderboardVisible, ResultVisible, CertificateEligible, Status, CreatedBy, CreatedAt)
              OUTPUT INSERTED.EventId
              VALUES (@sc, @name, @code, @type, @count, 0, @pass, @defTime, @sched, @lb, @res, @cert, @status, @createdBy, sysutcdatetime())`);
    id = String(inserted.recordset[0].EventId);
    for (const userId of o.parts || []) {
      await pool.request().input('eventId', sql.Int, Number(id)).input('userId', sql.Int, Number(userId))
        .query(`INSERT INTO dbo.Lms_ExaminationParticipants (EventId, UserId, Invited, Status) VALUES (@eventId, @userId, 1, 'Invited')`);
    }
    await auditLog(pool, sql, { action: 'Examination creation', entity: 'Examination ' + id, userId: o.actorId });
    // Only a brand-new, non-Draft examination announces itself here — an
    // edit to an existing one must not re-fire "New examination" to every
    // participant (and re-trigger retake watchers) just because the trainer
    // tweaked a field; it used to, since this ran for every save whose
    // submit button wasn't "Save as draft", not just for actual creation.
    if (o.status !== 'Draft') {
      const targets = o.parts && o.parts.length ? o.parts : (await pool.request().query(`SELECT UserId FROM dbo.Lms_Users WHERE Role='Participant' AND Status='Active'`)).recordset.map((r) => r.UserId);
      await notifyUsers(pool, sql, targets, 'New examination: ' + o.name + ' on ' + o.date + ' at ' + o.time);
      await notifyRetakeWatchers(pool, o.topic, o.name);
    }
  }
  const row = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT * FROM dbo.Lms_ExaminationEvents WHERE EventId=@id')).recordset[0];
  const parts = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT * FROM dbo.Lms_ExaminationParticipants WHERE EventId=@id')).recordset;
  res.json({ event: mapEvent(row, parts) });
}));

router.post('/:id/publish', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pool = await getPool();
  const row = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT * FROM dbo.Lms_ExaminationEvents WHERE EventId=@id')).recordset[0];
  if (!row) return res.status(404).json({ error: 'not found' });
  const mandCount = (await pool.request().input('sc', sql.Int, row.SubCategoryId)
    .query(`SELECT COUNT(*) AS n FROM dbo.Lms_Questions WHERE SubCategoryId=@sc AND Status='Active' AND IsMandatory=1`)).recordset[0].n;
  if (mandCount > row.QuestionCount) return res.status(400).json({ error: 'Mandatory question count exceeds configured examination count.' });
  await pool.request().input('id', sql.Int, Number(id)).query(`UPDATE dbo.Lms_ExaminationEvents SET Status='Scheduled' WHERE EventId=@id`);
  await auditLog(pool, sql, { action: 'Examination modified', entity: 'Examination ' + id, userId: req.body.actorId });
  const parts = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT UserId FROM dbo.Lms_ExaminationParticipants WHERE EventId=@id')).recordset;
  await notifyUsers(pool, sql, parts.map((p) => p.UserId), 'New examination: ' + row.Name);
  await notifyRetakeWatchers(pool, row.SubCategoryId, row.Name);
  res.json({ ok: true });
}));

router.post('/retake-watch', asyncHandler(async (req, res) => {
  const { userId, topicId } = req.body;
  if (!userId || !topicId) return res.status(400).json({ error: 'userId and topicId are required' });
  await redis.sadd(retakeWatchKey(topicId), String(userId));
  res.json({ ok: true });
}));

router.post('/:id/join', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const pool = await getPool();
  const row = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT * FROM dbo.Lms_ExaminationEvents WHERE EventId=@id')).recordset[0];
  if (!row) return res.status(404).json({ error: 'not found' });
  // Catch a join attempt for an event that's expired (see sweepExpiredEvents)
  // but whose status hasn't been swept yet — there's no polling that would
  // otherwise refresh it before this request.
  if (['Scheduled', 'WaitingRoom'].includes(row.Status) && isExpired(row.ScheduledAt)) {
    await sweepExpiredEvents(pool, [row]);
    return res.status(400).json({ error: 'This examination was never started and has been cancelled.' });
  }
  // Mirrors the client-side gate in Events.tsx (join opens 5 min before the
  // scheduled start) — enforced here too so a direct API call can't bypass it.
  if (row.Status === 'Scheduled' && row.ScheduledAt) {
    const opensAt = new Date(new Date(row.ScheduledAt).getTime() - JOIN_WINDOW_MIN * 60 * 1000);
    if (nowAsScheduledAtNaive().getTime() < opensAt.getTime()) {
      return res.status(400).json({ error: `This examination will be accessible from ${opensAt.toISOString()} — please wait until then.` });
    }
  }
  const existing = (await pool.request().input('id', sql.Int, Number(id)).input('u', sql.Int, Number(userId))
    .query('SELECT * FROM dbo.Lms_ExaminationParticipants WHERE EventId=@id AND UserId=@u')).recordset[0];
  if (existing) {
    await pool.request().input('row', sql.Int, existing.ParticipantRowId)
      .query(`UPDATE dbo.Lms_ExaminationParticipants SET JoinTime=sysutcdatetime(), Status='Joined' WHERE ParticipantRowId=@row`);
  } else {
    await pool.request().input('id', sql.Int, Number(id)).input('u', sql.Int, Number(userId))
      .query(`INSERT INTO dbo.Lms_ExaminationParticipants (EventId, UserId, Invited, JoinTime, Status) VALUES (@id, @u, 0, sysutcdatetime(), 'Joined')`);
  }
  if (row.Status === 'Scheduled') {
    await pool.request().input('id', sql.Int, Number(id)).query(`UPDATE dbo.Lms_ExaminationEvents SET Status='WaitingRoom' WHERE EventId=@id`);
    // The room opening because the *first participant joined* needs the same
    // broadcast the automatic date/time sweep sends when it opens one on its
    // own (see runAutoStatusSweep) — otherwise a trainer sitting on the
    // Examinations list (not this one event's Live Control page) never sees
    // it leave "Scheduled" until they happen to reload.
    emitAll('event:opened', { eventId: String(id) });
  }
  await auditLog(pool, sql, { action: 'Joined waiting room', entity: 'Examination ' + id, userId });
  // Room-scoped emit (for anyone with this event's Live Control / waiting
  // room open — drives the roster and status dots), *and* a global broadcast
  // (for every other trainer screen — the Examinations list, the Dashboard —
  // so "Joined" updates the instant a participant enters the waiting room,
  // without the trainer needing to have opened Live Control for this exam
  // first; emitToEvent alone only reaches sockets that already joined that
  // one event's room).
  emitToEvent(id, 'participant:joined', { eventId: id, userId });
  emitAll('participant:joined', { eventId: String(id), userId: String(userId) });
  res.json({ ok: true });
}));

router.post('/:id/leave', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const pool = await getPool();
  const existing = (await pool.request().input('id', sql.Int, Number(id)).input('u', sql.Int, Number(userId))
    .query('SELECT * FROM dbo.Lms_ExaminationParticipants WHERE EventId=@id AND UserId=@u')).recordset[0];
  if (existing) {
    if (existing.Invited) {
      await pool.request().input('row', sql.Int, existing.ParticipantRowId)
        .query(`UPDATE dbo.Lms_ExaminationParticipants SET JoinTime=NULL, Status='Invited' WHERE ParticipantRowId=@row`);
    } else {
      await pool.request().input('row', sql.Int, existing.ParticipantRowId).query('DELETE FROM dbo.Lms_ExaminationParticipants WHERE ParticipantRowId=@row');
    }
  }
  // Same reasoning as the join broadcast above: without this, a participant
  // leaving only updates trainers who already have this exam's Live Control
  // open, leaving "Joined" stale everywhere else.
  emitToEvent(id, 'participant:left', { eventId: id, userId });
  emitAll('participant:left', { eventId: String(id), userId: String(userId) });
  res.json({ ok: true });
}));

router.post('/:id/start', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pool = await getPool();
  await pool.request().input('id', sql.Int, Number(id)).query(`UPDATE dbo.Lms_ExaminationEvents SET Status='Live', StartedAt=sysutcdatetime() WHERE EventId=@id`);
  const row = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT * FROM dbo.Lms_ExaminationEvents WHERE EventId=@id')).recordset[0];
  await auditLog(pool, sql, { action: 'Examination start', entity: 'Examination ' + id, userId: req.body.actorId });
  if (row) {
    const parts = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT UserId FROM dbo.Lms_ExaminationParticipants WHERE EventId=@id')).recordset;
    await notifyUsers(pool, sql, parts.map((p) => p.UserId), 'Examination "' + row.Name + '" has started');
  }
  emitToEvent(id, 'event:started', { eventId: id });
  res.json({ ok: true });
}));

router.post('/:id/end', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pool = await getPool();
  await pool.request().input('id', sql.Int, Number(id)).query(`UPDATE dbo.Lms_ExaminationEvents SET Status='Completed', EndedAt=sysutcdatetime() WHERE EventId=@id`);
  await auditLog(pool, sql, { action: 'Examination completion', entity: 'Examination ' + id, userId: req.body.actorId });
  emitToEvent(id, 'event:ended', { eventId: id });
  res.json({ ok: true });
}));

// Dumb persistence used by finishExam() for the live-mode path: the frontend
// already graded the paper client-side; this just records the final result.
router.post('/:id/complete-participant', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, total, earned, pct, result, rows } = req.body;
  const pool = await getPool();
  const eventRow = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT SubCategoryId, CertificateEligible FROM dbo.Lms_ExaminationEvents WHERE EventId=@id')).recordset[0];
  const existing = (await pool.request().input('id', sql.Int, Number(id)).input('u', sql.Int, Number(userId))
    .query('SELECT * FROM dbo.Lms_ExaminationParticipants WHERE EventId=@id AND UserId=@u')).recordset[0];
  if (existing) {
    await pool.request().input('row', sql.Int, existing.ParticipantRowId).input('total', sql.Decimal(8, 2), total)
      .input('marks', sql.Decimal(8, 2), earned).input('pct', sql.Decimal(5, 2), pct).input('result', sql.NVarChar, result)
      .query(`UPDATE dbo.Lms_ExaminationParticipants SET CompletionTime=sysutcdatetime(), TotalMarks=@total, MarksAchieved=@marks,
              Percentage=@pct, Result=@result, Status='Completed' WHERE ParticipantRowId=@row`);
  } else {
    await pool.request().input('id', sql.Int, Number(id)).input('u', sql.Int, Number(userId)).input('total', sql.Decimal(8, 2), total)
      .input('marks', sql.Decimal(8, 2), earned).input('pct', sql.Decimal(5, 2), pct).input('result', sql.NVarChar, result)
      .query(`INSERT INTO dbo.Lms_ExaminationParticipants (EventId, UserId, Invited, JoinTime, CompletionTime, TotalMarks, MarksAchieved, Percentage, Result, Status)
              VALUES (@id, @u, 0, sysutcdatetime(), sysutcdatetime(), @total, @marks, @pct, @result, 'Completed')`);
  }
  // A retried/duplicated completion request (flaky network, double-click,
  // the socket-driven auto-submit racing a manual submit) must not duplicate
  // this participant's answer history — replace it, the same way the
  // participant row itself is updated in place above, not appended to.
  await pool.request().input('id', sql.Int, Number(id)).input('u', sql.Int, Number(userId))
    .query('DELETE FROM dbo.Lms_ExaminationAnswers WHERE EventId=@id AND UserId=@u');
  for (const r of rows || []) {
    await pool.request().input('id', sql.Int, Number(id)).input('u', sql.Int, Number(userId)).input('q', sql.Int, Number(r.q.id))
      .input('data', sql.NVarChar, JSON.stringify(r.a)).input('correct', sql.Bit, r.state === 'c').input('marks', sql.Decimal(6, 2), r.earned).input('time', sql.Int, r.t || null)
      .query(`INSERT INTO dbo.Lms_ExaminationAnswers (EventId, UserId, QuestionId, AnswerData, IsCorrect, MarksAwarded, TimeTakenSec, AnsweredAt)
              VALUES (@id, @u, @q, @data, @correct, @marks, @time, sysutcdatetime())`);
  }
  // Issued here, server-side, the instant a pass is recorded — not left to
  // depend on the participant's browser staying open long enough to also
  // make its own separate /api/certs call afterwards (see
  // issueCertificateIfEligible in utils.js).
  if (eventRow) {
    await issueCertificateIfEligible(pool, sql, {
      userId, topicId: eventRow.SubCategoryId, eventId: Number(id), score: pct, result, certEligible: !!eventRow.CertificateEligible,
    });
  }
  // Pushes this result into the trainer's live "Waiting room" view without
  // them needing to reload — their own local events[].results otherwise only
  // ever reflects whatever was true at their last page load.
  const secs = existing?.JoinTime ? Math.max(0, Math.round((Date.now() - new Date(existing.JoinTime)) / 1000)) : 0;
  const t = String(Math.floor(secs / 60)).padStart(2, '0') + ':' + String(secs % 60).padStart(2, '0');
  emitToEvent(id, 'participant:completed', { eventId: id, userId, pct, t });
  res.json({ ok: true });
}));

module.exports = router;
module.exports.runAutoStatusSweep = runAutoStatusSweep;
