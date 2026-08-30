import assert from 'node:assert/strict';
import {
  ANNOTATION_BACKUP_FORMAT,
  buildAnnotationBackup,
  mergeAnnotationBackup,
  normalizePortableNote,
  parseAnnotationBackup,
} from './annotation-backup.js';

const local = {
  id: 'n1', createdAt: 100, updatedAt: 100, chapter: 'ch1', offset: 12,
  quote: 'A selected passage', body: 'Local note', anchor: { start: 12, end: 30 },
};
const exported = buildAnnotationBackup({ slug: 'book', title: 'Book', notes: [local], exportedAt: '2026-08-30T14:00:00Z' });
assert.equal(exported.format, ANNOTATION_BACKUP_FORMAT);
assert.equal(exported.version, 1);
assert.equal(exported.publication.slug, 'book');
assert.equal(exported.notes.length, 1);
assert.deepEqual(exported.notes[0].anchor, { version: 1, start: 12, end: 30 });

assert.equal(parseAnnotationBackup(JSON.stringify(exported), 'book').ok, true);
assert.equal(parseAnnotationBackup('{nope', 'book').ok, false);
assert.equal(parseAnnotationBackup({ ...exported, version: 9 }, 'book').ok, false);
assert.equal(parseAnnotationBackup(exported, 'other').ok, false);

const newer = { ...local, body: 'Updated elsewhere', updatedAt: 200 };
let merged = mergeAnnotationBackup([local], [newer]);
assert.equal(merged.updated, 1);
assert.equal(merged.added, 0);
assert.equal(merged.notes[0].body, 'Updated elsewhere');

merged = mergeAnnotationBackup([newer], [local]);
assert.equal(merged.updated, 0);
assert.equal(merged.skipped, 1);
assert.equal(merged.notes[0].body, 'Updated elsewhere');

const duplicateDifferentId = { ...newer, id: 'remote-copy' };
merged = mergeAnnotationBackup([newer], [duplicateDifferentId]);
assert.equal(merged.added, 0);
assert.equal(merged.skipped, 1);

const distinct = { ...newer, id: 'n2', anchor: { start: 50, end: 70 }, offset: 50, quote: 'Another passage' };
merged = mergeAnnotationBackup([newer], [distinct]);
assert.equal(merged.added, 1);
assert.equal(merged.notes.length, 2);

const legacy = normalizePortableNote({ id: 'old', createdAt: 50, chapter: 'ch2', offset: 4, quote: 'Legacy' });
assert.equal(legacy.updatedAt, 50);
assert.equal(legacy.anchor, null);
assert.equal(legacy.offset, 4);

assert.equal(normalizePortableNote({ chapter: '', quote: 'orphan' }), null);
console.log('annotation backup tests ok');
