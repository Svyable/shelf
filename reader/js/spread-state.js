/**
 * Resolve the page geometry the core reader intends before the first
 * visible page has been painted. The legacy signal (right page is
 * active) is unavailable during initial pagination, so the view-mode
 * control is the authoritative pre-paint hint: when it offers
 * "Single", the current mode is Spread.
 */
export function intendedPagedSpread({
  stage = '',
  mode = 'paged',
  rightActive = false,
  toggleHidden = true,
  toggleLabel = '',
} = {}) {
  if (stage !== 'read' || mode === 'scroll') return false;
  if (rightActive) return true;
  return !toggleHidden && /^single$/i.test(String(toggleLabel).trim());
}
