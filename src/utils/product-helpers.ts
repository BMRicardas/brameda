/**
 * Sort products by order field
 */
function sortProducts<T extends { order?: number }>(products: T[]): T[] {
  return [...products].sort((a, b) => {
    if (a.order === undefined && b.order === undefined) return 0;
    if (a.order === undefined) return 1;
    if (b.order === undefined) return -1;
    return a.order - b.order;
  });
}

/**
 * Filter active products
 */
function getActiveProducts<T extends { isActive?: boolean }>(
  products: T[],
): T[] {
  return products.filter((p) => p.isActive !== false);
}

/**
 * Group products by category
 */
function groupByCategory<T extends { categories?: string[] }>(
  products: T[],
): Map<string, T[]> {
  const groups = new Map<string, T[]>();

  products.forEach((product) => {
    (product.categories || []).forEach((category) => {
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)?.push(product);
    });
  });

  return groups;
}
