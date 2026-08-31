import {
  contentInspectorCopyText,
  contentInspectorKind,
  contentInspectorLabel,
  contentInspectorShortcut,
  contentInspectorViewport,
  isDoubleTap,
  isInspectibleOverflow,
} from './content-inspector-model.js';

const REGION_SELECTOR = '.page-inner pre, .page-inner table, .scroll-document pre, .scroll-document table';
const STYLE_HREF = 'css/content-inspector.css?v=r1';
let active = null;
let previousTap = null;

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function regionFor(target) {
  const region = target?.closest?.(REGION_SELECTOR);
  if (!(region instanceof HTMLElement)) return null;
  if (region.closest('#pageMeasure, #pageMeasureInner')) return null;
  return region;
}

function viewportSnapshot() {
  return contentInspectorViewport({
    width: window.visualViewport?.width || window.innerWidth,
    height: window.visualViewport?.height || window.innerHeight,
  });
}

function tableRows(table) {
  return Array.from(table.querySelectorAll('tr')).map((row) =>
    Array.from(row.querySelectorAll('th,td')).map((cell) => cell.textContent || '')
  );
}

function copyPayload(region, kind) {
  return contentInspectorCopyText(kind, {
    text: region.textContent || '',
    rows: kind === 'table' ? tableRows(region) : [],
  });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand?.('copy') === true;
    textarea.remove();
    return copied;
  }
}

function focusable(dialog) {
  return Array.from(dialog.querySelectorAll(
    'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
  )).filter((element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true');
}

function closeInspector({ restoreFocus = true } = {}) {
  if (!active) return;
  const { dialog, origin } = active;
  active = null;
  delete document.documentElement.dataset.contentInspectorOpen;
  dialog.remove();
  if (restoreFocus && origin?.isConnected) {
    try {
      origin.focus({ preventScroll: true });
    } catch {
      origin.focus();
    }
  }
}

function onDialogKeydown(event) {
  if (!active) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    closeInspector();
    return;
  }
  if (event.key !== 'Tab') return;
  const items = focusable(active.dialog);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function sanitizedClone(region) {
  const clone = region.cloneNode(true);
  clone.removeAttribute('id');
  clone.removeAttribute('tabindex');
  clone.removeAttribute('aria-describedby');
  clone.removeAttribute('aria-keyshortcuts');
  clone.classList.remove('reader-scroll-region', 'can-scroll-left', 'can-scroll-right');
  clone.removeAttribute('data-reader-scroll-region');
  clone.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
  return clone;
}

function openInspector(region, { source = 'unknown' } = {}) {
  if (!region?.isConnected) return false;
  const kind = contentInspectorKind(region.tagName);
  if (!kind) return false;

  closeInspector({ restoreFocus: false });
  installStyles();

  const dialog = document.createElement('div');
  dialog.className = 'reader-content-inspector';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-labelledby', 'readerContentInspectorTitle');
  dialog.dataset.kind = kind;
  dialog.dataset.source = source;
  const viewport = viewportSnapshot();
  dialog.dataset.compact = String(viewport.compact);
  dialog.dataset.landscape = String(viewport.landscape);

  const backdrop = document.createElement('button');
  backdrop.type = 'button';
  backdrop.className = 'reader-content-inspector-backdrop';
  backdrop.setAttribute('aria-label', 'Close expanded content');
  backdrop.tabIndex = -1;

  const panel = document.createElement('section');
  panel.className = 'reader-content-inspector-panel';

  const header = document.createElement('header');
  header.className = 'reader-content-inspector-header';

  const title = document.createElement('h2');
  title.id = 'readerContentInspectorTitle';
  title.textContent = contentInspectorLabel(kind);

  const actions = document.createElement('div');
  actions.className = 'reader-content-inspector-actions';

  const copy = document.createElement('button');
  copy.type = 'button';
  copy.textContent = kind === 'table' ? 'Copy TSV' : 'Copy code';

  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Close';

  const body = document.createElement('div');
  body.className = 'reader-content-inspector-body';
  body.tabIndex = 0;
  body.setAttribute('aria-label', `${contentInspectorLabel(kind)} content`);
  body.appendChild(sanitizedClone(region));

  actions.append(copy, close);
  header.append(title, actions);
  panel.append(header, body);
  dialog.append(backdrop, panel);
  document.body.appendChild(dialog);
  document.documentElement.dataset.contentInspectorOpen = 'true';

  active = { dialog, origin: region, body };
  dialog.addEventListener('keydown', onDialogKeydown);
  close.addEventListener('click', () => closeInspector());
  backdrop.addEventListener('click', () => closeInspector());
  copy.addEventListener('click', async () => {
    const copied = await copyText(copyPayload(region, kind));
    copy.textContent = copied ? 'Copied' : 'Copy failed';
    window.setTimeout(() => {
      if (copy.isConnected) copy.textContent = kind === 'table' ? 'Copy TSV' : 'Copy code';
    }, 1300);
  });

  requestAnimationFrame(() => body.focus({ preventScroll: true }));
  return true;
}

function meaningfulRegion(region) {
  if (!region) return false;
  if (isInspectibleOverflow(region)) return true;
  if (region.tagName.toLowerCase() === 'table') return region.querySelectorAll('tr').length >= 4;
  return (region.textContent || '').split('\n').length >= 8;
}

function onKeydown(event) {
  const region = regionFor(event.target);
  if (!region || !meaningfulRegion(region)) return;
  if (contentInspectorShortcut(event) !== 'open') return;
  event.preventDefault();
  event.stopImmediatePropagation();
  openInspector(region, { source: 'keyboard' });
}

function onDoubleClick(event) {
  const region = regionFor(event.target);
  if (!region || !meaningfulRegion(region)) return;
  event.preventDefault();
  event.stopPropagation();
  openInspector(region, { source: 'double-click' });
}

function onPointerUp(event) {
  if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
  const region = regionFor(event.target);
  if (!region || !meaningfulRegion(region)) {
    previousTap = null;
    return;
  }
  const current = {
    pointerType: event.pointerType,
    time: performance.now(),
    x: event.clientX,
    y: event.clientY,
    region,
  };
  if (previousTap?.region === region && isDoubleTap(previousTap, current)) {
    previousTap = null;
    event.preventDefault();
    event.stopPropagation();
    openInspector(region, { source: 'double-tap' });
    return;
  }
  previousTap = current;
}

function prepareRegion(region) {
  if (!(region instanceof HTMLElement) || region.closest('#pageMeasure, #pageMeasureInner')) return;
  if (region.dataset.contentInspectorReady === 'true') return;
  region.dataset.contentInspectorReady = 'true';
  region.setAttribute('aria-keyshortcuts', 'Enter');
  if (!region.hasAttribute('title')) {
    region.title = 'Press Enter or double-tap to expand';
    region.dataset.contentInspectorTitle = 'true';
  }
}

function scan(root = document) {
  if (root instanceof Element && root.matches(REGION_SELECTOR)) prepareRegion(root);
  root.querySelectorAll?.(REGION_SELECTOR).forEach(prepareRegion);
}

export function installContentInspector() {
  if (document.documentElement.dataset.contentInspectorInstalled === 'true') return;
  document.documentElement.dataset.contentInspectorInstalled = 'true';
  installStyles();
  scan();
  document.addEventListener('keydown', onKeydown, true);
  document.addEventListener('dblclick', onDoubleClick, true);
  document.addEventListener('pointerup', onPointerUp, true);
  window.addEventListener('hashchange', () => closeInspector({ restoreFocus: false }));
  window.addEventListener('popstate', () => closeInspector({ restoreFocus: false }));
  window.addEventListener('resize', () => {
    if (!active) return;
    const viewport = viewportSnapshot();
    active.dialog.dataset.compact = String(viewport.compact);
    active.dialog.dataset.landscape = String(viewport.landscape);
  }, { passive: true });
  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof Element) scan(node);
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
}

if (typeof document !== 'undefined') installContentInspector();
