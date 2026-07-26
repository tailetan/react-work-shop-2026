import type { Product } from "@/types/api";

export type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "rating-desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "rating-desc", label: "Rating" }
];

export const PER_PAGE_OPTIONS = [4, 8, 16] as const;

export type ShopFilters = {
  search: string;
  category: string;
  sort: SortOption;
  perPage: number;
  page: number;
};

/** Matches the free-text search against name, description, category and tags. */
export function matchesSearch(product: Product, search: string): boolean {
  const term = search.trim().toLowerCase();

  if (!term) {
    return true;
  }

  return [product.name, product.shortDescription, product.category, ...product.tags]
    .join(" ")
    .toLowerCase()
    .includes(term);
}

export function filterProducts(
  products: Product[],
  filters: Pick<ShopFilters, "search" | "category">
): Product[] {
  return products.filter((product) => {
    const categoryMatches =
      !filters.category ||
      product.category === filters.category ||
      product.tags.includes(filters.category);

    return categoryMatches && matchesSearch(product, filters.search);
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

export type PaginationResult<T> = {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
  /** 1-based index of the first visible item, or 0 when there are none. */
  from: number;
  to: number;
};

export function paginate<T>(items: T[], page: number, perPage: number): PaginationResult<T> {
  const size = Math.max(1, perPage);
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * size;
  const visible = items.slice(start, start + size);

  return {
    items: visible,
    page: safePage,
    totalPages,
    total: items.length,
    from: visible.length === 0 ? 0 : start + 1,
    to: start + visible.length
  };
}

/** Filter -> sort -> paginate, in that order. */
export function applyShopFilters(
  products: Product[],
  filters: ShopFilters
): PaginationResult<Product> {
  const filtered = filterProducts(products, filters);
  const sorted = sortProducts(filtered, filters.sort);

  return paginate(sorted, filters.page, filters.perPage);
}
