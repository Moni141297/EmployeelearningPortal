import { create } from "zustand";
import type { ReactNode } from "react";
import type {
  AppUser,
  Category,
  Product,
  Topic,
  Slide,
  Question,
  Attempt,
  ExamEvent,
  Certificate,
  ExpertQuestion,
  AuditEntry,
  Notification,
  ProgressEntry,
  AiState,
  AiMessage,
  ExamState,
  AttemptMode,
  PreparedQuestion,
} from "../types";
import { api } from "../lib/api";
import { connectSocket, disconnectSocket, getSocket } from "../lib/socket";
import { uid, nowStr, shuffle, mmss } from "../lib/helpers";
import {
  topicById,
  productOfTopic,
  categoryOfTopic,
  pathOf,
  activeQuestionsOf,
  progressKey,
  progressOf,
} from "../lib/selectors";
import { buildPaper, gradePaper } from "../lib/examEngine";

// These AI chat quick-reply chips refer to "this"/"that" — the previous AI
// answer — rather than naming a topic themselves, so they need that answer
// passed along as retrieval context (see aiSend below) or they read as
// out-of-scope to the knowledge-base search.
const AI_CONTEXTUAL_PROMPTS = ["explain this in simple terms", "give me an example"];

// Backend mutations that don't create a new server-assigned id (audit, notify,
// slide reorder/move/update/delete, status toggles, ...) are mirrored
// fire-and-forget: local state is the source of truth for the UI, and the
// change is persisted to MSSQL in the background. Failures are logged, not
// surfaced, since the local state has already been applied optimistically.
function mirror(p: Promise<unknown>) {
  p.catch((err) => console.warn("Backend sync failed:", err));
}

interface ToastMsg {
  id: string;
  text: string;
  kind?: "ok" | "bad" | "warn";
}

interface StoreState {
  // ---- data ----
  ready: boolean;
  users: AppUser[];
  categories: Category[];
  products: Product[];
  topics: Topic[];
  slides: Record<string, Slide[]>;
  questions: Question[];
  attempts: Attempt[];
  events: ExamEvent[];
  certs: Certificate[];
  expertQs: ExpertQuestion[];
  audit: AuditEntry[];
  notifs: Notification[];
  progress: Record<string, ProgressEntry>;

  // ---- session ----
  currentUser: AppUser | null;
  loginEmp: string;
  otpTries: number;
  ai: AiState;
  exam: ExamState | null;
  sidebarCollapsed: boolean;
  toasts: ToastMsg[];
  modal: ReactNode | null;

  // ---- UI memory (mirrors original global `S`) ----
  builderTopic: string;
  builderSlideIndex: number;
  bankTopic: string;
  bankFilters: { q: string; type: string; mand: string; diff: string };
  bankPage: number;
  analyticsTab: string;
  // Per-event participant status for the trainer's waiting-room dots:
  // 'waiting' (joined, not started), 'exam' (answering), 'done' (submitted).
  partStatus: Record<string, Record<string, "waiting" | "exam" | "done">>;
  userFilters: { q: string; role: string; status: string };
  auditFilter: string;

  // ---- bootstrap ----
  init: () => Promise<void>;
  refreshStore: () => Promise<void>;

  // ---- selectors (bound helpers) ----
  topic: (id: string) => Topic;
  productOf: (topicId: string) => Product;
  categoryOf: (topicId: string) => Category;
  path: (topicId: string) => string;
  qOf: (topicId: string) => Question[];
  userById: (id: string) => AppUser;
  progOf: (
    userId: string,
    topicId: string
  ) => { viewed: string[]; done: boolean; pct: number; total: number };

  // ---- actions: session ----
  setLoginEmp: (v: string) => void;
  setOtpTries: (n: number) => void;
  requestOtp: (emp: string) => Promise<{ ok: true; mobile: string } | { error: string }>;
  verifyOtp: (emp: string, otp: string) => Promise<{ ok: true } | { error: string }>;
  loginAs: (id: string, userOverride?: AppUser) => void;
  logout: () => void;
  toast: (text: string, kind?: "ok" | "bad" | "warn") => void;
  dismissToast: (id: string) => void;
  openModal: (node: ReactNode) => void;
  closeModal: () => void;
  markNotifsRead: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  auditLog: (action: string, entity: string) => void;

  // ---- actions: learning ----
  viewSlide: (userId: string, topicId: string, slideId: string) => void;
  completeLearning: (userId: string, topicId: string) => void;

  // ---- actions: AI assistant ----
  openAI: (topicId?: string) => void;
  closeAI: () => void;
  aiSend: (topicId: string, text: string) => void;
  aiPushMessage: (msg: AiMessage) => void;
  submitExpertQuestion: (
    userId: string,
    topicId: string,
    question: string,
    aiResp: string,
    note: string
  ) => void;

  // ---- actions: assessment / exam ----
  launchExam: (
    topicId: string,
    mode: AttemptMode,
    eventId: string | null,
    userId: string
  ) => string | null;
  setAnswer: (idx: number, a: unknown) => void;
  setExamIndex: (idx: number) => void;
  setAnswerTime: (idx: number, t: number) => void;
  endExamEarly: () => void;
  finishExam: (userId: string) => void;
  clearExam: () => void;
  loadPastResult: (attemptId: string) => void;

  // ---- actions: events ----
  joinEvent: (eventId: string, userId: string) => void;
  leaveWait: (eventId: string, userId: string) => void;
  startLive: (eventId: string) => void;
  endExam: (eventId: string) => void;
  tryResumeExam: (
    topicId: string,
    mode: AttemptMode,
    eventId: string | null,
    userId: string
  ) => Promise<boolean>;
  requestRetakeNotify: (topicId: string) => void;
  refreshEvents: () => Promise<void>;

  // ---- actions: trainer content ----
  setBuilderTopic: (t: string) => void;
  setBuilderSlideIndex: (i: number) => void;
  saveTopic: (id: string | null, o: Omit<Topic, "id">) => Promise<void>;
  saveProduct: (id: string | null, o: Omit<Product, "id">) => Promise<void>;
  deleteTopic: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addSlide: (topicId: string, atIndex: number) => void;
  updateSlide: (topicId: string, index: number, patch: Partial<Slide>) => void;
  duplicateSlide: (topicId: string, index: number) => void;
  deleteSlide: (topicId: string, index: number) => boolean;
  moveSlide: (topicId: string, index: number, dir: 1 | -1) => void;
  reorderSlides: (topicId: string, from: number, to: number) => void;
  publishContent: (topicId: string) => void;

  // ---- actions: question bank ----
  setBankTopic: (t: string) => void;
  setBankFilters: (f: Partial<StoreState["bankFilters"]>) => void;
  setBankPage: (p: number) => void;
  saveQuestion: (id: string | null, o: Omit<Question, "id" | "by" | "created">) => void;
  duplicateQuestion: (id: string) => void;
  toggleArchiveQuestion: (id: string) => void;

  // ---- actions: examinations (trainer) ----
  saveExam: (id: string | null, o: Omit<ExamEvent, "id" | "joined">) => Promise<ExamEvent>;
  publishExam: (id: string) => Promise<boolean>;

  // ---- actions: expert queue ----
  answerExpert: (id: string, resp: string, expertName: string) => Promise<void>;
  assignExpert: (id: string, expertName: string) => Promise<void>;
  closeExpert: (id: string) => Promise<void>;
  publishToKB: (id: string) => Promise<void>;

  // ---- actions: certificates ----
  revokeCert: (id: string) => Promise<void>;

  // ---- actions: users / admin ----
  setUserFilters: (f: Partial<StoreState["userFilters"]>) => void;
  saveUser: (id: string | null, o: Omit<AppUser, "id" | "created">) => string | null;
  toggleUserStatus: (id: string) => Promise<void>;
  setAuditFilter: (v: string) => void;

  // ---- misc UI state setters ----
  setAnalyticsTab: (t: string) => void;
}

// Notifications are per-user in the database. This only touches local state
// when the current user is one of the recipients (so a broadcast meant for
// participants doesn't pop into a trainer's bell), and always mirrors to the
// backend for every intended recipient.
function notifyTargets(
  get: () => StoreState,
  set: (partial: Partial<StoreState> | ((s: StoreState) => Partial<StoreState>)) => void,
  txt: string,
  userIds: string[]
) {
  const cu = get().currentUser;
  if (cu && userIds.includes(cu.id)) {
    const id = uid("N");
    set((s) => ({ notifs: [{ id, txt, time: "Just now", read: false }, ...s.notifs] }));
  }
  userIds.forEach((userId) => mirror(api.notifications.create(userId, txt)));
}

// Wires the realtime channel once per login: the backend pushes a user's own
// notifications, and broadcasts examination-room events (joins/leaves/start/
// end) to everyone currently in that event's room — this is what makes the
// waiting room and trainer "Live" screen reflect real participants instead of
// a fake local timer.
function wireSocket(
  get: () => StoreState,
  set: (partial: Partial<StoreState> | ((s: StoreState) => Partial<StoreState>)) => void,
  userId: string
) {
  const socket = connectSocket(userId);
  socket.off("notification:new");
  socket.off("participant:joined");
  socket.off("participant:left");
  socket.off("event:started");
  socket.off("event:ended");
  socket.off("participant:status");
  socket.off("event:roster");
  socket.off("participant:completed");
  socket.off("session:terminate");
  socket.off("expert:new");
  socket.off("expert:answered");
  socket.off("expert:updated");

  // An administrator ended this session from Admin → Active Users.
  socket.on("session:terminate", () => {
    get().toast("Your session was ended by an administrator", "warn");
    get().logout();
  });
  socket.on("notification:new", ({ txt }: { txt: string }) => {
    set((s) => ({ notifs: [{ id: uid("N"), txt, time: "Just now", read: false }, ...s.notifs] }));
  });
  // A participant raised a new question — pushed to every trainer so an open
  // Expert Questions screen shows it without a reload.
  socket.on("expert:new", (q: ExpertQuestion) => {
    set((s) => (s.expertQs.some((x) => x.id === q.id) ? s : { expertQs: [q, ...s.expertQs] }));
  });
  // A trainer answered — pushed to the asking participant (so their "My
  // questions to experts" page updates live) and to every other trainer (so
  // a second trainer's list doesn't show it as still unanswered).
  socket.on("expert:answered", (q: ExpertQuestion) => {
    set((s) => ({ expertQs: s.expertQs.map((x) => (x.id === q.id ? q : x)) }));
  });
  socket.on("expert:updated", (q: ExpertQuestion) => {
    set((s) => ({ expertQs: s.expertQs.map((x) => (x.id === q.id ? q : x)) }));
  });
  socket.on(
    "participant:joined",
    ({ eventId, userId: uId, role }: { eventId: string; userId: string; role?: string }) => {
      if (!uId || role === "trainer") return;
      set((s) => ({
        events: s.events.map((e) =>
          e.id === eventId && !e.joined.includes(uId) ? { ...e, joined: [...e.joined, uId] } : e
        ),
        partStatus: {
          ...s.partStatus,
          [eventId]: { ...(s.partStatus[eventId] || {}), [uId]: "waiting" },
        },
      }));
    }
  );
  socket.on(
    "participant:left",
    ({ eventId, userId: uId, role }: { eventId: string; userId: string; role?: string }) => {
      if (role === "trainer") return;
      set((s) => {
        const forEvent = { ...(s.partStatus[eventId] || {}) };
        delete forEvent[uId];
        return {
          events: s.events.map((e) =>
            e.id === eventId ? { ...e, joined: e.joined.filter((u) => u !== uId) } : e
          ),
          partStatus: { ...s.partStatus, [eventId]: forEvent },
        };
      });
    }
  );
  socket.on(
    "participant:status",
    ({
      eventId,
      userId: uId,
      status,
    }: {
      eventId: string;
      userId: string;
      status: "waiting" | "exam" | "done";
    }) => {
      set((s) => ({
        partStatus: {
          ...s.partStatus,
          [eventId]: { ...(s.partStatus[eventId] || {}), [uId]: status },
        },
      }));
    }
  );
  // Snapshot handed back right after joining a room: lets a trainer who opens
  // (or reloads) the Live screen mid-exam see correct dot colours immediately,
  // instead of waiting for the next status change to arrive.
  socket.on(
    "event:roster",
    ({
      eventId,
      statuses,
    }: {
      eventId: string;
      statuses: Record<string, "waiting" | "exam" | "done">;
    }) => {
      if (!eventId || !statuses) return;
      set((s) => ({
        partStatus: {
          ...s.partStatus,
          [eventId]: { ...statuses, ...(s.partStatus[eventId] || {}) },
        },
      }));
    }
  );
  // Lets the trainer's own Live/Results screens reflect a participant's
  // score the instant they submit, without the trainer needing to reload —
  // see routes/events.js' complete-participant for the emit.
  socket.on(
    "participant:completed",
    ({
      eventId,
      userId: uId,
      pct,
      t,
    }: {
      eventId: string;
      userId: string;
      pct: number;
      t: string;
    }) => {
      set((s) => ({
        events: s.events.map((e) =>
          e.id === eventId
            ? {
                ...e,
                results: (e.results || [])
                  .filter((r) => r.u !== uId)
                  .concat([{ u: uId, s: pct, t }]),
              }
            : e
        ),
      }));
    }
  );
  // The server's own background sweep (routes/events.js' runAutoStatusSweep)
  // opened this Scheduled event's waiting room automatically, strictly on its
  // own date/time — nobody had to join it first to trigger the flip. Every
  // logged-in client gets this (it's a broadcast, not room-scoped), so a
  // participant's "Available" list updates the moment the room opens even if
  // they're just sitting on the page watching it.
  socket.on("event:opened", ({ eventId }: { eventId: string }) => {
    set((s) => ({
      events: s.events.map((e) =>
        e.id === eventId && e.status === "Scheduled" ? { ...e, status: "Waiting" } : e
      ),
    }));
  });
  socket.on("event:started", ({ eventId }: { eventId: string }) => {
    set((s) => ({
      events: s.events.map((e) => (e.id === eventId ? { ...e, status: "Live" } : e)),
    }));
  });
  socket.on("event:ended", ({ eventId }: { eventId: string }) => {
    set((s) => ({
      events: s.events.map((e) => (e.id === eventId ? { ...e, status: "Completed" } : e)),
    }));
  });
  void get;
}

export const useStore = create<StoreState>((set, get) => ({
  ready: false,
  users: [],
  categories: [],
  products: [],
  topics: [],
  slides: {},
  questions: [],
  attempts: [],
  events: [],
  certs: [],
  expertQs: [],
  audit: [],
  notifs: [],
  progress: {},

  currentUser: null,
  loginEmp: "",
  otpTries: 0,
  ai: { open: false, topic: null, msgs: [] },
  exam: null,
  sidebarCollapsed: (() => {
    try {
      return localStorage.getItem("sidebarCollapsed") === "1";
    } catch {
      return false;
    }
  })(),
  toasts: [],
  modal: null,

  builderTopic: "",
  builderSlideIndex: 0,
  bankTopic: "",
  bankFilters: { q: "", type: "", mand: "", diff: "" },
  bankPage: 0,
  analyticsTab: "training",
  partStatus: {},
  userFilters: { q: "", role: "", status: "" },
  auditFilter: "",

  init: async () => {
    // const boot = await api.bootstrap();
    // console.log("bootstrap", boot);
    await get().refreshStore();
    set({
      builderTopic: get().topics[0]?.id || "",
      bankTopic: get().topics[0]?.id || "",
      ready: true,
    });
  },

  refreshStore: async () => {
    const boot = await api.bootstrap();
    // console.log("rbootstrap", boot);
    set({
      users: boot.users,
      categories: boot.categories,
      products: boot.products,
      topics: boot.topics,
      events: boot.events,
      certs: boot.certs,
      expertQs: boot.expertQs,
      audit: boot.audit,
      slides: boot.slides,
      questions: boot.questions,
    });
  },

  topic: (id) => topicById(get().topics, id),
  productOf: (topicId) => productOfTopic(get().products, get().topics, topicId),
  categoryOf: (topicId) => categoryOfTopic(get().categories, get().products, get().topics, topicId),
  path: (topicId) => pathOf(get().categories, get().products, get().topics, topicId),
  qOf: (topicId) => activeQuestionsOf(get().questions, topicId),
  userById: (id) =>
    get().users.find((u) => u.id === id) || {
      id,
      emp: "—",
      name: "Unknown",
      role: "participant",
      dept: "—",
      plant: "—",
      location: "—",
      desig: "—",
      mobile: "—",
      status: "Active",
      created: "",
    },
  progOf: (userId, topicId) =>
    progressOf(get().progress, userId, topicId, (get().slides[topicId] || []).length),

  setLoginEmp: (v) => set({ loginEmp: v }),
  setOtpTries: (n) => set({ otpTries: n }),
  requestOtp: async (emp) => {
    try {
      const res = await api.auth.sendOtp(emp);
      return { ok: true, mobile: res.mobile };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Could not send OTP." };
    }
  },
  verifyOtp: async (emp, otp) => {
    try {
      const res = await api.auth.verifyOtp(emp, otp);
      get().loginAs(res.user.id, res.user);
      return { ok: true };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Invalid OTP." };
    }
  },
  loginAs: (id, userOverride) => {
    const u = userOverride || get().users.find((x) => x.id === id) || null;
    set({ currentUser: u, ai: { open: false, topic: null, msgs: [] } });
    if (u) {
      get().auditLog("Login", "Session");
      wireSocket(get, set, u.id);
      api
        .me(u.id)
        .then((data) =>
          set({ notifs: data.notifs, progress: data.progress, attempts: data.attempts })
        )
        .catch((err) => console.warn("Failed to load user data:", err));
    }
  },
  logout: () => {
    get().auditLog("Logout", "Session");
    disconnectSocket();
    set({
      currentUser: null,
      ai: { open: false, topic: null, msgs: [] },
      notifs: [],
      progress: {},
      attempts: [],
    });
  },
  toast: (text, kind) => {
    const id = uid("TO");
    set((s) => ({ toasts: [...s.toasts, { id, text, kind }] }));
    setTimeout(() => get().dismissToast(id), 3200);
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  openModal: (node) => set({ modal: node }),
  closeModal: () => set({ modal: null }),
  markNotifsRead: () => {
    set((s) => ({ notifs: s.notifs.map((n) => ({ ...n, read: true })) }));
    const cu = get().currentUser;
    if (cu) mirror(api.notifications.markRead(cu.id));
  },
  setSidebarCollapsed: (v) => {
    try {
      localStorage.setItem("sidebarCollapsed", v ? "1" : "0");
    } catch {
      /* private mode — fine, just won't persist */
    }
    set({ sidebarCollapsed: v });
  },
  auditLog: (action, entity) => {
    const user = get().currentUser;
    set((s) => ({
      audit: [
        { id: uid("L"), action, entity, user: user ? user.id : "—", time: nowStr(), ip: "" },
        ...s.audit,
      ],
    }));
    mirror(api.audit.log(action, entity, user?.id));
  },

  viewSlide: (userId, topicId, slideId) => {
    let viewedCount = 0;
    set((s) => {
      const key = progressKey(userId, topicId);
      const existing = s.progress[key] || { viewed: [], done: false };
      if (existing.viewed.includes(slideId)) {
        viewedCount = existing.viewed.length;
        return {};
      }
      const viewed = [...existing.viewed, slideId];
      viewedCount = viewed.length;
      const total = (s.slides[topicId] || []).length;
      return { progress: { ...s.progress, [key]: { viewed, done: viewed.length >= total } } };
    });
    mirror(api.progress.viewSlide(userId, topicId, viewedCount));
  },
  completeLearning: (userId, topicId) => {
    set((s) => {
      const key = progressKey(userId, topicId);
      const allIds = (s.slides[topicId] || []).map((sl) => sl.id);
      return { progress: { ...s.progress, [key]: { viewed: allIds, done: true } } };
    });
    get().auditLog("Learning completed", "Topic " + topicId);
    mirror(api.progress.complete(userId, topicId));
  },

  openAI: (topicId) =>
    set((s) => {
      const t = topicId || s.ai.topic || s.topics[0]?.id || "";
      const msgs = s.ai.msgs.length
        ? s.ai.msgs
        : [
            {
              r: "ai" as const,
              t:
                "Hello " +
                (s.currentUser ? s.currentUser.name.split(" ")[0] : "") +
                ". I am your learning assistant for this topic. I answer using the approved learning content only — ask me anything about " +
                get().topic(t).name +
                ".",
            },
          ];
      return { ai: { open: true, topic: t, msgs } };
    }),
  closeAI: () => set((s) => ({ ai: { ...s.ai, open: false } })),
  aiPushMessage: (msg) => set((s) => ({ ai: { ...s.ai, msgs: [...s.ai.msgs, msg] } })),
  aiSend: (topicId, text) => {
    const v = text.trim();
    if (!v) return;
    get().aiPushMessage({ r: "me", t: v });
    const userId = get().currentUser?.id;
    const isContextual = AI_CONTEXTUAL_PROMPTS.includes(v.toLowerCase());
    let retrievalText: string | undefined;
    if (isContextual) {
      const msgs = get().ai.msgs;
      // Re-search with the last real question the learner asked, not the AI's
      // (paraphrased) answer to it — the answer's wording doesn't reliably
      // embed close enough to the source chunks to clear the similarity gate,
      // while the original question already proved it does. Skip over any
      // earlier contextual chip clicks to find that real question.
      for (let i = msgs.length - 2; i >= 0; i--) {
        const m = msgs[i];
        if (m.r === "me" && !AI_CONTEXTUAL_PROMPTS.includes(m.t.trim().toLowerCase())) {
          retrievalText = m.t;
          break;
        }
      }
      if (!retrievalText) {
        // Nothing asked yet for this chip to refer back to — asking the
        // knowledge base with the bare phrase would just read as out-of-scope.
        // Ask the learner what they mean instead of guessing.
        get().aiPushMessage({
          r: "ai",
          t: "Sure — what would you like me to explain? Ask me a question about this topic first, and I can break the answer down further.",
        });
        get().auditLog("AI question asked", "Topic " + topicId);
        return;
      }
    }
    api.ai
      .ask(topicId, v, userId, retrievalText)
      .then((a) => get().aiPushMessage({ r: "ai", t: a.text }))
      .catch(() =>
        get().aiPushMessage({
          r: "ai",
          t: "I could not reach the knowledge base just now. Please try again.",
        })
      );
    get().auditLog("AI question asked", "Topic " + topicId);
  },
  submitExpertQuestion: (userId, topicId, question, aiResp, note) => {
    const tempId = uid("X");
    set((s) => ({
      expertQs: [
        {
          id: tempId,
          user: userId,
          topic: topicId,
          q: question || "(question from AI conversation)",
          ai: aiResp,
          note,
          date: nowStr(),
          status: "Raised",
          resp: "",
          expert: "",
        },
        ...s.expertQs,
      ],
    }));
    get().auditLog("Expert question raised", "Topic " + topicId);
    get().aiPushMessage({
      r: "sys",
      t: "Your question has been escalated to a trainer. You will be notified when it is answered.",
    });
    api.expert
      .submit(userId, topicId, question, aiResp, note)
      .then(({ id }) =>
        set((s) => ({ expertQs: s.expertQs.map((x) => (x.id === tempId ? { ...x, id } : x)) }))
      )
      .catch((err) => console.warn("Backend sync failed:", err));
  },

  launchExam: (topicId, mode, eventId, userId) => {
    const s = get();
    const ev = eventId ? s.events.find((e) => e.id === eventId) || null : null;
    const tp = s.topic(topicId);
    const count = ev ? ev.count : tp.examCount;
    const bank = s.qOf(topicId);
    const built = buildPaper(bank, count);
    if ("error" in built) return built.error;
    const exam: ExamState = {
      mode,
      topicId,
      eventId,
      paper: built.paper,
      idx: 0,
      answers: built.paper.map(() => ({ a: null, t: 0 })),
      pass: ev ? ev.pass : tp.pass,
      defTime: ev ? ev.defTime : tp.defTime,
      total: built.paper.reduce((sum, q) => sum + q.marks, 0),
      started: Date.now(),
      elapsed: 0,
      name: ev ? ev.name : tp.name + " — Self Assessment",
    };
    set({ exam });
    get().auditLog(
      mode === "live" ? "Examination started" : "Self assessment started",
      "Topic " + topicId
    );
    // Exam state is handed to Redis immediately: every answer below is saved
    // there as it happens, and MSSQL is only written once, on final submit.
    api.exam.session
      .create(userId, mode, topicId, eventId, exam)
      .then(({ key }) => set((st) => (st.exam ? { exam: { ...st.exam, examKey: key } } : {})))
      .catch((err) => console.warn("Could not create exam session:", err));
    if (mode === "live" && eventId)
      getSocket()?.emit("event:status", { eventId, userId, status: "exam" });
    return null;
  },
  setAnswer: (idx, a) => {
    set((s) => {
      if (!s.exam) return {};
      const answers = s.exam.answers.slice();
      answers[idx] = { ...answers[idx], a };
      return { exam: { ...s.exam, answers } };
    });
    const ex = get().exam;
    if (ex?.examKey) mirror(api.exam.session.save(ex.examKey, ex));
  },
  setAnswerTime: (idx, t) => {
    set((s) => {
      if (!s.exam) return {};
      const answers = s.exam.answers.slice();
      answers[idx] = { ...answers[idx], t };
      return { exam: { ...s.exam, answers } };
    });
    const ex = get().exam;
    if (ex?.examKey) mirror(api.exam.session.save(ex.examKey, ex));
  },
  setExamIndex: (idx) => {
    set((s) => (s.exam ? { exam: { ...s.exam, idx } } : {}));
    const ex = get().exam;
    if (ex?.examKey) mirror(api.exam.session.save(ex.examKey, ex));
  },
  endExamEarly: () => set((s) => (s.exam ? { exam: { ...s.exam, endedEarly: true } } : {})),
  finishExam: (userId) => {
    const s = get();
    const E = s.exam;
    if (!E) return;
    const { rows, earned } = gradePaper(E.paper, E.answers);
    const pct = Math.round((earned / E.total) * 100);
    const secs = Math.round((Date.now() - E.started) / 1000);
    // The trainer ending a live examination early is not the same thing as a
    // participant failing it: if the participant themselves never clicked
    // Submit — this attempt only exists because the trainer's "End
    // examination" forced it — there's no genuine pass/fail verdict to give,
    // regardless of how many questions they'd already answered, so it's
    // recorded as Incomplete rather than scored.
    const result: "Pass" | "Fail" | "Incomplete" = E.endedEarly
      ? "Incomplete"
      : pct >= E.pass
        ? "Pass"
        : "Fail";
    const timeTaken = mmss(secs);
    const updated: ExamState = { ...E, rows, earned, pct, timeTaken, result };

    const localAttempt: Attempt = {
      id: uid("A"),
      user: userId,
      topic: E.topicId,
      mode: E.mode,
      date: nowStr(),
      score: earned,
      total: E.total,
      pct,
      result,
      time: timeTaken,
      qcount: E.paper.length,
      detail: updated,
    };
    set((st) => ({ attempts: [...st.attempts, localAttempt] }));
    get().auditLog(
      E.mode === "live" ? "Examination completed" : "Self assessment completed",
      "Topic " + E.topicId + " — " + pct + "%"
    );
    set({ exam: updated });
    // The paper is now graded and persisted below — the Redis-held in-progress
    // copy is no longer needed, so there's nothing left to resume.
    if (E.examKey) mirror(api.exam.session.clear(E.examKey));

    if (E.mode === "self") {
      mirror(
        api.exam.createAttempt({
          userId,
          topicId: E.topicId,
          total: E.total,
          earned,
          pct,
          result,
          startedAt: E.started,
          rows,
        })
      );

      const tp = get().topics.find((t) => t.id === E.topicId);
      if (
        result === "Pass" &&
        tp?.cert &&
        !get().certs.some((c) => c.user === userId && c.topic === E.topicId && c.event === null)
      ) {
        api.certs
          .create({ user: userId, topic: E.topicId, event: null, score: pct })
          .then(({ id: certId }) => {
            const cert: Certificate = {
              id: certId,
              user: userId,
              topic: E.topicId,
              event: null,
              score: pct,
              date: new Date().toISOString().slice(0, 10),
              status: "Valid",
            };
            set((st2) => ({
              certs: [...st2.certs, cert],
              exam: st2.exam ? { ...st2.exam, cert: certId } : st2.exam,
            }));
            get().auditLog("Certificate generated", "Certificate " + certId);
            notifyTargets(
              get,
              set,
              "Certificate " + certId + " issued for " + get().topic(E.topicId).name,
              [userId]
            );
          })
          .catch((err) => console.warn("Certificate creation failed:", err));
      }
    }

    if (E.mode === "live" && E.eventId) {
      const eventId = E.eventId;
      mirror(
        api.events.completeParticipant(eventId, {
          userId,
          total: E.total,
          earned,
          pct,
          result,
          rows,
        })
      );
      getSocket()?.emit("event:status", { eventId, userId, status: "done" });

      // Every completion — pass or fail — goes into the leaderboard/
      // participation data the trainer's Results screen reads; only a pass
      // additionally issues a certificate. The event's own Live/Completed
      // status is never touched here — only the trainer's "End examination"
      // changes that, broadcast to everyone over the socket (see endExam).
      const ev = get().events.find((e) => e.id === eventId);
      if (ev) {
        const updatedEvent = {
          ...ev,
          results: (ev.results || [])
            .filter((r) => r.u !== userId)
            .concat([{ u: userId, s: pct, t: timeTaken, result }]),
        };
        set((st) => ({ events: st.events.map((e) => (e.id === ev.id ? updatedEvent : e)) }));
        if (
          result === "Pass" &&
          ev.cert &&
          !get().certs.some((c) => c.user === userId && c.topic === E.topicId && c.event === ev.id)
        ) {
          api.certs
            .create({ user: userId, topic: E.topicId, event: ev.id, score: pct })
            .then(({ id: certId }) => {
              const cert: Certificate = {
                id: certId,
                user: userId,
                topic: E.topicId,
                event: ev.id,
                score: pct,
                date: new Date().toISOString().slice(0, 10),
                status: "Valid",
              };
              set((st2) => ({
                certs: [...st2.certs, cert],
                exam: st2.exam ? { ...st2.exam, cert: certId } : st2.exam,
              }));
              get().auditLog("Certificate generated", "Certificate " + certId);
              notifyTargets(
                get,
                set,
                "Certificate " + certId + " issued for " + get().topic(E.topicId).name,
                [userId]
              );
            })
            .catch((err) => console.warn("Certificate creation failed:", err));
        }
      }
      notifyTargets(
        get,
        set,
        'Your result for "' + E.name + '" is available: ' + pct + "% — " + result,
        [userId]
      );
    }
  },
  clearExam: () => set({ exam: null }),
  loadPastResult: (attemptId) => {
    const a = get().attempts.find((x) => x.id === attemptId);
    if (a && a.detail) set({ exam: a.detail });
  },

  joinEvent: (eventId, userId) => {
    set((s) => ({
      events: s.events.map((e) => {
        if (e.id !== eventId) return e;
        const joined = e.joined.includes(userId) ? e.joined : [...e.joined, userId];
        return { ...e, joined, status: e.status === "Scheduled" ? "Waiting" : e.status };
      }),
    }));
    get().auditLog("Joined waiting room", "Examination " + eventId);
    const name = get().currentUser?.name;
    getSocket()?.emit("event:join-room", { eventId, userId, name });
    mirror(api.events.join(eventId, userId));
  },
  leaveWait: (eventId, userId) => {
    set((s) => ({
      events: s.events.map((e) =>
        e.id === eventId ? { ...e, joined: e.joined.filter((u) => u !== userId) } : e
      ),
    }));
    getSocket()?.emit("event:leave-room", { eventId, userId });
    mirror(api.events.leave(eventId, userId));
  },
  startLive: (eventId) => {
    set((s) => ({
      events: s.events.map((e) => (e.id === eventId ? { ...e, status: "Live" } : e)),
    }));
    get().auditLog("Examination start", "Examination " + eventId);
    // Notification to participants, and the waiting-room → live flip for
    // everyone's screen, both come from the server broadcast (see socket.js).
    mirror(api.events.start(eventId, get().currentUser?.id));
  },
  endExam: (eventId) => {
    set((s) => ({
      events: s.events.map((e) => (e.id === eventId ? { ...e, status: "Completed" } : e)),
    }));
    get().auditLog("Examination completion", "Examination " + eventId);
    mirror(api.events.end(eventId, get().currentUser?.id));
  },
  tryResumeExam: async (topicId, mode, eventId, userId) => {
    const key = `exam:session:${mode}:${eventId || topicId}:${userId}`;
    try {
      const { state } = await api.exam.session.load(key);
      set({ exam: { ...(state as ExamState), examKey: key } });
      if (mode === "live" && eventId)
        getSocket()?.emit("event:status", { eventId, userId, status: "exam" });
      return true;
    } catch {
      return false;
    }
  },
  requestRetakeNotify: (topicId) => {
    const userId = get().currentUser?.id;
    if (!userId) return;
    api.events
      .requestRetakeNotify(userId, topicId)
      .then(() =>
        get().toast(
          "You’ll be notified when a new live examination for this topic is scheduled",
          "ok"
        )
      )
      .catch(() => get().toast("Could not set up the notification — please try again", "bad"));
  },
  // The waiting room is normally kept live by socket events alone
  // (participant:joined/left/status, event:roster) — this is a manual
  // fallback for when a join happened while the socket briefly dropped/
  // reconnected, or the trainer just wants to be sure they're seeing the
  // current list before starting.
  refreshEvents: async () => {
    try {
      const events = await api.events.list();
      set({ events });
    } catch (err) {
      console.warn("Could not refresh events:", err);
      get().toast("Could not refresh — please try again", "bad");
    }
  },

  setBuilderTopic: (t) => set({ builderTopic: t, builderSlideIndex: 0 }),
  setBuilderSlideIndex: (i) => set({ builderSlideIndex: i }),
  saveTopic: async (id, o) => {
    const actorId = get().currentUser?.id;
    if (id) {
      set((s) => ({ topics: s.topics.map((t) => (t.id === id ? { ...t, ...o } : t)) }));
      get().auditLog("Content modified", "Topic " + id);
      await get().refreshStore(); // to get any new slides added by other trainers
      try {
        const { cancelledEvents } = await api.catalog.saveTopic({ id, ...o, actorId });
        // Taking the topic off Published can cascade into cancelling/ending
        // examinations server-side (see topicEditor.tsx's confirm step) —
        // without this, this screen would keep showing them as Scheduled/Live
        // until the trainer happened to refresh.
        if (cancelledEvents?.length) {
          set((s) => ({
            events: s.events.map((e) => cancelledEvents.find((c) => c.id === e.id) || e),
          }));
          await get().refreshStore();
        }
      } catch (err) {
        console.warn("Backend sync failed:", err);
      }
      return;
    }
    try {
      const { id: nid } = await api.catalog.saveTopic({ ...o, actorId });
      set((s) => ({
        topics: [...s.topics, { id: nid, ...o }],
        slides: {
          ...s.slides,
          [nid]: [
            {
              id: nid + "-s1",
              title: "New slide",
              type: "text",
              body: "Start writing your content here.",
            },
          ],
        },
      }));
      get().auditLog("Content creation", "Topic " + nid);
      await get().refreshStore(); // to get any new slides added by other trainers
      api.slides
        .list(nid)
        .then((slides) => set((s) => ({ slides: { ...s.slides, [nid]: slides } })))
        .catch(() => {});
    } catch (err) {
      console.warn("Backend sync failed:", err);
      get().toast("Could not save the topic", "bad");
      throw err;
    }
  },
  saveProduct: async (id, o) => {
    const actorId = get().currentUser?.id;
    try {
      await api.catalog.saveProduct({ ...(id ? { id } : {}), ...o, actorId });
      await get().refreshStore();
      get().auditLog(id ? "Content modified" : "Content creation", "Product");
    } catch (err) {
      console.warn("Backend sync failed:", err);
      get().toast("Could not save the product", "bad");
    }
  },
  deleteTopic: async (id) => {
    const actorId = get().currentUser?.id;
    try {
      await api.catalog.deleteTopic(id, actorId);
      set((s) => {
        const slides = { ...s.slides };
        delete slides[id];
        return { topics: s.topics.filter((t) => t.id !== id), slides };
      });
      get().auditLog("Content deleted", "Topic " + id);
      await get().refreshStore(); // to get any new slides added by other trainers
      get().toast("Topic deleted", "ok");
    } catch (err) {
      get().toast(err instanceof Error ? err.message : "Could not delete the topic", "bad");
    }
  },
  deleteProduct: async (id) => {
    const actorId = get().currentUser?.id;
    try {
      await api.catalog.deleteProduct(id, actorId);
      set((s) => {
        const deletedTopicIds = s.topics.filter((t) => t.prod === id).map((t) => t.id);
        const slides = { ...s.slides };
        deletedTopicIds.forEach((tid) => delete slides[tid]);
        return {
          products: s.products.filter((p) => p.id !== id),
          topics: s.topics.filter((t) => t.prod !== id),
          slides,
        };
      });
      get().auditLog("Content deleted", "Product " + id);
      await get().refreshStore(); // to get any new slides added by other trainers
      get().toast("Product deleted", "ok");
    } catch (err) {
      get().toast(err instanceof Error ? err.message : "Could not delete the product", "bad");
    }
  },
  addSlide: (topicId, atIndex) => {
    const actorId = get().currentUser?.id;
    api.slides
      .add(topicId, atIndex, actorId)
      .then(({ id }) => {
        set((s) => {
          const arr = (s.slides[topicId] || []).slice();
          arr.splice(atIndex + 1, 0, { id, title: "New slide", type: "text", body: "" });
          return { slides: { ...s.slides, [topicId]: arr }, builderSlideIndex: atIndex + 1 };
        });
        get().auditLog("Content creation", "Slide");
        get().refreshStore();
      })
      .catch((err) => {
        console.warn("Backend sync failed:", err);
        get().toast("Could not add the slide", "bad");
      });
  },
  updateSlide: (topicId, index, patch) => {
    set((s) => {
      const arr = (s.slides[topicId] || []).slice();
      if (!arr[index]) return {};
      arr[index] = { ...arr[index], ...patch };
      return { slides: { ...s.slides, [topicId]: arr } };
    });
    get().refreshStore(); // to get any new slides added by other trainers
    const slideId = get().slides[topicId]?.[index]?.id;
    if (slideId) mirror(api.slides.update(topicId, slideId, patch));
  },
  duplicateSlide: (topicId, index) => {
    const src = get().slides[topicId]?.[index];
    if (!src) return;
    api.slides
      .duplicate(topicId, src.id)
      .then(({ id }) => {
        set((s) => {
          const arr = (s.slides[topicId] || []).slice();
          const copy = { ...src, id, title: src.title + " (copy)" };
          arr.splice(index + 1, 0, copy);
          return { slides: { ...s.slides, [topicId]: arr }, builderSlideIndex: index + 1 };
        });
        get().refreshStore();
      })
      .catch((err) => {
        console.warn("Backend sync failed:", err);
        get().toast("Could not duplicate the slide", "bad");
      });
  },
  deleteSlide: (topicId, index) => {
    const arr = get().slides[topicId] || [];
    if (arr.length <= 1) return false;
    const slideId = arr[index]?.id;
    set((s) => {
      const a = (s.slides[topicId] || []).slice();
      a.splice(index, 1);
      return { slides: { ...s.slides, [topicId]: a }, builderSlideIndex: Math.max(0, index - 1) };
    });
    get().auditLog("Content modified", "Slide deleted");
    get().refreshStore();

    if (slideId) mirror(api.slides.remove(topicId, slideId, get().currentUser?.id));
    return true;
  },
  moveSlide: (topicId, index, dir) => {
    set((s) => {
      const arr = (s.slides[topicId] || []).slice();
      const n = index + dir;
      if (n < 0 || n >= arr.length) return {};
      [arr[index], arr[n]] = [arr[n], arr[index]];
      return { slides: { ...s.slides, [topicId]: arr }, builderSlideIndex: n };
    });
    get().refreshStore();

    mirror(api.slides.move(topicId, index, dir));
  },
  reorderSlides: (topicId, from, to) => {
    set((s) => {
      const arr = (s.slides[topicId] || []).slice();
      const [m] = arr.splice(from, 1);
      arr.splice(to, 0, m);
      return { slides: { ...s.slides, [topicId]: arr }, builderSlideIndex: to };
    });
    get().auditLog("Content modified", "Slide order");
    get().refreshStore();

    mirror(api.slides.reorder(topicId, from, to, get().currentUser?.id));
  },
  publishContent: (topicId) => {
    set((s) => ({
      topics: s.topics.map((t) => (t.id === topicId ? { ...t, status: "Published" } : t)),
    }));
    get().auditLog("Content publication", "Topic " + topicId);
    get().refreshStore();

    // Notification to participants is sent server-side.
    mirror(api.catalog.publishTopic(topicId, get().currentUser?.id));
  },

  setBankTopic: (t) => set({ bankTopic: t, bankPage: 0 }),
  setBankFilters: (f) => set((s) => ({ bankFilters: { ...s.bankFilters, ...f }, bankPage: 0 })),
  setBankPage: (p) => set({ bankPage: p }),
  saveQuestion: (id, o) => {
    const user = get().currentUser;
    if (id) {
      set((s) => ({ questions: s.questions.map((q) => (q.id === id ? { ...q, ...o } : q)) }));
      get().auditLog("Question modified", "Question " + id);
      get().refreshStore();

      mirror(api.questions.update(id, { ...o, actorId: user?.id }));
      return;
    }
    api.questions
      .create({ ...o, actorId: user?.id })
      .then(({ id: nid }) => {
        set((s) => ({
          questions: [
            ...s.questions,
            {
              id: nid,
              by: user ? user.name : "—",
              created: new Date().toISOString().slice(0, 10),
              ...o,
            },
          ],
        }));
        get().auditLog("Question creation", "Question");
        get().refreshStore();
      })
      .catch((err) => {
        console.warn("Backend sync failed:", err);
        get().toast("Could not save the question", "bad");
      });
  },
  duplicateQuestion: (id) => {
    const q = get().questions.find((x) => x.id === id);
    if (!q) return;
    api.questions
      .duplicate(id)
      .then(({ id: nid }) => {
        const copy = { ...q, id: nid, text: q.text + " (copy)", mandatory: false };
        set((s) => ({ questions: [...s.questions, copy] }));
        get().refreshStore();
      })
      .catch((err) => console.warn("Backend sync failed:", err));
  },
  toggleArchiveQuestion: (id) => {
    set((s) => ({
      questions: s.questions.map((q) =>
        q.id === id ? { ...q, status: q.status === "Active" ? "Archived" : "Active" } : q
      ),
    }));
    get().auditLog("Question modified", "Question " + id);
    get().refreshStore();
    mirror(api.questions.toggleArchive(id, get().currentUser?.id));
  },

  saveExam: async (id, o) => {
    const actorId = get().currentUser?.id;
    if (id) {
      set((s) => ({ events: s.events.map((e) => (e.id === id ? { ...e, ...o } : e)) }));
      get().auditLog("Examination modified", "Examination " + id);
      mirror(api.events.save({ id, ...o, actorId }));
      return get().events.find((e) => e.id === id)!;
    }
    const { event: ev } = await api.events.save({ ...o, actorId });
    set((s) => ({ events: [...s.events, ev] }));
    get().auditLog("Examination creation", "Examination " + ev.id);
    get().refreshStore();

    // Notification (if not Draft) is sent server-side.
    return ev;
  },
  publishExam: async (id) => {
    const e = get().events.find((x) => x.id === id);
    if (!e) return false;
    const bank = get().qOf(e.topic);
    const mand = bank.filter((q) => q.mandatory).length;
    if (mand > e.count || bank.length < e.count) return false;
    set((s) => ({
      events: s.events.map((x) => (x.id === id ? { ...x, status: "Scheduled" } : x)),
    }));
    get().auditLog("Examination modified", "Examination " + id);
    get().refreshStore();

    // Notification is sent server-side.
    try {
      await api.events.publish(id, get().currentUser?.id);
      await get().refreshStore();
      return true;
    } catch {
      get().toast("Could not publish the examination", "bad");
      return false;
    }
  },

  answerExpert: async (id, resp, expertName) => {
    try {
      await api.expert.answer(id, resp, expertName, get().currentUser?.id, get().currentUser?.id);
      await get().refreshStore();
      get().auditLog("Expert response", "Expert question " + id);
    } catch {
      get().toast("Could not answer the expert question", "bad");
    }
  },
  assignExpert: async (id, expertName) => {
    try {
      await api.expert.assign(id, expertName, get().currentUser?.id);
      await get().refreshStore();
    } catch {
      get().toast("Could not assign the expert question", "bad");
    }
  },
  closeExpert: async (id) => {
    try {
      await api.expert.close(id);
      await get().refreshStore();
    } catch {
      get().toast("Could not close the expert question", "bad");
    }
  },
  publishToKB: async (id) => {
    try {
      await api.expert.publishToKb(id);
      await get().refreshStore();
    } catch {
      get().toast("Could not publish to the knowledge base", "bad");
    }
  },

  revokeCert: async (id) => {
    try {
      await api.certs.toggleRevoke(id, get().currentUser?.id);
      await get().refreshStore();
      get().auditLog("Certificate status changed", "Certificate " + id);
    } catch {
      get().toast("Could not change certificate status", "bad");
    }
  },

  setUserFilters: (f) => set((s) => ({ userFilters: { ...s.userFilters, ...f } })),
  saveUser: (id, o) => {
    const actorId = get().currentUser?.id;
    if (id) {
      set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, ...o } : u)) }));
      get().auditLog("User modified", "User " + id);
      get().refreshStore();

      mirror(api.users.update(id, o, actorId));
      return null;
    }
    if (get().users.some((u) => u.emp === o.emp)) return "dup";
    api.users
      .create(o, actorId)
      .then((res) => {
        if ("error" in res) return;
        const nid = res.id;
        set((s) => ({
          users: [...s.users, { id: nid, created: new Date().toISOString().slice(0, 10), ...o }],
        }));
        get().auditLog("User creation", "User " + nid);
        get().refreshStore();
      })
      .catch((err) => {
        console.warn("Backend sync failed:", err);
        get().toast("Could not create the user", "bad");
      });
    return null;
  },
  toggleUserStatus: async (id) => {
    try {
      await api.users.toggleStatus(id, get().currentUser?.id);
      await get().refreshStore();
      get().auditLog("Role/access change", "User " + id);
    } catch {
      get().toast("Could not update user status", "bad");
    }
  },
  setAuditFilter: (v) => set({ auditFilter: v }),
  setAnalyticsTab: (t) => set({ analyticsTab: t }),
}));

export function shuffleArr<T>(a: T[]) {
  return shuffle(a);
}
export type { PreparedQuestion };
