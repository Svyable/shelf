export const CONTENT_INSPECTOR_MIN_OVERFLOW = 2;
export const CONTENT_INSPECTOR_DOUBLE_TAP_MS = 340;
export const CONTENT_INSPECTOR_DOUBLE_TAP_PX = 28;

export function contentInspectorKind(value) {
  const tag = String(value || '').toLowerCase();
  if (tag === 'table') return 'table';
  if (tag === 'pre' || tag === 'code') return 'code';
  return null;
}

export function contentInspectorLabel(kind) {
  return kind === 'table' ? 'Expanded table' : 'Expanded code';
}

export function isInspectibleOverflow({ scrollWidth = 0, clientWidth = 0 } = {}) {
  return Number(scrollWidth) - Number(clientWidth) > CONTENT_INSPECTOR_MIN_OVERFLOW;
}

export function contentInspectorShortcut(event = {}) {
  if (event.defaultPrevented || event.isComposing) return null;
  if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return null;
  return event.key === 'Enter' ? 'open' : null;
}

export function isDoubleTap(previous, current, {
  maxDelay = CONTENT_INSPECTOR_DOUBLE_TAP_MS,
  maxDistance = CONTENT_INSPECTOR_DOUBLE_TAP_PX,
} = {}) {
  if (!previous || !current) return false;
  if (previous.pointerType !== current.pointerType) return false;
  const delay = Number(current.time) - Number(previous.time);
  if (delay < 0 || delay > maxDelay) return false;
  const dx = Number(current.x) - Number(previous.x);
  const dy = Number(current.y) - Number(previous.y);
  return Math.hypot(dx, dy) <= maxDistance;
}

export function tableRowsToTsv(rows = []) {
  return rows
    .map((row) => Array.from(row || []).map((cell) => String(cell ?? '').replace(/\s+/g, ' ').trim()).join('\t'))
    .join('\n');
}

export function contentInspectorCopyText(kind, { text = '', rows = [] } = {}) {
  if (kind === 'table') return tableRowsToTsv(rows);
  return String(text || '').replace(/^\n+|\n+$/g, '');
}

export function contentInspectorViewport({ width = 0, height = 0 } = {}) {
  const w = Math.max(0, Number(width) || 0);
  const h = Math.max(0, Number(height) || 0);
  return {
    compact: w < 720 || h < 500,
    landscape: w > h,
  };
}
