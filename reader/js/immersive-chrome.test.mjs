import assert from 'node:assert/strict';
import { centerChromeIntent, canHideReaderChrome } from './immersive-chrome.js';

assert.equal(centerChromeIntent(50, 100), true);
assert.equal(centerChromeIntent(33, 100), false);
assert.equal(centerChromeIntent(67, 100), false);
assert.equal(centerChromeIntent(50, 100, { interactive: true }), false);
assert.equal(centerChromeIntent(50, 100, { selection: true }), false);
assert.equal(centerChromeIntent(0, 0), false);

assert.equal(canHideReaderChrome({ focusMode: true }), true);
assert.equal(canHideReaderChrome({ manualImmersive: true }), true);
assert.equal(canHideReaderChrome({ focusMode: true, overlayOpen: true }), false);
assert.equal(canHideReaderChrome({ focusMode: true, chromeFocused: true }), false);
assert.equal(canHideReaderChrome({ stage: 'cover', focusMode: true }), false);
assert.equal(canHideReaderChrome({}), false);

console.log('immersive chrome tests ok');
