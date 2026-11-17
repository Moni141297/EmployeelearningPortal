import { useStore } from '../../store/useStore';
import { api } from '../../lib/api';
import { useLive } from '../../lib/useLive';
import { Bar } from '../../components/ui/Tags';
import LiveBar, { fmtUptime, num } from './LiveBar';

export default function Usage() {
  const topics = useStore((s) => s.topics);
  const live = useLive(() => api.admin.overview(), 15000);
  const o = live.data;

  const stats: [string, number, string][] = o ? [
    ['Learning sessions', o.usage.learning.total, `${num(o.usage.learning.month)} this month`],
    ['Assessment attempts', o.usage.attempts.total, `${num(o.usage.attempts.month)} this month · all modes`],
    ['Examination participation', o.usage.exams.participants, `Across ${num(o.usage.exams.events)} events · ${num(o.usage.exams.month)} this month`],
    ['AI chatbot conversations', o.usage.ai.total, `${num(o.usage.ai.month)} this month · topic-scoped`],
    ['Expert questions', o.usage.expert.total, `${num(o.usage.expert.month)} this month · escalated from AI`],
    ['Certificates issued', o.usage.certificates.total, `${num(o.usage.certificates.month)} this month`],
  ] : [];

  const modules = (o?.moduleUsage || []).slice(0, 6).map((m) => ({ ...m, name: topics.find((t) => t.id === m.topicId)?.name || 'Topic ' + m.topicId }));
  const maxLearners = Math.max(1, ...modules.map((m) => m.learners));

  const h = o?.health;
  const health: [string, string, string][] = h ? [
    ['Database response time', h.dbMs + ' ms', h.dbMs < 500 ? 'g' : h.dbMs < 1500 ? 'o' : 'r'],
    ['API server uptime', fmtUptime(h.uptimeSec), 'g'],
    ['Live connections', String(h.liveConnections), 'g'],
    ['AI knowledge base', h.kbLoaded ? num(h.kbChunks) + ' chunks loaded' : 'Not loaded', h.kbLoaded ? 'g' : 'r'],
    ['OTPs issued (24h)', String(h.otpIssued24h), ''],
    ['Failed OTP attempts (24h)', String(h.failedOtp24h), h.failedOtp24h > 0 ? 'o' : 'g'],
  ] : [];

  return (
    <div>
      <h2 style={{ fontSize: 20 }} className="mb">Application usage statistics</h2>
      <LiveBar live={live} />
      <div className="grid g3 mb">
        {!o ? <div className="muted small">{live.error ? 'Unavailable' : 'Loading…'}</div>
          : stats.map((r) => <div key={r[0]} className="kpi b"><div className="lab">{r[0]}</div><div className="val">{num(r[1])}</div><div className="sub">{r[2]}</div></div>)}
      </div>
      <div className="grid g2">
        <div className="card"><div className="card-h"><h3>Most used modules</h3><span className="xs muted">learners per module</span></div><div className="card-b">
          {!o ? <div className="muted small">{live.error ? 'Unavailable' : 'Loading…'}</div>
            : !modules.length ? <div className="muted small">No learning activity recorded yet.</div>
            : modules.map((m) => <div key={m.topicId} className="hbar"><span>{m.name}</span><Bar pct={(m.learners / maxLearners) * 100} /><b className="small right">{m.learners}</b></div>)}
        </div></div>
        <div className="card"><div className="card-h"><h3>Platform health</h3></div><div className="card-b">
          {!o ? <div className="muted small">{live.error ? 'Unavailable' : 'Loading…'}</div>
            : health.map((r) => <div key={r[0]} className="spread small" style={{ padding: '8px 0', borderBottom: '1px solid var(--line)' }}><span className="muted">{r[0]}</span><span className={'tag ' + r[2]}>{r[1]}</span></div>)}
        </div></div>
      </div>
    </div>
  );
}
