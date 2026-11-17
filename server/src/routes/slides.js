const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler, auditLog, primaryContentFor } = require('../utils');
const { mapSlide } = require('../mappers');
const { reindexTopic } = require('../lib/ingest');

const router = express.Router();

// Keeps the AI assistant's knowledge base in sync with slide edits. Not
// awaited — the author doesn't need to wait on an embeddings round-trip to
// save a slide, same fire-and-forget pattern used elsewhere in this app.
function reindex(topicId) {
  reindexTopic(topicId).catch((err) => console.warn('Reindex failed for topic', topicId, err.message));
}

async function getOrdered(pool, contentId) {
  const result = await pool.request().input('cid', sql.Int, contentId)
    .query('SELECT * FROM dbo.Lms_LearningSlides WHERE ContentId=@cid ORDER BY Sequence ASC');
  return result.recordset;
}
async function resequence(pool, rows) {
  for (let i = 0; i < rows.length; i++) {
    await pool.request().input('id', sql.Int, rows[i].SlideId).input('seq', sql.Int, i)
      .query('UPDATE dbo.Lms_LearningSlides SET Sequence=@seq WHERE SlideId=@id');
  }
}
function contentDataOf(patch, existingParsed) {
  const merged = { ...existingParsed };
  if (patch.body !== undefined) merged.text = patch.body;
  if (patch.explain !== undefined) merged.explanation = patch.explain;
  if (patch.media !== undefined) merged.imageUrl = patch.media;
  if (patch.images !== undefined) merged.images = patch.images;
  if (patch.caption !== undefined) merged.caption = patch.caption;
  if (patch.list !== undefined) merged.list = patch.list;
  if (patch.key !== undefined) merged.key = patch.key;
  if (patch.correctIndex !== undefined) merged.correctIndex = patch.correctIndex;
  if (patch.svgMarkup !== undefined) merged.svgMarkup = patch.svgMarkup;
  if (patch.stats !== undefined) merged.stats = patch.stats;
  if (patch.tableRows !== undefined) merged.tableRows = patch.tableRows;
  if (patch.badge !== undefined) merged.badge = patch.badge;
  if (patch.badges !== undefined) merged.badges = patch.badges;
  if (patch.table !== undefined) merged.table = patch.table;
  if (patch.gauges !== undefined) merged.gauges = patch.gauges;
  if (patch.gaugeTabs !== undefined) merged.gaugeTabs = patch.gaugeTabs;
  if (patch.steps !== undefined) merged.steps = patch.steps;
  if (patch.sections !== undefined) merged.sections = patch.sections;
  if (patch.calc !== undefined) merged.calc = patch.calc;
  return merged;
}

router.get('/:topicId', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const content = await primaryContentFor(pool, sql, Number(req.params.topicId));
  if (!content) return res.json([]);
  const rows = await getOrdered(pool, content.ContentId);
  res.json(rows.map(mapSlide));
}));

router.post('/:topicId', asyncHandler(async (req, res) => {
  const { topicId } = req.params;
  const atIndex = Number(req.body.atIndex);
  const pool = await getPool();
  const content = await primaryContentFor(pool, sql, Number(topicId));
  if (!content) return res.status(404).json({ error: 'No learning content exists for this topic yet' });
  const before = await getOrdered(pool, content.ContentId);
  const inserted = await pool.request().input('cid', sql.Int, content.ContentId).input('seq', sql.Int, 999999)
    .input('data', sql.NVarChar, JSON.stringify({ text: '' }))
    .query(`INSERT INTO dbo.Lms_LearningSlides (ContentId, Sequence, SlideType, Title, ContentData, CreatedAt, UpdatedAt)
            OUTPUT INSERTED.SlideId VALUES (@cid, @seq, 'text', 'New slide', @data, sysutcdatetime(), sysutcdatetime())`);
  const newSlideId = inserted.recordset[0].SlideId;
  const ordered = before.slice();
  ordered.splice(atIndex + 1, 0, { SlideId: newSlideId });
  await resequence(pool, ordered);
  await auditLog(pool, sql, { action: 'Content creation', entity: 'Slide', userId: req.body.actorId });
  reindex(topicId);
  res.status(201).json({ id: String(newSlideId) });
}));

router.put('/:topicId/:slideId', asyncHandler(async (req, res) => {
  const { topicId, slideId } = req.params;
  const p = req.body;
  const pool = await getPool();
  const existing = (await pool.request().input('id', sql.Int, Number(slideId)).query('SELECT * FROM dbo.Lms_LearningSlides WHERE SlideId=@id')).recordset[0];
  if (!existing) return res.status(404).json({ error: 'not found' });
  const existingData = JSON.parse(existing.ContentData || '{}');
  const merged = contentDataOf(p, existingData);
  const title = p.title ?? existing.Title;
  const type = p.type ?? existing.SlideType;
  await pool.request().input('id', sql.Int, Number(slideId)).input('title', sql.NVarChar, title).input('type', sql.NVarChar, type)
    .input('data', sql.NVarChar, JSON.stringify(merged))
    .query(`UPDATE dbo.Lms_LearningSlides SET Title=@title, SlideType=@type, ContentData=@data, UpdatedAt=sysutcdatetime() WHERE SlideId=@id`);
  reindex(topicId);
  res.json({ ok: true });
}));

router.post('/:topicId/:slideId/duplicate', asyncHandler(async (req, res) => {
  const { topicId, slideId } = req.params;
  const pool = await getPool();
  const content = await primaryContentFor(pool, sql, Number(topicId));
  if (!content) return res.status(404).json({ error: 'not found' });
  const before = await getOrdered(pool, content.ContentId);
  const idx = before.findIndex((r) => r.SlideId === Number(slideId));
  if (idx < 0) return res.status(404).json({ error: 'not found' });
  const src = before[idx];
  const inserted = await pool.request().input('cid', sql.Int, content.ContentId).input('seq', sql.Int, 999999)
    .input('title', sql.NVarChar, (src.Title || '') + ' (copy)').input('type', sql.NVarChar, src.SlideType)
    .input('data', sql.NVarChar, src.ContentData).input('media', sql.NVarChar, src.MediaReference)
    .query(`INSERT INTO dbo.Lms_LearningSlides (ContentId, Sequence, SlideType, Title, ContentData, MediaReference, CreatedAt, UpdatedAt)
            OUTPUT INSERTED.SlideId VALUES (@cid, @seq, @type, @title, @data, @media, sysutcdatetime(), sysutcdatetime())`);
  const newSlideId = inserted.recordset[0].SlideId;
  const ordered = before.slice();
  ordered.splice(idx + 1, 0, { SlideId: newSlideId });
  await resequence(pool, ordered);
  reindex(topicId);
  res.status(201).json({ id: String(newSlideId) });
}));

router.delete('/:topicId/:slideId', asyncHandler(async (req, res) => {
  const { topicId, slideId } = req.params;
  const pool = await getPool();
  const content = await primaryContentFor(pool, sql, Number(topicId));
  if (!content) return res.status(404).json({ error: 'not found' });
  const rows = await getOrdered(pool, content.ContentId);
  if (rows.length <= 1) return res.status(400).json({ error: 'cannot delete the only slide' });
  await pool.request().input('id', sql.Int, Number(slideId)).query('DELETE FROM dbo.Lms_LearningSlides WHERE SlideId=@id');
  await resequence(pool, await getOrdered(pool, content.ContentId));
  await auditLog(pool, sql, { action: 'Content modified', entity: 'Slide deleted', userId: req.query.actorId || req.body.actorId });
  reindex(topicId);
  res.json({ ok: true });
}));

router.post('/:topicId/reorder', asyncHandler(async (req, res) => {
  const { topicId } = req.params;
  const { from, to } = req.body;
  const pool = await getPool();
  const content = await primaryContentFor(pool, sql, Number(topicId));
  if (!content) return res.status(404).json({ error: 'not found' });
  const rows = await getOrdered(pool, content.ContentId);
  const [m] = rows.splice(from, 1);
  rows.splice(to, 0, m);
  await resequence(pool, rows);
  await auditLog(pool, sql, { action: 'Content modified', entity: 'Slide order', userId: req.body.actorId });
  res.json({ ok: true });
}));

router.post('/:topicId/move', asyncHandler(async (req, res) => {
  const { topicId } = req.params;
  const { index, dir } = req.body;
  const pool = await getPool();
  const content = await primaryContentFor(pool, sql, Number(topicId));
  if (!content) return res.status(404).json({ error: 'not found' });
  const rows = await getOrdered(pool, content.ContentId);
  const n = index + dir;
  if (n < 0 || n >= rows.length) return res.json({ ok: true });
  [rows[index], rows[n]] = [rows[n], rows[index]];
  await resequence(pool, rows);
  res.json({ ok: true });
}));

module.exports = router;
