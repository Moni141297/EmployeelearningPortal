const fs = require("fs");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const { getPool } = require("./db");
const { sql } = require("./db");
const {
  mapUser,
  mapCategory,
  mapProduct,
  mapTopic,
  mapSlide,
  mapQuestion,
  mapEvent,
  mapCert,
  mapExpertQ,
  mapAudit,
  mapNotif,
} = require("./mappers");
const { activeAssessmentFor, primaryContentFor, userNameMap, requestContext, clientIp } = require("./utils");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");
const slidesRouter = require("./routes/slides");
const questionsRouter = require("./routes/questions");
const examRouter = require("./routes/exam");
const eventsRouter = require("./routes/events");
const certsRouter = require("./routes/certs");
const expertRouter = require("./routes/expert");
const auditRouter = require("./routes/audit");
const notificationsRouter = require("./routes/notifications");
const progressRouter = require("./routes/progress");
const aiRouter = require("./routes/ai");
const uploadsRouter = require("./routes/uploads");
const adminRouter = require("./routes/admin");
const analyticsRouter = require("./routes/analytics");

const app = express();

// Production serves the frontend and this API from the same IIS site (no
// cross-origin requests at all), so CORS only matters for local dev, where
// the Vite dev server proxies /api and /uploads straight through anyway —
// wide open here is harmless and one less thing to misconfigure.
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "2mb" }));
app.use((req, res, next) => requestContext.run({ ip: clientIp(req), ua: req.headers["user-agent"] || "" }, next));

fs.mkdirSync(uploadsRouter.UPLOAD_DIR, { recursive: true });
app.use("/uploads", express.static(uploadsRouter.UPLOAD_DIR));

app.get("/api/health", (req, res) => res.json({ ok: true }));

// One-shot load of everything that isn't specific to the logged-in user, so the
// app doesn't need a dozen round-trips just to render the login/reference data.
app.get("/api/bootstrap", async (req, res, next) => {
  try {
    const pool = await getPool();

    const [users, categories, products, subcats, eventsRows, certs, expertQs, audit] =
      await Promise.all([
        pool.request().query("SELECT * FROM dbo.Lms_Users ORDER BY CreatedAt DESC"),
        pool.request().query("SELECT * FROM dbo.Lms_Categories ORDER BY CategoryId"),
        pool.request().query("SELECT * FROM dbo.Lms_Products ORDER BY ProductId"),
        pool.request().query("SELECT * FROM dbo.Lms_SubCategories ORDER BY SubCategoryId"),
        pool.request().query("SELECT * FROM dbo.Lms_ExaminationEvents"),
        pool.request().query("SELECT * FROM dbo.Lms_Certificates"),
        pool.request().query("SELECT * FROM dbo.Lms_ExpertQuestions ORDER BY CreatedAt DESC"),
        pool.request().query("SELECT TOP 200 * FROM dbo.Lms_AuditLogs ORDER BY Timestamp DESC"),
      ]);

    const names = await userNameMap(pool);

    const topics = [];
    const slidesByTopic = {};
    for (const row of subcats.recordset) {
      const assessment = await activeAssessmentFor(pool, sql, row.SubCategoryId);
      const content = await primaryContentFor(pool, sql, row.SubCategoryId);
      topics.push(mapTopic(row, assessment, content));
      if (content) {
        const slideRows = (
          await pool
            .request()
            .input("c", sql.Int, content.ContentId)
            .query("SELECT * FROM dbo.Lms_LearningSlides WHERE ContentId=@c ORDER BY Sequence ASC")
        ).recordset;
        slidesByTopic[String(row.SubCategoryId)] = slideRows.map(mapSlide);
      } else {
        slidesByTopic[String(row.SubCategoryId)] = [];
      }
    }

    const questionRows = (await pool.request().query("SELECT * FROM dbo.Lms_Questions")).recordset;
    const optionRows = questionRows.length
      ? (
          await pool
            .request()
            .query(
              `SELECT * FROM dbo.Lms_QuestionOptions WHERE QuestionId IN (${questionRows.map((q) => q.QuestionId).join(",")})`
            )
        ).recordset
      : [];
    const optionsByQ = {};
    optionRows.forEach((o) => {
      (optionsByQ[o.QuestionId] = optionsByQ[o.QuestionId] || []).push(o);
    });
    const questions = questionRows.map((r) => mapQuestion(r, optionsByQ[r.QuestionId], names));

    const eventIds = eventsRows.recordset.map((r) => r.EventId);
    const participantRows = eventIds.length
      ? (
          await pool
            .request()
            .query(
              `SELECT * FROM dbo.Lms_ExaminationParticipants WHERE EventId IN (${eventIds.join(",")})`
            )
        ).recordset
      : [];
    const participantsByEvent = {};
    participantRows.forEach((p) => {
      (participantsByEvent[p.EventId] = participantsByEvent[p.EventId] || []).push(p);
    });
    const events = eventsRows.recordset.map((r) => mapEvent(r, participantsByEvent[r.EventId]));

    res.json({
      users: users.recordset.map(mapUser),
      categories: categories.recordset.map(mapCategory),
      products: products.recordset.map(mapProduct),
      topics,
      slides: slidesByTopic,
      questions,
      events,
      certs: certs.recordset.map(mapCert),
      expertQs: expertQs.recordset.map((r) => mapExpertQ(r, names)),
      audit: audit.recordset.map(mapAudit),
      // Loaded per-user via /api/me/:userId after login (see below).
      notifs: [],
      attempts: [],
      progress: {},
    });
  } catch (err) {
    next(err);
  }
});

// Loaded right after login: this user's notifications, learning progress and attempt history.
app.get("/api/me/:userId", async (req, res, next) => {
  try {
    const pool = await getPool();
    const userId = Number(req.params.userId);

    const notifRows = (
      await pool
        .request()
        .input("u", sql.Int, userId)
        .query("SELECT * FROM dbo.Lms_Notifications WHERE UserId=@u ORDER BY CreatedAt DESC")
    ).recordset;

    const progRows = (
      await pool
        .request()
        .input("u", sql.Int, userId)
        .query("SELECT * FROM dbo.Lms_LearningProgress WHERE UserId=@u")
    ).recordset;
    const progress = {};
    for (const r of progRows) {
      const contentRow = (
        await pool
          .request()
          .input("c", sql.Int, r.ContentId)
          .query("SELECT SubCategoryId FROM dbo.Lms_LearningContents WHERE ContentId=@c")
      ).recordset[0];
      if (!contentRow) continue;
      const slideIds = (
        await pool
          .request()
          .input("c", sql.Int, r.ContentId)
          .query(
            "SELECT SlideId FROM dbo.Lms_LearningSlides WHERE ContentId=@c ORDER BY Sequence ASC"
          )
      ).recordset.map((s) => String(s.SlideId));
      progress[userId + ":" + contentRow.SubCategoryId] = {
        viewed: slideIds.slice(0, r.SlidesViewed),
        done: r.Status === "Completed",
      };
    }

    const selfAttempts = (
      await pool.request().input("u", sql.Int, userId)
        .query(`SELECT a.*, asm.SubCategoryId FROM dbo.Lms_AssessmentAttempts a
              JOIN dbo.Lms_Assessments asm ON asm.AssessmentId = a.AssessmentId
              WHERE a.UserId=@u AND a.Status='Completed'`)
    ).recordset;
    const liveAttempts = (
      await pool.request().input("u", sql.Int, userId)
        .query(`SELECT p.*, e.SubCategoryId, e.Name AS EventName FROM dbo.Lms_ExaminationParticipants p
              JOIN dbo.Lms_ExaminationEvents e ON e.EventId = p.EventId
              WHERE p.UserId=@u AND p.Status='Completed'`)
    ).recordset;

    const attempts = [
      ...selfAttempts.map((a) => ({
        id: "SA" + a.AttemptId,
        user: String(userId),
        topic: String(a.SubCategoryId),
        mode: "self",
        date: new Date(a.EndTime || a.StartTime).toISOString().slice(0, 16).replace("T", " "),
        score: Number(a.MarksAchieved),
        total: Number(a.TotalMarks),
        pct: Math.round(Number(a.Percentage)),
        result: a.Result,
        time: "—",
        qcount: (JSON.parse(a.QuestionSetJson || "[]") || []).length,
      })),
      ...liveAttempts.map((p) => ({
        id: "EX" + p.ParticipantRowId,
        user: String(userId),
        topic: String(p.SubCategoryId),
        mode: "live",
        date: new Date(p.CompletionTime || p.JoinTime).toISOString().slice(0, 16).replace("T", " "),
        score: Number(p.MarksAchieved),
        total: Number(p.TotalMarks),
        pct: Math.round(Number(p.Percentage)),
        result: p.Result,
        time: "—",
        qcount: (JSON.parse(p.QuestionSetJson || "[]") || []).length,
      })),
    ];

    res.json({ notifs: notifRows.map(mapNotif), progress, attempts });
  } catch (err) {
    next(err);
  }
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/catalog", catalogRouter);
app.use("/api/slides", slidesRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/exam", examRouter);
app.use("/api/events", eventsRouter);
app.use("/api/certs", certsRouter);
app.use("/api/expert-questions", expertRouter);
app.use("/api/audit", auditRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/progress", progressRouter);
app.use("/api/ai", aiRouter);
app.use("/api/uploads", uploadsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/analytics", analyticsRouter);

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

module.exports = app;
