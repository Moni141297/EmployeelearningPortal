import { api } from '../../lib/api';
import { useLive } from '../../lib/useLive';
import LiveBar, { fmtTime, num } from './LiveBar';

export default function Activity() {
  const live = useLive(() => api.admin.overview(), 15000);
  const o = live.data;

  let delta = '';
  if (o) {
    const { logins, loginsYesterday } = o.today;
    delta = loginsYesterday > 0
      ? `${logins >= loginsYesterday ? '+' : ''}${Math.round(((logins - loginsYesterday) / loginsYesterday) * 100)}% vs yesterday`
      : 'no logins yesterday';
  }

  // Show the working window (08–17) plus any hour outside it that actually has activity.
  let hours = o ? o.byHour : [];
  if (o) {
    const active = o.byHour.filter((h) => h.count > 0).map((h) => h.hour);
    const from = Math.min(8, ...active), to = Math.max(17, ...active);
    hours = o.byHour.filter((h) => h.hour >= from && h.hour <= to);
  }
  const maxHour = Math.max(1, ...hours.map((h) => h.count));
  const maxLogins = Math.max(1, ...(o?.daily || []).map((d) => d.logins));
  const peakHour = hours.reduce((m, h) => (h.count > m ? h.count : m), 0);

  return (
    <div>
      <h2 style={{ fontSize: 20 }} className="mb">Daily user activity</h2>
      <LiveBar live={live} />
      <div className="grid g4 mb">
        <div className="kpi b"><div className="lab">Logins today</div><div className="val">{num(o?.today.logins)}</div><div className="sub">{o ? delta : ' '}</div></div>
        <div className="kpi g"><div className="lab">Daily active users</div><div className="val">{num(o?.today.activeUsers)}</div><div className="sub">{o ? `of ${num(o.users.total)} registered` : ' '}</div></div>
        <div className="kpi o"><div className="lab">Avg session length</div><div className="val">{o ? (o.today.avgSessionMin === null ? '—' : o.today.avgSessionMin + 'm') : '—'}</div><div className="sub">{o && o.today.avgSessionMin === null ? 'no completed sessions today' : o ? 'completed sessions today' : ' '}</div></div>
        <div className="kpi p"><div className="lab">Peak concurrent</div><div className="val">{num(o?.today.peakConcurrent)}</div><div className="sub">{o?.today.peakAt ? 'at ' + fmtTime(o.today.peakAt) : o ? 'no sessions today' : ' '}</div></div>
      </div>
      <div className="grid g2">
        <div className="card"><div className="card-h"><h3>Logins — last 14 days</h3></div><div className="card-b">
          {!o ? <div className="muted small">{live.error ? 'Unavailable' : 'Loading…'}</div> : (
            <div className="chartbars">
              {o.daily.map((d) => <div key={d.date} className="cb" title={`${d.date}: ${d.logins} logins, ${d.users} users`}><i style={{ height: (d.logins / maxLogins * 100) + '%' }} /><span>{Number(d.date.slice(8))}</span></div>)}
            </div>
          )}
        </div></div>
        <div className="card"><div className="card-h"><h3>Activity by hour (today)</h3></div><div className="card-b">
          {!o ? <div className="muted small">{live.error ? 'Unavailable' : 'Loading…'}</div> : (
            <div className="chartbars">
              {hours.map((h) => <div key={h.hour} className={'cb ' + (peakHour > 0 && h.count === peakHour ? 'g' : '')}><b className="xs">{h.count || ''}</b><i style={{ height: (h.count / maxHour * 100) + '%' }} /><span>{String(h.hour).padStart(2, '0')}</span></div>)}
            </div>
          )}
        </div></div>
      </div>
    </div>
  );
}
