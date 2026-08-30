const FONT_LIBRARY = Object.freeze({
  book: Object.freeze({ family: 'Source Serif 4', source: 'base', weights: [400, 600] }),
  literary: Object.freeze({ family: 'Literata', source: 'library', weights: [400, 500, 600] }),
  warm: Object.freeze({ family: 'Lora', source: 'library', weights: [400, 500, 600] }),
  classic: Object.freeze({ family: 'Georgia', source: 'local', weights: [400, 500, 600] }),
  modern: Object.freeze({ family: 'IBM Plex Sans', source: 'library', weights: [400, 500, 600] }),
  clear: Object.freeze({ family: 'Atkinson Hyperlegible', source: 'library', weights: [400, 700] }),
  humanist: Object.freeze({ family: 'Trebuchet MS', source: 'local', weights: [400, 500, 600] }),
  system: Object.freeze({ family: 'system-ui', source: 'local', weights: [400, 500, 600] }),
});

export const READER_FONT_LIBRARY_HREF = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=IBM+Plex+Sans:wght@400;500;600&family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&family=Lora:wght@400;500;600&display=swap';

function nearestWeight(weights, requested) {
  const target = Number(requested) || 400;
  return weights.reduce((best, candidate) => {
    const distance = Math.abs(candidate - target);
    const bestDistance = Math.abs(best - target);
    if (distance < bestDistance) return candidate;
    if (distance === bestDistance && candidate < best) return candidate;
    return best;
  }, weights[0]);
}

export function readerFontDefinition(name) {
  return FONT_LIBRARY[name] || FONT_LIBRARY.book;
}

export function readerFontRequest(name, weight = 400, size = 18) {
  const definition = readerFontDefinition(name);
  const resolvedWeight = nearestWeight(definition.weights, weight);
  const resolvedSize = Math.max(12, Math.round(Number(size) || 18));
  return {
    name: FONT_LIBRARY[name] ? name : 'book',
    family: definition.family,
    source: definition.source,
    weight: resolvedWeight,
    probe: `${resolvedWeight} ${resolvedSize}px "${definition.family}"`,
  };
}

export function readerFontRequestKey(name, weight = 400) {
  const request = readerFontRequest(name, weight);
  return `${request.name}:${request.weight}`;
}

export function readerFontNeedsLibrary(name) {
  return readerFontDefinition(name).source === 'library';
}

export function readerFontCanAffectPagination(name) {
  return readerFontDefinition(name).source !== 'local';
}
