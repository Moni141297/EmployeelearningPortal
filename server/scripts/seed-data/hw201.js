const { wrapCards } = require('../lib/tileFixDiagrams');
const shared = require('./tileFixSharedDiagrams');
const { bagToBondFor } = require('./tileFixBagDiagram');

const fromBagToBond = bagToBondFor('HW201');

const slides = [
  { type: 'image', title: 'Tile Fix Standard', data: {
    text: 'Why tile adhesive beats cement mortar, what IS 15477 Type 1 asks for, and how HW201 measures up: key tests, data against the standard, where it goes, lab proof and coverage.',
    images: ['https://hw-learning-hub-v2.vercel.app/images/products/tile-fix-standard.webp'],
    caption: 'HW201 — Thin bed. Full contact. No water curing.',
    key: 'HW201 · Tile Fix Standard',
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
  { type: 'knowledge', title: 'Knowledge Check — Open Time', data: {
    text: 'How long is the open time of HW Tile Fix once it is spread?',
    list: ['5 minutes', '20 minutes', '45 minutes', '2 hours'],
    correctIndex: 1,
  }},
  { type: 'table', title: 'Mortar vs Tile Adhesive', data: {
    text: 'The same tile, two ways of fixing it.',
    table: {
      headers: ['Feature', 'Cement-sand mortar', 'HW201'],
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
    list: ['Type 1', '"T" for slip resistance', 'Open and adjustment time', 'Batch number', 'Month and year of manufacture', 'Shelf life and storage', 'Mixing instructions'],
    explain: 'Check the Bag: IS 15477 Says It Must Show the items listed above.',
  }},
  { type: 'card', title: 'HW201 · Tile Fix Standard', data: {
    text: 'Polymer-modified cement adhesive for small clay and ceramic tiles and porous stone on interior dry walls and floors.',
    badges: [
      { icon: '📋', label: 'IS 15477:2019 Type 1T', tone: 'neutral' },
      { icon: '🌿', label: 'Greenpro', tone: 'ok' },
      { icon: '🧂', label: 'Grey powder', tone: 'neutral' },
    ],
    tableRows: [
      { label: 'IS class', value: 'Type 1T' },
      { label: 'Open time', value: '25 min' },
      { label: 'Adjustment time', value: '30 min' },
      { label: 'Bed thickness', value: 'Up to 6 mm' },
      { label: 'Pot life', value: '90 min' },
      { label: 'Packs', value: '20 kg & 40 kg' },
    ],
    list: ['Good bond on cement substrates', 'Good sag resistance', 'Smooth consistency, easy application', 'No external water curing', 'Greenpro eco-label'],
  }},
  { type: 'svg', title: 'Open Time and Adjustment Time', data: {
    text: 'Open time: how long combed adhesive can still take a tile. Adjustment time: how long a placed tile can still be moved without losing bond.',
    svgMarkup: wrapCards(shared.openTimeAnnexC, shared.adjustmentTimeAnnexD),
    explain: 'HW201 declares: open time 25 min · adjustment time 30 min',
  }},
  { type: 'svg', title: 'Slip', data: {
    text: 'Does a wall tile slide down before the adhesive sets? A slip-resistant adhesive holds it within 0.5 mm, so wall tiles need no props or packing.',
    svgMarkup: wrapCards(shared.slipAnnexE),
    explain: 'HW201 declares: slip 0.0 mm',
  }},
  { type: 'svg', title: 'Tensile and Shear Adhesion', data: {
    text: 'Tensile: force to pull the tile straight off. Shear: force to slide it sideways. For Type 1 both are tested dry, after 28 days.',
    svgMarkup: wrapCards(shared.tensileAnnexA, shared.shearAnnexB),
    badges: [{ icon: '🧪', label: 'Dry', sub: '28 days in the lab', tone: 'neutral' }],
    explain: 'HW201 declares: tensile, dry ≥ 0.8 · shear, dry ≥ 1.25 N/mm²',
  }},
  { type: 'card', title: 'Meets Every Type 1 Requirement', data: {
    text: 'Each IS 15477 Type 1 requirement, what the HW201 data sheet declares, and by how much it clears the line. Result % = how far above the IS minimum.',
    table: {
      headers: ['Feature', 'Parameter', 'IS Type 1', 'HW201', 'Result'],
      rows: [
        ['Tensile, dry', '≥ 0.5', '≥ 0.5', '≥ 0.8', '+60%'],
        ['Shear, dry', '≥ 1.0', '≥ 1.0', '≥ 1.25', '+25%'],
        ['Open time', '≥ declared', '≥ declared', '25 min', 'Declared'],
        ['Adjustment time', '≥ declared', '≥ declared', '30 min', 'Declared'],
        ['Slip, vertical', '≤ 0.5 mm', '≤ 0.5 mm', '0.0 mm', 'No slip'],
      ],
    },
    gauges: [
      { label: 'Tensile, dry', sub: 'N/mm² · +60% over IS', valuePct: 100, result: '≥ 0.8 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 62 },
      { label: 'Shear, dry', sub: 'N/mm² · +25% over IS', valuePct: 100, result: '≥ 1.25 TDS', highlight: true, showDot: true, rangeStartPct: 0, rangeEndPct: 80 },
    ],
  }},
  { type: 'card', title: 'Where HW201 Goes', data: {
    text: 'Polymer-modified cement adhesive for small clay and ceramic tiles and porous stone on interior dry walls and floors.',
    sections: [
      { label: 'Tiles', text: 'Ceramic tiles, Clay tiles, Porous natural stone — up to 300 × 300 mm' },
      { label: 'Areas', text: 'Interior floors, Interior walls' },
      { label: 'Substrates', text: 'Cement-sand screed, Cement plaster, Masonry' },
    ],
    explain: 'Not for vitrified tiles, wet areas or exteriors. Step up to HW202 or above.',
  }},
  { type: 'card', title: 'Tested by an Independent Lab', data: {
    text: 'Tested to IS 15477:2019 methods on a sample sent by Ramco.',
    badge: 'Meets Every Type 1T Bond-Strength Limit Tested — tensile dry, shear dry, slip nil',
    gauges: [
      { label: 'Tensile, dry', sub: 'N/mm² · 2.0× the IS minimum', valuePct: 100, result: '1.01 Lab', rangeStartPct: 0, rangeEndPct: 50, highlight: true, showDot: true },
      { label: 'Shear, dry', sub: 'N/mm² · 1.2× the IS minimum', valuePct: 100, result: '1.2 Lab', rangeStartPct: 0, rangeEndPct: 83, highlight: true, showDot: true },
    ],
    stats: [
      { value: '20 min', label: 'open time, measured', sub: 'TDS declares 25 min' },
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
      { label: 'Mixing', value: '4.4–6.0 L per 20 kg (22–30%)' },
      { label: 'Grout after 24 hours', value: 'HW210 cement grout or HW211 epoxy grout' },
      { label: 'Traffic', value: '24 hours' },
      { label: 'Shelf life', value: '12 months' },
    ],
  }},
  { type: 'knowledge', title: 'Scenario: On Site', data: {
    text: 'On site: The Metal Counter. A customer wants to tile the top of a steel kitchen counter in a restaurant and asks for a bag of cementitious Tile Fix. Which of the following surfaces is NOT ideal for HW cementitious Tile Fix?',
    list: ['Concrete', 'Screed', 'Metal', 'Plaster'],
    correctIndex: 2,
  }},
  { type: 'card', title: 'Cheat Sheet', data: {
    text: 'HW201 at a glance. Check it before a visit.',
    sections: [
      { label: 'HW201 Tile Fix Standard', text: 'Type 1T' },
      { label: 'What it is', text: 'Polymer-modified cement adhesive for small clay and ceramic tiles and porous stone on interior dry walls and floors.' },
      { label: 'IS class', text: 'IS 15477:2019 Type 1T' },
      { label: 'Tiles', text: 'Ceramic tiles, clay tiles, porous natural stone' },
      { label: 'Areas', text: 'Interior floors, interior walls' },
      { label: 'Substrates', text: 'Cement-sand screed, Cement plaster, Masonry' },
      { label: 'Not for', text: 'Not for vitrified tiles, wet areas or exteriors. Step up to HW202 or above.' },
      { label: 'Key data', text: '≥ 0.8 tensile, dry (IS 0.5) · ≥ 1.25 shear, dry (IS 1.0) · 25 min open · 30 min adjustment · Slip 0.0 mm' },
      { label: 'Lab proof', text: 'tensile, dry 1.01; shear, dry 1.2 N/mm²; open 20 min, adjustment 30 min, slip nil.' },
      { label: 'Coverage', text: '60–80 sq ft per 20 kg bag at 3 mm bed' },
      { label: 'Mix', text: '4.4–6.0 L per 20 kg (22–30%). Pot life 90 min.' },
      { label: 'Packs', text: '20 kg & 40 kg. Shelf life 12 months.' },
    ],
  }},
];

module.exports = {
  productName: 'HW201 Tile Fix Standard',
  productDescription: 'Fixing ceramic and clay tiles on interior walls and floors',
  topicDescription: 'Everything a sales, dealer or applicator team member needs to know about HW201 Tile Fix Standard: why tile adhesive beats cement mortar, IS 15477 Type 1 requirements, HW201\'s test data, independent lab proof, where it goes and coverage.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides,
};
