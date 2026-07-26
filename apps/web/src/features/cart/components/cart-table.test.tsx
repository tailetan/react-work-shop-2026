import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/utils";
import type { CartLine } from "../stores/cart-store";
import { CartTable } from "./cart-table";

const lines: CartLine[] = [
  {
    id: "1::l::Black",
    productId: 1,
    slug: "asgaard-sofa",
    name: "Asgaard Sofa",
    image: "/images/product/product-01.png",
    price: 25000000,
    quantity: 2,
    size: "l",
    color: "Black"
  },
  {
    id: "3::-::-",
    productId: 3,
    slug: "stuart-sofa",
    name: "Stuart Sofa",
    image: "/images/product/product-07.png",
    price: 21400000,
    quantity: 1,
    size: null,
    color: null
  }
];

function setup() {
  const onQuantityChange = vi.fn();
  const onRemove = vi.fn();

  renderWithProviders(
    <CartTable lines={lines} onQuantityChange={onQuantityChange} onRemove={onRemove} />
  );

  return { onQuantityChange, onRemove };
}

describe("CartTable", () => {
  it("renders a row per line with the line total", () => {
    setup();

    // Skip the header row.
    const rows = screen.getAllByRole("row").slice(1);
    expect(rows).toHaveLength(2);

    expect(within(rows[0]!).getByRole("link", { name: "Asgaard Sofa" })).toHaveAttribute(
      "href",
      "/product/asgaard-sofa"
    );
    // Unit price Rp 25.000.000 x 2 units.
    expect(within(rows[0]!).getByText("Rp 25.000.000")).toBeInTheDocument();
    expect(within(rows[0]!).getByText("Rp 50.000.000")).toBeInTheDocument();

    // A single unit repeats the price as the line subtotal.
    expect(within(rows[1]!).getAllByText("Rp 21.400.000")).toHaveLength(2);
  });

  it("describes the selected variant", () => {
    setup();

    expect(screen.getByText("Size L / Black")).toBeInTheDocument();
  });

  it("reports quantity changes", () => {
    const { onQuantityChange } = setup();

    // A direct change event, because the input is controlled by the store.
    fireEvent.change(screen.getByLabelText("Quantity for Asgaard Sofa"), {
      target: { value: "4" }
    });

    expect(onQuantityChange).toHaveBeenCalledWith("1::l::Black", 4);
  });

  it("ignores an emptied quantity field", () => {
    const { onQuantityChange } = setup();

    fireEvent.change(screen.getByLabelText("Quantity for Stuart Sofa"), {
      target: { value: "" }
    });

    expect(onQuantityChange).not.toHaveBeenCalled();
  });

  it("removes a line", async () => {
    const user = userEvent.setup();
    const { onRemove } = setup();

    await user.click(
      screen.getByRole("button", { name: "Remove Stuart Sofa from cart" })
    );

    expect(onRemove).toHaveBeenCalledWith("3::-::-");
  });
});
