const STYLE_HREF = 'css/book-interior.css?v=r1';
let styleReady = null;

export function interiorStyleHref() {
  return STYLE_HREF;
}

function ensureStyles() {
  if (styleReady) return styleReady;
  const existing = document.querySelector(`link[href="${STYLE_HREF}"]`);
  if (existing) {
    styleReady = Promise.resolve(true);
    return styleReady;
  }

  styleReady = new Promise((resolve) => {
    const link = document.createElement('link');
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    link.addEventListener('load', () => finish(true), { once: true });
    link.addEventListener('error', () => finish(false), { once: true });
    document.head.appendChild(link);
    window.setTimeout(() => finish(!!link.sheet), 900);
  });
  return styleReady;
}

async function initialize() {
  const ready = await ensureStyles();
  if (!ready) return;
  document.documentElement.dataset.bookInterior = 'true';
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
}
