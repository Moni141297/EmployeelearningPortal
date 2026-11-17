/*
 * Seeds "HW212 Tile Grout Wide" (Hard Worker range) from the Learning Hub
 * reference (https://hw-learning-hub-v2.vercel.app/products/tile-grout-wide-hw212),
 * 13 steps. Its coverage calculator ("How Much to Order") is a genuinely new
 * shape — area + tile size + joint width + tile thickness feeding a running-
 * metres-of-joint formula, then a kg/bags requirement — verified against the
 * live reference across 19 swept input combinations and implemented as a new
 * generic 'tileJoint' SlideCalc mode (src/types.ts, src/lib/calc.ts,
 * CalcWidget.tsx), per PRD §4.2's allowance for a genuinely new calculator
 * shape.
 */
require('dotenv').config();
const { seedProduct } = require('./lib/seedProduct');
const { svgCard, svgCards } = require('./lib/svgCard');

const PLAIN_PASTE_STYLE = `.sc-hw212-plain-cement-paste .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw212-plain-cement-paste.playing .s-st1{animation-name:k-hw212-plain-cement-paste-st1}
.anim .sc-hw212-plain-cement-paste.playing .s-st2{animation-name:k-hw212-plain-cement-paste-st2}
.anim .sc-hw212-plain-cement-paste.playing .s-st3{animation-name:k-hw212-plain-cement-paste-st3}
.sc-hw212-plain-cement-paste .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw212-plain-cement-paste .s-g-bed{fill:var(--cmor)}
.sc-hw212-plain-cement-paste .s-g-gap{fill:var(--ink);opacity:.55}
.sc-hw212-plain-cement-paste .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw212-plain-cement-paste .s-g-bad{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw212-plain-cement-paste .s-g-drop{fill:var(--water)}
.sc-hw212-plain-cement-paste .s-g-wc{fill:#dfdfdf}
.sc-hw212-plain-cement-paste .s-w-fill{transform-box:fill-box;transform-origin:50% 100%}
.sc-hw212-plain-cement-paste .s-w-shr{transform-box:fill-box;transform-origin:50% 50%;transform:scaleX(var(--sx,.82))}
.anim .sc-hw212-plain-cement-paste.playing .s-w-shr{animation-name:k-hw212-plain-cement-paste-wShr;animation-timing-function:ease-in-out}
.sc-hw212-plain-cement-paste .s-w-crk{fill:none;stroke:var(--crack);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:60;stroke-dashoffset:0}
.anim .sc-hw212-plain-cement-paste.playing .s-w-crk{animation-name:k-hw212-plain-cement-paste-wCrk}
.sc-hw212-plain-cement-paste .s-w-dim{stroke:var(--ink-2);stroke-width:1.2}
.anim .sc-hw212-plain-cement-paste.playing .s-st1 .disc{animation-name:k-hw212-plain-cement-paste-st1-disc}
.anim .sc-hw212-plain-cement-paste.playing .s-st2 .disc{animation-name:k-hw212-plain-cement-paste-st2-disc}
.anim .sc-hw212-plain-cement-paste.playing .s-st3 .disc{animation-name:k-hw212-plain-cement-paste-st3-disc}
@keyframes k-hw212-plain-cement-paste-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw212-plain-cement-paste-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw212-plain-cement-paste-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw212-plain-cement-paste-wShr{0%,36%{transform:none}54%,97%{transform:scaleX(var(--sx,.82))}100%{transform:none}}
@keyframes k-hw212-plain-cement-paste-wCrk{0%,42%{stroke-dashoffset:60}58%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:60}}
@keyframes k-hw212-plain-cement-paste-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw212-plain-cement-paste-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw212-plain-cement-paste-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const PLAIN_PASTE_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 186">
<text class="s-g-bad s-g-late" x="150" y="20" text-anchor="middle">Shrinks and cracks. Water gets in.</text>
<rect x="10" y="130" width="280" height="50" fill="var(--conc)"></rect><rect class="s-g-bed" x="10" y="118" width="280" height="12"></rect>
<rect class="s-g-gap" x="126" y="86" width="48" height="32"></rect>
<g class="s-w-shr"><rect class="s-g-wc s-w-fill" x="126" y="86" width="48" height="32"></rect></g>
<path class="s-w-crk" d="M150 87l-4 6 5 6-5 7 4 6-2 5"></path>
<rect class="s-g-tile" x="10" y="86" width="116" height="32" rx="1.5"></rect><rect class="s-g-tile" x="174" y="86" width="116" height="32" rx="1.5"></rect>
<path class="s-w-dim" d="M126 72v8M174 72v8M126 76h48"></path><text class="s-g-lab" x="150" y="66" text-anchor="middle">6–12 mm joint</text>
</svg>`;

const PLAIN_PASTE_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Plain paste fills the wide joint</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>It shrinks as it dries and cracks</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Water and dirt get into the cracks</span></li></ol>`;

const SANDED_STYLE = `.sc-hw212-hw212-sanded-grout .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw212-hw212-sanded-grout .s-okc circle{fill:var(--ok)}
.sc-hw212-hw212-sanded-grout .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw212-hw212-sanded-grout .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw212-hw212-sanded-grout.playing .s-st1{animation-name:k-hw212-hw212-sanded-grout-st1}
.anim .sc-hw212-hw212-sanded-grout.playing .s-st2{animation-name:k-hw212-hw212-sanded-grout-st2}
.anim .sc-hw212-hw212-sanded-grout.playing .s-st3{animation-name:k-hw212-hw212-sanded-grout-st3}
.anim .sc-hw212-hw212-sanded-grout.playing .s-okc{animation-name:k-hw212-hw212-sanded-grout-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw212-hw212-sanded-grout .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw212-hw212-sanded-grout .s-g-bed{fill:var(--cmor)}
.sc-hw212-hw212-sanded-grout .s-g-gap{fill:var(--ink);opacity:.55}
.sc-hw212-hw212-sanded-grout .s-g-eg{fill:var(--egj)}
.sc-hw212-hw212-sanded-grout .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw212-hw212-sanded-grout .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw212-hw212-sanded-grout .s-g-drop{fill:var(--water)}
.sc-hw212-hw212-sanded-grout .s-tgok circle{fill:var(--tg)}
.sc-hw212-hw212-sanded-grout .s-g-dC{opacity:0;transform-box:fill-box}
.anim .sc-hw212-hw212-sanded-grout.playing .s-g-dC{animation-name:k-hw212-hw212-sanded-grout-dC;animation-fill-mode:backwards;animation-delay:var(--dd,0s)}
.sc-hw212-hw212-sanded-grout .s-g-bondl{fill:none;stroke:var(--tg);stroke-width:3;stroke-linecap:round}
.anim .sc-hw212-hw212-sanded-grout.playing .s-g-bondl{animation-name:k-hw212-hw212-sanded-grout-bondl}
.sc-hw212-hw212-sanded-grout .s-w-fill{transform-box:fill-box;transform-origin:50% 100%}
.sc-hw212-hw212-sanded-grout .s-w-sand{fill:var(--sandg);transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw212-hw212-sanded-grout.playing .s-w-sand{animation-name:k-hw212-hw212-sanded-grout-wSand;animation-delay:var(--sd,0s);animation-fill-mode:backwards}
.sc-hw212-hw212-sanded-grout .s-w-dim{stroke:var(--ink-2);stroke-width:1.2}
.anim .sc-hw212-hw212-sanded-grout.playing .s-st1 .disc{animation-name:k-hw212-hw212-sanded-grout-st1-disc}
.anim .sc-hw212-hw212-sanded-grout.playing .s-st2 .disc{animation-name:k-hw212-hw212-sanded-grout-st2-disc}
.anim .sc-hw212-hw212-sanded-grout.playing .s-st3 .disc{animation-name:k-hw212-hw212-sanded-grout-st3-disc}
@keyframes k-hw212-hw212-sanded-grout-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw212-hw212-sanded-grout-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw212-hw212-sanded-grout-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw212-hw212-sanded-grout-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw212-hw212-sanded-grout-dC{0%,64%{opacity:0;transform:none}66%{opacity:1;transform:none}73%{transform:translateY(62px)}78%{transform:translateY(44px)}83%{transform:translateY(62px);opacity:1}90%,100%{opacity:0;transform:translateY(62px)}}
@keyframes k-hw212-hw212-sanded-grout-bondl{0%,32%{opacity:0}38%{opacity:1}44%{opacity:.3}50%{opacity:1}56%{opacity:.3}62%,96%{opacity:1}100%{opacity:0}}
@keyframes k-hw212-hw212-sanded-grout-wSand{0%,34%{opacity:0;transform:scale(0)}44%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0)}}
@keyframes k-hw212-hw212-sanded-grout-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw212-hw212-sanded-grout-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw212-hw212-sanded-grout-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const SANDED_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 186">
<text class="s-g-good s-g-late" x="150" y="20" text-anchor="middle">Stays full. Water stays on top.</text>
<rect x="10" y="130" width="280" height="50" fill="var(--conc)"></rect><rect class="s-g-bed" x="10" y="118" width="280" height="12"></rect>
<rect class="s-g-gap" x="126" y="86" width="48" height="32"></rect>
<rect class="s-g-eg s-w-fill" x="126" y="86" width="48" height="32"></rect>
<circle class="s-w-sand" cx="132" cy="92" r="2.4" style="--sd:0s"></circle><circle class="s-w-sand" cx="141" cy="90" r="2" style="--sd:.05s"></circle><circle class="s-w-sand" cx="152" cy="93" r="2.6" style="--sd:.1s"></circle><circle class="s-w-sand" cx="162" cy="90" r="2.1" style="--sd:.15s"></circle><circle class="s-w-sand" cx="169" cy="95" r="2.3" style="--sd:.2s"></circle><circle class="s-w-sand" cx="136" cy="100" r="2.6" style="--sd:.25s"></circle><circle class="s-w-sand" cx="147" cy="101" r="2" style="--sd:.3s"></circle><circle class="s-w-sand" cx="157" cy="99" r="2.4" style="--sd:.35s"></circle><circle class="s-w-sand" cx="166" cy="104" r="2.2" style="--sd:.4s"></circle><circle class="s-w-sand" cx="131" cy="108" r="2.1" style="--sd:.45s"></circle><circle class="s-w-sand" cx="142" cy="110" r="2.5" style="--sd:.5s"></circle><circle class="s-w-sand" cx="153" cy="108" r="2" style="--sd:.55s"></circle><circle class="s-w-sand" cx="163" cy="112" r="2.4" style="--sd:.6s"></circle><circle class="s-w-sand" cx="170" cy="113" r="1.9" style="--sd:.65s"></circle><circle class="s-w-sand" cx="137" cy="115" r="1.9" style="--sd:.7s"></circle><circle class="s-w-sand" cx="149" cy="115" r="2.2" style="--sd:.75s"></circle>
<path class="s-g-bondl" d="M127 87v30M173 87v30"></path>
<rect class="s-g-tile" x="10" y="86" width="116" height="32" rx="1.5"></rect><rect class="s-g-tile" x="174" y="86" width="116" height="32" rx="1.5"></rect>
<circle class="s-g-drop s-g-dC" cx="140" cy="26" r="4" style="--dd:0s"></circle><circle class="s-g-drop s-g-dC" cx="160" cy="26" r="4" style="--dd:.25s"></circle>
<g class="s-okc s-tgok"><circle cx="252" cy="56" r="12"></circle><path d="M246 56.5l4 4 8-8.5"></path></g>
<path class="s-w-dim" d="M126 72v8M174 72v8M126 76h48"></path><text class="s-g-lab" x="150" y="66" text-anchor="middle">6–12 mm joint</text>
</svg>`;

const SANDED_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>HW212 fills the wide joint</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Sand grains pack it and give it body</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Non-shrink: the joint stays full and closed</span></li></ol>`;

const NARROW_TERRACE_STYLE = `.sc-hw212-narrow-joints-on-a-terrace .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw212-narrow-joints-on-a-terrace .s-blk{fill:var(--cblk)}
.sc-hw212-narrow-joints-on-a-terrace .s-sun circle{fill:var(--gold)}
.sc-hw212-narrow-joints-on-a-terrace .s-sun line{stroke:var(--gold);stroke-width:2.4;stroke-linecap:round}
.sc-hw212-narrow-joints-on-a-terrace .s-sun{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-st1{animation-name:k-hw212-narrow-joints-on-a-terrace-st1}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-st2{animation-name:k-hw212-narrow-joints-on-a-terrace-st2}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-st3{animation-name:k-hw212-narrow-joints-on-a-terrace-st3}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-sun{animation-name:k-hw212-narrow-joints-on-a-terrace-spin;animation-duration:14s}
.sc-hw212-narrow-joints-on-a-terrace .s-txb{fill:var(--cblk)}
.sc-hw212-narrow-joints-on-a-terrace .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw212-narrow-joints-on-a-terrace .s-g-bed{fill:var(--cmor)}
.sc-hw212-narrow-joints-on-a-terrace .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw212-narrow-joints-on-a-terrace .s-g-bad{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw212-narrow-joints-on-a-terrace .s-g-arrow{fill:none;stroke:var(--neg);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.sc-hw212-narrow-joints-on-a-terrace .s-g-wc{fill:#dfdfdf}
.sc-hw212-narrow-joints-on-a-terrace .s-t-day{opacity:0}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-t-day{animation-name:k-hw212-narrow-joints-on-a-terrace-tDay}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-t-night{animation-name:k-hw212-narrow-joints-on-a-terrace-tNight}
.sc-hw212-narrow-joints-on-a-terrace .s-t-moon{fill:#9a9a9a}
.sc-hw212-narrow-joints-on-a-terrace .s-t-exp{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw212-narrow-joints-on-a-terrace .s-t-tl{transform-box:fill-box}
.sc-hw212-narrow-joints-on-a-terrace .s-t-tr{transform-box:fill-box}
.sc-hw212-narrow-joints-on-a-terrace .s-t-tl{transform-origin:0% 100%;transform:rotate(-12deg)}
.sc-hw212-narrow-joints-on-a-terrace .s-t-tr{transform-origin:100% 100%;transform:rotate(12deg)}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-t-exp{animation-name:k-hw212-narrow-joints-on-a-terrace-tExp;animation-timing-function:ease-in-out}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-t-tl{animation-name:k-hw212-narrow-joints-on-a-terrace-tTL;animation-timing-function:cubic-bezier(.3,1.5,.5,1)}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-t-tr{animation-name:k-hw212-narrow-joints-on-a-terrace-tTR;animation-timing-function:cubic-bezier(.3,1.5,.5,1)}
.sc-hw212-narrow-joints-on-a-terrace .s-t-press{opacity:0}
.sc-hw212-narrow-joints-on-a-terrace .s-t-pop{opacity:0}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-t-press{animation-name:k-hw212-narrow-joints-on-a-terrace-tPress}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-t-pop{animation-name:k-hw212-narrow-joints-on-a-terrace-tPop}
.sc-hw212-narrow-joints-on-a-terrace .s-t-crk{fill:none;stroke:var(--crack);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:16;stroke-dashoffset:0}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-t-crk{animation-name:k-hw212-narrow-joints-on-a-terrace-tCrk}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-st1 .disc{animation-name:k-hw212-narrow-joints-on-a-terrace-st1-disc}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-st2 .disc{animation-name:k-hw212-narrow-joints-on-a-terrace-st2-disc}
.anim .sc-hw212-narrow-joints-on-a-terrace.playing .s-st3 .disc{animation-name:k-hw212-narrow-joints-on-a-terrace-st3-disc}
@keyframes k-hw212-narrow-joints-on-a-terrace-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw212-narrow-joints-on-a-terrace-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw212-narrow-joints-on-a-terrace-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw212-narrow-joints-on-a-terrace-spin{to{transform:rotate(360deg)}}
@keyframes k-hw212-narrow-joints-on-a-terrace-tDay{0%{opacity:0}4%,60%{opacity:1}64%,100%{opacity:0}}
@keyframes k-hw212-narrow-joints-on-a-terrace-tNight{0%,62%{opacity:0}66%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw212-narrow-joints-on-a-terrace-tExp{0%,6%{transform:none}26%,94%{transform:scaleX(1.03)}100%{transform:none}}
@keyframes k-hw212-narrow-joints-on-a-terrace-tTL{0%,40%{transform:none}52%,94%{transform:rotate(-12deg)}100%{transform:none}}
@keyframes k-hw212-narrow-joints-on-a-terrace-tTR{0%,40%{transform:none}52%,94%{transform:rotate(12deg)}100%{transform:none}}
@keyframes k-hw212-narrow-joints-on-a-terrace-tPress{0%,18%{opacity:0}24%{opacity:1}30%{opacity:.3}36%{opacity:1}42%{opacity:.3}48%{opacity:1}54%,100%{opacity:0}}
@keyframes k-hw212-narrow-joints-on-a-terrace-tPop{0%,48%{opacity:0}54%,94%{opacity:1}100%{opacity:0}}
@keyframes k-hw212-narrow-joints-on-a-terrace-tCrk{0%,66%{stroke-dashoffset:16}76%,94%{stroke-dashoffset:0}100%{stroke-dashoffset:16}}
@keyframes k-hw212-narrow-joints-on-a-terrace-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw212-narrow-joints-on-a-terrace-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw212-narrow-joints-on-a-terrace-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const NARROW_TERRACE_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 172">
<g class="s-t-day"><g class="s-sun"><circle cx="34" cy="30" r="10"></circle><line x1="48" y1="30" x2="53" y2="30"></line><line x1="20" y1="30" x2="15" y2="30"></line><line x1="34" y1="16" x2="34" y2="11"></line><line x1="34" y1="44" x2="34" y2="49"></line><line x1="43.9" y1="20.1" x2="47.4" y2="16.6"></line><line x1="24.1" y1="39.9" x2="20.6" y2="43.4"></line><line x1="43.9" y1="39.9" x2="47.4" y2="43.4"></line><line x1="24.1" y1="20.1" x2="20.6" y2="16.6"></line></g><text class="s-g-lab" x="170" y="34" text-anchor="middle">Day: tiles heat up and expand</text></g>
<g class="s-t-night"><path class="s-t-moon" d="M38 18a12 12 0 1 0 10 20a10 10 0 0 1-10-20z"></path><text class="s-g-lab" x="170" y="34" text-anchor="middle">Night: tiles cool and contract</text></g>
<rect class="s-blk" x="8" y="64" width="10" height="86"></rect><rect class="s-blk" x="282" y="64" width="10" height="86"></rect>
<rect x="18" y="122" width="264" height="28" fill="var(--conc)"></rect><rect class="s-g-bed" x="18" y="114" width="264" height="8"></rect>
<rect class="s-g-wc" x="83.5" y="100" width="2" height="14"></rect><rect class="s-g-wc" x="149" y="100" width="2" height="14"></rect><rect class="s-g-wc" x="214.5" y="100" width="2" height="14"></rect>
<rect class="s-g-tile s-t-exp" x="20" y="100" width="63.5" height="14" rx="1.5"></rect>
<g class="s-t-tl"><rect class="s-g-tile s-t-exp" x="85.5" y="100" width="63.5" height="14" rx="1.5"></rect></g>
<g class="s-t-tr"><rect class="s-g-tile s-t-exp" x="151" y="100" width="63.5" height="14" rx="1.5"></rect></g>
<rect class="s-g-tile s-t-exp" x="216.5" y="100" width="63.5" height="14" rx="1.5"></rect>
<g class="s-t-press"><path class="s-g-arrow" d="M132 92h10m-3-3l3 3-3 3M168 92h-10m3-3l-3 3 3 3"></path></g>
<path class="s-t-crk" d="M84.5 100.5l-1.5 4 2 4-1.5 5M215.5 100.5l-1.5 4 2 4-1.5 5"></path>
<g class="s-t-pop"><text class="s-g-bad" x="150" y="72" text-anchor="middle">Tiles push and lift</text></g>
<text class="s-g-lab" x="22" y="80">Parapet</text>
<text class="s-g-bad s-g-late" x="150" y="166" text-anchor="middle">Lifted tiles, cracked joints</text>
</svg>`;

const NARROW_TERRACE_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Full sun: every tile expands</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Narrow joints leave no room; tiles push and lift</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>At night they shrink back and joints crack open</span></li></ol>`;

const WIDE_TERRACE_STYLE = `.sc-hw212-wide-joints-with-hw212 .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw212-wide-joints-with-hw212 .s-blk{fill:var(--cblk)}
.sc-hw212-wide-joints-with-hw212 .s-okc circle{fill:var(--ok)}
.sc-hw212-wide-joints-with-hw212 .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw212-wide-joints-with-hw212 .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw212-wide-joints-with-hw212 .s-sun circle{fill:var(--gold)}
.sc-hw212-wide-joints-with-hw212 .s-sun line{stroke:var(--gold);stroke-width:2.4;stroke-linecap:round}
.sc-hw212-wide-joints-with-hw212 .s-sun{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-st1{animation-name:k-hw212-wide-joints-with-hw212-st1}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-st2{animation-name:k-hw212-wide-joints-with-hw212-st2}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-st3{animation-name:k-hw212-wide-joints-with-hw212-st3}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-okc{animation-name:k-hw212-wide-joints-with-hw212-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-sun{animation-name:k-hw212-wide-joints-with-hw212-spin;animation-duration:14s}
.sc-hw212-wide-joints-with-hw212 .s-txb{fill:var(--cblk)}
.sc-hw212-wide-joints-with-hw212 .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw212-wide-joints-with-hw212 .s-g-bed{fill:var(--cmor)}
.sc-hw212-wide-joints-with-hw212 .s-g-eg{fill:var(--egj)}
.sc-hw212-wide-joints-with-hw212 .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw212-wide-joints-with-hw212 .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw212-wide-joints-with-hw212 .s-tgok circle{fill:var(--tg)}
.sc-hw212-wide-joints-with-hw212 .s-g-arrow{fill:none;stroke:var(--neg);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.sc-hw212-wide-joints-with-hw212 .s-g-arrow.s-ok{stroke:var(--tg)}
.sc-hw212-wide-joints-with-hw212 .s-t-day{opacity:0}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-t-day{animation-name:k-hw212-wide-joints-with-hw212-tDay}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-t-night{animation-name:k-hw212-wide-joints-with-hw212-tNight}
.sc-hw212-wide-joints-with-hw212 .s-t-moon{fill:#9a9a9a}
.sc-hw212-wide-joints-with-hw212 .s-t-expw{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw212-wide-joints-with-hw212 .s-t-jsq{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw212-wide-joints-with-hw212 .s-t-press2{opacity:0}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-t-expw{animation-name:k-hw212-wide-joints-with-hw212-tExpW;animation-timing-function:ease-in-out}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-t-jsq{animation-name:k-hw212-wide-joints-with-hw212-tJsq;animation-timing-function:ease-in-out}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-t-press2{animation-name:k-hw212-wide-joints-with-hw212-tPress2}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-st1 .disc{animation-name:k-hw212-wide-joints-with-hw212-st1-disc}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-st2 .disc{animation-name:k-hw212-wide-joints-with-hw212-st2-disc}
.anim .sc-hw212-wide-joints-with-hw212.playing .s-st3 .disc{animation-name:k-hw212-wide-joints-with-hw212-st3-disc}
@keyframes k-hw212-wide-joints-with-hw212-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw212-wide-joints-with-hw212-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw212-wide-joints-with-hw212-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw212-wide-joints-with-hw212-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw212-wide-joints-with-hw212-spin{to{transform:rotate(360deg)}}
@keyframes k-hw212-wide-joints-with-hw212-tDay{0%{opacity:0}4%,60%{opacity:1}64%,100%{opacity:0}}
@keyframes k-hw212-wide-joints-with-hw212-tNight{0%,62%{opacity:0}66%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw212-wide-joints-with-hw212-tExpW{0%,6%{transform:none}26%,60%{transform:scaleX(1.03)}74%,100%{transform:none}}
@keyframes k-hw212-wide-joints-with-hw212-tJsq{0%,6%{transform:none}26%,60%{transform:scaleX(.82)}74%,100%{transform:none}}
@keyframes k-hw212-wide-joints-with-hw212-tPress2{0%,30%{opacity:0}36%,58%{opacity:1}64%,100%{opacity:0}}
@keyframes k-hw212-wide-joints-with-hw212-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw212-wide-joints-with-hw212-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw212-wide-joints-with-hw212-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const WIDE_TERRACE_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 172">
<g class="s-t-day"><g class="s-sun"><circle cx="34" cy="30" r="10"></circle><line x1="48" y1="30" x2="53" y2="30"></line><line x1="20" y1="30" x2="15" y2="30"></line><line x1="34" y1="16" x2="34" y2="11"></line><line x1="34" y1="44" x2="34" y2="49"></line><line x1="43.9" y1="20.1" x2="47.4" y2="16.6"></line><line x1="24.1" y1="39.9" x2="20.6" y2="43.4"></line><line x1="43.9" y1="39.9" x2="47.4" y2="43.4"></line><line x1="24.1" y1="20.1" x2="20.6" y2="16.6"></line></g><text class="s-g-lab" x="170" y="34" text-anchor="middle">Day: tiles heat up and expand</text></g>
<g class="s-t-night"><path class="s-t-moon" d="M38 18a12 12 0 1 0 10 20a10 10 0 0 1-10-20z"></path><text class="s-g-lab" x="170" y="34" text-anchor="middle">Night: tiles cool and contract</text></g>
<rect class="s-blk" x="8" y="64" width="10" height="86"></rect><rect class="s-blk" x="282" y="64" width="10" height="86"></rect>
<rect x="18" y="122" width="264" height="28" fill="var(--conc)"></rect><rect class="s-g-bed" x="18" y="114" width="264" height="8"></rect>
<rect class="s-g-eg s-t-jsq" x="77.5" y="100" width="10" height="14"></rect><rect class="s-g-eg s-t-jsq" x="145" y="100" width="10" height="14"></rect><rect class="s-g-eg s-t-jsq" x="212.5" y="100" width="10" height="14"></rect>
<rect class="s-g-tile s-t-expw" x="20" y="100" width="57.5" height="14" rx="1.5"></rect><rect class="s-g-tile s-t-expw" x="87.5" y="100" width="57.5" height="14" rx="1.5"></rect><rect class="s-g-tile s-t-expw" x="155" y="100" width="57.5" height="14" rx="1.5"></rect><rect class="s-g-tile s-t-expw" x="222.5" y="100" width="57.5" height="14" rx="1.5"></rect>
<g class="s-t-press2"><path class="s-g-arrow s-ok" d="M71 92h6m-3-3l3 3-3 3M94 92h-6m3-3l-3 3 3 3M139 92h6m-3-3l3 3-3 3M161 92h-6m3-3l-3 3 3 3M206 92h6m-3-3l3 3-3 3M229 92h-6m3-3l-3 3 3 3"></path></g>
<g class="s-okc s-tgok"><circle cx="262" cy="74" r="11"></circle><path d="M256.5 74.5l3.7 3.7 7.3-7.8"></path></g>
<text class="s-g-lab" x="22" y="80">Parapet</text>
<text class="s-g-good s-g-late" x="150" y="166" text-anchor="middle">Joints take the movement. Tiles stay flat.</text>
</svg>`;

const WIDE_TERRACE_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Same sun, same expansion</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>The wide joints take up the movement</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>At night tiles shrink back; HW212 joints stay sound</span></li></ol>`;

const COLOURS_STYLE = `.sc-hw212-7-standard-colours .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw212-7-standard-colours.playing .s-st1{animation-name:k-hw212-7-standard-colours-st1}
.anim .sc-hw212-7-standard-colours.playing .s-st2{animation-name:k-hw212-7-standard-colours-st2}
.anim .sc-hw212-7-standard-colours.playing .s-st3{animation-name:k-hw212-7-standard-colours-st3}
.sc-hw212-7-standard-colours .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw212-7-standard-colours .s-w-shade{fill:#9C9A94}
.anim .sc-hw212-7-standard-colours.playing .s-w-shade{animation-name:k-hw212-7-standard-colours-wShade;animation-timing-function:ease-in-out}
@keyframes k-hw212-7-standard-colours-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw212-7-standard-colours-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw212-7-standard-colours-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw212-7-standard-colours-wShade{0%,12%{fill:#9C9A94}14%,26%{fill:#E6DFCF}28%,40%{fill:#C9B48E}42%,54%{fill:#A5654A}56%,68%{fill:#3E4248}70%,82%{fill:#6E4F3A}84%,96%{fill:#7E93A2}100%{fill:#9C9A94}}`;

const COLOURS_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 98">
<rect class="s-w-shade" x="6" y="4" width="288" height="94" rx="4"></rect>
<g><rect class="s-g-tile" x="16" y="14" width="82" height="32" rx="2"></rect><rect class="s-g-tile" x="108" y="14" width="82" height="32" rx="2"></rect><rect class="s-g-tile" x="200" y="14" width="84" height="32" rx="2"></rect><rect class="s-g-tile" x="16" y="56" width="82" height="32" rx="2"></rect><rect class="s-g-tile" x="108" y="56" width="82" height="32" rx="2"></rect><rect class="s-g-tile" x="200" y="56" width="84" height="32" rx="2"></rect></g>
</svg>`;

const COMPRESSIVE_STYLE = `.sc-hw212-compressive .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw212-compressive.playing .s-st1{animation-name:k-hw212-compressive-st1}
.sc-hw212-compressive .s-g-eg{fill:var(--egj)}
.sc-hw212-compressive .s-w-pl{fill:var(--ink-2)}
.sc-hw212-compressive .s-w-ar{fill:none;stroke:var(--tg);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.sc-hw212-compressive .s-w-press{transform-box:fill-box}
.sc-hw212-compressive .s-w-sq{transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw212-compressive.playing .s-w-press{animation-name:k-hw212-compressive-wPress;animation-timing-function:ease-in-out}
.anim .sc-hw212-compressive.playing .s-w-sq{animation-name:k-hw212-compressive-wSq;animation-timing-function:ease-in-out}
.anim .sc-hw212-compressive.playing .s-st1 .disc{animation-name:k-hw212-compressive-st1-disc}
@keyframes k-hw212-compressive-st1{0%,100%{opacity:1}}
@keyframes k-hw212-compressive-wPress{0%,8%{transform:translateY(-12px)}38%{transform:none}50%,75%{transform:translateY(1.8px)}92%,100%{transform:translateY(-12px)}}
@keyframes k-hw212-compressive-wSq{0%,38%{transform:none}50%,75%{transform:scaleY(.95)}88%,100%{transform:none}}
@keyframes k-hw212-compressive-st1-disc{0%,100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}`;

const COMPRESSIVE_SVG = `<svg class="s-cs-svg" viewBox="0 0 140 96">
<g class="s-w-press"><rect class="s-w-pl" x="30" y="38" width="80" height="8" rx="2"></rect><path class="s-w-ar" d="M70 6v24m-6-6l6 6 6-6"></path></g>
<rect class="s-g-eg s-w-sq" x="45" y="46" width="50" height="36"></rect>
<rect class="s-w-pl" x="30" y="82" width="80" height="8" rx="2"></rect>
</svg>`;

const TENSILE_STYLE = `.sc-hw212-tensile .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw212-tensile .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw212-tensile .s-g-eg{fill:var(--egj)}
.sc-hw212-tensile .s-w-ar{fill:none;stroke:var(--tg);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.sc-hw212-tensile .s-w-lift{transform-box:fill-box}
.sc-hw212-tensile .s-w-str{transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw212-tensile.playing .s-w-lift{animation-name:k-hw212-tensile-wLift;animation-timing-function:ease-in-out}
.anim .sc-hw212-tensile.playing .s-w-str{animation-name:k-hw212-tensile-wStr;animation-timing-function:ease-in-out}
@keyframes k-hw212-tensile-wLift{0%,15%{transform:none}45%,75%{transform:translateY(-3px)}90%,100%{transform:none}}
@keyframes k-hw212-tensile-wStr{0%,15%{transform:none}45%,75%{transform:scaleY(1.25)}90%,100%{transform:none}}`;

const TENSILE_SVG = `<svg class="s-cs-svg" viewBox="0 0 140 96">
<rect x="20" y="72" width="100" height="20" fill="var(--conc)"></rect>
<rect class="s-g-eg s-w-str" x="35" y="60" width="70" height="12"></rect>
<g class="s-w-lift"><rect class="s-g-tile" x="35" y="48" width="70" height="12" rx="1.5"></rect><path class="s-w-ar" d="M70 42V8m-6 6l6-6 6 6"></path></g>
</svg>`;

const FLEXURAL_STYLE = `.sc-hw212-flexural .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw212-flexural .s-g-eg{fill:var(--egj)}
.sc-hw212-flexural .s-w-pl{fill:var(--ink-2)}
.sc-hw212-flexural .s-w-ar{fill:none;stroke:var(--tg);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.sc-hw212-flexural .s-w-load{transform-box:fill-box}
.sc-hw212-flexural .s-w-bl{transform-box:view-box;transform-origin:30px 70px}
.sc-hw212-flexural .s-w-br{transform-box:view-box;transform-origin:110px 70px}
.anim .sc-hw212-flexural.playing .s-w-bl{animation-name:k-hw212-flexural-wBl;animation-timing-function:ease-in-out}
.anim .sc-hw212-flexural.playing .s-w-br{animation-name:k-hw212-flexural-wBr;animation-timing-function:ease-in-out}
.anim .sc-hw212-flexural.playing .s-w-load{animation-name:k-hw212-flexural-wLoad;animation-timing-function:ease-in-out}
@keyframes k-hw212-flexural-wBl{0%,15%{transform:none}45%,75%{transform:rotate(3deg)}90%,100%{transform:none}}
@keyframes k-hw212-flexural-wBr{0%,15%{transform:none}45%,75%{transform:rotate(-3deg)}90%,100%{transform:none}}
@keyframes k-hw212-flexural-wLoad{0%,15%{transform:none}45%,75%{transform:translateY(2.5px)}90%,100%{transform:none}}`;

const FLEXURAL_SVG = `<svg class="s-cs-svg" viewBox="0 0 140 96">
<path d="M12 84h116" stroke="var(--ink-2)" stroke-width="1.5"></path>
<path class="s-w-pl" d="M30 70l-8 14h16zM110 70l-8 14h16z"></path>
<rect class="s-g-eg s-w-bl" x="18" y="58" width="52" height="12"></rect><rect class="s-g-eg s-w-br" x="70" y="58" width="52" height="12"></rect>
<g class="s-w-load"><path class="s-w-ar" d="M70 12v38m-6-6l6 6 6-6"></path></g>
</svg>`;

const MIXING212_STYLE = `.sc-hw212-mixing .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw212-mixing.playing .s-st1{animation-name:k-hw212-mixing-st1}
.anim .sc-hw212-mixing.playing .s-st2{animation-name:k-hw212-mixing-st2}
.anim .sc-hw212-mixing.playing .s-st3{animation-name:k-hw212-mixing-st3}
.sc-hw212-mixing .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw212-mixing .s-g-pour{fill:#d9d9d9;transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)}
.sc-hw212-mixing .s-g-pw{fill:#cacaca}
.sc-hw212-mixing .s-g-pa2{fill:var(--egj)}
.anim .sc-hw212-mixing.playing .s-g-pa2{animation-name:k-hw212-mixing-paste}
.sc-hw212-mixing .s-g-jug{fill:var(--water);opacity:.9}
.sc-hw212-mixing .s-g-pourw{fill:var(--water)}
.sc-hw212-mixing .s-g-bag{fill:var(--tg)}
.anim .sc-hw212-mixing.playing .s-st1 .disc{animation-name:k-hw212-mixing-st1-disc}
.anim .sc-hw212-mixing.playing .s-st2 .disc{animation-name:k-hw212-mixing-st2-disc}
.anim .sc-hw212-mixing.playing .s-st3 .disc{animation-name:k-hw212-mixing-st3-disc}
.sc-hw212-mixing .s-g-bk{fill:color-mix(in srgb,var(--ink) 7%,transparent)}.sc-hw212-mixing .s-g-in{fill:color-mix(in srgb,var(--ink) 5%,transparent)}.sc-hw212-mixing .s-g-fr{fill:color-mix(in srgb,var(--panel) 22%,transparent);stroke:var(--ink-2);stroke-width:1.6;stroke-linejoin:round}.sc-hw212-mixing .s-g-sh{fill:color-mix(in srgb,var(--ink) 7%,transparent)}.sc-hw212-mixing .s-g-rim{fill:none;stroke:var(--ink-2);stroke-width:4}.sc-hw212-mixing .s-g-code{fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round}.sc-hw212-mixing .s-g-mug{fill:color-mix(in srgb,var(--panel) 30%,transparent);stroke:var(--ink-2);stroke-width:1.6;stroke-linejoin:round}.sc-hw212-mixing .s-g-mugh{fill:none;stroke:var(--ink-2);stroke-width:2.4;stroke-linecap:round}.sc-hw212-mixing .s-g-mugw{fill:var(--water)}
@keyframes k-hw212-mixing-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw212-mixing-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw212-mixing-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw212-mixing-paste{0%,40%{opacity:0}58%,96%{opacity:1}100%{opacity:0}}
@keyframes k-hw212-mixing-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw212-mixing-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw212-mixing-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const MIXING212_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 184">
<g><path class="s-g-bag" d="M20 46Q18 38 26 37H70Q78 38 76 46L78 104Q78 110 72 110H24Q18 110 18 104Z"></path><text x="48" y="68" fill="#fff" font-size="12" font-weight="600" text-anchor="middle" font-family="var(--font-display)">HW212</text><text x="48" y="90" fill="var(--gold)" font-size="15" font-weight="600" text-anchor="middle" font-family="var(--font-display)">10 kg</text></g>
<text class="s-g-lab" x="48" y="126" text-anchor="middle">10 kg bag</text>
<path class="s-g-bk" d="M110 96L117 162Q118 167 123 167H177Q182 167 183 162L190 96Z"></path><ellipse class="s-g-in" cx="150" cy="96" rx="40" ry="7"></ellipse><path class="s-g-pw" d="M112.5 120L117 162Q118 166 123 166H177Q182 166 183 162L187.5 120Z"></path><ellipse class="s-g-pw" cx="150" cy="120" rx="37.5" ry="5.5"></ellipse><path class="s-g-pa2" d="M112.5 120L117 162Q118 166 123 166H177Q182 166 183 162L187.5 120Z"></path><ellipse class="s-g-pa2" cx="150" cy="120" rx="37.5" ry="5.5"></ellipse><path class="s-g-fr" d="M110 96L117 162Q118 167 123 167H177Q182 167 183 162L190 96Z"></path><path class="s-g-sh" d="M150 96V167H177Q182 167 183 162L190 96Z"></path><ellipse class="s-g-rim" cx="150" cy="96" rx="40" ry="7"></ellipse>
<text class="s-g-code" x="150" y="161" font-size="13" font-weight="600" text-anchor="middle" font-family="var(--font-display)">HW212</text>
<rect class="s-g-pour s-g-pourw" x="164.5" y="80" width="4.5" height="40" rx="2"></rect>
<text class="s-g-lab" x="236" y="92" text-anchor="middle">2.1–2.3 L</text><text class="s-g-lab" x="236" y="105" text-anchor="middle">clean water</text>
<text class="s-g-lab" x="150" y="182" text-anchor="middle" style="font-weight:600">Smooth, lump-free · use within 60 min</text>
</svg>`;

const MIXING212_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>10 kg powder and 2.1–2.3 L clean water</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Mix to a smooth, lump-free paste</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Use within 60 min. Never add water later</span></li></ol>`;

const GROUTING212_STYLE = `.sc-hw212-grouting .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw212-grouting.playing .s-st1{animation-name:k-hw212-grouting-st1}
.anim .sc-hw212-grouting.playing .s-st2{animation-name:k-hw212-grouting-st2}
.anim .sc-hw212-grouting.playing .s-st3{animation-name:k-hw212-grouting-st3}
.sc-hw212-grouting .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw212-grouting .s-g-gap{fill:var(--ink);opacity:.55}
.sc-hw212-grouting .s-g-eg{fill:var(--egj)}
.sc-hw212-grouting .s-g-flt rect{fill:var(--ink);opacity:.92}
.sc-hw212-grouting .s-g-flt{opacity:0}
.sc-hw212-grouting .s-g-sweep{transform:translate(240px,240px)}
.sc-hw212-grouting .s-g-haze{fill:var(--egj);opacity:0}
.sc-hw212-grouting .s-g-spg{opacity:0}
.sc-hw212-grouting .s-g-spg ellipse{fill:var(--gold)}
.anim .sc-hw212-grouting.playing .s-g-sweep{animation-name:k-hw212-grouting-sweep}
.anim .sc-hw212-grouting.playing .s-g-flt{animation-name:k-hw212-grouting-flt}
.anim .sc-hw212-grouting.playing .s-g-haze{animation-name:k-hw212-grouting-haze}
.anim .sc-hw212-grouting.playing .s-g-spg{animation-name:k-hw212-grouting-spg}
.anim .sc-hw212-grouting.playing .s-st1 .disc{animation-name:k-hw212-grouting-st1-disc}
.anim .sc-hw212-grouting.playing .s-st2 .disc{animation-name:k-hw212-grouting-st2-disc}
.anim .sc-hw212-grouting.playing .s-st3 .disc{animation-name:k-hw212-grouting-st3-disc}
.sc-hw212-grouting{--grout:color-mix(in srgb,var(--gold) 55%,var(--paper))}.sc-hw212-grouting .s-g-gap{opacity:.85}.sc-hw212-grouting .s-g-eg,.sc-hw212-grouting .s-g-haze{fill:var(--grout)}
@keyframes k-hw212-grouting-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw212-grouting-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw212-grouting-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw212-grouting-sweep{0%,4%{transform:translate(10px,10px)}58%,96%{transform:translate(240px,240px)}100%{transform:translate(10px,10px)}}
@keyframes k-hw212-grouting-flt{0%,3%{opacity:0;transform:translate(10px,10px)}5%{opacity:1;transform:translate(10px,10px)}58%{opacity:1;transform:translate(240px,240px)}61%,100%{opacity:0;transform:translate(240px,240px)}}
@keyframes k-hw212-grouting-haze{0%,10%{opacity:0}40%,66%{opacity:.28}90%,100%{opacity:0}}
@keyframes k-hw212-grouting-spg{0%,63%{opacity:0;transform:translate(0,0)}66%{opacity:1;transform:translate(0,0)}70%{transform:translate(30px,-12px)}74%{transform:translate(60px,0)}78%{transform:translate(30px,12px)}82%{transform:translate(0,0)}86%{transform:translate(30px,-12px)}90%{opacity:1;transform:translate(60px,0)}93%,100%{opacity:0;transform:translate(60px,0)}}
@keyframes k-hw212-grouting-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw212-grouting-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw212-grouting-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const GROUTING212_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 200">
<defs><mask id="hw212-grouting-mSw2" maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="200"><polygon class="s-g-sweep" points="-1000,1000 1000,-1000 -1000,-1000" fill="#fff"></polygon></mask></defs>
<rect class="s-g-gap" x="28" y="8" width="243" height="185" rx="3"></rect>
<rect class="s-g-eg" x="28" y="8" width="243" height="185" rx="3" mask="url(#hw212-grouting-mSw2)"></rect>
<g><rect class="s-g-tile" x="39" y="19" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="97" y="19" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="155" y="19" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="213" y="19" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="39" y="77" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="97" y="77" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="155" y="77" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="213" y="77" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="39" y="135" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="97" y="135" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="155" y="135" width="47" height="47" rx="2"></rect><rect class="s-g-tile" x="213" y="135" width="47" height="47" rx="2"></rect></g>
<rect class="s-g-haze" x="28" y="8" width="243" height="185" rx="3"></rect>
<g class="s-g-flt"><rect x="-46" y="-9" width="92" height="18" rx="5" transform="rotate(-45)"></rect></g>
<g class="s-g-spg"><ellipse cx="110" cy="100" rx="20" ry="13"></ellipse></g>
</svg>`;

const GROUTING212_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Press in firmly with a float or putty blade</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Fill every wide joint fully, no voids</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Clean the tile face with a damp sponge, in circles</span></li></ol>`;

async function main() {
  const slides = [
    {
      type: 'image',
      title: 'Tile Grout Wide',
      data: {
        text: 'Hard Worker HW212. Polymer-modified, sanded cement grout for 6–12 mm joints, terraces and roofs.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/tile-grout-wide-hw212.png'],
        caption: 'HW212 — Wide joints. Terraces. Just add water.',
        key: 'HW212 · Polymer-Modified, Cement-Based Sanded Tile Grout',
      },
    },
    {
      type: 'text',
      title: 'Where It Goes',
      data: {
        text: 'Wide joints on floors and walls, indoors and out, and on terraces and roofs.<div class="item-grid"><div class="item-card">Terraces and roofs<span class="item-card-check">✓</span></div><div class="item-card">Wide joints, 6–12 mm<span class="item-card-check">✓</span></div><div class="item-card">Interior and exterior<span class="item-card-check">✓</span></div><div class="item-card">Walls and floors<span class="item-card-check">✓</span></div><div class="item-card">Bathrooms and kitchens<span class="item-card-check">✓</span></div><div class="item-card">Homes, commercial and institutional<span class="item-card-check">✓</span></div></div>',
      },
    },
    {
      type: 'svg',
      title: 'Wide Joint, More Grout',
      data: {
        text: 'A 6–12 mm joint holds a lot of material. Plain cement paste shrinks as it dries and cracks down the middle. HW212 carries sand that gives the joint body.',
        svgMarkup: svgCards([
          svgCard({ title: 'Plain cement paste', style: PLAIN_PASTE_STYLE, svg: PLAIN_PASTE_SVG, ol: PLAIN_PASTE_OL, verdict: 'bad' }),
          svgCard({ title: 'HW212 sanded grout', style: SANDED_STYLE, svg: SANDED_SVG, ol: SANDED_OL, verdict: 'ok' }),
        ]),
        badges: [
          { icon: '🧱', label: 'Body', sub: 'Sand fills the width firmly', tone: 'neutral' },
          { icon: '🔒', label: 'Non-shrink', sub: 'Stays tight to the tile edge', tone: 'ok' },
          { icon: '✅', label: 'Crack resistant', sub: 'Holds together across the joint', tone: 'ok' },
        ],
      },
    },
    {
      type: 'knowledge',
      title: 'Knowledge Check — Terrace Joint',
      data: {
        text: 'A customer is tiling a terrace with 10 mm joints. Which grout do you recommend?',
        list: [
          'HW212 Tile Grout Wide: sanded, for 6–12 mm joints, terraces and roofs',
          'HW210 Tile Grout',
          'Plain white cement',
          'Tile adhesive pressed into the joints',
        ],
        correctIndex: 0,
        explanation: 'Terraces see big temperature swings, so tiles move more. Wide joints filled with sanded HW212 take that movement. Source: HW212 Ready Reckoner, terraces.',
      },
    },
    {
      type: 'svg',
      title: 'Exposed Areas Move More',
      data: {
        text: 'A terrace takes full sun by day and cools down at night. The bigger the temperature swing, the more the tiles expand and contract. Wide joints give them room to move.',
        gauges: [
          { label: 'Temperature swing — Indoor', sub: 'Small', valuePct: 25, result: 'Small', highlight: false, showDot: false },
          { label: 'Temperature swing — Terrace', sub: 'Large', valuePct: 90, result: 'Large', highlight: true, showDot: false },
          { label: 'Expansion & contraction — Indoor', sub: 'Small', valuePct: 25, result: 'Small', highlight: false, showDot: false },
          { label: 'Expansion & contraction — Terrace', sub: 'Large', valuePct: 90, result: 'Large', highlight: true, showDot: false },
        ],
        svgMarkup: svgCards([
          svgCard({ title: 'Narrow joints on a terrace', style: NARROW_TERRACE_STYLE, svg: NARROW_TERRACE_SVG, ol: NARROW_TERRACE_OL, verdict: 'bad' }),
          svgCard({ title: 'Wide joints with HW212', style: WIDE_TERRACE_STYLE, svg: WIDE_TERRACE_SVG, ol: WIDE_TERRACE_OL, verdict: 'ok' }),
        ]),
        badges: [
          { icon: '🌡️', label: 'Bigger temperature swing', sub: 'More expansion and contraction', tone: 'neutral' },
          { icon: '📐', label: 'Wide joints, filled with HW212', sub: '6–12 mm joints — room for the tiles to move', tone: 'neutral' },
          { icon: '✅', label: 'Non-shrink, non-cracking', sub: 'The joint stays sound', tone: 'ok' },
          { icon: '🌦️', label: 'Weather resistant', sub: 'Sun and rain; no water curing', tone: 'ok' },
        ],
        explanation: "Sell It Right: HW212 closes the joints between terrace tiles. The terrace still needs its waterproofing layer under the tiles; grout works with it, not instead of it.",
      },
    },
    {
      type: 'svg',
      title: 'HW212 · Polymer-Modified, Cement-Based Sanded Tile Grout',
      data: {
        text: '',
        svgMarkup: svgCards([svgCard({ title: '7 standard colours', style: COLOURS_STYLE, svg: COLOURS_SVG })]),
        badges: [
          { icon: '💧', label: 'Water resistant', sub: 'Seals joints against moisture and dirt', tone: 'neutral' },
          { icon: '🧱', label: 'Non-shrink', sub: 'No sagging, no swelling', tone: 'ok' },
          { icon: '💪', label: 'High strength', sub: 'Durable on walls and floors', tone: 'neutral' },
          { icon: '✅', label: 'Crack resistant', sub: 'Non-shrink and non-cracking', tone: 'ok' },
          { icon: '🌦️', label: 'Water and weather resistant', sub: 'Interior and exterior', tone: 'neutral' },
          { icon: '🚫', label: 'No water curing', sub: 'No external curing needed', tone: 'neutral' },
          { icon: '🎨', label: 'Colour consistency', sub: '7 standard colours; smooth, uniform finish', tone: 'neutral' },
          { icon: '🧽', label: 'Easy to apply and clean', sub: 'Float in, sponge off', tone: 'neutral' },
        ],
      },
    },
    {
      type: 'card',
      title: 'The Numbers',
      data: {
        text: 'As declared in the TDS, tested under standard lab conditions.',
        stats: [
          { value: '60', label: 'minutes pot life', sub: 'After mixing' },
          { value: '24', label: 'hours to foot traffic', sub: 'No water curing needed' },
          { value: '21–23%', label: 'water to powder', sub: '2.1–2.3 L per 10 kg bag' },
          { value: '6', label: 'months shelf life', sub: 'Sealed, dry, away from moisture' },
        ],
        tableRows: [
          { label: 'Appearance', value: 'Coloured powder' },
          { label: 'Mix', value: 'Premixed, with sand' },
          { label: 'Joint width', value: '6–12 mm' },
          { label: 'Surface temperature', value: '16–32 °C' },
          { label: 'Colours', value: '7 standard' },
          { label: 'Pack', value: '10 kg bag' },
          { label: 'Water curing', value: 'Not required' },
          { label: 'Coverage', value: '6.0–6.5 m per kg*' },
          { label: 'Use', value: 'Walls and floors' },
        ],
        explanation: '* Running metres of 10 mm × 10 mm joint, 10 mm thick tile.',
      },
    },
    {
      type: 'svg',
      title: 'Strength, Explained',
      data: {
        text: 'Three tests, three jobs the joint does. All values at 28 days.',
        svgMarkup: svgCards([
          svgCard({ title: 'Compressive', style: COMPRESSIVE_STYLE, svg: COMPRESSIVE_SVG, ol: '<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>IS 2250</span></li></ol>' }),
          svgCard({ title: 'Tensile', style: TENSILE_STYLE, svg: TENSILE_SVG, ol: '<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>IS 15477</span></li></ol>' }),
          svgCard({ title: 'Flexural', style: FLEXURAL_STYLE, svg: FLEXURAL_SVG, ol: '<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>IS 4031-8</span></li></ol>' }),
        ]),
        stats: [
          { value: '12–15', label: 'MPa compressive', sub: 'IS 2250, 28 days' },
          { value: '2.0–2.7', label: 'MPa tensile', sub: 'IS 15477, 28 days' },
          { value: '3.9–5.8', label: 'MPa flexural', sub: 'IS 4031-8, 28 days' },
        ],
      },
    },
    {
      type: 'card',
      title: 'Pick by Joint Width',
      data: {
        text: 'Up to 6 mm, HW210. From 6 to 12 mm, and on terraces and roofs, HW212.',
        gauges: [
          { label: 'HW210 — Tile grout', sub: '1–6 mm', valuePct: 50, result: '1–6 mm', highlight: false, showDot: false },
          { label: 'HW212 — Tile grout wide', sub: '6–12 mm', valuePct: 100, result: '6–12 mm', highlight: true, showDot: false },
        ],
        table: {
          headers: ['Feature', 'HW210 (Tile grout)', 'HW212 (Tile grout wide)'],
          rows: [
            ['Joint width', '1–6 mm', '6–12 mm'],
            ['Built with', 'Polymer-modified cement', 'Polymer-modified cement + sand'],
            ['Compressive, 28 d', '7–8 MPa', '12–15 MPa'],
            ['Mixing water', '350–400 ml per kg', '2.1–2.3 L per 10 kg'],
            ['Pot life', '60 min', '60 min'],
            ['Foot traffic', '24 h', '24 h'],
            ['Shades', '40+', '7 standard'],
            ['Pack', '1 kg', '10 kg'],
            ['Best for', 'Everyday floors and walls, bathrooms, kitchens', 'Wide joints, terraces and roofs, exterior'],
          ],
        },
      },
    },
    {
      type: 'svg',
      title: 'Mix, Press, Sponge',
      data: {
        text: 'One 10 kg bag, 2.1–2.3 litres of clean water, one smooth paste.',
        svgMarkup: svgCards([
          svgCard({ title: 'Mixing', style: MIXING212_STYLE, svg: MIXING212_SVG, ol: MIXING212_OL }),
          svgCard({ title: 'Grouting', style: GROUTING212_STYLE, svg: GROUTING212_SVG, ol: GROUTING212_OL }),
        ]),
        steps: [
          { title: 'Prepare', desc: 'Joints free of dust, adhesive and spacers. Slightly damp' },
          { title: 'Mix', desc: '10 kg + 2.1–2.3 L water, lump-free' },
          { title: 'Grout', desc: 'Float or putty blade, press firmly into joints' },
          { title: 'Clean', desc: 'Damp sponge in a circular motion' },
          { title: 'Finish', desc: 'Polish with a dry cloth once dry' },
        ],
        tableRows: [
          { label: '60 min', value: 'Pot life: use the mix within' },
          { label: '24 h', value: 'Open to foot traffic' },
          { label: 'Nil', value: 'External water curing' },
        ],
      },
    },
    {
      type: 'card',
      title: 'How Much to Order',
      data: {
        text: 'Coverage depends on the joint: wider and deeper joints take more grout.',
        stats: [{ value: '6.0–6.5', label: 'running metres of joint per kg', sub: '10 mm wide × 10 mm deep, 10 mm thick tile' }],
        calc: {
          mode: 'tileJoint',
          unitLabel: 'Area',
          defaultQty: 1000,
          min: 1,
          max: 1000000,
          units: [
            { label: 'sq ft', factor: 1 },
            { label: 'm²', factor: 10.7639 },
          ],
          tileSizesMm: [300, 400, 600, 800],
          defaultTileSizeIdx: 0,
          jointWidthMm: { default: 10, min: 4, max: 20 },
          tileThicknessMm: { default: 10, min: 6, max: 30 },
          baselineJointWidthMm: 10,
          baselineThicknessMm: 10,
          minCoveragePerKg: 6.0,
          maxCoveragePerKg: 6.5,
          packSizeKg: 10,
          resultUnit: 'kg of HW212',
          resultLabel: 'bags of HW212 (10 kg)',
          tileJointResultLabel: 'For {qty} {unit} with {joint} mm joints',
          note: 'Estimate scaled from the coverage above (1 kg ≈ 6.0–6.5 running metres at 10 × 10 mm) to your joint width and tile thickness. Add site wastage.',
        },
      },
    },
    {
      type: 'text',
      title: 'Do This, Not That',
      data: {
        text: 'Check them on every site visit.',
        badges: [
          { icon: '🚫', label: "Don't add extra water", sub: 'No remixing or water after the first mix', tone: 'bad' },
          { icon: '🚫', label: "Don't mix with cement or sand", sub: 'Use HW212 as it comes', tone: 'bad' },
          { icon: '🚫', label: "Don't grout in extreme weather", sub: 'Keep the surface between 16 and 32 °C', tone: 'bad' },
          { icon: '🚫', label: "Don't acid-clean just before grouting", sub: 'If used, rinse with plenty of clean water', tone: 'bad' },
          { icon: '✅', label: 'Clean the joints', sub: 'Remove dust, adhesive and spacers', tone: 'ok' },
          { icon: '✅', label: 'Slightly damp the joints', sub: 'Just before grouting', tone: 'ok' },
          { icon: '✅', label: "Mix only 60 minutes' worth", sub: 'What you can apply within the pot life', tone: 'ok' },
          { icon: '✅', label: 'Clean tools immediately', sub: 'Before the grout sets', tone: 'ok' },
          { icon: '✅', label: 'Wear gloves, mask and goggles', sub: 'Cement-based: rinse skin or eyes with clean water', tone: 'ok' },
        ],
      },
    },
    {
      type: 'knowledge',
      title: 'Scenario: On Site — Grout Instead of Waterproofing',
      data: {
        text: 'A contractor plans to skip the waterproofing layer on a terrace because the tile joints will be grouted with HW212. What do you tell the contractor?',
        list: [
          'HW212 closes the joints, but the terrace still needs its waterproofing layer under the tiles',
          'HW212 waterproofs the terrace on its own',
          'Add more water to HW212 so it seals better',
          'Use HW210 instead, it waterproofs',
        ],
        correctIndex: 0,
        explanation: 'Grout works with the waterproofing layer, not instead of it. Source: HW212 Ready Reckoner, sell it right.',
      },
    },
    {
      type: 'text',
      title: 'Cheat Sheet',
      data: {
        text: 'HW212 at a glance. Check it before a visit.',
        sections: [
          { label: 'What it is', text: 'Premixed sanded cement grout with polymers, for 6–12 mm tile joints. Mixed with water only. 7 standard colours.' },
          { label: 'Why sanded', text: 'A wide joint holds a lot of material. Plain cement paste shrinks and cracks; sand gives HW212 body, and it is non-shrink and crack resistant.' },
          { label: 'Terraces', text: 'Exposed areas see bigger temperature swings, so tiles expand and contract more. Narrow joints leave no room: tiles push, lift and joints crack. Wide 6–12 mm joints take the movement, and HW212 fills them: non-shrink, crack and weather resistant, no water curing. It works with the terrace waterproofing, not instead of it.' },
          { label: 'Key numbers', text: '12–15 MPa compressive, 2.0–2.7 tensile, 3.9–5.8 flexural at 28 days. 60 min pot life; foot traffic after 24 h.' },
          { label: 'Mix', text: '10 kg + 2.1–2.3 L clean water (21–23%). Lump-free. Never add water later.' },
          { label: 'How to use', text: 'Clean joints, remove spacers, slightly damp. Press in with a float or putty blade. Damp sponge in circles. Dry cloth to polish.' },
          { label: 'Coverage', text: '1 kg ≈ 6.0–6.5 running metres of 10 × 10 mm joint, 10 mm thick tile.' },
          { label: 'Where', text: 'Interior and exterior tile joints; walls and floors; residential and commercial roofs; institutional areas, including bathrooms and kitchens.' },
          { label: 'HW210 or HW212', text: 'Up to 6 mm: HW210 (1 kg, 40+ shades). 6–12 mm, terraces and roofs: HW212 (10 kg, 7 colours).' },
          { label: 'Never', text: 'Extra water · mixing with cement or sand · extreme weather · acid cleaning without a thorough rinse.' },
          { label: 'Pack', text: '10 kg bag. 6 months shelf life, sealed and dry.' },
        ],
      },
    },
  ];

  await seedProduct({
    productName: 'HW212 Tile Grout Wide',
    productDescription: 'Polymer-modified, cement-based sanded-grout for tile and stone joints',
    topicDescription: 'Everything a sales, dealer or applicator team member needs to know about HW212 Tile Grout Wide: where it goes, why wide joints need sand and body, terrace movement, lab-verified strength, mixing, coverage and ordering, and how it compares to HW210.',
    assessmentQuestionCount: 5,
    assessmentPassPercentage: 70,
    slides,
  });
}

main().catch((e) => { console.error(e); process.exit(1); });
