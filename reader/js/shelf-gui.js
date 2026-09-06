/* Progressive enhancement for the Shelf/library surface.
   Core reading, routing, and catalog behavior remains owned by app.js. */

function $(id) {
  return document.getElementById(id);
}

function libraryStage() {
  return document.body.dataset.stage === 'library';
}

function installSearchControl() {
  const bar = document.querySelector('.library-bar');
  const input = $('librarySearch');
  if (!bar || !input || input.closest('.library-search-control')) return;

  bar.setAttribute('role', 'search');
  bar.setAttribute('aria-label', 'Shelf controls');
  input.setAttribute('aria-label', 'Search the shelf');
  input.setAttribute('enterkeyhint', 'search');

  const control = document.createElement('div');
  control.className = 'library-search-control';

  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.classList.add('library-search-icon');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '2');
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = '<circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.2-3.2"></path>';

  const key = document.createElement('kbd');
  key.className = 'library-search-key';
  key.textContent = '/';
  key.setAttribute('aria-hidden', 'true');

  input.replaceWith(control);
  control.append(icon, input, key);

  const sort = bar.querySelector('.setting-pills');
  if (sort) {
    sort.setAttribute('role', 'group');
    sort.setAttribute('aria-label', 'Sort publications');
  }
}

function installShelfStatus() {
  const bar = document.querySelector('.library-bar');
  if (!bar || $('shelfStatus')) return;
  const status = document.createElement('p');
  status.id = 'shelfStatus';
  status.className = 'shelf-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');
  bar.insertAdjacentElement('afterend', status);
}

function syncSortSemantics() {
  document.querySelectorAll('.library-bar [data-sort]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  });
}

function syncPublisherSemantics() {
  const filters = $('pubFilters');
  if (!filters) return;
  filters.setAttribute('role', 'group');
  filters.setAttribute('aria-label', 'Filter by publisher');
  const buttons = [...filters.querySelectorAll('button')];
  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  });

  // "All + one publisher" is not a useful filter choice; keep the shelf quieter.
  if (buttons.length > 0 && buttons.length <= 2 && buttons[0]?.textContent?.trim() === 'All') {
    filters.hidden = true;
  }
}

function syncVolumes() {
  const volumes = [
    ...document.querySelectorAll('#stacks .volume, #shelf .volume'),
  ];

  volumes.forEach((volume, index) => {
    volume.style.setProperty('--volume-index', String(index));
    const title = volume.querySelector('.volume-title')?.textContent?.trim() || 'Publication';
    const author = volume.querySelector('.volume-author')?.textContent?.trim() || '';
    const publisher = volume.querySelector('.volume-imprint')?.textContent?.trim() || '';
    const detail = [title, author && `by ${author}`, publisher].filter(Boolean).join(', ');
    volume.setAttribute('aria-label', volume.classList.contains('is-reading') ? `Continue ${detail}` : `Open ${detail}`);
  });

  return volumes.length;
}

function syncStatus() {
  const status = $('shelfStatus');
  const search = $('librarySearch');
  if (!status || !search) return;

  const query = search.value.trim();
  document.body.classList.toggle('shelf-searching', Boolean(query));

  const hits = $('libraryHits');
  const hitCount = hits && !hits.hidden ? hits.querySelectorAll('li').length : 0;
  const volumeCount = syncVolumes();

  if (query) {
    status.textContent = hitCount === 1
      ? `1 result for “${query}”`
      : `${hitCount} results for “${query}”`;
  } else {
    status.textContent = volumeCount === 1 ? '1 publication' : `${volumeCount} publications`;
  }
}

function syncLibraryUi() {
  syncSortSemantics();
  syncPublisherSemantics();
  syncStatus();
}

function installLibraryKeyboard() {
  document.addEventListener('keydown', (event) => {
    if (!libraryStage() || event.defaultPrevented || event.metaKey && event.key.toLowerCase() !== 'k') return;

    const input = $('librarySearch');
    if (!input) return;
    const target = event.target;
    const typing = target instanceof HTMLInputElement
      || target instanceof HTMLTextAreaElement
      || target?.isContentEditable;

    if ((event.key === '/' && !typing) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault();
      input.focus({ preventScroll: true });
      input.select();
      return;
    }

    if (event.key === 'Escape' && target === input) {
      if (input.value) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        syncLibraryUi();
      } else {
        input.blur();
      }
    }
  }, true);
}

function installObservers() {
  const library = $('libraryView');
  if (!library) return;

  const observer = new MutationObserver(() => syncLibraryUi());
  observer.observe(library, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'hidden'],
  });

  $('librarySearch')?.addEventListener('input', () => {
    requestAnimationFrame(syncLibraryUi);
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.library-bar [data-sort], #pubFilters button')) {
      requestAnimationFrame(syncLibraryUi);
    }
  });
}

function initialize() {
  if (document.documentElement.dataset.shelfGuiEnhanced === 'true') return;
  document.documentElement.dataset.shelfGuiEnhanced = 'true';
  installSearchControl();
  installShelfStatus();
  installLibraryKeyboard();
  installObservers();
  syncLibraryUi();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}
