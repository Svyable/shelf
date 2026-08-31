import assert from 'node:assert/strict';
import {
  parseWakeLockPreference,
  wakeLockEligibility,
  wakeLockButtonModel,
  shouldRetryWakeLock,
} from './reading-wake-lock-model.js';

let n = 0;
const eq = (actual, expected) => { assert.deepEqual(actual, expected); n += 1; };

eq(parseWakeLockPreference('1'), true);
eq(parseWakeLockPreference('true'), true);
eq(parseWakeLockPreference('0'), false);
eq(parseWakeLockPreference(null), false);

eq(wakeLockEligibility({ enabled: true, supported: true, visibility: 'visible', stage: 'read' }).shouldHold, true);
eq(wakeLockEligibility({ enabled: true, supported: true, visibility: 'hidden', stage: 'read' }).shouldHold, false);
eq(wakeLockEligibility({ enabled: true, supported: true, visibility: 'visible', stage: 'cover' }).shouldHold, false);
eq(wakeLockEligibility({ enabled: true, supported: false, visibility: 'visible', stage: 'read' }).shouldHold, false);
eq(wakeLockEligibility({ enabled: false, supported: true, visibility: 'visible', stage: 'read' }).shouldHold, false);

eq(wakeLockButtonModel({ enabled: false, supported: true, held: false, pending: false }).label, 'Off');
eq(wakeLockButtonModel({ enabled: true, supported: true, held: true, pending: false }).label, 'On');
eq(wakeLockButtonModel({ enabled: true, supported: true, held: false, pending: true }).label, 'Starting…');
eq(wakeLockButtonModel({ enabled: true, supported: false, held: false, pending: false }).disabled, true);
eq(wakeLockButtonModel({ enabled: true, supported: false, held: false, pending: false }).pressed, false);
eq(shouldRetryWakeLock({ enabled: true, supported: true, visibility: 'visible', stage: 'read', reason: 'visibility' }), true);
eq(shouldRetryWakeLock({ enabled: true, supported: true, visibility: 'visible', stage: 'read', reason: 'pageshow' }), true);
eq(shouldRetryWakeLock({ enabled: true, supported: true, visibility: 'visible', stage: 'read', reason: 'stage' }), true);
eq(shouldRetryWakeLock({ enabled: true, supported: true, visibility: 'visible', stage: 'read', reason: 'release' }), false);
eq(shouldRetryWakeLock({ enabled: true, supported: true, visibility: 'hidden', stage: 'read', reason: 'visibility' }), false);
eq(shouldRetryWakeLock({ enabled: true, supported: true, visibility: 'visible', stage: 'cover', reason: 'stage' }), false);

console.log(`reading wake lock model tests ok (${n} assertions)`);
