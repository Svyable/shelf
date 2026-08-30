import assert from 'node:assert/strict';
import {
  centerChromeIntent,
  canHideReaderChrome,
  manualImmersiveAllowed,
  scrollChromeIntent,
} from './immersive-chrome.js';

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

assert.equal(manualImmersiveAllowed({ coarse: true, device: 'phone' }), true);
assert.equal(manualImmersiveAllowed({ coarse: true, device: 'tablet' }), true);
assert.equal(manualImmersiveAllowed({ coarse: true, device: 'desktop' }), false);
assert.equal(manualImmersiveAllowed({ coarse: false, device: 'tablet' }), false);

let result = scrollChromeIntent({ deltaY: 40, accumulated: 0, hidden: false });
assert.deepEqual(result, { action: 'none', accumulated: 40 });
result = scrollChromeIntent({ deltaY: 57, accumulated: result.accumulated, hidden: false });
assert.deepEqual(result, { action: 'hide', accumulated: 0 });

result = scrollChromeIntent({ deltaY: -20, accumulated: 0, hidden: true });
assert.deepEqual(result, { action: 'none', accumulated: -20 });
result = scrollChromeIntent({ deltaY: -33, accumulated: result.accumulated, hidden: true });
assert.deepEqual(result, { action: 'reveal', accumulated: 0 });

result = scrollChromeIntent({ deltaY: 70, accumulated: 40, hidden: false });
assert.equal(result.action, 'hide');
result = scrollChromeIntent({ deltaY: -12, accumulated: 40, hidden: false });
assert.deepEqual(result, { action: 'none', accumulated: -12 });
result = scrollChromeIntent({ deltaY: 90, accumulated: -18, hidden: false });
assert.deepEqual(result, { action: 'none', accumulated: 90 });

assert.deepEqual(
  scrollChromeIntent({ deltaY: 120, accumulated: 0, hidden: true }),
  { action: 'none', accumulated: 120 }
);
assert.deepEqual(
  scrollChromeIntent({ deltaY: 20, accumulated: 30, hidden: true, nearStart: true }),
  { action: 'reveal', accumulated: 0 }
);
assert.deepEqual(
  scrollChromeIntent({ deltaY: 20, accumulated: 30, hidden: false, nearStart: true }),
  { action: 'none', accumulated: 0 }
);
assert.deepEqual(
  scrollChromeIntent({ deltaY: 0, accumulated: 17, hidden: false }),
  { action: 'none', accumulated: 17 }
);
assert.equal(
  scrollChromeIntent({ deltaY: 24, accumulated: 0, hidden: false, hideThreshold: 24 }).action,
  'hide'
);
assert.equal(
  scrollChromeIntent({ deltaY: -18, accumulated: 0, hidden: true, revealThreshold: 18 }).action,
  'reveal'
);

console.log('immersive chrome tests ok');
