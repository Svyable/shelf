import assert from 'node:assert/strict';
await import('./offline-fetch-policy.js');
const policy = globalThis.BookselfOfflineFetchPolicy;

assert.equal(policy.DEFAULT_PUBLICATION_DEADLINE_MS, 1200);
const shell = policy.shellUrlSet(
  ['./', './index.html', './js/app.js'],
  'https://example.test/reader/sw.js'
);
assert.equal(shell.size, 3);
assert.equal(shell.has('https://example.test/reader/'), true);
assert.equal(shell.has('https://example.test/reader/index.html'), true);
assert.equal(shell.has('https://example.test/reader/js/app.js'), true);

assert.equal(policy.isRevisionLookup(
  'https://api.github.com/repos/Svyable/shelf/commits?path=books%2Fdemo%2F&per_page=1'
), true);
assert.equal(policy.isRevisionLookup(
  'https://api.github.com/repos/Svyable/shelf/commits?path=books%2Fdemo%2F&per_page=2'
), false);
assert.equal(policy.isRevisionLookup(
  'https://api.github.com/repos/Svyable/shelf/issues?path=books%2Fdemo%2F&per_page=1'
), false);
assert.equal(policy.isRevisionLookup(
  'https://example.test/repos/Svyable/shelf/commits?path=books%2Fdemo%2F&per_page=1'
), false);
assert.equal(policy.isRevisionLookup('not a url'), false);

assert.equal(policy.classifyRequest('https://example.test/reader/index.html', {
  sameOrigin: true,
  shellUrls: shell,
}), 'shell');
assert.equal(policy.classifyRequest('https://example.test/books/demo/README.md', {
  sameOrigin: true,
  shellUrls: shell,
}), 'publication');
assert.equal(policy.classifyRequest('https://example.test/books/demo/ch01.md?x=1', {
  sameOrigin: true,
  shellUrls: shell,
}), 'publication');
assert.equal(policy.classifyRequest('https://example.test/books/demo/media/cover.webp', {
  sameOrigin: true,
  shellUrls: shell,
}), 'publication');
assert.equal(policy.classifyRequest('https://example.test/docs/help.md', {
  sameOrigin: true,
  shellUrls: shell,
}), 'other');
assert.equal(policy.classifyRequest('https://fonts.gstatic.com/font.woff2', {
  external: true,
}), 'external');
assert.equal(policy.classifyRequest('https://other.test/books/demo/ch01.md', {
  sameOrigin: false,
}), 'other');

assert.equal(policy.responsePlan('shell', true), 'cache-then-network');
assert.equal(policy.responsePlan('shell', false), 'network-first');
assert.equal(policy.responsePlan('external', true), 'cache-then-network');
assert.equal(policy.responsePlan('external', false), 'network-first');
assert.equal(policy.responsePlan('publication', true), 'network-with-cache-deadline');
assert.equal(policy.responsePlan('publication', false), 'network-first');
assert.equal(policy.responsePlan('other', true), 'network-first');
assert.equal(policy.deadlineMs('publication'), 1200);
assert.equal(policy.deadlineMs('publication', 750.4), 750);
assert.equal(policy.deadlineMs('publication', 0), 0);
assert.equal(policy.deadlineMs('shell'), 0);
assert.equal(policy.deadlineMs('other', 3000), 0);

console.log('offline fetch policy tests ok');
