import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import HWImage from "../../../public/images/HW_CP.png";
import GNImage from "../../../public/images/GN_CP.png";
import CMImage from "../../../public/images/CM_CP.png";

export default function LearningPortal() {
  const categories = useStore((s) => s.categories);
  const products = useStore((s) => s.products);
  const topics = useStore((s) => s.topics);
  const navigate = useNavigate();

  return (
    <div>
      <h2 style={{ fontSize: 20 }} className="mb">
        Learning Portal
      </h2>
      <p className="muted small mb">
        Select a major category to browse products and topics. Your access rights determine what is
        visible.
      </p>
      <div className="tile-grid">
        {categories.map((c) => {
          console.log("Category:", products);
          const prods = products.filter((p) => p.cat === c.id);
          const tps = topics.filter(
            (t) => prods.some((p) => p.id === t.prod) && t.status === "Published"
          );
          const visibleProds = prods.filter((p) => tps.some((t) => t.prod === p.id));
          return (
            <div
              key={c.id}
              className="tile"
              onClick={() => navigate(`/app/participant/learn/${c.id}`)}
            >
              {/* <div className={"cap " + c.cls}>{c.icon}</div> */}
              <>
                <img
                  alt="Cover Pic"
                  src={c.icon === "HWImage" ? HWImage : c.icon === "GNImage" ? GNImage : CMImage}
                  style={{ width: "358px", height: "260px" }}
                />
              </>

              <div className="bd">
                <b>{c.name}</b>
                <div className="xs muted">{c.desc}</div>
                <div className="row xs muted" style={{ marginTop: "auto" }}>
                  <span className="tag">{visibleProds.length} products</span>
                  <span className="tag">{tps.length} topics</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
