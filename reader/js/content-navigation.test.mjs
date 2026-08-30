import assert from 'node:assert/strict';
import { horizontalKeyDestination, overflowInstruction, overflowState } from './content-navigation.js';

assert.deepEqual(
  overflowState({ scrollLeft: 0, scrollWidth: 900, clientWidth: 400 }),
  { overflow: true, atStart: true, atEnd: false, max: 500 }
);
assert.equal(horizontalKeyDestination({ key: 'ArrowRight', scrollLeft: 0, scrollWidth: 900, clientWidth: 400 }), 72);
assert.equal(horizontalKeyDestination({ key: 'ArrowLeft', scrollLeft: 72, scrollWidth: 900, clientWidth: 400 }), 0);
assert.equal(horizontalKeyDestination({ key: 'End', scrollLeft: 0, scrollWidth: 900, clientWidth: 400 }), 500);
assert.equal(horizontalKeyDestination({ key: 'Home', scrollLeft: 500, scrollWidth: 900, clientWidth: 400 }), 0);
assert.equal(horizontalKeyDestination({ key: 'PageDown', shiftKey: true, scrollLeft: 0, scrollWidth: 900, clientWidth: 400 }), 328);
assert.equal(horizontalKeyDestination({ key: 'PageUp', shiftKey: true, scrollLeft: 500, scrollWidth: 900, clientWidth: 400 }), 172);
assert.equal(horizontalKeyDestination({ key: 'ArrowRight', scrollLeft: 0, scrollWidth: 400, clientWidth: 400 }), null);
assert.match(overflowInstruction('table'), /Scrollable table/);
assert.match(overflowInstruction('code'), /Scrollable code block/);
assert.match(overflowInstruction('math'), /Scrollable equation/);

console.log('content navigation tests ok');