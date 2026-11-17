import { useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function AIPanel() {
  const currentUser = useStore((s) => s.currentUser);
  const location = useLocation();

  if (!currentUser || currentUser.role !== 'participant') return null;
  if (location.pathname.includes('/exam') || location.pathname.includes('/wait')) return null;

  // if (!ai.open) {
  //   return <button className="aifab" title="Ask the AI learning assistant" onClick={() => openAI()}>✦</button>;
  // }

  return (
    <></>
    // <div className="aipanel">
    //   <div className="aihead">
    //     <div className="spread"><b>✦ AI Learning Assistant</b><button className="btn ghost sm" style={{ color: '#fff' }} onClick={closeAI}>✕</button></div>
    //     {/* <div className="aictx">Topic context: {pathOf(t)}</div> */}
    //   </div>
    //   <div className="aibody" ref={bodyRef}>
    //     {ai.msgs.map((m, i) => {
    //       if (m.r === 'sys') return <div key={i} className="msg sys">{m.t}</div>;
    //       const priorUser = (() => {
    //         for (let k = i - 1; k >= 0; k--) if (ai.msgs[k].r === 'me') return ai.msgs[k].t;
    //         return '';
    //       })();
    //       return (
    //         <div key={i} className={'msg ' + (m.r === 'me' ? 'me' : 'ai')}>
    //           {m.t}
    //           {m.r === 'ai' && i > 0 && (
    //             <div className="row" style={{ marginTop: 9, gap: 6 }}>
    //               <button className="chip" onClick={() => { aiPushMessage({ r: 'sys', t: 'Marked as resolved — this improves AI resolution rate analytics.' }); toast('Thanks — feedback recorded', 'ok'); }}>👍 That helps</button>
    //               <button className="chip" style={{ borderColor: '#fca5a5', color: '#b91c1c' }} onClick={() => askExpert(m.t, priorUser)}>Not satisfied — Ask an Expert</button>
    //             </div>
    //           )}
    //         </div>
    //       );
    //     })}
    //   </div>
    //   <div className="aifoot">
    //     <div className="chips">
    //       {SUGGESTIONS.map((c) => <button key={c} className="chip" onClick={() => send(c)}>{c}</button>)}
    //     </div>
    //     <div className="row">
    //       <input className="inp" placeholder="Ask about this topic…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(input); }} />
    //       <button className="btn pri" onClick={() => send(input)}>Send</button>
    //     </div>
    //     <div className="xs muted center" style={{ marginTop: 6 }}>Answers are restricted to approved content for the selected topic</div>
    //   </div>
    // </div>
  );
}
