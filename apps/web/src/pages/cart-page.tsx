import { routes } from "@/app/routes";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { FeatureStrip } from "@/components/feature-strip";
import { PageBanner } from "@/components/page-banner";
import { CartTable } from "@/features/cart/components/cart-table";
import { CartTotals } from "@/features/cart/components/cart-totals";
import { useCart } from "@/features/cart/hooks/use-cart";

export function CartPage() {
  const { isEmpty, lines, removeLine, setQuantity, subtotal, total } = useCart();

  return (
    <>
      <PageBanner image="/images/common/common-06.png" title="Cart" />

      <section className="py-16">
        <Container>
          {isEmpty ? (
            <EmptyState
              actionLabel="Browse the shop"
              actionTo={routes.shop}
              description="Once you add furniture to your cart it will show up here, ready for checkout."
              title="Your cart is empty"
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_393px]">
              <CartTable
                lines={lines}
                onQuantityChange={setQuantity}
                onRemove={removeLine}
              />
              <CartTotals subtotal={subtotal} total={total} />
            </div>
          )}
        </Container>
      </section>

      <FeatureStrip />
    </>
  );
}
