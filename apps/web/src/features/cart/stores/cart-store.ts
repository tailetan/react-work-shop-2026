import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * The mock cart endpoints answer with fixed documents, so the basket itself is
 * client state. It is global (header badge, cart page, checkout summary) and
 * survives reloads, which is what Zustand + `persist` is for.
 */
export type CartLine = {
  id: string;
  productId: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string | null;
  color: string | null;
};

export type AddToCartInput = Omit<CartLine, "id" | "quantity"> & {
  quantity?: number;
};

export const MIN_LINE_QUANTITY = 1;
export const MAX_LINE_QUANTITY = 99;
export const CART_STORAGE_KEY = "furniro-cart";

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) {
    return MIN_LINE_QUANTITY;
  }

  return Math.min(MAX_LINE_QUANTITY, Math.max(MIN_LINE_QUANTITY, Math.trunc(quantity)));
}

/** A basket line is unique per product *and* per selected variant. */
export function buildLineId(input: {
  productId: number;
  size: string | null;
  color: string | null;
}): string {
  return [input.productId, input.size ?? "-", input.color ?? "-"].join("::");
}

export function selectCartCount(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

export function selectCartSubtotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.price * line.quantity, 0);
}

export type CartState = {
  lines: CartLine[];
  addLine: (input: AddToCartInput) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],

      addLine: (input) =>
        set((state) => {
          const id = buildLineId(input);
          const quantity = clampQuantity(input.quantity ?? 1);
          const existing = state.lines.find((line) => line.id === id);

          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.id === id
                  ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
                  : line
              )
            };
          }

          return { lines: [...state.lines, { ...input, id, quantity }] };
        }),

      setQuantity: (id, quantity) =>
        set((state) => {
          if (quantity < MIN_LINE_QUANTITY) {
            return { lines: state.lines.filter((line) => line.id !== id) };
          }

          return {
            lines: state.lines.map((line) =>
              line.id === id ? { ...line, quantity: clampQuantity(quantity) } : line
            )
          };
        }),

      removeLine: (id) =>
        set((state) => ({ lines: state.lines.filter((line) => line.id !== id) })),

      clear: () => set({ lines: [] })
    }),
    {
      name: CART_STORAGE_KEY,
      version: 1,
      partialize: (state) => ({ lines: state.lines })
    }
  )
);
