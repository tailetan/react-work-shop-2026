import type { CartLine } from "@/features/cart/stores/cart-store";
import { formatPrice } from "@/utils/format";
import type { PaymentMethod } from "../api/checkout.api";

export type OrderSummaryProps = {
  lines: CartLine[];
  subtotal: number;
  total: number;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  formId: string;
  isSubmitting: boolean;
  errorMessage?: string | null;
};

const paymentOptions: { value: PaymentMethod; label: string; description?: string }[] = [
  {
    value: "bank-transfer",
    label: "Direct Bank Transfer",
    description:
      "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
  },
  { value: "cash-on-delivery", label: "Cash On Delivery" }
];

export function OrderSummary({
  errorMessage,
  formId,
  isSubmitting,
  lines,
  onPaymentMethodChange,
  paymentMethod,
  subtotal,
  total
}: OrderSummaryProps) {
  return (
    <aside className="self-start">
      <div className="border-b border-line pb-8">
        <div className="mb-4 flex justify-between text-xl font-medium md:text-2xl">
          <span>Product</span>
          <span>Subtotal</span>
        </div>

        {lines.map((line) => (
          <div className="mb-4 flex justify-between gap-4" key={line.id}>
            <span className="text-muted">
              {line.name} <span className="font-medium text-black">x {line.quantity}</span>
            </span>
            <span className="shrink-0">{formatPrice(line.price * line.quantity)}</span>
          </div>
        ))}

        <div className="mb-4 flex justify-between gap-4">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span>Total</span>
          <span className="text-xl font-bold text-brand md:text-2xl">{formatPrice(total)}</span>
        </div>
      </div>

      <fieldset className="grid gap-4 py-8">
        <legend className="sr-only">Payment method</legend>

        {paymentOptions.map((option) => (
          <div key={option.value}>
            <label className="flex items-center gap-4 font-medium">
              <input
                checked={paymentMethod === option.value}
                name="payment"
                onChange={() => onPaymentMethodChange(option.value)}
                type="radio"
                value={option.value}
              />
              {option.label}
            </label>
            {option.description && paymentMethod === option.value ? (
              <p className="mt-3 leading-relaxed text-muted">{option.description}</p>
            ) : null}
          </div>
        ))}

        <p className="leading-relaxed">
          Your personal data will be used to support your experience throughout this website, to
          manage access to your account, and for other purposes described in our{" "}
          <strong>privacy policy</strong>.
        </p>

        {errorMessage ? (
          <p className="font-medium text-danger" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <button
          className="mx-auto mt-4 inline-flex rounded-[15px] border border-black px-16 py-4 text-xl transition-colors hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-60 md:px-[102px]"
          disabled={isSubmitting}
          form={formId}
          type="submit"
        >
          {isSubmitting ? "Placing order..." : "Place order"}
        </button>
      </fieldset>
    </aside>
  );
}
