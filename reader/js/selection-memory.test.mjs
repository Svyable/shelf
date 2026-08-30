import assert from 'node:assert/strict';
import { normalizeSelectionSnapshot, selectionSnapshotUsable } from './selection-memory.js';

const precise = normalizeSelectionSnapshot({
  text: '  selected   words  ',
  slug: 'book',
  mode: 'scroll',
  offset: 40,
  anchor: { start: 118.6, end: 142.2 },
  createdAt: 1000,
});
assert.equal(precise.text, 'selected words');
assert.equal(precise.offset, 119);
assert.deepEqual(precise.anchor, { version: 1, start: 119, end: 142 });
assert.equal(selectionSnapshotUsable(precise, { slug: 'book', mode: 'scroll', now: 15000 }), true);
assert.equal(selectionSnapshotUsable(precise, { slug: 'book', mode: 'scroll', now: 17001 }), false);
assert.equal(selectionSnapshotUsable(precise, { slug: 'other', mode: 'scroll', now: 1200 }), false);
assert.equal(selectionSnapshotUsable(precise, { slug: 'book', mode: 'paged', now: 1200 }), false);
assert.equal(normalizeSelectionSnapshot({ text: '   ', slug: 'book' }), null);

console.log('selection memory tests ok');
