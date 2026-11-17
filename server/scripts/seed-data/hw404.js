const { svgCard, svgCards, singleSvg } = require('../lib/svgCard');

// --- Step 2: "Styrene + Butadiene = SBR" — single diagram, own caption ---
const SBR_STYLE = `.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-st1{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-st1}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-st2{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-st2}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-st3{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-st3}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-late{opacity:1}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-goodtx{fill:var(--pc);font-weight:600}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-late{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-lateIn}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-cs-svg{max-width:520px;margin:0 auto}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-capA{opacity:0}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-capB{opacity:0}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-capA{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-phA}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-capB{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-phB}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-capC{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-phC}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-dim{fill:none;stroke:var(--ink-2);stroke-width:1.2}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-grA{opacity:0}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-grB{opacity:0}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-grA{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-phA}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-grB{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-phB}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-grC{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-phC}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-hexs{fill:color-mix(in srgb,var(--sbr) 14%,var(--paper));stroke:var(--ink);stroke-width:2}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-bond{fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-bond2{fill:none;stroke:var(--ink-2);stroke-width:1.4;stroke-linecap:round}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-rub{fill:none;stroke:var(--neg);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-chainp{fill:none;stroke:var(--sbr);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-chainh{fill:var(--paper);stroke:var(--sbr);stroke-width:2}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-pool{fill:color-mix(in srgb,var(--water) 16%,var(--paper));stroke:color-mix(in srgb,var(--water) 45%,var(--paper));stroke-width:1.4}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-lx{fill:var(--lat);stroke:var(--sbr);stroke-width:1.6}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-lxs{fill:var(--lat);stroke:var(--sbr);stroke-width:1.2}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-grn{fill:var(--grain);stroke:color-mix(in srgb,var(--grain) 70%,var(--ink));stroke-width:1}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-filmd{fill:none;stroke:var(--sbr);stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round;opacity:.9;stroke-dasharray:900;stroke-dashoffset:0}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-filmd{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-filmD}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-lx{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-lx{animation:k-hw404-from-two-molecules-to-a-film-inside-ceme-jig 1.6s ease-in-out infinite alternate;animation-delay:var(--jd,0s)}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-lxf{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-lxF}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-pop{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-popI;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-pop{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-pop2{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-popJ;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-pop2{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-pop3{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-popK;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-pop3{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-st1 .disc{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-st1-disc}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-st2 .disc{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-st2-disc}
.anim .sc-hw404-from-two-molecules-to-a-film-inside-ceme.playing .s-st3 .disc{animation-name:k-hw404-from-two-molecules-to-a-film-inside-ceme-st3-disc}
.sc-hw404-from-two-molecules-to-a-film-inside-ceme{--sbr:var(--ink-2);--pc:var(--ink)}.sc-hw404-from-two-molecules-to-a-film-inside-ceme.scn svg text{--sbr:var(--ink);--pc:var(--ink);--gold:var(--ink)}.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-lbl{font-size:10px}.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-lblb,.sc-hw404-from-two-molecules-to-a-film-inside-ceme .s-lblp{font-size:11px}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-phA{0%,31%{opacity:1}34%,100%{opacity:0}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-phB{0%,32%{opacity:0}35%,64%{opacity:1}67%,100%{opacity:0}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-filmD{0%,70%{stroke-dashoffset:900}88%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:900}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-jig{from{transform:translate(-2px,1px)}to{transform:translate(2px,-2px)}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-lxF{0%,66%{opacity:1}80%,100%{opacity:0}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-popI{0%,4%{opacity:0;transform:scale(.3)}10%,97%{opacity:1;transform:none}100%{opacity:0}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-popJ{0%,8%{opacity:0;transform:scale(.3)}13%,97%{opacity:1;transform:none}100%{opacity:0}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-popK{0%,15%{opacity:0;transform:scale(.3)}20%,97%{opacity:1;transform:none}100%{opacity:0}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw404-from-two-molecules-to-a-film-inside-ceme-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const SBR_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 340 214">
<g class="s-grA">
<g class="s-pop"><polygon class="s-hexs" points="62,76 83,88 83,112 62,124 41,112 41,88"></polygon><circle class="s-bond2" cx="62" cy="100" r="11"></circle><path class="s-bond" d="M62 76V62l12-8"></path><path class="s-bond2" d="M65 60l10-6"></path>
<text class="s-lblb" x="62" y="146" text-anchor="middle">Styrene</text><text class="s-lbl" x="62" y="160" text-anchor="middle">hard: strength</text></g>
<text class="s-lblb" x="112" y="106" text-anchor="middle" style="font-size:22px">+</text>
<g class="s-pop2"><path class="s-rub" d="M138 108l16-16 16 16 16-16"></path><path class="s-bond2" d="M142 112l14-14M174 112l14-14"></path>
<text class="s-lblb" x="162" y="146" text-anchor="middle">Butadiene</text><text class="s-lbl" x="162" y="160" text-anchor="middle">rubbery: flexibility</text></g>
<path class="s-dim" d="M204 100h20m-6-5l6 5-6 5"></path>
<g class="s-pop3"><path class="s-chainp" d="M234 104q8-14 16 0t16 0 16 0 16 0 16 0"></path><polygon class="s-chainh" points="242,86 248,89.5 248,96.5 242,100 236,96.5 236,89.5"></polygon><polygon class="s-chainh" points="274,86 280,89.5 280,96.5 274,100 268,96.5 268,89.5"></polygon><polygon class="s-chainh" points="306,86 312,89.5 312,96.5 306,100 300,96.5 300,89.5"></polygon>
<text class="s-lblp" x="274" y="146" text-anchor="middle">SBR chain</text><text class="s-lbl" x="274" y="160" text-anchor="middle">tough and rubbery</text></g>
</g>
<g class="s-grB">
<rect class="s-pool" x="40" y="46" width="260" height="130" rx="18"></rect>
<circle class="s-lx" cx="70" cy="80" r="8" style="--jd:.1s"></circle><circle class="s-lx" cx="104" cy="66" r="7" style="--jd:.5s"></circle><circle class="s-lx" cx="132" cy="96" r="8" style="--jd:.3s"></circle><circle class="s-lx" cx="92" cy="122" r="7" style="--jd:.8s"></circle><circle class="s-lx" cx="64" cy="150" r="8" style="--jd:.2s"></circle><circle class="s-lx" cx="120" cy="150" r="7" style="--jd:.6s"></circle><circle class="s-lx" cx="166" cy="70" r="8" style="--jd:.4s"></circle><circle class="s-lx" cx="176" cy="124" r="7" style="--jd:.9s"></circle><circle class="s-lx" cx="160" cy="158" r="8" style="--jd:.15s"></circle><circle class="s-lx" cx="206" cy="92" r="7" style="--jd:.7s"></circle><circle class="s-lx" cx="220" cy="140" r="8" style="--jd:.35s"></circle><circle class="s-lx" cx="244" cy="66" r="7" style="--jd:.55s"></circle><circle class="s-lx" cx="256" cy="112" r="8" style="--jd:.25s"></circle><circle class="s-lx" cx="270" cy="156" r="7" style="--jd:.85s"></circle>
<text class="s-lbl" x="170" y="196" text-anchor="middle">Latex: tiny polymer particles floating in water</text>
</g>
<g class="s-grC">
<polygon class="s-grn" points="52,70 78,62 90,82 70,96 50,88"></polygon><polygon class="s-grn" points="112,58 140,60 146,84 120,92 106,76"></polygon><polygon class="s-grn" points="178,64 204,58 214,80 196,96 174,86"></polygon><polygon class="s-grn" points="240,62 270,66 276,90 250,98 236,82"></polygon>
<polygon class="s-grn" points="60,120 88,112 100,134 80,152 56,144"></polygon><polygon class="s-grn" points="128,114 156,110 166,134 146,150 124,140"></polygon><polygon class="s-grn" points="190,116 220,112 228,138 204,152 186,138"></polygon><polygon class="s-grn" points="248,118 280,120 284,146 258,154 244,138"></polygon>
<g class="s-lxf"><circle class="s-lxs" cx="98" cy="100" r="4"></circle><circle class="s-lxs" cx="160" cy="98" r="4"></circle><circle class="s-lxs" cx="228" cy="100" r="4"></circle><circle class="s-lxs" cx="112" cy="140" r="4"></circle><circle class="s-lxs" cx="176" cy="142" r="4"></circle><circle class="s-lxs" cx="236" cy="146" r="4"></circle><circle class="s-lxs" cx="96" cy="64" r="4"></circle><circle class="s-lxs" cx="224" cy="62" r="4"></circle></g>
<path class="s-filmd" d="M40 104 C70 108 90 100 104 102 S150 104 170 100 S214 106 232 102 S280 106 300 104 M100 60 C100 80 96 96 104 102 C110 118 106 130 112 142 M166 58 C170 76 164 92 170 100 C176 116 170 130 176 146 M230 56 C232 76 226 92 232 102 C240 118 232 134 238 150"></path>
<text class="s-lbl" x="170" y="178" text-anchor="middle">Cement grains, bridged by the SBR film</text>
<text class="s-lbl s-goodtx s-late" x="170" y="196" text-anchor="middle">A rubbery glue running through the mortar</text>
</g>
<text class="s-lblb s-capA" x="170" y="24" text-anchor="middle">1 · Styrene (hard) + Butadiene (rubbery)</text>
<text class="s-lblb s-capB" x="170" y="24" text-anchor="middle">2 · Made as tiny particles in water: latex</text>
<text class="s-lblb s-capC" x="170" y="24" text-anchor="middle">3 · In cement, the particles fuse into a film</text>
</svg>`;

const SBR_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Styrene brings hardness and strength. Butadiene brings rubber-like flexibility. Together they make one tough, rubbery chain</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>The polymer is made as very fine particles floating in water. That is the milky liquid in the can</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Mixed with cement, the water is used up. The particles join into a thin film that runs through the mortar and grips the surface</span></li></ol>`;

const SBR_CARD = svgCard({ title: 'From two molecules to a film inside cement', style: SBR_STYLE, svg: SBR_SVG, ol: SBR_OL });

// --- Step 3: "Why New Work Falls Off Old Concrete" — 2-card svg-cards ---
const PLAIN_STYLE = `.sc-hw404-plain-cement-on-old-concrete .s-lift{display:grid;gap:10px}
.sc-hw404-plain-cement-on-old-concrete .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw404-plain-cement-on-old-concrete .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw404-plain-cement-on-old-concrete .s-badtx{fill:var(--neg);font-weight:600}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-st1{animation-name:k-hw404-plain-cement-on-old-concrete-st1}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-st2{animation-name:k-hw404-plain-cement-on-old-concrete-st2}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-st3{animation-name:k-hw404-plain-cement-on-old-concrete-st3}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-badtx{animation-name:k-hw404-plain-cement-on-old-concrete-redge}
.sc-hw404-plain-cement-on-old-concrete .s-txb{fill:var(--cblk)}
.sc-hw404-plain-cement-on-old-concrete .s-late{opacity:1}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-late{animation-name:k-hw404-plain-cement-on-old-concrete-lateIn}
.sc-hw404-plain-cement-on-old-concrete .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw404-plain-cement-on-old-concrete .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw404-plain-cement-on-old-concrete.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.sc-hw404-plain-cement-on-old-concrete .s-capA{opacity:0}
.sc-hw404-plain-cement-on-old-concrete .s-capB{opacity:0}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-capA{animation-name:k-hw404-plain-cement-on-old-concrete-phA}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-capB{animation-name:k-hw404-plain-cement-on-old-concrete-phB}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-capC{animation-name:k-hw404-plain-cement-on-old-concrete-phC}
.sc-hw404-plain-cement-on-old-concrete .s-oldc{fill:var(--cblk)}
.sc-hw404-plain-cement-on-old-concrete .s-newc{fill:var(--cmor)}
.sc-hw404-plain-cement-on-old-concrete .s-icrk{fill:none;stroke:var(--neg);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:300;stroke-dashoffset:0}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-icrk{animation-name:k-hw404-plain-cement-on-old-concrete-icrk}
.sc-hw404-plain-cement-on-old-concrete .s-lift{transform:translateY(-5px)}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-lift{animation-name:k-hw404-plain-cement-on-old-concrete-liftT}
.sc-hw404-plain-cement-on-old-concrete .s-shr{transform-box:fill-box;transform-origin:50% 100%;transform:scaleX(.96)}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-shr{animation-name:k-hw404-plain-cement-on-old-concrete-shrT}
.sc-hw404-plain-cement-on-old-concrete .s-dnar{fill:none;stroke:var(--water);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-dnar{animation-name:k-hw404-plain-cement-on-old-concrete-dnA}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-newdrop0{animation-name:k-hw404-plain-cement-on-old-concrete-newD0}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-st1 .disc{animation-name:k-hw404-plain-cement-on-old-concrete-st1-disc}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-st2 .disc{animation-name:k-hw404-plain-cement-on-old-concrete-st2-disc}
.anim .sc-hw404-plain-cement-on-old-concrete.playing .s-st3 .disc{animation-name:k-hw404-plain-cement-on-old-concrete-st3-disc}
@keyframes k-hw404-plain-cement-on-old-concrete-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw404-plain-cement-on-old-concrete-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw404-plain-cement-on-old-concrete-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw404-plain-cement-on-old-concrete-redge{0%,72%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw404-plain-cement-on-old-concrete-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw404-plain-cement-on-old-concrete-phA{0%,31%{opacity:1}34%,100%{opacity:0}}
@keyframes k-hw404-plain-cement-on-old-concrete-phB{0%,32%{opacity:0}35%,64%{opacity:1}67%,100%{opacity:0}}
@keyframes k-hw404-plain-cement-on-old-concrete-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw404-plain-cement-on-old-concrete-icrk{0%,66%{stroke-dashoffset:300}82%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:300}}
@keyframes k-hw404-plain-cement-on-old-concrete-liftT{0%,66%{transform:none}82%,97%{transform:translateY(-5px)}100%{transform:none}}
@keyframes k-hw404-plain-cement-on-old-concrete-shrT{0%,33%{transform:none}60%,97%{transform:scaleX(.96)}100%{transform:none}}
@keyframes k-hw404-plain-cement-on-old-concrete-dnA{0%,33%{opacity:0;transform:translateY(-6px)}40%,60%{opacity:1;transform:none}66%,100%{opacity:0;transform:translateY(8px)}}
@keyframes k-hw404-plain-cement-on-old-concrete-newD0{0%{opacity:0;transform:translateY(-24px)}10%,97%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-24px)}}
@keyframes k-hw404-plain-cement-on-old-concrete-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw404-plain-cement-on-old-concrete-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw404-plain-cement-on-old-concrete-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const PLAIN_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 212">
<rect x="20" y="120" width="260" height="70" rx="2" fill="var(--conc)"></rect><rect x="20" y="120" width="260" height="70" rx="2" class="s-oldc" opacity=".35"></rect>
<g class="s-lift"><g class="s-newdrop0"><rect class="s-newc s-shr" x="20" y="82" width="260" height="38" rx="2"></rect></g></g>
<g class="s-dnar"><path d="M70 104v24m-5-5l5 5 5-5"></path><path d="M150 104v24m-5-5l5 5 5-5"></path><path d="M230 104v24m-5-5l5 5 5-5"></path></g>
<path class="s-icrk" d="M22 119 l20 -2 18 2 22-2 20 2 18-2 22 2 20-2 18 2 22-2 20 2 18-2 20 2 16-1"></path>
<text class="s-lbl" x="26" y="104">New mortar</text>
<text class="s-lbl" x="26" y="184">Old concrete</text>
<text class="s-lblb s-capA" x="150" y="24" text-anchor="middle">1 · New layer laid on old concrete</text>
<text class="s-lblb s-capB" x="150" y="24" text-anchor="middle">2 · Old surface pulls its water; it shrinks</text>
<text class="s-lblb s-capC" x="150" y="24" text-anchor="middle">3 · Gap opens at the joint</text>
<text class="s-lbl s-badtx s-late" x="150" y="206" text-anchor="middle">Sounds hollow, cracks, peels off.</text>
</svg>`;

const PLAIN_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>New mortar placed straight on the old, hard surface</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>The dry old surface drinks water from the new layer. The new layer shrinks as it dries</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Only a weak cement-to-cement contact: the joint opens and the layer lifts</span></li></ol>`;

const BOND_COAT_STYLE = `.sc-hw404-hw-404-bond-coat-first .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw404-hw-404-bond-coat-first .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw404-hw-404-bond-coat-first .s-okc circle{fill:var(--ok)}
.sc-hw404-hw-404-bond-coat-first .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw404-hw-404-bond-coat-first .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-st1{animation-name:k-hw404-hw-404-bond-coat-first-st1}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-st2{animation-name:k-hw404-hw-404-bond-coat-first-st2}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-st3{animation-name:k-hw404-hw-404-bond-coat-first-st3}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-okc{animation-name:k-hw404-hw-404-bond-coat-first-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw404-hw-404-bond-coat-first .s-txb{fill:var(--cblk)}
.sc-hw404-hw-404-bond-coat-first .s-late{opacity:1}
.sc-hw404-hw-404-bond-coat-first .s-goodtx{fill:var(--pc);font-weight:600}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-late{animation-name:k-hw404-hw-404-bond-coat-first-lateIn}
.sc-hw404-hw-404-bond-coat-first .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw404-hw-404-bond-coat-first .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw404-hw-404-bond-coat-first .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw404-hw-404-bond-coat-first .s-pcg circle{fill:var(--pc)}
.sc-hw404-hw-404-bond-coat-first .s-pcg path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw404-hw-404-bond-coat-first.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.sc-hw404-hw-404-bond-coat-first .s-capA{opacity:0}
.sc-hw404-hw-404-bond-coat-first .s-capB{opacity:0}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-capA{animation-name:k-hw404-hw-404-bond-coat-first-phA}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-capB{animation-name:k-hw404-hw-404-bond-coat-first-phB}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-capC{animation-name:k-hw404-hw-404-bond-coat-first-phC}
.sc-hw404-hw-404-bond-coat-first .s-oldc{fill:var(--cblk)}
.sc-hw404-hw-404-bond-coat-first .s-newp{fill:color-mix(in srgb,var(--sbr) 20%,var(--cmor))}
.sc-hw404-hw-404-bond-coat-first .s-bcoat{fill:var(--sbr)}
.sc-hw404-hw-404-bond-coat-first .s-stitch{fill:none;stroke:var(--sbr);stroke-width:2.2;stroke-linecap:round}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-stitch{animation-name:k-hw404-hw-404-bond-coat-first-fB}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-bcoat{animation-name:k-hw404-hw-404-bond-coat-first-bcIn}
.sc-hw404-hw-404-bond-coat-first .s-bcoat{transform-box:fill-box;transform-origin:0 50%}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-newdrop{animation-name:k-hw404-hw-404-bond-coat-first-newD}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-st1 .disc{animation-name:k-hw404-hw-404-bond-coat-first-st1-disc}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-st2 .disc{animation-name:k-hw404-hw-404-bond-coat-first-st2-disc}
.anim .sc-hw404-hw-404-bond-coat-first.playing .s-st3 .disc{animation-name:k-hw404-hw-404-bond-coat-first-st3-disc}
@keyframes k-hw404-hw-404-bond-coat-first-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw404-hw-404-bond-coat-first-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw404-hw-404-bond-coat-first-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw404-hw-404-bond-coat-first-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw404-hw-404-bond-coat-first-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw404-hw-404-bond-coat-first-phA{0%,31%{opacity:1}34%,100%{opacity:0}}
@keyframes k-hw404-hw-404-bond-coat-first-phB{0%,32%{opacity:0}35%,64%{opacity:1}67%,100%{opacity:0}}
@keyframes k-hw404-hw-404-bond-coat-first-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw404-hw-404-bond-coat-first-fB{0%,33%{opacity:0}36%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw404-hw-404-bond-coat-first-bcIn{0%,3%{transform:scaleX(0)}28%,97%{transform:none}100%{transform:scaleX(0)}}
@keyframes k-hw404-hw-404-bond-coat-first-newD{0%,30%{opacity:0;transform:translateY(-24px)}40%,97%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-24px)}}
@keyframes k-hw404-hw-404-bond-coat-first-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw404-hw-404-bond-coat-first-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw404-hw-404-bond-coat-first-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const BOND_COAT_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 212">
<rect x="20" y="120" width="260" height="70" rx="2" fill="var(--conc)"></rect><rect x="20" y="120" width="260" height="70" rx="2" class="s-oldc" opacity=".35"></rect>
<rect class="s-bcoat" x="20" y="116" width="260" height="5"></rect>
<g class="s-newdrop"><rect class="s-newp" x="20" y="78" width="260" height="38" rx="2"></rect></g>
<g class="s-stitch"><path d="M40 112v12M64 112v12M88 112v12M112 112v12M136 112v12M160 112v12M184 112v12M208 112v12M232 112v12M256 112v12"></path></g>
<g transform="translate(150 98)"><g class="s-okc"><g class="s-pcg"><circle cx="0" cy="0" r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g></g>
<text class="s-lbl" x="26" y="100">New mortar</text>
<text class="s-lblp" x="274" y="138" text-anchor="end">HW 404 bond coat ↑</text>
<text class="s-lbl" x="26" y="184">Old concrete</text>
<text class="s-lblb s-capA" x="150" y="24" text-anchor="middle">1 · Brush HW 404 bond coat on</text>
<text class="s-lblb s-capB" x="150" y="24" text-anchor="middle">2 · New layer on; SBR film ties the joint</text>
<text class="s-lblb s-capC" x="150" y="24" text-anchor="middle">3 · Old and new act as one</text>
<text class="s-lbl s-goodtx s-late" x="150" y="206" text-anchor="middle">Bond 2.60 MPa · slant shear 3.20 MPa (lab tested)</text>
</svg>`;

const BOND_COAT_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Cement + HW 404 (1 : 1) brushed on the clean, pre-soaked old surface</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>New mortar or concrete goes on while the coat is still tacky. The SBR film forms across the joint</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>A glued joint, not just a cement contact: old and new work together</span></li></ol>`;

const WHY_FALLS_OFF_CARDS = svgCards([
  svgCard({ title: 'Plain cement on old concrete', style: PLAIN_STYLE, svg: PLAIN_SVG, ol: PLAIN_OL, verdict: 'bad' }),
  svgCard({ title: 'HW 404 bond coat first', style: BOND_COAT_STYLE, svg: BOND_COAT_SVG, ol: BOND_COAT_OL, verdict: 'ok' }),
]);

// --- Step 4: "One Can. Every Cement Job." — single diagram, own caption ---
const THREE_MIX_STYLE = `.sc-hw404-same-can-three-mixes .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw404-same-can-three-mixes.playing .s-st1{animation-name:k-hw404-same-can-three-mixes-st1}
.anim .sc-hw404-same-can-three-mixes.playing .s-st2{animation-name:k-hw404-same-can-three-mixes-st2}
.anim .sc-hw404-same-can-three-mixes.playing .s-st3{animation-name:k-hw404-same-can-three-mixes-st3}
.sc-hw404-same-can-three-mixes .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw404-same-can-three-mixes .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw404-same-can-three-mixes .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw404-same-can-three-mixes .s-cs-svg{max-width:520px;margin:0 auto}
.sc-hw404-same-can-three-mixes .s-capA{opacity:0}
.sc-hw404-same-can-three-mixes .s-capB{opacity:0}
.anim .sc-hw404-same-can-three-mixes.playing .s-capA{animation-name:k-hw404-same-can-three-mixes-phA}
.anim .sc-hw404-same-can-three-mixes.playing .s-capB{animation-name:k-hw404-same-can-three-mixes-phB}
.anim .sc-hw404-same-can-three-mixes.playing .s-capC{animation-name:k-hw404-same-can-three-mixes-phC}
.sc-hw404-same-can-three-mixes .s-cang{fill:var(--ink)}
.sc-hw404-same-can-three-mixes .s-canl{fill:var(--sbr)}
.sc-hw404-same-can-three-mixes .s-pourl{fill:none;stroke:var(--sbr);stroke-width:3;stroke-linecap:round;stroke-dasharray:6 6}
.anim .sc-hw404-same-can-three-mixes.playing .s-pourl{animation:k-hw404-same-can-three-mixes-marchP .6s linear infinite}
.sc-hw404-same-can-three-mixes .s-tub{fill:color-mix(in srgb,var(--sbr) 12%,var(--paper));stroke:var(--sbr);stroke-width:2}
.sc-hw404-same-can-three-mixes .s-tubf{fill:color-mix(in srgb,var(--sbr) 38%,var(--adh))}
.sc-hw404-same-can-three-mixes .s-tubw{fill:color-mix(in srgb,var(--water) 40%,var(--sbr))}
.anim .sc-hw404-same-can-three-mixes.playing .s-st1 .disc{animation-name:k-hw404-same-can-three-mixes-st1-disc}
.anim .sc-hw404-same-can-three-mixes.playing .s-st2 .disc{animation-name:k-hw404-same-can-three-mixes-st2-disc}
.anim .sc-hw404-same-can-three-mixes.playing .s-st3 .disc{animation-name:k-hw404-same-can-three-mixes-st3-disc}
.sc-hw404-same-can-three-mixes .s-tubf.s-mixbond{fill:#d3dbd6}.sc-hw404-same-can-three-mixes .s-tubf.s-mixpoly{fill:#abb29c}.sc-hw404-same-can-three-mixes .s-tubw{fill:#b3d3de}
@keyframes k-hw404-same-can-three-mixes-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw404-same-can-three-mixes-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw404-same-can-three-mixes-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw404-same-can-three-mixes-phA{0%,31%{opacity:1}34%,100%{opacity:0}}
@keyframes k-hw404-same-can-three-mixes-phB{0%,32%{opacity:0}35%,64%{opacity:1}67%,100%{opacity:0}}
@keyframes k-hw404-same-can-three-mixes-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw404-same-can-three-mixes-marchP{to{stroke-dashoffset:-12}}
@keyframes k-hw404-same-can-three-mixes-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw404-same-can-three-mixes-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw404-same-can-three-mixes-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const THREE_MIX_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 340 214">
<g><rect class="s-cang" x="146" y="34" width="48" height="60" rx="6"></rect><rect class="s-cang" x="158" y="26" width="16" height="10" rx="2"></rect><rect class="s-canl" x="146" y="56" width="48" height="20"></rect><text x="170" y="70" text-anchor="middle" fill="#fff" font-size="12" font-family="var(--font-display)" font-weight="600">HW 404</text><text x="170" y="50" text-anchor="middle" fill="#cdcdcd" font-size="8" font-family="var(--font-sans)" font-weight="600">SBR</text></g>
<g class="s-st1"><path class="s-pourl" d="M156 96 Q110 116 70 140"></path><rect class="s-tub" x="30" y="142" width="80" height="34" rx="6"></rect><rect class="s-tubf s-mixbond" x="34" y="152" width="72" height="20" rx="3"></rect><text class="s-lblb" x="70" y="192" text-anchor="middle">Bond coat</text><text class="s-lblp" x="70" y="206" text-anchor="middle">1 : 1</text></g>
<g class="s-st2"><path class="s-pourl" d="M170 96 V140"></path><rect class="s-tub" x="130" y="142" width="80" height="34" rx="6"></rect><rect class="s-tubf s-mixpoly" x="134" y="152" width="72" height="20" rx="3"></rect><text class="s-lblb" x="170" y="192" text-anchor="middle">Polymer mortar</text><text class="s-lblp" x="170" y="206" text-anchor="middle">1 : 3 · 1 : 5</text></g>
<g class="s-st3"><path class="s-pourl" d="M184 96 Q230 116 270 140"></path><rect class="s-tub" x="230" y="142" width="80" height="34" rx="6"></rect><rect class="s-tubw" x="234" y="152" width="72" height="20" rx="3"></rect><text class="s-lblb" x="270" y="192" text-anchor="middle">Waterproof coat</text><text class="s-lblp" x="270" y="206" text-anchor="middle">4 : 2 : 1</text></g>
<text class="s-lblb s-capA" x="170" y="14" text-anchor="middle">1 · As a bonding agent</text>
<text class="s-lblb s-capB" x="170" y="14" text-anchor="middle">2 · As a mortar modifier</text>
<text class="s-lblb s-capC" x="170" y="14" text-anchor="middle">3 · As a waterproof coat</text>
</svg>`;

const THREE_MIX_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Bonding agent: a neat cement + SBR slurry brushed on before new work</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Polymer-modified mortar: SBR gauged into cement–sand mortar for repair, plaster and screed</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Waterproof coat: a brushable cement–SBR–water slurry</span></li></ol>`;

const THREE_MIX_CARD = svgCard({ title: 'Same can, three mixes', style: THREE_MIX_STYLE, svg: THREE_MIX_SVG, ol: THREE_MIX_OL });

// --- Step 6: "Two Tests for a Bonding Agent" — 2-card svg-cards ---
const PULLOFF_STYLE = `.sc-hw404-pull-off-bond-strength .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw404-pull-off-bond-strength .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.anim .sc-hw404-pull-off-bond-strength.playing .s-st1{animation-name:k-hw404-pull-off-bond-strength-st1}
.anim .sc-hw404-pull-off-bond-strength.playing .s-st2{animation-name:k-hw404-pull-off-bond-strength-st2}
.anim .sc-hw404-pull-off-bond-strength.playing .s-st3{animation-name:k-hw404-pull-off-bond-strength-st3}
.sc-hw404-pull-off-bond-strength .s-txb{fill:var(--cblk)}
.sc-hw404-pull-off-bond-strength .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw404-pull-off-bond-strength .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw404-pull-off-bond-strength.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.sc-hw404-pull-off-bond-strength .s-oldc{fill:var(--cblk)}
.sc-hw404-pull-off-bond-strength .s-dolly{fill:var(--ink-2)}
.sc-hw404-pull-off-bond-strength .s-rig{fill:var(--ink-2)}
.sc-hw404-pull-off-bond-strength .s-coatl{fill:var(--sbr)}
.sc-hw404-pull-off-bond-strength .s-pullg{transform-box:view-box}
.anim .sc-hw404-pull-off-bond-strength.playing .s-pullg{animation-name:k-hw404-pull-off-bond-strength-pullU;animation-timing-function:ease-in}
.sc-hw404-pull-off-bond-strength .s-upar{fill:none;stroke:var(--pc);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.anim .sc-hw404-pull-off-bond-strength.playing .s-upar{animation-name:k-hw404-pull-off-bond-strength-fB}
.sc-hw404-pull-off-bond-strength .s-gaugeb{fill:var(--rule)}
.sc-hw404-pull-off-bond-strength .s-gaugef{fill:var(--pc);transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw404-pull-off-bond-strength.playing .s-gaugef{animation-name:k-hw404-pull-off-bond-strength-gaugeU;animation-timing-function:ease-out}
.anim .sc-hw404-pull-off-bond-strength.playing .s-st1 .disc{animation-name:k-hw404-pull-off-bond-strength-st1-disc}
.anim .sc-hw404-pull-off-bond-strength.playing .s-st2 .disc{animation-name:k-hw404-pull-off-bond-strength-st2-disc}
.anim .sc-hw404-pull-off-bond-strength.playing .s-st3 .disc{animation-name:k-hw404-pull-off-bond-strength-st3-disc}
@keyframes k-hw404-pull-off-bond-strength-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw404-pull-off-bond-strength-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw404-pull-off-bond-strength-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw404-pull-off-bond-strength-pullU{0%,66%{transform:none}84%,97%{transform:translateY(-14px)}100%{transform:none}}
@keyframes k-hw404-pull-off-bond-strength-fB{0%,33%{opacity:0}36%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw404-pull-off-bond-strength-gaugeU{0%,30%{transform:scaleY(0)}70%,97%{transform:none}100%{transform:scaleY(0)}}
@keyframes k-hw404-pull-off-bond-strength-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw404-pull-off-bond-strength-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw404-pull-off-bond-strength-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const PULLOFF_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 200">
<rect x="30" y="130" width="200" height="50" fill="var(--conc)"></rect><rect x="30" y="130" width="200" height="50" class="s-oldc" opacity=".35"></rect>
<rect class="s-coatl" x="30" y="124" width="200" height="6"></rect>
<g class="s-pullg"><rect class="s-dolly" x="112" y="104" width="36" height="20" rx="2"></rect><rect class="s-rig" x="126" y="60" width="8" height="44"></rect><rect class="s-rig" x="96" y="50" width="68" height="10" rx="2"></rect></g>
<path class="s-upar" d="M130 42V20m-6 6l6-6 6 6"></path>
<rect class="s-gaugeb" x="252" y="50" width="16" height="110" rx="3"></rect><rect class="s-gaugef" x="252" y="50" width="16" height="110" rx="3"></rect>
<text class="s-lbl" x="260" y="176" text-anchor="middle">Pull</text>
<text class="s-lblp" x="154" y="118">Bond coat</text>
<text class="s-lbl" x="36" y="194">Concrete base</text>
</svg>`;

const PULLOFF_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>A metal dolly is glued on the cured layer</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>A tester pulls it straight up, harder and harder</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>It comes off: pull ÷ area = MPa. Higher = layer holds on better</span></li></ol>`;

const SLANT2_STYLE = `.sc-hw404-slant-shear-strength .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw404-slant-shear-strength .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.anim .sc-hw404-slant-shear-strength.playing .s-st1{animation-name:k-hw404-slant-shear-strength-st1}
.anim .sc-hw404-slant-shear-strength.playing .s-st2{animation-name:k-hw404-slant-shear-strength-st2}
.anim .sc-hw404-slant-shear-strength.playing .s-st3{animation-name:k-hw404-slant-shear-strength-st3}
.sc-hw404-slant-shear-strength .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw404-slant-shear-strength .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw404-slant-shear-strength.s-solo .s-cs-svg{max-width:520px;margin:0 auto}
.sc-hw404-slant-shear-strength .s-rig{fill:var(--ink-2)}
.sc-hw404-slant-shear-strength .s-slt{fill:color-mix(in srgb,var(--sbr) 22%,var(--cmor))}
.sc-hw404-slant-shear-strength .s-slb{fill:var(--cblk)}
.sc-hw404-slant-shear-strength .s-sline{fill:none;stroke:var(--sbr);stroke-width:3}
.sc-hw404-slant-shear-strength .s-pressg{transform-box:view-box}
.anim .sc-hw404-slant-shear-strength.playing .s-pressg{animation-name:k-hw404-slant-shear-strength-pressD;animation-timing-function:ease-out}
.sc-hw404-slant-shear-strength .s-slideg{transform-box:view-box}
.anim .sc-hw404-slant-shear-strength.playing .s-slideg{animation-name:k-hw404-slant-shear-strength-slideT}
.sc-hw404-slant-shear-strength .s-gaugeb{fill:var(--rule)}
.sc-hw404-slant-shear-strength .s-gaugef{fill:var(--pc);transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw404-slant-shear-strength.playing .s-gaugef{animation-name:k-hw404-slant-shear-strength-gaugeU;animation-timing-function:ease-out}
.anim .sc-hw404-slant-shear-strength.playing .s-st1 .disc{animation-name:k-hw404-slant-shear-strength-st1-disc}
.anim .sc-hw404-slant-shear-strength.playing .s-st2 .disc{animation-name:k-hw404-slant-shear-strength-st2-disc}
.anim .sc-hw404-slant-shear-strength.playing .s-st3 .disc{animation-name:k-hw404-slant-shear-strength-st3-disc}
@keyframes k-hw404-slant-shear-strength-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw404-slant-shear-strength-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw404-slant-shear-strength-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw404-slant-shear-strength-pressD{0%,20%{transform:translateY(-18px)}40%,97%{transform:none}100%{transform:translateY(-18px)}}
@keyframes k-hw404-slant-shear-strength-slideT{0%,70%{transform:none}86%,97%{transform:translate(4px,3px)}100%{transform:none}}
@keyframes k-hw404-slant-shear-strength-gaugeU{0%,30%{transform:scaleY(0)}70%,97%{transform:none}100%{transform:scaleY(0)}}
@keyframes k-hw404-slant-shear-strength-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw404-slant-shear-strength-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw404-slant-shear-strength-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const SLANT2_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 200">
<rect x="70" y="170" width="140" height="10" rx="2" class="s-rig"></rect>
<path class="s-slb" d="M110 170V100l60 30v40z"></path>
<g class="s-slideg"><path class="s-slt" d="M110 100V70h60v60z"></path></g>
<path class="s-sline" d="M110 100l60 30"></path>
<g class="s-pressg"><rect class="s-rig" x="100" y="56" width="80" height="12" rx="2"></rect><rect class="s-rig" x="134" y="24" width="12" height="32"></rect></g>
<rect class="s-gaugeb" x="250" y="50" width="16" height="110" rx="3"></rect><rect class="s-gaugef" x="250" y="50" width="16" height="110" rx="3"></rect>
<text class="s-lbl" x="258" y="176" text-anchor="middle">Load</text>
<text class="s-lblp" x="178" y="118">Bonded</text><text class="s-lblp" x="178" y="131">joint</text>
<text class="s-lbl" x="140" y="194" text-anchor="middle">Two halves, one sloping joint</text>
</svg>`;

const SLANT2_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Two halves joined on a slope with the bond coat</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>A press squeezes the cylinder from the top</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The slope turns the load into a sliding force on the joint. Higher = joint resists sliding</span></li></ol>`;

const TWO_TESTS_CARDS = svgCards([
  svgCard({ title: 'Pull-off bond strength', style: PULLOFF_STYLE, svg: PULLOFF_SVG, ol: PULLOFF_OL }),
  svgCard({ title: 'Slant shear strength', style: SLANT2_STYLE, svg: SLANT2_SVG, ol: SLANT2_OL }),
]);

module.exports = {
  productName: 'HW404 Bonding Agent SBR',
  productDescription: 'Styrene-butadiene rubber (SBR) latex bonding agent and mortar modifier',
  topicDescription: 'Everything a sales, dealer or applicator team member needs to know about HW404 Bonding Agent SBR: SBR chemistry, why new work falls off old concrete, the three use-cases from one can, solid content versus competitors, bond/slant-shear lab tests, the full spec sheet and application method.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image',
      title: 'Bonding Agent SBR',
      data: {
        text: 'A milky liquid rubber you mix with cement. It helps cement stick, crack less and keep water out.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/bonding-agent-sbr.webp'],
        caption: 'HW404 — A milky liquid rubber you mix with cement.',
        key: 'HW404 · Styrene-Butadiene Rubber (SBR) Latex Bonding Agent',
      },
    },
    {
      type: 'svg',
      title: 'Styrene + Butadiene = SBR',
      data: {
        text: 'SBR means Styrene Butadiene Rubber. Two building blocks are joined into one long polymer chain. It comes as a milky white liquid called a latex.',
        svgMarkup: SBR_CARD,
        badges: [
          { icon: '🔷', label: 'Styrene', sub: 'The hard part: strength and toughness', tone: 'neutral' },
          { icon: '🟫', label: 'Butadiene', sub: 'The rubber part: flexibility', tone: 'neutral' },
          { icon: '🥛', label: 'Latex', sub: 'Water-based: mixes straight into cement and water', tone: 'neutral' },
          { icon: '🎞️', label: 'Film', sub: 'Glues and seals from inside the mortar', tone: 'neutral' },
        ],
        explain: 'The One Line to Remember. Cement is strong but brittle and porous. SBR puts a rubbery glue inside it.',
      },
    },
    {
      type: 'svg',
      title: 'Why New Work Falls Off Old Concrete',
      data: {
        text: 'A fresh layer of mortar or concrete laid on an old surface. Two ways to do it. Watch the joint.',
        svgMarkup: WHY_FALLS_OFF_CARDS,
        table: {
          headers: ['Feature', 'Plain cement', 'With HW 404 (SBR)'],
          rows: [
            ['Bond', 'Weak grip on old or smooth surfaces', 'Polymer film glues the joint. Bond coat: 2.60 MPa'],
            ['Brittleness', 'Hard but brittle: cracks when it bends', 'Rubbery film adds toughness. Flexural 2.05 MPa (1:3 mortar)'],
            ['Water', 'Porous: water finds its way through', 'Film lines the pores. Used as a waterproof coat (4:2:1)'],
            ['Thin layers', 'Thin patches and coats debond easily', 'Thin bond coats and slurries hold: slant shear 3.20 MPa'],
          ],
        },
      },
    },
    {
      type: 'knowledge',
      title: 'Knowledge Check — Bond Coat Ratio',
      data: {
        text: 'Correct SBR : cement ratio for the bond coat:',
        list: ['1:2', '1:1', '2:1', '3:1'],
        correctIndex: 1,
        explanation: 'The HW404 bond coat is 1 part cement to 1 part HW404, by volume, brushed on the clean, pre-soaked old surface.',
      },
    },
    {
      type: 'svg',
      title: 'One Can. Every Cement Job.',
      data: {
        text: 'Paracetamol is the one tablet every home keeps for fever, headache and pain. HW 404 is the same on site. One can works as a bonding agent, a mortar modifier and a waterproof coat. Only the mix changes.',
        svgMarkup: THREE_MIX_CARD,
        steps: [
          { title: 'Bonding agent', desc: 'A neat cement + SBR slurry brushed on before new work' },
          { title: 'Polymer modifier', desc: 'SBR gauged into cement–sand mortar for repair, plaster and screed' },
          { title: 'Waterproof coat', desc: 'A brushable cement–SBR–water slurry' },
        ],
        sections: [
          { label: 'Bonding agent — 1 : 1 (Cement : HW 404)', text: 'Brushed on the old surface. New concrete, mortar or screed goes on while it is still tacky. Bond 2.60 MPa · slant shear 3.20 MPa at 28 days.' },
          { label: 'Polymer mortar — 1 : 3 · 1 : 5 (Cement : M-sand, with HW 404)', text: 'SBR-modified mortar for repairs, patching, plaster and screeds. 1:3 mix: 21.1 MPa compressive · 2.04 MPa bond.' },
          { label: 'Waterproof coat — 4 : 2 : 1 (Cement : HW 404 : water)', text: 'Brushable slurry coat that bonds to the surface and lines it. Bond 1.50 → 2.48 MPa, 7 to 28 days.' },
        ],
        explain: 'Say It Simply. A dealer who stocks HW 404 has an answer for bonding, repair and waterproofing from one shelf. One SKU, many sales.',
      },
    },
    {
      type: 'card',
      title: 'More Polymer in Every Can',
      data: {
        text: 'Every SBR can holds two things: polymer solids and water. Only the solids form the film that bonds and seals. The water just dries off. More solids in the can means more polymer working in every bag of cement.',
        stats: [
          { value: '500–600 g', label: 'Polymer in every 1 kg of HW 404', sub: '50–60% solid content (TDS)' },
          { value: '≈ 380 g', label: 'Polymer in 1 kg of Dr. Fixit Pidicrete URP', sub: '38 ± 1% total solids (its TDS)' },
        ],
        gauges: [
          { label: 'HW 404', sub: 'Hard Worker · TDS', valuePct: 100, result: '50–60%', highlight: true, showDot: false },
          { label: 'Dr. Fixit Pidicrete URP', sub: 'Pidilite · TDS', valuePct: 63, result: '38 ± 1%', highlight: false, showDot: false },
          { label: 'Fosroc Nitobond SBR', sub: 'Fosroc · TDS', valuePct: 0, result: 'Not declared', highlight: false, showDot: false },
        ],
        table: {
          headers: ['Feature', 'What it tells you', 'Customer benefit'],
          rows: [
            ['Solid content % by mass', 'How much of the can is polymer, not water', 'More film for the same quantity used'],
            ['Price per litre', 'Only fair when the solids are the same', 'Compare cost per kg of polymer, not per can'],
          ],
        },
        explain: 'Ask the Question First. "What is the solid content?" A cheaper can with fewer solids gives less polymer per bag of cement.',
      },
    },
    {
      type: 'svg',
      title: 'Two Tests for a Bonding Agent',
      data: {
        text: 'A bonding agent has one job: stop the new layer from coming off. The lab checks it two ways: pull it straight off, and push it along a sloping joint.',
        svgMarkup: TWO_TESTS_CARDS,
        table: {
          headers: ['Feature', 'What it tells you', 'Customer benefit'],
          rows: [
            ['Bond strength ASTM D4541', 'Force to pull the layer straight off the base', 'Plaster, screed and coats stay on; no hollow sound'],
            ['Slant shear ASTM C882', 'Grip of a bonded joint under load', 'New concrete on old works as one member'],
            ['Compressive ASTM C109', 'Load the mortar carries before it crushes', 'Strong repairs and screeds'],
            ['Flexural ASTM C580', 'How much bending before it cracks', 'Fewer cracks in thin layers'],
          ],
        },
      },
    },
    {
      type: 'card',
      title: 'Strength Keeps Climbing',
      data: {
        text: 'An independent lab tested HW 404 in all three jobs. Wherever it was tested at both ages, bond strength rises strongly from 7 to 28 days as the SBR film forms.',
        stats: [
          { value: '2.60', label: 'Bond, bond coat 1:1', sub: 'MPa at 28 days' },
          { value: '3.20', label: 'Slant shear, bond coat', sub: 'MPa' },
          { value: '21.1', label: 'Compressive, 1:3 mortar', sub: 'MPa at 28 days' },
          { value: '2.48', label: 'Bond, waterproof coat', sub: 'MPa at 28 days' },
        ],
        explain: 'Say It Simply. The strongest grip comes from the neat bond coat: 2.60 MPa pull-off. Use the bond coat for bonding, and the mortar mix for filling and building up.',
      },
    },
    {
      type: 'card',
      title: 'HW 404 · Bonding Agent SBR',
      data: {
        text: 'A ready-to-use styrene-butadiene rubber (SBR) latex bonding agent. Mixed with cement as a slurry, it bonds old and new concrete, improves the tensile and flexural strength of repair mortars, and reduces shrinkage and cracking. Where it goes, as per the TDS: old to new concrete, polymer-modified repair mortars, and screeds and floor toppings.',
        tableRows: [
          { label: 'Appearance', value: 'White liquid' },
          { label: 'Solid content', value: '50–60%' },
          { label: 'Specific gravity', value: '1.020 g/ml' },
          { label: 'Bond slurry', value: '1 SBR : 1 cement' },
          { label: 'Tack-free time', value: '30–35 min' },
          { label: 'Pot life', value: '60 min' },
          { label: 'Bond, 28 d', value: '2.2–2.5 MPa' },
          { label: 'Slant shear, 28 d', value: '3–3.2 MPa' },
          { label: 'Pack · shelf life', value: '1, 5, 10 kg · 12 months' },
        ],
        sections: [
          { label: 'Bond coat — 1 : 1 (Cement : HW 404)', text: 'Pull-off bond 2.60 MPa · slant shear 3.20 MPa.' },
          { label: 'Polymer mortar — 1 : 3 (Cement : M-sand, gauged with HW 404)', text: '1:3 → 21.1 MPa compressive, 2.04 MPa bond.' },
          { label: 'Waterproof coat — 4 : 2 : 1 (Cement : HW 404 : water)', text: 'Bond 2.48 MPa at 28 days.' },
        ],
        steps: [
          { title: 'Clean', desc: 'No dust, laitance, rust, paint or oil.' },
          { title: 'Wet & roughen', desc: 'Pre-soak concrete 2 hours (SSD). Roughen smooth surfaces.' },
          { title: 'Mix', desc: '1 part HW 404 : 1 part cement. Low-speed mixer, lump-free.' },
          { title: 'Brush', desc: 'Brush the slurry on the prepared surface.' },
          { title: 'Overlay while tacky', desc: 'Place mortar or screed before the coat dries.' },
        ],
        badges: [
          { icon: '✓', label: 'Excellent bond between old and new concrete', tone: 'ok' },
          { icon: '✓', label: 'Improves tensile and flexural strength of repair mortar', tone: 'ok' },
          { icon: '✓', label: 'Better cohesion, less shrinkage and cracking', tone: 'ok' },
          { icon: '✓', label: 'Ready to use: one liquid, many use-cases', tone: 'ok' },
          { icon: '✗', label: 'Overlay on a dried, non-tacky coat', tone: 'bad' },
          { icon: '✗', label: 'Use after the 60 min pot life', tone: 'bad' },
          { icon: '✗', label: 'Let it harden on tools: wash with water', tone: 'bad' },
          { icon: '🧪', label: 'Non-hazardous', sub: 'VOC: nil · Heavy metals: nil', tone: 'neutral' },
          { icon: '🔥', label: 'Non-combustible', tone: 'neutral' },
          { icon: '🥽', label: 'Gloves, mask, eye protection', tone: 'neutral' },
        ],
        stats: [{ value: '8–12', label: 'sq ft per litre', sub: '2 coats at 1 mm' }],
      },
    },
    {
      type: 'knowledge',
      title: 'Scenario: On Site',
      data: {
        text: 'On site: Slurry on Dry Concrete. A mason is about to brush SBR slurry onto an old, bone-dry concrete slab before laying a screed. A mason applies SBR slurry on dry concrete. What\'s correct?',
        list: ['Proceed immediately', 'Pre-saturate to SSD, then apply', 'Add more SBR to compensate', 'Sand the surface lightly'],
        correctIndex: 1,
        explanation: 'Concrete must be SSD before the slurry: pre-saturate the substrate for at least 2 hours.',
      },
    },
    {
      type: 'text',
      title: 'Cheat Sheet',
      data: {
        sections: [
          { label: 'The problem — Plain cement', text: 'Why: cement is strong but brittle and porous. On old or smooth surfaces it grips weakly; the old surface pulls its water and it shrinks. Result: new layers sound hollow, crack and peel; thin coats debond; water gets through.' },
          { label: 'HW 404 Bonding Agent SBR', text: 'Styrene Butadiene Rubber latex.' },
          { label: 'Chemistry', text: 'Styrene (hard) + butadiene (rubbery) = SBR. Milky latex of tiny polymer particles in water. In cement it forms a film that glues and seals.' },
          { label: 'One for all — 1:1', text: 'Bond coat: cement : HW 404 1:1. Polymer mortar: cement : M-sand 1:3 or 1:5. Waterproof coat: cement : HW 404 : water 4:2:1.' },
          { label: 'Solid content — 50–60%', text: 'HW 404 vs Dr. Fixit Pidicrete URP 38 ± 1%; Fosroc Nitobond SBR does not state it. More polymer per kg.' },
          { label: 'Lab tested — 2.60', text: 'Bond coat: 2.60 MPa bond, 3.20 MPa slant shear. 1:3 mortar: 21.1 MPa compressive, 2.04 bond (+61% from 7 d), 2.05 flexural. 1:5 mortar: 7.50 MPa compressive, 1.56 bond (5.8× from 7 d), 1.50 flexural. Waterproof coat: 2.48 MPa bond (+65% from 7 d).' },
          { label: 'TDS data — 50–60%', text: 'Solid content 50–60% · SG 1.020. Bond 2.2–2.5 MPa · slant shear 3–3.2 MPa (28 d). Tack-free 30–35 min · pot life 60 min.' },
          { label: 'Apply', text: 'Clean → pre-soak 2 h (SSD) → mix 1:1 with cement → brush → overlay while tacky.' },
          { label: 'Where', text: 'Old to new concrete, polymer-modified repair mortars, screeds and floor toppings.' },
          { label: 'Coverage · pack', text: '8–12 sq ft/litre (2 coats, 1 mm) · 1, 5, 10 kg · 12 months shelf life.' },
        ],
      },
    },
  ],
};
