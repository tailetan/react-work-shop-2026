import { calcDiscountPercent } from "@/utils/format";

export type ProductBadgeTone = "danger" | "fresh" | "brand";

export type ProductBadge = {
  label: string;
  tone: ProductBadgeTone;
};

/**
 * The design shows a green "New" pill on new arrivals and a red discount pill
 * on reduced items, so "New" wins over the computed discount.
 */
export function resolveProductBadge(product: {
  price: number;
  originalPrice?: number | null;
  badge?: string | null;
}): ProductBadge | null {
  if (product.badge === "New") {
    return { label: "New", tone: "fresh" };
  }

  const discount = calcDiscountPercent(product.price, product.originalPrice);

  if (discount) {
    return { label: `-${discount}%`, tone: "danger" };
  }

  return product.badge ? { label: product.badge, tone: "brand" } : null;
}

export const badgeToneClass: Record<ProductBadgeTone, string> = {
  danger: "bg-danger",
  fresh: "bg-fresh",
  brand: "bg-brand"
};
