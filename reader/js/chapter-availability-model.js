export function normalizedStatus(error) {
  const status = Number(error?.status);
  return Number.isFinite(status) && status > 0 ? status : null;
}

export function chapterFailureState(error) {
  if (error?.name === 'AbortError') {
    return Object.freeze({ kind: 'aborted', retryable: false, status: null });
  }
  const status = normalizedStatus(error);
  if (status === 404 || status === 410) {
    return Object.freeze({ kind: 'missing', retryable: false, status });
  }
  if (status === 401 || status === 403) {
    return Object.freeze({ kind: 'blocked', retryable: true, status });
  }
  if (status === 408 || status === 425 || status === 429 || (status != null && status >= 500)) {
    return Object.freeze({ kind: 'temporary', retryable: true, status });
  }
  if (status == null && (error instanceof TypeError || error?.network === true)) {
    return Object.freeze({ kind: 'temporary', retryable: true, status: null });
  }
  return Object.freeze({ kind: 'unavailable', retryable: true, status });
}

export function chapterResourceIdentity(relativePath) {
  const source = String(relativePath || '').replace(/^\.\//, '').replace(/^\/+/, '');
  const match = source.match(/^books\/([^/]+)\/(?!README\.md$)(?:manuscript\/)?([^/]+)\.md$/i);
  if (!match) return null;
  return Object.freeze({
    slug: decodeURIComponent(match[1]),
    chapter: decodeURIComponent(match[2]),
    path: source,
  });
}

export function failureMatchesRoute(failure, route) {
  if (!failure || !route || route.view !== 'read') return false;
  return String(failure.slug || '') === String(route.slug || '')
    && String(failure.chapter || '') === String(route.chapter || '');
}

export function availabilityCopy(state, { online = true } = {}) {
  const kind = state?.kind || 'unavailable';
  if (kind === 'missing') {
    return Object.freeze({
      title: 'Chapter unavailable',
      message: 'This chapter is not available in this edition.',
      action: '',
    });
  }
  if (!online) {
    return Object.freeze({
      title: 'Chapter not loaded',
      message: 'You are offline. Your reading place is safe, and this chapter can be retried when you reconnect.',
      action: 'Try again',
    });
  }
  if (kind === 'blocked') {
    return Object.freeze({
      title: 'Chapter could not be accessed',
      message: 'The publication is reachable, but this chapter could not be accessed. Your reading place is safe.',
      action: 'Try again',
    });
  }
  return Object.freeze({
    title: 'Chapter temporarily unavailable',
    message: 'This chapter could not be loaded right now. Your reading place is safe.',
    action: 'Try again',
  });
}
