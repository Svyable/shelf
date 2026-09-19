import assert from 'node:assert/strict';
const markedModule = await import('../vendor/marked.min.js');
const marked = markedModule.marked || markedModule.default?.marked || globalThis.marked;
assert.equal(typeof marked?.parse, 'function');
globalThis.window = {
  marked,
  location: { pathname: '/reader/' },
};
const { bookAsHtml, bookAsMarkdown } = await import('./export.js');

const book = {
  slug: 'example',
  title: 'Example Work',
  authors: 'Ada Example',
  year: '2026',
  rights: '© 2026 Ada Example · All Rights Reserved',
  aiUse: 'AI training, retrieval/grounding, indexing, and generative use reserved',
  chapters: [{ markdown: '# Chapter One\n\nText.' }],
};

const md = bookAsMarkdown(book);
assert.match(md, /## Rights & permissions/);
assert.match(md, /© 2026 Ada Example\. All Rights Reserved\./);
assert.match(md, /AI training, retrieval\/grounding, indexing, and generative use reserved\./);

const html = bookAsHtml(book);
assert.match(html, /name="copyright" content="© 2026 Ada Example\. All Rights Reserved\."/);
assert.match(html, /id="rights-and-permissions"/);
assert.match(html, /AI training, retrieval\/grounding, indexing, and generative use reserved\./);

console.log('export rights tests ok');
