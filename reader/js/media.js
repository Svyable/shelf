const MEDIA_CSS = 'css/media.css?v=r1';
const loadedSources = new Set();
let repaginateTimer = null;
let lightbox = null;
let lastTrigger = null;

function installStyles() {
  if (document.querySelector(`link[href="${MEDIA_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = MEDIA_CSS;
  document.head.appendChild(link);
}

function readerImage(target) {
  return target instanceof HTMLImageElement
    && !!target.closest('.page-inner, .scroll-document, #pageMeasureInner');
}

function scheduleRepaginate(img) {
  const src = img.currentSrc || img.src;
  if (!src || loadedSources.has(src)) return;
  loadedSources.add(src);
  clearTimeout(repaginateTimer);
  repaginateTimer = window.setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 80);
}

function ensureLightbox() {
  if (lightbox) return lightbox;
  const overlay = document.createElement('div');
  overlay.className = 'reader-media-lightbox';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Expanded image');
  overlay.innerHTML = `
    <div class="reader-media-lightbox-card">
      <button class="reader-media-lightbox-close" type="button" aria-label="Close expanded image">×</button>
      <img alt="">
      <p class="reader-media-lightbox-caption"></p>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.reader-media-lightbox-close')?.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeLightbox();
  });
  lightbox = overlay;
  return overlay;
}

function openLightbox(img) {
  const overlay = ensureLightbox();
  const expanded = overlay.querySelector('img');
  const caption = overlay.querySelector('.reader-media-lightbox-caption');
  if (!expanded || !caption) return;
  lastTrigger = img;
  expanded.src = img.currentSrc || img.src;
  expanded.alt = img.alt || '';
  caption.textContent = img.alt || '';
  caption.hidden = !img.alt;
  overlay.hidden = false;
  overlay.querySelector('.reader-media-lightbox-close')?.focus();
}

function closeLightbox() {
  if (!lightbox || lightbox.hidden) return;
  lightbox.hidden = true;
  const expanded = lightbox.querySelector('img');
  if (expanded) expanded.removeAttribute('src');
  lastTrigger?.focus?.({ preventScroll: true });
  lastTrigger = null;
}

function prepareImage(img) {
  if (!readerImage(img)) return;
  img.decoding = 'async';
  img.draggable = false;
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', img.alt ? `Expand image: ${img.alt}` : 'Expand image');
  if (img.complete && img.naturalWidth) scheduleRepaginate(img);
}

function scan(root = document) {
  root.querySelectorAll?.('.page-inner img, .scroll-document img, #pageMeasureInner img').forEach(prepareImage);
}

function installObserver() {
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches?.('img')) prepareImage(node);
        scan(node);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

installStyles();
scan();
installObserver();

document.addEventListener('load', (event) => {
  if (!readerImage(event.target)) return;
  prepareImage(event.target);
  scheduleRepaginate(event.target);
}, true);

document.addEventListener('click', (event) => {
  const img = event.target.closest?.('.page-inner img, .scroll-document img');
  if (!img) return;
  event.preventDefault();
  event.stopPropagation();
  openLightbox(img);
}, true);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && !lightbox.hidden) {
    event.preventDefault();
    event.stopPropagation();
    closeLightbox();
    return;
  }
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches?.('.page-inner img, .scroll-document img')) {
    event.preventDefault();
    event.stopPropagation();
    openLightbox(event.target);
  }
}, true);
