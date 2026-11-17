import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { openExamEditor } from "./examEditor";
import { openRescheduleModal } from "./rescheduleModal";
import type { EventStatus } from "../../types";

const GROUPS: [EventStatus, string][] = [
  ["Draft", "Draft"],
  ["Scheduled", "Scheduled"],
  ["Waiting", "Waiting room"],
  ["Live", "Live now"],
  ["Completed", "Completed"],
  ["Cancelled", "Cancelled"],
];

export default function Exams() {
  const events = useStore((s) => s.events);
  const topicOf = useStore((s) => s.topic);
  const publishExam = useStore((s) => s.publishExam);
  const toast = useStore((s) => s.toast);
  const navigate = useNavigate();

  return (
    <div>
      <div className="spread mb">
        <h2 style={{ fontSize: 20 }}>Examinations</h2>
        <button className="btn pri" onClick={() => openExamEditor(null)}>
          + Create examination
        </button>
      </div>
      {GROUPS.map(([st, lab]) => {
        const list = events.filter((e) => e.status === st);
        if (!list.length) return null;
        return (
          <div key={st} className="card mb">
            <div className="card-h">
              <h3>{lab}</h3>
              <span className="tag">{list.length}</span>
            </div>
            {/* <div className={'tbl-wrap' + (st === 'Live' ? ' scroll' : '')}><table> */}
            <div className={"tbl-wrap scroll"}>
              <table>
                <thead>
                  <tr>
                    <th>Examination</th>
                    <th>Topic</th>
                    <th>Code</th>
                    <th>Mode</th>
                    <th>Date / time</th>
                    <th className="right">Qs</th>
                    <th className="right">Pass</th>
                    <th>Participants</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((e) => {
                    // Rescheduling only makes sense if the topic is still
                    // Published — a reschedule against an Archived/Draft topic
                    // would just fail (or get auto-cancelled right back) the
                    // same way creating a fresh exam for it already does.
                    const topicPublished = topicOf(e.topic).status === "Published";
                    const rescheduleBtn = topicPublished ? (
                      <button className="btn sm pri" onClick={() => openRescheduleModal(e.id)}>
                        Reschedule
                      </button>
                    ) : (
                      <button
                        className="btn sm"
                        disabled
                        title="This topic is not Published — publish it again before rescheduling"
                      >
                        Reschedule
                      </button>
                    );
                    return (
                      <tr key={e.id}>
                        <td>
                          <b className="small">{e.name}</b>
                          {e.cert && <span className="tag p"> ❖</span>}
                        </td>
                        <td className="small">{topicOf(e.topic).name}</td>
                        <td className="mono small">{e.code}</td>
                        <td>
                          <span className={"tag " + (e.type === "Open" ? "g" : "b")}>{e.type}</span>
                        </td>
                        <td className="small muted">
                          {e.date} {e.time}
                        </td>
                        <td className="right">{e.count}</td>
                        <td className="right">{e.pass}%</td>
                        <td className="small">
                          {e.type === "Open" ? "Open to all" : e.parts.length + " invited"}
                          {e.joined.length ? " · " + e.joined.length + " joined" : ""}
                        </td>
                        <td className="right">
                          {st === "Completed" ? (
                            <>
                              <button
                                className="btn sm"
                                onClick={() => navigate(`/app/trainer/results/${e.id}`)}
                              >
                                Results
                              </button>{" "}
                              {rescheduleBtn}
                            </>
                          ) : st === "Cancelled" ? (
                            rescheduleBtn
                          ) : st === "Draft" ? (
                            <>
                              <button className="btn sm" onClick={() => openExamEditor(e.id)}>
                                Edit
                              </button>{" "}
                              <button
                                className="btn sm pri"
                                onClick={async () => {
                                  if (await publishExam(e.id)) toast("Examination scheduled", "ok");
                                  else
                                    toast(
                                      "Cannot publish: check mandatory question count and question bank size against the configured count",
                                      "bad"
                                    );
                                }}
                              >
                                Publish
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="btn sm" onClick={() => openExamEditor(e.id)}>
                                Edit
                              </button>{" "}
                              <button
                                className="btn sm pri"
                                onClick={() => navigate(`/app/trainer/live/${e.id}`)}
                              >
                                Live control →
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
