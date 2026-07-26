import { Link } from "react-router";
import { routes } from "@/app/routes";
import { Container } from "@/components/container";
import { QueryState } from "@/components/query-state";
import { useAddProductToCart } from "@/features/cart/hooks/use-add-product-to-cart";
import { ProductGrid } from "@/features/products/components/product-grid";
import { useProducts } from "@/features/products/hooks/use-products";
import { toProductCardItem } from "@/features/products/utils/product-card-item";

export function OurProductsSection() {
  const productsQuery = useProducts();
  const addToCart = useAddProductToCart(productsQuery.data);

  const items = (productsQuery.data ?? []).map(toProductCardItem);

  return (
    <section className="pb-16">
      <Container max={1236}>
        <h2 className="mb-8 text-center text-[32px] font-bold text-dark md:text-[40px]">
          Our Products
        </h2>

        <QueryState
          error={productsQuery.error}
          isEmpty={items.length === 0}
          isError={productsQuery.isError}
          isLoading={productsQuery.isLoading}
          emptyLabel="No products available right now."
          loadingLabel="Loading products..."
          onRetry={() => void productsQuery.refetch()}
        />

        {items.length > 0 ? (
          <>
            <ProductGrid items={items} onAddToCart={(item) => addToCart(item.slug)} />
            <div className="mt-8 text-center">
              <Link
                className="inline-flex border border-brand px-[78px] py-3 font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                to={routes.shop}
              >
                Show More
              </Link>
            </div>
          </>
        ) : null}
      </Container>
    </section>
  );
}
