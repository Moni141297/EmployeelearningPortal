/*
 * One-off: wipe the demo product/content/catalog/exam data from the shared idblms DB,
 * so a real Hard Worker product can be authored in its place. Backs up every row first.
 * Leaves Lms_Users, Lms_OtpRequests, Lms_AuditLogs, Lms_SchemaMigrations untouched.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { getPool } = require('../src/db');

// Leaf-first order, respecting FK dependencies.
const DELETE_ORDER = [
  'Lms_AssessmentAttemptAnswers',
  'Lms_ExaminationAnswers',
  'Lms_AssessmentAttempts',
  'Lms_Certificates',
  'Lms_ExaminationParticipants',
  'Lms_ExaminationEvents',
  'Lms_Assessments',
  'Lms_QuestionOptions',
  'Lms_AIMessages',
  'Lms_AIKnowledgeEntries',
  'Lms_ExpertQuestions',
  'Lms_AIConversations',
  'Lms_Questions',
  'Lms_LearningProgress',
  'Lms_LearningSlides',
  'Lms_LearningContents',
  'Lms_ContentEmbeddings',
  'Lms_SubCategories',
  'Lms_Products',
  'Lms_Categories',
];

async function main() {
  const pool = await getPool();
  const backup = {};

  console.log('--- Backing up current rows before deletion ---');
  for (const t of DELETE_ORDER) {
    const r = await pool.request().query(`SELECT * FROM dbo.${t}`);
    backup[t] = r.recordset;
    console.log(`  backed up ${t}: ${r.recordset.length} rows`);
  }

  const backupDir = path.join(__dirname, 'backups');
  fs.mkdirSync(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, `sample-content-backup-${Date.now()}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
  console.log(`\nBackup written to ${backupPath}\n`);

  console.log('--- Deleting in dependency order (single transaction) ---');
  const tx = new (require('mssql').Transaction)(pool);
  await tx.begin();
  try {
    for (const t of DELETE_ORDER) {
      const req = new (require('mssql').Request)(tx);
      const res = await req.query(`DELETE FROM dbo.${t}`);
      console.log(`  deleted from ${t}: ${res.rowsAffected[0]} rows`);
    }
    await tx.commit();
    console.log('\nTransaction committed.');
  } catch (e) {
    console.error('Error during delete, rolling back:', e.message);
    await tx.rollback();
    process.exit(1);
  }

  console.log('\n--- Post-delete row counts ---');
  for (const t of DELETE_ORDER) {
    const r = await pool.request().query(`SELECT COUNT(*) c FROM dbo.${t}`);
    console.log(`  ${t}: ${r.recordset[0].c}`);
  }

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
