// Keep Sven Hardy Benson's Shelf on the same core Reader runtime as Desk.
// The Shelf repository still owns its publications, imprint, styles, and
// Shelf-specific enhancements; Bookself supplies the canonical application
// bootstrap so startup/catalog fixes do not drift between deployments.
const canonicalAppUrl = 'https://svyable.github.io/bookself/reader/js/app.js?v=r5';

try {
  await import(canonicalAppUrl);
} catch (error) {
  console.error('Shelf Reader bootstrap failed', error);
  const message = document.getElementById('shelfError');
  if (message) {
    message.hidden = false;
    message.textContent = 'The Reader runtime could not be loaded. Reload this page to try again.';
  }
  throw error;
}
