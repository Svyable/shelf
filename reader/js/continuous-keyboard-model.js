export function continuousKeyboardCommand({ key, shiftKey = false, metaKey = false, ctrlKey = false, altKey = false } = {}, state = {}) {
  if (state.mode !== 'scroll' || state.stage !== 'read' || state.overlayOpen || state.editable) return null;
  if (metaKey || ctrlKey || altKey) return null;

  if (key === 'ArrowLeft' || key === 'ArrowRight') return { type: 'consume' };
  if (key === 'ArrowUp') return { type: 'line', direction: -1 };
  if (key === 'ArrowDown') return { type: 'line', direction: 1 };
  if (key === 'PageUp') return { type: 'page', direction: -1 };
  if (key === 'PageDown') return { type: 'page', direction: 1 };
  if (key === ' ') return { type: 'page', direction: shiftKey ? -1 : 1 };
  if (key === 'Home') return { type: 'edge', edge: 'start' };
  if (key === 'End') return { type: 'edge', edge: 'end' };
  return null;
}

export function continuousScrollDelta(command, metrics = {}) {
  if (!command || (command.type !== 'line' && command.type !== 'page')) return 0;
  const viewport = Math.max(1, Number(metrics.viewport) || 0);
  const lineHeight = Math.max(1, Number(metrics.lineHeight) || 24);
  const direction = command.direction < 0 ? -1 : 1;
  if (command.type === 'line') {
    return direction * Math.min(120, Math.max(48, lineHeight * 3));
  }
  return direction * Math.max(160, viewport * 0.82);
}

export function continuousEdgeTarget(command, metrics = {}) {
  if (!command || command.type !== 'edge') return null;
  if (command.edge === 'start') return 0;
  const scrollHeight = Math.max(0, Number(metrics.scrollHeight) || 0);
  const viewport = Math.max(0, Number(metrics.viewport) || 0);
  return Math.max(0, scrollHeight - viewport);
}
