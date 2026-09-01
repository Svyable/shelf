import assert from 'node:assert/strict';
import {
  COOPERATIVE_SEARCH_POLICY,
  prioritizedChapterIds,
  mergeRankedHits,
  isCurrentSearch,
  searchProgress,
} from './cooperative-search-model.js';

const contents = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((id) => ({ id }));
assert.deepEqual(prioritizedChapterIds(contents, 'd'), ['d', 'e', 'f', 'c', 'a', 'b', 'g']);
assert.deepEqual(prioritizedChapterIds(contents, 'a'), ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
assert.deepEqual(prioritizedChapterIds(contents, 'g'), ['g', 'f', 'a', 'b', 'c', 'd', 'e']);
assert.deepEqual(prioritizedChapterIds(contents, 'missing'), ['a', 'b', 'c', 'd', 'e', 'f', 'g']);

const merged = mergeRankedHits(
  [{ title: 'Later', offset: 20, score: 10 }],
  [{ title: 'Best', offset: 2, score: 30 }, { title: 'Middle', offset: 5, score: 20 }]
);
assert.deepEqual(merged.map((hit) => hit.title), ['Best', 'Middle', 'Later']);
assert.equal(mergeRankedHits([], Array.from({ length: 60 }, (_, i) => ({ score: i }))).length, COOPERATIVE_SEARCH_POLICY.resultLimit);
assert.equal(mergeRankedHits([], [{ title: 'B', offset: 2, score: 4 }, { title: 'A', offset: 9, score: 4 }])[0].title, 'A');

assert.equal(isCurrentSearch(3, 3, 'reader', 'reader'), true);
assert.equal(isCurrentSearch(2, 3, 'reader', 'reader'), false);
assert.equal(isCurrentSearch(3, 3, 'reader', 'Reader'), false);

assert.deepEqual(searchProgress(2, 8, 1), {
  completed: 2,
  total: 8,
  results: 1,
  done: false,
  label: 'Searching 2 of 8 chapters · 1 passage',
});
assert.equal(searchProgress(8, 8, 4).done, true);
assert.equal(searchProgress(99, 8, 4).completed, 8);
assert.equal(searchProgress(0, 0, 0).label, 'No searchable chapters');

console.log('cooperative-search-model: 14 assertions passed');
