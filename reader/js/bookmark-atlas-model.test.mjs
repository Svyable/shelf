import assert from 'node:assert/strict';
import {
  adjacentBookmark,
  bookmarkExcerpt,
  bookmarkKey,
  bookmarkPositionLabel,
  filterBookmarkEntries,
  hasBookmark,
  normalizeBookmarks,
  sortBookmarks,
  toggleBookmark,
} from './bookmark-atlas-model.js';

const legacy = [{ chapter: 'two', offset: 50 }, { chapter: 'one', offset: 4 }, { chapter: 'two', offset: 50 }];
assert.deepEqual(normalizeBookmarks(legacy), [{ chapter: 'two', offset: 50 }, { chapter: 'one', offset: 4 }]);
assert.equal(bookmarkKey({ chapter: 'one', offset: 4.4 }), 'one\u001f4');
assert.equal(hasBookmark(legacy, { chapter: 'two', offset: 50 }), true);
assert.equal(hasBookmark(legacy, { chapter: 'two', offset: 51 }), false);

const removed = toggleBookmark(legacy, { chapter: 'two', offset: 50 });
assert.equal(removed.added, false);
assert.deepEqual(removed.bookmarks, [{ chapter: 'one', offset: 4 }]);
const added = toggleBookmark(removed.bookmarks, { chapter: 'two', offset: 51 });
assert.equal(added.added, true);
assert.deepEqual(added.bookmarks.at(-1), { chapter: 'two', offset: 51 });

assert.deepEqual(sortBookmarks(legacy, ['one', 'two']), [
  { chapter: 'one', offset: 4 },
  { chapter: 'two', offset: 50 },
]);
assert.deepEqual(adjacentBookmark(legacy, { chapter: 'one', offset: 4 }, ['one', 'two'], 1), { chapter: 'two', offset: 50 });
assert.deepEqual(adjacentBookmark(legacy, { chapter: 'one', offset: 4 }, ['one', 'two'], -1), { chapter: 'two', offset: 50 });
assert.deepEqual(adjacentBookmark(legacy, { chapter: 'one', offset: 20 }, ['one', 'two'], 1), { chapter: 'two', offset: 50 });

const md = '# Heading\n\nA first paragraph with **important** words and a [link](https://example.com).\n\nA second paragraph for later.';
const firstOffset = md.indexOf('important');
const excerpt = bookmarkExcerpt(md, firstOffset);
assert.equal(excerpt.includes('important words'), true);
assert.equal(excerpt.includes('https://'), false);

const entries = [
  { chapter: 'one', chapterTitle: 'Arrival', excerpt: 'A red door in winter.' },
  { chapter: 'two', chapterTitle: 'Departure', excerpt: 'The station at dawn.' },
];
assert.deepEqual(filterBookmarkEntries(entries, 'station'), [entries[1]]);
assert.deepEqual(filterBookmarkEntries(entries, 'arrival'), [entries[0]]);
assert.equal(bookmarkPositionLabel(0, 2), 'Bookmark 1 of 2');
assert.equal(bookmarkPositionLabel(2, 0), 'No bookmarks');

console.log('bookmark atlas model tests ok');
