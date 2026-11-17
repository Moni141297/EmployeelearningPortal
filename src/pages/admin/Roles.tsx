import { api } from '../../lib/api';
import { useLive } from '../../lib/useLive';
import LiveBar, { num } from './LiveBar';

// The rights below are the platform's access policy (what each role is allowed to do),
// not data. The per-role user counts are read live from the user table.

type RoleKey = 'admin' | 'trainer' | 'participant' | 'all';
const RIGHTS: [string, RoleKey][] = [
  ['Create / edit users', 'admin'], ['Assign roles and access rights', 'admin'], ['View audit logs', 'admin'], ['View system usage', 'admin'],
  ['Create learning topics and products', 'trainer'], ['Author learning content', 'trainer'], ['Manage question banks', 'trainer'],
  ['Create and run examinations', 'trainer'], ['Respond to expert questions', 'trainer'], ['Issue / revoke certificates', 'trainer'],
  ['View learning content', 'all'], ['Take self assessments', 'participant'], ['Join live examinations', 'participant'],
  ['Ask the AI assistant', 'participant'], ['Raise expert questions', 'participant'], ['View own certificates', 'participant'],
];
const ROLES: ('admin' | 'trainer' | 'participant')[] = ['admin', 'trainer', 'participant'];

export default function Roles() {
  const live = useLive(() => api.admin.overview(), 20000);
  const counts = live.data?.users.byRole;

  return (
    <div>
      <h2 style={{ fontSize: 20 }} className="mb">Role-based access control</h2>
      <LiveBar live={live} />
      <div className="grid g3 mb">
        {ROLES.map((r) => (
          <div key={r} className="card">
            <div className="card-h"><h3>{r.charAt(0).toUpperCase() + r.slice(1)}</h3><span className={'tag ' + (r === 'admin' ? 'r' : r === 'trainer' ? 'p' : 'b')}>{counts ? num(counts[r] || 0) : '—'} users</span></div>
            <div className="card-b">
              {RIGHTS.filter((x) => x[1] === r || x[1] === 'all').map((x) => (
                <div key={x[0]} className="row small" style={{ padding: '4px 0' }}><span style={{ color: 'var(--ok)' }}>✓</span>{x[0]}</div>
              ))}
              {r === 'admin' && <div className="row small" style={{ padding: '4px 0', color: 'var(--bad)' }}><span>✕</span>Cannot create learning content or examinations</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="card"><div className="card-h"><h3>Access matrix</h3></div><div className="tbl-wrap"><table>
        <thead><tr><th>Capability</th><th className="center">Admin</th><th className="center">Trainer</th><th className="center">Participant</th></tr></thead>
        <tbody>
          {RIGHTS.map((x) => (
            <tr key={x[0]}>
              <td className="small">{x[0]}</td>
              {ROLES.map((r) => <td key={r} className="center">{(x[1] === r || x[1] === 'all') ? <span style={{ color: 'var(--ok)', fontWeight: 700 }}>✓</span> : <span className="muted">—</span>}</td>)}
            </tr>
          ))}
        </tbody>
      </table></div></div>
    </div>
  );
}
