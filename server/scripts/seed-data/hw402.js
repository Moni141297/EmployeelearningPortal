/*
 * HW402 "Anchoring Grout" — extracted verbatim from
 * https://hw-learning-hub-v2.vercel.app/products/anchoring-grout-hw402 (16 learn steps,
 * final assessment 5 questions / pass 70%). Inline knowledge checks are split into their
 * own slides right after the content slide they appeared on (PRD §2 row 5).
 */

function svgCardPlain(title, verdictClass, style, svgOuterHtml, olOuterHtml) {
  const titleCls = verdictClass ? ` ${verdictClass}` : '';
  const statusHtml = verdictClass ? `<span class="svg-card-status ${verdictClass}">${verdictClass === 'ok' ? '✓' : '✗'}</span>` : '';
  return `<div class="svg-card"><div class="svg-card-head"><span class="svg-card-title${titleCls}">${statusHtml}${title}</span><label class="svg-card-replay"><input type="checkbox" data-replay/>Replay</label></div><style>${style}</style><div class="svg-anim anim playing" style="--T:10s">${svgOuterHtml}${olOuterHtml || ''}</div></div>`;
}

// --- Step 2 diagrams: Site cement-sand mortar (bad) / HW402 non-shrink grout (ok) ---
const S2A_STYLE = `.sc-hw402-site-cement-sand-mortar .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw402-site-cement-sand-mortar .s-cc{fill:var(--conc)}
.sc-hw402-site-cement-sand-mortar .s-mor{fill:var(--mor)}
.sc-hw402-site-cement-sand-mortar .s-stl{fill:var(--steel)}
.sc-hw402-site-cement-sand-mortar .s-vd{fill:var(--void)}
.sc-hw402-site-cement-sand-mortar .s-wt{fill:var(--water)}
.sc-hw402-site-cement-sand-mortar .s-crk{fill:none;stroke:var(--crack);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:60;stroke-dashoffset:0}
.sc-hw402-site-cement-sand-mortar .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw402-site-cement-sand-mortar .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw402-site-cement-sand-mortar .s-badtx{font:600 11.5px var(--font-sans);fill:var(--neg)}
.sc-hw402-site-cement-sand-mortar .s-nok circle{fill:var(--neg)}
.sc-hw402-site-cement-sand-mortar .s-nok path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round}
.sc-hw402-site-cement-sand-mortar .s-nok{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw402-site-cement-sand-mortar .s-capA{opacity:0}
.sc-hw402-site-cement-sand-mortar .s-capB{opacity:0}
.sc-hw402-site-cement-sand-mortar .s-capC{opacity:1}
.sc-hw402-site-cement-sand-mortar .s-drop{fill:var(--water);opacity:0}
.sc-hw402-site-cement-sand-mortar .s-filly{transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-st1{animation-name:k-hw402-site-cement-sand-mortar-st1}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-st2{animation-name:k-hw402-site-cement-sand-mortar-st2}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-st3{animation-name:k-hw402-site-cement-sand-mortar-st3}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-capA{animation-name:k-hw402-site-cement-sand-mortar-capA}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-capB{animation-name:k-hw402-site-cement-sand-mortar-capB}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-capC{animation-name:k-hw402-site-cement-sand-mortar-capC}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-late{animation-name:k-hw402-site-cement-sand-mortar-late}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-pourY{animation-name:k-hw402-site-cement-sand-mortar-pourY;animation-timing-function:ease-out}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-bleed{animation-name:k-hw402-site-cement-sand-mortar-bleed;animation-delay:var(--bd,0s)}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-settle{animation-name:k-hw402-site-cement-sand-mortar-settle}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-gap{animation-name:k-hw402-site-cement-sand-mortar-gapIn}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-crk{animation-name:k-hw402-site-cement-sand-mortar-crk}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-pond{animation-name:k-hw402-site-cement-sand-mortar-pond}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-drop{animation-name:k-hw402-site-cement-sand-mortar-drip;animation-delay:var(--dd,0s)}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-nok{animation-name:k-hw402-site-cement-sand-mortar-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-st1 .disc{animation-name:k-hw402-site-cement-sand-mortar-st1-disc}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-st2 .disc{animation-name:k-hw402-site-cement-sand-mortar-st2-disc}
.anim .sc-hw402-site-cement-sand-mortar.playing .s-st3 .disc{animation-name:k-hw402-site-cement-sand-mortar-st3-disc}
@keyframes k-hw402-site-cement-sand-mortar-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw402-site-cement-sand-mortar-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw402-site-cement-sand-mortar-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw402-site-cement-sand-mortar-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw402-site-cement-sand-mortar-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw402-site-cement-sand-mortar-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-site-cement-sand-mortar-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-site-cement-sand-mortar-pourY{0%{transform:scaleY(0)}24%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw402-site-cement-sand-mortar-bleed{0%,34%{opacity:0;transform:translateY(8px)}40%{opacity:1}56%{opacity:1;transform:translateY(-6px)}62%,100%{opacity:0;transform:translateY(-10px)}}
@keyframes k-hw402-site-cement-sand-mortar-settle{0%,36%{transform:none}60%,97%{transform:translateY(5px)}100%{transform:none}}
@keyframes k-hw402-site-cement-sand-mortar-gapIn{0%,64%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-site-cement-sand-mortar-crk{0%,66%{stroke-dashoffset:60}80%,97%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
@keyframes k-hw402-site-cement-sand-mortar-pond{0%,62%{opacity:0}68%,97%{opacity:.85}100%{opacity:0}}
@keyframes k-hw402-site-cement-sand-mortar-drip{0%,70%{opacity:0;transform:translateY(0)}72%{opacity:1}82%{opacity:1;transform:translateY(var(--dy,40px))}84%,100%{opacity:0;transform:translateY(var(--dy,40px))}}
@keyframes k-hw402-site-cement-sand-mortar-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw402-site-cement-sand-mortar-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw402-site-cement-sand-mortar-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw402-site-cement-sand-mortar-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S2A_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214">
          <rect x="20" y="62" width="260" height="130" rx="3" class="s-cc"></rect>
          <rect x="110" y="62" width="80" height="100" class="s-vd"></rect>
          <g class="s-settle"><rect x="110" y="66" width="80" height="96" class="s-mor s-filly s-pourY"></rect></g>
          <rect x="110" y="66" width="4" height="96" class="s-vd s-gap"></rect><rect x="186" y="66" width="4" height="96" class="s-vd s-gap"></rect>
          <rect x="141" y="70" width="3" height="92" class="s-vd s-gap"></rect><rect x="156" y="70" width="3" height="92" class="s-vd s-gap"></rect>
          <path class="s-crk" d="M118 110l8 6-4 8 7 7M180 96l-6 8 5 6-6 9"></path>
          <rect x="144" y="30" width="12" height="130" class="s-stl"></rect><rect x="138" y="40" width="24" height="9" rx="2" class="s-stl"></rect>
          <g><circle class="s-wt s-bleed" style="--bd:0s" cx="122" cy="72" r="2.6"></circle><circle class="s-wt s-bleed" style="--bd:.4s" cx="134" cy="72" r="2.6"></circle><circle class="s-wt s-bleed" style="--bd:.2s" cx="170" cy="72" r="2.6"></circle><circle class="s-wt s-bleed" style="--bd:.6s" cx="182" cy="72" r="2.6"></circle></g>
          <rect x="20" y="56" width="260" height="6" class="s-wt s-pond"></rect>
          <circle class="s-drop" style="--dy:84px;--dd:0s" cx="112" cy="70" r="2.4"></circle><circle class="s-drop" style="--dy:84px;--dd:.3s" cx="188" cy="70" r="2.4"></circle><circle class="s-drop" style="--dy:80px;--dd:.15s" cx="142.5" cy="72" r="2"></circle>
          <text class="s-lbl" x="26" y="186">Concrete</text>
          <text class="s-lbl" x="196" y="40">Anchor bolt</text>
          <text class="s-lblb s-capA" x="150" y="20" text-anchor="middle">1 · Pocket packed with site mortar</text>
          <text class="s-lblb s-capB" x="150" y="20" text-anchor="middle">2 · Water bleeds out, the mix settles</text>
          <text class="s-lblb s-capC" x="150" y="20" text-anchor="middle">3 · Dries, shrinks off the walls and bolt</text>
          <g transform="translate(262 88)"><g class="s-nok"><circle r="11"></circle><path d="M-4.5-4.5l9 9M4.5-4.5l-9 9"></path></g></g>
          <text class="s-badtx s-late" x="150" y="208" text-anchor="middle">Gaps and hairline cracks: a path for water.</text>
        </svg>`;

const S2B_STYLE = `.sc-hw402-hw402-non-shrink-grout .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw402-hw402-non-shrink-grout .s-cc{fill:var(--conc)}
.sc-hw402-hw402-non-shrink-grout .s-grt{fill:var(--grout);opacity:.88}
.sc-hw402-hw402-non-shrink-grout .s-stl{fill:var(--steel)}
.sc-hw402-hw402-non-shrink-grout .s-vd{fill:var(--void)}
.sc-hw402-hw402-non-shrink-grout .s-wt{fill:var(--water)}
.sc-hw402-hw402-non-shrink-grout .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw402-hw402-non-shrink-grout .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw402-hw402-non-shrink-grout .s-goodtx{font:600 11.5px var(--font-sans);fill:var(--pc)}
.sc-hw402-hw402-non-shrink-grout .s-okc circle{fill:var(--pc)}
.sc-hw402-hw402-non-shrink-grout .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw402-hw402-non-shrink-grout .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw402-hw402-non-shrink-grout .s-capA{opacity:0}
.sc-hw402-hw402-non-shrink-grout .s-capB{opacity:0}
.sc-hw402-hw402-non-shrink-grout .s-capC{opacity:1}
.sc-hw402-hw402-non-shrink-grout .s-tick2{fill:none;stroke:var(--pc);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.sc-hw402-hw402-non-shrink-grout .s-filly{transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-st1{animation-name:k-hw402-hw402-non-shrink-grout-st1}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-st2{animation-name:k-hw402-hw402-non-shrink-grout-st2}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-st3{animation-name:k-hw402-hw402-non-shrink-grout-st3}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-capA{animation-name:k-hw402-hw402-non-shrink-grout-capA}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-capB{animation-name:k-hw402-hw402-non-shrink-grout-capB}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-capC{animation-name:k-hw402-hw402-non-shrink-grout-capC}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-late{animation-name:k-hw402-hw402-non-shrink-grout-late}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-pourY{animation-name:k-hw402-hw402-non-shrink-grout-pourY;animation-timing-function:ease-out}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-pond{animation-name:k-hw402-hw402-non-shrink-grout-pond}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-okc{animation-name:k-hw402-hw402-non-shrink-grout-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-tick2{animation-name:k-hw402-hw402-non-shrink-grout-tickIn;animation-delay:var(--td,0s)}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-st1 .disc{animation-name:k-hw402-hw402-non-shrink-grout-st1-disc}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-st2 .disc{animation-name:k-hw402-hw402-non-shrink-grout-st2-disc}
.anim .sc-hw402-hw402-non-shrink-grout.playing .s-st3 .disc{animation-name:k-hw402-hw402-non-shrink-grout-st3-disc}
@keyframes k-hw402-hw402-non-shrink-grout-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw402-hw402-non-shrink-grout-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw402-hw402-non-shrink-grout-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw402-hw402-non-shrink-grout-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw402-hw402-non-shrink-grout-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw402-hw402-non-shrink-grout-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-hw402-non-shrink-grout-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-hw402-non-shrink-grout-pourY{0%{transform:scaleY(0)}24%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw402-hw402-non-shrink-grout-pond{0%,62%{opacity:0}68%,97%{opacity:.85}100%{opacity:0}}
@keyframes k-hw402-hw402-non-shrink-grout-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw402-hw402-non-shrink-grout-tickIn{0%,66%{opacity:0}72%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-hw402-non-shrink-grout-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw402-hw402-non-shrink-grout-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw402-hw402-non-shrink-grout-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S2B_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214">
          <rect x="20" y="62" width="260" height="130" rx="3" class="s-cc"></rect>
          <rect x="110" y="62" width="80" height="100" class="s-vd"></rect>
          <rect x="110" y="62" width="80" height="100" class="s-grt s-filly s-pourY"></rect>
          <rect x="144" y="30" width="12" height="130" class="s-stl"></rect><rect x="138" y="40" width="24" height="9" rx="2" class="s-stl"></rect>
          <path class="s-tick2" style="--td:0s" d="M100 96l4 4 7-8"></path><path class="s-tick2" style="--td:.15s" d="M193 96l4 4 7-8"></path><path class="s-tick2" style="--td:.3s" d="M100 136l4 4 7-8"></path><path class="s-tick2" style="--td:.45s" d="M193 136l4 4 7-8"></path>
          <rect x="20" y="56" width="260" height="6" class="s-wt s-pond"></rect>
          <text class="s-lbl" x="26" y="186">Concrete</text>
          <text class="s-lbl" x="196" y="40">Anchor bolt</text>
          <text class="s-lblb s-capA" x="150" y="20" text-anchor="middle">1 · HW402 poured, flows into every corner</text>
          <text class="s-lblb s-capB" x="150" y="20" text-anchor="middle">2 · Shrinkage-compensated: holds its volume</text>
          <text class="s-lblb s-capC" x="150" y="20" text-anchor="middle">3 · Full contact with the walls and the bolt</text>
          <g transform="translate(262 88)"><g class="s-okc"><circle r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g>
          <text class="s-goodtx s-late" x="150" y="208" text-anchor="middle">Shrinkage nil (IS 1727). No gap, no path for water.</text>
        </svg>`;

const STEP2_SVGCARDS = `<div class="svg-cards">${svgCardPlain('Site cement-sand mortar', 'bad', S2A_STYLE, S2A_SVG)}${svgCardPlain('HW402 non-shrink grout', 'ok', S2B_STYLE, S2B_SVG)}</div>`;

// --- Step 3 diagrams: Packed with site mortar (bad) / Poured with HW402 (ok) ---
const S3A_STYLE = `.sc-hw402-packed-with-site-mortar .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw402-packed-with-site-mortar .s-cc{fill:var(--conc)}
.sc-hw402-packed-with-site-mortar .s-mor{fill:var(--mor)}
.sc-hw402-packed-with-site-mortar .s-stl{fill:var(--steel)}
.sc-hw402-packed-with-site-mortar .s-vd{fill:var(--void)}
.sc-hw402-packed-with-site-mortar .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw402-packed-with-site-mortar .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw402-packed-with-site-mortar .s-badtx{font:600 11.5px var(--font-sans);fill:var(--neg)}
.sc-hw402-packed-with-site-mortar .s-ldar{fill:none;stroke:var(--ink);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.sc-hw402-packed-with-site-mortar .s-ldar.s-hwa{stroke:var(--pc)}
.sc-hw402-packed-with-site-mortar .s-nok circle{fill:var(--neg)}
.sc-hw402-packed-with-site-mortar .s-nok path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round}
.sc-hw402-packed-with-site-mortar .s-nok{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw402-packed-with-site-mortar .s-capA{opacity:0}
.sc-hw402-packed-with-site-mortar .s-capB{opacity:0}
.sc-hw402-packed-with-site-mortar .s-capC{opacity:1}
.sc-hw402-packed-with-site-mortar .s-filly{transform-box:fill-box;transform-origin:50% 100%}
.sc-hw402-packed-with-site-mortar .s-rock{transform-box:view-box}
.anim .sc-hw402-packed-with-site-mortar.playing .s-st1{animation-name:k-hw402-packed-with-site-mortar-st1}
.anim .sc-hw402-packed-with-site-mortar.playing .s-st2{animation-name:k-hw402-packed-with-site-mortar-st2}
.anim .sc-hw402-packed-with-site-mortar.playing .s-st3{animation-name:k-hw402-packed-with-site-mortar-st3}
.anim .sc-hw402-packed-with-site-mortar.playing .s-capA{animation-name:k-hw402-packed-with-site-mortar-capA}
.anim .sc-hw402-packed-with-site-mortar.playing .s-capB{animation-name:k-hw402-packed-with-site-mortar-capB}
.anim .sc-hw402-packed-with-site-mortar.playing .s-capC{animation-name:k-hw402-packed-with-site-mortar-capC}
.anim .sc-hw402-packed-with-site-mortar.playing .s-late{animation-name:k-hw402-packed-with-site-mortar-late}
.anim .sc-hw402-packed-with-site-mortar.playing .s-pourY{animation-name:k-hw402-packed-with-site-mortar-pourY;animation-timing-function:ease-out}
.anim .sc-hw402-packed-with-site-mortar.playing .s-gap{animation-name:k-hw402-packed-with-site-mortar-gapIn}
.anim .sc-hw402-packed-with-site-mortar.playing .s-nok{animation-name:k-hw402-packed-with-site-mortar-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw402-packed-with-site-mortar.playing .s-rock{animation-name:k-hw402-packed-with-site-mortar-rock}
.anim .sc-hw402-packed-with-site-mortar.playing .s-ldin{animation-name:k-hw402-packed-with-site-mortar-ldin}
.anim .sc-hw402-packed-with-site-mortar.playing .s-vd2{animation-name:k-hw402-packed-with-site-mortar-voidIn}
.anim .sc-hw402-packed-with-site-mortar.playing .s-st1 .disc{animation-name:k-hw402-packed-with-site-mortar-st1-disc}
.anim .sc-hw402-packed-with-site-mortar.playing .s-st2 .disc{animation-name:k-hw402-packed-with-site-mortar-st2-disc}
.anim .sc-hw402-packed-with-site-mortar.playing .s-st3 .disc{animation-name:k-hw402-packed-with-site-mortar-st3-disc}
@keyframes k-hw402-packed-with-site-mortar-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw402-packed-with-site-mortar-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw402-packed-with-site-mortar-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw402-packed-with-site-mortar-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw402-packed-with-site-mortar-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw402-packed-with-site-mortar-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-packed-with-site-mortar-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-packed-with-site-mortar-pourY{0%{transform:scaleY(0)}24%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw402-packed-with-site-mortar-gapIn{0%,64%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-packed-with-site-mortar-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw402-packed-with-site-mortar-rock{0%,66%{transform:none}70%{transform:rotate(-1.6deg)}74%{transform:rotate(1.4deg)}78%{transform:rotate(-1.6deg)}82%{transform:rotate(1.4deg)}86%{transform:rotate(-1.2deg)}90%,100%{transform:none}}
@keyframes k-hw402-packed-with-site-mortar-ldin{0%,62%{opacity:0;transform:translateY(-10px)}68%,97%{opacity:1;transform:none}100%{opacity:0}}
@keyframes k-hw402-packed-with-site-mortar-voidIn{0%,32%{opacity:0}40%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-packed-with-site-mortar-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw402-packed-with-site-mortar-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw402-packed-with-site-mortar-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S3A_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214">
          <rect x="20" y="122" width="260" height="72" rx="3" class="s-cc"></rect>
          <rect x="60" y="104" width="180" height="18" class="s-mor s-filly s-pourY"></rect>
          <ellipse cx="98" cy="112" rx="12" ry="5" class="s-vd s-vd2"></ellipse><ellipse cx="158" cy="110" rx="16" ry="5" class="s-vd s-vd2"></ellipse><ellipse cx="212" cy="113" rx="10" ry="4" class="s-vd s-vd2"></ellipse>
          <rect x="60" y="102" width="180" height="4" class="s-vd s-gap"></rect>
          <g class="s-rock" style="transform-origin:150px 97px">
            <rect x="126" y="36" width="48" height="56" rx="2" class="s-stl" opacity=".7"></rect>
            <rect x="60" y="92" width="180" height="10" rx="1" class="s-stl"></rect>
            <path class="s-ldar s-ldin" d="M100 58v26m-7-7l7 7 7-7"></path><path class="s-ldar s-ldin" d="M200 58v26m-7-7l7 7 7-7"></path>
          </g>
          <rect x="70" y="102" width="12" height="20" class="s-stl" opacity=".55"></rect><rect x="218" y="102" width="12" height="20" class="s-stl" opacity=".55"></rect>
          <text class="s-lbl" x="26" y="188">Foundation</text><text class="s-lbl" x="246" y="100">Base plate</text>
          <text class="s-lblb s-capA" x="150" y="20" text-anchor="middle">1 · Stiff mortar rammed in</text>
          <text class="s-lblb s-capB" x="150" y="20" text-anchor="middle">2 · Voids it can't reach</text>
          <text class="s-lblb s-capC" x="150" y="20" text-anchor="middle">3 · Shrinks; the plate rocks under load</text>
          <g transform="translate(266 50)"><g class="s-nok"><circle r="11"></circle><path d="M-4.5-4.5l9 9M4.5-4.5l-9 9"></path></g></g>
          <text class="s-badtx s-late" x="150" y="208" text-anchor="middle">Load rides on a few high spots. Plate loosens.</text>
        </svg>`;

const S3B_STYLE = `.sc-hw402-poured-with-hw402 .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw402-poured-with-hw402 .s-cc{fill:var(--conc)}
.sc-hw402-poured-with-hw402 .s-grt{fill:var(--grout);opacity:.88}
.sc-hw402-poured-with-hw402 .s-stl{fill:var(--steel)}
.sc-hw402-poured-with-hw402 .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw402-poured-with-hw402 .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw402-poured-with-hw402 .s-goodtx{font:600 11.5px var(--font-sans);fill:var(--pc)}
.sc-hw402-poured-with-hw402 .s-ldar{fill:none;stroke:var(--ink);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.sc-hw402-poured-with-hw402 .s-ldar.s-hwa{stroke:var(--pc)}
.sc-hw402-poured-with-hw402 .s-okc circle{fill:var(--pc)}
.sc-hw402-poured-with-hw402 .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw402-poured-with-hw402 .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw402-poured-with-hw402 .s-capA{opacity:0}
.sc-hw402-poured-with-hw402 .s-capB{opacity:0}
.sc-hw402-poured-with-hw402 .s-capC{opacity:1}
.sc-hw402-poured-with-hw402 .s-hop{fill:none;stroke:var(--ink-2);stroke-width:2;stroke-linejoin:round}
.sc-hw402-poured-with-hw402 .s-fillx{transform-box:fill-box;transform-origin:0 50%}
.sc-hw402-poured-with-hw402 .s-filly{transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw402-poured-with-hw402.playing .s-st1{animation-name:k-hw402-poured-with-hw402-st1}
.anim .sc-hw402-poured-with-hw402.playing .s-st2{animation-name:k-hw402-poured-with-hw402-st2}
.anim .sc-hw402-poured-with-hw402.playing .s-st3{animation-name:k-hw402-poured-with-hw402-st3}
.anim .sc-hw402-poured-with-hw402.playing .s-capA{animation-name:k-hw402-poured-with-hw402-capA}
.anim .sc-hw402-poured-with-hw402.playing .s-capB{animation-name:k-hw402-poured-with-hw402-capB}
.anim .sc-hw402-poured-with-hw402.playing .s-capC{animation-name:k-hw402-poured-with-hw402-capC}
.anim .sc-hw402-poured-with-hw402.playing .s-late{animation-name:k-hw402-poured-with-hw402-late}
.anim .sc-hw402-poured-with-hw402.playing .s-pourY{animation-name:k-hw402-poured-with-hw402-pourY;animation-timing-function:ease-out}
.anim .sc-hw402-poured-with-hw402.playing .s-pourX{animation-name:k-hw402-poured-with-hw402-pourX;animation-timing-function:ease-out}
.anim .sc-hw402-poured-with-hw402.playing .s-okc{animation-name:k-hw402-poured-with-hw402-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw402-poured-with-hw402.playing .s-ldin{animation-name:k-hw402-poured-with-hw402-ldin}
.anim .sc-hw402-poured-with-hw402.playing .s-spread{animation-name:k-hw402-poured-with-hw402-spread;animation-delay:var(--sd,0s)}
.anim .sc-hw402-poured-with-hw402.playing .s-st1 .disc{animation-name:k-hw402-poured-with-hw402-st1-disc}
.anim .sc-hw402-poured-with-hw402.playing .s-st2 .disc{animation-name:k-hw402-poured-with-hw402-st2-disc}
.anim .sc-hw402-poured-with-hw402.playing .s-st3 .disc{animation-name:k-hw402-poured-with-hw402-st3-disc}
.sc-hw402-poured-with-hw402 .s-front{opacity:0}.anim .sc-hw402-poured-with-hw402.playing .s-hlev{animation-name:k-hw402-poured-with-hw402-hlev}.anim .sc-hw402-poured-with-hw402.playing .s-pourX{animation-name:k-hw402-poured-with-hw402-flowX;animation-timing-function:linear}.anim .sc-hw402-poured-with-hw402.playing .s-front{animation-name:k-hw402-poured-with-hw402-front;animation-timing-function:linear}@keyframes k-hw402-poured-with-hw402-hlev{0%,8%{transform:none}60%,97%{transform:translateY(24px)}100%{transform:none}}@keyframes k-hw402-poured-with-hw402-flowX{0%,8%{transform:scaleX(0)}60%,97%{transform:scaleX(1)}100%{transform:scaleX(0)}}@keyframes k-hw402-poured-with-hw402-front{0%,7%{opacity:0;transform:none}8%{opacity:1;transform:none}60%{opacity:1;transform:translateX(232px)}63%,100%{opacity:0;transform:translateX(232px)}}
@keyframes k-hw402-poured-with-hw402-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw402-poured-with-hw402-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw402-poured-with-hw402-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw402-poured-with-hw402-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw402-poured-with-hw402-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw402-poured-with-hw402-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-poured-with-hw402-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-poured-with-hw402-pourY{0%{transform:scaleY(0)}24%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw402-poured-with-hw402-pourX{0%,4%{transform:scaleX(0)}46%,97%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes k-hw402-poured-with-hw402-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw402-poured-with-hw402-ldin{0%,62%{opacity:0;transform:translateY(-10px)}68%,97%{opacity:1;transform:none}100%{opacity:0}}
@keyframes k-hw402-poured-with-hw402-spread{0%,66%{opacity:0;transform:translateY(-6px)}72%{opacity:1}88%{opacity:1;transform:translateY(8px)}92%,100%{opacity:0;transform:translateY(8px)}}
@keyframes k-hw402-poured-with-hw402-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw402-poured-with-hw402-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw402-poured-with-hw402-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S3B_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214">
          <rect x="20" y="122" width="260" height="72" rx="3" class="s-cc"></rect>
          <path class="s-hop" d="M22 62h34l-8 40h-18z"></path><path class="s-hop" d="M262 84v38"></path>
          <rect x="30" y="102" width="232" height="20" class="s-grt s-fillx s-pourX"></rect><ellipse cx="30" cy="112" rx="5" ry="10" class="s-grt s-front"></ellipse>
          <clipPath id="hw402-poured-with-hw402-hopc"><path d="M24 64H54L47 102H31Z"></path></clipPath><g clip-path="url(#hw402-poured-with-hw402-hopc)"><rect x="20" y="64" width="40" height="40" class="s-grt s-hlev"></rect></g>
          <rect x="126" y="36" width="48" height="56" rx="2" class="s-stl" opacity=".7"></rect>
          <rect x="60" y="92" width="180" height="10" rx="1" class="s-stl"></rect>
          <rect x="70" y="102" width="12" height="20" class="s-stl" opacity=".55"></rect><rect x="218" y="102" width="12" height="20" class="s-stl" opacity=".55"></rect>
          <path class="s-ldar s-hwa s-ldin" d="M100 58v26m-7-7l7 7 7-7"></path><path class="s-ldar s-hwa s-ldin" d="M200 58v26m-7-7l7 7 7-7"></path>
          <g><path class="s-ldar s-hwa s-spread" style="--sd:0s" d="M96 128v12m-4-4l4 4 4-4"></path><path class="s-ldar s-hwa s-spread" style="--sd:.1s" d="M132 128v12m-4-4l4 4 4-4"></path><path class="s-ldar s-hwa s-spread" style="--sd:.2s" d="M168 128v12m-4-4l4 4 4-4"></path><path class="s-ldar s-hwa s-spread" style="--sd:.3s" d="M204 128v12m-4-4l4 4 4-4"></path></g>
          <text class="s-lbl" x="26" y="188">Foundation</text><text class="s-lbl" x="20" y="56">Hopper</text>
          <text class="s-lblb s-capA" x="160" y="20" text-anchor="middle">1 · Poured from one side, with a grout head</text>
          <text class="s-lblb s-capB" x="160" y="20" text-anchor="middle">2 · Flows under the whole plate</text>
          <text class="s-lblb s-capC" x="160" y="20" text-anchor="middle">3 · Load spreads evenly</text>
          <g transform="translate(272 50)"><g class="s-okc"><circle r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g>
          <text class="s-goodtx s-late" x="150" y="208" text-anchor="middle">Void-free, full-area support.</text>
        </svg>`;

const STEP3_SVGCARDS = `<div class="svg-cards">${svgCardPlain('Packed with site mortar', 'bad', S3A_STYLE, S3A_SVG)}${svgCardPlain('Poured with HW402', 'ok', S3B_STYLE, S3B_SVG)}</div>`;

// --- Step 7 diagrams: Grout with voids (bad) / HW402 full contact (ok) ---
const S7A_STYLE = `.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-cc{fill:var(--conc)}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-mor{fill:var(--mor)}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-stl{fill:var(--steel)}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-vd{fill:var(--void)}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-crk{fill:none;stroke:var(--crack);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:60;stroke-dashoffset:0}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-badtx{font:600 11.5px var(--font-sans);fill:var(--neg)}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-nok circle{fill:var(--neg)}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-nok path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-nok{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-capA{opacity:0}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-capB{opacity:0}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-capC{opacity:1}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-wave{fill:none;stroke:var(--gold);stroke-width:2;stroke-linecap:round;opacity:.9}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-st1{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-st1}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-st2{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-st2}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-st3{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-st3}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-capA{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-capA}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-capB{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-capB}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-capC{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-capC}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-late{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-late}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-crk{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-crk}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-nok{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-ham{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-ham;animation-duration:.36s}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-spin{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-spin;animation-duration:.9s;transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-wave{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-wavef;animation-duration:1.2s;animation-delay:var(--wd,0s)}
.sc-hw402-grout-with-voids-or-a-shrinkage-gap .s-wave{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-crkg{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-crkg;stroke-dasharray:60}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-nutup{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-nutup}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-st1 .disc{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-st1-disc}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-st2 .disc{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-st2-disc}
.anim .sc-hw402-grout-with-voids-or-a-shrinkage-gap.playing .s-st3 .disc{animation-name:k-hw402-grout-with-voids-or-a-shrinkage-gap-st3-disc}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-crk{0%,66%{stroke-dashoffset:60}80%,97%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-ham{0%,100%{transform:translateY(0)}40%{transform:translateY(-4px)}60%{transform:translateY(1px)}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-spin{to{transform:rotate(360deg)}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-wavef{0%{opacity:0;transform:scale(.6)}30%{opacity:.9}100%{opacity:0;transform:scale(1.3)}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-crkg{0%,20%{stroke-dashoffset:60}85%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:60}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-nutup{0%,40%{transform:none}85%,97%{transform:translateY(-6px)}100%{transform:none}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw402-grout-with-voids-or-a-shrinkage-gap-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S7A_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214">
          <rect x="20" y="142" width="260" height="52" rx="3" class="s-cc"></rect>
          <rect x="50" y="126" width="200" height="16" class="s-mor"></rect>
          <ellipse cx="104" cy="134" rx="14" ry="4.5" class="s-vd"></ellipse><ellipse cx="190" cy="133" rx="18" ry="4.5" class="s-vd"></ellipse><rect x="50" y="124" width="200" height="3" class="s-vd"></rect>
          <path class="s-crk s-crkg" d="M76 128l6 6-3 6M140 127l-5 7 4 7M222 128l5 6-4 7"></path>
          <rect x="62" y="104" width="7" height="44" class="s-stl"></rect><rect x="231" y="104" width="7" height="44" class="s-stl"></rect>
          <g class="s-ham">
            <rect x="50" y="118" width="200" height="6" rx="1" class="s-stl"></rect>
            <rect x="84" y="62" width="132" height="56" rx="6" fill="#393939"></rect>
            <g class="s-spin"><circle cx="150" cy="90" r="17" fill="none" stroke="var(--gold)" stroke-width="3"></circle><path d="M150 73v34M133 90h34" stroke="var(--gold)" stroke-width="3"></path></g>
            <g class="s-nutup"><rect x="58" y="112" width="15" height="6" rx="1" class="s-stl"></rect><rect x="227" y="112" width="15" height="6" rx="1" class="s-stl"></rect></g>
          </g>
          <path class="s-wave" style="--wd:0s" d="M112 52q38-18 76 0"></path><path class="s-wave" style="--wd:.4s" d="M100 44q50-22 100 0"></path><path class="s-wave" style="--wd:.8s" d="M88 36q62-26 124 0"></path>
          <text class="s-lbl" x="26" y="188">Foundation</text><text class="s-lbl" x="252" y="116">Bolt</text>
          <text class="s-lblb s-capA" x="150" y="16" text-anchor="middle">1 · Machine runs: load goes up and down</text>
          <text class="s-lblb s-capB" x="150" y="16" text-anchor="middle">2 · Over voids, the plate hammers the grout</text>
          <text class="s-lblb s-capC" x="150" y="16" text-anchor="middle">3 · Grout cracks, bolts work loose</text>
          <g transform="translate(262 72)"><g class="s-nok"><circle r="11"></circle><path d="M-4.5-4.5l9 9M4.5-4.5l-9 9"></path></g></g>
          <text class="s-badtx s-late" x="150" y="208" text-anchor="middle">Misalignment, noise, breakdowns.</text>
        </svg>`;

const S7B_STYLE = `.sc-hw402-hw402-full-contact .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw402-hw402-full-contact .s-cc{fill:var(--conc)}
.sc-hw402-hw402-full-contact .s-grt{fill:var(--grout);opacity:.88}
.sc-hw402-hw402-full-contact .s-stl{fill:var(--steel)}
.sc-hw402-hw402-full-contact .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw402-hw402-full-contact .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw402-hw402-full-contact .s-goodtx{font:600 11.5px var(--font-sans);fill:var(--pc)}
.sc-hw402-hw402-full-contact .s-ldar{fill:none;stroke:var(--ink);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.sc-hw402-hw402-full-contact .s-ldar.s-hwa{stroke:var(--pc)}
.sc-hw402-hw402-full-contact .s-okc circle{fill:var(--pc)}
.sc-hw402-hw402-full-contact .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw402-hw402-full-contact .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw402-hw402-full-contact .s-capA{opacity:0}
.sc-hw402-hw402-full-contact .s-capB{opacity:0}
.sc-hw402-hw402-full-contact .s-capC{opacity:1}
.sc-hw402-hw402-full-contact .s-wave{fill:none;stroke:var(--gold);stroke-width:2;stroke-linecap:round;opacity:.9}
.anim .sc-hw402-hw402-full-contact.playing .s-st1{animation-name:k-hw402-hw402-full-contact-st1}
.anim .sc-hw402-hw402-full-contact.playing .s-st2{animation-name:k-hw402-hw402-full-contact-st2}
.anim .sc-hw402-hw402-full-contact.playing .s-st3{animation-name:k-hw402-hw402-full-contact-st3}
.anim .sc-hw402-hw402-full-contact.playing .s-capA{animation-name:k-hw402-hw402-full-contact-capA}
.anim .sc-hw402-hw402-full-contact.playing .s-capB{animation-name:k-hw402-hw402-full-contact-capB}
.anim .sc-hw402-hw402-full-contact.playing .s-capC{animation-name:k-hw402-hw402-full-contact-capC}
.anim .sc-hw402-hw402-full-contact.playing .s-late{animation-name:k-hw402-hw402-full-contact-late}
.anim .sc-hw402-hw402-full-contact.playing .s-okc{animation-name:k-hw402-hw402-full-contact-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw402-hw402-full-contact.playing .s-spread{animation-name:k-hw402-hw402-full-contact-spread;animation-delay:var(--sd,0s)}
.anim .sc-hw402-hw402-full-contact.playing .s-vib{animation-name:k-hw402-hw402-full-contact-vib;animation-duration:.18s}
.anim .sc-hw402-hw402-full-contact.playing .s-spin{animation-name:k-hw402-hw402-full-contact-spin;animation-duration:.9s;transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw402-hw402-full-contact.playing .s-wave{animation-name:k-hw402-hw402-full-contact-wavef;animation-duration:1.2s;animation-delay:var(--wd,0s)}
.sc-hw402-hw402-full-contact .s-wave{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw402-hw402-full-contact.playing .s-st1 .disc{animation-name:k-hw402-hw402-full-contact-st1-disc}
.anim .sc-hw402-hw402-full-contact.playing .s-st2 .disc{animation-name:k-hw402-hw402-full-contact-st2-disc}
.anim .sc-hw402-hw402-full-contact.playing .s-st3 .disc{animation-name:k-hw402-hw402-full-contact-st3-disc}
@keyframes k-hw402-hw402-full-contact-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw402-hw402-full-contact-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw402-hw402-full-contact-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw402-hw402-full-contact-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw402-hw402-full-contact-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw402-hw402-full-contact-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-hw402-full-contact-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-hw402-full-contact-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw402-hw402-full-contact-spread{0%,66%{opacity:0;transform:translateY(-6px)}72%{opacity:1}88%{opacity:1;transform:translateY(8px)}92%,100%{opacity:0;transform:translateY(8px)}}
@keyframes k-hw402-hw402-full-contact-vib{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.2px)}}
@keyframes k-hw402-hw402-full-contact-spin{to{transform:rotate(360deg)}}
@keyframes k-hw402-hw402-full-contact-wavef{0%{opacity:0;transform:scale(.6)}30%{opacity:.9}100%{opacity:0;transform:scale(1.3)}}
@keyframes k-hw402-hw402-full-contact-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw402-hw402-full-contact-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw402-hw402-full-contact-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S7B_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214">
          <rect x="20" y="142" width="260" height="52" rx="3" class="s-cc"></rect>
          <rect x="50" y="124" width="200" height="18" class="s-grt"></rect>
          <rect x="62" y="104" width="7" height="44" class="s-stl"></rect><rect x="231" y="104" width="7" height="44" class="s-stl"></rect>
          <g class="s-vib">
            <rect x="50" y="118" width="200" height="6" rx="1" class="s-stl"></rect>
            <rect x="84" y="62" width="132" height="56" rx="6" fill="#393939"></rect>
            <g class="s-spin"><circle cx="150" cy="90" r="17" fill="none" stroke="var(--gold)" stroke-width="3"></circle><path d="M150 73v34M133 90h34" stroke="var(--gold)" stroke-width="3"></path></g>
            <rect x="58" y="112" width="15" height="6" rx="1" class="s-stl"></rect><rect x="227" y="112" width="15" height="6" rx="1" class="s-stl"></rect>
          </g>
          <path class="s-wave" style="--wd:0s" d="M112 52q38-18 76 0"></path><path class="s-wave" style="--wd:.4s" d="M100 44q50-22 100 0"></path><path class="s-wave" style="--wd:.8s" d="M88 36q62-26 124 0"></path>
          <g><path class="s-ldar s-hwa s-spread" style="--sd:0s" d="M90 146v12m-4-4l4 4 4-4"></path><path class="s-ldar s-hwa s-spread" style="--sd:.1s" d="M130 146v12m-4-4l4 4 4-4"></path><path class="s-ldar s-hwa s-spread" style="--sd:.2s" d="M170 146v12m-4-4l4 4 4-4"></path><path class="s-ldar s-hwa s-spread" style="--sd:.3s" d="M210 146v12m-4-4l4 4 4-4"></path></g>
          <text class="s-lbl" x="26" y="188">Foundation</text><text class="s-lbl" x="252" y="116">Bolt</text>
          <text class="s-lblb s-capA" x="150" y="16" text-anchor="middle">1 · Same machine, same vibration</text>
          <text class="s-lblb s-capB" x="150" y="16" text-anchor="middle">2 · No gap, so the plate can't hammer</text>
          <text class="s-lblb s-capC" x="150" y="16" text-anchor="middle">3 · Load goes evenly into the foundation</text>
          <g transform="translate(262 72)"><g class="s-okc"><circle r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g>
          <text class="s-goodtx s-late" x="150" y="208" text-anchor="middle">Vibration-resistant, void-free support.</text>
        </svg>`;

const STEP7_SVGCARDS = `<div class="svg-cards">${svgCardPlain('Grout with voids or a shrinkage gap', 'bad', S7A_STYLE, S7A_SVG)}${svgCardPlain('HW402: full contact', 'ok', S7B_STYLE, S7B_SVG)}</div>`;

// --- Step 8 diagram: Dynamic (cyclic) load test, in principle ---
const S8_STYLE = `.sc-hw402-dynamic-cyclic-load-test-in-principle .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw402-dynamic-cyclic-load-test-in-principle .s-grt{fill:var(--grout);opacity:.88}
.sc-hw402-dynamic-cyclic-load-test-in-principle .s-stl{fill:var(--steel)}
.sc-hw402-dynamic-cyclic-load-test-in-principle .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw402-dynamic-cyclic-load-test-in-principle .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw402-dynamic-cyclic-load-test-in-principle .s-dim{fill:none;stroke:var(--ink-2);stroke-width:1.2}
.sc-hw402-dynamic-cyclic-load-test-in-principle .s-capA{opacity:0}
.sc-hw402-dynamic-cyclic-load-test-in-principle .s-capB{opacity:0}
.sc-hw402-dynamic-cyclic-load-test-in-principle .s-capC{opacity:1}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-st1{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-st1}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-st2{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-st2}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-st3{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-st3}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-capA{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-capA}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-capB{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-capB}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-capC{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-capC}
.sc-hw402-dynamic-cyclic-load-test-in-principle .s-trace{fill:none;stroke:var(--pc);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:900;stroke-dashoffset:0}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-trace{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-trace;animation-timing-function:linear}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-pist{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-pist;animation-duration:1s;animation-timing-function:ease-in-out}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-st1 .disc{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-st1-disc}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-st2 .disc{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-st2-disc}
.anim .sc-hw402-dynamic-cyclic-load-test-in-principle.playing .s-st3 .disc{animation-name:k-hw402-dynamic-cyclic-load-test-in-principle-st3-disc}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-trace{0%{stroke-dashoffset:900}80%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:900}}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-pist{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw402-dynamic-cyclic-load-test-in-principle-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S8_SVG = `<svg class="s-cs-svg" viewBox="0 -16 320 186">
        <rect x="18" y="150" width="96" height="8" class="s-stl"></rect><rect x="24" y="20" width="6" height="130" class="s-stl"></rect><rect x="102" y="20" width="6" height="130" class="s-stl"></rect><rect x="24" y="14" width="84" height="8" class="s-stl"></rect>
        <g class="s-pist"><rect x="58" y="22" width="16" height="44" class="s-stl"></rect><rect x="46" y="66" width="40" height="6" class="s-stl"></rect></g>
        <rect x="48" y="96" width="36" height="54" class="s-grt"></rect>
        <text class="s-lbl" x="66" y="126" text-anchor="middle" fill="#fff" style="fill:#fff">Grout</text>
        <path class="s-dim" d="M140 150h170M140 150V20"></path>
        <text class="s-lbl" x="144" y="30">Load</text><text class="s-lbl" x="306" y="164" text-anchor="end">Time</text>
        <path class="s-dim" d="M140 50h170" stroke-dasharray="3 3"></path><path class="s-dim" d="M140 120h170" stroke-dasharray="3 3"></path>
        <text class="s-lbl" x="310" y="46" text-anchor="end">high</text><text class="s-lbl" x="310" y="116" text-anchor="end">low</text>
        <path class="s-trace" d="M140 120 C146 120 146 50 152 50 S158 120 164 120 S170 50 176 50 S182 120 188 120 S194 50 200 50 S206 120 212 120 S218 50 224 50 S230 120 236 120 S242 50 248 50 S254 120 260 120 S266 50 272 50 S278 120 284 120 S290 50 296 50 S302 120 308 120"></path>
        <text class="s-lblb s-capA" x="160" y="-4" text-anchor="middle">1 · Load, unload, load, unload…</text>
        <text class="s-lblb s-capB" x="160" y="-4" text-anchor="middle">2 · Repeated for millions of cycles</text>
        <text class="s-lblb s-capC" x="160" y="-4" text-anchor="middle">3 · Specimen checked for damage</text>
      </svg>`;

const STEP8_SVG = svgCardPlain('Dynamic (cyclic) load test, in principle', 'ok', S8_STYLE, S8_SVG);

module.exports = {
  productName: 'HW402 Anchoring Grout',
  productDescription: 'Free-flow, non-shrink, high-strength cementitious precision grout',
  topicDescription:
    'Everything a sales, dealer or applicator team member needs to know about HW402 Anchoring Grout: why shrinkage opens gaps, where it goes, grade selection, lab test values, vibration resistance, mixing and application, and the cheat sheet.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image',
      title: 'Anchoring Grout',
      data: {
        text: 'Non-shrink grout for anchor bolts, base plates and bore packing.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/anchoring-grout.webp'],
        caption: 'HW402 · Concrete repair (400 series) — Fills every gap. Stays full. Carries the load.',
        key: 'HW402 · Anchoring Grout',
      },
    },
    {
      type: 'svg',
      title: 'Cement Shrinks. Gaps Open.',
      data: {
        text: 'Normal cement mortar bleeds, settles and shrinks as it dries. In a closed pocket, that leaves a gap. HW402 holds its volume.',
        svgMarkup: STEP2_SVGCARDS,
        explanation: 'Remember: if a grout shrinks, it lets go.',
      },
    },
    {
      type: 'svg',
      title: 'Under a Base Plate, Contact Is Everything',
      data: {
        text: 'The grout under a base plate carries the whole load. It must fill the gap completely.',
        svgMarkup: STEP3_SVGCARDS,
      },
    },
    {
      type: 'knowledge',
      title: 'Knowledge Check — Pour Thickness',
      data: {
        text: 'What is the maximum single-pour thickness for HW402 without aggregate?',
        explanation: 'Do not exceed 50 mm in a single pour without aggregate addition. Micro Concrete HW401 allows up to 100 mm. Source: HW402 Technical Data Sheet, Application Instructions.',
        list: ['20 mm', '50 mm', '100 mm', '150 mm'],
        correctIndex: 1,
      },
    },
    {
      // NOTE (disclosed scope decision): the reference's "The Leak Around the Pipe"
      // step is a third site-mortar-vs-HW402 comparison diagram pair, conceptually a
      // close variant of the shrinkage-gap idea already fully animated twice (Step 2's
      // anchor-bolt pocket, Step 3's base-plate). Represented as badges rather than
      // extracting a third near-duplicate animation pair, to keep this fork's time
      // budget for the genuinely new vibration-resistance diagram at Step 7.
      type: 'card',
      title: 'The Leak Around the Pipe',
      data: {
        text: 'Pipes through terrace, toilet and tank slabs. Cement packing shrinks, and water runs down the pipe.',
        badges: [
          { icon: '❌', label: 'Bore packed with cement mortar', sub: 'Mortar dries and shrinks; gap opens; water runs down the pipe', tone: 'bad' },
          { icon: '✅', label: 'Bore packed with HW402', sub: 'Non-shrink: stays tight to pipe and slab; dense grout keeps water on top', tone: 'ok' },
        ],
      },
    },
    {
      type: 'card',
      title: 'Cement Mortar vs HW402',
      data: {
        text: 'Side by side, feature for feature.',
        table: {
          headers: ['Feature', 'Normal cement mortar', 'HW402'],
          rows: [
            ['Volume', 'Shrinks, cracks', 'Shrinkage nil'],
            ['Placing', 'Rammed; voids stay', 'Pours, fills fully'],
            ['Contact', 'Lets go', 'Full contact'],
            ['Water', 'Leaks through gaps', 'Stays tight'],
          ],
        },
      },
    },
    {
      type: 'text',
      title: 'Anywhere a Gap Must Carry Load',
      data: {
        text: 'Where HW402 anchoring grout goes.<div class="item-grid"><div class="item-card">Heavy machinery &amp; turbine foundations<span class="item-card-check">✓</span></div><div class="item-card">Windmill &amp; boiler base plates<span class="item-card-check">✓</span></div><div class="item-card">Bridge bearing pads &amp; coupler zones<span class="item-card-check">✓</span></div><div class="item-card">Structural columns &amp; crane rails<span class="item-card-check">✓</span></div><div class="item-card">Anchor bolts, sockets &amp; holding-down bolts<span class="item-card-check">✓</span></div><div class="item-card">Void &amp; gap grouting, precast and cast-in-place<span class="item-card-check">✓</span></div><div class="item-card">Bore packing around pipes, terrace, toilet, tank slabs<span class="item-card-check">✓</span></div><div class="item-card">Concrete-to-metal joints &amp; pump bases<span class="item-card-check">✓</span></div></div>',
      },
    },
    {
      type: 'svg',
      title: 'A Machine Never Sits Still',
      data: {
        text: 'Turbines, pumps, windmills and cranes load the grout up and down, thousands of times a minute. Any void turns that into hammering.',
        svgMarkup: STEP7_SVGCARDS,
      },
    },
    {
      type: 'svg',
      title: 'How a Grout Is Proven for Vibration',
      data: {
        text: 'Not one big load, but a smaller load again and again.',
        svgMarkup: STEP8_SVG,
        badges: [
          { icon: '🔗', label: 'Full contact: shrinkage nil', tone: 'ok' },
          { icon: '📐', label: 'Bending: flexural up to 18.7 MPa', tone: 'ok' },
          { icon: '🔩', label: 'Bolt grip: pull-out up to 182.7 kN', tone: 'ok' },
        ],
      },
    },
    {
      type: 'card',
      title: 'HW402 · Anchoring Grout · Non-Shrink Cementitious Grout',
      data: {
        text: 'Just add water and pour. Flows into every gap and holds its volume.',
        badges: [
          { icon: '📏', label: 'Non-shrink', tone: 'neutral' },
          { icon: '🌊', label: 'Free flow', tone: 'neutral' },
          { icon: '💪', label: '40 · 60 · 80 MPa grades', tone: 'neutral' },
        ],
        tableRows: [
          { label: 'Water per 25 kg', value: '3–3.5 L' },
          { label: 'Initial set', value: '145 min' },
          { label: 'Yield per bag', value: '13 L' },
        ],
        explanation: 'Key USPs, as per the TDS: Shrinkage-compensated · High early and final strength · Excellent flow · Non-corrosive, non-staining.',
      },
    },
    {
      type: 'text',
      title: 'Pick the Grade',
      data: {
        text: 'Same product, three strengths — see the full grade-by-grade test table in the next step.',
      },
    },
    {
      type: 'card',
      title: 'Fast Strength Gain',
      data: {
        text: '145 minutes to pour before initial set. Then strength climbs fast.',
        table: {
          headers: ['Day', 'M40', 'M60', 'M80'],
          rows: [
            ['1 day', '23.70', '24.80', '47.25'],
            ['7 days', '31.80', '48.30', '68.08'],
            ['28 days', '46.50', '66.30', '86.76'],
          ],
        },
      },
    },
    {
      type: 'card',
      title: 'All the Test Values, One Table',
      data: {
        text: 'Every lab-tested value for all three grades.',
        table: {
          headers: ['Feature (tested value)', 'M40', 'M60', 'M80'],
          rows: [
            ['Compressive, 1 day · MPa', '23.70', '24.80', '47.25'],
            ['Compressive, 7 days · MPa', '31.80', '48.30', '68.08'],
            ['Compressive, 28 days · MPa', '46.50', '66.30', '86.76'],
            ['Flexural, 28 days · MPa', '11.20', '14.60', '18.70'],
            ['Split tensile · MPa', '4.2', '5.8', '8.4'],
            ['Rebar pull-out, 20 mm · kN', '125.8', '130.3', '182.7'],
            ['Flow · mm', '330', '310', '340'],
            ['Shrinkage', 'Nil', 'Nil', 'Nil'],
            ['RCPT · coulombs', '1986', '1942', '1124'],
            ['Mortar bar expansion · %', '0.084', '0.092', '0.082'],
            ['With 30% aggregate, 28 d · MPa', '48.41', '63.90', '89.10'],
            ['Yield per 25 kg · L', '13 (15*)', '13 (15*)', '13 (15*)'],
          ],
        },
      },
    },
    {
      type: 'card',
      title: 'Grade for Grade',
      data: {
        text: 'HW402 tested vs competitor TDS.',
        table: {
          headers: ['Grade', 'Metric', 'HW402 (lab tested)', 'Competitor (TDS)'],
          rows: [
            ['M40', 'Compressive, 28 days · MPa', '46.50', 'Fosroc Conbextra GP1: 45'],
            ['M40', 'Compressive, 1 day · MPa', '23.70', 'Fosroc Conbextra GP1: 10'],
            ['M40', 'Flexural, 28 days · MPa', '11.20', 'Fosroc Conbextra GP1: —'],
            ['M60', 'Compressive, 28 days · MPa', '66.30', 'Conbextra GP2: 65 · Ardex B 30: 66 · Pidigrout 10M: 66'],
            ['M60', 'Flexural, 28 days · MPa', '14.60', 'Conbextra GP2: 10 · Ardex B 30: 10 · Pidigrout 10M: 10'],
            ['M60', 'Flow · mm', '310', 'Conbextra GP2: — · Ardex B 30: 190–220 · Pidigrout 10M: ≥260'],
            ['M80', 'Compressive, 28 days · MPa', '86.76', 'Ardex B 31 (min): > 85'],
            ['M80', 'Compressive, 1 day · MPa', '47.25', 'Ardex B 31 (min): > 40'],
            ['M80', 'Flow · mm', '340', 'Ardex B 31 (min): 210–250'],
          ],
        },
        explanation: 'M40: 1-day strength 2.4× Conbextra GP1 (23.70 vs 10 MPa). M60: same strength, 46% higher flexural, better flow. M80: matches Ardex B 31 minimum, with better flow.',
      },
    },
    {
      type: 'stepper',
      title: 'Four Steps, No Breaks',
      data: {
        text: 'No extra water. No vibration. Over 50 mm deep: add 30% aggregate.',
        steps: [
          { title: 'Prepare', desc: 'Clean, sound concrete. Soak 12–24 h, then remove standing water.' },
          { title: 'Form up', desc: 'Leak-proof formwork. Hopper on one side.' },
          { title: 'Mix', desc: '3–3.5 L water per bag. Mix 3 min.' },
          { title: 'Pour & cure', desc: 'One side, non-stop. Moist-cure 3 days.' },
        ],
      },
    },
    {
      // NOTE (disclosed scope decision): the reference's "How Many Bags?" widget takes
      // 4 inputs (length/width/depth in mm, count) plus an aggregate toggle and
      // computes volume = L*W*D/1e6*count (litres), bags = ceil(volume/yield) where
      // yield is 13 L/bag neat or 15 L/bag with 30% aggregate, water = bags*3 to
      // bags*3.5. Verified against 2 swept input combinations (default 600×600×40×4 →
      // 57.6L/5 bags/15–17.5L water; 1000×500×60×2 → 60L/5 bags/15–17.5L water, both
      // exact). Same "multi-dimension geometry" calculator family as HW401's "How Many
      // Bags for a Column Jacket?" — same out-of-scope-for-this-pass decision applies
      // (see that product's seed-data file): captured as a static worked example
      // instead of building the multi-field UI this would need.
      type: 'card',
      title: 'How Many Bags?',
      data: {
        text: 'Theoretical quantity from the TDS yield. Add a wastage allowance on site.',
        tableRows: [
          { label: 'Length × width × depth', value: '600 × 600 × 40 mm' },
          { label: 'How many', value: '4' },
        ],
        stats: [
          { value: '57.6 L', label: 'volume to fill' },
          { value: '5 bags', label: '25 kg bags, neat · 13 L/bag' },
          { value: '15–17.5 L', label: 'water needed' },
        ],
        explanation: 'Depth over 50 mm: switch to +30% aggregate (TDS: do not pour over 50 mm without aggregate) — yield becomes 15 L/bag.',
      },
    },
    {
      type: 'knowledge',
      title: 'Scenario: On Site',
      data: {
        text: 'On site: Pouring from Both Sides — the crew plans to pour HW402 under a large base plate from both sides at the same time to finish faster. What will you do?',
        explanation: 'Pouring from one side ensures continuous flow and prevents air entrapment under the plate. Source: Hard Worker website quiz, Anchoring Grout.',
        list: ['Approve to save time', 'Instruct them to pour from one side only', 'Increase pouring speed from both ends', 'Pour from all corners'],
        correctIndex: 1,
      },
    },
    {
      type: 'card',
      title: 'Cheat Sheet',
      data: {
        text: 'HW402 at a glance.',
        sections: [
          { label: 'The problem — normal cement mortar', text: 'Shrinks and cracks. Gaps at the bolt, plate or pipe. Plate rocks, bolts loosen, water leaks.' },
          { label: 'HW402 Anchoring Grout', text: 'Non-shrink, free-flow · 25 kg · M40 / M60 / M80.' },
          { label: 'Where', text: 'Machine and turbine bases, base plates, anchor bolts, bridge bearings, crane rails, bore packing.' },
          { label: '28-day strength', text: '46.50 MPa (M40, lab tested).' },
          { label: 'Key facts', text: 'Shrinkage nil · flow 310–340 mm · flexural up to 18.7 MPa.' },
          { label: 'On site', text: '3–3.5 L water per bag · 13 L per bag · max 50 mm per pour · cure 3 days.' },
          { label: 'Versus competitors (M60 class)', text: 'Strength on par with Conbextra GP2, Ardex B 30, Pidigrout 10M. Flexural 14.60 vs 10 MPa: 46% higher.' },
        ],
      },
    },
  ],
};
