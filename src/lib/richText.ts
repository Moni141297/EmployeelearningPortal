// Slide body is stored as a small HTML subset (bold/italic/underline/links/
// lists) produced by components/ui/RichTextEditor. Older content saved before
// rich text existed is still plain text with '\n' line breaks — toDisplayHtml
// renders both correctly without needing a migration.

const ALLOWED_TAGS = new Set([
  'B', 'STRONG', 'I', 'EM', 'U', 'A', 'BR', 'P', 'DIV', 'UL', 'OL', 'LI', 'SPAN',
  'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD',
]);

// DIV/SPAN may carry a `class` attribute, but only one of these fixed,
// trainer-facing layout primitives (styled in index.css) — never an
// arbitrary class, which would let pasted HTML reach into unrelated page
// styling. This is how a slide groups short items into a card grid (e.g. a
// "Where It Goes" list) instead of a plain bullet list.
const ALLOWED_CLASSES = new Set(['item-grid', 'item-card', 'item-card-check']);

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Plain legacy text (no tags) gets escaped and its line breaks converted to
// <br>; anything that already looks like HTML (new rich-text content) is
// trusted as-is — it was sanitized on the way in by sanitizeRichHtml below.
export function toDisplayHtml(body: string): string {
  if (!body) return '';
  if (/<[a-z][\s\S]*>/i.test(body)) return body;
  return body.split('\n').map(escapeHtml).join('<br>');
}

// Trainers are trusted internal staff, but contentEditable + paste can still
// carry arbitrary markup (scripts, event-handler attributes, tracking
// iframes) into what participants later render — this allowlist strips
// anything beyond basic formatting before it's saved.
export function sanitizeRichHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  function clean(node: ParentNode) {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) return;
      if (child.nodeType !== Node.ELEMENT_NODE) {
        node.removeChild(child);
        return;
      }
      const el = child as HTMLElement;
      if (!ALLOWED_TAGS.has(el.tagName)) {
        while (el.firstChild) el.parentNode!.insertBefore(el.firstChild, el);
        el.parentNode!.removeChild(el);
        return;
      }
      Array.from(el.attributes).forEach((attr) => {
        const keepClass = attr.name === 'class' && (el.tagName === 'DIV' || el.tagName === 'SPAN') && ALLOWED_CLASSES.has(el.getAttribute('class') || '');
        if (keepClass) return;
        if (!(el.tagName === 'A' && attr.name === 'href')) el.removeAttribute(attr.name);
      });
      if (el.tagName === 'A') {
        const href = el.getAttribute('href') || '';
        if (!/^https?:\/\//i.test(href) && !href.startsWith('/')) el.removeAttribute('href');
        else {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      }
      clean(el);
    });
  }

  clean(doc.body);
  return doc.body.innerHTML;
}
