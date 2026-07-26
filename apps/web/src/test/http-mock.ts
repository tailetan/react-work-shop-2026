import { vi, type Mock } from "vitest";
import { endpoints } from "@/services/endpoints";
import {
  categoryFixtures,
  productDetailListResponse,
  productListResponse
} from "./fixtures";

/**
 * Stand-in for `@/services/http`. Tests opt in with:
 *
 *   vi.mock("@/services/http", () => import("@/test/http-mock"));
 *
 * Mocking at the client level keeps the feature `api/` modules inside the
 * covered code path instead of stubbing them out.
 */
export const API_BASE_URL = "https://dummyjson.com";

/** Annotated explicitly so the inferred type never leaks a pnpm store path. */
type MockHttpClient = {
  instance: never;
  request: Mock;
  get: Mock;
  post: Mock;
  put: Mock;
  patch: Mock;
  delete: Mock;
};

export const httpClient: MockHttpClient = {
  instance: {} as never,
  request: vi.fn(),
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn()
};

export type GetResponses = Record<string, unknown>;

/** Arms the default happy-path responses. Call from `beforeEach`. */
export function mockApiResponses(overrides: GetResponses = {}) {
  const responses: GetResponses = {
    [endpoints.products]: productListResponse,
    [endpoints.productDetails]: productDetailListResponse,
    [endpoints.categories]: { items: categoryFixtures },
    ...overrides
  };

  httpClient.get.mockImplementation((path: string) =>
    path in responses
      ? Promise.resolve(responses[path])
      : Promise.reject(new Error(`Unmocked GET ${path}`))
  );

  httpClient.post.mockResolvedValue(undefined);
  httpClient.patch.mockResolvedValue(undefined);
  httpClient.delete.mockResolvedValue(undefined);
}

/** Makes every GET reject, for error-state assertions. */
export function mockApiFailure(error: Error = new Error("Network down")) {
  httpClient.get.mockRejectedValue(error);
}
