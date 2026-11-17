import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Bar, StatusTag } from '../../components/ui/Tags';
import { openExamEditor } from './examEditor';
import { api } from '../../lib/api';
import type { Attempt } from '../../types';

export default function TrainerDashboard() {
  const currentUser = useStore((s) => s.currentUser)!;
  const events = useStore((s) => s.events);
  const topics = useStore((s) => s.topics);
  const slides = useStore((s) => s.slides);
  const questions = useStore((s) => s.questions);
  const certs = useStore((s) => s.certs);
  const expertQs = useStore((s) => s.expertQs);
  const userById = useStore((s) => s.userById);
  const topicOf = useStore((s) => s.topic);
  const navigate = useNavigate();

  // Everyone's self-assessment attempts, not just the logged-in trainer's own
  // (which is all `s.attempts` ever holds) — see Analytics.tsx for the same
  // fix and why it's needed.
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    api.analytics.overview().then((o) => setAttempts(o.attempts)).catch(() => setAttempts([])).finally(() => setLoaded(true));
  }, []);
  const scored = attempts.filter((a) => a.total > 0);

  const pend = expertQs.filter((x) => x.status === 'Raised');
  const passPct = scored.length ? Math.round(scored.filter((a) => a.result === 'Pass').length / scored.length * 100) : 0;

  return (
    <div>
      <div className="spread mb">
        <div><h2 style={{ fontSize: 21 }}>Trainer workspace</h2><div className="muted small">{currentUser.name} · {currentUser.desig}</div></div>
        <div className="row">
          <button className="btn" onClick={() => navigate('/app/trainer/builder')}>✎ Content Builder</button>
          <button className="btn pri" onClick={() => openExamEditor(null)}>+ Create examination</button>
        </div>
      </div>
      <div className="grid g5 mb">
        <div className="kpi b"><div className="lab">Topics</div><div className="val">{topics.length}</div><div className="sub">{topics.filter((t) => t.status === 'Published').length} published</div></div>
        <div className="kpi b"><div className="lab">Learning slides</div><div className="val">{Object.values(slides).reduce((s, a) => s + a.length, 0)}</div><div className="sub">across {Object.keys(slides).length} modules</div></div>
        <div className="kpi p"><div className="lab">Questions</div><div className="val">{questions.length}</div><div className="sub">{questions.filter((q) => q.mandatory).length} mandatory</div></div>
        <div className="kpi o"><div className="lab">Examinations</div><div className="val">{events.length}</div><div className="sub">{events.filter((e) => ['Scheduled', 'Waiting', 'Live'].includes(e.status)).length} upcoming / live</div></div>
        <div className="kpi g"><div className="lab">Certificates issued</div><div className="val">{certs.length}</div><div className="sub">{loaded ? passPct + '% overall pass rate' : 'Loading…'}</div></div>
      </div>
      <div className="grid g2">
        <div className="card">
          <div className="card-h"><h3>Examinations</h3><a className="small" onClick={() => navigate('/app/trainer/exams')} style={{ cursor: 'pointer' }}>Manage →</a></div>
          <div className="tbl-wrap"><table>
            <thead><tr><th>Examination</th><th>Status</th><th>Date</th><th className="right">Participants</th><th></th></tr></thead>
            <tbody>
              {events.slice(0, 5).map((e) => (
                <tr key={e.id}>
                  <td><b className="small">{e.name}</b><div className="xs muted">{topicOf(e.topic).name} · code {e.code}</div></td>
                  <td><StatusTag status={e.status} /></td>
                  <td className="small muted">{e.date} {e.time}</td>
                  <td className="right">{e.type === 'Open' ? 'Open' : e.parts.length}</td>
                  <td className="right">{e.status === 'Completed'
                    ? <button className="btn sm" onClick={() => navigate(`/app/trainer/results/${e.id}`)}>Results</button>
                    : <button className="btn sm pri" onClick={() => navigate(`/app/trainer/live/${e.id}`)}>Control</button>}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
        <div className="col">
          <div className="card"><div className="card-h"><h3>Pending expert questions</h3>{pend.length ? <span className="tag r">{pend.length} waiting</span> : <span className="tag g">All clear</span>}</div>
            <div className="card-b">
              {pend.length ? pend.map((x) => (
                <div key={x.id} className="mb" style={{ paddingBottom: 10, borderBottom: '1px solid var(--line)' }}>
                  <div className="small">{x.q.slice(0, 110)}</div>
                  <div className="xs muted mt" style={{ marginTop: 4 }}>{userById(x.user).name} · {topicOf(x.topic).name} · {x.date}</div>
                  <button className="btn sm pri mt" onClick={() => navigate('/app/trainer/expert')}>Respond →</button>
                </div>
              )) : <div className="muted small">No questions awaiting a response.</div>}
            </div>
          </div>
          <div className="card"><div className="card-h"><h3>Topic performance</h3><a className="small" onClick={() => navigate('/app/trainer/analytics')} style={{ cursor: 'pointer' }}>Analytics →</a></div>
            <div className="card-b">
              {!loaded ? <div className="muted small">Loading…</div> : (<>
                {topics.slice(0, 5).map((t) => {
                  const at = scored.filter((a) => a.topic === t.id);
                  const av = at.length ? Math.round(at.reduce((s, a) => s + a.pct, 0) / at.length) : 0;
                  return <div key={t.id} className="hbar"><span>{t.name}</span><Bar pct={av} cls={av >= t.pass ? 'g' : 'r'} /><b className="small right">{at.length ? av + '%' : '—'}</b></div>;
                })}
                <div className="xs muted mt">Average score by topic across all recorded attempts</div>
              </>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
