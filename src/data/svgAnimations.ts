// Self-contained animated-SVG bundles, extracted verbatim (CSS + SVG markup)
// from the Hard Worker Learning Hub reference site's own diagram components.
// Each bundle is a <style>+<div class="svg-anim ...">…</div> string, scoped
// entirely to its own class names, so several can be embedded on one page
// without colliding. The resolved color tokens these reference (var(--ink),
// var(--conc), etc.) are defined once on .svg-anim in index.css.

export const HW101_PLAIN_CONCRETE = `<style>
.sc-hw101-plain-concrete .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw101-plain-concrete .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw101-plain-concrete .s-badtx{fill:var(--neg);font-weight:600}
.sc-hw101-plain-concrete .s-gtr{fill:var(--rule)}
.sc-hw101-plain-concrete .s-gfl{fill:var(--gold);transform-box:fill-box;transform-origin:0 50%;transform:scaleX(var(--s))}
.sc-hw101-plain-concrete .s-gfl.s-weak{fill:var(--other)}
.sc-hw101-plain-concrete .s-pore{fill:var(--paper);stroke:var(--ink);stroke-width:1.4;opacity:1}
.anim .sc-hw101-plain-concrete.playing .s-st1{animation-name:k-hw101-plain-concrete-st1}
.anim .sc-hw101-plain-concrete.playing .s-st2{animation-name:k-hw101-plain-concrete-st2}
.anim .sc-hw101-plain-concrete.playing .s-st3{animation-name:k-hw101-plain-concrete-st3}
.anim .sc-hw101-plain-concrete.playing .s-gfl{animation-name:k-hw101-plain-concrete-gauge;animation-timing-function:ease-out}
.anim .sc-hw101-plain-concrete.playing .s-badtx{animation-name:k-hw101-plain-concrete-redge}
.anim .sc-hw101-plain-concrete.playing .s-pore{animation-name:k-hw101-plain-concrete-pore;animation-delay:var(--wd)}
.sc-hw101-plain-concrete .s-txb{fill:var(--cblk)}
.sc-hw101-plain-concrete .s-stone{fill:#000;opacity:.13}
.sc-hw101-plain-concrete .s-steel{fill:var(--steel)}
.sc-hw101-plain-concrete .s-steel2{fill:none;stroke:color-mix(in srgb,var(--steel) 60%,#000);stroke-width:1.2}
.sc-hw101-plain-concrete .s-rust{fill:var(--rust);opacity:1}
.sc-hw101-plain-concrete .s-chan{fill:none;stroke:var(--paper);stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:220;stroke-dashoffset:0;opacity:.95}
.sc-hw101-plain-concrete .s-wflow{fill:none;stroke:var(--water);stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:220;stroke-dashoffset:0}
.sc-hw101-plain-concrete .s-topwater{fill:var(--water);opacity:.85}
.sc-hw101-plain-concrete .s-rd{fill:var(--water);opacity:0}
.sc-hw101-plain-concrete .s-late{opacity:1}
.sc-hw101-plain-concrete .s-gfl.s-iwpf{fill:var(--iwp)}
.sc-hw101-plain-concrete .s-wdrop{fill:var(--water);opacity:0;transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw101-plain-concrete.playing .s-gfl.s-mw{animation-name:k-hw101-plain-concrete-mixw;animation-timing-function:ease-out}
.anim .sc-hw101-plain-concrete.playing .s-wdrop{animation-name:k-hw101-plain-concrete-wdrop;animation-delay:var(--wd)}
.anim .sc-hw101-plain-concrete.playing .s-pore{animation-name:k-hw101-plain-concrete-poreIn;animation-delay:var(--wd)}
.anim .sc-hw101-plain-concrete.playing .s-chan{animation-name:k-hw101-plain-concrete-chanIn}
.anim .sc-hw101-plain-concrete.playing .s-topwater{animation-name:k-hw101-plain-concrete-topIn}
.anim .sc-hw101-plain-concrete.playing .s-rd{animation-name:k-hw101-plain-concrete-rain3;animation-delay:var(--rd)}
.anim .sc-hw101-plain-concrete.playing .s-wflow{animation-name:k-hw101-plain-concrete-flowIn}
.anim .sc-hw101-plain-concrete.playing .s-rust{animation-name:k-hw101-plain-concrete-rustIn}
.anim .sc-hw101-plain-concrete.playing .s-late{animation-name:k-hw101-plain-concrete-lateIn}
.anim .sc-hw101-plain-concrete.playing .s-st1 .disc{animation-name:k-hw101-plain-concrete-st1-disc}
.anim .sc-hw101-plain-concrete.playing .s-st2 .disc{animation-name:k-hw101-plain-concrete-st2-disc}
.anim .sc-hw101-plain-concrete.playing .s-st3 .disc{animation-name:k-hw101-plain-concrete-st3-disc}
@keyframes k-hw101-plain-concrete-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw101-plain-concrete-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw101-plain-concrete-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw101-plain-concrete-gauge{0%{transform:scaleX(0)}40%,97%{transform:scaleX(var(--s))}100%{transform:scaleX(0)}}
@keyframes k-hw101-plain-concrete-redge{0%,72%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-plain-concrete-pore{0%,40%{opacity:0}56%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-plain-concrete-mixw{0%{transform:scaleX(0)}16%,97%{transform:scaleX(var(--s))}100%{transform:scaleX(0)}}
@keyframes k-hw101-plain-concrete-wdrop{0%{opacity:0;transform:scale(.2)}5%,28%{opacity:1;transform:none}44%,100%{opacity:0;transform:translateY(-14px) scale(.6)}}
@keyframes k-hw101-plain-concrete-poreIn{0%,34%{opacity:0}46%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-plain-concrete-chanIn{0%,42%{stroke-dashoffset:220;opacity:.95}60%,97%{stroke-dashoffset:0;opacity:.95}100%{stroke-dashoffset:0;opacity:0}}
@keyframes k-hw101-plain-concrete-topIn{0%,64%{opacity:0}70%,97%{opacity:.85}100%{opacity:0}}
@keyframes k-hw101-plain-concrete-rain3{0%,62%{opacity:0;transform:translateY(-16px)}64%{opacity:1}70%{opacity:1;transform:translateY(10px)}71%,100%{opacity:0;transform:translateY(10px)}}
@keyframes k-hw101-plain-concrete-flowIn{0%,68%{stroke-dashoffset:220}84%,97%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
@keyframes k-hw101-plain-concrete-rustIn{0%,80%{opacity:0}88%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-plain-concrete-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-plain-concrete-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw101-plain-concrete-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw101-plain-concrete-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw101-plain-concrete playing" style="--T:10s">
<svg class="s-cs-svg" viewBox="0 0 300 232">
<text class="s-lbl" x="20" y="15">Mixing water</text><text class="s-lbl" x="280" y="15" text-anchor="end">Normal</text>
<rect class="s-gtr" x="20" y="21" width="260" height="9" rx="4.5"></rect><rect class="s-gfl s-weak s-mw" style="--s:1" x="20" y="21" width="260" height="9" rx="4.5"></rect>
<rect x="20" y="58" width="260" height="140" rx="3" fill="var(--conc)"></rect>
<g><ellipse class="s-stone" cx="110" cy="70" rx="10" ry="6"></ellipse><ellipse class="s-stone" cx="202" cy="72" rx="9" ry="6"></ellipse><ellipse class="s-stone" cx="78" cy="104" rx="8" ry="5"></ellipse><ellipse class="s-stone" cx="240" cy="152" rx="10" ry="7"></ellipse><ellipse class="s-stone" cx="118" cy="182" rx="9" ry="6"></ellipse><ellipse class="s-stone" cx="182" cy="152" rx="8" ry="5"></ellipse><ellipse class="s-stone" cx="34" cy="130" rx="7" ry="5"></ellipse><ellipse class="s-stone" cx="264" cy="184" rx="8" ry="5"></ellipse></g>
<path class="s-chan" d="M52 58L48 80L62 124L74 152L80 170"></path><path class="s-chan" d="M236 58L238 82L258 116L214 134L220 170"></path><path class="s-chan" d="M140 58L140 76L166 120L150 160"></path>
<g><circle class="s-pore" cx="48" cy="80" r="5" style="--wd:0s"></circle><circle class="s-pore" cx="92" cy="96" r="5" style="--wd:.05s"></circle><circle class="s-pore" cx="140" cy="76" r="5" style="--wd:.1s"></circle><circle class="s-pore" cx="186" cy="100" r="5" style="--wd:.15s"></circle><circle class="s-pore" cx="238" cy="82" r="5" style="--wd:.2s"></circle><circle class="s-pore" cx="62" cy="124" r="5" style="--wd:.25s"></circle><circle class="s-pore" cx="118" cy="136" r="5" style="--wd:.3s"></circle><circle class="s-pore" cx="166" cy="120" r="5" style="--wd:.35s"></circle><circle class="s-pore" cx="214" cy="134" r="5" style="--wd:.4s"></circle><circle class="s-pore" cx="258" cy="116" r="5" style="--wd:.45s"></circle><circle class="s-pore" cx="40" cy="160" r="5" style="--wd:.5s"></circle><circle class="s-pore" cx="150" cy="160" r="5" style="--wd:.55s"></circle></g>
<g><circle class="s-wdrop" cx="48" cy="80" r="4.5" style="--wd:0s"></circle><circle class="s-wdrop" cx="92" cy="96" r="4.5" style="--wd:.05s"></circle><circle class="s-wdrop" cx="140" cy="76" r="4.5" style="--wd:.1s"></circle><circle class="s-wdrop" cx="186" cy="100" r="4.5" style="--wd:.15s"></circle><circle class="s-wdrop" cx="238" cy="82" r="4.5" style="--wd:.2s"></circle><circle class="s-wdrop" cx="62" cy="124" r="4.5" style="--wd:.25s"></circle><circle class="s-wdrop" cx="118" cy="136" r="4.5" style="--wd:.3s"></circle><circle class="s-wdrop" cx="166" cy="120" r="4.5" style="--wd:.35s"></circle><circle class="s-wdrop" cx="214" cy="134" r="4.5" style="--wd:.4s"></circle><circle class="s-wdrop" cx="258" cy="116" r="4.5" style="--wd:.45s"></circle><circle class="s-wdrop" cx="40" cy="160" r="4.5" style="--wd:.5s"></circle><circle class="s-wdrop" cx="150" cy="160" r="4.5" style="--wd:.55s"></circle></g>
<circle class="s-steel" cx="80" cy="180" r="8"></circle><circle class="s-steel2" cx="80" cy="180" r="5"></circle><circle class="s-steel" cx="220" cy="180" r="8"></circle><circle class="s-steel2" cx="220" cy="180" r="5"></circle>
<path class="s-wflow" d="M52 58L48 80L62 124L74 152L80 170"></path><path class="s-wflow" d="M236 58L238 82L258 116L214 134L220 170"></path>
<circle class="s-rust" cx="80" cy="180" r="9.5"></circle><circle class="s-rust" cx="220" cy="180" r="9.5"></circle>
<rect class="s-topwater" x="20" y="50" width="260" height="8" rx="2"></rect>
<g><ellipse class="s-rd" cx="60" cy="40" rx="2.5" ry="4" style="--rd:0s"></ellipse><ellipse class="s-rd" cx="120" cy="40" rx="2.5" ry="4" style="--rd:.15s"></ellipse><ellipse class="s-rd" cx="180" cy="40" rx="2.5" ry="4" style="--rd:.3s"></ellipse><ellipse class="s-rd" cx="240" cy="40" rx="2.5" ry="4" style="--rd:.45s"></ellipse></g>
<text class="s-lbl s-badtx s-late" x="150" y="222" text-anchor="middle">Water reaches the steel. Rust starts.</text>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Normal mixing water</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Extra water dries out and leaves connected pores</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Water travels in through the pores and rusts the steel</span></li></ol></div>`;

export const HW101_WITH_HW101 = `<style>
.sc-hw101-with-hw101 .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw101-with-hw101 .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw101-with-hw101 .s-okc circle{fill:var(--ok)}
.sc-hw101-with-hw101 .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw101-with-hw101 .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw101-with-hw101 .s-gtr{fill:var(--rule)}
.sc-hw101-with-hw101 .s-gfl{fill:var(--gold);transform-box:fill-box;transform-origin:0 50%;transform:scaleX(var(--s))}
.sc-hw101-with-hw101 .s-gfl.s-weak{fill:var(--other)}
.sc-hw101-with-hw101 .s-pore{fill:var(--paper);stroke:var(--ink);stroke-width:1.4;opacity:1}
.anim .sc-hw101-with-hw101.playing .s-st1{animation-name:k-hw101-with-hw101-st1}
.anim .sc-hw101-with-hw101.playing .s-st2{animation-name:k-hw101-with-hw101-st2}
.anim .sc-hw101-with-hw101.playing .s-st3{animation-name:k-hw101-with-hw101-st3}
.anim .sc-hw101-with-hw101.playing .s-okc{animation-name:k-hw101-with-hw101-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw101-with-hw101.playing .s-gfl{animation-name:k-hw101-with-hw101-gauge;animation-timing-function:ease-out}
.anim .sc-hw101-with-hw101.playing .s-pore{animation-name:k-hw101-with-hw101-pore;animation-delay:var(--wd)}
.sc-hw101-with-hw101 .s-txb{fill:var(--cblk)}
.sc-hw101-with-hw101 .s-stone{fill:#000;opacity:.13}
.sc-hw101-with-hw101 .s-steel{fill:var(--steel)}
.sc-hw101-with-hw101 .s-steel2{fill:none;stroke:color-mix(in srgb,var(--steel) 60%,#000);stroke-width:1.2}
.sc-hw101-with-hw101 .s-plug{fill:var(--iwp);transform-box:fill-box;transform-origin:50% 50%}
.sc-hw101-with-hw101 .s-topwater{fill:var(--water);opacity:.85}
.sc-hw101-with-hw101 .s-rd{fill:var(--water);opacity:0}
.sc-hw101-with-hw101 .s-bnc{fill:none;stroke:var(--water);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.sc-hw101-with-hw101 .s-late{opacity:1}
.sc-hw101-with-hw101 .s-goodtx{fill:var(--iwp);font-weight:600}
.sc-hw101-with-hw101 .s-iwpok circle{fill:var(--iwp)}
.sc-hw101-with-hw101 .s-gfl.s-iwpf{fill:var(--iwp)}
.sc-hw101-with-hw101 .s-lessw{fill:var(--iwp);font-weight:600}
.sc-hw101-with-hw101 .s-wdrop{fill:var(--water);opacity:0;transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw101-with-hw101.playing .s-gfl.s-mw{animation-name:k-hw101-with-hw101-mixw;animation-timing-function:ease-out}
.anim .sc-hw101-with-hw101.playing .s-lessw{animation-name:k-hw101-with-hw101-t12}
.anim .sc-hw101-with-hw101.playing .s-wdrop{animation-name:k-hw101-with-hw101-wdrop;animation-delay:var(--wd)}
.anim .sc-hw101-with-hw101.playing .s-pore{animation-name:k-hw101-with-hw101-poreIn;animation-delay:var(--wd)}
.anim .sc-hw101-with-hw101.playing .s-plug{animation-name:k-hw101-with-hw101-plugIn;animation-timing-function:cubic-bezier(.3,1.5,.5,1)}
.anim .sc-hw101-with-hw101.playing .s-topwater{animation-name:k-hw101-with-hw101-topIn}
.anim .sc-hw101-with-hw101.playing .s-rd{animation-name:k-hw101-with-hw101-rain3;animation-delay:var(--rd)}
.anim .sc-hw101-with-hw101.playing .s-late{animation-name:k-hw101-with-hw101-lateIn}
.anim .sc-hw101-with-hw101.playing .s-bnc{animation-name:k-hw101-with-hw101-bnc;animation-delay:var(--bd)}
.anim .sc-hw101-with-hw101.playing .s-iwpok{animation-name:k-hw101-with-hw101-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hw101-with-hw101.playing .s-st1 .disc{animation-name:k-hw101-with-hw101-st1-disc}
.anim .sc-hw101-with-hw101.playing .s-st2 .disc{animation-name:k-hw101-with-hw101-st2-disc}
.anim .sc-hw101-with-hw101.playing .s-st3 .disc{animation-name:k-hw101-with-hw101-st3-disc}
@keyframes k-hw101-with-hw101-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw101-with-hw101-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw101-with-hw101-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw101-with-hw101-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw101-with-hw101-gauge{0%{transform:scaleX(0)}40%,97%{transform:scaleX(var(--s))}100%{transform:scaleX(0)}}
@keyframes k-hw101-with-hw101-pore{0%,40%{opacity:0}56%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-with-hw101-mixw{0%{transform:scaleX(0)}16%,97%{transform:scaleX(var(--s))}100%{transform:scaleX(0)}}
@keyframes k-hw101-with-hw101-t12{0%,38%{opacity:.3}42%,97%{opacity:1}100%{opacity:.3}}
@keyframes k-hw101-with-hw101-wdrop{0%{opacity:0;transform:scale(.2)}5%,28%{opacity:1;transform:none}44%,100%{opacity:0;transform:translateY(-14px) scale(.6)}}
@keyframes k-hw101-with-hw101-poreIn{0%,34%{opacity:0}46%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-with-hw101-plugIn{0%,48%{opacity:0;transform:scale(.2)}60%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.2)}}
@keyframes k-hw101-with-hw101-topIn{0%,64%{opacity:0}70%,97%{opacity:.85}100%{opacity:0}}
@keyframes k-hw101-with-hw101-rain3{0%,62%{opacity:0;transform:translateY(-16px)}64%{opacity:1}70%{opacity:1;transform:translateY(10px)}71%,100%{opacity:0;transform:translateY(10px)}}
@keyframes k-hw101-with-hw101-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-with-hw101-bnc{0%,70%{opacity:0;transform:none}73%{opacity:1}78%{transform:translateY(-7px)}83%{transform:none}88%{transform:translateY(-7px)}93%{transform:none;opacity:1}97%,100%{opacity:0}}
@keyframes k-hw101-with-hw101-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw101-with-hw101-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw101-with-hw101-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw101-with-hw101 playing" style="--T:10s">
<svg class="s-cs-svg" viewBox="0 0 300 232">
<text class="s-lbl" x="20" y="15">Mixing water</text><text class="s-lbl s-lessw" x="280" y="15" text-anchor="end">8–10% less</text>
<rect class="s-gtr" x="20" y="21" width="260" height="9" rx="4.5"></rect><rect class="s-gfl s-iwpf s-mw" style="--s:.91" x="20" y="21" width="260" height="9" rx="4.5"></rect>
<rect x="20" y="58" width="260" height="140" rx="3" fill="var(--conc)"></rect>
<g><ellipse class="s-stone" cx="110" cy="70" rx="10" ry="6"></ellipse><ellipse class="s-stone" cx="202" cy="72" rx="9" ry="6"></ellipse><ellipse class="s-stone" cx="78" cy="104" rx="8" ry="5"></ellipse><ellipse class="s-stone" cx="240" cy="152" rx="10" ry="7"></ellipse><ellipse class="s-stone" cx="118" cy="182" rx="9" ry="6"></ellipse><ellipse class="s-stone" cx="182" cy="152" rx="8" ry="5"></ellipse><ellipse class="s-stone" cx="34" cy="130" rx="7" ry="5"></ellipse><ellipse class="s-stone" cx="264" cy="184" rx="8" ry="5"></ellipse></g>
<g><circle class="s-pore" cx="92" cy="96" r="4" style="--wd:.05s"></circle><circle class="s-pore" cx="186" cy="100" r="4" style="--wd:.15s"></circle><circle class="s-pore" cx="62" cy="124" r="4" style="--wd:.25s"></circle><circle class="s-pore" cx="214" cy="134" r="4" style="--wd:.4s"></circle><circle class="s-pore" cx="150" cy="160" r="4" style="--wd:.55s"></circle></g>
<g><circle class="s-plug" cx="92" cy="96" r="4.2"></circle><circle class="s-plug" cx="186" cy="100" r="4.2"></circle><circle class="s-plug" cx="62" cy="124" r="4.2"></circle><circle class="s-plug" cx="214" cy="134" r="4.2"></circle><circle class="s-plug" cx="150" cy="160" r="4.2"></circle></g>
<g><circle class="s-wdrop" cx="48" cy="80" r="4.5" style="--wd:0s"></circle><circle class="s-wdrop" cx="92" cy="96" r="4.5" style="--wd:.05s"></circle><circle class="s-wdrop" cx="186" cy="100" r="4.5" style="--wd:.15s"></circle><circle class="s-wdrop" cx="238" cy="82" r="4.5" style="--wd:.2s"></circle><circle class="s-wdrop" cx="62" cy="124" r="4.5" style="--wd:.25s"></circle><circle class="s-wdrop" cx="118" cy="136" r="4.5" style="--wd:.3s"></circle><circle class="s-wdrop" cx="214" cy="134" r="4.5" style="--wd:.4s"></circle><circle class="s-wdrop" cx="258" cy="116" r="4.5" style="--wd:.45s"></circle><circle class="s-wdrop" cx="40" cy="160" r="4.5" style="--wd:.5s"></circle><circle class="s-wdrop" cx="150" cy="160" r="4.5" style="--wd:.55s"></circle></g>
<circle class="s-steel" cx="80" cy="180" r="8"></circle><circle class="s-steel2" cx="80" cy="180" r="5"></circle><circle class="s-steel" cx="220" cy="180" r="8"></circle><circle class="s-steel2" cx="220" cy="180" r="5"></circle>
<g class="s-okc s-iwpok"><circle cx="150" cy="182" r="11"></circle><path d="M144 182.5l4 4 8-8.5"></path></g>
<rect class="s-topwater" x="20" y="50" width="260" height="8" rx="2"></rect>
<g><ellipse class="s-rd" cx="60" cy="40" rx="2.5" ry="4" style="--rd:0s"></ellipse><ellipse class="s-rd" cx="120" cy="40" rx="2.5" ry="4" style="--rd:.15s"></ellipse><ellipse class="s-rd" cx="180" cy="40" rx="2.5" ry="4" style="--rd:.3s"></ellipse><ellipse class="s-rd" cx="240" cy="40" rx="2.5" ry="4" style="--rd:.45s"></ellipse></g>
<g><path class="s-bnc" d="M64 50l6-6 6 6" style="--bd:0s"></path><path class="s-bnc" d="M144 50l6-6 6 6" style="--bd:.12s"></path><path class="s-bnc" d="M224 50l6-6 6 6" style="--bd:.24s"></path></g>
<text class="s-lbl s-goodtx s-late" x="150" y="222" text-anchor="middle">Water stays out. Steel stays protected.</text>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>8–10% less mixing water, still workable</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Fewer pores, and HW101 blocks the ones that form</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Water stays out and the steel stays protected</span></li></ol></div>`;

export const HW101_CUBE_TEST = `<style>
.sc-hw101-cube-test-at-3-days .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw101-cube-test-at-3-days .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw101-cube-test-at-3-days .s-lname{font:600 13px var(--font-sans);fill:var(--ink)}
.sc-hw101-cube-test-at-3-days .s-gtr{fill:var(--rule)}
.anim .sc-hw101-cube-test-at-3-days.playing .s-st1{animation-name:k-hw101-cube-test-at-3-days-st1}
.anim .sc-hw101-cube-test-at-3-days.playing .s-st2{animation-name:k-hw101-cube-test-at-3-days-st2}
.anim .sc-hw101-cube-test-at-3-days.playing .s-st3{animation-name:k-hw101-cube-test-at-3-days-st3}
.sc-hw101-cube-test-at-3-days .s-txb{fill:var(--cblk)}
.sc-hw101-cube-test-at-3-days .s-plate{fill:var(--ink-2)}
.sc-hw101-cube-test-at-3-days .s-press{transform:none}
.sc-hw101-cube-test-at-3-days .s-ld{fill:var(--other);transform-box:fill-box;transform-origin:0 50%;transform:scaleX(var(--s))}
.sc-hw101-cube-test-at-3-days .s-ld.s-hwl{fill:var(--iwp)}
.sc-hw101-cube-test-at-3-days .s-ccrk{fill:none;stroke:var(--crack);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:120;stroke-dashoffset:0}
.sc-hw101-cube-test-at-3-days .s-val{font:600 22px var(--font-display);fill:var(--ink)}
.sc-hw101-cube-test-at-3-days .s-val.s-hwv{fill:var(--iwp)}
.sc-hw101-cube-test-at-3-days .s-bigv{font:600 17px var(--font-display);fill:var(--iwp)}
.anim .sc-hw101-cube-test-at-3-days.playing .s-press{animation-name:k-hw101-cube-test-at-3-days-press;animation-timing-function:ease-out}
.anim .sc-hw101-cube-test-at-3-days.playing .s-ld.s-a{animation-name:k-hw101-cube-test-at-3-days-loadA;animation-timing-function:linear}
.anim .sc-hw101-cube-test-at-3-days.playing .s-ld.s-b{animation-name:k-hw101-cube-test-at-3-days-loadB;animation-timing-function:linear}
.anim .sc-hw101-cube-test-at-3-days.playing .s-ccrk.s-a{animation-name:k-hw101-cube-test-at-3-days-crkA}
.anim .sc-hw101-cube-test-at-3-days.playing .s-ccrk.s-b{animation-name:k-hw101-cube-test-at-3-days-crkB}
.anim .sc-hw101-cube-test-at-3-days.playing .s-va{animation-name:k-hw101-cube-test-at-3-days-vA}
.anim .sc-hw101-cube-test-at-3-days.playing .s-vb{animation-name:k-hw101-cube-test-at-3-days-vB}
.anim .sc-hw101-cube-test-at-3-days.playing .s-vend{animation-name:k-hw101-cube-test-at-3-days-vEnd}
.anim .sc-hw101-cube-test-at-3-days.playing .s-cube.s-a{animation-name:k-hw101-cube-test-at-3-days-shakeA}
.anim .sc-hw101-cube-test-at-3-days.playing .s-cube.s-b{animation-name:k-hw101-cube-test-at-3-days-shakeB}
.sc-hw101-cube-test-at-3-days .s-cube{transform-box:fill-box;transform-origin:50% 100%}
.anim .sc-hw101-cube-test-at-3-days.playing .s-st1 .disc{animation-name:k-hw101-cube-test-at-3-days-st1-disc}
.anim .sc-hw101-cube-test-at-3-days.playing .s-st2 .disc{animation-name:k-hw101-cube-test-at-3-days-st2-disc}
.anim .sc-hw101-cube-test-at-3-days.playing .s-st3 .disc{animation-name:k-hw101-cube-test-at-3-days-st3-disc}
.sc-hw101-cube-test-at-3-days .s-val{font-size:17px}.sc-hw101-cube-test-at-3-days .s-bigv{font-size:13.5px}.sc-hw101-cube-test-at-3-days .s-lname{font-size:12px}
@keyframes k-hw101-cube-test-at-3-days-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw101-cube-test-at-3-days-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw101-cube-test-at-3-days-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw101-cube-test-at-3-days-press{0%{transform:translateY(-14px)}12%,97%{transform:none}100%{transform:translateY(-14px)}}
@keyframes k-hw101-cube-test-at-3-days-loadA{0%,12%{transform:scaleX(0)}48%,97%{transform:scaleX(var(--s))}100%{transform:scaleX(0)}}
@keyframes k-hw101-cube-test-at-3-days-loadB{0%,12%{transform:scaleX(0)}62%,97%{transform:scaleX(var(--s))}100%{transform:scaleX(0)}}
@keyframes k-hw101-cube-test-at-3-days-crkA{0%,48%{stroke-dashoffset:120}54%,97%{stroke-dashoffset:0;opacity:1}100%{opacity:0}}
@keyframes k-hw101-cube-test-at-3-days-crkB{0%,62%{stroke-dashoffset:120}68%,97%{stroke-dashoffset:0;opacity:1}100%{opacity:0}}
@keyframes k-hw101-cube-test-at-3-days-vA{0%,48%{opacity:0}52%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-cube-test-at-3-days-vB{0%,62%{opacity:0}66%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-cube-test-at-3-days-vEnd{0%,72%{opacity:0}78%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-cube-test-at-3-days-shakeA{0%,47%{transform:none}49%{transform:translateX(-1.5px)}51%{transform:translateX(1.5px)}53%,100%{transform:none}}
@keyframes k-hw101-cube-test-at-3-days-shakeB{0%,61%{transform:none}63%{transform:translateX(-1.5px)}65%{transform:translateX(1.5px)}67%,100%{transform:none}}
@keyframes k-hw101-cube-test-at-3-days-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw101-cube-test-at-3-days-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw101-cube-test-at-3-days-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw101-cube-test-at-3-days playing" style="--T:9s">
<svg class="s-cs-svg" viewBox="0 0 300 226">
<text class="s-lname" x="80" y="12" text-anchor="middle">Control</text><text class="s-lname" x="220" y="12" text-anchor="middle" style="fill:var(--iwp)">With HW101</text>
<g class="s-press"><rect class="s-plate" x="73" y="16" width="14" height="18"></rect><rect class="s-plate" x="36" y="34" width="88" height="8" rx="2"></rect></g>
<g class="s-press"><rect class="s-plate" x="213" y="16" width="14" height="18"></rect><rect class="s-plate" x="176" y="34" width="88" height="8" rx="2"></rect></g>
<rect class="s-cube s-a" x="46" y="44" width="68" height="68" fill="var(--conc)" stroke="var(--ink-2)"></rect><path class="s-ccrk s-a" d="M74 44L84 62L76 78L88 96L82 112M84 62L98 70"></path>
<rect class="s-cube s-b" x="186" y="44" width="68" height="68" fill="var(--conc)" stroke="var(--iwp)" stroke-width="2"></rect><path class="s-ccrk s-b" d="M214 44L224 62L216 78L228 96L222 112M224 62L238 70"></path>
<rect class="s-plate" x="36" y="112" width="88" height="8" rx="2"></rect><rect class="s-plate" x="176" y="112" width="88" height="8" rx="2"></rect>
<text class="s-lbl" x="36" y="134">Load</text><text class="s-lbl" x="176" y="134">Load</text>
<rect class="s-gtr" x="36" y="141" width="88" height="9" rx="4.5"></rect><rect class="s-ld s-a" style="--s:.85" x="36" y="141" width="88" height="9" rx="4.5"></rect>
<rect class="s-gtr" x="176" y="141" width="88" height="9" rx="4.5"></rect><rect class="s-ld s-hwl s-b" style="--s:.9167" x="176" y="141" width="88" height="9" rx="4.5"></rect>
<g class="s-va"><text class="s-val" x="80" y="173" text-anchor="middle">25.5<tspan class="s-lbl" dx="3">N/mm²</tspan></text><text class="s-lbl" x="80" y="191" text-anchor="middle">breaks here</text></g>
<g class="s-vb"><text class="s-val s-hwv" x="220" y="173" text-anchor="middle">27.5<tspan class="s-lbl" dx="3">N/mm²</tspan></text><text class="s-lbl" x="220" y="191" text-anchor="middle">breaks here</text></g>
<text class="s-bigv s-vend" x="150" y="217" text-anchor="middle">+7.8% stronger at 3 days</text>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Both cubes go under the press</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>The control cube breaks at 25.5 N/mm²</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The HW101 cube holds to 27.5 N/mm², 7.8% more</span></li></ol></div>`;

export const HW101_WATER_PERCOLATION = `<style>
.sc-hw101-water-percolation .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw101-water-percolation .s-lname{font:600 13px var(--font-sans);fill:var(--ink)}
.anim .sc-hw101-water-percolation.playing .s-st1{animation-name:k-hw101-water-percolation-st1}
.anim .sc-hw101-water-percolation.playing .s-st2{animation-name:k-hw101-water-percolation-st2}
.anim .sc-hw101-water-percolation.playing .s-st3{animation-name:k-hw101-water-percolation-st3}
.sc-hw101-water-percolation .s-val{font:600 22px var(--font-display);fill:var(--ink)}
.sc-hw101-water-percolation .s-val.s-hwv{fill:var(--iwp)}
.sc-hw101-water-percolation .s-cyl{fill:none;stroke:var(--ink-2);stroke-width:2}
.sc-hw101-water-percolation .s-lvl{fill:var(--water);opacity:.8;transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(var(--s))}
.sc-hw101-water-percolation .s-spec{fill:var(--conc);stroke:var(--ink-2);stroke-width:1.5}
.sc-hw101-water-percolation .s-spec.s-hwsp{stroke:var(--iwp);stroke-width:2.5}
.sc-hw101-water-percolation .s-limit{stroke:var(--neg);stroke-width:1.6;stroke-dasharray:5 4}
.sc-hw101-water-percolation .s-limtx{font:600 10.5px var(--font-sans);fill:var(--neg)}
.sc-hw101-water-percolation .s-drp{fill:var(--water);opacity:0}
.anim .sc-hw101-water-percolation.playing .s-lvl{animation-name:k-hw101-water-percolation-fillUp;animation-timing-function:ease-out}
.anim .sc-hw101-water-percolation.playing .s-drp{animation:k-hw101-water-percolation-drp 1.1s linear infinite;animation-delay:var(--dd)}
.anim .sc-hw101-water-percolation.playing .s-drp.s-slow{animation-duration:3.3s}
.anim .sc-hw101-water-percolation.playing .s-vend2{animation-name:k-hw101-water-percolation-vEnd2}
.anim .sc-hw101-water-percolation.playing .s-st1 .disc{animation-name:k-hw101-water-percolation-st1-disc}
.anim .sc-hw101-water-percolation.playing .s-st2 .disc{animation-name:k-hw101-water-percolation-st2-disc}
.anim .sc-hw101-water-percolation.playing .s-st3 .disc{animation-name:k-hw101-water-percolation-st3-disc}
@keyframes k-hw101-water-percolation-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw101-water-percolation-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw101-water-percolation-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw101-water-percolation-fillUp{0%{transform:scaleY(0)}70%,97%{transform:scaleY(var(--s))}100%{transform:scaleY(0)}}
@keyframes k-hw101-water-percolation-drp{0%{opacity:0;transform:none}8%{opacity:1}60%{opacity:1;transform:translateY(46px)}62%,100%{opacity:0;transform:translateY(46px)}}
@keyframes k-hw101-water-percolation-vEnd2{0%,60%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw101-water-percolation-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw101-water-percolation-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw101-water-percolation-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw101-water-percolation playing" style="--T:8s">
<svg class="s-cs-svg" viewBox="0 0 300 236">
<text class="s-lname" x="90" y="13" text-anchor="middle">Control</text><text class="s-lname" x="210" y="13" text-anchor="middle" style="fill:var(--iwp)">With HW101</text>
<rect class="s-spec" x="60" y="22" width="60" height="26" rx="2"></rect><rect class="s-spec s-hwsp" x="180" y="22" width="60" height="26" rx="2"></rect>
<circle class="s-drp" cx="90" cy="56" r="3" style="--dd:0s"></circle><circle class="s-drp" cx="90" cy="56" r="3" style="--dd:.37s"></circle><circle class="s-drp" cx="90" cy="56" r="3" style="--dd:.73s"></circle>
<circle class="s-drp s-slow" cx="210" cy="56" r="3" style="--dd:0s"></circle>
<rect class="s-lvl" style="--s:.8" x="65" y="70" width="50" height="130"></rect><rect class="s-lvl" style="--s:.15" x="185" y="70" width="50" height="130"></rect>
<path class="s-cyl" d="M64 66V201H116V66"></path><path class="s-cyl" d="M184 66V201H236V66"></path>
<line class="s-limit" x1="178" y1="148" x2="242" y2="148"></line><text class="s-limtx" x="210" y="143" text-anchor="middle">IS limit</text>
<text class="s-val s-vend2" x="90" y="226" text-anchor="middle">32</text><text class="s-val s-hwv s-vend2" x="210" y="226" text-anchor="middle">6</text>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Water is pushed through both samples</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>The control lets much more through</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>HW101: 6 against 32, well under the IS limit</span></li></ol></div>`;
