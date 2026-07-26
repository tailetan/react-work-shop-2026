import { routes } from "@/app/routes";
import type { Product, ProductDetail, RelatedProduct } from "@/types/api";
import { formatPrice } from "@/utils/format";

/**
 * The mock `productDetails` document only covers products 1 and 2, while the
 * catalogue lists 8. Rather than 404 the remaining detail pages, a detail view
 * is synthesised from the catalogue entry using the Figma defaults.
 */

const FALLBACK_SIZES = [
  { label: "L", value: "l", selected: true },
  { label: "XL", value: "xl" },
  { label: "XS", value: "xs" }
];

const FALLBACK_COLORS = [
  { name: "Purple", value: "#816DFA" },
  { name: "Black", value: "#000000", selected: true },
  { name: "Gold", value: "#B88E2F" }
];

const FALLBACK_REVIEW_COUNT = 5;

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function toRelatedProduct(product: Product): RelatedProduct {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    priceText: formatPrice(product.price),
    originalPriceText: product.originalPrice ? formatPrice(product.originalPrice) : undefined,
    thumbnail: product.thumbnail,
    badge: product.badge ?? undefined
  };
}

/** Same-category products first, then the rest, so the row is never short. */
export function pickRelatedProducts(
  product: Product,
  catalogue: Product[],
  limit = 4
): RelatedProduct[] {
  const others = catalogue.filter((item) => item.id !== product.id);

  return [
    ...others.filter((item) => item.category === product.category),
    ...others.filter((item) => item.category !== product.category)
  ]
    .slice(0, limit)
    .map(toRelatedProduct);
}

export function createDetailFromProduct(
  product: Product,
  catalogue: Product[]
): ProductDetail {
  const otherThumbnails = catalogue
    .filter((item) => item.id !== product.id)
    .map((item) => item.thumbnail);

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    breadcrumb: [
      { label: "Home", href: routes.home },
      { label: "Shop", href: routes.shop },
      { label: product.name }
    ],
    category: titleCase(product.category),
    price: product.price,
    priceText: formatPrice(product.price),
    originalPrice: product.originalPrice,
    rating: product.rating,
    ratingCount: FALLBACK_REVIEW_COUNT,
    reviewLabel: `${FALLBACK_REVIEW_COUNT} Customer Review`,
    shortDescription: product.shortDescription,
    gallery: {
      active: product.thumbnail,
      thumbnails: [product.thumbnail, ...otherThumbnails.slice(0, 3)]
    },
    sizes: FALLBACK_SIZES,
    colors: FALLBACK_COLORS,
    quantity: { default: 1, min: 1, max: 10 },
    meta: {
      sku: `FN${product.id.toString().padStart(3, "0")}`,
      category: titleCase(product.category),
      tags: product.tags.map(titleCase)
    },
    share: [
      { platform: "facebook", label: "Facebook" },
      { platform: "linkedin", label: "LinkedIn" },
      { platform: "twitter", label: "Twitter" }
    ],
    tabs: [
      {
        key: "description",
        label: "Description",
        active: true,
        content: [
          product.shortDescription,
          `${product.name} is part of the ${titleCase(product.category)} range, built around calm proportions and materials chosen for daily use.`
        ]
      },
      {
        key: "additional-information",
        label: "Additional Information",
        content: [
          "Frame: kiln-dried solid wood",
          "Upholstery: textured premium fabric",
          `Tags: ${product.tags.map(titleCase).join(", ")}`
        ]
      },
      {
        key: "reviews",
        label: `Reviews [${FALLBACK_REVIEW_COUNT}]`,
        content: [
          `Customers rate ${product.name} ${product.rating} out of 5 for comfort, finish and value.`
        ]
      }
    ],
    detailImages: otherThumbnails.slice(0, 2),
    relatedProducts: pickRelatedProducts(product, catalogue)
  };
}

/**
 * Prefers the real detail document and falls back to the catalogue entry.
 * Returns `null` only when the slug matches nothing at all.
 */
export function resolveProductDetail(
  slug: string | undefined,
  details: ProductDetail[],
  catalogue: Product[]
): ProductDetail | null {
  if (!slug) {
    return null;
  }

  const detail = details.find((item) => item.slug === slug);

  if (detail) {
    return detail;
  }

  const product = catalogue.find((item) => item.slug === slug);

  return product ? createDetailFromProduct(product, catalogue) : null;
}
