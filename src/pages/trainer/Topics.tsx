import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { StatusTag } from "../../components/ui/Tags";
import { openTopicEditor, openProductEditor } from "./topicEditor";
import type { Product, Topic } from "../../types";

export default function Topics() {
  const categories = useStore((s) => s.categories);
  const products = useStore((s) => s.products);
  const topics = useStore((s) => s.topics);
  const slides = useStore((s) => s.slides);
  const questions = useStore((s) => s.questions);
  const setBuilderTopic = useStore((s) => s.setBuilderTopic);
  const setBankTopic = useStore((s) => s.setBankTopic);
  const deleteTopic = useStore((s) => s.deleteTopic);
  const deleteProduct = useStore((s) => s.deleteProduct);
  const openModal = useStore((s) => s.openModal);
  const closeModal = useStore((s) => s.closeModal);
  const navigate = useNavigate();

  function confirmDeleteTopic(t: Topic) {
    openModal(
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-h">
          <h3>Delete topic</h3>
          <button className="btn ghost" onClick={closeModal}>
            ✕
          </button>
        </div>
        <div className="modal-b">
          <p>
            Delete <b>{t.name}</b> and its content (slides, question bank)? This cannot be undone.
          </p>
        </div>
        <div className="modal-f">
          <button className="btn" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="btn dan"
            onClick={() => {
              closeModal();
              deleteTopic(t.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  function confirmDeleteProduct(p: Product) {
    openModal(
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-h">
          <h3>Delete product</h3>
          <button className="btn ghost" onClick={closeModal}>
            ✕
          </button>
        </div>
        <div className="modal-b">
          <p>
            Delete <b>{p.name}</b> and all its archived topics? This cannot be undone.
          </p>
        </div>
        <div className="modal-f">
          <button className="btn" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="btn dan"
            onClick={() => {
              closeModal();
              deleteProduct(p.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="spread mb">
        <h2 style={{ fontSize: 20 }}>Content hierarchy</h2>
        <div className="row">
          <button className="btn" onClick={() => openProductEditor(null)}>
            + Product
          </button>
          <button className="btn pri" onClick={() => openTopicEditor(null)}>
            + Topic
          </button>
        </div>
      </div>
      <p className="muted small mb">
        Category → Product → Sub-category (topic) → Learning content + Question bank. Only trainers
        manage this hierarchy; administrators cannot create content.
      </p>
      {categories.map((c) => (
        <div key={c.id} className="card mb">
          <div className="card-h">
            <div className="row">
              <span className="tag b">Level 1</span>
              <h3>{c.name}</h3>
            </div>
            <span className="tag">{products.filter((p) => p.cat === c.id).length} products</span>
          </div>
          <div className="card-b">
            {products
              .filter((p) => p.cat === c.id)
              .map((p) => {
                const prodTopics = topics.filter((t) => t.prod === p.id);
                const canDeleteProduct = prodTopics.every((t) => t.status === "Archived");
                return (
                  <div
                    key={p.id}
                    className="card mb"
                    style={{ boxShadow: "none", background: "var(--panel-2)" }}
                  >
                    <div className="card-h" style={{ padding: "10px 14px" }}>
                      <div className="row">
                        <span className="tag">Level 2</span>
                        <b>{p.name}</b>
                        <span className="xs muted">{p.desc}</span>
                      </div>
                      <div className="row">
                        <button className="btn sm" onClick={() => openProductEditor(p.id)}>
                          Edit
                        </button>
                        <button
                          className="btn sm dan"
                          disabled={!canDeleteProduct}
                          title={
                            canDeleteProduct
                              ? "Delete product"
                              : "All topics under this product must be archived first"
                          }
                          onClick={() => confirmDeleteProduct(p)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="tbl-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th>Sub-category / topic</th>
                            <th>Slides</th>
                            <th>Questions</th>
                            <th>Mandatory</th>
                            <th>Exam count</th>
                            <th>Pass %</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {topics.filter((t) => t.prod === p.id).length ? (
                            topics
                              .filter((t) => t.prod === p.id)
                              .map((t) => (
                                <tr key={t.id}>
                                  <td>
                                    <b className="small">{t.name}</b>
                                    {/* <div className="xs muted">{t.desc}</div> */}
                                  </td>
                                  <td>{(slides[t.id] || []).length}</td>
                                  <td>
                                    {
                                      questions.filter(
                                        (q) => q.topic === t.id && q.status === "Active"
                                      ).length
                                    }
                                  </td>
                                  <td>
                                    {
                                      questions.filter(
                                        (q) =>
                                          q.topic === t.id && q.status === "Active" && q.mandatory
                                      ).length
                                    }
                                  </td>
                                  <td>{t.examCount}</td>
                                  <td>{t.pass}%</td>
                                  <td>
                                    <StatusTag status={t.status} />
                                  </td>
                                  <td className="right">
                                    <button
                                      className="btn sm"
                                      onClick={() => {
                                        setBuilderTopic(t.id);
                                        navigate("/app/trainer/builder");
                                      }}
                                    >
                                      Content
                                    </button>{" "}
                                    <button
                                      className="btn sm"
                                      onClick={() => {
                                        setBankTopic(t.id);
                                        navigate("/app/trainer/bank");
                                      }}
                                    >
                                      Questions
                                    </button>{" "}
                                    <button
                                      className="btn sm"
                                      onClick={() => openTopicEditor(t.id)}
                                    >
                                      Edit
                                    </button>{" "}
                                    <button
                                      className="btn sm dan"
                                      disabled={t.status !== "Archived"}
                                      title={
                                        t.status === "Archived"
                                          ? "Delete topic"
                                          : "Archive this topic before deleting it"
                                      }
                                      onClick={() => confirmDeleteTopic(t)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="muted small">
                                No topics under this product yet
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
