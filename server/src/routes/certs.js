const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler, auditLog, issueCertificateIfEligible } = require('../utils');
const { mapCert } = require('../mappers');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const result = await pool.request().query('SELECT * FROM dbo.Lms_Certificates');
  res.json(result.recordset.map(mapCert));
}));

// Kept for the frontend's own post-grading call (belt-and-braces alongside
// the server-side issuance in events.js'/:id/complete-participant and
// exam.js's /attempts — see issueCertificateIfEligible) — this one is
// idempotent too, so a race between the two never double-issues.
router.post('/', asyncHandler(async (req, res) => {
  const o = req.body;
  const pool = await getPool();
  // A self assessment pass has no EventId (it isn't a scheduled event) — NULL
  // there, and matched with "IS NULL" since SQL's own `=` never matches NULL.
  const eventId = o.event !== null && o.event !== undefined ? Number(o.event) : null;
  const certNumber = await issueCertificateIfEligible(pool, sql, {
    userId: o.user, topicId: o.topic, eventId, score: o.score, result: 'Pass', certEligible: true,
  });
  res.status(201).json({ id: certNumber });
}));

router.post('/:id/toggle-revoke', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pool = await getPool();
  const row = (await pool.request().input('id', sql.NVarChar, id).query('SELECT * FROM dbo.Lms_Certificates WHERE CertificateNumber=@id')).recordset[0];
  if (!row) return res.status(404).json({ error: 'not found' });
  if (row.Status === 'Issued') {
    await pool.request().input('id', sql.NVarChar, id).input('by', sql.Int, req.body.actorId ? Number(req.body.actorId) : null)
      .query(`UPDATE dbo.Lms_Certificates SET Status='Revoked', RevokedAt=sysutcdatetime(), RevokedBy=@by WHERE CertificateNumber=@id`);
  } else {
    await pool.request().input('id', sql.NVarChar, id)
      .query(`UPDATE dbo.Lms_Certificates SET Status='Issued', RevokedAt=NULL, RevokedBy=NULL WHERE CertificateNumber=@id`);
  }
  await auditLog(pool, sql, { action: 'Certificate status changed', entity: 'Certificate ' + id, userId: req.body.actorId });
  res.json({ ok: true });
}));

module.exports = router;
