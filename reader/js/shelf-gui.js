import './shelf-library-sort.js';

/* Progressive enhancement for the Shelf/library surface.
   Core reading, routing, and catalog behavior remains owned by app.js. */

function $(id) {
  return document.getElementById(id);
}

function libraryStage() {
  return document.body.dataset.stage === 'library';
}

function searchShortcutLabel() {
  const platform = String(navigator.platform || navigator.userAgent || '').toLowerCase();
  return platform.includes('mac') ? '⌘K' : 'Ctrl K';
}

function installSearchControl() {
  const bar = document.querySelector('.library-bar');
  const input = $('librarySearch');
  if (!bar || !input || input.closest('.library-search-control')) return;

  bar.setAttribute('role', 'search');
  bar.setAttribute('aria-label', 'Shelf controls');
  input.setAttribute('aria-label', 'Search titles and passages');
  input.setAttribute('aria-controls', 'libraryHits stacks shelf');
  input.setAttribute('enterkeyhint', 'search');
  input.placeholder = 'Search titles and passages';

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
  key.textContent = searchShortcutLabel();
  key.title = 'Focus search';
  key.setAttribute('aria-hidden', 'true');

  input.replaceWith(control);
  control.append(icon, input, key);

  const sort = bar.querySelector('.setting-pills');
  if (sort) {
    sort.setAttribute('role', 'group');
    sort.setAttribute('aria-label', 'Sort publications');
  }

  const hits = $('libraryHits');
  if (hits) {
    hits.setAttribute('aria-label', 'Library search results');
    hits.setAttribute('aria-live', 'polite');
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

function plural(count, one, many = `${one}s`) {
  return count === 1 ? `1 ${one}` : `${count} ${many}`;
}

function searchResultCount(hits) {
  if (!hits || hits.hidden) return 0;
  return [...hits.querySelectorAll('li')].filter((item) => item.querySelector('a')).length;
}

function searchMessage(hits) {
  if (!hits || hits.hidden) return '';
  return [...hits.querySelectorAll('li')]
    .filter((item) => !item.querySelector('a'))
    .map((item) => item.textContent.trim())
    .filter(Boolean)
    .join(' ');
}

function syncStatus() {
  const status = $('shelfStatus');
  const search = $('librarySearch');
  if (!status || !search) return;

  const query = search.value.trim();
  document.body.classList.toggle('shelf-searching', Boolean(query));

  const hits = $('libraryHits');
  const hitCount = searchResultCount(hits);
  const message = searchMessage(hits);
  const volumeCount = syncVolumes();

  if (!query) {
    status.textContent = `${plural(volumeCount, 'publication')} · ${searchShortcutLabel()} to search`;
    return;
  }

  if (query.length < 2) {
    status.textContent = `${plural(volumeCount, 'title match')} · type 2+ characters to search passages`;
    return;
  }

  if (hitCount > 0) {
    status.textContent = `${plural(hitCount, 'result')} for “${query}”`;
    return;
  }

  if (hits?.dataset.searchState === 'loading' || /^Searching titles and passages/i.test(message)) {
    const titleLead = volumeCount ? `${plural(volumeCount, 'title match')} · ` : '';
    status.textContent = `${titleLead}searching passages…`;
    return;
  }

  if (hits?.dataset.searchState === 'error' || /could not be loaded/i.test(message)) {
    status.textContent = `${plural(volumeCount, 'title match')} · passage search unavailable`;
    return;
  }

  if (message) {
    status.textContent = `No title or passage results for “${query}”`;
    return;
  }

  status.textContent = `Searching titles and passages for “${query}”…`;
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
    attributeFilter: ['class', 'hidden', 'data-search-state'],
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
