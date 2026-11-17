/*
 * Seeds the real "HW101 Integral Waterproofing" product (Hard Worker range) into the
 * now-empty catalog, using only facts from the supplied TDS/brochure/PPT source files.
 * Category -> Product -> Topic -> LearningContent -> Slides (incl. video + doc links) -> Quiz.
 */
require('dotenv').config();
const { sql, getPool } = require('../src/db');

const TRAINER_ID = 2; // Default Trainer — still exists, untouched by the reset script.
const VIDEO_URL = '/products/hw101-integral-waterproofing/video.mp4';
const BROCHURE_URL = '/products/hw101-integral-waterproofing/brochure.pdf';
const TDS_URL = '/products/hw101-integral-waterproofing/tds.pdf';

async function insertSlide(pool, contentId, seq, type, title, data) {
  await pool.request().input('cid', sql.Int, contentId).input('seq', sql.Int, seq)
    .input('type', sql.NVarChar, type).input('title', sql.NVarChar, title)
    .input('data', sql.NVarChar, JSON.stringify(data))
    .query(`INSERT INTO dbo.Lms_LearningSlides (ContentId, Sequence, SlideType, Title, ContentData, CreatedAt, UpdatedAt)
            VALUES (@cid, @seq, @type, @title, @data, sysutcdatetime(), sysutcdatetime())`);
}

async function insertQuestion(pool, subCategoryId, q) {
  const correctAnswerData = q.type === 'fill' ? JSON.stringify(q.ans || []) : null;
  const QTYPE_TO_DB = {
    single: 'MCQSingle', multi: 'MCQMultiple', tf: 'TrueFalse', yn: 'YesNo',
    fill: 'FillInBlank', image: 'ImageBased', scenario: 'ScenarioBased', match: 'MatchTheFollowing',
  };
  const inserted = await pool.request()
    .input('sc', sql.Int, subCategoryId).input('type', sql.NVarChar, QTYPE_TO_DB[q.type])
    .input('text', sql.NVarChar, q.text).input('weight', sql.Decimal(6, 2), q.marks || 1)
    .input('defTime', sql.Int, 45).input('indivTime', sql.Int, q.time ?? null)
    .input('mand', sql.Bit, !!q.mandatory).input('explain', sql.NVarChar, q.explain || null)
    .input('diff', sql.NVarChar, q.diff || 'Medium').input('correctData', sql.NVarChar, correctAnswerData)
    .input('media', sql.NVarChar, null).input('createdBy', sql.Int, TRAINER_ID)
    .query(`INSERT INTO dbo.Lms_Questions (SubCategoryId, QuestionType, QuestionText, Weightage, DefaultTimeLimitSec, IndividualTimeLimitSec,
              IsMandatory, Explanation, Difficulty, Status, CorrectAnswerData, MediaReference, CreatedBy, CreatedAt, UpdatedAt)
            OUTPUT INSERTED.QuestionId
            VALUES (@sc, @type, @text, @weight, @defTime, @indivTime, @mand, @explain, @diff, 'Active', @correctData, @media, @createdBy, sysutcdatetime(), sysutcdatetime())`);
  const qid = inserted.recordset[0].QuestionId;

  if (q.type === 'match') {
    for (let i = 0; i < q.pairs.length; i++) {
      await pool.request().input('qid', sql.Int, qid).input('text', sql.NVarChar, q.pairs[i][0])
        .input('key', sql.NVarChar, q.pairs[i][1]).input('seq', sql.Int, i)
        .query(`INSERT INTO dbo.Lms_QuestionOptions (QuestionId, OptionText, IsCorrect, Sequence, MatchKey) VALUES (@qid, @text, 0, @seq, @key)`);
    }
  } else if (q.type !== 'fill') {
    const answers = new Set((q.ans || []));
    for (let i = 0; i < q.opts.length; i++) {
      await pool.request().input('qid', sql.Int, qid).input('text', sql.NVarChar, q.opts[i])
        .input('correct', sql.Bit, answers.has(i)).input('seq', sql.Int, i)
        .query(`INSERT INTO dbo.Lms_QuestionOptions (QuestionId, OptionText, IsCorrect, Sequence) VALUES (@qid, @text, @correct, @seq)`);
    }
  }
  return qid;
}

const QUESTIONS = [
  { type: 'single', diff: 'Easy', marks: 1, mandatory: true,
    text: 'What is Hard Worker Integral Waterproofing (HW101)?',
    opts: ['A liquid admixture engineered for concrete durability', 'A surface-applied waterproof paint', 'A curing compound sprayed after casting', 'A tile adhesive'],
    ans: [0], explain: 'HW101 is a liquid admixture mixed into concrete, not a surface coating.' },
  { type: 'tf', diff: 'Easy', marks: 1,
    text: 'HW101 can be used as a surface-applied waterproof coating on finished concrete.',
    opts: ['True', 'False'], ans: [1],
    explain: 'The TDS explicitly states: "HW101 is not a surface-applied waterproof coating. This product is intended only for integral use within concrete."' },
  { type: 'single', diff: 'Medium', marks: 1, mandatory: true,
    text: 'What is the recommended dosage of HW101 for a standard 50 Kg bag of cement?',
    opts: ['Up to 50 ml', 'Up to 100 ml', 'Up to 200 ml', 'Up to 500 ml'],
    ans: [2], explain: 'Recommended dosage: up to 200 ml of HW101 per 50 Kg bag of cement.' },
  { type: 'fill', diff: 'Medium', marks: 1,
    text: 'HW101 conforms to IS ______ (give the IS specification number, e.g. 1234:2003).',
    ans: ['2645:2003', '2645'], explain: 'HW101 conforms to IS 2645:2003.' },
  { type: 'single', diff: 'Medium', marks: 1,
    text: 'By how much does HW101 typically increase compressive strength, per its technical specification?',
    opts: ['1 - 5%', '10 - 20%', '50 - 60%', 'No measurable effect'],
    ans: [1], explain: 'Technical Specification: Compressive Strength increases by 10 - 20%.' },
  { type: 'multi', diff: 'Medium', marks: 2,
    text: 'Which of the following are benefits of HW101 highlighted in its product literature? (Select all that apply)',
    opts: ['Reduces porosity', 'Resists steel corrosion', 'Improves workability', 'Increases concrete setting time'],
    ans: [0, 1, 2], explain: 'HW101 reduces porosity, resists steel corrosion and improves workability — and the brochure notes it "does not affect setting time" (so increasing setting time is not a benefit it provides).' },
  { type: 'yn', diff: 'Easy', marks: 1,
    text: 'Is HW101 compatible with all types of cement?',
    opts: ['Yes', 'No'], ans: [0], explain: 'HW101 is compatible with all types of cement, per both the TDS and brochure.' },
  { type: 'single', diff: 'Easy', marks: 1,
    text: 'Which application areas is HW101 recommended for?',
    opts: ['Foundations, Columns, Beams, Roof slabs', 'Swimming pool tiles only', 'Exterior wall paint finishing', 'Roofing sheets'],
    ans: [0], explain: 'Recommended for all concrete structures where internal waterproofing is essential: Foundations, Columns, Beams, Roof slabs.' },
  { type: 'single', diff: 'Hard', marks: 1,
    text: 'What is the shelf life of HW101 in unopened, sealed containers?',
    opts: ['6 months', '12 months', '24 months', '36 months'],
    ans: [2], explain: 'Shelf life: 24 months from the date of manufacture in unopened, sealed containers, stored between +10°C and +50°C.' },
  { type: 'scenario', diff: 'Hard', marks: 2, mandatory: true,
    text: 'A site engineer is batching concrete using RAMCO SUPERCRETE cement. What dosage of HW101 should be used instead of the standard 200 ml per 50 Kg bag?',
    opts: ['Still use 200 ml', '75 ml to 100 ml', '300 ml', 'HW101 is not needed with Supercrete'],
    ans: [1], explain: 'Brochure note: "Only 75 ml to 100 ml is required for RAMCO SUPERCRETE."' },
  { type: 'single', diff: 'Medium', marks: 1,
    text: 'What is the physical appearance of HW101 per its technical specification?',
    opts: ['White paste', 'Free-flowing, transparent liquid', 'Grey powder', 'Blue gel'],
    ans: [1], explain: 'Technical Specification: Appearance — Free-flowing liquid; Colour — Transparent.' },
  { type: 'match', diff: 'Medium', marks: 2,
    text: 'Match each HW101 benefit to how the product literature explains it works.',
    pairs: [
      ['Reduces porosity', 'Densifies the concrete mix, reducing the paths water usually takes'],
      ['Resists steel corrosion', 'Cuts water ingress, lowering the risk of rust in reinforcement bars'],
      ['Improves workability', 'Reduces water needed while keeping the concrete smooth and cohesive'],
      ['Increases compressive strength', 'Optimises the water-cement ratio to strengthen concrete by 10-20%'],
    ],
    explain: 'All four mechanisms are drawn directly from the "Why HW Integral Waterproofing?" section of the brochure.' },
];

async function main() {
  const pool = await getPool();

  console.log('Creating Category...');
  const catIns = await pool.request().input('name', sql.NVarChar, 'Hard Worker')
    .input('desc', sql.NVarChar, 'Hard Worker construction chemical solutions — waterproofing, tile fixing, grouting, concrete repair and bonding systems.')
    .query(`INSERT INTO dbo.Lms_Categories (Name, Description, Status, CreatedAt) OUTPUT INSERTED.CategoryId
            VALUES (@name, @desc, 'Active', sysutcdatetime())`);
  const categoryId = catIns.recordset[0].CategoryId;
  console.log('  CategoryId =', categoryId);

  console.log('Creating Product...');
  const prodIns = await pool.request().input('cat', sql.Int, categoryId)
    .input('name', sql.NVarChar, 'HW101 Integral Waterproofing')
    .input('desc', sql.NVarChar, 'Liquid admixture engineered for concrete durability — improves cohesion, reduces permeability, and enhances compressive strength.')
    .query(`INSERT INTO dbo.Lms_Products (CategoryId, Name, Description, Status, CreatedAt) OUTPUT INSERTED.ProductId
            VALUES (@cat, @name, @desc, 'Active', sysutcdatetime())`);
  const productId = prodIns.recordset[0].ProductId;
  console.log('  ProductId =', productId);

  console.log('Creating Topic (SubCategory)...');
  const topicIns = await pool.request().input('prod', sql.Int, productId)
    .input('name', sql.NVarChar, 'Product Knowledge & Application')
    .input('desc', sql.NVarChar, 'Everything a sales, technical-services or site team member needs to know about HW101 Integral Waterproofing: what it is, how it works, correct dosage and application, and its technical specification.')
    .query(`INSERT INTO dbo.Lms_SubCategories (ProductId, Name, Description, Status, CreatedAt) OUTPUT INSERTED.SubCategoryId
            VALUES (@prod, @name, @desc, 'Published', sysutcdatetime())`);
  const topicId = topicIns.recordset[0].SubCategoryId;
  console.log('  SubCategoryId =', topicId);

  console.log('Creating Assessment config...');
  await pool.request().input('sc', sql.Int, topicId).input('name', sql.NVarChar, 'Product Knowledge & Application Self-Assessment')
    .input('count', sql.Int, 10).input('pass', sql.Decimal(5, 2), 60).input('defTime', sql.Int, 45)
    .input('createdBy', sql.Int, TRAINER_ID)
    .query(`INSERT INTO dbo.Lms_Assessments (SubCategoryId, Name, QuestionCount, PassPercentage, DefaultTimeLimitSec, Status, CreatedBy, CreatedAt)
            VALUES (@sc, @name, @count, @pass, @defTime, 'Active', @createdBy, sysutcdatetime())`);

  console.log('Creating LearningContent...');
  const contentIns = await pool.request().input('sc', sql.Int, topicId).input('title', sql.NVarChar, 'Product Knowledge & Application')
    .input('createdBy', sql.Int, TRAINER_ID)
    .query(`INSERT INTO dbo.Lms_LearningContents (SubCategoryId, Title, Status, Version, CreatedBy, CreatedAt, UpdatedAt, PublishedAt)
            OUTPUT INSERTED.ContentId
            VALUES (@sc, @title, 'Published', 1, @createdBy, sysutcdatetime(), sysutcdatetime(), sysutcdatetime())`);
  const contentId = contentIns.recordset[0].ContentId;
  console.log('  ContentId =', contentId);

  console.log('Creating slides...');
  let seq = 0;
  await insertSlide(pool, contentId, seq++, 'text', 'What Is HW101 Integral Waterproofing?', {
    text: 'Hard Worker Integral Waterproofing — HW101 is a liquid admixture engineered for concrete durability. It improves cohesion, reduces permeability, and enhances compressive strength by optimizing the water-cement ratio.\n\nWhen used as directed, it forms a dense, waterproof matrix within the concrete mass — extending structural life and resisting corrosion from within. It does all of this without changing the concreting process.',
    explanation: 'HW101 conforms to IS 2645:2003 and is compatible with all types of cement.',
  });
  await insertSlide(pool, contentId, seq++, 'text', 'Key Benefits', {
    text: 'HW101 is built around four core benefits, each verified under standard lab conditions:',
    list: [
      'Reduces porosity — fewer internal voids mean less water enters and far less damage follows.',
      'Resists steel corrosion — cutting water ingress lowers the risk of rust in reinforcement bars.',
      'Improves workability — compatible with all cement types, reduces water needed, keeps concrete smooth, and does not affect setting time.',
      'Increases compressive strength — by 10 - 20% versus untreated concrete.',
    ],
  });
  await insertSlide(pool, contentId, seq++, 'video', 'Application Video', {
    videoUrl: VIDEO_URL,
    caption: 'Official Hard Worker application video for HW101 Integral Waterproofing.',
  });
  await insertSlide(pool, contentId, seq++, 'text', 'Mixing & Application Steps', {
    text: 'Follow this sequence for every batch:',
    list: [
      'Mix cement, sand and aggregates in a drum mixer.',
      'Add 70% of the required water and mix until uniformly moist. Do not add HW101 to a dry concrete mix.',
      'Add up to 200 ml of HW101 per 50 Kg bag of cement (only 75-100 ml for RAMCO SUPERCRETE). Adjust dosage for cement type.',
      'Add the remaining water as needed to reach the desired consistency.',
      'Mix thoroughly for 2-3 minutes until the blend is homogeneous.',
      'Use the mix immediately for laying.',
    ],
    explanation: 'Not suitable for waterproof coating surface application — HW101 is designed for fresh concrete mixes, screed mortar and plastering only.',
  });
  await insertSlide(pool, contentId, seq++, 'text', 'Technical Specification', {
    text: 'Typical results under standard lab conditions:',
    list: [
      'Appearance: Free-flowing liquid · Colour: Transparent',
      'Specific Gravity: 1.0 - 1.1',
      'Total Solids: 25 - 30%',
      'Water Reduction: 8 - 10%',
      'Chloride Content (IS 2645:2003): < 2%',
      'Water Permeability (IS 2645:2003): Reduced permeability',
      'Workability: Increased cohesion at lower water-cement ratio',
      'Compressive Strength: Increases by 10 - 20%',
    ],
  });
  await insertSlide(pool, contentId, seq++, 'text', 'Dosage, Packaging & Shelf Life', {
    text: 'Recommended dosage: up to 200 ml per 50 Kg bag of cement, adjusted based on cement type, site mix design or performance needs via batch trials. Only 75-100 ml is required for RAMCO SUPERCRETE.',
    list: [
      'Packaging: available in 1L, 5L, 10L and 20L packs.',
      'Shelf life: 24 months from date of manufacture in unopened, sealed containers.',
      'Storage: between +10°C and +50°C in dry conditions. Protect from sunlight and frost.',
    ],
  });
  await insertSlide(pool, contentId, seq++, 'text', 'Precautions & Technical Support', {
    text: 'HW101 is non-hazardous and non-flammable. Use gloves, goggles and standard protective gear. In case of eye contact, rinse immediately with clean water and seek medical attention if needed.',
    key: 'HW101 is not a surface-applied waterproof coating — it is intended only for integral use within concrete.',
    explanation: 'Technical Support — Toll Free: 1800 202 5700 · Email: customercare@ramcocements.co.in',
  });
  await insertSlide(pool, contentId, seq++, 'text', 'Brochure & Technical Data Sheet', {
    text: 'Download the official Hard Worker reference documents for HW101 Integral Waterproofing:',
    links: [
      { label: 'Product Brochure (PDF)', url: BROCHURE_URL },
      { label: 'Technical Data Sheet (PDF)', url: TDS_URL },
    ],
  });
  console.log(`  ${seq} slides created`);

  console.log('Creating questions...');
  for (const q of QUESTIONS) {
    const qid = await insertQuestion(pool, topicId, q);
    console.log(`  QuestionId ${qid}: ${q.text.slice(0, 60)}...`);
  }

  console.log('\nDone. Topic ID:', topicId, '| Product ID:', productId, '| Category ID:', categoryId);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
