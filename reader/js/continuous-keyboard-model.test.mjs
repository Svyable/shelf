import assert from 'node:assert/strict';
import {
  continuousKeyboardCommand,
  continuousScrollDelta,
  continuousEdgeTarget,
} from './continuous-keyboard-model.js';

const active = { mode: 'scroll', stage: 'read', overlayOpen: false, editable: false };

assert.deepEqual(continuousKeyboardCommand({ key: 'ArrowUp' }, active), { type: 'line', direction: -1 });
assert.deepEqual(continuousKeyboardCommand({ key: 'ArrowDown' }, active), { type: 'line', direction: 1 });
assert.deepEqual(continuousKeyboardCommand({ key: 'PageUp' }, active), { type: 'page', direction: -1 });
assert.deepEqual(continuousKeyboardCommand({ key: 'PageDown' }, active), { type: 'page', direction: 1 });
assert.deepEqual(continuousKeyboardCommand({ key: ' ' }, active), { type: 'page', direction: 1 });
assert.deepEqual(continuousKeyboardCommand({ key: ' ', shiftKey: true }, active), { type: 'page', direction: -1 });
assert.deepEqual(continuousKeyboardCommand({ key: 'Home' }, active), { type: 'edge', edge: 'start' });
assert.deepEqual(continuousKeyboardCommand({ key: 'End' }, active), { type: 'edge', edge: 'end' });
assert.deepEqual(continuousKeyboardCommand({ key: 'ArrowLeft' }, active), { type: 'consume' });
assert.deepEqual(continuousKeyboardCommand({ key: 'ArrowRight' }, active), { type: 'consume' });
assert.equal(continuousKeyboardCommand({ key: 'ArrowDown', ctrlKey: true }, active), null);
assert.equal(continuousKeyboardCommand({ key: 'ArrowDown' }, { ...active, mode: 'paged' }), null);
assert.equal(continuousKeyboardCommand({ key: 'ArrowDown' }, { ...active, overlayOpen: true }), null);
assert.equal(continuousKeyboardCommand({ key: 'ArrowDown' }, { ...active, editable: true }), null);

assert.equal(continuousScrollDelta({ type: 'line', direction: 1 }, { viewport: 800, lineHeight: 24 }), 72);
assert.equal(continuousScrollDelta({ type: 'line', direction: -1 }, { viewport: 800, lineHeight: 12 }), -48);
assert.equal(continuousScrollDelta({ type: 'line', direction: 1 }, { viewport: 800, lineHeight: 60 }), 120);
assert.equal(continuousScrollDelta({ type: 'page', direction: 1 }, { viewport: 800, lineHeight: 24 }), 656);
assert.equal(continuousScrollDelta({ type: 'page', direction: -1 }, { viewport: 100, lineHeight: 24 }), -160);
assert.equal(continuousEdgeTarget({ type: 'edge', edge: 'start' }, { viewport: 800, scrollHeight: 5000 }), 0);
assert.equal(continuousEdgeTarget({ type: 'edge', edge: 'end' }, { viewport: 800, scrollHeight: 5000 }), 4200);
assert.equal(continuousEdgeTarget({ type: 'edge', edge: 'end' }, { viewport: 900, scrollHeight: 600 }), 0);

console.log('continuous keyboard model tests ok (22 assertions)');
