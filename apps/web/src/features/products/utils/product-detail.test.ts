import { describe, expect, it } from "vitest";
import { productDetailFixture, productFixtures } from "@/test/fixtures";
import {
  createDetailFromProduct,
  pickRelatedProducts,
  resolveProductDetail,
  titleCase,
  toRelatedProduct
} from "./product-detail";

describe("titleCase", () => {
  it("splits on dashes, underscores and spaces", () => {
    expect(titleCase("living-room")).toBe("Living Room");
    expect(titleCase("best_seller")).toBe("Best Seller");
    expect(titleCase("sofa")).toBe("Sofa");
  });

  it("handles empty input", () => {
    expect(titleCase("")).toBe("");
  });
});

describe("toRelatedProduct", () => {
  it("formats both prices", () => {
    expect(toRelatedProduct(productFixtures[0]!)).toMatchObject({
      slug: "asgaard-sofa",
      priceText: "Rp 25.000.000",
      originalPriceText: "Rp 28.000.000",
      badge: "New"
    });
  });

  it("omits the original price when there is none", () => {
    const related = toRelatedProduct(productFixtures[2]!);

    expect(related.originalPriceText).toBeUndefined();
    expect(related.badge).toBeUndefined();
  });
});

describe("pickRelatedProducts", () => {
  it("puts same-category products first", () => {
    const related = pickRelatedProducts(productFixtures[0]!, productFixtures);

    expect(related.map((item) => item.slug)).toEqual(["stuart-sofa", "outdoor-sofa-set"]);
  });

  it("excludes the product itself and respects the limit", () => {
    const related = pickRelatedProducts(productFixtures[0]!, productFixtures, 1);

    expect(related).toHaveLength(1);
    expect(related.map((item) => item.slug)).not.toContain("asgaard-sofa");
  });
});

describe("createDetailFromProduct", () => {
  const detail = createDetailFromProduct(productFixtures[2]!, productFixtures);

  it("carries over the catalogue values", () => {
    expect(detail.slug).toBe("stuart-sofa");
    expect(detail.priceText).toBe("Rp 21.400.000");
    expect(detail.category).toBe("Sofa");
    expect(detail.meta.sku).toBe("FN003");
  });

  it("builds a gallery starting from the product thumbnail", () => {
    expect(detail.gallery.active).toBe(productFixtures[2]!.thumbnail);
    expect(detail.gallery.thumbnails[0]).toBe(productFixtures[2]!.thumbnail);
    expect(detail.gallery.thumbnails.length).toBeGreaterThan(1);
  });

  it("supplies the Figma default variants and three tabs", () => {
    expect(detail.sizes.map((size) => size.label)).toEqual(["L", "XL", "XS"]);
    expect(detail.colors).toHaveLength(3);
    expect(detail.tabs.map((tab) => tab.key)).toEqual([
      "description",
      "additional-information",
      "reviews"
    ]);
  });

  it("links the breadcrumb back to home and shop", () => {
    expect(detail.breadcrumb.map((item) => item.label)).toEqual([
      "Home",
      "Shop",
      "Stuart Sofa"
    ]);
  });
});

describe("resolveProductDetail", () => {
  it("prefers the real detail document", () => {
    const detail = resolveProductDetail(
      "asgaard-sofa",
      [productDetailFixture],
      productFixtures
    );

    expect(detail).toBe(productDetailFixture);
  });

  it("falls back to the catalogue for slugs without a detail document", () => {
    const detail = resolveProductDetail("stuart-sofa", [productDetailFixture], productFixtures);

    expect(detail?.name).toBe("Stuart Sofa");
    expect(detail?.meta.sku).toBe("FN003");
  });

  it("returns null for an unknown or missing slug", () => {
    expect(resolveProductDetail("nope", [productDetailFixture], productFixtures)).toBeNull();
    expect(resolveProductDetail(undefined, [productDetailFixture], productFixtures)).toBeNull();
  });
});
