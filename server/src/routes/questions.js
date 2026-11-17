const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler, auditLog, userNameMap, QTYPE_TO_DB } = require('../utils');
const { mapQuestion } = require('../mappers');

const router = express.Router();

async function optionsFor(pool, questionIds) {
  if (!questionIds.length) return {};
  const result = await pool.request().query(`SELECT * FROM dbo.Lms_QuestionOptions WHERE QuestionId IN (${questionIds.join(',')})`);
  const byQ = {};
  result.recordset.forEach((o) => { (byQ[o.QuestionId] = byQ[o.QuestionId] || []).push(o); });
  return byQ;
}

router.get('/', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const topic = req.query.topic;
  const request = pool.request();
  let query = 'SELECT * FROM dbo.Lms_Questions';
  if (topic) { request.input('topic', sql.Int, Number(topic)); query += ' WHERE SubCategoryId=@topic'; }
  const rows = (await request.query(query)).recordset;
  const options = await optionsFor(pool, rows.map((r) => r.QuestionId));
  const names = await userNameMap(pool);
  res.json(rows.map((r) => mapQuestion(r, options[r.QuestionId], names)));
}));

async function writeOptions(pool, questionId, type, opts, ans, pairs) {
  await pool.request().input('qid', sql.Int, questionId).query('DELETE FROM dbo.Lms_QuestionOptions WHERE QuestionId=@qid');
  if (type === 'match') {
    for (let i = 0; i < (pairs || []).length; i++) {
      await pool.request().input('qid', sql.Int, questionId).input('text', sql.NVarChar, pairs[i][0])
        .input('key', sql.NVarChar, pairs[i][1]).input('seq', sql.Int, i)
        .query(`INSERT INTO dbo.Lms_QuestionOptions (QuestionId, OptionText, IsCorrect, Sequence, MatchKey) VALUES (@qid, @text, 0, @seq, @key)`);
    }
  } else if (type !== 'fill') {
    const answers = new Set((ans || []).map(Number));
    for (let i = 0; i < (opts || []).length; i++) {
      await pool.request().input('qid', sql.Int, questionId).input('text', sql.NVarChar, opts[i])
        .input('correct', sql.Bit, answers.has(i)).input('seq', sql.Int, i)
        .query(`INSERT INTO dbo.Lms_QuestionOptions (QuestionId, OptionText, IsCorrect, Sequence) VALUES (@qid, @text, @correct, @seq)`);
    }
  }
}

router.post('/', asyncHandler(async (req, res) => {
  const o = req.body;
  const pool = await getPool();
  const dbType = QTYPE_TO_DB[o.type] || 'MCQSingle';
  const correctAnswerData = o.type === 'fill' ? JSON.stringify(o.ans || []) : null;
  const inserted = await pool.request()
    .input('sc', sql.Int, Number(o.topic)).input('type', sql.NVarChar, dbType).input('text', sql.NVarChar, o.text)
    .input('weight', sql.Decimal(6, 2), o.marks || 1).input('defTime', sql.Int, 30).input('indivTime', sql.Int, o.time ?? null)
    .input('mand', sql.Bit, !!o.mandatory).input('explain', sql.NVarChar, o.explain || null).input('diff', sql.NVarChar, o.diff || 'Medium')
    .input('correctData', sql.NVarChar, correctAnswerData).input('media', sql.NVarChar, o.img || null)
    .input('createdBy', sql.Int, o.actorId ? Number(o.actorId) : null)
    .query(`INSERT INTO dbo.Lms_Questions (SubCategoryId, QuestionType, QuestionText, Weightage, DefaultTimeLimitSec, IndividualTimeLimitSec,
              IsMandatory, Explanation, Difficulty, Status, CorrectAnswerData, MediaReference, CreatedBy, CreatedAt, UpdatedAt)
            OUTPUT INSERTED.QuestionId
            VALUES (@sc, @type, @text, @weight, @defTime, @indivTime, @mand, @explain, @diff, 'Active', @correctData, @media, @createdBy, sysutcdatetime(), sysutcdatetime())`);
  const id = inserted.recordset[0].QuestionId;
  await writeOptions(pool, id, o.type, o.opts, o.ans, o.pairs);
  await auditLog(pool, sql, { action: 'Question creation', entity: 'Question ' + id, userId: o.actorId });
  res.status(201).json({ id: String(id) });
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const o = req.body;
  const pool = await getPool();
  const dbType = QTYPE_TO_DB[o.type] || 'MCQSingle';
  const correctAnswerData = o.type === 'fill' ? JSON.stringify(o.ans || []) : null;
  await pool.request()
    .input('id', sql.Int, Number(id)).input('sc', sql.Int, Number(o.topic)).input('type', sql.NVarChar, dbType).input('text', sql.NVarChar, o.text)
    .input('weight', sql.Decimal(6, 2), o.marks || 1).input('indivTime', sql.Int, o.time ?? null)
    .input('mand', sql.Bit, !!o.mandatory).input('status', sql.NVarChar, o.status).input('diff', sql.NVarChar, o.diff)
    .input('explain', sql.NVarChar, o.explain || null).input('correctData', sql.NVarChar, correctAnswerData).input('media', sql.NVarChar, o.img || null)
    .query(`UPDATE dbo.Lms_Questions SET SubCategoryId=@sc, QuestionType=@type, QuestionText=@text, Weightage=@weight,
            IndividualTimeLimitSec=@indivTime, IsMandatory=@mand, Status=@status, Difficulty=@diff, Explanation=@explain,
            CorrectAnswerData=@correctData, MediaReference=@media, UpdatedAt=sysutcdatetime() WHERE QuestionId=@id`);
  await writeOptions(pool, Number(id), o.type, o.opts, o.ans, o.pairs);
  await auditLog(pool, sql, { action: 'Question modified', entity: 'Question ' + id, userId: o.actorId });
  res.json({ ok: true });
}));

router.post('/:id/duplicate', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pool = await getPool();
  const src = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT * FROM dbo.Lms_Questions WHERE QuestionId=@id')).recordset[0];
  if (!src) return res.status(404).json({ error: 'not found' });
  const inserted = await pool.request()
    .input('sc', sql.Int, src.SubCategoryId).input('type', sql.NVarChar, src.QuestionType).input('text', sql.NVarChar, src.QuestionText + ' (copy)')
    .input('weight', sql.Decimal(6, 2), src.Weightage).input('defTime', sql.Int, src.DefaultTimeLimitSec).input('indivTime', sql.Int, src.IndividualTimeLimitSec)
    .input('mand', sql.Bit, false).input('explain', sql.NVarChar, src.Explanation).input('diff', sql.NVarChar, src.Difficulty)
    .input('status', sql.NVarChar, src.Status).input('correctData', sql.NVarChar, src.CorrectAnswerData)
    .input('media', sql.NVarChar, src.MediaReference).input('createdBy', sql.Int, src.CreatedBy)
    .query(`INSERT INTO dbo.Lms_Questions (SubCategoryId, QuestionType, QuestionText, Weightage, DefaultTimeLimitSec, IndividualTimeLimitSec,
              IsMandatory, Explanation, Difficulty, Status, CorrectAnswerData, MediaReference, CreatedBy, CreatedAt, UpdatedAt)
            OUTPUT INSERTED.QuestionId
            VALUES (@sc, @type, @text, @weight, @defTime, @indivTime, @mand, @explain, @diff, @status, @correctData, @media, @createdBy, sysutcdatetime(), sysutcdatetime())`);
  const newId = inserted.recordset[0].QuestionId;
  const opts = (await pool.request().input('id', sql.Int, Number(id)).query('SELECT * FROM dbo.Lms_QuestionOptions WHERE QuestionId=@id ORDER BY Sequence')).recordset;
  for (const o of opts) {
    await pool.request().input('qid', sql.Int, newId).input('text', sql.NVarChar, o.OptionText).input('correct', sql.Bit, o.IsCorrect)
      .input('seq', sql.Int, o.Sequence).input('key', sql.NVarChar, o.MatchKey)
      .query(`INSERT INTO dbo.Lms_QuestionOptions (QuestionId, OptionText, IsCorrect, Sequence, MatchKey) VALUES (@qid, @text, @correct, @seq, @key)`);
  }
  res.status(201).json({ id: String(newId) });
}));

router.patch('/:id/toggle-archive', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pool = await getPool();
  await pool.request().input('id', sql.Int, Number(id))
    .query(`UPDATE dbo.Lms_Questions SET Status = CASE WHEN Status='Active' THEN 'Archived' ELSE 'Active' END, UpdatedAt=sysutcdatetime() WHERE QuestionId=@id`);
  await auditLog(pool, sql, { action: 'Question modified', entity: 'Question ' + id, userId: req.body.actorId });
  res.json({ ok: true });
}));

module.exports = router;
