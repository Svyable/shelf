const MIN_KEYBOARD_OCCLUSION = 120;
const MIN_KEYBOARD_OCCLUSION_RATIO = 0.18;
const MAX_KEYBOARD_WIDTH_DRIFT_RATIO = 0.04;
const KEYBOARD_RESTORE_TOLERANCE = 24;
const LIFECYCLE_STALE_MS = 30000;
const LIFECYCLE_DIMENSION_DRIFT_RATIO = 0.04;

function finite(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function geometry(previous, next) {
  const previousWidth = finite(previous?.width);
  const previousHeight = finite(previous?.height);
  const nextWidth = finite(next?.width);
  const nextHeight = finite(next?.height);
  const widthDrift = Math.abs(nextWidth - previousWidth);
  const widthTolerance = Math.max(8, previousWidth * MAX_KEYBOARD_WIDTH_DRIFT_RATIO);
  const heightLoss = previousHeight - nextHeight;
  const heightThreshold = Math.max(
    MIN_KEYBOARD_OCCLUSION,
    previousHeight * MIN_KEYBOARD_OCCLUSION_RATIO
  );
  return {
    previousWidth,
    previousHeight,
    nextWidth,
    nextHeight,
    widthStable: previousWidth > 0 && nextWidth > 0 && widthDrift <= widthTolerance,
    heightLoss,
    heightThreshold,
  };
}

export function textEntryTarget(target) {
  if (!target) return false;
  if (target.isContentEditable) return true;
  const tag = String(target.tagName || '').toLowerCase();
  if (tag === 'textarea') return true;
  if (tag !== 'input') return false;
  const type = String(target.type || 'text').toLowerCase();
  return ![
    'button',
    'checkbox',
    'color',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit',
  ].includes(type);
}

export function stabilizeViewport(previous, next, { editing = false } = {}) {
  if (!next) {
    return { snapshot: previous || null, transientKeyboard: false };
  }
  if (!previous) {
    return { snapshot: next, transientKeyboard: false };
  }

  const g = geometry(previous, next);
  const transientKeyboard = !!editing
    && g.previousHeight > 0
    && g.nextHeight > 0
    && g.widthStable
    && g.heightLoss >= g.heightThreshold;

  return {
    snapshot: transientKeyboard ? previous : next,
    transientKeyboard,
  };
}

/**
 * Track the complete soft-keyboard viewport lifecycle. A keyboard opening is a
 * transient occlusion, not new page geometry. Its matching restoration is also
 * suppressible because the Reader never adopted the occluded size. Genuine
 * rotations/resizes always win through width drift or insufficient occlusion.
 */
export function keyboardViewportTransition(
  stable,
  next,
  { editing = false, keyboardActive = false } = {}
) {
  if (!next) {
    return { snapshot: stable || null, keyboardActive: false, suppress: false, phase: 'none' };
  }
  if (!stable) {
    return { snapshot: next, keyboardActive: false, suppress: false, phase: 'baseline' };
  }

  const g = geometry(stable, next);
  const opening = !!editing
    && g.previousHeight > 0
    && g.nextHeight > 0
    && g.widthStable
    && g.heightLoss >= g.heightThreshold;
  if (opening) {
    return { snapshot: stable, keyboardActive: true, suppress: true, phase: 'opening' };
  }

  const restored = !!keyboardActive
    && g.widthStable
    && Math.abs(g.nextHeight - g.previousHeight) <= KEYBOARD_RESTORE_TOLERANCE;
  if (restored) {
    return { snapshot: stable, keyboardActive: false, suppress: true, phase: 'restored' };
  }

  return { snapshot: next, keyboardActive: false, suppress: false, phase: 'layout' };
}

function routeIdentity(route = {}) {
  if (route.view !== 'read' || !route.slug || !route.chapter) return null;
  return `${route.slug}:${route.chapter}:${Math.max(0, Number(route.offset) || 0)}`;
}

export function readingLifecycleSnapshot({ route, stage = '', mode = 'paged', viewport = null, at = 0 } = {}) {
  const identity = routeIdentity(route);
  if (!identity || stage !== 'read') return null;
  return Object.freeze({
    identity,
    slug: route.slug,
    chapter: route.chapter,
    offset: Math.max(0, Number(route.offset) || 0),
    mode: mode === 'scroll' ? 'scroll' : 'paged',
    viewport: viewport ? {
      width: Math.max(0, finite(viewport.width)),
      height: Math.max(0, finite(viewport.height)),
    } : null,
    at: Math.max(0, finite(at)),
  });
}

function dimensionDrift(previous, next) {
  if (!previous || !next) return false;
  const pw = Math.max(1, finite(previous.width));
  const ph = Math.max(1, finite(previous.height));
  return Math.abs(finite(next.width) - pw) / pw >= LIFECYCLE_DIMENSION_DRIFT_RATIO
    || Math.abs(finite(next.height) - ph) / ph >= LIFECYCLE_DIMENSION_DRIFT_RATIO;
}

/**
 * Decide what a returned Reader must refresh after BFCache restore or a long
 * background suspension. Source identity is deliberately strict: a lifecycle
 * event never drags a reader back across a route change.
 */
export function lifecycleResumePlan(saved, current, {
  persisted = false,
  now = 0,
  viewport = null,
} = {}) {
  if (!saved || !current || saved.identity !== current.identity) {
    return Object.freeze({ resume: false, repaginate: false, resyncRoute: false, reason: 'route-changed' });
  }
  const elapsed = Math.max(0, finite(now) - finite(saved.at));
  const stale = elapsed >= LIFECYCLE_STALE_MS;
  const geometryChanged = dimensionDrift(saved.viewport, viewport || current.viewport);
  const resume = !!persisted || stale || geometryChanged;
  if (!resume) {
    return Object.freeze({ resume: false, repaginate: false, resyncRoute: false, reason: 'fresh' });
  }
  return Object.freeze({
    resume: true,
    repaginate: !!persisted || geometryChanged,
    resyncRoute: true,
    reason: persisted ? 'bfcache' : geometryChanged ? 'geometry' : 'stale',
  });
}
