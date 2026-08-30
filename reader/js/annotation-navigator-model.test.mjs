import assert from 'node:assert/strict';
import {
  filterNotes,
  neighboringNoteIndex,
  noteStatus,
  noteTarget,
  orderNotes,
} from './annotation-navigator-model.js';

const notes = [
  { id: 'c', chapter: 'ch02', offset: 90, quote: 'Third quote', body: 'Later', createdAt: 3 },
  { id: 'a', chapter: 'ch01', anchor: { start: 42, end: 60 }, quote: 'First quote', body: 'Important idea', createdAt: 1 },
  { id: 'b', chapter: 'ch01', offset: 80, quote: 'Second quote', body: '', createdAt: 2 },
];

assert.deepEqual(noteTarget(notes[1]), { chapter: 'ch01', offset: 42 });
assert.deepEqual(noteTarget({ chapter: 'ch01', offset: -4 }), { chapter: 'ch01', offset: 0 });
assert.equal(noteTarget({ offset: 4 }), null);
assert.deepEqual(orderNotes(notes, ['ch01', 'ch02']).map((note) => note.id), ['a', 'b', 'c']);
assert.deepEqual(filterNotes(notes, 'important').map((note) => note.id), ['a']);
assert.deepEqual(filterNotes(notes, 'chapter two', { ch02: 'Chapter Two' }).map((note) => note.id), ['c']);
assert.equal(neighboringNoteIndex(0, 3, -1), 2);
assert.equal(neighboringNoteIndex(2, 3, 1), 0);
assert.equal(neighboringNoteIndex(0, 0, 1), -1);
assert.equal(noteStatus(1, 3), 'Note 2 of 3');
assert.equal(noteStatus(0, 0), 'No notes');

console.log('annotation navigator model tests ok');
