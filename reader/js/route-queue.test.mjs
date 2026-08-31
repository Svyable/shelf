import assert from 'node:assert/strict';
import { createLatestRouteQueue, routeNeedsCatalog } from './route-queue.js';

let assertions = 0;
const ok = (value, message) => { assert.ok(value, message); assertions += 1; };
const equal = (a, b, message) => { assert.equal(a, b, message); assertions += 1; };
const deep = (a, b, message) => { assert.deepEqual(a, b, message); assertions += 1; };

ok(routeNeedsCatalog({ view: 'library' }), 'library waits for catalog');
ok(!routeNeedsCatalog({ view: 'cover' }), 'cover bypasses catalog');
ok(!routeNeedsCatalog({ view: 'read' }), 'read bypasses catalog');
ok(!routeNeedsCatalog(null), 'missing route bypasses catalog');

const order = [];
let releaseFirst;
let active = 0;
let peak = 0;
const firstGate = new Promise((resolve) => { releaseFirst = resolve; });
const queue = createLatestRouteQueue(async (route) => {
  active += 1;
  peak = Math.max(peak, active);
  order.push(`start:${route.name}`);
  if (route.name === 'first') await firstGate;
  order.push(`end:${route.name}`);
  active -= 1;
});

const firstId = queue.request({ name: 'first' });
await new Promise((resolve) => setTimeout(resolve, 0));
const secondId = queue.request({ name: 'second' });
const thirdId = queue.request({ name: 'third' });
equal(firstId, 1, 'first request id');
equal(secondId, 2, 'second request id');
equal(thirdId, 3, 'third request id');
equal(queue.snapshot().requested, 3, 'snapshot tracks requests');
ok(queue.snapshot().running, 'first route is running');
ok(queue.snapshot().pending, 'latest route is pending');
releaseFirst();
await queue.idle();
deep(order, ['start:first', 'end:first', 'start:third', 'end:third'], 'intermediate pending route is superseded');
equal(peak, 1, 'route mutations never overlap');
equal(queue.snapshot().maxActive, 1, 'queue reports one active route max');
ok(!queue.snapshot().running, 'queue is idle after drain');
ok(!queue.snapshot().pending, 'no route remains pending');

const errors = [];
const recovered = [];
const errorQueue = createLatestRouteQueue(async (value) => {
  if (value === 'bad') throw new Error('boom');
  recovered.push(value);
}, { onError: (error, value, id) => errors.push([error.message, value, id]) });
errorQueue.request('bad');
errorQueue.request('good');
await errorQueue.idle();
deep(errors, [], 'superseded bad route never runs');
deep(recovered, ['good'], 'latest queued route runs');

const handled = [];
const handledErrors = [];
const handledQueue = createLatestRouteQueue(async (value) => {
  handled.push(value);
  if (value === 'bad') throw new Error('handled');
}, { onError: (error, value, id) => handledErrors.push([error.message, value, id]) });
handledQueue.request('bad');
await handledQueue.idle();
handledQueue.request('after');
await handledQueue.idle();
deep(handled, ['bad', 'after'], 'handled failure does not poison queue');
deep(handledErrors, [['handled', 'bad', 1]], 'error callback receives route and id');

let threw = false;
try { createLatestRouteQueue(null); } catch (error) { threw = error instanceof TypeError; }
ok(threw, 'invalid runner rejected');

console.log(`route queue tests ok (${assertions} assertions)`);
