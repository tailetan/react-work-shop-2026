/**
 * The mock checkout endpoint returns no body, so the order reference shown on
 * the confirmation screen is generated locally.
 */
export function createOrderReference(now: number = Date.now()): string {
  const stamp = now.toString(36).toUpperCase().slice(-6);
  const suffix = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `FN-${stamp}-${suffix}`;
}
