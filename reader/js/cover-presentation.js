import { fetchText, firstExisting } from './base.js';

export const COVER_PRESENTATION_OPTIONS = Object.freeze({
  layouts: Object.freeze(['classic', 'centered', 'lower-third']),
  aligns: Object.freeze(['left', 'center']),
  fits: Object.freeze(['cover', 'contain']),
  tones: Object.freeze(['light', 'dark']),
  ranges: Object.freeze({
    positionX: Object.freeze({ min: 0, max: 100, step: 1 }),
    positionY: Object.freeze({ min: 0, max: 100, step: 1 }),
    shade: Object.freeze({ min: 0, max: 0.75, step: 0.05 }),
    titleScale: Object.freeze({ min: 0.8, max: 1.4, step: 0.05 }),
  }),
});

export const COVER_PRESENTATION_DEFAULTS = Object.freeze({
  layout: 'classic',
  align: 'center',
  fit: 'cover',
  positionX: 50,
  positionY: 50,
  shade: 0.42,
  titleScale: 1,
  tone: 'light',
});

const LAYOUTS = new Set(COVER_PRESENTATION_OPTIONS.layouts);
const ALIGNS = new Set(COVER_PRESENTATION_OPTIONS.aligns);
const FITS = new Set(COVER_PRESENTATION_OPTIONS.fits);
const TONES = new Set(COVER_PRESENTATION_OPTIONS.tones);
const cache = new Map();
const artCache = new Map();

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function finite(value) {
  if (value == null || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function pick(set, value) {
  return set.has(value) ? value : undefined;
}

export function normalizeCoverPresentation(raw = {}) {
  const source = raw && typeof raw.cover === 'object' && raw.cover !== null ? raw.cover : raw;
  const ranges = COVER_PRESENTATION_OPTIONS.ranges;
  const positionX = finite(source?.positionX);
  const positionY = finite(source?.positionY);
  const shade = finite(source?.shade);
  const titleScale = finite(source?.titleScale);
  const normalized = {
    layout: pick(LAYOUTS, source?.layout),
    align: pick(ALIGNS, source?.align),
    fit: pick(FITS, source?.fit),
    positionX: positionX == null ? undefined : Math.round(clamp(positionX, ranges.positionX.min, ranges.positionX.max)),
    positionY: positionY == null ? undefined : Math.round(clamp(positionY, ranges.positionY.min, ranges.positionY.max)),
    shade: shade == null ? undefined : Number(clamp(shade, ranges.shade.min, ranges.shade.max).toFixed(2)),
    titleScale: titleScale == null ? undefined : Number(clamp(titleScale, ranges.titleScale.min, ranges.titleScale.max).toFixed(2)),
    tone: pick(TONES, source?.tone),
  };
  return Object.fromEntries(Object.entries(normalized).filter(([, value]) => value !== undefined));
}

export function resolveCoverPresentation(raw = {}) {
  return { ...COVER_PRESENTATION_DEFAULTS, ...normalizeCoverPresentation(raw) };
}

export function coverStyleState(raw = {}) {
  const cover = resolveCoverPresentation(raw);
  return {
    ...cover,
    shadeTop: Math.round(cover.shade * 29) / 100,
    titleSize: `clamp(${(1.7 * cover.titleScale).toFixed(2)}rem, ${(4 * cover.titleScale).toFixed(2)}vw, ${(2.8 * cover.titleScale).toFixed(2)}rem)`,
  };
}

export async function loadBookCoverPresentation(slug) {
  const clean = String(slug || '').trim();
  if (!clean) return resolveCoverPresentation();
  if (cache.has(clean)) return cache.get(clean);
  const loading = (async () => {
    try {
      const raw = JSON.parse(await fetchText(`books/${clean}/reader.json`));
      return resolveCoverPresentation(raw);
    } catch {
      return resolveCoverPresentation();
    }
  })();
  cache.set(clean, loading);
  return loading;
}

export async function findBookCoverAsset(slug) {
  const clean = String(slug || '').trim();
  if (!clean) return null;
  if (artCache.has(clean)) return artCache.get(clean);
  const loading = firstExisting(
    ['cover.png', 'cover.jpg', 'cover.webp', 'cover.jpeg'].map((name) => `books/${clean}/media/${name}`)
  ).catch(() => null);
  artCache.set(clean, loading);
  return loading;
}
