/** Shared class helpers for questionnaire form UI */
export function choiceBtnClass(selected: boolean, layout = ''): string {
  return ['choice-btn', selected && 'choice-btn--selected', layout]
    .filter(Boolean)
    .join(' ');
}
