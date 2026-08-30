import assert from 'node:assert/strict';
import {
  READING_TRAIL_STATE_KEY,
  navigationHistoryState,
  normalizeReadingPoint,
  readingReturnLabel,
  readingReturnPoint,
  shouldRecordReadingReturn,
} from './reading-trail-model.js';

const a = { view: 'read', slug: 'book', chapter: 'one', offset: 120 };
const b = { view: 'read', slug: 'book', chapter: 'two', offset: 40 };

assert.deepEqual(normalizeReadingPoint(a), { slug: 'book', chapter: 'one', offset: 120 });
assert.equal(normalizeReadingPoint({ view: 'cover', slug: 'book' }), null);
assert.equal(normalizeReadingPoint({ view: 'read', slug: 'book', chapter: 'back-cover' }), null);
assert.equal(shouldRecordReadingReturn(a, b), true);
assert.equal(shouldRecordReadingReturn(a, { ...a }), false);
assert.equal(shouldRecordReadingReturn(a, { ...b, slug: 'other' }), false);
assert.equal(shouldRecordReadingReturn(a, b, { replace: true }), false);

const pushed = navigationHistoryState({ other: 1, stale: true }, a, b);
assert.equal(pushed.other, 1);
assert.deepEqual(pushed[READING_TRAIL_STATE_KEY], { slug: 'book', chapter: 'one', offset: 120 });

const replaced = navigationHistoryState(pushed, b, { ...b, offset: 72 }, { replace: true });
assert.deepEqual(replaced[READING_TRAIL_STATE_KEY], { slug: 'book', chapter: 'one', offset: 120 });

const crossBook = navigationHistoryState(pushed, b, { ...b, slug: 'other' });
assert.equal(READING_TRAIL_STATE_KEY in crossBook, false);

assert.deepEqual(readingReturnPoint(replaced, { ...b, offset: 72 }), {
  slug: 'book', chapter: 'one', offset: 120,
});
assert.equal(readingReturnPoint(replaced, a), null);
assert.equal(readingReturnPoint(replaced, { ...b, slug: 'other' }), null);
assert.equal(readingReturnLabel({ slug: 'book', chapter: 'one', offset: 120 }), 'Return to previous reading spot');
assert.equal(readingReturnLabel(null), '');

console.log('reading trail model tests ok');
