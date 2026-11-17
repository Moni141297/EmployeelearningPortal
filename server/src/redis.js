const Redis = require("ioredis");

// One Redis connection for the whole process. Exam progress is written here on
// every answer so a dropped connection can resume mid-paper; the SQL tables
// are only written once, when the participant actually submits.
// TEMPORARY: hardcoded for diagnosing the 173 server's connection failure in
// isolation from .env loading. Revert to the process.env.* version below
// once the root cause (likely TLS-required or a network/ACL restriction
// specific to that server) is confirmed — never ship real credentials
// hardcoded in source.
//   const REDIS_ENABLED = process.env.REDIS_ENABLE !== "false";
//   const redis = new Redis({dist/index.html dist/assets dist/images dist/products dist/favicon.svg dist/icons.svg
//     host: process.env.REDIS_URL || "localhost",
//     port: Number(process.env.REDIS_PORT) || 6379,
//     username: process.env.REDIS_ACL_USER || undefined,
//     password: process.env.REDIS_PASSWORD || undefined,
//     lazyConnect: true,
//     maxRetriesPerRequest: 2,
//   });
const REDIS_ENABLED = true;
const redis = new Redis({
  host: "172.16.1.178",
  port: 6379,
  username: "",
  password: "UbuntuRedis123*",
  lazyConnect: true,
  maxRetriesPerRequest: 2,
});
redis.on("error", (err) => console.warn("Redis error:", err.message));
redis.on("error", (err) =>
  console.warn("Redis error — CODE:", err.code, "| MESSAGE:", JSON.stringify(err.message))
);
if (REDIS_ENABLED) {
  redis
    .connect()
    .catch((err) =>
      console.warn(
        "Redis connect failed — CODE:",
        err.code,
        "| MESSAGE:",
        JSON.stringify(err.message)
      )
    );
}

const SESSION_TTL_SEC = 4 * 60 * 60; // exam sessions expire after 4h of inactivity

function sessionKey(userId, mode, topicOrEventId) {
  return `exam:session:${mode}:${topicOrEventId}:${userId}`;
}

async function saveSession(key, state) {
  await redis.set(key, JSON.stringify(state), "EX", SESSION_TTL_SEC);
}

async function loadSession(key) {
  const raw = await redis.get(key);
  return raw ? JSON.parse(raw) : null;
}

async function deleteSession(key) {
  await redis.del(key);
}

module.exports = { redis, sessionKey, saveSession, loadSession, deleteSession, SESSION_TTL_SEC };
