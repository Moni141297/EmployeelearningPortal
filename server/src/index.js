// Load .env from a fixed path relative to this file, not the process's cwd —
// whoever starts this (npm start, `node index.js` from src/, a service
// manager) may launch it from a different working directory, and a bare
// dotenv.config() silently finds nothing and falls back to defaults (e.g.
// Redis connecting to localhost instead of the configured remote instance).
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const http = require('http');
const app = require('./app');
const { initSocket } = require('./socket');
const { loadCache } = require('./lib/embeddingsCache');
const { getPool } = require('./db');
const { runAutoStatusSweep } = require('./routes/events');

const port = process.env.PORT || 4000;
const server = http.createServer(app);
initSocket(server);
server.listen(port, () => console.log(`LearnCert API listening on http://localhost:${port}`));
loadCache(); // AI knowledge base — fire-and-forget, logs its own outcome

// Automatic status management: a Scheduled examination opens its own waiting
// room (and an unstarted one past its 24h grace period gets cancelled)
// strictly on its own date/time, independent of anyone loading a page that
// happens to trigger the same sweep reactively (see runAutoStatusSweep in
// routes/events.js). 30s keeps the "opens 5 minutes before" window accurate
// to well within a minute without hammering the DB.
const STATUS_SWEEP_INTERVAL_MS = 30 * 1000;
setInterval(() => {
  getPool().then((pool) => runAutoStatusSweep(pool)).catch((err) => console.warn('Auto status sweep failed:', err.message));
}, STATUS_SWEEP_INTERVAL_MS);
