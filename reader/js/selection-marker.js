import { anchorSegmentsForRanges, textPositionForSourceOffset } from './notes.js';

export const RESUMED_SELECTION_HIGHLIGHT = 'bookself-resumed-selection';
const MARKER_CSS = 'css/selection-marker.css?v=r1';

function finiteRange(entry) {
  const start = Number(entry?.start);
  const end = Number(entry?.end);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return null;
  return { start, end };
}

export function selectionMarkerSegments(anchor, ranges = []) {
  const normalizedRanges = ranges.map(finiteRange);
  const valid = normalizedRanges
    .map((range, index) => range ? { ...range, sourceIndex: index } : null)
    .filter(Boolean);
  const sourceSegments = anchorSegmentsForRanges(valid, anchor);
  return sourceSegments.map((segment) => {
    const range = valid[segment.index];
    const textLength = Math.max(0, Number(ranges[range.sourceIndex]?.textLength) || 0);
    const textStart = textPositionForSourceOffset(
      range.start,
      range.end,
      textLength,
      segment.sourceStart
    );
    const textEnd = textPositionForSourceOffset(
      range.start,
      range.end,
      textLength,
      segment.sourceEnd
    );
    return {
      index: range.sourceIndex,
      sourceStart: segment.sourceStart,
      sourceEnd: segment.sourceEnd,
      textStart,
      textEnd: Math.max(textStart + 1, textEnd),
    };
  });
}

function textNodes(root) {
  if (!root || typeof document === 'undefined') return [];
  const showText = globalThis.NodeFilter?.SHOW_TEXT || 4;
  const walker = document.createTreeWalker(root, showText, {
    acceptNode(node) {
      if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest('script, style')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  let cursor = 0;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const start = cursor;
    const end = start + node.nodeValue.length;
    nodes.push({ node, start, end });
    cursor = end;
  }
  return nodes;
}

export function domRangeForTextOffsets(root, start, end) {
  if (!root || typeof document === 'undefined') return null;
  const nodes = textNodes(root);
  if (!nodes.length) return null;
  const max = nodes[nodes.length - 1].end;
  const lo = Math.max(0, Math.min(max, Number(start) || 0));
  const hi = Math.max(lo, Math.min(max, Number(end) || lo));
  let startPoint = null;
  let endPoint = null;

  for (const row of nodes) {
    if (!startPoint && lo >= row.start && lo <= row.end) {
      startPoint = {
        node: row.node,
        offset: Math.min(row.node.nodeValue.length, lo - row.start),
      };
    }
    if (hi >= row.start && hi <= row.end) {
      endPoint = {
        node: row.node,
        offset: Math.min(row.node.nodeValue.length, hi - row.start),
      };
      break;
    }
  }
  if (!startPoint) startPoint = { node: nodes[0].node, offset: 0 };
  if (!endPoint) {
    const last = nodes[nodes.length - 1];
    endPoint = { node: last.node, offset: last.node.nodeValue.length };
  }

  try {
    const range = document.createRange();
    range.setStart(startPoint.node, startPoint.offset);
    range.setEnd(endPoint.node, endPoint.offset);
    return range.collapsed ? null : range;
  } catch {
    return null;
  }
}

function sourceRows(root) {
  return [...root.querySelectorAll('[data-source-start][data-source-end]')]
    .filter((element) => element.getClientRects().length > 0)
    .map((element) => ({
      element,
      start: Number(element.dataset.sourceStart),
      end: Number(element.dataset.sourceEnd),
      textLength: element.textContent?.length || 0,
    }));
}

function highlightRegistry() {
  return globalThis.CSS?.highlights || null;
}

let fallbackOverlay = null;
let fallbackRanges = [];

function clearFallback() {
  fallbackRanges = [];
  fallbackOverlay?.remove();
  fallbackOverlay = null;
}

function paintFallback(ranges) {
  clearFallback();
  const rects = ranges.flatMap((range) => [...range.getClientRects()])
    .filter((rect) => rect.width > 0 && rect.height > 0);
  if (!rects.length) return false;
  const overlay = document.createElement('div');
  overlay.className = 'selection-resume-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  for (const rect of rects) {
    const mark = document.createElement('span');
    mark.className = 'selection-resume-rect';
    mark.style.left = `${rect.left}px`;
    mark.style.top = `${rect.top}px`;
    mark.style.width = `${rect.width}px`;
    mark.style.height = `${rect.height}px`;
    overlay.appendChild(mark);
  }
  document.body.appendChild(overlay);
  fallbackOverlay = overlay;
  fallbackRanges = ranges;
  return true;
}

export function refreshSelectionMarkerFallback() {
  if (!fallbackRanges.length || typeof document === 'undefined') return false;
  const ranges = [...fallbackRanges];
  return paintFallback(ranges);
}

export function clearSelectionMarker() {
  highlightRegistry()?.delete?.(RESUMED_SELECTION_HIGHLIGHT);
  clearFallback();
  if (typeof document !== 'undefined') {
    document.documentElement.removeAttribute('data-selection-resume-marker');
  }
}

export function paintSelectionMarker(anchor, root) {
  if (!anchor || !root || typeof document === 'undefined') {
    return { painted: false, target: null, ranges: 0 };
  }
  const rows = sourceRows(root);
  const segments = selectionMarkerSegments(anchor, rows);
  const ranges = segments
    .map((segment) => domRangeForTextOffsets(
      rows[segment.index]?.element,
      segment.textStart,
      segment.textEnd
    ))
    .filter(Boolean);
  if (!ranges.length) {
    clearSelectionMarker();
    return { painted: false, target: null, ranges: 0 };
  }

  clearSelectionMarker();
  const registry = highlightRegistry();
  const HighlightCtor = globalThis.Highlight;
  let painted = false;
  if (registry?.set && HighlightCtor) {
    registry.set(RESUMED_SELECTION_HIGHLIGHT, new HighlightCtor(...ranges));
    painted = true;
  } else {
    painted = paintFallback(ranges);
  }
  if (painted) document.documentElement.dataset.selectionResumeMarker = 'true';
  return {
    painted,
    target: rows[segments[0]?.index]?.element || null,
    ranges: ranges.length,
  };
}

export function installSelectionMarkerStyles() {
  if (typeof document === 'undefined' || document.querySelector(`link[href="${MARKER_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = MARKER_CSS;
  document.head.appendChild(link);
}
