import assert from 'node:assert/strict';
import {
  headingOffsets,
  installMarkedWiki,
  renderWikiLink,
  tokenizeWikiLink,
} from './markdown.js';

const source = '[[ch02-writing|Continue here]]';
assert.deepEqual(tokenizeWikiLink(source), {
  raw: source,
  id: 'ch02-writing',
  label: 'Continue here',
});
assert.equal(tokenizeWikiLink(source).raw.length, source.length);

assert.deepEqual(tokenizeWikiLink('[[manuscript/front-matter.md|Start]]'), {
  raw: '[[manuscript/front-matter.md|Start]]',
  id: 'front-matter',
  label: 'Start',
});
assert.equal(tokenizeWikiLink('[[../private|Nope]]'), null);
assert.equal(tokenizeWikiLink('plain text'), null);

assert.equal(
  renderWikiLink({ id: 'ch02-writing', label: 'Continue here' }, 'demo-book'),
  '<a href="#/b/demo-book/ch02-writing/0" data-internal="1">Continue here</a>'
);
assert.equal(
  renderWikiLink({ id: 'ch02-writing', label: '<Next>' }, 'demo-book'),
  '<a href="#/b/demo-book/ch02-writing/0" data-internal="1">&lt;Next&gt;</a>'
);

let extensionConfig = null;
const fakeMarked = {
  use(config) {
    extensionConfig = config;
  },
};
assert.equal(installMarkedWiki(fakeMarked), true);
assert.equal(extensionConfig.extensions.length, 1);
const extension = extensionConfig.extensions[0];
assert.equal(extension.start('words [[ch01-opening]]'), 6);
assert.equal(extension.tokenizer('[[ch01-opening]] rest').raw, '[[ch01-opening]]');

const markdown = '# One\n\nSee [[ch02-writing|next]].\n\n## Later\n\nText.\n';
assert.equal(headingOffsets(markdown)[1].offset, markdown.indexOf('## Later'));

console.log('markdown wiki-link tests ok');
