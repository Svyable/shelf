export function createBoundedPairCache(limit = 96) {
  const maxEntries = Math.max(1, Math.floor(Number(limit) || 1));
  const scopes = new Map();
  const order = [];
  let size = 0;

  function scopeMap(scope, create = false) {
    const key = String(scope ?? '');
    let map = scopes.get(key);
    if (!map && create) {
      map = new Map();
      scopes.set(key, map);
    }
    return { key, map };
  }

  function touch(entry) {
    const index = order.indexOf(entry);
    if (index >= 0) order.splice(index, 1);
    order.push(entry);
  }

  function evict() {
    while (size > maxEntries && order.length) {
      const entry = order.shift();
      const { key: scopeKey, map } = scopeMap(entry.scope);
      if (!map || map.get(entry.key) !== entry) continue;
      map.delete(entry.key);
      size -= 1;
      if (!map.size) scopes.delete(scopeKey);
    }
  }

  return Object.freeze({
    get(scope, key) {
      const { map } = scopeMap(scope);
      const entry = map?.get(key);
      if (!entry) return undefined;
      touch(entry);
      return entry.value;
    },

    set(scope, key, value) {
      const { key: scopeKey, map } = scopeMap(scope, true);
      const existing = map.get(key);
      if (existing) {
        existing.value = value;
        touch(existing);
        return value;
      }
      const entry = { scope: scopeKey, key, value };
      map.set(key, entry);
      order.push(entry);
      size += 1;
      evict();
      return value;
    },

    has(scope, key) {
      return scopeMap(scope).map?.has(key) || false;
    },

    clear() {
      scopes.clear();
      order.length = 0;
      size = 0;
    },

    get size() {
      return size;
    },

    get limit() {
      return maxEntries;
    },
  });
}
