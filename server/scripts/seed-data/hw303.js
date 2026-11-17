const { cureCardConventional, cureCardBlockFix } = require('../lib/blockFixDiagrams');
const { svgCard, svgCards } = require('../lib/svgCard');
const { ordinaryVsHw } = require('./hw301');

module.exports = {
  productName: 'HW303 Block Fix Without Sand',
  productDescription: 'Polymer-modified sanded masonry mortar for laying bricks, concrete and laterite blocks',
  topicDescription: 'How Block Fix HW303 concentrate is mixed with site sand, why self-curing matters in a mortar joint, strength and bond data against traditional mortar, and how it compares with conventional site-mixed mortar.',
  assessmentQuestionCount: 5,
  assessmentPassPercentage: 70,
  slides: [
    {
      type: 'image', title: 'Block Fix Without Sand', data: {
        text: 'Polymer-modified masonry concentrate. Mixed with sand on site, it gives a self-curing laying mortar for every block and brick except AAC.',
        images: ['https://hw-learning-hub-v2.vercel.app/images/products/block-fix.webp'],
        caption: 'Block Fix Without Sand HW303',
        key: 'HW303',
      },
    },
    {
      type: 'text', title: 'Block Fix HW 303: Key Features', data: {
        text: 'Polymer-modified masonry concentrate. Mix with sand on site for a self-curing laying mortar. 1 part Block Fix + 5–6 parts sand = Self-curing mortar.',
        badges: [
          { icon: '🧴', label: 'Self-curing', sub: 'No water curing', tone: 'neutral' },
          { icon: '🔗', label: 'Stronger joints', sub: 'Better bond between courses', tone: 'neutral' },
          { icon: '⏱️', label: 'Plaster in 24 hours', sub: 'Faster construction', tone: 'neutral' },
          { icon: '🤲', label: 'About 60 min workable', sub: 'Cohesive, less flow loss', tone: 'neutral' },
          { icon: '🧱', label: 'All blocks and bricks', sub: 'Except AAC', tone: 'neutral' },
          { icon: '📦', label: '40 kg pack', sub: 'Ratio adjustable by unit type', tone: 'neutral' },
        ],
      },
    },
    {
      type: 'svg', title: "You Can't Cure a Joint from Outside", data: {
        text: "Curing water only reaches the face of a mortar joint. What happens inside depends on the mortar itself. Illustration of the mechanism. This is why self-curing matters more in a joint than anywhere else on site.",
        svgMarkup: svgCards([
          svgCard({ title: 'Conventional mortar', style: cureCardConventional.style, svg: cureCardConventional.svg, ol: cureCardConventional.ol, durationSec: 9 }).replace('class="svg-anim anim playing"', `class="svg-anim anim ${cureCardConventional.scopeClass} playing"`),
          svgCard({ title: 'Block Fix HW 303', style: cureCardBlockFix.style, svg: cureCardBlockFix.svg, ol: cureCardBlockFix.ol, durationSec: 9 }).replace('class="svg-anim anim playing"', `class="svg-anim anim ${cureCardBlockFix.scopeClass} playing"`),
        ]),
      },
    },
    {
      type: 'card', title: 'Most Wall Defects Start in the Mortar', data: {
        text: 'Not in the block. Tap each tile to see how the defect develops in an ordinary joint — and how Block Fix helps.',
        badges: [
          { icon: '🧱', label: 'Cracks along joints', sub: 'Poor bond, shrinkage, no curing', tone: 'bad' },
          { icon: '🔓', label: 'Joint separation, loose blocks', sub: 'Weak adhesion to the block', tone: 'bad' },
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
            ['Efflorescence — Excess water, porous mortar, poor curing', 'Better than conventional'],
            ['Damp patches, seepage — Porous or cracked joints', 'Better than conventional'],
            ['Uneven mortar joints — Poor, inconsistent workability', 'Better than conventional'],
          ],
        },
        explanation: 'Self-curing, higher strength and better bond remove the root cause in the mortar itself.',
      },
    },
    {
      type: 'card', title: 'Stronger, Grips Better, Works Longer', data: {
        text: 'Against traditional site-mixed cement mortar, both at 1:6 with sand. RRDC tests. Compressive and split tensile strength in MPa. Bond measured at 28 days.',
        stats: [
          { value: '+19%', label: 'Compressive strength at 28 days', sub: '3.53 vs 2.96 MPa' },
          { value: '+39%', label: 'Bond strength on solid block', sub: '1.32 vs 0.95 MPa' },
          { value: '2×', label: 'Workable time for the mason', sub: '60 vs 30 minutes' },
        ],
        table: {
          headers: ['Metric', 'Block Fix HW303', 'Traditional mortar'],
          rows: [
            ['Compressive, 1 day (MPa)', '0.81', '0.63'],
            ['Compressive, 3 days (MPa)', '1.84', '1.35'],
            ['Compressive, 7 days (MPa)', '2.10', '1.76'],
            ['Compressive, 28 days (MPa)', '3.53', '2.96'],
            ['Bond, solid block (MPa)', '1.32', '0.95'],
            ['Bond, red brick (MPa)', '0.97', '0.72'],
            ['Bond, fly ash (MPa)', '0.79', '0.63'],
            ['Workable time (minutes)', '60', '30'],
            ['Flow kept at 60 min (%)', '87', '78'],
          ],
        },
      },
    },
    {
      type: 'knowledge', title: 'Knowledge Check — Preparation and Use', data: {
        text: 'A site engineer asks how Block Fix HW 303 is prepared and where it can be used. Which answer is right?',
        list: [
          'Use neat from the bag on any block including AAC',
          '1 part Block Fix to 5–6 parts sand; all blocks and bricks except AAC',
          '1 part Block Fix to 1 part cement; AAC blocks only',
          '1 part Block Fix to 10 parts sand; red bricks only',
        ],
        correctIndex: 1,
        explain: 'HW303 is a concentrate: 1 part Block Fix to 5–6 parts sand by volume, for all blocks and bricks except AAC (which needs the thin-bed adhesive HW302).',
      },
    },
    {
      type: 'svg', title: 'Same Wall, Two Ways to Build It', data: {
        text: 'Watch both walls age. The difference is the block and the joint mortar. Illustration of typical masonry failure modes and their causes, as listed in the Block Fix defect table.',
        svgMarkup: `<style>${ordinaryVsHw.style.replace(/sc-hw301-ordinary-vs-hw/g, 'sc-hw303-ordinary-vs-hw')}</style><div class="svg-anim anim sc-hw303-ordinary-vs-hw playing" style="--T:9s">${ordinaryVsHw.svg.replace(/hw301-aw/g, 'hw303-aw')}${ordinaryVsHw.ol}</div>`,
      },
    },
    {
      type: 'knowledge', title: 'Scenario: On Site', data: {
        text: 'On site: The Water Hose. A crew is water-curing a wall laid with Block Fix HW 303 twice a day. The contractor asks whether it is really needed. What do you tell them?',
        list: [
          'Not needed: Block Fix is self-curing and holds water inside the whole joint, so save the water and the labour',
          'Keep curing for 7 days as with any mortar',
          'Cure only the top course',
          'Curing lets you plaster sooner',
        ],
        correctIndex: 0,
        explain: 'Block Fix HW303 is self-curing — the mortar holds the water inside the whole joint, so external water curing is unnecessary.',
      },
    },
    {
      type: 'text', title: 'Cheat Sheet', data: {
        text: 'Block Fix at a glance. Check it before a visit.',
        sections: [
          { label: 'What it is', text: 'Polymer-modified masonry concentrate, mixed with sand on site.' },
          { label: 'Key features', text: 'Self-curing, no water curing. Stronger joints and bond. Plaster after 24 hours.' },
          { label: 'Against competitors', text: '+19% 28-day strength over traditional 1:6 mortar; +39% bond on solid block; 2× workable time.' },
          { label: 'Customer benefit', text: 'Faster wall completion; fewer cracks, less seepage and efflorescence; no curing water.' },
          { label: 'How to use', text: '1 part Block Fix to 5–6 parts sand by volume. All blocks and bricks except AAC. 40 kg pack.' },
          { label: 'Sell to', text: 'Sites laying blocks and bricks (not AAC).' },
        ],
      },
    },
  ],
};
