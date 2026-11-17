/*
 * Deletes the dummy bulk-testing participant accounts seeded for QA load testing
 * (EmployeeId BULKTEST001-065, Department "QA-BulkTest-DELETE-ME", UserId 15-79).
 * Verified beforehand: zero assessment attempts, certificates, examination
 * participation/answers, expert questions, learning progress, or AI conversations
 * reference these users — only notifications (FK) and audit logs (no FK) do.
 */
require('dotenv').config();
const { sql, getPool } = require('../src/db');

const BULKTEST_USER_IDS = Array.from({ length: 65 }, (_, i) => i + 15); // 15..79

async function main() {
  const pool = await getPool();
  const ids = BULKTEST_USER_IDS.join(',');

  // Sanity-check: confirm every id in range is actually a BULKTEST account before touching anything.
  const check = await pool.request().query(`SELECT UserId, EmployeeId, Department FROM dbo.Lms_Users WHERE UserId IN (${ids})`);
  const bad = check.recordset.filter((r) => !/^BULKTEST\d+$/.test(r.EmployeeId) || r.Department !== 'QA-BulkTest-DELETE-ME');
  if (bad.length) {
    console.error('Aborting — unexpected rows in range:', JSON.stringify(bad, null, 2));
    process.exit(1);
  }
  console.log(`Confirmed ${check.recordset.length} bulk-test accounts (UserId ${BULKTEST_USER_IDS[0]}-${BULKTEST_USER_IDS[BULKTEST_USER_IDS.length - 1]}).`);

  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  try {
    const notifRes = await new sql.Request(transaction).query(`DELETE FROM dbo.Lms_Notifications WHERE UserId IN (${ids})`);
    console.log('  deleted', notifRes.rowsAffected[0], 'notifications');

    const userRes = await new sql.Request(transaction).query(`DELETE FROM dbo.Lms_Users WHERE UserId IN (${ids})`);
    console.log('  deleted', userRes.rowsAffected[0], 'users');

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }

  const remaining = await pool.request().query(`SELECT COUNT(*) AS c FROM dbo.Lms_Users WHERE EmployeeId LIKE 'BULKTEST%'`);
  console.log('Remaining BULKTEST users:', remaining.recordset[0].c);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
