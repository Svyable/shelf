import assert from 'node:assert/strict';
import {
  routeFromHref,
  shouldPrefetchIntent,
  createNavigationPrefetchController,
} from './navigation-prefetch.js';

let assertions = 0;
const eq = (actual, expected, message) => { assert.deepEqual(actual, expected, message); assertions += 1; };
const ok = (value, message) => { assert.ok(value, message); assertions += 1; };

eq(routeFromHref('#/b/long-book/ch09-notes/120'), { slug: 'long-book', chapter: 'ch09-notes' });
eq(routeFromHref('#/b/long-book/'), { slug: 'long-book', chapter: null });
eq(routeFromHref('#/'), null);
eq(routeFromHref('https://example.com/reader/#/b/a%20book/ch%201/0', { base: 'https://example.com/reader/' }), { slug: 'a book', chapter: 'ch 1' });
eq(routeFromHref('https://elsewhere.example/reader/#/b/book/ch1/0', { base: 'https://example.com/reader/' }), null);
eq(routeFromHref('https://example.com/other/#/b/book/ch1/0', { base: 'https://example.com/reader/' }), null);
eq(routeFromHref('#/b/%E0%A4%A'), null);

eq(shouldPrefetchIntent('hover', {}), true);
eq(shouldPrefetchIntent('hover', { saveData: true }), false);
eq(shouldPrefetchIntent('hover', { effectiveType: '2g' }), false);
eq(shouldPrefetchIntent('hover', { effectiveType: '3g' }), true);
eq(shouldPrefetchIntent('focus', { saveData: false }), true);
eq(shouldPrefetchIntent('focus', { saveData: true }), false);
eq(shouldPrefetchIntent('activate', { saveData: true, effectiveType: '2g' }), true);
eq(shouldPrefetchIntent('other', {}), false);

const primes = [];
let timers = [];
const controller = createNavigationPrefetchController({
  prime: (route) => { primes.push(route); return { status: 'primed' }; },
  base: 'https://example.com/reader/',
  hoverDelay: 90,
  setTimer: (fn, delay) => { const token = { fn, delay, cleared: false }; timers.push(token); return token; },
  clearTimer: (token) => { token.cleared = true; },
});

const a = { getAttribute: () => '#/b/book/chapter/0' };
eq(controller.routeFor(a), { slug: 'book', chapter: 'chapter' });
eq(controller.schedule(a), true);
eq(timers[0].delay, 90);
eq(primes.length, 0);
timers[0].fn();
eq(primes, [{ slug: 'book', chapter: 'chapter' }]);

controller.schedule(a);
eq(controller.cancel(a), true);
ok(timers[1].cleared);
eq(controller.cancel(a), false);

await controller.run('#/b/second/ch2/0', 'focus');
eq(primes.at(-1), { slug: 'second', chapter: 'ch2' });
await controller.run('#/', 'activate');
eq(primes.length, 2);

const constrained = createNavigationPrefetchController({
  prime: (route) => primes.push(route),
  connection: { saveData: true, effectiveType: '2g' },
  setTimer: () => { throw new Error('hover should not schedule'); },
});
eq(constrained.schedule('#/b/book/ch1/0'), false);
await constrained.run('#/b/book/ch1/0', 'focus');
eq(primes.length, 2);
await constrained.run('#/b/book/ch1/0', 'activate');
eq(primes.at(-1), { slug: 'book', chapter: 'ch1' });

controller.schedule(a);
controller.destroy();
ok(timers.at(-1).cleared);

console.log(`navigation prefetch tests ok (${assertions} assertions)`);
