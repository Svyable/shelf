import assert from 'node:assert/strict';
import {
  readerClaimsKey,
  shouldProtectNativeKey,
  pageRegionLabel,
} from './reader-keyboard-policy.js';

assert.equal(readerClaimsKey('ArrowRight'), true);
assert.equal(readerClaimsKey('Enter'), true);
assert.equal(readerClaimsKey('Escape'), false);
assert.equal(shouldProtectNativeKey({ key: 'ArrowRight', interactive: true }), true);
assert.equal(shouldProtectNativeKey({ key: ' ', interactive: true }), true);
assert.equal(shouldProtectNativeKey({ key: 'Enter', interactive: true }), true);
assert.equal(shouldProtectNativeKey({ key: 'b', ctrlKey: true }), true);
assert.equal(shouldProtectNativeKey({ key: 's', metaKey: true }), true);
assert.equal(shouldProtectNativeKey({ key: 'f', altKey: true }), true);
assert.equal(shouldProtectNativeKey({ key: '/', dialogOpen: true }), true);
assert.equal(shouldProtectNativeKey({ key: 'ArrowLeft', composing: true }), true);
assert.equal(shouldProtectNativeKey({ key: 'b', repeat: true }), true);
assert.equal(shouldProtectNativeKey({ key: ' ', repeat: true }), true);
assert.equal(shouldProtectNativeKey({ key: 'ArrowRight', repeat: true }), false);
assert.equal(shouldProtectNativeKey({ key: 'ArrowRight' }), false);
assert.equal(shouldProtectNativeKey({ key: '?', ctrlKey: false }), false);
assert.equal(pageRegionLabel({ chapter: 'Methods', page: '12' }), 'Methods, page 12');
assert.equal(pageRegionLabel({ chapter: 'Methods', page: '13', side: 'right', spread: true }), 'Methods, page 13, right page');
assert.equal(pageRegionLabel({}), 'Reading page');

console.log('reader keyboard policy tests ok');
