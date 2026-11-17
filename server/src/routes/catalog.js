const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler, auditLog, notifyUsers, primaryContentFor, activeAssessmentFor } = require('../utils');
const { mapCategory, mapProduct, mapTopic, mapEvent } = require('../mappers');
const { reindexTopic } = require('../lib/ingest');
const { emitToEvent } = require('../socket');

const router = express.Router();

async function allActiveParticipantIds(pool) {
  return (await pool.request().query(`SELECT UserId FROM dbo.Lms_Users WHERE Role='Participant' AND Status='Active'`)).recordset.map((r) => r.UserId);
}

// A Published topic is unpublished (Draft or Archived) while it still has
// examinations or a self-assessment participants could be relying on — the
// trainer confirmed this client-side before the request ever got here (see
// topicEditor.tsx), so the backend's job is just to make it actually true:
// pull every exam that depended on this topic being Published, and tell
// whoever was counting on it.
// Returns the events it changed (mapped, with their participants) so the
// caller can hand them back to the frontend — without this, the trainer's
// own screen would keep showing the event as Scheduled until they refresh,
// since the cascade happens entirely server-side.
async function cascadeDisableTopicExams(pool, topicId, actorId) {
  const topicRow = (await pool.request().input('id', sql.Int, topicId).query('SELECT Name FROM dbo.Lms_SubCategories WHERE SubCategoryId=@id')).recordset[0];
  const topicName = topicRow ? topicRow.Name : 'this topic';
  const changedEvents = [];

  // Live right now: end it exactly like the trainer's own "End examination"
  // button would, so in-progress participants get the normal Incomplete
  // handling instead of being left mid-exam against a topic that no longer exists.
  const liveEvents = (await pool.request().input('sc', sql.Int, topicId)
    .query(`SELECT * FROM dbo.Lms_ExaminationEvents WHERE SubCategoryId=@sc AND Status='Live'`)).recordset;
  for (const row of liveEvents) {
    await pool.request().input('id', sql.Int, row.EventId).query(`UPDATE dbo.Lms_ExaminationEvents SET Status='Completed', EndedAt=sysutcdatetime() WHERE EventId=@id`);
    await auditLog(pool, sql, { action: 'Examination completion', entity: 'Examination ' + row.EventId, userId: actorId });
    emitToEvent(String(row.EventId), 'event:ended', { eventId: String(row.EventId) });
    const parts = (await pool.request().input('id', sql.Int, row.EventId).query('SELECT * FROM dbo.Lms_ExaminationParticipants WHERE EventId=@id')).recordset;
    const targets = row.EventType === 'Private' ? parts.map((p) => p.UserId) : await allActiveParticipantIds(pool);
    await notifyUsers(pool, sql, targets, `Examination "${row.Name}" was ended because its topic "${topicName}" was unpublished.`);
    changedEvents.push(mapEvent({ ...row, Status: 'Completed' }, parts));
  }

  // Never actually started: just cancel outright, no in-progress attempts to protect.
  const pendingEvents = (await pool.request().input('sc', sql.Int, topicId)
    .query(`SELECT * FROM dbo.Lms_ExaminationEvents WHERE SubCategoryId=@sc AND Status IN ('Draft','Scheduled','WaitingRoom')`)).recordset;
  for (const row of pendingEvents) {
    await pool.request().input('id', sql.Int, row.EventId).query(`UPDATE dbo.Lms_ExaminationEvents SET Status='Cancelled' WHERE EventId=@id`);
    await auditLog(pool, sql, { action: 'Examination cancelled', entity: 'Examination ' + row.EventId, userId: actorId });
    const parts = (await pool.request().input('id', sql.Int, row.EventId).query('SELECT * FROM dbo.Lms_ExaminationParticipants WHERE EventId=@id')).recordset;
    if (row.Status !== 'Draft') { // a Draft was never published, so it has no audience to tell
      const targets = row.EventType === 'Private' ? parts.map((p) => p.UserId) : await allActiveParticipantIds(pool);
      await notifyUsers(pool, sql, targets, `Examination "${row.Name}" was cancelled because its topic "${topicName}" was unpublished.`);
    }
    changedEvents.push(mapEvent({ ...row, Status: 'Cancelled' }, parts));
  }

  // Self-assessment has no "status" of its own — it's simply available
  // whenever the topic is Published — so it's always worth a notice here.
  const assessment = await activeAssessmentFor(pool, sql, topicId);
  if (assessment) {
    const participantsJson = JSON.parse(assessment.ParticipantsJson || '[]');
    const targets = assessment.Mode === 'Private' && participantsJson.length ? participantsJson : await allActiveParticipantIds(pool);
    await notifyUsers(pool, sql, targets, `Self-assessment for "${topicName}" is no longer available.`);
  }

  return changedEvents;
}

router.get('/categories', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const result = await pool.request().query('SELECT * FROM dbo.Lms_Categories ORDER BY CategoryId');
  res.json(result.recordset.map(mapCategory));
}));

router.get('/products', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const result = await pool.request().query('SELECT * FROM dbo.Lms_Products ORDER BY ProductId');
  res.json(result.recordset.map(mapProduct));
}));

router.post('/products', asyncHandler(async (req, res) => {
  const o = req.body;
  const pool = await getPool();
  let id = o.id;
  if (id) {
    await pool.request().input('id', sql.Int, Number(id)).input('cat', sql.Int, Number(o.cat))
      .input('name', sql.NVarChar, o.name).input('desc', sql.NVarChar, o.desc || null).input('status', sql.NVarChar, o.status)
      .query('UPDATE dbo.Lms_Products SET CategoryId=@cat, Name=@name, Description=@desc, Status=@status WHERE ProductId=@id');
  } else {
    const inserted = await pool.request().input('cat', sql.Int, Number(o.cat))
      .input('name', sql.NVarChar, o.name).input('desc', sql.NVarChar, o.desc || null).input('status', sql.NVarChar, o.status || 'Active')
      .query(`INSERT INTO dbo.Lms_Products (CategoryId, Name, Description, Status, CreatedAt) OUTPUT INSERTED.ProductId
              VALUES (@cat, @name, @desc, @status, sysutcdatetime())`);
    id = String(inserted.recordset[0].ProductId);
  }
  await auditLog(pool, sql, { action: 'Content ' + (o.id ? 'modified' : 'creation'), entity: 'Product', userId: o.actorId });
  res.json({ id });
}));

async function loadTopicsRows(pool) {
  const subcats = (await pool.request().query('SELECT * FROM dbo.Lms_SubCategories ORDER BY SubCategoryId')).recordset;
  const topics = [];
  for (const row of subcats) {
    const assessment = await activeAssessmentFor(pool, sql, row.SubCategoryId);
    const content = await primaryContentFor(pool, sql, row.SubCategoryId);
    topics.push(mapTopic(row, assessment, content));
  }
  return topics;
}

router.get('/topics', asyncHandler(async (req, res) => {
  const pool = await getPool();
  res.json(await loadTopicsRows(pool));
}));

router.post('/topics', asyncHandler(async (req, res) => {
  const o = req.body;
  const pool = await getPool();
  let id = o.id;
  let cancelledEvents = [];
  if (id) {
    await pool.request().input('id', sql.Int, Number(id)).input('prod', sql.Int, Number(o.prod))
      .input('name', sql.NVarChar, o.name).input('desc', sql.NVarChar, o.desc || null)
      .query('UPDATE dbo.Lms_SubCategories SET ProductId=@prod, Name=@name, Description=@desc WHERE SubCategoryId=@id');
    const assessment = await activeAssessmentFor(pool, sql, Number(id));
    // mode/lb/res/cert/parts are only ever sent by the self-assessment form in
    // examEditor.tsx — a plain topic edit from Topics & Products omits them,
    // so fall back to the assessment's current values (or sane defaults) to
    // avoid silently resetting them.
    const mode = o.mode ?? assessment?.Mode ?? 'Open';
    const lb = o.lb ?? (assessment ? !!assessment.LeaderboardVisible : true);
    const res = o.res ?? (assessment ? !!assessment.ResultVisible : true);
    const cert = o.cert ?? (assessment ? !!assessment.CertificateEligible : false);
    const parts = o.parts !== undefined ? JSON.stringify(o.parts) : assessment?.ParticipantsJson ?? '[]';
    if (assessment) {
      await pool.request().input('aid', sql.Int, assessment.AssessmentId).input('pass', sql.Decimal(5, 2), o.pass)
        .input('defTime', sql.Int, o.defTime).input('count', sql.Int, o.examCount)
        .input('mode', sql.NVarChar, mode).input('lb', sql.Bit, lb).input('res', sql.Bit, res).input('cert', sql.Bit, cert).input('parts', sql.NVarChar, parts)
        .query(`UPDATE dbo.Lms_Assessments SET PassPercentage=@pass, DefaultTimeLimitSec=@defTime, QuestionCount=@count,
                Mode=@mode, LeaderboardVisible=@lb, ResultVisible=@res, CertificateEligible=@cert, ParticipantsJson=@parts WHERE AssessmentId=@aid`);
    } else {
      await pool.request().input('sc', sql.Int, Number(id)).input('name', sql.NVarChar, o.name + ' Self-Assessment')
        .input('count', sql.Int, o.examCount).input('pass', sql.Decimal(5, 2), o.pass).input('defTime', sql.Int, o.defTime)
        .input('createdBy', sql.Int, o.actorId ? Number(o.actorId) : null)
        .input('mode', sql.NVarChar, mode).input('lb', sql.Bit, lb).input('res', sql.Bit, res).input('cert', sql.Bit, cert).input('parts', sql.NVarChar, parts)
        .query(`INSERT INTO dbo.Lms_Assessments (SubCategoryId, Name, QuestionCount, PassPercentage, DefaultTimeLimitSec, Status, CreatedBy, CreatedAt, Mode, LeaderboardVisible, ResultVisible, CertificateEligible, ParticipantsJson)
                VALUES (@sc, @name, @count, @pass, @defTime, 'Active', @createdBy, sysutcdatetime(), @mode, @lb, @res, @cert, @parts)`);
    }
    if (o.status) {
      const content = await primaryContentFor(pool, sql, Number(id));
      if (content) {
        await pool.request().input('cid', sql.Int, content.ContentId).input('status', sql.NVarChar, o.status)
          .query(`UPDATE dbo.Lms_LearningContents SET Status=@status, UpdatedAt=sysutcdatetime()${o.status === 'Published' ? ', PublishedAt=sysutcdatetime()' : ''} WHERE ContentId=@cid`);
        // Taking a topic off Published pulls the rug out from under any
        // examination or self-assessment that depended on it — the trainer
        // already confirmed this client-side (topicEditor.tsx), so cascade
        // the disable + notifications now that it's actually happening.
        if (content.Status === 'Published' && o.status !== 'Published') {
          cancelledEvents = await cascadeDisableTopicExams(pool, Number(id), o.actorId);
        }
      }
    }
    await auditLog(pool, sql, { action: 'Content modified', entity: 'Topic ' + id, userId: o.actorId });
  } else {
    const inserted = await pool.request().input('prod', sql.Int, Number(o.prod)).input('name', sql.NVarChar, o.name)
      .input('desc', sql.NVarChar, o.desc || null).input('status', sql.NVarChar, o.subcatStatus || 'Active')
      .query(`INSERT INTO dbo.Lms_SubCategories (ProductId, Name, Description, Status, CreatedAt) OUTPUT INSERTED.SubCategoryId
              VALUES (@prod, @name, @desc, @status, sysutcdatetime())`);
    id = String(inserted.recordset[0].SubCategoryId);
    await pool.request().input('sc', sql.Int, Number(id)).input('name', sql.NVarChar, o.name + ' Self-Assessment')
      .input('count', sql.Int, o.examCount).input('pass', sql.Decimal(5, 2), o.pass).input('defTime', sql.Int, o.defTime)
      .input('createdBy', sql.Int, o.actorId ? Number(o.actorId) : null)
      .query(`INSERT INTO dbo.Lms_Assessments (SubCategoryId, Name, QuestionCount, PassPercentage, DefaultTimeLimitSec, Status, CreatedBy, CreatedAt)
              VALUES (@sc, @name, @count, @pass, @defTime, 'Active', @createdBy, sysutcdatetime())`);
    const contentInserted = await pool.request().input('sc', sql.Int, Number(id)).input('title', sql.NVarChar, o.name).input('createdBy', sql.Int, o.actorId ? Number(o.actorId) : null)
      .query(`INSERT INTO dbo.Lms_LearningContents (SubCategoryId, Title, Status, Version, CreatedBy, CreatedAt, UpdatedAt)
              OUTPUT INSERTED.ContentId
              VALUES (@sc, @title, 'Draft', 1, @createdBy, sysutcdatetime(), sysutcdatetime())`);
    const contentId = contentInserted.recordset[0].ContentId;
    await pool.request().input('cid', sql.Int, contentId).input('data', sql.NVarChar, JSON.stringify({ text: 'Start writing your content here.' }))
      .query(`INSERT INTO dbo.Lms_LearningSlides (ContentId, Sequence, SlideType, Title, ContentData, CreatedAt, UpdatedAt)
              VALUES (@cid, 0, 'text', 'New slide', @data, sysutcdatetime(), sysutcdatetime())`);
    await auditLog(pool, sql, { action: 'Content creation', entity: 'Topic ' + id, userId: o.actorId });
  }
  res.json({ id, cancelledEvents });
}));

router.post('/topics/:id/publish', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pool = await getPool();
  const content = await primaryContentFor(pool, sql, Number(id));
  if (content) {
    await pool.request().input('cid', sql.Int, content.ContentId)
      .query(`UPDATE dbo.Lms_LearningContents SET Status='Published', PublishedAt=sysutcdatetime(), UpdatedAt=sysutcdatetime() WHERE ContentId=@cid`);
  }
  const topicRow = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT Name FROM dbo.Lms_SubCategories WHERE SubCategoryId=@id')).recordset[0];
  await auditLog(pool, sql, { action: 'Content publication', entity: 'Topic ' + id, userId: req.body.actorId });
  if (topicRow) {
    const participants = (await pool.request().query(`SELECT UserId FROM dbo.Lms_Users WHERE Role='Participant' AND Status='Active'`)).recordset;
    await notifyUsers(pool, sql, participants.map((p) => p.UserId), 'New learning content published: ' + topicRow.Name);
  }
  reindexTopic(id).catch((err) => console.warn('Reindex failed for topic', id, err.message));
  res.json({ ok: true });
}));

// A topic can only be deleted once Archived, and only if nothing real has
// happened against it yet — any attempt, certificate, exam event, expert
// question or learner progress row means real history exists and must be
// kept, not silently destroyed by a content cleanup action.
async function topicHistoryCounts(pool, subCategoryId) {
  const r = await pool.request().input('sc', sql.Int, subCategoryId).query(`
    SELECT
      (SELECT COUNT(*) FROM dbo.Lms_AssessmentAttempts aa JOIN dbo.Lms_Assessments a ON a.AssessmentId = aa.AssessmentId WHERE a.SubCategoryId = @sc) AS attempts,
      (SELECT COUNT(*) FROM dbo.Lms_Certificates WHERE SubCategoryId = @sc) AS certs,
      (SELECT COUNT(*) FROM dbo.Lms_ExaminationEvents WHERE SubCategoryId = @sc) AS events,
      (SELECT COUNT(*) FROM dbo.Lms_ExpertQuestions WHERE SubCategoryId = @sc) AS expertQs,
      (SELECT COUNT(*) FROM dbo.Lms_LearningProgress lp JOIN dbo.Lms_LearningContents c ON c.ContentId = lp.ContentId WHERE c.SubCategoryId = @sc) AS progress
  `);
  return r.recordset[0];
}

function historyMessage(counts) {
  const parts = [];
  if (counts.attempts) parts.push(counts.attempts + ' assessment attempt(s)');
  if (counts.certs) parts.push(counts.certs + ' certificate(s)');
  if (counts.events) parts.push(counts.events + ' examination event(s)');
  if (counts.expertQs) parts.push(counts.expertQs + ' expert question(s)');
  if (counts.progress) parts.push(counts.progress + ' learner progress record(s)');
  return 'Cannot delete — this topic has ' + parts.join(', ') + '.';
}

// Deletes everything this topic authored (slides, questions, assessment,
// embeddings) and the subcategory row itself. Caller must already have
// verified the topic is Archived and has no history (see topicHistoryCounts).
async function deleteTopicContent(transaction, subCategoryId) {
  await new sql.Request(transaction).input('sc', sql.Int, subCategoryId)
    .query('DELETE FROM dbo.Lms_ContentEmbeddings WHERE SubCategoryId=@sc');
  await new sql.Request(transaction).input('sc', sql.Int, subCategoryId)
    .query('DELETE FROM dbo.Lms_AIKnowledgeEntries WHERE SubCategoryId=@sc');
  await new sql.Request(transaction).input('sc', sql.Int, subCategoryId)
    .query('DELETE FROM dbo.Lms_QuestionOptions WHERE QuestionId IN (SELECT QuestionId FROM dbo.Lms_Questions WHERE SubCategoryId=@sc)');
  await new sql.Request(transaction).input('sc', sql.Int, subCategoryId)
    .query('DELETE FROM dbo.Lms_Questions WHERE SubCategoryId=@sc');
  await new sql.Request(transaction).input('sc', sql.Int, subCategoryId)
    .query('DELETE FROM dbo.Lms_LearningSlides WHERE ContentId IN (SELECT ContentId FROM dbo.Lms_LearningContents WHERE SubCategoryId=@sc)');
  await new sql.Request(transaction).input('sc', sql.Int, subCategoryId)
    .query('DELETE FROM dbo.Lms_LearningContents WHERE SubCategoryId=@sc');
  await new sql.Request(transaction).input('sc', sql.Int, subCategoryId)
    .query('DELETE FROM dbo.Lms_Assessments WHERE SubCategoryId=@sc');
  await new sql.Request(transaction).input('sc', sql.Int, subCategoryId)
    .query('DELETE FROM dbo.Lms_SubCategories WHERE SubCategoryId=@sc');
}

router.delete('/topics/:id', asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const pool = await getPool();
  const topicRow = (await pool.request().input('id', sql.Int, id).query('SELECT Name FROM dbo.Lms_SubCategories WHERE SubCategoryId=@id')).recordset[0];
  if (!topicRow) return res.status(404).json({ error: 'Topic not found' });
  const content = await primaryContentFor(pool, sql, id);
  if (!content || content.Status !== 'Archived') return res.status(400).json({ error: 'Only archived topics can be deleted' });
  const counts = await topicHistoryCounts(pool, id);
  if (counts.attempts || counts.certs || counts.events || counts.expertQs || counts.progress) {
    return res.status(409).json({ error: historyMessage(counts) });
  }

  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  try {
    await deleteTopicContent(transaction, id);
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
  await auditLog(pool, sql, { action: 'Content deleted', entity: 'Topic ' + id + ' (' + topicRow.Name + ')', userId: req.query.actorId });
  res.json({ ok: true });
}));

router.delete('/products/:id', asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const pool = await getPool();
  const productRow = (await pool.request().input('id', sql.Int, id).query('SELECT Name FROM dbo.Lms_Products WHERE ProductId=@id')).recordset[0];
  if (!productRow) return res.status(404).json({ error: 'Product not found' });

  const topicRows = (await pool.request().input('pid', sql.Int, id).query('SELECT SubCategoryId, Name FROM dbo.Lms_SubCategories WHERE ProductId=@pid')).recordset;
  for (const t of topicRows) {
    const content = await primaryContentFor(pool, sql, t.SubCategoryId);
    if (!content || content.Status !== 'Archived') {
      return res.status(400).json({ error: 'All topics under this product must be archived first ("' + t.Name + '" is not)' });
    }
  }
  for (const t of topicRows) {
    const counts = await topicHistoryCounts(pool, t.SubCategoryId);
    if (counts.attempts || counts.certs || counts.events || counts.expertQs || counts.progress) {
      return res.status(409).json({ error: historyMessage(counts) + ' (topic "' + t.Name + '")' });
    }
  }

  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  try {
    for (const t of topicRows) await deleteTopicContent(transaction, t.SubCategoryId);
    await new sql.Request(transaction).input('id', sql.Int, id).query('DELETE FROM dbo.Lms_Products WHERE ProductId=@id');
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
  await auditLog(pool, sql, { action: 'Content deleted', entity: 'Product ' + id + ' (' + productRow.Name + ')', userId: req.query.actorId });
  res.json({ ok: true });
}));

module.exports = router;
