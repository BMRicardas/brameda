/**
 * Format price with currency
 */
function formatPrice(
  price: number,
  currency = "EUR",
  locale = "lt-LT",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

/**
 * Calculate price with VAT
 */
function getPriceWithVAT(price: number, vatRate = 0.21): number {
  return price * (1 + vatRate);
}

/**
 * Format price range for variants
 */
function getVariantPriceRange(prices: number[]): string {
  if (!prices.length) return "";

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return min === max
    ? formatPrice(min)
    : `${formatPrice(min)} - ${formatPrice(max)}`;
}

/**
 * Get price parts (useful for styling)
 */
function getPriceParts(price: number): { whole: string; decimal: string } {
  // This ensures we always have an array with two string elements
  const [wholePart = "0", decimalPart = "00"] = price.toFixed(2).split(".") as [
    string,
    string?,
  ];

  return {
    whole: wholePart,
    decimal: decimalPart,
  };
}
