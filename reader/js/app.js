// Keep Sven Hardy Benson's Shelf on the same core Reader runtime as Desk.
// The Shelf repository still owns its publications, imprint, styles, and
// Shelf-specific enhancements; Bookself supplies the canonical application
// bootstrap so startup/catalog fixes do not drift between deployments.
const canonicalAppUrl = 'https://svyable.github.io/bookself/reader/js/app.js?v=20260911-shelf-2';

try {
  await import(canonicalAppUrl);

  // The canonical app is hosted under /bookself/, so its own service-worker
  // registration is scoped there. Shelf must explicitly keep its /shelf/reader/
  // worker registered so existing shell generations are revalidated and new
  // visitors receive the Shelf offline/runtime cache rather than a stale app.js.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(new URL('../sw.js', import.meta.url), { updateViaCache: 'none' })
      .then((registration) => registration.update().catch(() => {}))
      .catch((error) => console.warn('Shelf service worker could not be updated', error));
  }
} catch (error) {
  console.error('Shelf Reader bootstrap failed', error);
  const message = document.getElementById('shelfError');
  if (message) {
    message.hidden = false;
    message.textContent = 'The Reader runtime could not be loaded. Reload this page to try again.';
  }
  throw error;
}
