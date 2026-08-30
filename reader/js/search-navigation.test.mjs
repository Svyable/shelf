import assert from 'node:assert/strict';
import {
  nextSearchIndex,
  searchResultSummary,
  hrefMatchesHash,
} from './search-navigation.js';

assert.equal(nextSearchIndex(-1, 4, 'next'), 0);
assert.equal(nextSearchIndex(3, 4, 'next'), 0);
assert.equal(nextSearchIndex(0, 4, 'previous'), 3);
assert.equal(nextSearchIndex(2, 9, 'page-next'), 7);
assert.equal(nextSearchIndex(7, 9, 'page-next'), 8);
assert.equal(nextSearchIndex(7, 9, 'page-previous'), 2);
assert.equal(nextSearchIndex(4, 9, 'first'), 0);
assert.equal(nextSearchIndex(4, 9, 'last'), 8);
assert.equal(nextSearchIndex(0, 0, 'next'), -1);

assert.deepEqual(
  searchResultSummary([
    { chapter: 'Introduction' },
    { chapter: 'Introduction' },
    { chapter: 'Methods' },
  ]),
  { results: 3, chapters: 2, label: '3 passages · 2 chapters' }
);
assert.deepEqual(
  searchResultSummary([{ chapter: 'Introduction' }]),
  { results: 1, chapters: 1, label: '1 passage · 1 chapter' }
);
assert.equal(searchResultSummary([]).label, 'No passages');

assert.equal(
  hrefMatchesHash('#/b/example/chapter/120', '#/b/example/chapter/120'),
  true
);
assert.equal(
  hrefMatchesHash('#/b/example/chapter/120', '#/b/example/chapter/121'),
  false
);

console.log('search navigation tests ok');
