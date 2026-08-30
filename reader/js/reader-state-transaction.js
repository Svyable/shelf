import { buildReaderStateBackup, restoreReaderState } from './reader-state-backup.js';

export const READER_STATE_ROLLBACK_VERSION = 1;
export const READER_STATE_ROLLBACK_TTL = 24 * 60 * 60 * 1000;

function sameJson(a, b) {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

function progressLabel(progress) {
  if (!progress?.chapter) return 'No saved reading position';
  return `${progress.chapter} · source ${Math.max(0, Number(progress.offset) || 0)}`;
}

export function previewReaderStateRestore(local = {}, imported = {}) {
  const restored = restoreReaderState(local, imported);
  const before = {
    legacyPrefs: local.legacyPrefs || {},
    experience: local.experience || {},
    preset: local.preset || null,
    progress: local.progress || null,
    bookmarks: local.bookmarks || [],
    stats: local.stats || {},
    notes: local.notes || [],
  };

  return {
    restored,
    changes: {
      position: {
        changed: !sameJson(before.progress, restored.progress),
        before: progressLabel(before.progress),
        after: progressLabel(restored.progress),
      },
      appearance: {
        changed: !sameJson(before.legacyPrefs, restored.legacyPrefs),
      },
      experience: {
        changed: !sameJson(before.experience, restored.experience),
      },
      preset: {
        changed: !sameJson(before.preset, restored.preset),
      },
      bookmarks: {
        before: before.bookmarks.length,
        after: restored.bookmarks.length,
        added: restored.summary.bookmarksAdded,
      },
      annotations: {
        before: before.notes.length,
        after: restored.notes.length,
        added: restored.summary.notesAdded,
        updated: restored.summary.notesUpdated,
      },
      stats: {
        changed: !sameJson(before.stats, restored.stats),
        minutesBefore: Math.max(0, Number(before.stats?.minutes) || 0),
        minutesAfter: Math.max(0, Number(restored.stats?.minutes) || 0),
      },
    },
  };
}

export function buildRollbackEnvelope({
  slug,
  title = '',
  local = {},
  createdAt = Date.now(),
} = {}) {
  const backup = buildReaderStateBackup({
    slug,
    title,
    exportedAt: new Date(createdAt).toISOString(),
    legacyPrefs: local.legacyPrefs,
    experience: local.experience,
    preset: local.preset,
    progress: local.progress,
    bookmarks: local.bookmarks,
    stats: local.stats,
    notes: local.notes,
  });
  return {
    version: READER_STATE_ROLLBACK_VERSION,
    createdAt,
    expiresAt: createdAt + READER_STATE_ROLLBACK_TTL,
    publication: slug,
    backup,
  };
}

export function parseRollbackEnvelope(value, {
  slug = '',
  now = Date.now(),
} = {}) {
  let raw = value;
  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw);
    } catch {
      return { ok: false, reason: 'invalid' };
    }
  }
  if (!raw || typeof raw !== 'object' || Number(raw.version) !== READER_STATE_ROLLBACK_VERSION) {
    return { ok: false, reason: 'invalid' };
  }
  if (!raw.publication || (slug && raw.publication !== slug)) {
    return { ok: false, reason: 'publication' };
  }
  if (!Number.isFinite(Number(raw.expiresAt)) || Number(raw.expiresAt) <= now) {
    return { ok: false, reason: 'expired' };
  }
  if (!raw.backup || raw.backup.publication?.slug !== raw.publication) {
    return { ok: false, reason: 'invalid' };
  }
  return { ok: true, envelope: raw };
}
