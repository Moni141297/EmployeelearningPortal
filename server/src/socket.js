const { Server } = require('socket.io');

let io = null;

// Last known status ('waiting' | 'exam' | 'done') per eventId -> userId. Kept
// in memory (not Redis/SQL) purely so a trainer who opens or reloads the Live
// screen mid-exam sees correct dot colours instead of everyone defaulting
// back to "waiting".
const statusByRoom = new Map();

function roomFor(eventId) {
  return `event:${eventId}`;
}
function userRoomFor(userId) {
  return `user:${userId}`;
}

function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: '*',
    // { origin: process.env.CORS_ORIGIN || '*' },
  });

  io.on('connection', (socket) => {
    socket.on('identify', ({ userId }) => {
      if (!userId) return;
      socket.join(userRoomFor(userId));
      // Presence: every identified socket is one live, logged-in browser session.
      const fwd = String(socket.handshake.headers['x-forwarded-for'] || '').split(',')[0].trim();
      socket.data.session = {
        userId: String(userId),
        since: Date.now(),
        ip: (fwd || socket.handshake.address || '').replace(/^::ffff:/, '').replace(/^::1$/, '127.0.0.1'),
        ua: socket.handshake.headers['user-agent'] || '',
      };
    });

    // A participant/trainer opens the waiting room or live session for an
    // event. `role` distinguishes the trainer (who watches the room but is
    // never a participant) from participants, so the frontend doesn't add
    // the trainer to the examination's own joined-participants list.
    socket.on('event:join-room', ({ eventId, userId, name, role }) => {
      if (!eventId) return;
      socket.data.eventId = eventId;
      socket.data.userId = userId;
      socket.data.name = name;
      socket.data.role = role;
      socket.join(roomFor(eventId));
      if (role !== 'trainer' && userId) {
        if (!statusByRoom.has(eventId)) statusByRoom.set(eventId, new Map());
        if (!statusByRoom.get(eventId).has(userId)) statusByRoom.get(eventId).set(userId, 'waiting');
      }
      socket.to(roomFor(eventId)).emit('participant:joined', { eventId, userId, name, role });
      // Tell the newly-joined socket who is already in the room.
      const room = io.sockets.adapter.rooms.get(roomFor(eventId)) || new Set();
      const others = [];
      for (const sid of room) {
        if (sid === socket.id) continue;
        const s = io.sockets.sockets.get(sid);
        if (s?.data?.userId) others.push({ userId: s.data.userId, name: s.data.name, role: s.data.role });
      }
      const statuses = Object.fromEntries(statusByRoom.get(eventId) || []);
      socket.emit('event:roster', { eventId, others, statuses });
    });

    // Participant-side status within a room: 'waiting' | 'exam' | 'done'.
    // Drives the waiting-room dot colour on the trainer's Live screen.
    socket.on('event:status', ({ eventId, userId, status }) => {
      if (!eventId) return;
      if (!statusByRoom.has(eventId)) statusByRoom.set(eventId, new Map());
      statusByRoom.get(eventId).set(userId, status);
      io.to(roomFor(eventId)).emit('participant:status', { eventId, userId, status });
    });

    socket.on('event:leave-room', ({ eventId, userId, role }) => {
      if (!eventId) return;
      socket.leave(roomFor(eventId));
      socket.to(roomFor(eventId)).emit('participant:left', { eventId, userId, role });
    });

    socket.on('disconnect', () => {
      const { eventId, userId, role } = socket.data || {};
      if (eventId) socket.to(roomFor(eventId)).emit('participant:left', { eventId, userId, role });
    });
  });

  return io;
}

// Live logged-in sessions (one per identified socket connection).
function getOnlineSessions() {
  const out = [];
  if (!io) return out;
  for (const s of io.sockets.sockets.values()) if (s.data && s.data.session) out.push(s.data.session);
  return out;
}

function getIo() {
  return io;
}

function emitToEvent(eventId, event, payload) {
  io?.to(roomFor(eventId)).emit(event, payload);
}

function emitToUser(userId, event, payload) {
  io?.to(userRoomFor(userId)).emit(event, payload);
}

// Broadcast to every connected socket regardless of room — used for the
// background status sweep (see events.js' runAutoStatusSweep), since a
// Scheduled examination opening its waiting room on its own, at its
// scheduled time, needs to reach every participant's list screen, not just
// whoever already has that one event's room open.
function emitAll(event, payload) {
  io?.emit(event, payload);
}

module.exports = { initSocket, getIo, getOnlineSessions, emitToEvent, emitToUser, emitAll };
