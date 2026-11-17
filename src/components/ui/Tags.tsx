const STATUS_CLASS: Record<string, string> = {
  Published: 'g', Active: 'g', Valid: 'g', Completed: 'b', Scheduled: 'o', Draft: '', Live: 'r', Inactive: 'r', Cancelled: 'r',
  Raised: 'o', Assigned: 'b', 'In Progress': 'b', Answered: 'g', Closed: '',
};

export function StatusTag({ status }: { status: string }) {
  return <span className={'tag ' + (STATUS_CLASS[status] || '')}>{status}</span>;
}

export function ResultTag({ result }: { result: 'Pass' | 'Fail' | 'Incomplete' }) {
  if (result === 'Pass') return <span className="tag g">✓ Pass</span>;
  if (result === 'Incomplete') return <span className="tag o">⏸ Incomplete</span>;
  return <span className="tag r">✕ Fail</span>;
}

export function Bar({ pct, cls }: { pct: number; cls?: string }) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className={'bar ' + (cls || '')}>
      <i style={{ width: clamped + '%' }} />
    </div>
  );
}
