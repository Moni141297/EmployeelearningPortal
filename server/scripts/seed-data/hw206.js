const { wrapCards } = require('../lib/tileFixDiagrams');
const shared = require('./tileFixSharedDiagrams');
const { bagToBondFor } = require('./tileFixBagDiagram');

const fromBagToBond = bagToBondFor('HW206');

const slides = [
  { type: 'image', title: 'Tile Fix Max White', data: {
    text: 'Why tile adhesive beats cement mortar, what IS 15477 Type 4 asks for, and how HW206 measures up: key tests, data against the standard, where it goes, lab proof and coverage.',
    images: ['https://hw-learning-hub-v2.vercel.app/images/products/tile-fix-max-white.webp'],
    caption: 'HW206 — Thin bed. Full contact. No water curing.',
    key: 'HW206 · Tile Fix Max White',
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
  { type: 'knowledge', title: 'Knowledge Check — Translucent Marble', data: {
    text: 'A lobby floor is white marble with translucent veins. Which adhesive and why?',
    list: [
      'HW206 Tile Fix Max White: white adhesive, so nothing shows through the stone',
      'HW204 Tile Fix Max, grey',
      'HW200 Tile Fix Basic',
      'HW210 Cement Grout',
    ],
    correctIndex: 0,
  }},
  { type: 'table', title: 'Mortar vs Tile Adhesive', data: {
    text: 'The same tile, two ways of fixing it.',
    table: {
      headers: ['Feature', 'Cement-sand mortar', 'HW206'],
      rows: [
        ['Bed thickness', 'Thick, uneven', 'Thin: up to 6 mm'],
        ['Bond', 'Depends on the tile soaking up cement', 'Polymer bond, tested for tensile and shear strength'],
        ['Wall tiles', 'Can slide while setting', 'Slip ≤ 0.5 mm'],
        ['Working time', 'Not defined', 'Open time and adjustment time declared'],
        ['Curing', 'Water curing needed', 'No external water curing'],
        ['Mix quality', 'Site-batched, varies', 'Factory-made, fixed recipe'],
        ['Standard', 'None for tile fixing', 'IS 15477:2019 Type 4'],
      ],
    },
    explain: 'Contact Matters: IS 15477 designs for full contact: at least 85% under the tile in normal conditions and 95% where conditions are demanding.',
  }},
  { type: 'card', title: 'What a Type 4 Adhesive Is For', data: {
    text: 'IS 15477 sorts tile adhesives by the tile, the substrate and the place. This is the Type 4 brief.',
    sections: [
      { label: 'Tile porosity', text: 'All porosities' },
      { label: 'Tiles', text: 'All tiles and stones of Types 1–3, except metal tiles and engineered stone' },
      { label: 'Substrates', text: 'Dry wall boards: gypsum board, plywood, wood, calcium silicate, MDF, fibre cement board, cement board, bison panel' },
      { label: 'Where', text: 'Walls and floors on board substrates, plus cement substrates' },
    ],
    explain: 'Tiles or stones larger than 600 × 600 mm need S1. Larger than 1200 × 1200 mm need S2.',
  }},
  { type: 'card', title: 'What Type 4 Must Achieve', data: {
    text: 'Minimum requirements a Type 4 adhesive has to pass. Tensile dry and wet; shear dry, wet and heat-aged.',
    stats: [
      { value: '≥ 1.5', label: 'Tensile, dry', sub: 'N/mm²' },
      { value: '≥ 1.0', label: 'Tensile, wet', sub: 'N/mm²' },
      { value: '≥ 1.5', label: 'Shear, dry', sub: 'N/mm²' },
      { value: '≥ 1.0', label: 'Shear, wet', sub: 'N/mm²' },
      { value: '≥ 1.0', label: 'Shear, heat-aged', sub: 'N/mm²' },
      { value: 'Declared', label: 'Open time', sub: 'not less than the maker states' },
      { value: 'Declared', label: 'Adjustment time', sub: 'not less than the maker states' },
      { value: '≤ 0.5 mm', label: 'Slip, vertical', sub: 'designated "T"' },
      { value: '2.5 to 5 mm', label: 'Deformability S1', sub: 'tiles over 600 × 600 mm' },
      { value: '≥ 5 mm', label: 'Deformability S2', sub: 'tiles over 1200 × 1200 mm' },
    ],
    list: ['Type 4', '"T" for slip resistance', 'S1 or S2', 'Open and adjustment time', 'Batch number', 'Month and year of manufacture', 'Shelf life and storage', 'Mixing instructions'],
    explain: 'Check the Bag: IS 15477 Says It Must Show the items listed above.',
  }},
  { type: 'card', title: 'HW206 · Tile Fix Max White', data: {
    text: 'White, high-polymer adhesive for vitrified tiles, white marble, light-coloured and translucent stone and glass mosaic, inside and out.',
    badges: [
      { icon: '📋', label: 'IS 15477:2019 Type 4T, in S1 and S2 variants', tone: 'neutral' },
      { icon: '🌿', label: 'Greenpro', tone: 'ok' },
      { icon: '⚪', label: 'White powder', tone: 'neutral' },
    ],
    tableRows: [
      { label: 'IS class', value: 'Type 4T · S1 · S2' },
      { label: 'Open time', value: '45 min' },
      { label: 'Adjustment time', value: '50 min' },
      { label: 'Bed thickness', value: 'Up to 12 mm' },
      { label: 'Pot life', value: '3 hours' },
      { label: 'Packs', value: '20 kg & 40 kg' },
    ],
    list: ['White: no shadow under light stone and mosaic', 'Highest open time in the range: 45 min', 'Enhanced slip resistance', 'Water and thermal resistant', 'S1 and S2 deformable variants', 'Greenpro eco-label'],
  }},
  { type: 'svg', title: 'Open Time and Adjustment Time', data: {
    text: 'Open time: how long combed adhesive can still take a tile. Adjustment time: how long a placed tile can still be moved without losing bond.',
    svgMarkup: wrapCards(shared.openTimeAnnexC, shared.adjustmentTimeAnnexD),
    explain: 'HW206 declares: open time 45 min · adjustment time 50 min',
  }},
  { type: 'svg', title: 'Slip and Deformability', data: {
    text: 'Slip: does a wall tile slide down before the adhesive sets? Deformability: how far the hardened adhesive can bend without breaking. It lets big and slim tiles, boards and exteriors move without cracking or debonding.',
    svgMarkup: wrapCards(shared.slipAnnexE, shared.deformabilityAnnexF),
    explain: 'HW206 declares: slip ≤ 0.5 mm · S1 2.68 mm · S2 ≥ 5 mm',
  }},
  { type: 'svg', title: 'Tensile and Shear Adhesion', data: {
    text: 'Tensile: force to pull the tile straight off. Shear: force to slide it sideways. Both are tested dry and wet; shear also after heat ageing.',
    svgMarkup: wrapCards(shared.tensileAnnexA, shared.shearAnnexB),
    badges: [
      { icon: '🧪', label: 'Dry', sub: '28 days in the lab', tone: 'neutral' },
      { icon: '💧', label: 'Wet', sub: '7 days in the lab, then soaked in water (21 days in all for tensile, 28 for shear)', tone: 'neutral' },
      { icon: '🔥', label: 'Heat-aged', sub: '14 days in the lab, then 14 days at 70 °C (shear)', tone: 'neutral' },
    ],
    explain: 'HW206 declares: tensile, dry ≥ 1.8 · tensile, wet ≥ 1.45 · shear, dry ≥ 1.8 · shear, wet ≥ 1.45 · shear, heat-aged ≥ 1.35 N/mm²',
  }},
  { type: 'card', title: 'Meets Every Type 4 Requirement', data: {
    text: 'Each IS 15477 Type 4 requirement, what the HW206 data sheet declares, and by how much it clears the line. Result % = how far above the IS minimum.',
    table: {
      headers: ['Feature', 'Parameter', 'IS Type 4', 'HW206', 'Result'],
      rows: [
        ['Tensile, dry', '≥ 1.5', '≥ 1.5', '≥ 1.8', '+20%'],
        ['Tensile, wet', '≥ 1.0', '≥ 1.0', '≥ 1.45', '+45%'],
        ['Shear, dry', '≥ 1.5', '≥ 1.5', '≥ 1.8', '+20%'],
        ['Shear, wet', '≥ 1.0', '≥ 1.0', '≥ 1.45', '+45%'],
        ['Shear, heat-aged', '≥ 1.0', '≥ 1.0', '≥ 1.35', '+35%'],
        ['Open time', '≥ declared', '≥ declared', '45 min', 'Declared'],
        ['Adjustment time', '≥ declared', '≥ declared', '50 min', 'Declared'],
        ['Slip, vertical', '≤ 0.5 mm', '≤ 0.5 mm', '≤ 0.5 mm', 'Within'],
        ['Deformability S1', '2.5 to 5 mm', '2.5 to 5 mm', '2.68 mm', 'S1'],
        ['Deformability S2', '≥ 5 mm', '≥ 5 mm', '≥ 5 mm', 'S2'],
      ],
    },
    gauges: [
      { label: 'Tensile, dry', sub: 'N/mm² · +20% over IS', valuePct: 100, result: '≥ 1.8 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 83 },
      { label: 'Tensile, wet', sub: 'N/mm² · +45% over IS', valuePct: 100, result: '≥ 1.45 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 69 },
      { label: 'Shear, dry', sub: 'N/mm² · +20% over IS', valuePct: 100, result: '≥ 1.8 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 83 },
      { label: 'Shear, wet', sub: 'N/mm² · +45% over IS', valuePct: 100, result: '≥ 1.45 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 69 },
      { label: 'Shear, heat-aged', sub: 'N/mm² · +35% over IS', valuePct: 100, result: '≥ 1.35 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 74 },
    ],
  }},
  { type: 'card', title: 'Where HW206 Goes', data: {
    text: 'White, high-polymer adhesive for vitrified tiles, white marble, light-coloured and translucent stone and glass mosaic, inside and out.',
    sections: [
      { label: 'Tiles', text: 'Vitrified tiles, Glass mosaic, Light-coloured stone, White marble (translucent), Large-format tiles, Slim tiles' },
      { label: 'Areas', text: 'Interior floors, Interior walls, Exterior floors, Exterior walls/facades, Pools and water bodies, Tile on tile, Dry wall boards' },
      { label: 'Substrates', text: 'Cement plaster, Screeds, Precast concrete, Concrete walls, Brick masonry, VDF floors, Waterproofed surfaces, Tile on tile, Fibre cement board, Gypsum board, Cement backer board, Bison panel' },
      { label: 'Variants', text: 'HW206 — tiles up to 600 × 600 mm · HW206 S1 — over 600 × 600 mm, slim tiles, limited movement · HW206 S2 — over 1200 × 1200 mm, membranes, heated screeds, decks' },
      { label: 'Back-Butter', text: 'Coat the rear of the tile for proper bonding, as the HW206 TDS instructs. Notch at right angles to the tile\'s long side.' },
    ],
    explain: 'Not for metal, glass or wood substrates. Use HW205.',
  }},
  { type: 'card', title: 'Tested by an Independent Lab', data: {
    text: 'Tested to IS 15477:2019 methods on a sample sent by Ramco.',
    badge: 'Meets Every Type 4T Bond-Strength Limit Tested — tensile dry and wet; shear dry, wet and heat-aged; slip nil',
    gauges: [
      { label: 'Tensile, dry', sub: 'N/mm² · 1.6× the IS minimum', valuePct: 100, result: '2.42 Lab', rangeStartPct: 0, rangeEndPct: 62, highlight: true, showDot: true },
      { label: 'Tensile, wet', sub: 'N/mm² · 2.1× the IS minimum', valuePct: 100, result: '2.1 Lab', rangeStartPct: 0, rangeEndPct: 48, highlight: true, showDot: true },
      { label: 'Shear, dry', sub: 'N/mm² · 1.4× the IS minimum', valuePct: 100, result: '2.17 Lab', rangeStartPct: 0, rangeEndPct: 69, highlight: true, showDot: true },
      { label: 'Shear, wet', sub: 'N/mm² · 1.6× the IS minimum', valuePct: 100, result: '1.6 Lab', rangeStartPct: 0, rangeEndPct: 63, highlight: true, showDot: true },
      { label: 'Shear, heat-aged', sub: 'N/mm² · 1.8× the IS minimum', valuePct: 100, result: '1.78 Lab', rangeStartPct: 0, rangeEndPct: 56, highlight: true, showDot: true },
    ],
    stats: [
      { value: '45 min', label: 'open time, measured' },
      { value: '50 min', label: 'adjustment time, measured' },
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
      { label: 'Mixing', value: '5.0–6.0 L per 20 kg (25–30%)' },
      { label: 'Grout after 24 hours', value: 'HW210 cement grout or HW211 epoxy grout' },
      { label: 'Traffic', value: '24 hours' },
      { label: 'Shelf life', value: '12 months' },
    ],
  }},
  { type: 'knowledge', title: 'Scenario: On Site', data: {
    text: 'On site: The Grey Shadow. On an earlier site, a grey adhesive showed through translucent glass tiles as dark patches and the client rejected the wall. The same client is now tiling a spa with light onyx. How do you avoid a repeat?',
    list: [
      'Specify HW206 Tile Fix Max White for the onyx and any translucent tiles',
      'Use HW204 with a thinner bed',
      'Use HW202 and more grout',
      'Paint the substrate white first',
    ],
    correctIndex: 0,
  }},
  { type: 'card', title: 'Cheat Sheet', data: {
    text: 'HW206 at a glance. Check it before a visit.',
    sections: [
      { label: 'HW206 Tile Fix Max White', text: 'Type 4T · S1 · S2' },
      { label: 'What it is', text: 'White, high-polymer adhesive for vitrified tiles, white marble, light-coloured and translucent stone and glass mosaic, inside and out.' },
      { label: 'IS class', text: 'IS 15477:2019 Type 4T, in S1 and S2 variants' },
      { label: 'Tiles', text: 'Vitrified tiles, glass mosaic, light-coloured stone, white marble (translucent), large-format tiles, slim tiles' },
      { label: 'Areas', text: 'Interior floors, interior walls, exterior floors, exterior walls/facades, pools and water bodies, tile on tile, dry wall boards' },
      { label: 'Substrates', text: 'Cement plaster, Screeds, Precast concrete, Concrete walls, Brick masonry, VDF floors, Waterproofed surfaces, Tile on tile, Fibre cement board, Gypsum board, Cement backer board, Bison panel' },
      { label: 'Not for', text: 'Not for metal, glass or wood substrates. Use HW205.' },
      { label: 'Key data', text: '≥ 1.8 tensile, dry (IS 1.5) · ≥ 1.45 tensile, wet (IS 1.0) · ≥ 1.8 shear, dry (IS 1.5) · ≥ 1.45 shear, wet (IS 1.0) · ≥ 1.35 shear, heat-aged (IS 1.0) · 45 min open · 50 min adjustment · Slip ≤ 0.5 mm · deformability S1 2.68, S2 ≥ 5 mm' },
      { label: 'Lab proof', text: 'tensile, dry 2.42; tensile, wet 2.10; shear, dry 2.17; shear, wet 1.60; shear, heat-aged 1.78 N/mm²; open 45 min, adjustment 50 min, slip nil.' },
      { label: 'Coverage', text: '60–80 sq ft per 20 kg bag at 3 mm bed' },
      { label: 'Mix', text: '5.0–6.0 L per 20 kg (25–30%). Pot life 3 hours.' },
      { label: 'Packs', text: '20 kg & 40 kg. Shelf life 12 months.' },
    ],
  }},
];

module.exports = {
  productName: 'HW206 Tile Fix Max White',
  productDescription: 'Fixing vitrified tiles, and light coloured natural stones on drywalls',
  topicDescription: 'Everything a sales, dealer or applicator team member needs to know about HW206 Tile Fix Max White: IS 15477 Type 4 requirements including deformability (S1/S2), HW206\'s test data, independent lab proof, where it goes and coverage.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides,
};
