const express = require("express");
const { sql, getPool } = require("../db");
const { asyncHandler, activeAssessmentFor, issueCertificateIfEligible } = require("../utils");
const { sessionKey, saveSession, loadSession, deleteSession } = require("../redis");

const router = express.Router();

// In-progress exam state lives in Redis only — every answer is written here as
// the participant goes, so a dropped connection/refresh can resume exactly
// where they left off. Nothing touches MSSQL until the exam is submitted.
router.post(
  "/session",
  asyncHandler(async (req, res) => {
    const { userId, mode, topicId, eventId, state } = req.body;
    const key = sessionKey(userId, mode, eventId || topicId);
    await saveSession(key, state);
    res.status(201).json({ key });
  })
);

router.put(
  "/session/:key",
  asyncHandler(async (req, res) => {
    const { key } = req.params;
    const existing = await loadSession(key);
    if (!existing) return res.status(404).json({ error: "Session not found or expired" });
    await saveSession(key, { ...existing, ...req.body.state });
    res.json({ ok: true });
  })
);

router.get(
  "/session/:key",
  asyncHandler(async (req, res) => {
    const state = await loadSession(req.params.key);
    if (!state) return res.status(404).json({ error: "not found" });
    res.json({ state });
  })
);

router.delete(
  "/session/:key",
  asyncHandler(async (req, res) => {
    await deleteSession(req.params.key);
    res.json({ ok: true });
  })
);

// Dumb persistence for the self-assessment ("mode: 'self'") path. Paper build
// and grading happen client-side (src/lib/examEngine.ts), exactly as before —
// this just records the final result against the topic's active Assessment.
router.post(
  "/attempts",
  asyncHandler(async (req, res) => {
    const { userId, topicId, total, earned, pct, result, startedAt, rows } = req.body;
    const pool = await getPool();
    const assessment = await activeAssessmentFor(pool, sql, Number(topicId));
    if (!assessment)
      return res
        .status(404)
        .json({ error: "No self-assessment configuration exists for this topic" });

    const inserted = await pool
      .request()
      .input("aid", sql.Int, assessment.AssessmentId)
      .input("u", sql.Int, Number(userId))
      .input("start", sql.DateTime2, new Date(startedAt))
      .input("total", sql.Decimal(8, 2), total)
      .input("marks", sql.Decimal(8, 2), earned)
      .input("pct", sql.Decimal(5, 2), pct)
      .input("result", sql.NVarChar, result)
      .input("qset", sql.NVarChar, JSON.stringify((rows || []).map((r) => r.q.id)))
      .query(`INSERT INTO dbo.Lms_AssessmentAttempts (AssessmentId, UserId, StartTime, EndTime, TotalMarks, MarksAchieved, Percentage, Result, QuestionSetJson, Status)
            OUTPUT INSERTED.AttemptId
            VALUES (@aid, @u, @start, sysutcdatetime(), @total, @marks, @pct, @result, @qset, 'Completed')`);
    const attemptId = inserted.recordset[0].AttemptId;

    for (const r of rows || []) {
      await pool
        .request()
        .input("aid", sql.Int, attemptId)
        .input("q", sql.Int, Number(r.q.id))
        .input("data", sql.NVarChar, JSON.stringify(r.a))
        .input("correct", sql.Bit, r.state === "c")
        .input("marks", sql.Decimal(6, 2), r.earned)
        .input("time", sql.Int, r.t || null)
        .query(`INSERT INTO dbo.Lms_AssessmentAttemptAnswers (AttemptId, QuestionId, AnswerData, IsCorrect, MarksAwarded, TimeTakenSec, AnsweredAt)
              VALUES (@aid, @q, @data, @correct, @marks, @time, sysutcdatetime())`);
    }
    // Issued server-side the instant a pass is recorded — see
    // issueCertificateIfEligible in utils.js for why this doesn't wait on the
    // frontend's own, separate /api/certs call.
    await issueCertificateIfEligible(pool, sql, {
      userId, topicId: Number(topicId), eventId: null, score: pct, result, certEligible: !!assessment.CertificateEligible,
    });
    res.status(201).json({ id: "SA" + attemptId });
  })
);

module.exports = router;
