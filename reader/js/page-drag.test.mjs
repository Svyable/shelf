import assert from 'node:assert/strict';
import {
  pageDragDecision,
  dragVisual,
  scrollContainerConsumes,
  scrollLeftAfterPan,
  contentPanHandoff,
} from './page-drag.js';

assert.equal(pageDragDecision({ dx: -120, dy: 15, elapsedMs: 300, width: 400 }).commit, true);
assert.equal(pageDragDecision({ dx: 45, dy: 5, elapsedMs: 300, width: 400 }).commit, false);
assert.equal(pageDragDecision({ dx: -55, dy: 3, elapsedMs: 70, width: 400 }).commit, true);
assert.equal(pageDragDecision({ dx: 40, dy: 80, elapsedMs: 40, width: 400 }).horizontal, false);
assert.equal(pageDragDecision({ dx: -90, dy: 4, elapsedMs: 200, width: 400 }).direction, 1);
assert.equal(pageDragDecision({ dx: 90, dy: 4, elapsedMs: 200, width: 400 }).direction, -1);

// Fast taps still need meaningful horizontal travel; velocity alone must not
// turn a page from a tiny accidental flick.
assert.equal(pageDragDecision({ dx: -12, dy: 1, elapsedMs: 10, width: 400 }).fling, false);
assert.equal(pageDragDecision({ dx: -24, dy: 1, elapsedMs: 30, width: 400 }).fling, true);
assert.equal(pageDragDecision({ dx: -100, dy: 2, elapsedMs: 120, width: 400, canTurn: false }).commit, false);

const visual = dragVisual(-200, 400);
assert.equal(visual.progress, -0.5);
assert.equal(visual.rawProgress, -0.5);
assert.equal(visual.translatePct, -17);
assert.equal(visual.rotateDeg, -6.5);
assert.ok(visual.shade > 0 && visual.shade <= 0.32);

const clamped = dragVisual(900, 400);
assert.equal(clamped.progress, 1);

// An impossible direction gets rubber-band resistance instead of pretending a
// full page turn is available.
const resisted = dragVisual(400, 400, { resisted: true });
assert.equal(resisted.rawProgress, 1);
assert.equal(resisted.progress, 0.18);
assert.equal(resisted.resisted, true);
assert.ok(resisted.translatePct < 7);
assert.ok(resisted.rotateDeg < 3);
assert.ok(resisted.shade <= 0.1);

// Nested horizontal content owns the gesture while it has room in the drag
// direction. At an edge, the same continuing drag can hand off to paging.
assert.equal(scrollContainerConsumes({ dx: -40, scrollLeft: 0, scrollWidth: 900, clientWidth: 400 }), true);
assert.equal(scrollContainerConsumes({ dx: 40, scrollLeft: 250, scrollWidth: 900, clientWidth: 400 }), true);
assert.equal(scrollContainerConsumes({ dx: -40, scrollLeft: 500, scrollWidth: 900, clientWidth: 400 }), false);
assert.equal(scrollContainerConsumes({ dx: 40, scrollLeft: 0, scrollWidth: 900, clientWidth: 400 }), false);
assert.equal(scrollContainerConsumes({ dx: -40, scrollLeft: 0, scrollWidth: 400, clientWidth: 400 }), false);
assert.equal(scrollContainerConsumes({ dx: -5, scrollLeft: 0, scrollWidth: 900, clientWidth: 400 }), false);

assert.equal(contentPanHandoff({ dx: -20, scrollLeft: 500, scrollWidth: 900, clientWidth: 400 }), true);
assert.equal(contentPanHandoff({ dx: -20, scrollLeft: 460, scrollWidth: 900, clientWidth: 400 }), false);
assert.equal(contentPanHandoff({ dx: 20, scrollLeft: 0, scrollWidth: 900, clientWidth: 400 }), true);
assert.equal(contentPanHandoff({ dx: 20, scrollLeft: 40, scrollWidth: 900, clientWidth: 400 }), false);

assert.equal(scrollLeftAfterPan({ scrollLeft: 120, deltaX: -35, scrollWidth: 900, clientWidth: 400 }), 155);
assert.equal(scrollLeftAfterPan({ scrollLeft: 490, deltaX: -40, scrollWidth: 900, clientWidth: 400 }), 500);
assert.equal(scrollLeftAfterPan({ scrollLeft: 10, deltaX: 40, scrollWidth: 900, clientWidth: 400 }), 0);

console.log('page-drag: 36 assertions passed');
