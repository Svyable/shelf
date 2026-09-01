import assert from 'node:assert/strict';
import { anchorIndex, captureAnchor, clampScroll, restoreAnchor } from './scroll-reflow-anchor-model.js';

let assertions = 0;
const eq = (a, b, message) => { assertions += 1; assert.equal(a, b, message); };
const deep = (a, b, message) => { assertions += 1; assert.deepEqual(a, b, message); };

const blocks = [
  { chapter: 'one', offset: 0 },
  { chapter: 'one', offset: 120 },
  { chapter: 'two', offset: 0 },
];
const tops = [0, 500, 1100];

eq(anchorIndex(tops, 0, 800), 0, 'probe near the top stays in first block');
eq(anchorIndex(tops, 400, 800), 1, 'probe chooses visible middle block');
eq(anchorIndex(tops, 1000, 800), 2, 'probe chooses last visible block');

const anchor = captureAnchor({ blocks, tops, scrollTop: 400, clientHeight: 800, identity: 'book-a' });
deep(anchor, { identity: 'book-a', chapter: 'one', offset: 120, viewportOffset: 100 }, 'capture records canonical source block and viewport offset');

eq(restoreAnchor(anchor, {
  blocks,
  tops: [0, 650, 1450],
  maxScroll: 1800,
  identity: 'book-a',
}), 550, 'restore preserves the same source block at the same viewport offset');

eq(restoreAnchor(anchor, {
  blocks,
  tops: [0, 650, 1450],
  maxScroll: 500,
  identity: 'book-a',
}), 500, 'restore clamps at the document end');

eq(restoreAnchor(anchor, { blocks, tops, maxScroll: 1800, identity: 'book-b' }), null, 'different publication identity never restores');
eq(restoreAnchor(anchor, { blocks: [{ chapter: 'two', offset: 0 }], tops: [0], maxScroll: 100, identity: 'book-a' }), null, 'missing source anchor never guesses');
eq(clampScroll(-20, 400), 0, 'negative scroll clamps to zero');
eq(clampScroll(900, 400), 400, 'scroll clamps to max');

console.log(`continuous reflow anchor model tests ok (${assertions} assertions)`);
