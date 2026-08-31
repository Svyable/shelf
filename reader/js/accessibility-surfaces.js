import {
  accessibilitySurfacePlan,
  pageAccessibilityLabel,
  surfaceState,
} from './accessibility-surface-model.js';

function byId(id) {
  return document.getElementById(id);
}

function setSurface(element, state, { role = null } = {}) {
  if (!element) return;
  if (role) element.setAttribute('role', role);
  if (state.ariaHidden == null) element.removeAttribute('aria-hidden');
  else element.setAttribute('aria-hidden', state.ariaHidden);
  if ('inert' in element) element.inert = state.inert;
  else if (state.inert) element.setAttribute('inert', '');
  else element.removeAttribute('inert');
  if (state.tabIndex == null) element.removeAttribute('tabindex');
  else element.tabIndex = state.tabIndex;
  if (state.label) element.setAttribute('aria-label', state.label);
  else element.removeAttribute('aria-label');
}

function activeContinuousReader() {
  const reader = byId('scrollReader');
  return !!reader && !reader.hidden;
}

function spreadVisible() {
  const right = byId('pageRight');
  return !!right?.classList.contains('active');
}

function updateSkipLink(plan) {
  const skip = document.querySelector('.skip-link');
  if (!skip) return;
  skip.setAttribute('href', `#${plan.skipTarget}`);
  skip.textContent = plan.stage === 'library'
    ? 'Skip to library'
    : plan.stage === 'cover'
      ? 'Skip to book cover'
      : plan.stage === 'end'
        ? 'Skip to end matter'
        : 'Skip to reading';
}

function updatePageSemantics(plan) {
  const chapter = byId('currentChapter')?.textContent || '';
  const current = byId('currentPage')?.textContent || '';
  const total = byId('totalPages')?.textContent || '';
  const left = byId('pageLeft');
  const right = byId('pageRight');

  const leftLabel = pageAccessibilityLabel({ chapter, page: current, total });
  setSurface(left, surfaceState(plan.leftPage, leftLabel), { role: 'document' });

  let rightPage = '';
  if (plan.rightPage) {
    const match = String(current).match(/^(\d+)(?:\D+(\d+))?$/);
    rightPage = match?.[2] || (match?.[1] ? String(Number(match[1]) + 1) : '');
  }
  const rightLabel = pageAccessibilityLabel({ chapter, page: rightPage, total });
  setSurface(right, surfaceState(plan.rightPage, rightLabel), { role: 'document' });
}

function updateStageSemantics(plan) {
  setSurface(byId('libraryView'), surfaceState(plan.library, 'Library'), { role: 'region' });
  setSurface(byId('coverPage'), surfaceState(plan.cover, 'Book cover'), { role: 'document' });
  setSurface(byId('coverDock'), surfaceState(plan.cover, 'Book actions'), { role: 'navigation' });
  setSurface(byId('backCover'), surfaceState(plan.end, 'End of book'), { role: 'document' });
  setSurface(byId('pagesWrapper'), surfaceState(plan.pages, 'Paged reading'), { role: 'region' });
  setSurface(byId('scrollReader'), surfaceState(plan.continuous, 'Continuous reading'), { role: 'region' });
}

let frame = 0;
function scheduleUpdate() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    updateAccessibilitySurfaces();
  });
}

export function updateAccessibilitySurfaces() {
  const stage = document.body?.dataset.stage || 'library';
  const rightPageActive = spreadVisible();
  const plan = accessibilitySurfacePlan({
    stage,
    continuous: stage === 'read' && activeContinuousReader(),
    spread: stage === 'read' && rightPageActive,
    rightPageActive,
  });
  updateStageSemantics(plan);
  updatePageSemantics(plan);
  updateSkipLink(plan);
  return plan;
}

export function installAccessibilitySurfaces() {
  if (typeof document === 'undefined' || !document.body) return () => {};
  updateAccessibilitySurfaces();

  const observer = new MutationObserver(scheduleUpdate);
  observer.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ['data-stage', 'class', 'hidden'],
    childList: false,
    characterData: false,
  });

  for (const id of ['currentChapter', 'currentPage', 'totalPages']) {
    const node = byId(id);
    if (node) observer.observe(node, { subtree: true, childList: true, characterData: true });
  }

  window.addEventListener('pageshow', scheduleUpdate);
  window.addEventListener('resize', scheduleUpdate, { passive: true });

  return () => {
    observer.disconnect();
    window.removeEventListener('pageshow', scheduleUpdate);
    window.removeEventListener('resize', scheduleUpdate);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
}

if (typeof document !== 'undefined') installAccessibilitySurfaces();
