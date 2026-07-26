import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { useLocation } from "react-router";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { renderWithProviders } from "@/test/utils";
import { SiteHeader } from "./site-header";

function LocationProbe() {
  const location = useLocation();

  return <div data-testid="location">{`${location.pathname}${location.search}`}</div>;
}

function setup(route = "/") {
  return renderWithProviders(
    <>
      <SiteHeader />
      <LocationProbe />
    </>,
    { route }
  );
}

describe("SiteHeader", () => {
  it("renders the primary navigation", () => {
    setup();

    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Shop" }).length).toBeGreaterThan(0);
  });

  it("hides the cart badge for an empty cart", () => {
    setup();

    expect(screen.getByRole("link", { name: "Cart, 0 items" })).toBeInTheDocument();
  });

  it("shows the cart badge count", () => {
    useCartStore.setState({
      lines: [
        {
          id: "1::-::-",
          productId: 1,
          slug: "asgaard-sofa",
          name: "Asgaard Sofa",
          image: "/images/product/product-01.png",
          price: 25000000,
          quantity: 3,
          size: null,
          color: null
        }
      ]
    });

    setup();

    expect(screen.getByRole("link", { name: "Cart, 3 items" })).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("toggles the mobile navigation", async () => {
    const user = userEvent.setup();
    setup();

    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("sends a search term to the shop page", async () => {
    const user = userEvent.setup();
    setup();

    await user.click(screen.getByRole("button", { name: "Search products" }));
    await user.type(screen.getByRole("searchbox"), "sofa");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByTestId("location")).toHaveTextContent("/shop?search=sofa");
  });

  it("goes to the shop with no term", async () => {
    const user = userEvent.setup();
    setup();

    await user.click(screen.getByRole("button", { name: "Search products" }));
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByTestId("location")).toHaveTextContent("/shop");
  });
});
