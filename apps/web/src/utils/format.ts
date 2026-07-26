/**
 * The Figma prices use Indonesian rupiah grouping ("Rp 25.000.000"). Grouping
 * is done manually instead of through `Intl` so output stays identical across
 * Node, jsdom, and the browser.
 */
export function formatThousands(value: number): string {
  const rounded = Math.round(Math.abs(value));
  const grouped = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return value < 0 ? `-${grouped}` : grouped;
}

export function formatPrice(value: number): string {
  return `Rp ${formatThousands(value)}`;
}

/**
 * Returns the rounded discount as a positive integer, or `null` when the
 * product is not discounted.
 */
export function calcDiscountPercent(
  price: number,
  originalPrice: number | null | undefined
): number | null {
  if (!originalPrice || originalPrice <= price || price < 0) {
    return null;
  }

  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
