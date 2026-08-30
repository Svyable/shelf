export const ANNOTATION_BACKUP_FORMAT = 'bookself-annotations';
export const ANNOTATION_BACKUP_VERSION = 1;
export const MAX_BACKUP_NOTES = 5000;

function cleanText(value, limit = 200000) {
  return String(value ?? '').replace(/\u0000/g, '').slice(0, limit);
}

function finiteNonNegative(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.round(number)) : fallback;
}

function normalizeAnchor(anchor) {
  if (!anchor) return null;
  const start = Number(anchor.start);
  const end = Number(anchor.end);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  return {
    version: 1,
    start: Math.max(0, Math.round(Math.min(start, end))),
    end: Math.max(0, Math.round(Math.max(start, end))),
  };
}

export function normalizePortableNote(note = {}, index = 0) {
  const chapter = cleanText(note.chapter, 500).trim();
  const quote = cleanText(note.quote, 200000).trim();
  const body = cleanText(note.body, 200000).trim();
  if (!chapter || (!quote && !body)) return null;
  const createdAt = finiteNonNegative(note.createdAt, 0);
  const updatedAt = Math.max(createdAt, finiteNonNegative(note.updatedAt, createdAt));
  const anchor = normalizeAnchor(note.anchor);
  const offset = anchor?.start ?? finiteNonNegative(note.offset, 0);
  const id = cleanText(note.id, 500).trim() || `imported-${createdAt || index}-${index}`;
  return { id, createdAt, updatedAt, chapter, offset, quote, body, anchor };
}

export function buildAnnotationBackup({ slug, title = '', notes = [], exportedAt = new Date().toISOString() } = {}) {
  const publicationSlug = cleanText(slug, 500).trim();
  if (!publicationSlug) throw new Error('A publication slug is required to export annotations.');
  const portableNotes = notes.slice(0, MAX_BACKUP_NOTES)
    .map((note, index) => normalizePortableNote(note, index))
    .filter(Boolean);
  return {
    format: ANNOTATION_BACKUP_FORMAT,
    version: ANNOTATION_BACKUP_VERSION,
    publication: { slug: publicationSlug, title: cleanText(title, 1000).trim() },
    exportedAt: cleanText(exportedAt, 100).trim(),
    notes: portableNotes,
  };
}

export function parseAnnotationBackup(value, expectedSlug = '') {
  let raw = value;
  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw);
    } catch {
      return { ok: false, error: 'This annotation backup is not valid JSON.' };
    }
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: 'This file is not a Bookself annotation backup.' };
  }
  if (raw.format !== ANNOTATION_BACKUP_FORMAT || Number(raw.version) !== ANNOTATION_BACKUP_VERSION) {
    return { ok: false, error: 'This annotation backup format is not supported.' };
  }
  const slug = cleanText(raw.publication?.slug, 500).trim();
  if (!slug) return { ok: false, error: 'The annotation backup has no publication identity.' };
  if (expectedSlug && slug !== expectedSlug) {
    return { ok: false, error: `This backup belongs to “${slug}”, not “${expectedSlug}”.` };
  }
  if (!Array.isArray(raw.notes)) return { ok: false, error: 'The annotation backup has no notes list.' };
  if (raw.notes.length > MAX_BACKUP_NOTES) {
    return { ok: false, error: `This backup contains more than ${MAX_BACKUP_NOTES} annotations.` };
  }
  const notes = raw.notes.map((note, index) => normalizePortableNote(note, index)).filter(Boolean);
  return {
    ok: true,
    backup: {
      format: ANNOTATION_BACKUP_FORMAT,
      version: ANNOTATION_BACKUP_VERSION,
      publication: { slug, title: cleanText(raw.publication?.title, 1000).trim() },
      exportedAt: cleanText(raw.exportedAt, 100).trim(),
      notes,
    },
  };
}

function noteFingerprint(note) {
  const anchor = note.anchor ? `${note.anchor.start}:${note.anchor.end}` : `o:${note.offset}`;
  return [note.chapter, anchor, note.quote.replace(/\s+/g, ' ').trim(), note.body].join('\u001f');
}

export function mergeAnnotationBackup(localNotes = [], importedNotes = []) {
  const local = localNotes.map((note, index) => normalizePortableNote(note, index)).filter(Boolean);
  const imported = importedNotes.map((note, index) => normalizePortableNote(note, index)).filter(Boolean);
  const result = [...local];
  const byId = new Map(result.map((note, index) => [note.id, index]));
  const fingerprints = new Set(result.map(noteFingerprint));
  let added = 0;
  let updated = 0;
  let skipped = 0;

  for (const note of imported) {
    const existingIndex = byId.get(note.id);
    if (existingIndex != null) {
      const existing = result[existingIndex];
      if (note.updatedAt > existing.updatedAt && noteFingerprint(note) !== noteFingerprint(existing)) {
        fingerprints.delete(noteFingerprint(existing));
        result[existingIndex] = note;
        fingerprints.add(noteFingerprint(note));
        updated += 1;
      } else {
        skipped += 1;
      }
      continue;
    }
    const fingerprint = noteFingerprint(note);
    if (fingerprints.has(fingerprint)) {
      skipped += 1;
      continue;
    }
    byId.set(note.id, result.length);
    fingerprints.add(fingerprint);
    result.push(note);
    added += 1;
  }
  return { notes: result, added, updated, skipped };
}
