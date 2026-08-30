import assert from 'node:assert/strict';
import {
  searchTargetFromHref,
  visibleMatchRange,
  blockContainsOffset,
} from './search-landing.js';

assert.deepEqual(
  searchTargetFromHref('#/b/sample/ch02/140', 'quiet reader'),
  { hash: '#/b/sample/ch02/140', slug: 'sample', chapter: 'ch02', offset: 140, query: 'quiet reader' }
);
assert.deepEqual(
  searchTargetFromHref('https://example.test/reader/#/b/a%20book/ch%2001/12', 'term'),
  { hash: '#/b/a%20book/ch%2001/12', slug: 'a book', chapter: 'ch 01', offset: 12, query: 'term' }
);
assert.equal(searchTargetFromHref('#/b/sample/ch02/nope', 'term'), null);
assert.equal(searchTargetFromHref('#/library', 'term'), null);

assert.deepEqual(visibleMatchRange('A quiet reader keeps going.', 'quiet reader', 0.2), { start: 2, end: 14 });
assert.deepEqual(visibleMatchRange('Café light in the room.', 'cafe light', 0.2), { start: 0, end: 10 });
assert.deepEqual(visibleMatchRange('reader—first design', 'reader-first', 0), { start: 0, end: 12 });
assert.deepEqual(visibleMatchRange('quiet\n\nreader', 'quiet reader', 0), { start: 0, end: 13 });
assert.deepEqual(visibleMatchRange('echo start and echo end', 'echo', 0.9), { start: 15, end: 19 });
assert.equal(visibleMatchRange('nothing here', 'missing', 0.5), null);
assert.equal(visibleMatchRange('a', 'a', 0), null);

assert.equal(blockContainsOffset(100, 200, 100), true);
assert.equal(blockContainsOffset(100, 200, 199), true);
assert.equal(blockContainsOffset(100, 200, 200), false);
assert.equal(blockContainsOffset(100, 200, 99), false);

console.log('search landing tests ok');
