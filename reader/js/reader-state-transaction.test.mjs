import assert from 'node:assert/strict';
import {
  READER_STATE_ROLLBACK_TTL,
  buildRollbackEnvelope,
  parseRollbackEnvelope,
  previewReaderStateRestore,
} from './reader-state-transaction.js';
import { buildReaderStateBackup } from './reader-state-backup.js';

let assertions = 0;
const eq = (actual, expected) => { assertions += 1; assert.deepEqual(actual, expected); };
const yes = (value) => { assertions += 1; assert.equal(value, true); };
const no = (value) => { assertions += 1; assert.equal(value, false); };

const local = {
  legacyPrefs: { theme: 'dark', fontSize: 18 },
  experience: { fontSize: 18, font: 'book', mode: 'paged' },
  preset: null,
  progress: { chapter: 'ch1', offset: 20, pageIndex: 1, savedAt: 10 },
  bookmarks: [{ chapter: 'ch1', offset: 20 }],
  stats: { minutes: 12, chapters: ['ch1'] },
  notes: [{ id: 'n1', createdAt: 1, updatedAt: 1, chapter: 'ch1', offset: 20, quote: 'old', body: '' }],
};
const imported = buildReaderStateBackup({
  slug: 'book',
  legacyPrefs: { theme: 'paper', fontSize: 21 },
  experience: { fontSize: 22, font: 'clear', mode: 'scroll' },
  progress: { chapter: 'ch3', offset: 140, pageIndex: 4, savedAt: 20 },
  bookmarks: [{ chapter: 'ch1', offset: 20 }, { chapter: 'ch3', offset: 140 }],
  stats: { minutes: 20, chapters: ['ch1', 'ch3'] },
  notes: [
    { id: 'n1', createdAt: 1, updatedAt: 2, chapter: 'ch1', offset: 20, quote: 'old', body: 'updated' },
    { id: 'n2', createdAt: 2, updatedAt: 2, chapter: 'ch3', offset: 140, quote: 'new', body: '' },
  ],
});

const preview = previewReaderStateRestore(local, imported);
yes(preview.changes.position.changed);
eq(preview.changes.position.before, 'ch1 · source 20');
eq(preview.changes.position.after, 'ch3 · source 140');
yes(preview.changes.appearance.changed);
yes(preview.changes.experience.changed);
eq(preview.changes.bookmarks, { before: 1, after: 2, added: 1 });
eq(preview.changes.annotations, { before: 1, after: 2, added: 1, updated: 1 });
eq(preview.changes.stats.minutesBefore, 12);
eq(preview.changes.stats.minutesAfter, 20);
eq(preview.restored.progress.chapter, 'ch3');

const envelope = buildRollbackEnvelope({ slug: 'book', title: 'Book', local, createdAt: 1000 });
eq(envelope.version, 1);
eq(envelope.publication, 'book');
eq(envelope.expiresAt, 1000 + READER_STATE_ROLLBACK_TTL);
eq(envelope.backup.reading.progress.chapter, 'ch1');
eq(envelope.backup.reading.bookmarks.length, 1);

yes(parseRollbackEnvelope(envelope, { slug: 'book', now: 2000 }).ok);
no(parseRollbackEnvelope(envelope, { slug: 'other', now: 2000 }).ok);
no(parseRollbackEnvelope(envelope, { slug: 'book', now: envelope.expiresAt }).ok);
no(parseRollbackEnvelope('{bad', { slug: 'book', now: 2000 }).ok);
no(parseRollbackEnvelope({ ...envelope, version: 99 }, { slug: 'book', now: 2000 }).ok);

console.log(`reader state transaction tests ok (${assertions} assertions)`);
