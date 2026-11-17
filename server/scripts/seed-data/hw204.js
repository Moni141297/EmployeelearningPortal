/*
 * HW204 Tile Fix Max — extracted from https://hw-learning-hub-v2.vercel.app/products/tile-fix-max-hw204
 * Diagrams scoped sc-hw200-* are reused byte-for-byte from the shared Tile Fix family
 * (conventional-mortar-bed, tile-adhesive, open-time-annex-c, adjustment-time-annex-d,
 * slip-annex-e, tensile-adhesion-annex-a, shear-adhesion-annex-b); sc-hw204-from-bag-to-bond
 * and sc-hw204-deformability-annex-f are unique to this product.
 */

function svgCard(scopeClass, cardTitle, tone, style, svg, steps) {
  const toneClass = tone ? ' ' + tone : '';
  return `<div class="svg-card"><div class="svg-card-head"><span class="svg-card-title${toneClass}">${cardTitle}</span><label class="svg-card-replay"><input type="checkbox" data-replay/>Replay</label></div><style>${style}</style><div class="svg-anim anim ${scopeClass} playing" style="--T:9s">${svg}${steps}</div></div>`;
}

const CONVENTIONAL_MORTAR_BED_STYLE = `.sc-hw200-conventional-mortar-bed .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw200-conventional-mortar-bed .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw200-conventional-mortar-bed .s-badtx{fill:var(--neg);font-weight:600}
.anim .sc-hw200-conventional-mortar-bed.playing .s-st1{animation-name:k-hw200-conventional-mortar-bed-st1}
.anim .sc-hw200-conventional-mortar-bed.playing .s-st2{animation-name:k-hw200-conventional-mortar-bed-st2}
.anim .sc-hw200-conventional-mortar-bed.playing .s-st3{animation-name:k-hw200-conventional-mortar-bed-st3}
.anim .sc-hw200-conventional-mortar-bed.playing .s-badtx{animation-name:k-hw200-conventional-mortar-bed-redge}
.sc-hw200-conventional-mortar-bed .s-txb{fill:var(--cblk)}
.sc-hw200-conventional-mortar-bed .s-late{opacity:1}
.anim .sc-hw200-conventional-mortar-bed.playing .s-late{animation-name:k-hw200-conventional-mortar-bed-lateIn}
.anim .sc-hw200-conventional-mortar-bed.playing .s-phC{animation-name:k-hw200-conventional-mortar-bed-phC}
.anim .sc-hw200-conventional-mortar-bed.playing .s-fB{animation-name:k-hw200-conventional-mortar-bed-fB}
.sc-hw200-conventional-mortar-bed .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw200-conventional-mortar-bed .s-lbln{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw200-conventional-mortar-bed .s-stk{fill:none;stroke:var(--ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-conventional-mortar-bed .s-tl1{fill:var(--tile);stroke:var(--tileb);stroke-width:1.4}
.sc-hw200-conventional-mortar-bed .s-voidf{fill:var(--paper);stroke:var(--neg);stroke-width:1.2;stroke-dasharray:3 2}
.sc-hw200-conventional-mortar-bed .s-tileg{transform-box:view-box;transform-origin:40px 120px}
.anim .sc-hw200-conventional-mortar-bed.playing .s-tileg{animation-name:k-hw200-conventional-mortar-bed-lift}
.anim .sc-hw200-conventional-mortar-bed.playing .s-tok{animation:k-hw200-conventional-mortar-bed-tok 1s ease-out infinite}
.sc-hw200-conventional-mortar-bed .s-tok{transform-box:fill-box}
.sc-hw200-conventional-mortar-bed .s-brk{stroke:var(--neg);stroke-width:2.2;fill:none;stroke-linecap:round}
.sc-hw200-conventional-mortar-bed.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.anim .sc-hw200-conventional-mortar-bed.playing .s-st1 .disc{animation-name:k-hw200-conventional-mortar-bed-st1-disc}
.anim .sc-hw200-conventional-mortar-bed.playing .s-st2 .disc{animation-name:k-hw200-conventional-mortar-bed-st2-disc}
.anim .sc-hw200-conventional-mortar-bed.playing .s-st3 .disc{animation-name:k-hw200-conventional-mortar-bed-st3-disc}
@keyframes k-hw200-conventional-mortar-bed-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw200-conventional-mortar-bed-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw200-conventional-mortar-bed-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw200-conventional-mortar-bed-redge{0%,72%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-conventional-mortar-bed-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-conventional-mortar-bed-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-conventional-mortar-bed-fB{0%,33%{opacity:0}36%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-conventional-mortar-bed-lift{0%,70%{transform:none}78%,97%{transform:rotate(-4deg)}100%{transform:none}}
@keyframes k-hw200-conventional-mortar-bed-tok{0%{opacity:0;transform:none}30%{opacity:1}100%{opacity:0;transform:translateX(8px)}}
@keyframes k-hw200-conventional-mortar-bed-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw200-conventional-mortar-bed-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw200-conventional-mortar-bed-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const CONVENTIONAL_MORTAR_BED_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 206"><rect x="20" y="160" width="260" height="32" rx="2" fill="var(--conc)"></rect><path style="fill:var(--cmor)" d="M20 160 L20 124 C60 118 90 131 130 122 C170 115 210 129 250 120 L280 125 L280 160 Z"></path><g class="s-fB"><ellipse class="s-voidf" cx="82" cy="128" rx="15" ry="4.5"></ellipse><ellipse class="s-voidf" cx="152" cy="126" rx="19" ry="4.5"></ellipse><ellipse class="s-voidf" cx="222" cy="128" rx="12" ry="4"></ellipse></g><g class="s-tileg"><rect class="s-tl1" x="40" y="109" width="220" height="11" rx="1.5"></rect></g><g class="s-phC"><path class="s-tok s-brk" d="M266 96 q6 6 0 12 M272 92 q9 10 0 20"></path><text class="s-lbln" x="268" y="84" text-anchor="middle">tok tok</text></g><path class="s-stk" d="M290 122 V160 M286 122 H294 M286 160 H294"></path><text class="s-lbl" x="292" y="176" text-anchor="end">thick bed</text><text class="s-lbl" x="20" y="28">Cement-sand mortar</text><text class="s-lbl s-badtx s-late" x="150" y="54" text-anchor="middle">Voids under the tile.</text><text class="s-lbl s-badtx s-late" x="150" y="70" text-anchor="middle">It sounds hollow and lifts.</text></svg>`;
const CONVENTIONAL_MORTAR_BED_STEPS = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Thick cement-sand bed, spread and levelled by hand</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Uneven bed leaves voids; bond depends on the tile soaking up cement</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Tile sounds hollow, edges lift, tiles pop or crack</span></li></ol>`;

const TILE_ADHESIVE_STYLE = `.sc-hw200-tile-adhesive .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw200-tile-adhesive .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw200-tile-adhesive .s-okc circle{fill:var(--ok)}
.sc-hw200-tile-adhesive .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-tile-adhesive .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw200-tile-adhesive.playing .s-st1{animation-name:k-hw200-tile-adhesive-st1}
.anim .sc-hw200-tile-adhesive.playing .s-st2{animation-name:k-hw200-tile-adhesive-st2}
.anim .sc-hw200-tile-adhesive.playing .s-st3{animation-name:k-hw200-tile-adhesive-st3}
.anim .sc-hw200-tile-adhesive.playing .s-okc{animation-name:k-hw200-tile-adhesive-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw200-tile-adhesive .s-txb{fill:var(--cblk)}
.sc-hw200-tile-adhesive .s-late{opacity:1}
.sc-hw200-tile-adhesive .s-goodtx{fill:var(--pc);font-weight:600}
.anim .sc-hw200-tile-adhesive.playing .s-late{animation-name:k-hw200-tile-adhesive-lateIn}
.sc-hw200-tile-adhesive .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw200-tile-adhesive .s-stk{fill:none;stroke:var(--ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-tile-adhesive .s-tlp{fill:color-mix(in srgb,var(--pc) 30%,var(--paper));stroke:var(--pc);stroke-width:1.6}
.sc-hw200-tile-adhesive .s-adhp{fill:color-mix(in srgb,var(--pc) 22%,var(--adh))}
.sc-hw200-tile-adhesive .s-pcg circle{fill:var(--pc)}
.sc-hw200-tile-adhesive .s-pcg path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-tile-adhesive .s-rdg2{transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw200-tile-adhesive.playing .s-rdg2{animation-name:k-hw200-tile-adhesive-rdg2}
.anim .sc-hw200-tile-adhesive.playing .s-layer{animation-name:k-hw200-tile-adhesive-layer}
.anim .sc-hw200-tile-adhesive.playing .s-tdrop{animation-name:k-hw200-tile-adhesive-tdrop}
.sc-hw200-tile-adhesive.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.anim .sc-hw200-tile-adhesive.playing .s-st1 .disc{animation-name:k-hw200-tile-adhesive-st1-disc}
.anim .sc-hw200-tile-adhesive.playing .s-st2 .disc{animation-name:k-hw200-tile-adhesive-st2-disc}
.anim .sc-hw200-tile-adhesive.playing .s-st3 .disc{animation-name:k-hw200-tile-adhesive-st3-disc}
@keyframes k-hw200-tile-adhesive-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw200-tile-adhesive-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw200-tile-adhesive-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw200-tile-adhesive-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw200-tile-adhesive-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-tile-adhesive-rdg2{0%,40%{opacity:1;transform:scaleY(1)}50%,97%{opacity:0;transform:scaleY(.4)}100%{opacity:1;transform:scaleY(1)}}
@keyframes k-hw200-tile-adhesive-layer{0%,42%{opacity:0}50%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-tile-adhesive-tdrop{0%,30%{transform:translateY(-44px);opacity:0}33%{opacity:1;transform:translateY(-44px)}46%,97%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-44px)}}
@keyframes k-hw200-tile-adhesive-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw200-tile-adhesive-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw200-tile-adhesive-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const TILE_ADHESIVE_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 206"><rect x="20" y="160" width="260" height="32" rx="2" fill="var(--conc)"></rect><rect class="s-rdg2 s-adhp" x="26" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="42" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="58" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="74" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="90" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="106" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="122" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="138" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="154" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="170" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="186" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="202" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="218" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="234" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="250" y="146" width="9" height="14"></rect><rect class="s-rdg2 s-adhp" x="266" y="146" width="9" height="14"></rect><rect class="s-layer s-adhp" x="22" y="151" width="256" height="9"></rect><g class="s-tdrop"><rect class="s-tlp" x="40" y="140" width="220" height="11" rx="1.5"></rect></g><path class="s-stk" d="M290 151 V160 M286 151 H294 M286 160 H294"></path><text class="s-lbl" x="292" y="176" text-anchor="end">thin bed</text><text class="s-lbl" x="20" y="28">Tile adhesive</text><g transform="translate(150 110)"><g class="s-okc"><g class="s-pcg"><circle cx="0" cy="0" r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g></g><text class="s-lbl s-goodtx s-late" x="150" y="62" text-anchor="middle">Full contact. Bonded.</text><text class="s-lbl s-goodtx s-late" x="150" y="78" text-anchor="middle">No hollows.</text></svg>`;
const TILE_ADHESIVE_STEPS = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Thin, even bed combed with a notched trowel</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Tile pressed in: the ridges merge into one layer</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Full contact and a polymer bond, tested to IS 15477</span></li></ol>`;

const OPEN_TIME_C_STYLE = `.sc-hw200-open-time-annex-c .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw200-open-time-annex-c .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw200-open-time-annex-c .s-cface{fill:var(--paper);stroke:var(--ink);stroke-width:2}
.sc-hw200-open-time-annex-c .s-ctk{stroke:var(--ink-2);stroke-width:1.5}
.sc-hw200-open-time-annex-c .s-cdot{fill:var(--ink)}
.anim .sc-hw200-open-time-annex-c.playing .s-st1{animation-name:k-hw200-open-time-annex-c-st1}
.anim .sc-hw200-open-time-annex-c.playing .s-st2{animation-name:k-hw200-open-time-annex-c-st2}
.anim .sc-hw200-open-time-annex-c.playing .s-st3{animation-name:k-hw200-open-time-annex-c-st3}
.anim .sc-hw200-open-time-annex-c.playing .s-s15{animation-name:k-hw200-open-time-annex-c-s15}
.anim .sc-hw200-open-time-annex-c.playing .s-s35{animation-name:k-hw200-open-time-annex-c-s35}
.anim .sc-hw200-open-time-annex-c.playing .s-s55{animation-name:k-hw200-open-time-annex-c-s55}
.anim .sc-hw200-open-time-annex-c.playing .s-s75{animation-name:k-hw200-open-time-annex-c-s75}
.anim .sc-hw200-open-time-annex-c.playing .s-s85{animation-name:k-hw200-open-time-annex-c-s85}
.sc-hw200-open-time-annex-c .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw200-open-time-annex-c .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw200-open-time-annex-c .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw200-open-time-annex-c .s-adh{fill:var(--adh)}
.sc-hw200-open-time-annex-c .s-okg circle{fill:var(--ok)}
.sc-hw200-open-time-annex-c .s-okg path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-open-time-annex-c .s-nog path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-open-time-annex-c .s-nog circle{fill:var(--neg)}
.sc-hw200-open-time-annex-c .s-skin{fill:var(--ink-2);opacity:.35}
.anim .sc-hw200-open-time-annex-c.playing .s-skin{animation-name:k-hw200-open-time-annex-c-skin}
.sc-hw200-open-time-annex-c .s-hand2{stroke:var(--pc);stroke-width:2.6;stroke-linecap:round;transform-box:view-box}
.anim .sc-hw200-open-time-annex-c.playing .s-hand2{animation-name:k-hw200-open-time-annex-c-spin;animation-timing-function:linear}
.sc-hw200-open-time-annex-c .s-wet{fill:var(--adh)}
.sc-hw200-open-time-annex-c .s-half{stroke:var(--neg);stroke-width:1.2;stroke-dasharray:4 3}
.sc-hw200-open-time-annex-c.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.anim .sc-hw200-open-time-annex-c.playing .s-st1 .disc{animation-name:k-hw200-open-time-annex-c-st1-disc}
.anim .sc-hw200-open-time-annex-c.playing .s-st2 .disc{animation-name:k-hw200-open-time-annex-c-st2-disc}
.anim .sc-hw200-open-time-annex-c.playing .s-st3 .disc{animation-name:k-hw200-open-time-annex-c-st3-disc}
@keyframes k-hw200-open-time-annex-c-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw200-open-time-annex-c-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw200-open-time-annex-c-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw200-open-time-annex-c-s15{0%,15%{opacity:0}18%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-open-time-annex-c-s35{0%,35%{opacity:0}38%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-open-time-annex-c-s55{0%,55%{opacity:0}58%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-open-time-annex-c-s75{0%,75%{opacity:0}78%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-open-time-annex-c-s85{0%,85%{opacity:0}88%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-open-time-annex-c-skin{0%{opacity:0}85%,97%{opacity:.5}100%{opacity:0}}
@keyframes k-hw200-open-time-annex-c-spin{to{transform:rotate(360deg)}}
@keyframes k-hw200-open-time-annex-c-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw200-open-time-annex-c-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw200-open-time-annex-c-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const OPEN_TIME_C_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 320 206"><rect x="14" y="16" width="212" height="58" rx="4" style="fill:var(--soft);stroke:var(--rule)"></rect><rect class="s-adh" x="20" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="31" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="42" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="53" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="64" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="75" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="86" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="97" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="108" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="119" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="130" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="141" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="152" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="163" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="174" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="185" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="196" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="207" y="22" width="7" height="46" rx="1"></rect><rect class="s-adh" x="218" y="22" width="7" height="46" rx="1"></rect><rect class="s-skin" x="16" y="22" width="208" height="46"></rect><circle class="s-cface" cx="272" cy="45" r="27"></circle><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(0 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(30 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(60 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(90 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(120 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(150 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(180 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(210 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(240 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(270 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(300 272 45)"></line><line class="s-ctk" x1="272" y1="21" x2="272" y2="25" transform="rotate(330 272 45)"></line><line class="s-hand2" x1="272" y1="45" x2="272" y2="25" style="transform-origin:272px 45px"></line><circle class="s-cdot" cx="272" cy="45" r="2.5"></circle><text class="s-lbl" x="120" y="88" text-anchor="middle">combed adhesive: a skin slowly forms</text><g class="s-s15"><rect x="20" y="100" width="54" height="54" rx="2" style="fill:var(--paper);stroke:var(--ink-2);stroke-width:1.4"></rect><rect class="s-wet" x="21" y="101.0" width="52" height="52.0"></rect><line class="s-half" x1="21" y1="127" x2="73" y2="127"></line><text class="s-lblb" x="47" y="170" text-anchor="middle">5 min</text><text class="s-lbl" x="47" y="184" text-anchor="middle">100% wetted</text></g><g class="s-s35"><rect x="95" y="100" width="54" height="54" rx="2" style="fill:var(--paper);stroke:var(--ink-2);stroke-width:1.4"></rect><rect class="s-wet" x="96" y="111.4" width="52" height="41.6"></rect><line class="s-half" x1="96" y1="127" x2="148" y2="127"></line><text class="s-lblb" x="122" y="170" text-anchor="middle">10 min</text><text class="s-lbl" x="122" y="184" text-anchor="middle">80% wetted</text></g><g class="s-s55"><rect x="170" y="100" width="54" height="54" rx="2" style="fill:var(--paper);stroke:var(--ink-2);stroke-width:1.4"></rect><rect class="s-wet" x="171" y="124.4" width="52" height="28.6"></rect><line class="s-half" x1="171" y1="127" x2="223" y2="127"></line><text class="s-lblb" x="197" y="170" text-anchor="middle">15 min</text><text class="s-lbl" x="197" y="184" text-anchor="middle">55% wetted</text></g><g class="s-s75"><rect x="245" y="100" width="54" height="54" rx="2" style="fill:var(--paper);stroke:var(--ink-2);stroke-width:1.4"></rect><rect class="s-wet" x="246" y="137.4" width="52" height="15.6"></rect><line class="s-half" x1="246" y1="127" x2="298" y2="127"></line><text class="s-lblb" x="272" y="170" text-anchor="middle">20 min</text><text class="s-lbl" x="272" y="184" text-anchor="middle">30% wetted</text></g><g class="s-s85"><g transform="translate(224 100)"><g class="s-okg"><circle cx="0" cy="0" r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g><g transform="translate(299 100)"><g class="s-nog"><circle cx="0" cy="0" r="11"></circle><path d="M-4.5 -4.5l9 9M4.5 -4.5l-9 9"></path></g></g><text class="s-lblp" x="197" y="200" text-anchor="middle">= open time</text></g><text class="s-lbl s-s15" x="18" y="131" text-anchor="end" style="fill: var(--neg); font-size: 7.92px;">50%</text></svg>`;
const OPEN_TIME_C_STEPS = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Comb adhesive on a board and start the clock</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Every 5 min, lift a tile and look at its back</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Open time = last check with at least 50% of the back wetted</span></li></ol>`;

const ADJUST_TIME_D_STYLE = `.sc-hw200-adjustment-time-annex-d .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-st1{animation-name:k-hw200-adjustment-time-annex-d-st1}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-st2{animation-name:k-hw200-adjustment-time-annex-d-st2}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-st3{animation-name:k-hw200-adjustment-time-annex-d-st3}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-s20{animation-name:k-hw200-adjustment-time-annex-d-s20}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-s55{animation-name:k-hw200-adjustment-time-annex-d-s55}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-s85{animation-name:k-hw200-adjustment-time-annex-d-s85}
.sc-hw200-adjustment-time-annex-d .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw200-adjustment-time-annex-d .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw200-adjustment-time-annex-d .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw200-adjustment-time-annex-d .s-lbln{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw200-adjustment-time-annex-d .s-stk{fill:none;stroke:var(--ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-adjustment-time-annex-d .s-tlp{fill:color-mix(in srgb,var(--pc) 30%,var(--paper));stroke:var(--pc);stroke-width:1.6}
.sc-hw200-adjustment-time-annex-d .s-adh{fill:var(--adh)}
.sc-hw200-adjustment-time-annex-d .s-okg circle{fill:var(--ok)}
.sc-hw200-adjustment-time-annex-d .s-okg path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-adjustment-time-annex-d .s-nog path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-adjustment-time-annex-d .s-nog circle{fill:var(--neg)}
.sc-hw200-adjustment-time-annex-d .s-rot{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-rotA{animation-name:k-hw200-adjustment-time-annex-d-rotA;animation-timing-function:ease-in-out}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-rotB{animation-name:k-hw200-adjustment-time-annex-d-rotB;animation-timing-function:ease-in-out}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-rotC{animation-name:k-hw200-adjustment-time-annex-d-rotC;animation-timing-function:ease-in-out}
.sc-hw200-adjustment-time-annex-d.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-st1 .disc{animation-name:k-hw200-adjustment-time-annex-d-st1-disc}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-st2 .disc{animation-name:k-hw200-adjustment-time-annex-d-st2-disc}
.anim .sc-hw200-adjustment-time-annex-d.playing .s-st3 .disc{animation-name:k-hw200-adjustment-time-annex-d-st3-disc}
@keyframes k-hw200-adjustment-time-annex-d-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw200-adjustment-time-annex-d-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw200-adjustment-time-annex-d-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw200-adjustment-time-annex-d-s20{0%,20%{opacity:0}23%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-adjustment-time-annex-d-s55{0%,55%{opacity:0}58%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-adjustment-time-annex-d-s85{0%,85%{opacity:0}88%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-adjustment-time-annex-d-rotA{0%,4%{transform:none}14%{transform:rotate(90deg)}24%,100%{transform:none}}
@keyframes k-hw200-adjustment-time-annex-d-rotB{0%,37%{transform:none}47%{transform:rotate(90deg)}57%,100%{transform:none}}
@keyframes k-hw200-adjustment-time-annex-d-rotC{0%,69%{transform:none}72%{transform:rotate(6deg)}75%{transform:rotate(-5deg)}78%{transform:rotate(4deg)}81%,100%{transform:none}}
@keyframes k-hw200-adjustment-time-annex-d-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw200-adjustment-time-annex-d-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw200-adjustment-time-annex-d-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const ADJUST_TIME_D_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 320 176"><rect x="10" y="28" width="300" height="100" rx="4" style="fill:var(--soft);stroke:var(--rule)"></rect><rect class="s-adh" x="16" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="27" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="38" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="49" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="60" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="71" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="82" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="93" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="104" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="115" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="126" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="137" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="148" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="159" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="170" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="181" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="192" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="203" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="214" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="225" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="236" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="247" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="258" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="269" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="280" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="291" y="34" width="7" height="88" rx="1"></rect><rect class="s-adh" x="302" y="34" width="7" height="88" rx="1"></rect><text class="s-lblb" x="52" y="20" text-anchor="middle">early</text><rect class="s-rot s-rotA s-tlp" x="24" y="50" width="56" height="56" rx="2"></rect><path class="s-stk" d="M56 44 a36 36 0 0 1 30 18" style="stroke:var(--pc)"></path><path d="M85 58 l2 6 l-6 0 z" style="fill:var(--pc)"></path><g class="s-s20"><g transform="translate(52 146)"><g class="s-okg"><circle cx="0" cy="0" r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g><text class="s-lblp" x="52" y="166" text-anchor="middle">turns</text></g><text class="s-lblb" x="152" y="20" text-anchor="middle">later</text><rect class="s-rot s-rotB s-tlp" x="124" y="50" width="56" height="56" rx="2"></rect><path class="s-stk" d="M156 44 a36 36 0 0 1 30 18" style="stroke:var(--pc)"></path><path d="M185 58 l2 6 l-6 0 z" style="fill:var(--pc)"></path><g class="s-s55"><g transform="translate(152 146)"><g class="s-okg"><circle cx="0" cy="0" r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g><text class="s-lblp" x="152" y="166" text-anchor="middle">turns</text></g><text class="s-lblb" x="252" y="20" text-anchor="middle">too late</text><rect class="s-rot s-rotC s-tlp" x="224" y="50" width="56" height="56" rx="2"></rect><path class="s-stk" d="M256 44 a36 36 0 0 1 30 18" style="stroke:var(--pc)"></path><path d="M285 58 l2 6 l-6 0 z" style="fill:var(--pc)"></path><g class="s-s85"><g transform="translate(252 146)"><g class="s-nog"><circle cx="0" cy="0" r="11"></circle><path d="M-4.5 -4.5l9 9M4.5 -4.5l-9 9"></path></g></g><text class="s-lbln" x="252" y="166" text-anchor="middle">stuck</text></g></svg>`;
const ADJUST_TIME_D_STEPS = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Tiles pressed in with a 2 kg weight for 30 s</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>At intervals each tile is turned 90° and back</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Adjustment time = last time the tile still turns</span></li></ol>`;

const SLIP_E_STYLE = `.sc-hw200-slip-annex-e .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw200-slip-annex-e .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.anim .sc-hw200-slip-annex-e.playing .s-st1{animation-name:k-hw200-slip-annex-e-st1}
.anim .sc-hw200-slip-annex-e.playing .s-st2{animation-name:k-hw200-slip-annex-e-st2}
.anim .sc-hw200-slip-annex-e.playing .s-st3{animation-name:k-hw200-slip-annex-e-st3}
.sc-hw200-slip-annex-e .s-txb{fill:var(--cblk)}
.anim .sc-hw200-slip-annex-e.playing .s-phC{animation-name:k-hw200-slip-annex-e-phC}
.sc-hw200-slip-annex-e .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw200-slip-annex-e .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw200-slip-annex-e .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw200-slip-annex-e .s-lbln{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw200-slip-annex-e .s-stk{fill:none;stroke:var(--ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-slip-annex-e .s-tl1{fill:var(--tile);stroke:var(--tileb);stroke-width:1.4}
.sc-hw200-slip-annex-e .s-tlp{fill:color-mix(in srgb,var(--pc) 30%,var(--paper));stroke:var(--pc);stroke-width:1.6}
.sc-hw200-slip-annex-e .s-inkf{fill:var(--ink-2)}
.anim .sc-hw200-slip-annex-e.playing .s-sag{animation-name:k-hw200-slip-annex-e-sag;animation-timing-function:ease-in}
.anim .sc-hw200-slip-annex-e.playing .s-hold{animation-name:k-hw200-slip-annex-e-hold}
.sc-hw200-slip-annex-e .s-vstripe{fill:var(--adh);opacity:.9}
.sc-hw200-slip-annex-e .s-sag{transform:translateY(24px)}
.sc-hw200-slip-annex-e .s-hold{transform:translateY(1.5px)}
.sc-hw200-slip-annex-e .s-cs-svg{max-width:520px;margin:0 auto}
.anim .sc-hw200-slip-annex-e.playing .s-st1 .disc{animation-name:k-hw200-slip-annex-e-st1-disc}
.anim .sc-hw200-slip-annex-e.playing .s-st2 .disc{animation-name:k-hw200-slip-annex-e-st2-disc}
.anim .sc-hw200-slip-annex-e.playing .s-st3 .disc{animation-name:k-hw200-slip-annex-e-st3-disc}
@keyframes k-hw200-slip-annex-e-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw200-slip-annex-e-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw200-slip-annex-e-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw200-slip-annex-e-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-slip-annex-e-sag{0%,34%{transform:none}90%,97%{transform:translateY(24px)}100%{transform:none}}
@keyframes k-hw200-slip-annex-e-hold{0%,34%{transform:none}90%,97%{transform:translateY(1.5px)}100%{transform:none}}
@keyframes k-hw200-slip-annex-e-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw200-slip-annex-e-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw200-slip-annex-e-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const SLIP_E_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 340 222"><rect x="30" y="18" width="280" height="186" rx="3" fill="var(--conc)"></rect><rect class="s-vstripe" x="46" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="56" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="66" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="76" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="86" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="96" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="106" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="116" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="126" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="136" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="146" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="156" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="166" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="176" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="186" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="196" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="206" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="216" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="226" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="236" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="246" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="256" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="266" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="276" y="52" width="6" height="140" rx="1"></rect><rect class="s-vstripe" x="286" y="52" width="6" height="140" rx="1"></rect><rect x="30" y="38" width="280" height="9" rx="1" class="s-inkf"></rect><text class="s-lbl" x="170" y="32" text-anchor="middle">steel straight edge</text><g class="s-sag"><rect class="s-tl1" x="44" y="50" width="84" height="84" rx="2"></rect></g><g class="s-hold"><rect class="s-tlp" x="212" y="50" width="84" height="84" rx="2"></rect></g><text class="s-lblb" x="86" y="156" text-anchor="middle">without "T"</text><text class="s-lblp" x="254" y="156" text-anchor="middle">"T" adhesive</text><g class="s-phC"><text class="s-lbln" x="86" y="180" text-anchor="middle">slides down</text><text class="s-lblp" x="254" y="180" text-anchor="middle">≤ 0.5 mm</text></g><path class="s-stk" d="M170 60 v40 m-5 -8 l5 8 l5 -8"></path><text class="s-lbl" x="170" y="118" text-anchor="middle">gravity</text></svg>`;
const SLIP_E_STEPS = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Tile placed just under a steel straight edge</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Slab stood vertical for 20 minutes</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Slip of 0.5 mm or less: the adhesive is "T", slip resistant</span></li></ol>`;

const TENSILE_A_STYLE = `.sc-hw200-tensile-adhesion-annex-a .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw200-tensile-adhesion-annex-a .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.anim .sc-hw200-tensile-adhesion-annex-a.playing .s-st1{animation-name:k-hw200-tensile-adhesion-annex-a-st1}
.anim .sc-hw200-tensile-adhesion-annex-a.playing .s-st2{animation-name:k-hw200-tensile-adhesion-annex-a-st2}
.anim .sc-hw200-tensile-adhesion-annex-a.playing .s-st3{animation-name:k-hw200-tensile-adhesion-annex-a-st3}
.sc-hw200-tensile-adhesion-annex-a .s-txb{fill:var(--cblk)}
.anim .sc-hw200-tensile-adhesion-annex-a.playing .s-phC{animation-name:k-hw200-tensile-adhesion-annex-a-phC}
.sc-hw200-tensile-adhesion-annex-a .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw200-tensile-adhesion-annex-a .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw200-tensile-adhesion-annex-a .s-stk{fill:none;stroke:var(--ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-tensile-adhesion-annex-a .s-tlp{fill:color-mix(in srgb,var(--pc) 30%,var(--paper));stroke:var(--pc);stroke-width:1.6}
.sc-hw200-tensile-adhesion-annex-a .s-adhp{fill:color-mix(in srgb,var(--pc) 22%,var(--adh))}
.sc-hw200-tensile-adhesion-annex-a .s-inkf{fill:var(--ink-2)}
.anim .sc-hw200-tensile-adhesion-annex-a.playing .s-pull{animation-name:k-hw200-tensile-adhesion-annex-a-pull}
.sc-hw200-tensile-adhesion-annex-a .s-gtrk{fill:var(--rule)}
.sc-hw200-tensile-adhesion-annex-a .s-gbar{fill:var(--pc);transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw200-tensile-adhesion-annex-a.playing .s-gbar{animation-name:k-hw200-tensile-adhesion-annex-a-gup}
.sc-hw200-tensile-adhesion-annex-a .s-brk{stroke:var(--neg);stroke-width:2.2;fill:none;stroke-linecap:round}
.sc-hw200-tensile-adhesion-annex-a.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.anim .sc-hw200-tensile-adhesion-annex-a.playing .s-st1 .disc{animation-name:k-hw200-tensile-adhesion-annex-a-st1-disc}
.anim .sc-hw200-tensile-adhesion-annex-a.playing .s-st2 .disc{animation-name:k-hw200-tensile-adhesion-annex-a-st2-disc}
.anim .sc-hw200-tensile-adhesion-annex-a.playing .s-st3 .disc{animation-name:k-hw200-tensile-adhesion-annex-a-st3-disc}
@keyframes k-hw200-tensile-adhesion-annex-a-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw200-tensile-adhesion-annex-a-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw200-tensile-adhesion-annex-a-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw200-tensile-adhesion-annex-a-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-tensile-adhesion-annex-a-pull{0%,70%{transform:none}76%,97%{transform:translateY(-18px)}100%{transform:none}}
@keyframes k-hw200-tensile-adhesion-annex-a-gup{0%,5%{transform:scaleY(0)}70%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw200-tensile-adhesion-annex-a-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw200-tensile-adhesion-annex-a-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw200-tensile-adhesion-annex-a-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const TENSILE_A_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 200"><rect x="40" y="146" width="220" height="38" rx="2" fill="var(--conc)"></rect><rect class="s-adhp" x="110" y="138" width="80" height="8"></rect><g class="s-pull"><rect class="s-tlp" x="110" y="126" width="80" height="12" rx="1"></rect><rect x="113" y="118" width="74" height="8" class="s-inkf"></rect><rect x="145" y="72" width="10" height="46" class="s-inkf"></rect><path class="s-stk" d="M150 64 V40 M142 48 L150 40 L158 48" style="stroke:var(--pc);stroke-width:2.6"></path></g><rect class="s-gtrk" x="18" y="60" width="10" height="120" rx="3"></rect><rect class="s-gbar" x="18" y="60" width="10" height="120" rx="3"></rect><text class="s-lbl" x="23" y="52" text-anchor="middle">load</text><g class="s-phC"><path class="s-brk" d="M112 139 l10 3 l10 -3 l10 3 l10 -3 l10 3 l10 -3 l10 3 l6 -2"></path><text class="s-lblp" x="222" y="100">breaks at</text><text class="s-lblp" x="222" y="116">N/mm²</text></g></svg>`;
const TENSILE_A_STEPS = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>50 × 50 mm tile bonded to a concrete slab</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>A plate on the tile is pulled straight up</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Break load ÷ area = tensile adhesion, N/mm²</span></li></ol>`;

const SHEAR_B_STYLE = `.sc-hw200-shear-adhesion-annex-b .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw200-shear-adhesion-annex-b .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.anim .sc-hw200-shear-adhesion-annex-b.playing .s-st1{animation-name:k-hw200-shear-adhesion-annex-b-st1}
.anim .sc-hw200-shear-adhesion-annex-b.playing .s-st2{animation-name:k-hw200-shear-adhesion-annex-b-st2}
.anim .sc-hw200-shear-adhesion-annex-b.playing .s-st3{animation-name:k-hw200-shear-adhesion-annex-b-st3}
.anim .sc-hw200-shear-adhesion-annex-b.playing .s-phC{animation-name:k-hw200-shear-adhesion-annex-b-phC}
.sc-hw200-shear-adhesion-annex-b .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw200-shear-adhesion-annex-b .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw200-shear-adhesion-annex-b .s-stk{fill:none;stroke:var(--ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw200-shear-adhesion-annex-b .s-tl1{fill:var(--tile);stroke:var(--tileb);stroke-width:1.4}
.sc-hw200-shear-adhesion-annex-b .s-tlp{fill:color-mix(in srgb,var(--pc) 30%,var(--paper));stroke:var(--pc);stroke-width:1.6}
.sc-hw200-shear-adhesion-annex-b .s-adhp{fill:color-mix(in srgb,var(--pc) 22%,var(--adh))}
.sc-hw200-shear-adhesion-annex-b .s-inkf{fill:var(--ink-2)}
.anim .sc-hw200-shear-adhesion-annex-b.playing .s-push{animation-name:k-hw200-shear-adhesion-annex-b-push}
.sc-hw200-shear-adhesion-annex-b .s-gtrk{fill:var(--rule)}
.sc-hw200-shear-adhesion-annex-b .s-gbarh{fill:var(--pc);transform-box:fill-box;transform-origin:100% 50%}
.anim .sc-hw200-shear-adhesion-annex-b.playing .s-gbarh{animation-name:k-hw200-shear-adhesion-annex-b-gleft}
.sc-hw200-shear-adhesion-annex-b .s-brk{stroke:var(--neg);stroke-width:2.2;fill:none;stroke-linecap:round}
.sc-hw200-shear-adhesion-annex-b.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.anim .sc-hw200-shear-adhesion-annex-b.playing .s-st1 .disc{animation-name:k-hw200-shear-adhesion-annex-b-st1-disc}
.anim .sc-hw200-shear-adhesion-annex-b.playing .s-st2 .disc{animation-name:k-hw200-shear-adhesion-annex-b-st2-disc}
.anim .sc-hw200-shear-adhesion-annex-b.playing .s-st3 .disc{animation-name:k-hw200-shear-adhesion-annex-b-st3-disc}
@keyframes k-hw200-shear-adhesion-annex-b-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw200-shear-adhesion-annex-b-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw200-shear-adhesion-annex-b-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw200-shear-adhesion-annex-b-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw200-shear-adhesion-annex-b-push{0%,70%{transform:none}76%,97%{transform:translateX(-16px)}100%{transform:none}}
@keyframes k-hw200-shear-adhesion-annex-b-gleft{0%,5%{transform:scaleX(0)}70%,97%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes k-hw200-shear-adhesion-annex-b-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw200-shear-adhesion-annex-b-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw200-shear-adhesion-annex-b-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const SHEAR_B_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 200"><rect class="s-tl1" x="50" y="126" width="150" height="16" rx="1"></rect><rect class="s-adhp" x="66" y="120" width="134" height="6"></rect><g class="s-push"><rect class="s-tlp" x="66" y="104" width="150" height="16" rx="1"></rect></g><rect x="224" y="100" width="18" height="24" rx="2" class="s-inkf"></rect><path class="s-stk" d="M270 112 H248 M256 104 L248 112 L256 120" style="stroke:var(--pc);stroke-width:2.6"></path><rect x="30" y="142" width="16" height="30" class="s-inkf"></rect><text class="s-lbl" x="150" y="190" text-anchor="middle">3 mm adhesive between two tiles</text><rect class="s-gtrk" x="60" y="40" width="180" height="10" rx="3"></rect><rect class="s-gbarh" x="60" y="40" width="180" height="10" rx="3"></rect><text class="s-lbl" x="150" y="32" text-anchor="middle">load</text><g class="s-phC"><path class="s-brk" d="M70 121 l12 -2 l12 2 l12 -2 l12 2 l12 -2 l12 2 l12 -2 l12 2 l12 -2 l12 2"></path><text class="s-lblp" x="150" y="84" text-anchor="middle">breaks at … N/mm²</text></g></svg>`;
const SHEAR_B_STEPS = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Two 100 × 100 mm tiles bonded with a 3 mm layer</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>The top tile is pushed sideways in a jig</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Break load ÷ area = shear adhesion, N/mm²</span></li></ol>`;

const FROM_BAG_TO_BOND_STYLE = `.sc-hw204-from-bag-to-bond .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw204-from-bag-to-bond.playing .s-st1{animation-name:k-hw204-from-bag-to-bond-st1}
.anim .sc-hw204-from-bag-to-bond.playing .s-st2{animation-name:k-hw204-from-bag-to-bond-st2}
.anim .sc-hw204-from-bag-to-bond.playing .s-st3{animation-name:k-hw204-from-bag-to-bond-st3}
.sc-hw204-from-bag-to-bond .s-txb{fill:var(--cblk)}
.sc-hw204-from-bag-to-bond .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw204-from-bag-to-bond .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw204-from-bag-to-bond .s-stk{fill:none;stroke:var(--ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw204-from-bag-to-bond .s-pf{fill:var(--paper);stroke:var(--rule);stroke-width:1}
.sc-hw204-from-bag-to-bond .s-tlp{fill:color-mix(in srgb,var(--pc) 30%,var(--paper));stroke:var(--pc);stroke-width:1.6}
.sc-hw204-from-bag-to-bond .s-adh{fill:var(--adh)}
.sc-hw204-from-bag-to-bond .s-inkf{fill:var(--ink-2)}
.sc-hw204-from-bag-to-bond .s-wfill{fill:var(--water)}
.sc-hw204-from-bag-to-bond .s-powder{fill:var(--adh)}
.anim .sc-hw204-from-bag-to-bond.playing .s-powder{animation:k-hw204-from-bag-to-bond-powder .8s linear infinite;animation-delay:var(--pd)}
.anim .sc-hw204-from-bag-to-bond.playing .s-stir{animation:k-hw204-from-bag-to-bond-stir .7s ease-in-out infinite alternate}
.sc-hw204-from-bag-to-bond .s-trowel{opacity:0}
.anim .sc-hw204-from-bag-to-bond.playing .s-trowel{animation-name:k-hw204-from-bag-to-bond-trowel}
.sc-hw204-from-bag-to-bond .s-rdg{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(.5)}
.anim .sc-hw204-from-bag-to-bond.playing .s-rdg{animation-name:k-hw204-from-bag-to-bond-rdg}
.anim .sc-hw204-from-bag-to-bond.playing .s-tileP{animation-name:k-hw204-from-bag-to-bond-tileP}
.sc-hw204-from-bag-to-bond .s-cs-svg{max-width:520px;margin:0 auto}
.anim .sc-hw204-from-bag-to-bond.playing .s-st1 .disc{animation-name:k-hw204-from-bag-to-bond-st1-disc}
.anim .sc-hw204-from-bag-to-bond.playing .s-st2 .disc{animation-name:k-hw204-from-bag-to-bond-st2-disc}
.anim .sc-hw204-from-bag-to-bond.playing .s-st3 .disc{animation-name:k-hw204-from-bag-to-bond-st3-disc}
@keyframes k-hw204-from-bag-to-bond-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw204-from-bag-to-bond-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw204-from-bag-to-bond-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw204-from-bag-to-bond-powder{0%{opacity:0;transform:none}10%{opacity:1}80%{opacity:1;transform:translateY(40px)}81%,100%{opacity:0;transform:translateY(40px)}}
@keyframes k-hw204-from-bag-to-bond-stir{from{transform:translateX(-9px)}to{transform:translateX(9px)}}
@keyframes k-hw204-from-bag-to-bond-trowel{0%,66%{opacity:0;transform:none}69%{opacity:1}79%{opacity:1;transform:translateX(62px)}81%,100%{opacity:0;transform:translateX(62px)}}
@keyframes k-hw204-from-bag-to-bond-rdg{0%,68%{opacity:0;transform:scaleY(1)}72%{opacity:1;transform:scaleY(1)}86%{transform:scaleY(1)}90%,97%{opacity:1;transform:scaleY(.5)}100%{opacity:0}}
@keyframes k-hw204-from-bag-to-bond-tileP{0%,79%{opacity:0;transform:translateY(-34px)}81%{opacity:1;transform:translateY(-34px)}88%,97%{opacity:1;transform:none}100%{opacity:0}}
@keyframes k-hw204-from-bag-to-bond-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw204-from-bag-to-bond-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw204-from-bag-to-bond-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const FROM_BAG_TO_BOND_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 330 172"><g class="s-st1"><rect class="s-pf" x="3" y="3" width="104" height="140" rx="10"></rect><path class="s-wfill" opacity=".55" d="M22 110 L26 132 L78 132 L82 110 Z"></path><path class="s-stk" d="M18 92 L26 132 L78 132 L86 92"></path><g transform="rotate(-28 44 40)"><rect x="24" y="16" width="38" height="46" rx="5" style="fill:var(--ink)"></rect><rect x="24" y="44" width="38" height="8" style="fill:var(--pc)"></rect><text x="43" y="35" text-anchor="middle" style="fill:#fff;font:600 10.5px var(--font-display)">HW204</text></g><circle class="s-powder" cx="58" cy="62" r="2.4" style="--pd:0.00s"></circle><circle class="s-powder" cx="63" cy="62" r="2.4" style="--pd:0.20s"></circle><circle class="s-powder" cx="55" cy="62" r="2.4" style="--pd:0.40s"></circle><circle class="s-powder" cx="66" cy="62" r="2.4" style="--pd:0.60s"></circle><circle class="s-powder" cx="60" cy="62" r="2.4" style="--pd:0.30s"></circle><circle class="s-powder" cx="52" cy="62" r="2.4" style="--pd:0.55s"></circle><text class="s-lblb" x="55" y="160" text-anchor="middle">1 · Powder + water</text></g><g class="s-st2"><rect class="s-pf" x="113" y="3" width="104" height="140" rx="10"></rect><path class="s-adh" d="M131 104 L136 132 L188 132 L193 104 Z"></path><path class="s-stk" d="M128 92 L136 132 L188 132 L196 92"></path><g class="s-stir"><line x1="162" y1="30" x2="162" y2="118" style="stroke:var(--ink-2);stroke-width:3;stroke-linecap:round"></line><rect x="152" y="110" width="20" height="9" rx="2" class="s-inkf"></rect><rect x="155" y="22" width="14" height="10" rx="2" style="fill:var(--pc)"></rect></g><text class="s-lblb" x="165" y="160" text-anchor="middle">2 · Mix</text></g><g class="s-st3"><rect class="s-pf" x="223" y="3" width="104" height="140" rx="10"></rect><rect x="231" y="112" width="88" height="22" rx="2" fill="var(--conc)"></rect><rect class="s-rdg s-adh" x="234" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="247" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="260" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="273" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="286" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="299" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="312" y="100" width="8" height="12"></rect><path class="s-trowel" d="M226 64 H256 V92 L253 98 L250 92 L247 98 L244 92 L241 98 L238 92 L235 98 L232 92 L229 98 L226 92 Z M236 64 V52 H246 V64" style="fill:var(--ink-2)"></path><rect class="s-tileP s-tlp" x="234" y="92" width="82" height="9" rx="1.5"></rect><text class="s-lblb" x="275" y="160" text-anchor="middle">3 · Comb + press</text></g></svg>`;
const FROM_BAG_TO_BOND_STEPS = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Add the powder to clean water</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Mix to a smooth, lump-free paste; rest 3–5 min; remix</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Comb with a notched trowel, press the tile in</span></li></ol>`;

const DEFORM_F_STYLE = `.sc-hw204-deformability-annex-f .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw204-deformability-annex-f .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.anim .sc-hw204-deformability-annex-f.playing .s-st1{animation-name:k-hw204-deformability-annex-f-st1}
.anim .sc-hw204-deformability-annex-f.playing .s-st2{animation-name:k-hw204-deformability-annex-f-st2}
.anim .sc-hw204-deformability-annex-f.playing .s-st3{animation-name:k-hw204-deformability-annex-f-st3}
.sc-hw204-deformability-annex-f .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw204-deformability-annex-f .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw204-deformability-annex-f .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw204-deformability-annex-f .s-stk{fill:none;stroke:var(--ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw204-deformability-annex-f .s-inkf{fill:var(--ink-2)}
.sc-hw204-deformability-annex-f .s-strip{fill:none;stroke:var(--adh);stroke-width:7;stroke-linecap:round}
.sc-hw204-deformability-annex-f .s-strip.s-hw{stroke:color-mix(in srgb,var(--pc) 45%,var(--adh))}
.sc-hw204-deformability-annex-f .s-sd{opacity:0}
.sc-hw204-deformability-annex-f .s-sd.s-sv{opacity:1}
.anim .sc-hw204-deformability-annex-f.playing .s-sd0{animation-name:k-hw204-deformability-annex-f-sd0}
.anim .sc-hw204-deformability-annex-f.playing .s-sd1{animation-name:k-hw204-deformability-annex-f-sd1}
.anim .sc-hw204-deformability-annex-f.playing .s-sd2{animation-name:k-hw204-deformability-annex-f-sd2}
.anim .sc-hw204-deformability-annex-f.playing .s-sd3{animation-name:k-hw204-deformability-annex-f-sd3}
.anim .sc-hw204-deformability-annex-f.playing .s-sdx{animation-name:k-hw204-deformability-annex-f-sdx}
.sc-hw204-deformability-annex-f .s-anvil{fill:var(--ink-2);transform:translateY(14px)}
.anim .sc-hw204-deformability-annex-f.playing .s-anvil{animation-name:k-hw204-deformability-annex-f-anv;animation-timing-function:linear}
.sc-hw204-deformability-annex-f .s-ptr{fill:var(--ink);transform:translateX(150px)}
.anim .sc-hw204-deformability-annex-f.playing .s-ptr{animation-name:k-hw204-deformability-annex-f-ptr;animation-timing-function:linear}
.sc-hw204-deformability-annex-f .s-zS1{fill:color-mix(in srgb,var(--pc) 40%,var(--paper))}
.sc-hw204-deformability-annex-f .s-zS2{fill:var(--pc)}
.sc-hw204-deformability-annex-f .s-z0{fill:var(--rule)}
.sc-hw204-deformability-annex-f .s-brk{stroke:var(--neg);stroke-width:2.2;fill:none;stroke-linecap:round}
.sc-hw204-deformability-annex-f.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.anim .sc-hw204-deformability-annex-f.playing .s-st1 .disc{animation-name:k-hw204-deformability-annex-f-st1-disc}
.anim .sc-hw204-deformability-annex-f.playing .s-st2 .disc{animation-name:k-hw204-deformability-annex-f-st2-disc}
.anim .sc-hw204-deformability-annex-f.playing .s-st3 .disc{animation-name:k-hw204-deformability-annex-f-st3-disc}
@keyframes k-hw204-deformability-annex-f-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw204-deformability-annex-f-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw204-deformability-annex-f-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw204-deformability-annex-f-sd0{0%,18%{opacity:1}20%,100%{opacity:0}}
@keyframes k-hw204-deformability-annex-f-sd1{0%,18%{opacity:0}20%,38%{opacity:1}40%,100%{opacity:0}}
@keyframes k-hw204-deformability-annex-f-sd2{0%,38%{opacity:0}40%,58%{opacity:1}60%,100%{opacity:0}}
@keyframes k-hw204-deformability-annex-f-sd3{0%,58%{opacity:0}60%,78%{opacity:1}80%,100%{opacity:0}}
@keyframes k-hw204-deformability-annex-f-sdx{0%,78%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw204-deformability-annex-f-anv{0%{transform:none}20%{transform:translateY(7px)}40%{transform:translateY(14px)}60%{transform:translateY(21px)}80%,97%{transform:translateY(28px)}100%{transform:none}}
@keyframes k-hw204-deformability-annex-f-ptr{0%{transform:none}80%,97%{transform:translateX(223px)}100%{transform:none}}
@keyframes k-hw204-deformability-annex-f-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw204-deformability-annex-f-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw204-deformability-annex-f-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const DEFORM_F_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 320 216"><path class="s-anvil" d="M136 26 H184 V40 A24 24 0 0 1 136 40 Z"></path><path class="s-strip s-hw s-sd s-sd0" d="M40 92 L280 92"></path><path class="s-strip s-hw s-sd s-sd1" d="M40 92 Q160 104 280 92"></path><path class="s-strip s-hw s-sd s-sd2 s-sv" d="M40 92 Q160 116 280 92"></path><path class="s-strip s-hw s-sd s-sd3" d="M40 92 Q160 128 280 92"></path><g class="s-sd s-sdx"><path class="s-strip s-hw" d="M40 92 Q110 112 156 122"></path><path class="s-strip s-hw" d="M164 122 Q210 112 280 92"></path><path class="s-brk" d="M156 112 l4 8 l-3 5 l5 7"></path></g><circle cx="60" cy="101" r="7" class="s-inkf"></circle><circle cx="260" cy="101" r="7" class="s-inkf"></circle><rect x="56" y="101" width="8" height="42" class="s-inkf"></rect><rect x="256" y="101" width="8" height="42" class="s-inkf"></rect><path class="s-stk" d="M60 150 H260 M60 145 V155 M260 145 V155"></path><text class="s-lbl" x="160" y="146" text-anchor="middle">200 mm span · strip 3 mm thick</text><rect class="s-z0" x="30" y="172" width="93" height="12" rx="2"></rect><rect class="s-zS1" x="123" y="172" width="93" height="12"></rect><rect class="s-zS2" x="216" y="172" width="74" height="12" rx="2"></rect><text class="s-lbl" x="30" y="200">0</text><text class="s-lbl" x="123" y="200" text-anchor="middle">2.5 mm</text><text class="s-lbl" x="216" y="200" text-anchor="middle">5 mm</text><text class="s-lblb" x="170" y="212" text-anchor="middle">S1</text><text class="s-lblp" x="253" y="212" text-anchor="middle">S2</text><text class="s-lbl" x="76" y="212" text-anchor="middle">not deformable</text><path class="s-ptr" d="M30 170 l-6 -10 h12 z"></path></svg>`;
const DEFORM_F_STEPS = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>A 3 mm strip of cured adhesive rests on two supports</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>The centre is pressed down at 2 mm/min until it breaks</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Bend at break: 2.5 mm or more = S1; 5 mm or more = S2</span></li></ol>`;

module.exports = {
  productName: 'HW204 Tile Fix Max',
  productDescription: 'Fixing vitrified tiles and natural stones on drywalls',
  topicDescription: 'Why tile adhesive beats cement mortar, what IS 15477 Type 4 asks for, and how HW204 (and its S1/S2 variants) measure up: key tests, data against the standard, where it goes, lab proof and coverage.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image',
      title: 'Tile Fix Max',
      data: {
        text: 'Hard Worker HW204. Thin-bed, polymer-modified tile adhesive for large-format and slim tiles, including dry wall boards.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/tile-fix-hw204.png'],
        caption: 'HW204 — Thin bed. Full contact. No water curing.',
        key: 'Tile Fix Max · HW204',
      },
    },
    {
      type: 'svg',
      title: 'What Is a Tile Adhesive?',
      data: {
        text: 'A factory-made adhesive designed only for fixing tiles in a thin bed. Cement-based and polymer-modified. On site you add clean water. Nothing else. For thick natural stone and other heavy pieces that need a deeper bed, medium-bed and thick-bed adhesives are used.',
        svgMarkup: svgCard('sc-hw204-from-bag-to-bond', 'From bag to bond', '', FROM_BAG_TO_BOND_STYLE, FROM_BAG_TO_BOND_SVG, FROM_BAG_TO_BOND_STEPS),
        badges: [
          { icon: '🧱', label: 'Cement binder', sub: 'Sets hard, carries the load', tone: 'neutral' },
          { icon: '🪨', label: 'Graded fillers', sub: 'Controlled, factory-dosed', tone: 'neutral' },
          { icon: '🧪', label: 'Polymers', sub: 'Better grip, some flexibility', tone: 'neutral' },
          { icon: '💧', label: 'Just add water', sub: 'No sand, no site batching', tone: 'neutral' },
        ],
        explanation: 'Level First: if the floor or wall is more than 12 mm out over 3 m, correct it before tiling. Adhesive is not a levelling screed.',
      },
    },
    {
      type: 'svg',
      title: 'Why Cement Mortar Lets Tiles Down',
      data: {
        text: 'Tiles set on a thick bed of site-mixed cement and sand rely on the tile soaking up cement. Dense tiles and stone barely absorb anything.',
        svgMarkup: `<div class="svg-cards">${svgCard('sc-hw200-conventional-mortar-bed', 'Conventional mortar bed', 'bad', CONVENTIONAL_MORTAR_BED_STYLE, CONVENTIONAL_MORTAR_BED_SVG, CONVENTIONAL_MORTAR_BED_STEPS)}${svgCard('sc-hw200-tile-adhesive', 'Tile adhesive', 'ok', TILE_ADHESIVE_STYLE, TILE_ADHESIVE_SVG, TILE_ADHESIVE_STEPS)}</div>`,
        table: {
          headers: ['Hollow tiles', 'Full, even contact'],
          rows: [
            ['Weak grip — bond depends on how much the tile absorbs', 'Polymer bond, IS-tested'],
            ['Thick, heavy bed — more material, more dead load', 'Thin bed'],
            ['Needs curing — water and labour after fixing', 'No water curing'],
            ['Tiles slide on walls, no fixed working time — props, packing, rework', 'Slip ≤ 0.5 mm · Declared open time'],
          ],
        },
      },
    },
    {
      type: 'knowledge',
      title: 'Knowledge Check — Large-Format on Boards',
      data: {
        text: 'A 1200 × 600 mm slim vitrified tile is to be fixed on a plasterboard wall. Which adhesive?',
        list: ['HW204 Tile Fix Max, the Type 4T adhesive for large-format and slim tiles on boards', 'HW200 Tile Fix Basic', 'HW202 Tile Fix Medium', 'HW203 Tile Fix High'],
        correctIndex: 0,
        explanation: 'HW204 is the Type 4 adhesive rated for dry wall boards and, in its S1/S2 variants, for large-format and slim tiles.',
      },
    },
    {
      type: 'table',
      title: 'Mortar vs Tile Adhesive',
      data: {
        text: 'The same tile, two ways of fixing it.',
        table: {
          headers: ['Feature', 'Cement-sand mortar', 'HW204'],
          rows: [
            ['Bed thickness', 'Thick, uneven', 'Thin: up to 12 mm'],
            ['Bond', 'Depends on the tile soaking up cement', 'Polymer bond, tested for tensile and shear strength'],
            ['Wall tiles', 'Can slide while setting', 'Slip ≤ 0.5 mm'],
            ['Working time', 'Not defined', 'Open time and adjustment time declared'],
            ['Curing', 'Water curing needed', 'No external water curing'],
            ['Mix quality', 'Site-batched, varies', 'Factory-made, fixed recipe'],
            ['Standard', 'None for tile fixing', 'IS 15477:2019 Type 4'],
          ],
        },
        explanation: 'Contact Matters: IS 15477 designs for full contact — at least 85% under the tile in normal conditions and 95% where conditions are demanding.',
      },
    },
    {
      type: 'card',
      title: 'What a Type 4 Adhesive Is For',
      data: {
        text: 'IS 15477 sorts tile adhesives by the tile, the substrate and the place. This is the Type 4 brief.',
        tableRows: [
          { label: 'Tile porosity', value: 'All porosities' },
          { label: 'Tiles', value: 'All tiles and stones of Types 1–3, except metal tiles and engineered stone' },
          { label: 'Substrates', value: 'Dry wall boards: gypsum board, plywood, wood, calcium silicate, MDF, fibre cement board, cement board, bison panel' },
          { label: 'Where', value: 'Walls and floors on board substrates, plus cement substrates' },
        ],
        badge: 'Tiles or stones larger than 600 × 600 mm need S1. Larger than 1200 × 1200 mm need S2.',
      },
    },
    {
      type: 'card',
      title: 'What Type 4 Must Achieve',
      data: {
        text: 'Minimum requirements a Type 4 adhesive has to pass. Tensile dry and wet; shear dry, wet and heat-aged.<p><strong>Check the Bag: IS 15477 says it must show</strong></p><div class="item-grid"><div class="item-card">Type 4<span class="item-card-check">✓</span></div><div class="item-card">“T” for slip resistance<span class="item-card-check">✓</span></div><div class="item-card">S1 or S2<span class="item-card-check">✓</span></div><div class="item-card">Open and adjustment time<span class="item-card-check">✓</span></div><div class="item-card">Batch number<span class="item-card-check">✓</span></div><div class="item-card">Month and year of manufacture<span class="item-card-check">✓</span></div><div class="item-card">Shelf life and storage<span class="item-card-check">✓</span></div><div class="item-card">Mixing instructions<span class="item-card-check">✓</span></div></div>',
        stats: [
          { value: '≥ 1.5', label: 'Tensile, dry', sub: 'N/mm²' },
          { value: '≥ 1.0', label: 'Tensile, wet', sub: 'N/mm²' },
          { value: '≥ 1.5', label: 'Shear, dry', sub: 'N/mm²' },
          { value: '≥ 1.0', label: 'Shear, wet', sub: 'N/mm²' },
          { value: '≥ 1.0', label: 'Shear, heat-aged', sub: 'N/mm²' },
          { value: 'Declared', label: 'Open time', sub: 'not less than the maker states' },
          { value: 'Declared', label: 'Adjustment time', sub: 'not less than the maker states' },
          { value: '≤ 0.5 mm', label: 'Slip, vertical', sub: 'designated “T”' },
          { value: '2.5 to 5 mm', label: 'Deformability S1', sub: 'tiles over 600 × 600 mm' },
          { value: '≥ 5 mm', label: 'Deformability S2', sub: 'tiles over 1200 × 1200 mm' },
        ],
      },
    },
    {
      type: 'card',
      title: 'HW204 · Tile Fix Max',
      data: {
        text: 'Polymer-modified adhesive for vitrified tiles, marble and natural stone, including dry wall boards. S1 and S2 variants for large-format and slim tiles.',
        badges: [
          { icon: '📜', label: 'IS 15477:2019 Type 4T, in S1 and S2 variants', tone: 'neutral' },
          { icon: '🌿', label: 'Greenpro', tone: 'neutral' },
          { icon: '🧴', label: 'Grey powder', tone: 'neutral' },
        ],
        tableRows: [
          { label: 'IS class', value: 'Type 4T · S1 · S2' },
          { label: 'Open time', value: '35 min' },
          { label: 'Adjustment time', value: '45 min' },
          { label: 'Bed thickness', value: 'Up to 12 mm' },
          { label: 'Pot life', value: '3 hours' },
          { label: 'Packs', value: '20 kg & 40 kg' },
        ],
      },
    },
    {
      type: 'svg',
      title: 'Open Time and Adjustment Time',
      data: {
        text: 'Open time: how long combed adhesive can still take a tile. Adjustment time: how long a placed tile can still be moved without losing bond.',
        svgMarkup: `<div class="svg-cards">${svgCard('sc-hw200-open-time-annex-c', 'Open time · Annex C', '', OPEN_TIME_C_STYLE, OPEN_TIME_C_SVG, OPEN_TIME_C_STEPS)}${svgCard('sc-hw200-adjustment-time-annex-d', 'Adjustment time · Annex D', '', ADJUST_TIME_D_STYLE, ADJUST_TIME_D_SVG, ADJUST_TIME_D_STEPS)}</div>`,
        badge: 'HW204 declares: open time 35 min · adjustment time 45 min',
      },
    },
    {
      type: 'svg',
      title: 'Slip and Deformability',
      data: {
        text: 'Slip: does a wall tile slide down before the adhesive sets? Deformability: how far the hardened adhesive can bend without breaking. It lets big and slim tiles, boards and exteriors move without cracking or debonding.',
        svgMarkup: `<div class="svg-cards">${svgCard('sc-hw200-slip-annex-e', 'Slip · Annex E', '', SLIP_E_STYLE, SLIP_E_SVG, SLIP_E_STEPS)}${svgCard('sc-hw204-deformability-annex-f', 'Deformability · Annex F', '', DEFORM_F_STYLE, DEFORM_F_SVG, DEFORM_F_STEPS)}</div>`,
        badge: 'HW204 declares: slip ≤ 0.5 mm · S1 2.59 mm · S2 5.80 mm',
      },
    },
    {
      type: 'svg',
      title: 'Tensile and Shear Adhesion',
      data: {
        text: 'Tensile: force to pull the tile straight off. Shear: force to slide it sideways. Both are tested dry and wet; shear also after heat ageing.',
        svgMarkup: `<div class="svg-cards">${svgCard('sc-hw200-tensile-adhesion-annex-a', 'Tensile adhesion · Annex A', '', TENSILE_A_STYLE, TENSILE_A_SVG, TENSILE_A_STEPS)}${svgCard('sc-hw200-shear-adhesion-annex-b', 'Shear adhesion · Annex B', '', SHEAR_B_STYLE, SHEAR_B_SVG, SHEAR_B_STEPS)}</div>`,
        tableRows: [
          { label: 'Dry', value: '28 days in the lab' },
          { label: 'Wet', value: '7 days in the lab, then soaked in water (21 days in all for tensile, 28 for shear)' },
          { label: 'Heat-aged', value: '14 days in the lab, then 14 days at 70 °C (shear)' },
        ],
        badge: 'HW204 declares: tensile, dry ≥ 1.7 · tensile, wet ≥ 1.35 · shear, dry ≥ 1.7 · shear, wet ≥ 1.5 · shear, heat-aged ≥ 1.2 N/mm²',
      },
    },
    {
      type: 'table',
      title: 'Meets Every Type 4 Requirement',
      data: {
        text: 'Each IS 15477 Type 4 requirement, what the HW204 data sheet declares, and by how much it clears the line. Result % = how far above the IS minimum.',
        table: {
          headers: ['Feature', 'Parameter', 'IS Type 4', 'HW204', 'Result'],
          rows: [
            ['Tensile, dry', '≥ 1.5', '≥ 1.5', '≥ 1.7', '+13%'],
            ['Tensile, wet', '≥ 1.0', '≥ 1.0', '≥ 1.35', '+35%'],
            ['Shear, dry', '≥ 1.5', '≥ 1.5', '≥ 1.7', '+13%'],
            ['Shear, wet', '≥ 1.0', '≥ 1.0', '≥ 1.5', '+50%'],
            ['Shear, heat-aged', '≥ 1.0', '≥ 1.0', '≥ 1.2', '+20%'],
            ['Open time', '≥ declared', '≥ declared', '35 min', 'Declared'],
            ['Adjustment time', '≥ declared', '≥ declared', '45 min', 'Declared'],
            ['Slip, vertical', '≤ 0.5 mm', '≤ 0.5 mm', '≤ 0.5 mm', 'Within'],
            ['Deformability S1', '2.5 to 5 mm', '2.5 to 5 mm', '2.59 mm', 'S1'],
            ['Deformability S2', '≥ 5 mm', '≥ 5 mm', '5.80 mm', 'S2'],
          ],
        },
        badge: 'Bond Strength: How Far Above the Line. Grey: IS minimum · Colour: HW204 TDS.',
        gauges: [
          { label: 'Tensile, dry', sub: 'N/mm² · +13% over IS', valuePct: 100, rangeStartPct: 0, rangeEndPct: 88, result: '≥ 1.7', ok: true },
          { label: 'Tensile, wet', sub: 'N/mm² · +35% over IS', valuePct: 100, rangeStartPct: 0, rangeEndPct: 74, result: '≥ 1.35', ok: true },
          { label: 'Shear, dry', sub: 'N/mm² · +13% over IS', valuePct: 100, rangeStartPct: 0, rangeEndPct: 88, result: '≥ 1.7', ok: true },
          { label: 'Shear, wet', sub: 'N/mm² · +50% over IS', valuePct: 100, rangeStartPct: 0, rangeEndPct: 67, result: '≥ 1.5', ok: true },
          { label: 'Shear, heat-aged', sub: 'N/mm² · +20% over IS', valuePct: 100, rangeStartPct: 0, rangeEndPct: 83, result: '≥ 1.2', ok: true },
        ],
      },
    },
    {
      type: 'text',
      title: 'Where HW204 Goes',
      data: {
        text: 'Polymer-modified adhesive for vitrified tiles, marble and natural stone, including dry wall boards. S1 and S2 variants for large-format and slim tiles.<p><strong>Tiles</strong></p><div class="item-grid"><div class="item-card">Ceramic tiles<span class="item-card-check">✓</span></div><div class="item-card">Vitrified tiles<span class="item-card-check">✓</span></div><div class="item-card">Glass mosaic<span class="item-card-check">✓</span></div><div class="item-card">Natural stone, marble<span class="item-card-check">✓</span></div><div class="item-card">Large-format tiles<span class="item-card-check">✓</span></div><div class="item-card">Slim tiles<span class="item-card-check">✓</span></div></div><p><strong>Areas</strong></p><div class="item-grid"><div class="item-card">Interior floors<span class="item-card-check">✓</span></div><div class="item-card">Interior walls<span class="item-card-check">✓</span></div><div class="item-card">Exterior floors<span class="item-card-check">✓</span></div><div class="item-card">Exterior walls, facades<span class="item-card-check">✓</span></div><div class="item-card">Tile on tile<span class="item-card-check">✓</span></div><div class="item-card">Dry wall boards<span class="item-card-check">✓</span></div></div><p><strong>Substrates</strong></p><div class="item-grid"><div class="item-card">Cement plaster<span class="item-card-check">✓</span></div><div class="item-card">Screeds<span class="item-card-check">✓</span></div><div class="item-card">Precast concrete<span class="item-card-check">✓</span></div><div class="item-card">Concrete walls<span class="item-card-check">✓</span></div><div class="item-card">Brick masonry<span class="item-card-check">✓</span></div><div class="item-card">VDF floors<span class="item-card-check">✓</span></div><div class="item-card">Waterproofed surfaces<span class="item-card-check">✓</span></div><div class="item-card">Tile on tile<span class="item-card-check">✓</span></div><div class="item-card">Fibre cement board<span class="item-card-check">✓</span></div><div class="item-card">Gypsum board<span class="item-card-check">✓</span></div><div class="item-card">Cement backer board<span class="item-card-check">✓</span></div><div class="item-card">Bison panel<span class="item-card-check">✓</span></div></div>',
        badges: [
          { icon: '🔲', label: 'HW204', sub: 'Tiles up to 600 × 600 mm', tone: 'neutral' },
          { icon: '🧩', label: 'HW204 S1', sub: 'Over 600 × 600 mm, slim tiles, limited movement', tone: 'neutral' },
          { icon: '🏢', label: 'HW204 S2', sub: 'Over 1200 × 1200 mm, membranes, heated screeds, decks', tone: 'neutral' },
        ],
        explanation: 'Not for metal, glass or wood substrates — use HW205. Back-Butter: coat the rear of the tile for proper bonding, as the HW204 TDS instructs, with the notch at right angles to the tile’s long side.',
      },
    },
    {
      type: 'card',
      title: 'Tested by an Independent Lab',
      data: {
        text: 'Tested to IS 15477:2019 methods on a sample sent by Ramco.',
        badge: 'Meets Every Type 4T Bond-Strength Limit Tested',
        explanation: 'Tensile dry and wet; shear dry, wet and heat-aged; slip nil.',
        gauges: [
          { label: 'Tensile, dry', sub: 'N/mm² · 1.01× the IS minimum', valuePct: 100, rangeStartPct: 0, rangeEndPct: 99, result: '1.52', ok: true },
          { label: 'Tensile, wet', sub: 'N/mm² · 1.3× the IS minimum', valuePct: 100, rangeStartPct: 0, rangeEndPct: 77, result: '1.3', ok: true },
          { label: 'Shear, dry', sub: 'N/mm² · 1.03× the IS minimum', valuePct: 100, rangeStartPct: 0, rangeEndPct: 97, result: '1.55', ok: true },
          { label: 'Shear, wet', sub: 'N/mm² · 1.1× the IS minimum', valuePct: 100, rangeStartPct: 0, rangeEndPct: 91, result: '1.1', ok: true },
          { label: 'Shear, heat-aged', sub: 'N/mm² · 1.2× the IS minimum', valuePct: 100, rangeStartPct: 0, rangeEndPct: 82, result: '1.22', ok: true },
        ],
        stats: [
          { value: '35 min', label: 'Open time, measured' },
          { value: '45 min', label: 'Adjustment time, measured' },
          { value: 'Nil', label: 'Slip on a vertical surface', sub: 'IS “T” limit ≤ 0.5 mm' },
        ],
        table: {
          headers: ['Feature', 'HW204 S1', 'HW204 S2', 'IS 15477'],
          rows: [
            ['Deformability', '3.9 mm', '5.88 mm', 'S1 ≥ 2.5, 5.0 · S2 ≥ 5.0'],
            ['Slip', '0.22 mm', '0.21 mm', '≤ 0.5 mm'],
            ['Open time', '40 min', '40 min', '≥ declared'],
            ['Adjustment time', '50 min', '50 min', '≥ declared'],
            ['Tensile, dry / wet', '1.702 / 1.408', '1.714 / 1.41', '≥ 1.5 / 1.0'],
            ['Shear, dry / wet / heat', '1.822 / 1.422 / 1.442', '1.828 / 1.426 / 1.428', '≥ 1.5 / 1.0 / 1.0'],
          ],
        },
      },
    },
    {
      type: 'card',
      title: '60–80 sq ft per 20 kg Bag',
      data: {
        text: '60–80 sq ft per 20 kg bag at 3 mm bed, as declared in the TDS. Each square below is 1 sq ft.',
        calc: {
          mode: 'range',
          unitLabel: 'Area',
          defaultQty: 500,
          min: 1,
          max: 1000000,
          units: [
            { label: 'sq ft', factor: 1 },
            { label: 'm²', factor: 10.7639 },
          ],
          packOptions: [
            { label: '20 kg', minCoveragePerUnit: 60, maxCoveragePerUnit: 80 },
            { label: '40 kg', minCoveragePerUnit: 120, maxCoveragePerUnit: 160 },
          ],
          resultLabel: 'bags of {pack} for {qty} {unit}',
          note: 'Estimate at a 3 mm bed from the TDS coverage. A bigger notch, thicker bed, back-buttering, large tiles or an uneven surface use more.',
        },
        tableRows: [
          { label: 'Mixing', value: '4.4–6.2 L per 20 kg (22–31%)' },
          { label: 'Grout after 24 hours', value: 'HW210 cement grout or HW211 epoxy grout' },
          { label: 'Traffic', value: '24 hours' },
          { label: 'Shelf life', value: '12 months' },
        ],
      },
    },
    {
      type: 'knowledge',
      title: 'Scenario: On Site',
      data: {
        text: 'On site: The Moving Facade. A high-rise facade will carry large vitrified tiles that heat up in the afternoon sun and cool at night. The consultant asks which HW204 variant to specify. Which variant fits and why?',
        list: ['HW204 S2, the more deformable class, to follow the thermal movement', 'HW204 S1, because S1 is always stronger', 'HW200, because facades only need a basic adhesive', 'Cement-sand mortar'],
        correctIndex: 0,
        explanation: 'S2 is the more deformable class (≥5 mm bend at break), giving large-format facade tiles more room to move with thermal expansion and contraction without debonding.',
      },
    },
    {
      type: 'card',
      title: 'Cheat Sheet',
      data: {
        text: 'HW204 at a glance. Check it before a visit.',
        sections: [
          { label: 'What it is', text: 'Polymer-modified adhesive for vitrified tiles, marble and natural stone, including dry wall boards. S1 and S2 variants for large-format and slim tiles.' },
          { label: 'IS class', text: 'IS 15477:2019 Type 4T, in S1 and S2 variants' },
          { label: 'Tiles', text: 'Ceramic tiles, vitrified tiles, glass mosaic, natural stone, marble, large-format tiles, slim tiles' },
          { label: 'Areas', text: 'Interior floors, interior walls, exterior floors, exterior walls, facades, tile on tile, dry wall boards' },
          { label: 'Substrates', text: 'Cement plaster, screeds, precast concrete, concrete walls, brick masonry, VDF floors, waterproofed surfaces, tile on tile, fibre cement board, gypsum board, cement backer board, bison panel' },
          { label: 'Not for', text: 'Not for metal, glass or wood substrates. Use HW205.' },
          { label: 'Key data', text: '≥ 1.7 tensile, dry (IS 1.5); ≥ 1.35 tensile, wet (IS 1.0); ≥ 1.7 shear, dry (IS 1.5); ≥ 1.5 shear, wet (IS 1.0); ≥ 1.2 shear, heat-aged (IS 1.0); 35 min open · 45 min adjustment; slip ≤ 0.5 mm · deformability S1 2.59, S2 5.80 mm.' },
          { label: 'Lab proof', text: 'Tensile, dry 1.52; tensile, wet 1.30; shear, dry 1.55; shear, wet 1.10; shear, heat-aged 1.22 N/mm²; open 35 min, adjustment 45 min, slip nil.' },
          { label: 'Coverage', text: '60–80 sq ft per 20 kg bag at 3 mm bed' },
          { label: 'Mix', text: '4.4–6.2 L per 20 kg (22–31%). Pot life 3 hours.' },
          { label: 'Packs', text: '20 kg & 40 kg. Shelf life 12 months.' },
        ],
      },
    },
  ],
};
