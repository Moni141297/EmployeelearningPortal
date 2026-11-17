/*
 * Seeds "HW210 Tile Grout" (Hard Worker range) from the Learning Hub reference
 * (https://hw-learning-hub-v2.vercel.app/products/cement-grout-hw210), 16 steps.
 * Two of its animated diagrams ("Why a Grout Is Needed" / "Why the Gap Matters")
 * are the literal original source HW211's own diagrams borrowed byte-for-byte
 * from (HW211's scope classes are named sc-hw210-*) — reused here from the DB
 * rather than re-extracted, per PRD §3 extraction step 6.
 */
require('dotenv').config();
const { sql, getPool } = require('../src/db');
const { seedProduct } = require('./lib/seedProduct');
const { singleSvg, svgCard, svgCards } = require('./lib/svgCard');

async function getHw211SvgMarkup(title) {
  const pool = await getPool();
  const row = (await pool.request().input('cid', sql.Int, 15).input('title', sql.NVarChar, title)
    .query('SELECT ContentData FROM dbo.Lms_LearningSlides WHERE ContentId=@cid AND Title=@title')).recordset[0];
  if (!row) throw new Error(`HW211 slide "${title}" not found`);
  return JSON.parse(row.ContentData).svgMarkup;
}

// ---- Diagrams extracted fresh from the HW210 reference (not shared with HW211) ----

const PLAIN_CEMENT_STYLE = `.sc-hw210-plain-cement-in-the-joint .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-st1{animation-name:k-hw210-plain-cement-in-the-joint-st1}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-st2{animation-name:k-hw210-plain-cement-in-the-joint-st2}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-st3{animation-name:k-hw210-plain-cement-in-the-joint-st3}
.sc-hw210-plain-cement-in-the-joint .s-txb{fill:var(--cblk)}
.sc-hw210-plain-cement-in-the-joint .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw210-plain-cement-in-the-joint .s-g-bed{fill:var(--cmor)}
.sc-hw210-plain-cement-in-the-joint .s-g-gap{fill:var(--ink);opacity:.55}
.sc-hw210-plain-cement-in-the-joint .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw210-plain-cement-in-the-joint .s-g-bad{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw210-plain-cement-in-the-joint .s-g-drop{fill:var(--water)}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-g-late{animation-name:k-hw210-plain-cement-in-the-joint-late2}
.sc-hw210-plain-cement-in-the-joint .s-g-wc{fill:#dfdfdf}
.sc-hw210-plain-cement-in-the-joint :root[data-theme="dark"] .s-g-wc{fill:#adadad}
@media (prefers-color-scheme: dark){.sc-hw210-plain-cement-in-the-joint :root:not([data-theme="light"]) .s-g-wc{fill:#adadad}}
.sc-hw210-plain-cement-in-the-joint .s-g-cfill{transform-box:fill-box;transform-origin:50% 50%;transform:scaleX(.84)}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-g-cfill{animation-name:k-hw210-plain-cement-in-the-joint-shrinkC;animation-timing-function:ease-in-out}
.sc-hw210-plain-cement-in-the-joint .s-g-dust{fill:var(--ink-2);opacity:0}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-g-dust{animation-name:k-hw210-plain-cement-in-the-joint-dust;animation-delay:var(--dd,0s);animation-fill-mode:backwards}
.sc-hw210-plain-cement-in-the-joint .s-g-seep{opacity:0;transform-box:fill-box}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-g-seep{animation-name:k-hw210-plain-cement-in-the-joint-seep;animation-delay:var(--dd,0s);animation-fill-mode:backwards}
.sc-hw210-plain-cement-in-the-joint .s-g-wetp{fill:var(--water);opacity:.45;transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-g-wetp{animation-name:k-hw210-plain-cement-in-the-joint-wetp}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-st1 .disc{animation-name:k-hw210-plain-cement-in-the-joint-st1-disc}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-st2 .disc{animation-name:k-hw210-plain-cement-in-the-joint-st2-disc}
.anim .sc-hw210-plain-cement-in-the-joint.playing .s-st3 .disc{animation-name:k-hw210-plain-cement-in-the-joint-st3-disc}
@keyframes k-hw210-plain-cement-in-the-joint-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-plain-cement-in-the-joint-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-plain-cement-in-the-joint-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-plain-cement-in-the-joint-late2{0%,68%{opacity:0}74%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw210-plain-cement-in-the-joint-seep{0%,62%{opacity:0;transform:none}64%{opacity:1;transform:none}74%{opacity:1;transform:translateY(92px)}78%,100%{opacity:0;transform:translateY(94px)}}
@keyframes k-hw210-plain-cement-in-the-joint-wetp{0%,72%{opacity:0;transform:scale(.3)}86%,96%{opacity:.45;transform:scale(1)}100%{opacity:0}}
@keyframes k-hw210-plain-cement-in-the-joint-wFill{0%,4%{transform:scaleY(0)}22%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw210-plain-cement-in-the-joint-shrinkC{0%,36%{transform:none}54%,97%{transform:scaleX(.82)}100%{transform:none}}
@keyframes k-hw210-plain-cement-in-the-joint-dust{0%,38%{opacity:0;transform:none}42%{opacity:.85}60%{opacity:0;transform:translate(var(--dx),-18px)}100%{opacity:0}}
@keyframes k-hw210-plain-cement-in-the-joint-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-plain-cement-in-the-joint-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-plain-cement-in-the-joint-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const PLAIN_CEMENT_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 186">
<text class="s-g-bad s-g-late" x="150" y="20" text-anchor="middle">Gaps at the edges. Water gets under.</text>
<rect x="10" y="130" width="280" height="50" fill="var(--conc)"></rect><rect class="s-g-bed" x="10" y="118" width="280" height="12"></rect>
<ellipse class="s-g-wetp" cx="150" cy="124" rx="44" ry="7"></ellipse>
<rect class="s-g-gap" x="128" y="92" width="44" height="26"></rect>
<rect class="s-g-wc s-g-cfill" x="128" y="92" width="44" height="26"></rect>
<rect class="s-g-tile" x="10" y="92" width="118" height="26" rx="1.5"></rect><rect class="s-g-tile" x="172" y="92" width="118" height="26" rx="1.5"></rect>
<circle class="s-g-dust" cx="138" cy="90" r="1.8" style="--dd:0s;--dx:-8px"></circle><circle class="s-g-dust" cx="150" cy="89" r="2" style="--dd:.2s;--dx:3px"></circle><circle class="s-g-dust" cx="162" cy="90" r="1.8" style="--dd:.4s;--dx:9px"></circle><circle class="s-g-dust" cx="145" cy="90" r="1.5" style="--dd:.6s;--dx:-4px"></circle>
<circle class="s-g-drop s-g-seep" cx="131" cy="30" r="3.4" style="--dd:0s"></circle><circle class="s-g-drop s-g-seep" cx="169" cy="30" r="3.4" style="--dd:.3s"></circle>
<text class="s-g-lab" x="150" y="84" text-anchor="middle">Joint (zoomed)</text>
</svg>`;

const PLAIN_CEMENT_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Plain cement fills the joint</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>It shrinks away from the tile edge and dusts</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Water runs in and sits under the tiles</span></li></ol>`;

const HW210_IN_JOINT_STYLE = `.sc-hw210-hw210-in-the-joint .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw210-hw210-in-the-joint .s-okc circle{fill:var(--ok)}
.sc-hw210-hw210-in-the-joint .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw210-hw210-in-the-joint .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw210-hw210-in-the-joint.playing .s-st1{animation-name:k-hw210-hw210-in-the-joint-st1}
.anim .sc-hw210-hw210-in-the-joint.playing .s-st2{animation-name:k-hw210-hw210-in-the-joint-st2}
.anim .sc-hw210-hw210-in-the-joint.playing .s-st3{animation-name:k-hw210-hw210-in-the-joint-st3}
.anim .sc-hw210-hw210-in-the-joint.playing .s-okc{animation-name:k-hw210-hw210-in-the-joint-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw210-hw210-in-the-joint .s-txb{fill:var(--cblk)}
.sc-hw210-hw210-in-the-joint .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw210-hw210-in-the-joint .s-g-bed{fill:var(--cmor)}
.sc-hw210-hw210-in-the-joint .s-g-eg{fill:var(--egj)}
.sc-hw210-hw210-in-the-joint .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw210-hw210-in-the-joint .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw210-hw210-in-the-joint .s-g-drop{fill:var(--water)}
.sc-hw210-hw210-in-the-joint .s-tgok circle{fill:var(--tg)}
.sc-hw210-hw210-in-the-joint .s-g-dC{opacity:0;transform-box:fill-box}
.anim .sc-hw210-hw210-in-the-joint.playing .s-g-dC{animation-name:k-hw210-hw210-in-the-joint-dC;animation-fill-mode:backwards;animation-delay:var(--dd,0s)}
.anim .sc-hw210-hw210-in-the-joint.playing .s-g-late{animation-name:k-hw210-hw210-in-the-joint-late2}
.sc-hw210-hw210-in-the-joint .s-g-bondl{fill:none;stroke:var(--tg);stroke-width:3;stroke-linecap:round}
.anim .sc-hw210-hw210-in-the-joint.playing .s-g-bondl{animation-name:k-hw210-hw210-in-the-joint-bondl}
.anim .sc-hw210-hw210-in-the-joint.playing .s-st1 .disc{animation-name:k-hw210-hw210-in-the-joint-st1-disc}
.anim .sc-hw210-hw210-in-the-joint.playing .s-st2 .disc{animation-name:k-hw210-hw210-in-the-joint-st2-disc}
.anim .sc-hw210-hw210-in-the-joint.playing .s-st3 .disc{animation-name:k-hw210-hw210-in-the-joint-st3-disc}
@keyframes k-hw210-hw210-in-the-joint-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-hw210-in-the-joint-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-hw210-in-the-joint-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-hw210-in-the-joint-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw210-hw210-in-the-joint-dC{0%,64%{opacity:0;transform:none}66%{opacity:1;transform:none}73%{transform:translateY(62px)}78%{transform:translateY(44px)}83%{transform:translateY(62px);opacity:1}90%,100%{opacity:0;transform:translateY(62px)}}
@keyframes k-hw210-hw210-in-the-joint-late2{0%,68%{opacity:0}74%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw210-hw210-in-the-joint-bondl{0%,32%{opacity:0}38%{opacity:1}44%{opacity:.3}50%{opacity:1}56%{opacity:.3}62%,96%{opacity:1}100%{opacity:0}}
@keyframes k-hw210-hw210-in-the-joint-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-hw210-in-the-joint-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-hw210-in-the-joint-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const HW210_IN_JOINT_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 186">
<text class="s-g-good s-g-late" x="150" y="20" text-anchor="middle">Stays tight. Water stays out.</text>
<rect x="10" y="130" width="280" height="50" fill="var(--conc)"></rect><rect class="s-g-bed" x="10" y="118" width="280" height="12"></rect>
<rect class="s-g-eg" x="128" y="92" width="44" height="26"></rect>
<rect class="s-g-tile" x="10" y="92" width="118" height="26" rx="1.5"></rect><rect class="s-g-tile" x="172" y="92" width="118" height="26" rx="1.5"></rect>
<path class="s-g-bondl" d="M129 93v24M171 93v24"></path>
<circle class="s-g-drop s-g-dC" cx="140" cy="26" r="4" style="--dd:0s"></circle><circle class="s-g-drop s-g-dC" cx="160" cy="26" r="4" style="--dd:.25s"></circle>
<g class="s-okc s-tgok"><circle cx="252" cy="56" r="12"></circle><path d="M246 56.5l4 4 8-8.5"></path></g>
<text class="s-g-lab" x="150" y="84" text-anchor="middle">Joint (zoomed)</text>
</svg>`;

const HW210_IN_JOINT_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>HW210 fills the joint</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Nil shrinkage; the polymer grips the tile edges</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The joint stays sealed against water and dirt</span></li></ol>`;

const SHADES_STYLE = `.sc-hw210-40-shades .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw210-40-shades.playing .s-st1{animation-name:k-hw210-40-shades-st1}
.anim .sc-hw210-40-shades.playing .s-st2{animation-name:k-hw210-40-shades-st2}
.anim .sc-hw210-40-shades.playing .s-st3{animation-name:k-hw210-40-shades-st3}
.sc-hw210-40-shades .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw210-40-shades .s-g-shade{fill:#9C9A94}
.anim .sc-hw210-40-shades.playing .s-g-shade{animation-name:k-hw210-40-shades-shade;animation-timing-function:ease-in-out}
@keyframes k-hw210-40-shades-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-40-shades-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-40-shades-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-40-shades-shade{0%,12%{fill:#9C9A94}16%,28%{fill:#EDE8DC}32%,44%{fill:#6E4F3A}48%,60%{fill:#34383F}64%,76%{fill:#C9A46A}80%,92%{fill:#7E93A2}96%,100%{fill:#9C9A94}}`;

const SHADES_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 96">
<rect class="s-g-shade" x="6" y="4" width="288" height="88" rx="4"></rect>
<g><rect class="s-g-tile" x="12" y="10" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="82" y="10" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="152" y="10" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="222" y="10" width="66" height="35" rx="2"></rect><rect class="s-g-tile" x="12" y="51" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="82" y="51" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="152" y="51" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="222" y="51" width="66" height="35" rx="2"></rect></g>
</svg>`;

const MIXING_STYLE = `.sc-hw210-mixing .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw210-mixing.playing .s-st1{animation-name:k-hw210-mixing-st1}
.anim .sc-hw210-mixing.playing .s-st2{animation-name:k-hw210-mixing-st2}
.anim .sc-hw210-mixing.playing .s-st3{animation-name:k-hw210-mixing-st3}
.sc-hw210-mixing .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw210-mixing .s-g-pour{fill:#d9d9d9;transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)}
.sc-hw210-mixing .s-g-pw{fill:#cacaca}
.sc-hw210-mixing .s-g-pa2{fill:var(--egj)}
.anim .sc-hw210-mixing.playing .s-g-pa2{animation-name:k-hw210-mixing-paste}
.sc-hw210-mixing .s-g-jug{fill:var(--water);opacity:.9}
.sc-hw210-mixing .s-g-pourw{fill:var(--water)}
.sc-hw210-mixing .s-g-bag{fill:var(--tg)}
.anim .sc-hw210-mixing.playing .s-st1 .disc{animation-name:k-hw210-mixing-st1-disc}
.anim .sc-hw210-mixing.playing .s-st2 .disc{animation-name:k-hw210-mixing-st2-disc}
.anim .sc-hw210-mixing.playing .s-st3 .disc{animation-name:k-hw210-mixing-st3-disc}
.sc-hw210-mixing .s-g-bk{fill:color-mix(in srgb,var(--ink) 7%,transparent)}.sc-hw210-mixing .s-g-in{fill:color-mix(in srgb,var(--ink) 5%,transparent)}.sc-hw210-mixing .s-g-fr{fill:color-mix(in srgb,var(--panel) 22%,transparent);stroke:var(--ink-2);stroke-width:1.6;stroke-linejoin:round}.sc-hw210-mixing .s-g-sh{fill:color-mix(in srgb,var(--ink) 7%,transparent)}.sc-hw210-mixing .s-g-rim{fill:none;stroke:var(--ink-2);stroke-width:4}.sc-hw210-mixing .s-g-code{fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round}.sc-hw210-mixing .s-g-mug{fill:color-mix(in srgb,var(--panel) 30%,transparent);stroke:var(--ink-2);stroke-width:1.6;stroke-linejoin:round}.sc-hw210-mixing .s-g-mugh{fill:none;stroke:var(--ink-2);stroke-width:2.4;stroke-linecap:round}.sc-hw210-mixing .s-g-mugw{fill:var(--water)}
@keyframes k-hw210-mixing-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-mixing-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-mixing-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-mixing-paste{0%,40%{opacity:0}58%,96%{opacity:1}100%{opacity:0}}
@keyframes k-hw210-mixing-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-mixing-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-mixing-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const MIXING_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 184">
<g><path class="s-g-bag" d="M24 44Q24 38 30 38H66Q72 38 72 44L74 100Q74 104 70 104H26Q22 104 22 100Z"></path><text x="48" y="68" fill="#fff" font-size="12" font-weight="600" text-anchor="middle" font-family="var(--font-display)">HW210</text><text x="48" y="88" fill="var(--gold)" font-size="15" font-weight="600" text-anchor="middle" font-family="var(--font-display)">1 kg</text></g>
<text class="s-g-lab" x="48" y="120" text-anchor="middle">1 kg pack</text>
<path class="s-g-bk" d="M110 96L117 162Q118 167 123 167H177Q182 167 183 162L190 96Z"></path><ellipse class="s-g-in" cx="150" cy="96" rx="40" ry="7"></ellipse><path class="s-g-pw" d="M112.5 120L117 162Q118 166 123 166H177Q182 166 183 162L187.5 120Z"></path><ellipse class="s-g-pw" cx="150" cy="120" rx="37.5" ry="5.5"></ellipse><path class="s-g-pa2" d="M112.5 120L117 162Q118 166 123 166H177Q182 166 183 162L187.5 120Z"></path><ellipse class="s-g-pa2" cx="150" cy="120" rx="37.5" ry="5.5"></ellipse><path class="s-g-fr" d="M110 96L117 162Q118 167 123 167H177Q182 167 183 162L190 96Z"></path><path class="s-g-sh" d="M150 96V167H177Q182 167 183 162L190 96Z"></path><ellipse class="s-g-rim" cx="150" cy="96" rx="40" ry="7"></ellipse>
<text class="s-g-code" x="150" y="161" font-size="13" font-weight="600" text-anchor="middle" font-family="var(--font-display)">HW210</text>
<rect class="s-g-pour s-g-pourw" x="164.5" y="80" width="4.5" height="40" rx="2"></rect>
<text class="s-g-lab" x="256" y="120" text-anchor="middle">350–400 ml</text><text class="s-g-lab" x="256" y="133" text-anchor="middle">clean water</text>
<text class="s-g-lab" x="150" y="182" text-anchor="middle" style="font-weight:600">Smooth, lump-free · use within 60 min</text>
</svg>`;

const MIXING_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>1 kg powder and 350–400 ml clean water</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Mix to a smooth, lump-free paste</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Use within 60 min. Never add water later</span></li></ol>`;

const GROUTING_STYLE = `.sc-hw210-grouting .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw210-grouting.playing .s-st1{animation-name:k-hw210-grouting-st1}
.anim .sc-hw210-grouting.playing .s-st2{animation-name:k-hw210-grouting-st2}
.anim .sc-hw210-grouting.playing .s-st3{animation-name:k-hw210-grouting-st3}
.sc-hw210-grouting .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw210-grouting .s-g-gap{fill:var(--ink);opacity:.55}
.sc-hw210-grouting .s-g-eg{fill:var(--egj)}
.sc-hw210-grouting .s-g-flt rect{fill:var(--ink);opacity:.92}
.sc-hw210-grouting .s-g-flt{opacity:0}
.sc-hw210-grouting .s-g-sweep{transform:translate(240px,240px)}
.sc-hw210-grouting .s-g-haze{fill:var(--egj);opacity:0}
.sc-hw210-grouting .s-g-spg{opacity:0}
.sc-hw210-grouting .s-g-spg ellipse{fill:var(--gold)}
.anim .sc-hw210-grouting.playing .s-g-sweep{animation-name:k-hw210-grouting-sweep}
.anim .sc-hw210-grouting.playing .s-g-flt{animation-name:k-hw210-grouting-flt}
.anim .sc-hw210-grouting.playing .s-g-haze{animation-name:k-hw210-grouting-haze}
.anim .sc-hw210-grouting.playing .s-g-spg{animation-name:k-hw210-grouting-spg}
.anim .sc-hw210-grouting.playing .s-st1 .disc{animation-name:k-hw210-grouting-st1-disc}
.anim .sc-hw210-grouting.playing .s-st2 .disc{animation-name:k-hw210-grouting-st2-disc}
.anim .sc-hw210-grouting.playing .s-st3 .disc{animation-name:k-hw210-grouting-st3-disc}
.sc-hw210-grouting{--grout:color-mix(in srgb,var(--gold) 55%,var(--paper))}.sc-hw210-grouting .s-g-gap{opacity:.85}.sc-hw210-grouting .s-g-eg,.sc-hw210-grouting .s-g-haze{fill:var(--grout)}
@keyframes k-hw210-grouting-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-grouting-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-grouting-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-grouting-sweep{0%,4%{transform:translate(10px,10px)}58%,96%{transform:translate(240px,240px)}100%{transform:translate(10px,10px)}}
@keyframes k-hw210-grouting-flt{0%,3%{opacity:0;transform:translate(10px,10px)}5%{opacity:1;transform:translate(10px,10px)}58%{opacity:1;transform:translate(240px,240px)}61%,100%{opacity:0;transform:translate(240px,240px)}}
@keyframes k-hw210-grouting-haze{0%,10%{opacity:0}40%,66%{opacity:.28}90%,100%{opacity:0}}
@keyframes k-hw210-grouting-spg{0%,63%{opacity:0;transform:translate(0,0)}66%{opacity:1;transform:translate(0,0)}70%{transform:translate(30px,-12px)}74%{transform:translate(60px,0)}78%{transform:translate(30px,12px)}82%{transform:translate(0,0)}86%{transform:translate(30px,-12px)}90%{opacity:1;transform:translate(60px,0)}93%,100%{opacity:0;transform:translate(60px,0)}}
@keyframes k-hw210-grouting-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-grouting-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-grouting-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const GROUTING_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 200">
<defs><mask id="hw210-grouting-mSw" maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="200"><polygon class="s-g-sweep" points="-1000,1000 1000,-1000 -1000,-1000" fill="#fff"></polygon></mask></defs>
<rect class="s-g-gap" x="27" y="7" width="246" height="186" rx="3"></rect>
<rect class="s-g-eg" x="27" y="7" width="246" height="186" rx="3" mask="url(#hw210-grouting-mSw)"></rect>
<g><rect class="s-g-tile" x="33" y="13" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="93" y="13" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="153" y="13" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="213" y="13" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="33" y="73" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="93" y="73" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="153" y="73" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="213" y="73" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="33" y="133" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="93" y="133" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="153" y="133" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="213" y="133" width="54" height="54" rx="2"></rect></g>
<rect class="s-g-haze" x="27" y="7" width="246" height="186" rx="3"></rect>
<g class="s-g-flt"><rect x="-46" y="-9" width="92" height="18" rx="5" transform="rotate(-45)"></rect></g>
<g class="s-g-spg"><ellipse cx="110" cy="100" rx="20" ry="13"></ellipse></g>
</svg>`;

const GROUTING_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Press in diagonally with a float or putty blade</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Fill every joint fully, no voids</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Sponge in circles at 30–45 min</span></li></ol>`;

async function main() {
  const whatAGroutDoesMarkup = await getHw211SvgMarkup('What a Grout Does');
  const whyTheGapMattersMarkup = await getHw211SvgMarkup('Why the Gap Matters');

  const slides = [
    {
      type: 'image',
      title: 'Tile Grout',
      data: {
        text: 'Hard Worker HW210. Polymer-modified cement grout, mixed with water only, in 40+ shades.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/tile-grout.webp'],
        caption: 'HW210 — Just add water. 40+ shades.',
        key: 'HW210 · Polymer-Modified Cementitious Tile Grout',
      },
    },
    {
      type: 'text',
      title: 'Where It Goes',
      data: {
        text: 'Everyday tiled floors and walls, at home and in commercial spaces.<div class="item-grid"><div class="item-card">Ceramic and vitrified tile joints<span class="item-card-check">✓</span></div><div class="item-card">Interior floors and walls<span class="item-card-check">✓</span></div><div class="item-card">Exterior floors and walls<span class="item-card-check">✓</span></div><div class="item-card">Bathrooms<span class="item-card-check">✓</span></div><div class="item-card">Kitchens<span class="item-card-check">✓</span></div><div class="item-card">Homes and commercial spaces<span class="item-card-check">✓</span></div></div>',
        explanation: 'Not for movement, expansion or perimeter joints. Those take a flexible sealant.',
      },
    },
    {
      // Reused byte-for-byte from HW211 (same scope class, same content).
      type: 'svg',
      title: 'Why a Grout Is Needed',
      data: {
        text: 'Tiles are never laid touching. Grout fills the gap between them and closes it.',
        svgMarkup: whatAGroutDoesMarkup,
        badges: [
          { icon: '💧', label: 'Seals', sub: 'Keeps moisture and dirt out of the bed', tone: 'neutral' },
          { icon: '🔗', label: 'Locks', sub: 'Holds the tile edges in place', tone: 'neutral' },
          { icon: '📏', label: 'Finishes', sub: 'A clean, even, coloured line', tone: 'neutral' },
        ],
      },
    },
    {
      type: 'knowledge',
      title: 'Knowledge Check — Mixing Water',
      data: {
        text: 'How much water goes into 1 kg of HW210?',
        list: ['100–150 ml', '200–250 ml', '350–400 ml', '600–700 ml'],
        correctIndex: 2,
        explanation: 'Mix 1 kg of powder with 350–400 ml of clean water to a lump-free, smooth paste. Source: HW210 Technical Data Sheet, Mixing Instructions.',
      },
    },
    {
      // Reused byte-for-byte from HW211 (same scope classes, same content).
      type: 'svg',
      title: 'Why the Gap Matters',
      data: {
        text: 'The floor or wall under the tiles moves with heat, moisture and shrinkage. Tiles need room for it.',
        svgMarkup: whyTheGapMattersMarkup,
        badges: [
          { icon: '🏗️', label: 'Base moves', sub: 'Heat, moisture and shrinkage', tone: 'neutral' },
          { icon: '📐', label: 'Joints give each tile room', sub: 'Gap absorbs the movement', tone: 'neutral' },
          { icon: '✅', label: 'No popping out', sub: 'Tiles stay flat and bonded', tone: 'ok' },
        ],
      },
    },
    {
      type: 'svg',
      title: 'Not Just Cement',
      data: {
        text: 'Joints are still often filled with plain cement slurry. HW210 is a polymer-modified grout made for the job.',
        svgMarkup: svgCards([
          svgCard({ title: 'Plain cement in the joint', style: PLAIN_CEMENT_STYLE, svg: PLAIN_CEMENT_SVG, ol: PLAIN_CEMENT_OL, verdict: 'bad' }),
          svgCard({ title: 'HW210 in the joint', style: HW210_IN_JOINT_STYLE, svg: HW210_IN_JOINT_SVG, ol: HW210_IN_JOINT_OL, verdict: 'ok' }),
        ]),
        badges: [
          { icon: '🧱', label: 'Nil shrinkage', sub: 'Stays tight to the tile edge', tone: 'ok' },
          { icon: '🧪', label: 'Polymer-modified', sub: 'Better adhesion and flexibility', tone: 'neutral' },
          { icon: '💧', label: 'Water resistant', sub: 'Seals out moisture and dirt', tone: 'neutral' },
        ],
      },
    },
    {
      type: 'card',
      title: 'HW210 or HW211?',
      data: {
        text: 'HW210 for everyday tiling. Step up to epoxy HW211 where water stands or chemicals are used. What is HW211? The epoxy grout in the same Hard Worker range. It comes in two parts, a resin and a hardener, mixed on site with no water. The cured joint absorbs no water and resists stains and chemicals, so it goes where a cement grout would not last.',
        table: {
          headers: ['', 'HW210 cement grout', 'HW211 epoxy grout'],
          rows: [
            ['Use case', 'Homes and offices — living rooms, bedrooms, corridors', 'Swimming pools — submerged surfaces'],
            ['Use case', 'Bathrooms and kitchens — everyday wet areas', 'Commercial kitchens, food zones — food grade, stain resistant'],
            ['Use case', 'Interior and exterior floors and walls', 'Hospitals and labs — hygienic, chemical resistant'],
            ['Joints', '1–6 mm, water only, 40+ shades', 'Industrial areas — harsh cleaners and chemicals'],
          ],
        },
      },
    },
    {
      type: 'svg',
      title: 'HW210 · Polymer-Modified Cementitious Tile Grout',
      data: {
        text: '',
        svgMarkup: svgCards([svgCard({ title: '40+ shades', style: SHADES_STYLE, svg: SHADES_SVG })]),
        badges: [
          { icon: '💧', label: 'Water resistant', sub: 'Seals joints against moisture and dirt', tone: 'neutral' },
          { icon: '🧱', label: 'Nil shrinkage', sub: 'No sagging, no swelling', tone: 'ok' },
          { icon: '↔️', label: 'Takes movement', sub: 'Thermal movement and minor shifts', tone: 'neutral' },
          { icon: '🎨', label: '40+ shades', sub: 'Consistent colour tones', tone: 'neutral' },
          { icon: '⏱️', label: '60 minute pot life', sub: 'Time to work, less waste', tone: 'neutral' },
          { icon: '🚫', label: 'No water curing', sub: 'Cure undisturbed for 24 hours', tone: 'neutral' },
          { icon: '💦', label: 'Water only', sub: 'Easy to mix, apply and clean', tone: 'neutral' },
          { icon: '🌿', label: 'Nil VOC', sub: 'Non-hazardous, odourless powder', tone: 'ok' },
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
          { value: '7–8', label: 'MPa compressive', sub: 'At 28 days' },
          { value: '0.5–1', label: 'MPa bond strength', sub: 'At 28 days' },
          { value: '24', label: 'hours to foot traffic', sub: 'No water curing needed' },
        ],
        tableRows: [
          { label: 'Appearance', value: 'Powder' },
          { label: 'Mixing water', value: '350–400 ml per kg' },
          { label: 'Shrinkage', value: 'Nil' },
          { label: 'Joint width', value: '1–6 mm' },
          { label: 'Application', value: '+5 to +35 °C' },
          { label: 'Joint depth', value: 'Rake 3–5 mm' },
          { label: 'Packs', value: '1 kg' },
          { label: 'Shades', value: '40+' },
          { label: 'VOC', value: 'Nil' },
        ],
      },
    },
    {
      type: 'card',
      title: 'Declared. Then Tested.',
      data: {
        text: 'Every TDS value an independent lab checked came back inside the declared range.',
        badge: '4 of 4 TDS Values Confirmed',
        table: {
          headers: ['Feature', 'TDS declares', 'Lab result', 'Test method'],
          rows: [
            ['Pot life', '60 minutes', '60 minutes', 'LDM'],
            ['Shrinkage, 7 d', 'Nil', 'Nil', 'IS 1722'],
            ['Compressive, 28 d', '7–8 MPa', '7.80 N/mm²', 'ASTM C109'],
            ['Bond, 28 d', '0.5–1 MPa', '0.87 N/mm²', 'ASTM D4541'],
            ['Water absorption', 'Not declared', '3 ml per hour', 'IS 2250'],
          ],
        },
      },
    },
    {
      type: 'card',
      title: 'Keeps Gaining Strength',
      data: {
        text: "The joint keeps hardening after it's walked on. Strength and bond both climb by around 60–70% from day 7 to day 28.",
        gauges: [
          { label: 'Compressive, N/mm²', sub: '7 days → 28 days', valuePct: 59, result: '4.63 → 7.80', highlight: true, showDot: false },
          { label: 'Bond, N/mm²', sub: '7 days → 28 days', valuePct: 62, result: '0.54 → 0.87', highlight: true, showDot: false },
        ],
        stats: [
          { value: '+68%', label: 'compressive strength, day 7 to day 28', sub: '4.63 → 7.80 N/mm²' },
          { value: '+61%', label: 'bond strength, day 7 to day 28', sub: '0.54 → 0.87 N/mm²' },
        ],
      },
    },
    {
      type: 'card',
      title: '1–6 mm with Water Only',
      data: {
        text: 'Competitors ask for a separate additive for wider joints or wet areas. HW210 covers 1–6 mm on water alone.',
        gauges: [
          { label: 'Hard Worker HW210', sub: 'Water only', valuePct: 100, result: '1–6 mm', highlight: true, showDot: false },
          { label: 'Roff Rainbow Tile Mate', sub: 'Pidilite', valuePct: 50, result: '≤3 mm · 6 mm*', highlight: false, showDot: false },
          { label: 'Laticrete 600 Series', sub: 'MYK Laticrete', valuePct: 50, result: '1–3 mm', highlight: false, showDot: false },
          { label: 'Cement Polymer Grout', sub: 'Ardex Endura', valuePct: 100, result: '1–6 mm', highlight: false, showDot: false },
        ],
        explanation: '* RTM Wide Additive for joints up to 6 mm, wet areas, commercial and external use (Roff). Ardex: ADMIX GT 1 for showers, pools, heavy traffic and movement. Laticrete: 1776 admix recommended for colour retention and flexibility.',
      },
    },
    {
      type: 'card',
      title: 'Side by Side',
      data: {
        text: 'Working properties as each maker declares them.',
        table: {
          headers: ['Feature', 'HW210 (Hard Worker)', 'Rainbow Tile Mate (Roff · Pidilite)', '600 Series (MYK Laticrete)', 'Cement Polymer Grout (Ardex Endura)'],
          rows: [
            ['Pot life', '60 min', 'Min. 60 min (at 30 °C)', '60 min (at 21 °C)', '30 min (at 27 °C)'],
            ['Joint width', '1–6 mm', 'Up to 3 mm (6 mm with additive)', '1–3 mm', '1–6 mm'],
            ['Mix with', 'Water only', 'Water; additive advised', 'Water or 1776 admix', 'Water; ADMIX GT 1 for wet areas'],
            ['Shades', '40+', '15', 'Range, not counted', 'Range, not counted'],
            ['Shrinkage', 'Nil (tested)', '"Non-shrinking"', '"Non-shrink"', 'Not stated'],
            ['Foot traffic', '24 h', '24 h light, 7 d regular', '24 h, heavy 72 h', 'Curing 24 h'],
            ['VOC', 'Nil', '< 1.2 g/kg', 'Not stated', '5.15 g/L'],
            ['Application temp.', '+5 to +35 °C', '+10 to +35 °C', '16–32 °C (substrate)', 'Not stated'],
            ['Packs', '1 kg', '500 g, 1 kg, 10 kg', '500 g, 1 kg, 10 kg', '500 g, 1 kg, 10 kg'],
          ],
        },
        explanation: "Be Ready for This: All three competitors sell 500 g and 10 kg packs; HW210 comes in 1 kg only. Ardex's grout carries a certification for contact with potable water. Lead with the 40+ shades, water-only mixing for 1–6 mm joints, nil shrinkage and nil VOC, and the third-party test.",
      },
    },
    {
      type: 'svg',
      title: 'Mix, Press, Sponge',
      data: {
        text: 'One kilo, one measure of water, one smooth paste.',
        svgMarkup: svgCards([
          svgCard({ title: 'Mixing', style: MIXING_STYLE, svg: MIXING_SVG, ol: MIXING_OL }),
          svgCard({ title: 'Grouting', style: GROUTING_STYLE, svg: GROUTING_SVG, ol: GROUTING_OL }),
        ]),
        steps: [
          { title: 'Prepare', desc: 'Rake joints 3–5 mm deep. Clean and dry' },
          { title: 'Mix', desc: '1 kg + 350–400 ml water, lump-free' },
          { title: 'Grout', desc: 'Float or putty blade, diagonal strokes' },
          { title: 'Clean', desc: 'Damp sponge in circles at 30–45 min' },
          { title: 'Finish', desc: 'Polish with a dry cloth once dry' },
        ],
        tableRows: [
          { label: '30–45 min', value: 'Sponge the tile face' },
          { label: '60 min', value: 'End of pot life' },
          { label: '24 h', value: 'Cure undisturbed, then foot traffic' },
        ],
      },
    },
    {
      type: 'text',
      title: 'Do This, Not That',
      data: {
        text: 'From the method statement. Check them on every site visit.',
        badges: [
          { icon: '🚫', label: "Don't re-temper a stiff mix", sub: 'No extra water after the first mix', tone: 'bad' },
          { icon: '🚫', label: "Don't mix more than 60 minutes' worth", sub: 'Only what can go in within the pot life', tone: 'bad' },
          { icon: '🚫', label: "Don't grout movement or perimeter joints", sub: 'Those take a flexible sealant', tone: 'bad' },
          { icon: '🚫', label: "Don't acid-clean just before grouting", sub: 'If done, wash with water and let it dry', tone: 'bad' },
          { icon: '✅', label: 'Wait for the adhesive to harden', sub: 'Remove spacers; joints clean and dry', tone: 'ok' },
          { icon: '✅', label: 'Trial natural or porous stone first', sub: 'Check for staining or absorption', tone: 'ok' },
          { icon: '✅', label: 'Wash tools before it sets', sub: 'Hardened grout only comes off mechanically', tone: 'ok' },
          { icon: '✅', label: 'Wear gloves, goggles and a dust mask', sub: 'Avoid breathing the dust', tone: 'ok' },
        ],
      },
    },
    {
      type: 'knowledge',
      title: 'Scenario: On Site — The Wide Joint',
      data: {
        text: 'A mason is grouting rustic floor tiles laid with 10 mm joints and reaches for HW210. A mason uses HW210 on a 10 mm wide joint. What is the likely result?',
        list: ['Stable fill', 'Cracking over time', 'Higher coverage', 'Faster drying'],
        correctIndex: 1,
        explanation: 'HW210 is designed for joints 1–6 mm wide. Wider joints risk cracking. Source: Hard Worker website quiz, Tile Grout.',
      },
    },
    {
      type: 'text',
      title: 'Cheat Sheet',
      data: {
        text: 'HW210 at a glance. Check it before a visit.',
        sections: [
          { label: 'What it is', text: 'Single-component cement grout with polymers, fillers and additives. Mixed with water only. 40+ shades.' },
          { label: 'Why grout', text: "Seals the joint against water and dirt, and gives each tile room so movement in the base doesn't pop tiles." },
          { label: 'Why HW210', text: 'Plain cement shrinks away from the tile edge and dusts. HW210 has nil shrinkage and grips the edge.' },
          { label: 'Key features', text: '60 min pot life; nil shrinkage; water resistant. 7–8 MPa compressive, 0.5–1 MPa bond at 28 days. No water curing; foot traffic after 24 h. 40+ shades; nil VOC; non-hazardous.' },
          { label: 'TDS vs lab', text: 'Lab tests confirmed all four: pot life 60 min, shrinkage nil, compressive 7.80, bond 0.87 N/mm². Water absorption 3 ml/hour.' },
          { label: 'Against competitors', text: "1–6 mm joints with water only; Roff needs its additive past 3 mm, Laticrete 600 stops at 3 mm. 40+ shades vs Roff's 15. Pot life 60 min vs Ardex 30. Competitors offer 500 g and 10 kg packs." },
          { label: 'How to use', text: 'Rake 3–5 mm, clean and dry. 1 kg + 350–400 ml water. Float diagonally. Sponge at 30–45 min, dry cloth to polish. 24 h undisturbed.' },
          { label: 'Where', text: 'Ceramic and vitrified tile joints; interior and exterior floors and walls; bathrooms and kitchens; homes and commercial spaces.' },
          { label: 'Step up to HW211', text: 'Pools, commercial kitchens, food zones, hospitals, labs, chemical exposure.' },
          { label: 'Never', text: 'Re-temper · grout movement joints · acid-clean just before.' },
          { label: 'Packs', text: '1 kg. Store sealed, dry and shaded.' },
        ],
      },
    },
  ];

  await seedProduct({
    productName: 'HW210 Tile Grout',
    productDescription: 'Polymer-modified, cement-based grout for tile and stone joints',
    topicDescription: 'Everything a sales, dealer or applicator team member needs to know about HW210 Tile Grout: where it goes, why a joint needs grout, polymer-modified vs plain cement, lab-verified numbers, mixing, coverage, application and curing, and how it compares to Roff, Laticrete and Ardex.',
    assessmentQuestionCount: 5,
    assessmentPassPercentage: 70,
    slides,
  });
}

main().catch((e) => { console.error(e); process.exit(1); });
