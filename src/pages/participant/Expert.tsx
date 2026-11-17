import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { StatusTag } from '../../components/ui/Tags';

export default function Expert() {
  const currentUser = useStore((s) => s.currentUser)!;
  const expertQs = useStore((s) => s.expertQs);
  const topics = useStore((s) => s.topics);
  const pathOf = useStore((s) => s.path);
  const submitExpertQuestion = useStore((s) => s.submitExpertQuestion);
  const toast = useStore((s) => s.toast);

  const published = topics.filter((t) => t.status === 'Published');
  const [topicId, setTopicId] = useState(published[0]?.id || '');
  const [question, setQuestion] = useState('');
  const [note, setNote] = useState('');

  function submit() {
    if (!topicId) { toast('Select a topic', 'bad'); return; }
    if (!question.trim()) { toast('Enter your question', 'bad'); return; }
    submitExpertQuestion(currentUser.id, topicId, question.trim(), '', note.trim());
    toast('Question sent to the trainer', 'ok');
    setQuestion(''); setNote('');
  }

  const xs = expertQs.filter((x) => x.user === currentUser.id);

  return (
    <div>
      <h2 style={{ fontSize: 20 }} className="mb">My questions to experts</h2>

      <div className="card mb">
        <div className="card-h"><h3>Ask a question</h3></div>
        <div className="card-b">
          <label className="f">Topic</label>
          <select className="inp" value={topicId} onChange={(e) => setTopicId(e.target.value)}>
            {published.map((t) => <option key={t.id} value={t.id}>{pathOf(t.id)}</option>)}
          </select>
          <label className="f mt">Your question <span className="req">*</span></label>
          <textarea className="inp" rows={3} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What would you like to ask a trainer?" />
          <label className="f mt">Additional note (optional)</label>
          <textarea className="inp" rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
          <button className="btn pri mt" onClick={submit}>Send to trainer</button>
        </div>
      </div>

      {xs.length ? xs.map((x) => (
        <div key={x.id} className="card mb">
          <div className="card-h">
            <div><b>{pathOf(x.topic).split(' → ').pop()}</b><div className="xs muted">{pathOf(x.topic)} · raised {x.date}</div></div>
            <StatusTag status={x.status} />
          </div>
          <div className="card-b">
            <div className="small bold">Your question</div><p className="small">{x.q}</p>
            {x.note && <><div className="small bold mt">Your additional note</div><p className="small muted">{x.note}</p></>}
            {x.ai && <><div className="small bold mt">AI response you received</div>
            <div className="small muted" style={{ background: 'var(--panel-2)', padding: 10, borderRadius: 8 }}>{x.ai}</div></>}
            {x.resp ? (
              <>
                <div className="small bold mt">Expert response — {x.expert}</div>
                <div className="small" style={{ background: 'var(--ok-soft)', padding: 10, borderRadius: 8, borderLeft: '3px solid var(--ok)' }}>{x.resp}</div>
              </>
            ) : <div className="small muted mt">⏳ Awaiting a trainer response. You will be notified when it is answered.</div>}
          </div>
        </div>
      )) : (
        <div className="card"><div className="empty"><div className="big">✆</div>You have not raised any expert questions
          <div className="small mt">Use the form above to ask a trainer about anything you're learning.</div>
        </div></div>
      )}
    </div>
  );
}
