// Local embedding utility — runs entirely on this server (CPU, WASM), no
// external API, no key, no per-call cost. Safe at scale (hundreds of
// participants asking questions) since it's just local inference, not a
// billed request. Used for both bulk ingestion (lib/ingest.js) and single
// questions (routes/ai.js) — same function, reused everywhere embeddings
// are needed.
let pipelinePromise = null;

async function getPipeline() {
  if (!pipelinePromise) {
    pipelinePromise = (async () => {
      const { pipeline } = await import('@xenova/transformers');
      return pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    })();
  }
  return pipelinePromise;
}

// Returns one 384-dim normalized vector per input text.
async function embedTexts(texts) {
  if (!texts.length) return null;
  const extractor = await getPipeline();
  const vectors = [];
  for (const text of texts) {
    const output = await extractor(String(text), { pooling: 'mean', normalize: true });
    vectors.push(Array.from(output.data));
  }
  return vectors;
}

module.exports = { embedTexts };
