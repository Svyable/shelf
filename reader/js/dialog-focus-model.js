export const READER_DIALOG_IDS = Object.freeze([
  'tocOverlay',
  'progressPanel',
  'settingsPanel',
  'searchOverlay',
  'noteDialog',
  'helpOverlay',
]);

export function activeDialogId(states = {}, ids = READER_DIALOG_IDS) {
  let active = null;
  for (const id of ids) {
    if (states[id]) active = id;
  }
  return active;
}

export function tabDestination({ currentIndex = -1, count = 0, shiftKey = false } = {}) {
  if (count <= 0) return -1;
  if (currentIndex < 0 || currentIndex >= count) return shiftKey ? count - 1 : 0;
  if (shiftKey) return currentIndex === 0 ? count - 1 : currentIndex - 1;
  return currentIndex === count - 1 ? 0 : currentIndex + 1;
}

export function shouldRestoreFocus({ dialogStillActive = false, originConnected = false } = {}) {
  return !dialogStillActive && originConnected;
}

export function dialogTitleId(id) {
  return `reader-dialog-title-${String(id || 'dialog')}`;
}
