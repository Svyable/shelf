function focusables(root) {
  return [...root.querySelectorAll(
    'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
  )].filter((element) => !element.hidden && element.getClientRects().length > 0);
}

function initializeNotesModal() {
  const overlay = document.getElementById('notesOverlay');
  const opener = document.getElementById('notesBtn');
  if (!overlay || !opener || overlay.dataset.notesModalReady === 'true') return;
  overlay.dataset.notesModalReady = 'true';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'notesHeading');
  opener.setAttribute('aria-controls', 'notesOverlay');
  opener.setAttribute('aria-haspopup', 'dialog');

  const sync = () => {
    const active = overlay.classList.contains('active');
    overlay.inert = !active;
    overlay.setAttribute('aria-hidden', String(!active));
    opener.setAttribute('aria-expanded', String(active));
    for (const selector of ['.app', '#selPop']) {
      const root = document.querySelector(selector);
      if (root) root.inert = active;
    }
    document.body.classList.toggle('gui-overlay-open', active || !!document.querySelector('.toc-overlay.active, .stats-overlay.active:not(#notesOverlay), .search-overlay.active'));
    if (active) {
      requestAnimationFrame(() => document.getElementById('notesSearch')?.focus({ preventScroll: true }));
    } else if (overlay.contains(document.activeElement)) {
      opener.focus({ preventScroll: true });
    }
  };

  new MutationObserver(sync).observe(overlay, { attributes: true, attributeFilter: ['class'] });
  sync();

  document.addEventListener('keydown', (event) => {
    if (!overlay.classList.contains('active')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      document.getElementById('notesClose')?.click();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = focusables(overlay);
    if (!items.length) {
      event.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || !overlay.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !overlay.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  }, true);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) document.getElementById('notesClose')?.click();
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNotesModal, { once: true });
  } else {
    initializeNotesModal();
  }
}
