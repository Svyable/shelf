import './page-drag.js';

queueMicrotask(() => {
  import('./semantic-progress.js').catch((error) => {
    console.warn('Semantic reading progress could not be loaded', error);
  });
});

/** Repo-root URL prefix so fetches work at / and at /<repo>/ */

export function repoBase() {
  const path = window.location.pathname.replace(/index\.html$/, '');
  if (path.endsWith('/reader/') || path.endsWith('/reader')) {
    return path.replace(/reader\/?$/, '');
  }
  const i = path.indexOf('/reader/');
  if (i >= 0) return path.slice(0, i + 1);
  return path.endsWith('/') ? path : `${path}/`;
}

export function fileUrl(relativePath) {
  const base = repoBase();
  const clean = String(relativePath).replace(/^\.\//, '').replace(/^\/+/, '');
  return `${base}${clean}`;
}

export async function fetchDocument(relativePath) {
  const url = fileUrl(relativePath);
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) {
    const err = new Error(`Could not load ${relativePath} (${res.status})`);
    err.status = res.status;
    err.url = url;
    throw err;
  }
  return {
    text: await res.text(),
    modified: res.headers.get('Last-Modified'),
  };
}

export async function fetchText(relativePath) {
  const doc = await fetchDocument(relativePath);
  return doc.text;
}

export async function fileExists(relativePath) {
  const url = fileUrl(relativePath);
  try {
    const res = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
    if (res.ok) return true;
    const get = await fetch(url, { method: 'GET', cache: 'no-cache' });
    return get.ok;
  } catch {
    return false;
  }
}

export async function firstExisting(relativePaths) {
  for (const path of relativePaths) {
    const url = fileUrl(path);
    try {
      const res = await fetch(url, { method: 'GET', cache: 'no-cache' });
      if (res.ok) return url;
    } catch {
      /* try next */
    }
  }
  return null;
}
