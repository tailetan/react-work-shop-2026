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
      priceText: "Rp 25.000.000",
      originalPriceText: "Rp 28.000.000",
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
  it("passes through the pre-formatted prices", () => {
    const related = productDetailFixture.relatedProducts[0]!;

    expect(relatedToProductCardItem(related)).toEqual({
      slug: "stuart-sofa",
      name: "Stuart Sofa",
      image: "/images/product/product-07.png",
      priceText: "Rp 21.400.000",
      originalPriceText: undefined,
      badge: null
    });
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
