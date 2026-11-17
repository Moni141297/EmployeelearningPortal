import { useEffect, useRef, type ReactNode } from 'react';
import { useStore } from '../../store/useStore';
import { sanitizeRichHtml, toDisplayHtml } from '../../lib/richText';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function buildTableHtml(rows: number, cols: number): string {
  const headerCells = Array.from({ length: cols }, (_, i) => `<th>Header ${i + 1}</th>`).join('');
  const bodyRows = Array.from({ length: rows }, () => `<tr>${Array.from({ length: cols }, () => '<td>&nbsp;</td>').join('')}</tr>`).join('');
  return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table><p><br></p>`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Matches the 'item-grid'/'item-card'/'item-card-check' classes sanitizeRichHtml
// allows through on DIV/SPAN — see src/lib/richText.ts for the safelist and why
// it's restricted to these fixed names rather than any pasted class.
function buildItemGridHtml(items: string[]): string {
  const cards = items.filter((x) => x.trim())
    .map((x) => `<div class="item-card">${escapeHtml(x.trim())}<span class="item-card-check">&#10003;</span></div>`)
    .join('');
  return `<div class="item-grid">${cards}</div><p><br></p>`;
}

// Minimal bold/italic/underline/link/list/table toolbar over a contentEditable
// div. The DOM is only seeded from `value` once on mount (see the empty dep
// array below) — re-syncing it on every keystroke would fight the browser's
// own cursor position. Pass a `key` prop from the caller to force a remount
// when switching to an unrelated piece of content (e.g. a different slide).
export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = toDisplayHtml(value || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function emit() {
    if (ref.current) onChange(sanitizeRichHtml(ref.current.innerHTML));
  }

  function exec(cmd: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    emit();
  }

  // Restores a saved selection/cursor position inside the editor (falling
  // back to the end of the content if it's missing or no longer inside the
  // editor), so toolbar actions that open a modal first — losing the
  // browser's live selection the moment the modal steals focus — still land
  // in the right place.
  function restoreRange(saved: Range | null): Range {
    const editor = ref.current!;
    editor.focus();
    let range = saved;
    if (!range || !editor.contains(range.commonAncestorContainer)) {
      range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
    }
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    return range;
  }

  function addLink() {
    const sel = window.getSelection();
    const savedRange = sel && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
    const selectedText = savedRange ? savedRange.toString() : '';
    const { openModal, closeModal } = useStore.getState();
    let url = '';
    let text = selectedText;

    function submit() {
      const trimmedUrl = url.trim();
      closeModal();
      if (!trimmedUrl || !ref.current) return;
      const displayText = text.trim() || trimmedUrl;
      const range = restoreRange(savedRange);

      const anchor = document.createElement('a');
      anchor.href = trimmedUrl;
      anchor.textContent = displayText;
      range.deleteContents();
      range.insertNode(anchor);
      range.setStartAfter(anchor);
      range.collapse(true);
      const sel2 = window.getSelection();
      sel2?.removeAllRanges();
      sel2?.addRange(range);

      emit();
    }

    openModal(
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-h"><h3>Insert link</h3><button className="btn ghost" onClick={closeModal}>✕</button></div>
        <div className="modal-b">
          <label className="f">Link text</label>
          <input className="inp" autoFocus defaultValue={selectedText} placeholder="Text shown in the slide"
            onChange={(e) => { text = e.target.value; }} />
          <label className="f mt">URL</label>
          <input className="inp" placeholder="https://…" onChange={(e) => { url = e.target.value; }}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} />
        </div>
        <div className="modal-f">
          <button className="btn" onClick={closeModal}>Cancel</button>
          <button className="btn pri" onClick={submit}>Insert</button>
        </div>
      </div>
    );
  }

  function insertTable() {
    const sel = window.getSelection();
    const savedRange = sel && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
    const { openModal, closeModal } = useStore.getState();
    let rows = 3;
    let cols = 3;

    function submit() {
      closeModal();
      if (!ref.current) return;
      restoreRange(savedRange);
      document.execCommand('insertHTML', false, buildTableHtml(Math.max(1, Math.min(20, rows)), Math.max(1, Math.min(10, cols))));
      emit();
    }

    openModal(
      <div className="modal" style={{ maxWidth: 360 }}>
        <div className="modal-h"><h3>Insert table</h3><button className="btn ghost" onClick={closeModal}>✕</button></div>
        <div className="modal-b">
          <div className="fieldrow">
            <div><label className="f">Rows</label><input className="inp" type="number" min={1} max={20} defaultValue={3} onChange={(e) => { rows = +e.target.value; }} /></div>
            <div><label className="f">Columns</label><input className="inp" type="number" min={1} max={10} defaultValue={3} onChange={(e) => { cols = +e.target.value; }} /></div>
          </div>
        </div>
        <div className="modal-f">
          <button className="btn" onClick={closeModal}>Cancel</button>
          <button className="btn pri" onClick={submit}>Insert</button>
        </div>
      </div>
    );
  }

  function insertItemGrid() {
    const sel = window.getSelection();
    const savedRange = sel && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
    const { openModal, closeModal } = useStore.getState();
    let text = '';

    function submit() {
      closeModal();
      if (!ref.current) return;
      const items = text.split('\n');
      if (!items.some((x) => x.trim())) return;
      restoreRange(savedRange);
      document.execCommand('insertHTML', false, buildItemGridHtml(items));
      emit();
    }

    openModal(
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-h"><h3>Insert item grid</h3><button className="btn ghost" onClick={closeModal}>✕</button></div>
        <div className="modal-b">
          <label className="f">Items <span className="muted">— one per line, each becomes its own card</span></label>
          <textarea className="inp" autoFocus placeholder={'Ceramic and vitrified tile joints\nInterior floors and walls\nBathrooms'}
            style={{ minHeight: 140 }} onChange={(e) => { text = e.target.value; }} />
        </div>
        <div className="modal-f">
          <button className="btn" onClick={closeModal}>Cancel</button>
          <button className="btn pri" onClick={submit}>Insert</button>
        </div>
      </div>
    );
  }

  const btn = (label: ReactNode, title: string, onClick: () => void) => (
    <button
      type="button"
      className="btn sm"
      title={title}
      onMouseDown={(e) => e.preventDefault()} // keep the editor's text selection intact
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="row" style={{ gap: 4, marginBottom: 6 }}>
        {btn(<b>B</b>, 'Bold', () => exec('bold'))}
        {btn(<i>I</i>, 'Italic', () => exec('italic'))}
        {btn(<u>U</u>, 'Underline', () => exec('underline'))}
        {btn('🔗', 'Insert link', addLink)}
        {btn('⊞', 'Insert table', insertTable)}
        {btn('▦✓', 'Insert item grid', insertItemGrid)}
        {btn('• List', 'Bullet list', () => exec('insertUnorderedList'))}
        {btn('Clear', 'Clear formatting', () => exec('removeFormat'))}
      </div>
      <div
        ref={ref}
        className="inp richtext-edit"
        contentEditable
        data-placeholder={placeholder}
        onInput={emit}
        onBlur={emit}
      />
    </div>
  );
}
