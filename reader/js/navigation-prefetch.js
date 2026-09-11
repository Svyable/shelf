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

export function isCoverVolume(anchor, { base = 'https://example.invalid/reader/' } = {}) {
  if (!anchor?.classList?.contains?.('volume')) return false;
  const href = anchor.getAttribute?.('href') || anchor.href;
  const route = routeFromHref(href, { base });
  return !!route?.slug && route.chapter == null;
}

export function coverPreviewSnapshot(anchor) {
  const text = (selector) => anchor?.querySelector?.(selector)?.textContent?.trim?.() || '';
  const cover = anchor?.querySelector?.('.volume-cover');
  return Object.freeze({
    title: text('.volume-title'),
    subtitle: text('.volume-subtitle'),
    author: text('.volume-author'),
    imprint: text('.volume-imprint'),
    cloth: anchor?.style?.getPropertyValue?.('--cloth')?.trim?.() || '',
    backgroundImage: cover?.style?.backgroundImage || '',
  });
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

function ensureCoverPreviewStyle(document) {
  if (document.getElementById?.('readerFastCoverPreviewStyle')) return;
  const style = document.createElement?.('style');
  if (!style) return;
  style.id = 'readerFastCoverPreviewStyle';
  style.textContent = `
    body[data-reader-cover-preview] #loader:not([hidden]) {
      opacity: 0 !important;
      pointer-events: none !important;
      animation: none !important;
    }
  `;
  document.head?.appendChild(style);
}

function installFastCoverPreview(root, { base } = {}) {
  const document = root?.nodeType === 9 ? root : root?.ownerDocument || globalThis.document;
  const window = document?.defaultView || globalThis.window;
  if (!document?.body || !window) return () => {};
  ensureCoverPreviewStyle(document);

  const loader = document.getElementById('loader');
  const state = {
    slug: null,
    sawLoaderBusy: !!loader && !loader.hidden,
  };

  const restore = () => {
    if (!state.slug) return;
    state.slug = null;
    state.sawLoaderBusy = false;
    delete document.body.dataset.readerCoverPreview;
    const start = document.getElementById('startBtn');
    if (start?.dataset.coverPreviewDisabled === 'true') {
      start.disabled = false;
      delete start.dataset.coverPreviewDisabled;
      if (start.textContent === 'Opening…') start.textContent = 'Begin';
    }
    const dock = document.getElementById('coverDock');
    if (dock?.dataset.coverPreviewHidden === 'true') {
      dock.hidden = false;
      delete dock.dataset.coverPreviewHidden;
    }
  };

  const render = (anchor, route) => {
    const snapshot = coverPreviewSnapshot(anchor);
    if (!snapshot.title || !route?.slug) return false;
    state.slug = route.slug;
    state.sawLoaderBusy = !!loader && !loader.hidden;
    document.body.dataset.readerCoverPreview = route.slug;
    document.body.dataset.stage = 'cover';

    const library = document.getElementById('libraryView');
    const coverPage = document.getElementById('coverPage');
    const pages = document.getElementById('pagesWrapper');
    const back = document.getElementById('backCover');
    const pageNav = document.getElementById('pageNav');
    const chrome = document.getElementById('readerChrome');
    if (library) library.hidden = true;
    if (coverPage) {
      coverPage.hidden = false;
      coverPage.classList.remove('opened');
    }
    pages?.classList.remove('active');
    back?.classList.remove('show');
    if (pageNav) pageNav.hidden = true;
    chrome?.classList.remove('is-reading');

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value || '';
    };
    setText('coverTitle', snapshot.title);
    setText('coverSubtitle', snapshot.subtitle);
    setText('coverAuthor', snapshot.author);
    setText('coverYear', '');
    setText('coverImprint', snapshot.imprint);
    setText('coverMeta', '');
    document.title = snapshot.title;

    const face = document.getElementById('coverFront');
    if (face) {
      if (snapshot.cloth) face.style.setProperty('--cloth', snapshot.cloth);
      if (snapshot.backgroundImage && snapshot.backgroundImage !== 'none') {
        face.style.backgroundImage = snapshot.backgroundImage;
        face.classList.add('has-art');
      } else {
        face.style.backgroundImage = '';
        face.classList.remove('has-art');
      }
    }
    const proof = document.getElementById('proofRibbon');
    const badge = document.getElementById('draftBadge');
    if (proof) proof.hidden = true;
    if (badge) badge.hidden = true;

    const start = document.getElementById('startBtn');
    if (start) {
      start.disabled = true;
      start.dataset.coverPreviewDisabled = 'true';
      start.textContent = 'Opening…';
    }
    const dock = document.getElementById('coverDock');
    if (dock) {
      dock.hidden = true;
      dock.dataset.coverPreviewHidden = 'true';
    }
    return true;
  };

  const onClickCapture = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target?.closest?.('a.volume[href*="#/b/"]');
    if (!isCoverVolume(anchor, { base })) return;
    const route = routeFromHref(anchor.getAttribute?.('href') || anchor.href, { base });
    render(anchor, route);
  };

  // app.js historically starts a full loadBook() on pointerenter. The intent
  // primer above already warms the first useful chapter with network-aware
  // throttling, so stop that legacy target listener from turning a glance into
  // a whole-publication download.
  const onPointerEnterCapture = (event) => {
    const anchor = event.target?.closest?.('a.volume[href*="#/b/"]');
    if (isCoverVolume(anchor, { base })) event.stopPropagation();
  };

  const onRouteChange = () => {
    if (!state.slug) return;
    const route = routeFromHref(window.location.href, { base });
    if (!route || route.slug !== state.slug || route.chapter != null) restore();
  };

  const startButton = document.getElementById('startBtn');
  const loaderObserver = typeof MutationObserver !== 'undefined'
    ? new MutationObserver(() => {
      if (!state.slug) return;
      if (startButton?.dataset.coverPreviewDisabled === 'true' && startButton.textContent !== 'Opening…') {
        restore();
        return;
      }
      if (loader && !loader.hidden) {
        state.sawLoaderBusy = true;
        return;
      }
      if (loader?.hidden && state.sawLoaderBusy) restore();
    })
    : null;
  if (loader) loaderObserver?.observe(loader, { attributes: true, attributeFilter: ['hidden'] });
  if (startButton) loaderObserver?.observe(startButton, { childList: true, characterData: true, subtree: true });

  root.addEventListener('click', onClickCapture, true);
  root.addEventListener('pointerenter', onPointerEnterCapture, true);
  window.addEventListener('hashchange', onRouteChange);
  window.addEventListener('popstate', onRouteChange);

  return () => {
    restore();
    loaderObserver?.disconnect();
    root.removeEventListener('click', onClickCapture, true);
    root.removeEventListener('pointerenter', onPointerEnterCapture, true);
    window.removeEventListener('hashchange', onRouteChange);
    window.removeEventListener('popstate', onRouteChange);
  };
}

export function installNavigationPrefetch(root, { prime, base, connection = (typeof navigator !== 'undefined' ? navigator.connection : {}) || {} } = {}) {
  if (!root?.addEventListener || typeof prime !== 'function') return () => {};
  const controller = createNavigationPrefetchController({ prime, base, connection });
  const anchorFor = (target) => target?.closest?.('a[href*="#/b/"]');
  const stopFastCoverPreview = installFastCoverPreview(root, { base });

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
    stopFastCoverPreview();
    root.removeEventListener('pointerover', onPointerOver);
    root.removeEventListener('pointerout', onPointerOut);
    root.removeEventListener('focusin', onFocusIn);
    root.removeEventListener('pointerdown', onPointerDown);
  };
}
