/*
 * Minimal Redis-protocol (RESP2) server for local dev, since no real Redis/Docker
 * is installable in this sandbox. Implements exactly the commands server/src/redis.js
 * needs (SET ... EX, GET, DEL) plus the handshake commands ioredis sends on connect
 * (PING, INFO, CLIENT, SELECT). In-memory only — data is lost on restart, which is
 * fine since exam-session rows here are just a short-lived resume cache; the real
 * attempt is always persisted to MSSQL on submit regardless.
 *
 * Usage: node scripts/mini-redis.js [port]  (default 6379)
 */
const net = require('net');

const PORT = Number(process.argv[2]) || 6379;
const store = new Map(); // key -> { value, expiresAt: number|null }
const timers = new Map(); // key -> Timeout

function setKey(key, value, exSeconds) {
  if (timers.has(key)) clearTimeout(timers.get(key));
  const expiresAt = exSeconds ? Date.now() + exSeconds * 1000 : null;
  store.set(key, { value, expiresAt });
  if (expiresAt) {
    const t = setTimeout(() => { store.delete(key); timers.delete(key); }, exSeconds * 1000);
    t.unref();
    timers.set(key, t);
  }
}

function getKey(key) {
  const row = store.get(key);
  if (!row) return null;
  if (row.expiresAt && row.expiresAt < Date.now()) { store.delete(key); return null; }
  return row.value;
}

function delKey(key) {
  const existed = store.has(key);
  store.delete(key);
  if (timers.has(key)) { clearTimeout(timers.get(key)); timers.delete(key); }
  return existed ? 1 : 0;
}

function bulk(str) {
  if (str === null || str === undefined) return '$-1\r\n';
  const b = Buffer.from(String(str), 'utf8');
  return `$${b.length}\r\n${b.toString('utf8')}\r\n`;
}
function simple(str) { return `+${str}\r\n`; }
function integer(n) { return `:${n}\r\n`; }
function err(msg) { return `-ERR ${msg}\r\n`; }

// Parses one RESP array-of-bulk-strings command from the front of buf.
// Returns { command: string[], rest: Buffer } or null if incomplete.
function parseCommand(buf) {
  if (buf.length === 0 || buf[0] !== 0x2a) return null; // '*'
  const firstLineEnd = buf.indexOf('\r\n');
  if (firstLineEnd < 0) return null;
  const argCount = Number(buf.slice(1, firstLineEnd).toString());
  let offset = firstLineEnd + 2;
  const args = [];
  for (let i = 0; i < argCount; i++) {
    if (buf[offset] !== 0x24) return null; // '$'
    const lenLineEnd = buf.indexOf('\r\n', offset);
    if (lenLineEnd < 0) return null;
    const len = Number(buf.slice(offset + 1, lenLineEnd).toString());
    const dataStart = lenLineEnd + 2;
    const dataEnd = dataStart + len;
    if (buf.length < dataEnd + 2) return null;
    args.push(buf.slice(dataStart, dataEnd).toString('utf8'));
    offset = dataEnd + 2;
  }
  return { command: args, rest: buf.slice(offset) };
}

const server = net.createServer((socket) => {
  let buf = Buffer.alloc(0);
  socket.on('data', (chunk) => {
    buf = Buffer.concat([buf, chunk]);
    for (;;) {
      const parsed = parseCommand(buf);
      if (!parsed) break;
      buf = parsed.rest;
      const [cmd, ...args] = parsed.command;
      const c = (cmd || '').toUpperCase();
      try {
        if (c === 'PING') socket.write(simple('PONG'));
        else if (c === 'SELECT' || c === 'HELLO') socket.write(simple('OK'));
        else if (c === 'CLIENT') socket.write(simple('OK'));
        else if (c === 'INFO') socket.write(bulk('redis_version:7.0.0\r\nloading:0\r\nrole:master\r\n'));
        else if (c === 'SET') {
          const [key, value, ...rest] = args;
          let ex = null;
          const exIdx = rest.findIndex((r) => r.toUpperCase() === 'EX');
          if (exIdx >= 0) ex = Number(rest[exIdx + 1]);
          setKey(key, value, ex);
          socket.write(simple('OK'));
        } else if (c === 'GET') {
          socket.write(bulk(getKey(args[0])));
        } else if (c === 'DEL') {
          socket.write(integer(args.reduce((n, k) => n + delKey(k), 0)));
        } else if (c === 'QUIT') {
          socket.write(simple('OK'));
          socket.end();
        } else {
          socket.write(simple('OK')); // safe default for anything unused
        }
      } catch (e) {
        socket.write(err(e.message));
      }
    }
  });
  socket.on('error', () => {});
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`mini-redis listening on 127.0.0.1:${PORT}`);
});
