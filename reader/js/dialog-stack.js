export function reconcileDialogStack(stack = [], activeIds = []) {
  const active = new Set(activeIds);
  const next = [];

  for (const id of stack) {
    if (active.has(id) && !next.includes(id)) next.push(id);
  }
  for (const id of activeIds) {
    if (!next.includes(id)) next.push(id);
  }
  return next;
}

export function activateDialog(stack = [], id) {
  if (!id) return stack.slice();
  return [...stack.filter((value) => value !== id), id];
}

export function deactivateDialog(stack = [], id) {
  return stack.filter((value) => value !== id);
}

export function topDialogId(stack = [], activeIds = []) {
  const next = reconcileDialogStack(stack, activeIds);
  return next[next.length - 1] || null;
}
