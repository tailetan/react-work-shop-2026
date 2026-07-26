import { describe, expect, it } from "vitest";
import { createOrderReference } from "./order-reference";

describe("createOrderReference", () => {
  it("uses the FN-<stamp>-<suffix> shape", () => {
    expect(createOrderReference(1_700_000_000_000)).toMatch(/^FN-[0-9A-Z]{6}-\d{3}$/);
  });

  it("derives the stamp from the timestamp", () => {
    const first = createOrderReference(1_700_000_000_000);
    const second = createOrderReference(1_700_000_000_000);

    expect(first.split("-")[1]).toBe(second.split("-")[1]);
  });

  it("works without an explicit timestamp", () => {
    expect(createOrderReference()).toMatch(/^FN-/);
  });
});
