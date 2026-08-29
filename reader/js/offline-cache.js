(function installOfflineCacheHelpers(scope) {
  const MARKDOWN_LINK = /(?<!!)\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\)/g;

  function publicationRoot(baseUrl) {
    const base = new URL(baseUrl);
    const slash = base.pathname.lastIndexOf('/');
    base.pathname = `${base.pathname.slice(0, slash + 1)}`;
    base.search = '';
    base.hash = '';
    return base;
  }

  function chapterLinks(markdown, baseUrl, limit = 160) {
    const root = publicationRoot(baseUrl);
    const urls = [];
    const seen = new Set();
    MARKDOWN_LINK.lastIndex = 0;
    let match;

    while ((match = MARKDOWN_LINK.exec(markdown || '')) && urls.length < limit) {
      const raw = match[1] || match[2] || '';
      let url;
      try {
        url = new URL(raw, baseUrl);
      } catch {
        continue;
      }
      url.hash = '';
      url.search = '';
      if (url.origin !== root.origin) continue;
      if (!url.pathname.startsWith(root.pathname)) continue;
      if (!/\.md$/i.test(url.pathname)) continue;
      const key = url.href;
      if (seen.has(key)) continue;
      seen.add(key);
      urls.push(key);
    }
    return urls;
  }

  function isPublicationReadme(url) {
    try {
      return /\/books\/[^/]+\/README\.md$/i.test(new URL(url).pathname);
    } catch {
      return false;
    }
  }

  scope.BookselfOfflineCache = Object.freeze({
    chapterLinks,
    isPublicationReadme,
  });
})(globalThis);
