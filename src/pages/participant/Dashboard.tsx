import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Bar, ResultTag, StatusTag } from '../../components/ui/Tags';
import { progressOf } from '../../lib/selectors';
import { isEventExpired } from '../../lib/helpers';

export default function ParticipantDashboard() {
  const currentUser = useStore((s) => s.currentUser)!;
  const attempts = useStore((s) => s.attempts);
  const certs = useStore((s) => s.certs);
  const topics = useStore((s) => s.topics);
  const events = useStore((s) => s.events);
  const progress = useStore((s) => s.progress);
  const slidesMap = useStore((s) => s.slides);
  const pathOf = useStore((s) => s.path);
  const productOf = useStore((s) => s.productOf);
  const joinEvent = useStore((s) => s.joinEvent);
  const navigate = useNavigate();
  const progOf = (uid: string, tid: string) => progressOf(progress, uid, tid, (slidesMap[tid] || []).length);

  const me = currentUser.id;
  const myAtt = attempts.filter((a) => a.user === me);
  const myCerts = certs.filter((c) => c.user === me);
  const inProg = topics.filter((t) => { const p = progOf(me, t.id); return p.pct > 0 && p.pct < 100; });
  const upcoming = events.filter((e) =>
    (e.status === 'Live' || e.status === 'Waiting' || (e.status === 'Scheduled' && !isEventExpired(e.date, e.time))) &&
    (e.type === 'Open' || e.parts.includes(me)));
  // Exclude attempts recorded against a since-fixed 0-question paper (total
  // === 0) from "best score" — they were never genuinely graded, so letting
  // one through could show a false 0% as the participant's best.
  const scoredAtt = myAtt.filter((a) => a.total > 0);
  const best = scoredAtt.length ? Math.max(...scoredAtt.map((a) => a.pct)) : 0;
  const recommended = topics.filter((t) => t.status === 'Published' && progOf(me, t.id).pct === 0).slice(0, 3);

  function goJoin(id: string) { joinEvent(id, me); navigate(`/app/participant/wait/${id}`); }

  return (
    <div>
      <div className="spread mb">
        <div>
          <h2 style={{ fontSize: 21 }}>Welcome back, {currentUser.name.split(' ')[0]}</h2>
          <div className="muted small">{currentUser.desig} · {currentUser.dept} · {currentUser.plant}</div>
        </div>
        <button className="btn pri" onClick={() => navigate('/app/participant/learn')}>Continue learning →</button>
      </div>

      <div className="grid g4 mb">
        <div className="kpi b"><div className="lab">Topics in progress</div><div className="val">{inProg.length}</div>
          <div className="sub">{topics.filter((t) => progOf(me, t.id).pct === 100).length} completed</div></div>
        <div className="kpi g"><div className="lab">Best assessment score</div><div className="val">{best}%</div>
          <div className="sub">{myAtt.length} attempts recorded</div></div>
        <div className="kpi o"><div className="lab">Upcoming examinations</div><div className="val">{upcoming.length}</div>
          <div className="sub">{upcoming[0] ? upcoming[0].time + ' today' : 'None scheduled'}</div></div>
        <div className="kpi p"><div className="lab">Certifications earned</div><div className="val">{myCerts.length}</div>
          <div className="sub">{myCerts.length ? 'Latest: ' + (topics.find((t) => t.id === myCerts[0].topic)?.name || '') : 'Pass an exam to earn one'}</div></div>
      </div>

      <div className="grid g2">
        <div className="card">
          <div className="card-h"><h3>Continue learning</h3><a className="small" onClick={() => navigate('/app/participant/learn')} style={{ cursor: 'pointer' }}>Browse all →</a></div>
          <div className="card-b">
            {inProg.length ? inProg.map((t) => {
              const p = progOf(me, t.id);
              return (
                <div key={t.id} className="mb" style={{ paddingBottom: 12, borderBottom: '1px solid var(--line)' }}>
                  <div className="spread">
                    <div><b>{t.name}</b><div className="xs muted">{pathOf(t.id)}</div></div>
                    <button className="btn sm pri" onClick={() => navigate(`/app/participant/viewer/${t.id}`)}>Resume</button>
                  </div>
                  <div className="mt"><Bar pct={p.pct} /></div>
                  <div className="xs muted" style={{ marginTop: 4 }}>Progress {p.pct}% · {p.viewed.length} / {p.total} slides</div>
                </div>
              );
            }) : (
              <div className="empty"><div className="big">▤</div>Nothing in progress yet
                <div className="mt"><button className="btn pri sm" onClick={() => navigate('/app/participant/learn')}>Start learning</button></div></div>
            )}
            <div className="bold small mt2 mb">Recommended for you</div>
            {recommended.map((t) => (
              <div key={t.id} className="row" style={{ padding: '7px 0', borderBottom: '1px solid var(--line)' }}>
                <div className="grow"><b className="small">{t.name}</b><div className="xs muted">{productOf(t.id).name}</div></div>
                <button className="btn sm" onClick={() => navigate(`/app/participant/viewer/${t.id}`)}>Open</button>
              </div>
            ))}
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-h"><h3>Live events</h3><a className="small" onClick={() => navigate('/app/participant/events')} style={{ cursor: 'pointer' }}>All events →</a></div>
            <div className="card-b">
              {upcoming.length ? upcoming.map((e) => (
                <div key={e.id} className="spread mb" style={{ padding: 10, border: '1px solid var(--line)', borderRadius: 10, background: 'var(--panel-2)' }}>
                  <div>
                    <b className="small">{e.name}</b>
                    <div className="xs muted">{topics.find((t) => t.id === e.topic)?.name} · {e.date} {e.time} · {e.count} questions</div>
                    <div className="xs mt" style={{ marginTop: 4 }}>
                      <StatusTag status={e.status} /> <span className={'tag ' + (e.type === 'Open' ? 'g' : 'b')}>{e.type}</span> <span className="tag">Pass {e.pass}%</span>
                    </div>
                  </div>
                  <button className="btn sm pri" onClick={() => goJoin(e.id)}>Join</button>
                </div>
              )) : <div className="muted small">No upcoming examinations.</div>}
            </div>
          </div>
          <div className="card">
            <div className="card-h"><h3>Recent attempts</h3><a className="small" onClick={() => navigate('/app/participant/history')} style={{ cursor: 'pointer' }}>History →</a></div>
            <div className="tbl-wrap">
              {myAtt.length ? (
                <table>
                  <thead><tr><th>Topic</th><th>Date</th><th className="right">Score</th><th>Result</th></tr></thead>
                  <tbody>
                    {myAtt.slice().reverse().slice(0, 4).map((a) => (
                      <tr key={a.id}>
                        <td><b className="small">{topics.find((t) => t.id === a.topic)?.name}</b></td>
                        <td className="small muted">{a.date}</td>
                        <td className="right bold">{a.pct}%</td>
                        <td><ResultTag result={a.result} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : <div className="empty">No attempts yet</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
