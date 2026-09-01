import assert from 'node:assert/strict';
import {
  PREVIEW_APPEND_BLOCKS,
  PREVIEW_INITIAL_BLOCKS,
  PREVIEW_MAX_CHARS,
  PREVIEW_MAX_PARAGRAPHS,
  appendPreviewBlockWindow,
  handoffPreviewOffset,
  normalizeReadRoute,
  previewAnchorOffset,
  previewBlockIndex,
  previewBlockWindow,
  samePreviewRoute,
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

const routeA = normalizeReadRoute({ view: 'read', slug: 'a', chapter: 'ch2', offset: 42 });
eq(samePreviewRoute(routeA, normalizeReadRoute({ view: 'read', slug: 'a', chapter: 'ch2', offset: 42 })), true);
eq(samePreviewRoute(routeA, normalizeReadRoute({ view: 'read', slug: 'a', chapter: 'ch3', offset: 42 })), false);
eq(samePreviewRoute(routeA, null), false);

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
ok(projectPreviewParagraphs(Array.from({ length: 20 }, (_, i) => `P${i}`).join('\n\n')).length <= PREVIEW_MAX_PARAGRAPHS);

const blocks = Array.from({ length: 60 }, (_, index) => ({
  start: index * 100,
  end: (index + 1) * 100,
  html: `<p>${index}</p>`,
}));
eq(previewBlockIndex(blocks, 0), 0);
eq(previewBlockIndex(blocks, 250), 2);
eq(previewBlockIndex(blocks, 99999), 59);
const initial = previewBlockWindow(blocks, 2150);
eq(initial.startIndex, 21);
eq(initial.blocks.length, PREVIEW_INITIAL_BLOCKS);
eq(initial.nextIndex, 45);
eq(initial.complete, false);
const tail = appendPreviewBlockWindow(blocks, initial.nextIndex);
eq(tail.startIndex, 45);
eq(tail.blocks.length, 15);
eq(tail.nextIndex, 60);
eq(tail.complete, true);
eq(appendPreviewBlockWindow(blocks, 0).blocks.length, PREVIEW_APPEND_BLOCKS);
const empty = previewBlockWindow([], 0);
eq(empty.complete, true);
eq(empty.blocks.length, 0);
const visible = [
  { start: 100, top: -80, bottom: 20 },
  { start: 200, top: 20, bottom: 180 },
  { start: 300, top: 180, bottom: 340 },
];
eq(previewAnchorOffset(visible, 90, 0), 200);
eq(previewAnchorOffset(visible, 350, 0), 300);
eq(previewAnchorOffset([], 90, 44), 44);
eq(handoffPreviewOffset({ initialOffset: 100, visibleOffset: 420, routeMatches: true }), 420);
eq(handoffPreviewOffset({ initialOffset: 100, visibleOffset: 420, routeMatches: false }), 100);

ok(shouldShowPreview({ route: { view: 'read', slug: 'a' }, canonicalReady: false, stage: 'library' }));
eq(shouldShowPreview({ route: { view: 'read', slug: 'a' }, canonicalReady: true, stage: 'read' }), false);
eq(shouldShowPreview({ route: { view: 'cover', slug: 'a' }, canonicalReady: false, stage: 'library' }), false);
eq(shouldShowPreview({ route: { view: 'read', slug: 'a' }, canonicalReady: false, stage: 'cover' }), false);

eq(previewCompletionState({ stage: 'library' }), 'keep');
eq(previewCompletionState({ stage: 'read', hasPagedContent: true }), 'dismiss');
eq(previewCompletionState({ stage: 'read', hasContinuousContent: true }), 'dismiss');
eq(previewCompletionState({ stage: 'read', hasPagedContent: false, hasContinuousContent: false }), 'keep');
eq(previewCompletionState({ stage: 'cover' }), 'dismiss');
eq(previewCompletionState({ stage: 'loading' }), 'keep');

console.log(`direct route reading bridge model tests ok (${assertions} assertions)`);
