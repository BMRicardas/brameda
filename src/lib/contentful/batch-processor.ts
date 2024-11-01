export async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize = 5,
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((item) => processor(item)),
    );
    results.push(...batchResults);
  }

  return results;
}

export const createBatchProcessor = (batchSize = 5) => {
  return async function processBatch<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
  ): Promise<R[]> {
    const results: R[] = [];

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((item) => processor(item)),
      );
      results.push(...batchResults);
    }

    return results;
  };
};
