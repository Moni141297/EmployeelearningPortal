const { cureCardConventional, cureCardBlockFix } = require('../lib/blockFixDiagrams');
const { svgCard, svgCards } = require('../lib/svgCard');

const SITE_VS_FACTORY_STYLE = `.sc-hw301-batches .s-bcol h3{color:inherit}
.sc-hw301-batches .s-bmix{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px}
.sc-hw301-batches .s-bcol{background:var(--soft);border-radius:14px;padding:14px 16px}
.sc-hw301-batches .s-h3{font-size:22px;margin-bottom:4px;font-weight:600}
.sc-hw301-batches .s-bcol.s-bad .s-h3{color:var(--neg)}
.sc-hw301-batches .s-bcol.s-good .s-h3{color:var(--pc)}
.sc-hw301-batches .s-bcol .s-bs{font-size:13.5px;color:var(--ink-2);margin:0 0 12px}
.sc-hw301-batches .s-bt{display:grid;grid-template-columns:60px minmax(0,1fr) 20px;gap:8px;align-items:center;font-size:13px;color:var(--ink-2);margin-bottom:7px}
.sc-hw301-batches .s-bbar{display:flex;height:20px;border-radius:4px;overflow:hidden;background:#bdbdbd}
.sc-hw301-batches .s-bbar .s-c{background:#959595;width:var(--c)}
.sc-hw301-batches .s-bbar .s-s{background:#bdbdbd;flex:1}
.sc-hw301-batches .s-bbar .s-x{background:#757575;width:var(--x)}
.sc-hw301-batches .s-bbar .s-a{background:var(--ok);width:5%}
.sc-hw301-batches .s-bt .s-mk{font-weight:600;text-align:center}
.sc-hw301-batches .s-bcol.s-bad .s-mk{color:var(--neg)}
.sc-hw301-batches .s-bcol.s-good .s-mk{color:var(--pc)}
.sc-hw301-batches .s-bcol ol{margin:12px 0 0;padding-left:18px;font-size:15px;list-style:disc}
.sc-hw301-batches .s-bcol ol li{margin:3px 0}
.anim .sc-hw301-batches.playing .s-bcol.s-bad .s-c{animation:k-hw301-batches-wob 2.8s ease-in-out var(--wd,0s) infinite}
.anim .sc-hw301-batches.playing .s-bcol.s-bad .s-x{animation:k-hw301-batches-wobx 3.4s ease-in-out var(--wd,0s) infinite}
.anim .sc-hw301-batches .s-bt{transition:opacity .45s ease var(--d,0s),transform .6s cubic-bezier(.2,.7,.2,1) var(--d,0s)}
.anim .sc-hw301-batches:not(.playing) .s-bt{opacity:0;transform:translateX(-14px)}
@media (max-width: 640px){.sc-hw301-batches .s-bmix{grid-template-columns:minmax(0,1fr)}}
@keyframes k-hw301-batches-wob{0%,100%{width:var(--c)}50%{width:var(--c2)}}
@keyframes k-hw301-batches-wobx{0%,100%{width:var(--x)}50%{width:var(--x2)}}
.sc-hw301-batches .s-blg{display:flex;gap:14px;flex-wrap:wrap;font-size:13px;color:var(--ink-2);margin-top:12px}
.sc-hw301-batches .s-blg .s-ic{display:inline-block;width:11px;height:11px;border-radius:2px;margin-right:5px;vertical-align:-1px}`;

const SITE_VS_FACTORY_SVG = `<div class="s-bmix">
  <div class="s-bcol s-bad">
    <div class="s-h3">Site-mixed mortar</div>
    <div class="s-bs">Cement and sand measured in head pans</div>
    <div class="s-bt"><span>Batch 1</span><div class="s-bbar"><span class="s-c" style="--c:15%;--c2:21%;--wd:0s"></span><span class="s-s"></span><span class="s-x" style="--x:6%;--x2:12%;--wd:0s"></span></div><span class="s-mk">?</span></div>
    <div class="s-bt"><span>Batch 2</span><div class="s-bbar"><span class="s-c" style="--c:21%;--c2:12%;--wd:.4s"></span><span class="s-s"></span><span class="s-x" style="--x:10%;--x2:3%;--wd:.4s"></span></div><span class="s-mk">?</span></div>
    <div class="s-bt"><span>Batch 3</span><div class="s-bbar"><span class="s-c" style="--c:11%;--c2:18%;--wd:.9s"></span><span class="s-s"></span><span class="s-x" style="--x:4%;--x2:11%;--wd:.9s"></span></div><span class="s-mk">?</span></div>
    <div class="s-bt"><span>Batch 4</span><div class="s-bbar"><span class="s-c" style="--c:18%;--c2:13%;--wd:1.3s"></span><span class="s-s"></span><span class="s-x" style="--x:13%;--x2:5%;--wd:1.3s"></span></div><span class="s-mk">?</span></div>
    <ol>
      <li>Ratio changes from batch to batch</li>
      <li>Unwashed sand can bring silt and clay</li>
      <li>Needs space, labour and time to batch</li>
    </ol>
  </div>
  <div class="s-bcol s-good">
    <div class="s-h3">Block Fix HW 301</div>
    <div class="s-bs">Blended in the factory, with graded sand</div>
    <div class="s-bt"><span>Bag 1</span><div class="s-bbar"><span class="s-c" style="width:17%"></span><span class="s-s"></span><span class="s-a"></span></div><span class="s-mk">✓</span></div>
    <div class="s-bt"><span>Bag 2</span><div class="s-bbar"><span class="s-c" style="width:17%"></span><span class="s-s"></span><span class="s-a"></span></div><span class="s-mk">✓</span></div>
    <div class="s-bt"><span>Bag 3</span><div class="s-bbar"><span class="s-c" style="width:17%"></span><span class="s-s"></span><span class="s-a"></span></div><span class="s-mk">✓</span></div>
    <div class="s-bt"><span>Bag 4</span><div class="s-bbar"><span class="s-c" style="width:17%"></span><span class="s-s"></span><span class="s-a"></span></div><span class="s-mk">✓</span></div>
    <ol>
      <li>Uniform quality in every bag</li>
      <li>No on-site batching. Just add water</li>
      <li>Self-curing saves water and simplifies site work</li>
    </ol>
  </div>
</div>`;

const BATCH_LEGEND = `<div class="s-blg"><span><span class="s-ic" style="background:#959595"></span>Cement</span><span><span class="s-ic" style="background:#bdbdbd"></span>Sand</span><span><span class="s-ic" style="background:#757575"></span>Silt and clay</span><span><span class="s-ic" style="background:var(--ok)"></span>Performance additives</span></div>`;

const ORDINARY_VS_HW_STYLE = `.sc-hw301-ordinary-vs-hw .s-cs-svg{width:100%;height:auto;display:block}
.sc-hw301-ordinary-vs-hw .s-blk{fill:var(--cblk)}
.sc-hw301-ordinary-vs-hw .s-mor{fill:var(--cmor)}
.anim .sc-hw301-ordinary-vs-hw.playing .s-st1{animation-name:k-hw301-ordinary-vs-hw-st1}
.anim .sc-hw301-ordinary-vs-hw.playing .s-st2{animation-name:k-hw301-ordinary-vs-hw-st2}
.anim .sc-hw301-ordinary-vs-hw.playing .s-st3{animation-name:k-hw301-ordinary-vs-hw-st3}
.sc-hw301-ordinary-vs-hw .s-jfix{fill:color-mix(in srgb,var(--ok) 55%,var(--cmor))}
.sc-hw301-ordinary-vs-hw .s-sck{fill:none;stroke:#242424;stroke-width:2.8;stroke-linecap:round;stroke-linejoin:round}
.sc-hw301-ordinary-vs-hw .s-blk{fill:var(--conc);stroke-width:1.6;paint-order:fill}
.sc-hw301-ordinary-vs-hw .s-mor{fill:var(--cmor)}
.sc-hw301-ordinary-vs-hw .s-gapo2{fill:#252525}
.sc-hw301-ordinary-vs-hw .s-chipm{fill:#3f3f3f;stroke:rgba(0,0,0,.4);stroke-width:.8}
.sc-hw301-ordinary-vs-hw .s-awstain{transform-box:fill-box;transform-origin:50% 70%}
.sc-hw301-ordinary-vs-hw .s-salt2{fill:#fff;opacity:.95;transform-box:fill-box;transform-origin:50% 50%}
.sc-hw301-ordinary-vs-hw .s-haze2{fill:#fff;opacity:.16}
.sc-hw301-ordinary-vs-hw .s-recess2{fill:#000;opacity:.28}
.sc-hw301-ordinary-vs-hw .s-crm2{fill:var(--cmor);opacity:0}
.sc-hw301-ordinary-vs-hw .s-dcrk2{fill:none;stroke:var(--crack);stroke-width:2.2;stroke-linejoin:round;stroke-linecap:round;stroke-dasharray:300;stroke-dashoffset:0}
.sc-hw301-ordinary-vs-hw .s-sheen{fill:#fff;opacity:0;transform:skewX(-20deg)}
.sc-hw301-ordinary-vs-hw .s-awglow{fill:none;stroke:var(--gold);stroke-width:3}
.sc-hw301-ordinary-vs-hw .s-sh3 path:first-child{fill:var(--gold);filter:drop-shadow(0 3px 6px rgba(0,0,0,.35))}
.sc-hw301-ordinary-vs-hw .s-sh3{transform-box:fill-box;transform-origin:50% 50%}
.sc-hw301-ordinary-vs-hw .s-cloud{fill:#a5a5a5}
.sc-hw301-ordinary-vs-hw .s-awr{stroke:var(--water);stroke-width:2.2;stroke-linecap:round;opacity:0}
.sc-hw301-ordinary-vs-hw .s-tltr{stroke:var(--rule);stroke-width:3;stroke-linecap:round}
.sc-hw301-ordinary-vs-hw .s-tlp{fill:var(--paper);stroke:var(--ink-2);stroke-width:2}
.sc-hw301-ordinary-vs-hw .s-tlm{fill:var(--gold);stroke:#242424;stroke-width:1.5}
.sc-hw301-ordinary-vs-hw .s-tlx{font:600 10.5px var(--font-sans);fill:var(--ink)}
.sc-hw301-ordinary-vs-hw .s-awS{font:600 9px var(--font-sans);fill:var(--ink-2)}
.sc-hw301-ordinary-vs-hw .s-awT{font:600 11.5px var(--font-sans);fill:var(--ink)}
.sc-hw301-ordinary-vs-hw .s-awT.s-hw{fill:var(--ok)}
.sc-hw301-ordinary-vs-hw .s-vbad2{fill:var(--neg)}
.sc-hw301-ordinary-vs-hw .s-vgood2{fill:var(--ok)}
.sc-hw301-ordinary-vs-hw .s-vT{font:600 10px var(--font-sans);fill:#fff}
.anim .sc-hw301-ordinary-vs-hw.playing .s-awr{animation-name:k-hw301-ordinary-vs-hw-awRain;animation-delay:var(--rd);animation-duration:1.1s;animation-timing-function:linear}
.anim .sc-hw301-ordinary-vs-hw.playing .s-salt2{animation-name:k-hw301-ordinary-vs-hw-awSalt;animation-delay:var(--sd);animation-timing-function:cubic-bezier(.3,1.5,.5,1)}
.anim .sc-hw301-ordinary-vs-hw.playing .s-crm2{animation-name:k-hw301-ordinary-vs-hw-awCrm;animation-delay:var(--cd);animation-timing-function:cubic-bezier(.5,0,.9,.6)}
.anim .sc-hw301-ordinary-vs-hw.playing .s-x1{animation-name:k-hw301-ordinary-vs-hw-awx1}
.anim .sc-hw301-ordinary-vs-hw.playing .s-p1{animation-name:k-hw301-ordinary-vs-hw-awx1}
.anim .sc-hw301-ordinary-vs-hw.playing .s-x2{animation-name:k-hw301-ordinary-vs-hw-awx2}
.anim .sc-hw301-ordinary-vs-hw.playing .s-p2{animation-name:k-hw301-ordinary-vs-hw-awx2}
.anim .sc-hw301-ordinary-vs-hw.playing .s-x3{animation-name:k-hw301-ordinary-vs-hw-awx3}
.anim .sc-hw301-ordinary-vs-hw.playing .s-p3{animation-name:k-hw301-ordinary-vs-hw-awx3}
@keyframes k-hw301-ordinary-vs-hw-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}
@keyframes k-hw301-ordinary-vs-hw-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}
@keyframes k-hw301-ordinary-vs-hw-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}
@keyframes k-hw301-ordinary-vs-hw-awRain{0%{opacity:0;transform:none}10%{opacity:.9}100%{opacity:0;transform:translateY(60px)}}
@keyframes k-hw301-ordinary-vs-hw-awSalt{0%,46%{transform:scale(0)}56%,100%{transform:scale(1)}}
@keyframes k-hw301-ordinary-vs-hw-awCrm{0%,58%{opacity:0;transform:none}61%{opacity:1}74%,100%{opacity:0;transform:translateY(60px)}}
@keyframes k-hw301-ordinary-vs-hw-awx1{0%{opacity:1}0.1%{opacity:1}1.0%,20.0%{opacity:1}22.0%,100%{opacity:1}}
@keyframes k-hw301-ordinary-vs-hw-awx2{0%{opacity:0.35}19.0%{opacity:0.35}22.0%,50.0%{opacity:1}52.0%,100%{opacity:0.35}}
@keyframes k-hw301-ordinary-vs-hw-awx3{0%{opacity:0.35}49.0%{opacity:0.35}52.0%,97.0%{opacity:1}99.0%,100%{opacity:0.35}}`;

const ORDINARY_VS_HW_SVG = `<svg class="s-cs-svg" viewBox="0 0 340 314"><clipPath id="hw301-awcl"><rect x="0" y="0" width="150" height="168" rx="3"></rect></clipPath><g class="s-tl3"><line class="s-tltr" x1="30" y1="16" x2="310" y2="16"></line>
<circle class="s-tlp s-p1" cx="30" cy="16" r="5"></circle><circle class="s-tlp s-p2" cx="170" cy="16" r="5"></circle><circle class="s-tlp s-p3" cx="310" cy="16" r="5"></circle>
<text class="s-tlx s-x1" x="30" y="34" text-anchor="start">Built</text><text class="s-tlx s-x2" x="170" y="34" text-anchor="middle">Rain and sun</text><text class="s-tlx s-x3" x="310" y="34" text-anchor="end">Years later</text>
</g><g id="hw301-awCloud"><path class="s-cloud" d="M32 62 q4 -14 18 -10 q8 -12 22 -4 q14 -4 16 10 z"></path><path class="s-cloud" d="M96 60 q5 -13 18 -9 q9 -11 22 -2 q13 -3 14 11 z"></path><path class="s-cloud" d="M192 61 q4 -14 18 -10 q8 -12 22 -4 q14 -4 16 10 z"></path><path class="s-cloud" d="M258 60 q5 -13 18 -9 q9 -11 22 -2 q13 -3 14 11 z"></path></g><line class="s-awr" style="--rd:0.35s" x1="18" y1="64" x2="14" y2="74"></line><line class="s-awr" style="--rd:0.28s" x1="28" y1="64" x2="24" y2="74"></line><line class="s-awr" style="--rd:0.81s" x1="38" y1="64" x2="34" y2="74"></line><g transform="translate(12 78)"><g clip-path="url(#hw301-awcl)"><rect class="s-mor" x="0" y="0" width="150" height="168"></rect><rect class="s-blk" x="0.0" y="0" width="44.0" height="22" rx="1.5"></rect><rect class="s-blk" x="50.0" y="0" width="44.0" height="22" rx="1.5"></rect><rect class="s-blk" x="100.0" y="0" width="44.0" height="22" rx="1.5"></rect><rect class="s-blk" x="0.0" y="28" width="19.0" height="22" rx="1.5"></rect><rect class="s-blk" x="25.0" y="28" width="44.0" height="22" rx="1.5"></rect><rect class="s-blk" x="75.0" y="28" width="44.0" height="22" rx="1.5"></rect><rect class="s-blk" x="125.0" y="28" width="25.0" height="22" rx="1.5"></rect><rect id="hw301-awGap" class="s-gapo2" x="23.5" y="82.5" width="47.0" height="25" rx="2"></rect><rect id="hw301-awLoose" class="s-blk" x="25.0" y="84" width="44.0" height="22" rx="1.5"></rect><polygon class="s-chipm" points="110.0,28 119.0,28 119.0,36"></polygon><defs><radialGradient id="hw301-awdg" cx="50%" cy="60%" r="60%"><stop offset="0" stop-color="var(--dampc)" stop-opacity=".7"></stop><stop offset="1" stop-color="var(--dampc)" stop-opacity="0"></stop></radialGradient></defs><ellipse id="hw301-awDamp" class="s-awstain" cx="62" cy="128" rx="62" ry="40" fill="url(#hw301-awdg)"></ellipse><g id="hw301-awEflo"><rect class="s-haze2" x="0" y="111" width="150" height="12"></rect><rect class="s-haze2" x="0" y="139" width="150" height="12"></rect><circle class="s-salt2" style="--sd:0.20s" cx="101.9" cy="109.5" r="2.3"></circle></g><rect id="hw301-awRec" class="s-recess2" x="0" y="51" width="150" height="4"></rect><path id="hw301-awCrack" class="s-dcrk2" d="M47 0 V25 H72 V53 H97 V81 H72 V109 H97 V137 H122 V168"></path></g></g><g transform="translate(178 78)"><g clip-path="url(#hw301-awcl)"><rect class="s-jfix" x="0" y="0" width="150" height="168"></rect><rect class="s-blk" x="0.0" y="0" width="44.0" height="22" rx="1.5"></rect><rect class="s-blk" x="50.0" y="0" width="44.0" height="22" rx="1.5"></rect><rect class="s-blk" x="100.0" y="0" width="44.0" height="22" rx="1.5"></rect><rect id="hw301-awSheen" class="s-sheen" x="-60" y="0" width="40" height="168"></rect></g><rect id="hw301-awGlow" class="s-awglow" x="-1.5" y="-1.5" width="153" height="171" rx="4"></rect><g id="hw301-awShield" class="s-sh3"><path d="M75 60 l24 -9 l24 9 v16 c0 15 -11 25 -24 30 c-13 -5 -24 -15 -24 -30z"></path><path class="s-sck" d="M63 79 l7 7 l13 -13.5" transform="translate(24 0)"></path></g></g><text class="s-awT" x="87.0" y="264" text-anchor="middle">Ordinary wall</text><text class="s-awS" x="87.0" y="277" text-anchor="middle">weak block + site mortar</text>
<text class="s-awT s-hw" x="253.0" y="264" text-anchor="middle">Hard Worker wall</text><text class="s-awS" x="253.0" y="277" text-anchor="middle">RSF + Strong Block + Block Fix</text>
<g id="hw301-awV1"><rect class="s-vbad2" x="16" y="286" width="142" height="22" rx="11"></rect><text class="s-vT" x="87.0" y="301" text-anchor="middle">Cracked, damp, loose</text></g>
<g id="hw301-awV2"><rect class="s-vgood2" x="182" y="286" width="142" height="22" rx="11"></rect><text class="s-vT" x="253.0" y="301" text-anchor="middle">Sound and durable</text></g></svg>`;

const ORDINARY_VS_HW_OL = `<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Built: the ordinary wall already has chipped blocks from weak early strength</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Rain and sun: water soaks into porous, uncured joints, then dries out as damp and white salts</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Years later: cracks run through the joints, mortar crumbles, blocks work loose. Stronger blocks and self-cured joints keep the HW wall sound.</span></li></ol>`;

const MASONRY_COVERAGE = [
  { label: 'Solid block (4 inch)', minCoveragePerUnit: 41, maxCoveragePerUnit: 42 },
  { label: 'Laterite block (6 inch)', minCoveragePerUnit: 34, maxCoveragePerUnit: 35 },
  { label: 'Solid block (6 inch)', minCoveragePerUnit: 27, maxCoveragePerUnit: 28 },
  { label: 'Solid block (8 inch)', minCoveragePerUnit: 20, maxCoveragePerUnit: 21 },
  { label: 'Red brick', minCoveragePerUnit: 15, maxCoveragePerUnit: 16 },
  { label: 'Fly ash brick', minCoveragePerUnit: 15, maxCoveragePerUnit: 16 },
];

module.exports = {
  productName: 'HW301 Block Fix',
  productDescription: 'Polymer-modified masonry mortar for laying bricks, concrete and laterite blocks',
  topicDescription: 'Where Block Fix HW301 is used, why self-curing matters in a mortar joint, its strength and bond data, how much wall one 40 kg bag covers, how to mix and lay it, and how it compares with conventional site-mixed mortar.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image', title: 'Block Fix', data: {
        text: 'Ready-to-use, polymer-modified masonry mortar with cement, graded sand and additives inside. Just add water.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/block-fix-hw301.webp'],
        caption: 'Block Fix HW301',
        key: 'HW301',
      },
    },
    {
      type: 'text', title: 'Block Fix HW 301', data: {
        text: 'Polymer-modified dry mix mortar. Cement, graded sand and additives are already blended in the bag. Just add clean water. HW301 (1 bag, 40 kg) + 16–18% water = Ready mortar.',
        badges: [
          { icon: '🧴', label: 'Self-curing', sub: 'No water curing needed', tone: 'neutral' },
          { icon: '🏭', label: 'Factory-blended', sub: 'Uniform quality in every bag', tone: 'neutral' },
          { icon: '🧱', label: '6–7 MPa', sub: 'Compressive strength at 28 days', tone: 'neutral' },
          { icon: '🤲', label: 'Excellent workability', sub: 'Use within 60 min of mixing', tone: 'neutral' },
          { icon: '🧰', label: 'Bricks and blocks', sub: 'Red, fly ash, solid, laterite. Not AAC', tone: 'neutral' },
          { icon: '📦', label: '40 kg bag', sub: '6 months shelf life, stored dry', tone: 'neutral' },
        ],
      },
    },
    {
      type: 'svg', title: 'Same Mix, Every Bag', data: {
        text: "On site, every batch of mortar comes out a little different. Block Fix HW 301 is blended in the factory, so every bag is the same. Illustration of the concept. Proportions are not to scale.",
        svgMarkup: `<style>${SITE_VS_FACTORY_STYLE}</style><div class="svg-anim anim sc-hw301-batches playing" style="--T:9s">${SITE_VS_FACTORY_SVG}${BATCH_LEGEND}</div>`,
      },
    },
    {
      type: 'knowledge', title: 'Knowledge Check — Masonry Units', data: {
        text: 'Which block type is HW301 NOT designed for?',
        list: ['Red bricks', 'Fly ash bricks', 'AAC blocks', 'Laterite blocks'],
        correctIndex: 2,
        explain: 'HW301 is for red bricks, fly ash bricks, solid concrete blocks and laterite blocks — not AAC, which needs a different, thin-bed adhesive (HW302).',
      },
    },
    {
      type: 'svg', title: "You Can't Cure a Joint from Outside", data: {
        text: "Curing water only reaches the face of a mortar joint. What happens inside depends on the mortar itself. Illustration of the mechanism. This is why self-curing matters more in a joint than anywhere else on site.",
        svgMarkup: svgCards([
          svgCard({ title: 'Conventional mortar', style: cureCardConventional.style, svg: cureCardConventional.svg, ol: cureCardConventional.ol, durationSec: 9 }).replace('class="svg-anim anim playing"', `class="svg-anim anim ${cureCardConventional.scopeClass} playing"`),
          svgCard({ title: 'Block Fix HW 301', style: cureCardBlockFix.style, svg: cureCardBlockFix.svg, ol: cureCardBlockFix.ol, durationSec: 9 }).replace('class="svg-anim anim playing"', `class="svg-anim anim ${cureCardBlockFix.scopeClass} playing"`),
        ]),
      },
    },
    {
      type: 'card', title: 'Most Wall Defects Start in the Mortar', data: {
        text: 'Not in the block. Watch how each one develops in an ordinary joint — and how Block Fix helps.',
        badges: [
          { icon: '🧱', label: 'Cracks along joints', sub: 'Poor bond, shrinkage, no curing', tone: 'bad' },
          { icon: '🔓', label: 'Joint separation', sub: 'Weak adhesion to the block', tone: 'bad' },
          { icon: '💨', label: 'Crumbling, powdery mortar', sub: 'Low strength, poor hydration', tone: 'bad' },
          { icon: '🧂', label: 'Efflorescence', sub: 'Excess water, porous mortar', tone: 'bad' },
          { icon: '💧', label: 'Damp patches, seepage', sub: 'Porous or cracked joints', tone: 'bad' },
        ],
        table: {
          headers: ['Visible defect and root cause', 'Can Block Fix help?'],
          rows: [
            ['Cracks along mortar joints — Poor bond, shrinkage, inadequate curing', 'Yes'],
            ['Joint separation (debonding) — Weak adhesion between mortar and block', 'Yes'],
            ['Crumbled or powdery joints — Low-strength mortar, improper hydration', 'Yes'],
            ['Open joints and gaps — Poor workability, joints not filled', 'Yes'],
            ['Loose bricks or blocks — Poor bond strength', 'Yes'],
            ['Mortar erosion, weathering — Weak mortar, inadequate curing', 'Yes'],
            ['Surface dusting of joints — Poor hydration from lack of curing', 'Yes'],
            ['Uneven mortar joints — Inconsistent and improperly graded sand', 'Yes'],
            ['Efflorescence — Excess water, porous mortar, poor curing', 'Better than conventional'],
            ['Damp patches, seepage — Porous or cracked joints', 'Better than conventional'],
          ],
        },
        explanation: 'Self-curing, higher strength and better bond remove the root cause in the mortar itself.',
      },
    },
    {
      type: 'card', title: 'Strong Mortar, Strong Grip', data: {
        text: 'What the joint delivers at 28 days.',
        stats: [
          { value: '6–7 MPa', label: 'Compressive strength', sub: 'at 28 days' },
          { value: '16–18 %', label: 'Water demand', sub: 'about 6.4–7.2 litres per 40 kg bag' },
        ],
        gauges: [
          { label: 'Solid block', sub: 'Split tensile strength', valuePct: 35, result: '0.30–0.35 MPa', highlight: false, showDot: false },
          { label: 'Laterite block', sub: 'Split tensile strength', valuePct: 35, result: '0.30–0.35 MPa', highlight: false, showDot: false },
          { label: 'Red brick', sub: 'Split tensile strength', valuePct: 30, result: '0.25–0.30 MPa', highlight: false, showDot: false },
          { label: 'Fly ash block', sub: 'Split tensile strength', valuePct: 25, result: '0.20–0.25 MPa', highlight: false, showDot: false },
        ],
        explanation: 'All values tested under standard lab conditions.',
      },
    },
    {
      type: 'card', title: 'How Much Wall from One Bag?', data: {
        text: 'Wall area laid with one 40 kg bag, at a 10 mm joint. Thinner units need more joints, so they use more mortar per square foot.',
        table: {
          headers: ['Masonry unit', 'Square feet of wall per 40 kg bag'],
          rows: MASONRY_COVERAGE.map((m) => [m.label, `${m.minCoveragePerUnit}–${m.maxCoveragePerUnit} sq ft`]),
        },
        calc: {
          mode: 'range',
          unitLabel: 'sq ft',
          defaultQty: 1000,
          min: 1,
          max: 1000000,
          units: [{ label: 'sq ft', factor: 1 }, { label: 'm²', factor: 10.7639 }],
          resultLabel: 'bags of Block Fix (40 kg) for {qty} {unit}',
          packOptions: MASONRY_COVERAGE,
          note: 'Multiply bags by 40 kg for the total Block Fix needed. Coverage values tested under standard lab conditions; actual use varies with joint thickness, unit size and site practice.',
        },
      },
    },
    {
      type: 'card', title: 'Add Water, Lay, Done', data: {
        text: 'Four steps on site. No sand to source, no batching, no curing water.',
        steps: [
          { title: 'Prepare', desc: "Clean off dust, oil and loose bits. Pre-wet bricks so they don't suck water from the mortar." },
          { title: 'Mix', desc: 'Turn the powder over 3 times. Add 16–18% water slowly and mix to a smooth, workable paste.' },
          { title: 'Lay', desc: '10–12 mm bed. Use string lines, check plumb, fill every vertical joint.' },
          { title: 'Finish', desc: 'Use within 60 minutes. Clean off excess and finish joints neatly.' },
        ],
        tableRows: [
          { label: 'Mix and lay', value: 'within 60 min' },
          { label: 'Let it set', value: '24 hours' },
          { label: 'Plaster', value: 'after 5–7 days' },
        ],
        explanation: 'Self-curing: no external water curing at any stage after laying. Safety: non-hazardous, but wear gloves, eye protection and a mask. If it gets in the eyes, rinse with clean water.',
      },
    },
    {
      type: 'svg', title: 'Same Wall, Two Ways to Build It', data: {
        text: 'Watch both walls age. The difference is the block and the joint mortar. Illustration of typical masonry failure modes and their causes, as listed in the Block Fix defect table.',
        svgMarkup: `<style>${ORDINARY_VS_HW_STYLE}</style><div class="svg-anim anim sc-hw301-ordinary-vs-hw playing" style="--T:9s">${ORDINARY_VS_HW_SVG}${ORDINARY_VS_HW_OL}</div>`,
      },
    },
    {
      type: 'knowledge', title: 'Scenario: On Site', data: {
        text: 'On site: The Water Hose. You visit a site the day after the crew finished a wall with HW301. A helper is spraying the wall with water every few hours because that is what they always do with mortar. The crew is spraying water on HW301-laid walls after finishing. What will you do?',
        list: ['Continue curing for 3 days', 'Advise stopping: HW301 is self-curing', 'Increase water frequency in hot weather', 'Cure only at night'],
        correctIndex: 1,
        explain: 'HW301 is self-curing — no external water curing is needed. Spraying water on it is unnecessary and should be stopped.',
      },
    },
    {
      type: 'text', title: 'Cheat Sheet', data: {
        text: 'Block Fix HW 301 at a glance. Check it before a visit.',
        sections: [
          { label: 'What it is', text: 'Ready-to-use, polymer-modified dry mix mortar: cement, graded sand and additives. Just add water.' },
          { label: 'Key features', text: 'Self-curing, no water curing. Factory-blended, uniform quality. No on-site batching. Excellent workability.' },
          { label: 'Performance', text: '6–7 MPa compressive strength at 28 days. Split tensile 0.20–0.35 MPa, depending on the unit.' },
          { label: 'Coverage', text: "Per 40 kg bag at 10 mm: red or fly ash brick 15–16 sq ft; solid block 4\" 41–42, 6\" 27–28, 8\" 20–21; laterite 6\" 34–35." },
          { label: 'How to use', text: '16–18% water. 10–12 mm bed. Use within 60 min. Sets in 24 hours. Plaster after 5–7 days.' },
          { label: 'Customer benefit', text: 'No sand to source or batch; the same mortar in every bag; no curing water; fewer joint defects.' },
          { label: 'Sell to', text: 'Residential and commercial sites laying red brick, fly ash brick, concrete, solid or laterite blocks (not AAC).' },
          { label: 'HW 301 or HW 303?', text: 'HW 301 has the sand inside: just add water. HW 303 is the concentrate: mix 1 part with 5–6 parts sand on site.' },
          { label: 'Pack', text: '40 kg bag. Shelf life 6 months from manufacture, stored dry.' },
        ],
      },
    },
  ],
};

// Exported so sibling products (HW303) can reuse this diagram byte-for-byte —
// confirmed identical on the reference site across the Block Fix family.
module.exports.ordinaryVsHw = {
  style: ORDINARY_VS_HW_STYLE,
  svg: ORDINARY_VS_HW_SVG,
  ol: ORDINARY_VS_HW_OL,
};
