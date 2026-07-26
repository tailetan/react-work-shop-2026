import { beforeEach, describe, expect, it, vi } from "vitest";
import { endpoints } from "@/services/endpoints";
import { httpClient } from "@/services/http";
import { categoryFixtures, productFixtures } from "@/test/fixtures";
import { mockApiResponses } from "@/test/http-mock";
import { getCategories, getProductDetails, getProducts } from "./products.api";

vi.mock("@/services/http", () => import("@/test/http-mock"));

describe("products api", () => {
  beforeEach(() => {
    mockApiResponses();
  });

  it("unwraps the catalogue items", async () => {
    await expect(getProducts()).resolves.toEqual(productFixtures);
    expect(httpClient.get).toHaveBeenCalledWith(endpoints.products);
  });

  it("unwraps the detail documents", async () => {
    const details = await getProductDetails();

    expect(details).toHaveLength(1);
    expect(httpClient.get).toHaveBeenCalledWith(endpoints.productDetails);
  });

  it("unwraps the categories", async () => {
    await expect(getCategories()).resolves.toEqual(categoryFixtures);
    expect(httpClient.get).toHaveBeenCalledWith(endpoints.categories);
  });

  it("falls back to an empty list when the payload has no items", async () => {
    vi.mocked(httpClient.get).mockResolvedValue({});

    await expect(getProducts()).resolves.toEqual([]);
    await expect(getCategories()).resolves.toEqual([]);
    await expect(getProductDetails()).resolves.toEqual([]);
  });

  it("propagates request failures", async () => {
    vi.mocked(httpClient.get).mockRejectedValue(new Error("offline"));

    await expect(getProducts()).rejects.toThrow("offline");
  });
});
