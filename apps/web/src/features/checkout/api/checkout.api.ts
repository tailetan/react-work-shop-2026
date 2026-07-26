import { endpoints } from "@/services/endpoints";
import { httpClient } from "@/services/http";

export type BillingDetails = {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInformation: string;
};

export type PaymentMethod = "bank-transfer" | "cash-on-delivery";

export type CheckoutOrderLine = {
  productId: number;
  name: string;
  quantity: number;
  price: number;
};

export type CheckoutPayload = {
  billing: BillingDetails;
  paymentMethod: PaymentMethod;
  lines: CheckoutOrderLine[];
  subtotal: number;
  total: number;
};

/**
 * The mock endpoint answers 200 with an empty body, so a resolved promise is
 * the only success signal and there is nothing to parse.
 */
export async function placeOrder(payload: CheckoutPayload): Promise<void> {
  await httpClient.post<unknown, CheckoutPayload>(endpoints.checkout, payload);
}
