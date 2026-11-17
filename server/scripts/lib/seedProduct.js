/*
 * Reusable helper for seeding one Hard Worker product (Category -> Product -> Topic ->
 * LearningContent -> Slides -> Assessment config) into the real idblms database, matching
 * the exact table/column shapes already used by HW211/HW205/HW101/HW305-306.
 *
 * Usage: see scripts/seed-hw103.js for a thin wrapper around this.
 */
require('dotenv').config();
const { sql, getPool } = require('../../src/db');

const HARDWORKER_CATEGORY_ID = 4;
const TRAINER_ID = 2;

async function insertSlide(pool, contentId, seq, type, title, data) {
  await pool.request().input('cid', sql.Int, contentId).input('seq', sql.Int, seq)
    .input('type', sql.NVarChar, type).input('title', sql.NVarChar, title)
    .input('data', sql.NVarChar, JSON.stringify(data))
    .query(`INSERT INTO dbo.Lms_LearningSlides (ContentId, Sequence, SlideType, Title, ContentData, CreatedAt, UpdatedAt)
            VALUES (@cid, @seq, @type, @title, @data, sysutcdatetime(), sysutcdatetime())`);
}

/**
 * @param {object} spec
 * @param {string} spec.productName e.g. 'HW103 Waterproofing Coat'
 * @param {string} spec.productDescription
 * @param {string} [spec.topicName] default 'Product Knowledge & Application'
 * @param {string} [spec.topicDescription]
 * @param {number} [spec.assessmentQuestionCount]
 * @param {number} [spec.assessmentPassPercentage]
 * @param {number} [spec.assessmentDefaultTimeLimitSec]
 * @param {Array<{type:string,title:string,data:object}>} spec.slides
 */
async function seedProduct(spec) {
  const pool = await getPool();

  console.log('Creating Product...');
  const prodIns = await pool.request().input('cat', sql.Int, HARDWORKER_CATEGORY_ID)
    .input('name', sql.NVarChar, spec.productName)
    .input('desc', sql.NVarChar, spec.productDescription)
    .query(`INSERT INTO dbo.Lms_Products (CategoryId, Name, Description, Status, CreatedAt) OUTPUT INSERTED.ProductId
            VALUES (@cat, @name, @desc, 'Active', sysutcdatetime())`);
  const productId = prodIns.recordset[0].ProductId;
  console.log('  ProductId =', productId);

  console.log('Creating Topic (SubCategory)...');
  const topicName = spec.topicName || 'Product Knowledge & Application';
  const topicIns = await pool.request().input('prod', sql.Int, productId)
    .input('name', sql.NVarChar, topicName)
    .input('desc', sql.NVarChar, spec.topicDescription || null)
    .query(`INSERT INTO dbo.Lms_SubCategories (ProductId, Name, Description, Status, CreatedAt) OUTPUT INSERTED.SubCategoryId
            VALUES (@prod, @name, @desc, 'Published', sysutcdatetime())`);
  const topicId = topicIns.recordset[0].SubCategoryId;
  console.log('  SubCategoryId =', topicId);

  console.log('Creating Assessment config...');
  await pool.request().input('sc', sql.Int, topicId)
    .input('name', sql.NVarChar, `${topicName} Self-Assessment`)
    .input('count', sql.Int, spec.assessmentQuestionCount)
    .input('pass', sql.Decimal(5, 2), spec.assessmentPassPercentage)
    .input('defTime', sql.Int, spec.assessmentDefaultTimeLimitSec || 30)
    .input('createdBy', sql.Int, TRAINER_ID)
    .query(`INSERT INTO dbo.Lms_Assessments (SubCategoryId, Name, QuestionCount, PassPercentage, DefaultTimeLimitSec, Status, CreatedBy, CreatedAt, Mode, LeaderboardVisible, ResultVisible, CertificateEligible)
            VALUES (@sc, @name, @count, @pass, @defTime, 'Active', @createdBy, sysutcdatetime(), 'Open', 1, 1, 0)`);

  console.log('Creating LearningContent...');
  const contentIns = await pool.request().input('sc', sql.Int, topicId).input('title', sql.NVarChar, topicName)
    .input('createdBy', sql.Int, TRAINER_ID)
    .query(`INSERT INTO dbo.Lms_LearningContents (SubCategoryId, Title, Status, Version, CreatedBy, CreatedAt, UpdatedAt, PublishedAt)
            OUTPUT INSERTED.ContentId
            VALUES (@sc, @title, 'Published', 1, @createdBy, sysutcdatetime(), sysutcdatetime(), sysutcdatetime())`);
  const contentId = contentIns.recordset[0].ContentId;
  console.log('  ContentId =', contentId);

  console.log(`Creating ${spec.slides.length} slides...`);
  let seq = 0;
  for (const slide of spec.slides) {
    await insertSlide(pool, contentId, seq++, slide.type, slide.title, slide.data);
  }
  console.log(`  ${seq} slides created`);

  console.log('\nDone. ProductId:', productId, '| SubCategoryId:', topicId, '| ContentId:', contentId);
  return { productId, topicId, contentId };
}

module.exports = { seedProduct, HARDWORKER_CATEGORY_ID, TRAINER_ID };
