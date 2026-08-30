export const SELECTION_SNAPSHOT_TTL = 15000;

export function normalizeSelectionSnapshot(raw = {}, now = Date.now()) {
  const text = String(raw.text || '').replace(/\s+/g, ' ').trim();
  const slug = String(raw.slug || '').trim();
  const chapter = String(raw.chapter || '').trim();
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
    chapter,
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
  maxAge = SELECTION_SNAPSHOT_TTL,
  allowModeChange = false,
} = {}) {
  if (!snapshot?.text || !snapshot.slug) return false;
  if (slug && snapshot.slug !== slug) return false;
  if (mode && snapshot.mode !== mode && !(allowModeChange && snapshot.anchor)) return false;
  return now - snapshot.createdAt <= maxAge;
}

export function selectionAnchorTargetIndex(anchor, ranges = []) {
  if (!anchor) return -1;
  const start = Number(anchor.start);
  const end = Number(anchor.end);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return -1;
  const low = Math.min(start, end);
  const high = Math.max(start, end);
  const midpoint = low + (high - low) / 2;
  let nearest = -1;
  let nearestDistance = Infinity;

  for (let index = 0; index < ranges.length; index += 1) {
    const rangeStart = Number(ranges[index]?.start);
    const rangeEnd = Number(ranges[index]?.end);
    if (!Number.isFinite(rangeStart) || !Number.isFinite(rangeEnd) || rangeEnd < rangeStart) continue;
    if (rangeStart <= high && rangeEnd >= low) return index;
    const distance = midpoint < rangeStart ? rangeStart - midpoint : midpoint - rangeEnd;
    if (distance < nearestDistance) {
      nearest = index;
      nearestDistance = distance;
    }
  }
  return nearest;
}