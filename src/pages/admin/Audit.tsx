import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { api } from '../../lib/api';
import { useLive } from '../../lib/useLive';
import LiveBar, { fmtDateTime } from './LiveBar';

const LIMIT = 500;

function csvCell(v: string) {
  return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}

export default function Audit() {
  const filter = useStore((s) => s.auditFilter);
  const setAuditFilter = useStore((s) => s.setAuditFilter);
  const toast = useStore((s) => s.toast);

  // The filter is applied by the server against the whole audit table, not just the rows on screen.
  const [q, setQ] = useState(filter);
  useEffect(() => { const t = setTimeout(() => setQ(filter.trim()), 300); return () => clearTimeout(t); }, [filter]);
  const live = useLive(() => api.audit.list(q, LIMIT), 15000, [q]);
  const list = live.data;

  function exportCsv() {
    if (!list || !list.length) { toast('Nothing to export', 'warn'); return; }
    const head = ['Timestamp (UTC)', 'User', 'Role', 'Action', 'Entity', 'IP address', 'Device'];
    const rows = list.map((a) => [a.ts || '', a.userName || a.user, a.userRole || '', a.action, a.entity, a.ip || '', a.device || ''].map(csvCell).join(','));
    const blob = new Blob([[head.join(','), ...rows].join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'audit-log-' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    toast('Exported ' + list.length + ' audit records', 'ok');
  }

  return (
    <div>
      <div className="spread mb"><h2 style={{ fontSize: 20 }}>Audit trail</h2><button className="btn" onClick={exportCsv} disabled={!list || !list.length}>⬇ Export</button></div>
      <p className="muted small mb">Every significant action is recorded: logins, user and access changes, content creation and publication, question changes, examination lifecycle events, result publication, certificate generation and expert responses.</p>
      <LiveBar live={live} />
      <div className="card pad mb">
        <div className="row wrap">
          <input className="inp" style={{ maxWidth: 320 }} placeholder="Filter by action, entity or user…" value={filter} onChange={(e) => setAuditFilter(e.target.value)} />
          <div className="grow" />
          {list && <span className="small muted">{list.length >= LIMIT ? `Showing latest ${LIMIT}` : `${list.length} record${list.length === 1 ? '' : 's'}`}</span>}
        </div>
      </div>
      <div className="card"><div className="tbl-wrap"><table>
        <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Entity</th><th>IP address</th></tr></thead>
        <tbody>
          {!list ? (
            <tr><td colSpan={5} className="muted small">{live.error ? 'The audit trail is unavailable.' : 'Loading…'}</td></tr>
          ) : !list.length ? (
            <tr><td colSpan={5} className="muted small">{q ? 'No audit records match this filter.' : 'No audit records yet.'}</td></tr>
          ) : list.map((a) => (
            <tr key={a.id}>
              <td className="small mono">{a.ts ? fmtDateTime(a.ts) : a.time}</td>
              <td className="small"><b>{a.userName || (a.user !== '—' ? 'User ' + a.user : 'System')}</b><div className="xs muted">{a.userRole || ''}</div></td>
              <td><span className="tag">{a.action}</span></td>
              <td className="small">{a.entity}</td>
              <td className="mono small muted">{a.ip || '—'}{a.device && <div className="xs">{a.device}</div>}</td>
            </tr>
          ))}
        </tbody>
      </table></div></div>
    </div>
  );
}
