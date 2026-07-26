import { describe, expect, it } from "vitest";
import { resolveProductBadge } from "./product-badge";

describe("resolveProductBadge", () => {
  it("prefers the New pill over a computed discount", () => {
    expect(
      resolveProductBadge({ price: 25000000, originalPrice: 28000000, badge: "New" })
    ).toEqual({ label: "New", tone: "fresh" });
  });

  it("shows the discount when the product is reduced", () => {
    expect(
      resolveProductBadge({ price: 7000000, originalPrice: 14000000, badge: "Sale" })
    ).toEqual({ label: "-50%", tone: "danger" });
  });

  it("falls back to the raw badge when there is no discount", () => {
    expect(resolveProductBadge({ price: 500, originalPrice: null, badge: "Popular" })).toEqual({
      label: "Popular",
      tone: "brand"
    });
  });

  it("returns null with no discount and no badge", () => {
    expect(resolveProductBadge({ price: 500, originalPrice: null, badge: null })).toBeNull();
    expect(resolveProductBadge({ price: 500 })).toBeNull();
  });
});
