import assert from 'node:assert/strict';
import {
  availabilityCopy,
  chapterFailureState,
  chapterResourceIdentity,
  failureMatchesRoute,
} from './chapter-availability-model.js';

let assertions = 0;
function check(run) {
  run();
  assertions += 1;
}

check(() => assert.deepEqual(
  chapterFailureState(Object.assign(new Error('missing'), { status: 404 })),
  { kind: 'missing', retryable: false, status: 404 }
));
check(() => assert.deepEqual(
  chapterFailureState(Object.assign(new Error('gone'), { status: 410 })),
  { kind: 'missing', retryable: false, status: 410 }
));
check(() => assert.equal(chapterFailureState(Object.assign(new Error('server'), { status: 503 })).kind, 'temporary'));
check(() => assert.equal(chapterFailureState(Object.assign(new TypeError('network'), { network: true })).retryable, true));
check(() => assert.equal(chapterFailureState(Object.assign(new Error('blocked'), { status: 403 })).kind, 'blocked'));
check(() => assert.equal(chapterFailureState(Object.assign(new DOMException('aborted', 'AbortError'))).retryable, false));
check(() => assert.deepEqual(
  chapterResourceIdentity('books/demo/ch04-reading.md'),
  { slug: 'demo', chapter: 'ch04-reading', path: 'books/demo/ch04-reading.md' }
));
check(() => assert.deepEqual(
  chapterResourceIdentity('books/demo/manuscript/ch04-reading.md'),
  { slug: 'demo', chapter: 'ch04-reading', path: 'books/demo/manuscript/ch04-reading.md' }
));
check(() => assert.equal(chapterResourceIdentity('books/demo/README.md'), null));
check(() => assert.equal(
  failureMatchesRoute(
    { slug: 'demo', chapter: 'ch04' },
    { view: 'read', slug: 'demo', chapter: 'ch04' }
  ),
  true
));
check(() => assert.equal(
  failureMatchesRoute(
    { slug: 'demo', chapter: 'ch04' },
    { view: 'cover', slug: 'demo', chapter: 'ch04' }
  ),
  false
));
check(() => assert.equal(availabilityCopy({ kind: 'missing' }).action, ''));
check(() => assert.match(availabilityCopy({ kind: 'temporary' }, { online: false }).message, /offline/i));
check(() => assert.equal(availabilityCopy({ kind: 'temporary' }).action, 'Try again'));

console.log(`${assertions}/14 chapter availability assertions passed`);
