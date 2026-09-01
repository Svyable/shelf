const AXIS_LOCK_PX = 10;
const COMMIT_RATIO = 0.22;
const RELEASE_FLING_VELOCITY = 0.52;
const MIN_FLING_RATIO = 0.055;
const FLING_PROJECT_MS = 120;
const RELEASE_SAMPLE_WINDOW_MS = 96;
const MAX_TILT_DEG = 13;
const SCROLL_EDGE_PX = 2;
const EDGE_RESISTANCE_FACTOR = 0.32;
const EDGE_RESISTANCE_MAX = 0.18;

export function releaseVelocityFromSamples(samples, nowMs, windowMs = RELEASE_SAMPLE_WINDOW_MS) {
  const rows = Array.isArray(samples)
    ? samples.filter((row) => Number.isFinite(row?.x) && Number.isFinite(row?.t))
    : [];
  if (rows.length < 2) return 0;
  const now = Number.isFinite(nowMs) ? nowMs : rows[rows.length - 1].t;
  const cutoff = now - Math.max(16, Number(windowMs) || RELEASE_SAMPLE_WINDOW_MS);
  const recent = rows.filter((row) => row.t >= cutoff && row.t <= now);
  const usable = recent.length >= 2 ? recent : rows.slice(-2);
  const first = usable[0];
  const last = usable[usable.length - 1];
  const elapsed = Math.max(1, last.t - first.t);
  return (last.x - first.x) / elapsed;
}

export function pageDragDecision({
  dx,
  dy,
  elapsedMs,
  width,
  canTurn = true,
  releaseVelocityX = null,
}) {
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  const safeWidth = Math.max(1, Number(width) || 1);
  const elapsed = Math.max(1, Number(elapsedMs) || 1);
  const ratio = absX / safeWidth;
  const averageVelocity = absX / elapsed;
  const horizontal = absX >= AXIS_LOCK_PX && absX > absY * 1.15;
  const direction = dx < 0 ? 1 : -1;
  const hasReleaseVelocity = Number.isFinite(releaseVelocityX);
  const signedReleaseVelocity = hasReleaseVelocity
    ? Number(releaseVelocityX)
    : (dx < 0 ? -averageVelocity : averageVelocity);
  const releaseVelocity = Math.abs(signedReleaseVelocity);
  const releaseDirection = signedReleaseVelocity === 0
    ? direction
    : (signedReleaseVelocity < 0 ? 1 : -1);
  const releaseAligned = releaseDirection === direction;
  const projectedRatio = Math.min(
    1,
    (absX + (releaseAligned ? releaseVelocity * FLING_PROJECT_MS : 0)) / safeWidth
  );
  const fling = releaseAligned
    && releaseVelocity >= RELEASE_FLING_VELOCITY
    && ratio >= MIN_FLING_RATIO
    && projectedRatio >= COMMIT_RATIO;
  const commit = !!canTurn && horizontal && (ratio >= COMMIT_RATIO || fling);
  return {
    horizontal,
    commit,
    direction,
    ratio,
    velocity: averageVelocity,
    releaseVelocity,
    releaseAligned,
    projectedRatio,
    fling,
    canTurn: !!canTurn,
  };
}

export function dragVisual(dx, width, { resisted = false } = {}) {
  const safeWidth = Math.max(1, Number(width) || 1);
  const raw = Math.max(-1, Math.min(1, dx / safeWidth));
  const progress = resisted
    ? Math.sign(raw) * Math.min(EDGE_RESISTANCE_MAX, Math.abs(raw) * EDGE_RESISTANCE_FACTOR)
    : raw;
  return {
    progress,
    rawProgress: raw,
    resisted: !!resisted,
    translatePct: progress * 34,
    rotateDeg: progress * MAX_TILT_DEG,
    shade: Math.min(resisted ? 0.1 : 0.32, Math.abs(progress) * 0.3),
  };
}

export function scrollContainerConsumes({ dx, scrollLeft, scrollWidth, clientWidth }) {
  const maxScroll = Math.max(0, (Number(scrollWidth) || 0) - (Number(clientWidth) || 0));
  if (maxScroll <= SCROLL_EDGE_PX || Math.abs(Number(dx) || 0) < AXIS_LOCK_PX) return false;
  const left = Math.max(0, Math.min(maxScroll, Number(scrollLeft) || 0));
  if (dx < 0) return left < maxScroll - SCROLL_EDGE_PX;
  if (dx > 0) return left > SCROLL_EDGE_PX;
  return false;
}

export function scrollLeftAfterPan({ scrollLeft, deltaX, scrollWidth, clientWidth }) {
  const maxScroll = Math.max(0, (Number(scrollWidth) || 0) - (Number(clientWidth) || 0));
  const next = (Number(scrollLeft) || 0) - (Number(deltaX) || 0);
  return Math.max(0, Math.min(maxScroll, next));
}

export function contentPanHandoff({ dx, scrollLeft, scrollWidth, clientWidth }) {
  if (Math.abs(Number(dx) || 0) < AXIS_LOCK_PX) return false;
  return !scrollContainerConsumes({ dx, scrollLeft, scrollWidth, clientWidth });
}

function interactiveTarget(target) {
  return !!target?.closest?.('a,button,input,textarea,select,option,label,mark,[contenteditable="true"],.sel-pop,.toc-overlay,.search-overlay,.stats-overlay');
}

function horizontalScroller(target) {
  const scroller = target?.closest?.('.page-inner pre, .page-inner table');
  if (!scroller) return null;
  return scroller.scrollWidth > scroller.clientWidth + SCROLL_EDGE_PX ? scroller : null;
}

function reducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function turnButton(direction) {
  return document.getElementById(direction > 0 ? 'nextBtn' : 'prevBtn');
}

function canTurn(direction) {
  const button = turnButton(direction);
  return !!button && !button.disabled;
}

function bindPageDrag() {
  const wrap = document.getElementById('pagesWrapper');
  if (!wrap || wrap.dataset.dragBound === 'true') return;
  wrap.dataset.dragBound = 'true';

  const state = {
    id: null,
    x: 0,
    lastX: 0,
    y: 0,
    t: 0,
    locked: false,
    horizontal: false,
    moved: false,
    ownsTouch: false,
    scroller: null,
    contentPan: false,
    handedOff: false,
    samples: [],
  };

  const sample = (x, t = performance.now()) => {
    state.samples.push({ x, t });
    const cutoff = t - RELEASE_SAMPLE_WINDOW_MS * 2;
    while (state.samples.length > 2 && state.samples[0].t < cutoff) state.samples.shift();
  };

  const clearVisual = (animate = true) => {
    wrap.classList.toggle('drag-settling', animate && !reducedMotion());
    wrap.classList.remove('dragging-page', 'drag-next', 'drag-prev', 'drag-resisted');
    wrap.style.removeProperty('--drag-x');
    wrap.style.removeProperty('--drag-rotate');
    wrap.style.removeProperty('--drag-shade');
    window.setTimeout(() => wrap.classList.remove('drag-settling'), animate ? 180 : 0);
  };

  const resetPointer = () => {
    state.id = null;
    state.locked = false;
    state.horizontal = false;
    state.moved = false;
    state.scroller = null;
    state.contentPan = false;
    state.handedOff = false;
    state.samples = [];
  };

  const reset = () => {
    resetPointer();
    state.ownsTouch = false;
  };

  const eligibleSurface = (target) => {
    if (document.documentElement.dataset.readerMode === 'scroll') return false;
    if (document.body.dataset.stage !== 'read' || interactiveTarget(target)) return false;
    if (window.getSelection?.().toString().trim()) return false;
    return true;
  };

  // app.js still carries a compatibility Touch Events swipe handler. Suppress
  // that path for eligible page gestures so Pointer Events owns the turn once,
  // while leaving links, controls, selection, overlays, and Scroll untouched.
  // This also keeps the legacy swipe path from stealing a horizontal pan that
  // belongs to an overflowing table or code block.
  wrap.addEventListener('touchstart', (event) => {
    state.ownsTouch = eligibleSurface(event.target);
    if (state.ownsTouch) event.stopPropagation();
  }, { capture: true, passive: true });
  wrap.addEventListener('touchmove', (event) => {
    if (state.ownsTouch && state.horizontal) event.stopPropagation();
  }, { capture: true, passive: true });
  wrap.addEventListener('touchend', (event) => {
    if (state.ownsTouch) event.stopPropagation();
    state.ownsTouch = false;
  }, { capture: true, passive: true });
  wrap.addEventListener('touchcancel', (event) => {
    if (state.ownsTouch) event.stopPropagation();
    state.ownsTouch = false;
  }, { capture: true, passive: true });

  wrap.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' || !eligibleSurface(event.target)) return;
    event.stopPropagation();
    state.id = event.pointerId;
    state.x = event.clientX;
    state.lastX = event.clientX;
    state.y = event.clientY;
    state.t = performance.now();
    state.locked = false;
    state.horizontal = false;
    state.moved = false;
    state.scroller = horizontalScroller(event.target);
    state.contentPan = false;
    state.handedOff = false;
    state.samples = [];
    sample(event.clientX, state.t);
  }, { capture: true });

  wrap.addEventListener('pointermove', (event) => {
    if (event.pointerId !== state.id) return;
    const now = performance.now();
    sample(event.clientX, now);
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (!state.locked && Math.max(absX, absY) >= AXIS_LOCK_PX) {
      state.locked = true;
      state.horizontal = absX > absY * 1.15;
      if (!state.horizontal) {
        resetPointer();
        return;
      }
      state.contentPan = !!state.scroller && scrollContainerConsumes({
        dx,
        scrollLeft: state.scroller.scrollLeft,
        scrollWidth: state.scroller.scrollWidth,
        clientWidth: state.scroller.clientWidth,
      });
      wrap.setPointerCapture?.(event.pointerId);
    }
    if (!state.horizontal) return;

    event.preventDefault();
    event.stopPropagation();
    state.moved = true;

    if (state.contentPan && state.scroller) {
      const deltaX = event.clientX - state.lastX;
      state.scroller.scrollLeft = scrollLeftAfterPan({
        scrollLeft: state.scroller.scrollLeft,
        deltaX,
        scrollWidth: state.scroller.scrollWidth,
        clientWidth: state.scroller.clientWidth,
      });
      state.lastX = event.clientX;

      // Once the nested region reaches the edge in the continuing gesture
      // direction, hand ownership to the book instead of forcing a second swipe.
      if (contentPanHandoff({
        dx: deltaX,
        scrollLeft: state.scroller.scrollLeft,
        scrollWidth: state.scroller.scrollWidth,
        clientWidth: state.scroller.clientWidth,
      })) {
        state.contentPan = false;
        state.handedOff = true;
        state.x = event.clientX;
        state.y = event.clientY;
        state.t = now;
        state.samples = [];
        sample(event.clientX, now);
      }
      return;
    }

    const direction = dx < 0 ? 1 : -1;
    const available = canTurn(direction);
    const visual = dragVisual(dx, wrap.getBoundingClientRect().width, { resisted: !available });
    wrap.classList.add('dragging-page');
    wrap.classList.toggle('drag-next', dx < 0);
    wrap.classList.toggle('drag-prev', dx > 0);
    wrap.classList.toggle('drag-resisted', !available);
    if (!reducedMotion()) {
      wrap.style.setProperty('--drag-x', `${visual.translatePct}%`);
      wrap.style.setProperty('--drag-rotate', `${visual.rotateDeg}deg`);
      wrap.style.setProperty('--drag-shade', String(visual.shade));
    }
  }, { capture: true, passive: false });

  const finish = (event, cancelled = false) => {
    if (event.pointerId !== state.id) return;
    const now = performance.now();
    sample(event.clientX, now);
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    const direction = dx < 0 ? 1 : -1;
    const available = canTurn(direction);
    const releaseVelocityX = releaseVelocityFromSamples(state.samples, now);
    const decision = pageDragDecision({
      dx,
      dy,
      elapsedMs: now - state.t,
      width: wrap.getBoundingClientRect().width,
      canTurn: available,
      releaseVelocityX,
    });
    const moved = state.moved;
    const contentPan = state.contentPan;
    event.stopPropagation();
    clearVisual(!contentPan);
    resetPointer();
    if (contentPan || !moved || cancelled || !decision.commit) return;
    event.preventDefault();
    turnButton(decision.direction)?.click();
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
