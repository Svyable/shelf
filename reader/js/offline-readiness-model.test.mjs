import assert from 'node:assert/strict';
import {
  normalizeOfflineReadiness,
  offlineReadinessLabel,
  offlineReadinessState,
  shouldKeepOfflineNoticeVisible,
} from './offline-readiness-model.js';

const partial = { hasReadme: true, totalChapters: 10, cachedChapters: 4, totalMedia: 3, cachedMedia: 1 };
const complete = { hasReadme: true, totalChapters: 10, cachedChapters: 10, totalMedia: 3, cachedMedia: 3 };

assert.deepEqual(normalizeOfflineReadiness({ totalChapters: 4, cachedChapters: 9 }), {
  hasReadme: false, totalChapters: 4, cachedChapters: 4, totalMedia: 0, cachedMedia: 0, complete: false,
});
assert.equal(normalizeOfflineReadiness(complete).complete, true);
assert.equal(offlineReadinessState({ supported: false }), 'unsupported');
assert.equal(offlineReadinessState({ online: true, readiness: partial }), 'online-saving');
assert.equal(offlineReadinessState({ online: true, readiness: complete }), 'online-ready');
assert.equal(offlineReadinessState({ online: false, readiness: partial }), 'offline-partial');
assert.equal(offlineReadinessState({ online: false, readiness: complete }), 'offline-ready');
assert.equal(offlineReadinessLabel({ supported: false }), 'Offline saving unavailable');
assert.equal(offlineReadinessLabel({ online: true, readiness: {} }), 'Saving book for offline…');
assert.equal(offlineReadinessLabel({ online: true, readiness: partial }), 'Saving for offline · 4/10 chapters');
assert.equal(offlineReadinessLabel({ online: true, readiness: complete }), 'Ready offline');
assert.equal(offlineReadinessLabel({ online: false, readiness: {} }), 'Offline · book not saved');
assert.equal(offlineReadinessLabel({ online: false, readiness: partial }), 'Offline · 4/10 chapters saved');
assert.equal(offlineReadinessLabel({ online: false, readiness: complete }), 'Offline · book ready');
assert.equal(shouldKeepOfflineNoticeVisible('online-saving'), true);
assert.equal(shouldKeepOfflineNoticeVisible('online-ready'), false);
assert.equal(shouldKeepOfflineNoticeVisible('offline-ready'), true);
assert.equal(shouldKeepOfflineNoticeVisible('offline-partial'), true);
assert.equal(shouldKeepOfflineNoticeVisible('unsupported'), false);

console.log('offline readiness model tests ok');
