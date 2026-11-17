const { getPool } = require('../db');

// The whole knowledge base kept in memory — loaded once at startup, kept in
// sync by reindexTopic() on every content change. A participant's question
// never touches SQL for this; querying it fresh per question doesn't scale
// to hundreds of concurrent participants, and this keeps retrieval latency
// independent of database round-trip time entirely.
let cache = [];
let loaded = false;

async function loadCache() {
  try {
    const pool = await getPool();
    const rows = (await pool.request().query('SELECT SubCategoryId, ChunkText, Vector FROM dbo.Lms_ContentEmbeddings')).recordset;
    cache = rows.map((r) => ({ subCategoryId: r.SubCategoryId, text: r.ChunkText, vector: JSON.parse(r.Vector) }));
    loaded = true;
    console.log(`AI knowledge base cache loaded: ${cache.length} chunks.`);
  } catch (err) {
    // dbo.Lms_ContentEmbeddings may not exist yet (see sql/2026_ai_embeddings.sql).
    console.warn('AI knowledge base cache not loaded (table missing or DB unavailable):', err.message);
    cache = [];
    loaded = false;
  }
}

function getAll() {
  return cache;
}

function isLoaded() {
  return loaded;
}

// Called by reindexTopic() right after it rewrites one topic's rows in SQL —
// swaps that topic's slice of the in-memory cache without a full DB reload.
function replaceTopic(subCategoryId, chunks) {
  const id = Number(subCategoryId);
  cache = cache.filter((c) => c.subCategoryId !== id).concat(chunks.map((c) => ({ subCategoryId: id, text: c.text, vector: c.vector })));
  loaded = true;
}

module.exports = { loadCache, getAll, isLoaded, replaceTopic };
