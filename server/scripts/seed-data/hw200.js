const { oneCard, wrapCards } = require('../lib/tileFixDiagrams');
const shared = require('./tileFixSharedDiagrams');

const fromBagToBond = oneCard(
  'From bag to bond', 'sc-hw200-from-bag-to-bond',
  '<svg class="s-cs-svg s-tfsvg" viewBox="0 0 330 172"><g class="s-st1"><rect class="s-pf" x="3" y="3" width="104" height="140" rx="10"></rect><path class="s-wfill" opacity=".55" d="M22 110 L26 132 L78 132 L82 110 Z"></path><path class="s-stk" d="M18 92 L26 132 L78 132 L86 92"></path><g transform="rotate(-28 44 40)"><rect x="24" y="16" width="38" height="46" rx="5" style="fill:var(--ink)"></rect><rect x="24" y="44" width="38" height="8" style="fill:var(--pc)"></rect><text x="43" y="35" text-anchor="middle" style="fill:#fff;font:600 10.5px var(--font-display)">HW200</text></g><circle class="s-powder" cx="58" cy="62" r="2.4" style="--pd:0.00s"></circle><circle class="s-powder" cx="63" cy="62" r="2.4" style="--pd:0.20s"></circle><circle class="s-powder" cx="55" cy="62" r="2.4" style="--pd:0.40s"></circle><circle class="s-powder" cx="66" cy="62" r="2.4" style="--pd:0.60s"></circle><circle class="s-powder" cx="60" cy="62" r="2.4" style="--pd:0.30s"></circle><circle class="s-powder" cx="52" cy="62" r="2.4" style="--pd:0.55s"></circle><text class="s-lblb" x="55" y="160" text-anchor="middle">1 · Powder + water</text></g><g class="s-st2"><rect class="s-pf" x="113" y="3" width="104" height="140" rx="10"></rect><path class="s-adh" d="M131 104 L136 132 L188 132 L193 104 Z"></path><path class="s-stk" d="M128 92 L136 132 L188 132 L196 92"></path><g class="s-stir"><line x1="162" y1="30" x2="162" y2="118" style="stroke:var(--ink-2);stroke-width:3;stroke-linecap:round"></line><rect x="152" y="110" width="20" height="9" rx="2" class="s-inkf"></rect><rect x="155" y="22" width="14" height="10" rx="2" style="fill:var(--pc)"></rect></g><text class="s-lblb" x="165" y="160" text-anchor="middle">2 · Mix</text></g><g class="s-st3"><rect class="s-pf" x="223" y="3" width="104" height="140" rx="10"></rect><rect x="231" y="112" width="88" height="22" rx="2" fill="var(--conc)"></rect><rect class="s-rdg s-adh" x="234" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="247" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="260" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="273" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="286" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="299" y="100" width="8" height="12"></rect><rect class="s-rdg s-adh" x="312" y="100" width="8" height="12"></rect><path class="s-trowel" d="M226 64 H256 V92 L253 98 L250 92 L247 98 L244 92 L241 98 L238 92 L235 98 L232 92 L229 98 L226 92 Z M236 64 V52 H246 V64" style="fill:var(--ink-2)"></path><rect class="s-tileP s-tlp" x="234" y="92" width="82" height="9" rx="1.5"></rect><text class="s-lblb" x="275" y="160" text-anchor="middle">3 · Comb + press</text></g></svg>',
  '<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Add the powder to clean water</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Mix to a smooth, lump-free paste; rest 3–5 min; remix</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Comb with a notched trowel, press the tile in</span></li></ol>',
  '.sc-hw200-from-bag-to-bond .s-cs-svg{width:100%;height:auto;display:block}\n.anim .sc-hw200-from-bag-to-bond.playing .s-st1{animation-name:k-hw200-from-bag-to-bond-st1}\n.anim .sc-hw200-from-bag-to-bond.playing .s-st2{animation-name:k-hw200-from-bag-to-bond-st2}\n.anim .sc-hw200-from-bag-to-bond.playing .s-st3{animation-name:k-hw200-from-bag-to-bond-st3}\n.sc-hw200-from-bag-to-bond .s-txb{fill:var(--cblk)}\n.sc-hw200-from-bag-to-bond .s-tfsvg text{font-family:var(--font-sans)}\n.sc-hw200-from-bag-to-bond .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}\n.sc-hw200-from-bag-to-bond .s-stk{fill:none;stroke:var(--ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}\n.sc-hw200-from-bag-to-bond .s-pf{fill:var(--paper);stroke:var(--rule);stroke-width:1}\n.sc-hw200-from-bag-to-bond .s-tlp{fill:color-mix(in srgb,var(--pc) 30%,var(--paper));stroke:var(--pc);stroke-width:1.6}\n.sc-hw200-from-bag-to-bond .s-adh{fill:var(--adh)}\n.sc-hw200-from-bag-to-bond .s-inkf{fill:var(--ink-2)}\n.sc-hw200-from-bag-to-bond .s-wfill{fill:var(--water)}\n.sc-hw200-from-bag-to-bond .s-powder{fill:var(--adh)}\n.anim .sc-hw200-from-bag-to-bond.playing .s-powder{animation:k-hw200-from-bag-to-bond-powder .8s linear infinite;animation-delay:var(--pd)}\n.anim .sc-hw200-from-bag-to-bond.playing .s-stir{animation:k-hw200-from-bag-to-bond-stir .7s ease-in-out infinite alternate}\n.sc-hw200-from-bag-to-bond .s-trowel{opacity:0}\n.anim .sc-hw200-from-bag-to-bond.playing .s-trowel{animation-name:k-hw200-from-bag-to-bond-trowel}\n.sc-hw200-from-bag-to-bond .s-rdg{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(.5)}\n.anim .sc-hw200-from-bag-to-bond.playing .s-rdg{animation-name:k-hw200-from-bag-to-bond-rdg}\n.anim .sc-hw200-from-bag-to-bond.playing .s-tileP{animation-name:k-hw200-from-bag-to-bond-tileP}\n.sc-hw200-from-bag-to-bond .s-cs-svg{max-width:520px;margin:0 auto}\n.anim .sc-hw200-from-bag-to-bond.playing .s-st1 .disc{animation-name:k-hw200-from-bag-to-bond-st1-disc}\n.anim .sc-hw200-from-bag-to-bond.playing .s-st2 .disc{animation-name:k-hw200-from-bag-to-bond-st2-disc}\n.anim .sc-hw200-from-bag-to-bond.playing .s-st3 .disc{animation-name:k-hw200-from-bag-to-bond-st3-disc}\n@keyframes k-hw200-from-bag-to-bond-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}\n@keyframes k-hw200-from-bag-to-bond-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}\n@keyframes k-hw200-from-bag-to-bond-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}\n@keyframes k-hw200-from-bag-to-bond-powder{0%{opacity:0;transform:none}10%{opacity:1}80%{opacity:1;transform:translateY(40px)}81%,100%{opacity:0;transform:translateY(40px)}}\n@keyframes k-hw200-from-bag-to-bond-stir{from{transform:translateX(-9px)}to{transform:translateX(9px)}}\n@keyframes k-hw200-from-bag-to-bond-trowel{0%,66%{opacity:0;transform:none}69%{opacity:1}79%{opacity:1;transform:translateX(62px)}81%,100%{opacity:0;transform:translateX(62px)}}\n@keyframes k-hw200-from-bag-to-bond-rdg{0%,68%{opacity:0;transform:scaleY(1)}72%{opacity:1;transform:scaleY(1)}86%{transform:scaleY(1)}90%,97%{opacity:1;transform:scaleY(.5)}100%{opacity:0}}\n@keyframes k-hw200-from-bag-to-bond-tileP{0%,79%{opacity:0;transform:translateY(-34px)}81%{opacity:1;transform:translateY(-34px)}88%,97%{opacity:1;transform:none}100%{opacity:0}}\n@keyframes k-hw200-from-bag-to-bond-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}\n@keyframes k-hw200-from-bag-to-bond-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}\n@keyframes k-hw200-from-bag-to-bond-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}',
  9
);

const slides = [
  { type: 'image', title: 'Tile Fix Basic', data: {
    text: 'Why tile adhesive beats cement mortar, what IS 15477 Type 1 asks for, and how HW200 measures up: key tests, data against the standard, where it goes and coverage.',
    images: ['https://hw-learning-hub-v2.vercel.app/images/products/tile-fix-basic.webp'],
    caption: 'HW200 — Thin bed. Full contact. No water curing.',
    key: 'HW200 · Tile Fix Basic',
  }},
  { type: 'svg', title: 'What Is a Tile Adhesive?', data: {
    text: 'A factory-made adhesive designed only for fixing tiles in a thin bed. Cement-based and polymer-modified. On site you add clean water. Nothing else. For thick natural stone and other heavy pieces that need a deeper bed, medium-bed and thick-bed adhesives are used.',
    svgMarkup: wrapCards(fromBagToBond),
    badges: [
      { icon: '🧱', label: 'Cement binder', sub: 'Sets hard, carries the load', tone: 'neutral' },
      { icon: '🪨', label: 'Graded fillers', sub: 'Controlled, factory-dosed', tone: 'neutral' },
      { icon: '🧪', label: 'Polymers', sub: 'Better grip, some flexibility', tone: 'neutral' },
      { icon: '💧', label: 'Just add water', sub: 'No sand, no site batching', tone: 'neutral' },
    ],
    explain: 'Level First: If the floor or wall is more than 12 mm out over 3 m, correct it before tiling. Adhesive is not a levelling screed.',
  }},
  { type: 'svg', title: 'Why Cement Mortar Lets Tiles Down', data: {
    text: 'Tiles set on a thick bed of site-mixed cement and sand rely on the tile soaking up cement. Dense tiles and stone barely absorb anything.',
    svgMarkup: wrapCards(shared.conventionalMortarBed, shared.tileAdhesive),
    table: {
      headers: ['', 'Conventional mortar bed', 'Tile adhesive'],
      rows: [
        ['Contact', 'Hollow tiles — voids in an uneven bed', 'Full, even contact'],
        ['Grip', 'Weak — depends on how much the tile absorbs', 'Polymer bond, IS-tested'],
        ['Bed', 'Thick, heavy bed — more material, more dead load', 'Thin bed'],
        ['Curing', 'Needs water and labour after fixing', 'No water curing'],
        ['Working time', 'Tiles slide on walls, no fixed working time — props, packing, rework', 'Slip ≤ 0.5 mm · declared open time'],
      ],
    },
  }},
  { type: 'knowledge', title: 'Knowledge Check — Vitrified Tiles', data: {
    text: 'A customer wants to fix vitrified tiles in a bathroom with HW200. What do you say?',
    list: [
      'Step up to HW202 or above: HW200 is for ceramic tiles in interior dry areas',
      'HW200 fits any tile, go ahead',
      'Use HW200 with extra cement',
      'Use a thicker bed of HW200',
    ],
    correctIndex: 0,
  }},
  { type: 'table', title: 'Mortar vs Tile Adhesive', data: {
    text: 'The same tile, two ways of fixing it.',
    table: {
      headers: ['Feature', 'Cement-sand mortar', 'HW200'],
      rows: [
        ['Bed thickness', 'Thick, uneven', 'Thin: up to 6 mm'],
        ['Bond', 'Depends on the tile soaking up cement', 'Polymer bond, tested for tensile and shear strength'],
        ['Wall tiles', 'Can slide while setting', 'Slip ≤ 0.5 mm'],
        ['Working time', 'Not defined', 'Open time and adjustment time declared'],
        ['Curing', 'Water curing needed', 'No external water curing'],
        ['Mix quality', 'Site-batched, varies', 'Factory-made, fixed recipe'],
        ['Standard', 'None for tile fixing', 'IS 15477:2019 Type 1'],
      ],
    },
    explain: 'Contact Matters: IS 15477 designs for full contact: at least 85% under the tile in normal conditions and 95% where conditions are demanding.',
  }},
  { type: 'card', title: 'What a Type 1 Adhesive Is For', data: {
    text: 'IS 15477 sorts tile adhesives by the tile, the substrate and the place. This is the Type 1 brief.',
    sections: [
      { label: 'Tile porosity', text: 'Apparent porosity more than 3%' },
      { label: 'Tiles', text: 'Most clay and ceramic (non-vitrified) tiles of small size, not more than 300 × 300 mm' },
      { label: 'Substrates', text: 'Most cement-based backgrounds: cement plaster, cement concrete, cement screed' },
      { label: 'Where', text: 'Interior dry areas only: general floor and wall tiling' },
    ],
    explain: 'IS calls Type 1 the general-purpose adhesive. It contains small amounts of polymer that modify the cement and filler.',
  }},
  { type: 'card', title: 'What Type 1 Must Achieve', data: {
    text: 'Minimum requirements a Type 1 adhesive has to pass. Tensile and shear, dry only.',
    stats: [
      { value: '≥ 0.5', label: 'Tensile, dry', sub: 'N/mm²' },
      { value: '≥ 1.0', label: 'Shear, dry', sub: 'N/mm²' },
      { value: 'Declared', label: 'Open time', sub: 'not less than the maker states' },
      { value: 'Declared', label: 'Adjustment time', sub: 'not less than the maker states' },
      { value: '≤ 0.5 mm', label: 'Slip, vertical', sub: 'designated "T"' },
    ],
    list: [
      'Type 1',
      '"T" for slip resistance',
      'Open and adjustment time',
      'Batch number',
      'Month and year of manufacture',
      'Shelf life and storage',
      'Mixing instructions',
    ],
    explain: 'Check the Bag: IS 15477 Says It Must Show the items listed above.',
  }},
  { type: 'card', title: 'HW200 · Tile Fix Basic', data: {
    text: 'Polymer-modified cement adhesive for ceramic tiles on interior dry walls and floors.',
    badges: [
      { icon: '📋', label: 'IS 15477:2019 Type 1T', tone: 'neutral' },
      { icon: '🌿', label: 'Greenpro', tone: 'ok' },
      { icon: '🧂', label: 'Grey powder', tone: 'neutral' },
    ],
    tableRows: [
      { label: 'IS class', value: 'Type 1T' },
      { label: 'Open time', value: '20 min' },
      { label: 'Adjustment time', value: '30 min' },
      { label: 'Bed thickness', value: 'Up to 6 mm' },
      { label: 'Pot life', value: '60 min' },
      { label: 'Packs', value: '20 kg & 40 kg' },
    ],
    list: [
      'High bond strength',
      'Easy application, smooth paste',
      'No external water curing',
      'Slip 0.0 mm on walls',
      'Greenpro eco-label',
    ],
  }},
  { type: 'svg', title: 'Open Time and Adjustment Time', data: {
    text: 'Open time: how long combed adhesive can still take a tile. Adjustment time: how long a placed tile can still be moved without losing bond.',
    svgMarkup: wrapCards(shared.openTimeAnnexC, shared.adjustmentTimeAnnexD),
    explain: 'HW200 declares: open time 20 min · adjustment time 30 min',
  }},
  { type: 'svg', title: 'Slip', data: {
    text: 'Does a wall tile slide down before the adhesive sets? A slip-resistant adhesive holds it within 0.5 mm, so wall tiles need no props or packing.',
    svgMarkup: wrapCards(shared.slipAnnexE),
    explain: 'HW200 declares: slip 0.0 mm',
  }},
  { type: 'svg', title: 'Tensile and Shear Adhesion', data: {
    text: 'Tensile: force to pull the tile straight off. Shear: force to slide it sideways. For Type 1 both are tested dry, after 28 days.',
    svgMarkup: wrapCards(shared.tensileAnnexA, shared.shearAnnexB),
    badges: [{ icon: '🧪', label: 'Dry', sub: '28 days in the lab', tone: 'neutral' }],
    explain: 'HW200 declares: tensile, dry ≥ 0.6 · shear, dry ≥ 1.1 N/mm²',
  }},
  { type: 'card', title: 'Meets Every Type 1 Requirement', data: {
    text: 'Each IS 15477 Type 1 requirement, what the HW200 data sheet declares, and by how much it clears the line. Result % = how far above the IS minimum.',
    table: {
      headers: ['Feature', 'Parameter', 'IS Type 1', 'HW200', 'Result'],
      rows: [
        ['Tensile, dry', '≥ 0.5', '≥ 0.5', '≥ 0.6', '+20%'],
        ['Shear, dry', '≥ 1.0', '≥ 1.0', '≥ 1.1', '+10%'],
        ['Open time', '≥ declared', '≥ declared', '20 min', 'Declared'],
        ['Adjustment time', '≥ declared', '≥ declared', '30 min', 'Declared'],
        ['Slip, vertical', '≤ 0.5 mm', '≤ 0.5 mm', '0.0 mm', 'No slip'],
      ],
    },
    gauges: [
      { label: 'Tensile, dry', sub: 'N/mm² · +20% over IS', valuePct: 100, result: '≥ 0.6 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 83 },
      { label: 'Shear, dry', sub: 'N/mm² · +10% over IS', valuePct: 100, result: '≥ 1.1 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 91 },
    ],
  }},
  { type: 'card', title: 'Where HW200 Goes', data: {
    text: 'Polymer-modified cement adhesive for ceramic tiles on interior dry walls and floors.',
    sections: [
      { label: 'Tiles', text: 'Ceramic tiles, up to 300 × 300 mm — small ceramic and clay tiles' },
      { label: 'Areas', text: 'Interior floors, Interior walls' },
      { label: 'Substrates', text: 'Cement plaster, Cement-sand screeds' },
    ],
    explain: 'Not for vitrified tiles, wet areas or exteriors. Step up to HW202 or above.',
  }},
  { type: 'card', title: '60–80 sq ft per 20 kg Bag', data: {
    text: '60–80 sq ft per 20 kg bag at 3 mm bed, as declared in the TDS. Each square below is 1 sq ft.',
    stats: [
      { value: '60 sq ft', label: 'low end' },
      { value: 'up to 80 sq ft', label: 'high end' },
    ],
    calc: {
      mode: 'range',
      unitLabel: 'sq ft',
      defaultQty: 500,
      min: 1,
      max: 1000000,
      units: [{ label: 'sq ft', factor: 1 }, { label: 'm²', factor: 10.7639 }],
      resultLabel: 'bags of 20 kg for {qty} {unit}',
      minCoveragePerUnit: 60,
      maxCoveragePerUnit: 80,
      note: 'Estimate at a 3 mm bed from the TDS coverage. A bigger notch, thicker bed, back-buttering, large tiles or an uneven surface use more. A 40 kg bag covers double (120–160 sq ft).',
    },
    tableRows: [
      { label: 'Mixing', value: '4.4–6.0 L per 20 kg (22–30%)' },
      { label: 'Grout after 24 hours', value: 'HW210 cement grout or HW211 epoxy grout' },
      { label: 'Traffic', value: '24 hours' },
      { label: 'Shelf life', value: '12 months' },
    ],
  }},
  { type: 'knowledge', title: 'Scenario: On Site', data: {
    text: 'On site: The Hollow Floor. A contractor laid ceramic tiles on a thick cement-sand mortar bed. Six months later several tiles sound hollow and two have popped. He asks why a tile adhesive would have helped. What is the key reason a Type 1 adhesive like HW200 avoids hollow tiles?',
    list: [
      'A thin, even bed combed with a notched trowel gives full contact and a tested polymer bond',
      'It is thicker and heavier than mortar',
      'It needs more water curing',
      'It sets much slower',
    ],
    correctIndex: 0,
  }},
  { type: 'card', title: 'Cheat Sheet', data: {
    text: 'HW200 at a glance. Check it before a visit.',
    sections: [
      { label: 'HW200 Tile Fix Basic', text: 'Type 1T' },
      { label: 'What it is', text: 'Polymer-modified cement adhesive for ceramic tiles on interior dry walls and floors.' },
      { label: 'IS class', text: 'IS 15477:2019 Type 1T' },
      { label: 'Tiles', text: 'Ceramic tiles' },
      { label: 'Areas', text: 'Interior floors, interior walls' },
      { label: 'Substrates', text: 'Cement plaster, Cement-sand screeds' },
      { label: 'Not for', text: 'Not for vitrified tiles, wet areas or exteriors. Step up to HW202 or above.' },
      { label: 'Key data', text: '≥ 0.6 tensile, dry (IS 0.5) · ≥ 1.1 shear, dry (IS 1.0) · 20 min open · 30 min adjustment · Slip 0.0 mm' },
      { label: 'Coverage', text: '60–80 sq ft per 20 kg bag at 3 mm bed' },
      { label: 'Mix', text: '4.4–6.0 L per 20 kg (22–30%). Pot life 60 min.' },
      { label: 'Packs', text: '20 kg & 40 kg. Shelf life 12 months.' },
    ],
  }},
];

module.exports = {
  productName: 'HW200 Tile Fix Basic',
  productDescription: 'Fixing all types of ceramic tiles for interior wall & floors',
  topicDescription: 'Everything a sales, dealer or applicator team member needs to know about HW200 Tile Fix Basic: why tile adhesive beats cement mortar, IS 15477 Type 1 requirements, HW200\'s test data, where it goes and coverage.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides,
};
