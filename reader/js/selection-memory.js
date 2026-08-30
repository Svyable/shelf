export function normalizeSelectionSnapshot(raw = {}, now = Date.now()) {
  const text = String(raw.text || '').replace(/\s+/g, ' ').trim();
  const slug = String(raw.slug || '').trim();
  const mode = raw.mode === 'scroll' ? 'scroll' : 'paged';
  const start = Number(raw.anchor?.start);
  const end = Number(raw.anchor?.end);
  const anchor = Number.isFinite(start) && Number.isFinite(end)
    ? { version: 1, start: Math.max(0, Math.round(Math.min(start, end))), end: Math.max(0, Math.round(Math.max(start, end))) }
    : null;
  const fallback = Number(raw.offset);
  const offset = anchor?.start ?? (Number.isFinite(fallback) ? Math.max(0, Math.round(fallback)) : 0);
  if (!text || !slug) return null;
  return {
    text,
    slug,
    mode,
    anchor,
    offset,
    node: raw.node || null,
    createdAt: Number.isFinite(Number(raw.createdAt)) ? Number(raw.createdAt) : now,
  };
}

export function selectionSnapshotUsable(snapshot, {
  slug,
  mode,
  now = Date.now(),
  maxAge = 15000,
} = {}) {
  if (!snapshot?.text || !snapshot.slug) return false;
  if (slug && snapshot.slug !== slug) return false;
  if (mode && snapshot.mode !== mode) return false;
  return now - snapshot.createdAt <= maxAge;
}
