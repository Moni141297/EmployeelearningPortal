const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler, auditLog } = require('../utils');
const { embedTexts } = require('../lib/embeddings');
const { askLLM } = require('../lib/llm');
const embeddingsCache = require('../lib/embeddingsCache');

const router = express.Router();

// Tuned empirically against the local embedding model (lib/embeddings.js):
// in-scope questions scored 0.56-0.76 against this content, unrelated ones
// 0.13-0.21. Re-tune by hand if that model is ever swapped out.
const MIN_SIMILARITY = 0.35;
const TOP_K = 5;

const OUT_OF_SCOPE_MESSAGE =
  'This question is out of scope for the learning assistant — it only answers from approved course content. Please contact the admin for help with this.';

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

// Keyword match against the curated Q&A table (kept as a fallback for when
// embeddings/LLM aren't configured), then the fixed out-of-scope message —
// never a generic "ask an expert" nudge, so the boundary is unambiguous.
async function legacyAnswer(pool, text) {
  const entries = (await pool.request().query('SELECT * FROM dbo.Lms_AIKnowledgeEntries')).recordset;
  const s = String(text || '').toLowerCase();
  let best = null;
  let score = 0;
  entries.forEach((row) => {
    const keys = row.Question.toLowerCase().split(/\s+/).filter((w) => w.length > 5);
    const hit = keys.filter((k) => s.includes(k)).length;
    if (hit > score) { score = hit; best = row.Answer; }
  });
  if (best) return { text: best, confident: true };
  return { text: OUT_OF_SCOPE_MESSAGE, confident: false };
}

router.post('/ask', asyncHandler(async (req, res) => {
  const { topicId, text, userId, retrievalText } = req.body;
  const pool = await getPool();
  await auditLog(pool, sql, { action: 'AI question asked', entity: 'Topic ' + topicId, userId });

  // retrievalText lets the caller search the knowledge base with something
  // more specific than the literal question — e.g. a quick-reply chip like
  // "Explain this in simple terms" carries no topical content of its own, so
  // the client passes the prior AI answer instead. `text` (the actual
  // instruction) still goes to the LLM as the question.
  const queryText = retrievalText || text;

  // Reads the in-memory knowledge base (loaded at startup, kept current by
  // reindexTopic() — see lib/embeddingsCache.js) across every General/Cement/
  // Hardworker topic, not just the one the learner happens to be viewing.
  const rows = embeddingsCache.getAll();

  if (rows.length) {
    const [qVector] = (await embedTexts([queryText])) || [];
    if (qVector) {
      const scored = rows
        .map((r) => ({ text: r.text, score: cosine(qVector, r.vector) }))
        .sort((a, b) => b.score - a.score);
      const top = scored.slice(0, TOP_K);
      if (top.length && top[0].score >= MIN_SIMILARITY) {
        const answer = await askLLM(text, top.map((t) => t.text));
        if (answer) return res.json({ text: answer, confident: true });
        return res.json({ text: OUT_OF_SCOPE_MESSAGE, confident: false });
      }
    }
  }

  res.json(await legacyAnswer(pool, queryText));
}));

module.exports = router;
