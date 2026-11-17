import { useState } from 'react';
import type { SlideCalc } from '../../types';
import { computeCalcResult } from '../../lib/calc';

interface Props {
  calc: SlideCalc;
}

// A genuine interactive calculator — see the SlideCalc doc comment in
// types.ts. Every dependent value (headline result, pack badges, sub-label)
// recomputes from local qty/unit state on every change; nothing here is a
// static snapshot. Used in both the Learning Portal viewer and the Content
// Builder's live preview, so authors see the exact same behavior they're
// publishing.
export default function CalcWidget({ calc }: Props) {
  const min = calc.min ?? 1;
  const max = calc.max ?? 100000;
  // The input's own text is tracked separately from the clamped numeric qty
  // used for the calculation — otherwise clamping on every keystroke makes
  // it impossible to backspace the field to empty while typing a new value
  // (it would instantly snap back to `min`). The clamp only applies once
  // there's a real number to clamp; an empty field is a valid, if temporary,
  // typing state.
  const [text, setText] = useState(String(calc.defaultQty));
  const [unitIdx, setUnitIdx] = useState(0);
  const [packIdx, setPackIdx] = useState(0);
  const [tileSizeIdx, setTileSizeIdx] = useState(calc.defaultTileSizeIdx ?? 0);
  const [jointWidth, setJointWidth] = useState(calc.jointWidthMm?.default ?? 10);
  const [thickness, setThickness] = useState(calc.tileThicknessMm?.default ?? 10);
  const [dims, setDims] = useState<number[]>(() => (calc.dimFields ?? []).map((f) => f.default));
  const [manualAggregate, setManualAggregate] = useState(false);

  const parsed = Number(text);
  const qty = text.trim() === '' || Number.isNaN(parsed) ? calc.defaultQty : parsed;
  const clamped = Math.min(max, Math.max(min, qty));

  const unit = calc.units && calc.units.length ? calc.units[unitIdx] : undefined;
  const currentUnitLabel = unit?.label ?? calc.unitLabel;
  const factor = unit?.factor ?? 1;
  const tileSizeMm = calc.tileSizesMm?.[tileSizeIdx];
  const result = computeCalcResult(clamped, factor, calc, currentUnitLabel, packIdx, tileSizeMm, jointWidth, thickness, dims, manualAggregate);

  function setClamped(n: number) {
    if (Number.isNaN(n)) return;
    setText(String(Math.min(max, Math.max(min, n))));
  }

  function onBlur() {
    // Settle the field back to a real, clamped number once the learner
    // finishes editing — while typing, a transient "" or "12" is left alone.
    setText(String(clamped));
  }

  if (calc.mode === 'dimensions') {
    const fields = calc.dimFields ?? [];
    function setDim(i: number, n: number) {
      if (Number.isNaN(n)) return;
      const field = fields[i];
      const clampedN = Math.min(field.max ?? 1000000, Math.max(field.min ?? 0, n));
      setDims((prev) => prev.map((v, vi) => (vi === i ? clampedN : v)));
    }
    return (
      <div className="calc-widget">
        <div className="calc-controls">
          {fields.map((f, fi) => (
            <div className="calc-stepper" key={f.label}>
              <button type="button" aria-label={'Decrease ' + f.label} onClick={() => setDim(fi, dims[fi] - 1)}>
                −
              </button>
              <input
                type="number"
                value={dims[fi]}
                min={f.min ?? 0}
                max={f.max ?? 1000000}
                onChange={(e) => setDim(fi, Number(e.target.value))}
              />
              <span className="calc-unit-label">{f.label}</span>
              <button type="button" aria-label={'Increase ' + f.label} onClick={() => setDim(fi, dims[fi] + 1)}>
                +
              </button>
            </div>
          ))}
          {calc.dimAggregateMode === 'manual' && (
            <div className="calc-chips">
              <button type="button" className={!manualAggregate ? 'on' : ''} onClick={() => setManualAggregate(false)}>
                Neat grout · {calc.dimNeatYieldPerUnit} L/bag
              </button>
              <button type="button" className={manualAggregate ? 'on' : ''} onClick={() => setManualAggregate(true)}>
                +30% aggregate · {calc.dimAggregateYieldPerUnit} L/bag
              </button>
            </div>
          )}
        </div>
        <div className="calc-result">
          <div className="calc-headline">{result.headline}</div>
          <div className="calc-sub">{result.sub}</div>
          {!!result.badges?.length && (
            <div className="calc-badges">
              {result.badges.map((b, bi) => (
                <span className="calc-badge" key={bi}>
                  {b}
                </span>
              ))}
            </div>
          )}
          {!!result.extra?.length && (
            <div className="calc-extra">
              {result.extra.map((e, ei) => (
                <div className="calc-extra-row" key={ei}>
                  <span className="calc-extra-value">{e.value}</span>
                  <span className="calc-extra-label">{e.label}</span>
                </div>
              ))}
            </div>
          )}
          {calc.note && <div className="calc-note">{calc.note}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="calc-widget">
      <div className="calc-controls">
        <div className="calc-stepper">
          <button type="button" aria-label={'Decrease ' + calc.unitLabel} onClick={() => setClamped(clamped - 1)}>
            −
          </button>
          <input
            type="number"
            value={text}
            min={min}
            max={max}
            onChange={(e) => setText(e.target.value)}
            onBlur={onBlur}
          />
          <button type="button" aria-label={'Increase ' + calc.unitLabel} onClick={() => setClamped(clamped + 1)}>
            +
          </button>
          <span className="calc-unit-label">{calc.unitLabel}</span>
        </div>
        {!!calc.presetSteps?.length && (
          <div className="calc-chips">
            {calc.presetSteps.map((p) => (
              <button type="button" key={p} className={clamped === p ? 'on' : ''} onClick={() => setClamped(p)}>
                {p}
              </button>
            ))}
          </div>
        )}
        {!!calc.units?.length && (
          <div className="calc-chips">
            {calc.units.map((u, ui) => (
              <button type="button" key={u.label} className={ui === unitIdx ? 'on' : ''} onClick={() => setUnitIdx(ui)}>
                {u.label}
              </button>
            ))}
          </div>
        )}
        {!!calc.packOptions?.length && (
          <div className="calc-chips">
            {calc.packOptions.map((p, pi) => (
              <button type="button" key={p.label} className={pi === packIdx ? 'on' : ''} onClick={() => setPackIdx(pi)}>
                {p.label}
              </button>
            ))}
          </div>
        )}
        {!!calc.tileSizesMm?.length && (
          <select
            className="calc-select"
            aria-label="Tile size"
            value={tileSizeIdx}
            onChange={(e) => setTileSizeIdx(Number(e.target.value))}
          >
            {calc.tileSizesMm.map((t, ti) => (
              <option key={t} value={ti}>
                {t} × {t}
              </option>
            ))}
          </select>
        )}
        {calc.jointWidthMm && (
          <div className="calc-stepper">
            <button type="button" aria-label="Decrease joint width" onClick={() => setJointWidth(Math.max(calc.jointWidthMm!.min, jointWidth - 1))}>
              −
            </button>
            <input
              type="number"
              value={jointWidth}
              min={calc.jointWidthMm.min}
              max={calc.jointWidthMm.max}
              onChange={(e) => setJointWidth(Math.min(calc.jointWidthMm!.max, Math.max(calc.jointWidthMm!.min, Number(e.target.value) || calc.jointWidthMm!.default)))}
            />
            <span className="calc-unit-label">Joint width (mm)</span>
          </div>
        )}
        {calc.tileThicknessMm && (
          <div className="calc-stepper">
            <button type="button" aria-label="Decrease tile thickness" onClick={() => setThickness(Math.max(calc.tileThicknessMm!.min, thickness - 1))}>
              −
            </button>
            <input
              type="number"
              value={thickness}
              min={calc.tileThicknessMm.min}
              max={calc.tileThicknessMm.max}
              onChange={(e) => setThickness(Math.min(calc.tileThicknessMm!.max, Math.max(calc.tileThicknessMm!.min, Number(e.target.value) || calc.tileThicknessMm!.default)))}
            />
            <span className="calc-unit-label">Tile thickness (mm)</span>
          </div>
        )}
      </div>
      <div className="calc-result">
        <div className="calc-headline">{result.headline}</div>
        <div className="calc-sub">{result.sub}</div>
        {!!result.badges?.length && (
          <div className="calc-badges">
            {result.badges.map((b, bi) => (
              <span className="calc-badge" key={bi}>
                {b}
              </span>
            ))}
          </div>
        )}
        {!!result.extra?.length && (
          <div className="calc-extra">
            {result.extra.map((e, ei) => (
              <div className="calc-extra-row" key={ei}>
                <span className="calc-extra-value">{e.value}</span>
                <span className="calc-extra-label">{e.label}</span>
              </div>
            ))}
          </div>
        )}
        {calc.note && <div className="calc-note">{calc.note}</div>}
      </div>
    </div>
  );
}
