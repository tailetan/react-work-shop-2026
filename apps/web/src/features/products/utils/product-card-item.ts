import type { Product, RelatedProduct } from "@/types/api";
import { formatPrice, reformatPriceText } from "@/utils/format";
import type { ProductCardItem } from "../components/product-card";
import { resolveProductBadge } from "./product-badge";

/** Catalogue entry -> card view model. */
export function toProductCardItem(product: Product): ProductCardItem {
  const badge = resolveProductBadge(product);

  return {
    slug: product.slug,
    name: product.name,
    description: product.shortDescription,
    image: product.thumbnail,
    priceText: formatPrice(product.price),
    originalPriceText: product.originalPrice ? formatPrice(product.originalPrice) : undefined,
    badge
  };
}

/**
 * Related-product entry -> card view model. Related products carry only
 * pre-formatted rupiah strings, so they are re-rendered in VND.
 */
export function relatedToProductCardItem(related: RelatedProduct): ProductCardItem {
  return {
    slug: related.slug,
    name: related.name,
    image: related.thumbnail,
    priceText: reformatPriceText(related.priceText),
    originalPriceText: related.originalPriceText
      ? reformatPriceText(related.originalPriceText)
      : undefined,
    badge: related.badge === "New" ? { label: "New", tone: "fresh" } : null
  };
}
