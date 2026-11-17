// Animated SVG slides store a self-contained <style>+<svg>(+<ol>) bundle —
// scoped to their own class names so multiple instances never collide. The
// markup is trainer-authored (same trust level as rich text), but is still
// run through a strip pass before being injected, to catch anything a paste
// might carry in (scripts, event-handler attributes, external references).
const ALLOWED_TAGS = new Set([
  'STYLE', 'DIV', 'SVG', 'G', 'DEFS', 'TEXT', 'TSPAN', 'RECT', 'CIRCLE', 'ELLIPSE',
  'PATH', 'LINE', 'POLYGON', 'POLYLINE', 'USE', 'LINEARGRADIENT', 'RADIALGRADIENT',
  'STOP', 'CLIPPATH', 'MASK', 'OL', 'LI', 'SPAN', 'ANIMATE', 'ANIMATETRANSFORM', 'ANIMATEMOTION',
  // LABEL+INPUT: the per-card "Replay" control is a checkbox, not a button —
  // see SvgAnimation.tsx's onContentChange.
  'LABEL', 'INPUT',
  // Standard SVG filter-effect and pattern-fill primitives the reference
  // site's own diagrams use (e.g. a paper-grain noise texture, a glow blur,
  // a repeating brick fill) — none of these can load external resources or
  // run script, so they're as safe as the other static SVG shape tags above.
  'FILTER', 'FETURBULENCE', 'FECOLORMATRIX', 'FEGAUSSIANBLUR', 'FEOFFSET', 'FEMERGE', 'FEMERGENODE', 'FEBLEND', 'FECOMPOSITE', 'PATTERN',
]);

export function sanitizeSvgBundle(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // A bundle that starts with a bare <style> tag (not wrapped in a <div>)
  // gets that tag hoisted into <head> by the HTML parser's tree
  // construction rules — still a real, applied stylesheet, but invisible to
  // a body-only pass. Clean and keep both so it isn't silently dropped.
  function clean(node: ParentNode) {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.COMMENT_NODE) {
        if (child.nodeType === Node.COMMENT_NODE) node.removeChild(child);
        return;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) { node.removeChild(child); return; }
      const el = child as Element;
      // SVG/foreign-namespace elements keep their original case (e.g. "svg",
      // "linearGradient"), unlike HTML elements which normalize to upper
      // case — compare case-insensitively so those aren't stripped.
      if (!ALLOWED_TAGS.has(el.tagName.toUpperCase())) { node.removeChild(child); return; }
      Array.from(el.attributes).forEach((attr) => {
        if (/^on/i.test(attr.name) || attr.name === 'href' && /^javascript:/i.test(attr.value)) {
          el.removeAttribute(attr.name);
        }
      });
      clean(el);
    });
  }

  clean(doc.head);
  clean(doc.body);
  return doc.head.innerHTML + doc.body.innerHTML;
}
