import assert from 'node:assert/strict';

delete globalThis.window;
delete globalThis.document;

const base = await import('./base.js');

assert.equal(typeof base.fileUrl, 'function');
assert.equal(typeof base.fetchText, 'function');

console.log('Reader base Node import boundary ok');
