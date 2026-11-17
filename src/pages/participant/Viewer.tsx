import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { Bar } from "../../components/ui/Tags";
import KnowledgeCheck from "../../components/ui/KnowledgeCheck";
import SvgAnimation from "../../components/ui/SvgAnimation";
import CalcWidget from "../../components/ui/CalcWidget";
import { progressOf } from "../../lib/selectors";
import { toDisplayHtml } from "../../lib/richText";
import type { Slide, SlideGauge, SlideGaugeTab } from "../../types";

function GaugeRows({ gauges }: { gauges: SlideGauge[] }) {
  return (
    <div className="gauge-card">
      {gauges.map((g, i) => (
        <div key={i} className="gauge-row">
          <div className="gl">
            {g.label}
            {g.sub && <span className="s">{g.sub}</span>}
          </div>
          <div className="gauge-track">
            {g.rangeStartPct !== undefined && g.rangeEndPct !== undefined ? (
              <span
                className="band"
                style={{ left: `${g.rangeStartPct}%`, width: `${g.rangeEndPct - g.rangeStartPct}%` }}
              />
            ) : (
              <span className={"bar" + (g.highlight === false ? " muted" : "")} style={{ width: `${g.valuePct}%` }} />
            )}
            {g.showDot !== false && <span className="dot" style={{ left: `${g.valuePct}%` }} />}
          </div>
          <div className="gr">
            {g.result}
            {g.ok && <span className="ok-check">✓</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function GaugeTabs({ tabs }: { tabs: SlideGaugeTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active] || tabs[0];
  return (
    <div className="gauge-tabs">
      <div className="gauge-tabs-bar calc-chips">
        {tabs.map((t, i) => (
          <button
            key={i}
            type="button"
            className={i === active ? "on" : ""}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <GaugeRows gauges={tab.gauges} />
      {tab.explain && (
        <div className="explain">
          <b>Explanation · </b>
          {tab.explain}
        </div>
      )}
    </div>
  );
}

export default function Viewer() {
  const { topicId } = useParams();
  const t = topicId!;
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const currentUser = useStore((s) => s.currentUser)!;
  const slides = useStore((s) => s.slides[t] || []);
  const topic = useStore((s) => s.topic)(t);
  const categoryOf = useStore((s) => s.categoryOf);
  const productOf = useStore((s) => s.productOf);
  const pathOf = useStore((s) => s.path);
  const progress = useStore((s) => s.progress);
  const viewSlide = useStore((s) => s.viewSlide);
  const completeLearning = useStore((s) => s.completeLearning);
  const openAI = useStore((s) => s.openAI);
  const closeAI = useStore((s) => s.closeAI);
  const openModal = useStore((s) => s.openModal);
  const closeModal = useStore((s) => s.closeModal);
  const setSidebarCollapsed = useStore((s) => s.setSidebarCollapsed);

  const prog = progressOf(progress, currentUser.id, t, slides.length);
  const initialIdx = (() => {
    const qp = params.get("i");
    if (qp != null) return Math.max(0, Math.min(slides.length - 1, +qp));
    const firstUnseen = slides.findIndex((sl) => !prog.viewed.includes(sl.id));
    return firstUnseen < 0 ? 0 : firstUnseen;
  })();
  const [idx, setIdx] = useState(initialIdx);
  const [expandAll, setExpandAll] = useState(false);

  useEffect(() => {
    setIdx(initialIdx); /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [t]);

  const slide = slides[idx];

  useEffect(() => {
    if (slide) viewSlide(currentUser.id, t, slide.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, slide?.id]);

  useEffect(() => {
    openAI(t);
    // The assistant is a floating card beside the content on laptops and up,
    // but a full-screen sheet on phones/tablets — there it must stay closed
    // until asked for (the topic context above is still set), or it would
    // cover the slide the participant just opened.
    if (!window.matchMedia('(min-width: 821px)').matches) closeAI();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [t]);

  if (!slide) return <div className="empty">No content available.</div>;

  function goto(i: number) {
    setIdx(i);
    setParams({ i: String(i) });
    setExpandAll(false);
  }

  function toggleExpandAll() {
    const next = !expandAll;
    // Expanding reveals every slide's content at once — mark it all viewed,
    // the same way stepping through one at a time would, and collapse the
    // main nav sidebar so the extra width goes to the content that needs it.
    // These are side effects on other stores/components, so they run here as
    // plain statements rather than inside the setExpandAll updater, which
    // React may invoke during another component's render.
    if (next) {
      slides.forEach((sl) => viewSlide(currentUser.id, t, sl.id));
      setSidebarCollapsed(true);
    }
    setExpandAll(next);
  }

  function renderSlideBody(sl: Slide) {
    return (
      <>
        {sl.body && (
          <div
            className="richtext-body"
            dangerouslySetInnerHTML={{ __html: toDisplayHtml(sl.body) }}
          />
        )}
        {sl.calc && <CalcWidget calc={sl.calc} />}
        {sl.badge && <div className="card-badge-ok">{sl.badge}</div>}
        {sl.stats && sl.stats.length > 0 && (
          <div className="stat-grid">
            {sl.stats.map((st, i) => (
              <div key={i} className="stat-tile">
                <div className="v">{st.value}</div>
                <div className="l">{st.label}</div>
                {st.sub && <div className="s">{st.sub}</div>}
              </div>
            ))}
          </div>
        )}
        {sl.tableRows && sl.tableRows.length > 0 && (
          <div className="card-table">
            {sl.tableRows.map((row, i) => (
              <div key={i} className="row">
                <span className="l">{row.label}</span>
                <span className="v">
                  {row.value}
                  {row.ok && <span className="ok-check">✓</span>}
                </span>
              </div>
            ))}
          </div>
        )}
        {sl.gaugeTabs && sl.gaugeTabs.length > 0 ? (
          <GaugeTabs tabs={sl.gaugeTabs} />
        ) : (
          sl.gauges && sl.gauges.length > 0 && <GaugeRows gauges={sl.gauges} />
        )}
        {sl.badges && sl.badges.length > 0 && (
          <div className="badge-grid">
            {sl.badges.map((b, i) => (
              <div key={i} className={"badge-tile" + (b.tone ? " " + b.tone : "")}>
                <span className="ic">{b.icon}</span>
                <div>
                  <div className="label">{b.label}</div>
                  {b.sub && <div className="sub">{b.sub}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
        {sl.table && sl.table.headers.length > 0 && (
          <div className="full-table-wrap">
            <table className="full-table">
              <thead>
                <tr>
                  {sl.table.headers.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {sl.table.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {sl.type === "svg" && sl.svgMarkup && <SvgAnimation markup={sl.svgMarkup} />}
        {sl.steps && sl.steps.length > 0 && (
          <div className="stepper">
            {sl.steps.map((st, i) => (
              <div key={i} className="stepper-item">
                <span className="stepper-no">{i + 1}</span>
                <div>
                  <div className="t">{st.title}</div>
                  {st.desc && <div className="d">{st.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
        {sl.sections && sl.sections.length > 0 && (
          <div className="sheet-sections">
            {sl.sections.map((sec, i) => (
              <div key={i} className="sheet-section">
                <div className="l">{sec.label}</div>
                <div className="t">{sec.text}</div>
              </div>
            ))}
          </div>
        )}
        {sl.type === "video" && sl.media && (
          <div className="media video" style={{ position: "relative" }}>
            <video
              src={sl.media}
              controls
              controlsList="nofullscreen noremoteplayback nodownload noplaybackrate"
              disablePictureInPicture
              style={{ maxWidth: "100%" }}
            />
            <button
              type="button"
              className="video-expand-btn"
              title="Expand to fullscreen"
              onClick={(e) =>
                (e.currentTarget.previousElementSibling as HTMLVideoElement)?.requestFullscreen?.()
              }
            >
              ⛶
            </button>
            <div className="cp">{sl.caption || ""}</div>
          </div>
        )}
        {(() => {
          const gallery = sl.images?.length
            ? sl.images
            : sl.type === "image" && sl.media
              ? [sl.media]
              : [];
          return gallery.length > 0 ? (
            <>
              <div className="imggrid">
                {gallery.map((src, gi) => (
                  <div
                    key={gi}
                    className="media"
                    onClick={() => previewImage(src, sl.caption || sl.title)}
                  >
                    <img src={src} alt={sl.caption || sl.title} style={{ maxWidth: "100%" }} />
                  </div>
                ))}
              </div>
              {sl.caption && <div className="cp">{sl.caption}</div>}
            </>
          ) : null;
        })()}
        {sl.list && sl.list.length > 0 && (
          <ul>
            {sl.list.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        )}
        {sl.explain && (
          <div className="explain">
            <b>Explanation · </b>
            {sl.explain}
          </div>
        )}
        {sl.key && (
          <div className="keypoint">
            <b>Key point · </b>
            {sl.key}
          </div>
        )}
      </>
    );
  }

  function previewImage(src: string, alt: string) {
    openModal(
      <div className="modal wide">
        <div className="modal-h">
          <h3>Preview</h3>
          <button className="btn ghost" onClick={closeModal}>
            ✕
          </button>
        </div>
        <div className="modal-b center" style={{ background: "var(--panel-2)" }}>
          <img
            src={src}
            alt={alt}
            style={{ maxWidth: "100%", maxHeight: "75vh", borderRadius: "var(--r)" }}
          />
        </div>
        <div className="modal-f">
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    );
  }

  function finish() {
    completeLearning(currentUser.id, t);
    openModal(
      <div className="modal" style={{ maxWidth: 440 }}>
        <div className="modal-b center" style={{ padding: 30 }}>
          <div style={{ fontSize: 40 }}>🎓</div>
          <h3 className="mt">Learning module completed</h3>
          <p className="muted small mt">
            You have completed <b>{topic.name}</b>. Test your understanding with a self assessment —
            you can retake it as many times as you like.
          </p>
          <div className="row mt2" style={{ justifyContent: "center" }}>
            <button
              className="btn"
              onClick={() => {
                closeModal();
                navigate("/app/participant/learn");
              }}
            >
              Back to portal
            </button>
            <button
              className="btn pri"
              onClick={() => {
                closeModal();
                navigate("/app/participant/assess", { state: { startTopic: t } });
              }}
            >
              Take self assessment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="spread mb">
        <div>
          <h2 style={{ fontSize: 20 }}>{topic.name}</h2>
          <div className="muted small">{pathOf(t)}</div>
        </div>
        <div className="row">
          <button className="btn sm" onClick={toggleExpandAll}>
            {expandAll ? "↕ Collapse all" : "↕ Expand all"}
          </button>
          {/* <button className="btn sm" onClick={() => openAI(t)}>
            ✦ Ask AI
          </button> */}
          <button className="btn sm" onClick={() => navigate(`/app/participant/learn/${categoryOf(t).id}`)}>
           ⬅ Back
          </button>
          <button
            className="btn sm pri"
            onClick={() => navigate("/app/participant/assess", { state: { startTopic: t } })}
          >
            Take self assessment →
          </button>
        </div>
      </div>
      <div className="card pad mb">
        <div className="spread mb">
          <b className="small">Learning progress</b>
          <span className="small muted">
            {prog.viewed.length} / {prog.total} slides · {prog.pct}%
          </span>
        </div>
        <Bar pct={prog.pct} cls={prog.pct === 100 ? "g" : ""} />
      </div>
      <div className={"viewer" + (expandAll ? " expanded" : "")}>
        {!expandAll && (
          <div className="card pad slidelist">
            <div
              className="xs bold muted mb"
              style={{ textTransform: "uppercase", letterSpacing: ".08em" }}
            >
              Slides
            </div>
            {slides.map((sl, k) => (
              <div
                key={sl.id}
                className={
                  "it " + (k === idx ? "on" : "") + " " + (prog.viewed.includes(sl.id) ? "done" : "")
                }
                onClick={() => goto(k)}
              >
                <span className="n">{prog.viewed.includes(sl.id) ? "✓" : k + 1}</span>
                <span>{sl.title}</span>
              </div>
            ))}
          </div>
        )}
        {expandAll ? (
          <div>
            {slides.map((sl, k) => (
              <div className="stage mb" key={sl.id}>
                <div className="row mb">
                  <span className="tag b">
                    Slide {k + 1} of {slides.length}
                  </span>
                  <span className="tag">
                    {(
                      {
                        text: "Text",
                        image: "Image",
                        video: "Video",
                        knowledge: "Knowledge check",
                        svg: "Animated diagram",
                        card: "Card",
                        stepper: "Stepper",
                      } as Record<string, string>
                    )[sl.type] || "Text"}
                  </span>
                </div>
                <h2>{sl.title}</h2>
                {sl.type === "knowledge" ? (
                  <KnowledgeCheck
                    key={sl.id}
                    question={sl.body || ""}
                    options={sl.list || []}
                    correctIndex={sl.correctIndex ?? 0}
                    explain={sl.explain}
                  />
                ) : (
                  renderSlideBody(sl)
                )}
              </div>
            ))}
            <div className="spread mt">
              <button className="btn" onClick={toggleExpandAll}>
                ↑ Collapse all
              </button>
              <button className="btn ok" onClick={finish}>
                ✓ Complete learning
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="stage-wrap">
              <div className="stage">
                <div className="row mb">
                  <span className="tag b">
                    Slide {idx + 1} of {slides.length}
                  </span>
                  <span className="tag">
                    {(
                      {
                        text: "Text",
                        image: "Image",
                        video: "Video",
                        knowledge: "Knowledge check",
                        svg: "Animated diagram",
                        card: "Card",
                        stepper: "Stepper",
                      } as Record<string, string>
                    )[slide.type] || "Text"}
                  </span>
                </div>
                <h2>{slide.title}</h2>
                {slide.type === "knowledge" ? (
                  <KnowledgeCheck
                    key={slide.id}
                    question={slide.body || ""}
                    options={slide.list || []}
                    correctIndex={slide.correctIndex ?? 0}
                    explain={slide.explain}
                  />
                ) : (
                  renderSlideBody(slide)
                )}
              </div>
            </div>
            <div className="spread mt">
              <button className="btn" disabled={idx === 0} onClick={() => goto(idx - 1)}>
                ← Previous
              </button>
              <div className="row">
                {idx < slides.length - 1 ? (
                  <button className="btn pri" onClick={() => goto(idx + 1)}>
                    Next slide →
                  </button>
                ) : (
                  <button className="btn ok" onClick={finish}>
                    ✓ Complete learning
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="xs muted" style={{ display: "none" }}>
        {categoryOf(t).name}
        {productOf(t).name}
      </div>
    </div>
  );
}
