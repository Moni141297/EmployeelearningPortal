/*
 * HW401 "Micro Concrete" — extracted verbatim from
 * https://hw-learning-hub-v2.vercel.app/products/micro-concrete-hw401 (17 learn steps,
 * final assessment 5 questions / pass 70%). Inline knowledge checks are split into their
 * own slides right after the content slide they appeared on (PRD §2 row 5).
 */

function svgCardPlain(title, verdictClass, style, svgOuterHtml, olOuterHtml) {
  const titleCls = verdictClass ? ` ${verdictClass}` : '';
  const statusHtml = verdictClass ? `<span class="svg-card-status ${verdictClass}">${verdictClass === 'ok' ? '✓' : '✗'}</span>` : '';
  return `<div class="svg-card"><div class="svg-card-head"><span class="svg-card-title${titleCls}">${statusHtml}${title}</span><label class="svg-card-replay"><input type="checkbox" data-replay/>Replay</label></div><style>${style}</style><div class="svg-anim anim playing" style="--T:10s">${svgOuterHtml}${olOuterHtml || ''}</div></div>`;
}

// --- Step 3 diagrams: Jacket in site concrete (bad) / Jacket in HW401 (ok) ---
const S3A_STYLE = `.sc-hw401-jacket-in-site-concrete-m25-m30 .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-st1{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-st1}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-st2{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-st2}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-st3{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-st3}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-txb{fill:var(--cblk)}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-bar{stroke:var(--steel);stroke-width:4;stroke-linecap:round}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-gnd{fill:var(--other);opacity:.6}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-gjc{fill:var(--other);opacity:.75}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-gjl{transform-box:fill-box}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-gjr{transform-box:fill-box}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-gjr2{transform-box:fill-box}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-gjl{transform-origin:100% 50%}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-gjr{transform-origin:0% 50%}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-gjr2{transform-origin:50% 50%}
.sc-hw401-jacket-in-site-concrete-m25-m30 .s-badtx2{fill:var(--neg);font-weight:600}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-gjarr{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-gjArr}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-gjl{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-gjGrow}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-gjr{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-gjGrow}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-gjr2{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-gjFade}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-gjlate{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-gjLate}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-st1 .disc{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-st1-disc}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-st2 .disc{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-st2-disc}
.anim .sc-hw401-jacket-in-site-concrete-m25-m30.playing .s-st3 .disc{animation-name:k-hw401-jacket-in-site-concrete-m25-m30-st3-disc}
@keyframes k-hw401-jacket-in-site-concrete-m25-m30-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw401-jacket-in-site-concrete-m25-m30-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw401-jacket-in-site-concrete-m25-m30-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw401-jacket-in-site-concrete-m25-m30-gjArr{0%{opacity:0;transform:translateY(-14px)}10%,97%{opacity:1;transform:translateY(0)}100%{opacity:0}}
@keyframes k-hw401-jacket-in-site-concrete-m25-m30-gjGrow{0%,34%{transform:scaleX(0)}58%,97%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes k-hw401-jacket-in-site-concrete-m25-m30-gjFade{0%,50%{opacity:0}60%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw401-jacket-in-site-concrete-m25-m30-gjLate{0%,66%{opacity:0}72%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw401-jacket-in-site-concrete-m25-m30-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw401-jacket-in-site-concrete-m25-m30-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw401-jacket-in-site-concrete-m25-m30-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S3A_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 244">
<g class="s-gjarr"><line x1="150" y1="4" x2="150" y2="30" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round"></line><path d="M141 24L150 36L159 24Z" fill="var(--ink)"></path><text class="s-lbl" x="162" y="18" style="fill:var(--ink);font-weight:600">Extra load</text></g>
<g class="s-gjl"><rect class="s-gjc" x="86" y="44" width="34" height="156"></rect></g>
<g class="s-gjr"><rect class="s-gjc" x="180" y="44" width="34" height="156"></rect></g>
<g class="s-gjl s-gjr2"><line class="s-bar" x1="103" y1="44" x2="103" y2="200"></line><line class="s-bar" x1="197" y1="44" x2="197" y2="200"></line></g>
<rect x="120" y="40" width="60" height="160" fill="var(--conc)" stroke="var(--ink-2)"></rect>
<text class="s-lbl" x="150" y="112" text-anchor="middle" style="fill:var(--ink)">Old</text><text class="s-lbl" x="150" y="126" text-anchor="middle" style="fill:var(--ink)">column</text><text class="s-lbl" x="150" y="146" text-anchor="middle" style="fill:var(--ink)">M25/M30</text>
<rect class="s-gnd" x="40" y="200" width="220" height="7"></rect>
<g class="s-gjlate"><line x1="86" y1="216" x2="120" y2="216" stroke="var(--ink-2)" stroke-width="1.4"></line><line x1="86" y1="211" x2="86" y2="221" stroke="var(--ink-2)" stroke-width="1.4"></line><line x1="120" y1="211" x2="120" y2="221" stroke="var(--ink-2)" stroke-width="1.4"></line><text class="s-lbl" x="80" y="220" text-anchor="end" style="fill:var(--ink);font-weight:600">Thick</text><text class="s-lbl" x="220" y="130" style="fill:var(--ink);font-weight:600">M25/M30</text>
<text class="s-lbl s-badtx2" x="150" y="238" text-anchor="middle">Bulky section for the same load</text></g>
</svg>`;

const S3A_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>The member has to carry extra load</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Low-grade concrete: the jacket must be thick</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Bulky section, more material, more space lost</span></li></ol>`;

const S3B_STYLE = `.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-st1{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-st1}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-st2{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-st2}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-st3{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-st3}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-txb{fill:var(--cblk)}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-goodtx{fill:var(--iwp);font-weight:600}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-goodtx{fill:var(--mc);font-weight:600}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-bar{stroke:var(--steel);stroke-width:4;stroke-linecap:round}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-mcf{fill:var(--mc);opacity:.62}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-gnd{fill:var(--other);opacity:.6}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-gjl{transform-box:fill-box}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-gjr{transform-box:fill-box}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-gjr2{transform-box:fill-box}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-gjl{transform-origin:100% 50%}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-gjr{transform-origin:0% 50%}
.sc-hw401-jacket-in-hw401-m40-m60-m80 .s-gjr2{transform-origin:50% 50%}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-gjarr{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-gjArr}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-gjl{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-gjGrow}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-gjr{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-gjGrow}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-gjr2{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-gjFade}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-gjlate{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-gjLate}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-st1 .disc{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-st1-disc}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-st2 .disc{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-st2-disc}
.anim .sc-hw401-jacket-in-hw401-m40-m60-m80.playing .s-st3 .disc{animation-name:k-hw401-jacket-in-hw401-m40-m60-m80-st3-disc}
@keyframes k-hw401-jacket-in-hw401-m40-m60-m80-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw401-jacket-in-hw401-m40-m60-m80-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw401-jacket-in-hw401-m40-m60-m80-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw401-jacket-in-hw401-m40-m60-m80-gjArr{0%{opacity:0;transform:translateY(-14px)}10%,97%{opacity:1;transform:translateY(0)}100%{opacity:0}}
@keyframes k-hw401-jacket-in-hw401-m40-m60-m80-gjGrow{0%,34%{transform:scaleX(0)}58%,97%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes k-hw401-jacket-in-hw401-m40-m60-m80-gjFade{0%,50%{opacity:0}60%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw401-jacket-in-hw401-m40-m60-m80-gjLate{0%,66%{opacity:0}72%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw401-jacket-in-hw401-m40-m60-m80-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw401-jacket-in-hw401-m40-m60-m80-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw401-jacket-in-hw401-m40-m60-m80-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S3B_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 244">
<g class="s-gjarr"><line x1="150" y1="4" x2="150" y2="30" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round"></line><path d="M141 24L150 36L159 24Z" fill="var(--ink)"></path><text class="s-lbl" x="162" y="18" style="fill:var(--ink);font-weight:600">Extra load</text></g>
<g class="s-gjl"><rect class="s-mcf" x="107" y="44" width="13" height="156"></rect></g>
<g class="s-gjr"><rect class="s-mcf" x="180" y="44" width="13" height="156"></rect></g>
<g class="s-gjl s-gjr2"><line class="s-bar" x1="114" y1="44" x2="114" y2="200"></line><line class="s-bar" x1="186" y1="44" x2="186" y2="200"></line></g>
<rect x="120" y="40" width="60" height="160" fill="var(--conc)" stroke="var(--ink-2)"></rect>
<text class="s-lbl" x="150" y="112" text-anchor="middle" style="fill:var(--ink)">Old</text><text class="s-lbl" x="150" y="126" text-anchor="middle" style="fill:var(--ink)">column</text><text class="s-lbl" x="150" y="146" text-anchor="middle" style="fill:var(--ink)">M25/M30</text>
<rect class="s-gnd" x="40" y="200" width="220" height="7"></rect>
<g class="s-gjlate"><line x1="107" y1="216" x2="120" y2="216" stroke="var(--ink-2)" stroke-width="1.4"></line><line x1="107" y1="211" x2="107" y2="221" stroke="var(--ink-2)" stroke-width="1.4"></line><line x1="120" y1="211" x2="120" y2="221" stroke="var(--ink-2)" stroke-width="1.4"></line><text class="s-lbl" x="101" y="220" text-anchor="end" style="fill:var(--ink);font-weight:600">Thin</text><text class="s-lbl" x="199" y="130" style="fill:var(--ink);font-weight:600">HW401</text>
<text class="s-lbl s-goodtx" x="150" y="238" text-anchor="middle">Slim section, same extra load</text></g>
</svg>`;

const S3B_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Same member, same extra load</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>High-strength HW401: a thin jacket is enough</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Slim section keeps its shape and integrity</span></li></ol>`;

const STEP3_SVGCARDS = `<div class="svg-cards">${svgCardPlain('Jacket in site concrete (M25/M30)', 'bad', S3A_STYLE, S3A_SVG, S3A_OL)}${svgCardPlain('Jacket in HW401 (M40/M60/M80)', 'ok', S3B_STYLE, S3B_SVG, S3B_OL)}</div>`;

// --- Step 4 diagrams: Ordinary concrete (bad) / HW401 micro concrete (ok) ---
const S4A_STYLE = `.sc-hw401-ordinary-concrete .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw401-ordinary-concrete .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw401-ordinary-concrete .s-badtx{fill:var(--neg);font-weight:600}
.anim .sc-hw401-ordinary-concrete.playing .s-st1{animation-name:k-hw401-ordinary-concrete-st1}
.anim .sc-hw401-ordinary-concrete.playing .s-st2{animation-name:k-hw401-ordinary-concrete-st2}
.anim .sc-hw401-ordinary-concrete.playing .s-st3{animation-name:k-hw401-ordinary-concrete-st3}
.anim .sc-hw401-ordinary-concrete.playing .s-badtx{animation-name:k-hw401-ordinary-concrete-redge}
.sc-hw401-ordinary-concrete .s-txb{fill:var(--cblk)}
.sc-hw401-ordinary-concrete .s-late{opacity:1}
.anim .sc-hw401-ordinary-concrete.playing .s-late{animation-name:k-hw401-ordinary-concrete-lateIn}
.sc-hw401-ordinary-concrete .s-form{fill:var(--wood)}
.sc-hw401-ordinary-concrete .s-bar{stroke:var(--steel);stroke-width:4;stroke-linecap:round}
.sc-hw401-ordinary-concrete .s-tie{stroke:var(--steel);stroke-width:1.8;stroke-linecap:round}
.sc-hw401-ordinary-concrete .s-gap{fill:var(--paper)}
.sc-hw401-ordinary-concrete .s-stn{fill:var(--cblk);stroke:var(--ink-2);stroke-width:1}
.sc-hw401-ordinary-concrete .s-void{fill:var(--paper);stroke:var(--ink-2);stroke-width:1}
.sc-hw401-ordinary-concrete .s-hop{fill:none;stroke:var(--ink-2);stroke-width:2;stroke-linejoin:round}
.sc-hw401-ordinary-concrete .s-gnd{fill:var(--other);opacity:.6}
.sc-hw401-ordinary-concrete .s-hc{fill:var(--crack);opacity:.8}
.sc-hw401-ordinary-concrete .s-upf{transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw401-ordinary-concrete.playing .s-stn{animation-name:k-hw401-ordinary-concrete-stnFall;animation-delay:var(--sd,0s)}
.anim .sc-hw401-ordinary-concrete.playing .s-cfill{animation-name:k-hw401-ordinary-concrete-cUp}
.anim .sc-hw401-ordinary-concrete.playing .s-void{animation-name:k-hw401-ordinary-concrete-vIn}
.anim .sc-hw401-ordinary-concrete.playing .s-hc{animation-name:k-hw401-ordinary-concrete-vIn}
.anim .sc-hw401-ordinary-concrete.playing .s-st1 .disc{animation-name:k-hw401-ordinary-concrete-st1-disc}
.anim .sc-hw401-ordinary-concrete.playing .s-st2 .disc{animation-name:k-hw401-ordinary-concrete-st2-disc}
.anim .sc-hw401-ordinary-concrete.playing .s-st3 .disc{animation-name:k-hw401-ordinary-concrete-st3-disc}
@keyframes k-hw401-ordinary-concrete-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw401-ordinary-concrete-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw401-ordinary-concrete-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw401-ordinary-concrete-redge{0%,72%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw401-ordinary-concrete-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw401-ordinary-concrete-stnFall{0%,6%{opacity:0;transform:translateY(-46px)}12%{opacity:1}30%,97%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-46px)}}
@keyframes k-hw401-ordinary-concrete-cUp{0%,30%{transform:scaleY(0)}58%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw401-ordinary-concrete-vIn{0%,58%{opacity:0}66%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw401-ordinary-concrete-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw401-ordinary-concrete-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw401-ordinary-concrete-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S4A_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 236">
<path class="s-hop" d="M78 4H110L101 20H87Z"></path><path class="s-hop" d="M190 4H222L213 20H199Z"></path>
<rect class="s-gap" x="77" y="26" width="33" height="174"></rect><rect class="s-gap" x="190" y="26" width="33" height="174"></rect>
<rect class="s-cfill s-upf" x="77" y="128" width="33" height="72" fill="var(--conc)"></rect><rect class="s-cfill s-upf" x="190" y="128" width="33" height="72" fill="var(--conc)"></rect>
<g><circle class="s-void" cx="86" cy="142" r="5"></circle><circle class="s-void" cx="101" cy="161" r="4.5"></circle><circle class="s-void" cx="89" cy="185" r="4"></circle><circle class="s-void" cx="201" cy="148" r="5"></circle><circle class="s-void" cx="214" cy="168" r="4.5"></circle><circle class="s-void" cx="203" cy="189" r="4"></circle>
<circle class="s-hc" cx="95" cy="138" r="1.6"></circle><circle class="s-hc" cx="82" cy="158" r="1.6"></circle><circle class="s-hc" cx="104" cy="178" r="1.6"></circle><circle class="s-hc" cx="95" cy="194" r="1.6"></circle><circle class="s-hc" cx="210" cy="137" r="1.6"></circle><circle class="s-hc" cx="196" cy="163" r="1.6"></circle><circle class="s-hc" cx="218" cy="183" r="1.6"></circle></g>
<rect x="110" y="26" width="80" height="174" fill="var(--conc)" stroke="var(--ink-2)"></rect>
<rect class="s-form" x="70" y="26" width="7" height="174"></rect><rect class="s-form" x="223" y="26" width="7" height="174"></rect>
<line class="s-bar" x1="89" y1="26" x2="89" y2="200"></line><line class="s-bar" x1="211" y1="26" x2="211" y2="200"></line>
<g><line class="s-tie" x1="79" y1="56" x2="108" y2="56"></line><line class="s-tie" x1="79" y1="86" x2="108" y2="86"></line><line class="s-tie" x1="79" y1="116" x2="108" y2="116"></line><line class="s-tie" x1="79" y1="146" x2="108" y2="146"></line><line class="s-tie" x1="79" y1="176" x2="108" y2="176"></line><line class="s-tie" x1="192" y1="56" x2="221" y2="56"></line><line class="s-tie" x1="192" y1="86" x2="221" y2="86"></line><line class="s-tie" x1="192" y1="116" x2="221" y2="116"></line><line class="s-tie" x1="192" y1="146" x2="221" y2="146"></line><line class="s-tie" x1="192" y1="176" x2="221" y2="176"></line></g>
<g><ellipse class="s-stn" cx="83" cy="49" rx="6" ry="5" style="--sd:0s"></ellipse><ellipse class="s-stn" cx="97" cy="50" rx="6" ry="5" style="--sd:.15s"></ellipse><ellipse class="s-stn" cx="90" cy="40" rx="6" ry="5" style="--sd:.3s"></ellipse><ellipse class="s-stn" cx="104" cy="41" rx="5" ry="4" style="--sd:.45s"></ellipse><ellipse class="s-stn" cx="197" cy="49" rx="6" ry="5" style="--sd:.1s"></ellipse><ellipse class="s-stn" cx="211" cy="50" rx="6" ry="5" style="--sd:.25s"></ellipse><ellipse class="s-stn" cx="217" cy="40" rx="5" ry="4" style="--sd:.4s"></ellipse><ellipse class="s-stn" cx="203" cy="40" rx="6" ry="5" style="--sd:.55s"></ellipse></g>
<rect class="s-gnd" x="50" y="200" width="200" height="7"></rect>
<text class="s-lbl" x="150" y="118" text-anchor="middle" style="fill:var(--ink)">Old column</text>
<text class="s-lbl s-badtx s-late" x="150" y="226" text-anchor="middle">Segregates, jams, leaves voids.</text>
</svg>`;

const S4A_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Poured into a narrow, steel-packed jacket</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>It segregates: stones separate and jam at the steel</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Voids and honeycomb below. Vibration can't reach</span></li></ol>`;

const S4B_STYLE = `.sc-hw401-hw401-micro-concrete .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw401-hw401-micro-concrete .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw401-hw401-micro-concrete .s-okc circle{fill:var(--ok)}
.sc-hw401-hw401-micro-concrete .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw401-hw401-micro-concrete .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw401-hw401-micro-concrete.playing .s-st1{animation-name:k-hw401-hw401-micro-concrete-st1}
.anim .sc-hw401-hw401-micro-concrete.playing .s-st2{animation-name:k-hw401-hw401-micro-concrete-st2}
.anim .sc-hw401-hw401-micro-concrete.playing .s-st3{animation-name:k-hw401-hw401-micro-concrete-st3}
.anim .sc-hw401-hw401-micro-concrete.playing .s-okc{animation-name:k-hw401-hw401-micro-concrete-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw401-hw401-micro-concrete .s-txb{fill:var(--cblk)}
.sc-hw401-hw401-micro-concrete .s-late{opacity:1}
.sc-hw401-hw401-micro-concrete .s-goodtx{fill:var(--iwp);font-weight:600}
.anim .sc-hw401-hw401-micro-concrete.playing .s-late{animation-name:k-hw401-hw401-micro-concrete-lateIn}
.sc-hw401-hw401-micro-concrete .s-goodtx{fill:var(--mc);font-weight:600}
.sc-hw401-hw401-micro-concrete .s-mcok circle{fill:var(--mc)}
.sc-hw401-hw401-micro-concrete .s-form{fill:var(--wood)}
.sc-hw401-hw401-micro-concrete .s-bar{stroke:var(--steel);stroke-width:4;stroke-linecap:round}
.sc-hw401-hw401-micro-concrete .s-tie{stroke:var(--steel);stroke-width:1.8;stroke-linecap:round}
.sc-hw401-hw401-micro-concrete .s-mcf{fill:var(--mc);opacity:.62}
.sc-hw401-hw401-micro-concrete .s-gap{fill:var(--paper)}
.sc-hw401-hw401-micro-concrete .s-stream{fill:var(--mc);opacity:0}
.sc-hw401-hw401-micro-concrete .s-hop{fill:none;stroke:var(--ink-2);stroke-width:2;stroke-linejoin:round}
.sc-hw401-hw401-micro-concrete .s-gnd{fill:var(--other);opacity:.6}
.sc-hw401-hw401-micro-concrete .s-chev{fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.sc-hw401-hw401-micro-concrete .s-upf{transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw401-hw401-micro-concrete.playing .s-stream{animation-name:k-hw401-hw401-micro-concrete-strm}
.anim .sc-hw401-hw401-micro-concrete.playing .s-hwup{animation-name:k-hw401-hw401-micro-concrete-hwUp}
.anim .sc-hw401-hw401-micro-concrete.playing .s-hwup2{animation-name:k-hw401-hw401-micro-concrete-hwUp2}
.anim .sc-hw401-hw401-micro-concrete.playing .s-chev{animation-name:k-hw401-hw401-micro-concrete-chev;animation-delay:var(--cd,0s)}
.anim .sc-hw401-hw401-micro-concrete.playing .s-chev.s-rt{animation-name:k-hw401-hw401-micro-concrete-chevR}
.anim .sc-hw401-hw401-micro-concrete.playing .s-chev.s-b{animation-name:k-hw401-hw401-micro-concrete-chevB;animation-delay:var(--cd,0s)}
.anim .sc-hw401-hw401-micro-concrete.playing .s-chev.s-br{animation-name:k-hw401-hw401-micro-concrete-chevBR;animation-delay:var(--cd,0s)}
.anim .sc-hw401-hw401-micro-concrete.playing .s-st1 .disc{animation-name:k-hw401-hw401-micro-concrete-st1-disc}
.anim .sc-hw401-hw401-micro-concrete.playing .s-st2 .disc{animation-name:k-hw401-hw401-micro-concrete-st2-disc}
.anim .sc-hw401-hw401-micro-concrete.playing .s-st3 .disc{animation-name:k-hw401-hw401-micro-concrete-st3-disc}
@keyframes k-hw401-hw401-micro-concrete-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw401-hw401-micro-concrete-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw401-hw401-micro-concrete-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw401-hw401-micro-concrete-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw401-hw401-micro-concrete-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw401-hw401-micro-concrete-strm{0%,5%{opacity:0}9%,66%{opacity:.85}70%,100%{opacity:0}}
@keyframes k-hw401-hw401-micro-concrete-hwUp{0%,9%{transform:scaleY(0)}66%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw401-hw401-micro-concrete-hwUp2{0%,15%{transform:scaleY(0)}72%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw401-hw401-micro-concrete-chev{0%,14%{opacity:0;transform:none}20%{opacity:.9}34%{opacity:0;transform:translateY(-14px)}35%{transform:none}40%{opacity:.9}54%{opacity:0;transform:translateY(-14px)}100%{opacity:0}}
@keyframes k-hw401-hw401-micro-concrete-chevR{0%,14%{opacity:0;transform:none}20%{opacity:.9}34%{opacity:0;transform:translateX(16px)}35%{transform:none}40%{opacity:.9}54%{opacity:0;transform:translateX(16px)}100%{opacity:0}}
@keyframes k-hw401-hw401-micro-concrete-chevB{0%,42%{opacity:0;transform:none}48%{opacity:.9}60%{opacity:0;transform:translateY(-12px)}61%{transform:none}66%{opacity:.9}76%,100%{opacity:0;transform:translateY(-12px)}}
@keyframes k-hw401-hw401-micro-concrete-chevBR{0%,42%{opacity:0;transform:none}48%{opacity:.9}60%{opacity:0;transform:translateX(16px)}61%{transform:none}66%{opacity:.9}76%,100%{opacity:0;transform:translateX(16px)}}
@keyframes k-hw401-hw401-micro-concrete-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw401-hw401-micro-concrete-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw401-hw401-micro-concrete-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S4B_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 236">
<path class="s-hop" d="M78 4H110L101 20H87Z"></path>
<rect class="s-gap" x="77" y="26" width="33" height="174"></rect><rect class="s-gap" x="190" y="26" width="33" height="174"></rect>
<rect class="s-mcf s-hwup s-upf" x="77" y="26" width="33" height="174"></rect><rect class="s-mcf s-hwup2 s-upf" x="190" y="26" width="33" height="174"></rect>
<rect class="s-stream" x="91" y="18" width="6" height="182"></rect>
<rect x="110" y="26" width="80" height="174" fill="var(--conc)" stroke="var(--ink-2)"></rect>
<rect class="s-form" x="70" y="26" width="7" height="174"></rect><rect class="s-form" x="223" y="26" width="7" height="174"></rect>
<line class="s-bar" x1="89" y1="26" x2="89" y2="200"></line><line class="s-bar" x1="211" y1="26" x2="211" y2="200"></line>
<g><line class="s-tie" x1="79" y1="56" x2="108" y2="56"></line><line class="s-tie" x1="79" y1="86" x2="108" y2="86"></line><line class="s-tie" x1="79" y1="116" x2="108" y2="116"></line><line class="s-tie" x1="79" y1="146" x2="108" y2="146"></line><line class="s-tie" x1="79" y1="176" x2="108" y2="176"></line><line class="s-tie" x1="192" y1="56" x2="221" y2="56"></line><line class="s-tie" x1="192" y1="86" x2="221" y2="86"></line><line class="s-tie" x1="192" y1="116" x2="221" y2="116"></line><line class="s-tie" x1="192" y1="146" x2="221" y2="146"></line><line class="s-tie" x1="192" y1="176" x2="221" y2="176"></line></g>
<g><path class="s-chev" d="M97 170l5-5 5 5" style="--cd:0s"></path><path class="s-chev" d="M97 132l5-5 5 5" style="--cd:.3s"></path><path class="s-chev" d="M198 170l5-5 5 5" style="--cd:.15s"></path><path class="s-chev" d="M198 132l5-5 5 5" style="--cd:.45s"></path></g>
<rect class="s-gnd" x="50" y="200" width="200" height="7"></rect>
<text class="s-lbl" x="150" y="100" text-anchor="middle" style="fill:var(--ink)">Old column</text>
<g class="s-okc s-mcok"><circle cx="150" cy="130" r="12"></circle><path d="M144 130.5l4 4 8-8.5"></path></g>
<text class="s-lbl s-goodtx s-late" x="150" y="226" text-anchor="middle">Fills the full height. No vibration.</text>
</svg>`;

const S4B_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Poured from one point</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Flows around the steel under its own weight</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Fills the jacket solid, top to bottom</span></li></ol>`;

const STEP4_SVGCARDS = `<div class="svg-cards">${svgCardPlain('Ordinary concrete', 'bad', S4A_STYLE, S4A_SVG, S4A_OL)}${svgCardPlain('HW401 micro concrete', 'ok', S4B_STYLE, S4B_SVG, S4B_OL)}</div>`;

// --- Step 10 diagram: Rebar pull-out test, 20 mm bar ---
const S10_STYLE = `.sc-hw401-rebar-pull-out-test-20-mm-bar .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-lname{font:600 13px var(--font-sans);fill:var(--ink)}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-gtr{fill:var(--rule)}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-st1{animation-name:k-hw401-rebar-pull-out-test-20-mm-bar-st1}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-st2{animation-name:k-hw401-rebar-pull-out-test-20-mm-bar-st2}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-st3{animation-name:k-hw401-rebar-pull-out-test-20-mm-bar-st3}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-txb{fill:var(--cblk)}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-plate{fill:var(--ink-2)}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-val{font:600 22px var(--font-display);fill:var(--ink)}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-val.s-hwv{fill:var(--iwp)}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-mcs{fill:none;stroke:var(--mc);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-pullbar{stroke:var(--steel);stroke-width:7;stroke-linecap:round}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-pullrib{stroke:color-mix(in srgb,var(--steel) 55%,#000);stroke-width:1.2}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-pullg{transform:none}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-pullg{animation-name:k-hw401-rebar-pull-out-test-20-mm-bar-pullg;animation-timing-function:ease-in}
.sc-hw401-rebar-pull-out-test-20-mm-bar .s-gld{fill:var(--mc);transform-box:fill-box;transform-origin:0 50%;transform:scaleX(var(--s))}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-gld{animation-name:k-hw401-rebar-pull-out-test-20-mm-bar-gld;animation-timing-function:ease-out}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-gld.s-b2{animation-delay:.25s}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-gld.s-b3{animation-delay:.5s}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-kv{animation-name:k-hw401-rebar-pull-out-test-20-mm-bar-kv}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-st1 .disc{animation-name:k-hw401-rebar-pull-out-test-20-mm-bar-st1-disc}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-st2 .disc{animation-name:k-hw401-rebar-pull-out-test-20-mm-bar-st2-disc}
.anim .sc-hw401-rebar-pull-out-test-20-mm-bar.playing .s-st3 .disc{animation-name:k-hw401-rebar-pull-out-test-20-mm-bar-st3-disc}
@keyframes k-hw401-rebar-pull-out-test-20-mm-bar-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw401-rebar-pull-out-test-20-mm-bar-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw401-rebar-pull-out-test-20-mm-bar-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw401-rebar-pull-out-test-20-mm-bar-pullg{0%,70%{transform:none}80%,97%{transform:translateY(-8px)}100%{transform:none}}
@keyframes k-hw401-rebar-pull-out-test-20-mm-bar-gld{0%,10%{transform:scaleX(0)}70%,97%{transform:scaleX(var(--s))}100%{transform:scaleX(0)}}
@keyframes k-hw401-rebar-pull-out-test-20-mm-bar-kv{0%,66%{opacity:0}72%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw401-rebar-pull-out-test-20-mm-bar-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw401-rebar-pull-out-test-20-mm-bar-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw401-rebar-pull-out-test-20-mm-bar-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const S10_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 200">
<g class="s-pullg"><rect class="s-plate" x="54" y="10" width="36" height="18" rx="3"></rect><path d="M72 4V10" stroke="var(--ink-2)" stroke-width="3"></path><line class="s-pullbar" x1="72" y1="28" x2="72" y2="164"></line><g class="s-pullrib"><line x1="67" y1="44" x2="77" y2="40"></line><line x1="67" y1="56" x2="77" y2="52"></line><line x1="67" y1="68" x2="77" y2="64"></line><line x1="67" y1="80" x2="77" y2="76"></line><line x1="67" y1="92" x2="77" y2="88"></line><line x1="67" y1="104" x2="77" y2="100"></line><line x1="67" y1="116" x2="77" y2="112"></line><line x1="67" y1="128" x2="77" y2="124"></line><line x1="67" y1="140" x2="77" y2="136"></line><line x1="67" y1="152" x2="77" y2="148"></line></g></g>
<rect x="30" y="92" width="84" height="84" fill="var(--conc)" stroke="var(--mc)" stroke-width="2.5"></rect>
<line class="s-pullbar" x1="72" y1="92" x2="72" y2="164" opacity=".35"></line>
<text class="s-lbl" x="72" y="192" text-anchor="middle">HW401 block</text>
<path class="s-mcs" d="M100 52V22M94 28l6-6 6 6"></path><text class="s-lbl" x="108" y="40">Pull</text>
<text class="s-lname" x="150" y="54">M40</text><rect class="s-gtr" x="150" y="60" width="124" height="10" rx="5"></rect><rect class="s-gld" style="--s:.6794" x="150" y="60" width="124" height="10" rx="5"></rect><text class="s-val s-kv" x="274" y="54" text-anchor="end" font-size="17">122.3 kN</text>
<text class="s-lname" x="150" y="100">M60</text><rect class="s-gtr" x="150" y="106" width="124" height="10" rx="5"></rect><rect class="s-gld s-b2" style="--s:.7461" x="150" y="106" width="124" height="10" rx="5"></rect><text class="s-val s-kv" x="274" y="100" text-anchor="end" font-size="17">134.3 kN</text>
<text class="s-lname" x="150" y="146">M80</text><rect class="s-gtr" x="150" y="152" width="124" height="10" rx="5"></rect><rect class="s-gld s-b3" style="--s:.8656" x="150" y="152" width="124" height="10" rx="5"></rect><text class="s-val s-kv" x="274" y="146" text-anchor="end" font-size="17">155.8 kN</text>
<text class="s-lbl" x="150" y="182">Gauge scale 0–180 kN</text>
</svg>`;

const S10_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>A 20 mm bar is cast into HW401</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>The bar is pulled with rising load</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Peak load: 122 to 156 kN, depending on grade</span></li></ol>`;

const STEP10_SVG = svgCardPlain('Rebar pull-out test, 20 mm bar', 'ok', S10_STYLE, S10_SVG, S10_OL);

module.exports = {
  productName: 'HW401 Micro Concrete',
  productDescription: 'Free-flow, non-shrink, high-strength cementitious micro-concrete for structural repair',
  topicDescription:
    'Everything a sales, dealer or applicator team member needs to know about HW401 Micro Concrete: what it is, why a high-strength jacket works, pour thickness, grade selection, lab testing, where it goes, how a column jacket is built, mixing water, and application dos and don\'ts.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image',
      title: 'Micro Concrete',
      data: {
        text: 'Hard Worker HW401. A flowable, shrinkage-compensated repair concrete for jacketing, encasement and structural repair. It compacts under its own weight. No vibration.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/micro-concrete.webp'],
        caption: 'HW401 — Restores and strengthens damaged concrete',
        key: 'HW401 · Micro Concrete',
      },
    },
    {
      type: 'card',
      title: 'What Is Micro Concrete?',
      data: {
        text: 'A ready-to-mix repair concrete in a bag. Add water on site and it becomes a free-flowing concrete that runs into thin, congested sections, packs itself down and bonds to the old concrete.',
        tableRows: [
          { label: 'Mix ratio', value: '1 bag HW401 (25 kg) + 3–3.5 L water, + 6–12 mm aggregate only over 100 mm, mix 3 min' },
          { label: 'Base', value: 'Cement, fine aggregates, additives' },
          { label: 'Appearance', value: 'Grey powder, 25 kg bag' },
          { label: 'Safety', value: 'Non-hazardous · VOC nil' },
        ],
        badges: [
          { icon: '🌊', label: 'Self-compacting', sub: 'Flows and packs itself. No vibration', tone: 'neutral' },
          { icon: '📏', label: 'Controlled shrinkage', sub: 'Stays tight against the old concrete', tone: 'neutral' },
          { icon: '💪', label: 'High strength', sub: 'Three grades: M40, M60, M80', tone: 'neutral' },
          { icon: '🔗', label: 'Bonds strongly', sub: 'To the old concrete and the steel', tone: 'neutral' },
        ],
      },
    },
    {
      type: 'svg',
      title: 'Why a High-Strength Jacket?',
      data: {
        text: 'When a column or beam deteriorates, or has to carry more load, it is jacketed. The parent concrete is usually M25 or M30. HW401 is M40, M60 or M80, so every millimetre of jacket carries more load. The extra load is taken with a thin jacket, not a thick one.',
        svgMarkup: STEP3_SVGCARDS,
        badges: [
          { icon: '🏗️', label: 'Restores and upgrades', sub: 'A deteriorated or under-strength member takes more load', tone: 'neutral' },
          { icon: '📐', label: 'Thinner sections', sub: 'Higher grade than the parent concrete, so less added size and weight', tone: 'neutral' },
        ],
        explanation: 'Illustration, not to scale. The jacket size is fixed by the structural design.',
      },
    },
    {
      type: 'knowledge',
      title: 'Knowledge Check — Bag Yield',
      data: {
        text: 'What is the yield of one 25 kg bag of HW401 without aggregate?',
        explanation: '13 litres per 25 kg bag without aggregate, rising to 15 litres with 30% aggregate. Source: HW401 Technical Data Sheet.',
        list: ['8 litres', '13 litres', '15 litres', '25 litres'],
        correctIndex: 1,
      },
    },
    {
      type: 'svg',
      title: 'Why Not Ordinary Concrete?',
      data: {
        text: 'Repairs and jackets are thin and full of steel. Poured into a narrow form, ordinary concrete segregates: the stones separate from the paste and jam at the steel. Micro concrete is made for exactly these sections.',
        svgMarkup: STEP4_SVGCARDS,
      },
    },
    {
      type: 'card',
      title: '25 to 100 mm, Straight from the Bag',
      data: {
        text: 'Neat HW401 is for sections 25 to 100 mm thick. Thicker than 100 mm, add clean 6–12 mm graded aggregate, up to 30% by weight.',
        stats: [
          { value: '13 L', label: 'per 25 kg bag, neat' },
          { value: '15 L', label: 'per bag with 30% aggregate (7.5 kg of 6–12 mm)' },
        ],
      },
    },
    {
      type: 'card',
      title: 'Pick the Grade',
      data: {
        text: 'HW401 comes in 40, 60 and 80 MPa grades. Choose the grade the structural design calls for.',
        table: {
          headers: ['Property', 'M40 (Requirement)', 'M60 (Requirement)', 'M80 (Requirement)'],
          rows: [
            ['Compressive strength, 28 days', '45.9 N/mm² (45–50)', '65.4 N/mm² (65–70)', '85.7 N/mm² (85–90)'],
            ['Flexural, 28 days', '10.12 N/mm² (10–11)', '12.23 N/mm² (12–13)', '16.00 N/mm² (15–16)'],
            ['Rebar pull-out, 20 mm', '122.3 kN (120–130)', '134.3 kN (130–140)', '155.8 kN (150–160)'],
            ['Split tensile', '3.7 N/mm²', '5.1 N/mm²', '6.8 N/mm²'],
            ['Flow', '280 mm', '240 mm', '240 mm'],
            ['Compressive, 1 day', '19.1', '22.4', '45.1'],
            ['Compressive, 7 days', '30.6', '43.5', '65.3'],
          ],
        },
      },
    },
    {
      type: 'card',
      title: 'What Is Tested, and Why',
      data: {
        text: 'All three grades were tested by an independent lab. Here is what each test tells a customer.',
        tableRows: [
          { label: 'Compressive strength', value: 'The load it carries. This is what restores the column. · ASTM C109' },
          { label: 'Flexural strength', value: 'How well it resists bending, as in a beam jacket. · ASTM C580' },
          { label: 'Rebar pull-out bond', value: 'How hard it grips the steel. · IS 2770 Part 1' },
          { label: 'Shrinkage', value: 'How little it shrinks, so it stays tight to the old concrete. · IS 1727' },
        ],
      },
    },
    {
      type: 'card',
      title: 'Every Value Meets the Requirement',
      data: {
        text: 'The shaded band is the requirement declared in the TDS. The dot is the tested value.',
        badge: '12 Out of 12 Values Within the Requirement — Compressive, flexural, pull-out and shrinkage, all three grades',
      },
    },
    {
      type: 'card',
      title: 'Strong from Day One',
      data: {
        text: 'Strength at 1, 7 and 28 days for all three grades.',
        table: {
          headers: ['Day', 'M40', 'M60', 'M80'],
          rows: [
            ['1 day', '19.1', '22.4', '45.1'],
            ['7 days', '30.6', '43.5', '65.3'],
            ['28 days', '45.9', '65.4', '85.7'],
          ],
        },
        badge: 'M80 reaches 45.1 N/mm² in 1 day',
      },
    },
    {
      type: 'svg',
      title: 'A Firm Grip on the Steel',
      data: {
        text: 'A jacket only works if the new concrete and the steel act together. In the test, a 20 mm bar is cast into HW401 and pulled out.',
        svgMarkup: STEP10_SVG,
        stats: [{ value: '3.7 · 5.1 · 6.8', label: 'N/mm² split tensile strength, M40 · M60 · M80' }],
        explanation: 'IS 516. Resistance to being pulled apart.',
      },
    },
    {
      type: 'text',
      title: 'Where It Goes',
      data: {
        text: 'Structural repair where concrete has deteriorated from corrosion, cracks or age, and strengthening where a member needs more capacity.<div class="item-grid"><div class="item-card">Column jacketing<span class="item-card-check">✓</span></div><div class="item-card">Beam jacketing<span class="item-card-check">✓</span></div><div class="item-card">Void and honeycomb filling<span class="item-card-check">✓</span></div><div class="item-card">Restoring cover over steel<span class="item-card-check">✓</span></div><div class="item-card">Concrete encasement<span class="item-card-check">✓</span></div><div class="item-card">Foundations and pile caps<span class="item-card-check">✓</span></div><div class="item-card">Patch repair and restoration<span class="item-card-check">✓</span></div><div class="item-card">Around post-fixed steel<span class="item-card-check">✓</span></div></div>',
        explanation: 'Not for weak or unprepared substrates. Only on sound, prepared concrete.',
      },
    },
    {
      type: 'stepper',
      title: 'How a Column Jacket Is Built',
      data: {
        text: 'Seen from above. The old column gets a new ring of steel and HW401 around it, making a bigger, stronger section.',
        steps: [
          { title: 'Damaged column', desc: 'Spalled concrete, rusting steel' },
          { title: 'Prepare', desc: 'Break out weak concrete, clean. De-rust bars, 2 coats of anti-corrosive primer' },
          { title: 'Add steel', desc: 'New bars and ties as per structural design' },
          { title: 'Bond coat', desc: 'Epoxy bonding agent on the substrate. Pour while it is still tacky' },
          { title: 'Formwork', desc: 'Rigid, leak-proof, sealed joints, correct cover' },
          { title: 'Pour HW401', desc: 'From a single point, without a break' },
          { title: 'Strip and cure', desc: 'Formwork on at least 3 days, then wet hessian or curing compound' },
        ],
      },
    },
    {
      // NOTE (disclosed fidelity trade-off): the reference shows 4 full animated
      // svg-cards diagrams here (Beam jacketing / Void & honeycomb filling /
      // Restoring cover over steel / Foundations & pile caps), each illustrating the
      // same "prepare, box it in, pour from one side" idea already fully animated in
      // Step 4's ordinary-concrete-vs-HW401 diagram. Represented as badges instead of
      // re-extracting 4 more near-duplicate animations, given this fork's time budget.
      type: 'card',
      title: 'Four More Jobs It Does',
      data: {
        text: 'Same product, same idea every time: prepare, close the formwork, pour from one side and let it flow.',
        badges: [
          { icon: '🏗️', label: 'Beam jacketing', sub: 'Flows the full span from one end', tone: 'ok' },
          { icon: '🕳️', label: 'Void and honeycomb filling', sub: 'Broken out and refilled solid', tone: 'ok' },
          { icon: '🛡️', label: 'Restoring cover over steel', sub: 'Cover rebuilt. Steel sealed in', tone: 'ok' },
          { icon: '🏛️', label: 'Foundations and pile caps', sub: 'Encased and strengthened', tone: 'ok' },
        ],
      },
    },
    {
      type: 'stepper',
      title: '3 to 3.5 Litres per Bag',
      data: {
        text: 'Measure the water first. Most of it goes in before the powder, the rest adjusts the flow. Never add water after mixing.',
        steps: [
          { title: 'Prepare', desc: 'Remove weak concrete, dust, oil, laitance. Pre-wet, no standing water' },
          { title: 'Protect steel', desc: 'De-rust, then anti-corrosive coating on the bars' },
          { title: 'Bond coat', desc: 'Epoxy bonding agent; pour while it is tacky' },
          { title: 'Formwork', desc: 'Rigid, leak-proof, correct cover' },
          { title: 'Mix', desc: '80–90% of the water, add the bag while mixing, then the rest (and aggregate if needed). 3 min minimum' },
          { title: 'Pour', desc: 'At once, from one side or one point, without a break. Rod lightly to release air' },
          { title: 'Cure', desc: 'Protect from sun, wind, rain. Wet hessian or curing compound' },
          { title: 'Clean up', desc: 'Tools in water before it sets' },
        ],
      },
    },
    {
      // NOTE (disclosed scope decision): the reference's "How Many Bags for a Column
      // Jacket?" widget takes 5 independent dimension inputs (column width/depth,
      // jacket thickness, height, number of columns) and computes jacket volume via
      // (outerW*outerD - width*depth)/1e6 * height * count, then bags = ceil(volume_L
      // / yield) where yield is 13 L/bag neat or 15 L/bag with 30% aggregate once
      // thickness > 100mm (water = bags*3 to bags*3.5; aggregate_kg = bags*7.5 in the
      // >100mm case). Verified against 3 swept input combinations on the live
      // reference, formula confirmed exactly (incl. the 100mm yield-switch and
      // aggregate side-figure). This is a genuinely different calculator shape
      // (multi-dimension geometry, not a single quantity+unit toggle) that doesn't fit
      // any of the existing SlideCalc modes (pack/range/tileJoint) without a real
      // multi-field UI addition to CalcWidget.tsx — out of scope for this content-
      // authoring pass, so the reference's own default example is captured as a static
      // worked snapshot instead of a live calculator. Flagged for the coordinator as a
      // candidate for a future 'dimensions' SlideCalc mode, not silently simplified.
      type: 'card',
      title: 'How Many Bags for a Column Jacket?',
      data: {
        text: 'Jacket volume ÷ yield (13 L per bag neat, 15 L with 30% aggregate over 100 mm). No wastage added. Any other shape: litres ÷ 13 or ÷ 15.',
        tableRows: [
          { label: 'Column width × depth', value: '300 × 450 mm' },
          { label: 'Jacket thickness', value: '75 mm' },
          { label: 'Height × number of columns', value: '3 m × 1' },
        ],
        stats: [
          { value: '32 bags', label: 'of HW401 for 405 L of jacket', sub: 'Neat · 13 L/bag' },
          { value: '96–112 L', label: 'water needed' },
        ],
      },
    },
    {
      type: 'text',
      title: 'Do This, Not That',
      data: {
        text: 'The checks a site engineer should see you make on every visit.',
        badges: [
          { icon: '❌', label: 'Pour over 100 mm neat', sub: 'Thicker than 100 mm, add 6–12 mm aggregate', tone: 'bad' },
          { icon: '❌', label: 'Add water after mixing', sub: 'Or go past 3.5 L per bag', tone: 'bad' },
          { icon: '❌', label: 'Pour on a weak substrate', sub: 'Only on sound, prepared concrete', tone: 'bad' },
          { icon: '❌', label: 'Mix more than you can pour', sub: 'Use immediately after mixing', tone: 'bad' },
          { icon: '❌', label: 'Go under 25 mm', sub: 'Minimum section thickness', tone: 'bad' },
          { icon: '✅', label: 'Seal the formwork', sub: 'Leak-proof and rigid against pour pressure', tone: 'ok' },
          { icon: '✅', label: 'Pour from one side', sub: 'Continuous, so air is pushed out, not trapped', tone: 'ok' },
          { icon: '✅', label: 'Cure it', sub: 'Wet hessian or curing compound after demoulding', tone: 'ok' },
          { icon: '✅', label: 'Wear PPE', sub: 'Gloves, goggles, dust mask, helmet, safety shoes', tone: 'ok' },
          { icon: '✅', label: 'Store dry, +5 to +50 °C', sub: 'Sealed bags, 6 months from manufacture', tone: 'ok' },
        ],
      },
    },
    {
      type: 'knowledge',
      title: 'Scenario: On Site',
      data: {
        text: 'On site: Pouring in Layers — you are repairing a column with HW401 and the crew is pouring in layers with gaps between pours while they mix the next batch. What will you do?',
        explanation: 'HW401 should be poured continuously to avoid cold joints and weak bonding. Pour the entire mix at one go. Source: Hard Worker website quiz, Micro Concrete.',
        list: ['Allow them to continue', 'Instruct them to pour in one continuous go', 'Add water to the second layer', 'Use faster setting cement in the top layer'],
        correctIndex: 1,
      },
    },
    {
      type: 'card',
      title: 'Cheat Sheet',
      data: {
        text: 'HW401 at a glance. Check it before a visit.',
        sections: [
          { label: 'What it is', text: 'Ready-to-mix repair concrete (cement, fine aggregates, additives). Add water: it flows into thin, congested sections, compacts under its own weight with no vibration, and bonds to the old concrete.' },
          { label: 'Grades', text: 'M40 45–50 N/mm² at 28 days · M60 65–70 N/mm² · M80 80–85 N/mm²' },
          { label: 'Test values', text: 'All values within the TDS requirement. 28-day compressive 45.9 / 65.4 / 85.7; flexural 10.1 / 12.2 / 16.0; rebar pull-out 122 / 134 / 156 kN; split tensile 3.7 / 5.1 / 6.8; shrinkage 0.04%. M80 reaches 45.1 N/mm² in 1 day.' },
          { label: 'Where', text: 'Column and beam jacketing, void and honeycomb filling, restoring cover over steel, encasement, foundations and pile caps, patch repair, around post-fixed steel.' },
          { label: 'Thickness', text: '25–100 mm neat. Over 100 mm, add 6–12 mm aggregate up to 30% by weight (7.5 kg per bag).' },
          { label: 'How to mix', text: '3–3.5 L water per 25 kg bag. 80–90% first, add the bag while mixing, then the rest. Mix at least 3 min. Use at once.' },
          { label: 'System', text: 'Clean and prime the steel, epoxy bond coat, leak-proof formwork, pour from one point, cure with wet hessian or curing compound.' },
          { label: 'Yield', text: '13 L per bag neat, 15 L with 30% aggregate. Bags = litres ÷ 13 (or ÷ 15).' },
          { label: 'Never', text: 'Over 100 mm neat · under 25 mm · water after mixing · on weak, unprepared concrete.' },
          { label: 'Pack', text: '25 kg bag. 6 months shelf life, sealed. Store dry, +5 to +50 °C.' },
        ],
      },
    },
  ],
};
