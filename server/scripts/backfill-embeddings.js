// One-off: (re)builds the AI knowledge base for every existing topic. Run
// after creating dbo.Lms_ContentEmbeddings (see sql/2026_ai_embeddings.sql)
// and setting VOYAGE_API_KEY, or any time you want to force a full rebuild.
require('dotenv').config();
const { sql, getPool } = require('../src/db');
const { reindexTopic } = require('../src/lib/ingest');

(async () => {
  const pool = await getPool();
  const topics = (await pool.request().query('SELECT SubCategoryId FROM dbo.Lms_SubCategories')).recordset;
  for (const t of topics) {
    console.log('Indexing topic', t.SubCategoryId);
    await reindexTopic(t.SubCategoryId);
  }
  console.log(`Done — indexed ${topics.length} topic(s).`);
  process.exit(0);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
