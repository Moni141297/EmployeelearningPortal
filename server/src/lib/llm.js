const Anthropic = require('@anthropic-ai/sdk');

let client = null;
function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

// No-API stand-in for when ANTHROPIC_API_KEY isn't set: formats the
// highest-ranked retrieved excerpt directly instead of calling Claude. Lets
// the retrieval half of the pipeline (chunking, cosine ranking, threshold)
// be demonstrated end-to-end before a real key is added — swap to the real
// call below the moment one is configured.
function mockAnswer(question, contextChunks) {
  const best = contextChunks[0];
  if (!best) return null;
  return `Based on the approved content: ${best.trim()}`;
}

// Answers strictly from the retrieved excerpts — never the model's general
// knowledge — across all courses (General, Cement, Hardworker), so the
// assistant can field any in-scope question regardless of which topic page
// the learner happens to be on.
//
// Scope is decided entirely by the caller's cosine-similarity gate (routes/ai.js)
// BEFORE this is ever called — askLLM is only invoked once that gate has
// already judged the question in-scope. It deliberately does NOT also ask
// Claude to make its own in/out-of-scope call: an earlier version did, via a
// fixed sentinel reply, but the model's scope judgement was inconsistent
// across otherwise-identical calls (no way to pin it down — this model has
// deprecated the `temperature` parameter, so there's no sampling knob to
// make that judgement deterministic). A single deterministic gate upstream
// is more reliable than asking a non-deterministic model to gate itself.
async function askLLM(question, contextChunks) {
  const anthropic = getClient();
  if (!anthropic) return mockAnswer(question, contextChunks);
  const context = contextChunks.map((c, i) => `[${i + 1}] ${c}`).join('\n\n');
  const msg = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5',
    max_tokens: 500,
    system: 'You are a learning assistant for an industrial training platform covering General, Cement and ' +
      'Hardworker courses. The excerpts below have already been confirmed relevant to this question — answer ' +
      'using ONLY them, never your own general knowledge. Be concise and never invent information beyond them.',
    messages: [{ role: 'user', content: `Approved content excerpts:\n${context}\n\nQuestion: ${question}` }],
  });
  const block = msg.content.find((b) => b.type === 'text');
  return block ? block.text.trim() : null;
}

module.exports = { askLLM };
