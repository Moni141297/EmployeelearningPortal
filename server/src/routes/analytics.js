// Organisation-wide read models for the trainer "Management analytics" page.
// The frontend used to reuse the per-user `attempts`/`progress` state that
// GET /api/me/:userId loads for whichever account is currently logged in —
// correct for a participant's own pages, but wrong here, since it meant a
// trainer's analytics always showed only their own (empty) activity instead
// of everyone's. This computes both across all users, from the live database.
const express = require('express');
const { sql, getPool } = require('../db');
const { asyncHandler } = require('../utils');

const router = express.Router();

router.get('/overview', asyncHandler(async (req, res) => {
  const pool = await getPool();

  const selfAttempts = (await pool.request().query(`
    SELECT a.*, asm.SubCategoryId FROM dbo.Lms_AssessmentAttempts a
    JOIN dbo.Lms_Assessments asm ON asm.AssessmentId = a.AssessmentId
    WHERE a.Status='Completed'
  `)).recordset;
  const liveAttempts = (await pool.request().query(`
    SELECT p.*, e.SubCategoryId FROM dbo.Lms_ExaminationParticipants p
    JOIN dbo.Lms_ExaminationEvents e ON e.EventId = p.EventId
    WHERE p.Status='Completed'
  `)).recordset;

  const attempts = [
    ...selfAttempts.map((a) => ({
      id: 'SA' + a.AttemptId, user: String(a.UserId), topic: String(a.SubCategoryId), mode: 'self',
      date: new Date(a.EndTime || a.StartTime).toISOString().slice(0, 16).replace('T', ' '),
      score: Number(a.MarksAchieved), total: Number(a.TotalMarks), pct: Math.round(Number(a.Percentage)),
      result: a.Result, time: '—', qcount: (JSON.parse(a.QuestionSetJson || '[]') || []).length,
    })),
    ...liveAttempts.map((p) => ({
      id: 'EX' + p.ParticipantRowId, user: String(p.UserId), topic: String(p.SubCategoryId), mode: 'live',
      date: new Date(p.CompletionTime || p.JoinTime).toISOString().slice(0, 16).replace('T', ' '),
      score: Number(p.MarksAchieved), total: Number(p.TotalMarks), pct: Math.round(Number(p.Percentage)),
      result: p.Result, time: '—', qcount: (JSON.parse(p.QuestionSetJson || '[]') || []).length,
    })),
  ];

  // Same shape as /api/me/:userId's `progress` (keyed "userId:subCategoryId"),
  // just for every user instead of one. Also tally distinct users per topic
  // along the way, for the Content analytics tab's "Users accessed" column —
  // no extra query needed, since it's the same rows.
  const progRows = (await pool.request().query('SELECT * FROM dbo.Lms_LearningProgress')).recordset;
  const progress = {};
  const topicAccessSets = {};
  for (const r of progRows) {
    const contentRow = (await pool.request().input('c', sql.Int, r.ContentId)
      .query('SELECT SubCategoryId FROM dbo.Lms_LearningContents WHERE ContentId=@c')).recordset[0];
    if (!contentRow) continue;
    const slideIds = (await pool.request().input('c', sql.Int, r.ContentId)
      .query('SELECT SlideId FROM dbo.Lms_LearningSlides WHERE ContentId=@c ORDER BY Sequence ASC')).recordset.map((s) => String(s.SlideId));
    progress[r.UserId + ':' + contentRow.SubCategoryId] = { viewed: slideIds.slice(0, r.SlidesViewed), done: r.Status === 'Completed' };
    (topicAccessSets[contentRow.SubCategoryId] = topicAccessSets[contentRow.SubCategoryId] || new Set()).add(r.UserId);
  }
  const topicAccess = Object.fromEntries(Object.entries(topicAccessSets).map(([topicId, users]) => [topicId, users.size]));

  // Real per-question correctness/unanswered-rate/time, aggregated across
  // every self-assessment attempt ever submitted — not the topic's own
  // question bank, since a question can be retired after being attempted.
  const questionRows = (await pool.request().query(`
    SELECT QuestionId,
      COUNT(*) AS total,
      SUM(CASE WHEN IsCorrect = 1 THEN 1 ELSE 0 END) AS correct,
      SUM(CASE WHEN AnswerData IS NULL OR AnswerData = '' OR AnswerData = 'null' THEN 1 ELSE 0 END) AS unanswered,
      AVG(CAST(TimeTakenSec AS FLOAT)) AS avgTime
    FROM dbo.Lms_AssessmentAttemptAnswers GROUP BY QuestionId
  `)).recordset;
  const questionStats = questionRows.map((r) => ({
    questionId: String(r.QuestionId),
    correctPct: r.total ? Math.round((r.correct / r.total) * 100) : 0,
    unansweredPct: r.total ? Math.round((r.unanswered / r.total) * 100) : 0,
    avgTimeSec: r.avgTime !== null ? Math.round(r.avgTime) : null,
  }));

  res.json({ attempts, progress, topicAccess, questionStats });
}));

module.exports = router;
