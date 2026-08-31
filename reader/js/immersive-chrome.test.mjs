import assert from 'node:assert/strict';
import {
  centerChromeIntent,
  canHideReaderChrome,
  manualImmersiveAllowed,
  readerScrollPosition,
  scrollChromeIntent,
} from './immersive-chrome.js';

let assertions = 0;
const equal = (actual, expected, message) => {
  assertions += 1;
  assert.equal(actual, expected, message);
};
const deepEqual = (actual, expected, message) => {
  assertions += 1;
  assert.deepEqual(actual, expected, message);
};

equal(centerChromeIntent(50, 100), true);
equal(centerChromeIntent(33, 100), false);
equal(centerChromeIntent(67, 100), false);
equal(centerChromeIntent(50, 100, { interactive: true }), false);
equal(centerChromeIntent(50, 100, { selection: true }), false);
equal(centerChromeIntent(0, 0), false);

equal(canHideReaderChrome({ focusMode: true }), true);
equal(canHideReaderChrome({ manualImmersive: true }), true);
equal(canHideReaderChrome({ focusMode: true, overlayOpen: true }), false);
equal(canHideReaderChrome({ focusMode: true, chromeFocused: true }), false);
equal(canHideReaderChrome({ stage: 'cover', focusMode: true }), false);
equal(canHideReaderChrome({}), false);

equal(manualImmersiveAllowed({ coarse: true, device: 'phone' }), true);
equal(manualImmersiveAllowed({ coarse: true, device: 'tablet' }), true);
equal(manualImmersiveAllowed({ coarse: true, device: 'desktop' }), false);
equal(manualImmersiveAllowed({ coarse: false, device: 'tablet' }), false);

// Pages continues to use document scroll, while Continuous explicitly uses
// the internal scroll-reader offset. This guards the cross-mode scroll root.
equal(readerScrollPosition({ mode: 'paged', documentY: 180, readerY: 640 }), 180);
equal(readerScrollPosition({ mode: 'scroll', documentY: 180, readerY: 640 }), 640);
equal(readerScrollPosition({ mode: 'scroll', readerY: -12 }), 0);
equal(readerScrollPosition({ mode: 'scroll', readerY: Number.NaN }), 0);
equal(readerScrollPosition({ mode: 'paged', documentY: '95' }), 95);

let result = scrollChromeIntent({ deltaY: 40, accumulated: 0, hidden: false });
deepEqual(result, { action: 'none', accumulated: 40 });
result = scrollChromeIntent({ deltaY: 57, accumulated: result.accumulated, hidden: false });
deepEqual(result, { action: 'hide', accumulated: 0 });

result = scrollChromeIntent({ deltaY: -20, accumulated: 0, hidden: true });
deepEqual(result, { action: 'none', accumulated: -20 });
result = scrollChromeIntent({ deltaY: -33, accumulated: result.accumulated, hidden: true });
deepEqual(result, { action: 'reveal', accumulated: 0 });

result = scrollChromeIntent({ deltaY: 70, accumulated: 40, hidden: false });
equal(result.action, 'hide');
result = scrollChromeIntent({ deltaY: -12, accumulated: 40, hidden: false });
deepEqual(result, { action: 'none', accumulated: -12 });
result = scrollChromeIntent({ deltaY: 90, accumulated: -18, hidden: false });
deepEqual(result, { action: 'none', accumulated: 90 });

deepEqual(
  scrollChromeIntent({ deltaY: 120, accumulated: 0, hidden: true }),
  { action: 'none', accumulated: 120 }
);
deepEqual(
  scrollChromeIntent({ deltaY: 20, accumulated: 30, hidden: true, nearStart: true }),
  { action: 'reveal', accumulated: 0 }
);
deepEqual(
  scrollChromeIntent({ deltaY: 20, accumulated: 30, hidden: false, nearStart: true }),
  { action: 'none', accumulated: 0 }
);
deepEqual(
  scrollChromeIntent({ deltaY: 0, accumulated: 17, hidden: false }),
  { action: 'none', accumulated: 17 }
);
equal(
  scrollChromeIntent({ deltaY: 24, accumulated: 0, hidden: false, hideThreshold: 24 }).action,
  'hide'
);
equal(
  scrollChromeIntent({ deltaY: -18, accumulated: 0, hidden: true, revealThreshold: 18 }).action,
  'reveal'
);

console.log(`immersive chrome tests ok (${assertions} assertions)`);
