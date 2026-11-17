/*
 * Removes the extra fictional demo employees (UserId 4-14) and renames the three
 * core prototype accounts (UserId 1,2,3) to real named people with their intended roles.
 * Keeps UserId 1/2/3 stable so existing CreatedBy/audit references stay valid.
 */
require('dotenv').config();
const { sql, getPool } = require('../src/db');

const EXTRA_IDS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const RENAMES = [
  { id: 1, emp: 'SATHYANARAYANAN', name: 'Sathyanarayanan', role: 'Admin' },
  { id: 2, emp: 'YESHWANTHINI', name: 'Yeshwanthini', role: 'Trainer' },
  { id: 3, emp: 'MONISHA', name: 'Monisha', role: 'Participant' },
];

async function main() {
  const pool = await getPool();

  console.log('Deleting notifications for the extra demo employees...');
  const notifRes = await pool.request()
    .query(`DELETE FROM dbo.Lms_Notifications WHERE UserId IN (${EXTRA_IDS.join(',')})`);
  console.log('  deleted', notifRes.rowsAffected[0], 'notifications');

  console.log('Deleting extra demo employee accounts...');
  const userRes = await pool.request()
    .query(`DELETE FROM dbo.Lms_Users WHERE UserId IN (${EXTRA_IDS.join(',')})`);
  console.log('  deleted', userRes.rowsAffected[0], 'users');

  console.log('Renaming core accounts to real users...');
  for (const u of RENAMES) {
    await pool.request().input('id', sql.Int, u.id).input('emp', sql.NVarChar, u.emp)
      .input('name', sql.NVarChar, u.name).input('role', sql.NVarChar, u.role)
      .query(`UPDATE dbo.Lms_Users SET EmployeeId=@emp, Name=@name, Role=@role WHERE UserId=@id`);
    console.log(`  UserId ${u.id} -> ${u.name} (${u.role}), EmployeeId=${u.emp}`);
  }

  console.log('\nFinal user list:');
  const final = await pool.request().query('SELECT UserId, EmployeeId, Name, Role, Status FROM dbo.Lms_Users ORDER BY UserId');
  console.log(JSON.stringify(final.recordset, null, 2));

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
