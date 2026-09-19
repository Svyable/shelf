import { fetchText, firstExisting } from './base.js';
import { parseBookReadme, clothColor } from './catalog.js';
import { parseHash } from './router.js';
import { buildProgressMap, progressAt } from './progress-position.js';

const STYLE_HREF = 'css/library-current-book.css?v=r1';
let scheduled = false;
let lastKey = '';
let runId = 0;
let styleReady = null;

function storagePrefix() {
  return window.__IMPRINT?.storagePrefix || 'bookself';
}

function progressKey(slug) {
  return `${storagePrefix()}:${slug}:progress`;
}

function loadStoredProgress(slug) {
  try {
    return JSON.parse(localStorage.getItem(progressKey(slug)) || 'null');
  } catch {
    return null;
  }
}

export function relativeSavedLabel(savedAt, now = Date.now()) {
  const saved = Number(savedAt);
  if (!Number.isFinite(saved) || saved <= 0) return '';
  const elapsed = Math.max(0, now - saved);
  const minutes = Math.floor(elapsed / 60000);
  if (minutes < 1) return 'Saved just now';
  if (minutes < 60) return `Saved ${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Saved ${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Saved ${days}d ago`;
  try {
    return `Saved ${new Date(saved).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
  } catch {
    return '';
  }
}

export function chapterResumeLabel(meta, progress) {
  const contents = Array.isArray(meta?.contents) ? meta.contents : [];
  if (!contents.length || !progress?.chapter) return '';
  const index = contents.findIndex((chapter) => chapter.id === progress.chapter);
  if (index < 0) return '';
  const title = String(contents[index]?.title || '').trim();
  return `${title || `Chapter ${index + 1}`} · ${index + 1} of ${contents.length}`;
}

export function slugFromContinueHref(href) {
  const route = parseHash(String(href || ''));
  return route?.slug || '';
}

function installStyles() {
  if (styleReady) return styleReady;
  const existing = document.querySelector(`link[href="${STYLE_HREF}"]`);
  if (existing) {
    styleReady = Promise.resolve(true);
    return styleReady;
  }

  styleReady = new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    link.addEventListener('load', () => resolve(true), { once: true });
    link.addEventListener('error', () => resolve(false), { once: true });
    document.head.appendChild(link);
  });
  return styleReady;
}

function ensureMarkup(link) {
  if (link.dataset.currentBookEnhanced === 'true') return;
  const title = document.getElementById('continueCardTitle')?.textContent?.trim() || '';
  link.dataset.currentBookEnhanced = 'true';
  link.innerHTML = `
    <span class="continue-book-object" aria-hidden="true">
      <span class="continue-book-spine"></span>
      <span class="continue-book-pages"></span>
      <span class="continue-book-cover" id="continueCardCover"></span>
    </span>
    <span class="continue-book-copy">
      <span class="continue-book-title" id="continueCardTitle"></span>
      <span class="continue-book-author" id="continueCardAuthor"></span>
      <span class="continue-book-context" id="continueCardChapter"></span>
      <span class="continue-book-saved" id="continueCardSaved"></span>
      <span class="continue-book-meter" id="continueCardMeter" hidden aria-hidden="true">
        <span class="continue-book-meter-fill" id="continueCardProgress"></span>
      </span>
    </span>
    <span class="continue-book-action">Resume <span aria-hidden="true">›</span></span>`;
  document.getElementById('continueCardTitle').textContent = title;
}

function coverCandidates(slug) {
  return ['cover.png', 'cover.jpg', 'cover.webp', 'cover.jpeg']
    .map((name) => `books/${slug}/media/${name}`);
}

async function semanticProgress(meta, slug, progress) {
  if (!progress?.chapter || !Array.isArray(meta?.contents) || !meta.contents.length) return null;
  const chapters = await Promise.all(meta.contents.map(async (chapter) => ({
    ...chapter,
    markdown: await fetchText(`books/${slug}/${chapter.file}`).catch(() => ''),
  })));
  const map = buildProgressMap(chapters);
  if (!map.total) return null;
  return progressAt(map, progress.chapter, progress.offset || 0);
}

function setCover(slug, cover) {
  const el = document.getElementById('continueCardCover');
  const object = el?.closest('.continue-book-object');
  if (!el || !object) return;
  object.style.setProperty('--continue-cloth', clothColor(slug));
  if (cover) {
    el.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.38)), url("${cover}")`;
    object.classList.add('has-art');
  } else {
    el.style.backgroundImage = '';
    object.classList.remove('has-art');
  }
}

function setAccessibleLabel(link, meta, chapter, saved, percent) {
  const parts = [`Resume ${meta.title}`];
  if (chapter) parts.push(chapter.replace(' · ', ', chapter '));
  if (Number.isFinite(percent)) parts.push(`${percent}% through book`);
  if (saved) parts.push(saved);
  link.setAttribute('aria-label', parts.join('. '));
}

function paintSemanticProgress(meta, slug, progress, currentRun, link, chapter, saved) {
  semanticProgress(meta, slug, progress).then((result) => {
    if (!result || currentRun !== runId) return;
    const meter = document.getElementById('continueCardMeter');
    const fill = document.getElementById('continueCardProgress');
    const percent = Math.max(0, Math.min(100, Number(result.percent) || 0));
    if (fill) fill.style.width = `${percent}%`;
    if (meter) meter.hidden = false;
    setAccessibleLabel(link, meta, chapter, saved, percent);
  }).catch(() => {});
}

async function enhanceCard() {
  scheduled = false;
  const card = document.getElementById('continueCard');
  const link = document.getElementById('continueCardLink');
  if (!card || !link || card.hidden || document.body.dataset.stage !== 'library') return;

  const href = link.getAttribute('href') || '';
  const slug = slugFromContinueHref(href);
  const progress = slug ? loadStoredProgress(slug) : null;
  if (!slug || !progress) return;

  const key = `${href}|${progress.savedAt || ''}`;
  if (key === lastKey && ['loading', 'true'].includes(card.dataset.currentBookReady)) return;
  lastKey = key;
  const currentRun = ++runId;

  const stylesAvailable = await installStyles();
  if (!stylesAvailable || currentRun !== runId) {
    lastKey = '';
    return;
  }
  ensureMarkup(link);
  card.dataset.currentBookReady = 'loading';

  try {
    const readme = await fetchText(`books/${slug}/README.md`);
    if (currentRun !== runId) return;
    const meta = parseBookReadme(readme, slug);
    const cover = await firstExisting(coverCandidates(slug)).catch(() => null);
    if (currentRun !== runId) return;

    const author = String(meta.authors || '').replace(/@/g, '').trim();
    const chapter = chapterResumeLabel(meta, progress);
    const saved = relativeSavedLabel(progress.savedAt);

    document.getElementById('continueCardTitle').textContent = meta.title || slug;
    document.getElementById('continueCardAuthor').textContent = author;
    document.getElementById('continueCardAuthor').hidden = !author;
    document.getElementById('continueCardChapter').textContent = chapter;
    document.getElementById('continueCardChapter').hidden = !chapter;
    document.getElementById('continueCardSaved').textContent = saved;
    document.getElementById('continueCardSaved').hidden = !saved;
    setCover(slug, cover);
    setAccessibleLabel(link, meta, chapter, saved, null);
    card.dataset.currentBookReady = 'true';

    const enrich = () => paintSemanticProgress(meta, slug, progress, currentRun, link, chapter, saved);
    if ('requestIdleCallback' in window) window.requestIdleCallback(enrich, { timeout: 1200 });
    else window.setTimeout(enrich, 120);
  } catch {
    card.dataset.currentBookReady = 'fallback';
    lastKey = '';
  }
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(enhanceCard);
}

function install() {
  const card = document.getElementById('continueCard');
  if (!card) return;
  const observer = new MutationObserver(schedule);
  observer.observe(card, {
    attributes: true,
    attributeFilter: ['hidden'],
    childList: true,
    subtree: true,
    characterData: true,
  });
  const link = document.getElementById('continueCardLink');
  if (link) observer.observe(link, { attributes: true, attributeFilter: ['href'] });
  const stageObserver = new MutationObserver(schedule);
  stageObserver.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
  schedule();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
}
