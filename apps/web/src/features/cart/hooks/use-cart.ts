import {
  selectCartCount,
  selectCartSubtotal,
  useCartStore,
  type CartLine
} from "../stores/cart-store";

export type UseCartResult = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  total: number;
  isEmpty: boolean;
  addLine: ReturnType<typeof useCartStore.getState>["addLine"];
  setQuantity: ReturnType<typeof useCartStore.getState>["setQuantity"];
  removeLine: ReturnType<typeof useCartStore.getState>["removeLine"];
  clear: ReturnType<typeof useCartStore.getState>["clear"];
};

/**
 * Single entry point for cart data so components stay free of store wiring.
 * Actions are selected individually because they are stable references.
 */
export function useCart(): UseCartResult {
  const lines = useCartStore((state) => state.lines);
  const addLine = useCartStore((state) => state.addLine);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeLine = useCartStore((state) => state.removeLine);
  const clear = useCartStore((state) => state.clear);

  const subtotal = selectCartSubtotal(lines);

  return {
    lines,
    count: selectCartCount(lines),
    subtotal,
    // Shipping and tax are zero in the mock cart response.
    total: subtotal,
    isEmpty: lines.length === 0,
    addLine,
    setQuantity,
    removeLine,
    clear
  };
}
