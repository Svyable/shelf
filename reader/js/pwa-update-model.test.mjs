import assert from 'node:assert/strict';
import {
  READER_UPDATE_MESSAGE,
  activationMessage,
  readerUpdateState,
  shouldOfferReaderUpdate,
  shouldReloadAfterControllerChange,
} from './pwa-update-model.js';

assert.equal(readerUpdateState({}), 'idle');
assert.equal(readerUpdateState({ hasWaitingWorker: true }), 'first-install');
assert.equal(readerUpdateState({ installingState: 'installing' }), 'first-install');
assert.equal(readerUpdateState({ hasController: true }), 'current');
assert.equal(readerUpdateState({ hasController: true, installingState: 'installing' }), 'installing');
assert.equal(readerUpdateState({ hasController: true, installingState: 'installed' }), 'ready');
assert.equal(readerUpdateState({ hasController: true, hasWaitingWorker: true }), 'ready');
assert.equal(shouldOfferReaderUpdate({ hasController: true, hasWaitingWorker: true }), true);
assert.equal(shouldOfferReaderUpdate({ hasWaitingWorker: true }), false);
assert.equal(shouldReloadAfterControllerChange({ activationRequested: false }), false);
assert.equal(shouldReloadAfterControllerChange({ activationRequested: true }), true);
assert.equal(shouldReloadAfterControllerChange({ activationRequested: true, reloadCommitted: true }), false);
assert.deepEqual(activationMessage(), { type: READER_UPDATE_MESSAGE });

console.log('pwa update model tests ok');
