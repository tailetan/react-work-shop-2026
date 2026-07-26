import { useCallback } from "react";
import type { Product } from "@/types/api";
import { useCartStore } from "../stores/cart-store";
import { productToCartInput } from "../utils/to-cart-input";

/**
 * Grid cards only know a product slug, so the catalogue is resolved here. Keeps
 * the add-to-cart wiring out of every page that renders a product grid.
 */
export function useAddProductToCart(products: Product[] | undefined) {
  const addLine = useCartStore((state) => state.addLine);

  return useCallback(
    (slug: string) => {
      const product = products?.find((item) => item.slug === slug);

      if (product) {
        addLine(productToCartInput(product));
      }
    },
    [addLine, products]
  );
}
