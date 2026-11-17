const { wrapCards } = require('../lib/tileFixDiagrams');
const shared = require('./tileFixSharedDiagrams');
const { bagToBondFor } = require('./tileFixBagDiagram');

const fromBagToBond = bagToBondFor('HW202');

const slides = [
  { type: 'image', title: 'Tile Fix Medium', data: {
    text: 'Why tile adhesive beats cement mortar, what IS 15477 Type 2 asks for, and how HW202 measures up: key tests, data against the standard, where it goes, lab proof and coverage.',
    images: ['https://hw-learning-hub-v2.vercel.app/images/products/tile-fix-medium.webp'],
    caption: 'HW202 — Thin bed. Full contact. No water curing.',
    key: 'HW202 · Tile Fix Medium',
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
  { type: 'knowledge', title: 'Knowledge Check — Vitrified Tiles in a Bathroom', data: {
    text: 'A client wants vitrified tiles in a bathroom and has been offered a Type 1 adhesive. What do you recommend?',
    list: [
      'HW202 Tile Fix Medium: Type 2T, tested wet, made for vitrified tiles and wet areas',
      'The Type 1 adhesive is enough',
      'Site-mixed cement mortar',
      'Only an epoxy adhesive will work',
    ],
    correctIndex: 0,
  }},
  { type: 'table', title: 'Mortar vs Tile Adhesive', data: {
    text: 'The same tile, two ways of fixing it.',
    table: {
      headers: ['Feature', 'Cement-sand mortar', 'HW202'],
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
  { type: 'card', title: 'HW202 · Tile Fix Medium', data: {
    text: 'High-performance polymer-modified adhesive for small to medium ceramic, vitrified and natural stone, in dry and wet areas.',
    badges: [
      { icon: '📋', label: 'IS 15477:2019 Type 2T', tone: 'neutral' },
      { icon: '🌿', label: 'Greenpro', tone: 'ok' },
      { icon: '🧂', label: 'Grey powder', tone: 'neutral' },
    ],
    tableRows: [
      { label: 'IS class', value: 'Type 2T' },
      { label: 'Open time', value: '30 min' },
      { label: 'Adjustment time', value: '30 min' },
      { label: 'Bed thickness', value: 'Up to 6 mm' },
      { label: 'Pot life', value: '2 hours' },
      { label: 'Packs', value: '20 kg & 40 kg' },
    ],
    list: ['High bond on cement substrates', 'High open time, easy application', 'Sag resistant', 'No external water curing', 'Greenpro eco-label'],
  }},
  { type: 'svg', title: 'Open Time and Adjustment Time', data: {
    text: 'Open time: how long combed adhesive can still take a tile. Adjustment time: how long a placed tile can still be moved without losing bond.',
    svgMarkup: wrapCards(shared.openTimeAnnexC, shared.adjustmentTimeAnnexD),
    explain: 'HW202 declares: open time 30 min · adjustment time 30 min',
  }},
  { type: 'svg', title: 'Slip', data: {
    text: 'Does a wall tile slide down before the adhesive sets? A slip-resistant adhesive holds it within 0.5 mm, so wall tiles need no props or packing.',
    svgMarkup: wrapCards(shared.slipAnnexE),
    explain: 'HW202 declares: slip 0.0 mm',
  }},
  { type: 'svg', title: 'Tensile and Shear Adhesion', data: {
    text: 'Tensile: force to pull the tile straight off. Shear: force to slide it sideways. Both are tested dry and wet; shear also after heat ageing.',
    svgMarkup: wrapCards(shared.tensileAnnexA, shared.shearAnnexB),
    badges: [
      { icon: '🧪', label: 'Dry', sub: '28 days in the lab', tone: 'neutral' },
      { icon: '💧', label: 'Wet', sub: '7 days in the lab, then soaked in water (21 days in all for tensile, 28 for shear)', tone: 'neutral' },
      { icon: '🔥', label: 'Heat-aged', sub: '14 days in the lab, then 14 days at 70 °C (shear)', tone: 'neutral' },
    ],
    explain: 'HW202 declares: tensile, dry ≥ 1.25 · tensile, wet ≥ 1.2 · shear, dry ≥ 1.35 · shear, wet ≥ 1.2 · shear, heat-aged ≥ 1.1 N/mm²',
  }},
  { type: 'card', title: 'Meets Every Type 2 Requirement', data: {
    text: 'Each IS 15477 Type 2 requirement, what the HW202 data sheet declares, and by how much it clears the line. Result % = how far above the IS minimum.',
    table: {
      headers: ['Feature', 'Parameter', 'IS Type 2', 'HW202', 'Result'],
      rows: [
        ['Tensile, dry', '≥ 1.0', '≥ 1.0', '≥ 1.25', '+25%'],
        ['Tensile, wet', '≥ 1.0', '≥ 1.0', '≥ 1.2', '+20%'],
        ['Shear, dry', '≥ 1.25', '≥ 1.25', '≥ 1.35', '+8%'],
        ['Shear, wet', '≥ 1.0', '≥ 1.0', '≥ 1.2', '+20%'],
        ['Shear, heat-aged', '≥ 1.0', '≥ 1.0', '≥ 1.1', '+10%'],
        ['Open time', '≥ declared', '≥ declared', '30 min', 'Declared'],
        ['Adjustment time', '≥ declared', '≥ declared', '30 min', 'Declared'],
        ['Slip, vertical', '≤ 0.5 mm', '≤ 0.5 mm', '0.0 mm', 'No slip'],
      ],
    },
    gauges: [
      { label: 'Tensile, dry', sub: 'N/mm² · +25% over IS', valuePct: 100, result: '≥ 1.25 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 80 },
      { label: 'Tensile, wet', sub: 'N/mm² · +20% over IS', valuePct: 100, result: '≥ 1.2 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 83 },
      { label: 'Shear, dry', sub: 'N/mm² · +8% over IS', valuePct: 100, result: '≥ 1.35 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 93 },
      { label: 'Shear, wet', sub: 'N/mm² · +20% over IS', valuePct: 100, result: '≥ 1.2 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 83 },
      { label: 'Shear, heat-aged', sub: 'N/mm² · +10% over IS', valuePct: 100, result: '≥ 1.1 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 91 },
    ],
  }},
  { type: 'card', title: 'Where HW202 Goes', data: {
    text: 'High-performance polymer-modified adhesive for small to medium ceramic, vitrified and natural stone, in dry and wet areas.',
    sections: [
      { label: 'Tiles', text: 'Ceramic tiles, Vitrified tiles, Natural stone, marble' },
      { label: 'Areas', text: 'Interior floors, Interior walls, Wet areas, bathrooms, Exterior floors' },
      { label: 'Substrates', text: 'Cement concrete, Brick masonry, Cement plaster, Screeds' },
      { label: 'Back-Butter', text: 'Coat the rear of the tile for proper bonding, as the HW202 TDS instructs. Notch at right angles to the tile\'s long side.' },
    ],
    explain: 'Not for exterior walls or dry wall boards. Use HW203 for exterior walls, HW204 for boards.',
  }},
  { type: 'card', title: 'Tested by an Independent Lab', data: {
    text: 'Tested to IS 15477:2019 methods on a sample sent by Ramco.',
    badge: 'Meets Every Type 2T Bond-Strength Limit Tested — tensile dry and wet; shear dry, wet and heat-aged; slip nil',
    gauges: [
      { label: 'Tensile, dry', sub: 'N/mm² · 1.2× the IS minimum', valuePct: 100, result: '1.2 Lab', rangeStartPct: 0, rangeEndPct: 83, highlight: true, showDot: true },
      { label: 'Tensile, wet', sub: 'N/mm² · 1.08× the IS minimum', valuePct: 100, result: '1.08 Lab', rangeStartPct: 0, rangeEndPct: 93, highlight: true, showDot: true },
      { label: 'Shear, dry', sub: 'N/mm² · 1.02× the IS minimum', valuePct: 100, result: '1.28 Lab', rangeStartPct: 0, rangeEndPct: 98, highlight: true, showDot: true },
      { label: 'Shear, wet', sub: 'N/mm² · 1.08× the IS minimum', valuePct: 100, result: '1.08 Lab', rangeStartPct: 0, rangeEndPct: 93, highlight: true, showDot: true },
      { label: 'Shear, heat-aged', sub: 'N/mm² · 1.1× the IS minimum', valuePct: 100, result: '1.15 Lab', rangeStartPct: 0, rangeEndPct: 87, highlight: true, showDot: true },
    ],
    stats: [
      { value: '20 min', label: 'open time, measured', sub: 'TDS declares 30 min' },
      { value: '30 min', label: 'adjustment time, measured' },
      { value: 'Nil', label: 'slip on a vertical surface', sub: 'IS "T" limit ≤ 0.5 mm' },
    ],
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
      { label: 'Mixing', value: '4.4–6.2 L per 20 kg (22–31%)' },
      { label: 'Grout after 24 hours', value: 'HW210 cement grout or HW211 epoxy grout' },
      { label: 'Traffic', value: '24 hours' },
      { label: 'Shelf life', value: '12 months' },
    ],
  }},
  { type: 'knowledge', title: 'Scenario: On Site', data: {
    text: 'On site: The Exterior Wall. A builder is happy with HW202 on interior work and wants to use the same bag on an external wall clad with vitrified tiles. What is the right advice?',
    list: [
      'Switch to HW203 Tile Fix High, the Type 3T adhesive made for exterior walls',
      'HW202 is fine outside too',
      'Add a bonding agent to HW202',
      'Use a thicker bed of HW202',
    ],
    correctIndex: 0,
  }},
  { type: 'card', title: 'Cheat Sheet', data: {
    text: 'HW202 at a glance. Check it before a visit.',
    sections: [
      { label: 'HW202 Tile Fix Medium', text: 'Type 2T' },
      { label: 'What it is', text: 'High-performance polymer-modified adhesive for small to medium ceramic, vitrified and natural stone, in dry and wet areas.' },
      { label: 'IS class', text: 'IS 15477:2019 Type 2T' },
      { label: 'Tiles', text: 'Ceramic tiles, vitrified tiles, natural stone, marble' },
      { label: 'Areas', text: 'Interior floors, interior walls, wet areas, bathrooms, exterior floors' },
      { label: 'Substrates', text: 'Cement concrete, Brick masonry, Cement plaster, Screeds' },
      { label: 'Not for', text: 'Not for exterior walls or dry wall boards. Use HW203 for exterior walls, HW204 for boards.' },
      { label: 'Key data', text: '≥ 1.25 tensile, dry (IS 1.0) · ≥ 1.2 tensile, wet (IS 1.0) · ≥ 1.35 shear, dry (IS 1.25) · ≥ 1.2 shear, wet (IS 1.0) · ≥ 1.1 shear, heat-aged (IS 1.0) · 30 min open · 30 min adjustment · Slip 0.0 mm' },
      { label: 'Lab proof', text: 'tensile, dry 1.20; tensile, wet 1.08; shear, dry 1.28; shear, wet 1.08; shear, heat-aged 1.15 N/mm²; open 20 min, adjustment 30 min, slip nil.' },
      { label: 'Coverage', text: '60–80 sq ft per 20 kg bag at 3 mm bed' },
      { label: 'Mix', text: '4.4–6.2 L per 20 kg (22–31%). Pot life 2 hours.' },
      { label: 'Packs', text: '20 kg & 40 kg. Shelf life 12 months.' },
    ],
  }},
];

module.exports = {
  productName: 'HW202 Tile Fix Medium',
  productDescription: 'Fixing vitrified, porcelain and natural stone',
  topicDescription: 'Everything a sales, dealer or applicator team member needs to know about HW202 Tile Fix Medium: IS 15477 Type 2 requirements (dry, wet and heat-aged), HW202\'s test data, independent lab proof, where it goes and coverage.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides,
};
