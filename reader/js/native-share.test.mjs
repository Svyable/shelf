import assert from 'node:assert/strict';
import {
  nativeShareAvailable,
  shareActionLabel,
  shareFallbackText,
  shareOrCopy,
} from './native-share.js';

let cases = 0;
const check = async (run) => {
  await run();
  cases += 1;
};

await check(() => assert.equal(nativeShareAvailable({}), false));
await check(() => assert.equal(shareActionLabel({ share() {} }), 'Share'));
await check(() => assert.equal(shareActionLabel({}), 'Copy link'));
await check(() => assert.equal(
  shareFallbackText({ text: '“Passage”', url: 'https://example.test/#/b/book/read/chapter' }),
  '“Passage”\nhttps://example.test/#/b/book/read/chapter'
));

await check(async () => {
  let sharedPayload = null;
  let copied = null;
  const result = await shareOrCopy({
    navigatorLike: { share: async (payload) => { sharedPayload = payload; } },
    title: 'Chapter — Book',
    url: 'https://example.test/#/book',
    copy: async (value) => { copied = value; },
  });
  assert.equal(result, 'shared');
  assert.deepEqual(sharedPayload, { title: 'Chapter — Book', url: 'https://example.test/#/book' });
  assert.equal(copied, null);
});

await check(async () => {
  let fallbackCalls = 0;
  const result = await shareOrCopy({
    navigatorLike: { share: async () => { throw Object.assign(new Error('cancel'), { name: 'AbortError' }); } },
    url: 'https://example.test/',
    copy: async () => { fallbackCalls += 1; },
  });
  assert.equal(result, 'cancelled');
  assert.equal(fallbackCalls, 0);
});

await check(async () => {
  let fallback = '';
  const result = await shareOrCopy({
    navigatorLike: { share: async () => { throw new Error('share unavailable'); } },
    text: '“Passage”',
    url: 'https://example.test/#/passage',
    copy: async (value) => { fallback = value; },
  });
  assert.equal(result, 'copied');
  assert.equal(fallback, '“Passage”\nhttps://example.test/#/passage');
});

await check(async () => {
  let fallback = '';
  const result = await shareOrCopy({
    navigatorLike: {},
    url: 'https://example.test/#/copy-only',
    copy: async (value) => { fallback = value; },
  });
  assert.equal(result, 'copied');
  assert.equal(fallback, 'https://example.test/#/copy-only');
});

console.log(`native share model tests ok (${cases} cases)`);
