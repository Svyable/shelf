export function routeNeedsCatalog(route) {
  return route?.view === 'library';
}

export function createLatestRouteQueue(run, { onError } = {}) {
  if (typeof run !== 'function') throw new TypeError('run must be a function');
  let running = false;
  let pending = null;
  let nextId = 0;
  let active = 0;
  let maxActive = 0;
  const idleWaiters = new Set();

  const resolveIdle = () => {
    if (running || pending) return;
    for (const resolve of idleWaiters) resolve();
    idleWaiters.clear();
  };

  const drain = async () => {
    if (running) return;
    running = true;
    try {
      while (pending) {
        const job = pending;
        pending = null;
        active += 1;
        maxActive = Math.max(maxActive, active);
        try {
          await run(job.value, job.id);
        } catch (error) {
          if (typeof onError === 'function') onError(error, job.value, job.id);
          else throw error;
        } finally {
          active -= 1;
        }
      }
    } finally {
      running = false;
      if (pending) queueMicrotask(drain);
      else resolveIdle();
    }
  };

  return {
    request(value) {
      const id = ++nextId;
      pending = { id, value };
      queueMicrotask(drain);
      return id;
    },
    idle() {
      if (!running && !pending) return Promise.resolve();
      return new Promise((resolve) => idleWaiters.add(resolve));
    },
    snapshot() {
      return Object.freeze({ running, pending: !!pending, requested: nextId, maxActive });
    },
  };
}
