import { useState } from 'react';
import { toDisplayHtml } from '../../lib/richText';

interface Props {
  question: string;
  options: string[];
  correctIndex: number;
  explain?: string;
}

// Single MCQ knowledge-check: pick one option, check it, then see the
// explanation colored by whether the pick was right. Local state (selected/
// checked) resets whenever the caller remounts this with a new `key` (see
// Viewer.tsx, which keys it by slide id) — otherwise answering one question
// would leak into the next slide.
export default function KnowledgeCheck({ question, options, correctIndex, explain }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = checked && selected === correctIndex;

  return (
    <div>
      {question && <div className="richtext-body" dangerouslySetInnerHTML={{ __html: toDisplayHtml(question) }} />}
      <div className="kc-options">
        {options.map((opt, i) => {
          const cls = !checked ? '' : i === correctIndex ? 'correct' : i === selected ? 'wrong' : '';
          return (
            <label key={i} className={'kc-opt ' + cls}>
              <input type="radio" name="kc-option" disabled={checked} checked={selected === i} onChange={() => setSelected(i)} />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      {!checked ? (
        <button className="btn pri mt" disabled={selected === null} onClick={() => setChecked(true)}>Check answer</button>
      ) : (
        explain && <div className={'explain mt ' + (isCorrect ? 'ok' : '')}><b>{isCorrect ? '✓ Correct — ' : '✕ Not quite — '}</b>{explain}</div>
      )}
    </div>
  );
}
