import { describe, expect, it } from "vitest";
import { productDetailFixture, productFixtures } from "@/test/fixtures";
import { detailToCartInput, productToCartInput } from "./to-cart-input";

describe("productToCartInput", () => {
  it("defaults to a single unit with no variant", () => {
    expect(productToCartInput(productFixtures[0]!)).toEqual({
      productId: 1,
      slug: "asgaard-sofa",
      name: "Asgaard Sofa",
      image: "/images/product/product-01.png",
      price: 25000000,
      size: null,
      color: null,
      quantity: 1
    });
  });

  it("accepts an explicit selection", () => {
    const input = productToCartInput(productFixtures[0]!, {
      size: "xl",
      color: "Gold",
      quantity: 3
    });

    expect(input).toMatchObject({ size: "xl", color: "Gold", quantity: 3 });
  });
});

describe("detailToCartInput", () => {
  it("uses the active gallery image", () => {
    expect(detailToCartInput(productDetailFixture)).toMatchObject({
      productId: 1,
      image: "/images/product/product-01.png",
      price: 25000000,
      quantity: 1
    });
  });

  it("carries the chosen size and colour", () => {
    const input = detailToCartInput(productDetailFixture, {
      size: "l",
      color: "Black",
      quantity: 2
    });

    expect(input).toMatchObject({ size: "l", color: "Black", quantity: 2 });
  });
});
