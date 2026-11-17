import { api } from '../../lib/api';
import { useLive } from '../../lib/useLive';
import { useStore } from '../../store/useStore';
import { initials } from '../../lib/helpers';
import LiveBar, { fmtDateTime } from './LiveBar';

export default function Active() {
  const toast = useStore((s) => s.toast);
  const me = useStore((s) => s.currentUser);
  const live = useLive(() => api.admin.sessions(), 8000);
  const list = live.data;

  async function endSession(userId: string, name: string) {
    try {
      await api.admin.terminateSession(userId, me?.id);
      toast('Session terminated for ' + name, 'warn');
      setTimeout(live.refresh, 800);
    } catch (e) {
      toast('Could not end the session: ' + (e instanceof Error ? e.message : 'unknown error'), 'bad');
    }
  }

  return (
    <div>
      <div className="spread mb"><h2 style={{ fontSize: 20 }}>Currently logged-in users</h2><span className="tag g">{list ? list.length : '—'} live sessions</span></div>
      <LiveBar live={live} />
      <div className="card"><div className="tbl-wrap"><table>
        <thead><tr><th>User</th><th>Role</th><th>Department</th><th>Logged in since</th><th>Device</th><th>IP address</th><th></th></tr></thead>
        <tbody>
          {!list ? (
            <tr><td colSpan={7} className="muted small">{live.error ? 'Live sessions are unavailable.' : 'Loading…'}</td></tr>
          ) : !list.length ? (
            <tr><td colSpan={7} className="muted small">No one is signed in right now.</td></tr>
          ) : list.map((s) => (
            <tr key={s.userId + s.since + s.ip}>
              <td><div className="row"><span className="pulse-dot" /><div className="avatar" style={{ width: 26, height: 26, fontSize: 10 }}>{initials(s.name)}</div><b className="small">{s.name}</b></div></td>
              <td><span className={'tag ' + (s.role === 'admin' ? 'r' : s.role === 'trainer' ? 'p' : 'b')}>{s.role}</span></td>
              <td className="small">{s.dept || '—'}</td>
              <td className="small">{fmtDateTime(s.since)}</td>
              <td className="small muted">{s.device || '—'}</td>
              <td className="mono small">{s.ip || '—'}</td>
              <td className="right"><button className="btn sm dan" disabled={s.userId === me?.id} title={s.userId === me?.id ? 'This is your own session' : undefined} onClick={() => endSession(s.userId, s.name)}>End session</button></td>
            </tr>
          ))}
        </tbody>
      </table></div></div>
    </div>
  );
}
