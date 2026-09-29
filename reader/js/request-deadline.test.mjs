import assert from 'node:assert/strict';
import { test } from 'node:test';
import { requestWithDeadline } from './request-deadline.js';

const originalFetch = globalThis.fetch;
test('request deadlines cover headers and stalled bodies without blocking later requests', async () => {
  try {
    let signal;
    globalThis.fetch = async (_, options) => {
      signal = options.signal;
      return new Promise(() => {});
    };
    await assert.rejects(requestWithDeadline('/stalled', {}, undefined, 10), { name: 'TimeoutError' });
    assert.equal(signal.aborted, true);
    globalThis.fetch = async (_, options) => {
      signal = options.signal;
      return { text: () => new Promise(() => {}) };
    };
    await assert.rejects(requestWithDeadline('/body', {}, r => r.text(), 10), { name: 'TimeoutError' });
    assert.equal(signal.aborted, true);
    globalThis.fetch = async () => new Response('ready');
    assert.equal(await requestWithDeadline('/retry', {}, r => r.text(), 100), 'ready');
    globalThis.fetch = async () => { throw new TypeError('offline'); };
    await assert.rejects(requestWithDeadline('/offline'), /offline/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
