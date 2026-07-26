import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { useCartStore, type CartLine } from "@/features/cart/stores/cart-store";
import { renderWithProviders } from "@/test/utils";
import { CartPage } from "./cart-page";

const line: CartLine = {
  id: "1::l::Black",
  productId: 1,
  slug: "asgaard-sofa",
  name: "Asgaard Sofa",
  image: "/images/product/product-01.png",
  price: 25000000,
  quantity: 2,
  size: "l",
  color: "Black"
};

describe("CartPage", () => {
  it("shows the empty state with a link to the shop", () => {
    renderWithProviders(<CartPage />, { route: "/cart" });

    expect(screen.getByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse the shop" })).toHaveAttribute(
      "href",
      "/shop"
    );
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("lists the cart lines with totals", () => {
    useCartStore.setState({ lines: [line] });
    renderWithProviders(<CartPage />, { route: "/cart" });

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cart Totals" })).toBeInTheDocument();
    // 2 x Rp 25.000.000 appears as the line subtotal, the cart subtotal and the total.
    expect(screen.getAllByText("Rp 50.000.000").length).toBeGreaterThanOrEqual(3);
    expect(screen.getByRole("link", { name: "Check Out" })).toHaveAttribute(
      "href",
      "/checkout"
    );
  });

  it("updates the quantity from the table", () => {
    useCartStore.setState({ lines: [line] });
    renderWithProviders(<CartPage />, { route: "/cart" });

    fireEvent.change(screen.getByLabelText("Quantity for Asgaard Sofa"), {
      target: { value: "5" }
    });

    expect(useCartStore.getState().lines[0]?.quantity).toBe(5);
  });

  it("removes a line and falls back to the empty state", async () => {
    useCartStore.setState({ lines: [line] });
    const user = userEvent.setup();
    renderWithProviders(<CartPage />, { route: "/cart" });

    await user.click(
      screen.getByRole("button", { name: "Remove Asgaard Sofa from cart" })
    );

    expect(useCartStore.getState().lines).toHaveLength(0);
    expect(screen.getByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
  });
});
