// Thin fetch wrapper around the Node/Express backend (see /server), which talks
// to the real "idblms" MSSQL database (Lms_* tables).
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
  AttemptRow,
} from "../types";

// Relative by default: in production this app is hosted as a single IIS
// site (Node + the React build together), so the frontend, the API and
// /uploads are always the same origin — a relative "/api" is correct there
// and avoids ever baking a specific host/IP into anything. Dev points Vite's
// own dev-server proxy (see vite.config.ts) at the real backend port instead
// of overriding this to an absolute URL, so the two environments behave the
// same way.
const BASE = (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL || "/api";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(BASE + path, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json().catch(() => undefined) : undefined;
  if (!res.ok) {
    throw new ApiError(res.status, (body && (body as { error?: string }).error) || res.statusText);
  }
  return body as T;
}

const get = <T>(path: string) => request<T>(path);
const post = <T>(path: string, data?: unknown) =>
  request<T>(path, { method: "POST", body: data !== undefined ? JSON.stringify(data) : undefined });
const put = <T>(path: string, data?: unknown) =>
  request<T>(path, { method: "PUT", body: data !== undefined ? JSON.stringify(data) : undefined });
const patch = <T>(path: string, data?: unknown) =>
  request<T>(path, {
    method: "PATCH",
    body: data !== undefined ? JSON.stringify(data) : undefined,
  });
const del = <T>(path: string) => request<T>(path, { method: "DELETE" });

export interface Bootstrap {
  users: AppUser[];
  categories: Category[];
  products: Product[];
  topics: Topic[];
  events: ExamEvent[];
  certs: Certificate[];
  expertQs: ExpertQuestion[];
  audit: AuditEntry[];
  slides: Record<string, Slide[]>;
  questions: Question[];
}
export interface MeData {
  notifs: Notification[];
  progress: Record<string, ProgressEntry>;
  attempts: Attempt[];
}

export interface AdminOverview {
  generatedAt: string;
  users: { total: number; active: number; inactive: number; byRole: Record<string, number> };
  online: number;
  daily: { date: string; logins: number; users: number }[];
  today: {
    logins: number;
    activeUsers: number;
    loginsYesterday: number;
    avgSessionMin: number | null;
    peakConcurrent: number | null;
    peakAt: string | null;
  };
  byHour: { hour: number; count: number }[];
  usage: {
    learning: { total: number; month: number };
    attempts: { total: number; month: number };
    ai: { total: number; month: number };
    expert: { total: number; month: number };
    certificates: { total: number; month: number };
    exams: { participants: number; events: number; month: number };
  };
  moduleUsage: { topicId: string; learners: number }[];
  health: {
    dbMs: number;
    uptimeSec: number;
    liveConnections: number;
    kbChunks: number;
    kbLoaded: boolean;
    otpIssued24h: number;
    failedOtp24h: number;
  };
  recent: {
    id: string;
    action: string;
    entity: string;
    userId: string;
    userName: string;
    ts: string;
  }[];
}
export interface LiveSession {
  userId: string;
  name: string;
  emp: string;
  role: string;
  dept: string;
  since: string;
  ip: string;
  device: string;
}
export interface QuestionStat {
  questionId: string;
  correctPct: number;
  unansweredPct: number;
  avgTimeSec: number | null;
}
export interface AnalyticsOverview {
  attempts: Attempt[];
  progress: Record<string, ProgressEntry>;
  topicAccess: Record<string, number>;
  questionStats: QuestionStat[];
}

export const api = {
  bootstrap: () => get<Bootstrap>("/bootstrap"),
  me: (userId: string) => get<MeData>(`/me/${userId}`),

  auth: {
    sendOtp: (emp: string) => post<{ ok: true; mobile: string }>("/auth/send-otp", { emp }),
    verifyOtp: (emp: string, otp: string) =>
      post<{ user: AppUser }>("/auth/verify-otp", { emp, otp }),
    logout: (userId: string | null) => post<{ ok: true }>("/auth/logout", { userId }),
  },

  users: {
    list: () => get<AppUser[]>("/users"),
    refresh: () => request<AppUser[]>("/users/refresh"),

    create: (o: Partial<AppUser>, actorId?: string) =>
      post<{ id: string }>("/users", { ...o, actorId }),
    update: (id: string, o: Partial<AppUser>, actorId?: string) =>
      put<{ ok: true }>(`/users/${id}`, { ...o, actorId }),
    toggleStatus: (id: string, actorId?: string) =>
      patch<{ ok: true }>(`/users/${id}/toggle-status`, { actorId }),
  },

  catalog: {
    categories: () => get<Category[]>("/catalog/categories"),
    products: () => get<Product[]>("/catalog/products"),
    saveProduct: (o: Partial<Product> & { actorId?: string }) =>
      post<{ id: string }>("/catalog/products", o),
    topics: () => get<Topic[]>("/catalog/topics"),
    // cancelledEvents: any examinations the backend force-ended/cancelled as a
    // side effect of this save — see cascadeDisableTopicExams server-side.
    saveTopic: (o: Partial<Topic> & { actorId?: string }) =>
      post<{ id: string; cancelledEvents: ExamEvent[] }>("/catalog/topics", o),
    publishTopic: (id: string, actorId?: string) =>
      post<{ ok: true }>(`/catalog/topics/${id}/publish`, { actorId }),
    deleteTopic: (id: string, actorId?: string) =>
      del<{ ok: true }>(`/catalog/topics/${id}?actorId=${actorId || ""}`),
    deleteProduct: (id: string, actorId?: string) =>
      del<{ ok: true }>(`/catalog/products/${id}?actorId=${actorId || ""}`),
  },

  slides: {
    list: (topicId: string) => get<Slide[]>(`/slides/${topicId}`),
    add: (topicId: string, atIndex: number, actorId?: string) =>
      post<{ id: string }>(`/slides/${topicId}`, { atIndex, actorId }),
    update: (topicId: string, slideId: string, patchObj: Partial<Slide>) =>
      put<{ ok: true }>(`/slides/${topicId}/${slideId}`, patchObj),
    duplicate: (topicId: string, slideId: string) =>
      post<{ id: string }>(`/slides/${topicId}/${slideId}/duplicate`),
    remove: (topicId: string, slideId: string, actorId?: string) =>
      del<{ ok: true }>(`/slides/${topicId}/${slideId}?actorId=${actorId || ""}`),
    reorder: (topicId: string, from: number, to: number, actorId?: string) =>
      post<{ ok: true }>(`/slides/${topicId}/reorder`, { from, to, actorId }),
    move: (topicId: string, index: number, dir: 1 | -1) =>
      post<{ ok: true }>(`/slides/${topicId}/move`, { index, dir }),
  },

  questions: {
    list: (topic?: string) => get<Question[]>(`/questions${topic ? `?topic=${topic}` : ""}`),
    create: (o: Partial<Question> & { actorId?: string }) => post<{ id: string }>("/questions", o),
    update: (id: string, o: Partial<Question> & { actorId?: string }) =>
      put<{ ok: true }>(`/questions/${id}`, o),
    duplicate: (id: string) => post<{ id: string }>(`/questions/${id}/duplicate`),
    toggleArchive: (id: string, actorId?: string) =>
      patch<{ ok: true }>(`/questions/${id}/toggle-archive`, { actorId }),
  },

  exam: {
    createAttempt: (payload: {
      userId: string;
      topicId: string;
      total: number;
      earned: number;
      pct: number;
      result: string;
      startedAt: number;
      rows: AttemptRow[];
    }) => post<{ id: string }>("/exam/attempts", payload),
    session: {
      // Live/self exam progress is kept in Redis so a dropped connection can
      // resume mid-paper; MSSQL is only written once, on final submit.
      create: (
        userId: string,
        mode: string,
        topicId: string,
        eventId: string | null,
        state: unknown
      ) => post<{ key: string }>("/exam/session", { userId, mode, topicId, eventId, state }),
      save: (key: string, state: unknown) => put<{ ok: true }>(`/exam/session/${key}`, { state }),
      load: (key: string) => get<{ state: unknown }>(`/exam/session/${key}`),
      clear: (key: string) => del<{ ok: true }>(`/exam/session/${key}`),
    },
  },

  events: {
    list: () => get<ExamEvent[]>("/events"),
    save: (o: Partial<ExamEvent> & { actorId?: string }) =>
      post<{ event: ExamEvent }>("/events", o),
    publish: (id: string, actorId?: string) =>
      post<{ ok: true } | { error: string }>(`/events/${id}/publish`, { actorId }),
    join: (id: string, userId: string) => post<{ ok: true }>(`/events/${id}/join`, { userId }),
    leave: (id: string, userId: string) => post<{ ok: true }>(`/events/${id}/leave`, { userId }),
    start: (id: string, actorId?: string) => post<{ ok: true }>(`/events/${id}/start`, { actorId }),
    end: (id: string, actorId?: string) => post<{ ok: true }>(`/events/${id}/end`, { actorId }),
    completeParticipant: (
      id: string,
      payload: {
        userId: string;
        total: number;
        earned: number;
        pct: number;
        result: string;
        rows: AttemptRow[];
      }
    ) => post<{ ok: true }>(`/events/${id}/complete-participant`, payload),
    questionStats: (id: string) =>
      get<{ questionId: string; correctPct: number }[]>(`/events/${id}/question-stats`),
    requestRetakeNotify: (userId: string, topicId: string) =>
      post<{ ok: true }>("/events/retake-watch", { userId, topicId }),
  },

  certs: {
    list: () => get<Certificate[]>("/certs"),
    create: (c: { user: string; topic: string; event: string | null; score: number }) =>
      post<{ id: string }>("/certs", c),
    toggleRevoke: (id: string, actorId?: string) =>
      post<{ ok: true }>(`/certs/${id}/toggle-revoke`, { actorId }),
  },

  expert: {
    list: () => get<ExpertQuestion[]>("/expert-questions"),
    submit: (userId: string, topicId: string, question: string, aiResp: string, note: string) =>
      post<{ id: string }>("/expert-questions", { userId, topicId, question, aiResp, note }),
    assign: (id: string, expertName: string, expertId?: string) =>
      post<{ ok: true }>(`/expert-questions/${id}/assign`, { expertName, expertId }),
    answer: (id: string, resp: string, expertName: string, expertId?: string, actorId?: string) =>
      post<{ ok: true }>(`/expert-questions/${id}/answer`, { resp, expertName, expertId, actorId }),
    close: (id: string) => post<{ ok: true }>(`/expert-questions/${id}/close`),
    publishToKb: (id: string) => post<{ ok: true }>(`/expert-questions/${id}/publish-to-kb`),
  },

  analytics: {
    overview: () => get<AnalyticsOverview>("/analytics/overview"),
  },

  admin: {
    overview: () =>
      get<AdminOverview>("/admin/overview?tzOffset=" + new Date().getTimezoneOffset()),
    sessions: () => get<LiveSession[]>("/admin/sessions"),
    terminateSession: (userId: string, actorId?: string) =>
      post<{ ok: true }>(`/admin/sessions/${userId}/terminate`, { actorId }),
  },

  audit: {
    list: (q = "", limit = 200) =>
      get<AuditEntry[]>(`/audit?limit=${limit}${q ? "&q=" + encodeURIComponent(q) : ""}`),
    log: (action: string, entity: string, userId?: string) =>
      post<{ ok: true }>("/audit", { action, entity, userId }),
  },

  notifications: {
    list: (userId?: string) =>
      get<Notification[]>(`/notifications${userId ? `?user=${userId}` : ""}`),
    create: (userId: string, txt: string) =>
      post<{ id: string }>("/notifications", { userId, txt }),
    markRead: (userId: string) => post<{ ok: true }>("/notifications/mark-read", { userId }),
  },

  progress: {
    viewSlide: (userId: string, topicId: string, viewedCount: number) =>
      post<{ ok: true }>("/progress/view-slide", { userId, topicId, viewedCount }),
    complete: (userId: string, topicId: string) =>
      post<{ ok: true }>("/progress/complete", { userId, topicId }),
  },

  ai: {
    ask: (topicId: string, text: string, userId?: string, retrievalText?: string) =>
      post<{ text: string; confident: boolean }>("/ai/ask", {
        topicId,
        text,
        userId,
        retrievalText,
      }),
  },

  uploads: {
    // Multipart upload bypasses the JSON `request` helper. Returns the
    // relative path the server stored the file under (e.g. "/uploads/<uuid>.png")
    // — no origin baked in, so it resolves correctly against whichever host
    // actually served the page, in dev or production alike.
    file: async (file: File): Promise<{ url: string }> => {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(BASE + "/uploads", { method: "POST", body: form });
      const body = await res.json().catch(() => undefined);
      if (!res.ok) throw new ApiError(res.status, (body && body.error) || res.statusText);
      return { url: body.url };
    },
  },
};
