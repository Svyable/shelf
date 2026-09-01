import assert from 'node:assert/strict';
import {
  anchorChanged,
  anchorMatchesProjectedQuote,
  normalizedAnchorText,
  projectedTextForAnchor,
  quoteMatchesText,
  recoverQuoteAnchor,
} from './annotation-anchor-model.js';

const text = 'Opening line. The café’s blue door is here. Later, the café’s blue door is here again.';
const sourceMap = [...text].map((_, index) => index + 100);

assert.equal(normalizedAnchorText('  Café’s   BLUE—door '), "cafe's blue-door");
assert.equal(quoteMatchesText('The café’s blue door is here.', 'cafe’s blue door'), true);
assert.equal(quoteMatchesText('Completely different passage', 'café’s blue door'), false);
assert.equal(projectedTextForAnchor(text, sourceMap, { start: 114, end: 142 }), 'The café’s blue door is here.');
assert.equal(anchorMatchesProjectedQuote(text, sourceMap, { start: 114, end: 142 }, 'The café’s blue door is here.'), true);
assert.equal(anchorMatchesProjectedQuote(text, sourceMap, { start: 100, end: 112 }, 'The café’s blue door is here.'), false);

const recoveredNearFirst = recoverQuoteAnchor(text, sourceMap, 'the cafe’s blue door is here', { start: 118, end: 140 });
assert.deepEqual(recoveredNearFirst, { version: 1, start: 114, end: 142 });

const recoveredNearSecond = recoverQuoteAnchor(text, sourceMap, 'the café’s blue door is here', { start: 175, end: 200 });
assert.deepEqual(recoveredNearSecond, { version: 1, start: 151, end: 179 });
assert.equal(anchorChanged({ start: 114, end: 142 }, recoveredNearFirst), false);
assert.equal(anchorChanged({ start: 100, end: 120 }, recoveredNearFirst), true);
assert.equal(recoverQuoteAnchor(text, sourceMap, 'tiny', { start: 100, end: 101 }), null);
assert.equal(recoverQuoteAnchor('No match here', [...'No match here'].map((_, i) => i), 'missing quote', null), null);

console.log('annotation-anchor-model: 12 assertions passed');
