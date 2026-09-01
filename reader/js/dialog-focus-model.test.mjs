import assert from 'node:assert/strict';
import {
  READER_DIALOG_IDS,
  activeDialogId,
  tabDestination,
  shouldRestoreFocus,
  dialogTitleId,
} from './dialog-focus-model.js';

let assertions = 0;
const eq = (actual, expected, message) => {
  assertions += 1;
  assert.deepEqual(actual, expected, message);
};

eq(READER_DIALOG_IDS.length, 6, 'all modal Reader surfaces are covered');
eq(activeDialogId({}), null, 'no active modal yields no owner');
eq(activeDialogId({ tocOverlay: true }), 'tocOverlay', 'Contents can own focus');
eq(activeDialogId({ progressPanel: true }), 'progressPanel', 'Progress can own focus');
eq(activeDialogId({ settingsPanel: true }), 'settingsPanel', 'Settings can own focus');
eq(activeDialogId({ searchOverlay: true }), 'searchOverlay', 'Search can own focus');
eq(activeDialogId({ noteDialog: true }), 'noteDialog', 'Notes can own focus');
eq(activeDialogId({ helpOverlay: true }), 'helpOverlay', 'Help can own focus');
eq(
  activeDialogId({ tocOverlay: true, noteDialog: true }),
  'noteDialog',
  'later modal surface owns focus when overlays overlap'
);

eq(tabDestination({ currentIndex: -1, count: 3 }), 0, 'Tab entering a dialog starts at first control');
eq(tabDestination({ currentIndex: -1, count: 3, shiftKey: true }), 2, 'Shift+Tab entering starts at last control');
eq(tabDestination({ currentIndex: 0, count: 3 }), 1, 'Tab advances inside dialog');
eq(tabDestination({ currentIndex: 1, count: 3 }), 2, 'Tab advances to final control');
eq(tabDestination({ currentIndex: 2, count: 3 }), 0, 'Tab wraps at dialog end');
eq(tabDestination({ currentIndex: 2, count: 3, shiftKey: true }), 1, 'Shift+Tab moves backward');
eq(tabDestination({ currentIndex: 1, count: 3, shiftKey: true }), 0, 'Shift+Tab reaches first control');
eq(tabDestination({ currentIndex: 0, count: 3, shiftKey: true }), 2, 'Shift+Tab wraps at dialog start');
eq(tabDestination({ currentIndex: 0, count: 0 }), -1, 'empty dialog has no focus target');
eq(tabDestination({ currentIndex: 9, count: 2 }), 0, 'invalid current focus re-enters at first control');
eq(tabDestination({ currentIndex: 9, count: 2, shiftKey: true }), 1, 'reverse invalid focus re-enters at last control');
eq(shouldRestoreFocus({ dialogStillActive: false, originConnected: true }), true, 'connected opener regains focus');
eq(shouldRestoreFocus({ dialogStillActive: true, originConnected: true }), false, 'focus is not restored behind another dialog');
eq(shouldRestoreFocus({ dialogStillActive: false, originConnected: false }), false, 'detached opener is ignored');
eq(dialogTitleId('settingsPanel'), 'reader-dialog-title-settingsPanel', 'dialog title ids are stable');

console.log(`dialog focus model tests ok (${assertions} assertions)`);
