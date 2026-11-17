/*
 * Small markup helpers for building `svgMarkup` strings per the PRD's §3 SVG
 * animation contract — used by seed-data files to assemble extracted
 * style/svg/ol fragments into the exact shapes the Portal's SvgAnimation
 * component expects, without retyping the wrapper boilerplate per diagram.
 */

// Every extracted `style` string's first rule is always `.sc-<scope> .s-cs-svg{...}`
// (per the PRD §3 extraction contract) — pull that scope class out so the wrapper
// div below can carry it. Without it, none of the style's `.sc-<scope> ...` rules
// (including the width/height/animation ones) ever match anything, and the
// diagram renders as a bare, unstyled, non-animated SVG.
function scopeFromStyle(style) {
  const m = /^\s*\.([\w-]+)\s/.exec(style);
  if (!m) throw new Error('svgCard/singleSvg: could not find a leading ".sc-<scope>" selector in the style text — pass it explicitly if this diagram\'s style is laid out differently.');
  return m[1];
}

// A single diagram with no distinct caption of its own (same title as the
// slide, or no caption at all) — no .svg-card wrapper, no per-card Replay.
function singleSvg({ style, svg, ol, durationSec = 10, scope }) {
  const scopeCls = scope || scopeFromStyle(style);
  return `<style>${style}</style><div class="svg-anim anim ${scopeCls} playing" style="--T:${durationSec}s">${svg}${ol || ''}</div>`;
}

// One diagram inside its own .svg-card, with its own title + Replay checkbox
// (per the PRD's exact markup — a checkbox, never a button).
function svgCard({ title, style, svg, ol, durationSec = 10, verdict, scope }) {
  const scopeCls = scope || scopeFromStyle(style);
  const verdictCls = verdict ? ` ${verdict}` : '';
  const statusIcon = verdict === 'ok' ? '✓' : verdict === 'bad' ? '✗' : '';
  const statusSpan = verdict ? `<span class="svg-card-status ${verdict}">${statusIcon}</span>` : '';
  return `<div class="svg-card">
<div class="svg-card-head">
<span class="svg-card-title${verdictCls}">${statusSpan}${title}</span>
<label class="svg-card-replay"><input type="checkbox" data-replay/>Replay</label>
</div>
<style>${style}</style>
<div class="svg-anim anim ${scopeCls} playing" style="--T:${durationSec}s">${svg}${ol || ''}</div>
</div>`;
}

// Wraps 2+ svgCard() strings in the .svg-cards grid.
function svgCards(cards) {
  return `<div class="svg-cards">${cards.join('\n')}</div>`;
}

module.exports = { singleSvg, svgCard, svgCards };
