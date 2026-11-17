import { useCallback, useEffect, useRef, useState } from 'react';

export interface Live<T> {
  data: T | null;
  /** true until the first response (or failure) arrives */
  loading: boolean;
  error: string | null;
  /** when `data` was last received from the server */
  updatedAt: Date | null;
  refresh: () => void;
}

/**
 * Loads `fetcher()` immediately, then keeps it fresh: re-fetches every
 * `intervalMs`, when the tab becomes visible again, and on demand via
 * `refresh()`. Used by the Admin screens so every figure shown is read from the
 * live data source — nothing is cached in the bundle or seeded locally.
 */
export function useLive<T>(fetcher: () => Promise<T>, intervalMs = 15000, deps: unknown[] = []): Live<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const alive = useRef(true);
  const seq = useRef(0);

  const load = useCallback(() => {
    const mine = ++seq.current;
    fetcherRef.current()
      .then((d) => {
        if (!alive.current || mine !== seq.current) return;
        setData(d); setError(null); setUpdatedAt(new Date());
      })
      .catch((e) => {
        if (!alive.current || mine !== seq.current) return;
        setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => { if (alive.current && mine === seq.current) setLoading(false); });
  }, []);

  useEffect(() => {
    alive.current = true;
    load();
    const t = setInterval(load, intervalMs);
    const onVisible = () => { if (document.visibilityState === 'visible') load(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { alive.current = false; clearInterval(t); document.removeEventListener('visibilitychange', onVisible); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, load, ...deps]);

  return { data, loading, error, updatedAt, refresh: load };
}
