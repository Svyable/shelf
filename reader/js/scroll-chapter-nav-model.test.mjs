import assert from 'node:assert/strict';
import {
  chapterNavigationState,
  chapterNavigatorVisible,
  chapterShortcutAction,
  normalizeChapterList,
  normalizeSectionList,
  readingNavigatorVisible,
  sectionNavigationState,
  sectionShortcutAction,
} from './scroll-chapter-nav-model.js';

let assertions = 0;
const equal = (actual, expected) => {
  assert.deepEqual(actual, expected);
  assertions += 1;
};

const source = [
  { id: 'one', title: 'One' },
  { id: 'two', title: 'Two' },
  { id: 'two', title: 'Duplicate' },
  { id: '', title: 'No id' },
  { id: 'three', title: '' },
];
const chapters = normalizeChapterList(source);
equal(chapters.length, 3);
equal(chapters.map((chapter) => chapter.id), ['one', 'two', 'three']);
equal(chapters[2].title, 'three');
equal(Object.isFrozen(chapters), true);
equal(Object.isFrozen(chapters[0]), true);

let state = chapterNavigationState(source, 'two');
equal(state.count, 3);
equal(state.index, 1);
equal(state.current.id, 'two');
equal(state.previous.id, 'one');
equal(state.next.id, 'three');
equal(state.label, 'Chapter 2 of 3');
equal(Object.isFrozen(state), true);
state = chapterNavigationState(source, 'missing');
equal(state.current.id, 'one');
equal(state.previous, null);
state = chapterNavigationState(source, 'three');
equal(state.next, null);
state = chapterNavigationState([], 'none');
equal(state.index, -1);
equal(state.label, 'No chapters');

equal(chapterNavigatorVisible({ stage: 'read', mode: 'scroll' }), true);
equal(chapterNavigatorVisible({ stage: 'read', mode: 'paged' }), false);
equal(readingNavigatorVisible({ stage: 'read' }), true);
equal(readingNavigatorVisible({ stage: 'cover' }), false);
equal(readingNavigatorVisible({ stage: 'read', chromeHidden: true }), false);
equal(readingNavigatorVisible({ stage: 'read', overlayOpen: true }), false);

equal(chapterShortcutAction({ key: 'ArrowUp', altKey: true }), 'previous');
equal(chapterShortcutAction({ key: 'ArrowDown', altKey: true }), 'next');
equal(chapterShortcutAction({ key: 'ArrowDown' }), null);
equal(chapterShortcutAction({ key: 'ArrowDown', altKey: true, ctrlKey: true }), null);

const sections = normalizeSectionList([
  { offset: 80, title: 'B' },
  { offset: 10, title: 'A' },
  { offset: 80, title: 'Duplicate' },
  { offset: -5, title: 'Opening' },
  { offset: 120, title: '' },
]);
equal(sections.map((section) => [section.offset, section.title]), [[0, 'Opening'], [10, 'A'], [80, 'B']]);
equal(Object.isFrozen(sections), true);
equal(Object.isFrozen(sections[0]), true);

let section = sectionNavigationState(sections, 0);
equal(section.current.title, 'Opening');
equal(section.previous, null);
equal(section.next.title, 'A');
equal(section.label, 'Section 1 of 3');
section = sectionNavigationState(sections, 79);
equal(section.current.title, 'A');
equal(section.previous.title, 'Opening');
equal(section.next.title, 'B');
section = sectionNavigationState(sections, 999);
equal(section.current.title, 'B');
equal(section.next, null);
section = sectionNavigationState([{ offset: 30, title: 'First' }], 0);
equal(section.current, null);
equal(section.next.title, 'First');
equal(section.label, '1 sections');
section = sectionNavigationState([], 0);
equal(section.label, 'No sections');

equal(sectionShortcutAction({ key: '[', altKey: true }), 'previous');
equal(sectionShortcutAction({ key: ']', altKey: true }), 'next');
equal(sectionShortcutAction({ key: ']', altKey: true, shiftKey: true }), null);
equal(sectionShortcutAction({ key: 'ArrowRight', altKey: true }), null);

console.log(`reading navigator model tests ok (${assertions} assertions)`);
