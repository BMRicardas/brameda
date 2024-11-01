interface CacheEntry<T> {
  data: T;
  timestamp: number;
  hash: string;
}

interface CacheStore<T> {
  [key: string]: CacheEntry<T>;
}

interface CreateCacheOptions {
  ttlMinutes?: number;
}

export const createCache = <T>(options: CreateCacheOptions = {}) => {
  const store: CacheStore<T> = {};
  const ttl = (options.ttlMinutes || 5) * 60 * 1000; // Convert to milliseconds

  return {
    set: (key: string, data: T, hash: string) => {
      store[key] = {
        data,
        timestamp: Date.now(),
        hash,
      };
    },

    get: (key: string, hash: string): T | undefined => {
      const entry = store[key];
      if (!entry) return undefined;

      const isExpired = Date.now() - entry.timestamp > ttl;
      const hasChanged = entry.hash !== hash;

      if (isExpired || hasChanged) {
        delete store[key];
        return undefined;
      }

      return entry.data;
    },

    clear: () => {
      Object.keys(store).forEach((key) => delete store[key]);
    },
  };
};
