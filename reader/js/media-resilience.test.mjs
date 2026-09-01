import assert from 'node:assert/strict';
import {
  intrinsicAspect,
  mediaInspectorIntent,
  mediaKind,
  mediaLayoutChange,
  mediaRefreshPlan,
  mediaViewportPolicy,
  normalizedAspect,
} from './media-resilience-model.js';

let assertions = 0;
const equal = (actual, expected, message) => {
  assertions += 1;
  assert.deepEqual(actual, expected, message);
};

for (const [tag, expected] of [
  ['IMG', 'image'],
  ['video', 'video'],
  ['AUDIO', 'audio'],
  ['iframe', 'embed'],
  ['canvas', null],
]) equal(mediaKind(tag), expected, `classifies ${tag}`);

equal(intrinsicAspect(1600, 900), 16 / 9, 'derives image aspect');
equal(intrinsicAspect(0, 900), null, 'rejects empty width');
equal(intrinsicAspect(900, 0), null, 'rejects empty height');
equal(normalizedAspect(100), 8, 'caps extreme wide ratios');
equal(normalizedAspect(0.01), 0.125, 'caps extreme tall ratios');
equal(normalizedAspect('bad'), null, 'rejects invalid ratio');

const paged = mediaViewportPolicy({ width: 1200, height: 800, mode: 'paged' });
equal(paged.maxInline, 1168, 'reserves horizontal gutter');
equal(paged.maxBlock, 576, 'paged media uses 72% viewport height');
const scroll = mediaViewportPolicy({ width: 800, height: 1000, mode: 'scroll' });
equal(scroll.maxBlock, 760, 'continuous media can use 76% viewport height');
const landscape = mediaViewportPolicy({ width: 844, height: 390, mode: 'paged', shortLandscape: true });
equal(landscape.maxBlock, 257, 'short landscape media uses 66% viewport height');

equal(mediaLayoutChange({ kind: 'image', previousAspect: null, nextAspect: 1.5 }), true, 'first intrinsic geometry settles layout');
equal(mediaLayoutChange({ kind: 'image', previousAspect: 1.5, nextAspect: 1.505 }), false, 'sub-tolerance change is ignored');
equal(mediaLayoutChange({ kind: 'image', previousAspect: 1.5, nextAspect: 1.8 }), true, 'meaningful image ratio change refreshes');
equal(mediaLayoutChange({ kind: 'video', previousWidth: 640, previousHeight: 360, nextWidth: 1920, nextHeight: 1080 }), false, 'same video ratio does not reflow');
equal(mediaLayoutChange({ kind: 'audio', previousAspect: null, nextAspect: null }), false, 'audio without aspect does not invent geometry');
equal(mediaLayoutChange({ kind: 'unknown', previousAspect: 1, nextAspect: 2 }), false, 'unknown media is ignored');

equal(mediaRefreshPlan({ stage: 'read', mode: 'paged', changed: true }), { refresh: true, reason: 'pagination' }, 'paged media refreshes pagination');
equal(mediaRefreshPlan({ stage: 'read', mode: 'scroll', changed: true }), { refresh: true, reason: 'continuous-metrics' }, 'continuous media refreshes scroll metrics');
equal(mediaRefreshPlan({ stage: 'cover', mode: 'paged', changed: true }), { refresh: false, reason: 'inactive' }, 'cover media never repaginates');
equal(mediaRefreshPlan({ stage: 'read', mode: 'paged', changed: false }), { refresh: false, reason: 'inactive' }, 'unchanged media never repaginates');
equal(mediaRefreshPlan({ stage: 'read', mode: 'paged', changed: true, hidden: true }), { refresh: false, reason: 'inactive' }, 'hidden documents defer media reflow');

equal(mediaInspectorIntent({ kind: 'image', key: 'Enter' }), 'open', 'Enter expands an image');
equal(mediaInspectorIntent({ kind: 'image', key: 'Enter', ctrl: true }), 'none', 'modified Enter is preserved');
equal(mediaInspectorIntent({ kind: 'video', key: 'Enter' }), 'none', 'native video controls retain Enter');
equal(mediaInspectorIntent({ kind: 'image', key: ' ' }), 'none', 'Space remains Reader navigation');

console.log(`media resilience model tests ok (${assertions} assertions)`);
