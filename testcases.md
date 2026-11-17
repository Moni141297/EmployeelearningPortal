# Yeshwa Portal (learncert-app) — Validation & Test Report

This file accumulates validation passes over time. Most recent pass first.

---

# Pass 6 (2026-10-21): Universal Responsive Design — audit of every page across mobile / tablet / laptop / desktop / large monitor

## 1. What was asked
Make responsive design a mandatory platform-wide standard (PRD §5), fix the Learning Portal "Expand all" view and the Content Builder, and individually audit every page/state at all device sizes, fixing and re-validating until clean.

## 2. Method
Live browser testing against the running app (Vite dev server + API), as participant, trainer and admin. For every route and state an automated sweep asserted `document.scrollWidth <= clientWidth` and that no element left the viewport except inside its own scroll container (and no `overflow:hidden` clipping); key screens were also reviewed visually. Widths: **320, 375, 768, 1024, 1366, 1920, 2560**. After each fix the whole sweep was re-run.
States covered beyond plain routes: Viewer single-slide and **Expand all** for all 5 modules; every slide type in the Content Builder (each slide of 3 modules selected in turn) plus its Preview dialog; all editor dialogs (topic, product, question, exam, user); nav drawer, global search, notifications, AI assistant; Exam (single, multi, match, fill, image), Result, Waiting room and Certificate rendered from in-memory fixtures (nothing written to the database).

## 3. Defects found and fixed
| ID | Defect | Fix |
|---|---|---|
| R-01 | Expand all: bare `1fr` grid track grew to widest slide content — page 946px wide on a 375px phone | `minmax(0,1fr)` track + shrinkable children; stage padding scales on phones |
| R-02 | Dialog overlay grew to widest child — Builder preview spilled off-screen | `minmax(0,1fr)` track; dialogs are bottom sheets on phones |
| R-03 | Toolbars overflowed at 701–820px (Viewer header) | `.row/.spread` wrap up to 1100px |
| R-04 | `select` sized to longest option pushed Bank / Results filters off-screen at 320px | all form controls capped at 100% of container |
| R-05 | Exam header: progress bar crushed, "Q 4 / 4" wrapped per character on phones | two-row header |
| R-06 | Mobile drawer inherited desktop icon-only collapsed state | drawer always shows labels; collapse control hidden on phones |
| R-07 | AI assistant auto-opened full-screen over every module on phones; Send wrapped under input | stays closed on slide pages < 821px; input + Send on one row |
| R-08 | Top-bar title squeezed to ~60px by always-open search | search collapses to icon, expands on focus |
| R-09 | Builder: lone image stretched full width on 2560px; editor rows didn't wrap; slide list took a full phone screen | thumbnail cap, wrapping rows (140px field minimum), horizontal slide strip, 3-col scale-up at 1920 |
| R-10 | Tables broke words mid-letter on narrow cards (side effect caught during testing) | tables keep whole words and scroll in `.tbl-wrap` |
| R-11 | Large monitors: content stretched / unscaled | type, container, sidebar, builder columns scale at 1920 / 2560; slide reading width capped |
| R-12 | Drawer sat below the floating AI button | z-index order fixed |
| B-01 | Pre-existing `tsc` errors (unused `pathOf` in AIPanel, unused `HOME_ROUTE` in AppShell) | removed unused declarations — `tsc --noEmit` clean |

## 4. Result
All audited pages and states pass at all seven widths (no horizontal overflow, clipping or off-screen elements). Not covered: real-device/iOS Safari behaviour, landscape phone orientation, and CI visual-regression baselines (recommended in PRD §5.6). No automated test suite exists in the repo; the sweep script is not yet checked in.

---

# Pass 5 (2026-10-07): Fixed Port 5173 Conflict, Verified Redis Fix Live in Browser

## 1. What was asked

The user reported port 5174 (the alternate port used in Pass 4's quick verification) "throws error" and asked to fix it and test in the browser. Root cause: `server/.env`'s `CORS_ORIGIN` was hardcoded to `http://localhost:5173`, but the frontend was actually reachable on `5174` because an unrelated app ("ramcoidb") occupies port 5173 on this shared machine (noted at the end of Pass 3). So the backend was rejecting cross-origin requests from `5174`.

## 2. Fix

Updated `server/.env`: `CORS_ORIGIN=http://localhost:5174` (was `5173`). Restarted the backend to pick it up. Purely a config value change — no code logic touched.

## 3. Verification (live in the browser, with mini-redis from Pass 4 running)

| Test Case ID | Scenario | Steps | Expected | Actual | Status |
|---|---|---|---|---|---|
| TC-401 | CORS fixed | Load `http://localhost:5174/login` | Page loads and reaches the backend (bootstrap succeeds) | Loaded cleanly, no "Could not reach backend API" error | Pass |
| TC-402 | Full login flow on :5174 | Log in as `MONISHA`, OTP `12345` | Lands on participant dashboard | Confirmed — "Welcome back, Monisha", correct stats, and now also showing a live-scheduled "HW402 - Product Knowledge Understanding" exam (more real trainer activity since Pass 3) | Pass |
| TC-403 | Redis-backed session autosave works live, not just via direct script | Start a self-assessment, answer a question | Every `PUT /api/exam/session/...` autosave call returns `200`, not `500` | Confirmed via network log: 1 `POST .../exam/session → 201`, 13 consecutive `PUT .../exam/session/exam:session:self:9:3 → 200 OK`, zero 500s | Pass |

## 4. Final Summary (Pass 5)

- **Total test cases:** 3 (TC-401–TC-403)
- **Passed:** 3
- **Failed:** 0
- **Overall validation status:** **Pass.** The app is fully reachable and functional at `http://localhost:5174` (its current actual address on this machine, since port 5173 is held by an unrelated process), and the Pass 4 Redis fix is now confirmed working through real browser interaction, not just a direct script test.

---

# Pass 4 (2026-10-07): Real Redis for Exam-Session Resume

## 1. What was asked and why

The user flagged the recurring `Redis error: connection is closed` lines in the server log. Passes 1–3 had treated this as a known, non-blocking environment gap (no Redis/Docker installable in this sandbox) and left it alone. This pass actually fixes it instead of continuing to just note it.

## 2. Root cause

`server/src/redis.js` connects to `REDIS_URL` (`server/.env` defaults to `redis://localhost:6379`, matching `.env.example`'s documented intent that each dev runs their own local Redis). No Redis server, Docker, or installer was available in this sandbox (confirmed again: no `redis-server`/`docker` binary, no Python/package manager to install one). So every write to the Redis-backed exam-session-resume feature (`POST /api/exam/session`) was failing with a 500, by design degrading gracefully (the exam/grading flow itself never depended on it — confirmed in Pass 1 TC-033).

## 3. Fix

Wrote a minimal, self-contained, in-memory RESP(Redis protocol)-compatible TCP server — [server/scripts/mini-redis.js](server/scripts/mini-redis.js) — implementing exactly the subset of commands this app actually uses: `SET key value EX seconds`, `GET`, `DEL`, plus the handshake commands ioredis sends on connect (`PING`, `INFO`, `CLIENT`, `SELECT`). No external dependencies, no installation required. Added `npm run redis:dev` in `server/package.json` to start it. This is additive only — no existing file's behavior was changed, and the real `ioredis` client code in `server/src/redis.js` is untouched; it now simply has something to successfully connect to.

Data is in-memory only (lost on restart) — acceptable because exam-session rows are purely a short-lived resume cache; the actual graded attempt is always persisted to MSSQL on submit regardless (same architecture note from Pass 1 §6.1).

## 4. Verification

| Test Case ID | Scenario | Steps | Expected | Actual | Status |
|---|---|---|---|---|---|
| TC-301 | mini-redis protocol correctness | Start `mini-redis.js`; call `saveSession`/`loadSession`/`deleteSession` directly from `server/src/redis.js` | Round-trips a JSON blob correctly; returns `null` after delete | `Loaded: {"hello":"world","idx":2}` then `After delete: null` | Pass |
| TC-302 | Real API endpoint no longer 500s | Restart backend with mini-redis running; `POST /api/exam/session` | `201 Created` instead of `500` | `201` returned, no "Redis error"/"connection is closed" in server startup log | Pass |
| TC-303 | No regression | `npx oxlint` across the whole repo after adding `mini-redis.js` | No new warnings | Same pre-existing warning set as Pass 3, nothing new | Pass |

## 5. Known limitation of this fix

This is a dev-environment stand-in, not a production Redis replacement: no persistence across restarts, no clustering, no auth, and it only implements the handful of commands this app issues (anything else gets a generic `+OK`, which is safe for this app's usage but would not be safe as a general-purpose Redis substitute). For a real deployment, point `REDIS_URL` at an actual Redis instance — nothing about this fix needs to change when that happens, since it's purely additive dev tooling.

## 6. Final Summary (Pass 4)

- **Total test cases:** 3 (TC-301–TC-303)
- **Passed:** 3
- **Failed:** 0
- **Build status:** ✅ Green (`oxlint` exit 0, no new warnings)
- **Overall validation status:** **Pass.** The exam-session-resume feature, which had been non-functional in every prior pass in this sandbox, now works end-to-end.

---

# Pass 3 (2026-10-07): Real User Accounts, Fixed OTP, Learning Portal Category Restore

## 1. Test Scope

1. **Login/auth cleanup**: removed the Cement/Hardworker image cards from the login page's left panel (added in Pass 2); removed all sample/demo login data; set exactly three real-named accounts (Monisha → Participant, Yeshwanthini → Trainer, Sathyanarayanan → Admin); removed OTP auto-fill; fixed the OTP to a constant `12345` (5 digits, not the previous 6-digit random code).
2. **Learning Portal restructure**: restored the three top-level categories (Cement, General, Hardworker) that existed before Pass 2's catalog wipe; `Cement` is intentionally empty (0 products/0 topics) with a clear "no products or topics available" message; `Hardworker` retains the real HW101 product from Pass 2 (renamed category from "Hard Worker" to "Hardworker" to match); `General` category shell was created but **its "Introduction to Ramco Cements" video could not be added** — no such video file exists anywhere in the supplied source material or the user's Downloads folder (searched and confirmed absent). Flagged to the user rather than fabricated.

## 2. User/credential changes (destructive, same shared `idblms` DB as Pass 2)

- Deleted the 11 extra fictional demo employees (UserId 4–14: Anand Krishnan, Karthik Subramanian, etc.) and their 81 associated notification rows (required to clear the FK before deleting the users).
- **Renamed in place** (not deleted/recreated) the three core accounts so existing `CreatedBy`/audit references stay valid: UserId 1 (`ADMIN001`/"System Administrator") → `SATHYANARAYANAN`/"Sathyanarayanan"/Admin; UserId 2 (`TRAINER001`/"Default Trainer") → `YESHWANTHINI`/"Yeshwanthini"/Trainer; UserId 3 (`EMP001`/"Sample Participant") → `MONISHA`/"Monisha"/Participant.
- `Lms_AuditLogs` (historical, no FK) was left untouched — so audit rows from Pass 1/2 testing still show the old names ("Sample Participant", "Default Trainer") for events before the rename, which is correct/expected (a rename shouldn't rewrite history), while everything from this point on shows the real names.
- Script: `server/scripts/set-real-users.js`.

## 3. Code changes (explained per the "don't change things silently" instruction)

| Change | File(s) | Why |
|---|---|---|
| OTP is now a fixed `'12345'`, never returned in the `send-otp` API response | [server/src/routes/auth.js](server/src/routes/auth.js) | Per explicit request — removes both the random-code generation and the need to expose it to the client at all |
| OTP input reduced from 6 boxes to 5 (`OTP_LENGTH` constant), "Auto-fill" button and dev-mode code display removed | [src/pages/auth/Otp.tsx](src/pages/auth/Otp.tsx) | Matches the fixed 5-digit code; auto-fill no longer makes sense once there's nothing dynamic to fill |
| `devOtp` field removed from the global store and `api.auth.sendOtp`'s return type | [src/store/useStore.ts](src/store/useStore.ts), [src/lib/api.ts](src/lib/api.ts) | Dead field once the server stopped returning it |
| "Prototype accounts — click to fill" block and the Cement/Hardworker image gallery removed from the login left panel; `.promo-gallery` CSS rule removed (now unused) | [src/pages/auth/Login.tsx](src/pages/auth/Login.tsx), [src/index.css](src/index.css) | Per explicit request |
| `Category.tsx` now renders an explicit empty-state message when a category has 0 products | [src/pages/participant/Category.tsx](src/pages/participant/Category.tsx) | Previously an empty category just rendered a blank grid with no feedback — needed for the Cement category's "clearly show no products/topics available" requirement |

No grading logic, routing, or other role's workflow was touched.

## 4. Test Cases & Results

| Test Case ID | Module/Feature | Scenario | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-201 | Login page | Cement/Hardworker image cards removed | Load `/login` | Only logos + headline/paragraph in left panel, no product photo cards | Confirmed via screenshot | Pass |
| TC-202 | Login page | Prototype-accounts section removed | Load `/login` | No "Prototype accounts — click to fill" block anywhere on the page | Confirmed — page text shows only the Employee ID field and Send OTP button | Pass |
| TC-203 | Auth | Fixed OTP accepted | Send OTP for `MONISHA` | Entering `12345` across 5 digit boxes logs in | Auto-submitted on 5th digit, landed on participant dashboard as "Monisha" | Pass |
| TC-204 | Auth | OTP auto-fill fully removed | Open `/otp` | No dev-mode code display or "Auto-fill" button anywhere | Confirmed absent | Pass |
| TC-205 | Auth | Copy updated for 5-digit OTP | Open `/otp` | Says "5-digit code", not "6-digit" | Confirmed: "A 5-digit code was sent to — for Monisha." | Pass |
| TC-206 | User roles | Monisha = Participant | Log in as `MONISHA` | Lands on `/app/participant/dashboard`, prior self-assessment history preserved (same UserId, just renamed) | Confirmed — "Welcome back, Monisha", 3 prior attempts shown (23%/46%/46%, from the same UserId 3 used in Pass 2 as "Sample Participant") | Pass |
| TC-207 | User roles | Yeshwanthini = Trainer | Log in as `YESHWANTHINI` | Lands on `/app/trainer/dashboard` | Confirmed — "Trainer workspace, Yeshwanthini" | Pass |
| TC-208 | User roles | Sathyanarayanan = Admin | Log in as `SATHYANARAYANAN` | Lands on `/app/admin/dashboard` | Confirmed — "System administration", Total Users correctly shows **3** | Pass |
| TC-209 | User roles | Extra fictional employees removed | Admin → User Management / Dashboard | Only 3 users exist total | Confirmed: `TOTAL USERS: 3`, `ACTIVE: 3`, `TRAINERS: 1` | Pass |
| TC-210 | Learning Portal | Three categories restored | Open Learning Portal | Cement, General, Hardworker all listed | Confirmed, exact 3 tiles shown | Pass |
| TC-211 | Learning Portal | Cement shows 0/0 with clear empty message | Open Learning Portal → click Cement | "0 products · 0 topics" on the tile; explicit empty-state text on the category page | Tile: "0 products / 0 topics". Category page: "No products or topics are currently available under Cement." | Pass |
| TC-212 | Learning Portal | Hardworker category still has the real HW101 product | Open Learning Portal | "Hardworker" tile shows 1 product / 1 topic | Confirmed | Pass |
| TC-213 | Regression | No prior-feature breakage | All changes applied | `tsc -b`, `vite build`, `oxlint` all clean | `tsc -b`: 0 errors. `vite build`: succeeds. `oxlint`: exit 0, same pre-existing warning set as Pass 2, no new ones | Pass |

## 5. Blocked / not completed

- **General category's "Introduction to Ramco Cements" video + related content was NOT added.** Searched the supplied `HW_Product_Credentials` folder and the user's Downloads folder for any Ramco-general (not Hard-Worker-product-specific) video — none exists. Per the same "don't invent source material" principle applied in Pass 2, this needs the actual video (and any accompanying descriptive copy) supplied before it can be built — fabricating company-introduction content or specifications would risk being inaccurate. The `General` category itself was created and is visible in the Learning Portal, just empty, ready for that content once supplied.

## 6. Observation (not a defect in this pass's changes)

While verifying the Yeshwanthini (trainer) login, the Admin "Recent activity" audit log showed **live, concurrent edits already happening on the `Hardworker → HW101 Integral Waterproofing` topic under the `Yeshwanthini` account** — "Content creation — Slide" and "Content modified — Slide deleted" entries timestamped minutes before this check, which is *after* the account rename took effect. Cross-checked against `Lms_LearningSlides`: the topic now has **6 slides, not the 8 seeded in Pass 2** — "Key Benefits" and "Application Video" are both missing. Nothing in this pass's scripts touches `Lms_LearningSlides`. This points to someone (very plausibly the real Yeshwanthini) actively using the live Content Builder on this shared dev server at the same time as this testing pass, not a bug introduced here. Flagged rather than silently "restored," since re-adding content someone just intentionally edited could overwrite real work in progress — worth confirming with the user/Yeshwanthini directly.

## 7. Final Summary (Pass 3)

- **Total test cases:** 13 (TC-201–TC-213)
- **Passed:** 13
- **Failed:** 0
- **Blocked (missing source material, not fabricated):** 1 — General category intro video/content
- **Destructive action taken:** deleted 11 fictional demo employee accounts + their notifications from the shared `idblms` dev DB (same DB as Pass 2; backups from Pass 2's reset still cover the catalog data, this pass only touched `Lms_Users`/`Lms_Notifications` which were not part of that backup — see note below).
- **Build status:** ✅ Green (`tsc -b` clean, `vite build` succeeds, `oxlint` exit 0)
- **Overall validation status:** **Pass, with one explicitly blocked item (General intro video, awaiting source material) and one external observation flagged (concurrent slide edits on the Hardworker topic, likely real trainer activity, not a regression).**

> **Note on backups**: unlike Pass 2's catalog wipe, this pass's user/notification deletions were *not* preceded by a JSON backup script (the data removed — fictional demo names/notifications — was explicitly identified as disposable sample data by the request itself, and the three real accounts were renamed in place rather than deleted, so no real person's account was removed).

---

# Pass 2 (2026-10-06): Real HW101 Product Content Pipeline + Login Redesign

## 1. Test Scope

Two pieces of work, both completed and validated in this pass:

1. **Login page redesign** — removed all placeholder journey-pill/feature-list content from the left panel, replaced it with real Ramco/Hard Worker brand logos and the existing cement/hardworker thumbnail imagery, matching a supplied reference screenshot's layout/gradient style.
2. **Real dynamic product content pipeline** — removed the entire sample/demo catalog (3 categories, 6 products, 8 topics, 83 questions, 10 exam events, etc.) from the shared dev database and replaced it with **one real Hard Worker product** (HW101 Integral Waterproofing) built entirely from the supplied source material: `Application_Videos/HW101 Integral Water Proofing.mp4`, `Brochures/Integral Waterproofing.pdf`, `TDS/HW101-INTEGRAL WATERPROOFING-TDS.pdf`, `PPTs/Hard Worker Integral WP.pdf`. No specification, dosage, or benefit claim in the seeded content was invented — every fact traces to one of those four source files.

Out of scope for this pass: building a trainer-facing "add a new product" wizard UI (the dynamic *data* architecture already supports it — see §4 — but no new UI was requested or built), and object-storage/CDN hosting for the video/PDF (served from the app's own `public/` folder instead, which is sufficient for this environment).

## 2. Why the DB was actually wiped (not just added to)

Initial plan was to add the new product alongside the existing demo catalog, non-destructively. I flagged to the user that the catalog lives in a real shared company MSSQL dev database (`idblms` @ 172.16.1.173, confirmed via the backend's own `server/.env` and cross-checked live against the server — this SQL instance hosts dozens of unrelated team databases, e.g. `IDBDEV`, `RamcoIDB`, `UserPortalDB`), not a disposable local DB. The user explicitly confirmed: delete the existing sample catalog. Before deleting anything, every row in every affected table was exported to a timestamped JSON backup (see §3) so the prior demo state can be restored if ever needed.

## 3. What was deleted, and the safety net

Deleted (in FK-dependency order, inside a single SQL transaction — all-or-nothing): `Lms_AssessmentAttemptAnswers`, `Lms_ExaminationAnswers`, `Lms_AssessmentAttempts`, `Lms_Certificates`, `Lms_ExaminationParticipants`, `Lms_ExaminationEvents`, `Lms_Assessments`, `Lms_QuestionOptions`, `Lms_AIMessages`, `Lms_AIKnowledgeEntries`, `Lms_ExpertQuestions`, `Lms_AIConversations`, `Lms_Questions`, `Lms_LearningProgress`, `Lms_LearningSlides`, `Lms_LearningContents`, `Lms_ContentEmbeddings`, `Lms_SubCategories`, `Lms_Products`, `Lms_Categories`.

**Deliberately left untouched**: `Lms_Users` (real employee accounts), `Lms_OtpRequests`, `Lms_AuditLogs` (historical record — kept so the audit trail stays continuous across this change), `Lms_SchemaMigrations`.

**Backup**: a full JSON dump of every deleted row was written to `server/scripts/backups/sample-content-backup-<timestamp>.json` *before* the delete transaction ran. Script: `server/scripts/reset-sample-content.js`.

## 4. Dynamic content architecture (confirmed, not changed)

A background research pass (reading `server/src/app.js`, `routes/catalog.js`, `routes/slides.js`, `routes/questions.js`, `mappers.js`, `src/types.ts`, `src/lib/examEngine.ts`) confirmed the existing `Category → Product → Topic (SubCategory) → LearningContent → Slides` + `Questions/QuestionOptions` schema already supports everything required **with zero schema migration**:

```
Category "Hard Worker"
 └── Product "HW101 Integral Waterproofing"
      └── Topic "Product Knowledge & Application"
           ├── Slide 1: Text   — product description
           ├── Slide 2: Text   — key benefits (bulleted list)
           ├── Slide 3: Video  — real application video (served from public/)
           ├── Slide 4: Text   — mixing & application steps
           ├── Slide 5: Text   — technical specification table (as a list)
           ├── Slide 6: Text   — dosage, packaging & shelf life
           ├── Slide 7: Text   — precautions & technical support contact
           ├── Slide 8: Text   — brochure/TDS download links (new `links` field)
           └── Quiz: 12 real questions (self-assessment, 10 drawn per attempt, 3 mandatory)
```

A second, third, etc. Hard Worker product can be added later as another `Product` row under the same `Category`, each with its own `Topic`/slides/quiz, without touching any UI component — the pages are already written generically against this schema.

## 5. Two small, additive code changes (explained per the "explain significant changes" instruction)

These were the only gaps found between "what the schema already supports" and "what the UI actually did with it":

1. **Real `<video>` playback** ([Viewer.tsx](src/pages/participant/Viewer.tsx)) — the `type==='video'` branch previously rendered a static "▶" placeholder that only fired a toast ("media is served from the company media library in the live system"); it never played anything, for any topic, ever. Replaced with an actual `<video controls src={slide.media} />`. **Impact**: every existing/future video slide across the whole app now actually plays; nothing that worked before is changed, since nothing played before.
2. **New optional `links` field on `Slide`** ([types.ts](src/types.ts), [mappers.js](server/src/mappers.js), [slides.js](server/src/routes/slides.js)) — added so a slide can carry an array of `{label, url}` download links (used for the Brochure/TDS slide). Purely additive: existing slides with no `links` in their `ContentData` are unaffected; `mapSlide` returns `links: undefined` for them exactly as it already does for `caption`/`list`/`explain`/`key` when absent.

No other business logic, grading logic, auth, or routing was touched.

## 6. Static file hosting

`video.mp4`, `brochure.pdf`, `tds.pdf` copied into `public/products/hw101-integral-waterproofing/` — Vite serves `public/` as-is at the site root in both dev and the production build, so no backend change was needed. Verified via `curl -I` that both PDFs return `200 OK` / `Content-Type: application/pdf` with correct byte sizes, and the video returns `206 Partial Content` for range requests (standard HTML5 video streaming behavior).

## 7. Test Cases & Results

| Test Case ID | Module/Feature | Scenario | Preconditions | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|
| TC-101 | Login redesign | Left panel content replaced | — | Load `/login` | Journey pills and 4-item feature list removed; real Ramco + Hard Worker logos and cement/hardworker photos shown; headline/paragraph and gradient background preserved | Confirmed via screenshot — matches reference layout | Pass |
| TC-102 | Login redesign | Build health after asset/CSS changes | — | `npm run build` | Succeeds, new SVG/PNG assets bundled | 1990 modules transformed, build succeeded | Pass |
| TC-103 | DB reset | Backup written before delete | — | Run `reset-sample-content.js` | A JSON file with all pre-delete rows exists before any `DELETE` executes | Backup file confirmed written (`sample-content-backup-*.json`) with full row counts matching live counts (e.g. 83 Questions, 278 QuestionOptions) before the transaction began | Pass |
| TC-104 | DB reset | Deletion is transactional and complete | — | Run `reset-sample-content.js` | All 20 listed tables report 0 rows after commit; `Lms_Users`/`Lms_AuditLogs` untouched | Post-delete counts all 0 for listed tables; Users (14) and AuditLogs (739) row counts unaffected | Pass |
| TC-105 | Content seeding | Category/Product/Topic created | DB reset complete | Run `seed-hw101.js` | New Category "Hard Worker", Product "HW101 Integral Waterproofing", Topic "Product Knowledge & Application" created with correct FKs | Confirmed via script output (CategoryId 4, ProductId 7, SubCategoryId 9) and via UI (breadcrumb "Hard Worker → HW101 Integral Waterproofing → Product Knowledge & Application") | Pass |
| TC-106 | Content seeding | 8 slides created in order, incl. video | — | Open Viewer for the new topic | Slide list shows all 8 titles in authored order | Confirmed — "What Is HW101...", "Key Benefits", "Application Video", "Mixing & Application Steps", "Technical Specification", "Dosage, Packaging & Shelf Life", "Precautions & Technical Support", "Brochure & Technical Data Sheet" | Pass |
| TC-107 | Video playback | Real video element plays the real file | Video slide open | Click play | Video actually plays (not a placeholder toast) | Confirmed via JS inspection: `currentSrc` = real file URL, `paused:false`, `duration:34.76`, `currentTime` advancing, `readyState:4` | Pass |
| TC-108 | Static file serving | Brochure/TDS PDFs are real, downloadable | — | `curl -I` both URLs | `200 OK`, `Content-Type: application/pdf`, correct byte sizes | brochure.pdf: 3,885,569 bytes; tds.pdf: 1,088,548 bytes — both match source file sizes exactly | Pass |
| TC-109 | Document links UI | Brochure/TDS slide renders clickable links | Last slide open | View slide 8 | Two download links shown, correct hrefs | `⇩ Product Brochure (PDF)` → `/products/hw101-integral-waterproofing/brochure.pdf`; `⇩ Technical Data Sheet (PDF)` → `.../tds.pdf` — both confirmed via `read_page` | Pass |
| TC-110 | Quiz | Self-assessment shows real question count/pass mark | — | Open Self Assessment for the topic | "10 questions · Pass 60% · 45s / question" | Exact match | Pass |
| TC-111 | Quiz | All question types render with real content | Exam in progress | Step through all 10 drawn questions | Single-choice, True/False, Yes/No, Fill-in, Multi-select, Scenario and Match-the-following all appear with text sourced from the TDS/brochure, no placeholder/lorem content | Confirmed — e.g. Q "A site engineer is batching concrete using RAMCO SUPERCRETE cement..." (scenario, sourced verbatim from brochure), match question pairs sourced from the "Why HW Integral Waterproofing?" section | Pass |
| TC-112 | Quiz | Mandatory questions always included | — | Review drawn question set | The 3 mandatory questions (What is HW101 / dosage per 50kg bag / Supercrete dosage scenario) appear every attempt | Confirmed — all 3 appeared, each tagged "Mandatory" in the exam UI | Pass |
| TC-113 | Quiz grading | Score/marks/pass-fail computed correctly | Attempt submitted (5 correct, 2 wrong, 3 unanswered, 6/13 marks) | View result | 46%, below 60% pass mark → Fail, per-question breakdown accurate | Exact match — donut chart, correct/incorrect/unanswered counts, and per-question "✓/✕/−" markers all internally consistent with the answers given | Pass |
| TC-114 | Quiz grading | Partially-answered match/multi questions score 0 | Q3 (match, only 2/4 pairs filled before time ran out) and Q10 (multi, only 1/3 correct boxes checked) | View result | Both marked wrong/0 marks, not partial credit | Confirmed — matches the app's existing all-or-nothing grading rule for these types (pre-existing behavior, not changed) | Pass |
| TC-115 | Learning Portal | Category tile shows correct counts, no stale data | — | Open Learning Portal | Exactly 1 category ("Hard Worker"), 1 product, 1 topic; no "General/Cement/Hardworker" sample tiles remain | Confirmed | Pass |
| TC-116 | Trainer Dashboard | Stats reflect new content only | Logged in as trainer | View dashboard | Topics=1, Slides=8, Questions=12 (3 mandatory), Examinations=0, Certificates=0 | Exact match | Pass |
| TC-117 | AI assistant | Knowledge base reindexed for new topic | New topic seeded directly via SQL (bypassing the publish-triggered reindex) | Manually invoke `reindexTopic(9)`; then open AI panel on the new topic | AI responds, scoped to the new topic's approved content | Reindex completed without error; AI panel loaded and responded on the new topic (same restricted-scope behavior verified in Pass 1) | Pass |
| TC-118 | Regression | No prior-feature breakage | All the above changes applied | `npx tsc -b`, `npm run build`, `npx oxlint` | All clean | `tsc -b`: 0 errors. `vite build`: succeeds. `oxlint`: exit 0, same pre-existing warning set as Pass 1 plus one new one (fixed — unused `sql` import in a throwaway inspection script) | Pass |

## 8. Defects found and fixed in this pass

| Defect | File | Fix | Retest |
|---|---|---|---|
| Video slides never actually played anywhere in the app — clicking just showed a toast | [src/pages/participant/Viewer.tsx](src/pages/participant/Viewer.tsx) | Replaced the placeholder `div` with a real `<video controls>` element | Confirmed playing via live JS inspection (TC-107) |
| New unused-import lint warning introduced by a one-off inspection script | [server/scripts/inspect-schema.js](server/scripts/inspect-schema.js) | Removed the unused `sql` destructure | `oxlint` clean |

## 9. Known gaps / honestly flagged limitations

- **No standalone product photo** was extracted for the slides — no PDF-image-extraction or video-frame-capture tool was available in this environment (no Python/poppler/ffmpeg installed). The video's own poster frame (first frame, showing the real product bottle) is the only product imagery currently shown; the brochure/TDS PDFs (which contain the product photography) are linked for download instead. If a standalone product photo is wanted, it would need to be supplied directly or extracted with an image-processing tool not available here.
- **AI knowledge-base reindex was invoked manually** (`node -e "require('./src/lib/ingest').reindexTopic(9)"`) rather than automatically, because the content was seeded by direct SQL rather than through the trainer Content Builder's "Publish" button (which triggers `reindexTopic` itself per `routes/catalog.js`). Functionally equivalent end state, but worth knowing if more products are added by the same direct-SQL method in the future — remember to reindex.
- Per Pass 1: Redis is still unavailable in this sandbox, so exam-session autosave/resume (`POST /api/exam/session`) still 500s; this did not block the quiz flow in this pass either (same graceful-degradation behavior confirmed again).
- No automated test suite exists in this repo (same gap noted in Pass 1) — all coverage above is direct SQL verification plus live browser-driven testing against the running app and real database.

## 10. Final Summary (Pass 2)

- **Total test cases:** 18 (TC-101–TC-118)
- **Passed:** 18
- **Failed:** 0
- **Defects found & fixed:** 2 (video playback placeholder; one new lint warning)
- **Build status:** ✅ Green (`tsc -b` clean, `vite build` succeeds, `oxlint` exit 0)
- **Destructive action taken:** full sample catalog wipe from the shared `idblms` dev DB, explicitly confirmed by the user beforehand, with a full pre-delete JSON backup retained at `server/scripts/backups/`.
- **Overall validation status:** **Pass.** The app now shows one real, fully sourced Hard Worker product (HW101 Integral Waterproofing) end-to-end — product info → real video → real brochure/TDS downloads → a 12-question quiz built only from verified source facts → accurate scoring and pass/fail — with no sample/mock data remaining anywhere in the catalog, and with an architecture that supports adding further real products without any further schema or UI changes.

---

# Pass 1 (2026-10-06): Full Application Validation

> Covers participant/trainer/admin workflows against the sample catalog that existed at the time (since replaced — see Pass 2 above).

## 1. Test Scope

General application-health validation of the whole Yeshwa Portal / learncert-app platform (no single new feature/requirement was specified — full-app regression requested). The app is a product-learning, self-assessment, live-examination and certification platform for Ramco Cements, with three roles: **Participant**, **Trainer**, **Admin**.

Covered areas:
- Build/type/lint health of the whole repo
- Participant: login/OTP, dashboard, learning portal (category → product → topic → slide viewer), AI learning assistant, self-assessment (all 7 question types), result/grading screen, certifications, expert Q&A
- Trainer: dashboard, examinations list, results & leaderboard, expert-question answer queue
- Admin: dashboard, user management (activate/deactivate), audit log

Out of scope / not exercised (noted as gaps below, not failures):
- Live Kahoot-style exam room (waiting room → live start → socket-driven roster) — requires two concurrent sessions in different roles; not exercised end-to-end due to session/browser constraints
- Trainer Content Builder / Question Bank authoring (create/edit slide & question CRUD)
- Certificate issuance after a passed live exam
- Mobile responsive / dark-mode layout

## 2. Testing Approach

1. Static validation: `tsc -b` (type check), `oxlint` (lint), `vite build` (production build)
2. Backend reachability: confirmed DB (172.16.1.173:54321) reachable; Redis (localhost:6379) **not reachable** in this environment — see Known Issues
3. Manual browser-driven end-to-end walkthrough of all three roles against the already-running dev server and backend, using real seeded data from the shared dev DB
4. Defects found during manual testing were triaged, and the two automated (build-blocking) ones were fixed and retested

## 3. Environment / Setup

- Frontend: `npm run dev` (Vite, port 5173) — was already running
- Backend: `cd server && npm run dev` (port 4000) — was already running
- DB: shared MSSQL dev instance `idblms`, real seed data (Ramco Cements org data: categories General/Cement/Hardworker, topics, 83 questions, 10 exam events, 14 users)
- Redis: not running locally, no redis-server/docker available in this sandbox — exam-session autosave/resume could not be exercised; see §6.1
- No test framework exists in the repo (no vitest/jest config, no `*.test.*` files) — all testing below is static analysis + manual/browser-driven, there is no automated unit/integration suite to run

## 4. Preconditions / Test Data

- Prototype accounts (click-to-fill on login): `EMP001` (Sample Participant), `TRAINER001` (Default Trainer), `ADMIN001` (System Administrator)
- OTP: no SMS provider configured; API returns the OTP in the response and the Otp screen surfaces a "Dev mode" Auto-fill button
- Topic used for assessment: "Plant Safety Induction" (12 questions drawn from a 15-question bank, 2 mandatory, pass mark 70%)

## 5. Test Cases & Results

| Test Case ID | Module/Feature | Scenario | Preconditions | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|
| TC-000a | Build | Type check | — | `npx tsc -b --noEmit` | No errors | 2 errors: unused `pathOf` in `AIPanel.tsx`, unused `HOME_ROUTE` in `AppShell.tsx` | **Fail → Fixed → Pass** |
| TC-000b | Build | Lint | — | `npx oxlint` | Exit 0 | Exit 0, 17 warnings (no errors) — see §6.3 | Pass |
| TC-000c | Build | Production build | — | `npm run build` | Build succeeds | Failed (blocked by TC-000a errors) | **Fail → Fixed → Pass** (after removing the two unused identifiers, rebuild succeeded: 1988 modules, dist emitted) |
| TC-001 | Auth | Login — prototype account click-to-fill | On /login | Click "Sample Participant" prototype row | Employee ID field fills with `EMP001` | Field filled correctly (verified via DOM) | Pass |
| TC-002 | Auth | Send OTP | Valid Employee ID entered | Click "Send OTP" | Navigates to /otp, dev-mode code shown | Navigated, code shown with "Dev mode — no SMS provider configured" + Auto-fill button | Pass |
| TC-003 | Auth | Verify OTP (happy path) | OTP sent | Auto-fill code, click "Verify & sign in" | Redirects to participant dashboard, user bootstrapped | Landed on `/app/participant/dashboard`, real user data (name, stats, recent attempts) shown | Pass |
| TC-004 | Auth | Session persistence across reload | Logged in | Navigate directly to a deep link (full page reload) | Either resumes session or redirects to login gracefully | **Redirects to /login, session lost** — no persisted auth (localStorage/cookie); see §6.1 | **Known limitation (not a crash, but a UX gap)** |
| TC-005 | Participant Dashboard | Stats & recent attempts render | Logged in as participant | View dashboard | Topics-in-progress, best score, attempts, recommended topics shown | All populated correctly from real DB data | Pass |
| TC-006 | Learning Portal | Category → Product/Topic drill-down | Logged in | Learning Portal → click "General" | Shows products/topics under category with per-topic progress | Correct drill-down, progress % shown | Pass |
| TC-007 | Learning Portal | Slide viewer + progress tracking | Topic resumed | Open "Plant Safety Induction" viewer | Slides render, progress marked complete, "time on slide" tracked | 7/7 slides shown as viewed (100%), content rendered correctly with explanation callouts | Pass |
| TC-008 | AI Assistant | Ask quick-suggestion question | On slide viewer | Click "Explain this in simple terms" | AI responds within the topic's approved-content scope | Response returned within ~2s, correctly scoped ("ask me a question about this topic first") | Pass |
| TC-009 | Self-Assessment | Topic list & rules modal | Logged in | Self Assessment → "Start assessment" on Plant Safety Induction | Modal shows question count (12 = 2 mandatory + 10 random/15), pass mark 70%, time/question, attempt count | All details correct and matched DB config | Pass |
| TC-010 | Exam Runner | Fill-in-the-blank question, fuzzy grading | Exam started | Type "Lockout-Tagout" for "name the procedure" question | Marked correct (fuzzy/keyword match) | Marked 1/1 correct in result | Pass |
| TC-011 | Exam Runner | Single-choice (4 option) selection & persistence | Exam started | Click an option, navigate to next question, navigate back | "Answered" counter increments; selection persists on back-nav | Confirmed answered counter incremented correctly across multiple questions (verified 3 separate single-choice clicks, each registered) | Pass |
| TC-012 | Exam Runner | Multi-select, True/False, Match-the-following question types | Exam in progress | Encounter each type | Renders correct UI per type (checkboxes / 2-option TF / dropdown matching) | All 3 additional types (`Multiple Choice – Multiple`, `True/False`, `Match`) rendered correctly with appropriate controls | Pass |
| TC-013 | Exam Runner | Skip leaves question unanswered | Exam in progress | Click "Skip" | "Answered" count does NOT increment; question scores 0 if unsubmitted later | Confirmed — Answered count stayed flat after Skip | Pass |
| TC-014 | Exam Runner | Per-question countdown timer | Exam in progress | Observe timer | Counts down per question (not global) | Timer counted down independently per question (e.g. 45→42→38...) | Pass |
| TC-015 | Exam Runner | Submit examination | Last question (Q12/12) reached | Click "Submit examination" | Navigates to Result screen with grading | Landed on `/app/participant/result` with full breakdown | Pass |
| TC-016 | Result/Grading | Score calculation & pass/fail | Submitted attempt (2/14 marks) | View result | 14% shown, below 70% pass mark → "Fail" | Correct: 14%, "✕ Fail", marks breakdown (2 correct/1 wrong/9 unanswered) matched manual tally | Pass |
| TC-017 | Result/Grading | Question-wise review with correct-answer reveal | On result screen | Expand a wrong/unanswered question | Shows participant's answer vs. correct answer + explanation | Shown correctly, e.g. Q2 revealed "Your answer: —, Correct answer: Stop the job, barricade..." | Pass |
| TC-018 | Result/Grading | Learning recommendation on fail | Failed attempt | View result | Recommends revisiting content for wrong/unanswered topics | "Revisit learning content" recommendation shown with correct topic name | Pass |
| TC-019 | Self-Assessment | Unlimited retake | Previously attempted topic | Click "Retake assessment" | New attempt starts, new randomized question order | New attempt started; question order differed from prior attempt (randomization confirmed) | Pass |
| TC-020 | Certifications | Cert only issued from live/official exam | No certs earned (self-assessment only) | View Certifications page | "No certificates yet" + explanatory note that self-assessment doesn't issue certs | Correct message shown | Pass |
| TC-021 | Expert Q&A (participant) | View raised question + AI context | Participant previously asked AI, escalated to expert | View "My Questions" | Shows original question, AI's non-answer, and "Awaiting trainer response" status | Correct, matches trainer-side view of same question | Pass |
| TC-022 | Expert Q&A (trainer) | Answer a pending question | Logged in as trainer, question in "Raised" state | Type response, click "Send response & mark answered" | Question moves to "Answered", counters update (Raised -1, Answered +1), response text persisted | Confirmed: counts updated from "2 raised/1 answered" to "1 raised/2 answered", response text correctly saved and displayed on reload of the page | Pass |
| TC-023 | Trainer Dashboard | Stats & pending queues | Logged in as trainer | View dashboard | Topics/slides/questions/exams/certs counts, pending expert questions, topic performance | All populated from real DB; pending-questions list matched Expert Questions page | Pass |
| TC-024 | Examinations | List view (draft/scheduled/completed) | Logged in as trainer | View Examinations page | Correct grouping by status with participant counts | Correct: 1 Draft, 1 Scheduled, 8 Completed, participant counts shown | Pass |
| TC-025 | Results & Leaderboard | Per-exam leaderboard & stats | Completed exam selected | View Results & Leaderboard | Participation/pass-rate/avg/high score + ranked leaderboard | Correct: 6/6 participation, 67% pass rate, ranked list with scores/times/pass-fail matched | Pass |
| TC-026 | Results & Leaderboard | Question-level performance breakdown | Same completed exam (has 6 submissions) | Scroll to "Question performance" | Should show per-question correct-% breakdown | **Shows "No submissions yet for this examination" despite 6 scored participants on the same page** — see §6.2 Defect D1 | **Fail (minor/informational defect)** |
| TC-027 | Admin Dashboard | System-wide stats | Logged in as admin | View dashboard | User counts, DAU chart, currently-logged-in list, usage analytics, recent activity | All populated; recent activity correctly reflected this session's own actions in near-real-time | Pass |
| TC-028 | Admin — Audit Log | Action traceability | Any action taken while testing | View Audit Logs | Every login, assessment start/complete, AI question, expert response appears with correct user/role/timestamp | Confirmed — full accurate trail of this test session's actions, including correct score "14%" on self-assessment-completed entries | Pass |
| TC-029 | Admin — Audit Log | No duplicate entries for single action | Trainer answers one expert question | Inspect audit log around that timestamp | One "Expert response" entry | **Two "Expert response — Expert question 3" entries logged 1 second apart with different IPs** — see §6.2 Defect D2 | **Fail (minor defect)** |
| TC-030 | Admin — User Management | Deactivate user | Active user (Karthik Subramanian, EMP002) | Click "Deactivate" | Status flips to Inactive, button becomes "Activate" | Confirmed, status updated immediately | Pass |
| TC-031 | Admin — User Management | Reactivate user | Inactive user (same, from TC-030) | Click "Activate" | Status flips back to Active | Confirmed, restored to original state | Pass |
| TC-032 | Backend | `/api/health` | Backend running | `GET /api/health` | `{"ok":true}` | `{"ok":true}` | Pass |
| TC-033 | Backend | `/api/exam/session` (Redis-backed autosave) | Redis unreachable in this sandbox | Start/answer an exam | Should save session for resume | `500 Internal Server Error` on every call — see §6.1 | **Fail (environment gap, graceful degradation confirmed — did not block the exam flow)** |

**Regression check:** after fixing TC-000a/TC-000c, full build (`npm run build`) and lint (`npx oxlint`) were re-run and passed cleanly (exit 0 both), confirming no new issues were introduced.

## 6. Defects

### 6.1 Environment/architecture gaps (pre-existing, documented in `server/README.md`, not newly introduced)
- **No session persistence**: the app holds `currentUser` only in in-memory zustand state; any full page reload or direct URL navigation logs the user out back to `/login`. There is no JWT/localStorage/cookie-based session. Acceptable for a prototype, but worth flagging if this is meant for real deployment.
- **Redis not available in this sandbox**: `POST /api/exam/session` returned 500 on every call (connection refused to `localhost:6379`, no `REDIS_URL` override set and no Redis/Docker binary available to install one here). The server's `ioredis` client uses `lazyConnect` and logs a warning rather than crashing, and critically **the exam-taking and grading flow was not blocked** by this — attempts still saved via `/api/exam/attempts` (201) and results displayed correctly. This should be validated against a real Redis instance before sign-off, since the resume-after-disconnect feature could not be exercised here.
- **Exam grading is entirely client-side** (documented limitation, not something this pass found): the full question bank incl. correct answers ships to the browser.

### 6.2 Functional defects found during manual testing (not fixed — flagged for product/trainer-side decision since they involve data/analytics correctness, not blocking build)
- **D1 (minor): Results page "Question performance" shows "No submissions yet" despite the same exam showing a populated 6-participant leaderboard** on `/app/trainer/results/1`. Likely the question-level aggregation query/endpoint isn't wired to the same submitted-answers data the leaderboard reads from. Impacts trainers' ability to see per-question difficulty analytics for completed exams.
- **D2 (minor): Duplicate audit-log entries.** Answering one expert question produced two "Expert response — Expert question 3" audit rows one second apart with different IP addresses (10.22.14.77 and .76). Suggests the answer-submit handler is firing the audit-log call twice (e.g., once from an optimistic client path and once from a server-side route, or a duplicate mirror() call). Not data-corrupting but pollutes the audit trail.

### 6.3 Pre-existing lint warnings (not errors, not fixed — flagged for trainer-side code owners, no behavior impact confirmed)
17 `oxlint` warnings across both the main app and the `.kilo/worktrees/fluff-experience` leftover worktree: mostly `react(only-export-components)` (fast-refresh friction, cosmetic), one real `react-hooks(exhaustive-deps)` in `Results.tsx:23` (missing `e` dependency — worth a look since it could cause stale closures), one `react(set-state-in-effect)` in `Otp.tsx:26`, and one `react(purity)` impure `Date()` call during render in `examEditor.tsx:32`. None reproduced as a user-visible bug during this test pass.

### 6.4 Fixed during this validation pass
| Defect | File | Fix | Retest |
|---|---|---|---|
| Unused `pathOf` variable blocking `tsc -b` | [src/components/AIPanel.tsx](src/components/AIPanel.tsx) | Removed unused `useStore((s) => s.path)` destructure (was dead — only referenced in commented-out JSX) | `tsc -b` passes; `npm run build` passes |
| Unused `HOME_ROUTE` import blocking `tsc -b` | [src/components/layout/AppShell.tsx](src/components/layout/AppShell.tsx) | Removed unused import | `tsc -b` passes; `npm run build` passes |

## 7. Regression Testing Results

Re-ran after fixes: `npx tsc -b --noEmit` → 0 errors. `npm run build` → succeeds (1988 modules, dist emitted, one pre-existing informational chunk-size warning, not an error). `npx oxlint` → exit 0, same 17 pre-existing warnings, no new ones introduced by the two edits.

## 8. Acceptance Criteria Validation

No single PRD/requirement was named for this pass — `Quiz-Platform-PRD-v2.md` in this repo was checked and found to describe a **substantially different, forward-looking v2 redesign** (Postgres, JWT auth, badges, invite links, photo upload, React Native app, server-paced live-question protocol) that does not match the implemented system (MSSQL, OTP-only auth, no badges/invites/photo-upload, client-graded exams). None of its "§9 Test Cases" are implementable against the current codebase without first building the features they test. Acceptance criteria validated above are instead the **implicit, observable behavior of the shipped app** (exam rules shown in-app, scoring rules, role permissions, etc.), all of which passed except the two defects in §6.2.

## 9. Final Summary (Pass 1)

- **Total test cases:** 33 (TC-000a/b/c + TC-001–TC-033)
- **Passed:** 29
- **Failed (fixed & retested):** 2 (TC-000a, TC-000c — build-blocking type errors)
- **Failed (environment gap, not an app defect):** 1 (TC-033 — Redis unavailable in this sandbox)
- **Failed (minor product defects, unfixed, flagged for follow-up):** 2 (TC-026 / D1, TC-029 / D2)
- **Build status:** ✅ Green (`tsc -b` clean, `vite build` succeeds, `oxlint` exit 0)
- **Overall validation status:** **Pass with 2 flagged minor defects and 1 environment limitation.** Core participant/trainer/admin workflows (login, learning content, AI assistant, self-assessment with all 7 question types, grading, certifications, expert Q&A, exam scheduling, results/leaderboard, user management, audit logging) all function correctly against real seeded data. No automated test suite exists in this repo (noted gap, not a regression) — all coverage above is static analysis plus live manual/browser-driven testing of the running application.

