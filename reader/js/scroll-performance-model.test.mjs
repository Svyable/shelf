import assert from 'node:assert/strict';
import {
  chapterIntrinsicEstimate,
  intrinsicSizeCss,
  shouldRefreshIntrinsic,
} from './scroll-performance-model.js';

assert.equal(chapterIntrinsicEstimate({ blockCount: 0, viewportHeight: 800 }), 920);
assert.equal(chapterIntrinsicEstimate({ blockCount: 10, fontSize: 18, lineHeight: 1.55, viewportHeight: 800 }), 1148);
assert.equal(chapterIntrinsicEstimate({ blockCount: 1000, viewportHeight: 800 }), 22400);
assert.equal(chapterIntrinsicEstimate({ blockCount: 4, viewportHeight: 200 }), 546);
assert.equal(chapterIntrinsicEstimate({ blockCount: 4, fontSize: 80, lineHeight: 8, viewportHeight: 800 }), 1587);
assert.equal(shouldRefreshIntrinsic(0, 1200), true);
assert.equal(shouldRefreshIntrinsic(1000, 1080), false);
assert.equal(shouldRefreshIntrinsic(1000, 1120), true);
assert.equal(shouldRefreshIntrinsic(2000, 2200), false);
assert.equal(shouldRefreshIntrinsic(2000, 2250), true);
assert.equal(shouldRefreshIntrinsic(1000, 0), false);
assert.equal(intrinsicSizeCss(1234.6), '1235px');
assert.equal(intrinsicSizeCss(-20), '1px');

console.log('scroll performance model tests ok');
