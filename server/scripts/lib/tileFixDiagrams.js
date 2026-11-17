/*
 * Shared animated-diagram markup builder for svg slides, plus the actual
 * extracted Annex/mortar-vs-adhesive diagrams for the HW200 "Tile Fix" family.
 * These IS 15477 Annex test-method diagrams are generic to the standard, not
 * to any one product's declared numbers, and were confirmed byte-for-byte
 * identical across sibling products' DOM when compared during extraction —
 * reused verbatim here per PRD §3 extraction step 6, not re-extracted per product.
 */

function oneCard(title, scopeClass, svgOuter, olOuter, styleText, T) {
  return `<div class="svg-card"><div class="svg-card-head"><span class="svg-card-title">${title}</span><label class="svg-card-replay"><input type="checkbox" data-replay/>Replay</label></div><style>${styleText}</style><div class="svg-anim anim ${scopeClass} playing" style="--T:${T}s">${svgOuter}${olOuter}</div></div>`;
}

function wrapCards(...cards) {
  return `<div class="svg-cards">${cards.join('')}</div>`;
}

module.exports = { oneCard, wrapCards };
