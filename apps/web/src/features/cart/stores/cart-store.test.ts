import { beforeEach, describe, expect, it } from "vitest";
import {
  buildLineId,
  clampQuantity,
  MAX_LINE_QUANTITY,
  selectCartCount,
  selectCartSubtotal,
  useCartStore,
  type AddToCartInput
} from "./cart-store";

const sofa: AddToCartInput = {
  productId: 1,
  slug: "asgaard-sofa",
  name: "Asgaard Sofa",
  image: "/images/product/product-01.png",
  price: 25000000,
  size: "l",
  color: "Black"
};

function lines() {
  return useCartStore.getState().lines;
}

describe("clampQuantity", () => {
  it("keeps values inside the allowed range", () => {
    expect(clampQuantity(5)).toBe(5);
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(-3)).toBe(1);
    expect(clampQuantity(1000)).toBe(MAX_LINE_QUANTITY);
  });

  it("truncates fractions and falls back for non-finite input", () => {
    expect(clampQuantity(3.7)).toBe(3);
    expect(clampQuantity(Number.NaN)).toBe(1);
  });
});

describe("buildLineId", () => {
  it("separates the same product by variant", () => {
    expect(buildLineId({ productId: 1, size: "l", color: "Black" })).toBe("1::l::Black");
    expect(buildLineId({ productId: 1, size: null, color: null })).toBe("1::-::-");
    expect(buildLineId({ productId: 1, size: "l", color: "Black" })).not.toBe(
      buildLineId({ productId: 1, size: "xl", color: "Black" })
    );
  });
});

describe("cart selectors", () => {
  it("sums quantities and line totals", () => {
    const cartLines = [
      { ...sofa, id: "a", quantity: 2 },
      { ...sofa, id: "b", quantity: 3, price: 1000 }
    ];

    expect(selectCartCount(cartLines)).toBe(5);
    expect(selectCartSubtotal(cartLines)).toBe(25000000 * 2 + 1000 * 3);
  });

  it("returns zero for an empty cart", () => {
    expect(selectCartCount([])).toBe(0);
    expect(selectCartSubtotal([])).toBe(0);
  });
});

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ lines: [] });
  });

  it("adds a new line with a default quantity of one", () => {
    useCartStore.getState().addLine(sofa);

    expect(lines()).toHaveLength(1);
    expect(lines()[0]?.quantity).toBe(1);
    expect(lines()[0]?.id).toBe("1::l::Black");
  });

  it("merges quantities when the same variant is added again", () => {
    useCartStore.getState().addLine({ ...sofa, quantity: 2 });
    useCartStore.getState().addLine({ ...sofa, quantity: 3 });

    expect(lines()).toHaveLength(1);
    expect(lines()[0]?.quantity).toBe(5);
  });

  it("keeps different variants as separate lines", () => {
    useCartStore.getState().addLine(sofa);
    useCartStore.getState().addLine({ ...sofa, size: "xl" });

    expect(lines()).toHaveLength(2);
  });

  it("caps a merged quantity at the maximum", () => {
    useCartStore.getState().addLine({ ...sofa, quantity: MAX_LINE_QUANTITY });
    useCartStore.getState().addLine({ ...sofa, quantity: 10 });

    expect(lines()[0]?.quantity).toBe(MAX_LINE_QUANTITY);
  });

  it("updates the quantity of an existing line", () => {
    useCartStore.getState().addLine(sofa);
    useCartStore.getState().setQuantity("1::l::Black", 4);

    expect(lines()[0]?.quantity).toBe(4);
  });

  it("drops the line when the quantity falls below one", () => {
    useCartStore.getState().addLine(sofa);
    useCartStore.getState().setQuantity("1::l::Black", 0);

    expect(lines()).toHaveLength(0);
  });

  it("ignores updates for unknown lines", () => {
    useCartStore.getState().addLine(sofa);
    useCartStore.getState().setQuantity("does-not-exist", 9);

    expect(lines()[0]?.quantity).toBe(1);
  });

  it("removes and clears lines", () => {
    useCartStore.getState().addLine(sofa);
    useCartStore.getState().addLine({ ...sofa, size: "xl" });

    useCartStore.getState().removeLine("1::l::Black");
    expect(lines()).toHaveLength(1);

    useCartStore.getState().clear();
    expect(lines()).toHaveLength(0);
  });
});
