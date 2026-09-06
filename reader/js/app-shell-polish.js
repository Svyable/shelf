const STYLE_HREF = 'css/app-shell-polish.css?v=r1';

const LABELED_CONTROLS = [
  '#logoBtn',
  '#themeModeBtn',
  '#bookmarkBtn',
  '#searchBtn',
  '#tocBtn',
  '#settingsBtn',
  '#prevBtn',
  '#nextBtn',
];

let controlObserver = null;

export function controlLabel(element) {
  if (!element) return '';
  return (
    element.getAttribute('aria-label')
    || element.getAttribute('title')
    || element.textContent
    || ''
  ).trim();
}

export function decorateAppShell(document = globalThis.document) {
  if (!document?.documentElement) return { decorated: 0 };
  let decorated = 0;
  for (const selector of LABELED_CONTROLS) {
    const element = document.querySelector(selector);
    if (!element) continue;
    const label = controlLabel(element);
    if (!label) continue;
    element.dataset.readerLabel = label;
    decorated += 1;
  }
  document.documentElement.dataset.readerAppShell = 'ready';
  return { decorated };
}

export function watchAppShellControls(document = globalThis.document) {
  controlObserver?.disconnect?.();
  const MutationObserverCtor = document?.defaultView?.MutationObserver || globalThis.MutationObserver;
  if (!MutationObserverCtor) return null;

  const roots = [
    document.getElementById?.('readerChrome'),
    document.getElementById?.('pageNav'),
  ].filter(Boolean);
  if (!roots.length) return null;

  const observer = new MutationObserverCtor(() => decorateAppShell(document));
  roots.forEach((root) => observer.observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['aria-label', 'title'],
  }));
  controlObserver = observer;
  return observer;
}

export function installAppShellStyles(document = globalThis.document) {
  if (!document?.head) return Promise.resolve(false);
  const existing = document.querySelector(`link[href="${STYLE_HREF}"]`);
  if (existing) {
    decorateAppShell(document);
    watchAppShellControls(document);
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    link.dataset.readerAppShell = 'true';
    link.addEventListener('load', () => {
      decorateAppShell(document);
      watchAppShellControls(document);
      resolve(true);
    }, { once: true });
    link.addEventListener('error', () => resolve(false), { once: true });
    document.head.appendChild(link);
  });
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  installAppShellStyles(document).catch((error) => {
    console.warn('Reader app-shell polish could not be loaded', error);
  });
}
