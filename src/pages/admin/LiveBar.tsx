import type { Live } from "../../lib/useLive";

// Existing utility functions – retained for other Admin screens
export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const fmtUptime = (sec: number) => {
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);

  return d ? `${d}d ${h}h` : h ? `${h}h ${m}m` : `${m}m`;
};

export const num = (n: number | null | undefined) =>
  n === null || n === undefined ? "—" : n.toLocaleString("en-IN");

// LiveBar component
export default function LiveBar({
  live,
}: {
  live: Pick<Live<unknown>, "loading" | "error" | "updatedAt" | "refresh">;
}) {
  return (
    <div className="row wrap small" style={{ gap: 8, marginBottom: 12 }}>
      {live.error ? (
        <>
          <span className="tag r">Live data unavailable</span>
          <span className="muted">{live.error}</span>

          <button className="btn sm" onClick={live.refresh} disabled={live.loading}>
            Retry
          </button>
        </>
      ) : live.loading ? (
        <span className="muted">Loading data…</span>
      ) : (
        <>
          <span className="pulse-dot" />

          <span className="muted">
            Data loaded
            {live.updatedAt ? ` · updated ${live.updatedAt.toLocaleTimeString("en-GB")}` : ""}
          </span>

          <button className="btn sm ghost" onClick={live.refresh} disabled={live.loading}>
            ↻ Refresh
          </button>
        </>
      )}
    </div>
  );
}
