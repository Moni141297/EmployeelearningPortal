const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler, auditLog, notifyUsers, emitToTrainers, userNameMap } = require('../utils');
const { mapExpertQ } = require('../mappers');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const rows = (await pool.request().query('SELECT * FROM dbo.Lms_ExpertQuestions ORDER BY CreatedAt DESC')).recordset;
  const names = await userNameMap(pool);
  res.json(rows.map((r) => mapExpertQ(r, names)));
}));

router.post('/', asyncHandler(async (req, res) => {
  const { userId, topicId, question, aiResp, note } = req.body;
  const pool = await getPool();
  const inserted = await pool.request().input('user', sql.Int, Number(userId)).input('topic', sql.Int, Number(topicId))
    .input('q', sql.NVarChar, question || '(question from AI conversation)').input('ai', sql.NVarChar, aiResp || null).input('note', sql.NVarChar, note || null)
    .query(`INSERT INTO dbo.Lms_ExpertQuestions (UserId, SubCategoryId, OriginalQuestion, AiResponse, UserNote, Status, CreatedAt)
            OUTPUT INSERTED.ExpertQuestionId
            VALUES (@user, @topic, @q, @ai, @note, 'Raised', sysutcdatetime())`);
  const id = inserted.recordset[0].ExpertQuestionId;
  await auditLog(pool, sql, { action: 'Expert question raised', entity: 'Topic ' + topicId, userId });
  const row = (await pool.request().input('id', sql.Int, id).query('SELECT * FROM dbo.Lms_ExpertQuestions WHERE ExpertQuestionId=@id')).recordset[0];
  await emitToTrainers(pool, sql, 'expert:new', mapExpertQ(row, {}));
  res.status(201).json({ id: String(id) });
}));

router.post('/:id/assign', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { expertId, expertName } = req.body;
  const pool = await getPool();
  let resolvedId = expertId ? Number(expertId) : null;
  if (!resolvedId && expertName) {
    const r = await pool.request().input('name', sql.NVarChar, expertName).query('SELECT TOP 1 UserId FROM dbo.Lms_Users WHERE Name=@name');
    resolvedId = r.recordset[0] ? r.recordset[0].UserId : null;
  }
  await pool.request().input('id', sql.Int, Number(id)).input('expert', sql.Int, resolvedId)
    .query(`UPDATE dbo.Lms_ExpertQuestions SET Status='Assigned', ExpertId=@expert WHERE ExpertQuestionId=@id`);
  res.json({ ok: true });
}));

router.post('/:id/answer', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { resp, expertId, expertName, actorId } = req.body;
  const pool = await getPool();
  let resolvedId = expertId ? Number(expertId) : (actorId ? Number(actorId) : null);
  if (!resolvedId && expertName) {
    const r = await pool.request().input('name', sql.NVarChar, expertName).query('SELECT TOP 1 UserId FROM dbo.Lms_Users WHERE Name=@name');
    resolvedId = r.recordset[0] ? r.recordset[0].UserId : null;
  }
  await pool.request().input('id', sql.Int, Number(id)).input('resp', sql.NVarChar, resp).input('expert', sql.Int, resolvedId)
    .query(`UPDATE dbo.Lms_ExpertQuestions SET Status='Answered', ExpertResponse=@resp, ExpertId=@expert, ResolvedAt=sysutcdatetime() WHERE ExpertQuestionId=@id`);
  await auditLog(pool, sql, { action: 'Expert response', entity: 'Expert question ' + id, userId: actorId });
  const row = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT * FROM dbo.Lms_ExpertQuestions WHERE ExpertQuestionId=@id')).recordset[0];
  if (row) {
    const t = (await pool.request().input('id', sql.Int, row.SubCategoryId).query('SELECT Name FROM dbo.Lms_SubCategories WHERE SubCategoryId=@id')).recordset[0];
    await notifyUsers(pool, sql, [row.UserId], 'An expert has answered your question on ' + (t ? t.Name : row.SubCategoryId));
    const names = await userNameMap(pool);
    const mapped = mapExpertQ(row, names);
    const { emitToUser } = require('../socket');
    emitToUser(row.UserId, 'expert:answered', mapped);
    await emitToTrainers(pool, sql, 'expert:updated', mapped);
  }
  res.json({ ok: true });
}));

router.post('/:id/close', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pool = await getPool();
  await pool.request().input('id', sql.Int, Number(id)).query(`UPDATE dbo.Lms_ExpertQuestions SET Status='Closed' WHERE ExpertQuestionId=@id`);
  res.json({ ok: true });
}));

router.post('/:id/publish-to-kb', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pool = await getPool();
  const row = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT * FROM dbo.Lms_ExpertQuestions WHERE ExpertQuestionId=@id')).recordset[0];
  if (!row) return res.status(404).json({ error: 'not found' });
  await pool.request().input('sc', sql.Int, row.SubCategoryId).input('src', sql.Int, row.ExpertQuestionId)
    .input('q', sql.NVarChar, row.OriginalQuestion).input('a', sql.NVarChar, (row.ExpertResponse || '') + '\n\n(Expert clarification published by the assigned expert)')
    .input('createdBy', sql.Int, row.ExpertId)
    .query(`INSERT INTO dbo.Lms_AIKnowledgeEntries (SubCategoryId, SourceExpertQuestionId, Question, Answer, CreatedBy, CreatedAt)
            VALUES (@sc, @src, @q, @a, @createdBy, sysutcdatetime())`);
  res.json({ ok: true });
}));

module.exports = router;
