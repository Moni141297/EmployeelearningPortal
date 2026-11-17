import { io, type Socket } from 'socket.io-client';

const API_BASE = (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL || '/api';
const RAW_BASE = API_BASE.replace(/\/api\/?$/, '');
const isAbsolute = /^https?:\/\//.test(RAW_BASE);
// RAW_BASE is either absolute (http://host:port), empty (true same-origin
// root), or a relative sub-path (e.g. "/elpapi", reverse-proxied by IIS).
// Passing a relative path straight to io() would be read as a namespace on
// the current origin rather than a path prefix, so instead connect to the
// current origin explicitly and point engine.io's own path at
// <prefix>/socket.io.
const SOCKET_ORIGIN = isAbsolute ? RAW_BASE : undefined;
const SOCKET_PATH = isAbsolute ? '/socket.io' : `${RAW_BASE}/socket.io`;

let socket: Socket | null = null;

// One socket connection per logged-in session. Created on login, torn down on
// logout — everything else (event rooms, user room) is (re)joined on 'connect'.
export function connectSocket(userId: string): Socket {
  if (socket) return socket;
  socket = io(SOCKET_ORIGIN, { path: SOCKET_PATH, transports: ['websocket', 'polling'] });
  socket.on('connect', () => socket!.emit('identify', { userId }));
  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
