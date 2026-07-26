import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockApiResponses } from "@/test/http-mock";
import { renderWithProviders } from "@/test/utils";
import { ShopPage } from "./shop-page";

vi.mock("@/services/http", () => import("@/test/http-mock"));

describe("ShopPage", () => {
  beforeEach(() => {
    mockApiResponses();
  });

  it("renders the banner and result count", async () => {
    renderWithProviders(<ShopPage />, { route: "/shop" });

    expect(screen.getByRole("heading", { level: 1, name: "Shop" })).toBeInTheDocument();
    expect(await screen.findByText("Showing 1-3 of 3 results")).toBeInTheDocument();
  });

  it("applies a search term from the url", async () => {
    renderWithProviders(<ShopPage />, { route: "/shop?search=stuart" });

    expect(await screen.findByRole("heading", { name: "Stuart Sofa" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Asgaard Sofa" })).not.toBeInTheDocument();
    expect(screen.getByText("Showing 1-1 of 1 results")).toBeInTheDocument();
  });

  it("applies a category from the url", async () => {
    renderWithProviders(<ShopPage />, { route: "/shop?category=outdoor" });

    expect(
      await screen.findByRole("heading", { name: "Outdoor Sofa Set" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Stuart Sofa" })).not.toBeInTheDocument();
  });

  it("offers to clear filters when nothing matches", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ShopPage />, { route: "/shop?search=bicycle" });

    expect(
      await screen.findByText("No products match your filters.")
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(await screen.findByRole("heading", { name: "Asgaard Sofa" })).toBeInTheDocument();
  });

  it("sorts by price", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ShopPage />, { route: "/shop" });

    await screen.findByRole("heading", { name: "Asgaard Sofa" });
    await user.selectOptions(screen.getByLabelText("Sort by"), "price-asc");

    await waitFor(() => {
      const firstCard = screen.getAllByRole("article")[0]!;

      expect(within(firstCard).getByRole("heading")).toHaveTextContent("Stuart Sofa");
    });
  });

  it("keeps the chosen page size", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ShopPage />, { route: "/shop" });

    await screen.findByRole("heading", { name: "Asgaard Sofa" });
    await user.selectOptions(screen.getByLabelText("Show"), "4");

    expect(screen.getByLabelText("Show")).toHaveValue("4");
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("reveals category chips from the filter toggle", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ShopPage />, { route: "/shop" });

    await user.click(screen.getByRole("button", { name: /filter/i }));

    expect(await screen.findByRole("button", { name: "Sofa (2)" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Outdoor (1)" }));

    expect(
      await screen.findByRole("heading", { name: "Outdoor Sofa Set" })
    ).toBeInTheDocument();
  });
});
