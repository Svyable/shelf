export function nativeShareAvailable(navigatorLike = globalThis.navigator) {
  return typeof navigatorLike?.share === 'function';
}

export function shareActionLabel(navigatorLike = globalThis.navigator) {
  return nativeShareAvailable(navigatorLike) ? 'Share' : 'Copy link';
}

export function shareFallbackText({ text = '', url = '' } = {}) {
  return [String(text || '').trim(), String(url || '').trim()].filter(Boolean).join('\n');
}

export async function shareOrCopy({
  navigatorLike = globalThis.navigator,
  title = '',
  text = '',
  url = '',
  copy = async (value) => navigatorLike?.clipboard?.writeText?.(value),
} = {}) {
  const payload = {};
  if (title) payload.title = String(title);
  if (text) payload.text = String(text);
  if (url) payload.url = String(url);

  if (nativeShareAvailable(navigatorLike)) {
    try {
      await navigatorLike.share(payload);
      return 'shared';
    } catch (error) {
      if (error?.name === 'AbortError') return 'cancelled';
    }
  }

  await copy(shareFallbackText({ text, url }));
  return 'copied';
}

function currentUrl(win = window) {
  return `${win.location.origin}${win.location.pathname}${win.location.search}${win.location.hash}`;
}

function toast(root, message) {
  const el = root.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  window.setTimeout(() => {
    if (el.textContent === message) el.hidden = true;
  }, 1800);
}

async function copyWithFeedback(value, root, navigatorLike) {
  try {
    if (typeof navigatorLike?.clipboard?.writeText !== 'function') throw new Error('Clipboard unavailable');
    await navigatorLike.clipboard.writeText(value);
    toast(root, 'Copied');
  } catch {
    toast(root, 'Could not copy');
  }
}

export function installNativeShare({
  root = document,
  win = window,
  navigatorLike = navigator,
} = {}) {
  if (!nativeShareAvailable(navigatorLike)) return false;

  const shareButton = root.getElementById('shareBtn');
  if (shareButton && shareButton.dataset.nativeShare !== 'installed') {
    shareButton.dataset.nativeShare = 'installed';
    shareButton.textContent = 'Share';
    shareButton.title = 'Share this reading position';
    shareButton.setAttribute('aria-label', 'Share this reading position');
    shareButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      void shareOrCopy({
        navigatorLike,
        title: root.title || '',
        url: currentUrl(win),
        copy: (value) => copyWithFeedback(value, root, navigatorLike),
      });
    }, true);
  }

  const selectionButton = root.getElementById('selShare');
  if (selectionButton && selectionButton.dataset.nativeShare !== 'installed') {
    selectionButton.dataset.nativeShare = 'installed';
    selectionButton.addEventListener('click', (event) => {
      const text = win.getSelection?.()?.toString().trim() || '';
      if (!text) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const pop = root.getElementById('selPop');
      if (pop) pop.hidden = true;
      void shareOrCopy({
        navigatorLike,
        title: root.title || '',
        text: `“${text}”`,
        url: currentUrl(win),
        copy: (value) => copyWithFeedback(value, root, navigatorLike),
      });
    }, true);
  }

  return !!(shareButton || selectionButton);
}

function installWhenReady() {
  installNativeShare();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installWhenReady, { once: true });
  } else {
    installWhenReady();
  }
}
