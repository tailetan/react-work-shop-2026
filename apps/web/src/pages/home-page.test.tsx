import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { mockApiFailure, mockApiResponses } from "@/test/http-mock";
import { renderWithProviders } from "@/test/utils";
import { HomePage } from "./home-page";

vi.mock("@/services/http", () => import("@/test/http-mock"));

describe("HomePage", () => {
  beforeEach(() => {
    mockApiResponses();
  });

  it("renders the hero and section headings", async () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /discover our new collection/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Browse The Range" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Our Products" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /50\+ beautiful rooms inspiration/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "#FuniroFurniture" })).toBeInTheDocument();
  });

  it("lists the catalogue once loaded", async () => {
    renderWithProviders(<HomePage />);

    expect(
      await screen.findByRole("heading", { name: "Asgaard Sofa" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outdoor Sofa Set" })).toBeInTheDocument();
    expect(screen.getByText("25.000.000 VND")).toBeInTheDocument();
  });

  it("adds a product to the cart from the grid", async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);

    await screen.findByRole("heading", { name: "Asgaard Sofa" });
    const [firstAddButton] = screen.getAllByRole("button", { name: /add to cart/i });
    await user.click(firstAddButton!);

    await waitFor(() => {
      expect(useCartStore.getState().lines).toHaveLength(1);
    });
    expect(useCartStore.getState().lines[0]?.slug).toBe("asgaard-sofa");
  });

  it("shows an error state when the catalogue fails to load", async () => {
    mockApiFailure();
    renderWithProviders(<HomePage />);

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
  });
});
