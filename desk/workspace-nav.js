const $ = (id) => document.getElementById(id);
const REDUCED = '(prefers-reduced-motion: reduce)';

const SECTIONS = Object.freeze([
  { id: 'summaryGrid', label: 'Overview' },
  { id: 'readerDesignStudio', label: 'Reader design' },
  { id: 'newPublicationStudio', label: 'New publication' },
  { id: 'manuscriptList', label: 'Manuscripts' },
]);

function visible(element) {
  return !!element && !element.hidden && element.getClientRects().length > 0;
}

function scrollToElement(element) {
  if (!element) return;
  const behavior = window.matchMedia?.(REDUCED).matches ? 'auto' : 'smooth';
  element.scrollIntoView({ behavior, block: 'start' });
}

function focusSearch() {
  const search = $('bookSearch');
  if (!search) return;
  scrollToElement($('deskControls') || search);
  window.setTimeout(() => {
    try { search.focus({ preventScroll: true }); }
    catch { search.focus(); }
    search.select?.();
  }, window.matchMedia?.(REDUCED).matches ? 0 : 180);
}

function buttonFor(nav, id) {
  return nav.querySelector(`[data-workspace-target="${id}"]`);
}

function syncButtons(nav) {
  for (const section of SECTIONS) {
    const target = $(section.id);
    const button = buttonFor(nav, section.id);
    if (!button) continue;
    button.hidden = !visible(target);
  }

  const repo = $('repoOverview');
  nav.hidden = !repo || repo.hidden;
}

function installActiveTracking(nav) {
  if (!('IntersectionObserver' in window)) return;
  const ratios = new Map();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
    const active = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
    nav.querySelectorAll('[data-workspace-target]').forEach((button) => {
      const selected = !!active && active[1] > 0 && button.dataset.workspaceTarget === active[0];
      button.classList.toggle('active', selected);
      if (selected) button.setAttribute('aria-current', 'location');
      else button.removeAttribute('aria-current');
    });
  }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, .01, .2, .5] });

  const observed = new Set();
  const observeAvailable = () => {
    for (const section of SECTIONS) {
      const target = $(section.id);
      if (!target || observed.has(target)) continue;
      observed.add(target);
      observer.observe(target);
    }
  };
  observeAvailable();
  new MutationObserver(observeAvailable).observe(document.body, { childList: true, subtree: true });
}

function installStyles() {
  if (document.querySelector('link[data-workspace-nav]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('./workspace-nav.css?v=1', import.meta.url).href;
  link.dataset.workspaceNav = 'true';
  document.head.appendChild(link);
}

function installWorkspaceNav() {
  if ($('workspaceMap')) return;
  const repo = $('repoOverview');
  if (!repo) return;

  const nav = document.createElement('nav');
  nav.id = 'workspaceMap';
  nav.className = 'workspace-map';
  nav.setAttribute('aria-label', 'Publishing workspace');
  nav.innerHTML = `
    <span class="workspace-map-label">Workspace</span>
    <div class="workspace-map-scroll">
      ${SECTIONS.map((section) => `<button type="button" data-workspace-target="${section.id}">${section.label}</button>`).join('')}
    </div>
    <button class="workspace-map-find" type="button" data-workspace-find>
      <span>Find</span><kbd>⌘K</kbd>
    </button>`;

  repo.insertAdjacentElement('afterend', nav);

  nav.addEventListener('click', (event) => {
    const targetButton = event.target.closest('[data-workspace-target]');
    if (targetButton) {
      scrollToElement($(targetButton.dataset.workspaceTarget));
      return;
    }
    if (event.target.closest('[data-workspace-find]')) focusSearch();
  });

  document.addEventListener('keydown', (event) => {
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.key.toLowerCase() !== 'k') return;
    if (event.defaultPrevented) return;
    event.preventDefault();
    focusSearch();
  }, true);

  syncButtons(nav);
  new MutationObserver(() => syncButtons(nav)).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['hidden'],
  });
  installActiveTracking(nav);
}

function initialize() {
  installStyles();
  installWorkspaceNav();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
}
