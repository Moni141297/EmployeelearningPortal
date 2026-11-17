import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { StatusTag, ResultTag } from '../../components/ui/Tags';
import { canJoinNow, examJoinOpensAt, isEventExpired, todayStr } from '../../lib/helpers';
import type { ExamEvent } from '../../types';

export default function Events() {
  const currentUser = useStore((s) => s.currentUser)!;
  const events = useStore((s) => s.events);
  const topicOf = useStore((s) => s.topic);
  const joinEvent = useStore((s) => s.joinEvent);
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  // The join gate (canJoinNow) is time-based, not store-driven, so nothing
  // would normally trigger a re-render the moment it flips open — tick once
  // a minute just to re-evaluate it.
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 30000);
    return () => clearInterval(t);
  }, []);

  const me = currentUser.id;
  const mine = events.filter((e) => e.status !== 'Draft' && (e.type === 'Open' || e.parts.includes(me)));
  // A Scheduled event the server hasn't swept yet (see sweepExpiredEvents in
  // events.js — nothing re-fetches the list on a timer) is hidden here too,
  // same as a past one: it's effectively cancelled already, just not
  // persisted as such until the next write touches it.
  const live = mine.filter((e) => (e.status === 'Scheduled' || e.status === 'Live' || e.status === 'Waiting') && !(e.status === 'Scheduled' && isEventExpired(e.date, e.time)));
  const today = todayStr();
  const available = live.filter((e) => e.status !== 'Scheduled' || e.date <= today);
  const upcoming = live.filter((e) => e.status === 'Scheduled' && e.date > today);
  const done = mine.filter((e) => e.status === 'Completed');

  function goJoin(id: string) { joinEvent(id, me); navigate(`/app/participant/wait/${id}`); }

  function joinByCode() {
    const v = code.trim();
    // A rescheduled examination can reuse its old code, so a Completed/
    // Cancelled event may share it with a newer active one — prefer the
    // active match so the stale record never shadows the joinable one.
    const matches = events.filter((x) => x.code === v);
    const e = matches.find((x) => x.status !== 'Completed' && x.status !== 'Cancelled') || matches[0];
    if (!e) { setErr('Invalid event code. Please check with your trainer.'); return; }
    if (e.status === 'Draft') { setErr('This examination is not yet published.'); return; }
    if (e.status === 'Completed') { setErr('This examination has already been completed.'); return; }
    if (e.status === 'Cancelled') { setErr('This examination has been cancelled.'); return; }
    if (e.status === 'Scheduled' && isEventExpired(e.date, e.time)) { setErr('This examination was never started and has been cancelled.'); return; }
    if (e.type === 'Private' && !e.parts.includes(me)) { setErr('You are not on the participant list for this private examination.'); return; }
    if (e.status === 'Scheduled' && !canJoinNow(e.date, e.time)) {
      setErr(`This examination will be accessible from ${examJoinOpensAt(e.date, e.time).toLocaleString()} — please wait until then.`);
      return;
    }
    goJoin(e.id);
  }

  function eventCard(e: ExamEvent) {
    // Once the trainer has moved it to Waiting/Live themselves, join is
    // always allowed — the scheduled-time gate only applies while it's still
    // sitting at its original Scheduled time.
    const gated = e.status === 'Scheduled' && !canJoinNow(e.date, e.time);
    return (
      <div key={e.id} className="card"><div className="card-b">
        <div className="spread mb"><b>{e.name}</b><StatusTag status={e.status} /></div>
        <div className="xs muted">{topicOf(e.topic).name}</div>
        <div className="row wrap mt">
          <span className={'tag ' + (e.type === 'Open' ? 'g' : 'b')}>{e.type}</span>
          <span className="tag">{e.date} {e.time}</span>
          <span className="tag">{e.count} questions</span>
          <span className="tag">Pass {e.pass}%</span>
          {e.cert && <span className="tag p">❖ Certification</span>}
        </div>
        <div className="row mt"><span className="small muted mono">Code {e.code}</span><div className="grow" />
          <button className="btn pri sm" disabled={gated} title={gated ? `Accessible from ${examJoinOpensAt(e.date, e.time).toLocaleString()}` : undefined} onClick={() => goJoin(e.id)}>
            {gated ? `Opens ${examJoinOpensAt(e.date, e.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Join waiting room →'}
          </button>
        </div>
      </div></div>
    );
  }

  return (
    <div>
      <div className="grid g2 mb">
        <div className="card"><div className="card-b">
          <b>Join with an event code</b>
          <div className="muted small mb">Your trainer will share a 6-digit code for the examination.</div>
          <div className="row">
            <input className="inp mono" placeholder="e.g. 824591" maxLength={6} style={{ fontSize: 19, letterSpacing: 4, textAlign: 'center' }}
              value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') joinByCode(); }} />
            <button className="btn pri" onClick={joinByCode}>Join →</button>
          </div>
          {err && <div className="hint" style={{ color: 'var(--bad)' }}>{err}</div>}
        </div></div>
        <div className="card"><div className="card-b">
          <b>How a live examination works</b>
          <div className="col small muted" style={{ gap: 6, marginTop: 8 }}>
            {['Join using the code, or opt in to an open event', 'Wait in the waiting room until the trainer starts', 'Answer randomised questions against a per-question timer', 'Results and leaderboard are published immediately', 'Passing an examination with certification enabled issues your certificate']
              .map((s, i) => <div key={i} className="row"><span className="rank" style={{ width: 22, height: 22, fontSize: 11 }}>{i + 1}</span><span>{s}</span></div>)}
          </div>
        </div></div>
      </div>

      <h3 className="mb" style={{ fontSize: 16 }}>Available</h3>
      {available.length ? (
        <div className="grid g2 mb">{available.map(eventCard)}</div>
      ) : <div className="card mb"><div className="empty">No examinations available today</div></div>}

      <h3 className="mb" style={{ fontSize: 16 }}>Upcoming</h3>
      {upcoming.length ? (
        <div className="grid g2 mb">{upcoming.map(eventCard)}</div>
      ) : <div className="card mb"><div className="empty">No upcoming examinations scheduled</div></div>}

      <h3 className="mb" style={{ fontSize: 16 }}>Completed</h3>
      <div className="card"><div className="tbl-wrap">
        {done.length ? (
          <table>
            <thead><tr><th>Examination</th><th>Topic</th><th>Date</th><th className="right">Your score</th><th>Result</th><th></th></tr></thead>
            <tbody>
              {done.map((e) => {
                const r = (e.results || []).find((x) => x.u === me);
                return (
                  <tr key={e.id}>
                    <td><b className="small">{e.name}</b></td>
                    <td className="small">{topicOf(e.topic).name}</td>
                    <td className="small muted">{e.date}</td>
                    <td className="right bold">{r ? r.s + '%' : '—'}</td>
                    <td>{r ? <ResultTag result={r.result ?? (r.s >= e.pass ? 'Pass' : 'Fail')} /> : <span className="tag">Did not attend</span>}</td>
                    <td className="right">
                      {/* {r?.result === 'Incomplete' && <button className="btn sm" onClick={() => requestRetakeNotify(e.topic)}>🔔 Notify me</button>}{' '} */}
                      {e.lb && <button className="btn sm" onClick={() => navigate(`/app/participant/leaderboard/${e.id}`)}>Leaderboard</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : <div className="empty">No completed examinations</div>}
      </div></div>
    </div>
  );
}
