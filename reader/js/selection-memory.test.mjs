import assert from 'node:assert/strict';
import {
  SELECTION_SNAPSHOT_TTL,
  normalizeSelectionSnapshot,
  selectionAnchorTargetIndex,
  selectionSnapshotUsable,
} from './selection-memory.js';

assert.equal(SELECTION_SNAPSHOT_TTL, 15000);

const precise = normalizeSelectionSnapshot({
  text: '  selected   words  ',
  slug: 'book',
  chapter: 'chapter-2',
  mode: 'scroll',
  offset: 40,
  anchor: { start: 118.6, end: 142.2 },
  createdAt: 1000,
});
assert.equal(precise.text, 'selected words');
assert.equal(precise.chapter, 'chapter-2');
assert.equal(precise.offset, 119);
assert.deepEqual(precise.anchor, { version: 1, start: 119, end: 142 });
assert.equal(selectionSnapshotUsable(precise, { slug: 'book', mode: 'scroll', now: 15000 }), true);
assert.equal(selectionSnapshotUsable(precise, { slug: 'book', mode: 'scroll', now: 17001 }), false);
assert.equal(selectionSnapshotUsable(precise, { slug: 'other', mode: 'scroll', now: 1200 }), false);
assert.equal(selectionSnapshotUsable(precise, { slug: 'book', mode: 'paged', now: 1200 }), false);
assert.equal(selectionSnapshotUsable(precise, {
  slug: 'book', mode: 'paged', now: 1200, allowModeChange: true,
}), true);

const coarse = normalizeSelectionSnapshot({ text: 'words', slug: 'book', mode: 'scroll', offset: 40, createdAt: 1000 });
assert.equal(selectionSnapshotUsable(coarse, {
  slug: 'book', mode: 'paged', now: 1200, allowModeChange: true,
}), false);
assert.equal(normalizeSelectionSnapshot({ text: '   ', slug: 'book' }), null);

const ranges = [
  { start: 0, end: 60 },
  { start: 61, end: 110 },
  { start: 111, end: 180 },
];
assert.equal(selectionAnchorTargetIndex({ start: 119, end: 142 }, ranges), 2);
assert.equal(selectionAnchorTargetIndex({ start: 58, end: 64 }, ranges), 0);
assert.equal(selectionAnchorTargetIndex({ start: 190, end: 200 }, ranges), 2);
assert.equal(selectionAnchorTargetIndex(null, ranges), -1);

console.log('selection memory tests ok');