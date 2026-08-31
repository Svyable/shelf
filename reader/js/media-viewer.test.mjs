import assert from 'node:assert/strict';
import {
  MAX_MEDIA_SCALE, MEDIA_PAN_LARGE_STEP, MEDIA_PAN_STEP, clampMediaScale,
  constrainMediaView, formatMediaZoom, mediaKeyboardAction, mediaPanBounds,
  panMediaView, pinchMediaView, resetMediaView, toggleMediaZoomAt,
  zoomMediaView, zoomMediaViewAt,
} from './media-viewer.js';

const geometry = { baseWidth: 900, baseHeight: 700, viewportWidth: 800, viewportHeight: 600 };

assert.equal(clampMediaScale(8), MAX_MEDIA_SCALE);
assert.equal(clampMediaScale(0.1), 1);
assert.equal(formatMediaZoom(2.5), '250%');
assert.deepEqual(resetMediaView(), { scale: 1, x: 0, y: 0 });
assert.deepEqual(mediaPanBounds({ scale: 2, baseWidth: 600, baseHeight: 400, viewportWidth: 800, viewportHeight: 500 }), { x: 200, y: 150 });
assert.deepEqual(constrainMediaView({ scale: 2, x: 500, y: -500 }, { baseWidth: 600, baseHeight: 400, viewportWidth: 800, viewportHeight: 500 }), { scale: 2, x: 200, y: -150 });
assert.deepEqual(zoomMediaView({ scale: 1, x: 100, y: 100 }, 0.5, { baseWidth: 600, baseHeight: 400, viewportWidth: 800, viewportHeight: 500 }), { scale: 1.5, x: 0, y: 0 });
assert.deepEqual(zoomMediaView({ scale: 1.5, x: 30, y: 30 }, -0.5, { baseWidth: 600, baseHeight: 400, viewportWidth: 800, viewportHeight: 500 }), { scale: 1, x: 0, y: 0 });
assert.deepEqual(panMediaView({ scale: 3, x: 0, y: 0 }, -72, 40, { baseWidth: 600, baseHeight: 400, viewportWidth: 800, viewportHeight: 500 }), { scale: 3, x: -72, y: 40 });

assert.deepEqual(
  zoomMediaViewAt({ scale: 1, x: 0, y: 0 }, 2, { x: 400, y: 300 }, geometry),
  { scale: 2, x: 0, y: 0 }
);
assert.deepEqual(
  zoomMediaViewAt({ scale: 1, x: 0, y: 0 }, 2, { x: 500, y: 300 }, geometry),
  { scale: 2, x: -100, y: 0 }
);
assert.deepEqual(
  zoomMediaViewAt({ scale: 2, x: -100, y: 0 }, 1, { x: 500, y: 300 }, geometry),
  { scale: 1, x: 0, y: 0 }
);

assert.deepEqual(
  pinchMediaView(
    { scale: 1, x: 0, y: 0 },
    100,
    200,
    { x: 400, y: 300 },
    { x: 400, y: 300 },
    geometry
  ),
  { scale: 2, x: 0, y: 0 }
);
assert.deepEqual(
  pinchMediaView(
    { scale: 1, x: 0, y: 0 },
    100,
    200,
    { x: 500, y: 300 },
    { x: 520, y: 320 },
    geometry
  ),
  { scale: 2, x: -80, y: 20 }
);
assert.deepEqual(
  pinchMediaView(
    { scale: 3, x: 0, y: 0 },
    100,
    300,
    { x: 400, y: 300 },
    { x: 400, y: 300 },
    geometry
  ).scale,
  MAX_MEDIA_SCALE
);
assert.deepEqual(
  pinchMediaView(
    { scale: 2, x: 40, y: -20 },
    200,
    50,
    { x: 400, y: 300 },
    { x: 400, y: 300 },
    geometry
  ),
  { scale: 1, x: 0, y: 0 }
);
assert.deepEqual(toggleMediaZoomAt({ scale: 1, x: 0, y: 0 }, { x: 400, y: 300 }, geometry), { scale: 2, x: 0, y: 0 });
assert.deepEqual(toggleMediaZoomAt({ scale: 2, x: 50, y: 10 }, { x: 400, y: 300 }, geometry), { scale: 1, x: 0, y: 0 });

assert.deepEqual(mediaKeyboardAction('ArrowRight'), { type: 'pan', dx: -MEDIA_PAN_STEP, dy: 0 });
assert.deepEqual(mediaKeyboardAction('ArrowDown', { shiftKey: true }), { type: 'pan', dx: 0, dy: -MEDIA_PAN_LARGE_STEP });
assert.deepEqual(mediaKeyboardAction('+'), { type: 'zoom', delta: 0.5 });
assert.deepEqual(mediaKeyboardAction('0'), { type: 'reset' });
assert.equal(mediaKeyboardAction('PageDown'), null);
console.log('media viewer tests ok (23 assertions)');
