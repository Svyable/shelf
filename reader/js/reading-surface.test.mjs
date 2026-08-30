import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyViewport, formatReadingStatus } from './reading-surface.js';

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

test('formats a single paged position with chapter and total', () => {
  assert.equal(
    formatReadingStatus({ mode: 'paged', chapter: 'Methods', currentPage: '12', totalPages: '48' }),
    'Pages. Methods. Page 12 of 48.'
  );
});

test('formats a spread as pages rather than a singular page', () => {
  assert.equal(
    formatReadingStatus({ mode: 'paged', chapter: 'Results', currentPage: '20–21', totalPages: '48' }),
    'Pages. Results. Pages 20–21 of 48.'
  );
});

test('formats continuous reading position as settled book progress', () => {
  assert.equal(
    formatReadingStatus({ mode: 'scroll', chapter: 'Discussion', percent: '63%' }),
    'Continuous reading. Discussion. 63% through book.'
  );
});

test('omits unavailable location details without producing broken speech', () => {
  assert.equal(formatReadingStatus({ mode: 'scroll' }), 'Continuous reading.');
  assert.equal(formatReadingStatus({ mode: 'paged', currentPage: '3' }), 'Pages. Page 3.');
});