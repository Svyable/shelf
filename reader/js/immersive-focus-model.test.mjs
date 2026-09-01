import assert from 'node:assert/strict';
import {
  IMMERSIVE_IDLE_MS,
  focusChromeState,
  selectionHasText,
  shouldConsumeRevealPointer,
} from './immersive-focus-model.js';

let assertions = 0;
const check = (actual, expected, message) => {
  assert.deepEqual(actual, expected, message);
  assertions += 1;
};

check(focusChromeState().hidden, false, 'disabled by default');
check(focusChromeState({ focusMode: true, stage: 'cover', idleMs: 9999 }).hidden, false, 'read stage only');
check(focusChromeState({ focusMode: true, stage: 'read', idleMs: IMMERSIVE_IDLE_MS.fine - 1 }).hidden, false, 'fine pointer delay');
check(focusChromeState({ focusMode: true, stage: 'read', idleMs: IMMERSIVE_IDLE_MS.fine }).hidden, true, 'fine pointer hides at threshold');
check(focusChromeState({ focusMode: true, stage: 'read', pointer: 'coarse', idleMs: IMMERSIVE_IDLE_MS.fine }).hidden, false, 'coarse pointer gets longer grace');
check(focusChromeState({ focusMode: true, stage: 'read', pointer: 'coarse', idleMs: IMMERSIVE_IDLE_MS.coarse }).hidden, true, 'coarse pointer eventually hides');
for (const key of ['overlayOpen', 'selectionActive', 'focusInChrome']) {
  check(focusChromeState({ focusMode: true, stage: 'read', idleMs: 9999, [key]: true }).hidden, false, `${key} protects chrome`);
}
check(shouldConsumeRevealPointer({ hidden: true, pointerType: 'touch' }), true, 'first hidden touch is reveal-only');
check(shouldConsumeRevealPointer({ hidden: true, pointerType: 'mouse' }), false, 'mouse reveal is non-consuming');
check(shouldConsumeRevealPointer({ hidden: false, pointerType: 'touch' }), false, 'visible touch remains normal');
check(selectionHasText({ toString: () => ' passage ' }), true, 'selection text protects chrome');
check(selectionHasText({ toString: () => '   ' }), false, 'empty selection does not protect chrome');
check(focusChromeState({ focusMode: true, stage: 'read', overlayOpen: true, idleMs: 9999 }).protectedInteraction, true, 'protected state is explicit');
check(focusChromeState({ focusMode: true, stage: 'read', idleMs: 0 }).eligible, true, 'eligibility is explicit');

console.log(`immersive focus model tests ok (${assertions} assertions)`);
