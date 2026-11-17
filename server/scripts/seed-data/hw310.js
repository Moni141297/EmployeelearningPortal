/*
 * HW310 "Wall Putty" — extracted verbatim from
 * https://hw-learning-hub-v2.vercel.app/products/wall-putty-hw310 (13 learn steps, final
 * assessment 5 questions / pass 70%). Steps 1-13 map 1:1 to slides except step 3, which
 * carries one inline knowledge check split into its own slide right after (PRD §2 row 5).
 */

function svgCardPlain(title, verdictClass, style, svgOuterHtml, olOuterHtml) {
  const titleCls = verdictClass ? ` ${verdictClass}` : '';
  return `<div class="svg-card"><div class="svg-card-head"><span class="svg-card-title${titleCls}">${title}</span><label class="svg-card-replay"><input type="checkbox" data-replay/>Replay</label></div><style>${style}</style><div class="svg-anim anim playing" style="--T:10s">${svgOuterHtml}${olOuterHtml || ''}</div></div>`;
}

// --- Step 3 diagrams: Paint on bare plaster (bad) / Paint on HW310 (ok) ---
const BAREPLASTER_STYLE = `.sc-hw310-paint-on-bare-plaster .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw310-paint-on-bare-plaster .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw310-paint-on-bare-plaster .s-lname{font:600 13px var(--font-sans);fill:var(--ink)}
.sc-hw310-paint-on-bare-plaster .s-badtx{fill:var(--neg);font-weight:600}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-st1{animation-name:k-hw310-paint-on-bare-plaster-st1}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-st2{animation-name:k-hw310-paint-on-bare-plaster-st2}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-st3{animation-name:k-hw310-paint-on-bare-plaster-st3}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-badtx{animation-name:k-hw310-paint-on-bare-plaster-redge}
.sc-hw310-paint-on-bare-plaster .s-txb{fill:var(--cblk)}
.sc-hw310-paint-on-bare-plaster .s-plas{fill:var(--plas)}
.sc-hw310-paint-on-bare-plaster .s-pit{fill:var(--pit)}
.sc-hw310-paint-on-bare-plaster .s-soak{fill:var(--paintd);opacity:.9}
.sc-hw310-paint-on-bare-plaster .s-pfilm{fill:none;stroke:var(--paint);stroke-width:4;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:0}
.sc-hw310-paint-on-bare-plaster .s-roll{opacity:0}
.sc-hw310-paint-on-bare-plaster .s-fin{opacity:1}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-roll{animation-name:k-hw310-paint-on-bare-plaster-rollA;animation-timing-function:ease-in-out}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-pfilm{animation-name:k-hw310-paint-on-bare-plaster-pfA}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-soak{animation-name:k-hw310-paint-on-bare-plaster-soakA;animation-delay:var(--sd,0s)}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-fin{animation-name:k-hw310-paint-on-bare-plaster-finA}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-st1 .disc{animation-name:k-hw310-paint-on-bare-plaster-st1-disc}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-st2 .disc{animation-name:k-hw310-paint-on-bare-plaster-st2-disc}
.anim .sc-hw310-paint-on-bare-plaster.playing .s-st3 .disc{animation-name:k-hw310-paint-on-bare-plaster-st3-disc}
@keyframes k-hw310-paint-on-bare-plaster-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw310-paint-on-bare-plaster-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw310-paint-on-bare-plaster-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw310-paint-on-bare-plaster-redge{0%,72%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw310-paint-on-bare-plaster-rollA{0%,33%{opacity:0;transform:translateX(20px)}35%{opacity:1;transform:translateX(20px)}60%{opacity:1;transform:translateX(280px)}62%,100%{opacity:0;transform:translateX(280px)}}
@keyframes k-hw310-paint-on-bare-plaster-pfA{0%,35%{stroke-dashoffset:100}60%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:100}}
@keyframes k-hw310-paint-on-bare-plaster-soakA{0%,36%{opacity:0}42%,97%{opacity:.9}100%{opacity:0}}
@keyframes k-hw310-paint-on-bare-plaster-finA{0%,66%{opacity:0}71%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw310-paint-on-bare-plaster-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw310-paint-on-bare-plaster-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw310-paint-on-bare-plaster-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const BAREPLASTER_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 170">
<rect x="10" y="124" width="280" height="40" fill="var(--conc)"></rect>
<path class="s-plas" d="M10 100C30 92 45 106 65 98S100 90 120 101S160 106 180 96S220 90 240 100S275 104 290 97V124H10Z"></path>
<ellipse class="s-pit" cx="65" cy="100" rx="3.2" ry="2.4"></ellipse><ellipse class="s-pit" cx="120" cy="103" rx="3.2" ry="2.4"></ellipse><ellipse class="s-pit" cx="180" cy="98" rx="3.2" ry="2.4"></ellipse><ellipse class="s-pit" cx="240" cy="102" rx="3.2" ry="2.4"></ellipse>
<path class="s-pfilm" pathLength="100" transform="translate(0,-2.5)" d="M10 100C30 92 45 106 65 98S100 90 120 101S160 106 180 96S220 90 240 100S275 104 290 97"></path>
<ellipse class="s-soak" cx="65" cy="100" rx="4.4" ry="3.2" style="--sd:.43s"></ellipse><ellipse class="s-soak" cx="120" cy="103" rx="4.4" ry="3.2" style="--sd:.96s"></ellipse><ellipse class="s-soak" cx="180" cy="98" rx="4.4" ry="3.2" style="--sd:1.54s"></ellipse><ellipse class="s-soak" cx="240" cy="102" rx="4.4" ry="3.2" style="--sd:2.12s"></ellipse>
<text class="s-lbl" x="40" y="80" text-anchor="middle">Undulations</text><text class="s-lbl" x="180" y="84" text-anchor="middle">Pores</text>
<g transform="translate(0,90)"><g class="s-roll"><path d="M0 -14V-22H12V-42" fill="none" stroke="var(--ink-2)" stroke-width="2.4" stroke-linejoin="round"></path><rect x="-11" y="-14" width="22" height="10" rx="4" fill="var(--paint)"></rect></g></g>
<text class="s-lname s-badtx s-fin" x="150" y="24" text-anchor="middle">Bumps show through</text>
<text class="s-lbl s-badtx s-fin" x="150" y="41" text-anchor="middle">Paint soaks into pores unevenly</text>
</svg>`;

const BAREPLASTER_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Plaster has undulations and open pores</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Paint rolled straight on follows every bump</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The bumps show, and paint soaks in unevenly</span></li></ol>`;

const HW310PAINT_STYLE = `.sc-hw310-paint-on-hw310 .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw310-paint-on-hw310 .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw310-paint-on-hw310 .s-lname{font:600 13px var(--font-sans);fill:var(--ink)}
.sc-hw310-paint-on-hw310 .s-okc circle{fill:var(--ok)}
.sc-hw310-paint-on-hw310 .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw310-paint-on-hw310 .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw310-paint-on-hw310.playing .s-st1{animation-name:k-hw310-paint-on-hw310-st1}
.anim .sc-hw310-paint-on-hw310.playing .s-st2{animation-name:k-hw310-paint-on-hw310-st2}
.anim .sc-hw310-paint-on-hw310.playing .s-st3{animation-name:k-hw310-paint-on-hw310-st3}
.anim .sc-hw310-paint-on-hw310.playing .s-okc{animation-name:k-hw310-paint-on-hw310-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw310-paint-on-hw310 .s-txb{fill:var(--cblk)}
.sc-hw310-paint-on-hw310 .s-goodtx{fill:var(--prod);font-weight:600}
.sc-hw310-paint-on-hw310 .s-plas{fill:var(--plas)}
.sc-hw310-paint-on-hw310 .s-pit{fill:var(--pit)}
.sc-hw310-paint-on-hw310 .s-pfill{fill:var(--putty)}
.sc-hw310-paint-on-hw310 .s-pfilm{fill:none;stroke:var(--paint);stroke-width:4;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:0}
.sc-hw310-paint-on-hw310 .s-roll{opacity:0}
.sc-hw310-paint-on-hw310 .s-trow{opacity:0}
.sc-hw310-paint-on-hw310 .s-pmask{fill:var(--soft);transform:translateX(300px)}
.sc-hw310-paint-on-hw310 .s-fin{opacity:1}
.sc-hw310-paint-on-hw310 .s-okp{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw310-paint-on-hw310 .s-okp circle{fill:var(--prod)}
.sc-hw310-paint-on-hw310 .s-okp path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.anim .sc-hw310-paint-on-hw310.playing .s-roll{animation-name:k-hw310-paint-on-hw310-rollA;animation-timing-function:ease-in-out}
.anim .sc-hw310-paint-on-hw310.playing .s-pfilm{animation-name:k-hw310-paint-on-hw310-pfA}
.anim .sc-hw310-paint-on-hw310.playing .s-pmask{animation-name:k-hw310-paint-on-hw310-pmA}
.anim .sc-hw310-paint-on-hw310.playing .s-trow{animation-name:k-hw310-paint-on-hw310-trA}
.anim .sc-hw310-paint-on-hw310.playing .s-pfill{animation-name:k-hw310-paint-on-hw310-pfillA;animation-delay:var(--sd,0s)}
.anim .sc-hw310-paint-on-hw310.playing .s-fin{animation-name:k-hw310-paint-on-hw310-finA}
.anim .sc-hw310-paint-on-hw310.playing .s-okc.s-okp{animation-name:k-hw310-paint-on-hw310-okP;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw310-paint-on-hw310.playing .s-st1 .disc{animation-name:k-hw310-paint-on-hw310-st1-disc}
.anim .sc-hw310-paint-on-hw310.playing .s-st2 .disc{animation-name:k-hw310-paint-on-hw310-st2-disc}
.anim .sc-hw310-paint-on-hw310.playing .s-st3 .disc{animation-name:k-hw310-paint-on-hw310-st3-disc}
@keyframes k-hw310-paint-on-hw310-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw310-paint-on-hw310-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw310-paint-on-hw310-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw310-paint-on-hw310-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw310-paint-on-hw310-rollA{0%,33%{opacity:0;transform:translateX(20px)}35%{opacity:1;transform:translateX(20px)}60%{opacity:1;transform:translateX(280px)}62%,100%{opacity:0;transform:translateX(280px)}}
@keyframes k-hw310-paint-on-hw310-pfA{0%,35%{stroke-dashoffset:100}60%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:100}}
@keyframes k-hw310-paint-on-hw310-pmA{0%,3%{transform:none}28%,97%{transform:translateX(300px)}100%{transform:none}}
@keyframes k-hw310-paint-on-hw310-trA{0%,2%{opacity:0;transform:none}3%{opacity:1;transform:none}28%{opacity:1;transform:translateX(290px)}30%,100%{opacity:0;transform:translateX(290px)}}
@keyframes k-hw310-paint-on-hw310-pfillA{0%,4%{opacity:0}7%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw310-paint-on-hw310-finA{0%,66%{opacity:0}71%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw310-paint-on-hw310-okP{0%,66%{opacity:0;transform:scale(.3)}72%,97%{opacity:1;transform:none}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw310-paint-on-hw310-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw310-paint-on-hw310-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw310-paint-on-hw310-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const HW310PAINT_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 170">
<rect x="10" y="124" width="280" height="40" fill="var(--conc)"></rect>
<g><rect x="10" y="84" width="280" height="40" fill="var(--putty)"></rect><line x1="10" y1="84" x2="290" y2="84" stroke="var(--puttys)" stroke-width="1.2"></line></g>
<rect class="s-pmask" x="0" y="58" width="300" height="64"></rect>
<path class="s-plas" d="M10 100C30 92 45 106 65 98S100 90 120 101S160 106 180 96S220 90 240 100S275 104 290 97V124H10Z"></path>
<ellipse class="s-pit" cx="65" cy="100" rx="3.2" ry="2.4"></ellipse><ellipse class="s-pit" cx="120" cy="103" rx="3.2" ry="2.4"></ellipse><ellipse class="s-pit" cx="180" cy="98" rx="3.2" ry="2.4"></ellipse><ellipse class="s-pit" cx="240" cy="102" rx="3.2" ry="2.4"></ellipse>
<ellipse class="s-pfill" cx="65" cy="100" rx="3.4" ry="2.6" style="--sd:.49s"></ellipse><ellipse class="s-pfill" cx="120" cy="103" rx="3.4" ry="2.6" style="--sd:.98s"></ellipse><ellipse class="s-pfill" cx="180" cy="98" rx="3.4" ry="2.6" style="--sd:1.51s"></ellipse><ellipse class="s-pfill" cx="240" cy="102" rx="3.4" ry="2.6" style="--sd:2.04s"></ellipse>
<path class="s-pfilm" pathLength="100" d="M10 81.5H290"></path>
<text class="s-lbl" x="150" y="68" text-anchor="middle" style="fill:var(--prod);font-weight:600">HW310 · 1–1.5 mm</text>
<g transform="translate(0,62)"><g class="s-trow"><path d="M-2 22L10 22L6 8L2 8Z" fill="var(--steel)"></path><rect x="1" y="-12" width="6" height="21" rx="2" fill="var(--ink-2)"></rect></g></g>
<g transform="translate(0,86)"><g class="s-roll"><path d="M0 -14V-22H12V-42" fill="none" stroke="var(--ink-2)" stroke-width="2.4" stroke-linejoin="round"></path><rect x="-11" y="-14" width="22" height="10" rx="4" fill="var(--paint)"></rect></g></g>
<text class="s-lname s-goodtx s-fin" x="150" y="24" text-anchor="middle">Level, closed surface</text>
<g class="s-okc s-okp"><circle cx="150" cy="44" r="10"></circle><path d="M144.5 44.5l3.8 3.8 7.4-7.8"></path></g>
</svg>`;

const HW310PAINT_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>HW310 fills the pores and levels the plaster</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Paint goes on a flat, closed base</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>A smooth, even finish on a strong base</span></li></ol>`;

const STEP3_SVGCARDS = `<div class="svg-cards">${svgCardPlain('Paint on bare plaster', 'bad', BAREPLASTER_STYLE, BAREPLASTER_SVG, BAREPLASTER_OL)}${svgCardPlain('Paint on HW310', 'ok', HW310PAINT_STYLE, HW310PAINT_SVG, HW310PAINT_OL)}</div>`;

// --- Step 5 diagrams: Putty that loses its water (bad) / HW310 90% water retentivity (ok) ---
const LOSESWATER_STYLE = `.sc-hw310-putty-that-loses-its-water .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw310-putty-that-loses-its-water .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw310-putty-that-loses-its-water .s-lname{font:600 13px var(--font-sans);fill:var(--ink)}
.sc-hw310-putty-that-loses-its-water .s-sun circle{fill:var(--gold)}
.sc-hw310-putty-that-loses-its-water .s-sun line{stroke:var(--gold);stroke-width:2.4;stroke-linecap:round}
.sc-hw310-putty-that-loses-its-water .s-sun{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw310-putty-that-loses-its-water .s-ev{fill:none;stroke:var(--ink-2);stroke-width:1.8;stroke-linecap:round;opacity:0}
.sc-hw310-putty-that-loses-its-water .s-badtx{fill:var(--neg);font-weight:600}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-st1{animation-name:k-hw310-putty-that-loses-its-water-st1}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-st2{animation-name:k-hw310-putty-that-loses-its-water-st2}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-st3{animation-name:k-hw310-putty-that-loses-its-water-st3}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-sun{animation-name:k-hw310-putty-that-loses-its-water-spin;animation-duration:14s}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-ev{animation-name:k-hw310-putty-that-loses-its-water-evap;animation-delay:var(--ed)}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-badtx{animation-name:k-hw310-putty-that-loses-its-water-redge}
.sc-hw310-putty-that-loses-its-water .s-txb{fill:var(--cblk)}
.sc-hw310-putty-that-loses-its-water .s-plas{fill:var(--plas)}
.sc-hw310-putty-that-loses-its-water .s-putty{fill:var(--putty);stroke:var(--puttys);stroke-width:1.2}
.sc-hw310-putty-that-loses-its-water .s-pit{fill:var(--pit)}
.sc-hw310-putty-that-loses-its-water .s-fin{opacity:1}
.sc-hw310-putty-that-loses-its-water .s-wdot{fill:var(--water)}
.sc-hw310-putty-that-loses-its-water .s-wgo{opacity:0}
.sc-hw310-putty-that-loses-its-water .s-sck{fill:none;stroke:var(--water);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.sc-hw310-putty-that-loses-its-water .s-pcrk{fill:none;stroke:var(--crack);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:60;stroke-dashoffset:0}
.sc-hw310-putty-that-loses-its-water .s-pdust{fill:var(--pit);opacity:.55}
.sc-hw310-putty-that-loses-its-water .s-phole{fill:var(--soft)}
.sc-hw310-putty-that-loses-its-water .s-pflk{fill:var(--putty);opacity:0;transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-fin{animation-name:k-hw310-putty-that-loses-its-water-finA}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-wdot{animation-name:k-hw310-putty-that-loses-its-water-whA}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-sck{animation-name:k-hw310-putty-that-loses-its-water-sckA;animation-delay:var(--ad,0s)}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-pcrk{animation-name:k-hw310-putty-that-loses-its-water-pcrkA}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-pdust{animation-name:k-hw310-putty-that-loses-its-water-dustA}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-phole{animation-name:k-hw310-putty-that-loses-its-water-dustA}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-pflk{animation-name:k-hw310-putty-that-loses-its-water-pflkA}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-wgo.s-lf{animation-name:k-hw310-putty-that-loses-its-water-lfA;animation-delay:var(--wd,0s)}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-wgo.s-rt{animation-name:k-hw310-putty-that-loses-its-water-rtA;animation-delay:var(--wd,0s)}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-sck.s-sckl{animation-name:k-hw310-putty-that-loses-its-water-sckLA}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-st1 .disc{animation-name:k-hw310-putty-that-loses-its-water-st1-disc}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-st2 .disc{animation-name:k-hw310-putty-that-loses-its-water-st2-disc}
.anim .sc-hw310-putty-that-loses-its-water.playing .s-st3 .disc{animation-name:k-hw310-putty-that-loses-its-water-st3-disc}
@keyframes k-hw310-putty-that-loses-its-water-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw310-putty-that-loses-its-water-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw310-putty-that-loses-its-water-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw310-putty-that-loses-its-water-spin{to{transform:rotate(360deg)}}
@keyframes k-hw310-putty-that-loses-its-water-evap{0%,34%{opacity:0;transform:translateY(0)}38%{opacity:.9}52%{opacity:0;transform:translateY(-26px)}53%{transform:translateY(0)}55%{opacity:.9}64%,100%{opacity:0;transform:translateY(-26px)}}
@keyframes k-hw310-putty-that-loses-its-water-redge{0%,72%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw310-putty-that-loses-its-water-finA{0%,66%{opacity:0}71%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw310-putty-that-loses-its-water-whA{0%,3%{opacity:0}7%,64%{opacity:1}80%,97%{opacity:.45}100%{opacity:0}}
@keyframes k-hw310-putty-that-loses-its-water-sckA{0%,34%{opacity:0;transform:translateY(-4px)}40%{opacity:1}56%{opacity:1;transform:translateY(6px)}60%,100%{opacity:0;transform:translateY(6px)}}
@keyframes k-hw310-putty-that-loses-its-water-pcrkA{0%,66%{stroke-dashoffset:60}80%,97%{stroke-dashoffset:0;opacity:1}100%{opacity:0}}
@keyframes k-hw310-putty-that-loses-its-water-dustA{0%,66%{opacity:0}74%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw310-putty-that-loses-its-water-pflkA{0%,72%{opacity:1;transform:none}90%,100%{opacity:0;transform:translate(22px,40px) rotate(60deg)}}
@keyframes k-hw310-putty-that-loses-its-water-lfA{0%,3%{opacity:0;transform:none}7%,36%{opacity:1;transform:none}54%,100%{opacity:0;transform:translateX(-34px)}}
@keyframes k-hw310-putty-that-loses-its-water-rtA{0%,3%{opacity:0;transform:none}7%,36%{opacity:1;transform:none}54%,100%{opacity:0;transform:translateX(40px)}}
@keyframes k-hw310-putty-that-loses-its-water-sckLA{0%,34%{opacity:0;transform:translateX(4px)}40%{opacity:1}56%{opacity:1;transform:translateX(-6px)}60%,100%{opacity:0;transform:translateX(-6px)}}
@keyframes k-hw310-putty-that-loses-its-water-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw310-putty-that-loses-its-water-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw310-putty-that-loses-its-water-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const LOSESWATER_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 200"><g class="s-sun"><circle cx="266" cy="26" r="9"></circle><line x1="266" y1="10" x2="266" y2="13"></line><line x1="266" y1="39" x2="266" y2="42"></line><line x1="250" y1="26" x2="253" y2="26"></line><line x1="279" y1="26" x2="282" y2="26"></line><line x1="255" y1="15" x2="257" y2="17"></line><line x1="275" y1="35" x2="277" y2="37"></line><line x1="255" y1="37" x2="257" y2="35"></line><line x1="275" y1="17" x2="277" y2="15"></line></g><path class="s-ev" d="M152 50c6-4 10 4 16 0" style="--ed:0s"></path><path class="s-ev" d="M152 92c6-4 10 4 16 0" style="--ed:0.2s"></path><path class="s-ev" d="M152 134c6-4 10 4 16 0" style="--ed:0.4s"></path><path class="s-ev" d="M152 172c6-4 10 4 16 0" style="--ed:0.6s"></path><rect x="20" y="20" width="50" height="164" fill="var(--conc)"></rect><rect class="s-plas" x="70" y="20" width="50" height="164"></rect><circle class="s-pit" cx="82" cy="40" r="2" opacity=".5"></circle><circle class="s-pit" cx="104" cy="62" r="2" opacity=".5"></circle><circle class="s-pit" cx="88" cy="88" r="2" opacity=".5"></circle><circle class="s-pit" cx="108" cy="112" r="2" opacity=".5"></circle><circle class="s-pit" cx="84" cy="136" r="2" opacity=".5"></circle><circle class="s-pit" cx="102" cy="160" r="2" opacity=".5"></circle><circle class="s-pit" cx="92" cy="176" r="2" opacity=".5"></circle><rect class="s-putty" x="120" y="20" width="26" height="164"></rect><path class="s-phole" d="M146 140v18l-9-3v-12z"></path><circle class="s-pdust" cx="126" cy="46" r="1.4"></circle><circle class="s-pdust" cx="140" cy="74" r="1.4"></circle><circle class="s-pdust" cx="130" cy="100" r="1.4"></circle><circle class="s-pdust" cx="142" cy="122" r="1.4"></circle><circle class="s-pdust" cx="127" cy="150" r="1.4"></circle><circle class="s-pdust" cx="139" cy="176" r="1.4"></circle><path class="s-pcrk" d="M120 58l8 4 6-4 12 5"></path><path class="s-pcrk" d="M120 104l7-4 8 5 11-3"></path><path class="s-pcrk" d="M120 168l9 3 6-4 11 4"></path><path class="s-pflk" d="M146 140v18l-9-3v-12z"></path><circle class="s-wdot s-wgo s-lf" cx="128" cy="36" r="3" style="--wd:0.00s"></circle><circle class="s-wdot s-wgo s-rt" cx="138" cy="51" r="3" style="--wd:0.08s"></circle><circle class="s-wdot s-wgo s-lf" cx="128" cy="66" r="3" style="--wd:0.16s"></circle><circle class="s-wdot s-wgo s-rt" cx="138" cy="81" r="3" style="--wd:0.24s"></circle><circle class="s-wdot s-wgo s-lf" cx="128" cy="96" r="3" style="--wd:0.32s"></circle><circle class="s-wdot s-wgo s-rt" cx="138" cy="111" r="3" style="--wd:0.40s"></circle><circle class="s-wdot s-wgo s-lf" cx="128" cy="126" r="3" style="--wd:0.48s"></circle><circle class="s-wdot s-wgo s-rt" cx="138" cy="141" r="3" style="--wd:0.56s"></circle><circle class="s-wdot s-wgo s-lf" cx="128" cy="156" r="3" style="--wd:0.64s"></circle><circle class="s-wdot s-wgo s-rt" cx="138" cy="171" r="3" style="--wd:0.72s"></circle><path class="s-sck s-sckl" d="M114 60h-16m5-5-5 5 5 5" style="--ad:0s"></path><path class="s-sck s-sckl" d="M114 104h-16m5-5-5 5 5 5" style="--ad:0.2s"></path><path class="s-sck s-sckl" d="M114 148h-16m5-5-5 5 5 5" style="--ad:0.4s"></path><text class="s-lbl" x="45" y="196" text-anchor="middle">Wall</text><text class="s-lbl" x="95" y="196" text-anchor="middle">Plaster</text><text class="s-lbl" x="133" y="196" text-anchor="middle" style="fill:var(--prod);font-weight:600">Putty</text><text class="s-lname s-badtx s-fin" x="222" y="104" text-anchor="middle">Dries out</text><text class="s-lname s-badtx s-fin" x="222" y="121" text-anchor="middle">before it can set</text><text class="s-lbl s-badtx s-fin" x="222" y="140" text-anchor="middle">Weak, powdery, cracks</text></svg>`;

const LOSESWATER_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Fresh putty goes on a dry, thirsty wall</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>The plaster and the air pull its water out</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The cement can't set. The layer turns weak and cracks</span></li></ol>`;

const RETENTIVITY_STYLE = `.sc-hw310-hw310-90-water-retentivity .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw310-hw310-90-water-retentivity .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw310-hw310-90-water-retentivity .s-lname{font:600 13px var(--font-sans);fill:var(--ink)}
.sc-hw310-hw310-90-water-retentivity .s-okc circle{fill:var(--ok)}
.sc-hw310-hw310-90-water-retentivity .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw310-hw310-90-water-retentivity .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw310-hw310-90-water-retentivity .s-sun circle{fill:var(--gold)}
.sc-hw310-hw310-90-water-retentivity .s-sun line{stroke:var(--gold);stroke-width:2.4;stroke-linecap:round}
.sc-hw310-hw310-90-water-retentivity .s-sun{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-st1{animation-name:k-hw310-hw310-90-water-retentivity-st1}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-st2{animation-name:k-hw310-hw310-90-water-retentivity-st2}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-st3{animation-name:k-hw310-hw310-90-water-retentivity-st3}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-okc{animation-name:k-hw310-hw310-90-water-retentivity-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-sun{animation-name:k-hw310-hw310-90-water-retentivity-spin;animation-duration:14s}
.sc-hw310-hw310-90-water-retentivity .s-txb{fill:var(--cblk)}
.sc-hw310-hw310-90-water-retentivity .s-goodtx{fill:var(--prod);font-weight:600}
.sc-hw310-hw310-90-water-retentivity .s-plas{fill:var(--plas)}
.sc-hw310-hw310-90-water-retentivity .s-putty{fill:var(--putty);stroke:var(--puttys);stroke-width:1.2}
.sc-hw310-hw310-90-water-retentivity .s-pit{fill:var(--pit)}
.sc-hw310-hw310-90-water-retentivity .s-fin{opacity:1}
.sc-hw310-hw310-90-water-retentivity .s-okp{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw310-hw310-90-water-retentivity .s-okp circle{fill:var(--prod)}
.sc-hw310-hw310-90-water-retentivity .s-okp path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw310-hw310-90-water-retentivity .s-wdot{fill:var(--water)}
.sc-hw310-hw310-90-water-retentivity .s-wgo{opacity:0}
.sc-hw310-hw310-90-water-retentivity .s-sck{fill:none;stroke:var(--water);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.sc-hw310-hw310-90-water-retentivity .s-pset{fill:var(--prod);opacity:.22}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-fin{animation-name:k-hw310-hw310-90-water-retentivity-finA}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-okc.s-okp{animation-name:k-hw310-hw310-90-water-retentivity-okP;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-wdot{animation-name:k-hw310-hw310-90-water-retentivity-whA}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-sck{animation-name:k-hw310-hw310-90-water-retentivity-sckA;animation-delay:var(--ad,0s)}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-pset{animation-name:k-hw310-hw310-90-water-retentivity-psetA}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-st1 .disc{animation-name:k-hw310-hw310-90-water-retentivity-st1-disc}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-st2 .disc{animation-name:k-hw310-hw310-90-water-retentivity-st2-disc}
.anim .sc-hw310-hw310-90-water-retentivity.playing .s-st3 .disc{animation-name:k-hw310-hw310-90-water-retentivity-st3-disc}
@keyframes k-hw310-hw310-90-water-retentivity-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw310-hw310-90-water-retentivity-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw310-hw310-90-water-retentivity-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw310-hw310-90-water-retentivity-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw310-hw310-90-water-retentivity-spin{to{transform:rotate(360deg)}}
@keyframes k-hw310-hw310-90-water-retentivity-finA{0%,66%{opacity:0}71%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw310-hw310-90-water-retentivity-okP{0%,66%{opacity:0;transform:scale(.3)}72%,97%{opacity:1;transform:none}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw310-hw310-90-water-retentivity-whA{0%,3%{opacity:0}7%,64%{opacity:1}80%,97%{opacity:.45}100%{opacity:0}}
@keyframes k-hw310-hw310-90-water-retentivity-sckA{0%,34%{opacity:0;transform:translateY(-4px)}40%{opacity:1}56%{opacity:1;transform:translateY(6px)}60%,100%{opacity:0;transform:translateY(6px)}}
@keyframes k-hw310-hw310-90-water-retentivity-psetA{0%,64%{opacity:0}76%,97%{opacity:.22}100%{opacity:0}}
@keyframes k-hw310-hw310-90-water-retentivity-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw310-hw310-90-water-retentivity-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw310-hw310-90-water-retentivity-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const RETENTIVITY_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 200"><g class="s-sun"><circle cx="266" cy="26" r="9"></circle><line x1="266" y1="10" x2="266" y2="13"></line><line x1="266" y1="39" x2="266" y2="42"></line><line x1="250" y1="26" x2="253" y2="26"></line><line x1="279" y1="26" x2="282" y2="26"></line><line x1="255" y1="15" x2="257" y2="17"></line><line x1="275" y1="35" x2="277" y2="37"></line><line x1="255" y1="37" x2="257" y2="35"></line><line x1="275" y1="17" x2="277" y2="15"></line></g><rect x="20" y="20" width="50" height="164" fill="var(--conc)"></rect><rect class="s-plas" x="70" y="20" width="50" height="164"></rect><circle class="s-pit" cx="82" cy="40" r="2" opacity=".5"></circle><circle class="s-pit" cx="104" cy="62" r="2" opacity=".5"></circle><circle class="s-pit" cx="88" cy="88" r="2" opacity=".5"></circle><circle class="s-pit" cx="108" cy="112" r="2" opacity=".5"></circle><circle class="s-pit" cx="84" cy="136" r="2" opacity=".5"></circle><circle class="s-pit" cx="102" cy="160" r="2" opacity=".5"></circle><circle class="s-pit" cx="92" cy="176" r="2" opacity=".5"></circle><rect class="s-putty" x="120" y="20" width="26" height="164"></rect><rect class="s-pset" x="120" y="20" width="26" height="164"></rect><circle class="s-wdot" cx="128" cy="36" r="3"></circle><circle class="s-wdot" cx="138" cy="51" r="3"></circle><circle class="s-wdot" cx="128" cy="66" r="3"></circle><circle class="s-wdot" cx="138" cy="81" r="3"></circle><circle class="s-wdot s-wgo s-lf" cx="128" cy="96" r="3" style="--wd:.3s"></circle><circle class="s-wdot" cx="138" cy="111" r="3"></circle><circle class="s-wdot" cx="128" cy="126" r="3"></circle><circle class="s-wdot" cx="138" cy="141" r="3"></circle><circle class="s-wdot" cx="128" cy="156" r="3"></circle><circle class="s-wdot" cx="138" cy="171" r="3"></circle><path class="s-sck s-sckl" d="M114 96h-16m5-5-5 5 5 5" style="--ad:.3s"></path><text class="s-lbl" x="45" y="196" text-anchor="middle">Wall</text><text class="s-lbl" x="95" y="196" text-anchor="middle">Plaster</text><text class="s-lbl" x="133" y="196" text-anchor="middle" style="fill:var(--prod);font-weight:600">Putty</text><g class="s-okc s-okp"><circle cx="222" cy="80" r="10"></circle><path d="M216.5 80.5l3.8 3.8 7.4-7.8"></path></g><text class="s-lname s-goodtx s-fin" x="222" y="112" text-anchor="middle">Holds 90%</text><text class="s-lname s-goodtx s-fin" x="222" y="129" text-anchor="middle">of its water</text><text class="s-lbl s-goodtx s-fin" x="222" y="148" text-anchor="middle">Sets hard. No water curing</text></svg>`;

const RETENTIVITY_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>HW310 goes on the same wall</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>It holds on to 90% of its water</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The cement sets hard. No water curing is needed</span></li></ol>`;

const STEP5_SVGCARDS = `<div class="svg-cards">${svgCardPlain('Putty that loses its water', 'bad', LOSESWATER_STYLE, LOSESWATER_SVG, LOSESWATER_OL)}${svgCardPlain("HW310 · 90% water retentivity", 'ok', RETENTIVITY_STYLE, RETENTIVITY_SVG, RETENTIVITY_OL)}</div>`;

// --- Step 7 single diagram: Tensile bond test ---
const TENSILE_STYLE = `.sc-hw310-tensile-bond-test .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw310-tensile-bond-test .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw310-tensile-bond-test .s-lname{font:600 13px var(--font-sans);fill:var(--ink)}
.sc-hw310-tensile-bond-test .s-gtr{fill:var(--rule)}
.anim .sc-hw310-tensile-bond-test.playing .s-st1{animation-name:k-hw310-tensile-bond-test-st1}
.anim .sc-hw310-tensile-bond-test.playing .s-st2{animation-name:k-hw310-tensile-bond-test-st2}
.anim .sc-hw310-tensile-bond-test.playing .s-st3{animation-name:k-hw310-tensile-bond-test-st3}
.sc-hw310-tensile-bond-test .s-txb{fill:var(--cblk)}
.sc-hw310-tensile-bond-test .s-goodtx{fill:var(--prod);font-weight:600}
.sc-hw310-tensile-bond-test .s-plas{fill:var(--plas)}
.sc-hw310-tensile-bond-test .s-putty{fill:var(--putty);stroke:var(--puttys);stroke-width:1.2}
.sc-hw310-tensile-bond-test .s-fin{opacity:1}
.sc-hw310-tensile-bond-test .s-gpull{fill:var(--prod);transform-box:fill-box;transform-origin:0 50%;transform:scaleX(var(--s))}
.sc-hw310-tensile-bond-test .s-parr2{fill:none;stroke:var(--prod);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.sc-hw310-tensile-bond-test .s-dol{transform:none}
.sc-hw310-tensile-bond-test .s-glue{fill:var(--gold)}
.sc-hw310-tensile-bond-test .s-brg{fill:none;stroke:var(--ink-2);stroke-width:4;stroke-linejoin:round}
.sc-hw310-tensile-bond-test .s-steelf{fill:var(--steel)}
.anim .sc-hw310-tensile-bond-test.playing .s-fin{animation-name:k-hw310-tensile-bond-test-finA}
.anim .sc-hw310-tensile-bond-test.playing .s-dol{animation-name:k-hw310-tensile-bond-test-dolA;animation-timing-function:cubic-bezier(.3,1.3,.5,1)}
.anim .sc-hw310-tensile-bond-test.playing .s-glue{animation-name:k-hw310-tensile-bond-test-glueA}
.anim .sc-hw310-tensile-bond-test.playing .s-gpull{animation-name:k-hw310-tensile-bond-test-gpA;animation-timing-function:ease-out}
.anim .sc-hw310-tensile-bond-test.playing .s-parr2{animation-name:k-hw310-tensile-bond-test-parA2;animation-delay:var(--pd,0s)}
.anim .sc-hw310-tensile-bond-test.playing .s-st1 .disc{animation-name:k-hw310-tensile-bond-test-st1-disc}
.anim .sc-hw310-tensile-bond-test.playing .s-st2 .disc{animation-name:k-hw310-tensile-bond-test-st2-disc}
.anim .sc-hw310-tensile-bond-test.playing .s-st3 .disc{animation-name:k-hw310-tensile-bond-test-st3-disc}
@keyframes k-hw310-tensile-bond-test-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw310-tensile-bond-test-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw310-tensile-bond-test-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw310-tensile-bond-test-finA{0%,66%{opacity:0}71%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw310-tensile-bond-test-dolA{0%,2%{transform:translateY(-40px);opacity:0}14%,97%{transform:none;opacity:1}100%{transform:translateY(-40px);opacity:0}}
@keyframes k-hw310-tensile-bond-test-glueA{0%,12%{opacity:0}18%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw310-tensile-bond-test-gpA{0%,34%{transform:scaleX(0)}62%,97%{transform:scaleX(var(--s))}100%{transform:scaleX(0)}}
@keyframes k-hw310-tensile-bond-test-parA2{0%,33%{opacity:0;transform:none}37%{opacity:1}44%{transform:translateY(-6px)}50%{transform:none}56%{transform:translateY(-6px)}62%,100%{opacity:0;transform:none}}
@keyframes k-hw310-tensile-bond-test-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw310-tensile-bond-test-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw310-tensile-bond-test-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const TENSILE_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 212">
<text class="s-lbl" x="40" y="13">Bond, N/mm²</text>
<rect class="s-gtr" x="40" y="19" width="220" height="9" rx="4"></rect><rect class="s-gpull" x="40" y="19" width="220" height="9" rx="4" style="--s:.85"></rect>
<text class="s-lbl" x="40" y="42" text-anchor="middle">0</text><text class="s-lbl" x="95" y="42" text-anchor="middle">0.5</text><text class="s-lbl" x="150" y="42" text-anchor="middle">1.0</text><text class="s-lbl" x="205" y="42" text-anchor="middle">1.5</text><text class="s-lbl" x="260" y="42" text-anchor="middle">2.0</text>
<text class="s-lname s-goodtx s-fin" x="227" y="13" text-anchor="middle">1.7</text>
<path class="s-parr2" d="M124 72V54m-6 6 6-6 6 6" style="--pd:0s"></path><path class="s-parr2" d="M176 72V54m-6 6 6-6 6 6" style="--pd:.3s"></path>
<path class="s-brg" d="M96 150V80H204V150"></path><rect x="88" y="148" width="16" height="4" rx="1" fill="var(--ink-2)"></rect><rect x="196" y="148" width="16" height="4" rx="1" fill="var(--ink-2)"></rect>
<rect class="s-glue" x="128" y="146" width="44" height="4"></rect>
<g class="s-dol"><rect class="s-steelf" x="146" y="80" width="8" height="52"></rect><rect class="s-steelf" x="128" y="130" width="44" height="16" rx="2"></rect></g>
<rect class="s-putty" x="40" y="150" width="220" height="8"></rect>
<rect class="s-plas" x="40" y="158" width="220" height="14"></rect>
<rect x="40" y="172" width="220" height="22" fill="var(--conc)"></rect>
<text class="s-lbl" x="236" y="146" text-anchor="middle" style="fill:var(--prod);font-weight:600">HW310</text>
<text class="s-lbl s-goodtx s-fin" x="150" y="208" text-anchor="middle">About 17 kg on every square centimetre</text>
</svg>`;

const TENSILE_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>A steel disc is fixed on the cured putty</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>It is pulled away with rising force</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>HW310's result: 1.7 N/mm², about 17 kg per sq cm</span></li></ol>`;

const STEP7_SVG = `<style>${TENSILE_STYLE}</style><div class="svg-anim anim sc-hw310-tensile-bond-test playing" style="--T:9s">${TENSILE_SVG}${TENSILE_OL}</div>`;

module.exports = {
  productName: 'HW310 Wall Putty',
  productDescription: 'Smooth finished interior and exterior plastered walls with a white, paint-ready surface.',
  topicDescription:
    'Everything a sales, dealer or applicator team member needs to know about HW310 Wall Putty: where it goes, why paint shows every flaw in plaster, the six jobs a putty must do, water retentivity, lab test results, how it compares to Birla White WallCare / JK WallMax / Asian TruCare, mixing and coverage, and application dos and don\'ts.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image',
      title: 'Wall Putty',
      data: {
        text: 'Hard Worker HW310. A white cement-based, fine-grade finish for plastered walls and ceilings, inside and outside. It gives paint a smooth, bright and strong base.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/wall-putty.webp'],
        caption: 'HW310 — Smooth walls. A better paint finish.',
        key: 'HW310 · White Cement-Based Wall Putty',
      },
    },
    {
      type: 'text',
      title: 'Where It Goes',
      data: {
        text: 'Over cement plaster and concrete, on new work and on renovation.<div class="item-grid"><div class="item-card">Interior walls<span class="item-card-check">✓</span></div><div class="item-card">Ceilings<span class="item-card-check">✓</span></div><div class="item-card">Exterior walls and facades<span class="item-card-check">✓</span></div><div class="item-card">Drywall and plasterboard<span class="item-card-check">✓</span></div><div class="item-card">Bathrooms and wet areas<span class="item-card-check">✓</span></div><div class="item-card">Renovating old buildings<span class="item-card-check">✓</span></div></div>',
      },
    },
    {
      type: 'svg',
      title: 'Paint Shows Every Flaw Underneath',
      data: {
        text: 'Plaster is never perfectly flat or closed. It has undulations and open pores. Paint is only a thin film, so it follows whatever it is rolled on.',
        svgMarkup: STEP3_SVGCARDS,
        steps: [
          { title: 'Plaster, fully cured, dry and clean', desc: 'On Eco Plaster HW305, putty can start 10 days after plastering' },
          { title: 'HW310 in two thin coats, 1–1.5 mm in total', desc: 'Lightly sanded' },
          { title: 'Paint', desc: 'As the paint maker specifies' },
        ],
      },
    },
    {
      type: 'knowledge',
      title: 'Knowledge Check — Mix Water',
      data: {
        text: 'How much water goes into a 40 kg bag of HW310?',
        explanation: '35–40% water: 14 to 15 litres per 40 kg bag, mixed with a blender to a lump-free paste.',
        list: ['5–6 L', '10 L', '14–15 L', '20–22 L'],
        correctIndex: 2,
      },
    },
    {
      type: 'card',
      title: 'Six Jobs of a Wall Putty',
      data: {
        text: 'Judge any putty on these six. Each one is measured in the lab, so compare numbers, not claims.',
        badges: [
          { icon: '🧱', label: 'Fill and level thin', sub: 'Close pores and hide undulations in a thin layer · Layer thickness: 1–1.5 mm', tone: 'neutral' },
          { icon: '⏱️', label: 'Stay workable', sub: 'Spread smoothly for as long as the mason needs · Pot life: 60 min', tone: 'neutral' },
          { icon: '💧', label: 'Hold its water', sub: 'Keep water for the cement to set, even on thirsty plaster · Water retentivity · IS 2250: 90%', tone: 'neutral' },
          { icon: '🔗', label: 'Stick to the wall', sub: 'Bond firmly to plaster and give paint a strong base · Tensile adhesion, 28 days: 1.7 N/mm²', tone: 'neutral' },
          { icon: '💪', label: 'Set hard', sub: 'Not soft or powdery when rubbed or sanded · Compressive strength, 28 days: 5.48 N/mm²', tone: 'neutral' },
          { icon: '⚪', label: 'Be bright white', sub: 'A clean white base so the paint shade comes out true · Whiteness, dry: 97.66', tone: 'neutral' },
        ],
      },
    },
    {
      type: 'svg',
      title: 'A Putty Must Hold Its Water',
      data: {
        text: "Cement needs water to set. On a wall, the dry plaster behind and the air in front both pull water out of fresh putty. If the putty lets go of its water too soon, the cement never sets properly.",
        svgMarkup: STEP5_SVGCARDS,
        badges: [
          { icon: '💧', label: '90% water held', tone: 'ok' },
          { icon: '🧪', label: 'Cement sets fully', tone: 'ok' },
          { icon: '💪', label: 'Hard, bonded, crack-resistant', tone: 'ok' },
        ],
      },
    },
    {
      type: 'card',
      title: 'HW310 · White Cement-Based Wall Putty',
      data: {
        text: '',
        badges: [
          { icon: '⚪', label: 'High whiteness', sub: 'A bright base for paint', tone: 'neutral' },
          { icon: '🔗', label: 'Strong paint base', sub: '1.7 N/mm² bond, lab tested', tone: 'neutral' },
          { icon: '🧱', label: 'No water curing', sub: 'Holds 90% of its water', tone: 'neutral' },
          { icon: '🏠', label: 'Inside and outside', sub: 'Walls, ceilings, facades, wet areas', tone: 'neutral' },
          { icon: '🚫', label: 'No primer underneath', sub: 'Goes straight on the plaster', tone: 'neutral' },
          { icon: '📏', label: '200 sq ft per bag', sub: 'Two coats, 1 mm in total', tone: 'neutral' },
          { icon: '✅', label: 'Crack-resistant, low maintenance', sub: 'Smooth, even finish', tone: 'neutral' },
          { icon: '🎨', label: 'Good workability', sub: 'Nil VOC · nil heavy metals', tone: 'neutral' },
          { icon: '🛡️', label: 'Non-hazardous', tone: 'neutral' },
        ],
        tableRows: [
          { label: 'Appearance', value: 'White powder' },
          { label: 'Water', value: '35–40% by weight' },
          { label: 'Pot life', value: '60 minutes' },
          { label: 'Layer', value: '1–1.5 mm, two coats' },
          { label: 'Pack', value: '40 kg bag' },
          { label: 'Shelf life', value: '6 months, sealed' },
        ],
      },
    },
    {
      type: 'svg',
      title: 'Tested by an Independent Lab',
      data: {
        text: 'An independent lab tested HW310 to IS and ASTM methods. What 1.7 N/mm² of bond means on a wall:',
        svgMarkup: STEP7_SVG,
        stats: [
          { value: '90%', label: 'Water retentivity', sub: 'IS 2250' },
          { value: '1.7 N/mm²', label: 'Tensile adhesion, 28 d', sub: 'ASTM C307' },
          { value: '5.48 N/mm²', label: 'Compressive, 28 d', sub: 'ASTM C109' },
          { value: '4.60 N/mm²', label: 'Compressive, 7 d', sub: 'ASTM C109 · keeps gaining' },
          { value: '60 min', label: 'Pot life', sub: 'Workable after mixing' },
          { value: '27 ml/h', label: 'Water absorption, 1 mm', sub: 'IS 2250 · lower is better' },
        ],
      },
    },
    {
      type: 'card',
      title: 'The Whitest of the Four',
      data: {
        text: 'HW310, Birla White WallCare, JK WallMax and Asian Paints TruCare were tested together, by the same methods. HW310 came out the whitest, dry and wet.',
        gauges: [
          { label: 'HW310', sub: 'Powder when rubbed · abrasion test, 3 days · lower is better', valuePct: (2.3 / 5.4) * 100, result: '2.3', highlight: true, showDot: false },
          { label: 'Birla White WallCare', valuePct: 100, result: '5.4', highlight: false, showDot: false },
          { label: 'JK WallMax', valuePct: (3.2 / 5.4) * 100, result: '3.2', highlight: false, showDot: false },
          { label: 'Asian TruCare', valuePct: (2.0 / 5.4) * 100, result: '2.0', highlight: false, showDot: false },
        ],
        table: {
          headers: ['Feature', 'HW310', 'Birla White WallCare', 'JK WallMax', 'Asian TruCare'],
          rows: [
            ['Whiteness, dry', '97.66 (1st)', '96.78', '95.47', '97.63'],
            ['Whiteness, wet', '96.60 (1st)', '95.97', '94.16', '96.29'],
            ['Powder, abrasion 3 d (lower is better)', '2.3', '5.4', '3.2', '2.0'],
            ['Flow lost in 60 min', '6.9%', '6.0%', '7.0%', '8.2%'],
            ['Bond on plaster, 7 d (all broke in the plaster)', '0.54 MPa', '0.52', '0.56', '0.54'],
            ['Coverage at 3 mm', '3.30 sq ft/kg', '3.91', '3.52', '2.98'],
            ['Water demand', '37.5%', '38%', '37.5%', '37.5%'],
          ],
        },
        explanation:
          'Birla White and JK covered more per kg in this test, and Asian TruCare is close to HW310 on whiteness and powdering. Lead with whiteness, low powdering (well ahead of JK and Birla), workability that holds, and the third-party test. On bond, all four broke in the plaster, not in the putty.',
      },
    },
    {
      type: 'card',
      title: 'One Bag, About 14 Litres of Water',
      data: {
        text: '35–40% clean water by weight of powder. Blend in a mechanical mixer to a smooth, lump-free paste, for no more than 5 minutes.',
        stats: [
          { value: '40 kg', label: 'One bag', sub: 'HW310' },
          { value: '14–14.8 L', label: 'Clean water', sub: 'Per bag, 35–37% by weight' },
        ],
        steps: [
          { title: 'Prepare', desc: 'Cured, dry, clean plaster. Fill cracks and holes first. In hot weather pre-wet, no standing water' },
          { title: 'Mix', desc: '35–40% water, mechanical mixer, up to 5 min. Use within 60 min' },
          { title: 'Coat 1', desc: 'Putty blade or steel trowel, thin and even. Dry 6–8 h' },
          { title: 'Coat 2', desc: 'Takes out the remaining undulations. Dry 6–8 h' },
          { title: 'Sand and paint', desc: 'Light sanding, 400–600 grit. No water curing' },
        ],
        calc: {
          mode: 'pack',
          unitLabel: 'sq ft',
          defaultQty: 1000,
          min: 1,
          max: 1000000,
          presetSteps: [500, 1000, 2500, 10000],
          units: [
            { label: 'sq ft', factor: 1 },
            { label: 'sq m', factor: 10.7639 },
          ],
          resultLabel: 'of putty for {qty} {unit}',
          perUnitAmount: 0.2,
          resultUnit: 'kg',
          roundUpGroup: 200,
          packSizes: [40],
          extraRangePct: [0.35, 0.4],
          extraLabel: 'L water',
          note: 'At about 200 sq ft per 40 kg bag, two coats, 1 mm in total (TDS). Add an allowance for site conditions.',
        },
      },
    },
    {
      type: 'card',
      title: 'Straight on the Plaster, Not on Primer',
      data: {
        text: 'HW310 needs no primer underneath. In the lab, every brand bonded far better straight on plaster than on a primed wall.',
        gauges: [
          { label: 'On primer, all brands', sub: 'Bond at 7 days, MPa', valuePct: (0.33 / 0.6) * 100, result: '0.14–0.33', highlight: false, showDot: false },
          { label: 'Straight on plaster, all brands', sub: 'More than 2× the bond straight on plaster', valuePct: 100, result: '0.52–0.60', highlight: true, showDot: false },
        ],
        steps: [
          { title: 'Primer under the putty', desc: 'Putty sits on the primer film — breaks between primer and putty' },
          { title: 'HW310 straight on plaster', desc: 'Bonds directly to the plaster — the plaster gives way before the bond' },
        ],
      },
    },
    {
      type: 'text',
      title: 'Do This, Not That',
      data: {
        text: 'From the method statement and the TDS. Check them on every site visit.',
        badges: [
          { icon: '✗', label: 'Apply on a wet surface', sub: 'Pre-wet only in hot weather, with no standing water', tone: 'bad' },
          { icon: '✗', label: 'Add water to setting putty', sub: "Don't re-mix it; mix only what you use in 60 min", tone: 'bad' },
          { icon: '✗', label: 'Add anything to the mix', sub: 'No foreign materials', tone: 'bad' },
          { icon: '✗', label: 'Go too thick', sub: '1–1.5 mm in total, in two coats', tone: 'bad' },
          { icon: '✓', label: 'Repair cracks and holes first', sub: 'Remove loose plaster, dust, oil and old coatings', tone: 'ok' },
          { icon: '✓', label: 'Keep out of sun and strong wind', sub: 'They dry the putty too fast', tone: 'ok' },
          { icon: '✓', label: 'Keep it dry while it dries', sub: 'No water curing is needed', tone: 'ok' },
          { icon: '✓', label: 'Wear gloves, mask and goggles', sub: 'Avoid breathing the dust', tone: 'ok' },
        ],
      },
    },
    {
      type: 'knowledge',
      title: 'Scenario: On Site',
      data: {
        text: 'On site: The Short Bucket — A mason mixes a full 40 kg bag of HW310 with a single 10 litre bucket of water to make it "stiffer". A mason mixes a 40 kg bag of HW310 with only 10 litres of water. What issue may occur?',
        explanation: 'HW310 needs 14–15 L of water per 40 kg for proper consistency and spread. Too little water gives poor spread and workability.',
        list: ['Poor spread and workability', 'Weak bond strength', 'Overly smooth surface', 'Quick drying'],
        correctIndex: 0,
      },
    },
    {
      type: 'card',
      title: 'Cheat Sheet',
      data: {
        text: 'HW310 at a glance. Check it before a visit.',
        sections: [
          { label: 'Wall Putty HW310', text: 'White cement-based, fine-grade wall putty' },
          { label: 'What it is', text: 'A white cement-based finish over plastered walls and ceilings, inside and outside. It closes pores and levels undulations so paint goes on a smooth, bright, strong base.' },
          { label: 'Six jobs', text: 'Fill thin (1–1.5 mm) · stay workable (60 min) · hold water (90%) · stick (1.7 N/mm²) · set hard (5.48 N/mm²) · be white (97.66)' },
          { label: 'USPs', text: '97.66 whiteness, highest in the side-by-side test · 1.7 N/mm² bond, lab tested · No water curing; no primer underneath · Interior, exterior, ceilings, drywall, wet areas · Nil VOC, nil heavy metals, non-hazardous' },
          { label: 'Against competitors', text: 'Whitest of HW310, Birla White WallCare, JK WallMax and Asian TruCare, dry and wet. Among the lowest powdering with Asian TruCare (2.3 and 2.0), well ahead of JK (3.2) and Birla (5.4). Second-lowest flow loss in 60 min (6.9%; Birla 6.0%). Bond on plaster on par; all broke in the plaster. Birla and JK covered more per kg.' },
          { label: 'How to use', text: '35–40% water (14–16 L per bag), mechanical mixer, up to 5 min, use within 60 min. Two thin coats, 6–8 h apart. Sand with 400–600 grit. No water curing.' },
          { label: 'Coverage', text: 'About 200 sq ft per 40 kg bag, two coats, 1 mm in total' },
          { label: 'Never', text: 'Apply on a wet surface · add water to setting putty · add anything to the mix · prime under the putty' },
          { label: 'Pack', text: '40 kg bag. 6-month shelf life, sealed, dry and shaded.' },
        ],
      },
    },
  ],
};
