import { useRef } from 'react';
import { sanitizeSvgBundle } from '../../lib/svgAnim';

// Restarts a set of .svg-anim wrappers by toggling the 'playing' class off
// and back on, forcing a reflow in between so the animation-iteration
// restarts from 0% rather than continuing mid-cycle.
function restart(els: NodeListOf<HTMLElement> | HTMLElement[]) {
  const list = Array.from(els);
  if (!list.length) return;
  list.forEach((el) => el.classList.remove('playing'));
  list.forEach((el) => void el.offsetWidth);
  list.forEach((el) => el.classList.add('playing'));
}

// Renders a trainer-authored animated-SVG bundle (self-contained <style>+<svg>
// markup — see src/data/svgAnimations.ts for the shape). The bundle's own
// wrapper div already carries the 'playing' class so the CSS animations run
// on mount.
//
// A bundle with more than one diagram can group each one in its own
// <div class="svg-card">, with a title/label row and a
// <… data-replay> element for that card alone (see
// src/data/svgAnimationsTileGrout.ts for examples) — clicks on it bubble up
// to the onClick handler below, which restarts just that card's .svg-anim
// wrappers instead of every diagram on the slide. Bundles that don't opt
// into that structure keep the single shared "↻ Replay" button restarting
// everything, exactly as before.
export default function SvgAnimation({ markup }: { markup: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasCards = /class="[^"]*\bsvg-card\b/.test(markup);

  function replayAll() {
    const els = ref.current?.querySelectorAll<HTMLElement>('.svg-anim');
    if (els) restart(els);
  }

  // The replay control is a checkbox rather than a button: ticking it (in
  // either direction) is the "do it again" gesture, so every change event —
  // not just a specific checked state — triggers the restart.
  function onContentChange(e: React.ChangeEvent<HTMLDivElement>) {
    const target = (e.target as HTMLElement).closest('[data-replay]');
    if (!target) return;
    const card = target.closest('.svg-card');
    const els = (card ?? ref.current)?.querySelectorAll<HTMLElement>('.svg-anim');
    if (els) restart(els);
  }

  return (
    // The source site's per-diagram rules are scoped as ".anim .sc-xxx.playing
    // ..." — .anim is meant to sit on a page-level ancestor, separate from
    // the diagram's own wrapper. Without a real ancestor carrying that class
    // the descendant selector never matches, so this wrapper supplies it.
    <div ref={ref} className="anim">
      {!hasCards && (
        <label className="svg-anim-replay">
          <input type="checkbox" onChange={replayAll} /> Replay
        </label>
      )}
      <div onChange={onContentChange} dangerouslySetInnerHTML={{ __html: sanitizeSvgBundle(markup) }} />
    </div>
  );
}
