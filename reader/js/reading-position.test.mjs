import test from 'node:test';
import assert from 'node:assert/strict';
import {
  interpolateSourceOffset,
  withSourceRange,
  sourceAnchorFromRects,
  scrollTopForSourceAnchor,
} from './reading-position.js';

test('interpolates and clamps canonical Markdown offsets', () => {
  assert.equal(interpolateSourceOffset(100, 200, 0.35), 135);
  assert.equal(interpolateSourceOffset(100, 200, -1), 100);
  assert.equal(interpolateSourceOffset(100, 200, 4), 200);
});

test('stamps source ranges without disturbing existing block markup', () => {
  assert.equal(
    withSourceRange('<p class="lede">Hello</p>', 12, 34),
    '<p data-source-start="12" data-source-end="34" class="lede">Hello</p>'
  );
  assert.equal(
    withSourceRange('<p data-source-start="0" data-source-end="8">Hello</p>', 20, 40),
    '<p data-source-start="20" data-source-end="40">Hello</p>'
  );
  assert.equal(
    withSourceRange('<p title="1 > 0" data-note=">">Hello</p>', 4, 19),
    '<p data-source-start="4" data-source-end="19" title="1 > 0" data-note=">">Hello</p>'
  );
});

test('anchors to the source fragment crossing the visual reading probe', () => {
  const anchor = sourceAnchorFromRects([
    { start: 0, end: 100, top: 20, bottom: 120 },
    { start: 100, end: 260, top: 132, bottom: 292 },
  ], 212);
  assert.equal(anchor.start, 100);
  assert.equal(anchor.end, 260);
  assert.equal(anchor.offset, 180);
});

test('uses the nearest source fragment when the probe falls in vertical whitespace', () => {
  const anchor = sourceAnchorFromRects([
    { start: 0, end: 50, top: 0, bottom: 50 },
    { start: 50, end: 120, top: 90, bottom: 160 },
  ], 82);
  assert.equal(anchor.start, 50);
  assert.equal(anchor.offset, 50);
});

test('maps a source anchor back to the same visual probe position in scroll mode', () => {
  assert.equal(scrollTopForSourceAnchor({
    blockTop: 1000,
    blockHeight: 400,
    sourceStart: 200,
    sourceEnd: 600,
    sourceOffset: 400,
    probeDistance: 180,
    maxScroll: 2000,
  }), 1020);
});
