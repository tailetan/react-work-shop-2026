/**
 * Response contracts for the DummyJSON mock API described in the README.
 * Every list endpoint wraps its payload in `items`.
 */

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  thumbnail: string;
  badge: string | null;
  rating: number;
  shortDescription: string;
  tags: string[];
};

export type ProductListResponse = {
  items: Product[];
  total: number;
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  productCount: number;
};

export type CategoryListResponse = {
  items: Category[];
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type ProductGallery = {
  active: string;
  thumbnails: string[];
};

export type ProductSizeOption = {
  label: string;
  value: string;
  selected?: boolean;
};

export type ProductColorOption = {
  name: string;
  value: string;
  selected?: boolean;
};

export type ProductQuantityRange = {
  default: number;
  min: number;
  max: number;
};

export type ProductMeta = {
  sku: string;
  category: string;
  tags: string[];
};

export type ProductShareTarget = {
  platform: string;
  label: string;
};

export type ProductTab = {
  key: string;
  label: string;
  active?: boolean;
  content: string[];
};

export type RelatedProduct = {
  id: number;
  slug: string;
  name: string;
  priceText: string;
  originalPriceText?: string;
  thumbnail: string;
  badge?: string;
};

export type ProductDetail = {
  id: number;
  slug: string;
  name: string;
  breadcrumb: BreadcrumbItem[];
  category: string;
  price: number;
  priceText: string;
  originalPrice: number | null;
  rating: number;
  ratingCount: number;
  reviewLabel: string;
  shortDescription: string;
  gallery: ProductGallery;
  sizes: ProductSizeOption[];
  colors: ProductColorOption[];
  quantity: ProductQuantityRange;
  meta: ProductMeta;
  share: ProductShareTarget[];
  tabs: ProductTab[];
  detailImages: string[];
  relatedProducts: RelatedProduct[];
};

export type ProductDetailListResponse = {
  items: ProductDetail[];
};

export type CartApiItem = {
  id: string;
  productId: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type CartResponse = {
  items: CartApiItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
};
