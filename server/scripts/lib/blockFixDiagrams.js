/*
 * Shared diagrams for the Block Fix family (HW301/HW302/HW303). These two are
 * scoped `sc-hw303-*` on the reference site even when shown on HW301's own
 * pages — confirmed the reference reuses them verbatim across siblings (no
 * HW301/HW303-specific numbers inside), so they're extracted once here and
 * reused byte-for-byte rather than re-extracted per product (PRD §3 step 6).
 */

const CURE_COMPARISON_STYLE_CONVENTIONAL = `.sc-cure-conventional .s-lr .s-ar{color:var(--ink-2);text-align:center}
.sc-cure-conventional .s-cs-svg{width:100%;height:auto;display:block}
.sc-cure-conventional .s-blk{fill:var(--cblk)}
.sc-cure-conventional .s-mor{fill:var(--cmor)}
.sc-cure-conventional .s-w{fill:var(--water)}
.sc-cure-conventional .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-cure-conventional .s-tick{stroke:var(--ink-2);stroke-width:1.2}
.sc-cure-conventional .s-noz{fill:var(--ink-2)}
.sc-cure-conventional .s-sp{fill:var(--water);opacity:0}
.sc-cure-conventional .s-surf{opacity:.85}
.sc-cure-conventional .s-core-c{opacity:0}
.sc-cure-conventional .s-damp{opacity:.35}
.sc-cure-conventional .s-crk{fill:none;stroke:var(--crack);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:70;stroke-dashoffset:0}
.sc-cure-conventional .s-pw{fill:var(--crack)}
.sc-cure-conventional .s-ar{fill:none;stroke:var(--water);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.anim .sc-cure-conventional.playing .s-st1{animation-name:k-cure-conventional-st1}
.anim .sc-cure-conventional.playing .s-st2{animation-name:k-cure-conventional-st2}
.anim .sc-cure-conventional.playing .s-st3{animation-name:k-cure-conventional-st3}
.anim .sc-cure-conventional.playing .s-sp{animation-name:k-cure-conventional-spray;animation-delay:var(--sd)}
.anim .sc-cure-conventional.playing .s-surf{animation-name:k-cure-conventional-surfC}
.anim .sc-cure-conventional.playing .s-core-c{animation-name:k-cure-conventional-coreC}
.anim .sc-cure-conventional.playing .s-damp{animation-name:k-cure-conventional-dampC}
.anim .sc-cure-conventional.playing .s-ar.s-up{animation-name:k-cure-conventional-arUp;animation-delay:var(--ad)}
.anim .sc-cure-conventional.playing .s-ar.s-dn{animation-name:k-cure-conventional-arDn;animation-delay:var(--ad)}
.anim .sc-cure-conventional.playing .s-crk{animation-name:k-cure-conventional-crk}
.anim .sc-cure-conventional.playing .s-pw{animation-name:k-cure-conventional-pw}
.anim .sc-cure-conventional.playing .s-cap-core{animation-name:k-cure-conventional-capC}
.anim .sc-cure-conventional.playing .s-cap-surf{animation-name:k-cure-conventional-capS}
.sc-cure-conventional .s-blk{fill:var(--conc);stroke-width:1.6;paint-order:fill}
.sc-cure-conventional .s-mor{fill:var(--cmor)}
@keyframes k-cure-conventional-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-cure-conventional-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-cure-conventional-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-cure-conventional-spray{0%{opacity:0;transform:translateX(0)}1%{opacity:1}7%{opacity:1;transform:translateX(24px)}8%,100%{opacity:0;transform:translateX(24px)}}
@keyframes k-cure-conventional-surfC{0%{opacity:0}14%{opacity:.95}96%{opacity:.95}100%{opacity:0}}
@keyframes k-cure-conventional-coreC{0%,34%{opacity:.34}62%,97%{opacity:0}100%{opacity:.34}}
@keyframes k-cure-conventional-dampC{0%,34%{opacity:0}62%,96%{opacity:.35}100%{opacity:0}}
@keyframes k-cure-conventional-arUp{0%,34%{opacity:0;transform:translateY(0)}38%{opacity:1}47%{opacity:1;transform:translateY(-12px)}48%{opacity:0;transform:translateY(0)}50%{opacity:1}59%{opacity:1;transform:translateY(-12px)}61%,100%{opacity:0;transform:translateY(-12px)}}
@keyframes k-cure-conventional-arDn{0%,34%{opacity:0;transform:translateY(0)}38%{opacity:1}47%{opacity:1;transform:translateY(12px)}48%{opacity:0;transform:translateY(0)}50%{opacity:1}59%{opacity:1;transform:translateY(12px)}61%,100%{opacity:0;transform:translateY(12px)}}
@keyframes k-cure-conventional-crk{0%,66%{stroke-dashoffset:70}80%,96%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
@keyframes k-cure-conventional-pw{0%,72%{opacity:0}84%,96%{opacity:1}100%{opacity:0}}
@keyframes k-cure-conventional-capC{0%,60%{opacity:0}66%,97%{opacity:1}100%{opacity:0}}
@keyframes k-cure-conventional-capS{0%,10%{opacity:0}16%,97%{opacity:1}100%{opacity:0}}`;

const CURE_COMPARISON_SVG_CONVENTIONAL = `<svg class="s-cs-svg" viewBox="0 0 340 196"><text class="s-lbl" x="70" y="13">Wall face</text><path class="s-tick" d="M72 16v5"></path><text class="s-lbl" x="316" y="13" text-anchor="end">Inside the wall</text><rect class="s-blk" x="70" y="20" width="250" height="62" rx="3"></rect><rect class="s-blk" x="70" y="118" width="250" height="62" rx="3"></rect>
<rect class="s-w s-damp" x="70" y="62" width="250" height="20"></rect><rect class="s-w s-damp" x="70" y="118" width="250" height="20"></rect>
<rect class="s-mor" x="70" y="82" width="250" height="36"></rect>
<rect class="s-w s-core-c" x="92" y="82" width="228" height="36"></rect>
<rect class="s-w s-surf" x="70" y="82" width="22" height="36"></rect>
<circle class="s-pw" cx="156" cy="104" r="1.3"></circle><circle class="s-pw" cx="235" cy="90" r="1.3"></circle><circle class="s-pw" cx="190" cy="105" r="1.3"></circle><circle class="s-pw" cx="217" cy="106" r="1.3"></circle><circle class="s-pw" cx="244" cy="88" r="1.3"></circle><circle class="s-pw" cx="251" cy="86" r="1.3"></circle><circle class="s-pw" cx="310" cy="101" r="1.3"></circle><circle class="s-pw" cx="162" cy="103" r="1.3"></circle><circle class="s-pw" cx="155" cy="92" r="1.3"></circle><circle class="s-pw" cx="279" cy="101" r="1.3"></circle><circle class="s-pw" cx="234" cy="112" r="1.3"></circle><circle class="s-pw" cx="236" cy="101" r="1.3"></circle><circle class="s-pw" cx="197" cy="106" r="1.3"></circle><circle class="s-pw" cx="134" cy="93" r="1.3"></circle><circle class="s-pw" cx="258" cy="90" r="1.3"></circle><circle class="s-pw" cx="229" cy="98" r="1.3"></circle><circle class="s-pw" cx="285" cy="86" r="1.3"></circle><circle class="s-pw" cx="267" cy="110" r="1.3"></circle><circle class="s-pw" cx="112" cy="91" r="1.3"></circle><circle class="s-pw" cx="290" cy="104" r="1.3"></circle><circle class="s-pw" cx="106" cy="95" r="1.3"></circle><circle class="s-pw" cx="295" cy="86" r="1.3"></circle>
<path class="s-crk" d="M104 88 l10 8 l8 -5 l10 9 l9 -4 l8 7"></path><path class="s-crk" d="M176 113 l9 -9 l9 4 l10 -8 l8 5 l7 -4"></path><path class="s-crk" d="M244 89 l8 7 l9 -3 l8 9 l10 -4 l9 6"></path>
<path class="s-ar s-up" style="--ad:0.00s" d="M130 92 v-18 m-4 5 l4 -5 l4 5"></path><path class="s-ar s-dn" style="--ad:0.00s" d="M130 108 v18 m-4 -5 l4 5 l4 -5"></path><path class="s-ar s-up" style="--ad:0.12s" d="M180 92 v-18 m-4 5 l4 -5 l4 5"></path><path class="s-ar s-dn" style="--ad:0.12s" d="M180 108 v18 m-4 -5 l4 5 l4 -5"></path><path class="s-ar s-up" style="--ad:0.24s" d="M230 92 v-18 m-4 5 l4 -5 l4 5"></path><path class="s-ar s-dn" style="--ad:0.24s" d="M230 108 v18 m-4 -5 l4 5 l4 -5"></path><path class="s-ar s-up" style="--ad:0.36s" d="M280 92 v-18 m-4 5 l4 -5 l4 5"></path><path class="s-ar s-dn" style="--ad:0.36s" d="M280 108 v18 m-4 -5 l4 5 l4 -5"></path>
<path class="s-noz" d="M6 92 h20 l12 -7 v30 l-12 -7 h-20 z"></path><circle class="s-sp" cx="44" cy="88" r="2.6" style="--sd:0.00s"></circle><circle class="s-sp" cx="44" cy="100" r="2.6" style="--sd:0.25s"></circle><circle class="s-sp" cx="44" cy="94" r="2.6" style="--sd:0.50s"></circle><circle class="s-sp" cx="44" cy="110" r="2.6" style="--sd:0.75s"></circle><circle class="s-sp" cx="44" cy="90" r="2.6" style="--sd:1.00s"></circle><circle class="s-sp" cx="44" cy="104" r="2.6" style="--sd:1.25s"></circle><circle class="s-sp" cx="44" cy="97" r="2.6" style="--sd:1.50s"></circle><circle class="s-sp" cx="44" cy="112" r="2.6" style="--sd:1.75s"></circle><circle class="s-sp" cx="44" cy="92" r="2.6" style="--sd:2.00s"></circle><circle class="s-sp" cx="44" cy="106" r="2.6" style="--sd:2.25s"></circle>
<text class="s-lbl s-cap-surf" x="81" y="194" text-anchor="middle">wet</text><text class="s-lbl s-cap-core" x="206" y="194" text-anchor="middle">core: dry</text>
</svg>`;

const CURE_COMPARISON_OL_CONVENTIONAL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Curing water wets only the joint's face</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Porous blocks suck water out of the core</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Core dries out: cracks, powdery mortar</span></li></ol>`;

const CURE_COMPARISON_STYLE_BLOCKFIX = `.sc-cure-blockfix .s-lr .s-ar{color:var(--ink-2);text-align:center}
.sc-cure-blockfix .s-cure{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.sc-cure-blockfix .s-cs-svg{width:100%;height:auto;display:block}
.sc-cure-blockfix .s-blk{fill:var(--cblk)}
.sc-cure-blockfix .s-mor{fill:var(--cmor)}
.sc-cure-blockfix .s-w{fill:var(--water)}
.sc-cure-blockfix .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-cure-blockfix .s-tick{stroke:var(--ink-2);stroke-width:1.2}
.sc-cure-blockfix .s-noz{fill:var(--ink-2)}
.sc-cure-blockfix .s-slash{stroke:var(--neg);stroke-width:3;stroke-linecap:round}
.sc-cure-blockfix .s-nozoff{opacity:.55}
.sc-cure-blockfix .s-ar{fill:none;stroke:var(--water);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.sc-cure-blockfix .s-core-f{opacity:.18}
.sc-cure-blockfix .s-fixc{fill:var(--ok)}
.sc-cure-blockfix .s-film{fill:none;stroke-width:2.6;stroke-dasharray:6 4}
.sc-cure-blockfix .s-fixs{stroke:var(--ok)}
.sc-cure-blockfix .s-okc circle{fill:var(--ok)}
.sc-cure-blockfix .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-cure-blockfix .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-cure-blockfix.playing .s-st1{animation-name:k-cure-blockfix-st1}
.anim .sc-cure-blockfix.playing .s-st2{animation-name:k-cure-blockfix-st2}
.anim .sc-cure-blockfix.playing .s-st3{animation-name:k-cure-blockfix-st3}
.anim .sc-cure-blockfix.playing .s-ar.s-up{animation-name:k-cure-blockfix-arUp;animation-delay:var(--ad)}
.anim .sc-cure-blockfix.playing .s-ar.s-dn{animation-name:k-cure-blockfix-arDn;animation-delay:var(--ad)}
.anim .sc-cure-blockfix.playing .s-cap-core{animation-name:k-cure-blockfix-capC}
.anim .sc-cure-blockfix.playing .s-core-f{animation-name:k-cure-blockfix-coreF}
.anim .sc-cure-blockfix.playing .s-fixc{animation-name:k-cure-blockfix-cureF}
.anim .sc-cure-blockfix.playing .s-film{animation-name:k-cure-blockfix-filmOp,k-cure-blockfix-march;animation-duration:var(--T),1s}
.anim .sc-cure-blockfix.playing .s-okc{animation-name:k-cure-blockfix-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-cure-blockfix .s-blk{fill:var(--conc);stroke-width:1.6;paint-order:fill}
.sc-cure-blockfix .s-mor{fill:var(--cmor)}
.sc-cure-blockfix .s-cure{grid-template-columns:minmax(0,1fr)!important;gap:18px}
@keyframes k-cure-blockfix-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-cure-blockfix-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-cure-blockfix-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-cure-blockfix-arUp{0%,34%{opacity:0;transform:translateY(0)}38%{opacity:1}47%{opacity:1;transform:translateY(-12px)}48%{opacity:0;transform:translateY(0)}50%{opacity:1}59%{opacity:1;transform:translateY(-12px)}61%,100%{opacity:0;transform:translateY(-12px)}}
@keyframes k-cure-blockfix-arDn{0%,34%{opacity:0;transform:translateY(0)}38%{opacity:1}47%{opacity:1;transform:translateY(12px)}48%{opacity:0;transform:translateY(0)}50%{opacity:1}59%{opacity:1;transform:translateY(12px)}61%,100%{opacity:0;transform:translateY(12px)}}
@keyframes k-cure-blockfix-capC{0%,60%{opacity:0}66%,97%{opacity:1}100%{opacity:0}}
@keyframes k-cure-blockfix-coreF{0%,62%{opacity:.62}86%,97%{opacity:.18}100%{opacity:.62}}
@keyframes k-cure-blockfix-cureF{0%,64%{opacity:0}86%,97%{opacity:.5}100%{opacity:0}}
@keyframes k-cure-blockfix-filmOp{0%,3%{opacity:0}12%,97%{opacity:1}100%{opacity:0}}
@keyframes k-cure-blockfix-march{to{stroke-dashoffset:-20}}
@keyframes k-cure-blockfix-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}`;

const CURE_COMPARISON_SVG_BLOCKFIX = `<svg class="s-cs-svg" viewBox="0 0 340 196"><text class="s-lbl" x="70" y="13">Wall face</text><path class="s-tick" d="M72 16v5"></path><text class="s-lbl" x="316" y="13" text-anchor="end">Inside the wall</text><rect class="s-blk" x="70" y="20" width="250" height="62" rx="3"></rect><rect class="s-blk" x="70" y="118" width="250" height="62" rx="3"></rect>
<rect class="s-mor" x="70" y="82" width="250" height="36"></rect>
<rect class="s-w s-core-f" x="70" y="82" width="250" height="36"></rect>
<rect class="s-cure s-fixc" x="70" y="82" width="250" height="36"></rect>
<line class="s-film s-fixs" x1="70" y1="82" x2="320" y2="82"></line><line class="s-film s-fixs" x1="70" y1="118" x2="320" y2="118"></line>
<path class="s-ar s-bu" style="--ad:0.00s" d="M130 96 v-10 m-4 4 l4 -4 l4 4"></path><path class="s-ar s-bd" style="--ad:0.00s" d="M130 104 v10 m-4 -4 l4 4 l4 -4"></path><path class="s-ar s-bu" style="--ad:0.12s" d="M180 96 v-10 m-4 4 l4 -4 l4 4"></path><path class="s-ar s-bd" style="--ad:0.12s" d="M180 104 v10 m-4 -4 l4 4 l4 -4"></path><path class="s-ar s-bu" style="--ad:0.24s" d="M230 96 v-10 m-4 4 l4 -4 l4 4"></path><path class="s-ar s-bd" style="--ad:0.24s" d="M230 104 v10 m-4 -4 l4 4 l4 -4"></path><path class="s-ar s-bu" style="--ad:0.36s" d="M280 96 v-10 m-4 4 l4 -4 l4 4"></path><path class="s-ar s-bd" style="--ad:0.36s" d="M280 104 v10 m-4 -4 l4 4 l4 -4"></path>
<g class="s-nozoff"><path class="s-noz" d="M6 92 h20 l12 -7 v30 l-12 -7 h-20 z"></path><path class="s-slash" d="M4 84 L42 116"></path></g>
<g class="s-okc"><circle cx="195" cy="100" r="11"></circle><path d="M189 100.5l4 4 8-8.5"></path></g>
<text class="s-lbl" x="3" y="134">no curing</text>
<text class="s-lbl s-cap-core" x="195" y="194" text-anchor="middle">whole joint cures</text>
</svg>`;

const CURE_COMPARISON_OL_BLOCKFIX = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Water stays inside the whole joint</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Blocks can't pull it out</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Cures fully, inside and out</span></li></ol>`;

// Scope classes here are renamed from the reference's `sc-hw303-...` to
// generic `sc-cure-conventional`/`sc-cure-blockfix` since they are genuinely
// shared across HW301/302/303, not owned by any one product.
module.exports = {
  cureCardConventional: {
    title: 'Conventional mortar',
    style: CURE_COMPARISON_STYLE_CONVENTIONAL,
    svg: CURE_COMPARISON_SVG_CONVENTIONAL,
    ol: CURE_COMPARISON_OL_CONVENTIONAL,
    scopeClass: 'sc-cure-conventional',
  },
  cureCardBlockFix: {
    title: 'Block Fix',
    style: CURE_COMPARISON_STYLE_BLOCKFIX,
    svg: CURE_COMPARISON_SVG_BLOCKFIX,
    ol: CURE_COMPARISON_OL_BLOCKFIX,
    scopeClass: 'sc-cure-blockfix',
  },
};
