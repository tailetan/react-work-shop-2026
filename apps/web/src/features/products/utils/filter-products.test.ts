import { describe, expect, it } from "vitest";
import { productFixtures } from "@/test/fixtures";
import {
  applyShopFilters,
  filterProducts,
  matchesSearch,
  paginate,
  sortProducts,
  type ShopFilters
} from "./filter-products";

const baseFilters: ShopFilters = {
  search: "",
  category: "",
  sort: "default",
  perPage: 8,
  page: 1
};

describe("matchesSearch", () => {
  const product = productFixtures[0]!;

  it("matches an empty or whitespace term", () => {
    expect(matchesSearch(product, "")).toBe(true);
    expect(matchesSearch(product, "   ")).toBe(true);
  });

  it("matches on name, description, category and tags", () => {
    expect(matchesSearch(product, "asgaard")).toBe(true);
    expect(matchesSearch(product, "upholstered")).toBe(true);
    expect(matchesSearch(product, "sofa")).toBe(true);
    expect(matchesSearch(product, "living-room")).toBe(true);
  });

  it("is case insensitive and rejects non-matches", () => {
    expect(matchesSearch(product, "ASGAARD")).toBe(true);
    expect(matchesSearch(product, "bicycle")).toBe(false);
  });
});

describe("filterProducts", () => {
  it("returns everything with no filters", () => {
    expect(filterProducts(productFixtures, { search: "", category: "" })).toHaveLength(3);
  });

  it("filters by category slug", () => {
    const result = filterProducts(productFixtures, { search: "", category: "outdoor" });

    expect(result.map((item) => item.slug)).toEqual(["outdoor-sofa-set"]);
  });

  it("also matches a category held as a tag", () => {
    const result = filterProducts(productFixtures, { search: "", category: "living-room" });

    expect(result.map((item) => item.slug)).toEqual(["asgaard-sofa"]);
  });

  it("combines category and search", () => {
    expect(
      filterProducts(productFixtures, { search: "stuart", category: "sofa" })
    ).toHaveLength(1);
    expect(
      filterProducts(productFixtures, { search: "stuart", category: "outdoor" })
    ).toHaveLength(0);
  });
});

describe("sortProducts", () => {
  it("leaves the order untouched by default", () => {
    expect(sortProducts(productFixtures, "default").map((item) => item.id)).toEqual([1, 2, 3]);
  });

  it("sorts by price", () => {
    expect(sortProducts(productFixtures, "price-asc").map((item) => item.id)).toEqual([3, 1, 2]);
    expect(sortProducts(productFixtures, "price-desc").map((item) => item.id)).toEqual([2, 1, 3]);
  });

  it("sorts by name and rating", () => {
    expect(sortProducts(productFixtures, "name-asc").map((item) => item.name)).toEqual([
      "Asgaard Sofa",
      "Outdoor Sofa Set",
      "Stuart Sofa"
    ]);
    expect(sortProducts(productFixtures, "rating-desc").map((item) => item.id)).toEqual([
      1, 2, 3
    ]);
  });

  it("does not mutate the input array", () => {
    const input = [...productFixtures];
    sortProducts(input, "price-desc");

    expect(input.map((item) => item.id)).toEqual([1, 2, 3]);
  });
});

describe("paginate", () => {
  const items = [1, 2, 3, 4, 5];

  it("returns the requested slice with 1-based bounds", () => {
    const result = paginate(items, 2, 2);

    expect(result.items).toEqual([3, 4]);
    expect(result.page).toBe(2);
    expect(result.totalPages).toBe(3);
    expect(result.from).toBe(3);
    expect(result.to).toBe(4);
    expect(result.total).toBe(5);
  });

  it("clamps an out-of-range page", () => {
    expect(paginate(items, 99, 2).page).toBe(3);
    expect(paginate(items, 0, 2).page).toBe(1);
  });

  it("handles an empty list", () => {
    const result = paginate([], 1, 8);

    expect(result.items).toEqual([]);
    expect(result.totalPages).toBe(1);
    expect(result.from).toBe(0);
    expect(result.to).toBe(0);
  });

  it("guards against a zero page size", () => {
    expect(paginate(items, 1, 0).items).toEqual([1]);
  });
});

describe("applyShopFilters", () => {
  it("filters, sorts and paginates in order", () => {
    const result = applyShopFilters(productFixtures, {
      ...baseFilters,
      category: "sofa",
      sort: "price-asc",
      perPage: 1,
      page: 2
    });

    expect(result.items.map((item) => item.slug)).toEqual(["asgaard-sofa"]);
    expect(result.total).toBe(2);
    expect(result.totalPages).toBe(2);
  });

  it("reports no results when nothing matches", () => {
    const result = applyShopFilters(productFixtures, { ...baseFilters, search: "bicycle" });

    expect(result.items).toEqual([]);
    expect(result.total).toBe(0);
  });
});
