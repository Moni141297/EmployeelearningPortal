// Shared, product-agnostic logic for the "interactive calculator" slide
// field (SlideCalc) — used by CalcWidget, wherever it's rendered (Learning
// Portal viewer, Content Builder live preview). See the SlideCalc doc
// comment in src/types.ts for the two modes and where their formulas come
// from (verified against the reference Learning Hub's own calculators).
import type { SlideCalc } from '../types';

// Trims a float to at most 2 decimals and drops a trailing ".00"/".0" —
// mirrors how the reference displays amounts like "2L", "2.4L", "0.2L".
export function formatCalcNumber(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  return String(parseFloat(rounded.toFixed(2)));
}

export interface CalcResult {
  headline: string;
  sub: string;
  badges?: string[];
  // Extra labelled lines shown below the headline — used by 'tileJoint'
  // mode, which has more than one dependent number (kg needed, running
  // metres of joint) alongside its primary bags headline.
  extra?: { label: string; value: string }[];
}

const SQFT_PER_M2 = 10.7639;

function applyTemplate(template: string, qty: number, unitLabel: string, packLabel?: string): string {
  let out = template.replace('{qty}', String(qty)).replace('{unit}', unitLabel);
  if (packLabel !== undefined) out = out.replace('{pack}', packLabel);
  return out;
}

// Classic greedy change-making: largest pack size first, as many as fit,
// then the next-largest for whatever's left, down to the smallest size
// (which always finishes the breakdown since every amount here is itself a
// whole multiple of the smallest pack). Verified against the reference's
// own pack badges across 25+ input values spanning every pack tier — it
// shows every denomination used, not just the largest (e.g. 495 bags breaks
// down as 1×50L + 2×20L + 1×5L + 4×1L, four separate badges).
function greedyPackBreakdown(amount: number, packSizes: number[]): { count: number; size: number }[] {
  const sizesDesc = (packSizes.length ? packSizes : [1]).slice().sort((a, b) => b - a);
  const breakdown: { count: number; size: number }[] = [];
  let remaining = Math.round(amount * 1000) / 1000;
  for (const size of sizesDesc) {
    if (remaining < size - 1e-9) continue;
    const count = Math.floor(remaining / size + 1e-9);
    if (count > 0) {
      breakdown.push({ count, size });
      remaining = Math.round((remaining - count * size) * 1000) / 1000;
    }
  }
  if (!breakdown.length) breakdown.push({ count: 1, size: sizesDesc[sizesDesc.length - 1] });
  return breakdown;
}

// 'dimensions' mode's shell/solid volume math, kept separate from the main
// dispatcher for readability — see the SlideCalc doc comment in types.ts
// for the two shapes and how each was verified against the reference.
function computeDimensionsVolumeL(dims: number[], shape: 'box' | 'jacket' | undefined): number {
  if (shape === 'jacket') {
    const [width, depth, thickness, heightM] = dims;
    const areaMm2 = (width + 2 * thickness) * (depth + 2 * thickness) - width * depth;
    return (areaMm2 * (heightM * 1000)) / 1e6;
  }
  // 'box' (default)
  const [length, width, depth] = dims;
  return (length * width * depth) / 1e6;
}

export function computeCalcResult(
  qty: number,
  unitFactor: number,
  calc: SlideCalc,
  currentUnitLabel: string,
  packIdx = 0,
  tileSizeMm?: number,
  jointWidthMm?: number,
  thicknessMm?: number,
  dims?: number[],
  manualAggregate?: boolean
): CalcResult {
  if (calc.mode === 'dimensions') {
    const fields = calc.dimFields ?? [];
    const values = dims && dims.length === fields.length ? dims : fields.map((f) => f.default);
    const count = values[values.length - 1] ?? 1;
    const shapeDims = values.slice(0, -1);
    const perUnitVolumeL = computeDimensionsVolumeL(shapeDims, calc.dimShape);
    const amountL = perUnitVolumeL * count;

    const thresholdIdx = calc.dimAggregateThresholdFieldIdx ?? -1;
    const isAggregate =
      calc.dimAggregateMode === 'manual'
        ? !!manualAggregate
        : calc.dimAggregateMode === 'auto'
        ? (values[thresholdIdx] ?? 0) > (calc.dimAggregateThresholdMm ?? Infinity)
        : false;

    const yieldPerBag = isAggregate ? calc.dimAggregateYieldPerUnit ?? calc.dimNeatYieldPerUnit ?? 1 : calc.dimNeatYieldPerUnit ?? 1;
    const bags = Math.ceil(amountL / yieldPerBag - 1e-9);
    const waterLow = Math.round(bags * (calc.dimWaterPerBagLow ?? 0) * 10) / 10;
    const waterHigh = Math.round(bags * (calc.dimWaterPerBagHigh ?? 0) * 10) / 10;
    const extra: { label: string; value: string }[] = [
      { label: 'Water', value: waterLow === waterHigh ? `${waterLow}L` : `${waterLow}–${waterHigh}L` },
    ];
    if (isAggregate && calc.dimAggregateWeightPerBagKg) {
      extra.push({ label: 'Aggregate', value: `${formatCalcNumber(bags * calc.dimAggregateWeightPerBagKg)} kg` });
    }

    return {
      headline: String(bags),
      sub: calc.dimPackLabel ?? '',
      badges: [`${formatCalcNumber(amountL)}L of volume to fill`, isAggregate ? `+30% aggregate · ${yieldPerBag} L/bag` : `Neat · ${yieldPerBag} L/bag`],
      extra,
    };
  }
  if (calc.mode === 'tileJoint') {
    const tileSize = tileSizeMm ?? calc.tileSizesMm?.[calc.defaultTileSizeIdx ?? 0] ?? 300;
    const jointWidth = jointWidthMm ?? calc.jointWidthMm?.default ?? 10;
    const thickness = thicknessMm ?? calc.tileThicknessMm?.default ?? 10;
    const baseJoint = calc.baselineJointWidthMm ?? 10;
    const baseThickness = calc.baselineThicknessMm ?? 10;
    const minCov = calc.minCoveragePerKg ?? 1;
    const maxCov = calc.maxCoveragePerKg ?? 1;
    const packSize = calc.packSizeKg ?? 1;

    const areaM2 = (qty * unitFactor) / SQFT_PER_M2;
    const pitchM = (tileSize + jointWidth) / 1000;
    const runningMetres = (2 * areaM2) / pitchM;
    const crossSectionRatio = (jointWidth * thickness) / (baseJoint * baseThickness);
    const rateLow = minCov / crossSectionRatio;
    const rateHigh = maxCov / crossSectionRatio;
    const kgHigh = runningMetres / rateLow;
    const kgLow = runningMetres / rateHigh;
    const bagsLow = Math.ceil(kgLow / packSize - 1e-9);
    const bagsHigh = Math.ceil(kgHigh / packSize - 1e-9);
    const fmtRange = (lo: number, hi: number) =>
      Math.round(lo) === Math.round(hi) ? Math.round(lo).toLocaleString() : `${Math.round(lo).toLocaleString()}–${Math.round(hi).toLocaleString()}`;

    return {
      headline: fmtRange(bagsLow, bagsHigh),
      sub: (calc.tileJointResultLabel ?? calc.resultLabel)
        .replace('{qty}', qty.toLocaleString())
        .replace('{unit}', currentUnitLabel)
        .replace('{joint}', String(jointWidth)),
      extra: [
        { label: calc.resultUnit || 'kg', value: fmtRange(kgLow, kgHigh) },
        { label: 'running metres of joint', value: String(Math.round(runningMetres)).replace(/\B(?=(\d{3})+(?!\d))/g, ',') },
      ],
    };
  }
  if (calc.mode === 'pack') {
    const perUnit = calc.perUnitAmount ?? 1;
    // A pack-mode calculator can also carry a unit toggle (e.g. sq ft / m²) —
    // the entered qty is first converted through the selected unit's factor,
    // same as range mode, before the amount and pack breakdown are derived.
    const baseQty = qty * unitFactor;
    const amount = baseQty * perUnit;
    const group = calc.roundUpGroup && calc.roundUpGroup > 0 ? calc.roundUpGroup : 1;
    const roundedQty = Math.ceil(baseQty / group) * group;
    const roundedAmount = roundedQty * perUnit;
    const sizes = calc.packSizes && calc.packSizes.length ? calc.packSizes : [1];
    const breakdown = greedyPackBreakdown(roundedAmount, sizes);
    const unit = calc.resultUnit || '';
    const extra = calc.extraRangePct
      ? [{
          label: calc.extraLabel || '',
          value: (() => {
            const lo = Math.round(roundedAmount * calc.extraRangePct![0]);
            const hi = Math.round(roundedAmount * calc.extraRangePct![1]);
            return lo === hi ? String(lo) : `${lo}–${hi}`;
          })(),
        }]
      : undefined;
    return {
      headline: `${formatCalcNumber(amount)}${unit}`,
      sub: applyTemplate(calc.resultLabel, qty, currentUnitLabel),
      badges: breakdown.map((b) => `${b.count} × ${formatCalcNumber(b.size)} ${unit}`.trim()),
      extra,
    };
  }
  // 'range'
  const pack = calc.packOptions && calc.packOptions.length ? calc.packOptions[packIdx] ?? calc.packOptions[0] : undefined;
  const amount = qty * unitFactor;
  const maxCov = pack?.maxCoveragePerUnit ?? calc.maxCoveragePerUnit ?? 1;
  const minCov = pack?.minCoveragePerUnit ?? calc.minCoveragePerUnit ?? 1;
  let lo: number;
  let hi: number;
  if (calc.decimalPlaces != null) {
    const p = Math.pow(10, calc.decimalPlaces);
    lo = Math.round((amount / maxCov) * p) / p;
    hi = Math.round((amount / minCov) * p) / p;
  } else {
    lo = Math.ceil(amount / maxCov - 1e-9);
    hi = Math.ceil(amount / minCov - 1e-9);
  }
  const rangeUnit = calc.rangeResultUnit || '';
  const rangeExtra = calc.rangePackSize
    ? [{
        label: (calc.rangePackLabel || 'kits of {size}').replace('{size}', formatCalcNumber(calc.rangePackSize)),
        value: String(Math.ceil(hi / calc.rangePackSize - 1e-9)),
      }]
    : undefined;
  return {
    headline: (lo === hi ? String(lo) : `${lo}–${hi}`) + rangeUnit,
    sub: applyTemplate(calc.resultLabel, qty, currentUnitLabel, pack?.label),
    extra: rangeExtra,
  };
}
