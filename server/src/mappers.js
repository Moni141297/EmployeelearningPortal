const { parseJson, fmtDate, roleFromDb, eventStatusFromDb, QTYPE_FROM_DB } = require("./utils");

// const CAT_ICONS = ['◈', '▣', '▲', '◆', '●', '■'];
const CAT_ICONS = ["HWImage", "GNImage", "CMImage"];
const CAT_CLASSES = ["c1", "c2", "c3"];

function mapUser(r) {
  return {
    id: String(r.UserId),
    emp: r.EmployeeId,
    name: r.Name,
    role: roleFromDb(r.Role),
    dept: r.Department || "—",
    plant: r.Plant || "—",
    location: r.Location || "—",
    desig: r.Designation || "—",
    mobile: r.Mobile || "—",
    status: r.Status,
    created: fmtDate(r.CreatedAt),
  };
}

function mapCategory(r, idx) {
  return {
    id: String(r.CategoryId),
    name: r.Name,
    desc: r.Description || "",
    icon: CAT_ICONS[idx % CAT_ICONS.length],
    cls: CAT_CLASSES[idx % CAT_CLASSES.length],
    status: r.Status,
  };
}

function mapProduct(r) {
  return {
    id: String(r.ProductId),
    cat: String(r.CategoryId),
    name: r.Name,
    desc: r.Description || "",
    status: r.Status,
  };
}

// row: Lms_SubCategories row; assessment/content: looked up via utils.activeAssessmentFor/primaryContentFor
function mapTopic(row, assessment, content) {
  return {
    id: String(row.SubCategoryId),
    prod: String(row.ProductId),
    name: row.Name,
    desc: row.Description || "",
    pass: assessment ? Number(assessment.PassPercentage) : 70,
    defTime: assessment ? assessment.DefaultTimeLimitSec : 30,
    examCount: assessment ? assessment.QuestionCount : 20,
    status: content ? content.Status : "Draft",
    mode: assessment?.Mode === "Private" ? "Private" : "Open",
    lb: assessment ? !!assessment.LeaderboardVisible : true,
    res: assessment ? !!assessment.ResultVisible : true,
    cert: assessment ? !!assessment.CertificateEligible : false,
    parts: assessment ? parseJson(assessment.ParticipantsJson, []) : [],
  };
}

function mapSlide(r) {
  const data = parseJson(r.ContentData, {});
  const KNOWN_TYPES = ["text", "image", "video", "knowledge", "svg", "card", "stepper"];
  const type = KNOWN_TYPES.includes(r.SlideType) ? r.SlideType : "text";
  return {
    id: String(r.SlideId),
    title: r.Title || "",
    type,
    body: data.text || undefined,
    media: data.imageUrl || data.videoUrl || r.MediaReference || undefined,
    images: data.images || undefined,
    caption: data.caption || undefined,
    list: data.list || undefined,
    // The Builder's save path (slides.js contentDataOf) writes this client
    // field back as `explanation` in storage — but slides authored directly
    // via SQL seed scripts (most of the Hardworker catalog) wrote the
    // client field name `explain` straight into ContentData instead. Read
    // both so neither authoring path silently drops the warning callout.
    explain: data.explanation || data.explain || undefined,
    key: data.key || undefined,
    correctIndex: data.correctIndex !== undefined ? data.correctIndex : undefined,
    svgMarkup: data.svgMarkup || undefined,
    // Card (type: 'card'): a row of big-number stat tiles plus an optional
    // label/value spec table and a green confirmation badge — the
    // non-animated counterpart to an 'svg' slide, for data-heavy content
    // like a TDS spec sheet or a lab-vs-declared comparison.
    stats: data.stats || undefined,
    tableRows: data.tableRows || undefined,
    badge: data.badge || undefined,
    badges: data.badges || undefined,
    table: data.table || undefined,
    gauges: data.gauges || undefined,
    gaugeTabs: data.gaugeTabs || undefined,
    steps: data.steps || undefined,
    sections: data.sections || undefined,
    calc: data.calc || undefined,
  };
}

// options: ordered Lms_QuestionOptions rows for this question; userNames: {UserId: Name}
function mapQuestion(r, options, userNames) {
  const type = QTYPE_FROM_DB[r.QuestionType] || "single";
  const ordered = (options || []).slice().sort((a, b) => a.Sequence - b.Sequence);
  let opts = [];
  let ans = [];
  let pairs;
  if (type === "fill") {
    opts = [];
    ans = parseJson(r.CorrectAnswerData, []);
  } else if (type === "match") {
    pairs = ordered.map((o) => [o.OptionText, o.MatchKey || ""]);
  } else {
    opts = ordered.map((o) => o.OptionText);
    ans = ordered.map((o, i) => (o.IsCorrect ? i : -1)).filter((i) => i >= 0);
  }
  return {
    id: String(r.QuestionId),
    topic: String(r.SubCategoryId),
    type,
    text: r.QuestionText,
    opts,
    ans,
    pairs,
    marks: Number(r.Weightage),
    time: r.IndividualTimeLimitSec,
    mandatory: !!r.IsMandatory,
    status: r.Status,
    by: (userNames && userNames[r.CreatedBy]) || "—",
    created: fmtDate(r.CreatedAt),
    diff: r.Difficulty || "Medium",
    explain: r.Explanation || "",
    img: r.MediaReference || undefined,
  };
}

function mapCert(r) {
  return {
    id: r.CertificateNumber,
    user: String(r.UserId),
    topic: String(r.SubCategoryId),
    event: r.EventId !== null && r.EventId !== undefined ? String(r.EventId) : null,
    score: Number(r.Score),
    date: fmtDate(r.IssueDate),
    status: r.Status === "Issued" ? "Valid" : "Revoked",
  };
}

function mapExpertQ(r, userNames) {
  return {
    id: String(r.ExpertQuestionId),
    user: String(r.UserId),
    topic: String(r.SubCategoryId),
    q: r.OriginalQuestion,
    ai: r.AiResponse || "",
    note: r.UserNote || "",
    date: fmtDate(r.CreatedAt),
    status: r.Status,
    resp: r.ExpertResponse || "",
    expert: (r.ExpertId && userNames && userNames[r.ExpertId]) || "",
  };
}

function mapAudit(r) {
  return {
    id: String(r.LogId),
    action: r.Action,
    entity: r.Entity || "",
    user: r.UserId ? String(r.UserId) : "—",
    time: fmtDate(r.Timestamp) + " " + new Date(r.Timestamp).toISOString().slice(11, 16),
    ts: new Date(r.Timestamp).toISOString(),
    ip: (parseJson(r.Metadata, null) || {}).ip || "",
    device: (parseJson(r.Metadata, null) || {}).device || "",
  };
}

function mapNotif(r) {
  return {
    id: String(r.NotificationId),
    txt: r.Message,
    time: fmtDate(r.CreatedAt),
    read: !!r.IsRead,
  };
}

// participants: Lms_ExaminationParticipants rows for this event
function mapEvent(r, participants) {
  const parts = (participants || []).filter((p) => p.Invited).map((p) => String(p.UserId));
  const joined = (participants || []).filter((p) => p.JoinTime).map((p) => String(p.UserId));
  const results = (participants || [])
    .filter((p) => p.Status === "Completed" && p.Percentage !== null && p.Percentage !== undefined)
    .map((p) => ({
      u: String(p.UserId),
      s: Number(p.Percentage),
      t:
        p.JoinTime && p.CompletionTime
          ? secsToMmss(
              Math.max(0, Math.round((new Date(p.CompletionTime) - new Date(p.JoinTime)) / 1000))
            )
          : "00:00",
      result: p.Result || undefined,
    }));
  const sched = r.ScheduledAt ? new Date(r.ScheduledAt) : null;
  return {
    id: String(r.EventId),
    name: r.Name,
    topic: String(r.SubCategoryId),
    code: r.EventCode,
    type: r.EventType,
    date: sched ? sched.toISOString().slice(0, 10) : "",
    time: sched ? sched.toISOString().slice(11, 16) : "",
    count: r.QuestionCount,
    pass: Number(r.PassPercentage),
    defTime: r.DefaultTimeLimitSec,
    status: eventStatusFromDb(r.Status),
    lb: !!r.LeaderboardVisible,
    res: !!r.ResultVisible,
    cert: !!r.CertificateEligible,
    parts,
    joined,
    by: String(r.CreatedBy),
    results,
  };
}

function secsToMmss(s) {
  return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
}

module.exports = {
  mapUser,
  mapCategory,
  mapProduct,
  mapTopic,
  mapSlide,
  mapQuestion,
  mapCert,
  mapExpertQ,
  mapAudit,
  mapNotif,
  mapEvent,
  secsToMmss,
};
