/**
 * Sort variants by displayOrder or another field
 */
function sortVariants<T extends { displayOrder?: number }>(variants: T[]): T[] {
  return [...variants].sort((a, b) => {
    if (a.displayOrder === undefined && b.displayOrder === undefined) return 0;
    if (a.displayOrder === undefined) return 1;
    if (b.displayOrder === undefined) return -1;
    return a.displayOrder - b.displayOrder;
  });
}

/**
 * Get default variant or first available
 */
function getDefaultVariant<T extends { isDefault?: boolean }>(
  variants: T[],
): T | undefined {
  return variants.find((v) => v.isDefault) || variants[0];
}

/**
 * Group variants by a property
 */
function groupVariants<T, K extends keyof T>(
  variants: T[],
  key: K,
): Map<T[K], T[]> {
  return variants.reduce((groups, variant) => {
    const groupKey = variant[key];
    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)?.push(variant);
    return groups;
  }, new Map<T[K], T[]>());
}
