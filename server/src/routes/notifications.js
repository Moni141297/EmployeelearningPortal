const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler } = require('../utils');
const { mapNotif } = require('../mappers');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const pool = await getPool();
  const userId = req.query.user;
  const request = pool.request();
  let query = 'SELECT * FROM dbo.Lms_Notifications';
  if (userId) { request.input('u', sql.Int, Number(userId)); query += ' WHERE UserId=@u'; }
  query += ' ORDER BY CreatedAt DESC';
  const result = await request.query(query);
  res.json(result.recordset.map(mapNotif));
}));

router.post('/', asyncHandler(async (req, res) => {
  const { userId, txt } = req.body;
  const pool = await getPool();
  const inserted = await pool.request().input('u', sql.Int, Number(userId)).input('txt', sql.NVarChar, txt)
    .query(`INSERT INTO dbo.Lms_Notifications (UserId, Message, IsRead, CreatedAt) OUTPUT INSERTED.NotificationId VALUES (@u, @txt, 0, sysutcdatetime())`);
  res.status(201).json({ id: String(inserted.recordset[0].NotificationId) });
}));

router.post('/mark-read', asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const pool = await getPool();
  await pool.request().input('u', sql.Int, Number(userId)).query('UPDATE dbo.Lms_Notifications SET IsRead=1 WHERE UserId=@u');
  res.json({ ok: true });
}));

module.exports = router;
