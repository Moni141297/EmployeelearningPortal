import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ApiError } from '../../lib/api';
import { todayStr } from '../../lib/helpers';
import type { ExamEvent, EventStatus } from '../../types';

export function openExamEditor(id: string | null) {
  useStore.getState().openModal(<ExamEditorModal id={id} />);
}

function randomCode() { return String(Math.floor(100000 + Math.random() * 900000)); }

function ExamEditorModal({ id }: { id: string | null }) {
  const events = useStore((s) => s.events);
  const topics = useStore((s) => s.topics);
  const users = useStore((s) => s.users);
  const productOf = useStore((s) => s.productOf);
  const qOf = useStore((s) => s.qOf);
  const saveExam = useStore((s) => s.saveExam);
  const saveTopic = useStore((s) => s.saveTopic);
  const closeModal = useStore((s) => s.closeModal);
  const toast = useStore((s) => s.toast);
  const currentUser = useStore((s) => s.currentUser)!;
  const navigate = useNavigate();

  const existing = id ? events.find((e) => e.id === id) : null;
  // A new examination can only be created against a topic that's actually
  // live for participants (Published) and has questions to draw a paper from
  // — except the one an existing event already uses, which must stay
  // selectable (and visible) so editing doesn't silently swap it out from
  // under the trainer, even if the topic has since been archived/drafted.
  const availableTopics = topics.filter((t) => (t.status === 'Published' && qOf(t.id).length > 0) || t.id === existing?.topic);
  // Only a brand-new examination can be a self assessment — editing an
  // existing one always means editing a scheduled ExamEvent, since a self
  // assessment isn't an event at all (it just configures the topic itself).
  const [assessType, setAssessType] = useState<'scheduled' | 'self'>('scheduled');
  const [name, setName] = useState(existing?.name || '');
  const [topic, setTopic] = useState(existing?.topic || availableTopics[0]?.id || '');
  const [code, setCode] = useState(existing?.code || randomCode());
  const [count, setCount] = useState(existing?.count ?? 20);
  const [pass, setPass] = useState(existing?.pass ?? 80);
  const [defTime, setDefTime] = useState(existing?.defTime ?? 30);
  const [type, setType] = useState<ExamEvent['type']>(existing?.type || 'Private');
  const [date, setDate] = useState(existing?.date || new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(existing?.time || '16:00');
  const [parts, setParts] = useState<string[]>(existing?.parts || []);
  const [lb, setLb] = useState(existing?.lb ?? true);
  const [res, setRes] = useState(existing?.res ?? true);
  const [cert, setCert] = useState(existing?.cert ?? true);
  const [saving, setSaving] = useState(false);

  const bank = qOf(topic);
  const mand = bank.filter((q) => q.mandatory).length;
  const insufficientBank = bank.length < count;
  const participantUsers = users.filter((u) => u.role === 'participant');
  const isSelf = !id && assessType === 'self';

  function togglePart(uid: string) {
    setParts((prev) => (prev.includes(uid) ? prev.filter((x) => x !== uid) : [...prev, uid]));
  }

  // Switching topics while configuring a self assessment loads that topic's
  // own current mode/visibility/certification settings, rather than
  // overwriting them with whatever the previous topic in the dropdown had.
  function onTopicChange(newTopicId: string) {
    setTopic(newTopicId);
    if (isSelf) {
      const tp = topics.find((x) => x.id === newTopicId);
      if (tp) {
        setType(tp.mode);
        setLb(tp.lb);
        setRes(tp.res);
        setCert(tp.cert);
        setParts(tp.parts);
      }
    }
  }

  function submitSelf() {
    const tp = topics.find((x) => x.id === topic);
    if (!tp) { toast('Pick a topic first', 'bad'); return; }
    if (mand > count) { toast(`${mand} mandatory questions exceed the configured count of ${count}`, 'bad'); return; }
    if (insufficientBank) { toast(`This topic's question bank has only ${bank.length} active question(s) — add more before configuring ${count}`, 'bad'); return; }
    saveTopic(tp.id, { ...tp, pass, defTime, examCount: count, mode: type, lb, res, cert, parts: type === 'Open' ? [] : parts });
    closeModal();
    toast('Self assessment settings saved', 'ok');
  }

  // Editing an existing event can never change which of Live/Scheduled/
  // Waiting Room it is — those three only ever move between each other
  // through their own dedicated actions (Publish, Start examination, End
  // examination, a participant joining, or the automatic date/time sweep).
  // Saving the Details form here just keeps it at whatever status it's
  // already at, so there's exactly one "Save" action, not three
  // easily-confused buttons offering to also relaunch/reschedule it.
  async function submit(status: EventStatus) {
    if (!name.trim()) { toast('Examination name is required', 'bad'); return; }
    if (mand > count) { toast(`Cannot publish: ${mand} mandatory questions exceed the configured count of ${count}`, 'bad'); return; }
    if (insufficientBank) { toast(`Cannot publish: this topic's question bank has only ${bank.length} active question(s), but the examination is configured for ${count}`, 'bad'); return; }
    setSaving(true);
    try {
      const ev = await saveExam(id, {
        name, topic, code, type, date, time, count, pass, defTime, status, lb, res, cert,
        parts: type === 'Open' ? [] : parts, by: currentUser.id,
      });
      closeModal();
      toast(id ? 'Examination updated' : 'Examination saved (' + status + ')', 'ok');
      if (!id && status === 'Waiting') { useStore.getState().auditLog('Examination start', 'Examination ' + ev.id); navigate(`/app/trainer/live/${ev.id}`); }
      else navigate('/app/trainer/exams');
    } catch (err) {
      setSaving(false);
      toast(err instanceof ApiError ? err.message : 'Could not save the examination — please try again', 'bad');
    }
  }

  return (
    <div className="modal wide">
      <div className="modal-h"><h3>{id ? 'Edit examination' : isSelf ? 'Create self assessment' : 'Create examination'}</h3><button className="btn ghost" onClick={closeModal}>✕</button></div>
      <div className="modal-b">
        <div className="row mb" style={{ gap: 18 }}>
          {(isSelf ? ['Details', 'Questions'] : ['Details', 'Questions', 'Participants', 'Visibility']).map((s, i) => (
            <div key={s} className={'step ' + (i === 0 ? 'on' : 'done')}><span className="n">{i + 1}</span>{s}</div>
          ))}
        </div>
        {!id && (
          <>
            <label className="f">Assessment type</label>
            <div className="row mb" style={{ gap: 8 }}>
              <button type="button" className={'btn sm' + (assessType === 'scheduled' ? ' pri' : '')} onClick={() => setAssessType('scheduled')}>Scheduled examination</button>
              <button type="button" className={'btn sm' + (assessType === 'self' ? ' pri' : '')} onClick={() => {
                setAssessType('self');
                // Load the current topic's own self-assessment settings
                // instead of leaving whatever the scheduled-exam fields happened to be.
                const tp = topics.find((x) => x.id === topic);
                if (tp) { setType(tp.mode); setLb(tp.lb); setRes(tp.res); setCert(tp.cert); setParts(tp.parts); }
              }}>Self assessment</button>
            </div>
            <div className="hint mb">
              {isSelf
                ? 'A self assessment has no date, time, waiting room or participant list — it just configures this topic\'s own practice test, available to participants whenever they choose.'
                : 'A scheduled examination has a fixed date/time, a live waiting room, and (for Private) an invite list.'}
            </div>
          </>
        )}
        {!isSelf && (
          <>
            <label className="f">Examination name <span className="req">*</span></label>
            <input className="inp" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Supergrade PPC — Product Knowledge Certification" />
          </>
        )}
        <div className="fieldrow mt">
          <div><label className="f">Topic</label>
            <select className="inp" value={topic} onChange={(e) => onTopicChange(e.target.value)}>
              {availableTopics.map((t) => <option key={t.id} value={t.id}>{productOf(t.id).name} → {t.name}</option>)}
            </select>
          </div>
          {!isSelf && <div><label className="f">Event code</label><input className="inp mono" value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} /></div>}
        </div>
        <div className="hint">
          {mand > count
            ? <span style={{ color: 'var(--bad)' }}><b>⚠ Invalid configuration:</b> this topic has {mand} mandatory questions but only {count} are configured. The examination cannot be published until this is corrected.</span>
            : insufficientBank
            ? <span style={{ color: 'var(--bad)' }}><b>⚠ Invalid configuration:</b> this topic's bank has only {bank.length} active question(s), but {count} are configured. Add more questions or lower the count before publishing.</span>
            : <>Bank contains <b>{bank.length}</b> active questions. This paper will include <b>{mand} mandatory</b> + <b>{count - mand} randomly selected</b> questions, randomised per participant.</>}
        </div>
        <div className="fieldrow mt">
          <div><label className="f">Number of questions</label><input className="inp" type="number" value={count} onChange={(e) => setCount(+e.target.value)} /></div>
          <div><label className="f">Pass percentage</label><input className="inp" type="number" value={pass} onChange={(e) => setPass(+e.target.value)} /></div>
        </div>
        <div className="fieldrow mt">
          <div><label className="f">Default time per question (seconds)</label><input className="inp" type="number" value={defTime} onChange={(e) => setDefTime(+e.target.value)} /></div>
          <div><label className="f">{isSelf ? 'Assessment mode' : 'Examination mode'}</label>
            <select className="inp" value={type} onChange={(e) => setType(e.target.value as ExamEvent['type'])}>
              <option>Private</option><option>Open</option>
            </select>
          </div>
        </div>
        {!isSelf && (
          <div className="fieldrow mt">
            <div><label className="f">Date</label><input className="inp" type="date" value={date} min={id ? undefined : todayStr()} onChange={(e) => setDate(e.target.value)} /></div>
            <div><label className="f">Start time</label><input className="inp" type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
          </div>
        )}
        {type !== 'Open' && (
          <div>
            <label className="f mt">{isSelf ? 'Who can take this self assessment' : 'Select participants'}</label>
            <div className="card pad" style={{ maxHeight: 170, overflow: 'auto', background: 'var(--panel-2)' }}>
              {participantUsers.map((u) => (
                <label key={u.id} className="row small" style={{ padding: '3px 0' }}>
                  <input type="checkbox" checked={parts.includes(u.id)} onChange={() => togglePart(u.id)} /> {u.name} <span className="muted xs">{u.emp} · {u.dept} · {u.plant}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        <div className="card pad mt" style={{ background: 'var(--panel-2)' }}>
          <b className="small">Visibility &amp; certification</b>
          <label className="row small mt"><input type="checkbox" checked={lb} onChange={(e) => setLb(e.target.checked)} /> Show leaderboard to participants</label>
          <label className="row small"><input type="checkbox" checked={res} onChange={(e) => setRes(e.target.checked)} /> {isSelf ? 'Show results to the participant after each attempt' : 'Publish results to participants immediately'}</label>
          <label className="row small"><input type="checkbox" checked={cert} onChange={(e) => setCert(e.target.checked)} /> Issue a certificate to participants who pass</label>
        </div>
      </div>
      <div className="modal-f">
        <button className="btn" onClick={closeModal} disabled={saving}>Cancel</button>
        {isSelf ? (
          <button className="btn pri" onClick={submitSelf} disabled={saving}>Save self assessment</button>
        ) : id ? (
          // Editing never changes Live/Scheduled/Waiting Room status — only
          // the dedicated actions on the Examinations and Live Control
          // screens (Publish, Start examination, End examination, Reschedule)
          // do that. One button here, doing one thing, keeps it that way.
          <button className="btn pri" onClick={() => submit(existing!.status)} disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
        ) : (
          <>
            <button className="btn" onClick={() => submit('Draft')} disabled={saving}>Save as draft</button>
            <button className="btn pri" onClick={() => submit('Scheduled')} disabled={saving}>{saving ? 'Saving…' : 'Schedule'}</button>
            <button className="btn ok" onClick={() => submit('Waiting')} disabled={saving}>{saving ? 'Saving…' : 'Start immediately →'}</button>
          </>
        )}
      </div>
    </div>
  );
}
