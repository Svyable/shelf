import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyViewport } from './reading-surface.js';

test('classifies a phone portrait viewport', () => {
  assert.deepEqual(
    classifyViewport(390, 844, { coarse: true }),
    {
      width: 390,
      height: 844,
      short: 390,
      orientation: 'portrait',
      device: 'phone',
      coarse: true,
      spreadRecommended: false,
    }
  );
});

test('classifies tablet portrait without recommending a spread', () => {
  const result = classifyViewport(1024, 1366, { coarse: true });
  assert.equal(result.device, 'tablet');
  assert.equal(result.orientation, 'portrait');
  assert.equal(result.spreadRecommended, false);
});

test('recommends a spread on a roomy tablet landscape', () => {
  const result = classifyViewport(1366, 1024, { coarse: true });
  assert.equal(result.device, 'tablet');
  assert.equal(result.orientation, 'landscape');
  assert.equal(result.spreadRecommended, true);
});

test('classifies a large fine-pointer viewport as desktop', () => {
  const result = classifyViewport(1440, 900, { coarse: false });
  assert.equal(result.device, 'desktop');
  assert.equal(result.spreadRecommended, true);
});

test('falls back to finite viewport values', () => {
  const result = classifyViewport(0, Number.NaN);
  assert.equal(result.width, 1280);
  assert.equal(result.height, 800);
});
