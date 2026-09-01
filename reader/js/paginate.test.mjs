import test from 'node:test';
import assert from 'node:assert/strict';
import {
  balancedBreakIndex,
  headingFollowerWordMinimum,
  pageIndexForOffset,
  trailingHeadingRunStart,
} from './paginate.js';

test('moves a tiny bottom fragment to the next page', () => {
  assert.equal(balancedBreakIndex(2, 0, 10), 0);
});

test('backs up a break that would leave a two-word widow', () => {
  assert.equal(balancedBreakIndex(9, 0, 11), 8);
});

test('keeps a balanced break unchanged', () => {
  assert.equal(balancedBreakIndex(6, 0, 12), 6);
});

test('requires a stronger prose lead after a section heading', () => {
  assert.equal(headingFollowerWordMinimum('<h2>Methods</h2>'), 6);
  assert.equal(headingFollowerWordMinimum('<p>Earlier prose</p><h3>Detail</h3>'), 6);
  assert.equal(headingFollowerWordMinimum('<p>Ordinary paragraph</p>'), 3);
});

test('defers a heading lead that would expose fewer than six words', () => {
  assert.equal(balancedBreakIndex(5, 0, 20, headingFollowerWordMinimum('<h2>Results</h2>')), 0);
  assert.equal(balancedBreakIndex(6, 0, 20, headingFollowerWordMinimum('<h2>Results</h2>')), 6);
});

test('finds the complete trailing heading run', () => {
  assert.equal(trailingHeadingRunStart([
    { html: '<p>Lead</p>' },
    { html: '<h2>Section</h2>' },
    { html: '<h3>Subsection</h3>' },
  ]), 1);
  assert.equal(trailingHeadingRunStart([
    { html: '<h1>Chapter</h1>' },
    { html: '<h2>Section</h2>' },
  ]), 0);
  assert.equal(trailingHeadingRunStart([{ html: '<p>Lead</p>' }]), -1);
});

test('maps source offsets to the correct page', () => {
  const pages = [
    { chapter: 'one', start: 0, end: 100 },
    { chapter: 'one', start: 100, end: 220 },
    { chapter: 'two', start: 0, end: 90 },
  ];
  assert.equal(pageIndexForOffset(pages, 'one', 140), 1);
  assert.equal(pageIndexForOffset(pages, 'two', 20), 2);
});
