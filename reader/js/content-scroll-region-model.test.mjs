import assert from 'node:assert/strict';
import {
  describedByTokens,
  horizontalKeyboardAction,
  horizontalKeyboardDecision,
  overflowEdgeAnnouncement,
  scrollRegionEdge,
  scrollRegionMetrics,
} from './content-scroll-region-model.js';

let assertions = 0;
const check = (actual, expected) => { assertions += 1; assert.deepEqual(actual, expected); };
const equal = (actual, expected) => { assertions += 1; assert.equal(actual, expected); };

check(scrollRegionMetrics({ scrollWidth: 300, clientWidth: 300, scrollLeft: 0 }), { scrollable: false, maxScrollLeft: 0, canScrollLeft: false, canScrollRight: false });
equal(scrollRegionMetrics({ scrollWidth: 302, clientWidth: 300 }).scrollable, false);
equal(scrollRegionMetrics({ scrollWidth: 304, clientWidth: 300 }).scrollable, true);
check(scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 0 }), { scrollable: true, maxScrollLeft: 400, canScrollLeft: false, canScrollRight: true });
equal(scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 120 }).canScrollLeft, true);
equal(scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 120 }).canScrollRight, true);
equal(scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 400 }).canScrollRight, false);
equal(scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 999 }).canScrollRight, false);
equal(scrollRegionMetrics({ scrollWidth: -1, clientWidth: -10 }).maxScrollLeft, 0);
const start = scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 0 });
const middle = scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 150 });
const end = scrollRegionMetrics({ scrollWidth: 700, clientWidth: 300, scrollLeft: 400 });
equal(scrollRegionEdge({ scrollable: false }), 'none');
equal(scrollRegionEdge(start), 'start');
equal(scrollRegionEdge(middle), 'middle');
equal(scrollRegionEdge(end), 'end');
check(horizontalKeyboardAction('ArrowRight', {}, 200), { type: 'delta', dx: 124 });
check(horizontalKeyboardAction('ArrowLeft', {}, 200), { type: 'delta', dx: -124 });
check(horizontalKeyboardAction('ArrowRight', { shiftKey: true }, 200), { type: 'delta', dx: 180 });
check(horizontalKeyboardAction('ArrowLeft', {}, 20), { type: 'delta', dx: -56 });
check(horizontalKeyboardAction('Home', {}, 300), { type: 'edge', edge: 'start' });
check(horizontalKeyboardAction('End', {}, 300), { type: 'edge', edge: 'end' });
equal(horizontalKeyboardAction('ArrowRight', { ctrlKey: true }, 300), null);
equal(horizontalKeyboardAction('ArrowRight', { metaKey: true }, 300), null);
equal(horizontalKeyboardAction('ArrowRight', { altKey: true }, 300), null);
equal(horizontalKeyboardAction('ArrowDown', {}, 300), null);
check(horizontalKeyboardDecision('ArrowRight', {}, 300, start, { allowArrowHandoff: true }), { action: { type: 'delta', dx: 186 }, consume: true, handoff: false });
check(horizontalKeyboardDecision('ArrowLeft', {}, 300, start, { allowArrowHandoff: true }), { action: null, consume: false, handoff: true, direction: 'previous' });
check(horizontalKeyboardDecision('ArrowRight', {}, 300, end, { allowArrowHandoff: true }), { action: null, consume: false, handoff: true, direction: 'next' });
check(horizontalKeyboardDecision('ArrowRight', {}, 300, end, { allowArrowHandoff: false }), { action: { type: 'delta', dx: 186 }, consume: true, handoff: false });
check(horizontalKeyboardDecision('Home', {}, 300, start, { allowArrowHandoff: true }), { action: { type: 'edge', edge: 'start' }, consume: true, handoff: false });
check(horizontalKeyboardDecision('ArrowRight', { ctrlKey: true }, 300, end, { allowArrowHandoff: true }), { action: null, consume: false, handoff: false });
equal(overflowEdgeAnnouncement({ kind: 'table', edge: 'start', paged: true }), 'Start of scrollable table. Left Arrow again turns the previous page.');
equal(overflowEdgeAnnouncement({ kind: 'code', edge: 'end', paged: true }), 'End of scrollable code block. Right Arrow again turns the next page.');
equal(overflowEdgeAnnouncement({ kind: 'table', edge: 'end', paged: false }), 'End of scrollable table.');
equal(overflowEdgeAnnouncement({ kind: 'code', edge: 'middle', paged: true }), '');
equal(describedByTokens('', 'reader-help'), 'reader-help');
equal(describedByTokens('caption reader-help', 'reader-help'), 'caption reader-help');
equal(describedByTokens('caption note', 'reader-help'), 'caption note reader-help');
equal(describedByTokens('caption reader-help note', 'reader-help', false), 'caption note');
equal(describedByTokens('  caption   caption  ', 'reader-help'), 'caption reader-help');
console.log(`content scroll region model tests ok (${assertions} assertions)`);
