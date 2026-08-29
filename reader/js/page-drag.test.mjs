import assert from 'node:assert/strict';
import { pageDragDecision, dragVisual } from './page-drag.js';

assert.equal(pageDragDecision({ dx: -120, dy: 15, elapsedMs: 300, width: 400 }).commit, true);
assert.equal(pageDragDecision({ dx: 45, dy: 5, elapsedMs: 300, width: 400 }).commit, false);
assert.equal(pageDragDecision({ dx: -55, dy: 3, elapsedMs: 70, width: 400 }).commit, true);
assert.equal(pageDragDecision({ dx: 40, dy: 80, elapsedMs: 40, width: 400 }).horizontal, false);
assert.equal(pageDragDecision({ dx: -90, dy: 4, elapsedMs: 200, width: 400 }).direction, 1);
assert.equal(pageDragDecision({ dx: 90, dy: 4, elapsedMs: 200, width: 400 }).direction, -1);

const visual = dragVisual(-200, 400);
assert.equal(visual.progress, -0.5);
assert.equal(visual.translatePct, -17);
assert.equal(visual.rotateDeg, -6.5);
assert.ok(visual.shade > 0 && visual.shade <= 0.32);

const clamped = dragVisual(900, 400);
assert.equal(clamped.progress, 1);

console.log('page-drag: 9 assertions passed');
