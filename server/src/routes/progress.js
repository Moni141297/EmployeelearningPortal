const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler, auditLog, primaryContentFor } = require('../utils');

const router = express.Router();

// Note: Lms_LearningProgress tracks a slide COUNT (SlidesViewed) and LastSlideId,
// not the set of individual slide ids viewed. The frontend's ProgressEntry wants a
// `viewed: string[]` list (to show a checkmark per slide and compute percent done).
// We approximate it as the first N slide ids in sequence order, where N = SlidesViewed —
// this is exact for the normal "view slides in order" flow the UI drives, but would
// not reflect out-of-order viewing precisely.
router.get('/:userId', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const rows = (await pool.request().input('u', sql.Int, Number(req.params.userId))
    .query('SELECT * FROM dbo.Lms_LearningProgress WHERE UserId=@u')).recordset;
  const out = {};
  for (const r of rows) {
    const contentRow = (await pool.request().input('c', sql.Int, r.ContentId).query('SELECT SubCategoryId FROM dbo.Lms_LearningContents WHERE ContentId=@c')).recordset[0];
    if (!contentRow) continue;
    const slideIds = (await pool.request().input('c', sql.Int, r.ContentId)
      .query('SELECT SlideId FROM dbo.Lms_LearningSlides WHERE ContentId=@c ORDER BY Sequence ASC')).recordset.map((s) => String(s.SlideId));
    out[req.params.userId + ':' + contentRow.SubCategoryId] = { viewed: slideIds.slice(0, r.SlidesViewed), done: r.Status === 'Completed' };
  }
  res.json(out);
}));

// Two slide-view calls for the same user+content can land close enough
// together (e.g. a fast double-click, or two tabs) that both see "no existing
// row" and both try to INSERT, tripping the UNIQUE(UserId, ContentId)
// constraint and failing the second request with a 500. Update first; only
// insert if nothing was there to update, and if a concurrent request won that
// race in between, fall back to the update instead of failing the request.
async function upsertProgress(pool, userId, contentId, fields) {
  const { viewed, total, pct, status } = fields;
  const update = () => pool.request().input('u', sql.Int, userId).input('c', sql.Int, contentId)
    .input('viewed', sql.Int, viewed).input('total', sql.Int, total).input('pct', sql.Decimal(5, 2), pct).input('status', sql.NVarChar, status)
    .query(`UPDATE dbo.Lms_LearningProgress SET SlidesViewed=@viewed, TotalSlides=@total, PercentComplete=@pct, Status=@status,
            CompletedAt = CASE WHEN @status='Completed' THEN sysutcdatetime() ELSE CompletedAt END, UpdatedAt=sysutcdatetime()
            WHERE UserId=@u AND ContentId=@c`);

  const result = await update();
  if (result.rowsAffected[0] > 0) return;
  try {
    await pool.request().input('u', sql.Int, userId).input('c', sql.Int, contentId).input('viewed', sql.Int, viewed)
      .input('total', sql.Int, total).input('pct', sql.Decimal(5, 2), pct).input('status', sql.NVarChar, status)
      .query(`INSERT INTO dbo.Lms_LearningProgress (UserId, ContentId, Status, SlidesViewed, TotalSlides, PercentComplete, StartedAt, CompletedAt, UpdatedAt)
              VALUES (@u, @c, @status, @viewed, @total, @pct, sysutcdatetime(), CASE WHEN @status='Completed' THEN sysutcdatetime() ELSE NULL END, sysutcdatetime())`);
  } catch (err) {
    if (err.number !== 2627 && err.number !== 2601) throw err; // not a unique-constraint violation
    await update();
  }
}

router.post('/view-slide', asyncHandler(async (req, res) => {
  const { userId, topicId, viewedCount } = req.body;
  const pool = await getPool();
  const content = await primaryContentFor(pool, sql, Number(topicId));
  if (!content) return res.json({ ok: true });
  const total = (await pool.request().input('c', sql.Int, content.ContentId).query('SELECT COUNT(*) AS n FROM dbo.Lms_LearningSlides WHERE ContentId=@c')).recordset[0].n;
  const pct = total ? Math.round((viewedCount / total) * 10000) / 100 : 0;
  const status = viewedCount >= total ? 'Completed' : 'InProgress';
  await upsertProgress(pool, Number(userId), content.ContentId, { viewed: viewedCount, total, pct, status });
  res.json({ ok: true });
}));

router.post('/complete', asyncHandler(async (req, res) => {
  const { userId, topicId } = req.body;
  const pool = await getPool();
  const content = await primaryContentFor(pool, sql, Number(topicId));
  if (!content) return res.json({ ok: true });
  const total = (await pool.request().input('c', sql.Int, content.ContentId).query('SELECT COUNT(*) AS n FROM dbo.Lms_LearningSlides WHERE ContentId=@c')).recordset[0].n;
  await upsertProgress(pool, Number(userId), content.ContentId, { viewed: total, total, pct: 100, status: 'Completed' });
  await auditLog(pool, sql, { action: 'Learning completed', entity: 'Topic ' + topicId, userId });
  res.json({ ok: true });
}));

module.exports = router;
