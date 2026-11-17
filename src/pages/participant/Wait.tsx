import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { getSocket } from '../../lib/socket';

export default function Wait() {
  const { eventId } = useParams();
  const currentUser = useStore((s) => s.currentUser)!;
  const events = useStore((s) => s.events);
  const userById = useStore((s) => s.userById);
  const pathOf = useStore((s) => s.path);
  const leaveWait = useStore((s) => s.leaveWait);
  const launchExam = useStore((s) => s.launchExam);
  const tryResumeExam = useStore((s) => s.tryResumeExam);
  const joinEvent = useStore((s) => s.joinEvent);
  const toast = useStore((s) => s.toast);
  const navigate = useNavigate();

  const ev = events.find((e) => e.id === eventId);

  // This page always shows "you" as joined locally, but that's only real to
  // everyone else (the trainer's waiting room, other participants) once the
  // server/socket actually know about it. goJoin() in Events.tsx already
  // does this before navigating here, but a direct URL, refresh, or bookmark
  // reaches this page without ever calling it — so join unconditionally on
  // mount too; it's a harmless no-op if already joined.
  useEffect(() => {
    if (!ev) return;
    joinEvent(ev.id, currentUser.id);
    // If the socket reconnects (e.g. the backend restarted) while this page
    // is already open, the transport comes back automatically but room
    // membership does not — without re-joining here, the trainer would
    // silently stop seeing this participant until they left and rejoined.
    const socket = getSocket();
    const rejoin = () => joinEvent(ev.id, currentUser.id);
    socket?.on('connect', rejoin);
    return () => { socket?.off('connect', rejoin); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ev?.id, currentUser.id]);

  // The trainer can end the examination before this participant ever gets to
  // start it (e.g. they leave the room without starting) — the moment that
  // reaches this socket, get them out of a waiting room for an exam that no
  // longer exists, rather than leaving them stuck on "waiting for trainer" forever.
  useEffect(() => {
    if (ev && ev.status === 'Completed') {
      toast('This examination has ended.', 'warn');
      navigate('/app/participant/events');
    }
    if (ev && ev.status === 'Cancelled') {
      toast('This examination has been cancelled.', 'warn');
      navigate('/app/participant/events');
    }
  }, [ev, navigate, toast]);

  if (!ev) return <Navigate to="/app/participant/events" replace />;

  // Real participants, pushed live over the socket as they join/leave the
  // room (see useStore's participant:joined/left handlers) — no simulation.
  const joinedOthers = ev.joined.filter((u) => u !== currentUser.id).map((u) => userById(u).name);
  const live = ev.status === 'Live';

  async function enter() {
    // If this participant already started answering (e.g. the page was
    // reloaded or the network dropped), resume the paper held in Redis
    // instead of generating a fresh one — no reattempt, no lost progress.
    const resumed = await tryResumeExam(ev!.topic, 'live', ev!.id, currentUser.id);
    if (!resumed) {
      const err = launchExam(ev!.topic, 'live', ev!.id, currentUser.id);
      if (err) { toast(err, 'bad'); return; }
    }
    navigate('/app/participant/exam');
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(150deg,#0f1c33,#14294b)', color: '#fff', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div style={{ maxWidth: 720, width: '100%' }}>
        <div className="center">
          <div className="tag b" style={{ background: 'rgba(255,255,255,.14)', color: '#fff', borderColor: 'transparent' }}>Waiting room</div>
          <h1 style={{ fontSize: 28, margin: '14px 0 6px' }}>{ev.name}</h1>
          <div style={{ color: '#a9bcd6' }}>{pathOf(ev.topic)}</div>
          <div className="row" style={{ justifyContent: 'center', margin: '18px 0', flexWrap: 'wrap' }}>
            {[`Event code ${ev.code}`, `${ev.count} questions`, `${ev.defTime}s per question`, `Pass ${ev.pass}%`, ev.cert ? '❖ Certification enabled' : null]
              .filter(Boolean).map((t, i) => <span key={i} className="tag" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', borderColor: 'transparent' }}>{t}</span>)}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 14, padding: 20 }}>
          <div className="spread mb"><b>Participants joined</b><span className="tag" style={{ background: 'rgba(255,255,255,.12)', color: '#fff', borderColor: 'transparent' }}>{joinedOthers.length + 1}</span></div>
          <div className="waitgrid">
            <div className="wchip" style={{ background: 'rgba(255,255,255,.14)', borderColor: 'transparent', color: '#fff' }}><span className="pulse-dot" />{currentUser.name} (you)</div>
            {joinedOthers.map((n) => <div key={n} className="wchip" style={{ background: 'rgba(255,255,255,.08)', borderColor: 'transparent', color: '#dbeafe' }}><span className="pulse-dot" />{n}</div>)}
          </div>
        </div>
        <div className="center" style={{ marginTop: 22 }}>
          {live ? (
            <>
              <div style={{ color: '#4ade80' }}><b>✓ The trainer has started the examination</b></div>
              <div style={{ marginTop: 16 }}><button className="btn ok lg" onClick={enter}>Enter examination →</button></div>
            </>
          ) : <div style={{ color: '#a9bcd6' }}>⏳ Waiting for the trainer to start the examination…</div>}
          <button className="btn ghost" style={{ color: '#93c5fd', marginTop: 10 }} onClick={() => { leaveWait(ev.id, currentUser.id); navigate('/app/participant/events'); }}>Leave waiting room</button>
        </div>
      </div>
    </div>
  );
}
