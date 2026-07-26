import { describe, expect, it } from "vitest";
import { createQueryClient } from "./query-client";

describe("createQueryClient", () => {
  it("applies the shared query defaults", () => {
    const defaults = createQueryClient().getDefaultOptions().queries;

    expect(defaults?.retry).toBe(1);
    expect(defaults?.staleTime).toBe(60_000);
    expect(defaults?.refetchOnWindowFocus).toBe(false);
  });

  it("returns an isolated client per call", () => {
    expect(createQueryClient()).not.toBe(createQueryClient());
  });
});
