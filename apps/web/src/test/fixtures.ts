import type {
  Category,
  Product,
  ProductDetail,
  ProductDetailListResponse,
  ProductListResponse
} from "@/types/api";

/** Shapes mirror the real DummyJSON mock documents used by the app. */

export const productFixtures: Product[] = [
  {
    id: 1,
    slug: "asgaard-sofa",
    name: "Asgaard Sofa",
    category: "sofa",
    price: 25000000,
    originalPrice: 28000000,
    thumbnail: "/images/product/product-01.png",
    badge: "New",
    rating: 4.8,
    shortDescription: "Modern upholstered sofa for warm, minimal interiors.",
    tags: ["featured", "sofa", "living-room"]
  },
  {
    id: 2,
    slug: "outdoor-sofa-set",
    name: "Outdoor Sofa Set",
    category: "outdoor",
    price: 32000000,
    originalPrice: 36500000,
    thumbnail: "/images/product/product-02.png",
    badge: "Sale",
    rating: 4.7,
    shortDescription: "Weather-ready modular seating for patios and terraces.",
    tags: ["featured", "outdoor", "garden"]
  },
  {
    id: 3,
    slug: "stuart-sofa",
    name: "Stuart Sofa",
    category: "sofa",
    price: 21400000,
    originalPrice: null,
    thumbnail: "/images/product/product-07.png",
    badge: null,
    rating: 4.4,
    shortDescription: "Structured silhouette with soft detailing for compact rooms.",
    tags: ["sofa", "compact"]
  }
];

export const categoryFixtures: Category[] = [
  { id: 1, slug: "sofa", name: "Sofa", productCount: 2 },
  { id: 2, slug: "outdoor", name: "Outdoor", productCount: 1 }
];

export const productDetailFixture: ProductDetail = {
  id: 1,
  slug: "asgaard-sofa",
  name: "Asgaard Sofa",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Asgaard Sofa" }
  ],
  category: "Sofa",
  price: 25000000,
  priceText: "Rp 25.000.000",
  originalPrice: 28000000,
  rating: 4.8,
  ratingCount: 5,
  reviewLabel: "5 Customer Review",
  shortDescription: "Setting the bar as one of the calmest sofas in its class.",
  gallery: {
    active: "/images/product/product-01.png",
    thumbnails: ["/images/product/product-01.png", "/images/product/product-07.png"]
  },
  sizes: [
    { label: "L", value: "l", selected: true },
    { label: "XL", value: "xl" }
  ],
  colors: [
    { name: "Black", value: "#000000", selected: true },
    { name: "Gold", value: "#B88E2F" }
  ],
  quantity: { default: 1, min: 1, max: 10 },
  meta: { sku: "SS001", category: "Sofas", tags: ["Sofa", "Chair"] },
  share: [
    { platform: "facebook", label: "Facebook" },
    { platform: "twitter", label: "Twitter" }
  ],
  tabs: [
    { key: "description", label: "Description", active: true, content: ["A calm silhouette."] },
    {
      key: "additional-information",
      label: "Additional Information",
      content: ["Frame: solid wood"]
    }
  ],
  detailImages: ["/images/product/product-07.png"],
  relatedProducts: [
    {
      id: 3,
      slug: "stuart-sofa",
      name: "Stuart Sofa",
      priceText: "Rp 21.400.000",
      thumbnail: "/images/product/product-07.png",
      badge: "Popular"
    }
  ]
};

export const productListResponse: ProductListResponse = {
  items: productFixtures,
  total: productFixtures.length
};

export const productDetailListResponse: ProductDetailListResponse = {
  items: [productDetailFixture]
};
