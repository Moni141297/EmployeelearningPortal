export const uid = (p: string) => p + Math.random().toString(36).slice(2, 8).toUpperCase();

export const initials = (n: string) => n.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase();

export const mmss = (s: number) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');

export const nowStr = () =>
  new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

// The waiting room for a scheduled live examination opens this long before
// its scheduled start — joining earlier than that would just be sitting in
// an empty room, so Join is disabled and a join-by-code lookup is blocked
// until this moment.
const JOIN_WINDOW_MIN = 5;

export function examJoinOpensAt(date: string, time: string): Date {
  return new Date(new Date(`${date}T${time || '00:00'}:00`).getTime() - JOIN_WINDOW_MIN * 60 * 1000);
}

export function canJoinNow(date: string, time: string): boolean {
  if (!date) return true; // no scheduled date set — don't block on a value that doesn't exist
  return Date.now() >= examJoinOpensAt(date, time).getTime();
}

// Mirrors the server's sweepExpiredEvents (events.js): a Scheduled event
// nobody started within 24h of its scheduled time gets auto-cancelled there,
// but nothing re-fetches the events list on a timer — this lets the UI hide
// it immediately on the client too, without waiting for that next fetch.
const EXPIRY_HOURS = 24;
export function isEventExpired(date: string, time: string): boolean {
  if (!date) return false;
  return Date.now() - new Date(`${date}T${time || '00:00'}:00`).getTime() > EXPIRY_HOURS * 60 * 60 * 1000;
}

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function shuffle<T>(a: T[]): T[] {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
