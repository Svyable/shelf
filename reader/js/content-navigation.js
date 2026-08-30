const EDGE_EPSILON = 2;
const ARROW_STEP_RATIO = 0.18;
const PAGE_STEP_RATIO = 0.82;

export function overflowState({ scrollLeft = 0, scrollWidth = 0, clientWidth = 0 }) {
  const max = Math.max(0, Number(scrollWidth) - Number(clientWidth));
  const left = Math.max(0, Math.min(max, Number(scrollLeft) || 0));
  return {
    overflow: max > EDGE_EPSILON,
    atStart: left <= EDGE_EPSILON,
    atEnd: left >= max - EDGE_EPSILON,
    max,
  };
}

export function horizontalKeyDestination({
  key,
  scrollLeft = 0,
  scrollWidth = 0,
  clientWidth = 0,
  shiftKey = false,
}) {
  const state = overflowState({ scrollLeft, scrollWidth, clientWidth });
  if (!state.overflow) return null;

  const width = Math.max(1, Number(clientWidth) || 1);
  const arrow = Math.max(48, width * ARROW_STEP_RATIO);
  const page = Math.max(96, width * PAGE_STEP_RATIO);
  const current = Math.max(0, Math.min(state.max, Number(scrollLeft) || 0));

  let next = null;
  if (key === 'ArrowLeft') next = current - arrow;
  else if (key === 'ArrowRight') next = current + arrow;
  else if (key === 'Home') next = 0;
  else if (key === 'End') next = state.max;
  else if (shiftKey && key === 'PageUp') next = current - page;
  else if (shiftKey && key === 'PageDown') next = current + page;

  if (next == null) return null;
  return Math.max(0, Math.min(state.max, Math.round(next)));
}

export function overflowInstruction(kind = 'content') {
  const noun = kind === 'table' ? 'table' : kind === 'code' ? 'code block' : 'content';
  return `Scrollable ${noun}. Use Left and Right Arrow to move horizontally, Home and End for edges, or Shift plus Page Up and Page Down for larger steps.`;
}
