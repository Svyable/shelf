import assert from 'node:assert/strict';
import {
  READER_STATE_BACKUP_FORMAT,
  READER_STATE_BACKUP_VERSION,
  buildReaderStateBackup,
  normalizeReaderBookmarks,
  normalizeReaderProgress,
  normalizeExperiencePrefs,
  parseReaderStateBackup,
  restoreReaderState,
} from './reader-state-backup.js';

let assertions = 0;
const eq = (actual, expected) => { assertions += 1; assert.deepEqual(actual, expected); };
const yes = (value) => { assertions += 1; assert.equal(value, true); };
const no = (value) => { assertions += 1; assert.equal(value, false); };

eq(normalizeReaderProgress({ chapter: ' ch2 ', offset: 12.7, pageIndex: 3.2, savedAt: 900.4 }), {
  chapter: 'ch2', offset: 13, pageIndex: 3, savedAt: 900,
});
eq(normalizeReaderProgress({ offset: 2 }), null);
eq(normalizeReaderBookmarks([
  { chapter: 'a', offset: 4 },
  { chapter: 'a', offset: 4 },
  { chapter: 'b', offset: -3 },
]), [{ chapter: 'a', offset: 4 }, { chapter: 'b', offset: 0 }]);

eq(normalizeExperiencePrefs({ fontSize: 99, font: 'bogus', leading: 9, mode: 'scroll' }).fontSize, 32);
eq(normalizeExperiencePrefs({ fontSize: 99, font: 'bogus', leading: 9, mode: 'scroll' }).font, 'book');
eq(normalizeExperiencePrefs({ fontSize: 99, font: 'bogus', leading: 9, mode: 'scroll' }).leading, 2);
eq(normalizeExperiencePrefs({ fontSize: 99, font: 'bogus', leading: 9, mode: 'scroll' }).mode, 'scroll');

const backup = buildReaderStateBackup({
  slug: 'book',
  title: 'A Book',
  exportedAt: '2026-08-30T15:00:00.000Z',
  legacyPrefs: { theme: 'light', fontSize: 20, focus: true },
  experience: { fontSize: 22, font: 'clear', mode: 'scroll', measure: 'narrow' },
  preset: { fontSize: 24, font: 'literary', mode: 'paged' },
  progress: { chapter: 'ch3', offset: 144, pageIndex: 7, savedAt: 5000 },
  bookmarks: [{ chapter: 'ch1', offset: 20 }, { chapter: 'ch3', offset: 144 }],
  stats: { minutes: 31.5, chapters: ['ch1', 'ch2'] },
  notes: [{ id: 'n1', createdAt: 10, updatedAt: 12, chapter: 'ch2', offset: 60, quote: 'hello', body: 'memo', anchor: { start: 60, end: 65 } }],
});
eq(backup.format, READER_STATE_BACKUP_FORMAT);
eq(backup.version, READER_STATE_BACKUP_VERSION);
eq(backup.publication, { slug: 'book', title: 'A Book' });
eq(backup.reading.progress.chapter, 'ch3');
eq(backup.annotations[0].anchor, { version: 1, start: 60, end: 65 });

const parsed = parseReaderStateBackup(JSON.stringify(backup), 'book');
yes(parsed.ok);
eq(parsed.backup.reading.bookmarks.length, 2);
no(parseReaderStateBackup('{broken', 'book').ok);
no(parseReaderStateBackup({ ...backup, format: 'other' }, 'book').ok);
no(parseReaderStateBackup(backup, 'other-book').ok);

const restored = restoreReaderState({
  legacyPrefs: { theme: 'dark', fontSize: 17, lastSlug: 'old' },
  experience: { fontSize: 17, font: 'book', mode: 'paged' },
  preset: { fontSize: 19, font: 'warm', mode: 'paged' },
  progress: { chapter: 'ch1', offset: 5, pageIndex: 0, savedAt: 9000 },
  bookmarks: [{ chapter: 'ch1', offset: 20 }, { chapter: 'ch2', offset: 80 }],
  stats: { minutes: 40, chapters: ['ch1', 'ch4'] },
  notes: [
    { id: 'n1', createdAt: 10, updatedAt: 11, chapter: 'ch2', offset: 60, quote: 'hello', body: 'old', anchor: { start: 60, end: 65 } },
    { id: 'local', createdAt: 20, updatedAt: 20, chapter: 'ch4', offset: 10, quote: 'local', body: '' },
  ],
}, parsed.backup);

eq(restored.legacyPrefs.theme, 'light');
eq(restored.legacyPrefs.lastSlug, 'book');
eq(restored.experience.font, 'clear');
eq(restored.preset.font, 'literary');
eq(restored.progress.chapter, 'ch3');
eq(restored.progress.savedAt, 5000);
eq(restored.bookmarks, [
  { chapter: 'ch1', offset: 20 },
  { chapter: 'ch2', offset: 80 },
  { chapter: 'ch3', offset: 144 },
]);
eq(restored.stats.minutes, 40);
eq(restored.stats.chapters, ['ch1', 'ch4', 'ch2']);
eq(restored.notes.find((note) => note.id === 'n1').body, 'memo');
eq(restored.notes.some((note) => note.id === 'local'), true);
eq(restored.summary.bookmarksAdded, 1);
eq(restored.summary.notesUpdated, 1);

console.log(`reader state backup tests ok (${assertions} assertions)`);
