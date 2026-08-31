import assert from 'node:assert/strict';
import {
  PREVIEW_MAX_CHARS,
  PREVIEW_MAX_PARAGRAPHS,
  normalizeReadRoute,
  selectPreviewChapter,
  projectPreviewParagraphs,
  shouldShowPreview,
  previewCompletionState,
} from './direct-route-preview-model.js';

let assertions = 0;
const eq = (actual, expected) => { assert.deepEqual(actual, expected); assertions += 1; };
const ok = (value) => { assert.ok(value); assertions += 1; };

eq(normalizeReadRoute(null), null);
eq(normalizeReadRoute({ view: 'cover', slug: 'a' }), null);
eq(normalizeReadRoute({ view: 'read' }), null);
eq(normalizeReadRoute({ view: 'read', slug: 'a', chapter: 'ch2', offset: -3 }), { slug: 'a', chapter: 'ch2', offset: 0 });
eq(normalizeReadRoute({ view: 'read', slug: 'a', offset: '42' }), { slug: 'a', chapter: '', offset: 42 });

const contents = [{ id: 'front', file: 'front.md' }, { id: 'ch2', file: 'ch2.md' }];
eq(selectPreviewChapter(contents, 'ch2').id, 'ch2');
eq(selectPreviewChapter(contents, 'missing').id, 'front');
eq(selectPreviewChapter([], 'ch2'), null);
eq(selectPreviewChapter([{ id: 'bad' }], 'bad'), null);

const projected = projectPreviewParagraphs('# Heading\n\nFirst *paragraph* with [link](https://example.com).\n\n> Second line.');
eq(projected[0], 'Heading');
eq(projected[1], 'First paragraph with link.');
eq(projected[2], 'Second line.');
eq(projectPreviewParagraphs('Before\n\nAfter', 8)[0], 'After');
eq(projectPreviewParagraphs('![Alt](../media/a.png)\n\n[[ch02|Next]]\n\n[@x|Smith 2026]')[0], 'Alt');
eq(projectPreviewParagraphs('![Alt](../media/a.png)\n\n[[ch02|Next]]\n\n[@x|Smith 2026]')[1], 'Next');
eq(projectPreviewParagraphs('![Alt](../media/a.png)\n\n[[ch02|Next]]\n\n[@x|Smith 2026]')[2], 'Smith 2026');
eq(projectPreviewParagraphs('```js\nalert(1)\n```\n\nReadable')[0], 'Readable');
eq(projectPreviewParagraphs('One\n\nTwo\n\nThree', 0, { maxParagraphs: 2 }), ['One', 'Two']);
ok(projectPreviewParagraphs('x'.repeat(PREVIEW_MAX_CHARS + 100))[0].endsWith('…'));
ok(projectPreviewParagraphs(Array.from({length: 20}, (_, i) => `P${i}`).join('\n\n')).length <= PREVIEW_MAX_PARAGRAPHS);

ok(shouldShowPreview({ route: { view: 'read', slug: 'a' }, canonicalReady: false, stage: 'library' }));
eq(shouldShowPreview({ route: { view: 'read', slug: 'a' }, canonicalReady: true, stage: 'read' }), false);
eq(shouldShowPreview({ route: { view: 'cover', slug: 'a' }, canonicalReady: false, stage: 'library' }), false);
eq(shouldShowPreview({ route: { view: 'read', slug: 'a' }, canonicalReady: false, stage: 'cover' }), false);

eq(previewCompletionState({ stage: 'library' }), 'dismiss');
eq(previewCompletionState({ stage: 'read', hasPagedContent: true }), 'dismiss');
eq(previewCompletionState({ stage: 'read', hasContinuousContent: true }), 'dismiss');
eq(previewCompletionState({ stage: 'read', hasPagedContent: false, hasContinuousContent: false }), 'keep');
eq(previewCompletionState({ stage: 'loading' }), 'keep');

console.log(`direct route preview model tests ok (${assertions} assertions)`);
