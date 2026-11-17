const { sql, getPool } = require('../db');
const { embedTexts } = require('./embeddings');
const embeddingsCache = require('./embeddingsCache');

// Pulls every source of approved knowledge for one topic: slide content,
// curated Q&A entries, question explanations, and expert-answered questions.
async function chunksForTopic(pool, topicId) {
  const slides = (await pool.request().input('sc', sql.Int, topicId).query(`
    SELECT s.SlideId, s.Title, s.ContentData FROM dbo.Lms_LearningSlides s
    JOIN dbo.Lms_LearningContents c ON c.ContentId = s.ContentId
    WHERE c.SubCategoryId = @sc
  `)).recordset;

  const kb = (await pool.request().input('sc', sql.Int, topicId)
    .query('SELECT Question, Answer FROM dbo.Lms_AIKnowledgeEntries WHERE SubCategoryId=@sc')).recordset;

  const questions = (await pool.request().input('sc', sql.Int, topicId).query(`
    SELECT QuestionId, QuestionText, Explanation FROM dbo.Lms_Questions
    WHERE SubCategoryId=@sc AND Status='Active' AND Explanation IS NOT NULL AND Explanation <> ''
  `)).recordset;

  const expertAnswers = (await pool.request().input('sc', sql.Int, topicId).query(`
    SELECT ExpertQuestionId, OriginalQuestion, ExpertResponse FROM dbo.Lms_ExpertQuestions
    WHERE SubCategoryId=@sc AND ExpertResponse IS NOT NULL AND ExpertResponse <> ''
  `)).recordset;

  const chunks = [];
  for (const s of slides) {
    const data = JSON.parse(s.ContentData || '{}');
    const text = [s.Title, data.text, data.explanation || data.explain, data.key].filter(Boolean).join('\n');
    if (text.trim()) chunks.push({ sourceType: 'slide', sourceId: s.SlideId, text });
  }
  for (const k of kb) {
    chunks.push({ sourceType: 'kb', sourceId: null, text: `Q: ${k.Question}\nA: ${k.Answer}` });
  }
  for (const q of questions) {
    chunks.push({ sourceType: 'question', sourceId: q.QuestionId, text: `${q.QuestionText}\nExplanation: ${q.Explanation}` });
  }
  for (const e of expertAnswers) {
    chunks.push({ sourceType: 'expert', sourceId: e.ExpertQuestionId, text: `Q: ${e.OriginalQuestion}\nA: ${e.ExpertResponse}` });
  }
  return chunks;
}

// Rebuilds one topic's knowledge base from scratch. Called fire-and-forget
// whenever that topic's content changes (slide edits, publish, KB entries),
// and once up front via scripts/backfill-embeddings.js for existing content.
async function reindexTopic(topicId) {
  const pool = await getPool();
  const id = Number(topicId);
  const chunks = await chunksForTopic(pool, id);

  try {
    await pool.request().input('sc', sql.Int, id).query('DELETE FROM dbo.Lms_ContentEmbeddings WHERE SubCategoryId=@sc');
  } catch (err) {
    console.warn('dbo.Lms_ContentEmbeddings does not exist yet — run sql/2026_ai_embeddings.sql to enable the AI knowledge base:', err.message);
    return;
  }
  if (!chunks.length) {
    embeddingsCache.replaceTopic(id, []);
    return;
  }

  const vectors = await embedTexts(chunks.map((c) => c.text));
  if (!vectors) {
    embeddingsCache.replaceTopic(id, []);
    return;
  }

  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    await pool.request().input('sc', sql.Int, id).input('type', sql.NVarChar, c.sourceType)
      .input('sid', sql.Int, c.sourceId).input('text', sql.NVarChar, c.text).input('vec', sql.NVarChar, JSON.stringify(vectors[i]))
      .query(`INSERT INTO dbo.Lms_ContentEmbeddings (SubCategoryId, SourceType, SourceId, ChunkText, Vector, UpdatedAt)
              VALUES (@sc, @type, @sid, @text, @vec, sysutcdatetime())`);
  }
  // SQL is now the durable copy; the in-memory cache (used by every /ai/ask
  // request) is updated in the same breath so nothing has to re-query SQL.
  embeddingsCache.replaceTopic(id, chunks.map((c, i) => ({ text: c.text, vector: vectors[i] })));
}

module.exports = { reindexTopic };
