/**
 * Prices are shown in Vietnamese dong ("25.000.000 VND"). Dong is not
 * subdivided in retail, so amounts are whole numbers grouped with dots.
 * Grouping is done manually instead of through `Intl` so output stays identical
 * across Node, jsdom, and the browser.
 */
export function formatThousands(value: number): string {
  const rounded = Math.round(Math.abs(value));
  const grouped = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return value < 0 ? `-${grouped}` : grouped;
}

export const CURRENCY_SUFFIX = "VND";

export function formatPrice(value: number): string {
  return `${formatThousands(value)} ${CURRENCY_SUFFIX}`;
}

/**
 * The mock API ships some prices pre-formatted in rupiah ("Rp 22.900.000") and
 * without a numeric field to fall back on. Digits are recovered and re-rendered
 * so no price bypasses `formatPrice`.
 */
export function reformatPriceText(value: string): string {
  const digits = value.replace(/\D/g, "");

  return digits ? formatPrice(Number(digits)) : value;
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
