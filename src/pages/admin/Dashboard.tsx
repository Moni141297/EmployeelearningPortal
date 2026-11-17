import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { useLive } from '../../lib/useLive';
import { initials } from '../../lib/helpers';
import { openUserEditor } from './userEditor';
import LiveBar, { fmtDateTime, fmtTime, num } from './LiveBar';

const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const overview = useLive(() => api.admin.overview(), 15000);
  const sessions = useLive(() => api.admin.sessions(), 10000);
  const o = overview.data;
  const online = sessions.data;

  const last7 = (o?.daily || []).slice(-7);
  const maxDau = Math.max(1, ...last7.map((d) => d.users));
  const usageRows: [string, number][] = o ? [
    ['Learning sessions', o.usage.learning.total],
    ['Assessment attempts', o.usage.attempts.total],
    ['Examination participation', o.usage.exams.participants],
    ['AI chatbot conversations', o.usage.ai.total],
    ['Expert questions', o.usage.expert.total],
  ] : [];

  return (
    <div>
      <div className="spread mb">
        <div><h2 style={{ fontSize: 21 }}>System administration</h2><div className="muted small">User and system administration only — content is managed by trainers</div></div>
        <button className="btn pri" onClick={() => openUserEditor(null)}>+ Create user</button>
      </div>
      <LiveBar live={overview} />
      <div className="grid g5 mb">
        <div className="kpi b"><div className="lab">Total users</div><div className="val">{num(o?.users.total)}</div></div>
        <div className="kpi g"><div className="lab">Active</div><div className="val">{num(o?.users.active)}</div></div>
        <div className="kpi r"><div className="lab">Inactive</div><div className="val">{num(o?.users.inactive)}</div></div>
        <div className="kpi p"><div className="lab">Trainers</div><div className="val">{num(o?.users.byRole.trainer)}</div></div>
        <div className="kpi o"><div className="lab">Logged in now</div><div className="val">{online ? online.length : '—'}</div><div className="sub">live sessions</div></div>
      </div>
      <div className="grid g2">
        <div className="card"><div className="card-h"><h3>Daily active users</h3><a className="small" onClick={() => navigate('/app/admin/activity')} style={{ cursor: 'pointer' }}>Details →</a></div>
          <div className="card-b">
            {o ? (
              <>
                <div className="chartbars">
                  {last7.map((d) => (
                    <div key={d.date} className="cb"><b className="xs">{d.users}</b><i style={{ height: (d.users / maxDau * 100) + '%' }} /><span>{WEEKDAY[new Date(d.date + 'T00:00:00Z').getUTCDay()]}</span></div>
                  ))}
                </div>
                <div className="xs muted mt">Distinct users who signed in each day (last 7 days)</div>
              </>
            ) : <div className="muted small">{overview.error ? 'Unavailable' : 'Loading…'}</div>}
          </div>
        </div>
        <div className="card"><div className="card-h"><h3>Currently logged in</h3><span className="tag g">{online ? online.length : '—'} online</span></div>
          <div className="card-b">
            {!online ? <div className="muted small">{sessions.error ? 'Unavailable' : 'Loading…'}</div>
              : !online.length ? <div className="muted small">No one is signed in right now.</div>
              : online.map((s) => (
                <div key={s.userId + s.since + s.ip} className="row" style={{ padding: '7px 0', borderBottom: '1px solid var(--line)' }}>
                  <span className="pulse-dot" /><div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>{initials(s.name)}</div>
                  <div className="grow"><b className="small">{s.name}</b><div className="xs muted">{s.role}{s.device ? ' · ' + s.device : ''}</div></div>
                  <span className="xs muted">since {fmtTime(s.since)}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="card"><div className="card-h"><h3>Usage analytics</h3><a className="small" onClick={() => navigate('/app/admin/usage')} style={{ cursor: 'pointer' }}>All →</a></div>
          <div className="card-b">
            {!o ? <div className="muted small">{overview.error ? 'Unavailable' : 'Loading…'}</div>
              : usageRows.map((r) => <div key={r[0]} className="spread small" style={{ padding: '7px 0', borderBottom: '1px solid var(--line)' }}><span className="muted">{r[0]}</span><b>{num(r[1])}</b></div>)}
          </div>
        </div>
        <div className="card"><div className="card-h"><h3>Recent activity</h3><a className="small" onClick={() => navigate('/app/admin/audit')} style={{ cursor: 'pointer' }}>Audit log →</a></div>
          <div className="card-b">
            {!o ? <div className="muted small">{overview.error ? 'Unavailable' : 'Loading…'}</div>
              : !o.recent.length ? <div className="muted small">No activity recorded yet.</div>
              : o.recent.map((a) => (
                <div key={a.id} className="small" style={{ padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
                  <b>{a.action}</b> — {a.entity}
                  <div className="xs muted">{a.userName || (a.userId ? 'User ' + a.userId : 'System')} · {fmtDateTime(a.ts)}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
