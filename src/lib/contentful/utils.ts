interface CacheEntry<T> {
  data: T;
  timestamp: number;
  hash: string;
}

interface CacheOptions {
  ttlMinutes?: number;
  onHit?: (key: string) => void;
  onMiss?: (key: string) => void;
}

export function createCache<T>(options: CacheOptions = {}) {
  const store = new Map<string, CacheEntry<T>>();
  const ttl = (options.ttlMinutes || 5) * 60 * 1000;

  return {
    get: (key: string, hash: string) => {
      const entry = store.get(key);
      if (!entry) {
        options.onMiss?.(key);
        return undefined;
      }

      const isExpired = Date.now() - entry.timestamp > ttl;
      const hasChanged = entry.hash !== hash;

      if (isExpired || hasChanged) {
        store.delete(key);
        options.onMiss?.(key);
        return undefined;
      }

      options.onHit?.(key);
      return entry.data;
    },
    set: (key: string, data: T, hash: string) => {
      store.set(key, { data, timestamp: Date.now(), hash });
    },
    clear: () => store.clear(),
  };
}

export function generateHash(data: unknown): string {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash.toString(36);
}

export async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize = 5,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    results.push(...(await Promise.all(batch.map(processor))));
  }
  return results;
}
