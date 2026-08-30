import assert from 'node:assert/strict';
import {
  READER_FONT_LIBRARY_HREF,
  readerFontDefinition,
  readerFontRequest,
  readerFontRequestKey,
  readerFontNeedsLibrary,
  readerFontCanAffectPagination,
} from './font-readiness.js';

assert.equal(readerFontDefinition('modern').family, 'IBM Plex Sans');
assert.equal(readerFontDefinition('clear').family, 'Atkinson Hyperlegible');
assert.equal(readerFontDefinition('missing').family, 'Source Serif 4');

assert.equal(readerFontNeedsLibrary('literary'), true);
assert.equal(readerFontNeedsLibrary('warm'), true);
assert.equal(readerFontNeedsLibrary('modern'), true);
assert.equal(readerFontNeedsLibrary('clear'), true);
assert.equal(readerFontNeedsLibrary('classic'), false);
assert.equal(readerFontNeedsLibrary('system'), false);

assert.equal(readerFontCanAffectPagination('book'), true);
assert.equal(readerFontCanAffectPagination('modern'), true);
assert.equal(readerFontCanAffectPagination('classic'), false);

assert.deepEqual(readerFontRequest('clear', 600, 18), {
  name: 'clear',
  family: 'Atkinson Hyperlegible',
  source: 'library',
  weight: 700,
  probe: '700 18px "Atkinson Hyperlegible"',
});
assert.equal(readerFontRequest('book', 500).weight, 400);
assert.equal(readerFontRequest('modern', 500).weight, 500);
assert.equal(readerFontRequestKey('literary', 600), 'literary:600');

assert.match(READER_FONT_LIBRARY_HREF, /family=IBM\+Plex\+Sans/);
assert.match(READER_FONT_LIBRARY_HREF, /family=Atkinson\+Hyperlegible/);
assert.match(READER_FONT_LIBRARY_HREF, /family=Literata/);
assert.match(READER_FONT_LIBRARY_HREF, /family=Lora/);

console.log('font readiness tests ok');
