import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { StatusTag } from '../../components/ui/Tags';
import RichTextEditor from '../../components/ui/RichTextEditor';
import KnowledgeCheck from '../../components/ui/KnowledgeCheck';
import SvgAnimation from '../../components/ui/SvgAnimation';
import CalcWidget from '../../components/ui/CalcWidget';
import { toDisplayHtml } from '../../lib/richText';
import { api } from '../../lib/api';
import type { SlideType, SlideCalc, SlideGauge, SlideGaugeTab } from '../../types';

const TYPE_LABEL: Record<SlideType, string> = { text: 'Text only', image: 'Text + image', video: 'Text + video', knowledge: 'Knowledge check', svg: 'Animated SVG', card: 'Card (stats + table)', stepper: 'Stepper (numbered walkthrough)' };

function GaugeRowsPreview({ gauges }: { gauges: SlideGauge[] }) {
  return (
    <div className="gauge-card">
      {gauges.map((g, gi) => (
        <div key={gi} className="gauge-row">
          <div className="gl">{g.label}{g.sub && <span className="s">{g.sub}</span>}</div>
          <div className="gauge-track">
            {g.rangeStartPct !== undefined && g.rangeEndPct !== undefined ? (
              <span className="band" style={{ left: `${g.rangeStartPct}%`, width: `${g.rangeEndPct - g.rangeStartPct}%` }} />
            ) : (
              <span className={'bar' + (g.highlight === false ? ' muted' : '')} style={{ width: `${g.valuePct}%` }} />
            )}
            {g.showDot !== false && <span className="dot" style={{ left: `${g.valuePct}%` }} />}
          </div>
          <div className="gr">{g.result}{g.ok && <span className="ok-check">✓</span>}</div>
        </div>
      ))}
    </div>
  );
}

function GaugeTabsPreview({ tabs }: { tabs: SlideGaugeTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active] || tabs[0];
  return (
    <div className="gauge-tabs">
      <div className="gauge-tabs-bar calc-chips">
        {tabs.map((t, ti) => (
          <button key={ti} type="button" className={ti === active ? 'on' : ''} onClick={() => setActive(ti)}>{t.label}</button>
        ))}
      </div>
      <GaugeRowsPreview gauges={tab.gauges} />
      {tab.explain && <div className="explain small"><b>Explanation · </b>{tab.explain}</div>}
    </div>
  );
}

export default function Builder() {
  const [params, setParams] = useSearchParams();
  const topics = useStore((s) => s.topics);
  const productOf = useStore((s) => s.productOf);
  const builderTopic = useStore((s) => s.builderTopic);
  const setBuilderTopic = useStore((s) => s.setBuilderTopic);
  const builderSlideIndex = useStore((s) => s.builderSlideIndex);
  const setBuilderSlideIndex = useStore((s) => s.setBuilderSlideIndex);
  const slides = useStore((s) => s.slides);
  const questions = useStore((s) => s.questions);
  const addSlide = useStore((s) => s.addSlide);
  const updateSlide = useStore((s) => s.updateSlide);
  const duplicateSlide = useStore((s) => s.duplicateSlide);
  const deleteSlide = useStore((s) => s.deleteSlide);
  const moveSlide = useStore((s) => s.moveSlide);
  const reorderSlides = useStore((s) => s.reorderSlides);
  const publishContent = useStore((s) => s.publishContent);
  const toast = useStore((s) => s.toast);
  const openModal = useStore((s) => s.openModal);
  const closeModal = useStore((s) => s.closeModal);
 const navigate = useNavigate();
  const qpTopic = params.get('t');
  useEffect(() => { if (qpTopic && qpTopic !== builderTopic) setBuilderTopic(qpTopic); }, [qpTopic]); // eslint-disable-line react-hooks/exhaustive-deps
  const t = builderTopic;

  const arr = slides[t] || [];
  const i = Math.min(builderSlideIndex, Math.max(0, arr.length - 1));
  const s = arr[i];
  const topic = topics.find((x) => x.id === t)!;
  const dragFrom = useRef<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [, force] = useState(0);

  if (!s) return <div className="empty">No content available.</div>;

  async function onFileChosen(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    setUploading(true);
    try {
      if (s.type === 'video') {
        const { url } = await api.uploads.file(files[0]);
        updateSlide(t, i, { media: url });
      } else {
        // Image slides accept any number of files at once, appended to the
        // existing gallery rather than replacing it.
        const uploaded = await Promise.all(files.map((f) => api.uploads.file(f)));
        updateSlide(t, i, { images: [...(s.images || []), ...uploaded.map((u) => u.url)] });
      }
      toast(files.length > 1 ? 'Images uploaded' : 'Media uploaded', 'ok');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Upload failed', 'bad');
    } finally {
      setUploading(false);
    }
  }

  function removeImage(idx: number) {
    updateSlide(t, i, { images: (s.images || []).filter((_, k) => k !== idx) });
  }

  function preview() {
    openModal(
      <div className="modal wide">
        <div className="modal-h"><h3>Preview — {topic.name}</h3><button className="btn ghost" onClick={closeModal}>✕</button></div>
        <div className="modal-b" style={{ background: 'var(--panel-2)' }}>
          {arr.map((sl, k) => {
            const gallery = sl.images?.length ? sl.images : sl.type === 'image' && sl.media ? [sl.media] : [];
            return (
              <div key={sl.id} className="stage mb">
                <div className="tag b mb">Slide {k + 1}</div>
                <h2>{sl.title}</h2>
                {sl.type === 'knowledge' ? (
                  <KnowledgeCheck question={sl.body || ''} options={sl.list || []} correctIndex={sl.correctIndex ?? 0} explain={sl.explain} />
                ) : (
                  <>
                    {sl.body && <div className="richtext-body" dangerouslySetInnerHTML={{ __html: toDisplayHtml(sl.body) }} />}
                    {sl.calc && <CalcWidget calc={sl.calc} />}
                    {sl.badge && <div className="card-badge-ok">{sl.badge}</div>}
                    {!!sl.stats?.length && (
                      <div className="stat-grid">
                        {sl.stats.map((st, si) => (
                          <div key={si} className="stat-tile">
                            <div className="v">{st.value}</div>
                            <div className="l">{st.label}</div>
                            {st.sub && <div className="s">{st.sub}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                    {!!sl.tableRows?.length && (
                      <div className="card-table">
                        {sl.tableRows.map((row, ri) => (
                          <div key={ri} className="row"><span className="l">{row.label}</span><span className="v">{row.value}{row.ok && <span className="ok-check">✓</span>}</span></div>
                        ))}
                      </div>
                    )}
                    {!!sl.badges?.length && (
                      <div className="badge-grid">
                        {sl.badges.map((b, bi) => (
                          <div key={bi} className={'badge-tile' + (b.tone ? ' ' + b.tone : '')}>
                            <span className="ic">{b.icon}</span>
                            <div><div className="label">{b.label}</div>{b.sub && <div className="sub">{b.sub}</div>}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {!!sl.table?.headers.length && (
                      <div className="full-table-wrap">
                        <table className="full-table">
                          <thead><tr>{sl.table.headers.map((h, hi) => <th key={hi}>{h}</th>)}</tr></thead>
                          <tbody>{sl.table.rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>)}</tbody>
                        </table>
                      </div>
                    )}
                    {sl.gaugeTabs?.length ? (
                      <GaugeTabsPreview tabs={sl.gaugeTabs} />
                    ) : (
                      !!sl.gauges?.length && <GaugeRowsPreview gauges={sl.gauges} />
                    )}
                    {!!sl.steps?.length && (
                      <div className="stepper">
                        {sl.steps.map((st, si) => (
                          <div key={si} className="stepper-item">
                            <span className="stepper-no">{si + 1}</span>
                            <div><div className="t">{st.title}</div>{st.desc && <div className="d">{st.desc}</div>}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {!!sl.sections?.length && (
                      <div className="sheet-sections">
                        {sl.sections.map((sec, si) => (
                          <div key={si} className="sheet-section"><div className="l">{sec.label}</div><div className="t">{sec.text}</div></div>
                        ))}
                      </div>
                    )}
                    {sl.type === 'svg' && sl.svgMarkup && <SvgAnimation markup={sl.svgMarkup} />}
                    {sl.type === 'video' && sl.media && (
                      <div className="media" style={{ position: 'relative' }}>
                        <video src={sl.media} controls controlsList="nofullscreen noremoteplayback nodownload noplaybackrate" disablePictureInPicture style={{ maxWidth: '100%' }} />
                        <button type="button" className="video-expand-btn" title="Expand to fullscreen"
                          onClick={(e) => (e.currentTarget.previousElementSibling as HTMLVideoElement)?.requestFullscreen?.()}>⛶</button>
                        {sl.caption && <div className="cp">{sl.caption}</div>}
                      </div>
                    )}
                    {gallery.length > 0 && (
                      <div className="imggrid">
                        {gallery.map((src, gi) => <div key={gi} className="media"><img src={src} alt={sl.caption || sl.title} style={{ maxWidth: '100%' }} /></div>)}
                      </div>
                    )}
                    {gallery.length > 0 && sl.caption && <div className="cp">{sl.caption}</div>}
                    {sl.list && sl.list.length > 0 && <ul>{sl.list.map((x, xi) => <li key={xi}>{x}</li>)}</ul>}
                    {sl.explain && <div className="explain small">{sl.explain}</div>}
                    {sl.key && <div className="keypoint small">{sl.key}</div>}
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="modal-f"><button className="btn" onClick={closeModal}>Close preview</button></div>
      </div>
    );
  }

  return (
    <div>
      <div className="spread mb wrap">
        <div className="row wrap">
          <select className="inp" style={{ width: 'auto', maxWidth: '100%', minWidth: 0 }} value={t} onChange={(e) => { setBuilderTopic(e.target.value); setParams({ t: e.target.value }); }}>
            {topics.map((x) => <option key={x.id} value={x.id}>{productOf(x.id).name} → {x.name}</option>)}
          </select>
          <StatusTag status={topic.status} />
          <span className="small muted">{arr.length} slides</span>
        </div>
        <div className="row">
          <button className="btn" onClick={preview}>▷ Preview</button>
          <button className="btn" onClick={() => toast('Draft saved', 'ok')}>Save draft</button>
          <button className="btn pri" onClick={() => { publishContent(t); toast('Content published — participants can now access it', 'ok'); }}>Publish</button>
          <button className="btn" onClick={() => navigate(`/app/trainer/dashboard`)}>
            ⬅ Back
          </button>
        </div>
      </div>
      <div className="builder">
        <div className="card pad builder-slides" style={{ maxHeight: 620, overflow: 'auto' }}>
          <div className="spread mb"><b className="xs muted" style={{ textTransform: 'uppercase', letterSpacing: '.08em' }}>Slides</b><button className="btn sm" onClick={() => addSlide(t, i)}>+</button></div>
          <div className="builder-thumbs">
            {arr.map((sl, k) => (
              <div
                key={sl.id}
                className={'thumb ' + (k === i ? 'on' : '')}
                draggable
                onDragStart={() => { dragFrom.current = k; }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); if (dragFrom.current !== null && dragFrom.current !== k) { reorderSlides(t, dragFrom.current, k); toast('Slides reordered'); } dragFrom.current = null; }}
                onClick={() => setBuilderSlideIndex(k)}
              >
                <span className="no">{k + 1}</span>
                <div className="t">{sl.title || 'Untitled'}</div>
                <div className="xs muted">{TYPE_LABEL[sl.type]}</div>
                <div className="row xs" style={{ marginTop: 5, gap: 4 }}>
                  <span onClick={(e) => { e.stopPropagation(); duplicateSlide(t, k); }} style={{ cursor: 'pointer' }} title="Duplicate">⧉</span>
                  <span onClick={(e) => { e.stopPropagation(); moveSlide(t, k, -1); }} style={{ cursor: 'pointer' }} title="Move up">▲</span>
                  <span onClick={(e) => { e.stopPropagation(); moveSlide(t, k, 1); }} style={{ cursor: 'pointer' }} title="Move down">▼</span>
                  <span onClick={(e) => { e.stopPropagation(); if (deleteSlide(t, k)) toast('Slide deleted'); else toast('A module must contain at least one slide', 'bad'); }} style={{ cursor: 'pointer', color: 'var(--bad)' }} title="Delete">✕</span>
                </div>
              </div>
            ))}
          </div>
          <div className="xs muted center mt">Drag slides to reorder</div>
        </div>
        <div className="canvas">
          <div className="xs muted mb">Slide {i + 1} of {arr.length} — editing</div>
          <input className="inp" value={s.title} placeholder="Slide title"
            style={{ fontSize: 19, fontWeight: 700, border: 'none', borderBottom: '2px solid var(--line)', borderRadius: 0, paddingLeft: 0 }}
            onChange={(e) => updateSlide(t, i, { title: e.target.value })} />
          <label className="f mt2">{s.type === 'knowledge' ? 'Question' : 'Body text'}</label>
          <RichTextEditor key={s.id} value={s.body || ''} placeholder={s.type === 'knowledge' ? 'The question to ask…' : 'Main content of the slide…'} onChange={(html) => updateSlide(t, i, { body: html })} />
          {s.type === 'knowledge' ? (
            <>
              <label className="f mt">Options <span className="muted">— pick the correct one</span></label>
              {(s.list?.length ? s.list : ['', '']).map((opt, oi) => (
                <div key={oi} className="row mt" style={{ gap: 8 }}>
                  <input type="radio" name="kc-correct" title="Correct answer" checked={(s.correctIndex ?? 0) === oi}
                    onChange={() => updateSlide(t, i, { correctIndex: oi })} />
                  <input className="inp" style={{ flex: 1 }} value={opt} placeholder={`Option ${oi + 1}`}
                    onChange={(e) => {
                      const next = (s.list?.length ? s.list : ['', '']).slice();
                      next[oi] = e.target.value;
                      updateSlide(t, i, { list: next });
                    }} />
                  <button type="button" className="btn ghost sm" title="Remove option"
                    onClick={() => {
                      const cur = s.list?.length ? s.list : ['', ''];
                      const next = cur.filter((_, k) => k !== oi);
                      const curCorrect = s.correctIndex ?? 0;
                      const nextCorrect = curCorrect === oi ? 0 : curCorrect > oi ? curCorrect - 1 : curCorrect;
                      updateSlide(t, i, { list: next, correctIndex: Math.min(nextCorrect, Math.max(0, next.length - 1)) });
                    }}>✕</button>
                </div>
              ))}
              <div className="mt"><button type="button" className="btn sm" onClick={() => updateSlide(t, i, { list: [...(s.list?.length ? s.list : ['', '']), ''] })}>+ Add option</button></div>
            </>
          ) : (
            <>
              <label className="f mt">Bullet points (one per line)</label>
              <textarea className="inp" placeholder="Each line becomes a bullet point" value={(s.list || []).join('\n')} onChange={(e) => updateSlide(t, i, { list: e.target.value.split('\n').filter((x) => x.trim()) })} />
            </>
          )}
          {s.type === 'video' && (
            <>
              <label className="f mt">Video</label>
              {s.media && (
                <div className="media mt" style={{ position: 'relative' }}>
                  <video src={s.media} controls controlsList="nofullscreen noremoteplayback nodownload noplaybackrate" disablePictureInPicture style={{ maxWidth: '100%' }} />
                  <button type="button" className="video-expand-btn" title="Expand to fullscreen"
                    onClick={(e) => (e.currentTarget.previousElementSibling as HTMLVideoElement)?.requestFullscreen?.()}>⛶</button>
                </div>
              )}
              <input ref={fileInput} type="file" accept="video/mp4,video/webm" style={{ display: 'none' }} onChange={onFileChosen} />
              <div className="mt">
                <button className="btn sm" onClick={() => fileInput.current?.click()} disabled={uploading}>
                  {uploading ? 'Uploading…' : s.media ? '⬆ Replace video' : '⬆ Upload video'}
                </button>
              </div>
              <label className="f mt">Caption</label>
              <input className="inp" value={s.caption || ''} placeholder="Figure 1 — …" onChange={(e) => updateSlide(t, i, { caption: e.target.value })} />
            </>
          )}
          {s.type === 'svg' && (
            <>
              <label className="f mt">SVG markup <span className="muted">— self-contained &lt;style&gt;+&lt;svg&gt; bundle</span></label>
              <textarea className="inp mono" style={{ minHeight: 160, fontSize: 12 }} placeholder="Paste a self-contained <style>...</style><div class=&quot;svg-anim ...&quot;>...<svg>...</svg></div> bundle"
                value={s.svgMarkup || ''} onChange={(e) => updateSlide(t, i, { svgMarkup: e.target.value })} />
              {s.svgMarkup && (
                <>
                  <label className="f mt">Live preview</label>
                  <SvgAnimation key={s.id + '-' + s.svgMarkup.length} markup={s.svgMarkup} />
                </>
              )}
            </>
          )}
          {(s.type === 'card' || s.type === 'svg' || s.type === 'stepper') && (
            <>
              <label className="f mt">Confirmation badge <span className="muted">— optional, shown as a green pill</span></label>
              <input className="inp" value={s.badge || ''} placeholder="e.g. 4 of 4 TDS values confirmed" onChange={(e) => updateSlide(t, i, { badge: e.target.value })} />

              <div className="spread mt">
                <label className="f">Interactive calculator <span className="muted">— a live +/- stepper with a dependent result, e.g. "How Much HW101?"</span></label>
                {!s.calc ? (
                  <button type="button" className="btn ghost sm" onClick={() => updateSlide(t, i, { calc: {
                    mode: 'pack', unitLabel: 'units', defaultQty: 10, min: 1, max: 100000,
                    resultLabel: 'for {qty} {unit}', perUnitAmount: 1, resultUnit: '', packSizes: [1],
                  } })}>+ Add calculator</button>
                ) : (
                  <button type="button" className="btn ghost sm" title="Remove calculator" onClick={() => updateSlide(t, i, { calc: undefined })}>✕ Remove</button>
                )}
              </div>
              {s.calc && (() => {
                const c = s.calc as SlideCalc;
                const patchCalc = (p: Partial<SlideCalc>) => updateSlide(t, i, { calc: { ...c, ...p } });
                return (
                  <div style={{ border: '1px solid var(--line)', borderRadius: 10, padding: 12, marginTop: 8 }}>
                    <div className="row mt" style={{ gap: 8 }}>
                      <select className="inp" style={{ width: 110 }} value={c.mode} onChange={(e) => patchCalc({ mode: e.target.value as 'pack' | 'range' })}>
                        <option value="pack">Pack mode</option>
                        <option value="range">Range mode</option>
                      </select>
                      <input className="inp" style={{ flex: 1 }} value={c.unitLabel} placeholder="bags / Area" onChange={(e) => patchCalc({ unitLabel: e.target.value })} />
                      <input className="inp" type="number" style={{ width: 90 }} value={c.defaultQty} title="Default quantity" onChange={(e) => patchCalc({ defaultQty: +e.target.value })} />
                      <input className="inp" type="number" style={{ width: 80 }} value={c.min ?? ''} placeholder="min" onChange={(e) => patchCalc({ min: e.target.value === '' ? undefined : +e.target.value })} />
                      <input className="inp" type="number" style={{ width: 80 }} value={c.max ?? ''} placeholder="max" onChange={(e) => patchCalc({ max: e.target.value === '' ? undefined : +e.target.value })} />
                    </div>
                    <label className="f mt">Result sub-label <span className="muted">— use {'{qty}'} and {'{unit}'}</span></label>
                    <input className="inp" value={c.resultLabel} placeholder="of HW101 for {qty} bags of cement" onChange={(e) => patchCalc({ resultLabel: e.target.value })} />
                    <label className="f mt">Preset shortcuts <span className="muted">— comma-separated, sets the quantity directly</span></label>
                    <input className="inp" value={(c.presetSteps || []).join(', ')} placeholder="5, 25, 50, 100, 500" onChange={(e) => patchCalc({ presetSteps: e.target.value.split(',').map((x) => +x.trim()).filter((n) => !Number.isNaN(n)) })} />
                    <label className="f mt">Unit toggle <span className="muted">— optional, "label:factor" pairs, comma-separated (first is the base unit, factor 1)</span></label>
                    <input className="inp" value={(c.units || []).map((u) => `${u.label}:${u.factor}`).join(', ')} placeholder="sq ft:1, m²:10.7639"
                      onChange={(e) => {
                        const units = e.target.value.split(',').map((x) => x.trim()).filter(Boolean).map((pair) => {
                          const [label, factor] = pair.split(':');
                          return { label: (label || '').trim(), factor: Number(factor) || 1 };
                        });
                        patchCalc({ units: units.length ? units : undefined });
                      }} />
                    {c.mode === 'pack' ? (
                      <div className="row mt" style={{ gap: 8 }}>
                        <input className="inp" type="number" step="any" style={{ width: 110 }} value={c.perUnitAmount ?? ''} placeholder="per-unit amt" title="Result amount per 1 input unit, e.g. 0.2" onChange={(e) => patchCalc({ perUnitAmount: +e.target.value })} />
                        <input className="inp" style={{ width: 80 }} value={c.resultUnit || ''} placeholder="L" onChange={(e) => patchCalc({ resultUnit: e.target.value })} />
                        <input className="inp" type="number" style={{ width: 110 }} value={c.roundUpGroup ?? ''} placeholder="round-up group" title="Round the quantity up to a multiple of this before computing the pack badge" onChange={(e) => patchCalc({ roundUpGroup: e.target.value === '' ? undefined : +e.target.value })} />
                        <input className="inp" style={{ flex: 1 }} value={(c.packSizes || []).join(', ')} placeholder="1, 5, 10, 20, 50, 200" title="Available pack sizes" onChange={(e) => patchCalc({ packSizes: e.target.value.split(',').map((x) => +x.trim()).filter((n) => !Number.isNaN(n)) })} />
                      </div>
                    ) : (
                      <div className="row mt" style={{ gap: 8 }}>
                        <input className="inp" type="number" step="any" style={{ width: 140 }} value={c.minCoveragePerUnit ?? ''} placeholder="min coverage (low end)" onChange={(e) => patchCalc({ minCoveragePerUnit: +e.target.value })} />
                        <input className="inp" type="number" step="any" style={{ width: 140 }} value={c.maxCoveragePerUnit ?? ''} placeholder="max coverage (high end)" onChange={(e) => patchCalc({ maxCoveragePerUnit: +e.target.value })} />
                      </div>
                    )}
                    <label className="f mt">Note <span className="muted">— static caption shown under the result</span></label>
                    <input className="inp" value={c.note || ''} placeholder="At 200 ml per 50 kg bag. Packs of 1, 5, 10, 20, 50 and 200 L." onChange={(e) => patchCalc({ note: e.target.value })} />
                    <label className="f mt">Live preview</label>
                    <div className="stage pad" style={{ padding: 16 }}>
                      <CalcWidget calc={c} />
                    </div>
                  </div>
                );
              })()}

              <div className="spread mt"><label className="f">Stat tiles</label><button type="button" className="btn ghost sm" onClick={() => updateSlide(t, i, { stats: [...(s.stats || []), { value: '', label: '', sub: '' }] })}>+ Add stat</button></div>
              {(s.stats || []).map((st, si) => (
                <div key={si} className="row mt" style={{ gap: 8 }}>
                  <input className="inp" style={{ width: 90 }} value={st.value} placeholder="60" onChange={(e) => { const next = (s.stats || []).slice(); next[si] = { ...st, value: e.target.value }; updateSlide(t, i, { stats: next }); }} />
                  <input className="inp" style={{ flex: 1 }} value={st.label} placeholder="minutes pot life" onChange={(e) => { const next = (s.stats || []).slice(); next[si] = { ...st, label: e.target.value }; updateSlide(t, i, { stats: next }); }} />
                  <input className="inp" style={{ flex: 1 }} value={st.sub || ''} placeholder="After mixing" onChange={(e) => { const next = (s.stats || []).slice(); next[si] = { ...st, sub: e.target.value }; updateSlide(t, i, { stats: next }); }} />
                  <button type="button" className="btn ghost sm" title="Remove stat" onClick={() => updateSlide(t, i, { stats: (s.stats || []).filter((_, k) => k !== si) })}>✕</button>
                </div>
              ))}

              <div className="spread mt"><label className="f">Spec table rows <span className="muted">— simple label/value pairs</span></label><button type="button" className="btn ghost sm" onClick={() => updateSlide(t, i, { tableRows: [...(s.tableRows || []), { label: '', value: '' }] })}>+ Add row</button></div>
              {(s.tableRows || []).map((row, ri) => (
                <div key={ri} className="row mt" style={{ gap: 8, alignItems: 'center' }}>
                  <input className="inp" style={{ flex: 1 }} value={row.label} placeholder="Appearance" onChange={(e) => { const next = (s.tableRows || []).slice(); next[ri] = { ...row, label: e.target.value }; updateSlide(t, i, { tableRows: next }); }} />
                  <input className="inp" style={{ flex: 1 }} value={row.value} placeholder="Powder" onChange={(e) => { const next = (s.tableRows || []).slice(); next[ri] = { ...row, value: e.target.value }; updateSlide(t, i, { tableRows: next }); }} />
                  <label className="xs row" style={{ gap: 4, alignItems: 'center', whiteSpace: 'nowrap' }}><input type="checkbox" checked={!!row.ok} onChange={(e) => { const next = (s.tableRows || []).slice(); next[ri] = { ...row, ok: e.target.checked }; updateSlide(t, i, { tableRows: next }); }} /> ✓</label>
                  <button type="button" className="btn ghost sm" title="Remove row" onClick={() => updateSlide(t, i, { tableRows: (s.tableRows || []).filter((_, k) => k !== ri) })}>✕</button>
                </div>
              ))}

              <div className="spread mt"><label className="f">Badge tiles <span className="muted">— benefit callouts or a Don't/Do checklist</span></label><button type="button" className="btn ghost sm" onClick={() => updateSlide(t, i, { badges: [...(s.badges || []), { icon: '✓', label: '', sub: '', tone: 'neutral' }] })}>+ Add badge</button></div>
              {(s.badges || []).map((b, bi) => (
                <div key={bi} className="row mt" style={{ gap: 8 }}>
                  <input className="inp" style={{ width: 50 }} value={b.icon} placeholder="💧" onChange={(e) => { const next = (s.badges || []).slice(); next[bi] = { ...b, icon: e.target.value }; updateSlide(t, i, { badges: next }); }} />
                  <input className="inp" style={{ flex: 1 }} value={b.label} placeholder="Seals" onChange={(e) => { const next = (s.badges || []).slice(); next[bi] = { ...b, label: e.target.value }; updateSlide(t, i, { badges: next }); }} />
                  <input className="inp" style={{ flex: 1 }} value={b.sub || ''} placeholder="Keeps moisture and dirt out of the bed" onChange={(e) => { const next = (s.badges || []).slice(); next[bi] = { ...b, sub: e.target.value }; updateSlide(t, i, { badges: next }); }} />
                  <select className="inp" style={{ width: 100 }} value={b.tone || 'neutral'} onChange={(e) => { const next = (s.badges || []).slice(); next[bi] = { ...b, tone: e.target.value as 'ok' | 'bad' | 'neutral' }; updateSlide(t, i, { badges: next }); }}>
                    <option value="neutral">Neutral</option>
                    <option value="ok">Green</option>
                    <option value="bad">Red</option>
                  </select>
                  <button type="button" className="btn ghost sm" title="Remove badge" onClick={() => updateSlide(t, i, { badges: (s.badges || []).filter((_, k) => k !== bi) })}>✕</button>
                </div>
              ))}

              <div className="spread mt"><label className="f">Full comparison table <span className="muted">— headers + rows, any number of columns</span></label></div>
              <input className="inp mt" value={(s.table?.headers || []).join(' | ')} placeholder="Feature | HW210 | Rainbow Tile Mate | 600 Series | Ardex"
                onChange={(e) => updateSlide(t, i, { table: { headers: e.target.value.split('|').map((x) => x.trim()), rows: s.table?.rows || [] } })} />
              <div className="xs muted mt">Headers, separated by |</div>
              {(s.table?.rows || []).map((row, ri) => (
                <div key={ri} className="row mt" style={{ gap: 8 }}>
                  <input className="inp" style={{ flex: 1 }} value={row.join(' | ')} placeholder="Pot life | 60 min | 60 min@30°C | 60 min@21°C | 30 min@27°C"
                    onChange={(e) => { const next = (s.table?.rows || []).slice(); next[ri] = e.target.value.split('|').map((x) => x.trim()); updateSlide(t, i, { table: { headers: s.table?.headers || [], rows: next } }); }} />
                  <button type="button" className="btn ghost sm" title="Remove row" onClick={() => updateSlide(t, i, { table: { headers: s.table?.headers || [], rows: (s.table?.rows || []).filter((_, k) => k !== ri) } })}>✕</button>
                </div>
              ))}
              <div className="mt"><button type="button" className="btn sm" onClick={() => updateSlide(t, i, { table: { headers: s.table?.headers || [], rows: [...(s.table?.rows || []), (s.table?.headers || []).map(() => '')] } })}>+ Add row</button></div>

              <div className="spread mt"><label className="f">Gauge rows <span className="muted">— a bar/track comparison, e.g. TDS vs lab result</span></label><button type="button" className="btn ghost sm" onClick={() => updateSlide(t, i, { gauges: [...(s.gauges || []), { label: '', sub: '', valuePct: 50, result: '', ok: false }] })}>+ Add gauge</button></div>
              {(s.gauges || []).map((g, gi) => (
                <div key={gi} className="row mt" style={{ gap: 8, flexWrap: 'wrap' }}>
                  <input className="inp" style={{ width: 120 }} value={g.label} placeholder="Pot life" onChange={(e) => { const next = (s.gauges || []).slice(); next[gi] = { ...g, label: e.target.value }; updateSlide(t, i, { gauges: next }); }} />
                  <input className="inp" style={{ width: 100 }} value={g.sub || ''} placeholder="minutes" onChange={(e) => { const next = (s.gauges || []).slice(); next[gi] = { ...g, sub: e.target.value }; updateSlide(t, i, { gauges: next }); }} />
                  <input className="inp" type="number" style={{ width: 70 }} value={g.valuePct} title="Value position, 0–100" onChange={(e) => { const next = (s.gauges || []).slice(); next[gi] = { ...g, valuePct: +e.target.value }; updateSlide(t, i, { gauges: next }); }} />
                  <input className="inp" type="number" style={{ width: 70 }} value={g.rangeStartPct ?? ''} placeholder="band start" onChange={(e) => { const next = (s.gauges || []).slice(); next[gi] = { ...g, rangeStartPct: e.target.value === '' ? undefined : +e.target.value }; updateSlide(t, i, { gauges: next }); }} />
                  <input className="inp" type="number" style={{ width: 70 }} value={g.rangeEndPct ?? ''} placeholder="band end" onChange={(e) => { const next = (s.gauges || []).slice(); next[gi] = { ...g, rangeEndPct: e.target.value === '' ? undefined : +e.target.value }; updateSlide(t, i, { gauges: next }); }} />
                  <input className="inp" style={{ width: 90 }} value={g.result} placeholder="60" onChange={(e) => { const next = (s.gauges || []).slice(); next[gi] = { ...g, result: e.target.value }; updateSlide(t, i, { gauges: next }); }} />
                  <label className="xs row" style={{ gap: 4, alignItems: 'center' }}><input type="checkbox" checked={!!g.ok} onChange={(e) => { const next = (s.gauges || []).slice(); next[gi] = { ...g, ok: e.target.checked }; updateSlide(t, i, { gauges: next }); }} /> ✓</label>
                  <button type="button" className="btn ghost sm" title="Remove gauge" onClick={() => updateSlide(t, i, { gauges: (s.gauges || []).filter((_, k) => k !== gi) })}>✕</button>
                </div>
              ))}

              <div className="spread mt"><label className="f">Gauge tabs <span className="muted">— a "tap a class to switch" comparison, e.g. M40/M60/M80 grades</span></label><button type="button" className="btn ghost sm" onClick={() => updateSlide(t, i, { gaugeTabs: [...(s.gaugeTabs || []), { label: '', gauges: [] }] })}>+ Add tab</button></div>
              {(s.gaugeTabs || []).map((gt, gti) => (
                <div key={gti} className="stage pad mt" style={{ padding: 12 }}>
                  <div className="row mt" style={{ gap: 8 }}>
                    <input className="inp" style={{ width: 120 }} value={gt.label} placeholder="M40" onChange={(e) => { const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, label: e.target.value }; updateSlide(t, i, { gaugeTabs: next }); }} />
                    <button type="button" className="btn ghost sm" title="Remove tab" onClick={() => updateSlide(t, i, { gaugeTabs: (s.gaugeTabs || []).filter((_, k) => k !== gti) })}>✕ Remove tab</button>
                  </div>
                  <div className="spread mt"><label className="xs muted">Gauge rows for this tab</label><button type="button" className="btn ghost sm" onClick={() => { const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, gauges: [...gt.gauges, { label: '', sub: '', valuePct: 50, result: '', ok: false }] }; updateSlide(t, i, { gaugeTabs: next }); }}>+ Add gauge</button></div>
                  {gt.gauges.map((g, gi) => (
                    <div key={gi} className="row mt" style={{ gap: 8, flexWrap: 'wrap' }}>
                      <input className="inp" style={{ width: 120 }} value={g.label} placeholder="HW402 M40" onChange={(e) => { const nextG = gt.gauges.slice(); nextG[gi] = { ...g, label: e.target.value }; const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, gauges: nextG }; updateSlide(t, i, { gaugeTabs: next }); }} />
                      <input className="inp" style={{ width: 100 }} value={g.sub || ''} placeholder="Lab tested" onChange={(e) => { const nextG = gt.gauges.slice(); nextG[gi] = { ...g, sub: e.target.value }; const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, gauges: nextG }; updateSlide(t, i, { gaugeTabs: next }); }} />
                      <input className="inp" type="number" style={{ width: 70 }} value={g.valuePct} title="Value position, 0–100" onChange={(e) => { const nextG = gt.gauges.slice(); nextG[gi] = { ...g, valuePct: +e.target.value }; const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, gauges: nextG }; updateSlide(t, i, { gaugeTabs: next }); }} />
                      <input className="inp" type="number" style={{ width: 70 }} value={g.rangeStartPct ?? ''} placeholder="band start" onChange={(e) => { const nextG = gt.gauges.slice(); nextG[gi] = { ...g, rangeStartPct: e.target.value === '' ? undefined : +e.target.value }; const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, gauges: nextG }; updateSlide(t, i, { gaugeTabs: next }); }} />
                      <input className="inp" type="number" style={{ width: 70 }} value={g.rangeEndPct ?? ''} placeholder="band end" onChange={(e) => { const nextG = gt.gauges.slice(); nextG[gi] = { ...g, rangeEndPct: e.target.value === '' ? undefined : +e.target.value }; const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, gauges: nextG }; updateSlide(t, i, { gaugeTabs: next }); }} />
                      <input className="inp" style={{ width: 90 }} value={g.result} placeholder="46.50" onChange={(e) => { const nextG = gt.gauges.slice(); nextG[gi] = { ...g, result: e.target.value }; const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, gauges: nextG }; updateSlide(t, i, { gaugeTabs: next }); }} />
                      <label className="xs row" style={{ gap: 4, alignItems: 'center' }}><input type="checkbox" checked={!!g.ok} onChange={(e) => { const nextG = gt.gauges.slice(); nextG[gi] = { ...g, ok: e.target.checked }; const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, gauges: nextG }; updateSlide(t, i, { gaugeTabs: next }); }} /> ✓</label>
                      <button type="button" className="btn ghost sm" title="Remove gauge" onClick={() => { const nextG = gt.gauges.filter((_, k) => k !== gi); const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, gauges: nextG }; updateSlide(t, i, { gaugeTabs: next }); }}>✕</button>
                    </div>
                  ))}
                  <input className="inp mt" value={gt.explain || ''} placeholder="Tab explanation, e.g. 1-day strength 2.4× Conbextra GP1 (23.70 vs 10 MPa)." onChange={(e) => { const next = (s.gaugeTabs || []).slice(); next[gti] = { ...gt, explain: e.target.value }; updateSlide(t, i, { gaugeTabs: next }); }} />
                </div>
              ))}

              <div className="spread mt"><label className="f">Stepper <span className="muted">— a numbered walkthrough</span></label><button type="button" className="btn ghost sm" onClick={() => updateSlide(t, i, { steps: [...(s.steps || []), { title: '', desc: '' }] })}>+ Add step</button></div>
              {(s.steps || []).map((st, sti) => (
                <div key={sti} className="row mt" style={{ gap: 8 }}>
                  <input className="inp" style={{ flex: 1 }} value={st.title} placeholder="Prepare" onChange={(e) => { const next = (s.steps || []).slice(); next[sti] = { ...st, title: e.target.value }; updateSlide(t, i, { steps: next }); }} />
                  <input className="inp" style={{ flex: 2 }} value={st.desc || ''} placeholder="Rake joints 3–5 mm deep. Clean and dry" onChange={(e) => { const next = (s.steps || []).slice(); next[sti] = { ...st, desc: e.target.value }; updateSlide(t, i, { steps: next }); }} />
                  <button type="button" className="btn ghost sm" title="Remove step" onClick={() => updateSlide(t, i, { steps: (s.steps || []).filter((_, k) => k !== sti) })}>✕</button>
                </div>
              ))}

              <div className="spread mt"><label className="f">Sections <span className="muted">— a divider-separated list, e.g. a cheat sheet</span></label><button type="button" className="btn ghost sm" onClick={() => updateSlide(t, i, { sections: [...(s.sections || []), { label: '', text: '' }] })}>+ Add section</button></div>
              {(s.sections || []).map((sec, seci) => (
                <div key={seci} className="row mt" style={{ gap: 8 }}>
                  <input className="inp" style={{ flex: 1 }} value={sec.label} placeholder="What it is" onChange={(e) => { const next = (s.sections || []).slice(); next[seci] = { ...sec, label: e.target.value }; updateSlide(t, i, { sections: next }); }} />
                  <input className="inp" style={{ flex: 2 }} value={sec.text} placeholder="Single-component cement grout…" onChange={(e) => { const next = (s.sections || []).slice(); next[seci] = { ...sec, text: e.target.value }; updateSlide(t, i, { sections: next }); }} />
                  <button type="button" className="btn ghost sm" title="Remove section" onClick={() => updateSlide(t, i, { sections: (s.sections || []).filter((_, k) => k !== seci) })}>✕</button>
                </div>
              ))}

              {((s.stats && s.stats.length > 0) || (s.tableRows && s.tableRows.length > 0) || (s.badges && s.badges.length > 0) || (s.table && s.table.headers.length > 0) || (s.gauges && s.gauges.length > 0) || (s.gaugeTabs && s.gaugeTabs.length > 0) || (s.steps && s.steps.length > 0) || (s.sections && s.sections.length > 0)) && (
                <>
                  <label className="f mt">Live preview</label>
                  <div className="stage pad" style={{ padding: 16 }}>
                    {s.calc && <CalcWidget calc={s.calc} />}
                    {s.badge && <div className="card-badge-ok">{s.badge}</div>}
                    {!!s.stats?.length && (
                      <div className="stat-grid">
                        {s.stats.map((st, si) => (
                          <div key={si} className="stat-tile">
                            <div className="v">{st.value}</div>
                            <div className="l">{st.label}</div>
                            {st.sub && <div className="s">{st.sub}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                    {!!s.tableRows?.length && (
                      <div className="card-table">
                        {s.tableRows.map((row, ri) => (
                          <div key={ri} className="row"><span className="l">{row.label}</span><span className="v">{row.value}{row.ok && <span className="ok-check">✓</span>}</span></div>
                        ))}
                      </div>
                    )}
                    {!!s.badges?.length && (
                      <div className="badge-grid">
                        {s.badges.map((b, bi) => (
                          <div key={bi} className={'badge-tile' + (b.tone ? ' ' + b.tone : '')}>
                            <span className="ic">{b.icon}</span>
                            <div><div className="label">{b.label}</div>{b.sub && <div className="sub">{b.sub}</div>}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {!!s.table?.headers.length && (
                      <div className="full-table-wrap">
                        <table className="full-table">
                          <thead><tr>{s.table.headers.map((h, hi) => <th key={hi}>{h}</th>)}</tr></thead>
                          <tbody>{s.table.rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>)}</tbody>
                        </table>
                      </div>
                    )}
                    {s.gaugeTabs?.length ? (
                      <GaugeTabsPreview tabs={s.gaugeTabs} />
                    ) : (
                      !!s.gauges?.length && <GaugeRowsPreview gauges={s.gauges} />
                    )}
                    {!!s.steps?.length && (
                      <div className="stepper">
                        {s.steps.map((st, sti) => (
                          <div key={sti} className="stepper-item">
                            <span className="stepper-no">{sti + 1}</span>
                            <div><div className="t">{st.title}</div>{st.desc && <div className="d">{st.desc}</div>}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {!!s.sections?.length && (
                      <div className="sheet-sections">
                        {s.sections.map((sec, seci) => (
                          <div key={seci} className="sheet-section"><div className="l">{sec.label}</div><div className="t">{sec.text}</div></div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
          {s.type === 'image' && (
            <>
              <label className="f mt">Images</label>
              {!!(s.images?.length ? s.images : s.media ? [s.media] : []).length && (
                <div className="imggrid mt">
                  {(s.images?.length ? s.images : s.media ? [s.media] : []).map((src, gi) => (
                    <div key={gi} className="imgthumb">
                      <img src={src} alt={s.caption || s.title} />
                      {!!s.images?.length && (
                        <button type="button" className="imgthumb-rm" title="Remove image" onClick={() => removeImage(gi)}>✕</button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <input ref={fileInput} type="file" multiple accept="image/jpeg,image/png,image/gif,image/webp" style={{ display: 'none' }} onChange={onFileChosen} />
              <div className="mt">
                <button className="btn sm" onClick={() => fileInput.current?.click()} disabled={uploading}>
                  {uploading ? 'Uploading…' : '⬆ Add image(s)'}
                </button>
              </div>
              <label className="f mt">Caption</label>
              <input className="inp" value={s.caption || ''} placeholder="Figure 1 — …" onChange={(e) => updateSlide(t, i, { caption: e.target.value })} />
            </>
          )}
          <label className="f mt">{s.type === 'knowledge' ? 'Feedback (shown after checking the answer)' : 'Explanation box'}</label>
          <textarea className="inp" placeholder={s.type === 'knowledge' ? 'Why this is the correct answer…' : 'Additional explanation shown in a highlighted box'} value={s.explain || ''} onChange={(e) => updateSlide(t, i, { explain: e.target.value })} />
          {s.type !== 'knowledge' && (
            <>
              <label className="f mt">Key point box</label>
              <input className="inp" value={s.key || ''} placeholder="One-line takeaway" onChange={(e) => updateSlide(t, i, { key: e.target.value })} />
            </>
          )}
        </div>
        <div className="col">
          <div className="card pad">
            <b className="xs muted" style={{ textTransform: 'uppercase', letterSpacing: '.08em' }}>Slide properties</b>
            <label className="f mt">Content type</label>
            <select className="inp" value={s.type} onChange={(e) => {
              const nextType = e.target.value as SlideType;
              const patch: Partial<typeof s> = { type: nextType };
              if (nextType === 'knowledge' && !s.list?.length) { patch.list = ['', '']; patch.correctIndex = 0; }
              updateSlide(t, i, patch);
              force((n) => n + 1);
            }}>
              {(['text', 'image', 'video', 'knowledge', 'svg', 'card', 'stepper'] as SlideType[]).map((x) => <option key={x} value={x}>{TYPE_LABEL[x]}</option>)}
            </select>
            <div className="mt"><button className="btn sm block" onClick={() => addSlide(t, i)}>+ Add slide</button></div>
            <div className="mt"><button className="btn sm block" onClick={() => duplicateSlide(t, i)}>⧉ Duplicate slide</button></div>
            <div className="mt"><button className="btn sm block dan" onClick={() => { if (deleteSlide(t, i)) toast('Slide deleted'); else toast('A module must contain at least one slide', 'bad'); }}>✕ Delete slide</button></div>
          </div>
          <div className="card pad">
            <b className="xs muted" style={{ textTransform: 'uppercase', letterSpacing: '.08em' }}>Module settings</b>
            <div className="spread small mt"><span className="muted">Topic</span><b>{topic.name}</b></div>
            <div className="spread small"><span className="muted">Status</span><StatusTag status={topic.status} /></div>
            <div className="spread small"><span className="muted">Questions</span><b>{questions.filter((q) => q.topic === t && q.status === 'Active').length}</b></div>
            <div className="spread small"><span className="muted">Pass mark</span><b>{topic.pass}%</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}
