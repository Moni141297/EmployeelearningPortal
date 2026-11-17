const { svgCard, svgCards, singleSvg } = require('../lib/svgCard');

// --- Step 3: "New on Old: The Weak Line" — 2-card svg-cards ---
const WITHOUT_BONDING_STYLE = `.sc-hw403-without-a-bonding-agent .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw403-without-a-bonding-agent.playing .s-st1{animation-name:k-hw403-without-a-bonding-agent-st1}
.anim .sc-hw403-without-a-bonding-agent.playing .s-st2{animation-name:k-hw403-without-a-bonding-agent-st2}
.anim .sc-hw403-without-a-bonding-agent.playing .s-st3{animation-name:k-hw403-without-a-bonding-agent-st3}
.sc-hw403-without-a-bonding-agent .s-txb{fill:var(--cblk)}
.sc-hw403-without-a-bonding-agent .s-g-bad{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw403-without-a-bonding-agent .s-b-new rect.s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-without-a-bonding-agent .s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-without-a-bonding-agent .s-agg2{fill:var(--agg)}
.sc-hw403-without-a-bonding-agent .s-b-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw403-without-a-bonding-agent .s-b-labd{font:600 11px var(--font-sans);fill:var(--ink)}
.sc-hw403-without-a-bonding-agent .s-b-arrow{fill:none;stroke:var(--neg);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw403-without-a-bonding-agent .s-b-arrow.s-nk{stroke:var(--ink-2)}
.sc-hw403-without-a-bonding-agent .s-b-strm{fill:var(--fresh)}
.sc-hw403-without-a-bonding-agent .s-b-cj{stroke:var(--neg);stroke-width:3;stroke-dasharray:240;stroke-dashoffset:0}
.sc-hw403-without-a-bonding-agent .s-b-p1{opacity:0}
.sc-hw403-without-a-bonding-agent .s-b-p2{opacity:0}
.sc-hw403-without-a-bonding-agent .s-b-p3{opacity:1}
.anim .sc-hw403-without-a-bonding-agent.playing .s-b-p1{animation-name:k-hw403-without-a-bonding-agent-bp1}
.anim .sc-hw403-without-a-bonding-agent.playing .s-b-p2{animation-name:k-hw403-without-a-bonding-agent-bp2}
.anim .sc-hw403-without-a-bonding-agent.playing .s-b-p3{animation-name:k-hw403-without-a-bonding-agent-bp3}
.sc-hw403-without-a-bonding-agent .s-b-stream{transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)}
.sc-hw403-without-a-bonding-agent .s-b-new{transform-box:fill-box;transform-origin:50% 100%}
.sc-hw403-without-a-bonding-agent .s-b-lift{transform:translateY(-8px)}
.sc-hw403-without-a-bonding-agent .s-b-pull{opacity:1}
.anim .sc-hw403-without-a-bonding-agent.playing .s-b-stream{animation-name:k-hw403-without-a-bonding-agent-bstream}
.anim .sc-hw403-without-a-bonding-agent.playing .s-b-new{animation-name:k-hw403-without-a-bonding-agent-bnew}
.anim .sc-hw403-without-a-bonding-agent.playing .s-b-cj{animation-name:k-hw403-without-a-bonding-agent-bcj}
.anim .sc-hw403-without-a-bonding-agent.playing .s-b-lift{animation-name:k-hw403-without-a-bonding-agent-blift;animation-timing-function:ease-out}
.anim .sc-hw403-without-a-bonding-agent.playing .s-b-pull{animation-name:k-hw403-without-a-bonding-agent-bpull}
.anim .sc-hw403-without-a-bonding-agent.playing .s-st1 .disc{animation-name:k-hw403-without-a-bonding-agent-st1-disc}
.anim .sc-hw403-without-a-bonding-agent.playing .s-st2 .disc{animation-name:k-hw403-without-a-bonding-agent-st2-disc}
.anim .sc-hw403-without-a-bonding-agent.playing .s-st3 .disc{animation-name:k-hw403-without-a-bonding-agent-st3-disc}
.anim .sc-hw403-without-a-bonding-agent.playing .s-nclab{animation-name:k-hw403-without-a-bonding-agent-nclab}@keyframes k-hw403-without-a-bonding-agent-nclab{0%,28%{opacity:0}32%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-without-a-bonding-agent-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw403-without-a-bonding-agent-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw403-without-a-bonding-agent-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw403-without-a-bonding-agent-bp1{0%,2%{opacity:0}5%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw403-without-a-bonding-agent-bp2{0%,33%{opacity:0}36%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw403-without-a-bonding-agent-bp3{0%,66%{opacity:0}69%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-without-a-bonding-agent-bstream{0%,5%{transform:scaleY(0)}9%,24%{transform:scaleY(1)}28%,100%{transform:scaleY(0)}}
@keyframes k-hw403-without-a-bonding-agent-bnew{0%,8%{transform:scaleY(0)}28%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw403-without-a-bonding-agent-bcj{0%,36%{stroke-dashoffset:240}56%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:240}}
@keyframes k-hw403-without-a-bonding-agent-blift{0%,70%{transform:none}73%{transform:translateY(-3px)}75%{transform:translateY(-1px)}80%,95%{transform:translateY(-9px)}100%{transform:none}}
@keyframes k-hw403-without-a-bonding-agent-bpull{0%,66%{opacity:0;transform:translateY(6px)}70%,95%{opacity:1;transform:none}100%{opacity:0}}
@keyframes k-hw403-without-a-bonding-agent-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw403-without-a-bonding-agent-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw403-without-a-bonding-agent-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const WITHOUT_BONDING_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 184">
<text class="s-b-lab s-b-p1" x="150" y="14" text-anchor="middle">Fresh concrete poured on old</text>
<text class="s-g-bad s-b-p2" x="150" y="14" text-anchor="middle">No grip at the meeting line</text>
<text class="s-g-bad s-b-p3" x="150" y="14" text-anchor="middle">Cold joint: the new layer cracks off</text>
<rect class="s-b-strm s-b-stream" x="146" y="20" width="8" height="52"></rect>
<g class="s-b-lift"><g class="s-b-new"><rect class="s-fr" x="30" y="72" width="240" height="48" rx="2"></rect><circle class="s-agg2" cx="62" cy="104" r="4"></circle><circle class="s-agg2" cx="118" cy="92" r="3"></circle><circle class="s-agg2" cx="170" cy="106" r="4.5"></circle><circle class="s-agg2" cx="214" cy="88" r="3.5"></circle><circle class="s-agg2" cx="250" cy="106" r="3"></circle></g><text class="s-b-labd s-nclab" x="38" y="88">New concrete</text></g>
<rect x="30" y="120" width="240" height="58" fill="var(--conc)"></rect>
<text class="s-b-labd" x="38" y="170" style="paint-order:stroke;stroke:var(--paper);stroke-width:3px">Old concrete</text>
<line class="s-b-cj" x1="30" y1="120" x2="270" y2="120"></line>
<g class="s-b-pull"><path class="s-b-arrow" d="M80 64V42m-6 6l6-6 6 6M220 64V42m-6 6l6-6 6 6"></path><text class="s-g-bad" x="150" y="50" text-anchor="middle">Load</text></g>
</svg>`;

const WITHOUT_BONDING_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Fresh concrete is poured on old, hardened concrete</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>They only touch: a cold joint forms along the line</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Under load, the new layer cracks off along it</span></li></ol>`;

const WITH_HW403_STYLE = `.sc-hw403-with-hw403 .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw403-with-hw403 .s-okc circle{fill:var(--ok)}
.sc-hw403-with-hw403 .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw403-with-hw403 .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw403-with-hw403.playing .s-st1{animation-name:k-hw403-with-hw403-st1}
.anim .sc-hw403-with-hw403.playing .s-st2{animation-name:k-hw403-with-hw403-st2}
.anim .sc-hw403-with-hw403.playing .s-st3{animation-name:k-hw403-with-hw403-st3}
.anim .sc-hw403-with-hw403.playing .s-okc{animation-name:k-hw403-with-hw403-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw403-with-hw403 .s-txb{fill:var(--cblk)}
.sc-hw403-with-hw403 .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw403-with-hw403 .s-tgok circle{fill:var(--tg)}
.sc-hw403-with-hw403 .s-b-new rect.s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-with-hw403 .s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-with-hw403 .s-agg2{fill:var(--agg)}
.sc-hw403-with-hw403 .s-b-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw403-with-hw403 .s-b-labd{font:600 11px var(--font-sans);fill:var(--ink)}
.sc-hw403-with-hw403 .s-b-arrow{fill:none;stroke:var(--neg);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw403-with-hw403 .s-b-arrow.s-ok{stroke:var(--tg)}
.sc-hw403-with-hw403 .s-b-arrow.s-nk{stroke:var(--ink-2)}
.sc-hw403-with-hw403 .s-b-strm{fill:var(--fresh)}
.sc-hw403-with-hw403 .s-ep-film{fill:none;stroke:var(--tg);stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:320;stroke-dashoffset:0}
.sc-hw403-with-hw403 .s-brsh .s-hd2{fill:var(--gold)}
.sc-hw403-with-hw403 .s-brsh .s-hl{fill:var(--ink-2)}
.sc-hw403-with-hw403 .s-brsh .s-bt{fill:var(--tg)}
.sc-hw403-with-hw403 .s-b-p1{opacity:0}
.sc-hw403-with-hw403 .s-b-p2{opacity:0}
.sc-hw403-with-hw403 .s-b-p3{opacity:1}
.anim .sc-hw403-with-hw403.playing .s-b-p1{animation-name:k-hw403-with-hw403-bp1}
.anim .sc-hw403-with-hw403.playing .s-b-p2{animation-name:k-hw403-with-hw403-bp2}
.anim .sc-hw403-with-hw403.playing .s-b-p3{animation-name:k-hw403-with-hw403-bp3}
.sc-hw403-with-hw403 .s-b-stream2{transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)}
.sc-hw403-with-hw403 .s-b-new2{transform-box:fill-box;transform-origin:50% 100%}
.sc-hw403-with-hw403 .s-b-pull{opacity:1}
.sc-hw403-with-hw403 .s-b-brush{opacity:0}
.anim .sc-hw403-with-hw403.playing .s-b-pull{animation-name:k-hw403-with-hw403-bpull}
.anim .sc-hw403-with-hw403.playing .s-b-film{animation-name:k-hw403-with-hw403-bfilm}
.anim .sc-hw403-with-hw403.playing .s-b-brush{animation-name:k-hw403-with-hw403-bbrush}
.anim .sc-hw403-with-hw403.playing .s-b-stream2{animation-name:k-hw403-with-hw403-bstream2}
.anim .sc-hw403-with-hw403.playing .s-b-new2{animation-name:k-hw403-with-hw403-bnew2}
.anim .sc-hw403-with-hw403.playing .s-st1 .disc{animation-name:k-hw403-with-hw403-st1-disc}
.anim .sc-hw403-with-hw403.playing .s-st2 .disc{animation-name:k-hw403-with-hw403-st2-disc}
.anim .sc-hw403-with-hw403.playing .s-st3 .disc{animation-name:k-hw403-with-hw403-st3-disc}
.anim .sc-hw403-with-hw403.playing .s-nclab{animation-name:k-hw403-with-hw403-nclab}@keyframes k-hw403-with-hw403-nclab{0%,58%{opacity:0}62%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-with-hw403-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw403-with-hw403-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw403-with-hw403-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw403-with-hw403-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw403-with-hw403-bp1{0%,2%{opacity:0}5%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw403-with-hw403-bp2{0%,33%{opacity:0}36%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw403-with-hw403-bp3{0%,66%{opacity:0}69%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-with-hw403-bpull{0%,66%{opacity:0;transform:translateY(6px)}70%,95%{opacity:1;transform:none}100%{opacity:0}}
@keyframes k-hw403-with-hw403-bfilm{0%,3%{stroke-dashoffset:320}28%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:320}}
@keyframes k-hw403-with-hw403-bbrush{0%,2%{opacity:0;transform:translateX(0)}4%{opacity:1;transform:translateX(0)}28%{opacity:1;transform:translateX(236px)}31%,100%{opacity:0;transform:translateX(236px)}}
@keyframes k-hw403-with-hw403-bstream2{0%,34%{transform:scaleY(0)}38%,54%{transform:scaleY(1)}58%,100%{transform:scaleY(0)}}
@keyframes k-hw403-with-hw403-bnew2{0%,36%{transform:scaleY(0)}58%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw403-with-hw403-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw403-with-hw403-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw403-with-hw403-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const WITH_HW403_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 184">
<text class="s-b-lab s-b-p1" x="150" y="14" text-anchor="middle">HW403 brushed on the rough surface</text>
<text class="s-g-good s-b-p2" x="150" y="14" text-anchor="middle">Pour while the film is tacky</text>
<text class="s-g-good s-b-p3" x="150" y="14" text-anchor="middle">Cured: the joint holds under load</text>
<rect class="s-b-strm s-b-stream2" x="146" y="20" width="8" height="52"></rect>
<g class="s-b-new2"><rect class="s-fr" x="30" y="72" width="240" height="52" rx="2"></rect><circle class="s-agg2" cx="62" cy="104" r="4"></circle><circle class="s-agg2" cx="118" cy="92" r="3"></circle><circle class="s-agg2" cx="170" cy="106" r="4.5"></circle><circle class="s-agg2" cx="214" cy="88" r="3.5"></circle><circle class="s-agg2" cx="250" cy="104" r="3"></circle></g><text class="s-b-labd s-nclab" x="38" y="88">New concrete</text>
<path d="M30 178V121L42 116L54 122L66 115L78 121L90 116L102 122L114 115L126 121L138 116L150 122L162 115L174 121L186 116L198 122L210 115L222 121L234 116L246 122L258 115L270 120V178Z" fill="var(--conc)"></path>
<path class="s-ep-film s-b-film" d="M30 121L42 116L54 122L66 115L78 121L90 116L102 122L114 115L126 121L138 116L150 122L162 115L174 121L186 116L198 122L210 115L222 121L234 116L246 122L258 115L270 120"></path>
<text class="s-b-labd" x="38" y="170" style="paint-order:stroke;stroke:var(--paper);stroke-width:3px">Old concrete, roughened</text>
<text x="266" y="140" text-anchor="end" style="font:600 11px var(--font-sans);fill:var(--tg);paint-order:stroke;stroke:var(--paper);stroke-width:3px">HW403 film</text>
<g class="s-b-brush s-brsh"><rect class="s-hd2" x="24" y="80" width="6" height="24" rx="2"></rect><rect class="s-hl" x="21" y="103" width="12" height="5" rx="1"></rect><rect class="s-bt" x="21" y="108" width="12" height="8" rx="1.5"></rect></g>
<g class="s-b-pull"><path class="s-b-arrow s-ok" d="M80 66V44m-6 6l6-6 6 6M220 66V44m-6 6l6-6 6 6"></path><text class="s-g-good" x="150" y="52" text-anchor="middle">Load</text></g>
<g class="s-okc s-tgok"><circle cx="270" cy="48" r="11"></circle><path d="M264.5 48.5l3.7 3.7 7.3-7.8"></path></g>
</svg>`;

const WITH_HW403_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Roughen the old surface and brush on HW403</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Pour fresh concrete while the film is still tacky</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The epoxy cures and holds both layers together</span></li></ol>`;

const WEAK_LINE_CARDS = svgCards([
  svgCard({ title: 'Without a bonding agent', style: WITHOUT_BONDING_STYLE, svg: WITHOUT_BONDING_SVG, ol: WITHOUT_BONDING_OL, verdict: 'bad' }),
  svgCard({ title: 'With HW403', style: WITH_HW403_STYLE, svg: WITH_HW403_SVG, ol: WITH_HW403_OL, verdict: 'ok' }),
]);

// --- Step 4: "Inside the Joint" — single diagram, own caption, own svg-card ---
const JOINT_STYLE = `.sc-hw403-magnified-joint .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw403-magnified-joint.playing .s-st1{animation-name:k-hw403-magnified-joint-st1}
.anim .sc-hw403-magnified-joint.playing .s-st2{animation-name:k-hw403-magnified-joint-st2}
.anim .sc-hw403-magnified-joint.playing .s-st3{animation-name:k-hw403-magnified-joint-st3}
.sc-hw403-magnified-joint .s-txb{fill:var(--cblk)}
.sc-hw403-magnified-joint .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw403-magnified-joint .s-b-new rect.s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-magnified-joint .s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-magnified-joint .s-agg2{fill:var(--agg)}
.sc-hw403-magnified-joint .s-b-labd{font:600 11px var(--font-sans);fill:var(--ink)}
.sc-hw403-magnified-joint .s-b-p3{opacity:1}
.anim .sc-hw403-magnified-joint.playing .s-b-p3{animation-name:k-hw403-magnified-joint-bp3}
.sc-hw403-magnified-joint .s-z-film{fill:none;stroke:var(--tg);stroke-width:10;stroke-linejoin:round;stroke-linecap:round;opacity:.85}
.sc-hw403-magnified-joint .s-z-cure{fill:none;stroke:var(--tgd);stroke-width:10;stroke-linejoin:round;stroke-linecap:round;opacity:.55}
.sc-hw403-magnified-joint .s-z-st{stroke:var(--gold);stroke-width:3;stroke-linecap:round;transform-box:fill-box;transform-origin:50% 50%}
.sc-hw403-magnified-joint .s-z-new{opacity:1}
.anim .sc-hw403-magnified-joint.playing .s-z-film{animation-name:k-hw403-magnified-joint-zfilm;animation-timing-function:ease-out}
.anim .sc-hw403-magnified-joint.playing .s-z-new{animation-name:k-hw403-magnified-joint-znew;animation-timing-function:ease-in}
.anim .sc-hw403-magnified-joint.playing .s-z-cure{animation-name:k-hw403-magnified-joint-zcure}
.anim .sc-hw403-magnified-joint.playing .s-z-st{animation-name:k-hw403-magnified-joint-zst;animation-delay:var(--sd,0s);animation-fill-mode:backwards;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw403-magnified-joint.playing .s-st1 .disc{animation-name:k-hw403-magnified-joint-st1-disc}
.anim .sc-hw403-magnified-joint.playing .s-st2 .disc{animation-name:k-hw403-magnified-joint-st2-disc}
.anim .sc-hw403-magnified-joint.playing .s-st3 .disc{animation-name:k-hw403-magnified-joint-st3-disc}
@keyframes k-hw403-magnified-joint-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw403-magnified-joint-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw403-magnified-joint-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw403-magnified-joint-bp3{0%,66%{opacity:0}69%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-magnified-joint-zfilm{0%,3%{opacity:0;transform:translateY(-22px)}24%,97%{opacity:.85;transform:none}100%{opacity:0}}
@keyframes k-hw403-magnified-joint-znew{0%,34%{opacity:0;transform:translateY(-44px)}40%{opacity:1}56%,97%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-44px)}}
@keyframes k-hw403-magnified-joint-zcure{0%,66%{opacity:0}78%,97%{opacity:.55}100%{opacity:0}}
@keyframes k-hw403-magnified-joint-zst{0%,70%{opacity:0;transform:scale(.2)}76%,97%{opacity:1;transform:scale(1)}100%{opacity:0}}
@keyframes k-hw403-magnified-joint-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw403-magnified-joint-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw403-magnified-joint-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const JOINT_SVG = `<svg class="s-cs-svg" viewBox="0 0 340 200">
<g class="s-z-new"><rect class="s-fr" x="20" y="22" width="300" height="108"></rect><circle class="s-agg2" cx="54" cy="62" r="9"></circle><circle class="s-agg2" cx="112" cy="92" r="7"></circle><circle class="s-agg2" cx="170" cy="54" r="10"></circle><circle class="s-agg2" cx="222" cy="96" r="8"></circle><circle class="s-agg2" cx="282" cy="60" r="9"></circle><circle class="s-agg2" cx="140" cy="112" r="4"></circle><circle class="s-agg2" cx="260" cy="110" r="4"></circle><text class="s-b-labd" x="30" y="38">Fresh concrete</text></g>
<path d="M20 194V128L40 118L56 132L72 116L92 130L108 114L126 128L144 118L160 134L180 116L198 128L214 114L234 132L252 118L270 130L290 116L306 126L320 120V194Z" fill="var(--conc)"></path>
<path class="s-z-film" d="M20 128L40 118L56 132L72 116L92 130L108 114L126 128L144 118L160 134L180 116L198 128L214 114L234 132L252 118L270 130L290 116L306 126L320 120"></path>
<path class="s-z-cure" d="M20 128L40 118L56 132L72 116L92 130L108 114L126 128L144 118L160 134L180 116L198 128L214 114L234 132L252 118L270 130L290 116L306 126L320 120"></path>
<line class="s-z-st" x1="56" y1="122" x2="56" y2="142" style="--sd:0s"></line><line class="s-z-st" x1="108" y1="104" x2="108" y2="124" style="--sd:.1s"></line><line class="s-z-st" x1="160" y1="124" x2="160" y2="144" style="--sd:.2s"></line><line class="s-z-st" x1="214" y1="104" x2="214" y2="124" style="--sd:.3s"></line><line class="s-z-st" x1="270" y1="120" x2="270" y2="140" style="--sd:.4s"></line>
<text class="s-b-labd" x="30" y="184" style="paint-order:stroke;stroke:var(--paper);stroke-width:3px">Old concrete: rough, open texture</text>
<text x="316" y="160" text-anchor="end" style="font:600 12px var(--font-sans);fill:var(--tg);paint-order:stroke;stroke:var(--paper);stroke-width:3px">HW403</text>
<text class="s-g-good s-b-p3" x="316" y="16" text-anchor="end">Locked to both sides</text>
</svg>`;

const JOINT_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Liquid HW403 wets the rough surface and runs into its texture</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Fresh concrete presses into the sticky film</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The epoxy cures and locks both sides together</span></li></ol>`;

const JOINT_CARD = svgCard({ title: 'Magnified joint', style: JOINT_STYLE, svg: JOINT_SVG, ol: JOINT_OL });

// --- Step 5: "Pot Life" — single diagram, no distinct caption ---
const POT_LIFE_STYLE = `.sc-hw403-the-clock-starts-when-you-mix .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw403-the-clock-starts-when-you-mix .s-okc circle{fill:var(--ok)}
.sc-hw403-the-clock-starts-when-you-mix .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw403-the-clock-starts-when-you-mix .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw403-the-clock-starts-when-you-mix .s-cface{fill:var(--paper);stroke:var(--ink);stroke-width:2}
.sc-hw403-the-clock-starts-when-you-mix .s-ctk{stroke:var(--ink-2);stroke-width:1.5}
.sc-hw403-the-clock-starts-when-you-mix .s-cdot{fill:var(--ink)}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-st1{animation-name:k-hw403-the-clock-starts-when-you-mix-st1}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-st2{animation-name:k-hw403-the-clock-starts-when-you-mix-st2}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-st3{animation-name:k-hw403-the-clock-starts-when-you-mix-st3}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-okc{animation-name:k-hw403-the-clock-starts-when-you-mix-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw403-the-clock-starts-when-you-mix .s-g-bad{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw403-the-clock-starts-when-you-mix .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw403-the-clock-starts-when-you-mix .s-tgok circle{fill:var(--tg)}
.sc-hw403-the-clock-starts-when-you-mix .s-b-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw403-the-clock-starts-when-you-mix .s-b-labd{font:600 11px var(--font-sans);fill:var(--ink)}
.sc-hw403-the-clock-starts-when-you-mix .s-brsh .s-hd2{fill:var(--gold)}
.sc-hw403-the-clock-starts-when-you-mix .s-brsh .s-hl{fill:var(--ink-2)}
.sc-hw403-the-clock-starts-when-you-mix .s-brsh .s-bt{fill:var(--tg)}
.sc-hw403-the-clock-starts-when-you-mix .s-b-p1{opacity:0}
.sc-hw403-the-clock-starts-when-you-mix .s-b-p2{opacity:0}
.sc-hw403-the-clock-starts-when-you-mix .s-b-p3{opacity:1}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-b-p1{animation-name:k-hw403-the-clock-starts-when-you-mix-bp1}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-b-p2{animation-name:k-hw403-the-clock-starts-when-you-mix-bp2}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-b-p3{animation-name:k-hw403-the-clock-starts-when-you-mix-bp3}
.sc-hw403-the-clock-starts-when-you-mix .s-b-ok2{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-b-ok2{animation-name:k-hw403-the-clock-starts-when-you-mix-bok2;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw403-the-clock-starts-when-you-mix .s-b-ok2{opacity:0}
.sc-hw403-the-clock-starts-when-you-mix .s-p-tin{fill:var(--ink)}
.sc-hw403-the-clock-starts-when-you-mix .s-p-mix{fill:var(--mixab)}
.sc-hw403-the-clock-starts-when-you-mix .s-p-gel{fill:var(--gelc);opacity:1}
.sc-hw403-the-clock-starts-when-you-mix .s-p-lump{fill:var(--gelc);stroke:color-mix(in srgb,var(--gelc) 60%,#000);stroke-width:1;transform-box:fill-box;transform-origin:50% 100%}
.sc-hw403-the-clock-starts-when-you-mix .s-b-hand{stroke:var(--tg);stroke-width:2.8;stroke-linecap:round;transform-box:view-box;transform-origin:52px 76px;transform:rotate(330deg)}
.sc-hw403-the-clock-starts-when-you-mix .s-p-dip{transform:translateY(-30px)}
.sc-hw403-the-clock-starts-when-you-mix .s-p-dip .s-hd2{fill:var(--gold)}
.sc-hw403-the-clock-starts-when-you-mix .s-p-dip .s-hl{fill:var(--ink-2)}
.sc-hw403-the-clock-starts-when-you-mix .s-p-dip .s-bt{fill:var(--mixab)}
.sc-hw403-the-clock-starts-when-you-mix .s-p-drip{fill:var(--mixab);opacity:0}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-b-hand{animation-name:k-hw403-the-clock-starts-when-you-mix-bhand;animation-timing-function:linear}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-p-gel{animation-name:k-hw403-the-clock-starts-when-you-mix-pgel}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-p-lump{animation-name:k-hw403-the-clock-starts-when-you-mix-zst;animation-delay:var(--sd,0s);animation-fill-mode:backwards}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-p-dip{animation-name:k-hw403-the-clock-starts-when-you-mix-pdip;animation-timing-function:ease-in-out}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-p-drip{animation-name:k-hw403-the-clock-starts-when-you-mix-pdrip;animation-delay:var(--dd,0s);animation-fill-mode:backwards}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-st1 .disc{animation-name:k-hw403-the-clock-starts-when-you-mix-st1-disc}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-st2 .disc{animation-name:k-hw403-the-clock-starts-when-you-mix-st2-disc}
.anim .sc-hw403-the-clock-starts-when-you-mix.playing .s-st3 .disc{animation-name:k-hw403-the-clock-starts-when-you-mix-st3-disc}
@keyframes k-hw403-the-clock-starts-when-you-mix-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw403-the-clock-starts-when-you-mix-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw403-the-clock-starts-when-you-mix-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw403-the-clock-starts-when-you-mix-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw403-the-clock-starts-when-you-mix-bp1{0%,2%{opacity:0}5%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw403-the-clock-starts-when-you-mix-bp2{0%,33%{opacity:0}36%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw403-the-clock-starts-when-you-mix-bp3{0%,66%{opacity:0}69%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-the-clock-starts-when-you-mix-bok2{0%,44%{opacity:0;transform:scale(.3)}50%,63%{opacity:1;transform:scale(1)}66%,100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw403-the-clock-starts-when-you-mix-bhand{0%{transform:rotate(0)}94%,97%{transform:rotate(330deg)}100%{transform:rotate(0)}}
@keyframes k-hw403-the-clock-starts-when-you-mix-pgel{0%,64%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-the-clock-starts-when-you-mix-zst{0%,70%{opacity:0;transform:scale(.2)}76%,97%{opacity:1;transform:scale(1)}100%{opacity:0}}
@keyframes k-hw403-the-clock-starts-when-you-mix-pdip{0%,34%{transform:translateY(-30px)}40%,43%{transform:none}49%,97%{transform:translateY(-30px)}100%{transform:translateY(-30px)}}
@keyframes k-hw403-the-clock-starts-when-you-mix-pdrip{0%,49%{opacity:0;transform:none}50%{opacity:1;transform:none}56%{opacity:1;transform:translateY(22px)}57%,100%{opacity:0;transform:translateY(22px)}}
@keyframes k-hw403-the-clock-starts-when-you-mix-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw403-the-clock-starts-when-you-mix-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw403-the-clock-starts-when-you-mix-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const POT_LIFE_SVG = `<svg class="s-cs-svg" viewBox="0 -22 300 218">
<text class="s-b-lab s-b-p1" x="150" y="-6" text-anchor="middle" style="font-weight:600">Part A + Part B mixed</text>
<text class="s-g-good s-b-p2" x="150" y="-6" text-anchor="middle">Still liquid: brush it on</text>
<text class="s-g-bad s-b-p3" x="150" y="-6" text-anchor="middle">Thickening in the tin: don't use</text>
<circle class="s-cface" cx="52" cy="76" r="28"></circle>
<line class="s-ctk" x1="52" y1="51" x2="52" y2="56"></line><line class="s-ctk" x1="77" y1="76" x2="72" y2="76"></line><line class="s-ctk" x1="52" y1="101" x2="52" y2="96"></line><line class="s-ctk" x1="27" y1="76" x2="32" y2="76"></line>
<line class="s-b-hand" x1="52" y1="76" x2="52" y2="55"></line><circle class="s-cdot" cx="52" cy="76" r="3"></circle>
<text class="s-b-labd s-b-p1" x="52" y="124" text-anchor="middle">0 min</text>
<text class="s-b-labd s-b-p2" x="52" y="124" text-anchor="middle">Up to 45–60 min</text>
<text class="s-g-bad s-b-p3" x="52" y="124" text-anchor="middle">Past pot life</text>
<path class="s-p-tin" d="M112 94L120 182H216L224 94Z"></path>
<ellipse class="s-p-mix" cx="168" cy="95" rx="56" ry="9"></ellipse>
<ellipse class="s-p-gel" cx="168" cy="95" rx="56" ry="9"></ellipse>
<circle class="s-p-lump" cx="146" cy="93" r="5" style="--sd:0s"></circle><circle class="s-p-lump" cx="176" cy="96" r="6" style="--sd:.15s"></circle><circle class="s-p-lump" cx="198" cy="92" r="4" style="--sd:.3s"></circle>
<text x="168" y="146" fill="#fff" font-size="16" font-weight="600" text-anchor="middle" font-family="var(--font-display)">A + B</text>
<g class="s-p-dip"><rect class="s-hd2" x="184" y="46" width="7" height="26" rx="2"></rect><rect class="s-hl" x="181" y="71" width="13" height="6" rx="1"></rect><rect class="s-bt" x="181" y="77" width="13" height="14" rx="2"></rect></g>
<circle class="s-p-drip" cx="185" cy="72" r="2.6" style="--dd:0s"></circle><circle class="s-p-drip" cx="190" cy="72" r="2.2" style="--dd:.25s"></circle><circle class="s-p-drip" cx="187" cy="72" r="2.6" style="--dd:.5s"></circle>
<g class="s-okc s-tgok s-b-ok2"><circle cx="258" cy="120" r="13"></circle><path d="M251.5 120.5l4.5 4.5 9-9.5"></path></g>
<g class="s-b-p3"><circle cx="258" cy="120" r="13" style="fill:var(--neg)"></circle><path d="M252 114l12 12M264 114l-12 12" stroke="#fff" stroke-width="2.6" stroke-linecap="round"></path></g>
</svg>`;

const POT_LIFE_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Part A and Part B are mixed: the clock starts</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>For 45–60 minutes it stays liquid and brushable</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Then it thickens in the tin. Don't use it, don't thin it</span></li></ol>`;

// --- Step 6: "Tackiness Time" — single diagram, no distinct caption ---
const TACKY_STYLE = `.sc-hw403-tacky-then-touch-dry .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw403-tacky-then-touch-dry .s-okc circle{fill:var(--ok)}
.sc-hw403-tacky-then-touch-dry .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw403-tacky-then-touch-dry .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw403-tacky-then-touch-dry .s-cface{fill:var(--paper);stroke:var(--ink);stroke-width:2}
.sc-hw403-tacky-then-touch-dry .s-ctk{stroke:var(--ink-2);stroke-width:1.5}
.sc-hw403-tacky-then-touch-dry .s-cdot{fill:var(--ink)}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-st1{animation-name:k-hw403-tacky-then-touch-dry-st1}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-st2{animation-name:k-hw403-tacky-then-touch-dry-st2}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-st3{animation-name:k-hw403-tacky-then-touch-dry-st3}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-okc{animation-name:k-hw403-tacky-then-touch-dry-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw403-tacky-then-touch-dry .s-txb{fill:var(--cblk)}
.sc-hw403-tacky-then-touch-dry .s-g-bad{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw403-tacky-then-touch-dry .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw403-tacky-then-touch-dry .s-tgok circle{fill:var(--tg)}
.sc-hw403-tacky-then-touch-dry .s-b-new rect.s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-tacky-then-touch-dry .s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-tacky-then-touch-dry .s-agg2{fill:var(--agg)}
.sc-hw403-tacky-then-touch-dry .s-b-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw403-tacky-then-touch-dry .s-b-labd{font:600 11px var(--font-sans);fill:var(--ink)}
.sc-hw403-tacky-then-touch-dry .s-b-p1{opacity:0}
.sc-hw403-tacky-then-touch-dry .s-b-p2{opacity:0}
.sc-hw403-tacky-then-touch-dry .s-b-p3{opacity:1}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-b-p1{animation-name:k-hw403-tacky-then-touch-dry-bp1}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-b-p2{animation-name:k-hw403-tacky-then-touch-dry-bp2}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-b-p3{animation-name:k-hw403-tacky-then-touch-dry-bp3}
.sc-hw403-tacky-then-touch-dry .s-b-ok2{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-b-ok2{animation-name:k-hw403-tacky-then-touch-dry-bok2;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw403-tacky-then-touch-dry .s-b-ok2{opacity:0}
.sc-hw403-tacky-then-touch-dry .s-t-hand{stroke:var(--tg);stroke-width:2.6;stroke-linecap:round;transform-box:view-box;transform-origin:136px 58px;transform:rotate(330deg)}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-t-hand{animation-name:k-hw403-tacky-then-touch-dry-bhand}
.sc-hw403-tacky-then-touch-dry .s-t-film{fill:var(--tg)}
.sc-hw403-tacky-then-touch-dry .s-t-glove{fill:var(--other);stroke:color-mix(in srgb,var(--other) 60%,var(--ink));stroke-width:1.2}
.sc-hw403-tacky-then-touch-dry .s-t-finger{transform:translateY(-40px)}
.sc-hw403-tacky-then-touch-dry .s-t-str{stroke:var(--tg);stroke-width:1.8;stroke-linecap:round;opacity:0;transform-box:fill-box;transform-origin:50% 100%}
.sc-hw403-tacky-then-touch-dry .s-t-gloss{fill:#fff;opacity:.6}
.sc-hw403-tacky-then-touch-dry .s-t-sheen{fill:#fff;opacity:0}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-t-finger{animation-name:k-hw403-tacky-then-touch-dry-tfinger;animation-timing-function:ease-in-out}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-t-str{animation-name:k-hw403-tacky-then-touch-dry-tstr}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-t-new{animation-name:k-hw403-tacky-then-touch-dry-tnew;animation-timing-function:cubic-bezier(.5,0,.7,1)}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-t-gloss{animation-name:k-hw403-tacky-then-touch-dry-tgloss}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-t-sheen{animation-name:k-hw403-tacky-then-touch-dry-tsheen}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-st1 .disc{animation-name:k-hw403-tacky-then-touch-dry-st1-disc}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-st2 .disc{animation-name:k-hw403-tacky-then-touch-dry-st2-disc}
.anim .sc-hw403-tacky-then-touch-dry.playing .s-st3 .disc{animation-name:k-hw403-tacky-then-touch-dry-st3-disc}
@keyframes k-hw403-tacky-then-touch-dry-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw403-tacky-then-touch-dry-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw403-tacky-then-touch-dry-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw403-tacky-then-touch-dry-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw403-tacky-then-touch-dry-bp1{0%,2%{opacity:0}5%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw403-tacky-then-touch-dry-bp2{0%,33%{opacity:0}36%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw403-tacky-then-touch-dry-bp3{0%,66%{opacity:0}69%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-tacky-then-touch-dry-bok2{0%,44%{opacity:0;transform:scale(.3)}50%,63%{opacity:1;transform:scale(1)}66%,100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw403-tacky-then-touch-dry-bhand{0%{transform:rotate(0)}94%,97%{transform:rotate(330deg)}100%{transform:rotate(0)}}
@keyframes k-hw403-tacky-then-touch-dry-tfinger{0%,4%{transform:translateY(-40px)}10%,13%{transform:none}22%,66%{transform:translateY(-40px)}72%,75%{transform:none}83%,100%{transform:translateY(-40px)}}
@keyframes k-hw403-tacky-then-touch-dry-tstr{0%,13%{opacity:0;transform:scaleY(0)}14%{opacity:1;transform:scaleY(.05)}22%{opacity:1;transform:scaleY(1)}26%,100%{opacity:0;transform:scaleY(1)}}
@keyframes k-hw403-tacky-then-touch-dry-tnew{0%,36%{opacity:0;transform:translateY(-50px)}38%{opacity:1}45%,97%{opacity:1;transform:none}100%{opacity:0}}
@keyframes k-hw403-tacky-then-touch-dry-tgloss{0%,62%{opacity:0}69%,97%{opacity:.6}100%{opacity:0}}
@keyframes k-hw403-tacky-then-touch-dry-tsheen{0%,62%{opacity:0;transform:translateX(0)}64%{opacity:.95}80%{opacity:.95;transform:translateX(118px)}82%,100%{opacity:0;transform:translateX(118px)}}
@keyframes k-hw403-tacky-then-touch-dry-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw403-tacky-then-touch-dry-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw403-tacky-then-touch-dry-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const TACKY_SVG = `<svg class="s-cs-svg" viewBox="0 -46 300 236">
<text class="s-g-good s-b-p1" x="150" y="-30" text-anchor="middle">Tacky: the film grabs</text>
<text class="s-g-good s-b-p2" x="150" y="-30" text-anchor="middle">Place fresh concrete now</text>
<text class="s-g-bad s-b-p3" x="150" y="-30" text-anchor="middle">Glossy, touch-dry: brush a fresh coat first</text>
<circle class="s-cface" cx="136" cy="58" r="18"></circle>
<line class="s-ctk" x1="136" y1="42" x2="136" y2="46"></line><line class="s-ctk" x1="152" y1="58" x2="148" y2="58"></line><line class="s-ctk" x1="136" y1="74" x2="136" y2="70"></line><line class="s-ctk" x1="120" y1="58" x2="124" y2="58"></line>
<line class="s-t-hand" x1="136" y1="58" x2="136" y2="45"></line><circle class="s-cdot" cx="136" cy="58" r="2.4"></circle>
<text class="s-b-labd s-b-p1" x="136" y="94" text-anchor="middle">0 h</text>
<text class="s-b-labd s-b-p2" x="136" y="94" text-anchor="middle">Within 3–5 h</text>
<text class="s-g-bad s-b-p3" x="136" y="94" text-anchor="middle">After 3–5 h</text>
<text class="s-b-lab" x="136" y="107" text-anchor="middle">at 27 °C</text>
<rect x="20" y="132" width="260" height="52" fill="var(--conc)"></rect>
<rect class="s-t-film" x="20" y="124" width="260" height="8"></rect>
<rect class="s-t-gloss" x="20" y="124" width="140" height="3"></rect>
<rect class="s-t-sheen" x="24" y="124" width="16" height="8" rx="2"></rect>
<g class="s-t-new"><rect class="s-fr" x="172" y="82" width="100" height="42" rx="2"></rect><circle class="s-agg2" cx="192" cy="113" r="4"></circle><circle class="s-agg2" cx="228" cy="110" r="3.5"></circle><circle class="s-agg2" cx="256" cy="114" r="4"></circle><text class="s-b-labd" x="180" y="98">Fresh concrete</text></g>
<g class="s-okc s-tgok s-b-ok2"><circle cx="222" cy="64" r="11"></circle><path d="M216.5 64.5l3.7 3.7 7.3-7.8"></path></g>
<line class="s-t-str" x1="74" y1="84" x2="74" y2="124"></line><line class="s-t-str" x1="81" y1="84" x2="81" y2="124"></line><line class="s-t-str" x1="88" y1="84" x2="88" y2="124"></line>
<g class="s-t-finger"><rect class="s-t-glove" x="58" y="30" width="46" height="30" rx="9"></rect><rect class="s-t-glove" x="69" y="54" width="24" height="70" rx="12"></rect></g>
<text class="s-b-labd" x="26" y="176" style="paint-order:stroke;stroke:var(--paper);stroke-width:3px">Concrete + HW403 film</text>
</svg>`;

const TACKY_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Fresh film: touch it and it pulls sticky strings</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Place fresh concrete while it is tacky: it sticks</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Film gone glossy or touch-dry? Brush a fresh coat before pouring</span></li></ol>`;

// --- Step 8: "How Strong Is the Bond?" — 2-card svg-cards ---
const SLANT_STYLE = `.sc-hw403-slant-shear-bond .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw403-slant-shear-bond.playing .s-st1{animation-name:k-hw403-slant-shear-bond-st1}
.anim .sc-hw403-slant-shear-bond.playing .s-st2{animation-name:k-hw403-slant-shear-bond-st2}
.anim .sc-hw403-slant-shear-bond.playing .s-st3{animation-name:k-hw403-slant-shear-bond-st3}
.sc-hw403-slant-shear-bond .s-txb{fill:var(--cblk)}
.sc-hw403-slant-shear-bond .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw403-slant-shear-bond .s-b-new rect.s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-slant-shear-bond .s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-slant-shear-bond .s-b-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw403-slant-shear-bond .s-b-labd{font:600 11px var(--font-sans);fill:var(--ink)}
.sc-hw403-slant-shear-bond .s-b-arrow{fill:none;stroke:var(--neg);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw403-slant-shear-bond .s-b-arrow.s-nk{stroke:var(--ink-2)}
.sc-hw403-slant-shear-bond .s-b-val{font:600 20px var(--font-display);fill:var(--tg)}
.sc-hw403-slant-shear-bond .s-b-p1{opacity:0}
.sc-hw403-slant-shear-bond .s-b-p2{opacity:0}
.sc-hw403-slant-shear-bond .s-b-p3{opacity:1}
.sc-hw403-slant-shear-bond .s-b-p23{opacity:1}
.anim .sc-hw403-slant-shear-bond.playing .s-b-p1{animation-name:k-hw403-slant-shear-bond-bp1}
.anim .sc-hw403-slant-shear-bond.playing .s-b-p2{animation-name:k-hw403-slant-shear-bond-bp2}
.anim .sc-hw403-slant-shear-bond.playing .s-b-p3{animation-name:k-hw403-slant-shear-bond-bp3}
.anim .sc-hw403-slant-shear-bond.playing .s-b-p23{animation-name:k-hw403-slant-shear-bond-bp23}
.sc-hw403-slant-shear-bond .s-s-plate{fill:var(--ink-2)}
.sc-hw403-slant-shear-bond .s-s-trk{fill:var(--rule)}
.sc-hw403-slant-shear-bond .s-s-gauge{fill:var(--tg);transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(var(--s,1))}
.sc-hw403-slant-shear-bond .s-s-bond{stroke:var(--tg);stroke-width:4;stroke-linecap:round}
.anim .sc-hw403-slant-shear-bond.playing .s-s-press{animation-name:k-hw403-slant-shear-bond-spress;animation-timing-function:ease-out}
.anim .sc-hw403-slant-shear-bond.playing .s-s-gauge{animation-name:k-hw403-slant-shear-bond-sload;animation-timing-function:ease-in}
.anim .sc-hw403-slant-shear-bond.playing .s-st1 .disc{animation-name:k-hw403-slant-shear-bond-st1-disc}
.anim .sc-hw403-slant-shear-bond.playing .s-st2 .disc{animation-name:k-hw403-slant-shear-bond-st2-disc}
.anim .sc-hw403-slant-shear-bond.playing .s-st3 .disc{animation-name:k-hw403-slant-shear-bond-st3-disc}
@keyframes k-hw403-slant-shear-bond-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw403-slant-shear-bond-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw403-slant-shear-bond-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw403-slant-shear-bond-bp1{0%,2%{opacity:0}5%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw403-slant-shear-bond-bp2{0%,33%{opacity:0}36%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw403-slant-shear-bond-bp3{0%,66%{opacity:0}69%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-slant-shear-bond-bp23{0%,33%{opacity:0}36%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-slant-shear-bond-spress{0%{transform:translateY(-14px)}12%,97%{transform:none}100%{transform:translateY(-14px)}}
@keyframes k-hw403-slant-shear-bond-sload{0%,12%{transform:scaleY(0)}62%,97%{transform:scaleY(var(--s,1))}100%{transform:scaleY(0)}}
@keyframes k-hw403-slant-shear-bond-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw403-slant-shear-bond-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw403-slant-shear-bond-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const SLANT_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 190">
<defs><marker id="hw403-slant-shear-bond-mAr403" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(--tg)"></path></marker></defs>
<text class="s-b-lab s-b-p1" x="150" y="14" text-anchor="middle">Old half + new half, HW403 on the slant</text>
<text class="s-b-lab s-b-p2" x="150" y="14" text-anchor="middle">Squeezed: the joint is pushed to slide</text>
<text class="s-g-good s-b-p3" x="150" y="14" text-anchor="middle">Bond strength at 28 days</text>
<polygon class="s-fr" points="110,50 190,50 190,156 110,64"></polygon>
<polygon points="110,64 190,156 190,170 110,170" fill="var(--conc)"></polygon>
<line class="s-s-bond" x1="110" y1="64" x2="190" y2="156"></line>
<text class="s-b-labd" x="176" y="66" text-anchor="end">New</text>
<text class="s-b-labd" x="116" y="162" style="paint-order:stroke;stroke:var(--paper);stroke-width:3px">Old</text>
<g class="s-b-p23"><line x1="149" y1="95" x2="165" y2="113" style="stroke:var(--tg);stroke-width:2.4" marker-end="url(#hw403-slant-shear-bond-mAr403)"></line><line x1="151" y1="125" x2="135" y2="107" style="stroke:var(--tg);stroke-width:2.4" marker-end="url(#hw403-slant-shear-bond-mAr403)"></line></g>
<rect class="s-s-plate" x="98" y="170" width="104" height="8" rx="2"></rect>
<g class="s-s-press"><rect class="s-s-plate" x="98" y="42" width="104" height="8" rx="2"></rect><path class="s-b-arrow s-nk" d="M150 22v16m-6-6l6 6 6-6"></path></g>
<rect class="s-s-trk" x="252" y="50" width="14" height="120" rx="3"></rect><rect class="s-s-gauge" x="252" y="50" width="14" height="120" rx="3" style="--s:1"></rect>
<text class="s-b-lab" x="259" y="184" text-anchor="middle">Load</text>
<text class="s-b-val s-b-p3" x="250" y="40" text-anchor="middle">15–16 MPa</text>
</svg>`;

const SLANT_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Old half and new half, joined on a slant with HW403</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Squeezed from the top: the slanted joint is forced to slide</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The bond holds 15–16 MPa at 28 days (ASTM C882)</span></li></ol>`;

const PULLOUT_STYLE = `.sc-hw403-reinforcement-pull-out .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw403-reinforcement-pull-out.playing .s-st1{animation-name:k-hw403-reinforcement-pull-out-st1}
.anim .sc-hw403-reinforcement-pull-out.playing .s-st2{animation-name:k-hw403-reinforcement-pull-out-st2}
.anim .sc-hw403-reinforcement-pull-out.playing .s-st3{animation-name:k-hw403-reinforcement-pull-out-st3}
.sc-hw403-reinforcement-pull-out .s-txb{fill:var(--cblk)}
.sc-hw403-reinforcement-pull-out .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw403-reinforcement-pull-out .s-b-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw403-reinforcement-pull-out .s-b-labd{font:600 11px var(--font-sans);fill:var(--ink)}
.sc-hw403-reinforcement-pull-out .s-b-arrow{fill:none;stroke:var(--neg);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw403-reinforcement-pull-out .s-b-arrow.s-ok{stroke:var(--tg)}
.sc-hw403-reinforcement-pull-out .s-b-arrow.s-nk{stroke:var(--ink-2)}
.sc-hw403-reinforcement-pull-out .s-b-val{font:600 20px var(--font-display);fill:var(--tg)}
.sc-hw403-reinforcement-pull-out .s-b-p1{opacity:0}
.sc-hw403-reinforcement-pull-out .s-b-p2{opacity:0}
.sc-hw403-reinforcement-pull-out .s-b-p3{opacity:1}
.sc-hw403-reinforcement-pull-out .s-b-p23{opacity:1}
.anim .sc-hw403-reinforcement-pull-out.playing .s-b-p1{animation-name:k-hw403-reinforcement-pull-out-bp1}
.anim .sc-hw403-reinforcement-pull-out.playing .s-b-p2{animation-name:k-hw403-reinforcement-pull-out-bp2}
.anim .sc-hw403-reinforcement-pull-out.playing .s-b-p3{animation-name:k-hw403-reinforcement-pull-out-bp3}
.anim .sc-hw403-reinforcement-pull-out.playing .s-b-p23{animation-name:k-hw403-reinforcement-pull-out-bp23}
.sc-hw403-reinforcement-pull-out .s-s-trk{fill:var(--rule)}
.sc-hw403-reinforcement-pull-out .s-h-gauge{fill:var(--tg);transform-box:fill-box;transform-origin:0 50%;transform:scaleX(var(--s,1))}
.sc-hw403-reinforcement-pull-out .s-h-hw{fill:var(--tg);opacity:.55}
.sc-hw403-reinforcement-pull-out .s-h-bar{fill:var(--steel)}
.sc-hw403-reinforcement-pull-out .s-h-rib{stroke:color-mix(in srgb,var(--steel) 55%,#000);stroke-width:1.4}
.sc-hw403-reinforcement-pull-out .s-h-jack rect{fill:var(--ink)}
.anim .sc-hw403-reinforcement-pull-out.playing .s-h-gauge{animation-name:k-hw403-reinforcement-pull-out-hload;animation-timing-function:ease-in}
.anim .sc-hw403-reinforcement-pull-out.playing .s-h-jack{animation-name:k-hw403-reinforcement-pull-out-hjack;animation-timing-function:ease-out}
.anim .sc-hw403-reinforcement-pull-out.playing .s-h-bar{animation-name:k-hw403-reinforcement-pull-out-hbar}
.anim .sc-hw403-reinforcement-pull-out.playing .s-st1 .disc{animation-name:k-hw403-reinforcement-pull-out-st1-disc}
.anim .sc-hw403-reinforcement-pull-out.playing .s-st2 .disc{animation-name:k-hw403-reinforcement-pull-out-st2-disc}
.anim .sc-hw403-reinforcement-pull-out.playing .s-st3 .disc{animation-name:k-hw403-reinforcement-pull-out-st3-disc}
@keyframes k-hw403-reinforcement-pull-out-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw403-reinforcement-pull-out-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw403-reinforcement-pull-out-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw403-reinforcement-pull-out-bp1{0%,2%{opacity:0}5%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw403-reinforcement-pull-out-bp2{0%,33%{opacity:0}36%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw403-reinforcement-pull-out-bp3{0%,66%{opacity:0}69%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-reinforcement-pull-out-bp23{0%,33%{opacity:0}36%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-reinforcement-pull-out-hload{0%,36%{transform:scaleX(0)}64%,97%{transform:scaleX(var(--s,1))}100%{transform:scaleX(0)}}
@keyframes k-hw403-reinforcement-pull-out-hjack{0%,30%{opacity:0;transform:translateY(-20px)}36%,97%{opacity:1;transform:none}100%{opacity:0}}
@keyframes k-hw403-reinforcement-pull-out-hbar{0%,60%{transform:none}63%{transform:translateY(-1px)}66%{transform:none}69%{transform:translateY(-1px)}72%,100%{transform:none}}
@keyframes k-hw403-reinforcement-pull-out-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw403-reinforcement-pull-out-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw403-reinforcement-pull-out-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const PULLOUT_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 190">
<text class="s-b-lab s-b-p1" x="150" y="14" text-anchor="middle">20 mm steel bar, bonded with HW403</text>
<text class="s-b-lab s-b-p2" x="150" y="14" text-anchor="middle">A jack pulls the bar out</text>
<text class="s-g-good s-b-p3" x="150" y="14" text-anchor="middle">Pull-out load at 28 days</text>
<rect class="s-s-trk" x="40" y="26" width="150" height="12" rx="3"></rect><rect class="s-h-gauge" x="40" y="26" width="150" height="12" rx="3" style="--s:1"></rect>
<text class="s-b-val s-b-p3" x="198" y="37">210 kN</text>
<text class="s-b-lab s-b-p3" x="198" y="51">≈ 21 tonnes</text>
<rect x="60" y="112" width="180" height="66" fill="var(--conc)"></rect>
<rect class="s-h-hw" x="140" y="112" width="20" height="58"></rect>
<g class="s-h-bar"><rect class="s-h-bar" x="145" y="60" width="10" height="106" rx="1"></rect><path class="s-h-rib" d="M145 72h10M145 82h10M145 92h10M145 102h10M145 122h10M145 132h10M145 142h10M145 152h10"></path></g>
<g class="s-h-jack"><rect x="112" y="88" width="10" height="24" rx="2"></rect><rect x="178" y="88" width="10" height="24" rx="2"></rect><rect x="106" y="76" width="88" height="12" rx="3"></rect><rect x="140" y="62" width="20" height="14" rx="2"></rect></g>
<path class="s-b-arrow s-ok s-b-p23" d="M150 58V44m-6 6l6-6 6 6"></path>
<text class="s-b-labd" x="68" y="170" style="paint-order:stroke;stroke:var(--paper);stroke-width:3px">Concrete</text>
<text x="166" y="170" style="font:600 11px var(--font-sans);fill:var(--tg);paint-order:stroke;stroke:var(--paper);stroke-width:3px">HW403</text>
</svg>`;

const PULLOUT_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>A 20 mm reinforcement bar, bonded with HW403</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>A jack pulls the bar straight out</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>It takes 210 kN at 28 days: about 21 tonnes of pull</span></li></ol>`;

const BOND_CARDS = svgCards([
  svgCard({ title: 'Slant shear bond', style: SLANT_STYLE, svg: SLANT_SVG, ol: SLANT_OL }),
  svgCard({ title: 'Reinforcement pull-out', style: PULLOUT_STYLE, svg: PULLOUT_SVG, ol: PULLOUT_OL }),
]);

// --- Step 9: "Flexural Strength" — single diagram, own caption ("Bend test") ---
const BEND_STYLE = `.sc-hw403-bend-test .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw403-bend-test.playing .s-st1{animation-name:k-hw403-bend-test-st1}
.anim .sc-hw403-bend-test.playing .s-st2{animation-name:k-hw403-bend-test-st2}
.anim .sc-hw403-bend-test.playing .s-st3{animation-name:k-hw403-bend-test-st3}
.sc-hw403-bend-test .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw403-bend-test .s-b-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw403-bend-test .s-b-arrow{fill:none;stroke:var(--neg);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw403-bend-test .s-b-arrow.s-nk{stroke:var(--ink-2)}
.sc-hw403-bend-test .s-b-val{font:600 20px var(--font-display);fill:var(--tg)}
.sc-hw403-bend-test .s-b-p1{opacity:0}
.sc-hw403-bend-test .s-b-p2{opacity:0}
.sc-hw403-bend-test .s-b-p3{opacity:1}
.anim .sc-hw403-bend-test.playing .s-b-p1{animation-name:k-hw403-bend-test-bp1}
.anim .sc-hw403-bend-test.playing .s-b-p2{animation-name:k-hw403-bend-test-bp2}
.anim .sc-hw403-bend-test.playing .s-b-p3{animation-name:k-hw403-bend-test-bp3}
.sc-hw403-bend-test .s-s-plate{fill:var(--ink-2)}
.sc-hw403-bend-test .s-s-trk{fill:var(--rule)}
.sc-hw403-bend-test .s-s-gauge{fill:var(--tg);transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(var(--s,1))}
.sc-hw403-bend-test .s-f-beam{fill:color-mix(in srgb,var(--tg) 45%,var(--paper));stroke:var(--tg);stroke-width:1.5}
.sc-hw403-bend-test .s-f-l{transform-box:fill-box;transform-origin:0% 100%;transform:rotate(6deg)}
.sc-hw403-bend-test .s-f-r{transform-box:fill-box;transform-origin:100% 100%;transform:rotate(-6deg)}
.sc-hw403-bend-test .s-f-sup{fill:var(--ink-2)}
.anim .sc-hw403-bend-test.playing .s-s-press{animation-name:k-hw403-bend-test-spress;animation-timing-function:ease-out}
.anim .sc-hw403-bend-test.playing .s-s-gauge{animation-name:k-hw403-bend-test-sload;animation-timing-function:ease-in}
.anim .sc-hw403-bend-test.playing .s-f-l{animation-name:k-hw403-bend-test-fl;animation-timing-function:ease-in}
.anim .sc-hw403-bend-test.playing .s-f-r{animation-name:k-hw403-bend-test-fr;animation-timing-function:ease-in}
.anim .sc-hw403-bend-test.playing .s-st1 .disc{animation-name:k-hw403-bend-test-st1-disc}
.anim .sc-hw403-bend-test.playing .s-st2 .disc{animation-name:k-hw403-bend-test-st2-disc}
.anim .sc-hw403-bend-test.playing .s-st3 .disc{animation-name:k-hw403-bend-test-st3-disc}
@keyframes k-hw403-bend-test-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw403-bend-test-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw403-bend-test-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw403-bend-test-bp1{0%,2%{opacity:0}5%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw403-bend-test-bp2{0%,33%{opacity:0}36%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw403-bend-test-bp3{0%,66%{opacity:0}69%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-bend-test-spress{0%{transform:translateY(-14px)}12%,97%{transform:none}100%{transform:translateY(-14px)}}
@keyframes k-hw403-bend-test-sload{0%,12%{transform:scaleY(0)}62%,97%{transform:scaleY(var(--s,1))}100%{transform:scaleY(0)}}
@keyframes k-hw403-bend-test-fl{0%,14%{transform:none}60%{transform:rotate(1.4deg)}64%,97%{transform:rotate(6deg)}100%{transform:none}}
@keyframes k-hw403-bend-test-fr{0%,14%{transform:none}60%{transform:rotate(-1.4deg)}64%,97%{transform:rotate(-6deg)}100%{transform:none}}
@keyframes k-hw403-bend-test-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw403-bend-test-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw403-bend-test-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const BEND_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 166">
<text class="s-b-lab s-b-p1" x="150" y="14" text-anchor="middle">A bar of cured HW403 on two supports</text>
<text class="s-b-lab s-b-p2" x="150" y="14" text-anchor="middle">Loaded in the middle, bending more and more</text>
<text class="s-g-good s-b-p3" x="150" y="14" text-anchor="middle">Flexural strength at 7 days</text>
<g class="s-s-press"><path class="s-b-arrow s-nk" d="M150 30v18m-6-6l6 6 6-6"></path><path class="s-s-plate" d="M142 76h16l-8 13z"></path></g>
<rect class="s-f-beam s-f-l" x="60" y="90" width="90" height="20" rx="2"></rect>
<rect class="s-f-beam s-f-r" x="150" y="90" width="90" height="20" rx="2"></rect>
<path class="s-f-sup" d="M72 128l10-16 10 16z"></path><path class="s-f-sup" d="M208 128l10-16 10 16z"></path>
<text class="s-b-val s-b-p3" x="150" y="152" text-anchor="middle">42–43 MPa</text>
<rect class="s-s-trk" x="262" y="36" width="14" height="100" rx="3"></rect><rect class="s-s-gauge" x="262" y="36" width="14" height="100" rx="3" style="--s:1"></rect>
<text class="s-b-lab" x="269" y="150" text-anchor="middle">Load</text>
</svg>`;

const BEND_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>A test bar of cured HW403 rests on two supports</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>It is loaded in the middle, bending more and more</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>It breaks at 42–43 MPa, at 7 days (ASTM C580)</span></li></ol>`;

const BEND_CARD = svgCard({ title: 'Bend test', style: BEND_STYLE, svg: BEND_SVG, ol: BEND_OL });

// --- Step 12: "Prepare, Mix, Brush, Pour" — 2-card svg-cards ---
const MIX_STYLE = `.sc-hw403-mixing .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw403-mixing .s-okc circle{fill:var(--ok)}
.sc-hw403-mixing .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw403-mixing .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw403-mixing.playing .s-st1{animation-name:k-hw403-mixing-st1}
.anim .sc-hw403-mixing.playing .s-st2{animation-name:k-hw403-mixing-st2}
.anim .sc-hw403-mixing.playing .s-st3{animation-name:k-hw403-mixing-st3}
.anim .sc-hw403-mixing.playing .s-okc{animation-name:k-hw403-mixing-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw403-mixing .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw403-mixing .s-tgok circle{fill:var(--tg)}
.sc-hw403-mixing .s-b-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw403-mixing .s-b-p1{opacity:0}
.sc-hw403-mixing .s-b-p2{opacity:0}
.sc-hw403-mixing .s-b-p3{opacity:1}
.anim .sc-hw403-mixing.playing .s-b-p1{animation-name:k-hw403-mixing-bp1}
.anim .sc-hw403-mixing.playing .s-b-p2{animation-name:k-hw403-mixing-bp2}
.anim .sc-hw403-mixing.playing .s-b-p3{animation-name:k-hw403-mixing-bp3}
.sc-hw403-mixing .s-m-bkt{fill:var(--ink)}
.sc-hw403-mixing .s-m-a{fill:var(--mixa)}
.sc-hw403-mixing .s-m-b{fill:var(--mixb)}
.sc-hw403-mixing .s-m-blk{opacity:0}
.sc-hw403-mixing .s-m-blk text{font:600 12px var(--font-display);fill:#242424}
.sc-hw403-mixing .s-m-un{opacity:0}
.sc-hw403-mixing .s-m-sw{fill:none;stroke:var(--mixb);stroke-width:3;stroke-linecap:round;opacity:0}
.sc-hw403-mixing .s-m-mix{fill:var(--mixab)}
.anim .sc-hw403-mixing.playing .s-m-blk{animation-name:k-hw403-mixing-mdrop;animation-delay:var(--md,0s);animation-fill-mode:backwards;animation-timing-function:cubic-bezier(.5,0,.7,1)}
.anim .sc-hw403-mixing.playing .s-m-un{animation-name:k-hw403-mixing-mun}
.anim .sc-hw403-mixing.playing .s-m-sw{animation-name:k-hw403-mixing-swirl}
.anim .sc-hw403-mixing.playing .s-m-mix{animation-name:k-hw403-mixing-mmix}
.sc-hw403-mixing .s-m-drill{opacity:0}
.sc-hw403-mixing .s-m-drill rect{fill:var(--ink-2)}
.anim .sc-hw403-mixing.playing .s-m-drill{animation-name:k-hw403-mixing-mdrill}
.sc-hw403-mixing .s-m-pad{fill:none;stroke:var(--ink-2);stroke-width:3;stroke-linecap:round;transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw403-mixing.playing .s-m-pad{animation:k-hw403-mixing-spin .5s linear infinite}
.anim .sc-hw403-mixing.playing .s-st1 .disc{animation-name:k-hw403-mixing-st1-disc}
.anim .sc-hw403-mixing.playing .s-st2 .disc{animation-name:k-hw403-mixing-st2-disc}
.anim .sc-hw403-mixing.playing .s-st3 .disc{animation-name:k-hw403-mixing-st3-disc}
@keyframes k-hw403-mixing-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw403-mixing-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw403-mixing-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw403-mixing-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw403-mixing-bp1{0%,2%{opacity:0}5%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw403-mixing-bp2{0%,33%{opacity:0}36%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw403-mixing-bp3{0%,66%{opacity:0}69%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-mixing-mdrop{0%{opacity:0;transform:translateY(-54px)}2%{opacity:1}8%,20%{opacity:1;transform:none}26%,100%{opacity:0;transform:none}}
@keyframes k-hw403-mixing-mun{0%,26%{opacity:0}30%,48%{opacity:1}56%,100%{opacity:0}}
@keyframes k-hw403-mixing-swirl{0%,36%{opacity:0}40%,52%{opacity:.9}62%,100%{opacity:0}}
@keyframes k-hw403-mixing-mmix{0%,48%{opacity:0}58%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-mixing-mdrill{0%,32%{opacity:0;transform:translateY(-30px)}37%{opacity:1;transform:none}86%{opacity:1;transform:none}91%,100%{opacity:0;transform:translateY(-30px)}}
@keyframes k-hw403-mixing-spin{to{transform:rotate(360deg)}}
@keyframes k-hw403-mixing-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw403-mixing-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw403-mixing-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const MIX_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 196">
<text class="s-b-lab s-b-p1" x="150" y="14" text-anchor="middle" style="font-weight:600">3 parts A + 1 part B, by volume</text>
<text class="s-b-lab s-b-p2" x="150" y="14" text-anchor="middle" style="font-weight:600">Low-speed stirrer, at least 3 min</text>
<text class="s-g-good s-b-p3" x="150" y="14" text-anchor="middle">1 more min slow, then use</text>
<g><rect class="s-m-a" x="22" y="112" width="40" height="58" rx="5"></rect><text x="42" y="146" text-anchor="middle" style="font:600 16px var(--font-display);fill:#242424">A</text><text class="s-b-lab" x="42" y="186" text-anchor="middle">3 L</text></g>
<g><rect class="s-m-b" x="244" y="140" width="32" height="30" rx="4"></rect><text x="260" y="160" text-anchor="middle" style="font:600 15px var(--font-display);fill:#242424">B</text><text class="s-b-lab" x="260" y="186" text-anchor="middle">1 L</text></g>
<path class="s-m-bkt" d="M104 98L112 178H188L196 98Z"></path><g class="s-m-drill"><rect x="138" y="22" width="24" height="18" rx="4"></rect><rect x="148" y="40" width="4" height="88"></rect><path class="s-m-pad" d="M136 128Q150 120 164 128Q150 136 136 128"></path></g>
<g class="s-m-un"><ellipse class="s-m-a" cx="150" cy="99" rx="46" ry="7"></ellipse><ellipse class="s-m-b" cx="168" cy="99" rx="16" ry="4"></ellipse></g>
<path class="s-m-sw" d="M122 99q14-6 28 0q14 6 28 0"></path>
<ellipse class="s-m-mix" cx="150" cy="99" rx="46" ry="7"></ellipse>
<g class="s-m-blk" style="--md:0s"><rect class="s-m-a" x="108" y="76" width="20" height="20" rx="3"></rect><text x="118" y="90" text-anchor="middle">A</text></g>
<g class="s-m-blk" style="--md:.3s"><rect class="s-m-a" x="130" y="76" width="20" height="20" rx="3"></rect><text x="140" y="90" text-anchor="middle">A</text></g>
<g class="s-m-blk" style="--md:.6s"><rect class="s-m-a" x="152" y="76" width="20" height="20" rx="3"></rect><text x="162" y="90" text-anchor="middle">A</text></g>
<g class="s-m-blk" style="--md:.9s"><rect class="s-m-b" x="174" y="76" width="20" height="20" rx="3"></rect><text x="184" y="90" text-anchor="middle">B</text></g>
<text x="150" y="166" fill="#fff" font-size="14" font-weight="600" text-anchor="middle" font-family="var(--font-display)">3 : 1</text>
<g class="s-okc s-tgok"><circle cx="222" cy="60" r="11"></circle><path d="M216.5 60.5l3.7 3.7 7.3-7.8"></path></g>
</svg>`;

const MIX_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>3 parts Part A + 1 part Part B, by volume</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Low-speed stirrer, at least 3 min, to a uniform colour. No air</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Stir slowly 1 more minute. Use within the pot life</span></li></ol>`;

const APP_STYLE = `.sc-hw403-application .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw403-application .s-okc circle{fill:var(--ok)}
.sc-hw403-application .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw403-application .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw403-application.playing .s-st1{animation-name:k-hw403-application-st1}
.anim .sc-hw403-application.playing .s-st2{animation-name:k-hw403-application-st2}
.anim .sc-hw403-application.playing .s-st3{animation-name:k-hw403-application-st3}
.anim .sc-hw403-application.playing .s-okc{animation-name:k-hw403-application-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw403-application .s-txb{fill:var(--cblk)}
.sc-hw403-application .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw403-application .s-tgok circle{fill:var(--tg)}
.sc-hw403-application .s-b-new rect.s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-application .s-fr{fill:var(--fresh);stroke:var(--fresh-e);stroke-width:1}
.sc-hw403-application .s-agg2{fill:var(--agg)}
.sc-hw403-application .s-b-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw403-application .s-b-labd{font:600 11px var(--font-sans);fill:var(--ink)}
.sc-hw403-application .s-b-strm{fill:var(--fresh)}
.sc-hw403-application .s-ep-film{fill:none;stroke:var(--tg);stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:320;stroke-dashoffset:0}
.sc-hw403-application .s-brsh .s-hd2{fill:var(--gold)}
.sc-hw403-application .s-brsh .s-hl{fill:var(--ink-2)}
.sc-hw403-application .s-brsh .s-bt{fill:var(--tg)}
.sc-hw403-application .s-b-p1{opacity:0}
.sc-hw403-application .s-b-p2{opacity:0}
.sc-hw403-application .s-b-p3{opacity:1}
.anim .sc-hw403-application.playing .s-b-p1{animation-name:k-hw403-application-bp1}
.anim .sc-hw403-application.playing .s-b-p2{animation-name:k-hw403-application-bp2}
.anim .sc-hw403-application.playing .s-b-p3{animation-name:k-hw403-application-bp3}
.sc-hw403-application .s-a-brush{opacity:0}
.sc-hw403-application .s-a-strm{transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)}
.sc-hw403-application .s-a-new{transform-box:fill-box;transform-origin:50% 100%}
.sc-hw403-application .s-a-dust{fill:var(--ink-2);opacity:.75}
.sc-hw403-application .s-a-vac rect{fill:var(--ink-2)}
.sc-hw403-application .s-a-vac path{fill:var(--ink-2)}
.sc-hw403-application .s-a-vac{opacity:0}
.sc-hw403-application .s-a-mask{transform:translateX(260px)}
.anim .sc-hw403-application.playing .s-a-mask{animation-name:k-hw403-application-amask}
.anim .sc-hw403-application.playing .s-a-vac{animation-name:k-hw403-application-avac}
.anim .sc-hw403-application.playing .s-a-film{animation-name:k-hw403-application-afilm}
.anim .sc-hw403-application.playing .s-a-brush{animation-name:k-hw403-application-abrush}
.anim .sc-hw403-application.playing .s-a-strm{animation-name:k-hw403-application-astrm}
.anim .sc-hw403-application.playing .s-a-new{animation-name:k-hw403-application-anew}
.anim .sc-hw403-application.playing .s-st1 .disc{animation-name:k-hw403-application-st1-disc}
.anim .sc-hw403-application.playing .s-st2 .disc{animation-name:k-hw403-application-st2-disc}
.anim .sc-hw403-application.playing .s-st3 .disc{animation-name:k-hw403-application-st3-disc}
@keyframes k-hw403-application-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw403-application-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw403-application-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw403-application-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw403-application-bp1{0%,2%{opacity:0}5%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw403-application-bp2{0%,33%{opacity:0}36%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw403-application-bp3{0%,66%{opacity:0}69%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw403-application-amask{0%,3%{transform:translateX(0)}28%,97%{transform:translateX(242px)}100%{transform:translateX(0)}}
@keyframes k-hw403-application-avac{0%,2%{opacity:0;transform:translateX(0)}4%{opacity:1;transform:translateX(0)}28%{opacity:1;transform:translateX(236px)}31%,100%{opacity:0;transform:translateX(236px)}}
@keyframes k-hw403-application-afilm{0%,36%{stroke-dashoffset:320}60%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:320}}
@keyframes k-hw403-application-abrush{0%,35%{opacity:0;transform:translateX(0)}37%{opacity:1;transform:translateX(0)}60%{opacity:1;transform:translateX(236px)}63%,100%{opacity:0;transform:translateX(236px)}}
@keyframes k-hw403-application-astrm{0%,65%{transform:scaleY(0)}69%,88%{transform:scaleY(1)}92%,100%{transform:scaleY(0)}}
@keyframes k-hw403-application-anew{0%,67%{transform:scaleY(0)}90%,97%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw403-application-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw403-application-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw403-application-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;

const APP_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 196">
<defs><mask id="hw403-application-mDust403" maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="196"><rect class="s-a-mask" x="30" y="0" width="300" height="196" fill="#fff"></rect></mask></defs>
<text class="s-b-lab s-b-p1" x="150" y="14" text-anchor="middle" style="font-weight:600">Rough, clean, dry. Vacuum the dust</text>
<text class="s-b-lab s-b-p2" x="150" y="14" text-anchor="middle" style="font-weight:600">Stiff brush: full, even coat</text>
<text class="s-g-good s-b-p3" x="150" y="14" text-anchor="middle">Pour while tacky, without stopping</text>
<rect class="s-b-strm s-a-strm" x="146" y="22" width="8" height="50"></rect>
<g class="s-a-new"><rect class="s-fr" x="30" y="72" width="240" height="52" rx="2"></rect><circle class="s-agg2" cx="62" cy="104" r="4"></circle><circle class="s-agg2" cx="118" cy="92" r="3"></circle><circle class="s-agg2" cx="170" cy="106" r="4.5"></circle><circle class="s-agg2" cx="214" cy="88" r="3.5"></circle><circle class="s-agg2" cx="250" cy="104" r="3"></circle></g>
<path d="M30 178V121L42 116L54 122L66 115L78 121L90 116L102 122L114 115L126 121L138 116L150 122L162 115L174 121L186 116L198 122L210 115L222 121L234 116L246 122L258 115L270 120V178Z" fill="var(--conc)"></path>
<path class="s-ep-film s-a-film" d="M30 121L42 116L54 122L66 115L78 121L90 116L102 122L114 115L126 121L138 116L150 122L162 115L174 121L186 116L198 122L210 115L222 121L234 116L246 122L258 115L270 120"></path>
<g mask="url(#hw403-application-mDust403)"><circle class="s-a-dust" cx="44" cy="111" r="1.8"></circle><circle class="s-a-dust" cx="58" cy="114" r="1.5"></circle><circle class="s-a-dust" cx="72" cy="110" r="1.8"></circle><circle class="s-a-dust" cx="88" cy="112" r="1.5"></circle><circle class="s-a-dust" cx="104" cy="113" r="1.8"></circle><circle class="s-a-dust" cx="118" cy="110" r="1.5"></circle><circle class="s-a-dust" cx="134" cy="112" r="1.8"></circle><circle class="s-a-dust" cx="150" cy="114" r="1.5"></circle><circle class="s-a-dust" cx="166" cy="110" r="1.8"></circle><circle class="s-a-dust" cx="182" cy="112" r="1.5"></circle><circle class="s-a-dust" cx="198" cy="114" r="1.8"></circle><circle class="s-a-dust" cx="214" cy="110" r="1.5"></circle><circle class="s-a-dust" cx="230" cy="112" r="1.8"></circle><circle class="s-a-dust" cx="246" cy="114" r="1.5"></circle><circle class="s-a-dust" cx="262" cy="110" r="1.8"></circle></g>
<g class="s-a-vac"><rect x="27" y="62" width="6" height="42" rx="2"></rect><path d="M20 104h20l-3 8H23z"></path></g>
<g class="s-a-brush s-brsh"><rect class="s-hd2" x="24" y="80" width="6" height="24" rx="2"></rect><rect class="s-hl" x="21" y="103" width="12" height="5" rx="1"></rect><rect class="s-bt" x="21" y="108" width="12" height="8" rx="1.5"></rect></g>
<text class="s-b-labd" x="38" y="170" style="paint-order:stroke;stroke:var(--paper);stroke-width:3px">Roughened concrete</text>
<g class="s-okc s-tgok"><circle cx="266" cy="46" r="11"></circle><path d="M260.5 46.5l3.7 3.7 7.3-7.8"></path></g>
</svg>`;

const APP_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Roughen, clean and dry. Vacuum thoroughly</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Stiff brush: an even, complete coat</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Pour fresh concrete while tacky, continuously</span></li></ol>`;

const PREP_MIX_CARDS = svgCards([
  svgCard({ title: 'Mixing', style: MIX_STYLE, svg: MIX_SVG, ol: MIX_OL }),
  svgCard({ title: 'Application', style: APP_STYLE, svg: APP_SVG, ol: APP_OL }),
]);

module.exports = {
  productName: 'HW403 Bonding Agent Epoxy',
  productDescription: 'Solvent-free, two-part epoxy bonding agent for structural applications',
  topicDescription: 'Everything a sales, dealer or applicator team member needs to know about HW403 Bonding Agent Epoxy: where it goes, pot life and tackiness time, bond/flexural strength, mixing ratio and kit coverage, application method and site do/don\'t checks.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image',
      title: 'Bonding Agent Epoxy',
      data: {
        text: 'Hard Worker HW403. A solvent-free, two-part epoxy that bonds new concrete to old concrete, and concrete to steel.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/bonding-agent-epoxy.webp'],
        caption: 'HW403 — Brush it on. Pour while tacky.',
        key: 'HW403 · Solvent-Free, Two-Part Epoxy Bonding Agent',
      },
    },
    {
      type: 'text',
      title: 'Where It Goes',
      data: {
        text: 'Wherever fresh concrete has to grip a surface that is already hard.<div class="item-grid"><div class="item-card">New concrete over hardened concrete<span class="item-card-check">✓</span></div><div class="item-card">Concrete to steel reinforcement<span class="item-card-check">✓</span></div><div class="item-card">Structural repairs<span class="item-card-check">✓</span></div><div class="item-card">Concrete to tiles, bricks and glazed faces<span class="item-card-check">✓</span></div></div>',
        explanation: 'Only on dry, sound, properly prepared surfaces, between +5 °C and +35 °C. The TDS lists tiles, bricks and glazed faces as surfaces HW403 bonds concrete to, as part of a structural repair — it is not a tile adhesive; for fixing tiles, use the Tile Fix range.',
      },
    },
    {
      type: 'svg',
      title: 'New on Old: The Weak Line',
      data: {
        text: 'Fresh concrete placed on hardened concrete does not fuse with it. The meeting line is a cold joint, and that is where it fails.',
        svgMarkup: WEAK_LINE_CARDS,
      },
    },
    {
      type: 'knowledge',
      title: 'Knowledge Check — Mix Ratio',
      data: {
        text: 'What is the HW403 mixing ratio of resin to hardener?',
        list: ['1:1', '2:1', '3:1', '5:1'],
        correctIndex: 2,
        explanation: 'HW403 is mixed 3 parts Part A (resin) to 1 part Part B (hardener), by volume.',
      },
    },
    {
      type: 'svg',
      title: 'Inside the Joint',
      data: {
        text: 'Zoom in on the line where old meets new. The epoxy is the glue between them.',
        svgMarkup: JOINT_CARD,
        badges: [
          { icon: '💧', label: 'Wets', sub: 'Flows into the open texture of the old surface', tone: 'neutral' },
          { icon: '🤝', label: 'Grabs', sub: 'Stays tacky, so fresh concrete sticks to it', tone: 'neutral' },
          { icon: '🔒', label: 'Locks', sub: 'Cures to a high-strength bond', tone: 'neutral' },
        ],
      },
    },
    {
      type: 'card',
      title: 'Pot Life',
      data: {
        text: 'Think of cement mortar in a pan: once mixed, it has to be used before it stiffens. HW403 works the same way. When A meets B a reaction starts, and the mix slowly turns from liquid to solid.',
        stats: [{ value: '45–60', label: 'minutes of working time' }],
        badges: [
          { icon: '💧', label: 'Liquid', sub: 'Brush it on', tone: 'ok' },
          { icon: '🌡️', label: 'Thickening', sub: "Stop. Don't thin it", tone: 'neutral' },
          { icon: '⛔', label: 'Hard', sub: 'Wasted', tone: 'bad' },
        ],
        gauges: [{ label: 'Pot life 45–60 min', sub: 'Mix A + B · time →', valuePct: 100, result: 'The clock starts when you mix', highlight: true, showDot: false }],
        svgMarkup: singleSvg({ style: POT_LIFE_STYLE, svg: POT_LIFE_SVG, ol: POT_LIFE_OL }),
        explain: 'Mix only as much as the crew can brush on within the pot life. The TDS calls it an extended pot life, suited to demanding repair work.',
      },
    },
    {
      type: 'card',
      title: 'Tackiness Time',
      data: {
        text: 'Think of glue: press two things together while the glue is wet and sticky, and they bond. Wait until it has dried, and they won\'t. Fresh concrete must meet HW403 while the film is still sticky.',
        stats: [{ value: '3–5', label: 'hours at 27 °C' }],
        badges: [
          { icon: '💧', label: 'Tacky', sub: 'Pour fresh concrete now', tone: 'ok' },
          { icon: '✨', label: 'Glossy, touch-dry', sub: 'Recoat, then pour', tone: 'bad' },
        ],
        gauges: [{ label: 'Tackiness time 3–5 h at 27 °C', sub: 'Brush on · time →', valuePct: 100, result: 'Tacky, then touch-dry', highlight: true, showDot: false }],
        svgMarkup: singleSvg({ style: TACKY_STYLE, svg: TACKY_SVG, ol: TACKY_OL }),
        explain: 'Touch-Dry = Too Late. Fresh concrete needs a tacky film to bond. If the film has lost its tack or looks glossy, recoat, then pour.',
      },
    },
    {
      type: 'card',
      title: 'Two Clocks, One Job',
      data: {
        text: 'One clock runs in the tin, the other on the wall or slab. Keep both in mind on site.',
        tableRows: [
          { label: 'In the tin: Pot life', value: '45–60 min — mixed material stays brushable' },
          { label: 'On the surface: Tackiness time', value: '3–5 h at 27 °C — window to place fresh concrete' },
        ],
        steps: [
          { title: 'Mix A + B', desc: 'Brush on within pot life' },
          { title: 'Brush on within pot life', desc: 'Pour while tacky' },
          { title: 'Pour while tacky', desc: 'Film glossy or no longer tacky? Recoat before you pour.' },
        ],
        explain: 'Why Does the Film Last Longer than the Tin? The reaction gives off heat. A full tin traps that heat and speeds itself up; a thin brushed film loses it to the air and the concrete, so it stays sticky for longer. That is why you never leave mixed material sitting in the tin.',
      },
    },
    {
      type: 'svg',
      title: 'How Strong Is the Bond?',
      data: {
        text: 'Two lab tests put the bond itself under load. Here is what each one does.',
        svgMarkup: BOND_CARDS,
      },
    },
    {
      type: 'svg',
      title: 'Flexural Strength',
      data: {
        text: 'How much bending the cured epoxy itself can take before it breaks.',
        svgMarkup: BEND_CARD,
        stats: [
          { value: '3–5 h', label: 'Tackiness time', sub: 'At 27 °C' },
          { value: '45–60', label: 'min pot life', sub: 'After mixing' },
          { value: '210', label: 'kN pull-out', sub: '20 mm bar, 28 days' },
          { value: '15–16', label: 'MPa slant shear bond', sub: '28 days, ASTM C882' },
          { value: '42–43', label: 'MPa flexural', sub: '7 days, ASTM C580' },
          { value: '3 : 1', label: 'Mix ratio A : B', sub: 'By volume' },
        ],
      },
    },
    {
      type: 'card',
      title: 'HW403 · Solvent-Free, Two-Part Epoxy Bonding System for Structural Applications',
      data: {
        badges: [
          { icon: '💪', label: 'High bond strength', sub: 'Old concrete to new concrete', tone: 'neutral' },
          { icon: '🔩', label: '210 kN pull-out', sub: '20 mm bar, at 28 days', tone: 'neutral' },
          { icon: '⏱️', label: 'Extended pot life', sub: '45–60 min to work with', tone: 'neutral' },
          { icon: '🪟', label: '3–5 h tack window', sub: 'Time to place concrete, at 27 °C', tone: 'neutral' },
          { icon: '📦', label: 'Pre-batched', sub: 'Consistent kit, every time', tone: 'neutral' },
          { icon: '🧱', label: 'Bonds many surfaces', sub: 'Concrete, steel, tiles, bricks, glazed', tone: 'neutral' },
          { icon: '🌿', label: 'Solvent-free', sub: 'Eco-friendly system', tone: 'neutral' },
          { icon: '✅', label: 'Nil VOC', sub: 'No heavy metals', tone: 'neutral' },
        ],
        tableRows: [
          { label: 'Pack', value: '4 L kit' },
          { label: 'Inside', value: 'A 3 L + B 1 L' },
          { label: 'Mix ratio', value: '3 : 1 by volume' },
          { label: 'Coverage', value: '15–20 sq ft/L/coat' },
          { label: 'Coat thickness', value: 'Max 0.5 mm' },
          { label: 'Apply at', value: '+5 to +35 °C' },
          { label: 'Shelf life', value: '12 months' },
          { label: 'Store at', value: '+5 to +30 °C' },
          { label: 'Clean tools', value: 'Suitable thinner' },
        ],
      },
    },
    {
      type: 'card',
      title: 'How Many Kits?',
      data: {
        text: 'One 4 L kit covers about 60–80 sq ft per coat (15–20 sq ft per litre, max 0.5 mm).',
        calc: {
          mode: 'range',
          unitLabel: 'sq ft',
          defaultQty: 200,
          min: 10,
          max: 1000000,
          units: [{ label: '1 coat', factor: 1 }, { label: '2 coats', factor: 2 }],
          presetSteps: [100, 250, 500, 1000],
          resultLabel: 'of mixed HW403 for {qty} {unit}',
          minCoveragePerUnit: 20,
          maxCoveragePerUnit: 15,
          decimalPlaces: 1,
          rangeResultUnit: 'L',
          rangePackSize: 4,
          rangePackLabel: 'kits of 4 L',
          note: 'Estimate from the TDS coverage. Plan by the higher litre figure and add site wastage. Pick 2 coats to budget for a recoat if the film may lose its tack before the pour.',
        },
      },
    },
    {
      type: 'svg',
      title: 'Prepare, Mix, Brush, Pour',
      data: {
        text: 'All in one go. No pause between the bonding coat and the concrete.',
        svgMarkup: PREP_MIX_CARDS,
        steps: [
          { title: 'Prepare', desc: 'Dry, sound, no oil or dust. Roughen concrete; blast-clean steel. Vacuum' },
          { title: 'Mix', desc: '3 A : 1 B by volume. Low speed ≥ 3 min + 1 min slow' },
          { title: 'Brush', desc: 'Stiff brush, even and complete coat, within pot life' },
          { title: 'Pour while tacky', desc: 'Continuous placing. No breaks, no cold joints' },
          { title: 'Recoat if glossy', desc: 'Lost its tack? Fresh coat first, then pour' },
        ],
      },
    },
    {
      type: 'text',
      title: 'Do This, Not That',
      data: {
        badges: [
          { icon: '✗', label: 'Dilute the product', sub: 'Not with water, not with thinner', tone: 'bad' },
          { icon: '✗', label: 'Apply below +5 °C or above +35 °C', sub: 'Surface or air temperature', tone: 'bad' },
          { icon: '✗', label: 'Apply on wet or unprepared surfaces', sub: 'Dry, sound, roughened only', tone: 'bad' },
          { icon: '✗', label: 'Pour on a glossy or dry film', sub: 'Recoat first', tone: 'bad' },
          { icon: '✗', label: 'Stop between coat and pour', sub: 'Interruptions leave cold joints', tone: 'bad' },
          { icon: '✓', label: 'Mix only what you can use', sub: 'Within the 45–60 min pot life', tone: 'ok' },
          { icon: '✓', label: 'Blast-clean steel', sub: 'Free of rust and scale, then vacuum', tone: 'ok' },
          { icon: '✓', label: 'Clean tools straight away', sub: 'With thinner. Cured epoxy only comes off mechanically', tone: 'ok' },
          { icon: '✓', label: 'Wear gloves, goggles, protective clothing', sub: "Don't breathe the vapours. Ventilate", tone: 'ok' },
          { icon: '✓', label: 'Trained crew, site engineer present', sub: 'Checks mix ratio, mixing time, tack and continuous pour', tone: 'ok' },
        ],
      },
    },
    {
      type: 'knowledge',
      title: 'Scenario: On Site',
      data: {
        text: 'On site: Spot the Failure. Four crews applied HW403 before a jacketing pour today. One of these applications will fail. Can you spot what went wrong?',
        list: [
          'Epoxy applied on a dry, clean surface',
          'Epoxy mixed 3:1 and used within 90 minutes',
          'Fresh concrete poured after the epoxy dried',
          'Epoxy coat applied evenly with no gaps',
        ],
        correctIndex: 2,
        explanation: 'Fresh concrete must be placed while HW403 is still tacky. If the layer dries or turns glossy, a fresh coat is needed before proceeding.',
      },
    },
    {
      type: 'text',
      title: 'Cheat Sheet',
      data: {
        sections: [
          { label: 'What it is', text: 'Part A resin + Part B hardener, mixed on site 3 : 1 by volume. Brushed on as a bonding coat before fresh concrete is placed.' },
          { label: 'How it works', text: 'New concrete on old only touches, leaving a weak cold joint. HW403 wets the rough old surface, fresh concrete sticks to its tacky film, and it cures into a high-strength bond.' },
          { label: 'Where', text: 'New concrete over hardened concrete; concrete to steel reinforcement; structural repairs where concrete meets tiles, bricks or glazed faces. Not a tile adhesive.' },
          { label: 'Pot life', text: '45–60 min. Time the mix stays brushable in the tin. Mix only what you can use.' },
          { label: 'Tackiness time', text: '3–5 h at 27 °C. Window to place fresh concrete on the film. Glossy or touch-dry = recoat first.' },
          { label: 'Strength', text: '210 kN pull-out, 20 mm bar, 28 days. 15–16 MPa slant shear bond, 28 days (ASTM C882). 42–43 MPa flexural, 7 days (ASTM C580).' },
          { label: 'Key features', text: 'Solvent-free, nil VOC, pre-batched for consistency, extended pot life, bonds concrete, steel, tiles, bricks and glazed surfaces.' },
          { label: 'How to use', text: 'Dry, sound, roughened; steel blast-cleaned; vacuum. Low-speed stir ≥ 3 min + 1 min slow. Stiff brush, even coat. Pour while tacky, continuously.' },
          { label: 'Never', text: 'Dilute · apply below +5 °C or above +35 °C · apply on wet surfaces · pour on a glossy film.' },
          { label: 'Coverage', text: '15–20 sq ft per litre per coat, max 0.5 mm. About 60–80 sq ft per 4 L kit.' },
          { label: 'Pack', text: '4 L kit (A 3 L + B 1 L). 12 months sealed, +5 to +30 °C, dry and shaded.' },
        ],
      },
    },
  ],
};
