import {
  READER_DIALOG_IDS,
  activeDialogId,
  tabDestination,
  shouldRestoreFocus,
  dialogTitleId,
} from './dialog-focus-model.js';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function visibleFocusable(dialog) {
  return [...dialog.querySelectorAll(FOCUSABLE)].filter((el) => {
    if (el.hidden || el.closest('[hidden], [inert]')) return false;
    const style = getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden';
  });
}

function dialogStates(root) {
  return Object.fromEntries(READER_DIALOG_IDS.map((id) => [
    id,
    root.getElementById(id)?.classList.contains('active') || false,
  ]));
}

function prepareDialog(dialog) {
  const heading = dialog.querySelector('h1, h2, h3, h4');
  dialog.setAttribute('role', 'dialog');
  if (heading) {
    if (!heading.id) heading.id = dialogTitleId(dialog.id);
    dialog.setAttribute('aria-labelledby', heading.id);
  } else if (!dialog.hasAttribute('aria-label')) {
    dialog.setAttribute('aria-label', 'Reader dialog');
  }
  if (!dialog.hasAttribute('tabindex')) dialog.tabIndex = -1;
}

function syncDialogSemantics(root, activeId) {
  for (const id of READER_DIALOG_IDS) {
    const dialog = root.getElementById(id);
    if (!dialog) continue;
    const active = id === activeId;
    dialog.setAttribute('aria-hidden', String(!active));
    if (active) dialog.setAttribute('aria-modal', 'true');
    else dialog.removeAttribute('aria-modal');
  }
}

export function installDialogFocusRuntime(root = document) {
  const dialogs = READER_DIALOG_IDS
    .map((id) => root.getElementById(id))
    .filter(Boolean);
  if (!dialogs.length) return () => {};

  dialogs.forEach(prepareDialog);
  const origins = new Map();
  let currentId = activeDialogId(dialogStates(root));
  syncDialogSemantics(root, currentId);

  const focusInto = (dialog) => {
    requestAnimationFrame(() => {
      if (!dialog?.classList.contains('active')) return;
      if (dialog.contains(root.activeElement)) return;
      const items = visibleFocusable(dialog);
      (items[0] || dialog).focus({ preventScroll: true });
    });
  };

  const reconcile = () => {
    const nextId = activeDialogId(dialogStates(root));
    if (nextId === currentId) return;
    const previousId = currentId;
    const previousOrigin = previousId ? origins.get(previousId) : null;
    currentId = nextId;
    syncDialogSemantics(root, nextId);

    if (nextId) {
      const next = root.getElementById(nextId);
      const active = root.activeElement;
      if (next && active && !next.contains(active) && !origins.has(nextId)) {
        origins.set(nextId, active);
      }
      if (previousId && previousId !== nextId) origins.delete(previousId);
      if (next) focusInto(next);
      return;
    }

    if (previousId) {
      origins.delete(previousId);
      if (shouldRestoreFocus({
        dialogStillActive: false,
        originConnected: !!previousOrigin?.isConnected,
      })) {
        queueMicrotask(() => previousOrigin.focus?.({ preventScroll: true }));
      }
    }
  };

  const observers = dialogs.map((dialog) => {
    const observer = new MutationObserver(reconcile);
    observer.observe(dialog, { attributes: true, attributeFilter: ['class'] });
    return observer;
  });

  const onKeyDown = (event) => {
    if (event.key !== 'Tab') return;
    const id = activeDialogId(dialogStates(root));
    if (!id) return;
    const dialog = root.getElementById(id);
    if (!dialog) return;
    const items = visibleFocusable(dialog);
    if (!items.length) {
      event.preventDefault();
      dialog.focus({ preventScroll: true });
      return;
    }
    const index = items.indexOf(root.activeElement);
    const nextIndex = tabDestination({ currentIndex: index, count: items.length, shiftKey: event.shiftKey });
    const wrapsForward = index === items.length - 1 && !event.shiftKey;
    const wrapsBackward = index === 0 && event.shiftKey;
    if (index < 0 || wrapsForward || wrapsBackward) {
      event.preventDefault();
      items[nextIndex].focus({ preventScroll: true });
    }
  };

  const onFocusIn = (event) => {
    const id = activeDialogId(dialogStates(root));
    if (!id) return;
    const dialog = root.getElementById(id);
    if (!dialog || dialog.contains(event.target)) return;
    const items = visibleFocusable(dialog);
    (items[0] || dialog).focus({ preventScroll: true });
  };

  root.addEventListener('keydown', onKeyDown, true);
  root.addEventListener('focusin', onFocusIn, true);
  if (currentId) focusInto(root.getElementById(currentId));

  return () => {
    observers.forEach((observer) => observer.disconnect());
    root.removeEventListener('keydown', onKeyDown, true);
    root.removeEventListener('focusin', onFocusIn, true);
  };
}

if (typeof document !== 'undefined') installDialogFocusRuntime(document);
