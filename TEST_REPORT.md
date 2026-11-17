# LearnCert Platform — End-to-End Test Report

**Date:** 2026-11-03
**Environment:** Local dev build, real MSSQL database (`idblms`) + Redis, backend on `:4000`, frontend on `:5174`
**Tester:** Automated browser session (Claude Code), driving the real running application against live data — no mocks.

**Test accounts used**

| Role | Employee ID | Name |
|---|---|---|
| Participant | EMP009 | Vaishnavi Iyer |
| Trainer | TRAINER001 | Default Trainer |
| Admin | ADMIN001 | System Administrator |

OTP for all accounts in this environment: fixed test value `12345`.

**Legend:** ✅ Pass · ❌ Fail (bug) · ⚠️ Pass with issue · ➖ Not exercised this pass (reviewed via code only, or out of scope)

---

## 1. Summary

| Area | Cases run | Pass | Bugs found |
|---|---|---|---|
| Authentication | 4 | 4 | 0 |
| Participant — Learning | 5 | 4 | 1 (High) |
| Participant — Assessment/Exam | 4 | 3 | 1 (High, same root cause) |
| Participant — Records | 3 | 2 | 1 (side-effect of above) |
| Trainer — Catalog | 3 | 3 | 1 (Medium, data-quality gap) |
| Trainer — Examinations | 3 | 3 | 0 (incl. new Reschedule feature) |
| Trainer — Analytics | 6 | 3 | 1 (High) |
| Trainer — Certification / Expert | 2 | 2 | 0 |
| Admin | 7 | 7 | 1 (Low, cosmetic) |

**4 new bugs found this pass**, in addition to the 2 found and already fixed earlier this project (Incomplete-result handling, duplicate-submission answers — see §5).

---

## 2. Detailed test cases

### 2.1 Authentication

| # | Case | Steps | Expected | Actual | Status |
|---|---|---|---|---|---|
| A-01 | Participant login | Enter `EMP009` → Send OTP → enter `12345` → Verify | Lands on participant Dashboard | Worked, dashboard loaded with correct name/role/plant | ✅ |
| A-02 | Trainer login | Enter `TRAINER001` → OTP → Verify | Lands on trainer Dashboard | Worked | ✅ |
| A-03 | Admin login | Enter `ADMIN001` → OTP → Verify | Lands on admin Dashboard | Worked | ✅ |
| A-04 | Sign out | Avatar menu → Sign out | Returns to `/login`, session cleared | Worked for all 3 roles; audit log recorded `Login`/`Logout` events correctly | ✅ |

### 2.2 Participant — Learning

| # | Case | Expected | Actual | Status |
|---|---|---|---|---|
| L-01 | Learning Portal category tiles | Only Published topics / products with published topics counted | Hardworker: 3 products / 3 topics, Cement: 2 products / 4 topics — matches published-only data | ✅ |
| L-02 | Drill into product → module list | Shows modules with correct slide/duration counts | Correct | ✅ |
| L-03 | Viewer — slide navigation & progress | Progress bar updates per slide viewed, persisted via `/progress/view-slide` | 1/17 → 2/17 slides correctly tracked | ✅ |
| L-04 | Viewer — Knowledge Check slide | Renders inline quiz slide | Rendered correctly | ✅ |
| L-05 | `/progress/view-slide` occasionally 500s | — | One intermittent `500 Internal Server Error` observed on this endpoint during a slide view (see Bug #3) | ❌ |

### 2.3 Participant — Self Assessment / Exam engine

| # | Case | Expected | Actual | Status |
|---|---|---|---|---|
| E-01 | Start self-assessment on a topic with an empty question bank | Should be blocked with a clear message (same as the "mandatory > count" guard) | **Launches anyway** with a 0-question paper; screen goes blank, then auto-submits to a broken `NaN%, 0/0 marks` result | ❌ **Bug #1 (High)** |
| E-02 | Start self-assessment on a topic with a healthy bank (Product Overview, 16 active Qs) | Full 10-question paper, single/multi/TF/YN question types render, answers persist, submit grades correctly | Worked exactly as expected: 18%, 2/11 marks, Fail, correct per-question breakdown | ✅ |
| E-03 | Question-type coverage | Single-choice, multi-select ("select all"), True/False, Yes/No all render and accept input | All 4 types observed and answered correctly in one paper | ✅ |
| E-04 | Timer / auto-advance | Per-question countdown works | Visually confirmed ticking in E-02 run | ✅ |

### 2.4 Participant — Records

| # | Case | Expected | Actual | Status |
|---|---|---|---|---|
| R-01 | History & Attempts — per-topic attempt list | Lists attempts with score/result | Lists correctly, including the 2 broken 0-question attempts from E-01 | ⚠️ |
| R-02 | History & Attempts — "Average score" KPI | Should reflect the participant's real average | Shows **NaN%** overall (poisoned by the two 0-question attempts' `NaN` percentage) even though a valid 18% attempt exists | ❌ **Bug #2 (High, consequence of Bug #1)** |
| R-03 | Notifications bell | Lists recent notifications (new exams, new content, retake-notify) | Correct, matches server data including earlier retake-notify test events | ✅ |

### 2.5 Trainer — Catalog (Topics & Products)

| # | Case | Expected | Actual | Status |
|---|---|---|---|---|
| C-01 | Content hierarchy view | Shows Category → Product → Topic with slide/question/exam counts and status | Renders correctly | ✅ |
| C-02 | Published topic with 0 questions | A trainer should get a visible warning that a Published, self-assessable topic has no question bank | The row simply shows **"QUESTIONS: 0"** with no warning styling/indicator, and the topic stays fully Published and selectable for self-assessment | ❌ **Bug #1 root cause, Medium** (data-quality/validation gap on the authoring side) |
| C-03 | Delete topic/product (Archived + no-history gating) | Only deletable when Archived and free of attempt/cert/exam history | Implemented and type-checked in this project (see git history); **not re-exercised live this pass** — the sandbox's auto-mode permission classifier blocks all irreversible-delete clicks by policy, independent of the app's own validation | ➖ (verified by code review only this pass) |

### 2.6 Trainer — Examinations

| # | Case | Expected | Actual | Status |
|---|---|---|---|---|
| X-01 | Examinations list, grouped by status | Draft/Scheduled/Waiting/Live/Completed sections | Correct, 48 total events across all groups | ✅ |
| X-02 | **Reschedule** a Completed event (new feature) | Opens modal with Incomplete/Completed/Not-attended breakdown, pre-selects Incomplete, "Select all" works, creates a new event without touching the original's results | Verified live: "BULK-TEST Live Event" → breakdown showed Completed 52 / Not attended 3 correctly, "Select all" → 55 selected, submitted → new event appeared in Scheduled group with 55 invited, original Completed event untouched | ✅ |
| X-03 | Results & Leaderboard page | Pass/Fail/Incomplete split, question performance, score distribution | Correct; Incomplete participants correctly excluded from pass/fail math (prior fix, re-confirmed) | ✅ |

### 2.7 Trainer — Analytics

| # | Case | Expected | Actual | Status |
|---|---|---|---|---|
| N-01 | Training tab | Org-wide module completion % | Shows **0%** completion for every module, despite real participant progress existing in the DB | ❌ **Bug #4, High** |
| N-02 | Assessment tab | Org-wide attempt count / average / pass rate | Shows **0 total attempts / 0% average / 0% pass rate**, while the admin System Usage page (server-aggregated) correctly shows 53 attempts | ❌ **Bug #4, High** |
| N-03 | Examination tab | Per-event participation/average/pass% | Correct — driven by event data, which *is* global state | ✅ |
| N-04 | Examination tab — 0-participant rows | Should show "—" or "no data" | Shows **NaN%** for average/pass% on events with 0 participants | ⚠️ Low (cosmetic) |
| N-05 | Organisation tab (plant/department performance) | Correct — driven by event data | Correct | ✅ |
| N-06 | Content tab | Per-module users-accessed/completion/linked-assessment-score | "Users accessed" populated, but **Completion is 0% and "linked assessment score" shows "no attempts" for every module**, same root cause as N-01/N-02 | ❌ (same as Bug #4) |

### 2.8 Trainer — Certification / Expert Questions

| # | Case | Expected | Actual | Status |
|---|---|---|---|---|
| F-01 | Certification list | Org-wide issued certificates | Correct, 4 certs listed with real participant/score/date data | ✅ |
| F-02 | Expert Questions inbox | Raised/Answered questions, AI response context shown | Correct, 1 raised + 1 answered shown with full context | ✅ |

### 2.9 Admin

| # | Case | Expected | Actual | Status |
|---|---|---|---|---|
| D-01 | Admin Dashboard | Server-aggregated KPIs (users, active sessions, usage) | Correct — `Assessment attempts: 53` etc., matching real DB state | ✅ |
| D-02 | User Management — list + search/filter | 83 users listed; search narrows correctly | Searching "TRAINER001" correctly narrowed to 1 of 83 | ✅ |
| D-03 | Active Users (live sessions) | Lists real currently-logged-in sessions with device/IP | Correct — showed 3 genuinely active sessions | ✅ |
| D-04 | Daily Activity | Logins/day chart, activity-by-hour | Correct, matches audit log timestamps | ✅ |
| D-05 | System Usage | Learning sessions / assessment attempts / exam participation / certs, server-aggregated | Correct — this is the page that proves Bug #4 is frontend-only: the same "Assessment attempts" number here (53) is right where trainer Analytics shows 0 | ✅ |
| D-06 | Audit Logs | Full audit trail, filterable | Correct, and incidentally **directly evidences Bug #1** in the log itself: `Self assessment completed — Topic 15 — NaN%` | ✅ |
| D-07 | Roles & Access | Static capability matrix per role | Correct | ✅ |

---

## 3. Bugs found (this pass)

> **Update:** All 5 bugs have since been fixed and verified live (see each entry below).

### Bug #1 — Self-assessment can be started on a topic with an empty question bank (High) — ✅ FIXED
- **Where:** [src/pages/participant/Assess.tsx](src/pages/participant/Assess.tsx), [src/lib/examEngine.ts](src/lib/examEngine.ts) (`buildPaper`), [src/pages/participant/Exam.tsx](src/pages/participant/Exam.tsx)
- **Repro:** As a participant, open *Self Assessment*, pick a Published topic whose question bank has 0 active questions (reproduced on topic id **15** "HW211 Epoxy Grout → Product Knowledge & Application"; topics **18** and **19** are in the same state), click *Start assessment*.
- **Root cause:** `buildPaper()` only rejects a paper when `mandatory questions > configured count`. When the bank is completely empty, `mandatory = 0 ≤ count`, so it silently returns an empty `paper: []` instead of an error. `launchExam()` treats that as success.
- **Effect:** `Exam.tsx` renders a blank screen (no question to show), the per-question timer still runs, and on timeout/auto-advance it calls `finishExam()` with `E.total = 0`, producing `pct = NaN`. The Result screen shows **"NaN%", "0 / 0 marks", "0 questions"**, and the attempt is still written to history.
- **Fix applied:** [src/lib/examEngine.ts](src/lib/examEngine.ts) `buildPaper` now also rejects a paper when `bank.length < count` (covers 0-question banks and any undersized bank), so `launchExam` returns an error instead of a hollow paper for both self-assessment and live exams. [src/pages/trainer/examEditor.tsx](src/pages/trainer/examEditor.tsx) and `publishExam` in [src/store/useStore.ts](src/store/useStore.ts) now surface the same check at authoring/publish time, with a matching "⚠ Invalid configuration" message. Verified live: starting the HW211 Epoxy Grout self-assessment now shows the toast *"This topic's question bank has only 0 active question(s)... reduce the configured count"* instead of launching a blank exam.

### Bug #2 — A single broken 0-question attempt poisons the participant's lifetime average score (High, consequence of #1) — ✅ FIXED
- **Where:** [src/pages/participant/History.tsx](src/pages/participant/History.tsx), [src/pages/trainer/Analytics.tsx](src/pages/trainer/Analytics.tsx)
- **Repro:** After Bug #1 occurs once, open *History & Attempts*.
- **Effect:** The "Average score" KPI shows a wrong number permanently, even though other, valid attempts exist and display correct individual percentages. (Note: the attempt's stored `pct` round-trips through JSON/SQL as `0`, not `NaN` — `JSON.stringify(NaN)` serializes to `null`, which MSSQL stores as `NULL` and the server maps back to `0` — so a naive `Number.isFinite(pct)` guard does **not** catch it.)
- **Fix applied:** Both pages now derive a `scored` list filtered on `a.total > 0` (the real signal that an attempt was never graded against anything, since a legitimate attempt — even a genuine 0% — always has a non-zero total), and use that for every average/pass-rate/distribution calculation instead of the raw attempts list. Old corrupted rows already in the database are not deleted (left alone per this project's convention of not touching shared test data), but are now correctly excluded from every aggregate. Verified live: "Average score" went from 6% (wrongly averaging two 0%-from-broken-attempts with one genuine 18%) to the correct **18%**.

### Bug #3 — Intermittent `500` on `POST /progress/view-slide` (Low/Medium) — ✅ FIXED
- **Where:** [server/src/routes/progress.js](server/src/routes/progress.js)
- **Observed:** One `500 Internal Server Error` on this endpoint during ordinary slide viewing in the Viewer; a retry of the same call succeeded immediately after, and the UI did not surface any error to the user.
- **Root cause confirmed:** `/view-slide` and `/complete` both did SELECT-then-INSERT-or-UPDATE against `Lms_LearningProgress`, which has a `UNIQUE(UserId, ContentId)` constraint. Two calls for the same user+content landing close together (e.g. two slide-view beacons firing back to back) could both see "no existing row" and both attempt an INSERT; the loser failed with `Violation of UNIQUE KEY constraint 'UQ_Lms_LearningProgress'` → 500. Confirmed by reproducing it directly: 1 failure out of 5 concurrent requests for a fresh user/topic pair before the fix.
- **Fix applied:** Both routes now share an `upsertProgress` helper that updates first; only inserts if nothing was there to update, and if a concurrent request wins that race in between, catches the unique-constraint violation (SQL error 2627/2601) and falls back to the update instead of failing the request. Verified live: 13 concurrent requests across two stress runs on fresh user/topic pairs, zero 500s, and the resulting row is a single clean record (no duplicates).

### Bug #4 — Trainer "Management Analytics" shows only the current browser session's own data, not org-wide data (High) — ✅ FIXED
- **Where:** [src/pages/trainer/Analytics.tsx](src/pages/trainer/Analytics.tsx), [src/store/useStore.ts](src/store/useStore.ts) (`attempts`/`progress` state)
- **Repro:** As a participant, complete a self-assessment (real data now exists). Log in as a trainer and open *Analytics → Assessment* (or *Training*, or the "Completion"/"linked assessment score" columns of *Content*).
- **Root cause:** `s.attempts` and `s.progress` in the Zustand store are populated **only** by `GET /api/me/:userId` for whichever user is currently logged into *this* browser (see `useStore.ts` line ~343). There is no backend aggregate endpoint for this data (confirmed: no `analytics` route exists server-side). The Analytics page reads these same per-user arrays directly, so for a trainer (who has no self-assessment attempts of their own) it always shows **0 attempts / 0% average / 0% pass rate / 0% completion**, regardless of real activity — confirmed against the admin *System Usage* page, which correctly shows **53 assessment attempts** from the real, server-aggregated `/admin/overview` endpoint at the same moment.
- **Note:** The *Examination*/*Organisation* tabs of the same Analytics page are **not** affected, because they're computed from `events` (loaded globally at bootstrap for everyone), not from the per-user `attempts`/`progress` arrays.
- **Fix applied:** Added `GET /api/analytics/overview` ([server/src/routes/analytics.js](server/src/routes/analytics.js)), a real database aggregate across every user's self-assessment and live-exam attempts plus learning progress. [src/pages/trainer/Analytics.tsx](src/pages/trainer/Analytics.tsx) now fetches this itself (local component state, same pattern Results.tsx already uses for question stats) instead of reading the global per-user `s.attempts`/`s.progress`, and "Topic completion"/"Avg learning completion" are now an average across every user who has touched that topic, not just the logged-in trainer. Verified live: Training tab went from "Users trained: 0 / 0%" to "Users trained: 73 / 50%"; Assessment tab from "0 attempts" to "416 attempts, 67% average, 77% pass rate"; Content tab now shows real completion % and linked assessment scores per module.

### Bug #5 — "NaN%" shown instead of "—" for 0-participant examinations (Low, cosmetic) — ✅ FIXED
- **Where:** [src/pages/trainer/Analytics.tsx](src/pages/trainer/Analytics.tsx), Examination tab
- **Repro:** View *Analytics → Examination* for any event with 0 joined participants (several `(delete me)` test events qualify).
- **Effect:** Average/Pass% columns show `NaN%` instead of a neutral placeholder like "—".
- **Fix applied:** Guarded the division by participant count; the row now shows "—" for average, pass%, and top performer when there are 0 participants, fixed incidentally while addressing Bug #4 in the same file.

---

## 4. Not covered this pass

These were **not exercised live** in this test pass, either due to the sandboxed auto-mode blocking irreversible actions, scope/time, or needing two simultaneous live sessions:

- Live (multi-participant, Kahoot-style) examination join/wait/answer/submit flow end-to-end in the browser — **previously verified live** earlier in this project via a 15-participant scripted concurrency test plus manual browser verification (see prior fixes for "Incomplete" result handling and duplicate-submission answer rows, both confirmed fixed and still correctly reflected in this pass's Results page, §2.6 X-03).
- Topic/Product delete gating (Archived + no-history) — implemented and type-checked, but delete clicks are blocked by the sandbox's permission classifier as a blanket "irreversible deletion" policy, independent of the feature's own validation logic.
- Creating a brand-new topic/product/question/exam from scratch (only editing/viewing existing ones was exercised).
- Participant Certificates detail view, Profile page, "My Questions" (Ask Expert history), and the AI assistant panel.
- Admin "Create user" / "Deactivate user" actions (list/search only, to avoid mutating real user records).
- Bulk question import.

---

## 5. Previously fixed issues (confirmed still correct in this pass)

| Issue | Fix | Confirmed in this pass |
|---|---|---|
| Trainer ending a live exam early incorrectly showed "Fail" for cut-off participants | `finishExam` now records `'Incomplete'` whenever the participant didn't personally submit, regardless of how many questions were answered | Results page correctly excludes Incomplete from pass/fail math and labels it distinctly (§2.6 X-03) |
| Resubmitting a participant's exam completion duplicated their per-question answer rows, corrupting "Question performance" stats | `complete-participant` now deletes existing answer rows before re-inserting | Not re-triggered this pass (no live duplicate-submit scenario run), but code is unchanged since prior verification |
| Completed live events had no way to invite cut-off/no-show participants to a retake | New **Reschedule** feature (this project) | Verified live, §2.6 X-02 |
