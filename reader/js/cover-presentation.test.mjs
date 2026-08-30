import assert from 'node:assert/strict';
import {
  COVER_PRESENTATION_DEFAULTS,
  COVER_PRESENTATION_OPTIONS,
  coverStyleState,
  normalizeCoverPresentation,
  resolveCoverPresentation,
} from './cover-presentation.js';

assert.ok(COVER_PRESENTATION_OPTIONS.layouts.includes('lower-third'));
assert.ok(COVER_PRESENTATION_OPTIONS.fits.includes('contain'));
assert.deepEqual(COVER_PRESENTATION_OPTIONS.ranges.positionX, { min: 0, max: 100, step: 1 });

assert.deepEqual(normalizeCoverPresentation({
  cover: {
    layout: 'centered',
    align: 'left',
    fit: 'contain',
    positionX: 120,
    positionY: -20,
    shade: 1,
    titleScale: 2,
    tone: 'dark',
    ignored: true,
  },
}), {
  layout: 'centered',
  align: 'left',
  fit: 'contain',
  positionX: 100,
  positionY: 0,
  shade: 0.75,
  titleScale: 1.4,
  tone: 'dark',
});

assert.deepEqual(normalizeCoverPresentation({
  layout: 'not-real', align: 'right', fit: 'stretch', tone: 'auto',
}), {});

assert.deepEqual(resolveCoverPresentation({}), COVER_PRESENTATION_DEFAULTS);

const state = coverStyleState({
  layout: 'lower-third',
  positionX: 36,
  positionY: 72,
  shade: 0.5,
  titleScale: 1.2,
});
assert.equal(state.layout, 'lower-third');
assert.equal(state.positionX, 36);
assert.equal(state.positionY, 72);
assert.equal(state.shade, 0.5);
assert.equal(state.shadeTop, 0.15);
assert.equal(state.titleScale, 1.2);
assert.equal(state.titleSize, 'clamp(2.04rem, 4.80vw, 3.36rem)');
assert.equal(state.align, 'center');
assert.equal(state.fit, 'cover');
assert.equal(state.tone, 'light');

console.log('cover presentation tests ok');
