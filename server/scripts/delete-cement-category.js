/*
 * Hard-deletes the "Cement" category (CategoryId 5), its products (Supergrade PPC,
 * Supercrete PSC) and their topics — including the real history attached to them
 * (certificates, exam attempts/events, expert questions, learner progress).
 * Requested and confirmed explicitly, overriding the app's normal
 * archive-and-no-history-first rule (see topicHistoryCounts in routes/catalog.js).
 */
require('dotenv').config();
const { sql, getPool } = require('../src/db');

const CATEGORY_ID = 5;
const PRODUCT_IDS = [20, 21];
const TOPIC_IDS = [22, 23, 24, 25];

async function main() {
  const pool = await getPool();

  // Sanity-check the ids still point at what we inspected earlier.
  const cat = (await pool.request().input('id', sql.Int, CATEGORY_ID).query('SELECT Name FROM dbo.Lms_Categories WHERE CategoryId=@id')).recordset[0];
  if (!cat || cat.Name !== 'Cement') {
    console.error('Aborting — CategoryId', CATEGORY_ID, 'is not "Cement" (found:', cat, ')');
    process.exit(1);
  }

  const scList = TOPIC_IDS.join(',');
  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  try {
    const req = () => new sql.Request(transaction);

    console.log('Deleting examination answers...');
    let r = await req().query(`DELETE FROM dbo.Lms_ExaminationAnswers WHERE EventId IN (SELECT EventId FROM dbo.Lms_ExaminationEvents WHERE SubCategoryId IN (${scList}))`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting examination participants...');
    r = await req().query(`DELETE FROM dbo.Lms_ExaminationParticipants WHERE EventId IN (SELECT EventId FROM dbo.Lms_ExaminationEvents WHERE SubCategoryId IN (${scList}))`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting certificates (by SubCategoryId or by EventId)...');
    r = await req().query(`DELETE FROM dbo.Lms_Certificates WHERE SubCategoryId IN (${scList}) OR EventId IN (SELECT EventId FROM dbo.Lms_ExaminationEvents WHERE SubCategoryId IN (${scList}))`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting examination events...');
    r = await req().query(`DELETE FROM dbo.Lms_ExaminationEvents WHERE SubCategoryId IN (${scList})`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting assessment attempt answers...');
    r = await req().query(`DELETE FROM dbo.Lms_AssessmentAttemptAnswers WHERE AttemptId IN (
      SELECT aa.AttemptId FROM dbo.Lms_AssessmentAttempts aa JOIN dbo.Lms_Assessments a ON a.AssessmentId = aa.AssessmentId WHERE a.SubCategoryId IN (${scList})
    )`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting assessment attempts...');
    r = await req().query(`DELETE FROM dbo.Lms_AssessmentAttempts WHERE AssessmentId IN (SELECT AssessmentId FROM dbo.Lms_Assessments WHERE SubCategoryId IN (${scList}))`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting expert questions...');
    r = await req().query(`DELETE FROM dbo.Lms_ExpertQuestions WHERE SubCategoryId IN (${scList})`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting learning progress...');
    r = await req().query(`DELETE FROM dbo.Lms_LearningProgress WHERE ContentId IN (SELECT ContentId FROM dbo.Lms_LearningContents WHERE SubCategoryId IN (${scList}))`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting content embeddings...');
    r = await req().query(`DELETE FROM dbo.Lms_ContentEmbeddings WHERE SubCategoryId IN (${scList})`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting AI knowledge entries...');
    r = await req().query(`DELETE FROM dbo.Lms_AIKnowledgeEntries WHERE SubCategoryId IN (${scList})`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting question options...');
    r = await req().query(`DELETE FROM dbo.Lms_QuestionOptions WHERE QuestionId IN (SELECT QuestionId FROM dbo.Lms_Questions WHERE SubCategoryId IN (${scList}))`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting questions...');
    r = await req().query(`DELETE FROM dbo.Lms_Questions WHERE SubCategoryId IN (${scList})`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting learning slides...');
    r = await req().query(`DELETE FROM dbo.Lms_LearningSlides WHERE ContentId IN (SELECT ContentId FROM dbo.Lms_LearningContents WHERE SubCategoryId IN (${scList}))`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting learning contents...');
    r = await req().query(`DELETE FROM dbo.Lms_LearningContents WHERE SubCategoryId IN (${scList})`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting assessments...');
    r = await req().query(`DELETE FROM dbo.Lms_Assessments WHERE SubCategoryId IN (${scList})`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting subcategories (topics)...');
    r = await req().query(`DELETE FROM dbo.Lms_SubCategories WHERE SubCategoryId IN (${scList})`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting products...');
    r = await req().query(`DELETE FROM dbo.Lms_Products WHERE ProductId IN (${PRODUCT_IDS.join(',')})`);
    console.log('  ', r.rowsAffected[0]);

    console.log('Deleting category...');
    r = await req().input('id', sql.Int, CATEGORY_ID).query(`DELETE FROM dbo.Lms_Categories WHERE CategoryId=@id`);
    console.log('  ', r.rowsAffected[0]);

    await transaction.commit();
    console.log('\nCommitted.');
  } catch (err) {
    await transaction.rollback();
    console.error('Rolled back due to error:', err.message);
    throw err;
  }

  const remaining = await pool.request().query('SELECT * FROM dbo.Lms_Categories ORDER BY CategoryId');
  console.log('\nFinal categories:', JSON.stringify(remaining.recordset, null, 2));
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
