import assert from 'node:assert/strict';
import {
  reconcileDialogStack,
  activateDialog,
  deactivateDialog,
  topDialogId,
} from './dialog-stack.js';

assert.deepEqual(activateDialog([], 'settingsPanel'), ['settingsPanel']);
assert.deepEqual(
  activateDialog(['settingsPanel'], 'progressPanel'),
  ['settingsPanel', 'progressPanel']
);
assert.deepEqual(
  activateDialog(['settingsPanel', 'progressPanel'], 'settingsPanel'),
  ['progressPanel', 'settingsPanel']
);
assert.deepEqual(
  deactivateDialog(['settingsPanel', 'progressPanel'], 'progressPanel'),
  ['settingsPanel']
);
assert.deepEqual(
  reconcileDialogStack(['stale', 'settingsPanel'], ['settingsPanel', 'searchOverlay']),
  ['settingsPanel', 'searchOverlay']
);
assert.equal(
  topDialogId(['settingsPanel', 'progressPanel'], ['settingsPanel', 'progressPanel']),
  'progressPanel'
);
assert.equal(topDialogId(['settingsPanel'], []), null);
assert.deepEqual(reconcileDialogStack([], ['tocOverlay']), ['tocOverlay']);

console.log('dialog stack tests ok');
