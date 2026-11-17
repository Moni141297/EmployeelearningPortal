const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler, auditLog } = require('../utils');
const { mapAudit } = require('../mappers');

const router = express.Router();

// Live audit trail. Optional ?q= filters on action/entity/user; ?limit= caps rows (max 1000).
router.get('/', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 200, 1), 1000);
  const q = String(req.query.q || '').trim();
  const r = pool.request().input('limit', sql.Int, limit);
  let where = '';
  if (q) {
    r.input('q', sql.NVarChar, '%' + q + '%');
    where = 'WHERE a.Action LIKE @q OR a.Entity LIKE @q OR u.Name LIKE @q OR u.EmployeeId LIKE @q';
  }
  const result = await r.query(`SELECT TOP (@limit) a.*, u.Name AS UserName, u.Role AS UserRole
    FROM dbo.Lms_AuditLogs a LEFT JOIN dbo.Lms_Users u ON u.UserId = a.UserId ${where} ORDER BY a.Timestamp DESC, a.LogId DESC`);
  res.json(result.recordset.map((row) => ({ ...mapAudit(row), userName: row.UserName || '', userRole: String(row.UserRole || '').toLowerCase() })));
}));

router.post('/', asyncHandler(async (req, res) => {
  const { action, entity, userId } = req.body;
  const pool = await getPool();
  await auditLog(pool, sql, { action, entity, userId });
  res.status(201).json({ ok: true });
}));

module.exports = router;
