import assert from 'node:assert/strict';
import {
  clampGuideY,
  guideHeight,
  guideState,
  guideVisible,
  nextGuideY,
  normalizeGuideMode,
  shouldTrackPointer,
} from './reading-guide-model.js';

let assertions = 0;
const eq = (actual, expected) => { assert.deepEqual(actual, expected); assertions += 1; };

for (const mode of ['off', 'line', 'band']) eq(normalizeGuideMode(mode), mode);
eq(normalizeGuideMode('wide'), 'off');
eq(normalizeGuideMode(null), 'off');
eq(guideHeight('off', 24), 0);
eq(guideHeight('line', 24), 32);
eq(guideHeight('band', 24), 77);
eq(guideHeight('line', 10), 22);
eq(clampGuideY(5, 800, 40), 20);
eq(clampGuideY(790, 800, 40), 780);
eq(clampGuideY(400, 800, 40), 400);
eq(clampGuideY(100, 0, 40), 0);
eq(nextGuideY(400, 1, 800, 40), 429);
eq(nextGuideY(400, -1, 800, 40), 371);
eq(nextGuideY(775, 1, 800, 40), 780);
eq(guideVisible({ mode: 'line', stage: 'read' }), true);
eq(guideVisible({ mode: 'line', stage: 'cover' }), false);
eq(guideVisible({ mode: 'line', stage: 'read', overlaysOpen: true }), false);
eq(guideVisible({ mode: 'line', stage: 'read', documentVisible: false }), false);
eq(guideVisible({ mode: 'off', stage: 'read' }), false);
eq(shouldTrackPointer('mouse'), true);
eq(shouldTrackPointer('pen'), true);
eq(shouldTrackPointer('touch'), true);
eq(shouldTrackPointer(''), false);

const state = guideState({
  mode: 'band',
  y: 10,
  viewportHeight: 600,
  lineHeightPx: 25,
  stage: 'read',
  overlaysOpen: false,
  documentVisible: true,
});
eq(state.mode, 'band');
eq(state.height, 80);
eq(state.y, 40);
eq(state.visible, true);
eq(Object.isFrozen(state), true);

console.log(`reading guide tests ok (${assertions} assertions)`);
