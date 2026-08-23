const KATEX_VERSION = '0.18.4';
const KATEX_URL = `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.js`;
const KATEX_INTEGRITY = 'sha384-ykMNcWQhhTUb0YV9SPpPUFURHZ+tWmubkakGBP+OgNK/UXdO2gtzglWx0Rj9hnO3';
const MATH_CSS = 'css/math.css?v=r1';
const MATH_CACHE = 'obb-shell-v28';

let markedInstalled = false;
let engineRequested = false;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sourceAttribute(tex) {
  return escapeHtml(encodeURIComponent(String(tex || '')));
}

function trimMath(value) {
  return String(value || '').replace(/^\s+|\s+$/g, '');
}

export function tokenizeBlockMath(src) {
  const source = String(src || '');
  let match = source.match(/^(?: {0,3})\$\$[ \t]*\n?([\s\S]*?)\n?[ \t]*\$\$(?:[ \t]*\n|$)/);
  if (match) {
    const tex = trimMath(match[1]);
    if (tex) return { raw: match[0], tex, display: true, delimiter: '$$' };
  }

  match = source.match(/^(?: {0,3})\\\[[ \t]*\n?([\s\S]*?)\n?[ \t]*\\\](?:[ \t]*\n|$)/);
  if (match) {
    const tex = trimMath(match[1]);
    if (tex) return { raw: match[0], tex, display: true, delimiter: '\\[' };
  }

  match = source.match(/^(?: {0,3})(\\begin\{(equation\*?|align\*?|alignat\*?|gather\*?)\}[\s\S]*?\\end\{\2\})(?:[ \t]*\n|$)/);
  if (match) {
    const tex = trimMath(match[1]);
    if (tex) return { raw: match[0], tex, display: true, delimiter: 'environment' };
  }

  return null;
}

export function tokenizeInlineMath(src) {
  const source = String(src || '');
  let match = source.match(/^\\\(([^\n]+?)\\\)/);
  if (match) {
    const tex = trimMath(match[1]);
    if (tex) return { raw: match[0], tex, display: false, delimiter: '\\(' };
  }

  match = source.match(/^\$(?!\$|\s)((?:\\.|[^$\n\\])+?)\$(?!\$)/);
  if (match) {
    const tex = match[1];
    if (tex && !/\s$/.test(tex)) {
      return { raw: match[0], tex, display: false, delimiter: '$' };
    }
  }
  return null;
}

function katexOptions(displayMode) {
  return {
    displayMode,
    output: 'mathml',
    throwOnError: false,
    strict: 'warn',
    trust: false,
    maxSize: 20,
    maxExpand: 1000,
  };
}

function renderedMarkup(tex, displayMode, inner) {
  const tag = displayMode ? 'div' : 'span';
  const modeClass = displayMode ? 'reader-math-display' : 'reader-math-inline';
  return `<${tag} class="reader-math ${modeClass}" data-math-rendered="true" data-math-source="${sourceAttribute(tex)}">${inner}</${tag}>`;
}

function pendingMarkup(tex, displayMode) {
  const tag = displayMode ? 'div' : 'span';
  const modeClass = displayMode ? 'reader-math-display' : 'reader-math-inline';
  const raw = displayMode ? `$$${tex}$$` : `$${tex}$`;
  return `<${tag} class="reader-math ${modeClass} reader-math-pending" data-math-rendered="false" data-math-source="${sourceAttribute(tex)}"><code>${escapeHtml(raw)}</code></${tag}>`;
}

export function renderMath(tex, displayMode = false) {
  const source = trimMath(tex);
  const katex = globalThis.katex;

  if (katex?.renderToString) {
    try {
      return renderedMarkup(source, displayMode, katex.renderToString(source, katexOptions(displayMode)));
    } catch (error) {
      console.warn('Could not render LaTeX math', error);
    }
  }
  return pendingMarkup(source, displayMode);
}

function blockStart(src) {
  const match = String(src || '').match(/(?:^|\n)( {0,3})(\$\$|\\\[|\\begin\{(?:equation|align|alignat|gather)\*?\})/);
  if (!match) return undefined;
  const prefix = match[0].startsWith('\n') ? 1 : 0;
  return match.index + prefix;
}

function inlineStart(src) {
  const indexes = [src.indexOf('$'), src.indexOf('\\(')].filter((value) => value >= 0);
  return indexes.length ? Math.min(...indexes) : undefined;
}

export function installMarkedMath(marked = globalThis.window?.marked) {
  if (markedInstalled || !marked?.use) return false;
  marked.use({
    extensions: [
      {
        name: 'bookselfMathBlock',
        level: 'block',
        start: blockStart,
        tokenizer(src) {
          const token = tokenizeBlockMath(src);
          return token ? { type: 'bookselfMathBlock', ...token } : undefined;
        },
        renderer(token) {
          return `${renderMath(token.tex, true)}\n`;
        },
      },
      {
        name: 'bookselfMathInline',
        level: 'inline',
        start: inlineStart,
        tokenizer(src) {
          const token = tokenizeInlineMath(src);
          return token ? { type: 'bookselfMathInline', ...token } : undefined;
        },
        renderer(token) {
          return renderMath(token.tex, false);
        },
      },
    ],
  });
  markedInstalled = true;
  return true;
}

function installStyles() {
  if (typeof document === 'undefined' || document.querySelector(`link[href="${MATH_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = MATH_CSS;
  document.head.appendChild(link);
}

function hydratePendingMath() {
  if (typeof document === 'undefined' || !globalThis.katex?.renderToString) return;
  document.querySelectorAll('.reader-math-pending[data-math-source]').forEach((element) => {
    try {
      const tex = decodeURIComponent(element.dataset.mathSource || '');
      const displayMode = element.classList.contains('reader-math-display');
      element.innerHTML = globalThis.katex.renderToString(tex, katexOptions(displayMode));
      element.classList.remove('reader-math-pending');
      element.dataset.mathRendered = 'true';
    } catch (error) {
      element.classList.add('reader-math-error');
      console.warn('Could not hydrate LaTeX math', error);
    }
  });
}

function cacheMathEngine() {
  if (typeof caches === 'undefined') return;
  caches.open(MATH_CACHE)
    .then((cache) => cache.add(KATEX_URL))
    .catch(() => {
      // Math still renders from the successful script response.
    });
}

function announceEngineReady() {
  hydratePendingMath();
  document.documentElement.dataset.math = 'ready';
  window.dispatchEvent(new Event('bookself:math-ready'));
  // Pages repaginates from the original Markdown; Scroll refreshes its block metrics.
  window.dispatchEvent(new Event('resize'));
}

export function requestMathEngine() {
  if (engineRequested || typeof document === 'undefined') return;
  engineRequested = true;
  if (globalThis.katex?.renderToString) {
    cacheMathEngine();
    queueMicrotask(announceEngineReady);
    return;
  }

  const script = document.createElement('script');
  script.src = KATEX_URL;
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.integrity = KATEX_INTEGRITY;
  script.referrerPolicy = 'no-referrer';
  script.dataset.bookselfMathEngine = KATEX_VERSION;
  script.addEventListener('load', () => {
    if (globalThis.katex?.renderToString) {
      cacheMathEngine();
      announceEngineReady();
    } else {
      document.documentElement.dataset.math = 'fallback';
    }
  }, { once: true });
  script.addEventListener('error', () => {
    document.documentElement.dataset.math = 'fallback';
    window.dispatchEvent(new Event('bookself:math-unavailable'));
  }, { once: true });
  document.head.appendChild(script);
}

function protectMathInteractions() {
  document.addEventListener('click', (event) => {
    if (event.target.closest?.('.reader-math')) event.stopPropagation();
  }, true);
  document.addEventListener('touchstart', (event) => {
    if (event.target.closest?.('.reader-math')) event.stopPropagation();
  }, { capture: true, passive: true });
}

if (typeof window !== 'undefined') {
  installStyles();
  installMarkedMath();
  protectMathInteractions();
  requestMathEngine();
}
