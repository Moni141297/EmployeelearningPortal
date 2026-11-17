// Core domain types for the LearnCert platform

export type Role = 'participant' | 'trainer' | 'admin';
export type UserStatus = 'Active' | 'Inactive';

export interface AppUser {
  id: string;
  emp: string;
  name: string;
  role: Role;
  dept: string;
  plant: string;
  location: string;
  desig: string;
  mobile: string;
  status: UserStatus;
  created: string;
}

export interface Category {
  id: string;
  name: string;
  desc: string;
  icon: string;
  cls: string;
  status: string;
}

export interface Product {
  id: string;
  cat: string;
  name: string;
  desc: string;
  status: string;
}

export type TopicStatus = 'Published' | 'Draft' | 'Archived';

export interface Topic {
  id: string;
  prod: string;
  name: string;
  desc: string;
  pass: number;
  defTime: number;
  examCount: number;
  status: TopicStatus;
  // Self assessment visibility/certification — configured from "Create
  // examination" (self assessment) in examEditor.tsx, enforced in Assess.tsx
  // (mode/parts), finishExam (cert) and Result.tsx (res).
  mode: 'Private' | 'Open';
  lb: boolean;
  res: boolean;
  cert: boolean;
  parts: string[];
}

export type SlideType = 'text' | 'image' | 'video' | 'knowledge' | 'svg' | 'card' | 'stepper';

export interface SlideStat {
  value: string;
  label: string;
  sub?: string;
}

export interface SlideTableRow {
  label: string;
  value: string;
  // Shows a green checkmark next to the value — e.g. a lab result that
  // confirmed a declared TDS spec.
  ok?: boolean;
}

// A labelled, iconed callout — e.g. the three "Seals / Locks / Finishes"
// benefit tiles, or a red-cross/green-check "Don't / Do" item.
export interface SlideBadge {
  icon: string;
  label: string;
  sub?: string;
  tone?: 'ok' | 'bad' | 'neutral';
}

export interface SlideTable {
  headers: string[];
  rows: string[][];
}

// One row of a horizontal gauge/bar comparison — e.g. "TDS Range and Lab
// Result" or a joint-width-by-competitor bar chart. All positions are 0–100
// (percent of the track width); rangeStartPct/EndPct are optional and draw a
// shaded "declared range" band behind the value marker.
export interface SlideGauge {
  label: string;
  sub?: string;
  valuePct: number;
  rangeStartPct?: number;
  rangeEndPct?: number;
  result: string;
  ok?: boolean;
  // false renders the bar in neutral grey instead of gold — e.g. a
  // competitor's row in a bar-per-product comparison, where only the
  // featured product's bar should stand out. Defaults to true.
  highlight?: boolean;
  // false hides the position dot — a plain bar-length comparison (e.g. joint
  // width by competitor) has no "declared vs. actual" story to mark with a
  // dot, unlike a TDS-vs-lab-result gauge. Defaults to true.
  showDot?: boolean;
}

// One tab of a "tap a class to switch" interactive gauge comparison (e.g.
// HW402's "Grade for Grade": M40/M60/M80 pill buttons, each swapping which
// set of competitor-comparison gauges is shown). Reuses SlideGauge rows
// as-is; `explain` is this tab's own callout line, since different tabs on
// the reference genuinely say different things.
export interface SlideGaugeTab {
  label: string;
  gauges: SlideGauge[];
  explain?: string;
}

// One numbered step in a vertical stepper (a reusable, non-SVG alternative
// to embedding a walkthrough inside animated-SVG markup).
export interface SlideStep {
  title: string;
  desc?: string;
}

// One divider-separated block in a definition-list-style section — used for
// content like a product cheat sheet (bold label line, then a description).
export interface SlideSection {
  label: string;
  text: string;
}

// One choice in a calculator's unit toggle (e.g. "sq ft" vs "m²"). `factor`
// converts a value entered in this unit into the calculator's base unit —
// the unit the first entry (index 0) is defined in, so its own factor is 1.
export interface SlideCalcUnit {
  label: string;
  factor: number;
}

// A genuine interactive calculator — a quantity stepper (+/-, optional preset
// shortcuts, optional unit toggle) whose dependent result recomputes live,
// matching the reference Learning Hub's own interactive calculators (e.g.
// "How Much HW101?", "How Many Boxes?"). Never a static worked example: the
// same formula the reference uses must run here too. Two modes cover the
// two patterns seen on the reference site — add a mode only when a genuinely
// different calculation shape is found, not per-product.
//
// 'pack' — qty × perUnitAmount gives a headline result, and a *separate*
// pack-count badge is derived by first rounding qty up to the nearest
// multiple of roundUpGroup (if set), then picking the largest entry in
// packSizes that fits, i.e. count = floor(roundedAmount / packSize). This
// exact algorithm (not a simpler ceil/round) was verified against the
// reference's "How Much HW101?" calculator across 40+ input values — see
// src/lib/calc.ts for the implementation.
//
// 'range' — qty (times the selected unit's factor) is compared against a
// declared min/max coverage per result-unit, giving a result range:
// low = ceil(amount / maxCoveragePerUnit), high = ceil(amount /
// minCoveragePerUnit); a single number is shown when low === high. Verified
// against the reference's "How Many Boxes?" calculator, including its sq
// ft / m² unit toggle.
export interface SlideCalc {
  mode: 'pack' | 'range' | 'tileJoint' | 'dimensions';
  // Label for the quantity being entered, e.g. "bags" or "Area".
  unitLabel: string;
  defaultQty: number;
  min?: number; // defaults to 1
  max?: number; // defaults to 100000
  // Shortcut buttons that set the quantity directly (not increment it) —
  // e.g. [5, 25, 50, 100, 500]. Omit if the reference has none.
  presetSteps?: number[];
  // A unit toggle group (e.g. sq ft / m²) shown instead of presetSteps.
  // The reference never shows both presets and a unit toggle on the same
  // calculator, but nothing here forbids it.
  units?: SlideCalcUnit[];
  // The line under the headline number. {qty} is replaced with the raw
  // entered quantity; {unit} with unitLabel (or the selected toggle unit's
  // label, in 'range' mode). E.g. "of HW101 for {qty} bags of cement" or
  // "boxes of 12 kg for {qty} {unit}".
  resultLabel: string;
  // Static caption below the result — the reference's own fine-print note,
  // copied verbatim (e.g. pack sizes available, or a coverage caveat).
  note?: string;

  // mode: 'pack'
  perUnitAmount?: number; // result units per 1 input unit, e.g. 0.2 (L per bag)
  resultUnit?: string; // e.g. "L"
  roundUpGroup?: number; // e.g. 5 — see algorithm note above
  packSizes?: number[]; // e.g. [1, 5, 10, 20, 50, 200]
  // Optional extra derived range shown as a second line under the pack
  // breakdown — e.g. mix water for a dry-mortar/putty calculator, which is
  // a fixed percentage band of the rounded result amount (roundedAmount),
  // not of the raw unrounded one. value = roundedAmount * extraRangePct[0..1].
  // extraLabel is the unit/caption, e.g. "L water". Verified against
  // HW310's "How Many Bags?" calculator: water = roundedAmount (kg of
  // putty) * 0.35 to 0.40 at every swept bag count.
  extraRangePct?: [number, number];
  extraLabel?: string;

  // mode: 'range'
  minCoveragePerUnit?: number; // the low (worst-case) declared coverage, e.g. 24
  maxCoveragePerUnit?: number; // the high (best-case) declared coverage, e.g. 36
  // A second toggle row (e.g. "20 kg" / "40 kg") that switches the declared
  // coverage band itself, rather than converting the entered quantity — the
  // reference's "How Many Bags?" calculators often let you pick the pack
  // size, and the sq ft (or m²) covered per bag scales with it. When
  // present, the first entry's coverage is used by default and
  // resultLabel's {pack} placeholder is replaced with the selected entry's
  // label (e.g. "bags of {pack} for {qty} {unit}" -> "bags of 20 kg for
  // 500 sq ft"). Omit for a calculator with only one pack size.
  packOptions?: { label: string; minCoveragePerUnit: number; maxCoveragePerUnit: number }[];
  // When set, low/high are shown as true decimals (rounded to this many
  // places, trailing zeros trimmed) instead of the default ceil'd integer
  // count — for a calculator whose result is a continuous quantity (e.g.
  // litres of mixed epoxy) rather than a discrete item count. Verified
  // against HW403's "How Many Kits?" calculator (sq ft -> litres range).
  decimalPlaces?: number;
  // Unit suffix appended directly to the headline range, e.g. "L" ->
  // "10–13.3L". Omit for a bare number (the existing discrete-count case).
  rangeResultUnit?: string;
  // When set, a derived pack-count line is shown under the headline: kits =
  // ceil(high / rangePackSize), formatted via rangePackLabel ("kits of 4 L"
  // style — {size} substitutes rangePackSize). Verified: HW403's "4 kits of
  // 4 L" (1 coat, 200 sq ft) / "7 kits of 4 L" (2 coats, same area).
  rangePackSize?: number;
  rangePackLabel?: string;

  // mode: 'tileJoint' — a tile-grout coverage calculator where the entered
  // area (qty, with its own unit toggle via `units`), a selected tile size,
  // and two further numeric inputs (joint width, tile thickness) together
  // determine the running metres of joint in that area, which is then
  // converted to a kg/bags requirement by scaling the declared coverage
  // rate (metres per kg at a baseline joint width/thickness) by the ratio
  // of joint cross-sections. Verified against the reference's "How Much
  // HW212?" / "How Many Bags?" calculator across 19 swept input
  // combinations (area, tile size, joint width, tile thickness, unit
  // toggle) — see src/lib/calc.ts for the derivation:
  //   pitchM = (tileSizeMm + jointWidthMm) / 1000
  //   areaM2 = (qty * unitFactor) / 10.7639   (unitFactor=1 for the first/
  //     base unit, which must be sq ft for this constant to apply)
  //   runningMetres = 2 * areaM2 / pitchM
  //   crossSectionRatio = (jointWidthMm * thicknessMm) /
  //     (baselineJointWidthMm * baselineThicknessMm)
  //   kg ranges from runningMetres / (maxCoveragePerKg / crossSectionRatio)
  //     to runningMetres / (minCoveragePerKg / crossSectionRatio)
  //   bags = ceil(kg / packSizeKg) at each end of the kg range
  tileSizesMm?: number[]; // tile side length options in mm, e.g. [300, 400, 600, 800]
  defaultTileSizeIdx?: number;
  jointWidthMm?: { default: number; min: number; max: number };
  tileThicknessMm?: { default: number; min: number; max: number };
  baselineJointWidthMm?: number; // joint width the declared coverage rate was measured at
  baselineThicknessMm?: number; // tile thickness the declared coverage rate was measured at
  minCoveragePerKg?: number; // declared low running-metres-per-kg at baseline
  maxCoveragePerKg?: number; // declared high running-metres-per-kg at baseline
  packSizeKg?: number; // e.g. 10
  // {qty}/{unit} substitute as elsewhere; e.g. "For {qty} {unit} with {joint} mm joints"
  tileJointResultLabel?: string;

  // mode: 'dimensions' — a multi-field (L×W×D[×H][×count]) volume-to-bags
  // calculator, for shapes a single quantity+toggle can't express. Two
  // shapes cover the two patterns seen so far:
  //   'box'    — a solid fill: dimFields are [Length mm, Width mm, Depth mm,
  //              Count]; volumeL = (L × W × D) / 1e6 × count.
  //   'jacket' — a hollow shell around a core: dimFields are [Width mm,
  //              Depth mm, Thickness mm, Height m, Count]; the shell's
  //              cross-section area = (W+2T)×(D+2T) − W×D (mm²), then
  //              volumeL = area × (Height×1000) / 1e6 × count.
  // Verified against the reference's own "How Many Bags?" widgets: HW402's
  // (box shape, manual Neat/+Aggregate toggle, never auto-switches even
  // when depth crosses the TDS threshold — confirmed by toggling both ways
  // at a fixed depth) across 5+ swept dimension sets, and HW401's (jacket
  // shape, no toggle shown — the aggregate yield switches automatically and
  // unconditionally whenever thickness exceeds dimAggregateThresholdMm)
  // across 14 swept dimension sets including the exact threshold boundary.
  // In both, the *bag count* always divides by whichever yield (neat or
  // aggregate) is currently active — not a fixed rate — and the aggregate
  // weight-per-bag line only appears once aggregate mode is active.
  dimShape?: 'box' | 'jacket';
  // Each field's own stepper: label shown beside it, and its starting
  // value. The last entry is always the "how many" count multiplier.
  dimFields?: { label: string; default: number; min?: number; max?: number }[];
  dimNeatYieldPerUnit?: number; // L per bag, neat — e.g. 13
  dimAggregateYieldPerUnit?: number; // L per bag, with aggregate — e.g. 15
  // 'auto': no toggle shown; aggregate mode is purely a function of whether
  // dimFields[dimAggregateThresholdFieldIdx] exceeds dimAggregateThresholdMm.
  // 'manual': a Neat/+Aggregate toggle is shown, defaulting to Neat and
  // never auto-switching on its own as dimensions change.
  dimAggregateMode?: 'auto' | 'manual' | 'none';
  dimAggregateThresholdFieldIdx?: number; // index into dimFields (0-based)
  dimAggregateThresholdMm?: number; // strictly-greater-than triggers aggregate (auto mode)
  dimAggregateWeightPerBagKg?: number; // e.g. 7.5 — shown only when aggregate is active
  dimWaterPerBagLow?: number; // e.g. 3
  dimWaterPerBagHigh?: number; // e.g. 3.5
  dimPackLabel?: string; // e.g. "25 kg bags" — shown as the sub-label under the bag count
  // {amount} substitutes the computed litres (rounded to the nearest whole
  // litre); {bags} the bag count. resultLabel is reused as the template.
}

export interface Slide {
  id: string;
  title: string;
  type: SlideType;
  body?: string;
  media?: string;
  images?: string[];
  caption?: string;
  list?: string[];
  explain?: string;
  key?: string;
  // Knowledge check (type: 'knowledge'): `body` holds the question text,
  // `list` holds the options, `correctIndex` marks which option is right.
  correctIndex?: number;
  // Animated SVG (type: 'svg'): self-contained <style>+<svg> markup, scoped
  // to its own class names so multiple svg slides never collide on a page.
  svgMarkup?: string;
  // Card (type: 'card'): a row of big-number stat tiles plus an optional
  // label/value spec table and a green confirmation badge — the
  // non-animated counterpart to an 'svg' slide, for data-heavy content like
  // a TDS spec sheet or a lab-vs-declared comparison.
  stats?: SlideStat[];
  tableRows?: SlideTableRow[];
  badge?: string;
  // A row of labelled, iconed callouts (benefit tiles, or a red/green
  // "Don't / Do" checklist) and/or a true multi-column table (a feature ×
  // competitor comparison grid) — both render independently of slide type,
  // same as stats/tableRows/badge above.
  badges?: SlideBadge[];
  table?: SlideTable;
  gauges?: SlideGauge[];
  // A tabbed variant of `gauges` — a segmented control switches between
  // several named sets of gauge rows (see SlideGaugeTab). Takes priority
  // over the flat `gauges` field when both are present.
  gaugeTabs?: SlideGaugeTab[];
  steps?: SlideStep[];
  sections?: SlideSection[];
  calc?: SlideCalc;
}

export type QuestionType = 'single' | 'multi' | 'tf' | 'yn' | 'fill' | 'image' | 'scenario' | 'match';

export interface MatchPair extends Array<string> {
  0: string;
  1: string;
}

export interface Question {
  id: string;
  topic: string;
  type: QuestionType;
  text: string;
  opts: string[];
  ans: (number | string)[];
  pairs?: [string, string][];
  marks: number;
  time: number | null;
  mandatory: boolean;
  status: 'Active' | 'Archived';
  by: string;
  created: string;
  diff: 'Easy' | 'Medium' | 'Hard';
  explain: string;
  img?: string;
}

export type AttemptMode = 'self' | 'live';
// 'Incomplete' marks an attempt the examiner cut short (see ExamState.endedEarly)
// before the participant had answered every question — it is never scored as a
// Pass or a Fail, since there is no way to tell whether they would have passed.
export type AttemptResult = 'Pass' | 'Fail' | 'Incomplete';

export interface AttemptRow {
  q: Question;
  a: unknown;
  t: number;
  state: 'c' | 'w' | 'u';
  earned: number;
}

export interface ExamState {
  mode: AttemptMode;
  topicId: string;
  eventId: string | null;
  paper: PreparedQuestion[];
  idx: number;
  answers: { a: unknown; t: number }[];
  pass: number;
  defTime: number;
  total: number;
  started: number;
  elapsed: number;
  name: string;
  examKey?: string;
  rows?: AttemptRow[];
  earned?: number;
  pct?: number;
  timeTaken?: string;
  result?: AttemptResult;
  cert?: string;
  // Set when the trainer ends the live event while this participant was still
  // answering (see useStore.endExamEarly / Exam.tsx) — finishExam uses this to
  // tell an examiner-terminated attempt apart from one the participant
  // genuinely finished and failed.
  endedEarly?: boolean;
}

export interface PreparedQuestion extends Question {
  dOpts?: string[];
  dAns?: number[];
  left?: string[];
  right?: string[];
}

export interface Attempt {
  id: string;
  user: string;
  topic: string;
  mode: AttemptMode;
  date: string;
  score: number;
  total: number;
  pct: number;
  result: AttemptResult;
  time: string;
  qcount: number;
  detail?: ExamState;
}

// 'Cancelled' marks an event that never ran because its topic was taken off
// Published while the event was still Draft/Scheduled/Waiting (see
// topicEditor.tsx / cascadeDisableTopicExams); a Live event in that situation
// is force-ended instead, becoming 'Completed' with Incomplete participants.
export type EventStatus = 'Draft' | 'Scheduled' | 'Waiting' | 'Live' | 'Completed' | 'Cancelled';
export type EventType = 'Private' | 'Open';

export interface EventResult {
  u: string;
  s: number;
  t: string;
  result?: AttemptResult;
}

export interface ExamEvent {
  id: string;
  name: string;
  topic: string;
  code: string;
  type: EventType;
  date: string;
  time: string;
  count: number;
  pass: number;
  defTime: number;
  status: EventStatus;
  lb: boolean;
  res: boolean;
  cert: boolean;
  parts: string[];
  joined: string[];
  by: string;
  results?: EventResult[];
}

export interface Certificate {
  id: string;
  user: string;
  topic: string;
  event: string | null; // null for a self-assessment certificate (no scheduled event involved)
  score: number;
  date: string;
  status: 'Valid' | 'Revoked';
}

export type ExpertStatus = 'Raised' | 'Assigned' | 'Answered' | 'Closed';

export interface ExpertQuestion {
  id: string;
  user: string;
  topic: string;
  q: string;
  ai: string;
  note: string;
  date: string;
  status: ExpertStatus;
  resp: string;
  expert: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  entity: string;
  user: string;
  time: string;
  ip: string;
  /** ISO timestamp, UTC (present on entries read from the server) */
  ts?: string;
  /** "Browser · OS" recorded with the action, when known */
  device?: string;
  userName?: string;
  userRole?: string;
}

export interface Notification {
  id: string;
  txt: string;
  time: string;
  read: boolean;
}

export interface ProgressEntry {
  viewed: string[];
  done: boolean;
}

export interface AiMessage {
  r: 'ai' | 'me' | 'sys';
  t: string;
}

export interface AiState {
  open: boolean;
  topic: string | null;
  msgs: AiMessage[];
}
