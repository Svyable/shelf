import { searchableMarkdown } from './search.js';

export const DEFAULT_READING_WPM = 230;
export const DEFAULT_IDLE_MS = 180000;
export const DEFAULT_MAX_SLICE_MS = 20000;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function finite(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function upperBound(values, target) {
  let low = 0;
  let high = values.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (values[mid] <= target) low = mid + 1;
    else high = mid;
  }
  return low;
}

export function buildReadingWordMap(chapters = []) {
  let total = 0;
  const entries = chapters.map((chapter, index) => {
    const projected = searchableMarkdown(chapter?.markdown || '');
    const wordSourceOffsets = [];
    const words = /\S+/g;
    let match;
    while ((match = words.exec(projected.text))) {
      const sourceOffset = projected.sourceMap[match.index];
      if (Number.isFinite(sourceOffset)) wordSourceOffsets.push(sourceOffset);
    }
    const entry = {
      id: chapter?.id || String(index),
      title: chapter?.title || '',
      startWord: total,
      wordCount: wordSourceOffsets.length,
      wordSourceOffsets,
    };
    total += entry.wordCount;
    return entry;
  });
  return { entries, total };
}

export function readingWordPosition(map, chapterId, sourceOffset = 0) {
  const entries = map?.entries || [];
  const total = Math.max(0, finite(map?.total));
  if (!entries.length || total <= 0) {
    return {
      wordsRead: 0,
      wordsRemaining: 0,
      chapterWordsRead: 0,
      chapterWordsRemaining: 0,
      progress: 0,
    };
  }

  const entry = entries.find((candidate) => candidate.id === chapterId) || entries[0];
  const offset = Math.max(0, finite(sourceOffset));
  const chapterWordsRead = upperBound(entry.wordSourceOffsets, offset);
  const wordsRead = clamp(entry.startWord + chapterWordsRead, 0, total);
  return {
    wordsRead,
    wordsRemaining: total - wordsRead,
    chapterWordsRead,
    chapterWordsRemaining: Math.max(0, entry.wordCount - chapterWordsRead),
    progress: wordsRead / total,
  };
}

export function estimateReadingMinutes(wordsRemaining, wpm = DEFAULT_READING_WPM) {
  const words = Math.max(0, finite(wordsRemaining));
  const pace = Math.max(1, finite(wpm, DEFAULT_READING_WPM));
  if (!words) return 0;
  return Math.max(1, Math.ceil(words / pace));
}

export function formatReadingDuration(seconds = 0) {
  const total = Math.max(0, Math.floor(finite(seconds)));
  const minutes = Math.floor(total / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
}

export function activeSecondsFromStats(stats = {}) {
  const active = Number(stats?.activeSeconds);
  if (Number.isFinite(active) && active >= 0) return Math.floor(active);
  return Math.max(0, Math.floor(finite(stats?.minutes) * 60));
}

export function readingEligible({
  stage = '',
  visible = true,
  overlayOpen = false,
  now = 0,
  lastActivityAt = 0,
  idleMs = DEFAULT_IDLE_MS,
} = {}) {
  if (stage !== 'read' || !visible || overlayOpen) return false;
  const idle = Math.max(0, finite(now) - finite(lastActivityAt));
  return idle <= Math.max(0, finite(idleMs, DEFAULT_IDLE_MS));
}

export function advanceReadingClock(state = {}, sample = {}, {
  idleMs = DEFAULT_IDLE_MS,
  maxSliceMs = DEFAULT_MAX_SLICE_MS,
} = {}) {
  const now = Math.max(0, finite(sample.now));
  const lastAt = Number.isFinite(Number(state.lastAt)) ? Number(state.lastAt) : now;
  const elapsed = clamp(now - lastAt, 0, Math.max(0, finite(maxSliceMs, DEFAULT_MAX_SLICE_MS)));
  let accruedMs = state.eligible ? elapsed : 0;

  const activityDeadline = finite(sample.lastActivityAt)
    + Math.max(0, finite(idleMs, DEFAULT_IDLE_MS));
  if (state.eligible && activityDeadline < now) {
    accruedMs = Math.min(accruedMs, Math.max(0, activityDeadline - lastAt));
  }

  return {
    accruedMs,
    state: {
      lastAt: now,
      eligible: readingEligible({ ...sample, now, idleMs }),
    },
  };
}
