export function normalizeOfflineReadiness(value = {}) {
  const totalChapters = Math.max(0, Number(value.totalChapters) || 0);
  const cachedChapters = Math.min(totalChapters, Math.max(0, Number(value.cachedChapters) || 0));
  const totalMedia = Math.max(0, Number(value.totalMedia) || 0);
  const cachedMedia = Math.min(totalMedia, Math.max(0, Number(value.cachedMedia) || 0));
  const hasReadme = !!value.hasReadme;
  const complete = hasReadme
    && cachedChapters === totalChapters
    && cachedMedia === totalMedia;
  return { hasReadme, totalChapters, cachedChapters, totalMedia, cachedMedia, complete };
}

export function offlineReadinessState({ supported = true, online = true, readiness = {} } = {}) {
  if (!supported) return 'unsupported';
  const normalized = normalizeOfflineReadiness(readiness);
  if (!online) return normalized.complete ? 'offline-ready' : 'offline-partial';
  return normalized.complete ? 'online-ready' : 'online-saving';
}

export function offlineReadinessLabel({ supported = true, online = true, readiness = {} } = {}) {
  const normalized = normalizeOfflineReadiness(readiness);
  const state = offlineReadinessState({ supported, online, readiness: normalized });
  if (state === 'unsupported') return 'Offline saving unavailable';
  if (state === 'online-ready') return 'Ready offline';
  if (state === 'offline-ready') return 'Offline · book ready';
  if (state === 'offline-partial') {
    if (!normalized.hasReadme) return 'Offline · book not saved';
    return `Offline · ${normalized.cachedChapters}/${normalized.totalChapters} chapters saved`;
  }
  if (!normalized.hasReadme) return 'Saving book for offline…';
  return `Saving for offline · ${normalized.cachedChapters}/${normalized.totalChapters} chapters`;
}

export function shouldKeepOfflineNoticeVisible(state) {
  return state === 'online-saving' || state === 'offline-ready' || state === 'offline-partial';
}
