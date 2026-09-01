import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  MODE_TRANSITION_FADE_MS,
  modeTargetReady,
  modeTransitionEligible,
  modeTransitionFadeMs,
  modeTransitionLabel,
  normalizeReaderMode,
  shouldRestoreModeFocus,
} from './reading-mode-transition-model.js';

let assertions = 0;
function check(actual, expected, message) {
  assert.deepEqual(actual, expected, message);
  assertions += 1;
}

check(normalizeReaderMode('paged'), 'paged', 'paged remains paged');
check(normalizeReaderMode('scroll'), 'scroll', 'scroll remains scroll');
check(normalizeReaderMode('unknown'), 'paged', 'unknown modes safely normalize to paged');
check(modeTransitionEligible({ from: 'paged', to: 'scroll', stage: 'read' }), true, 'Pages to Continuous is eligible while reading');
check(modeTransitionEligible({ from: 'scroll', to: 'paged', stage: 'read' }), true, 'Continuous to Pages is eligible while reading');
check(modeTransitionEligible({ from: 'paged', to: 'paged', stage: 'read' }), false, 'same-mode changes do not start a transition');
check(modeTransitionEligible({ from: 'paged', to: 'scroll', stage: 'cover' }), false, 'cover changes do not start a reading transition');
check(modeTargetReady({ mode: 'scroll', hidden: false, busy: false, hasContent: true }), true, 'visible settled Continuous content is ready');
check(modeTargetReady({ mode: 'scroll', hidden: true, busy: false, hasContent: true }), false, 'hidden Continuous content is not ready');
check(modeTargetReady({ mode: 'scroll', hidden: false, busy: true, hasContent: true }), false, 'busy Continuous content is not ready');
check(modeTargetReady({ mode: 'scroll', hidden: false, busy: false, hasContent: false }), false, 'empty Continuous content is not ready');
check(modeTargetReady({ mode: 'paged', hidden: false, busy: false, hasContent: true }), true, 'settled Pages content is ready');
check(modeTargetReady({ mode: 'paged', hidden: false, busy: true, hasContent: true }), false, 'busy Pages content is not ready');
check(modeTransitionLabel('scroll'), 'Preparing continuous reading. Keeping your place visible.', 'Continuous preparation is announced');
check(modeTransitionLabel('paged'), 'Preparing pages. Keeping your place visible.', 'Pages preparation is announced');
check(modeTransitionLabel('scroll', { ready: true }), 'Continuous reading ready. Position preserved.', 'Continuous readiness is announced');
check(modeTransitionLabel('paged', { ready: true }), 'Pages ready. Position preserved.', 'Pages readiness is announced');
check(modeTransitionFadeMs(), MODE_TRANSITION_FADE_MS, 'normal motion uses the compositor fade');
check(modeTransitionFadeMs({ reducedMotion: true }), 0, 'reduced motion removes the fade');
check(shouldRestoreModeFocus({ sourceOwnedFocus: true, overlayOpen: false, stillReading: true }), true, 'owned reading focus moves to the target surface');
check(shouldRestoreModeFocus({ sourceOwnedFocus: true, overlayOpen: true, stillReading: true }), false, 'open dialogs keep focus ownership');
check(shouldRestoreModeFocus({ sourceOwnedFocus: true, overlayOpen: false, stillReading: false }), false, 'leaving reading prevents focus restoration');

const runtime = readFileSync(new URL('./reading-mode-transition.js', import.meta.url), 'utf8');
check(runtime.includes("clone.style.setProperty('display', sourceMode === 'scroll' ? 'block' : 'flex', 'important')"), true, 'snapshot display overrides the target-mode !important hiding rule');
check(runtime.includes('pointer-events: none !important'), true, 'transition snapshot and surfaces cannot accept pointer input');

console.log(`reading mode transition model tests ok (${assertions} assertions)`);
