const { oneCard, wrapCards } = require('../lib/tileFixDiagrams');
const shared = require('./tileFixSharedDiagrams');
const { bagToBondFor } = require('./tileFixBagDiagram');

const fromBagToBond = bagToBondFor('HW242');

const greyUnderLight = oneCard(
  'Grey adhesive under light stone', 'sc-hw242-grey-adhesive-under-light-stone',
  '<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 212"><text class="s-lbl" x="150" y="14" text-anchor="middle">stone face, seen from above</text><g class="s-fB"><rect x="100" y="22" width="100" height="84" rx="2" style="fill:#f7f0e2;stroke:#d6c4a2;stroke-width:1.4"></rect><path style="fill:none;stroke:#dfcfb0;stroke-width:1.4;stroke-linecap:round" d="M104 40 C124 46 132 62 156 64 S188 84 196 98"></path><path style="fill:none;stroke:#dfcfb0;stroke-width:1.4;stroke-linecap:round" d="M120 104 C130 90 146 88 152 76"></path><path style="fill:none;stroke:#dfcfb0;stroke-width:1.4;stroke-linecap:round" d="M170 26 C166 38 176 46 192 50"></path><g class="s-phC"><ellipse cx="128" cy="48" rx="18" ry="11" style="fill:#757575;opacity:.38"></ellipse><ellipse cx="172" cy="74" rx="20" ry="13" style="fill:#757575;opacity:.38"></ellipse><ellipse cx="122" cy="86" rx="12" ry="8" style="fill:#757575;opacity:.32"></ellipse></g></g><text class="s-lbl s-badtx" x="210" y="56">Grey shows</text><text class="s-lbl s-badtx" x="210" y="70">through:</text><text class="s-lbl s-badtx" x="210" y="84">patchy shade</text><rect x="20" y="168" width="260" height="26" rx="2" fill="var(--conc)"></rect><rect x="36" y="158" width="228" height="10" rx="1" style="fill:#828282"></rect><g class="s-tdrop"><rect x="40" y="147" width="220" height="11" rx="1.5" style="fill:#f7f0e2;stroke:#d6c4a2;stroke-width:1.4"></rect></g><text class="s-lbl" x="150" y="138" text-anchor="middle">light-coloured stone</text><text class="s-lblb" x="150" y="208" text-anchor="middle">grey cement adhesive</text></svg>',
  '<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>Grey cement-based adhesive spread on the floor</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Light, translucent stone pressed in</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Grey can show through: dull, patchy shade</span></li></ol>',
  '.sc-hw242-grey-adhesive-under-light-stone .s-cs-svg{width:100%;height:auto;display:block}\n.sc-hw242-grey-adhesive-under-light-stone .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}\n.sc-hw242-grey-adhesive-under-light-stone .s-badtx{fill:var(--neg);font-weight:600}\n.anim .sc-hw242-grey-adhesive-under-light-stone.playing .s-st1{animation-name:k-hw242-grey-adhesive-under-light-stone-st1}\n.anim .sc-hw242-grey-adhesive-under-light-stone.playing .s-st2{animation-name:k-hw242-grey-adhesive-under-light-stone-st2}\n.anim .sc-hw242-grey-adhesive-under-light-stone.playing .s-st3{animation-name:k-hw242-grey-adhesive-under-light-stone-st3}\n.anim .sc-hw242-grey-adhesive-under-light-stone.playing .s-badtx{animation-name:k-hw242-grey-adhesive-under-light-stone-redge}\n.sc-hw242-grey-adhesive-under-light-stone .s-txb{fill:var(--cblk)}\n.anim .sc-hw242-grey-adhesive-under-light-stone.playing .s-phC{animation-name:k-hw242-grey-adhesive-under-light-stone-phC}\n.anim .sc-hw242-grey-adhesive-under-light-stone.playing .s-fB{animation-name:k-hw242-grey-adhesive-under-light-stone-fB}\n.sc-hw242-grey-adhesive-under-light-stone .s-tfsvg text{font-family:var(--font-sans)}\n.sc-hw242-grey-adhesive-under-light-stone .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}\n.anim .sc-hw242-grey-adhesive-under-light-stone.playing .s-tdrop{animation-name:k-hw242-grey-adhesive-under-light-stone-tdrop}\n.sc-hw242-grey-adhesive-under-light-stone.s-solo .s-cs-svg{max-width:520px;margin:0 auto}\n.anim .sc-hw242-grey-adhesive-under-light-stone.playing .s-st1 .disc{animation-name:k-hw242-grey-adhesive-under-light-stone-st1-disc}\n.anim .sc-hw242-grey-adhesive-under-light-stone.playing .s-st2 .disc{animation-name:k-hw242-grey-adhesive-under-light-stone-st2-disc}\n.anim .sc-hw242-grey-adhesive-under-light-stone.playing .s-st3 .disc{animation-name:k-hw242-grey-adhesive-under-light-stone-st3-disc}\n@keyframes k-hw242-grey-adhesive-under-light-stone-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}\n@keyframes k-hw242-grey-adhesive-under-light-stone-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}\n@keyframes k-hw242-grey-adhesive-under-light-stone-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}\n@keyframes k-hw242-grey-adhesive-under-light-stone-redge{0%,72%{opacity:0}76%,97%{opacity:1}100%{opacity:0}}\n@keyframes k-hw242-grey-adhesive-under-light-stone-phC{0%,65%{opacity:0}68%,97%{opacity:1}100%{opacity:0}}\n@keyframes k-hw242-grey-adhesive-under-light-stone-fB{0%,33%{opacity:0}36%,97%{opacity:1}100%{opacity:0}}\n@keyframes k-hw242-grey-adhesive-under-light-stone-tdrop{0%,30%{transform:translateY(-44px);opacity:0}33%{opacity:1;transform:translateY(-44px)}46%,97%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-44px)}}\n@keyframes k-hw242-grey-adhesive-under-light-stone-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}\n@keyframes k-hw242-grey-adhesive-under-light-stone-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}\n@keyframes k-hw242-grey-adhesive-under-light-stone-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}',
  9
);

const whiteAdhesive = oneCard(
  'HW242 white adhesive', 'sc-hw242-hw242-white-adhesive',
  '<svg class="s-cs-svg s-tfsvg" viewBox="0 0 300 212"><text class="s-lbl" x="150" y="14" text-anchor="middle">stone face, seen from above</text><g class="s-fB"><rect x="100" y="22" width="100" height="84" rx="2" style="fill:#f7f0e2;stroke:#d6c4a2;stroke-width:1.4"></rect><path style="fill:none;stroke:#dfcfb0;stroke-width:1.4;stroke-linecap:round" d="M104 40 C124 46 132 62 156 64 S188 84 196 98"></path><path style="fill:none;stroke:#dfcfb0;stroke-width:1.4;stroke-linecap:round" d="M120 104 C130 90 146 88 152 76"></path><path style="fill:none;stroke:#dfcfb0;stroke-width:1.4;stroke-linecap:round" d="M170 26 C166 38 176 46 192 50"></path><g transform="translate(200 104)"><g class="s-okc"><circle cx="0" cy="0" r="11"></circle><path d="M-6 0.5l4 4 8-8.5"></path></g></g></g><text class="s-lbl s-goodtx s-late" x="212" y="56">Shade</text><text class="s-lbl s-goodtx s-late" x="212" y="70">stays true</text><rect x="20" y="168" width="260" height="26" rx="2" fill="var(--conc)"></rect><rect x="36" y="158" width="228" height="10" rx="1" style="fill:#fafafa;stroke:#b5b5b5;stroke-width:1"></rect><g class="s-tdrop"><rect x="40" y="147" width="220" height="11" rx="1.5" style="fill:#f7f0e2;stroke:#d6c4a2;stroke-width:1.4"></rect></g><text class="s-lbl" x="150" y="138" text-anchor="middle">light-coloured stone</text><text class="s-lblb" x="150" y="208" text-anchor="middle">HW242: white adhesive</text></svg>',
  '<ol class="s-cst"><li class="s-st1"><span class="disc" aria-hidden="true">1</span><span>HW242 white adhesive spread on the floor</span></li><li class="s-st2"><span class="disc" aria-hidden="true">2</span><span>Light stone pressed in</span></li><li class="s-st3"><span class="disc" aria-hidden="true">3</span><span>Nothing grey underneath: the stone keeps its colour</span></li></ol>',
  '.sc-hw242-hw242-white-adhesive .s-cs-svg{width:100%;height:auto;display:block}\n.sc-hw242-hw242-white-adhesive .s-lbl{font:600 11px var(--font-sans);fill:var(--ink-2)}\n.sc-hw242-hw242-white-adhesive .s-okc circle{fill:var(--ok)}\n.sc-hw242-hw242-white-adhesive .s-okc path{fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}\n.sc-hw242-hw242-white-adhesive .s-okc{transform-box:fill-box;transform-origin:50% 50%}\n.anim .sc-hw242-hw242-white-adhesive.playing .s-st1{animation-name:k-hw242-hw242-white-adhesive-st1}\n.anim .sc-hw242-hw242-white-adhesive.playing .s-st2{animation-name:k-hw242-hw242-white-adhesive-st2}\n.anim .sc-hw242-hw242-white-adhesive.playing .s-st3{animation-name:k-hw242-hw242-white-adhesive-st3}\n.anim .sc-hw242-hw242-white-adhesive.playing .s-okc{animation-name:k-hw242-hw242-white-adhesive-okc;animation-timing-function:cubic-bezier(.3,1.6,.5,1)}\n.sc-hw242-hw242-white-adhesive .s-txb{fill:var(--cblk)}\n.sc-hw242-hw242-white-adhesive .s-late{opacity:1}\n.sc-hw242-hw242-white-adhesive .s-goodtx{fill:var(--pc);font-weight:600}\n.anim .sc-hw242-hw242-white-adhesive.playing .s-late{animation-name:k-hw242-hw242-white-adhesive-lateIn}\n.anim .sc-hw242-hw242-white-adhesive.playing .s-fB{animation-name:k-hw242-hw242-white-adhesive-fB}\n.sc-hw242-hw242-white-adhesive .s-tfsvg text{font-family:var(--font-sans)}\n.sc-hw242-hw242-white-adhesive .s-lblb{font:600 12px var(--font-sans);fill:var(--ink)}\n.anim .sc-hw242-hw242-white-adhesive.playing .s-tdrop{animation-name:k-hw242-hw242-white-adhesive-tdrop}\n.sc-hw242-hw242-white-adhesive.s-solo .s-cs-svg{max-width:520px;margin:0 auto}\n.anim .sc-hw242-hw242-white-adhesive.playing .s-st1 .disc{animation-name:k-hw242-hw242-white-adhesive-st1-disc}\n.anim .sc-hw242-hw242-white-adhesive.playing .s-st2 .disc{animation-name:k-hw242-hw242-white-adhesive-st2-disc}\n.anim .sc-hw242-hw242-white-adhesive.playing .s-st3 .disc{animation-name:k-hw242-hw242-white-adhesive-st3-disc}\n@keyframes k-hw242-hw242-white-adhesive-st1{0%,30%{opacity:1}33%,97%{opacity:.42}100%{opacity:1}}\n@keyframes k-hw242-hw242-white-adhesive-st2{0%,31%{opacity:.42}34%,63%{opacity:1}66%,100%{opacity:.42}}\n@keyframes k-hw242-hw242-white-adhesive-st3{0%,64%{opacity:.42}67%,97%{opacity:1}100%{opacity:.42}}\n@keyframes k-hw242-hw242-white-adhesive-okc{0%,80%{opacity:0;transform:scale(.3)}86%,97%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}\n@keyframes k-hw242-hw242-white-adhesive-lateIn{0%,80%{opacity:0}86%,97%{opacity:1}100%{opacity:0}}\n@keyframes k-hw242-hw242-white-adhesive-fB{0%,33%{opacity:0}36%,97%{opacity:1}100%{opacity:0}}\n@keyframes k-hw242-hw242-white-adhesive-tdrop{0%,30%{transform:translateY(-44px);opacity:0}33%{opacity:1;transform:translateY(-44px)}46%,97%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-44px)}}\n@keyframes k-hw242-hw242-white-adhesive-st1-disc{0%,30%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}33%,97%{background:var(--panel);color:var(--ink);transform:none}100%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}}\n@keyframes k-hw242-hw242-white-adhesive-st2-disc{0%,31%{background:var(--panel);color:var(--ink);transform:none}34%,63%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}66%,100%{background:var(--panel);color:var(--ink);transform:none}}\n@keyframes k-hw242-hw242-white-adhesive-st3-disc{0%,64%{background:var(--panel);color:var(--ink);transform:none}67%,97%{background:var(--gold);color:var(--on-gold);transform:scale(1.08)}100%{background:var(--panel);color:var(--ink);transform:none}}',
  9
);

const slides = [
  { type: 'image', title: 'Tile Fix Medium White', data: {
    text: 'Why tile adhesive beats cement mortar, what IS 15477 Type 2 asks for, and how HW242 measures up: key tests, data against the standard, where it goes and coverage.',
    images: ['https://hw-learning-hub-v2.vercel.app/images/products/tile-fix-medium-white.webp'],
    caption: 'HW242 — White bed. Full contact. No water curing.',
    key: 'HW242 · Tile Fix Medium White',
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
  { type: 'knowledge', title: 'Knowledge Check — Light-Coloured Marble', data: {
    text: 'A client is laying light-coloured marble on an interior floor. Which adhesive fits?',
    list: [
      'HW242 Tile Fix Medium White: Type 2T and white, so the stone keeps its shade',
      'A grey Type 1 adhesive',
      'Site-mixed cement mortar',
      'Wall putty',
    ],
    correctIndex: 0,
  }},
  { type: 'table', title: 'Mortar vs Tile Adhesive', data: {
    text: 'The same tile, two ways of fixing it.',
    table: {
      headers: ['Feature', 'Cement-sand mortar', 'HW242'],
      rows: [
        ['Bed thickness', 'Thick, uneven', 'Thin: up to 6 mm'],
        ['Bond', 'Depends on the tile soaking up cement', 'Polymer bond, tested for tensile and shear strength'],
        ['Wall tiles', 'Can slide while setting', 'Slip ≤ 0.5 mm'],
        ['Working time', 'Not defined', 'Open time and adjustment time declared'],
        ['Curing', 'Water curing needed', 'No external water curing'],
        ['Mix quality', 'Site-batched, varies', 'Factory-made, fixed recipe'],
        ['Standard', 'None for tile fixing', 'IS 15477:2019 Type 2'],
      ],
    },
    explain: 'Contact Matters: IS 15477 designs for full contact: at least 85% under the tile in normal conditions and 95% where conditions are demanding.',
  }},
  { type: 'card', title: 'What a Type 2 Adhesive Is For', data: {
    text: 'IS 15477 sorts tile adhesives by the tile, the substrate and the place. This is the Type 2 brief.',
    sections: [
      { label: 'Tile porosity', text: 'Apparent porosity 3% or less' },
      { label: 'Tiles', text: 'Vitrified and fully vitrified tiles, glass mosaic, all stones; dense and large tiles and stone slabs, bigger than 300 × 300 mm' },
      { label: 'Substrates', text: 'Cement-based backgrounds' },
      { label: 'Where', text: 'Interior floors and walls, exterior floors; demanding places such as wet and submerged areas' },
    ],
    explain: 'Type 2 is a polymer-modified adhesive, for situations where the tile, substrate or place is challenging.',
  }},
  { type: 'card', title: 'What Type 2 Must Achieve', data: {
    text: 'Minimum requirements a Type 2 adhesive has to pass. Tensile dry and wet; shear dry, wet and heat-aged.',
    stats: [
      { value: '≥ 1.0', label: 'Tensile, dry', sub: 'N/mm²' },
      { value: '≥ 1.0', label: 'Tensile, wet', sub: 'N/mm²' },
      { value: '≥ 1.25', label: 'Shear, dry', sub: 'N/mm²' },
      { value: '≥ 1.0', label: 'Shear, wet', sub: 'N/mm²' },
      { value: '≥ 1.0', label: 'Shear, heat-aged', sub: 'N/mm²' },
      { value: 'Declared', label: 'Open time', sub: 'not less than the maker states' },
      { value: 'Declared', label: 'Adjustment time', sub: 'not less than the maker states' },
      { value: '≤ 0.5 mm', label: 'Slip, vertical', sub: 'designated "T"' },
    ],
    list: ['Type 2', '"T" for slip resistance', 'Open and adjustment time', 'Batch number', 'Month and year of manufacture', 'Shelf life and storage', 'Mixing instructions'],
    explain: 'Check the Bag: IS 15477 Says It Must Show the items listed above.',
  }},
  { type: 'card', title: 'HW242 · Tile Fix Medium White', data: {
    text: 'Polymer-modified, sag-resistant white tile adhesive for vitrified, porcelain and light-coloured natural stone. Walls and floors, dry and wet areas.',
    badges: [
      { icon: '📋', label: 'IS 15477:2019 Type 2T', tone: 'neutral' },
      { icon: '🌿', label: 'Greenpro', tone: 'ok' },
      { icon: '⚪', label: 'White powder', tone: 'neutral' },
    ],
    tableRows: [
      { label: 'IS class', value: 'Type 2T' },
      { label: 'Open time', value: '35 min' },
      { label: 'Adjustment time', value: '35 min' },
      { label: 'Bed thickness', value: 'Up to 12 mm' },
      { label: 'Pot life', value: '3 hours' },
      { label: 'Packs', value: '20 kg & 40 kg' },
    ],
    list: ['High performance, high bond strength', 'Higher bed thickness: up to 12 mm', 'Easy application', 'No external curing required', 'Water and thermal resistant', 'Greenpro eco-label'],
  }},
  { type: 'svg', title: 'Why a White Adhesive?', data: {
    text: 'HW242 is made for vitrified, porcelain and light-coloured natural stone. Light, translucent stone can take on the colour of whatever is under it.',
    svgMarkup: wrapCards(greyUnderLight, whiteAdhesive),
    badges: [
      { icon: '⚪', label: 'White powder', sub: 'Clean, light bed under light stone', tone: 'neutral' },
      { icon: '📋', label: 'IS 15477 Type 2T', sub: 'Polymer-modified, slip resistant', tone: 'neutral' },
      { icon: '📏', label: 'Bed up to 12 mm', sub: 'Notch ridges sized to the tile', tone: 'neutral' },
      { icon: '🔨', label: 'Over old tiles or stone', sub: 'Hack or roughen if required', tone: 'neutral' },
    ],
    explain: 'Sell It Where the Stone Is Light: Light-coloured marble and natural stone, vitrified and porcelain: lead with HW242.',
  }},
  { type: 'svg', title: 'Open Time and Adjustment Time', data: {
    text: 'Open time: how long combed adhesive can still take a tile. Adjustment time: how long a placed tile can still be moved without losing bond.',
    svgMarkup: wrapCards(shared.openTimeAnnexC, shared.adjustmentTimeAnnexD),
    explain: 'HW242 declares: open time 35 min · adjustment time 35 min',
  }},
  { type: 'svg', title: 'Slip', data: {
    text: 'Does a wall tile slide down before the adhesive sets? A slip-resistant adhesive holds it within 0.5 mm, so wall tiles need no props or packing.',
    svgMarkup: wrapCards(shared.slipAnnexE),
    explain: 'HW242 declares: slip ≤ 0.5 mm',
  }},
  { type: 'svg', title: 'Tensile and Shear Adhesion', data: {
    text: 'Tensile: force to pull the tile straight off. Shear: force to slide it sideways. Both are tested dry and wet; shear also after heat ageing.',
    svgMarkup: wrapCards(shared.tensileAnnexA, shared.shearAnnexB),
    badges: [
      { icon: '🧪', label: 'Dry', sub: '28 days in the lab', tone: 'neutral' },
      { icon: '💧', label: 'Wet', sub: '7 days in the lab, then soaked in water (21 days in all for tensile, 28 for shear)', tone: 'neutral' },
      { icon: '🔥', label: 'Heat-aged', sub: '14 days in the lab, then 14 days at 70 °C (shear)', tone: 'neutral' },
    ],
    explain: 'HW242 declares: tensile, dry ≥ 1.35 · tensile, wet ≥ 1.30 · shear, dry ≥ 1.30 · shear, wet ≥ 1.25 · shear, heat-aged ≥ 1.25 N/mm²',
  }},
  { type: 'card', title: 'Meets Every Type 2 Requirement', data: {
    text: 'Each IS 15477 Type 2 requirement, what the HW242 data sheet declares, and by how much it clears the line. Result % = how far above the IS minimum.',
    table: {
      headers: ['Feature', 'Parameter', 'IS Type 2', 'HW242', 'Result'],
      rows: [
        ['Tensile, dry', '≥ 1.0', '≥ 1.0', '≥ 1.35', '+35%'],
        ['Tensile, wet', '≥ 1.0', '≥ 1.0', '≥ 1.30', '+30%'],
        ['Shear, dry', '≥ 1.25', '≥ 1.25', '≥ 1.30', '+4%'],
        ['Shear, wet', '≥ 1.0', '≥ 1.0', '≥ 1.25', '+25%'],
        ['Shear, heat-aged', '≥ 1.0', '≥ 1.0', '≥ 1.25', '+25%'],
        ['Open time', '≥ declared', '≥ declared', '35 min', 'Declared'],
        ['Adjustment time', '≥ declared', '≥ declared', '35 min', 'Declared'],
        ['Slip, vertical', '≤ 0.5 mm', '≤ 0.5 mm', '≤ 0.5 mm', 'Meets'],
      ],
    },
    gauges: [
      { label: 'Tensile, dry', sub: 'N/mm² · +35% over IS', valuePct: 100, result: '≥ 1.35 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 74 },
      { label: 'Tensile, wet', sub: 'N/mm² · +30% over IS', valuePct: 100, result: '≥ 1.30 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 77 },
      { label: 'Shear, dry', sub: 'N/mm² · +4% over IS', valuePct: 100, result: '≥ 1.30 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 96 },
      { label: 'Shear, wet', sub: 'N/mm² · +25% over IS', valuePct: 100, result: '≥ 1.25 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 80 },
      { label: 'Shear, heat-aged', sub: 'N/mm² · +25% over IS', valuePct: 100, result: '≥ 1.25 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 80 },
    ],
  }},
  { type: 'card', title: 'Where HW242 Goes', data: {
    text: 'Floor and wall tiling, vertical and horizontal, in dry and wet areas of internal walls and floors, and external floors.',
    sections: [
      { label: 'Tiles', text: 'Ceramic tiles, Vitrified tiles, Porcelain tiles, Light-coloured natural stone' },
      { label: 'Areas', text: 'Interior floors, Interior walls, Wet areas, Exterior floors' },
      { label: 'Substrates', text: 'Cement plaster, Screed, Concrete, Over existing tiles or natural stone' },
      { label: 'Back-Butter', text: 'Coat the rear of the tile for proper bonding. Notch at right angles to the tile\'s long side.' },
      { label: 'Tiling over Old Tiles or Stone?', text: 'Hack or roughen the non-absorbent surface if required. On absorbent surfaces, pre-wet lightly: damp, no standing water.' },
    ],
    explain: 'Exterior walls are not in the HW242 scope: internal walls and floors, and external floors only.',
  }},
  { type: 'card', title: '60–80 sq ft per 20 kg Bag', data: {
    text: '60–80 sq ft per 20 kg bag at 3 mm bed, as declared in the TDS. Each square below is 1 sq ft.',
    stats: [{ value: '60 sq ft', label: 'low end' }, { value: 'up to 80 sq ft', label: 'high end' }],
    calc: {
      mode: 'range', unitLabel: 'sq ft', defaultQty: 500, min: 1, max: 1000000,
      units: [{ label: 'sq ft', factor: 1 }, { label: 'm²', factor: 10.7639 }],
      resultLabel: 'bags of 20 kg for {qty} {unit}', minCoveragePerUnit: 60, maxCoveragePerUnit: 80,
      note: 'Estimate at a 3 mm bed from the TDS coverage. A bigger notch, thicker bed, back-buttering, large tiles or an uneven surface use more. A 40 kg bag covers double (120–160 sq ft).',
    },
    tableRows: [
      { label: 'Mixing', value: '7.6–8 L per 20 kg · 15.2–16 L per 40 kg (38–40%)' },
      { label: 'Pot life', value: '3 hours' },
      { label: 'Grout after 24 hours', value: 'HW210 or HW211' },
      { label: 'Traffic', value: '24 hours' },
      { label: 'Apply at', value: '5–40 °C' },
      { label: 'Shelf life', value: '12 months' },
    ],
  }},
  { type: 'knowledge', title: 'Scenario: On Site', data: {
    text: 'On site: The Uneven Floor. The floor to be tiled is 20 mm out of level over 3 m. The mason wants to make up the difference with a thick bed of HW242. What is the right advice?',
    list: [
      'Level the floor first: adhesive is not a levelling screed, and HW242 beds go up to 12 mm',
      'A thicker bed of HW242 is fine',
      'Add sand to HW242 to bulk it up',
      'Skip the back-buttering to save adhesive',
    ],
    correctIndex: 0,
  }},
  { type: 'card', title: 'Cheat Sheet', data: {
    text: 'HW242 at a glance. Check it before a visit.',
    sections: [
      { label: 'HW242 Tile Fix Medium White', text: 'Type 2T' },
      { label: 'What it is', text: 'Polymer-modified, sag-resistant white tile adhesive for vitrified, porcelain and light-coloured natural stone. Walls and floors, dry and wet areas.' },
      { label: 'Why white', text: 'No grey under light, translucent stone: the stone keeps its shade.' },
      { label: 'IS class', text: 'IS 15477:2019 Type 2T · Greenpro' },
      { label: 'Tiles', text: 'Ceramic, vitrified and porcelain tiles; light-coloured natural stone' },
      { label: 'Areas', text: 'Internal walls and floors, external floors; dry and wet areas' },
      { label: 'Substrates', text: 'Cement plaster, screed, concrete; over existing tiles or natural stone' },
      { label: 'Not for', text: 'Exterior walls (not in the HW242 scope)' },
      { label: 'Key data', text: '≥ 1.35 tensile, dry (IS 1.0) · ≥ 1.30 tensile, wet (IS 1.0) · ≥ 1.30 shear, dry (IS 1.25) · ≥ 1.25 shear, wet (IS 1.0) · ≥ 1.25 shear, heat-aged (IS 1.0) · 35 min open · 35 min adjustment · Slip ≤ 0.5 mm · Bed up to 12 mm' },
      { label: 'Coverage', text: '60–80 sq ft per 20 kg bag at 3 mm bed' },
      { label: 'Mix', text: '7.6–8 L per 20 kg (38–40%). Pot life 3 hours.' },
      { label: 'Grout · traffic', text: 'Grout after 24 hours with HW210 or HW211. Trafficable after 24 hours.' },
      { label: 'Packs', text: '20 kg & 40 kg. Shelf life 12 months.' },
    ],
  }},
];

module.exports = {
  productName: 'HW242 Tile Fix Medium White',
  productDescription: 'Fixing Vitrified, Porcelain and Light Coloured Natural Stones',
  topicDescription: 'Everything a sales, dealer or applicator team member needs to know about HW242 Tile Fix Medium White: why a white adhesive matters for light stone, IS 15477 Type 2 requirements, HW242\'s test data, where it goes and coverage.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides,
};
