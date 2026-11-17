require('dotenv').config();
const { getPool } = require('../src/db');

const TABLES = [
  'Lms_AIKnowledgeEntries', 'Lms_AssessmentAttemptAnswers', 'Lms_AssessmentAttempts', 'Lms_Assessments',
  'Lms_AuditLogs', 'Lms_Categories', 'Lms_Certificates', 'Lms_ExaminationAnswers', 'Lms_ExaminationEvents',
  'Lms_ExaminationParticipants', 'Lms_ExpertQuestions', 'Lms_LearningContents', 'Lms_LearningProgress',
  'Lms_LearningSlides', 'Lms_Notifications', 'Lms_OtpRequests', 'Lms_Products', 'Lms_QuestionOptions',
  'Lms_Questions', 'Lms_SubCategories', 'Lms_Users',
];

async function main() {
  const pool = await getPool();

  console.log('\n=== FOREIGN KEYS among Lms_* tables ===');
  const fkRes = await pool.request().query(`
    SELECT
      fk.name AS FKName,
      tp.name AS ChildTable,
      cp.name AS ChildColumn,
      tr.name AS ParentTable,
      cr.name AS ParentColumn
    FROM sys.foreign_keys fk
    JOIN sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
    JOIN sys.tables tp ON tp.object_id = fk.parent_object_id
    JOIN sys.tables tr ON tr.object_id = fk.referenced_object_id
    JOIN sys.columns cp ON cp.object_id = tp.object_id AND cp.column_id = fkc.parent_column_id
    JOIN sys.columns cr ON cr.object_id = tr.object_id AND cr.column_id = fkc.referenced_column_id
    WHERE tp.name LIKE 'Lms_%'
    ORDER BY tr.name, tp.name;
  `);
  for (const row of fkRes.recordset) {
    console.log(`  ${row.ChildTable}.${row.ChildColumn}  ->  ${row.ParentTable}.${row.ParentColumn}   (${row.FKName})`);
  }

  console.log('\n=== ROW COUNTS ===');
  for (const t of TABLES) {
    try {
      const r = await pool.request().query(`SELECT COUNT(*) AS c FROM dbo.${t}`);
      console.log(`  ${t}: ${r.recordset[0].c}`);
    } catch (e) {
      console.log(`  ${t}: ERROR (${e.message})`);
    }
  }

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
