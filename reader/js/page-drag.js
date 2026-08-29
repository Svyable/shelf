const AXIS_LOCK_PX = 10;
const COMMIT_RATIO = 0.22;
const FLING_VELOCITY = 0.55;
const MAX_TILT_DEG = 13;

export function pageDragDecision({ dx, dy, elapsedMs, width }) {
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  const safeWidth = Math.max(1, Number(width) || 1);
  const elapsed = Math.max(1, Number(elapsedMs) || 1);
  const ratio = absX / safeWidth;
  const velocity = absX / elapsed;
  const horizontal = absX >= AXIS_LOCK_PX && absX > absY * 1.15;
  const direction = dx < 0 ? 1 : -1;
  const commit = horizontal && (ratio >= COMMIT_RATIO || velocity >= FLING_VELOCITY);
  return { horizontal, commit, direction, ratio, velocity };
}

export function dragVisual(dx, width) {
  const safeWidth = Math.max(1, Number(width) || 1);
  const progress = Math.max(-1, Math.min(1, dx / safeWidth));
  return {
    progress,
    translatePct: progress * 34,
    rotateDeg: progress * MAX_TILT_DEG,
    shade: Math.min(0.32, Math.abs(progress) * 0.3),
  };
}

function interactiveTarget(target) {
  return !!target?.closest?.('a,button,input,textarea,select,option,label,mark,[contenteditable="true"],.sel-pop,.toc-overlay,.search-overlay,.stats-overlay');
}

function reducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function bindPageDrag() {
  const wrap = document.getElementById('pagesWrapper');
  if (!wrap || wrap.dataset.dragBound === 'true') return;
  wrap.dataset.dragBound = 'true';

  const state = {
    id: null,
    x: 0,
    y: 0,
    t: 0,
    locked: false,
    horizontal: false,
    moved: false,
    ownsTouch: false,
  };

  const clearVisual = (animate = true) => {
    wrap.classList.toggle('drag-settling', animate && !reducedMotion());
    wrap.classList.remove('dragging-page', 'drag-next', 'drag-prev');
    wrap.style.removeProperty('--drag-x');
    wrap.style.removeProperty('--drag-rotate');
    wrap.style.removeProperty('--drag-shade');
    window.setTimeout(() => wrap.classList.remove('drag-settling'), animate ? 180 : 0);
  };

  const reset = () => {
    state.id = null;
    state.locked = false;
    state.horizontal = false;
    state.moved = false;
    state.ownsTouch = false;
  };

  const eligibleSurface = (target) => {
    if (document.documentElement.dataset.readerMode === 'scroll') return false;
    if (document.body.dataset.stage !== 'read' || interactiveTarget(target)) return false;
    if (window.getSelection?.().toString().trim()) return false;
    return true;
  };

  wrap.addEventListener('touchstart', (event) => {
    state.ownsTouch = eligibleSurface(event.target);
    if (state.ownsTouch) event.stopPropagation();
  }, { capture: true, passive: true });
  wrap.addEventListener('touchmove', (event) => {
    if (state.ownsTouch && state.horizontal) event.stopPropagation();
  }, { capture: true, passive: true });
  wrap.addEventListener('touchend', (event) => {
    if (state.ownsTouch) event.stopPropagation();
  }, { capture: true, passive: true });
  wrap.addEventListener('touchcancel', (event) => {
    if (state.ownsTouch) event.stopPropagation();
  }, { capture: true, passive: true });

  wrap.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' || !eligibleSurface(event.target)) return;
    event.stopPropagation();
    state.id = event.pointerId;
    state.x = event.clientX;
    state.y = event.clientY;
    state.t = performance.now();
    state.locked = false;
    state.horizontal = false;
    state.moved = false;
  }, { capture: true });

  wrap.addEventListener('pointermove', (event) => {
    if (event.pointerId !== state.id) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (!state.locked && Math.max(absX, absY) >= AXIS_LOCK_PX) {
      state.locked = true;
      state.horizontal = absX > absY * 1.15;
      if (!state.horizontal) {
        reset();
        return;
      }
      wrap.setPointerCapture?.(event.pointerId);
    }
    if (!state.horizontal) return;

    event.preventDefault();
    event.stopPropagation();
    state.moved = true;
    const visual = dragVisual(dx, wrap.getBoundingClientRect().width);
    wrap.classList.add('dragging-page');
    wrap.classList.toggle('drag-next', dx < 0);
    wrap.classList.toggle('drag-prev', dx > 0);
    if (!reducedMotion()) {
      wrap.style.setProperty('--drag-x', `${visual.translatePct}%`);
      wrap.style.setProperty('--drag-rotate', `${visual.rotateDeg}deg`);
      wrap.style.setProperty('--drag-shade', String(visual.shade));
    }
  }, { capture: true, passive: false });

  const finish = (event, cancelled = false) => {
    if (event.pointerId !== state.id) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    const decision = pageDragDecision({
      dx,
      dy,
      elapsedMs: performance.now() - state.t,
      width: wrap.getBoundingClientRect().width,
    });
    const moved = state.moved;
    event.stopPropagation();
    clearVisual(true);
    reset();
    if (!moved || cancelled || !decision.commit) return;
    event.preventDefault();
    const button = document.getElementById(decision.direction > 0 ? 'nextBtn' : 'prevBtn');
    if (button && !button.disabled) button.click();
  };

  wrap.addEventListener('pointerup', (event) => finish(event), { capture: true });
  wrap.addEventListener('pointercancel', (event) => finish(event, true), { capture: true });
  wrap.addEventListener('lostpointercapture', () => {
    if (state.id == null) return;
    clearVisual(false);
    reset();
  });
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', bindPageDrag, { once: true });
  } else {
    queueMicrotask(bindPageDrag);
  }
}
