import { useState } from "react";
import { Link } from "react-router";
import { routes } from "@/app/routes";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { FeatureStrip } from "@/components/feature-strip";
import { PageBanner } from "@/components/page-banner";
import { useCart } from "@/features/cart/hooks/use-cart";
import type { BillingDetails, PaymentMethod } from "@/features/checkout/api/checkout.api";
import { BillingForm } from "@/features/checkout/components/billing-form";
import { OrderSummary } from "@/features/checkout/components/order-summary";
import { usePlaceOrder } from "@/features/checkout/hooks/use-place-order";
import { resolveErrorMessage } from "@/utils/error-message";

const FORM_ID = "checkout-billing-form";

export function CheckoutPage() {
  const { isEmpty, lines, subtotal, total } = useCart();
  const placeOrder = usePlaceOrder();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank-transfer");

  function handleSubmit(billing: BillingDetails) {
    placeOrder.mutate({
      billing,
      paymentMethod,
      lines: lines.map((line) => ({
        productId: line.productId,
        name: line.name,
        quantity: line.quantity,
        price: line.price
      })),
      subtotal,
      total
    });
  }

  return (
    <>
      <PageBanner image="/images/common/common-06.png" title="Checkout" />

      <section className="py-16">
        <Container>
          {placeOrder.isSuccess ? (
            <div className="grid place-items-center gap-4 py-16 text-center">
              <h2 className="text-3xl font-semibold text-dark">Thank you for your order</h2>
              <p className="text-muted">
                Your order reference is{" "}
                <strong className="text-brand">{placeOrder.data.reference}</strong>. We have sent
                the confirmation to your email address.
              </p>
              <Link
                className="mt-2 inline-flex rounded-[15px] border border-black px-12 py-3 text-xl transition-colors hover:bg-black hover:text-white"
                to={routes.shop}
              >
                Continue shopping
              </Link>
            </div>
          ) : isEmpty ? (
            <EmptyState
              actionLabel="Browse the shop"
              actionTo={routes.shop}
              description="Add a few pieces to your cart before checking out."
              title="Nothing to check out yet"
            />
          ) : (
            <div className="grid gap-12 lg:grid-cols-[1fr_0.86fr] lg:gap-20">
              <BillingForm formId={FORM_ID} onSubmit={handleSubmit} />
              <OrderSummary
                errorMessage={
                  placeOrder.isError ? resolveErrorMessage(placeOrder.error) : null
                }
                formId={FORM_ID}
                isSubmitting={placeOrder.isPending}
                lines={lines}
                onPaymentMethodChange={setPaymentMethod}
                paymentMethod={paymentMethod}
                subtotal={subtotal}
                total={total}
              />
            </div>
          )}
        </Container>
      </section>

      <FeatureStrip />
    </>
  );
}
