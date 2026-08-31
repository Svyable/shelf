import assert from 'node:assert/strict';
import { sourceOffsetForTextPosition } from './notes.js';
import { normalizeSelectionSnapshot } from './selection-memory.js';
import { readHash } from './router.js';

let assertions = 0;
const eq = (actual, expected) => {
  assert.equal(actual, expected);
  assertions += 1;
};

const sourceStart = 400;
const sourceEnd = 600;
const textLength = 100;
const selectedStart = sourceOffsetForTextPosition(sourceStart, sourceEnd, textLength, 25);
const selectedEnd = sourceOffsetForTextPosition(sourceStart, sourceEnd, textLength, 50);
eq(selectedStart, 450);
eq(selectedEnd, 500);

const snapshot = normalizeSelectionSnapshot({
  text: 'selected passage',
  slug: 'example-book',
  chapter: 'chapter-2',
  mode: 'paged',
  offset: 320,
  anchor: { start: selectedStart, end: selectedEnd },
  createdAt: 1000,
});
eq(snapshot.offset, 450);
eq(snapshot.anchor.start, 450);
eq(snapshot.anchor.end, 500);
eq(readHash(snapshot.slug, snapshot.chapter, snapshot.anchor.start), '#/b/example-book/chapter-2/450');

const rightPage = normalizeSelectionSnapshot({
  text: 'next chapter passage',
  slug: 'example-book',
  chapter: 'chapter-3',
  mode: 'paged',
  offset: 900,
  anchor: { start: 1234, end: 1260 },
  createdAt: 1000,
});
eq(rightPage.offset, 1234);
eq(readHash(rightPage.slug, rightPage.chapter, rightPage.offset), '#/b/example-book/chapter-3/1234');

const coarse = normalizeSelectionSnapshot({
  text: 'fallback passage',
  slug: 'example-book',
  chapter: 'chapter-2',
  mode: 'paged',
  offset: 320,
  createdAt: 1000,
});
eq(coarse.offset, 320);
eq(coarse.anchor, null);

console.log(`selection action precision tests ok (${assertions} assertions)`);