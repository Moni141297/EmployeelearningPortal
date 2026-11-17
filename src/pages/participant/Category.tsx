import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { progressOf } from "../../lib/selectors";
import type { Slide } from "../../types";

// A product's hero shot is whatever image the trainer attached to the first
// image-bearing slide of its module (Content Builder, slide type "Text +
// image") — never a hardcoded per-product map, so newly authored modules
// pick up their own photo automatically instead of falling back to an
// unrelated stock image.
function heroImageFor(topicSlides: Slide[] | undefined): string | undefined {
  const withImage = (topicSlides || []).find((s) => s.images && s.images.length);
  return withImage?.images?.[0];
}

// No stored duration estimate exists per topic — approximate from slide
// count the same way the reference site's "About N min" figure reads,
// roughly half a minute of reading/interaction per slide.
function estimateMinutes(slideCount: number) {
  return Math.max(1, Math.round((slideCount * 30) / 60));
}

export default function Category() {
  const { catId } = useParams();
  const categories = useStore((s) => s.categories);
  const products = useStore((s) => s.products);
  const topics = useStore((s) => s.topics);
  const slides = useStore((s) => s.slides);
  const questions = useStore((s) => s.questions);
  const currentUser = useStore((s) => s.currentUser)!;
  const progress = useStore((s) => s.progress);
  const navigate = useNavigate();
  const progOf = (uid: string, tid: string) =>
    progressOf(progress, uid, tid, (slides[tid] || []).length);

  const cat = categories.find((c) => c.id === catId)!;
  const prods = products.filter((p) => p.cat === cat.id);
  const publishedTopicCount = topics.filter(
    (t) => prods.some((p) => p.id === t.prod) && t.status === "Published"
  ).length;

  if (!prods.length || !publishedTopicCount) {
    return (
      <div>
        <div className="spread mb">
          <h2 style={{ fontSize: 20 }}>{cat.name}</h2>
          <button className="btn sm" onClick={() => navigate("/app/participant/learn")}>
            ← Back
          </button>
        </div>
        <div className="empty">
          <div style={{ fontSize: 32, marginBottom: 8 }}>▤</div>
          <b>No products available yet</b>
          <div className="muted small mt">
            There are no published products or topics under {cat.name} right now. Check back once a
            trainer has added content.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="spread mb">
        <h2 style={{ fontSize: 20 }}>{cat.name}</h2>
        <button className="btn sm" onClick={() => navigate("/app/participant/learn")}>
          ← Back
        </button>
      </div>
      <p className="muted small mb">Pick a module below to start or resume learning.</p>
      <div className="tile-grid">
        {prods.flatMap((p) => {
          const tps = topics.filter((t) => t.prod === p.id && t.status === "Published");
          return tps.map((t) => {
            const pr = progOf(currentUser.id, t.id);
            const slideCount = (slides[t.id] || []).length;
            const qCount = questions.filter(
              (q) => q.topic === t.id && q.status === "Active"
            ).length;
            const thumb = heroImageFor(slides[t.id]);
            return (
              <div
                key={t.id}
                className="tile module-tile"
                onClick={() => navigate(`/app/participant/viewer/${t.id}`)}
              >
                <div className={"cap cap-img" + (thumb ? "" : " empty")}>
                  {thumb ? <img src={thumb} alt={p.name} /> : <span>▤</span>}
                  <span
                    className="tag b"
                    style={{ position: "absolute", top: 10, left: 10, background: "#fff" }}
                  >
                    {cat.name}
                  </span>
                  {pr.pct === 100 && (
                    <span
                      className="tag g"
                      style={{ position: "absolute", top: 10, right: 10, background: "#fff" }}
                    >
                      ✓ Done
                    </span>
                  )}
                </div>
                <div className="bd">
                  <div className="xs muted" style={{ fontWeight: 600 }}>{t.name}</div>
                  <b>{p.name}</b>
                  <div className="xs muted" style={{ fontWeight: 600 }}>{t.desc || p.desc}</div>
                  <div className="row spread xs muted" style={{ marginTop: "auto" }}>
                    <span>⏱ About {estimateMinutes(slideCount)} min</span>
                    <span>
                      ▤ {slideCount} {slideCount === 1 ? "step" : "steps"}
                    </span>
                  </div>
                  {pr.pct > 0 && pr.pct < 100 && (
                    <div className="xs muted">
                      {pr.pct}% complete · {qCount} questions
                    </div>
                  )}
                  <button
                    className="btn sm pri block"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/app/participant/viewer/${t.id}`);
                    }}
                  >
                    {pr.pct === 100
                      ? "↻ Review module"
                      : pr.pct > 0
                        ? "▷ Resume module"
                        : "▷ Start module"}
                  </button>
                </div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
