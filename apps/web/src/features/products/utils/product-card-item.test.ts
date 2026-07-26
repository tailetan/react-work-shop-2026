import { describe, expect, it } from "vitest";
import { productDetailFixture, productFixtures } from "@/test/fixtures";
import { relatedToProductCardItem, toProductCardItem } from "./product-card-item";

describe("toProductCardItem", () => {
  it("formats prices and resolves the badge", () => {
    expect(toProductCardItem(productFixtures[0]!)).toEqual({
      slug: "asgaard-sofa",
      name: "Asgaard Sofa",
      description: "Modern upholstered sofa for warm, minimal interiors.",
      image: "/images/product/product-01.png",
      priceText: "25.000.000 VND",
      originalPriceText: "28.000.000 VND",
      badge: { label: "New", tone: "fresh" }
    });
  });

  it("omits the original price when the product is not discounted", () => {
    const item = toProductCardItem(productFixtures[2]!);

    expect(item.originalPriceText).toBeUndefined();
    expect(item.badge).toBeNull();
  });
});

describe("relatedToProductCardItem", () => {
  it("re-renders the API's rupiah prices in VND", () => {
    const related = productDetailFixture.relatedProducts[0]!;

    // The fixture mirrors the API and ships "Rp 21.400.000".
    expect(related.priceText).toBe("Rp 21.400.000");
    expect(relatedToProductCardItem(related)).toEqual({
      slug: "stuart-sofa",
      name: "Stuart Sofa",
      image: "/images/product/product-07.png",
      priceText: "21.400.000 VND",
      originalPriceText: undefined,
      badge: null
    });
  });

  it("also converts the original price when present", () => {
    const item = relatedToProductCardItem({
      id: 6,
      slug: "maya-three-seater",
      name: "Maya Three Seater",
      priceText: "Rp 22.900.000",
      originalPriceText: "Rp 24.900.000",
      thumbnail: "/images/product/product-06.png"
    });

    expect(item.priceText).toBe("22.900.000 VND");
    expect(item.originalPriceText).toBe("24.900.000 VND");
  });

  it("keeps the New pill", () => {
    const item = relatedToProductCardItem({
      id: 9,
      slug: "new-thing",
      name: "New Thing",
      priceText: "Rp 1.000",
      thumbnail: "/images/product/product-01.png",
      badge: "New"
    });

    expect(item.badge).toEqual({ label: "New", tone: "fresh" });
  });
});
