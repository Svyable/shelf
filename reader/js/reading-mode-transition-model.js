export const MODE_TRANSITION_FADE_MS = 180;

export function normalizeReaderMode(value) {
  return value === 'scroll' ? 'scroll' : 'paged';
}

export function modeTransitionEligible({ from, to, stage } = {}) {
  const source = normalizeReaderMode(from);
  const target = normalizeReaderMode(to);
  return stage === 'read' && source !== target;
}

export function modeTargetReady({ mode, hidden = false, busy = false, hasContent = false } = {}) {
  const target = normalizeReaderMode(mode);
  if (busy || !hasContent) return false;
  if (target === 'scroll' && hidden) return false;
  return true;
}

export function modeTransitionLabel(mode, { ready = false } = {}) {
  const target = normalizeReaderMode(mode);
  const name = target === 'scroll' ? 'Continuous reading' : 'Pages';
  return ready
    ? `${name} ready. Position preserved.`
    : `Preparing ${name.toLowerCase()}. Keeping your place visible.`;
}

export function modeTransitionFadeMs({ reducedMotion = false } = {}) {
  return reducedMotion ? 0 : MODE_TRANSITION_FADE_MS;
}

export function shouldRestoreModeFocus({ sourceOwnedFocus = false, overlayOpen = false, stillReading = true } = {}) {
  return !!sourceOwnedFocus && !overlayOpen && !!stillReading;
}
