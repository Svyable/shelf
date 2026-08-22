import { renderMarkdown } from './markdown.js';

export function bookAsMarkdown(book) {
  const bits = [
    `# ${book.title}`,
    book.authors ? `*${book.authors.replace(/@/g, '')}*` : '',
    book.publisher ? `Publisher: ${book.publisher}` : '',
    '',
  ].filter((l) => l !== undefined);
  for (const ch of book.chapters || []) {
    bits.push('', '---', '', ch.markdown || '');
  }
  return bits.join('\n').trim() + '\n';
}

export function bookAsHtml(book) {
  const body = (book.chapters || [])
    .map((ch) => `<section>${renderMarkdown(ch.markdown || '', book.slug)}</section>`)
    .join('\n');
  return `<!DOCTYPE html>
<html lang="${book.language || 'en'}">
<head>
<meta charset="utf-8">
<title>${escapeHtml(book.title)}</title>
<style>
  body { max-width: 40rem; margin: 2rem auto; font: 18px/1.55 Georgia, serif; }
  h1, h2 { font-family: Georgia, serif; }
  img { max-width: 100%; }
</style>
</head>
<body>
${body}
</body>
</html>
`;
}

export function downloadText(filename, text, type = 'text/plain') {
  const blob = new Blob([text], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
