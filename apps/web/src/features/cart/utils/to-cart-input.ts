import type { Product, ProductDetail } from "@/types/api";
import type { AddToCartInput } from "../stores/cart-store";

export type VariantSelection = {
  size?: string | null;
  color?: string | null;
  quantity?: number;
};

/** Catalogue entry -> cart line. Grid cards add the default variant. */
export function productToCartInput(
  product: Product,
  selection: VariantSelection = {}
): AddToCartInput {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.thumbnail,
    price: product.price,
    size: selection.size ?? null,
    color: selection.color ?? null,
    quantity: selection.quantity ?? 1
  };
}

/** Detail page -> cart line, carrying the chosen size and colour. */
export function detailToCartInput(
  detail: ProductDetail,
  selection: VariantSelection = {}
): AddToCartInput {
  return {
    productId: detail.id,
    slug: detail.slug,
    name: detail.name,
    image: detail.gallery.active,
    price: detail.price,
    size: selection.size ?? null,
    color: selection.color ?? null,
    quantity: selection.quantity ?? 1
  };
}
