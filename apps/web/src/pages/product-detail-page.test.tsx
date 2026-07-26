import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { productDetailFixture } from "@/test/fixtures";
import { mockApiFailure, mockApiResponses } from "@/test/http-mock";
import { renderWithProviders } from "@/test/utils";
import { ProductDetailPage } from "./product-detail-page";

vi.mock("@/services/http", () => import("@/test/http-mock"));

function renderDetail(slug: string) {
  return renderWithProviders(<ProductDetailPage />, {
    route: `/product/${slug}`,
    path: "/product/:slug"
  });
}

describe("ProductDetailPage", () => {
  beforeEach(() => {
    mockApiResponses();
  });

  it("renders the detail document for a known slug", async () => {
    renderDetail("asgaard-sofa");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Asgaard Sofa" })
    ).toBeInTheDocument();
    expect(screen.getByText("25.000.000 VND")).toBeInTheDocument();
    expect(screen.getByText("5 Customer Review")).toBeInTheDocument();
    expect(screen.getByText(": SS001")).toBeInTheDocument();
  });

  it("falls back to the catalogue for slugs without a detail document", async () => {
    renderDetail("stuart-sofa");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Stuart Sofa" })
    ).toBeInTheDocument();
    expect(screen.getByText(": FN003")).toBeInTheDocument();
  });

  it("adds the selected variant to the cart", async () => {
    const user = userEvent.setup();
    renderDetail("asgaard-sofa");

    await screen.findByRole("heading", { level: 1, name: "Asgaard Sofa" });

    await user.click(screen.getByRole("button", { name: "XL" }));
    await user.click(screen.getByRole("button", { name: "Gold" }));
    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    await user.click(screen.getByRole("button", { name: "Add To Cart" }));

    await waitFor(() => {
      expect(useCartStore.getState().lines).toHaveLength(1);
    });

    expect(useCartStore.getState().lines[0]).toMatchObject({
      slug: "asgaard-sofa",
      size: "xl",
      color: "Gold",
      quantity: 2
    });
    expect(await screen.findByText(/added to your cart/i)).toBeInTheDocument();
  });

  it("shows the related products row", async () => {
    renderDetail("asgaard-sofa");

    expect(
      await screen.findByRole("heading", { name: "Related Products" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Stuart Sofa" })).toBeInTheDocument();
  });

  it("never leaks the API's rupiah prices into the page", async () => {
    // The fixture mirrors the mock API, which ships priceText as "Rp ...".
    expect(productDetailFixture.priceText).toContain("Rp");
    expect(productDetailFixture.relatedProducts[0]?.priceText).toContain("Rp");

    renderDetail("asgaard-sofa");
    await screen.findByRole("heading", { name: "Related Products" });

    expect(document.body.textContent).not.toMatch(/Rp\s?\d/);
    expect(document.body.textContent).toContain("25.000.000 VND");
    expect(document.body.textContent).toContain("21.400.000 VND");
  });

  it("renders the not-found page for an unknown slug", async () => {
    renderDetail("does-not-exist");

    expect(
      await screen.findByRole("heading", { name: "Page not found" })
    ).toBeInTheDocument();
  });

  it("shows an error state when the request fails", async () => {
    mockApiFailure();
    renderDetail("asgaard-sofa");

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
  });
});
