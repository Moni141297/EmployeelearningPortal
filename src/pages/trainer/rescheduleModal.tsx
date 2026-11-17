import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ApiError } from '../../lib/api';
import { todayStr } from '../../lib/helpers';
import type { Topic } from '../../types';

export function openRescheduleModal(id: string) {
  useStore.getState().openModal(<RescheduleModal id={id} />);
}

function randomCode() { return String(Math.floor(100000 + Math.random() * 900000)); }

function RescheduleModal({ id }: { id: string }) {
  const events = useStore((s) => s.events);
  const topics = useStore((s) => s.topics);
  const userById = useStore((s) => s.userById);
  const saveExam = useStore((s) => s.saveExam);
  const saveTopic = useStore((s) => s.saveTopic);
  const closeModal = useStore((s) => s.closeModal);
  const toast = useStore((s) => s.toast);
  const currentUser = useStore((s) => s.currentUser)!;
  const navigate = useNavigate();

  const existing = events.find((e) => e.id === id)!;
  const topic = topics.find((t) => t.id === existing.topic)!;
  const results = existing.results || [];
  const resultByUser = new Map(results.map((r) => [r.u, r]));
  const completedIds = results.filter((r) => r.result !== 'Incomplete').map((r) => r.u);
  const incompleteIds = results.filter((r) => r.result === 'Incomplete').map((r) => r.u);
  // "Not attended" only applies to a Private (invite-only) event — an Open
  // event has no fixed invite list to compare joiners against.
  const notAttendedIds = existing.type === 'Private' ? existing.parts.filter((uid) => !resultByUser.has(uid)) : [];

  // Rescheduling can recreate this as another live event, or — since a self
  // assessment is just config on the topic itself, not a separate record —
  // use the same completed exam's settings to (re-)enable self assessment
  // for the topic instead. Either direction is just "what should participants
  // be able to do about this topic next," so both live in the same modal.
  const [kind, setKind] = useState<'scheduled' | 'self'>('scheduled');
  const [name, setName] = useState(existing.name + ' (Retake)');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(existing.time);
  const [count, setCount] = useState(existing.count);
  const [pass, setPass] = useState(existing.pass);
  const [defTime, setDefTime] = useState(existing.defTime);
  const [lb, setLb] = useState(existing.lb);
  const [res, setRes] = useState(existing.res);
  const [cert, setCert] = useState(existing.cert);
  const [openToAll, setOpenToAll] = useState<boolean>(existing.type === 'Open');
  // Completed/Cancelled events (the only ones this modal reschedules) keep
  // their old code around for history/search, so reusing it is a real choice
  // — not just "use whatever's free" — and must be explicit per-reschedule.
  const [codeChoice, setCodeChoice] = useState<'new' | 'existing'>('new');
  // Incomplete participants (cut short by the trainer ending the exam) are
  // the obvious default re-invite list; completed and no-show participants
  // can still be added in if the trainer wants everyone to reattempt.
  const [selected, setSelected] = useState<string[]>(incompleteIds);
  const [saving, setSaving] = useState(false);

  function toggle(uid: string) {
    setSelected((prev) => (prev.includes(uid) ? prev.filter((x) => x !== uid) : [...prev, uid]));
  }
  function selectAll() { setSelected([...new Set([...completedIds, ...incompleteIds, ...notAttendedIds])]); }
  function selectNone() { setSelected([]); }

  function group(title: string, ids: string[]) {
    if (!ids.length) return null;
    return (
      <div className="mt">
        <b className="small">{title} <span className="tag">{ids.length}</span></b>
        <div className="card pad" style={{ maxHeight: 130, overflow: 'auto', background: 'var(--panel-2)' }}>
          {ids.map((uid) => {
            const u = userById(uid);
            return (
              <label key={uid} className="row small" style={{ padding: '3px 0' }}>
                <input type="checkbox" checked={selected.includes(uid)} onChange={() => toggle(uid)} /> {u.name} <span className="muted xs">{u.emp} · {u.dept}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  async function submitScheduled(status: 'Scheduled' | 'Waiting') {
    if (!name.trim()) { toast('Examination name is required', 'bad'); return; }
    if (!openToAll && !selected.length) { toast('Select at least one participant, or choose "Open to all"', 'bad'); return; }
    setSaving(true);
    try {
      const ev = await saveExam(null, {
        name, topic: existing.topic, code: codeChoice === 'existing' ? existing.code : randomCode(), type: openToAll ? 'Open' : 'Private',
        date, time, count, pass, defTime, status, lb, res, cert,
        parts: openToAll ? [] : selected, by: currentUser.id,
      });
      closeModal();
      toast('Examination rescheduled (' + status + ')', 'ok');
      if (status === 'Waiting') { useStore.getState().auditLog('Examination start', 'Examination ' + ev.id); navigate(`/app/trainer/live/${ev.id}`); }
      else navigate('/app/trainer/exams');
    } catch (err) {
      setSaving(false);
      toast(err instanceof ApiError ? err.message : 'Could not reschedule the examination — please try again', 'bad');
    }
  }

  function submitSelf() {
    if (!openToAll && !selected.length) { toast('Select at least one participant, or choose "Open to all"', 'bad'); return; }
    saveTopic(topic.id, {
      ...topic, pass, defTime, examCount: count,
      mode: openToAll ? 'Open' : 'Private', lb, res, cert,
      parts: openToAll ? [] : selected,
    } as Omit<Topic, 'id'>);
    closeModal();
    toast('Self assessment re-enabled for this topic', 'ok');
    navigate('/app/trainer/exams');
  }

  const noHistory = !incompleteIds.length && !completedIds.length && !notAttendedIds.length;

  return (
    <div className="modal wide">
      <div className="modal-h"><h3>Reschedule: {existing.name}</h3><button className="btn ghost" onClick={closeModal}>✕</button></div>
      <div className="modal-b">
        <div className="hint mb">
          This creates a new, separate examination (or re-enables self assessment) for the same topic — the completed
          event's own results and certificates stay untouched. Pick who should attend — incomplete participants are
          pre-selected.
        </div>
        <label className="f">Reschedule as</label>
        <div className="row mb" style={{ gap: 8 }}>
          <button type="button" className={'btn sm' + (kind === 'scheduled' ? ' pri' : '')} onClick={() => setKind('scheduled')}>Scheduled examination</button>
          <button type="button" className={'btn sm' + (kind === 'self' ? ' pri' : '')} onClick={() => setKind('self')}>Self assessment</button>
        </div>
        {kind === 'scheduled' && (
          <>
            <label className="f">Examination name <span className="req">*</span></label>
            <input className="inp" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="fieldrow mt">
              <div><label className="f">Date</label><input className="inp" type="date" value={date} min={todayStr()} onChange={(e) => setDate(e.target.value)} /></div>
              <div><label className="f">Start time</label><input className="inp" type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
            </div>
            <label className="f mt">Event code</label>
            <div className="row" style={{ gap: 8 }}>
              <button type="button" className={'btn sm' + (codeChoice === 'new' ? ' pri' : '')} onClick={() => setCodeChoice('new')}>Generate new code</button>
              <button type="button" className={'btn sm' + (codeChoice === 'existing' ? ' pri' : '')} onClick={() => setCodeChoice('existing')}>Keep existing code ({existing.code})</button>
            </div>
          </>
        )}
        <div className="fieldrow mt">
          <div><label className="f">Number of questions</label><input className="inp" type="number" value={count} onChange={(e) => setCount(+e.target.value)} /></div>
          <div><label className="f">Pass percentage</label><input className="inp" type="number" value={pass} onChange={(e) => setPass(+e.target.value)} /></div>
        </div>
        <div className="fieldrow mt">
          <div><label className="f">Default time per question (seconds)</label><input className="inp" type="number" value={defTime} onChange={(e) => setDefTime(+e.target.value)} /></div>
        </div>
        <div className="card pad mt" style={{ background: 'var(--panel-2)' }}>
          <b className="small">Visibility &amp; certification</b>
          <label className="row small mt"><input type="checkbox" checked={lb} onChange={(e) => setLb(e.target.checked)} /> Show leaderboard to participants</label>
          <label className="row small"><input type="checkbox" checked={res} onChange={(e) => setRes(e.target.checked)} /> {kind === 'self' ? 'Show results to the participant after each attempt' : 'Publish results to participants immediately'}</label>
          <label className="row small"><input type="checkbox" checked={cert} onChange={(e) => setCert(e.target.checked)} /> Issue a certificate to participants who pass</label>
        </div>
        <label className="row small mt"><input type="checkbox" checked={openToAll} onChange={(e) => setOpenToAll(e.target.checked)} /> Open to all participants (instead of choosing individually below)</label>
        {!openToAll && (
          <>
            <div className="row mt" style={{ gap: 8 }}>
              <button type="button" className="btn sm" onClick={selectAll}>Select all</button>
              <button type="button" className="btn sm" onClick={selectNone}>Select none</button>
              <span className="small muted">{selected.length} selected</span>
            </div>
            {group('Incomplete — examination ended before they submitted', incompleteIds)}
            {group('Completed — already has a result', completedIds)}
            {group('Not attended — invited but never joined', notAttendedIds)}
            {noHistory && <div className="empty small mt">No participant history for this examination.</div>}
          </>
        )}
      </div>
      <div className="modal-f">
        <button className="btn" onClick={closeModal} disabled={saving}>Cancel</button>
        {kind === 'scheduled' ? (
          <>
            <button className="btn" onClick={() => submitScheduled('Scheduled')} disabled={saving}>{saving ? 'Saving…' : 'Schedule'}</button>
            <button className="btn ok" onClick={() => submitScheduled('Waiting')} disabled={saving}>{saving ? 'Saving…' : 'Start immediately →'}</button>
          </>
        ) : (
          <button className="btn ok" onClick={submitSelf} disabled={saving}>Enable self assessment</button>
        )}
      </div>
    </div>
  );
}
