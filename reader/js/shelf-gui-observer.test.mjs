import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';

// Model the relevant DOM contract: assigning identical textContent still
// replaces child nodes; assigning identical hidden still emits an attribute record.
test('library observer settles after status updates and publisher hiding', () => {
  let callback;
  let pending = false;
  let observing = false;
  let text = '';
  let hidden = false;
  const mutate = () => { if (observing) pending = true; };
  const button = { textContent: 'All', classList: { contains: () => true }, setAttribute() {} };
  const nodes = {
    libraryView: {},
    librarySearch: { value: '', addEventListener() {} },
    shelfStatus: { get textContent() { return text; }, set textContent(value) { text = value; mutate(); } },
    pubFilters: {
      setAttribute() {}, querySelectorAll: () => [button, button],
      get hidden() { return hidden; }, set hidden(value) { hidden = value; mutate(); },
    },
    libraryHits: { hidden: true, dataset: {}, querySelectorAll: () => [] },
  };
  const context = vm.createContext({
    document: {
      readyState: 'loading', addEventListener() {},
      body: { dataset: { stage: 'library' }, classList: { toggle() {} } },
      getElementById: id => nodes[id], querySelectorAll: () => [],
    },
    navigator: { platform: 'Mac' },
    MutationObserver: class {
      constructor(fn) { callback = fn; }
      observe() { observing = true; }
    },
  });
  const source = readFileSync(new URL('./shelf-gui.js', import.meta.url), 'utf8').replace(/^import .*;\n/m, '');
  vm.runInContext(source, context);
  vm.runInContext('installObservers(); syncLibraryUi();', context);
  const settle = () => {
    let deliveries = 0;
    while (pending && deliveries < 20) {
      pending = false;
      deliveries++;
      callback();
    }
    assert.equal(pending, false, 'observer must not feed its own microtask loop');
    assert.ok(deliveries <= 2);
  };
  settle();
  assert.equal(hidden, true);
  assert.match(text, /0 publications/);
  for (const [query, state] of [['a', ''], ['ab', 'loading'], ['ab', 'error'], ['', '']]) {
    nodes.librarySearch.value = query;
    nodes.libraryHits.dataset.searchState = state;
    pending = true;
    settle();
  }
  // Direct book routes retain the library DOM, so the same guarantee is needed
  // even after it becomes hidden.
  context.document.body.dataset.stage = 'cover';
  pending = true;
  settle();
});
