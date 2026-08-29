import assert from 'node:assert/strict';
import { buildProgressMap, progressAt } from './progress-position.js';

const map = buildProgressMap([
  { id: 'front', title: 'Front', markdown: 'x'.repeat(100) },
  { id: 'one', title: 'One', markdown: 'x'.repeat(300) },
  { id: 'two', title: 'Two', markdown: 'x'.repeat(600) },
]);

assert.equal(map.total, 1000);
assert.equal(progressAt(map, 'front', 0).percent, 0);
assert.equal(progressAt(map, 'one', 150).percent, 25);
assert.equal(progressAt(map, 'one', 150).chapterPercent, 50);
assert.equal(progressAt(map, 'two', 300).percent, 70);
assert.equal(progressAt(map, 'two', 9999).percent, 100);
assert.equal(progressAt(map, 'missing', 50).percent, 5);
assert.deepEqual(progressAt(buildProgressMap([]), 'none', 0), {
  book: 0,
  chapter: 0,
  percent: 0,
  chapterPercent: 0,
});

console.log('progress-position: 7 assertions passed');
