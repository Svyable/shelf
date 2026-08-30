import { mergeAnnotationBackup, normalizePortableNote } from './annotation-backup.js';

export const READER_STATE_BACKUP_FORMAT = 'bookself-reader-state';
export const READER_STATE_BACKUP_VERSION = 1;
export const MAX_READER_STATE_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_READER_BOOKMARKS = 5000;
export const MAX_READER_NOTES = 5000;

const THEMES = new Set(['dark', 'light', 'paper', 'sepia']);
const FONTS = new Set(['book', 'literary', 'warm', 'classic', 'modern', 'clear', 'humanist', 'system']);
const MEASURES = new Set(['narrow', 'balanced', 'wide']);
const ALIGNS = new Set(['left', 'justify']);
const PARAGRAPHS = new Set(['compact', 'normal', 'airy']);
const INDENTS = new Set(['none', 'gentle', 'classic']);
const MODES = new Set(['paged', 'scroll']);
const HYPHENS = new Set(['auto', 'off']);

function cleanText(value, limit = 1000) {
  return String(value ?? '').replace(/\u0000/g, '').slice(0, limit).trim();
}

function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function nonNegativeInteger(value, fallback = 0) {
  return Math.max(0, Math.round(finite(value, fallback)));
}

function clamp(value, min, max, fallback) {
  const number = finite(value, fallback);
  return Math.max(min, Math.min(max, number));
}

function enumValue(value, allowed, fallback) {
  return allowed.has(value) ? value : fallback;
}

export function normalizeLegacyReaderPrefs(raw = {}) {
  return {
    theme: enumValue(raw.theme, THEMES, 'dark'),
    fontSize: Math.round(clamp(raw.fontSize, 12, 40, 18)),
    lineHeight: String(clamp(raw.lineHeight, 1.2, 2.2, 1.55)),
    fontFamily: ['serif', 'sans'].includes(raw.fontFamily) ? raw.fontFamily : 'serif',
    nightLight: !!raw.nightLight,
    viewMode: raw.viewMode === 'single' ? 'single' : 'spread',
    focus: !!raw.focus,
    seenHint: !!raw.seenHint,
  };
}

export function normalizeExperiencePrefs(raw = {}) {
  return {
    fontSize: Math.round(clamp(raw.fontSize, 14, 32, 18)),
    font: enumValue(raw.font, FONTS, 'book'),
    fontWeight: [400, 500, 600].includes(Number(raw.fontWeight)) ? Number(raw.fontWeight) : 400,
    tracking: Number(clamp(raw.tracking, -0.02, 0.08, 0).toFixed(2)),
    leading: Number(clamp(raw.leading, 1.3, 2, 1.55).toFixed(2)),
    measure: enumValue(raw.measure, MEASURES, 'balanced'),
    align: enumValue(raw.align, ALIGNS, 'justify'),
    paragraph: enumValue(raw.paragraph, PARAGRAPHS, 'normal'),
    indent: enumValue(raw.indent, INDENTS, 'none'),
    mode: enumValue(raw.mode, MODES, 'paged'),
    hyphens: enumValue(raw.hyphens, HYPHENS, 'auto'),
  };
}

export function normalizeReaderProgress(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const chapter = cleanText(raw.chapter, 500);
  if (!chapter) return null;
  return {
    chapter,
    offset: nonNegativeInteger(raw.offset),
    pageIndex: nonNegativeInteger(raw.pageIndex),
    savedAt: nonNegativeInteger(raw.savedAt),
  };
}

export function normalizeReaderBookmarks(raw = []) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const out = [];
  for (const bookmark of raw.slice(0, MAX_READER_BOOKMARKS)) {
    const chapter = cleanText(bookmark?.chapter, 500);
    if (!chapter) continue;
    const offset = nonNegativeInteger(bookmark?.offset);
    const key = `${chapter}\u001f${offset}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ chapter, offset });
  }
  return out;
}

export function normalizeReaderStats(raw = {}) {
  const chapters = Array.isArray(raw?.chapters)
    ? [...new Set(raw.chapters.map((chapter) => cleanText(chapter, 500)).filter(Boolean))].slice(0, 5000)
    : [];
  return {
    minutes: Math.max(0, finite(raw?.minutes, 0)),
    chapters,
  };
}

export function buildReaderStateBackup({
  slug,
  title = '',
  exportedAt = new Date().toISOString(),
  legacyPrefs = {},
  experience = {},
  preset = null,
  progress = null,
  bookmarks = [],
  stats = {},
  notes = [],
} = {}) {
  const publicationSlug = cleanText(slug, 500);
  if (!publicationSlug) throw new Error('A publication slug is required to export Reader state.');
  return {
    format: READER_STATE_BACKUP_FORMAT,
    version: READER_STATE_BACKUP_VERSION,
    publication: { slug: publicationSlug, title: cleanText(title, 1000) },
    exportedAt: cleanText(exportedAt, 100),
    preferences: {
      legacy: normalizeLegacyReaderPrefs(legacyPrefs),
      experience: normalizeExperiencePrefs(experience),
      preset: preset ? normalizeExperiencePrefs(preset) : null,
    },
    reading: {
      progress: normalizeReaderProgress(progress),
      bookmarks: normalizeReaderBookmarks(bookmarks),
      stats: normalizeReaderStats(stats),
    },
    annotations: notes.slice(0, MAX_READER_NOTES)
      .map((note, index) => normalizePortableNote(note, index))
      .filter(Boolean),
  };
}

export function parseReaderStateBackup(value, expectedSlug = '') {
  let raw = value;
  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw);
    } catch {
      return { ok: false, error: 'This Reader backup is not valid JSON.' };
    }
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: 'This file is not a Bookself Reader backup.' };
  }
  if (raw.format !== READER_STATE_BACKUP_FORMAT || Number(raw.version) !== READER_STATE_BACKUP_VERSION) {
    return { ok: false, error: 'This Reader backup format is not supported.' };
  }
  const slug = cleanText(raw.publication?.slug, 500);
  if (!slug) return { ok: false, error: 'The Reader backup has no publication identity.' };
  if (expectedSlug && slug !== expectedSlug) {
    return { ok: false, error: `This backup belongs to “${slug}”, not “${expectedSlug}”.` };
  }
  if (!Array.isArray(raw.reading?.bookmarks)) {
    return { ok: false, error: 'The Reader backup has no bookmarks list.' };
  }
  if (raw.reading.bookmarks.length > MAX_READER_BOOKMARKS) {
    return { ok: false, error: `This Reader backup contains more than ${MAX_READER_BOOKMARKS} bookmarks.` };
  }
  if (!Array.isArray(raw.annotations)) {
    return { ok: false, error: 'The Reader backup has no annotations list.' };
  }
  if (raw.annotations.length > MAX_READER_NOTES) {
    return { ok: false, error: `This Reader backup contains more than ${MAX_READER_NOTES} annotations.` };
  }
  return {
    ok: true,
    backup: buildReaderStateBackup({
      slug,
      title: raw.publication?.title,
      exportedAt: raw.exportedAt,
      legacyPrefs: raw.preferences?.legacy,
      experience: raw.preferences?.experience,
      preset: raw.preferences?.preset,
      progress: raw.reading?.progress,
      bookmarks: raw.reading?.bookmarks,
      stats: raw.reading?.stats,
      notes: raw.annotations,
    }),
  };
}

function bookmarkKey(bookmark) {
  return `${bookmark.chapter}\u001f${bookmark.offset}`;
}

function normalizeImportedBackup(imported = {}) {
  if (imported.format === READER_STATE_BACKUP_FORMAT) {
    return buildReaderStateBackup({
      slug: imported.publication?.slug,
      title: imported.publication?.title,
      exportedAt: imported.exportedAt,
      legacyPrefs: imported.preferences?.legacy,
      experience: imported.preferences?.experience,
      preset: imported.preferences?.preset,
      progress: imported.reading?.progress,
      bookmarks: imported.reading?.bookmarks,
      stats: imported.reading?.stats,
      notes: imported.annotations,
    });
  }
  return buildReaderStateBackup(imported);
}

export function restoreReaderState(local = {}, imported = {}) {
  const importedState = normalizeImportedBackup(imported);
  const localBookmarks = normalizeReaderBookmarks(local.bookmarks);
  const importedBookmarks = importedState.reading.bookmarks;
  const bookmarkMap = new Map(localBookmarks.map((bookmark) => [bookmarkKey(bookmark), bookmark]));
  let bookmarksAdded = 0;
  for (const bookmark of importedBookmarks) {
    const key = bookmarkKey(bookmark);
    if (bookmarkMap.has(key)) continue;
    bookmarkMap.set(key, bookmark);
    bookmarksAdded += 1;
  }

  const notesMerge = mergeAnnotationBackup(local.notes || [], importedState.annotations);
  const localStats = normalizeReaderStats(local.stats);
  const importedStats = importedState.reading.stats;
  const stats = {
    minutes: Math.max(localStats.minutes, importedStats.minutes),
    chapters: [...new Set([...localStats.chapters, ...importedStats.chapters])],
  };

  return {
    legacyPrefs: {
      ...normalizeLegacyReaderPrefs(local.legacyPrefs),
      ...importedState.preferences.legacy,
      lastSlug: importedState.publication.slug,
    },
    experience: importedState.preferences.experience,
    preset: importedState.preferences.preset || (local.preset ? normalizeExperiencePrefs(local.preset) : null),
    progress: importedState.reading.progress || normalizeReaderProgress(local.progress),
    bookmarks: [...bookmarkMap.values()],
    stats,
    notes: notesMerge.notes,
    summary: {
      bookmarksAdded,
      bookmarksKept: bookmarkMap.size - bookmarksAdded,
      notesAdded: notesMerge.added,
      notesUpdated: notesMerge.updated,
      notesKept: notesMerge.skipped,
    },
  };
}
