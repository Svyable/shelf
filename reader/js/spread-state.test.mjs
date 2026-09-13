import test from 'node:test';
import assert from 'node:assert/strict';
import { intendedPagedSpread } from './spread-state.js';

test('uses the requested spread before the right page has painted', () => {
  assert.equal(intendedPagedSpread({
    stage: 'read', mode: 'paged', rightActive: false,
    toggleHidden: false, toggleLabel: 'Single',
  }), true);
});

test('keeps a requested single-page layout single before paint', () => {
  assert.equal(intendedPagedSpread({
    stage: 'read', mode: 'paged', rightActive: false,
    toggleHidden: false, toggleLabel: 'Spread',
  }), false);
});

test('never invents a spread when the spread control is unavailable', () => {
  assert.equal(intendedPagedSpread({
    stage: 'read', mode: 'paged', rightActive: false,
    toggleHidden: true, toggleLabel: 'Single',
  }), false);
});

test('preserves painted spread and ignores stale pages in scroll mode', () => {
  assert.equal(intendedPagedSpread({ stage: 'read', rightActive: true }), true);
  assert.equal(intendedPagedSpread({ stage: 'read', mode: 'scroll', rightActive: true }), false);
});
