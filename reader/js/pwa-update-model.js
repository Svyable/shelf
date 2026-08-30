export const READER_UPDATE_MESSAGE = 'BOOKSELF_ACTIVATE_UPDATE';

export function readerUpdateState({
  hasController = false,
  hasWaitingWorker = false,
  installingState = '',
} = {}) {
  if (!hasController) return hasWaitingWorker || installingState ? 'first-install' : 'idle';
  if (hasWaitingWorker) return 'ready';
  if (installingState === 'installing') return 'installing';
  if (installingState === 'installed') return 'ready';
  return 'current';
}

export function shouldOfferReaderUpdate(input = {}) {
  return readerUpdateState(input) === 'ready' && !!input.hasController;
}

export function shouldReloadAfterControllerChange({
  activationRequested = false,
  reloadCommitted = false,
} = {}) {
  return activationRequested && !reloadCommitted;
}

export function activationMessage() {
  return { type: READER_UPDATE_MESSAGE };
}
