# LearnCert API (Node.js + Express + MSSQL)

Backend for the Learning Platform frontend. Integrates with the existing **idblms** MSSQL
database — the `Lms_*` tables (`Lms_Users`, `Lms_Categories`, `Lms_Products`, `Lms_SubCategories`,
`Lms_LearningContents`/`Lms_LearningSlides`, `Lms_Questions`/`Lms_QuestionOptions`,
`Lms_Assessments`/`Lms_AssessmentAttempts`, `Lms_ExaminationEvents`/`Lms_ExaminationParticipants`,
`Lms_Certificates`, `Lms_ExpertQuestions`, `Lms_AIKnowledgeEntries`, `Lms_Notifications`,
`Lms_AuditLogs`, `Lms_OtpRequests`, `Lms_LearningProgress`) — which already has real seed data.
It does **not** touch the unprefixed tables of the same names, which exist in that database but
are empty/unrelated.

## Setup

1. Copy `.env.example` to `.env` and confirm the connection details for the `idblms` database.
2. Install dependencies (already done if `node_modules` exists):
   ```bash
   npm install
   ```
3. Start the API:
   ```bash
   npm run dev    # auto-restarts on file changes
   # or
   npm start
   ```

The API listens on `http://localhost:4000` by default (`PORT` in `.env`). The frontend expects
it at `VITE_API_URL` (see the root `.env.example`, default `http://localhost:4000/api`).

## How the frontend maps onto this schema

- **Topic** (frontend) = `Lms_SubCategories` row, joined with its active `Lms_Assessments` row
  (for pass %, time limit, question count) and its primary `Lms_LearningContents` row (for
  Published/Draft status).
- **Slide** = `Lms_LearningSlides`, whose `ContentData` column is a small JSON blob
  (`{text, explanation, imageUrl, caption, list, key}`).
- **Question** = `Lms_Questions` + `Lms_QuestionOptions`. Match-the-following pairs are
  `(OptionText, MatchKey)`; fill-in-the-blank accepted answers live in `CorrectAnswerData`.
- **Attempt** (frontend, covers both modes) = union of `Lms_AssessmentAttempts` (self-assessment)
  and completed `Lms_ExaminationParticipants` rows (live exams), with ids prefixed `SA`/`EX`
  respectively so the two sources don't collide.
- **Notifications** and **learning progress** are per-user in this schema (unlike the earlier
  mock data). They're loaded via `GET /api/me/:userId` right after login, not in `/api/bootstrap`.

## Known limitations

- **OTP has no real SMS provider.** `POST /auth/send-otp` generates a real code and stores it in
  `Lms_OtpRequests` with a 5-minute expiry, but returns the code in the response so the login
  screen can show a "Dev mode" auto-fill button.
- **Exam grading stays client-side** (`src/lib/examEngine.ts` in the frontend), exactly as in the
  original prototype — the full question bank, including correct answers, is loaded into the
  browser. The backend only persists the final result once an exam is submitted. This is fine for
  a training/demo tool but is not a secure exam architecture.
- **Re-viewing a past exam result after a page reload only works within the same session it was
  taken in.** The frontend's `loadPastResult()` needs the full graded per-question breakdown
  (`ExamState`), which is kept only in that session's local state — the database stores the
  normalized score/per-question-answer records (`Lms_AssessmentAttemptAnswers` /
  `Lms_ExaminationAnswers`) but reconstructing the exact original paper (including shuffled option
  order) from those isn't implemented.
- **Learning progress** (`Lms_LearningProgress.SlidesViewed`) is a count, not a set of slide ids.
  The frontend needs a list of *which* slides were viewed, so it's approximated as "the first N
  slides in sequence order" — exact for the normal linear-viewing flow the UI drives, not for
  out-of-order viewing.
- Every mutating store action in the frontend that **doesn't** create a new row (edits, toggles,
  reordering) applies its change to local state immediately and mirrors it to the API in the
  background (fire-and-forget) — check the browser console for `Backend sync failed` warnings if
  something isn't persisting. Actions that **create** a row (new user/topic/question/slide/exam/
  expert question) wait for the real database-assigned id before updating local state, since this
  schema uses auto-incrementing integer keys.
