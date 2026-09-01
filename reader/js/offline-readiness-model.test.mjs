import assert from 'node:assert/strict';
import {
  normalizeOfflineReadiness,
  offlineReadinessLabel,
  offlineReadinessProgress,
  offlineReadinessState,
  offlineSaveAction,
  offlineSaveResultLabel,
  shouldKeepOfflineNoticeVisible,
} from './offline-readiness-model.js';

let assertions = 0;
const check = (actual, expected) => {
  assert.deepEqual(actual, expected);
  assertions += 1;
};

const partial = { hasReadme: true, totalChapters: 10, cachedChapters: 4, totalMedia: 3, cachedMedia: 1 };
const complete = { hasReadme: true, totalChapters: 10, cachedChapters: 10, totalMedia: 3, cachedMedia: 3 };

check(normalizeOfflineReadiness({ totalChapters: 4, cachedChapters: 9 }), {
  hasReadme: false, totalChapters: 4, cachedChapters: 4, totalMedia: 0, cachedMedia: 0, complete: false,
});
check(normalizeOfflineReadiness(complete).complete, true);
check(offlineReadinessState({ supported: false }), 'unsupported');
check(offlineReadinessState({ online: true, readiness: partial }), 'online-saving');
check(offlineReadinessState({ online: true, readiness: complete }), 'online-ready');
check(offlineReadinessState({ online: false, readiness: partial }), 'offline-partial');
check(offlineReadinessState({ online: false, readiness: complete }), 'offline-ready');
check(offlineReadinessLabel({ supported: false }), 'Offline saving unavailable');
check(offlineReadinessLabel({ online: true, readiness: {} }), 'Saving book for offline…');
check(offlineReadinessLabel({ online: true, readiness: partial }), 'Saving for offline · 4/10 chapters');
check(offlineReadinessLabel({ online: true, readiness: complete }), 'Ready offline');
check(offlineReadinessLabel({ online: false, readiness: {} }), 'Offline · book not saved');
check(offlineReadinessLabel({ online: false, readiness: partial }), 'Offline · 4/10 chapters saved');
check(offlineReadinessLabel({ online: false, readiness: complete }), 'Offline · book ready');
check(offlineReadinessProgress({}), 0);
check(offlineReadinessProgress(partial), 5 / 13);
check(offlineReadinessProgress(complete), 1);
check(offlineSaveAction({ supported: false }).visible, false);
check(offlineSaveAction({ online: false, readiness: partial }).visible, false);
check(offlineSaveAction({ online: true, readiness: complete }).visible, false);
check(offlineSaveAction({ online: true, readiness: partial }), {
  visible: true, disabled: false, label: 'Keep offline',
});
check(offlineSaveAction({ online: true, readiness: partial, saving: true }), {
  visible: true, disabled: true, label: 'Keeping offline…',
});
check(offlineSaveResultLabel({ result: 'saving' }), 'Keeping this book offline…');
check(offlineSaveResultLabel({ result: 'complete', persisted: true }), 'Book kept offline · storage protected');
check(offlineSaveResultLabel({ result: 'complete', persisted: false }), 'Book kept offline');
check(offlineSaveResultLabel({ result: 'partial' }), 'Some files could not be kept offline');
check(offlineSaveResultLabel({ result: 'failed' }), 'Could not keep this book offline');
check(shouldKeepOfflineNoticeVisible('online-saving'), true);
check(shouldKeepOfflineNoticeVisible('online-ready'), false);
check(shouldKeepOfflineNoticeVisible('offline-ready'), true);
check(shouldKeepOfflineNoticeVisible('offline-partial'), true);
check(shouldKeepOfflineNoticeVisible('unsupported'), false);

console.log(`offline readiness model tests ok (${assertions} assertions)`);
