export const WAKE_LOCK_STORAGE_KEY = 'bookself.reader.keepAwake';

export function parseWakeLockPreference(value) {
  if (value === true || value === 'true' || value === '1' || value === 1) return true;
  return false;
}

export function wakeLockEligibility({ enabled, supported, visibility = 'visible', stage = '' } = {}) {
  const normalizedStage = String(stage || '').toLowerCase();
  const isReading = normalizedStage === 'read';
  const isVisible = visibility !== 'hidden';
  return {
    enabled: !!enabled,
    supported: !!supported,
    isReading,
    isVisible,
    shouldHold: !!enabled && !!supported && isReading && isVisible,
  };
}

export function wakeLockButtonModel({ enabled, supported, held, pending } = {}) {
  if (!supported) {
    return {
      label: 'Unavailable',
      pressed: false,
      disabled: true,
      status: 'Screen wake lock is not supported in this browser.',
    };
  }
  if (!enabled) {
    return {
      label: 'Off',
      pressed: false,
      disabled: false,
      status: 'Allow the screen to sleep normally.',
    };
  }
  if (held) {
    return {
      label: 'On',
      pressed: true,
      disabled: false,
      status: 'Keeping the screen awake while reading.',
    };
  }
  return {
    label: pending ? 'Starting…' : 'On',
    pressed: true,
    disabled: false,
    status: pending
      ? 'Requesting a screen wake lock.'
      : 'Screen wake lock will resume when reading is visible.',
  };
}

export function shouldRetryWakeLock({ enabled, supported, visibility = 'visible', stage = '', reason = '' } = {}) {
  const eligibility = wakeLockEligibility({ enabled, supported, visibility, stage });
  if (!eligibility.shouldHold) return false;
  return reason === 'visibility' || reason === 'stage' || reason === 'pageshow';
}
