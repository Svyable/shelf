function defaultYieldControl() {
  return new Promise((resolve) => {
    const raf = globalThis.requestAnimationFrame;
    const hidden = globalThis.document?.visibilityState === 'hidden';
    if (typeof raf === 'function' && !hidden) {
      raf(() => globalThis.setTimeout(resolve, 0));
      return;
    }
    globalThis.setTimeout(resolve, 0);
  });
}

/**
 * Cooperative latest-run-wins scheduler for expensive chapter-at-a-time work.
 * A new run invalidates the previous run. Work is never interrupted mid-item;
 * cancellation is observed at the next item boundary so callers can keep each
 * item internally consistent.
 */
export function createCooperativePaginationScheduler({ yieldControl = defaultYieldControl } = {}) {
  let generation = 0;

  function cancel() {
    generation += 1;
  }

  async function run(items, work) {
    const token = ++generation;
    const input = Array.from(items || []);
    const values = [];
    let yields = 0;

    for (let index = 0; index < input.length; index += 1) {
      if (token !== generation) {
        return { status: 'cancelled', values, completed: index, yields };
      }

      values.push(await work(input[index], index));

      if (token !== generation) {
        return { status: 'cancelled', values, completed: index + 1, yields };
      }

      if (index < input.length - 1) {
        yields += 1;
        await yieldControl();
      }
    }

    if (token !== generation) {
      return { status: 'cancelled', values, completed: input.length, yields };
    }

    return { status: 'complete', values, completed: input.length, yields };
  }

  return Object.freeze({
    cancel,
    run,
    get generation() {
      return generation;
    },
  });
}
