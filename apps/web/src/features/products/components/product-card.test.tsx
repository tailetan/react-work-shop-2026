import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/utils";
import { ProductCard, type ProductCardItem } from "./product-card";

const item: ProductCardItem = {
  slug: "asgaard-sofa",
  name: "Asgaard Sofa",
  description: "Modern upholstered sofa",
  image: "/images/product/product-01.png",
  priceText: "25.000.000 VND",
  originalPriceText: "28.000.000 VND",
  badge: { label: "-11%", tone: "danger" }
};

describe("ProductCard", () => {
  it("renders the product summary", () => {
    renderWithProviders(<ProductCard item={item} />);

    expect(screen.getByRole("heading", { name: "Asgaard Sofa" })).toBeInTheDocument();
    expect(screen.getByText("Modern upholstered sofa")).toBeInTheDocument();
    expect(screen.getByText("25.000.000 VND")).toBeInTheDocument();
    expect(screen.getByText("28.000.000 VND")).toBeInTheDocument();
    expect(screen.getByText("-11%")).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    renderWithProviders(<ProductCard item={item} />);

    expect(screen.getByRole("link", { name: "Asgaard Sofa" })).toHaveAttribute(
      "href",
      "/product/asgaard-sofa"
    );
  });

  it("omits the badge and old price when absent", () => {
    renderWithProviders(
      <ProductCard item={{ ...item, badge: null, originalPriceText: undefined }} />
    );

    expect(screen.queryByText("-11%")).not.toBeInTheDocument();
    expect(screen.queryByText("28.000.000 VND")).not.toBeInTheDocument();
  });

  it("reports add-to-cart with the item", async () => {
    const onAddToCart = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<ProductCard item={item} onAddToCart={onAddToCart} />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(onAddToCart).toHaveBeenCalledWith(item);
  });

  it("renders custom overlay actions in place of the defaults", () => {
    renderWithProviders(
      <ProductCard actions={<span>Custom action</span>} item={item} />
    );

    expect(screen.getByText("Custom action")).toBeInTheDocument();
    expect(screen.queryByText("Compare")).not.toBeInTheDocument();
  });
});
