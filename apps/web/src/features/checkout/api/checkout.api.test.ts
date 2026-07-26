import { beforeEach, describe, expect, it, vi } from "vitest";
import { endpoints } from "@/services/endpoints";
import { httpClient } from "@/services/http";
import { mockApiResponses } from "@/test/http-mock";
import { placeOrder, type CheckoutPayload } from "./checkout.api";
import { billingDefaults } from "../utils/billing";

vi.mock("@/services/http", () => import("@/test/http-mock"));

const payload: CheckoutPayload = {
  billing: { ...billingDefaults, firstName: "Tai", lastName: "Le", email: "tai@example.com" },
  paymentMethod: "bank-transfer",
  lines: [{ productId: 1, name: "Asgaard Sofa", quantity: 1, price: 25000000 }],
  subtotal: 25000000,
  total: 25000000
};

describe("placeOrder", () => {
  beforeEach(() => {
    mockApiResponses();
  });

  it("posts the order to the checkout endpoint", async () => {
    await expect(placeOrder(payload)).resolves.toBeUndefined();
    expect(httpClient.post).toHaveBeenCalledWith(endpoints.checkout, payload);
  });

  it("propagates request failures", async () => {
    vi.mocked(httpClient.post).mockRejectedValue(new Error("gateway"));

    await expect(placeOrder(payload)).rejects.toThrow("gateway");
  });
});
