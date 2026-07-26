import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { placeOrder, type CheckoutPayload } from "../api/checkout.api";
import { createOrderReference } from "../utils/order-reference";

export type PlacedOrder = {
  reference: string;
};

/**
 * Submits the order and empties the basket. The confirmation screen is driven
 * by the mutation result, not by the (now empty) cart.
 */
export function usePlaceOrder() {
  const clearCart = useCartStore((state) => state.clear);

  return useMutation<PlacedOrder, Error, CheckoutPayload>({
    mutationFn: async (payload) => {
      await placeOrder(payload);

      return { reference: createOrderReference() };
    },
    onSuccess: () => {
      clearCart();
    }
  });
}
