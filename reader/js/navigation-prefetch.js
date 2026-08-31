export function routeFromHref(href, { base = 'https://example.invalid/reader/' } = {}) {
  if (!href) return null;
  let url;
  let baseUrl;
  try {
    baseUrl = new URL(base);
    url = new URL(href, baseUrl);
  } catch {
    return null;
  }
  if (url.origin !== baseUrl.origin || url.pathname !== baseUrl.pathname) return null;
  const raw = (url.hash || '').replace(/^#/, '');
  const parts = raw.split('/').filter(Boolean);
  if (parts[0] !== 'b' || !parts[1]) return null;
  let slug;
  let chapter = null;
  try {
    slug = decodeURIComponent(parts[1]);
    chapter = parts[2] ? decodeURIComponent(parts[2]) : null;
  } catch {
    return null;
  }
  return { slug, chapter };
}

export function shouldPrefetchIntent(kind, { saveData = false, effectiveType = '' } = {}) {
  if (kind === 'activate') return true;
  if (kind === 'focus') return !saveData;
  if (kind !== 'hover') return false;
  if (saveData) return false;
  return !/^2g$/i.test(String(effectiveType));
}

export function createNavigationPrefetchController({
  prime,
  base,
  hoverDelay = 90,
  connection = {},
  setTimer = setTimeout,
  clearTimer = clearTimeout,
} = {}) {
  if (typeof prime !== 'function') throw new TypeError('navigation prefetch requires a prime function');
  const pending = new Map();

  function routeFor(anchor) {
    const href = typeof anchor === 'string' ? anchor : anchor?.getAttribute?.('href') || anchor?.href;
    return routeFromHref(href, { base });
  }

  function primeIntent(route, kind) {
    return Promise.resolve(prime({ ...route, intent: kind }));
  }

  function run(anchor, kind) {
    const route = routeFor(anchor);
    if (!route || !shouldPrefetchIntent(kind, connection)) return Promise.resolve({ status: 'skipped' });
    return primeIntent(route, kind);
  }

  function schedule(anchor) {
    const route = routeFor(anchor);
    if (!route || !shouldPrefetchIntent('hover', connection)) return false;
    cancel(anchor);
    const timer = setTimer(() => {
      pending.delete(anchor);
      primeIntent(route, 'hover');
    }, hoverDelay);
    pending.set(anchor, timer);
    return true;
  }

  function cancel(anchor) {
    if (!pending.has(anchor)) return false;
    clearTimer(pending.get(anchor));
    pending.delete(anchor);
    return true;
  }

  function destroy() {
    for (const timer of pending.values()) clearTimer(timer);
    pending.clear();
  }

  return { run, schedule, cancel, destroy, routeFor };
}

export function installNavigationPrefetch(root, { prime, base, connection = (typeof navigator !== 'undefined' ? navigator.connection : {}) || {} } = {}) {
  if (!root?.addEventListener || typeof prime !== 'function') return () => {};
  const controller = createNavigationPrefetchController({ prime, base, connection });
  const anchorFor = (target) => target?.closest?.('a[href*="#/b/"]');

  const onPointerOver = (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    const anchor = anchorFor(event.target);
    if (!anchor || anchor.contains(event.relatedTarget)) return;
    controller.schedule(anchor);
  };
  const onPointerOut = (event) => {
    const anchor = anchorFor(event.target);
    if (!anchor || anchor.contains(event.relatedTarget)) return;
    controller.cancel(anchor);
  };
  const onFocusIn = (event) => {
    const anchor = anchorFor(event.target);
    if (anchor) controller.run(anchor, 'focus');
  };
  const onPointerDown = (event) => {
    const anchor = anchorFor(event.target);
    if (anchor) controller.run(anchor, 'activate');
  };

  root.addEventListener('pointerover', onPointerOver, { passive: true });
  root.addEventListener('pointerout', onPointerOut, { passive: true });
  root.addEventListener('focusin', onFocusIn);
  root.addEventListener('pointerdown', onPointerDown, { passive: true });

  return () => {
    controller.destroy();
    root.removeEventListener('pointerover', onPointerOver);
    root.removeEventListener('pointerout', onPointerOut);
    root.removeEventListener('focusin', onFocusIn);
    root.removeEventListener('pointerdown', onPointerDown);
  };
}
