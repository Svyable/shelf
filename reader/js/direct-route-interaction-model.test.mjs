import assert from 'node:assert/strict';
import {
  bookmarkMatches,
  normalizePreviewBookmark,
  normalizePreviewSelection,
  previewInteractionState,
  previewVisibleOffset,
  togglePreviewBookmark,
} from './direct-route-interaction-model.js';

let assertions = 0;
const eq = (actual, expected) => { assertions += 1; assert.deepEqual(actual, expected); };
const ok = (value) => { assertions += 1; assert.ok(value); };

eq(normalizePreviewBookmark({ chapter: ' ch-2 ', offset: 42.7 }), { chapter: 'ch-2', offset: 43 });
eq(normalizePreviewBookmark({ chapter: '', offset: 3 }), null);
ok(bookmarkMatches({ chapter: 'c1', offset: 4 }, { chapter: 'c1', offset: 4 }));
eq(bookmarkMatches({ chapter: 'c1', offset: 4 }, { chapter: 'c1', offset: 5 }), false);

let toggled = togglePreviewBookmark([{ chapter: 'c1', offset: 1 }], { chapter: 'c1', offset: 7 });
eq(toggled.active, true);
eq(toggled.changed, true);
eq(toggled.bookmarks, [{ chapter: 'c1', offset: 1 }, { chapter: 'c1', offset: 7 }]);
toggled = togglePreviewBookmark(toggled.bookmarks, { chapter: 'c1', offset: 7 });
eq(toggled.active, false);
eq(toggled.bookmarks, [{ chapter: 'c1', offset: 1 }]);

const entries = [
  { start: 10, top: 20, bottom: 90 },
  { start: 80, top: 90, bottom: 180 },
  { start: 160, top: 180, bottom: 260 },
];
eq(previewVisibleOffset(entries, 110, 0), 80);
eq(previewVisibleOffset(entries, 12, 5), 10);
eq(previewVisibleOffset([], 50, 9.4), 9);

const selection = normalizePreviewSelection('  a   selected\n passage ', { start: 11, end: 22 });
eq(selection, { quote: 'a selected passage', anchor: { version: 1, start: 11, end: 22 }, offset: 11 });
eq(normalizePreviewSelection('text', { start: 4, end: 4 }), null);
const longText = 'x'.repeat(1600);
const long = normalizePreviewSelection(longText, { start: 1, end: 1700 });
eq(long.quote.length, 1600);

eq(previewInteractionState({ stage: 'read', hasPreview: true, routeMatches: true, selection }), { active: true, canBookmark: true, canAnnotate: true });
eq(previewInteractionState({ stage: 'read', hasPreview: true, routeMatches: true }), { active: true, canBookmark: true, canAnnotate: false });
eq(previewInteractionState({ stage: 'library', hasPreview: true, routeMatches: true, selection }), { active: true, canBookmark: true, canAnnotate: true });
eq(previewInteractionState({ stage: 'cover', hasPreview: true, routeMatches: true, selection }), { active: false, canBookmark: false, canAnnotate: false });
eq(previewInteractionState({ stage: 'end', hasPreview: true, routeMatches: true, selection }), { active: false, canBookmark: false, canAnnotate: false });
eq(previewInteractionState({ stage: 'read', hasPreview: true, routeMatches: false, selection }), { active: false, canBookmark: false, canAnnotate: false });

console.log(`direct-route interaction model tests ok (${assertions} assertions)`);
