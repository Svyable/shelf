import {
  chapterIntrinsicEstimate,
  intrinsicSizeCss,
  shouldRefreshIntrinsic,
} from './scroll-performance-model.js';

const STYLE_HREF = 'css/scroll-performance.css?v=r1';
const CHAPTER_SELECTOR = '.scroll-chapter';
let resizeObserver = null;
let mutationObserver = null;
let supported = false;

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function supportsVirtualizedRendering() {
  try {
    return !!window.CSS?.supports?.('content-visibility', 'auto')
      && !!window.CSS?.supports?.('contain-intrinsic-block-size', 'auto 1000px');
  } catch {
    return false;
  }
}

function currentTypography() {
  const root = getComputedStyle(document.documentElement);
  return {
    fontSize: parseFloat(root.getPropertyValue('--reader-font-size')) || 18,
    lineHeight: parseFloat(root.getPropertyValue('--reader-leading')) || 1.55,
  };
}

function viewportHeight() {
  const reader = document.getElementById('scrollReader');
  return reader?.clientHeight || window.visualViewport?.height || window.innerHeight || 800;
}

function estimateFor(chapter) {
  const typography = currentTypography();
  return chapterIntrinsicEstimate({
    blockCount: chapter.querySelectorAll('.scroll-block').length,
    fontSize: typography.fontSize,
    lineHeight: typography.lineHeight,
    viewportHeight: viewportHeight(),
  });
}

function setIntrinsic(chapter, value, learned = false) {
  const rounded = Math.max(1, Math.round(value));
  chapter.style.setProperty('--reader-chapter-intrinsic-size', intrinsicSizeCss(rounded));
  chapter.dataset.readerIntrinsicSize = String(rounded);
  chapter.dataset.readerIntrinsicLearned = String(!!learned);
}

function prepareChapter(chapter, { resetEstimate = false } = {}) {
  if (!(chapter instanceof Element) || !chapter.matches(CHAPTER_SELECTOR)) return;
  chapter.classList.add('reader-virtual-chapter');
  chapter.dataset.readerRenderPolicy = 'content-visibility';
  if (resetEstimate || !chapter.dataset.readerIntrinsicSize) {
    setIntrinsic(chapter, estimateFor(chapter), false);
  }
  resizeObserver?.observe(chapter);
}

function prepareWithin(root, options) {
  if (!(root instanceof Element || root instanceof Document)) return;
  if (root instanceof Element && root.matches(CHAPTER_SELECTOR)) prepareChapter(root, options);
  root.querySelectorAll?.(CHAPTER_SELECTOR).forEach((chapter) => prepareChapter(chapter, options));
}

function refineMeasuredSizes(entries) {
  for (const entry of entries) {
    const chapter = entry.target;
    const box = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize;
    const measured = box?.blockSize || entry.contentRect?.height || 0;
    const previous = Number(chapter.dataset.readerIntrinsicSize) || 0;
    if (!shouldRefreshIntrinsic(previous, measured)) continue;
    setIntrinsic(chapter, measured, true);
  }
}

function resetEstimates() {
  if (!supported) return;
  document.querySelectorAll(CHAPTER_SELECTOR).forEach((chapter) => prepareChapter(chapter, { resetEstimate: true }));
}

function observeDocument() {
  const doc = document.getElementById('scrollDocument');
  if (!doc || mutationObserver) return;
  mutationObserver = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node instanceof Element) prepareWithin(node);
    }));
  });
  mutationObserver.observe(doc, { childList: true, subtree: true });
  prepareWithin(doc);
}

function install() {
  if (document.documentElement.dataset.scrollPerformanceReady === 'true') return;
  document.documentElement.dataset.scrollPerformanceReady = 'true';
  installStyles();
  supported = supportsVirtualizedRendering();
  document.documentElement.dataset.scrollRenderPolicy = supported ? 'virtualized' : 'full';
  if (!supported) return;

  resizeObserver = typeof ResizeObserver === 'function'
    ? new ResizeObserver(refineMeasuredSizes)
    : null;
  observeDocument();

  const stage = document.getElementById('bookStage');
  if (stage && !document.getElementById('scrollDocument')) {
    const stageObserver = new MutationObserver(() => {
      if (!document.getElementById('scrollDocument')) return;
      stageObserver.disconnect();
      observeDocument();
    });
    stageObserver.observe(stage, { childList: true, subtree: true });
  }

  let resetTimer = null;
  const scheduleReset = () => {
    clearTimeout(resetTimer);
    resetTimer = window.setTimeout(resetEstimates, 120);
  };
  window.addEventListener('resize', scheduleReset, { passive: true });
  window.visualViewport?.addEventListener('resize', scheduleReset, { passive: true });
  const rootObserver = new MutationObserver(scheduleReset);
  rootObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [
      'style',
      'data-reader-font',
      'data-reader-measure',
      'data-reader-paragraph',
      'data-reader-indent',
      'data-reader-hyphens',
    ],
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
else install();
