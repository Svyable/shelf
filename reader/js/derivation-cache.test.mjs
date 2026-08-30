import assert from 'node:assert/strict';
import { createBoundedPairCache } from './derivation-cache.js';

const cache = createBoundedPairCache(3);
assert.equal(cache.limit, 3);
assert.equal(cache.size, 0);
assert.equal(cache.get('book-a', 'chapter-1'), undefined);

const a1 = Object.freeze([{ start: 0, end: 10 }]);
cache.set('book-a', 'chapter-1', a1);
cache.set('book-a', 'chapter-2', 'a2');
cache.set('book-b', 'chapter-1', 'b1');
assert.equal(cache.size, 3);
assert.equal(cache.get('book-a', 'chapter-1'), a1);
assert.equal(cache.get('book-b', 'chapter-1'), 'b1');
assert.equal(cache.has('book-a', 'chapter-2'), true);

cache.set('book-c', 'chapter-1', 'c1');
assert.equal(cache.size, 3);
assert.equal(cache.has('book-a', 'chapter-2'), false);
assert.equal(cache.get('book-a', 'chapter-1'), a1);
assert.equal(cache.get('book-b', 'chapter-1'), 'b1');
assert.equal(cache.get('book-c', 'chapter-1'), 'c1');

cache.set('book-b', 'chapter-1', 'b1-new');
assert.equal(cache.size, 3);
assert.equal(cache.get('book-b', 'chapter-1'), 'b1-new');

cache.set('book-d', 'chapter-1', 'd1');
assert.equal(cache.size, 3);
assert.equal(cache.has('book-a', 'chapter-1'), false);
assert.equal(cache.get('book-b', 'chapter-1'), 'b1-new');
assert.equal(cache.get('book-c', 'chapter-1'), 'c1');
assert.equal(cache.get('book-d', 'chapter-1'), 'd1');

const single = createBoundedPairCache(0);
single.set('scope', 'one', 1);
single.set('scope', 'two', 2);
assert.equal(single.limit, 1);
assert.equal(single.size, 1);
assert.equal(single.has('scope', 'one'), false);
assert.equal(single.get('scope', 'two'), 2);

cache.clear();
assert.equal(cache.size, 0);
assert.equal(cache.has('book-b', 'chapter-1'), false);

console.log('derivation cache tests ok');
