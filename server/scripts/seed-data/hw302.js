const { svgCard } = require('../lib/svgCard');

const AIR_CELLS_STYLE = `.sc-hw302-air-cells .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw302-air-cells .s-mor{fill:var(--cmor)}
.sc-hw302-air-cells .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw302-air-cells .s-badtx{fill:var(--neg);font-weight:600}
.anim .sc-hw302-air-cells.playing .s-st1{animation-name:k-hw302-air-cells-st1}
.anim .sc-hw302-air-cells.playing .s-st2{animation-name:k-hw302-air-cells-st2}
.anim .sc-hw302-air-cells.playing .s-st3{animation-name:k-hw302-air-cells-st3}
.anim .sc-hw302-air-cells.playing .s-badtx{animation-name:k-hw302-air-cells-redge}
.sc-hw302-air-cells .s-late{opacity:1}
.anim .sc-hw302-air-cells.playing .s-late{animation-name:k-hw302-air-cells-lateIn}
.sc-hw302-air-cells .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw302-air-cells .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw302-air-cells .s-cs-svg{max-width:520px;margin:0 auto}
.sc-hw302-air-cells .s-suck{fill:none;stroke:var(--neg);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.sc-hw302-air-cells .s-capA{opacity:0}
.sc-hw302-air-cells .s-capB{opacity:0}
.anim .sc-hw302-air-cells.playing .s-capA{animation-name:k-hw302-air-cells-phA}
.anim .sc-hw302-air-cells.playing .s-capB{animation-name:k-hw302-air-cells-phB}
.anim .sc-hw302-air-cells.playing .s-capC{animation-name:k-hw302-air-cells-phC}
.anim .sc-hw302-air-cells.playing .s-suck{animation-name:k-hw302-air-cells-suck}
.sc-hw302-air-cells .s-aacb{fill:var(--aac)}
.sc-hw302-air-cells .s-aacc{fill:var(--aacc)}
.sc-hw302-air-cells .s-aacs{fill:none;stroke:var(--aace);stroke-width:1.2}
.sc-hw302-air-cells .s-wtr{fill:var(--water)}
.sc-hw302-air-cells .s-wsoak{fill:var(--water);opacity:.3}
.sc-hw302-air-cells .s-mdry{fill:var(--paper);opacity:.5}
.sc-hw302-air-cells .s-hlc circle{fill:none;stroke:var(--pc);stroke-width:1.6}
.sc-hw302-air-cells .s-hlc{opacity:0}
.sc-hw302-air-cells .s-lens{fill:var(--paper);stroke:var(--ink-2);stroke-width:2}
.sc-hw302-air-cells .s-dim{fill:none;stroke:var(--ink-2);stroke-width:1.2}
.anim .sc-hw302-air-cells.playing .s-hlc{animation-name:k-hw302-air-cells-kHlc}
.sc-hw302-air-cells .s-adrop{opacity:0}
.anim .sc-hw302-air-cells.playing .s-adrop{animation-name:k-hw302-air-cells-kDrop}
.sc-hw302-air-cells .s-asoak{transform-box:fill-box;transform-origin:50% 0}
.anim .sc-hw302-air-cells.playing .s-asoak{animation-name:k-hw302-air-cells-kSoak}
.anim .sc-hw302-air-cells.playing .s-amor{animation-name:k-hw302-air-cells-kMor}
.sc-hw302-air-cells .s-amw{opacity:0}
.anim .sc-hw302-air-cells.playing .s-amw{animation-name:k-hw302-air-cells-kMw}
.anim .sc-hw302-air-cells.playing .s-amdry{animation-name:k-hw302-air-cells-kMdry}
.anim .sc-hw302-air-cells.playing .s-asuck{animation-name:k-hw302-air-cells-kSuckC}
@keyframes k-hw302-air-cells-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw302-air-cells-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw302-air-cells-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw302-air-cells-redge{0%,72%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw302-air-cells-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw302-air-cells-phA{0%,31%{opacity:1}34%,100%{opacity:0}}
@keyframes k-hw302-air-cells-phB{0%,32%{opacity:0}35%,64%{opacity:1}67%,100%{opacity:0}}
@keyframes k-hw302-air-cells-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw302-air-cells-suck{0%,24%{opacity:0;transform:none}30%{opacity:1;transform:none}56%{opacity:1;transform:translateY(8px)}62%,100%{opacity:0;transform:translateY(8px)}}
@keyframes k-hw302-air-cells-kHlc{0%{opacity:0}6%,28%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw302-air-cells-kDrop{0%,34%{opacity:0;transform:translateY(-26px)}37%{opacity:1;transform:translateY(-26px)}52%{opacity:1;transform:translateY(14px)}56%,100%{opacity:0;transform:translateY(14px)}}
@keyframes k-hw302-air-cells-kSoak{0%,36%{transform:scaleY(0)}60%,97%{transform:none}100%{transform:scaleY(0)}}
@keyframes k-hw302-air-cells-kMor{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw302-air-cells-kMw{0%,67%{opacity:0;transform:none}70%{opacity:1;transform:none}90%{opacity:0;transform:translateY(22px)}100%{opacity:0}}
@keyframes k-hw302-air-cells-kMdry{0%,76%{opacity:0}90%,97%{opacity:.5}100%{opacity:0}}
@keyframes k-hw302-air-cells-kSuckC{0%,68%{opacity:0;transform:none}72%{opacity:1;transform:none}88%{opacity:1;transform:translateY(8px)}92%,100%{opacity:0}}`;

const AIR_CELLS_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 340 200"><defs><pattern id="hw302-air-pCell" patternUnits="userSpaceOnUse" width="22" height="22"><rect class="s-aacb" width="22" height="22"></rect><circle class="s-aacc" cx="4" cy="5" r="2.2"></circle><circle class="s-aacc" cx="13" cy="3" r="1.4"></circle><circle class="s-aacc" cx="18" cy="11" r="2.4"></circle><circle class="s-aacc" cx="8" cy="13" r="1.6"></circle><circle class="s-aacc" cx="3" cy="19" r="1.3"></circle><circle class="s-aacc" cx="14" cy="18" r="2"></circle><circle class="s-aacc" cx="20" cy="20" r="1"></circle><circle class="s-aacc" cx="11" cy="9" r="0.9"></circle></pattern></defs>
<rect x="24" y="92" width="200" height="92" rx="3" fill="url(#hw302-air-pCell)"></rect>
<rect x="24" y="92" width="200" height="92" rx="3" class="s-aacs"></rect>
<rect x="24" y="92" width="200" height="42" class="s-wsoak s-asoak"></rect>
<g class="s-adrop"><circle class="s-wtr" cx="70" cy="80" r="4"></circle><circle class="s-wtr" cx="124" cy="74" r="4"></circle><circle class="s-wtr" cx="178" cy="80" r="4"></circle></g>
<g class="s-amor"><rect x="24" y="80" width="200" height="12" class="s-mor"></rect><rect x="24" y="80" width="200" height="12" class="s-mdry s-amdry"></rect></g>
<g class="s-amw"><circle class="s-wtr" cx="54" cy="86" r="2.4"></circle><circle class="s-wtr" cx="96" cy="86" r="2.4"></circle><circle class="s-wtr" cx="138" cy="86" r="2.4"></circle><circle class="s-wtr" cx="180" cy="86" r="2.4"></circle><circle class="s-wtr" cx="208" cy="86" r="2.4"></circle></g>
<g class="s-suck s-asuck"><path d="M76 96v16m-5-5l5 5 5-5"></path><path d="M124 96v16m-5-5l5 5 5-5"></path><path d="M172 96v16m-5-5l5 5 5-5"></path></g>
<g transform="translate(16 4)"><circle class="s-lens" cx="268" cy="132" r="40"></circle>
<g><circle class="s-aacc" cx="252" cy="118" r="7"></circle><circle class="s-aacc" cx="276" cy="112" r="5"></circle><circle class="s-aacc" cx="290" cy="134" r="8"></circle><circle class="s-aacc" cx="262" cy="142" r="6"></circle><circle class="s-aacc" cx="248" cy="154" r="4"></circle><circle class="s-aacc" cx="278" cy="158" r="5.5"></circle><circle class="s-aacc" cx="244" cy="134" r="3.5"></circle></g>
<path class="s-dim" d="M210 116l20 4"></path>
<g class="s-hlc"><circle cx="252" cy="118" r="9"></circle><circle cx="290" cy="134" r="10"></circle><circle cx="262" cy="142" r="8"></circle></g></g>
<text class="s-lbl" x="334" y="197" text-anchor="end">Air cells, magnified</text>
<text class="s-lbl" x="24" y="197">AAC block</text>
<text class="s-lblb s-capA" x="124" y="30" text-anchor="middle">1 · Air cells all through the block</text>
<text class="s-lblb s-capB" x="124" y="30" text-anchor="middle">2 · Open cells pull water in</text>
<text class="s-lblb s-capC" x="124" y="30" text-anchor="middle">3 · Wet mortar loses its water</text>
<text class="s-lbl s-badtx s-late" x="124" y="50" text-anchor="middle">The joint is left dry and weak.</text>
</svg>`;

const AIR_CELLS_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Millions of tiny air cells: light, easy to cut and handle</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Porous: the cells pull water in, like a sponge (high suction)</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Put ordinary wet mortar on it and the block drinks the mortar's water</span></li></ol>`;

const CONV_JOINT_STYLE = `.sc-hw302-conv-joint .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw302-conv-joint .s-mor{fill:var(--cmor)}
.sc-hw302-conv-joint .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw302-conv-joint .s-badtx{fill:var(--neg);font-weight:600}
.anim .sc-hw302-conv-joint.playing .s-st1{animation-name:k-hw302-conv-joint-st1}
.anim .sc-hw302-conv-joint.playing .s-st2{animation-name:k-hw302-conv-joint-st2}
.anim .sc-hw302-conv-joint.playing .s-st3{animation-name:k-hw302-conv-joint-st3}
.anim .sc-hw302-conv-joint.playing .s-badtx{animation-name:k-hw302-conv-joint-redge}
.sc-hw302-conv-joint .s-late{opacity:1}
.anim .sc-hw302-conv-joint.playing .s-late{animation-name:k-hw302-conv-joint-lateIn}
.sc-hw302-conv-joint .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw302-conv-joint .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw302-conv-joint .s-capA{opacity:0}
.sc-hw302-conv-joint .s-capB{opacity:0}
.anim .sc-hw302-conv-joint.playing .s-capA{animation-name:k-hw302-conv-joint-phA}
.anim .sc-hw302-conv-joint.playing .s-capB{animation-name:k-hw302-conv-joint-phB}
.anim .sc-hw302-conv-joint.playing .s-capC{animation-name:k-hw302-conv-joint-phC}
.sc-hw302-conv-joint .s-aacb{fill:var(--aac)}
.sc-hw302-conv-joint .s-aacc{fill:var(--aacc)}
.sc-hw302-conv-joint .s-aacs{fill:none;stroke:var(--aace);stroke-width:1.2}
.sc-hw302-conv-joint .s-wtr{fill:var(--water)}
.sc-hw302-conv-joint .s-wsoak{fill:var(--water);opacity:.3}
.sc-hw302-conv-joint .s-mdry{fill:var(--paper);opacity:.5}
.sc-hw302-conv-joint .s-jcrk{fill:none;stroke:var(--neg);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:300;stroke-dashoffset:0}
.sc-hw302-conv-joint .s-jarr{fill:none;stroke:var(--neg);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.sc-hw302-conv-joint .s-dim{fill:none;stroke:var(--ink-2);stroke-width:1.2}
.anim .sc-hw302-conv-joint.playing .s-tblk{animation-name:k-hw302-conv-joint-kBlk}
.sc-hw302-conv-joint .s-jwu{opacity:0}
.sc-hw302-conv-joint .s-jwd{opacity:0}
.anim .sc-hw302-conv-joint.playing .s-jwu{animation-name:k-hw302-conv-joint-kJwu}
.anim .sc-hw302-conv-joint.playing .s-jwd{animation-name:k-hw302-conv-joint-kJwd}
.anim .sc-hw302-conv-joint.playing .s-jsk{animation-name:k-hw302-conv-joint-kJsk}
.anim .sc-hw302-conv-joint.playing .s-jdry{animation-name:k-hw302-conv-joint-kJdry}
.anim .sc-hw302-conv-joint.playing .s-jarr{animation-name:k-hw302-conv-joint-kJarr}
.anim .sc-hw302-conv-joint.playing .s-jcrk{animation-name:k-hw302-conv-joint-kJcrk}
.sc-hw302-conv-joint .s-onmor{fill:var(--ink);paint-order:stroke;stroke:var(--cmor);stroke-width:4px;stroke-linejoin:round}
@keyframes k-hw302-conv-joint-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw302-conv-joint-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw302-conv-joint-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw302-conv-joint-redge{0%,72%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw302-conv-joint-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw302-conv-joint-phA{0%,31%{opacity:1}34%,100%{opacity:0}}
@keyframes k-hw302-conv-joint-phB{0%,32%{opacity:0}35%,64%{opacity:1}67%,100%{opacity:0}}
@keyframes k-hw302-conv-joint-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw302-conv-joint-kBlk{0%{opacity:0;transform:translateY(-28px)}4%{opacity:1;transform:translateY(-28px)}16%,97%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-28px)}}
@keyframes k-hw302-conv-joint-kJwu{0%,33%{opacity:1;transform:none}58%{opacity:0;transform:translateY(-24px)}60%,100%{opacity:0;transform:none}}
@keyframes k-hw302-conv-joint-kJwd{0%,33%{opacity:1;transform:none}58%{opacity:0;transform:translateY(24px)}60%,100%{opacity:0;transform:none}}
@keyframes k-hw302-conv-joint-kJsk{0%,34%{opacity:0}58%,97%{opacity:.3}100%{opacity:0}}
@keyframes k-hw302-conv-joint-kJdry{0%,45%{opacity:0}64%,97%{opacity:.5}100%{opacity:0}}
@keyframes k-hw302-conv-joint-kJarr{0%,34%{opacity:0}38%,58%{opacity:1}62%,100%{opacity:0}}
@keyframes k-hw302-conv-joint-kJcrk{0%,66%{stroke-dashoffset:300}82%,97%{stroke-dashoffset:0}100%{stroke-dashoffset:300}}`;

const CONV_JOINT_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 212"><defs><pattern id="hw302-conv-pCell" patternUnits="userSpaceOnUse" width="22" height="22"><rect class="s-aacb" width="22" height="22"></rect><circle class="s-aacc" cx="4" cy="5" r="2.2"></circle><circle class="s-aacc" cx="13" cy="3" r="1.4"></circle><circle class="s-aacc" cx="18" cy="11" r="2.4"></circle><circle class="s-aacc" cx="8" cy="13" r="1.6"></circle><circle class="s-aacc" cx="3" cy="19" r="1.3"></circle><circle class="s-aacc" cx="14" cy="18" r="2"></circle><circle class="s-aacc" cx="20" cy="20" r="1"></circle><circle class="s-aacc" cx="11" cy="9" r="0.9"></circle></pattern></defs>
<rect x="20" y="130" width="260" height="60" rx="2" fill="url(#hw302-conv-pCell)"></rect><rect x="20" y="130" width="260" height="60" rx="2" class="s-aacs"></rect>
<rect x="20" y="104" width="260" height="26" class="s-mor"></rect>
<rect x="20" y="104" width="260" height="26" class="s-mdry s-jdry"></rect>
<g class="s-tblk"><rect x="20" y="44" width="260" height="60" rx="2" fill="url(#hw302-conv-pCell)"></rect><rect x="20" y="44" width="260" height="60" rx="2" class="s-aacs"></rect></g>
<rect x="20" y="84" width="260" height="20" class="s-wsoak s-jsk"></rect><rect x="20" y="130" width="260" height="20" class="s-wsoak s-jsk"></rect>
<g class="s-jwu"><circle class="s-wtr" cx="46" cy="112" r="2.6"></circle><circle class="s-wtr" cx="110" cy="112" r="2.6"></circle><circle class="s-wtr" cx="174" cy="112" r="2.6"></circle><circle class="s-wtr" cx="238" cy="112" r="2.6"></circle></g>
<g class="s-jwd"><circle class="s-wtr" cx="78" cy="122" r="2.6"></circle><circle class="s-wtr" cx="142" cy="122" r="2.6"></circle><circle class="s-wtr" cx="206" cy="122" r="2.6"></circle><circle class="s-wtr" cx="262" cy="122" r="2.6"></circle></g>
<g class="s-jarr"><path d="M70 106V90m-5 5l5-5 5 5"></path><path d="M150 106V90m-5 5l5-5 5 5"></path><path d="M230 106V90m-5 5l5-5 5 5"></path><path d="M110 128v16m-5-5l5 5 5-5"></path><path d="M190 128v16m-5-5l5 5 5-5"></path></g>
<path class="s-jcrk" d="M22 105 l18 2 16-2 20 2 18-2 22 2 16-2 20 2 18-2 22 2 18-2 20 2 18-2 20 2 10 -1"></path>
<path class="s-jcrk" d="M22 129 l20 -2 18 2 16 -2 22 2 18 -2 20 2 16 -2 22 2 20 -2 18 2 16 -2 20 2 12 -1"></path>
<path class="s-dim" d="M290 104v26M286 104h8M286 130h8"></path>
<text class="s-lbl s-onmor" x="26" y="120">Thick cement + sand</text>
<text class="s-lbl" x="26" y="184">AAC block</text>
<text class="s-lblb s-capA" x="150" y="24" text-anchor="middle">1 · Thick wet joint laid</text>
<text class="s-lblb s-capB" x="150" y="24" text-anchor="middle">2 · Both blocks suck out its water</text>
<text class="s-lblb s-capC" x="150" y="24" text-anchor="middle">3 · Dry, shrunk, cracked at both faces</text>
<text class="s-lbl s-badtx s-late" x="150" y="206" text-anchor="middle">Weak, powdery joint. Hairline cracks.</text>
</svg>`;

const CONV_JOINT_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Thick bed of site cement and sand</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Porous AAC above and below pulls the water out</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Joint starves, shrinks and loses grip on the block faces</span></li></ol>`;

const THIN_BED_STYLE = `.sc-hw302-thin-bed .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw302-thin-bed .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw302-thin-bed .s-okc circle{fill:var(--ok)}
.sc-hw302-thin-bed .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw302-thin-bed .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw302-thin-bed.playing .s-st1{animation-name:k-hw302-thin-bed-st1}
.anim .sc-hw302-thin-bed.playing .s-st2{animation-name:k-hw302-thin-bed-st2}
.anim .sc-hw302-thin-bed.playing .s-st3{animation-name:k-hw302-thin-bed-st3}
.anim .sc-hw302-thin-bed.playing .s-okc{animation-name:k-hw302-thin-bed-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw302-thin-bed .s-late{opacity:1}
.sc-hw302-thin-bed .s-goodtx{fill:var(--pc);font-weight:600}
.anim .sc-hw302-thin-bed.playing .s-late{animation-name:k-hw302-thin-bed-lateIn}
.sc-hw302-thin-bed .s-tfsvg text{font-family:var(--font-sans)}
.sc-hw302-thin-bed .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw302-thin-bed .s-lblp{font:600 12px var(--font-sans);fill:var(--pc)}
.sc-hw302-thin-bed .s-adhp{fill:color-mix(in srgb,var(--pc) 22%,var(--adh))}
.sc-hw302-thin-bed .s-pcg circle{fill:var(--pc)}
.sc-hw302-thin-bed .s-pcg path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw302-thin-bed .s-holdp{fill:none;stroke:var(--pc);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.sc-hw302-thin-bed .s-capA{opacity:0}
.sc-hw302-thin-bed .s-capB{opacity:0}
.anim .sc-hw302-thin-bed.playing .s-capA{animation-name:k-hw302-thin-bed-phA}
.anim .sc-hw302-thin-bed.playing .s-capB{animation-name:k-hw302-thin-bed-phB}
.anim .sc-hw302-thin-bed.playing .s-capC{animation-name:k-hw302-thin-bed-phC}
.anim .sc-hw302-thin-bed.playing .s-wk2{animation-name:k-hw302-thin-bed-wk2}
.anim .sc-hw302-thin-bed.playing .s-holdp{animation-name:k-hw302-thin-bed-holdp}
.sc-hw302-thin-bed .s-aacb{fill:var(--aac)}
.sc-hw302-thin-bed .s-aacc{fill:var(--aacc)}
.sc-hw302-thin-bed .s-aacs{fill:none;stroke:var(--aace);stroke-width:1.2}
.sc-hw302-thin-bed .s-wtr{fill:var(--water)}
.sc-hw302-thin-bed .s-dim{fill:none;stroke:var(--ink-2);stroke-width:1.2}
.anim .sc-hw302-thin-bed.playing .s-tblk{animation-name:k-hw302-thin-bed-kBlk}
.anim .sc-hw302-thin-bed.playing .s-thinj{animation-name:k-hw302-thin-bed-kThin}
.sc-hw302-thin-bed .s-thinj{transform-box:fill-box;transform-origin:0 50%}
@keyframes k-hw302-thin-bed-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw302-thin-bed-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw302-thin-bed-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw302-thin-bed-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw302-thin-bed-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw302-thin-bed-phA{0%,31%{opacity:1}34%,100%{opacity:0}}
@keyframes k-hw302-thin-bed-phB{0%,32%{opacity:0}35%,64%{opacity:1}67%,100%{opacity:0}}
@keyframes k-hw302-thin-bed-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw302-thin-bed-wk2{0%,50%,100%{opacity:.55}25%,75%{opacity:1}}
@keyframes k-hw302-thin-bed-holdp{0%,28%{opacity:0}33%,62%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw302-thin-bed-kBlk{0%{opacity:0;transform:translateY(-28px)}4%{opacity:1;transform:translateY(-28px)}16%,97%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-28px)}}
@keyframes k-hw302-thin-bed-kThin{0%{transform:scaleX(0)}10%,97%{transform:none}100%{transform:scaleX(0)}}`;

const THIN_BED_SVG = `<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 212"><defs><pattern id="hw302-thin-pCell" patternUnits="userSpaceOnUse" width="22" height="22"><rect class="s-aacb" width="22" height="22"></rect><circle class="s-aacc" cx="4" cy="5" r="2.2"></circle><circle class="s-aacc" cx="13" cy="3" r="1.4"></circle><circle class="s-aacc" cx="18" cy="11" r="2.4"></circle><circle class="s-aacc" cx="8" cy="13" r="1.6"></circle><circle class="s-aacc" cx="3" cy="19" r="1.3"></circle><circle class="s-aacc" cx="14" cy="18" r="2"></circle><circle class="s-aacc" cx="20" cy="20" r="1"></circle><circle class="s-aacc" cx="11" cy="9" r="0.9"></circle></pattern></defs>
<rect x="20" y="112" width="260" height="60" rx="2" fill="url(#hw302-thin-pCell)"></rect><rect x="20" y="112" width="260" height="60" rx="2" class="s-aacs"></rect>
<rect x="20" y="105" width="260" height="7" class="s-adhp s-thinj"></rect>
<g class="s-wk2"><circle class="s-wtr" cx="50" cy="108.5" r="1.8"></circle><circle class="s-wtr" cx="100" cy="108.5" r="1.8"></circle><circle class="s-wtr" cx="150" cy="108.5" r="1.8"></circle><circle class="s-wtr" cx="200" cy="108.5" r="1.8"></circle><circle class="s-wtr" cx="250" cy="108.5" r="1.8"></circle></g>
<g class="s-tblk"><rect x="20" y="45" width="260" height="60" rx="2" fill="url(#hw302-thin-pCell)"></rect><rect x="20" y="45" width="260" height="60" rx="2" class="s-aacs"></rect></g>
<g class="s-holdp"><path d="M70 100v-8m-6 0h12"></path><path d="M150 100v-8m-6 0h12"></path><path d="M230 100v-8m-6 0h12"></path><path d="M110 117v8m-6 0h12"></path><path d="M190 117v8m-6 0h12"></path></g>
<g transform="translate(150 150)"><g class="s-okc"><g class="s-pcg"><circle cx="0" cy="0" r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g></g>
<path class="s-dim" d="M290 105v7M286 105h8M286 112h8"></path><text class="s-lblp" x="276" y="84" text-anchor="end">≈ 3 mm</text>
<text class="s-lbl" x="26" y="166">AAC block</text>
<text class="s-lblb s-capA" x="150" y="24" text-anchor="middle">1 · Thin, even bed with notched trowel</text>
<text class="s-lblb s-capB" x="150" y="24" text-anchor="middle">2 · Polymer mix holds its water</text>
<text class="s-lblb s-capC" x="150" y="24" text-anchor="middle">3 · Cures in place, grips both faces</text>
<text class="s-lbl s-goodtx s-late" x="150" y="196" text-anchor="middle">Full bond. The two blocks act as one.</text>
</svg>`;

const THIN_BED_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Factory-blended mortar, 3 mm bed with a notched trowel</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Polymer-modified mix resists the block's suction</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Joint cures fully: high bond, no separate water curing</span></li></ol>`;

const BLOCK_THICKNESS_COVERAGE = [
  { label: '100 mm block', minCoveragePerUnit: 80, maxCoveragePerUnit: 100 },
  { label: '150 mm block', minCoveragePerUnit: 57.14, maxCoveragePerUnit: 66.67 },
  { label: '200 mm block', minCoveragePerUnit: 40, maxCoveragePerUnit: 50 },
];

module.exports = {
  productName: 'HW302 Block Fix AAC',
  productDescription: 'Polymer-modified thin-bed adhesive mortar for AAC block masonry',
  topicDescription: 'Why AAC blocks need a thin-bed adhesive and not sand-cement mortar, how HW302 compares on strength, independent lab verification, pot life and open time, how to lay it, and how much to order.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image', title: 'Block Fix AAC', data: {
        text: 'Why AAC blocks need an adhesive and not a sand-cement mortar, how HW302 compares on strength, what the data sheet and the third-party report say, why the wall lasts longer, and how much to order.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/block-fix-aac.webp'],
        caption: 'Block Fix AAC HW302',
        key: 'HW302',
      },
    },
    {
      type: 'svg', title: 'A Block Full of Air, and Thirsty', data: {
        text: 'AAC is autoclaved aerated concrete. It is aerated on purpose: tiny air cells run all through the block. That makes it light. It also makes it porous, so it pulls water into itself like a sponge. The One Line to Remember: cement needs water to set and gain strength. If the block takes that water first, the mortar never reaches its strength.',
        svgMarkup: `<style>${AIR_CELLS_STYLE}</style><div class="svg-anim anim sc-hw302-air-cells playing" style="--T:9s">${AIR_CELLS_SVG}${AIR_CELLS_OL}</div>`,
      },
    },
    {
      type: 'svg', title: 'Why Sand-Cement Mortar Fails on AAC', data: {
        text: 'The same two blocks, joined two ways. Watch where the water goes.',
        svgMarkup: `<div class="svg-cards">${svgCard({ title: 'Conventional: thick sand-cement joint', style: CONV_JOINT_STYLE, svg: CONV_JOINT_SVG, ol: CONV_JOINT_OL, durationSec: 9 }).replace('class="svg-anim anim playing"', 'class="svg-anim anim sc-hw302-conv-joint playing"')}${svgCard({ title: 'HW302: 3 mm polymer thin-bed', style: THIN_BED_STYLE, svg: THIN_BED_SVG, ol: THIN_BED_OL, durationSec: 9 }).replace('class="svg-anim anim playing"', 'class="svg-anim anim sc-hw302-thin-bed playing"')}</div>`,
        table: {
          headers: ['Conventional', 'HW302'],
          rows: [
            ['Block drinks the mortar — Porous AAC, high suction', 'Polymer-modified HW302'],
            ['Weak, powdery joint — Cement starved of water', '11.20 MPa at 28 days (lab tested)'],
            ['Cracks along the joints — Thick joint dries and shrinks', 'Shrinkage-resistant'],
            ['Thick joint, more material', '2–3 mm thin joint'],
            ['Water curing — Water and labour after laying', 'No separate water curing'],
            ['Site-mix variation — Ratio changes batch to batch', 'Factory-blended, just add water'],
          ],
        },
      },
    },
    {
      type: 'knowledge', title: 'Knowledge Check — Open Time', data: {
        text: 'What is the open time for HW302?',
        list: ['10 minutes', '15 minutes', '20 minutes', '30 minutes'],
        correctIndex: 2,
        explain: 'HW302 has an open time of 20 minutes — a spread bed must have a block placed on it within that window.',
      },
    },
    {
      type: 'card', title: 'Conventional Mortar vs HW302', data: {
        text: 'The same AAC wall, built two ways.',
        table: {
          headers: ['Feature', 'Conventional', 'HW302 Block Fix AAC'],
          rows: [
            ['Joint', 'Thick sand-cement bed', 'Thin bed, 2–3 mm'],
            ['Mix', 'Cement + sand, batched on site', 'Factory-blended: cement, polymers, graded fillers. Just add water'],
            ['Water', 'Pulled out by the porous block', 'Polymer-modified mix cures in the joint'],
            ['Compressive, 28 days', '2.96–5.38 MPa (1:6 control mortars)', '11.20 MPa (lab tested); 8–9 MPa declared (TDS)'],
            ['Bond', 'Joint loses grip as it dries', 'Split tensile 0.85 MPa (lab tested); "improved bond over traditional mortars" (TDS)'],
            ['Cracking', 'Prone to shrinkage cracks', 'Shrinkage-resistant, crack resistance'],
            ['Curing', 'Water curing needed', 'No separate water curing of the joint'],
            ['Speed', 'Mix, lay thick, cure', 'Faster laying, fast setting'],
          ],
        },
      },
    },
    {
      type: 'card', title: 'Two Strengths Hold the Wall', data: {
        text: 'A joint has two jobs. Carry the blocks above it without crushing. And hold the blocks together without pulling apart. HW302 is tested for both.',
        badges: [
          { icon: '🧱', label: 'Compressive — ASTM C109', sub: 'How much load the joint carries before it crushes', tone: 'neutral' },
          { icon: '🔗', label: 'Split tensile — ASTM C1660', sub: 'How well the joint resists being pulled apart', tone: 'neutral' },
        ],
        tableRows: [
          { label: 'Compressive benefit', value: 'A stable wall that does not settle at the joints' },
          { label: 'Split tensile benefit', value: 'Blocks stay bonded; fewer cracks along the joints' },
        ],
      },
    },
    {
      type: 'card', title: 'Up to 3.8× the Compressive Strength', data: {
        text: 'Conventional 1:6 cement–sand mortar against HW302. Same age, compressive strength in MPa.',
        stats: [
          { value: '3.8×', label: 'vs RSG/CGL 1:6 mortar', sub: '11.20 vs 2.96 MPa at 28 days' },
          { value: '2.1×', label: 'vs RSC 1:6 mortar', sub: '11.20 vs 5.38 MPa at 28 days' },
          { value: '7.80', label: 'HW302 at 7 days', sub: 'MPa · already above both 28-day mortars' },
        ],
        explanation: 'In 7 days HW302 is stronger than conventional mortar is in 28. Even the declared TDS minimum of 8 MPa is higher than both 28-day controls.',
      },
    },
    {
      type: 'card', title: 'HW302 · Block Fix AAC', data: {
        text: 'High-performance, cement-based thin-bed mortar for bonding AAC blocks. A factory blend of cement, polymers and graded fillers: the sand is already in the bag.',
        badges: [
          { icon: '📏', label: 'Thin-bed 2–3 mm', sub: '', tone: 'neutral' },
          { icon: '🧪', label: 'Polymer-modified', sub: '', tone: 'neutral' },
          { icon: '💧', label: 'Just add water', sub: '', tone: 'neutral' },
        ],
        tableRows: [
          { label: 'Joint', value: '2–3 mm' },
          { label: 'Water per 40 kg', value: '10–11.2 L' },
          { label: 'Pot life', value: '60 min' },
          { label: 'Open time', value: '20 min' },
          { label: 'Compressive, 28 d', value: '8–9 MPa' },
          { label: 'Pack · shelf life', value: '40 kg · 6 months' },
        ],
        sections: [
          { label: 'Key USPs, as per the TDS', text: 'Superior adhesion in 2–3 mm thin joints. Minimises material consumption. High strength, crack resistance, long-term durability. Smooth consistency, easy workability. Fast setting and shrinkage-resistant. Improved bond strength over traditional mortars.' },
          { label: 'Safety, as per the MSDS', text: 'Non-hazardous. VOC: nil. Heavy metals: nil. Non-combustible. Gloves, goggles, dust mask when mixing.' },
        ],
      },
    },
    {
      type: 'card', title: 'Two Clocks on Site', data: {
        text: 'Pot life is how long the mixed bucket stays usable. Open time is how long a spread bed can wait before the block goes on it.',
        gauges: [
          { label: 'Pot life', sub: 'Mixed bucket — use the whole batch', valuePct: 100, result: '60 min', highlight: true, showDot: false },
          { label: 'Open time', sub: 'Spread bed — too late to set a block after this', valuePct: 33, result: '20 min', highlight: false, showDot: false },
        ],
        table: {
          headers: ['Feature', 'On site', 'Customer benefit'],
          rows: [
            ['Pot life 60 min', 'Mix only what the mason uses in an hour. Never re-temper', 'No wasted, half-set mortar in the wall'],
            ['Open time 20 min', 'Spread only as far ahead as can be laid in 20 minutes', 'Every block sits on a fresh, sticky bed'],
            ['Thin bed 2–3 mm', 'Notched trowel gives the same thickness every course', 'Less material, consistent wall'],
            ['Fast setting (TDS)', 'Mortar sets quickly once the block is laid', 'Faster laying, faster site cycle'],
            ['No water curing (MS)', 'No separate water curing of the joint beyond normal practice', 'Saves curing water and labour'],
          ],
        },
      },
    },
    {
      type: 'card', title: 'How to Lay It, Where It Goes', data: {
        text: "Five steps. The mason's two checks: a 3 mm bed, and a slight squeeze-out at the joint.",
        steps: [
          { title: 'Prepare', desc: 'Block faces dry, dust-free, no loose material. No wet or saturated blocks.' },
          { title: 'Mix', desc: '10–11.2 L water per 40 kg. Powder into water. Slow-speed blender, 3–5 min, lump-free.' },
          { title: 'Spread', desc: 'Notched trowel: a uniform 3 mm bed on the block face.' },
          { title: 'Place', desc: 'Within 20 min. Press firmly. Check level and plumb. Slight squeeze-out = good bond.' },
          { title: 'Finish', desc: 'Wipe excess with a damp sponge before it sets. Protect from rain until set.' },
        ],
        badges: [
          { icon: '🚫', label: 'Re-temper or use partly set mortar', sub: '', tone: 'bad' },
          { icon: '🚫', label: 'Apply on water-logged or dusty surfaces', sub: '', tone: 'bad' },
          { icon: '🚫', label: 'Add additives not specified', sub: '', tone: 'bad' },
        ],
        sections: [
          { label: 'Where It Goes', text: 'Residential and commercial walls. Interior partitions (non-load-bearing). Exterior walls. Multi-storey and precast AAC panels.' },
        ],
        explanation: 'Meeting a column or beam? Concrete surfaces must be roughened by hacking or grinding first, for mechanical grip.',
      },
    },
    {
      type: 'card', title: 'Independent Lab Beats the Data Sheet', data: {
        text: 'An independent lab tested HW302 for compressive and split tensile strength. Both results are above the values the TDS declares.',
        stats: [
          { value: '11.20', label: 'Compressive, 28 days', sub: 'MPa · TDS declares 8–9' },
          { value: '0.85', label: 'Split tensile, 28 days', sub: 'MPa · TDS declares 0.4–0.5' },
          { value: '7.80', label: 'Compressive, 7 days', sub: 'MPa' },
          { value: '0.60', label: 'Split tensile, 7 days', sub: 'MPa' },
        ],
      },
    },
    {
      type: 'card', title: 'Same AAC Wall, Two Ways to Build It', data: {
        text: "A wall is only as durable as its joints. On AAC, a starved sand-cement joint is the weak line. An adhesive joint is not. Conventional mortar: thick sand-cement joints look fine on day one, but joints dry out and shrink, leaving cracks along joints and loose blocks that show through the plaster. HW302 thin-bed: 3 mm joints cure in place from day one, and the wall stays one solid unit with sound joints and sound plaster.",
        badges: [
          { icon: '✅', label: 'Joint cures fully', sub: 'Polymer-modified; no starved, powdery joint. No separate water curing', tone: 'ok' },
          { icon: '✅', label: 'Blocks act as one', sub: 'High bond "enhancing structural stability" (TDS). 0.85 MPa split tensile', tone: 'ok' },
          { icon: '✅', label: 'Resists cracking', sub: 'Shrinkage-resistant, crack resistance, long-term durability (TDS)', tone: 'ok' },
          { icon: '✅', label: 'Same quality every bag', sub: 'Factory blend, uniform 3 mm joint: "consistent, durable masonry" (MS)', tone: 'ok' },
        ],
      },
    },
    {
      type: 'card', title: 'How Much for the Wall?', data: {
        text: 'Material per 100 sq ft of wall at a 3 mm joint, as declared in the TDS. It depends on the block thickness.',
        table: {
          headers: ['Block', 'Material per 100 sq ft', 'Bags of HW302 (40 kg)'],
          rows: [
            ['100 mm block', '40–50 kg', '1 to 1¼ bags per 100 sq ft'],
            ['150 mm block', '60–70 kg', '1½ to 1¾ bags per 100 sq ft'],
            ['200 mm block', '80–100 kg', '2 to 2½ bags per 100 sq ft'],
          ],
        },
        calc: {
          mode: 'range',
          unitLabel: 'sq ft',
          defaultQty: 1000,
          min: 1,
          max: 1000000,
          units: [{ label: 'sq ft', factor: 1 }, { label: 'm²', factor: 10.7639 }],
          resultLabel: 'bags of HW302 (40 kg) for {qty} {unit}',
          packOptions: BLOCK_THICKNESS_COVERAGE,
          note: 'Multiply bags by 40 kg for the total HW302 needed. Sand is already in the bag: no site sand needed. Water 10–11.2 L per 40 kg bag. Joint 2–3 mm, notched trowel. Shelf life 6 months, sealed and dry.',
        },
      },
    },
    {
      type: 'knowledge', title: 'Scenario: On Site', data: {
        text: 'On site: Blocks in the Rain. The AAC blocks delivered to site are damp from overnight rain. The mason wants to start the wall with HW302 right away. The AAC blocks delivered to site are damp from rain. What will you do before using HW302?',
        list: ['Lay them immediately', 'Dry blocks before laying', 'Add extra adhesive to compensate', 'Apply a bonding agent first'],
        correctIndex: 1,
        explain: 'Damp or saturated AAC blocks should not be laid — dry them first. A wet block changes the suction behaviour the thin-bed mortar is designed around.',
      },
    },
    {
      type: 'text', title: 'Cheat Sheet', data: {
        text: 'HW302 at a glance. Check it before a visit.',
        sections: [
          { label: 'The problem', text: 'Sand-cement mortar on AAC. AAC is full of air cells: light, but porous with high suction. It drinks the water out of wet mortar.' },
          { label: 'Result', text: 'Starved, weak joint; shrinks and cracks along the block faces; needs water curing; thick joints use more material.' },
          { label: 'Strength of 1:6 control mortars at 28 days', text: '2.96 MPa (RSG/CGL) and 5.38 MPa (RSC).' },
          { label: 'HW302 Block Fix AAC', text: 'Polymer-modified thin-bed mortar · 40 kg. Factory blend of cement, polymers and graded fillers. Just add water. 2–3 mm joint.' },
          { label: 'Mix', text: '10–11.2 L water per 40 kg (25–28%). Slow-speed blender, 3–5 min.' },
          { label: 'Clocks', text: 'Pot life 60 min · open time 20 min.' },
          { label: 'TDS data', text: '8–9 MPa compressive, 28 days (ASTM C109). 0.4–0.5 MPa split tensile, 28 days (ASTM C1660).' },
          { label: 'Lab tested', text: '11.20 MPa compressive (7.80 at 7 days). 0.85 MPa split tensile (0.60 at 7 days). Up to 3.8× conventional 1:6 mortar.' },
          { label: 'USPs', text: 'Superior adhesion in thin joints, less material, shrinkage- and crack-resistant, fast setting, no separate water curing, non-hazardous, VOC nil.' },
          { label: 'Where', text: 'Internal and external AAC walls, partitions (non-load-bearing), multi-storey, precast AAC panels.' },
          { label: 'Coverage', text: 'Per 100 sq ft at 3 mm: 100 mm block 40–50 kg · 150 mm 60–70 kg · 200 mm 80–100 kg.' },
          { label: 'Do not', text: 'Re-temper; use wet or saturated blocks; apply on water-logged or dusty surfaces.' },
        ],
      },
    },
  ],
};
