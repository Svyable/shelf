import {
  continuousKeyboardCommand,
  continuousScrollDelta,
  continuousEdgeTarget,
} from './continuous-keyboard-model.js';

function editableTarget(target) {
  return !!target?.closest?.('input, textarea, select, button, a, [contenteditable="true"], [role="textbox"]');
}

function overlaysOpen(root = document) {
  return !!root.querySelector(
    '.toc-overlay.active, .stats-overlay.active, .search-overlay.active, #settingsPanel.active, #noteDialog.active, #helpOverlay.active'
  );
}

function lineHeightFor(reader) {
  const sample = reader.querySelector('.scroll-block p, .scroll-block li, .scroll-block');
  if (!sample) return 24;
  const value = Number.parseFloat(getComputedStyle(sample).lineHeight);
  return Number.isFinite(value) ? value : 24;
}

function motionBehavior(command) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'auto';
  return command.type === 'page' || command.type === 'edge' ? 'smooth' : 'auto';
}

export function installContinuousKeyboard(root = document) {
  if (root.documentElement?.dataset.continuousKeyboard === 'installed') return false;
  root.documentElement?.setAttribute('data-continuous-keyboard', 'installed');

  window.addEventListener('keydown', (event) => {
    const reader = root.getElementById?.('scrollReader');
    const command = continuousKeyboardCommand(event, {
      mode: root.documentElement?.dataset.readerMode,
      stage: root.body?.dataset.stage,
      overlayOpen: overlaysOpen(root),
      editable: editableTarget(event.target),
    });
    if (!command || !reader || reader.hidden) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    if (command.type === 'consume') return;

    const metrics = {
      viewport: reader.clientHeight,
      scrollHeight: reader.scrollHeight,
      lineHeight: lineHeightFor(reader),
    };
    const behavior = motionBehavior(command);

    if (command.type === 'edge') {
      const top = continuousEdgeTarget(command, metrics);
      if (top != null) reader.scrollTo({ top, behavior });
      return;
    }

    const top = continuousScrollDelta(command, metrics);
    if (top) reader.scrollBy({ top, behavior });
  }, true);

  return true;
}

if (typeof document !== 'undefined') installContinuousKeyboard(document);
