import assert from 'node:assert/strict';
import {
  describedByTokens,
  horizontalKeyboardAction,
  scrollRegionMetrics,
} from './content-scroll-region-model.js';

assert.deepEqual(scrollRegionMetrics({ scrollWidth: 300, clientWidth: 300, scrollLeft: 0 }), {
  scrollable: false,
  maxScrollLeft: 0,
  canScrollLeft: false,
  canScrollRight: false,
});
assert.equal(scrollRegionMetrics({ scrollWidth: 302, clientWidth: 300 }).scrollable, false);
assert.equal(scrollRegionMetrics({ scrollWidth: 304, clientWidth: 300 }).scrollable, true);
assert.deepEqual(scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 0 }), {
  scrollable: true,
  maxScrollLeft: 400,
  canScrollLeft: false,
  canScrollRight: true,
});
assert.equal(scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 120 }).canScrollLeft, true);
assert.equal(scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 120 }).canScrollRight, true);
assert.equal(scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 400 }).canScrollRight, false);
assert.equal(scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 999 }).canScrollRight, false);
assert.equal(scrollRegionMetrics({ scrollWidth: -1, clientWidth: -10 }).maxScrollLeft, 0);

assert.deepEqual(horizontalKeyboardAction('ArrowRight', {}, 200), { type: 'delta', dx: 124 });
assert.deepEqual(horizontalKeyboardAction('ArrowLeft', {}, 200), { type: 'delta', dx: -124 });
assert.deepEqual(horizontalKeyboardAction('ArrowRight', { shiftKey: true }, 200), { type: 'delta', dx: 180 });
assert.deepEqual(horizontalKeyboardAction('ArrowLeft', {}, 20), { type: 'delta', dx: -56 });
assert.deepEqual(horizontalKeyboardAction('Home', {}, 300), { type: 'edge', edge: 'start' });
assert.deepEqual(horizontalKeyboardAction('End', {}, 300), { type: 'edge', edge: 'end' });
assert.equal(horizontalKeyboardAction('ArrowRight', { ctrlKey: true }, 300), null);
assert.equal(horizontalKeyboardAction('ArrowRight', { metaKey: true }, 300), null);
assert.equal(horizontalKeyboardAction('ArrowRight', { altKey: true }, 300), null);
assert.equal(horizontalKeyboardAction('ArrowDown', {}, 300), null);

assert.equal(describedByTokens('', 'reader-help'), 'reader-help');
assert.equal(describedByTokens('caption reader-help', 'reader-help'), 'caption reader-help');
assert.equal(describedByTokens('caption note', 'reader-help'), 'caption note reader-help');
assert.equal(describedByTokens('caption reader-help note', 'reader-help', false), 'caption note');
assert.equal(describedByTokens('  caption   caption  ', 'reader-help'), 'caption reader-help');

console.log('content scroll region model tests ok');
