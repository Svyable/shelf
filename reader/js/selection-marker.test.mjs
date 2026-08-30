import assert from 'node:assert/strict';
import { selectionMarkerSegments } from './selection-marker.js';

assert.deepEqual(
  selectionMarkerSegments(
    { start: 120, end: 180 },
    [{ start: 100, end: 200, textLength: 50 }]
  ),
  [{ index: 0, sourceStart: 120, sourceEnd: 180, textStart: 10, textEnd: 40 }]
);

assert.deepEqual(
  selectionMarkerSegments(
    { start: 180, end: 240 },
    [
      { start: 100, end: 200, textLength: 50 },
      { start: 200, end: 300, textLength: 80 },
    ]
  ),
  [
    { index: 0, sourceStart: 180, sourceEnd: 200, textStart: 40, textEnd: 50 },
    { index: 1, sourceStart: 200, sourceEnd: 240, textStart: 0, textEnd: 32 },
  ]
);

assert.deepEqual(
  selectionMarkerSegments(
    { start: 90, end: 110 },
    [{ start: 100, end: 200, textLength: 50 }]
  ),
  [{ index: 0, sourceStart: 100, sourceEnd: 110, textStart: 0, textEnd: 5 }]
);

assert.deepEqual(
  selectionMarkerSegments(
    { start: 220, end: 250 },
    [
      { start: 100, end: 200, textLength: 50 },
      { start: Number.NaN, end: 260, textLength: 20 },
      { start: 200, end: 300, textLength: 100 },
    ]
  ),
  [{ index: 2, sourceStart: 220, sourceEnd: 250, textStart: 20, textEnd: 50 }]
);

assert.deepEqual(
  selectionMarkerSegments(null, [{ start: 0, end: 10, textLength: 10 }]),
  []
);

console.log('selection marker tests ok');
