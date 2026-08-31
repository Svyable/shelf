export const READER_STAGES = Object.freeze(['library', 'cover', 'read', 'end']);

export function normalizeReaderStage(value) {
  return READER_STAGES.includes(value) ? value : 'library';
}

export function accessibilitySurfacePlan({
  stage = 'library',
  continuous = false,
  spread = false,
  rightPageActive = false,
} = {}) {
  const currentStage = normalizeReaderStage(stage);
  const reading = currentStage === 'read';
  const paged = reading && !continuous;
  const continuousReading = reading && continuous;
  const rightVisible = paged && spread && rightPageActive;

  return Object.freeze({
    stage: currentStage,
    library: currentStage === 'library',
    cover: currentStage === 'cover',
    end: currentStage === 'end',
    pages: paged,
    leftPage: paged,
    rightPage: rightVisible,
    continuous: continuousReading,
    skipTarget: currentStage === 'library'
      ? 'libraryView'
      : currentStage === 'cover'
        ? 'coverPage'
        : currentStage === 'end'
          ? 'backCover'
          : continuousReading
            ? 'scrollReader'
            : 'pageLeft',
  });
}

export function pageAccessibilityLabel({ chapter = '', page = '', total = '' } = {}) {
  const bits = [];
  const cleanChapter = String(chapter || '').trim();
  const cleanPage = String(page || '').trim();
  const cleanTotal = String(total || '').trim();
  if (cleanChapter) bits.push(cleanChapter);
  if (cleanPage) bits.push(`page ${cleanPage}`);
  if (cleanTotal) bits.push(`of ${cleanTotal}`);
  return bits.join(', ') || 'Reading page';
}

export function surfaceState(active, label = '') {
  return Object.freeze({
    active: !!active,
    ariaHidden: active ? null : 'true',
    inert: !active,
    tabIndex: active ? -1 : null,
    label: active ? String(label || '') : '',
  });
}
