const { svgCard, svgCards, singleSvg } = require('../lib/svgCard');

// --- Step 4: "Add Water, and Cement Clumps" — 2-card diagram pair ---
const CEMENT_WATER_ONLY_STYLE = `.sc-hw930-cement-water-only .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw930-cement-water-only .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw930-cement-water-only .s-badtx{font:600 11.5px var(--font-sans);fill:var(--neg)}
.sc-hw930-cement-water-only .s-nok circle{fill:var(--neg)}
.sc-hw930-cement-water-only .s-nok path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round}
.sc-hw930-cement-water-only .s-nok{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw930-cement-water-only .s-capA{opacity:0}
.sc-hw930-cement-water-only .s-capB{opacity:0}
.sc-hw930-cement-water-only .s-capC{opacity:1}
.anim .sc-hw930-cement-water-only.playing .s-st1{animation-name:k-hw930-cement-water-only-st1}
.anim .sc-hw930-cement-water-only.playing .s-st2{animation-name:k-hw930-cement-water-only-st2}
.anim .sc-hw930-cement-water-only.playing .s-st3{animation-name:k-hw930-cement-water-only-st3}
.anim .sc-hw930-cement-water-only.playing .s-capA{animation-name:k-hw930-cement-water-only-capA}
.anim .sc-hw930-cement-water-only.playing .s-capB{animation-name:k-hw930-cement-water-only-capB}
.anim .sc-hw930-cement-water-only.playing .s-capC{animation-name:k-hw930-cement-water-only-capC}
.anim .sc-hw930-cement-water-only.playing .s-late{animation-name:k-hw930-cement-water-only-late}
.anim .sc-hw930-cement-water-only.playing .s-okc{animation-name:k-hw930-cement-water-only-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw930-cement-water-only .s-grn{fill:var(--conc);stroke:var(--conc2);stroke-width:1.2}
.sc-hw930-cement-water-only .s-sgn{font:600 12px var(--font-sans)}
.sc-hw930-cement-water-only .s-sgn.s-sp{fill:var(--neg)}
.sc-hw930-cement-water-only .s-sgn.s-sn{fill:var(--gold)}
.sc-hw930-cement-water-only .s-trp{fill:var(--water);opacity:.85}
.sc-hw930-cement-water-only .s-wbg{fill:var(--water);opacity:.12}
.sc-hw930-cement-water-only .s-gA{transform:translate(var(--fx),var(--fy))}
.sc-hw930-cement-water-only .s-trapA{opacity:.85}
.anim .sc-hw930-cement-water-only.playing .s-gA{animation-name:k-hw930-cement-water-only-gA;animation-timing-function:ease-in-out}
.anim .sc-hw930-cement-water-only.playing .s-trapA{animation-name:k-hw930-cement-water-only-trapA}
.anim .sc-hw930-cement-water-only.playing .s-st1 .disc{animation-name:k-hw930-cement-water-only-st1-disc}
.anim .sc-hw930-cement-water-only.playing .s-st2 .disc{animation-name:k-hw930-cement-water-only-st2-disc}
.anim .sc-hw930-cement-water-only.playing .s-st3 .disc{animation-name:k-hw930-cement-water-only-st3-disc}
@keyframes k-hw930-cement-water-only-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw930-cement-water-only-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw930-cement-water-only-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw930-cement-water-only-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw930-cement-water-only-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw930-cement-water-only-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-cement-water-only-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-cement-water-only-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw930-cement-water-only-gA{0%,26%{transform:translate(0,0)}42%,97%{transform:translate(var(--fx),var(--fy))}100%{transform:translate(0,0)}}
@keyframes k-hw930-cement-water-only-trapA{0%,40%{opacity:0}52%,97%{opacity:.85}100%{opacity:0}}
@keyframes k-hw930-cement-water-only-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw930-cement-water-only-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw930-cement-water-only-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;
const CEMENT_WATER_ONLY_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214"><rect x="8" y="28" width="284" height="164" rx="10" class="s-wbg"></rect><g class="s-gA" style="--fx:0px;--fy:-6px"><circle class="s-grn" cx="150" cy="112" r="15"></circle><text class="s-sgn s-sp" x="150" y="116" text-anchor="middle">+</text></g><g class="s-gA" style="--fx:73px;--fy:34px"><circle class="s-grn" cx="52" cy="62" r="12"></circle><text class="s-sgn s-sn" x="52" y="66" text-anchor="middle">–</text></g><g class="s-gA" style="--fx:-75px;--fy:37px"><circle class="s-grn" cx="250" cy="58" r="12"></circle><text class="s-sgn s-sp" x="250" y="62" text-anchor="middle">+</text></g><g class="s-gA" style="--fx:57px;--fy:-42px"><circle class="s-grn" cx="80" cy="168" r="12"></circle><text class="s-sgn s-sn" x="80" y="172" text-anchor="middle">–</text></g><g class="s-gA" style="--fx:-68px;--fy:-42px"><circle class="s-grn" cx="232" cy="170" r="11"></circle><text class="s-sgn s-sp" x="232" y="174" text-anchor="middle">+</text></g><g class="s-gA" style="--fx:1px;--fy:35px"><circle class="s-grn" cx="150" cy="44" r="10"></circle><text class="s-sgn s-sn" x="150" y="48" text-anchor="middle">–</text></g><g class="s-gA" style="--fx:77px;--fy:-10px"><circle class="s-grn" cx="38" cy="128" r="9"></circle><text class="s-sgn s-sp" x="38" y="132" text-anchor="middle">+</text></g><g class="s-gA" style="--fx:-76px;--fy:-2px"><circle class="s-grn" cx="262" cy="118" r="10"></circle><text class="s-sgn s-sn" x="262" y="122" text-anchor="middle">–</text></g><circle class="s-trp s-trapA" cx="138" cy="109" r="4.2"></circle><circle class="s-trp s-trapA" cx="162" cy="110" r="4.2"></circle><circle class="s-trp s-trapA" cx="150" cy="93" r="4.2"></circle><circle class="s-trp s-trapA" cx="150" cy="124" r="4.2"></circle><circle class="s-trp s-trapA" cx="126" cy="110" r="4.2"></circle><circle class="s-trp s-trapA" cx="174" cy="112" r="4.2"></circle><text class="s-lblb s-capA" x="150" y="20" text-anchor="middle">1 · Cement grains meet water</text><text class="s-lblb s-capB" x="150" y="20" text-anchor="middle">2 · Opposite charges attract: grains clump</text><text class="s-lblb s-capC" x="150" y="20" text-anchor="middle">3 · Water gets locked inside the floc</text><g transform="translate(272 40)"><g class="s-nok"><circle r="11"></circle><path d="M-4.5-4.5l9 9M4.5-4.5l-9 9"></path></g></g><text class="s-badtx s-late" x="150" y="208" text-anchor="middle">Stiff mix. Site adds extra water.</text></svg>`;

const SP_ADDED_STYLE = `.sc-hw930-add-a-superplasticizer .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw930-add-a-superplasticizer .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw930-add-a-superplasticizer .s-goodtx{font:600 11.5px var(--font-sans);fill:var(--pc)}
.sc-hw930-add-a-superplasticizer .s-okc circle{fill:var(--pc)}
.sc-hw930-add-a-superplasticizer .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw930-add-a-superplasticizer .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw930-add-a-superplasticizer .s-capA{opacity:0}
.sc-hw930-add-a-superplasticizer .s-capB{opacity:0}
.sc-hw930-add-a-superplasticizer .s-capC{opacity:1}
.anim .sc-hw930-add-a-superplasticizer.playing .s-st1{animation-name:k-hw930-add-a-superplasticizer-st1}
.anim .sc-hw930-add-a-superplasticizer.playing .s-st2{animation-name:k-hw930-add-a-superplasticizer-st2}
.anim .sc-hw930-add-a-superplasticizer.playing .s-st3{animation-name:k-hw930-add-a-superplasticizer-st3}
.anim .sc-hw930-add-a-superplasticizer.playing .s-capA{animation-name:k-hw930-add-a-superplasticizer-capA}
.anim .sc-hw930-add-a-superplasticizer.playing .s-capB{animation-name:k-hw930-add-a-superplasticizer-capB}
.anim .sc-hw930-add-a-superplasticizer.playing .s-capC{animation-name:k-hw930-add-a-superplasticizer-capC}
.anim .sc-hw930-add-a-superplasticizer.playing .s-late{animation-name:k-hw930-add-a-superplasticizer-late}
.anim .sc-hw930-add-a-superplasticizer.playing .s-okc{animation-name:k-hw930-add-a-superplasticizer-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw930-add-a-superplasticizer .s-grn{fill:var(--conc);stroke:var(--conc2);stroke-width:1.2}
.sc-hw930-add-a-superplasticizer .s-trp{fill:var(--water);opacity:.85}
.sc-hw930-add-a-superplasticizer .s-coatR{fill:none;stroke:var(--pc);stroke-width:2.4;stroke-dasharray:3 3}
.sc-hw930-add-a-superplasticizer .s-mol{fill:none;stroke:var(--pc);stroke-width:2.4;stroke-linecap:round}
.sc-hw930-add-a-superplasticizer .s-wbg{fill:var(--water);opacity:.12}
.sc-hw930-add-a-superplasticizer .s-trapB{opacity:0}
.sc-hw930-add-a-superplasticizer .s-coatB{opacity:1}
.sc-hw930-add-a-superplasticizer .s-molB{opacity:0}
.anim .sc-hw930-add-a-superplasticizer.playing .s-gB{animation-name:k-hw930-add-a-superplasticizer-gB;animation-timing-function:ease-in-out}
.anim .sc-hw930-add-a-superplasticizer.playing .s-trapB{animation-name:k-hw930-add-a-superplasticizer-trapB;animation-timing-function:ease-out}
.anim .sc-hw930-add-a-superplasticizer.playing .s-coatB{animation-name:k-hw930-add-a-superplasticizer-coatB}
.anim .sc-hw930-add-a-superplasticizer.playing .s-molB{animation-name:k-hw930-add-a-superplasticizer-molB;animation-timing-function:ease-in}
.anim .sc-hw930-add-a-superplasticizer.playing .s-st1 .disc{animation-name:k-hw930-add-a-superplasticizer-st1-disc}
.anim .sc-hw930-add-a-superplasticizer.playing .s-st2 .disc{animation-name:k-hw930-add-a-superplasticizer-st2-disc}
.anim .sc-hw930-add-a-superplasticizer.playing .s-st3 .disc{animation-name:k-hw930-add-a-superplasticizer-st3-disc}
@keyframes k-hw930-add-a-superplasticizer-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw930-add-a-superplasticizer-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw930-add-a-superplasticizer-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw930-add-a-superplasticizer-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw930-add-a-superplasticizer-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw930-add-a-superplasticizer-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-add-a-superplasticizer-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-add-a-superplasticizer-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw930-add-a-superplasticizer-gB{0%,62%{transform:translate(var(--fx),var(--fy))}80%,97%{transform:translate(0,0)}100%{transform:translate(var(--fx),var(--fy))}}
@keyframes k-hw930-add-a-superplasticizer-trapB{0%,64%{opacity:.85;transform:none}84%,100%{opacity:0;transform:translate(var(--wx),var(--wy))}}
@keyframes k-hw930-add-a-superplasticizer-coatB{0%,34%{opacity:0}50%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-add-a-superplasticizer-molB{0%,6%{opacity:0;transform:none}12%,30%{opacity:1;transform:none}46%,100%{opacity:0;transform:translate(var(--mx),var(--my))}}
@keyframes k-hw930-add-a-superplasticizer-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw930-add-a-superplasticizer-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw930-add-a-superplasticizer-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;
const SP_ADDED_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214"><rect x="8" y="28" width="284" height="164" rx="10" class="s-wbg"></rect><g class="s-molB" style="--mx:82px;--my:50px"><path class="s-mol" d="M33 40q3.5-5 7 0t7 0"></path></g><g class="s-molB" style="--mx:41px;--my:42px"><path class="s-mol" d="M88 50q3.5-5 7 0t7 0"></path></g><g class="s-molB" style="--mx:-45px;--my:48px"><path class="s-mol" d="M203 42q3.5-5 7 0t7 0"></path></g><g class="s-molB" style="--mx:-84px;--my:20px"><path class="s-mol" d="M255 80q3.5-5 7 0t7 0"></path></g><g class="s-molB" style="--mx:90px;--my:8px"><path class="s-mol" d="M23 95q3.5-5 7 0t7 0"></path></g><g class="s-molB" style="--mx:-90px;--my:-33px"><path class="s-mol" d="M263 150q3.5-5 7 0t7 0"></path></g><g class="s-molB" style="--mx:68px;--my:-59px"><path class="s-mol" d="M53 185q3.5-5 7 0t7 0"></path></g><g class="s-molB" style="--mx:-68px;--my:-63px"><path class="s-mol" d="M233 190q3.5-5 7 0t7 0"></path></g><g class="s-molB" style="--mx:30px;--my:-54px"><path class="s-mol" d="M103 178q3.5-5 7 0t7 0"></path></g><g class="s-molB" style="--mx:-38px;--my:-52px"><path class="s-mol" d="M193 176q3.5-5 7 0t7 0"></path></g><circle class="s-trp s-trapB" style="--wx:-38px;--wy:-17px" cx="138" cy="109" r="4.2"></circle><circle class="s-trp s-trapB" style="--wx:38px;--wy:-14px" cx="162" cy="110" r="4.2"></circle><circle class="s-trp s-trapB" style="--wx:0px;--wy:-68px" cx="150" cy="93" r="4.2"></circle><circle class="s-trp s-trapB" style="--wx:0px;--wy:31px" cx="150" cy="124" r="4.2"></circle><circle class="s-trp s-trapB" style="--wx:-77px;--wy:-14px" cx="126" cy="110" r="4.2"></circle><circle class="s-trp s-trapB" style="--wx:77px;--wy:-7px" cx="174" cy="112" r="4.2"></circle><g class="s-gB" style="--fx:0px;--fy:-6px"><circle class="s-coatR s-coatB" cx="150" cy="112" r="19"></circle><circle class="s-grn" cx="150" cy="112" r="15"></circle></g><g class="s-gB" style="--fx:73px;--fy:34px"><circle class="s-coatR s-coatB" cx="52" cy="62" r="16"></circle><circle class="s-grn" cx="52" cy="62" r="12"></circle></g><g class="s-gB" style="--fx:-75px;--fy:37px"><circle class="s-coatR s-coatB" cx="250" cy="58" r="16"></circle><circle class="s-grn" cx="250" cy="58" r="12"></circle></g><g class="s-gB" style="--fx:57px;--fy:-42px"><circle class="s-coatR s-coatB" cx="80" cy="168" r="16"></circle><circle class="s-grn" cx="80" cy="168" r="12"></circle></g><g class="s-gB" style="--fx:-68px;--fy:-42px"><circle class="s-coatR s-coatB" cx="232" cy="170" r="15"></circle><circle class="s-grn" cx="232" cy="170" r="11"></circle></g><g class="s-gB" style="--fx:1px;--fy:35px"><circle class="s-coatR s-coatB" cx="150" cy="44" r="14"></circle><circle class="s-grn" cx="150" cy="44" r="10"></circle></g><g class="s-gB" style="--fx:77px;--fy:-10px"><circle class="s-coatR s-coatB" cx="38" cy="128" r="13"></circle><circle class="s-grn" cx="38" cy="128" r="9"></circle></g><g class="s-gB" style="--fx:-76px;--fy:-2px"><circle class="s-coatR s-coatB" cx="262" cy="118" r="14"></circle><circle class="s-grn" cx="262" cy="118" r="10"></circle></g><text class="s-lblb s-capA" x="150" y="20" text-anchor="middle">1 · SP molecules spread through the water</text><text class="s-lblb s-capB" x="150" y="20" text-anchor="middle">2 · They coat every cement grain</text><text class="s-lblb s-capC" x="150" y="20" text-anchor="middle">3 · Coated grains push apart, water is freed</text><g transform="translate(272 40)"><g class="s-okc"><circle r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g><text class="s-goodtx s-late" x="150" y="208" text-anchor="middle">Same water, far more flow.</text></svg>`;

// --- Step 6: "Two Ways the Coat Keeps Grains Apart" — 2-card diagram pair ---
const ZETA_STYLE = `.sc-hw930-snf-smf-zeta-potential .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw930-snf-smf-zeta-potential .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw930-snf-smf-zeta-potential .s-goodtx{font:600 11.5px var(--font-sans);fill:var(--pc)}
.sc-hw930-snf-smf-zeta-potential .s-ldar{fill:none;stroke:var(--ink);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.sc-hw930-snf-smf-zeta-potential .s-ldar.s-hwa{stroke:var(--pc)}
.sc-hw930-snf-smf-zeta-potential .s-okc circle{fill:var(--pc)}
.sc-hw930-snf-smf-zeta-potential .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw930-snf-smf-zeta-potential .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw930-snf-smf-zeta-potential .s-capA{opacity:0}
.sc-hw930-snf-smf-zeta-potential .s-capB{opacity:0}
.sc-hw930-snf-smf-zeta-potential .s-capC{opacity:1}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-st1{animation-name:k-hw930-snf-smf-zeta-potential-st1}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-st2{animation-name:k-hw930-snf-smf-zeta-potential-st2}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-st3{animation-name:k-hw930-snf-smf-zeta-potential-st3}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-capA{animation-name:k-hw930-snf-smf-zeta-potential-capA}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-capB{animation-name:k-hw930-snf-smf-zeta-potential-capB}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-capC{animation-name:k-hw930-snf-smf-zeta-potential-capC}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-late{animation-name:k-hw930-snf-smf-zeta-potential-late}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-okc{animation-name:k-hw930-snf-smf-zeta-potential-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw930-snf-smf-zeta-potential .s-rep{background:var(--soft);border-radius:14px;padding:14px 16px;border-left:5px solid var(--pc)}
.sc-hw930-snf-smf-zeta-potential .s-grn{fill:var(--conc);stroke:var(--conc2);stroke-width:1.2}
.sc-hw930-snf-smf-zeta-potential .s-trp{fill:var(--water);opacity:.85}
.sc-hw930-snf-smf-zeta-potential .s-coatR{fill:none;stroke:var(--pc);stroke-width:2.4;stroke-dasharray:3 3}
.sc-hw930-snf-smf-zeta-potential .s-snf{fill:none;stroke:var(--pc);stroke-width:3;stroke-linecap:round}
.sc-hw930-snf-smf-zeta-potential .s-neg{font:600 17px var(--font-sans);fill:var(--pc)}
.sc-hw930-snf-smf-zeta-potential .s-wbg{fill:var(--water);opacity:.12}
.sc-hw930-snf-smf-zeta-potential .s-ldar.s-rep{stroke:var(--neg)}
.sc-hw930-snf-smf-zeta-potential .s-trapB{opacity:0}
.sc-hw930-snf-smf-zeta-potential .s-coatB{opacity:1}
.sc-hw930-snf-smf-zeta-potential .s-molB{opacity:0}
.sc-hw930-snf-smf-zeta-potential .s-zL{transform:translateX(-24px)}
.sc-hw930-snf-smf-zeta-potential .s-zR{transform:translateX(24px)}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-trapB{animation-name:k-hw930-snf-smf-zeta-potential-trapB;animation-timing-function:ease-out}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-coatB{animation-name:k-hw930-snf-smf-zeta-potential-coatB}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-molB{animation-name:k-hw930-snf-smf-zeta-potential-molB;animation-timing-function:ease-in}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-zL{animation-name:k-hw930-snf-smf-zeta-potential-zL;animation-timing-function:ease-out}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-zR{animation-name:k-hw930-snf-smf-zeta-potential-zR;animation-timing-function:ease-out}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-st1 .disc{animation-name:k-hw930-snf-smf-zeta-potential-st1-disc}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-st2 .disc{animation-name:k-hw930-snf-smf-zeta-potential-st2-disc}
.anim .sc-hw930-snf-smf-zeta-potential.playing .s-st3 .disc{animation-name:k-hw930-snf-smf-zeta-potential-st3-disc}
@keyframes k-hw930-snf-smf-zeta-potential-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw930-snf-smf-zeta-potential-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw930-snf-smf-zeta-potential-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw930-snf-smf-zeta-potential-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw930-snf-smf-zeta-potential-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw930-snf-smf-zeta-potential-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-snf-smf-zeta-potential-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-snf-smf-zeta-potential-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw930-snf-smf-zeta-potential-trapB{0%,64%{opacity:.85;transform:none}84%,100%{opacity:0;transform:translate(var(--wx),var(--wy))}}
@keyframes k-hw930-snf-smf-zeta-potential-coatB{0%,34%{opacity:0}50%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-snf-smf-zeta-potential-molB{0%,6%{opacity:0;transform:none}12%,30%{opacity:1;transform:none}46%,100%{opacity:0;transform:translate(var(--mx),var(--my))}}
@keyframes k-hw930-snf-smf-zeta-potential-zL{0%,64%{transform:none}80%,97%{transform:translateX(-24px)}100%{transform:none}}
@keyframes k-hw930-snf-smf-zeta-potential-zR{0%,64%{transform:none}80%,97%{transform:translateX(24px)}100%{transform:none}}
@keyframes k-hw930-snf-smf-zeta-potential-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw930-snf-smf-zeta-potential-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw930-snf-smf-zeta-potential-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;
const ZETA_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214"><rect x="8" y="28" width="284" height="164" rx="10" class="s-wbg"></rect><g class="s-molB" style="--mx:66px;--my:40px"><path class="s-snf" d="M32 52h16"></path><text class="s-neg" x="40" y="49" text-anchor="middle" style="font-size:13px">–</text></g><g class="s-molB" style="--mx:36px;--my:47px"><path class="s-snf" d="M82 40h16"></path><text class="s-neg" x="90" y="37" text-anchor="middle" style="font-size:13px">–</text></g><g class="s-molB" style="--mx:-36px;--my:44px"><path class="s-snf" d="M202 44h16"></path><text class="s-neg" x="210" y="41" text-anchor="middle" style="font-size:13px">–</text></g><g class="s-molB" style="--mx:-67px;--my:37px"><path class="s-snf" d="M254 56h16"></path><text class="s-neg" x="262" y="53" text-anchor="middle" style="font-size:13px">–</text></g><g class="s-molB" style="--mx:73px;--my:-31px"><path class="s-snf" d="M20 170h16"></path><text class="s-neg" x="28" y="167" text-anchor="middle" style="font-size:13px">–</text></g><g class="s-molB" style="--mx:-73px;--my:-32px"><path class="s-snf" d="M264 172h16"></path><text class="s-neg" x="272" y="169" text-anchor="middle" style="font-size:13px">–</text></g><g class="s-molB" style="--mx:0px;--my:-43px"><path class="s-snf" d="M142 190h16"></path><text class="s-neg" x="150" y="187" text-anchor="middle" style="font-size:13px">–</text></g><circle class="s-trp s-trapB" style="--wx:0px;--wy:-46px" cx="150" cy="118" r="5"></circle><g class="s-zL"><circle class="s-coatR s-coatB" cx="118" cy="118" r="36"></circle><g class="s-coatB"><text class="s-neg" x="159.0" y="123.0" text-anchor="middle">–</text><text class="s-neg" x="151.2" y="147.1" text-anchor="middle">–</text><text class="s-neg" x="130.7" y="162.0" text-anchor="middle">–</text><text class="s-neg" x="105.3" y="162.0" text-anchor="middle">–</text><text class="s-neg" x="84.8" y="147.1" text-anchor="middle">–</text><text class="s-neg" x="77.0" y="123.0" text-anchor="middle">–</text><text class="s-neg" x="84.8" y="98.9" text-anchor="middle">–</text><text class="s-neg" x="105.3" y="84.0" text-anchor="middle">–</text><text class="s-neg" x="130.7" y="84.0" text-anchor="middle">–</text><text class="s-neg" x="151.2" y="98.9" text-anchor="middle">–</text></g><circle class="s-grn" cx="118" cy="118" r="32"></circle></g><g class="s-zR"><circle class="s-coatR s-coatB" cx="182" cy="118" r="36"></circle><g class="s-coatB"><text class="s-neg" x="223.0" y="123.0" text-anchor="middle">–</text><text class="s-neg" x="215.2" y="147.1" text-anchor="middle">–</text><text class="s-neg" x="194.7" y="162.0" text-anchor="middle">–</text><text class="s-neg" x="169.3" y="162.0" text-anchor="middle">–</text><text class="s-neg" x="148.8" y="147.1" text-anchor="middle">–</text><text class="s-neg" x="141.0" y="123.0" text-anchor="middle">–</text><text class="s-neg" x="148.8" y="98.9" text-anchor="middle">–</text><text class="s-neg" x="169.3" y="84.0" text-anchor="middle">–</text><text class="s-neg" x="194.7" y="84.0" text-anchor="middle">–</text><text class="s-neg" x="215.2" y="98.9" text-anchor="middle">–</text></g><circle class="s-grn" cx="182" cy="118" r="32"></circle></g><g class="s-late"><path class="s-ldar s-rep" d="M62 118h-30m7-7l-7 7 7 7"></path><path class="s-ldar s-rep" d="M238 118h30m-7-7l7 7-7 7"></path></g><text class="s-lblb s-capA" x="150" y="20" text-anchor="middle">1 · Sulphonate (SO₃⁻) chains in the water</text><text class="s-lblb s-capB" x="150" y="20" text-anchor="middle">2 · Chains coat the grain: it turns negative</text><text class="s-lblb s-capC" x="150" y="20" text-anchor="middle">3 · Like charges repel: grains push apart</text><g transform="translate(272 40)"><g class="s-okc"><circle r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g><text class="s-goodtx s-late" x="150" y="208" text-anchor="middle">Charge-based. Fades as cement hydrates.</text></svg>`;

const STERIC_STYLE = `.sc-hw930-pce-steric-hindrance .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw930-pce-steric-hindrance .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw930-pce-steric-hindrance .s-goodtx{font:600 11.5px var(--font-sans);fill:var(--pc)}
.sc-hw930-pce-steric-hindrance .s-ldar{fill:none;stroke:var(--ink);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.sc-hw930-pce-steric-hindrance .s-ldar.s-hwa{stroke:var(--pc)}
.sc-hw930-pce-steric-hindrance .s-okc circle{fill:var(--pc)}
.sc-hw930-pce-steric-hindrance .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw930-pce-steric-hindrance .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw930-pce-steric-hindrance .s-capA{opacity:0}
.sc-hw930-pce-steric-hindrance .s-capB{opacity:0}
.sc-hw930-pce-steric-hindrance .s-capC{opacity:1}
.anim .sc-hw930-pce-steric-hindrance.playing .s-st1{animation-name:k-hw930-pce-steric-hindrance-st1}
.anim .sc-hw930-pce-steric-hindrance.playing .s-st2{animation-name:k-hw930-pce-steric-hindrance-st2}
.anim .sc-hw930-pce-steric-hindrance.playing .s-st3{animation-name:k-hw930-pce-steric-hindrance-st3}
.anim .sc-hw930-pce-steric-hindrance.playing .s-capA{animation-name:k-hw930-pce-steric-hindrance-capA}
.anim .sc-hw930-pce-steric-hindrance.playing .s-capB{animation-name:k-hw930-pce-steric-hindrance-capB}
.anim .sc-hw930-pce-steric-hindrance.playing .s-capC{animation-name:k-hw930-pce-steric-hindrance-capC}
.anim .sc-hw930-pce-steric-hindrance.playing .s-late{animation-name:k-hw930-pce-steric-hindrance-late}
.anim .sc-hw930-pce-steric-hindrance.playing .s-okc{animation-name:k-hw930-pce-steric-hindrance-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw930-pce-steric-hindrance .s-grn{fill:var(--conc);stroke:var(--conc2);stroke-width:1.2}
.sc-hw930-pce-steric-hindrance .s-trp{fill:var(--water);opacity:.85}
.sc-hw930-pce-steric-hindrance .s-brs{fill:none;stroke:var(--gold);stroke-width:2.2;stroke-linecap:round}
.sc-hw930-pce-steric-hindrance .s-anc{fill:var(--pc)}
.sc-hw930-pce-steric-hindrance .s-bb{fill:none;stroke:var(--ink);stroke-width:3;stroke-linecap:round}
.sc-hw930-pce-steric-hindrance .s-wbg{fill:var(--water);opacity:.12}
.sc-hw930-pce-steric-hindrance .s-ldar.s-rep{stroke:var(--neg)}
.sc-hw930-pce-steric-hindrance .s-trapB{opacity:0}
.sc-hw930-pce-steric-hindrance .s-molB{opacity:0}
.sc-hw930-pce-steric-hindrance .s-sL2{transform:translateX(-18px)}
.sc-hw930-pce-steric-hindrance .s-sR2{transform:translateX(18px)}
.sc-hw930-pce-steric-hindrance .s-brushB{transform-box:view-box}
.anim .sc-hw930-pce-steric-hindrance.playing .s-trapB{animation-name:k-hw930-pce-steric-hindrance-trapB;animation-timing-function:ease-out}
.anim .sc-hw930-pce-steric-hindrance.playing .s-molB{animation-name:k-hw930-pce-steric-hindrance-molB;animation-timing-function:ease-in}
.anim .sc-hw930-pce-steric-hindrance.playing .s-sL2{animation-name:k-hw930-pce-steric-hindrance-sL2;animation-timing-function:ease-out}
.anim .sc-hw930-pce-steric-hindrance.playing .s-sR2{animation-name:k-hw930-pce-steric-hindrance-sR2;animation-timing-function:ease-out}
.anim .sc-hw930-pce-steric-hindrance.playing .s-brushB{animation-name:k-hw930-pce-steric-hindrance-brushB;animation-timing-function:ease-out}
.anim .sc-hw930-pce-steric-hindrance.playing .s-st1 .disc{animation-name:k-hw930-pce-steric-hindrance-st1-disc}
.anim .sc-hw930-pce-steric-hindrance.playing .s-st2 .disc{animation-name:k-hw930-pce-steric-hindrance-st2-disc}
.anim .sc-hw930-pce-steric-hindrance.playing .s-st3 .disc{animation-name:k-hw930-pce-steric-hindrance-st3-disc}
@keyframes k-hw930-pce-steric-hindrance-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw930-pce-steric-hindrance-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw930-pce-steric-hindrance-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw930-pce-steric-hindrance-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw930-pce-steric-hindrance-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw930-pce-steric-hindrance-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-pce-steric-hindrance-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-pce-steric-hindrance-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw930-pce-steric-hindrance-trapB{0%,64%{opacity:.85;transform:none}84%,100%{opacity:0;transform:translate(var(--wx),var(--wy))}}
@keyframes k-hw930-pce-steric-hindrance-molB{0%,6%{opacity:0;transform:none}12%,30%{opacity:1;transform:none}46%,100%{opacity:0;transform:translate(var(--mx),var(--my))}}
@keyframes k-hw930-pce-steric-hindrance-sL2{0%,56%{transform:none}72%,82%{transform:translateX(-18px)}88%{transform:translateX(-13px)}94%,97%{transform:translateX(-18px)}100%{transform:none}}
@keyframes k-hw930-pce-steric-hindrance-sR2{0%,56%{transform:none}72%,82%{transform:translateX(18px)}88%{transform:translateX(13px)}94%,97%{transform:translateX(18px)}100%{transform:none}}
@keyframes k-hw930-pce-steric-hindrance-brushB{0%,34%{opacity:0;transform:scale(.7)}54%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.7)}}
@keyframes k-hw930-pce-steric-hindrance-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw930-pce-steric-hindrance-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw930-pce-steric-hindrance-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;
const STERIC_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214"><rect x="8" y="28" width="284" height="164" rx="10" class="s-wbg"></rect><g class="s-molB" style="--mx:66px;--my:41px"><path class="s-bb" d="M31 54h18"></path><path class="s-brs" d="M34 54q-3-6 0-12M40 54q-3-6 0-12M46 54q-3-6 0-12"></path></g><g class="s-molB" style="--mx:30px;--my:47px"><path class="s-bb" d="M91 44h18"></path><path class="s-brs" d="M94 44q-3-6 0-12M100 44q-3-6 0-12M106 44q-3-6 0-12"></path></g><g class="s-molB" style="--mx:-33px;--my:46px"><path class="s-bb" d="M196 46h18"></path><path class="s-brs" d="M199 46q-3-6 0-12M205 46q-3-6 0-12M211 46q-3-6 0-12"></path></g><g class="s-molB" style="--mx:-67px;--my:37px"><path class="s-bb" d="M253 60h18"></path><path class="s-brs" d="M256 60q-3-6 0-12M262 60q-3-6 0-12M268 60q-3-6 0-12"></path></g><g class="s-molB" style="--mx:72px;--my:-32px"><path class="s-bb" d="M21 176h18"></path><path class="s-brs" d="M24 176q-3-6 0-12M30 176q-3-6 0-12M36 176q-3-6 0-12"></path></g><g class="s-molB" style="--mx:-72px;--my:-35px"><path class="s-bb" d="M261 180h18"></path><path class="s-brs" d="M264 180q-3-6 0-12M270 180q-3-6 0-12M276 180q-3-6 0-12"></path></g><g class="s-molB" style="--mx:0px;--my:-44px"><path class="s-bb" d="M141 196h18"></path><path class="s-brs" d="M144 196q-3-6 0-12M150 196q-3-6 0-12M156 196q-3-6 0-12"></path></g><circle class="s-trp s-trapB" style="--wx:0px;--wy:-46px" cx="150" cy="118" r="5"></circle><g class="s-sL2"><g class="s-brushB" style="transform-origin:118px 118px"><path class="s-brs" d="M150.0 118.0Q158.5 122.0 167.0 118.0"></path><circle class="s-anc" cx="150.0" cy="118.0" r="2"></circle><path class="s-brs" d="M147.6 130.2Q153.9 137.2 163.3 136.8"></path><circle class="s-anc" cx="147.6" cy="130.2" r="2"></circle><path class="s-brs" d="M140.6 140.6Q143.8 149.5 152.6 152.6"></path><circle class="s-anc" cx="140.6" cy="140.6" r="2"></circle><path class="s-brs" d="M130.2 147.6Q129.8 157.0 136.8 163.3"></path><circle class="s-anc" cx="130.2" cy="147.6" r="2"></circle><path class="s-brs" d="M118.0 150.0Q114.0 158.5 118.0 167.0"></path><circle class="s-anc" cx="118.0" cy="150.0" r="2"></circle><path class="s-brs" d="M105.8 147.6Q98.8 153.9 99.2 163.3"></path><circle class="s-anc" cx="105.8" cy="147.6" r="2"></circle><path class="s-brs" d="M95.4 140.6Q86.5 143.8 83.4 152.6"></path><circle class="s-anc" cx="95.4" cy="140.6" r="2"></circle><path class="s-brs" d="M88.4 130.2Q79.0 129.8 72.7 136.8"></path><circle class="s-anc" cx="88.4" cy="130.2" r="2"></circle><path class="s-brs" d="M86.0 118.0Q77.5 114.0 69.0 118.0"></path><circle class="s-anc" cx="86.0" cy="118.0" r="2"></circle><path class="s-brs" d="M88.4 105.8Q82.1 98.8 72.7 99.2"></path><circle class="s-anc" cx="88.4" cy="105.8" r="2"></circle><path class="s-brs" d="M95.4 95.4Q92.2 86.5 83.4 83.4"></path><circle class="s-anc" cx="95.4" cy="95.4" r="2"></circle><path class="s-brs" d="M105.8 88.4Q106.2 79.0 99.2 72.7"></path><circle class="s-anc" cx="105.8" cy="88.4" r="2"></circle><path class="s-brs" d="M118.0 86.0Q122.0 77.5 118.0 69.0"></path><circle class="s-anc" cx="118.0" cy="86.0" r="2"></circle><path class="s-brs" d="M130.2 88.4Q137.2 82.1 136.8 72.7"></path><circle class="s-anc" cx="130.2" cy="88.4" r="2"></circle><path class="s-brs" d="M140.6 95.4Q149.5 92.2 152.6 83.4"></path><circle class="s-anc" cx="140.6" cy="95.4" r="2"></circle><path class="s-brs" d="M147.6 105.8Q157.0 106.2 163.3 99.2"></path><circle class="s-anc" cx="147.6" cy="105.8" r="2"></circle></g><circle class="s-grn" cx="118" cy="118" r="32"></circle></g><g class="s-sR2"><g class="s-brushB" style="transform-origin:182px 118px"><path class="s-brs" d="M214.0 118.0Q222.5 122.0 231.0 118.0"></path><circle class="s-anc" cx="214.0" cy="118.0" r="2"></circle><path class="s-brs" d="M211.6 130.2Q217.9 137.2 227.3 136.8"></path><circle class="s-anc" cx="211.6" cy="130.2" r="2"></circle><path class="s-brs" d="M204.6 140.6Q207.8 149.5 216.6 152.6"></path><circle class="s-anc" cx="204.6" cy="140.6" r="2"></circle><path class="s-brs" d="M194.2 147.6Q193.8 157.0 200.8 163.3"></path><circle class="s-anc" cx="194.2" cy="147.6" r="2"></circle><path class="s-brs" d="M182.0 150.0Q178.0 158.5 182.0 167.0"></path><circle class="s-anc" cx="182.0" cy="150.0" r="2"></circle><path class="s-brs" d="M169.8 147.6Q162.8 153.9 163.2 163.3"></path><circle class="s-anc" cx="169.8" cy="147.6" r="2"></circle><path class="s-brs" d="M159.4 140.6Q150.5 143.8 147.4 152.6"></path><circle class="s-anc" cx="159.4" cy="140.6" r="2"></circle><path class="s-brs" d="M152.4 130.2Q143.0 129.8 136.7 136.8"></path><circle class="s-anc" cx="152.4" cy="130.2" r="2"></circle><path class="s-brs" d="M150.0 118.0Q141.5 114.0 133.0 118.0"></path><circle class="s-anc" cx="150.0" cy="118.0" r="2"></circle><path class="s-brs" d="M152.4 105.8Q146.1 98.8 136.7 99.2"></path><circle class="s-anc" cx="152.4" cy="105.8" r="2"></circle><path class="s-brs" d="M159.4 95.4Q156.2 86.5 147.4 83.4"></path><circle class="s-anc" cx="159.4" cy="95.4" r="2"></circle><path class="s-brs" d="M169.8 88.4Q170.2 79.0 163.2 72.7"></path><circle class="s-anc" cx="169.8" cy="88.4" r="2"></circle><path class="s-brs" d="M182.0 86.0Q186.0 77.5 182.0 69.0"></path><circle class="s-anc" cx="182.0" cy="86.0" r="2"></circle><path class="s-brs" d="M194.2 88.4Q201.2 82.1 200.8 72.7"></path><circle class="s-anc" cx="194.2" cy="88.4" r="2"></circle><path class="s-brs" d="M204.6 95.4Q213.5 92.2 216.6 83.4"></path><circle class="s-anc" cx="204.6" cy="95.4" r="2"></circle><path class="s-brs" d="M211.6 105.8Q221.0 106.2 227.3 99.2"></path><circle class="s-anc" cx="211.6" cy="105.8" r="2"></circle></g><circle class="s-grn" cx="182" cy="118" r="32"></circle></g><g class="s-late"><path class="s-ldar s-hwa" d="M150 76v18m-6-6l6 6 6-6"></path></g><text class="s-lblb s-capA" x="150" y="20" text-anchor="middle">1 · Comb-shaped PCE molecules in the water</text><text class="s-lblb s-capB" x="150" y="20" text-anchor="middle">2 · Backbone anchors, side chains form a brush</text><text class="s-lblb s-capC" x="150" y="20" text-anchor="middle">3 · Brushes block contact: grains stay apart</text><g transform="translate(272 40)"><g class="s-okc"><circle r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g><text class="s-goodtx s-late" x="150" y="208" text-anchor="middle">A physical barrier. Lasts longer.</text></svg>`;

// --- Step 9: "Test with the Site Cement First" — Marsh cone diagram pair ---
const MARSH_OK_STYLE = `.sc-hw930-compatible-cement-sp .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw930-compatible-cement-sp .s-stl{fill:var(--steel)}
.sc-hw930-compatible-cement-sp .s-vd{fill:var(--void)}
.sc-hw930-compatible-cement-sp .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw930-compatible-cement-sp .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw930-compatible-cement-sp .s-goodtx{font:600 11.5px var(--font-sans);fill:var(--pc)}
.sc-hw930-compatible-cement-sp .s-okc circle{fill:var(--pc)}
.sc-hw930-compatible-cement-sp .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw930-compatible-cement-sp .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw930-compatible-cement-sp .s-capA{opacity:0}
.sc-hw930-compatible-cement-sp .s-capB{opacity:0}
.sc-hw930-compatible-cement-sp .s-capC{opacity:1}
.anim .sc-hw930-compatible-cement-sp.playing .s-st1{animation-name:k-hw930-compatible-cement-sp-st1}
.anim .sc-hw930-compatible-cement-sp.playing .s-st2{animation-name:k-hw930-compatible-cement-sp-st2}
.anim .sc-hw930-compatible-cement-sp.playing .s-st3{animation-name:k-hw930-compatible-cement-sp-st3}
.anim .sc-hw930-compatible-cement-sp.playing .s-capA{animation-name:k-hw930-compatible-cement-sp-capA}
.anim .sc-hw930-compatible-cement-sp.playing .s-capB{animation-name:k-hw930-compatible-cement-sp-capB}
.anim .sc-hw930-compatible-cement-sp.playing .s-capC{animation-name:k-hw930-compatible-cement-sp-capC}
.anim .sc-hw930-compatible-cement-sp.playing .s-late{animation-name:k-hw930-compatible-cement-sp-late}
.anim .sc-hw930-compatible-cement-sp.playing .s-okc{animation-name:k-hw930-compatible-cement-sp-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw930-compatible-cement-sp .s-slur{transform-box:fill-box;transform-origin:50% 100%}
.sc-hw930-compatible-cement-sp .s-slur{transform:scaleY(0)}
.sc-hw930-compatible-cement-sp .s-strm{fill:#a3a3a3;opacity:0}
.anim .sc-hw930-compatible-cement-sp.playing .s-slur{animation-name:k-hw930-compatible-cement-sp-dF}
.anim .sc-hw930-compatible-cement-sp.playing .s-strm{animation-name:k-hw930-compatible-cement-sp-sF}
.anim .sc-hw930-compatible-cement-sp.playing .s-st1 .disc{animation-name:k-hw930-compatible-cement-sp-st1-disc}
.anim .sc-hw930-compatible-cement-sp.playing .s-st2 .disc{animation-name:k-hw930-compatible-cement-sp-st2-disc}
.anim .sc-hw930-compatible-cement-sp.playing .s-st3 .disc{animation-name:k-hw930-compatible-cement-sp-st3-disc}
@keyframes k-hw930-compatible-cement-sp-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw930-compatible-cement-sp-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw930-compatible-cement-sp-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw930-compatible-cement-sp-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw930-compatible-cement-sp-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw930-compatible-cement-sp-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-compatible-cement-sp-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-compatible-cement-sp-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw930-compatible-cement-sp-dF{0%,33%{transform:scaleY(1)}60%,100%{transform:scaleY(0)}}
@keyframes k-hw930-compatible-cement-sp-sF{0%,33%{opacity:0}35%,58%{opacity:1}61%,100%{opacity:0}}
@keyframes k-hw930-compatible-cement-sp-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw930-compatible-cement-sp-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw930-compatible-cement-sp-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;
const MARSH_OK_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214"><clipPath id="hw930-compatible-cement-sp-cp1"><path d="M95 40H205L158 150H142Z"></path></clipPath>
<path d="M95 40H205L158 150H142Z" class="s-vd" style="stroke:var(--steel);stroke-width:3"></path>
<g clip-path="url(#hw930-compatible-cement-sp-cp1)"><rect class="s-slur" x="90" y="48" width="120" height="102" style="fill:var(--conc2)"></rect></g>
<rect x="143" y="150" width="14" height="10" class="s-stl"></rect>
<rect class="s-strm" x="148.5" y="160" width="3" height="24"></rect>
<path d="M118 184h64v10h-64z" style="fill:none;stroke:var(--steel);stroke-width:2"></path>
<text class="s-lbl" x="214" y="100">Marsh cone</text><text class="s-lbl" x="214" y="113">5 mm outlet</text><text class="s-lblb s-capA" x="150" y="20" text-anchor="middle">1 · 1 litre of slurry in the cone</text><text class="s-lblb s-capB" x="150" y="20" text-anchor="middle">2 · Release and start the stopwatch</text><text class="s-lblb s-capC" x="150" y="20" text-anchor="middle">3 · Flows out fast</text><g transform="translate(272 40)"><g class="s-okc"><circle r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g><text class="s-goodtx s-late" x="150" y="208" text-anchor="middle">Low flow time: good pair.</text></svg>`;

const MARSH_BAD_STYLE = `.sc-hw930-incompatible-cement-sp .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw930-incompatible-cement-sp .s-stl{fill:var(--steel)}
.sc-hw930-incompatible-cement-sp .s-vd{fill:var(--void)}
.sc-hw930-incompatible-cement-sp .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw930-incompatible-cement-sp .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}
.sc-hw930-incompatible-cement-sp .s-badtx{font:600 11.5px var(--font-sans);fill:var(--neg)}
.sc-hw930-incompatible-cement-sp .s-nok circle{fill:var(--neg)}
.sc-hw930-incompatible-cement-sp .s-nok path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round}
.sc-hw930-incompatible-cement-sp .s-nok{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw930-incompatible-cement-sp .s-capA{opacity:0}
.sc-hw930-incompatible-cement-sp .s-capB{opacity:0}
.sc-hw930-incompatible-cement-sp .s-capC{opacity:1}
.anim .sc-hw930-incompatible-cement-sp.playing .s-st1{animation-name:k-hw930-incompatible-cement-sp-st1}
.anim .sc-hw930-incompatible-cement-sp.playing .s-st2{animation-name:k-hw930-incompatible-cement-sp-st2}
.anim .sc-hw930-incompatible-cement-sp.playing .s-st3{animation-name:k-hw930-incompatible-cement-sp-st3}
.anim .sc-hw930-incompatible-cement-sp.playing .s-capA{animation-name:k-hw930-incompatible-cement-sp-capA}
.anim .sc-hw930-incompatible-cement-sp.playing .s-capB{animation-name:k-hw930-incompatible-cement-sp-capB}
.anim .sc-hw930-incompatible-cement-sp.playing .s-capC{animation-name:k-hw930-incompatible-cement-sp-capC}
.anim .sc-hw930-incompatible-cement-sp.playing .s-late{animation-name:k-hw930-incompatible-cement-sp-late}
.anim .sc-hw930-incompatible-cement-sp.playing .s-nok{animation-name:k-hw930-incompatible-cement-sp-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw930-incompatible-cement-sp .s-slur{transform-box:fill-box;transform-origin:50% 100%}
.sc-hw930-incompatible-cement-sp .s-slur{transform:scaleY(.55)}
.sc-hw930-incompatible-cement-sp .s-strm{fill:#a3a3a3;opacity:0}
.anim .sc-hw930-incompatible-cement-sp.playing .s-slur{animation-name:k-hw930-incompatible-cement-sp-dS}
.anim .sc-hw930-incompatible-cement-sp.playing .s-strm{animation-name:k-hw930-incompatible-cement-sp-sS}
.anim .sc-hw930-incompatible-cement-sp.playing .s-st1 .disc{animation-name:k-hw930-incompatible-cement-sp-st1-disc}
.anim .sc-hw930-incompatible-cement-sp.playing .s-st2 .disc{animation-name:k-hw930-incompatible-cement-sp-st2-disc}
.anim .sc-hw930-incompatible-cement-sp.playing .s-st3 .disc{animation-name:k-hw930-incompatible-cement-sp-st3-disc}
@keyframes k-hw930-incompatible-cement-sp-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw930-incompatible-cement-sp-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw930-incompatible-cement-sp-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw930-incompatible-cement-sp-capA{0%,30%{opacity:1}33%,100%{opacity:0}}
@keyframes k-hw930-incompatible-cement-sp-capB{0%,31%{opacity:0}34%,63%{opacity:1}66%,100%{opacity:0}}
@keyframes k-hw930-incompatible-cement-sp-capC{0%,64%{opacity:0}67%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-incompatible-cement-sp-late{0%,74%{opacity:0}80%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-incompatible-cement-sp-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw930-incompatible-cement-sp-dS{0%,33%{transform:scaleY(1)}97%,100%{transform:scaleY(.55)}}
@keyframes k-hw930-incompatible-cement-sp-sS{0%,33%{opacity:0}35%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw930-incompatible-cement-sp-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw930-incompatible-cement-sp-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw930-incompatible-cement-sp-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;
const MARSH_BAD_SVG = `<svg class="s-cs-svg" viewBox="0 0 300 214"><clipPath id="hw930-incompatible-cement-sp-cp2"><path d="M95 40H205L158 150H142Z"></path></clipPath>
<path d="M95 40H205L158 150H142Z" class="s-vd" style="stroke:var(--steel);stroke-width:3"></path>
<g clip-path="url(#hw930-incompatible-cement-sp-cp2)"><rect class="s-slur" x="90" y="48" width="120" height="102" style="fill:var(--conc2)"></rect></g>
<rect x="143" y="150" width="14" height="10" class="s-stl"></rect>
<rect class="s-strm" x="149.3" y="160" width="1.4" height="24"></rect>
<path d="M118 184h64v10h-64z" style="fill:none;stroke:var(--steel);stroke-width:2"></path>
<text class="s-lbl" x="214" y="100">Marsh cone</text><text class="s-lbl" x="214" y="113">5 mm outlet</text><text class="s-lblb s-capA" x="150" y="20" text-anchor="middle">1 · Same test, another cement</text><text class="s-lblb s-capB" x="150" y="20" text-anchor="middle">2 · Release and start the stopwatch</text><text class="s-lblb s-capC" x="150" y="20" text-anchor="middle">3 · Sticky: still draining</text><g transform="translate(272 40)"><g class="s-nok"><circle r="11"></circle><path d="M-4.5-4.5l9 9M4.5-4.5l-9 9"></path></g></g><text class="s-badtx s-late" x="150" y="208" text-anchor="middle">High flow time: change SP or cement.</text></svg>`;

module.exports = {
  productName: 'HW930 Super Plasticizer',
  productDescription: 'Concrete Admixture - High Range Water Reducing Polycarboxylic Ether (PCE) based Superplasticising Admixture',
  topicDescription: 'What a chemical admixture is, how plasticizers and superplasticizers (zeta potential vs steric hindrance) cut mixing water, the four-chemistry water-cut ladder, cement/SP compatibility testing with a Marsh cone, and HW930’s own PCE-based profile.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image', title: 'Super Plasticizer', data: {
        text: 'Hard Worker HW930. A high-range water-reducing, PCE-based superplasticising admixture that coats cement grains so concrete flows with less water.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/super-plasticizer.webp'],
        caption: 'Less water. More flow. Stronger concrete.',
        key: 'HW930 · Concrete Admixture · PCE Based Superplasticiser',
      },
    },
    {
      type: 'card', title: 'What Is a Chemical Admixture?', data: {
        text: 'Any material other than cement, water and aggregate, added to the batch just before or during mixing, to change how concrete behaves.<div class="item-grid"><div class="item-card">Cement</div><div class="item-card">Water</div><div class="item-card">Aggregate</div><div class="item-card">Admixture: small dose, at the mixer</div></div><div class="item-grid"><div class="item-card">Fresh: flow, water demand, setting time</div><div class="item-card">Hardened: strength, durability, water tightness</div></div>',
        explain: 'Admixture vs Additive — an admixture goes in at the mixer. An additive goes in at the cement plant, while grinding clinker.',
      },
    },
    {
      type: 'card', title: 'The Main Types', data: {
        text: 'Each type is made for one job. This module is about superplasticizers. Also: gas-forming, grouting, air-detraining, colouring, fungicidal admixtures exist too.',
        badges: [
          { icon: '🧪', label: 'Plasticizer', sub: 'Water reducer: 5–15% less water', tone: 'neutral' },
          { icon: '💧', label: 'Superplasticizer', sub: 'High-range water reducer: up to 30%+', tone: 'ok' },
          { icon: '⏱️', label: 'Retarder', sub: 'Slows setting: hot weather, long hauls', tone: 'neutral' },
          { icon: '⚡', label: 'Accelerator', sub: 'Speeds early strength: early de-shuttering', tone: 'neutral' },
          { icon: '🧁', label: 'Air-entraining', sub: 'Tiny air bubbles: freeze–thaw resistance', tone: 'neutral' },
          { icon: '🛡️', label: 'Waterproofing', sub: 'Integral: cuts water ingress', tone: 'neutral' },
          { icon: '🔩', label: 'Corrosion inhibiting', sub: 'Protects the steel reinforcement', tone: 'neutral' },
          { icon: '🔗', label: 'Bonding', sub: 'Joins old concrete to new', tone: 'neutral' },
        ],
        explain: 'Two-In-One — retarding plasticizer (ASTM Type D) and retarding superplasticizer (ASTM Type G) combine water cut with slower setting. RMC uses them to hold slump.',
      },
    },
    {
      type: 'knowledge', title: 'Knowledge Check — Why Adding Water Is the Wrong Fix', data: {
        text: 'A site keeps adding water to the mixer to get the workability back. Why is that the wrong fix?',
        list: [
          'Extra water only makes the mix runny, not workable, and it weakens the concrete; use the right SP dose instead',
          'Water is fine as long as the slump looks right',
          'Water improves strength',
          'Water replaces the need for an admixture',
        ],
        correctIndex: 0,
        explain: 'Extra water only makes the mix runny, not workable — and it weakens the concrete. The fix is the right SP dose, not more water.',
      },
    },
    {
      type: 'svg', title: 'Add Water, and Cement Clumps', data: {
        text: 'Cement grains are very fine and carry surface charges. In water they cling together into flocs, and the flocs lock water inside, so it can’t help the mix flow.',
        svgMarkup: svgCards([
          svgCard({ title: 'Cement + water only', style: CEMENT_WATER_ONLY_STYLE, svg: CEMENT_WATER_ONLY_SVG, verdict: 'bad' }),
          svgCard({ title: 'Add a superplasticizer', style: SP_ADDED_STYLE, svg: SP_ADDED_SVG, verdict: 'ok' }),
        ]),
        explain: 'Remember — extra site water only makes the mix runny, not workable. It weakens the concrete.',
      },
    },
    {
      type: 'text', title: 'First the Coat, Then the Flow', data: {
        text: 'Tap a stage. Watch the SP molecules find each grain and coat it. Only coated grains let go of each other.',
      },
    },
    {
      type: 'svg', title: 'Two Ways the Coat Keeps Grains Apart', data: {
        text: 'Every superplasticizer first adsorbs onto the grain. What the coat does next depends on the chemistry.',
        svgMarkup: svgCards([
          svgCard({ title: 'SNF / SMF: zeta potential', style: ZETA_STYLE, svg: ZETA_SVG }),
          svgCard({ title: 'PCE: steric hindrance', style: STERIC_STYLE, svg: STERIC_SVG }),
        ]),
        table: {
          headers: ['Feature', 'Zeta potential', 'Steric hindrance'],
          rows: [
            ['Used by', 'Lignosulphonate, SMF, SNF', 'PCE'],
            ['The coat', 'Charged chains lie flat on the grain', 'Comb: anchored backbone, side chains stick out'],
            ['Keeps grains apart by', 'Same charge: they repel', "Brush: they can't touch"],
            ['Lasts', 'Fades as hydration buries the coat: slump loss', 'Longer: better slump retention'],
          ],
        },
      },
    },
    {
      type: 'card', title: 'Plasticizer or Superplasticizer?', data: {
        text: 'Four chemistries, three generations.',
        table: {
          headers: ['Feature', 'Lignosulphonate\nPlasticizer · Gen 1', 'SMF\nMelamine · Gen 2', 'SNF\nNaphthalene · Gen 2', 'PCE\nPolycarboxylate · Gen 3'],
          rows: [
            ['Works by', 'Zeta potential', 'Zeta potential', 'Zeta potential', 'Steric hindrance'],
            ['Typical dose % by wt of cement', '0.1–0.4', '0.5–3.0', '0.5–3.0', 'Lowest'],
            ['Water cut', '5–15%', 'up to 30%', 'up to 30%', 'Highest'],
            ['Slump retention', 'Moderate', 'Poor', 'Poor', 'Excellent'],
            ['Watch-out', 'Overdose: air and excess retardation', 'Rapid slump loss', 'Rapid slump loss', 'Higher cost per kg'],
          ],
        },
        explain: 'Remember — plasticizer = lignosulphonate. Superplasticizer (high-range water reducer) = SMF, SNF, PCE.',
      },
    },
    {
      type: 'card', title: 'How Much Water Does Each One Cut?', data: {
        text: 'Each generation frees more of the trapped water. Hatched = typical range up to the maximum.',
        gauges: [
          { label: 'Lignosulphonate', sub: 'plasticizer', valuePct: 13, result: '5–15%', highlight: false, showDot: false },
          { label: 'SMF', sub: 'melamine', valuePct: 38, result: 'up to 30%', highlight: false, showDot: false },
          { label: 'SNF', sub: 'naphthalene', valuePct: 38, result: 'up to 30%', highlight: false, showDot: false },
          { label: 'PCE', sub: 'polycarboxylate', valuePct: 50, result: '20–40%', highlight: true, showDot: false },
        ],
        table: {
          headers: ['Admixture', 'Water needed', 'Water saved', 'w/c ratio'],
          rows: [
            ['LS (~10% cut)', '167 L', '19 L', '0.53 → 0.48'],
            ['SNF (~20% cut)', '148 L', '37 L', '0.53 → 0.42'],
            ['PCE (~30% cut)', '130 L', '56 L', '0.53 → 0.37'],
          ],
        },
        explain: '"What It Means in 1 m³" on the reference is a 3-way toggle (LS/SNF/PCE) that swaps these figures live — reproduced here as a static comparison table with all three values, since the Portal’s calculator fields model a numeric quantity input, not a named-preset toggle with no quantity. Illustration at the same workability; not a mix design — always confirm with trials.',
      },
    },
    {
      type: 'svg', title: 'Test with the Site Cement First', data: {
        text: 'The same SP can work well with one cement and badly with another. The Marsh cone shows it in 15 minutes.',
        svgMarkup: svgCards([
          svgCard({ title: 'Compatible cement + SP', style: MARSH_OK_STYLE, svg: MARSH_OK_SVG, verdict: 'ok' }),
          svgCard({ title: 'Incompatible cement + SP', style: MARSH_BAD_STYLE, svg: MARSH_BAD_SVG, verdict: 'bad' }),
        ]),
        steps: [
          { title: 'Measure', desc: '2 kg site cement, 1 L water, SP dose. Mixer, 2 min.' },
          { title: 'Pour', desc: 'Slurry into the cone, finger on the outlet.' },
          { title: 'Time', desc: 'Release, time the full flow-out.' },
          { title: 'Repeat', desc: 'At higher doses, until the time stops falling.' },
        ],
        explain: 'Saturation Point = the dose where flow time stops falling. That is the optimum dose for that cement. Add SP to wet, mixed concrete, not with the first water. Overdose causes segregation.',
      },
    },
    {
      type: 'card', title: 'HW930 · Super Plasticizer · PCE Based', data: {
        text: 'Sits at the top of the water-cut ladder: the PCE generation.',
        badges: [
          { icon: '🧪', label: 'PCE', tone: 'neutral' },
          { icon: '🧠', label: 'Steric hindrance', tone: 'neutral' },
          { icon: '💧', label: 'High-range water reducer', tone: 'neutral' },
        ],
        explain: 'Coming Next (per the reference site itself, which does not actually deliver this on a later step) — dosage, water reduction, slump retention and test values for HW930. This promised spec data is not reachable anywhere in the module’s 12 steps; flagged as an unresolved content gap, not fabricated.',
      },
    },
    {
      type: 'knowledge', title: 'Scenario: On Site — The Segregating Mix', data: {
        text: 'A ready-mix plant doubled the superplasticizer dose to get more flow for a congested pour. The concrete segregated in the truck and the pour was rejected. What went wrong, and what should they do next time?',
        list: [
          'They went past the saturation point; find the optimum dose for that cement with a Marsh cone trial first',
          'The SP was too old',
          'They should have added the SP with the first water',
          'They needed more water as well',
        ],
        correctIndex: 0,
        explain: 'They went past the saturation point. The fix is a Marsh cone trial to find the optimum dose for that specific cement, not more dose or more water.',
      },
    },
    {
      type: 'card', title: 'Cheat Sheet', data: {
        text: 'Check it before a visit.',
        sections: [
          { label: 'What happens', text: 'Grains clump into flocs and trap water. Mix is stiff, site adds water, concrete gets weaker.' },
          { label: 'Zeta potential', text: 'LS, SMF, SNF: charged coat, grains repel. Fades: slump loss.' },
          { label: 'Steric hindrance', text: "PCE: brush coat, grains can't touch. Lasts longer." },
          { label: 'Ladder', text: 'Water cut, lowest to highest: 5–15% → LS · SMF / SNF → PCE.' },
          { label: 'Field check', text: 'Marsh cone with site cement. Saturation point = optimum dose.' },
          { label: 'Pitch', text: 'HW930 Super Plasticizer, PCE based: top-generation water reducer — more flow, less water, better slump retention.' },
        ],
      },
    },
  ],
};
