import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCartStore, type CartLine } from "@/features/cart/stores/cart-store";
import { httpClient } from "@/services/http";
import { mockApiResponses } from "@/test/http-mock";
import { renderWithProviders } from "@/test/utils";
import { CheckoutPage } from "./checkout-page";

vi.mock("@/services/http", () => import("@/test/http-mock"));

const line: CartLine = {
  id: "1::l::Black",
  productId: 1,
  slug: "asgaard-sofa",
  name: "Asgaard Sofa",
  image: "/images/product/product-01.png",
  price: 25000000,
  quantity: 1,
  size: "l",
  color: "Black"
};

async function fillBilling(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("First Name"), "Tai");
  await user.type(screen.getByLabelText("Last Name"), "Le");
  await user.type(screen.getByLabelText("Street address"), "400 University Drive");
  await user.type(screen.getByLabelText("Town / City"), "Coral Gables");
  await user.type(screen.getByLabelText("ZIP code"), "33134");
  await user.type(screen.getByLabelText("Phone"), "+84 546 6789");
  await user.type(screen.getByLabelText("Email address"), "tai@example.com");
}

describe("CheckoutPage", () => {
  beforeEach(() => {
    mockApiResponses();
  });

  it("blocks checkout with an empty cart", () => {
    renderWithProviders(<CheckoutPage />, { route: "/checkout" });

    expect(
      screen.getByRole("heading", { name: "Nothing to check out yet" })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("First Name")).not.toBeInTheDocument();
  });

  it("renders the billing form and order summary", () => {
    useCartStore.setState({ lines: [line] });
    renderWithProviders(<CheckoutPage />, { route: "/checkout" });

    expect(screen.getByRole("heading", { name: "Billing details" })).toBeInTheDocument();
    expect(screen.getByText("Asgaard Sofa")).toBeInTheDocument();
    expect(screen.getByText("x 1")).toBeInTheDocument();
  });

  it("reports missing required fields instead of submitting", async () => {
    useCartStore.setState({ lines: [line] });
    const user = userEvent.setup();
    renderWithProviders(<CheckoutPage />, { route: "/checkout" });

    await user.click(screen.getByRole("button", { name: "Place order" }));

    expect((await screen.findAllByRole("alert")).length).toBeGreaterThanOrEqual(5);
    expect(httpClient.post).not.toHaveBeenCalled();
  });

  it("validates the email format", async () => {
    useCartStore.setState({ lines: [line] });
    const user = userEvent.setup();
    renderWithProviders(<CheckoutPage />, { route: "/checkout" });

    await user.type(screen.getByLabelText("Email address"), "nope");
    await user.click(screen.getByRole("button", { name: "Place order" }));

    expect(await screen.findByText("Enter a valid email address")).toBeInTheDocument();
  });

  it("places the order, confirms and empties the cart", async () => {
    useCartStore.setState({ lines: [line] });
    const user = userEvent.setup();
    renderWithProviders(<CheckoutPage />, { route: "/checkout" });

    await fillBilling(user);
    await user.click(screen.getByRole("button", { name: "Place order" }));

    expect(
      await screen.findByRole("heading", { name: "Thank you for your order" })
    ).toBeInTheDocument();
    expect(screen.getByText(/^FN-/)).toBeInTheDocument();
    expect(useCartStore.getState().lines).toHaveLength(0);

    expect(httpClient.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        paymentMethod: "bank-transfer",
        total: 25000000,
        billing: expect.objectContaining({ firstName: "Tai", email: "tai@example.com" })
      })
    );
  });

  it("switches the payment method", async () => {
    useCartStore.setState({ lines: [line] });
    const user = userEvent.setup();
    renderWithProviders(<CheckoutPage />, { route: "/checkout" });

    await user.click(screen.getByRole("radio", { name: "Cash On Delivery" }));
    await fillBilling(user);
    await user.click(screen.getByRole("button", { name: "Place order" }));

    await screen.findByRole("heading", { name: "Thank you for your order" });
    expect(httpClient.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ paymentMethod: "cash-on-delivery" })
    );
  });

  it("surfaces a failed order", async () => {
    vi.mocked(httpClient.post).mockRejectedValue(new Error("gateway"));
    useCartStore.setState({ lines: [line] });
    const user = userEvent.setup();
    renderWithProviders(<CheckoutPage />, { route: "/checkout" });

    await fillBilling(user);
    await user.click(screen.getByRole("button", { name: "Place order" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
    expect(useCartStore.getState().lines).toHaveLength(1);
  });
});
