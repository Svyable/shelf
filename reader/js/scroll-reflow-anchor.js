import { captureAnchor, restoreAnchor } from './scroll-reflow-anchor-model.js';

function identity(location = globalThis.location) {
  const match = String(location?.hash || '').match(/^#\/b\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

function relativeTop(element, ancestor) {
  let top = 0;
  let node = element;
  while (node && node !== ancestor) {
    top += node.offsetTop || 0;
    node = node.offsetParent;
  }
  return top;
}

function readGeometry(reader) {
  const els = [...reader.querySelectorAll('.scroll-block[data-chapter][data-offset]')];
  return {
    blocks: els.map((el) => ({
      chapter: el.dataset.chapter || '',
      offset: Number(el.dataset.offset) || 0,
    })),
    tops: els.map((el) => relativeTop(el, reader)),
  };
}

export function createContinuousReflowAnchorGuard({
  document = globalThis.document,
  window = globalThis.window,
  ResizeObserverImpl = globalThis.ResizeObserver,
} = {}) {
  let reader = null;
  let doc = null;
  let anchor = null;
  let resizeObserver = null;
  let mutationObserver = null;
  let scrollRaf = 0;
  let restoreRaf = 0;
  let restoring = false;

  const capture = () => {
    if (!reader || reader.hidden || restoring) return;
    const geometry = readGeometry(reader);
    anchor = captureAnchor({
      ...geometry,
      scrollTop: reader.scrollTop,
      clientHeight: reader.clientHeight,
      identity: identity(window?.location),
    });
  };

  const restore = () => {
    restoreRaf = 0;
    if (!reader || reader.hidden || !anchor) return;
    const geometry = readGeometry(reader);
    const next = restoreAnchor(anchor, {
      ...geometry,
      maxScroll: Math.max(0, reader.scrollHeight - reader.clientHeight),
      identity: identity(window?.location),
    });
    if (next == null) {
      capture();
      return;
    }
    if (Math.abs(reader.scrollTop - next) >= 1) {
      restoring = true;
      reader.scrollTop = next;
      restoring = false;
    }
    capture();
  };

  const scheduleRestore = () => {
    if (!window || restoreRaf) return;
    restoreRaf = window.requestAnimationFrame(restore);
  };

  const onScroll = () => {
    if (!window || restoring || scrollRaf) return;
    scrollRaf = window.requestAnimationFrame(() => {
      scrollRaf = 0;
      capture();
    });
  };

  const attach = () => {
    const nextReader = document?.getElementById?.('scrollReader');
    const nextDoc = document?.getElementById?.('scrollDocument');
    if (!nextReader || !nextDoc) return false;
    if (reader === nextReader && doc === nextDoc) return true;

    reader?.removeEventListener('scroll', onScroll);
    resizeObserver?.disconnect();
    reader = nextReader;
    doc = nextDoc;
    reader.addEventListener('scroll', onScroll, { passive: true });
    capture();

    if (ResizeObserverImpl) {
      resizeObserver = new ResizeObserverImpl(() => scheduleRestore());
      resizeObserver.observe(doc);
      resizeObserver.observe(reader);
    }
    return true;
  };

  if (!attach() && globalThis.MutationObserver && document?.body) {
    mutationObserver = new MutationObserver(() => {
      if (attach()) mutationObserver?.disconnect();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  window?.addEventListener('resize', scheduleRestore, { passive: true });
  document?.fonts?.addEventListener?.('loadingdone', scheduleRestore);

  return Object.freeze({
    capture,
    restore,
    destroy() {
      reader?.removeEventListener('scroll', onScroll);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window?.removeEventListener('resize', scheduleRestore);
      document?.fonts?.removeEventListener?.('loadingdone', scheduleRestore);
      if (scrollRaf) window?.cancelAnimationFrame(scrollRaf);
      if (restoreRaf) window?.cancelAnimationFrame(restoreRaf);
    },
  });
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.__bookselfContinuousReflowAnchorGuard?.destroy?.();
  window.__bookselfContinuousReflowAnchorGuard = createContinuousReflowAnchorGuard({ document, window });
}
