import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildLibraryBookPreview,
  progressChapter,
  publicationAction,
  publicationLabel,
  shouldShowLibraryQuickLook,
} from './library-book-preview-model.js';

const book = {
  title: 'A Useful Book',
  authors: 'Sven Hardy Benson',
  format: 'book',
  formatLabel: 'Book',
  series: 'Field Notes',
  publicationDate: '2026',
  tags: ['Systems', 'Reading', 'Ignored'],
  contents: [
    { id: 'ch01', title: 'Beginning' },
    { id: 'ch02', title: 'Middle' },
    { id: 'ch03', title: 'End' },
  ],
};

test('ordinary book covers do not get the metadata quick-look pill', () => {
  assert.equal(shouldShowLibraryQuickLook(book), false);
  assert.equal(shouldShowLibraryQuickLook({ ...book, format: '' }), false);
  assert.equal(shouldShowLibraryQuickLook({ ...book, format: 'paper' }), true);
});

test('new books retain metadata for semantics without inventing progress', () => {
  const preview = buildLibraryBookPreview(book);
  assert.equal(preview.action, 'Open');
  assert.equal(preview.kicker, 'Field Notes · Book');
  assert.equal(preview.facts, '3 chapters · 2026');
  assert.deepEqual(preview.tags, ['Systems', 'Reading']);
  assert.equal(preview.progressText, '');
  assert.match(preview.ariaLabel, /^A Useful Book\. by Sven Hardy Benson\./);
});

test('valid saved progress changes the card action and names the continuation chapter', () => {
  const progress = { chapter: 'ch02', offset: 420 };
  const preview = buildLibraryBookPreview(book, progress);
  assert.equal(progressChapter(book, progress)?.title, 'Middle');
  assert.equal(preview.action, 'Continue');
  assert.equal(preview.progressText, 'Continue at Middle');
  assert.match(preview.ariaLabel, /Continue at Middle$/);
});

test('stale progress does not claim a continuation point', () => {
  const preview = buildLibraryBookPreview(book, { chapter: 'deleted', offset: 12 });
  assert.equal(preview.action, 'Open');
  assert.equal(preview.progressText, '');
});

test('format-specific actions and count nouns stay publication-aware', () => {
  const paper = { ...book, series: '', format: 'paper', formatLabel: 'Whitepaper', contents: [{ id: 'paper', title: 'Paper' }] };
  const journal = { ...book, format: 'journal', formatLabel: 'Journal', contents: [{ id: 'a', title: 'A' }, { id: 'b', title: 'B' }] };
  assert.equal(publicationLabel(paper), 'Whitepaper');
  assert.equal(publicationAction(paper), 'Read paper');
  assert.equal(buildLibraryBookPreview(paper).facts, '1 section · 2026');
  assert.equal(publicationAction(journal), 'Read issue');
  assert.equal(buildLibraryBookPreview(journal).facts, '2 items · 2026');
});

test('preview construction does not mutate publication metadata', () => {
  const snapshot = JSON.stringify(book);
  buildLibraryBookPreview(book, { chapter: 'ch01', offset: 0 }, { maxTags: 1 });
  assert.equal(JSON.stringify(book), snapshot);
});
