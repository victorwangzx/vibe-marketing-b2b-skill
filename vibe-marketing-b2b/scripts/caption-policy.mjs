export function inspectCaptionPolicy(contract) {
  const errors = [];
  if (contract.textRules?.captionPolicy !== 'single-line-semantic-v1') return {passed:true, errors};
  if (contract.textRules.maxCaptionLines !== 1) errors.push('single-line policy requires maxCaptionLines=1');
  const captions = contract.captions ?? [];
  const groups = (contract.layoutChecks ?? []).filter(group => group.source === 'captions');
  if (captions.length && (!groups.length || groups.some(group => group.maxLines !== 1))) errors.push('every caption layout check must use maxLines=1');
  for (const cue of captions) if (/[\r\n]/.test(cue.text)) errors.push(`${cue.id}: manual caption line break is forbidden`);
  return {passed:errors.length === 0, errors};
}
