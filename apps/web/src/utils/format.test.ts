import { describe, expect, it } from "vitest";
import {
  calcDiscountPercent,
  formatPrice,
  formatThousands,
  reformatPriceText
} from "./format";

describe("formatThousands", () => {
  it("groups thousands with dots", () => {
    expect(formatThousands(25000000)).toBe("25.000.000");
    expect(formatThousands(1000)).toBe("1.000");
    expect(formatThousands(999)).toBe("999");
    expect(formatThousands(0)).toBe("0");
  });

  it("rounds fractional values", () => {
    expect(formatThousands(1500.6)).toBe("1.501");
  });

  it("keeps the sign for negative values", () => {
    expect(formatThousands(-2500)).toBe("-2.500");
  });
});

describe("formatPrice", () => {
  it("suffixes the dong currency code", () => {
    expect(formatPrice(25000000)).toBe("25.000.000 VND");
    expect(formatPrice(0)).toBe("0 VND");
  });
});

describe("reformatPriceText", () => {
  it("converts the API's pre-formatted rupiah strings to VND", () => {
    expect(reformatPriceText("Rp 22.900.000")).toBe("22.900.000 VND");
    expect(reformatPriceText("Rp 150.000")).toBe("150.000 VND");
  });

  it("is idempotent for values already in VND", () => {
    expect(reformatPriceText("22.900.000 VND")).toBe("22.900.000 VND");
  });

  it("returns the input untouched when it holds no digits", () => {
    expect(reformatPriceText("Price on request")).toBe("Price on request");
    expect(reformatPriceText("")).toBe("");
  });
});

describe("calcDiscountPercent", () => {
  it("returns the rounded discount", () => {
    expect(calcDiscountPercent(2500000, 3500000)).toBe(29);
    expect(calcDiscountPercent(7000000, 14000000)).toBe(50);
  });

  it("returns null when there is no discount", () => {
    expect(calcDiscountPercent(2500000, null)).toBeNull();
    expect(calcDiscountPercent(2500000, undefined)).toBeNull();
    expect(calcDiscountPercent(2500000, 2500000)).toBeNull();
    expect(calcDiscountPercent(2500000, 1000000)).toBeNull();
  });

  it("returns null for a negative price", () => {
    expect(calcDiscountPercent(-1, 100)).toBeNull();
  });
});
