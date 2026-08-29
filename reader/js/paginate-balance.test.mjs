import assert from 'node:assert/strict';
import { balancedStructuredBreakIndex } from './paginate.js';

// A structure beginning in leftover page space should move intact when only
// one item/row fits there and a useful continuation remains.
assert.equal(balancedStructuredBreakIndex(1, 0, 6, true), 0);

// A terminal singleton is rebalanced into a 2/2 continuation when possible.
assert.equal(balancedStructuredBreakIndex(3, 0, 4, false), 2);
assert.equal(balancedStructuredBreakIndex(6, 2, 7, false), 5);

// Do not manufacture impossible balance for very small structures.
assert.equal(balancedStructuredBreakIndex(1, 0, 2, true), 1);
assert.equal(balancedStructuredBreakIndex(2, 0, 3, false), 2);

// Complete fits and invalid/non-progressing breaks remain unchanged.
assert.equal(balancedStructuredBreakIndex(6, 0, 6, true), 6);
assert.equal(balancedStructuredBreakIndex(0, 0, 6, true), 0);

console.log('paginate structured-balance tests passed');
