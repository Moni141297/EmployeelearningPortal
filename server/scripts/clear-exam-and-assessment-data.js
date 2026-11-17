/*
 * Clears all Self Assessment and Examination DATA (attempts, events,
 * participants, answers, and any certificates tied to them) per explicit
 * request — the Self Assessment, Examinations and Admin pages/features stay
 * exactly as they are; only the accumulated records are wiped so each starts
 * from a clean slate. Does not touch Users, Topics, Products, Categories,
 * Questions, Learning Content/Progress, Audit Logs or Notifications.
 */
require('dotenv').config();
const { sql, getPool } = require('../src/db');

async function main() {
  const pool = await getPool();
  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  try {
    const req = () => new sql.Request(transaction);
    let r;

    console.log('Deleting certificates tied to examinations/self-assessments...');
    r = await req().query('DELETE FROM dbo.Lms_Certificates');
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting examination answers...');
    r = await req().query('DELETE FROM dbo.Lms_ExaminationAnswers');
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting examination participants...');
    r = await req().query('DELETE FROM dbo.Lms_ExaminationParticipants');
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting examination events...');
    r = await req().query('DELETE FROM dbo.Lms_ExaminationEvents');
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting self-assessment attempt answers...');
    r = await req().query('DELETE FROM dbo.Lms_AssessmentAttemptAnswers');
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting self-assessment attempts...');
    r = await req().query('DELETE FROM dbo.Lms_AssessmentAttempts');
    console.log('  ', r.rowsAffected[0]);

    await transaction.commit();
    console.log('\nCommitted.');
  } catch (err) {
    await transaction.rollback();
    console.error('Rolled back due to error:', err.message);
    throw err;
  }

  const counts = {};
  for (const t of ['Lms_AssessmentAttempts', 'Lms_AssessmentAttemptAnswers', 'Lms_ExaminationEvents', 'Lms_ExaminationParticipants', 'Lms_ExaminationAnswers', 'Lms_Certificates']) {
    counts[t] = (await pool.request().query('SELECT COUNT(*) c FROM dbo.' + t)).recordset[0].c;
  }
  console.log('\nFinal counts:', JSON.stringify(counts, null, 2));
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
