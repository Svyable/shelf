import { parseHash, parseQuery } from './router.js';
import assert from 'node:assert/strict';

assert.equal(parseHash('#/').view, 'binder');
assert.equal(parseHash('#/b/the-example-book/').view, 'cover');
assert.equal(parseHash('#/b/the-example-book/ch01-x/12').chapter, 'ch01-x');
assert.equal(parseHash('#/b/the-example-book/ch01-x/12').offset, 12);

const q = parseQuery('?b=the-example-book&c=ch01-x&o=12');
assert.equal(q.view, 'read');
assert.equal(q.slug, 'the-example-book');
assert.equal(q.chapter, 'ch01-x');
assert.equal(q.offset, 12);
assert.equal(parseQuery(''), null);
assert.equal(parseQuery('?b=river-book').view, 'cover');

console.log('router tests ok');
