// Self-contained animated-SVG bundles for HW210 Tile Grout, extracted verbatim
// (CSS + SVG markup) from the Hard Worker Learning Hub reference site's own
// diagram components. See src/data/svgAnimations.ts for the HW101 set and the
// shared .svg-anim runtime in index.css.

export const HW210_OPEN_JOINT = `<style>
.sc-hw210-open-joint-grouted-joint .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw210-open-joint-grouted-joint .s-okc circle{fill:var(--ok)}
.sc-hw210-open-joint-grouted-joint .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw210-open-joint-grouted-joint .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-st1{animation-name:k-hw210-open-joint-grouted-joint-st1}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-st2{animation-name:k-hw210-open-joint-grouted-joint-st2}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-st3{animation-name:k-hw210-open-joint-grouted-joint-st3}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-okc{animation-name:k-hw210-open-joint-grouted-joint-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw210-open-joint-grouted-joint .s-txb{fill:var(--cblk)}
.sc-hw210-open-joint-grouted-joint .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw210-open-joint-grouted-joint .s-g-bed{fill:var(--cmor)}
.sc-hw210-open-joint-grouted-joint .s-g-gap{fill:var(--ink);opacity:.55}
.sc-hw210-open-joint-grouted-joint .s-g-eg{fill:var(--egj)}
.sc-hw210-open-joint-grouted-joint .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw210-open-joint-grouted-joint .s-g-bad{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw210-open-joint-grouted-joint .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw210-open-joint-grouted-joint .s-g-drop{fill:var(--water)}
.sc-hw210-open-joint-grouted-joint .s-g-dirt{fill:var(--stain)}
.sc-hw210-open-joint-grouted-joint .s-tgok circle{fill:var(--tg)}
.sc-hw210-open-joint-grouted-joint .s-g-grf{transform-box:fill-box;transform-origin:50% 100%}
.sc-hw210-open-joint-grouted-joint .s-g-sq{opacity:0}
.sc-hw210-open-joint-grouted-joint .s-g-sq rect{fill:var(--ink)}
.sc-hw210-open-joint-grouted-joint .s-g-sq path{fill:var(--gold)}
.sc-hw210-open-joint-grouted-joint .s-g-dA{opacity:0;transform-box:fill-box}
.sc-hw210-open-joint-grouted-joint .s-g-dC{opacity:0;transform-box:fill-box}
.sc-hw210-open-joint-grouted-joint .s-g-early{opacity:0}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-g-grf{animation-name:k-hw210-open-joint-grouted-joint-grF;animation-fill-mode:backwards;animation-delay:var(--gd,0s)}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-g-sq{animation-name:k-hw210-open-joint-grouted-joint-sq}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-g-dA{animation-name:k-hw210-open-joint-grouted-joint-dA;animation-fill-mode:backwards;animation-delay:var(--dd,0s)}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-g-dC{animation-name:k-hw210-open-joint-grouted-joint-dC;animation-fill-mode:backwards;animation-delay:var(--dd,0s)}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-g-early{animation-name:k-hw210-open-joint-grouted-joint-early}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-g-late{animation-name:k-hw210-open-joint-grouted-joint-late2}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-st1 .disc{animation-name:k-hw210-open-joint-grouted-joint-st1-disc}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-st2 .disc{animation-name:k-hw210-open-joint-grouted-joint-st2-disc}
.anim .sc-hw210-open-joint-grouted-joint.playing .s-st3 .disc{animation-name:k-hw210-open-joint-grouted-joint-st3-disc}
@keyframes k-hw210-open-joint-grouted-joint-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-open-joint-grouted-joint-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-open-joint-grouted-joint-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-open-joint-grouted-joint-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw210-open-joint-grouted-joint-grF{0%,38%{transform:scaleY(0)}43%,96%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes k-hw210-open-joint-grouted-joint-sq{0%,34%{opacity:0;transform:translateX(0)}36%{opacity:1;transform:translateX(0)}62%{opacity:1;transform:translateX(250px)}64%,100%{opacity:0;transform:translateX(250px)}}
@keyframes k-hw210-open-joint-grouted-joint-dA{0%{opacity:0;transform:translateY(0)}3%{opacity:1}18%{opacity:1;transform:translateY(80px)}22%,100%{opacity:0;transform:translateY(84px)}}
@keyframes k-hw210-open-joint-grouted-joint-dC{0%,64%{opacity:0;transform:none}66%{opacity:1;transform:none}73%{transform:translateY(62px)}78%{transform:translateY(44px)}83%{transform:translateY(62px);opacity:1}90%,100%{opacity:0;transform:translateY(62px)}}
@keyframes k-hw210-open-joint-grouted-joint-early{0%,3%{opacity:0}7%,30%{opacity:1}34%,100%{opacity:0}}
@keyframes k-hw210-open-joint-grouted-joint-late2{0%,68%{opacity:0}74%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw210-open-joint-grouted-joint-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-open-joint-grouted-joint-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-open-joint-grouted-joint-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw210-open-joint-grouted-joint playing" style="--T:9s">
<svg class="s-cs-svg" viewBox="0 8 340 180">
<text class="s-g-bad s-g-early" x="160" y="22" text-anchor="middle">Open joints: water and dirt get in</text>
<text class="s-g-good s-g-late" x="160" y="22" text-anchor="middle">Sealed joints: water stays on top</text>
<circle class="s-g-drop s-g-dA" cx="87" cy="36" r="4" style="--dd:0s"></circle><circle class="s-g-dirt s-g-dA" cx="159" cy="36" r="3.4" style="--dd:.3s"></circle><circle class="s-g-drop s-g-dA" cx="231" cy="36" r="4" style="--dd:.6s"></circle><circle class="s-g-dirt s-g-dA" cx="87" cy="36" r="3" style="--dd:1s"></circle>
<rect x="20" y="138" width="278" height="46" fill="var(--conc)"></rect>
<rect class="s-g-bed" x="20" y="128" width="278" height="10"></rect>
<rect class="s-g-gap" x="82" y="112" width="10" height="16"></rect><rect class="s-g-gap" x="154" y="112" width="10" height="16"></rect><rect class="s-g-gap" x="226" y="112" width="10" height="16"></rect>
<rect class="s-g-eg s-g-grf" x="82" y="112" width="10" height="16" style="--gd:0s"></rect><rect class="s-g-eg s-g-grf" x="154" y="112" width="10" height="16" style="--gd:.62s"></rect><rect class="s-g-eg s-g-grf" x="226" y="112" width="10" height="16" style="--gd:1.24s"></rect>
<rect class="s-g-tile" x="20" y="112" width="62" height="16" rx="1.5"></rect><rect class="s-g-tile" x="92" y="112" width="62" height="16" rx="1.5"></rect><rect class="s-g-tile" x="164" y="112" width="62" height="16" rx="1.5"></rect><rect class="s-g-tile" x="236" y="112" width="62" height="16" rx="1.5"></rect>
<g class="s-g-sq"><path d="M38 100L54 60" stroke="var(--gold)" stroke-width="5" stroke-linecap="round" fill="none"></path><rect x="22" y="100" width="36" height="11" rx="3"></rect></g>
<circle class="s-g-drop s-g-dC" cx="87" cy="40" r="4" style="--dd:0s"></circle><circle class="s-g-drop s-g-dC" cx="159" cy="40" r="4" style="--dd:.2s"></circle><circle class="s-g-drop s-g-dC" cx="231" cy="40" r="4" style="--dd:.4s"></circle>
<g class="s-okc s-tgok"><circle cx="300" cy="62" r="12"></circle><path d="M294 62.5l4 4 8-8.5"></path></g>
<text class="s-g-lab" x="303" y="124">Tile</text><text class="s-g-lab" x="303" y="137">Bed</text><text class="s-g-lab" x="303" y="166">Base</text>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>An open joint lets water and dirt straight in</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Grout is pressed in and fills the joint</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The surface is closed: water stays on top</span></li></ol></div>`;

export const HW210_TILES_BUTTED = `<style>
.sc-hw210-tiles-butted-no-joints .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-st1{animation-name:k-hw210-tiles-butted-no-joints-st1}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-st2{animation-name:k-hw210-tiles-butted-no-joints-st2}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-st3{animation-name:k-hw210-tiles-butted-no-joints-st3}
.sc-hw210-tiles-butted-no-joints .s-txb{fill:var(--cblk)}
.sc-hw210-tiles-butted-no-joints .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw210-tiles-butted-no-joints .s-g-bed{fill:var(--cmor)}
.sc-hw210-tiles-butted-no-joints .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw210-tiles-butted-no-joints .s-g-bad{font:600 12px var(--font-sans);fill:var(--neg)}
.sc-hw210-tiles-butted-no-joints .s-g-arrow{fill:none;stroke:var(--neg);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.sc-hw210-tiles-butted-no-joints .s-g-heat{fill:none;stroke:var(--gold);stroke-width:2;stroke-linecap:round}
.sc-hw210-tiles-butted-no-joints .s-g-subx{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw210-tiles-butted-no-joints .s-g-tl{transform-box:fill-box}
.sc-hw210-tiles-butted-no-joints .s-g-tr{transform-box:fill-box}
.sc-hw210-tiles-butted-no-joints .s-g-tl{transform-origin:0% 100%}
.sc-hw210-tiles-butted-no-joints .s-g-tr{transform-origin:100% 100%}
.sc-hw210-tiles-butted-no-joints .s-g-push{opacity:0}
.sc-hw210-tiles-butted-no-joints .s-g-pop{opacity:0}
.sc-hw210-tiles-butted-no-joints .s-g-heatg{opacity:0}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-g-subx{animation-name:k-hw210-tiles-butted-no-joints-subx}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-g-heatg{animation-name:k-hw210-tiles-butted-no-joints-heatg}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-g-push{animation-name:k-hw210-tiles-butted-no-joints-push}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-g-tl{animation-name:k-hw210-tiles-butted-no-joints-tentL;animation-timing-function:cubic-bezier(.3,1.5,.5,1)}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-g-tr{animation-name:k-hw210-tiles-butted-no-joints-tentR;animation-timing-function:cubic-bezier(.3,1.5,.5,1)}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-g-pop{animation-name:k-hw210-tiles-butted-no-joints-popx}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-st1 .disc{animation-name:k-hw210-tiles-butted-no-joints-st1-disc}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-st2 .disc{animation-name:k-hw210-tiles-butted-no-joints-st2-disc}
.anim .sc-hw210-tiles-butted-no-joints.playing .s-st3 .disc{animation-name:k-hw210-tiles-butted-no-joints-st3-disc}
@keyframes k-hw210-tiles-butted-no-joints-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-tiles-butted-no-joints-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-tiles-butted-no-joints-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-tiles-butted-no-joints-subx{0%,6%{transform:scaleX(1)}30%,94%{transform:scaleX(1.03)}100%{transform:scaleX(1)}}
@keyframes k-hw210-tiles-butted-no-joints-heatg{0%,3%{opacity:0}8%,30%{opacity:1}36%,100%{opacity:0}}
@keyframes k-hw210-tiles-butted-no-joints-push{0%,33%{opacity:0;transform:none}37%{opacity:1}44%{transform:translateX(var(--px))}50%{transform:none}56%{transform:translateX(var(--px))}62%{opacity:1;transform:none}66%,100%{opacity:0}}
@keyframes k-hw210-tiles-butted-no-joints-tentL{0%,64%{transform:none}74%,94%{transform:rotate(-13deg)}100%{transform:none}}
@keyframes k-hw210-tiles-butted-no-joints-tentR{0%,64%{transform:none}74%,94%{transform:rotate(13deg)}100%{transform:none}}
@keyframes k-hw210-tiles-butted-no-joints-popx{0%,70%{opacity:0}76%,94%{opacity:1}100%{opacity:0}}
@keyframes k-hw210-tiles-butted-no-joints-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-tiles-butted-no-joints-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-tiles-butted-no-joints-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw210-tiles-butted-no-joints playing" style="--T:10s">
<svg class="s-cs-svg" viewBox="0 36 300 138">
<g class="s-g-heatg"><text class="s-g-lab" x="150" y="50" text-anchor="middle">Heat · moisture · shrinkage</text><path class="s-g-heat" d="M14 146h-8m4-4l-4 4 4 4M286 146h8m-4-4l4 4-4 4"></path></g>
<g class="s-g-subx"><rect x="20" y="124" width="260" height="44" fill="var(--conc)"></rect><rect class="s-g-bed" x="20" y="114" width="260" height="10"></rect></g>
<rect class="s-g-tile" x="20" y="100" width="52" height="14" rx="1.5"></rect><rect class="s-g-tile" x="72" y="100" width="52" height="14" rx="1.5"></rect>
<rect class="s-g-tile s-g-tl" x="124" y="100" width="52" height="14" rx="1.5"></rect><rect class="s-g-tile s-g-tr" x="176" y="100" width="52" height="14" rx="1.5"></rect>
<rect class="s-g-tile" x="228" y="100" width="52" height="14" rx="1.5"></rect>
<path class="s-g-arrow s-g-push" style="--px:5px" d="M4 107h10m-4-4l4 4-4 4"></path><path class="s-g-arrow s-g-push" style="--px:-5px" d="M296 107h-10m4-4l-4 4 4 4"></path>
<g class="s-g-pop"><text class="s-g-bad" x="176" y="70" text-anchor="middle">Tiles lift and pop</text><path class="s-g-arrow" d="M176 75v6"></path></g>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>The base expands and contracts</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>With no joints, tiles push on each other</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Stress builds until tiles lift and pop out</span></li></ol></div>`;

export const HW210_TILES_WITH_JOINTS = `<style>
.sc-hw210-tiles-with-grouted-joints .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw210-tiles-with-grouted-joints .s-okc circle{fill:var(--ok)}
.sc-hw210-tiles-with-grouted-joints .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hw210-tiles-with-grouted-joints .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-st1{animation-name:k-hw210-tiles-with-grouted-joints-st1}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-st2{animation-name:k-hw210-tiles-with-grouted-joints-st2}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-st3{animation-name:k-hw210-tiles-with-grouted-joints-st3}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-okc{animation-name:k-hw210-tiles-with-grouted-joints-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.sc-hw210-tiles-with-grouted-joints .s-txb{fill:var(--cblk)}
.sc-hw210-tiles-with-grouted-joints .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw210-tiles-with-grouted-joints .s-g-bed{fill:var(--cmor)}
.sc-hw210-tiles-with-grouted-joints .s-g-eg{fill:var(--egj)}
.sc-hw210-tiles-with-grouted-joints .s-g-seal{fill:var(--seal)}
.sc-hw210-tiles-with-grouted-joints .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw210-tiles-with-grouted-joints .s-g-good{font:600 12px var(--font-sans);fill:var(--tg)}
.sc-hw210-tiles-with-grouted-joints .s-tgok circle{fill:var(--tg)}
.sc-hw210-tiles-with-grouted-joints .s-g-heat{fill:none;stroke:var(--gold);stroke-width:2;stroke-linecap:round}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-g-late{animation-name:k-hw210-tiles-with-grouted-joints-late2}
.sc-hw210-tiles-with-grouted-joints .s-g-subx{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw210-tiles-with-grouted-joints .s-g-mv{transform-box:fill-box}
.sc-hw210-tiles-with-grouted-joints .s-g-heatg{opacity:0}
.sc-hw210-tiles-with-grouted-joints .s-g-joint{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw210-tiles-with-grouted-joints .s-g-sl{transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-g-subx{animation-name:k-hw210-tiles-with-grouted-joints-subx}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-g-heatg{animation-name:k-hw210-tiles-with-grouted-joints-heatg}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-g-mv{animation-name:k-hw210-tiles-with-grouted-joints-mv}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-g-joint{animation-name:k-hw210-tiles-with-grouted-joints-jpulse}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-g-sl{animation-name:k-hw210-tiles-with-grouted-joints-slq}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-st1 .disc{animation-name:k-hw210-tiles-with-grouted-joints-st1-disc}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-st2 .disc{animation-name:k-hw210-tiles-with-grouted-joints-st2-disc}
.anim .sc-hw210-tiles-with-grouted-joints.playing .s-st3 .disc{animation-name:k-hw210-tiles-with-grouted-joints-st3-disc}
@keyframes k-hw210-tiles-with-grouted-joints-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-tiles-with-grouted-joints-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-tiles-with-grouted-joints-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-tiles-with-grouted-joints-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hw210-tiles-with-grouted-joints-late2{0%,68%{opacity:0}74%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hw210-tiles-with-grouted-joints-subx{0%,6%{transform:scaleX(1)}30%,94%{transform:scaleX(1.03)}100%{transform:scaleX(1)}}
@keyframes k-hw210-tiles-with-grouted-joints-heatg{0%,3%{opacity:0}8%,30%{opacity:1}36%,100%{opacity:0}}
@keyframes k-hw210-tiles-with-grouted-joints-mv{0%,6%{transform:none}30%,94%{transform:translateX(var(--tx))}100%{transform:none}}
@keyframes k-hw210-tiles-with-grouted-joints-jpulse{0%,34%{opacity:1}40%{opacity:.35}46%{opacity:1}52%{opacity:.35}58%,100%{opacity:1}}
@keyframes k-hw210-tiles-with-grouted-joints-slq{0%,6%{transform:none}30%,94%{transform:scaleX(.55)}100%{transform:none}}
@keyframes k-hw210-tiles-with-grouted-joints-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-tiles-with-grouted-joints-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-tiles-with-grouted-joints-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw210-tiles-with-grouted-joints playing" style="--T:10s">
<svg class="s-cs-svg" viewBox="0 36 300 138">
<g class="s-g-heatg"><text class="s-g-lab" x="150" y="50" text-anchor="middle">Heat · moisture · shrinkage</text><path class="s-g-heat" d="M14 146h-8m4-4l-4 4 4 4M286 146h8m-4-4l4 4-4 4"></path></g>
<text class="s-g-good s-g-late" x="150" y="66" text-anchor="middle">Tiles stay flat and bonded</text>
<g class="s-g-subx"><rect x="20" y="124" width="260" height="44" fill="var(--conc)"></rect><rect class="s-g-bed" x="20" y="114" width="260" height="10"></rect></g>
<rect class="s-g-seal s-g-sl" x="20" y="100" width="7" height="14"></rect><rect class="s-g-seal s-g-sl" x="273" y="100" width="7" height="14"></rect>
<g class="s-g-mv" style="--tx:-2.2px"><rect class="s-g-eg s-g-joint" x="73" y="100" width="4" height="14"></rect></g><g class="s-g-mv" style="--tx:-.7px"><rect class="s-g-eg s-g-joint" x="123" y="100" width="4" height="14"></rect></g><g class="s-g-mv" style="--tx:.7px"><rect class="s-g-eg s-g-joint" x="173" y="100" width="4" height="14"></rect></g><g class="s-g-mv" style="--tx:2.2px"><rect class="s-g-eg s-g-joint" x="223" y="100" width="4" height="14"></rect></g>
<rect class="s-g-tile s-g-mv" style="--tx:-3px" x="27" y="100" width="46" height="14" rx="1.5"></rect><rect class="s-g-tile s-g-mv" style="--tx:-1.5px" x="77" y="100" width="46" height="14" rx="1.5"></rect><rect class="s-g-tile" x="127" y="100" width="46" height="14" rx="1.5"></rect><rect class="s-g-tile s-g-mv" style="--tx:1.5px" x="177" y="100" width="46" height="14" rx="1.5"></rect><rect class="s-g-tile s-g-mv" style="--tx:3px" x="227" y="100" width="46" height="14" rx="1.5"></rect>
<g class="s-okc s-tgok"><circle cx="262" cy="78" r="11"></circle><path d="M256.5 78.5l3.7 3.7 7.3-7.8"></path></g>
<path d="M23 98V84h8" fill="none" stroke="var(--ink-2)" stroke-width="1"></path><text class="s-g-lab" x="34" y="87">Flexible sealant at the edges</text>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>The same movement in the base</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Each tile has a joint around it to take the strain</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Edges get a flexible sealant; tiles stay put</span></li></ol></div>`;

export const HW210_PLAIN_CEMENT = `<style>
.sc-hw210-plain-cement-in-the-joint .s-cs-svg{width:100%;height:auto;display:block}
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
@keyframes k-hw210-plain-cement-in-the-joint-shrinkC{0%,32%{transform:none}52%,96%{transform:scaleX(.84)}100%{transform:none}}
@keyframes k-hw210-plain-cement-in-the-joint-dust{0%,38%{opacity:0;transform:none}42%{opacity:.85}60%{opacity:0;transform:translate(var(--dx),-18px)}100%{opacity:0}}
@keyframes k-hw210-plain-cement-in-the-joint-seep{0%,62%{opacity:0;transform:none}64%{opacity:1;transform:none}74%{opacity:1;transform:translateY(92px)}78%,100%{opacity:0;transform:translateY(94px)}}
@keyframes k-hw210-plain-cement-in-the-joint-wetp{0%,72%{opacity:0;transform:scale(.3)}86%,96%{opacity:.45;transform:scale(1)}100%{opacity:0}}
@keyframes k-hw210-plain-cement-in-the-joint-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-plain-cement-in-the-joint-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-plain-cement-in-the-joint-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw210-plain-cement-in-the-joint playing" style="--T:9s">
<svg class="s-cs-svg" viewBox="0 0 300 186">
<text class="s-g-bad s-g-late" x="150" y="20" text-anchor="middle">Gaps at the edges. Water gets under.</text>
<rect x="10" y="130" width="280" height="50" fill="var(--conc)"></rect><rect class="s-g-bed" x="10" y="118" width="280" height="12"></rect>
<ellipse class="s-g-wetp" cx="150" cy="124" rx="44" ry="7"></ellipse>
<rect class="s-g-gap" x="128" y="92" width="44" height="26"></rect>
<rect class="s-g-wc s-g-cfill" x="128" y="92" width="44" height="26"></rect>
<rect class="s-g-tile" x="10" y="92" width="118" height="26" rx="1.5"></rect><rect class="s-g-tile" x="172" y="92" width="118" height="26" rx="1.5"></rect>
<circle class="s-g-dust" cx="138" cy="90" r="1.8" style="--dd:0s;--dx:-8px"></circle><circle class="s-g-dust" cx="150" cy="89" r="2" style="--dd:.2s;--dx:3px"></circle><circle class="s-g-dust" cx="162" cy="90" r="1.8" style="--dd:.4s;--dx:9px"></circle><circle class="s-g-dust" cx="145" cy="90" r="1.5" style="--dd:.6s;--dx:-4px"></circle>
<circle class="s-g-drop s-g-seep" cx="131" cy="30" r="3.4" style="--dd:0s"></circle><circle class="s-g-drop s-g-seep" cx="169" cy="30" r="3.4" style="--dd:.3s"></circle>
<text class="s-g-lab" x="150" y="84" text-anchor="middle">Joint (zoomed)</text>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Plain cement fills the joint</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>It shrinks away from the tile edge and dusts</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Water runs in and sits under the tiles</span></li></ol></div>`;

export const HW210_JOINT = `<style>
.sc-hw210-hw210-in-the-joint .s-cs-svg{width:100%;height:auto;display:block}
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
@keyframes k-hw210-hw210-in-the-joint-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw210-hw210-in-the-joint playing" style="--T:9s">
<svg class="s-cs-svg" viewBox="0 0 300 186">
<text class="s-g-good s-g-late" x="150" y="20" text-anchor="middle">Stays tight. Water stays out.</text>
<rect x="10" y="130" width="280" height="50" fill="var(--conc)"></rect><rect class="s-g-bed" x="10" y="118" width="280" height="12"></rect>
<rect class="s-g-eg" x="128" y="92" width="44" height="26"></rect>
<rect class="s-g-tile" x="10" y="92" width="118" height="26" rx="1.5"></rect><rect class="s-g-tile" x="172" y="92" width="118" height="26" rx="1.5"></rect>
<path class="s-g-bondl" d="M129 93v24M171 93v24"></path>
<circle class="s-g-drop s-g-dC" cx="140" cy="26" r="4" style="--dd:0s"></circle><circle class="s-g-drop s-g-dC" cx="160" cy="26" r="4" style="--dd:.25s"></circle>
<g class="s-okc s-tgok"><circle cx="252" cy="56" r="12"></circle><path d="M246 56.5l4 4 8-8.5"></path></g>
<text class="s-g-lab" x="150" y="84" text-anchor="middle">Joint (zoomed)</text>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>HW210 fills the joint</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Nil shrinkage; the polymer grips the tile edges</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>The joint stays sealed against water and dirt</span></li></ol></div>`;

export const HW210_40_SHADES = `<style>
.sc-hw210-40-shades .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw210-40-shades.playing .s-st1{animation-name:k-hw210-40-shades-st1}
.anim .sc-hw210-40-shades.playing .s-st2{animation-name:k-hw210-40-shades-st2}
.anim .sc-hw210-40-shades.playing .s-st3{animation-name:k-hw210-40-shades-st3}
.sc-hw210-40-shades .s-g-tile{fill:var(--tile);stroke:var(--tile-e);stroke-width:1}
.sc-hw210-40-shades .s-g-shade{fill:#9C9A94}
.anim .sc-hw210-40-shades.playing .s-g-shade{animation-name:k-hw210-40-shades-shade;animation-timing-function:ease-in-out}
.anim .sc-hw210-40-shades.playing .s-st1 .disc{animation-name:k-hw210-40-shades-st1-disc}
.anim .sc-hw210-40-shades.playing .s-st2 .disc{animation-name:k-hw210-40-shades-st2-disc}
.anim .sc-hw210-40-shades.playing .s-st3 .disc{animation-name:k-hw210-40-shades-st3-disc}
@keyframes k-hw210-40-shades-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-40-shades-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-40-shades-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-40-shades-shade{0%,12%{fill:#9C9A94}16%,28%{fill:#EDE8DC}32%,44%{fill:#6E4F3A}48%,60%{fill:#34383F}64%,76%{fill:#C9A46A}80%,92%{fill:#7E93A2}96%,100%{fill:#9C9A94}}
@keyframes k-hw210-40-shades-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-40-shades-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-40-shades-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw210-40-shades playing" style="--T:12s">
<svg class="s-cs-svg" viewBox="0 0 300 96">
<rect class="s-g-shade" x="6" y="4" width="288" height="88" rx="4"></rect>
<g><rect class="s-g-tile" x="12" y="10" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="82" y="10" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="152" y="10" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="222" y="10" width="66" height="35" rx="2"></rect><rect class="s-g-tile" x="12" y="51" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="82" y="51" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="152" y="51" width="64" height="35" rx="2"></rect><rect class="s-g-tile" x="222" y="51" width="66" height="35" rx="2"></rect></g>
</svg></div>`;

export const HW210_MIXING = `<style>
.sc-hw210-mixing .s-cs-svg{width:100%;height:auto;display:block}
.anim .sc-hw210-mixing.playing .s-st1{animation-name:k-hw210-mixing-st1}
.anim .sc-hw210-mixing.playing .s-st2{animation-name:k-hw210-mixing-st2}
.anim .sc-hw210-mixing.playing .s-st3{animation-name:k-hw210-mixing-st3}
.sc-hw210-mixing .s-g-lab{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hw210-mixing .s-g-tub{fill:var(--ink)}
.sc-hw210-mixing .s-g-pour{fill:#d9d9d9;transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)}
.sc-hw210-mixing .s-g-bt{transform-box:view-box;transform-origin:232px 60px}
.sc-hw210-mixing .s-g-drill{opacity:0}
.sc-hw210-mixing .s-g-drill rect{fill:var(--ink-2)}
.sc-hw210-mixing .s-g-pad{fill:none;stroke:var(--ink-2);stroke-width:3;stroke-linecap:round;transform-box:fill-box;transform-origin:50% 50%}
.sc-hw210-mixing .s-g-swirl{fill:none;stroke:#d9d9d9;stroke-width:3;stroke-linecap:round;opacity:0}
.anim .sc-hw210-mixing.playing .s-g-bt{animation-name:k-hw210-mixing-tilt;animation-timing-function:ease-in-out}
.anim .sc-hw210-mixing.playing .s-g-pour{animation-name:k-hw210-mixing-pour}
.anim .sc-hw210-mixing.playing .s-g-swirl{animation-name:k-hw210-mixing-swirl}
.anim .sc-hw210-mixing.playing .s-g-drill{animation-name:k-hw210-mixing-drill}
.anim .sc-hw210-mixing.playing .s-g-pad{animation:k-hw210-mixing-spin .35s linear infinite}
.sc-hw210-mixing .s-g-pw{fill:#cacaca}
.sc-hw210-mixing .s-g-pa2{fill:var(--egj)}
.anim .sc-hw210-mixing.playing .s-g-pa2{animation-name:k-hw210-mixing-paste}
.sc-hw210-mixing .s-g-jug{fill:var(--water);opacity:.9}
.sc-hw210-mixing .s-g-pourw{fill:var(--water)}
.sc-hw210-mixing .s-g-bag{fill:var(--tg)}
.anim .sc-hw210-mixing.playing .s-g-swirl{stroke:#fff}
.anim .sc-hw210-mixing.playing .s-st1 .disc{animation-name:k-hw210-mixing-st1-disc}
.anim .sc-hw210-mixing.playing .s-st2 .disc{animation-name:k-hw210-mixing-st2-disc}
.anim .sc-hw210-mixing.playing .s-st3 .disc{animation-name:k-hw210-mixing-st3-disc}
@keyframes k-hw210-mixing-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-mixing-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-mixing-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-mixing-tilt{0%,4%{transform:none}12%,28%{transform:rotate(-58deg)}34%,100%{transform:none}}
@keyframes k-hw210-mixing-pour{0%,11%{transform:scaleY(0)}14%,27%{transform:scaleY(1)}31%,100%{transform:scaleY(0)}}
@keyframes k-hw210-mixing-swirl{0%,36%{opacity:0}40%,52%{opacity:.9}62%,100%{opacity:0}}
@keyframes k-hw210-mixing-drill{0%,32%{opacity:0;transform:translateY(-30px)}37%{opacity:1;transform:none}62%{opacity:1;transform:none}67%,100%{opacity:0;transform:translateY(-30px)}}
@keyframes k-hw210-mixing-spin{to{transform:rotate(360deg)}}
@keyframes k-hw210-mixing-paste{0%,40%{opacity:0}58%,96%{opacity:1}100%{opacity:0}}
@keyframes k-hw210-mixing-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-mixing-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-mixing-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw210-mixing playing" style="--T:9s">
<svg class="s-cs-svg" viewBox="0 0 300 184">
<g><path class="s-g-bag" d="M24 44Q24 38 30 38H66Q72 38 72 44L74 100Q74 104 70 104H26Q22 104 22 100Z"></path><text x="48" y="68" fill="#fff" font-size="12" font-weight="600" text-anchor="middle" font-family="var(--font-display)">HW210</text><text x="48" y="88" fill="var(--gold)" font-size="15" font-weight="600" text-anchor="middle" font-family="var(--font-display)">1 kg</text></g>
<text class="s-g-lab" x="48" y="120" text-anchor="middle">1 kg pack</text>
<path class="s-g-tub" d="M110 96L118 166H182L190 96Z"></path><ellipse class="s-g-pw" cx="150" cy="98" rx="38" ry="7"></ellipse><ellipse class="s-g-pa2" cx="150" cy="98" rx="38" ry="7"></ellipse>
<path class="s-g-swirl" d="M126 98q12-6 24 0q12 6 24 0"></path>
<text x="150" y="140" fill="#fff" font-size="14" font-weight="600" text-anchor="middle" font-family="var(--font-display)">HW210</text>
<rect class="s-g-pour s-g-pourw" x="173" y="44" width="5" height="52" rx="2"></rect>
<g class="s-g-bt"><rect class="s-g-jug" x="196" y="28" width="10" height="10" rx="2"></rect><rect class="s-g-jug" x="188" y="36" width="26" height="40" rx="5"></rect></g>
<text class="s-g-lab" x="256" y="120" text-anchor="middle">350–400 ml</text><text class="s-g-lab" x="256" y="133" text-anchor="middle">clean water</text>
<g class="s-g-drill"><rect x="138" y="4" width="24" height="18" rx="4"></rect><rect x="148" y="22" width="4" height="74"></rect><path class="s-g-pad" d="M136 100Q150 92 164 100Q150 108 136 100"></path></g>
<text class="s-g-lab" x="150" y="182" text-anchor="middle" style="font-weight:600">Smooth, lump-free · use within 60 min</text>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>1 kg powder and 350–400 ml clean water</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Mix to a smooth, lump-free paste</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Use within 60 min. Never add water later</span></li></ol></div>`;

export const HW210_GROUTING = `<style>
.sc-hw210-grouting .s-cs-svg{width:100%;height:auto;display:block}
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
@keyframes k-hw210-grouting-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw210-grouting-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw210-grouting-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw210-grouting-sweep{0%,4%{transform:translate(10px,10px)}58%,96%{transform:translate(240px,240px)}100%{transform:translate(10px,10px)}}
@keyframes k-hw210-grouting-flt{0%,3%{opacity:0;transform:translate(10px,10px)}5%{opacity:1;transform:translate(10px,10px)}58%{opacity:1;transform:translate(240px,240px)}61%,100%{opacity:0;transform:translate(240px,240px)}}
@keyframes k-hw210-grouting-haze{0%,10%{opacity:0}40%,66%{opacity:.28}90%,100%{opacity:0}}
@keyframes k-hw210-grouting-spg{0%,63%{opacity:0;transform:translate(0,0)}66%{opacity:1;transform:translate(0,0)}70%{transform:translate(30px,-12px)}74%{transform:translate(60px,0)}78%{transform:translate(30px,12px)}82%{transform:translate(0,0)}86%{transform:translate(30px,-12px)}90%{opacity:1;transform:translate(60px,0)}93%,100%{opacity:0;transform:translate(60px,0)}}
@keyframes k-hw210-grouting-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hw210-grouting-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hw210-grouting-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}
</style><div class="svg-anim anim sc-hw210-grouting playing" style="--T:10s">
<svg class="s-cs-svg" viewBox="0 0 300 200">
<defs><mask id="hw210-grouting-mSw" maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="200"><polygon class="s-g-sweep" points="-1000,1000 1000,-1000 -1000,-1000" fill="#fff"></polygon></mask></defs>
<rect class="s-g-gap" x="27" y="7" width="246" height="186" rx="3"></rect>
<rect class="s-g-eg" x="27" y="7" width="246" height="186" rx="3" mask="url(#hw210-grouting-mSw)"></rect>
<g><rect class="s-g-tile" x="33" y="13" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="93" y="13" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="153" y="13" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="213" y="13" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="33" y="73" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="93" y="73" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="153" y="73" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="213" y="73" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="33" y="133" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="93" y="133" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="153" y="133" width="54" height="54" rx="2"></rect><rect class="s-g-tile" x="213" y="133" width="54" height="54" rx="2"></rect></g>
<rect class="s-g-haze" x="27" y="7" width="246" height="186" rx="3"></rect>
<g class="s-g-flt"><rect x="-46" y="-9" width="92" height="18" rx="5" transform="rotate(-45)"></rect></g>
<g class="s-g-spg"><ellipse cx="110" cy="100" rx="20" ry="13"></ellipse></g>
</svg><ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Press in diagonally with a float or putty blade</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Fill every joint fully, no voids</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Sponge in circles at 30–45 min</span></li></ol></div>`;
