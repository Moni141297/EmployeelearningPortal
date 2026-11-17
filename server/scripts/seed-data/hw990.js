const { svgCard, svgCards } = require('../lib/svgCard');

// --- Step 5: "Self-Curing, Explained" — 2-card diagram pair ---
const NORMAL_BLOCK_STYLE = `.sc-hwbmu-normal-block .s-cs-svg{width:100%;height:auto;display:block}
.sc-hwbmu-normal-block .s-blk{fill:var(--cblk)}
.sc-hwbmu-normal-block .s-w{fill:var(--water)}
.sc-hwbmu-normal-block .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hwbmu-normal-block .s-dr{fill:var(--water);opacity:0}
.sc-hwbmu-normal-block .s-pw{fill:var(--crack)}
.sc-hwbmu-normal-block .s-sun circle{fill:var(--gold)}
.sc-hwbmu-normal-block .s-sun line{stroke:var(--gold);stroke-width:2.4;stroke-linecap:round}
.sc-hwbmu-normal-block .s-sun{transform-box:fill-box;transform-origin:50% 50%}
.sc-hwbmu-normal-block .s-bw-n{opacity:.42;transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(.35)}
.sc-hwbmu-normal-block .s-topw{opacity:0}
.sc-hwbmu-normal-block .s-ev{fill:none;stroke:var(--ink-2);stroke-width:1.8;stroke-linecap:round;opacity:0}
.sc-hwbmu-normal-block .s-chipb{opacity:0;transform-box:fill-box;transform-origin:50% 50%}
.anim .sc-hwbmu-normal-block.playing .s-st1{animation-name:k-hwbmu-normal-block-st1}
.anim .sc-hwbmu-normal-block.playing .s-st2{animation-name:k-hwbmu-normal-block-st2}
.anim .sc-hwbmu-normal-block.playing .s-st3{animation-name:k-hwbmu-normal-block-st3}
.anim .sc-hwbmu-normal-block.playing .s-pw{animation-name:k-hwbmu-normal-block-pw}
.anim .sc-hwbmu-normal-block.playing .s-sun{animation-name:k-hwbmu-normal-block-spin;animation-duration:14s}
.anim .sc-hwbmu-normal-block.playing .s-dr{animation-name:k-hwbmu-normal-block-fall;animation-delay:var(--sd)}
.anim .sc-hwbmu-normal-block.playing .s-topw{animation-name:k-hwbmu-normal-block-topw}
.anim .sc-hwbmu-normal-block.playing .s-bw-n{animation-name:k-hwbmu-normal-block-drain}
.anim .sc-hwbmu-normal-block.playing .s-ev{animation-name:k-hwbmu-normal-block-evap;animation-delay:var(--ed)}
.anim .sc-hwbmu-normal-block.playing .s-chipb{animation-name:k-hwbmu-normal-block-chip}
.sc-hwbmu-normal-block .s-blk{fill:var(--conc);stroke:rgba(0,0,0,.35);stroke-width:1.6}
.anim .sc-hwbmu-normal-block.playing .s-st1-disc{animation-name:k-hwbmu-normal-block-st1-disc}
.anim .sc-hwbmu-normal-block.playing .s-st1 .disc{animation-name:k-hwbmu-normal-block-st1-disc}
.anim .sc-hwbmu-normal-block.playing .s-st2 .disc{animation-name:k-hwbmu-normal-block-st2-disc}
.anim .sc-hwbmu-normal-block.playing .s-st3 .disc{animation-name:k-hwbmu-normal-block-st3-disc}
@keyframes k-hwbmu-normal-block-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hwbmu-normal-block-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hwbmu-normal-block-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hwbmu-normal-block-pw{0%,72%{opacity:0}84%,96%{opacity:1}100%{opacity:0}}
@keyframes k-hwbmu-normal-block-spin{to{transform:rotate(360deg)}}
@keyframes k-hwbmu-normal-block-fall{0%{opacity:0;transform:translateY(0)}1%{opacity:1}7%{opacity:1;transform:translateY(32px)}8%,100%{opacity:0;transform:translateY(32px)}}
@keyframes k-hwbmu-normal-block-topw{0%{opacity:0}8%,28%{opacity:.9}44%,100%{opacity:0}}
@keyframes k-hwbmu-normal-block-drain{0%,34%{transform:scaleY(1)}63%,97%{transform:scaleY(.35)}100%{transform:scaleY(1)}}
@keyframes k-hwbmu-normal-block-evap{0%,34%{opacity:0;transform:translateY(0)}38%{opacity:.9}52%{opacity:0;transform:translateY(-26px)}53%{transform:translateY(0)}55%{opacity:.9}64%,100%{opacity:0;transform:translateY(-26px)}}
@keyframes k-hwbmu-normal-block-chip{0%,70%{opacity:1;transform:none}82%,97%{opacity:0;transform:translate(10px,44px) rotate(80deg)}100%{opacity:1;transform:none}}
@keyframes k-hwbmu-normal-block-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hwbmu-normal-block-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hwbmu-normal-block-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;
const NORMAL_BLOCK_SVG = `<svg class="s-cs-svg" viewBox="0 0 340 190"><g class="s-sun"><circle cx="300" cy="34" r="12"></circle><line x1="300" y1="14" x2="300" y2="8" transform="rotate(0 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(45 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(90 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(135 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(180 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(225 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(270 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(315 300 34)"></line></g><circle class="s-dr" cx="70" cy="46" r="2.6" style="--sd:0.00s"></circle><circle class="s-dr" cx="160" cy="46" r="2.6" style="--sd:0.30s"></circle><circle class="s-dr" cx="115" cy="46" r="2.6" style="--sd:0.60s"></circle><circle class="s-dr" cx="250" cy="46" r="2.6" style="--sd:0.90s"></circle><circle class="s-dr" cx="205" cy="46" r="2.6" style="--sd:1.20s"></circle><circle class="s-dr" cx="90" cy="46" r="2.6" style="--sd:1.50s"></circle><circle class="s-dr" cx="180" cy="46" r="2.6" style="--sd:1.80s"></circle><circle class="s-dr" cx="270" cy="46" r="2.6" style="--sd:2.10s"></circle><circle class="s-dr" cx="135" cy="46" r="2.6" style="--sd:2.40s"></circle><circle class="s-dr" cx="230" cy="46" r="2.6" style="--sd:2.70s"></circle><polygon class="s-blk" points="40,80 268,80 290,98 290,170 40,170"></polygon><polygon class="s-blk s-chipb" points="268,80 290,80 290,98"></polygon>
<rect class="s-w s-bw-n" x="42" y="82" width="246" height="86"></rect>
<rect class="s-w s-topw" x="40" y="80" width="250" height="10"></rect>
<path class="s-ev" style="--ed:0.00s" d="M90 76 q5 -6 0 -12 q-5 -6 0 -12"></path><path class="s-ev" style="--ed:0.35s" d="M165 76 q5 -6 0 -12 q-5 -6 0 -12"></path><path class="s-ev" style="--ed:0.70s" d="M240 76 q5 -6 0 -12 q-5 -6 0 -12"></path><path class="s-ev" style="--ed:1.05s" d="M125 76 q5 -6 0 -12 q-5 -6 0 -12"></path><path class="s-ev" style="--ed:1.40s" d="M205 76 q5 -6 0 -12 q-5 -6 0 -12"></path><circle class="s-pw" cx="258" cy="88" r="1.4"></circle><circle class="s-pw" cx="116" cy="85" r="1.4"></circle><circle class="s-pw" cx="200" cy="87" r="1.4"></circle><circle class="s-pw" cx="147" cy="87" r="1.4"></circle><circle class="s-pw" cx="249" cy="85" r="1.4"></circle><circle class="s-pw" cx="149" cy="87" r="1.4"></circle><circle class="s-pw" cx="253" cy="86" r="1.4"></circle><circle class="s-pw" cx="161" cy="83" r="1.4"></circle><circle class="s-pw" cx="141" cy="82" r="1.4"></circle><circle class="s-pw" cx="57" cy="83" r="1.4"></circle><circle class="s-pw" cx="174" cy="83" r="1.4"></circle><circle class="s-pw" cx="114" cy="87" r="1.4"></circle><circle class="s-pw" cx="159" cy="88" r="1.4"></circle><circle class="s-pw" cx="208" cy="88" r="1.4"></circle><circle class="s-pw" cx="125" cy="85" r="1.4"></circle><circle class="s-pw" cx="177" cy="88" r="1.4"></circle>
<text class="s-lbl" x="40" y="186">water left inside</text>
</svg>`;

const PLUS_BLOCK_STYLE = `.sc-hwbmu-strong-block-plus .s-cs-svg{width:100%;height:auto;display:block}
.sc-hwbmu-strong-block-plus .s-blk{fill:var(--cblk)}
.sc-hwbmu-strong-block-plus .s-w{fill:var(--water)}
.sc-hwbmu-strong-block-plus .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}
.sc-hwbmu-strong-block-plus .s-plusc{fill:var(--gold);opacity:.38}
.sc-hwbmu-strong-block-plus .s-film{fill:none;stroke-width:2.6;stroke-dasharray:6 4}
.sc-hwbmu-strong-block-plus .s-pluss{stroke:var(--gold)}
.sc-hwbmu-strong-block-plus .s-okc circle{fill:var(--ok)}
.sc-hwbmu-strong-block-plus .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.sc-hwbmu-strong-block-plus .s-plusok circle{fill:var(--gold)}
.sc-hwbmu-strong-block-plus .s-okc{transform-box:fill-box;transform-origin:50% 50%}
.sc-hwbmu-strong-block-plus .s-sun circle{fill:var(--gold)}
.sc-hwbmu-strong-block-plus .s-sun line{stroke:var(--gold);stroke-width:2.4;stroke-linecap:round}
.sc-hwbmu-strong-block-plus .s-sun{transform-box:fill-box;transform-origin:50% 50%}
.sc-hwbmu-strong-block-plus .s-bw-p{opacity:.22}
.sc-hwbmu-strong-block-plus .s-evb{fill:none;stroke:var(--ink-2);stroke-width:1.8;stroke-linecap:round;opacity:0}
.anim .sc-hwbmu-strong-block-plus.playing .s-st1{animation-name:k-hwbmu-strong-block-plus-st1}
.anim .sc-hwbmu-strong-block-plus.playing .s-st2{animation-name:k-hwbmu-strong-block-plus-st2}
.anim .sc-hwbmu-strong-block-plus.playing .s-st3{animation-name:k-hwbmu-strong-block-plus-st3}
.anim .sc-hwbmu-strong-block-plus.playing .s-film{animation-name:k-hwbmu-strong-block-plus-filmOp,k-hwbmu-strong-block-plus-march;animation-duration:var(--T),1s}
.anim .sc-hwbmu-strong-block-plus.playing .s-okc{animation-name:k-hwbmu-strong-block-plus-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}
.anim .sc-hwbmu-strong-block-plus.playing .s-sun{animation-name:k-hwbmu-strong-block-plus-spin;animation-duration:14s}
.anim .sc-hwbmu-strong-block-plus.playing .s-evb{animation-name:k-hwbmu-strong-block-plus-evapb;animation-delay:var(--ed)}
.anim .sc-hwbmu-strong-block-plus.playing .s-bw-p{animation-name:k-hwbmu-strong-block-plus-bwp}
.anim .sc-hwbmu-strong-block-plus.playing .s-plusc{animation-name:k-hwbmu-strong-block-plus-cureP}
.sc-hwbmu-strong-block-plus .s-blk{fill:var(--conc);stroke:rgba(0,0,0,.35);stroke-width:1.6}
.anim .sc-hwbmu-strong-block-plus.playing .s-st1 .disc{animation-name:k-hwbmu-strong-block-plus-st1-disc}
.anim .sc-hwbmu-strong-block-plus.playing .s-st2 .disc{animation-name:k-hwbmu-strong-block-plus-st2-disc}
.anim .sc-hwbmu-strong-block-plus.playing .s-st3 .disc{animation-name:k-hwbmu-strong-block-plus-st3-disc}
@keyframes k-hwbmu-strong-block-plus-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hwbmu-strong-block-plus-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hwbmu-strong-block-plus-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hwbmu-strong-block-plus-filmOp{0%,3%{opacity:0}12%,97%{opacity:1}100%{opacity:0}}
@keyframes k-hwbmu-strong-block-plus-march{to{stroke-dashoffset:-20}}
@keyframes k-hwbmu-strong-block-plus-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}
@keyframes k-hwbmu-strong-block-plus-spin{to{transform:rotate(360deg)}}
@keyframes k-hwbmu-strong-block-plus-evapb{0%,34%{opacity:0;transform:translateY(8px)}40%{opacity:.8;transform:translateY(0)}46%{opacity:0;transform:translateY(4px)}52%{opacity:.8;transform:translateY(0)}58%,100%{opacity:0;transform:translateY(4px)}}
@keyframes k-hwbmu-strong-block-plus-bwp{0%,62%{opacity:.42}86%,97%{opacity:.22}100%{opacity:.5}}
@keyframes k-hwbmu-strong-block-plus-cureP{0%,64%{opacity:0}86%,97%{opacity:.38}100%{opacity:0}}
@keyframes k-hwbmu-strong-block-plus-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}
@keyframes k-hwbmu-strong-block-plus-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}
@keyframes k-hwbmu-strong-block-plus-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}`;
const PLUS_BLOCK_SVG = `<svg class="s-cs-svg" viewBox="0 0 340 190"><g class="s-sun"><circle cx="300" cy="34" r="12"></circle><line x1="300" y1="14" x2="300" y2="8" transform="rotate(0 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(45 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(90 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(135 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(180 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(225 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(270 300 34)"></line><line x1="300" y1="14" x2="300" y2="8" transform="rotate(315 300 34)"></line></g><rect class="s-blk" x="40" y="80" width="250" height="90" rx="3"></rect>
<rect class="s-w s-bw-p" x="42" y="82" width="246" height="86"></rect>
<rect class="s-cure s-plusc" x="40" y="80" width="250" height="90" rx="3"></rect>
<rect class="s-film s-pluss" x="37" y="77" width="256" height="96" rx="5"></rect>
<path class="s-evb" style="--ed:0.00s" d="M90 76 q5 -6 0 -12 q-5 -6 0 -12"></path><path class="s-evb" style="--ed:0.35s" d="M165 76 q5 -6 0 -12 q-5 -6 0 -12"></path><path class="s-evb" style="--ed:0.70s" d="M240 76 q5 -6 0 -12 q-5 -6 0 -12"></path><path class="s-evb" style="--ed:1.05s" d="M125 76 q5 -6 0 -12 q-5 -6 0 -12"></path><path class="s-evb" style="--ed:1.40s" d="M205 76 q5 -6 0 -12 q-5 -6 0 -12"></path>
<g class="s-okc s-plusok"><circle cx="165" cy="125" r="12"></circle><path d="M158.5 125.5l4.5 4.5 9-9.5"></path></g>
<text class="s-lbl" x="40" y="186">no sprinkling</text>
</svg>`;

module.exports = {
  productName: 'HW990 / HW991 Strong Block',
  productDescription: 'High-Performance Liquid Admixture for Manufacturing Blocks (HW990) and Accelerator Liquid Admixture for Manufacturing Blocks (HW991)',
  topicDescription: 'Strong Block’s two tiers (Plus / Accelerator), its RRDC accelerating-vs-competitors trial data, cement-agnostic strength lift, self-curing mechanism, dosage by block type, and when to sell which tier.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image', title: 'Strong Block', data: {
        text: 'Liquid admixture for block making that works with every cement. Strong Block Plus adds self-curing for paver and solid blocks; Strong Block Accelerator is tuned for early strength. Packs of 230 kg and 50 kg.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/strong-block-plus.webp'],
        caption: 'Strong Block Plus (HW990) and Strong Block Accelerator (HW991)',
        key: 'HW990 / HW991 · Liquid Admixture for Manufacturing Blocks',
      },
    },
    {
      type: 'card', title: 'Strong Block: Two Tiers', data: {
        text: 'Liquid admixture for block making. Works with all cements. Packs of 230 kg and 50 kg.',
        table: {
          headers: ['Feature', 'Plus (HW 990 premium)', 'Accelerator (HW 991 value)'],
          rows: [
            ['High early strength', 'Yes', 'Yes'],
            ['Faster demoulding', 'Yes', 'Yes'],
            ['Nil edge breakage', 'Yes', 'Yes'],
            ['Dry at demoulding', 'Yes', 'Yes'],
            ['No retardation', 'Yes', 'Yes'],
            ['Self-curing (paver, solid)', 'Yes', 'No'],
            ['Enhanced durability', 'Yes', 'Optimised'],
          ],
        },
        sections: [
          { label: 'Sell Plus to', text: 'All block units · Premium and durability-critical work · Solid block and paver units, where self-curing counts · Units on high-end competitor products such as Sika ViscoCrete' },
          { label: 'Sell Accelerator to', text: 'Price-sensitive units · Units not taking Plus · Units on local admixtures (Sunproof, Peacock) · Units on low-range popular brands (Sika Plast)' },
        ],
        explain: 'Early strength: Accelerator matches Plus.',
      },
    },
    {
      type: 'card', title: 'At 12 Hours, Competitors Retard. Strong Block Accelerates.', data: {
        text: 'Early strength against the same mix with no admixture, all on RSF.',
        stats: [
          { value: '−16.5%', label: 'Retarding effect', sub: 'Competitor admixtures slow early setting. 9 of 10 lose 12-hour strength; the best barely moves (+0.4%).' },
          { value: '+9.1%', label: 'Accelerating effect', sub: 'Strong Block speeds up early strength, so blocks are ready to demould on time.' },
        ],
        gauges: [
          { label: 'Strong Block', sub: 'Dosage 0.45%', valuePct: 100, result: '+9.1%', highlight: true, showDot: false },
          { label: 'Resikon Betendor 11W', sub: 'Dosage 0.40%', valuePct: 66.0, result: '+0.4%', highlight: false, showDot: false },
          { label: 'Cera CT10', sub: 'Dosage 0.35%', valuePct: 61.3, result: '−0.8%', highlight: false, showDot: false },
          { label: 'Nerolac Perma', sub: 'Dosage 0.80%', valuePct: 56.3, result: '−2.1%', highlight: false, showDot: false },
          { label: 'Sika Plast 1000 ES', sub: 'Dosage 0.35%', valuePct: 54.7, result: '−2.5%', highlight: false, showDot: false },
          { label: 'Bond Plus + Resikon 11W', sub: 'Dosage 0.44%', valuePct: 54.7, result: '−2.5%', highlight: false, showDot: false },
          { label: 'Rock Romante', sub: 'Dosage 0.72%', valuePct: 51.6, result: '−3.3%', highlight: false, showDot: false },
          { label: 'Chemcon', sub: 'Dosage 0.57%', valuePct: 32.0, result: '−8.3%', highlight: false, showDot: false },
          { label: 'Sika Plastocrete Plus', sub: 'Dosage 0.40%', valuePct: 30.5, result: '−8.7%', highlight: false, showDot: false },
          { label: 'Sika ViscoCrete 20 HE', sub: 'Dosage 0.40%', valuePct: 27.3, result: '−9.5%', highlight: false, showDot: false },
          { label: 'Sun Proof', sub: 'Dosage 0.55%', valuePct: 0, result: '−16.5%', highlight: false, showDot: false },
        ],
        explain: 'RRDC paver trial on RSF at 12 hours. The reference’s own chart also lets you switch to 1-day/7-day/28-day views via a 4-way tab toggle — reproduced here as the headline 12-hour dataset only (the step’s own title and framing), since the Portal’s gauges field has no tab-switch mechanism; the other three ages are not reproduced. Dosage as used in the trial is shown under each brand.',
      },
    },
    {
      type: 'card', title: 'It Lifts Any Cement', data: {
        text: 'A way into units that won’t switch cement yet. The weaker the cement, the bigger the lift.',
        stats: [
          { value: '+20.5%', label: '1-day strength gain', sub: 'On the weakest cement tested' },
        ],
        gauges: [
          { label: 'Ramco Super Fast', sub: '1-day gain', valuePct: 26, result: '+5.4%', highlight: false, showDot: false },
          { label: 'Cement N', sub: '1-day gain', valuePct: 29, result: '+6.0%', highlight: false, showDot: false },
          { label: 'Cement D1', sub: '1-day gain', valuePct: 100, result: '+20.5%', highlight: true, showDot: false },
          { label: 'Cement D2', sub: '1-day gain', valuePct: 47, result: '+9.7%', highlight: false, showDot: false },
          { label: 'Cement C', sub: '1-day gain', valuePct: 40, result: '+8.1%', highlight: false, showDot: false },
        ],
        explain: 'RRDC paver trial, same mix with and without Strong Block. Cements coded. Edge Breakage, Before and After: intact edges after the gain, broken edges without it.',
      },
    },
    {
      type: 'svg', title: 'Self-Curing, Explained', data: {
        text: 'Cement needs water to keep gaining strength. The question is whether the block can hold on to it.',
        svgMarkup: svgCards([
          svgCard({ title: 'Normal block', style: NORMAL_BLOCK_STYLE, svg: NORMAL_BLOCK_SVG, verdict: 'bad' }),
          svgCard({ title: 'Strong Block Plus', style: PLUS_BLOCK_STYLE, svg: PLUS_BLOCK_SVG, verdict: 'ok' }),
        ]),
        sections: [
          { label: 'What it is', text: 'The block keeps its own mixing water and keeps gaining strength.' },
          { label: 'Why it matters', text: 'Yard curing is irregular. Dry blocks get dusty surfaces and weak edges.' },
          { label: 'Customer gain', text: 'Saves water, labour and yard time. Strength no longer depends on watering.' },
        ],
      },
    },
    {
      type: 'card', title: 'How to Dose It', data: {
        text: 'By weight of cement. Same for Plus and Accelerator.',
        tableRows: [
          { label: 'Paver blocks — wearing layer', value: '0.2%' },
          { label: 'Paver blocks — backing layer', value: '0.6% (Accelerator: up to 0.8% for higher early strength)' },
          { label: 'Hollow and solid blocks', value: '0.6% — about 300 ml per 50 kg bag' },
          { label: 'Fly ash bricks', value: '0.4% — about 200 ml per 50 kg bag' },
        ],
        steps: [
          { title: 'Measure', desc: 'Dose by cement weight.' },
          { title: 'Pre-dilute', desc: 'In 5–10% of the mixing water.' },
          { title: 'Add', desc: 'With the rest of the gauging water.' },
        ],
        explain: 'Never add to the dry mix. Confirm the final dose with a plant trial.',
      },
    },
    {
      type: 'knowledge', title: 'Knowledge Check — Hollow Block Dosage', data: {
        text: 'A hollow block unit asks how much Strong Block to use per 50 kg bag of cement. What do you tell them?',
        list: [
          '0.2% of cement weight, about 100 ml',
          '0.4% of cement weight, about 200 ml',
          '0.6% of cement weight, about 300 ml',
          '0.8% of cement weight, about 400 ml',
        ],
        correctIndex: 2,
        explain: 'Hollow and solid blocks dose at 0.6% of cement weight — about 300 ml per 50 kg bag.',
      },
    },
    {
      type: 'knowledge', title: 'Scenario: On Site — The Retarded Mix', data: {
        text: 'A paver unit uses a competitor admixture. At demoulding the blocks are weak at 12 hours and edges break. The owner thinks all admixtures behave the same. What do you pitch?',
        list: [
          'Strong Block: at 12 hours most competitor admixtures retard while Strong Block accelerates, so blocks demould clean and strong',
          'A slower demoulding cycle',
          'More water in the mix',
          'A thicker block',
        ],
        correctIndex: 0,
        explain: 'Most competitor admixtures retard at 12 hours; Strong Block accelerates instead, so blocks demould clean and strong on the normal cycle.',
      },
    },
    {
      type: 'card', title: 'Cheat Sheet', data: {
        text: 'Check it before a visit.',
        sections: [
          { label: 'What it is', text: 'Liquid admixture for block making, in a premium tier (Plus) and a value tier (Accelerator).' },
          { label: 'Key features', text: 'Faster demoulding, no retardation. Nil edge breakage, dry at demould. Plus only: self-curing (paver and solid) and enhanced durability.' },
          { label: 'Against competitors', text: '+9.1% at 12 hours, while 9 of 10 competitor admixtures lose strength, down to −16.5% (Sun Proof).' },
          { label: 'Customer benefit', text: 'More sellable blocks per day; lifts any cement, up to +20.5% at 1 day; Plus saves curing water, labour and yard time.' },
          { label: 'How to use', text: 'Paver 0.2% wearing, 0.6% backing. Hollow and solid 0.6% (about 300 ml per 50 kg). Fly ash 0.4%. Pre-dilute in 5–10% of the mixing water; never on dry mix. Packs 230 kg and 50 kg.' },
          { label: 'Sell to', text: 'Plus: all units, premium work, solid and paver units, Sika ViscoCrete users. Accelerator: price-sensitive units, Sunproof, Peacock and Sika Plast users.' },
        ],
        explain: 'RRDC trial data. Figures are specific to RRDC mix designs and raw materials and will vary at each unit; confirm dosages with plant trials. Competitor cements are coded. HW/CCD/TRN/01',
      },
    },
  ],
};
