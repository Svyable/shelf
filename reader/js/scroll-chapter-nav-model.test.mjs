import assert from 'node:assert/strict';
import {
  chapterNavigationState,
  chapterNavigatorVisible,
  chapterShortcutAction,
  normalizeChapterList,
} from './scroll-chapter-nav-model.js';

const source = [
  { id: 'one', title: 'One' },
  { id: 'two', title: 'Two' },
  { id: 'two', title: 'Duplicate' },
  { id: '', title: 'No id' },
  { id: 'three', title: '' },
];
const chapters = normalizeChapterList(source);
assert.equal(chapters.length, 3);
assert.deepEqual(chapters.map((chapter) => chapter.id), ['one', 'two', 'three']);
assert.equal(chapters[2].title, 'three');
assert.equal(Object.isFrozen(chapters), true);
assert.equal(Object.isFrozen(chapters[0]), true);

let state = chapterNavigationState(source, 'two');
assert.equal(state.count, 3);
assert.equal(state.index, 1);
assert.equal(state.current.id, 'two');
assert.equal(state.previous.id, 'one');
assert.equal(state.next.id, 'three');
assert.equal(state.label, 'Chapter 2 of 3');
assert.equal(Object.isFrozen(state), true);
state = chapterNavigationState(source, 'missing');
assert.equal(state.current.id, 'one');
assert.equal(state.previous, null);
state = chapterNavigationState(source, 'three');
assert.equal(state.next, null);
state = chapterNavigationState([], 'none');
assert.equal(state.index, -1);
assert.equal(state.label, 'No chapters');

assert.equal(chapterNavigatorVisible({ stage: 'read', mode: 'scroll' }), true);
assert.equal(chapterNavigatorVisible({ stage: 'read', mode: 'paged' }), false);
assert.equal(chapterNavigatorVisible({ stage: 'cover', mode: 'scroll' }), false);
assert.equal(chapterNavigatorVisible({ stage: 'read', mode: 'scroll', chromeHidden: true }), false);
assert.equal(chapterNavigatorVisible({ stage: 'read', mode: 'scroll', overlayOpen: true }), false);

assert.equal(chapterShortcutAction({ key: 'ArrowUp', altKey: true }), 'previous');
assert.equal(chapterShortcutAction({ key: 'ArrowDown', altKey: true }), 'next');
assert.equal(chapterShortcutAction({ key: 'ArrowDown' }), null);
assert.equal(chapterShortcutAction({ key: 'ArrowDown', altKey: true, ctrlKey: true }), null);
assert.equal(chapterShortcutAction({ key: 'ArrowDown', altKey: true, shiftKey: true }), null);
assert.equal(chapterShortcutAction({ key: 'ArrowLeft', altKey: true }), null);
console.log('scroll chapter navigator model tests ok (28 assertions)');
