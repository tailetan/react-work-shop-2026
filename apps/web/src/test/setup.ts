import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach } from "vitest";
import { useCartStore } from "@/features/cart/stores/cart-store";

// The cart is a persisted global store; every test starts from an empty basket.
beforeEach(() => {
  window.localStorage.clear();
  useCartStore.setState({ lines: [] });
});

afterEach(() => {
  useCartStore.setState({ lines: [] });
});
