import { Container } from "@/components/container";
import { FeatureStrip } from "@/components/feature-strip";
import { PageBanner } from "@/components/page-banner";
import { Pagination } from "@/components/pagination";
import { QueryState } from "@/components/query-state";
import { useAddProductToCart } from "@/features/cart/hooks/use-add-product-to-cart";
import { ProductGrid } from "@/features/products/components/product-grid";
import { ShopToolbar } from "@/features/products/components/shop-toolbar";
import { useShopFilters } from "@/features/products/hooks/use-shop-filters";
import { useCategories, useProducts } from "@/features/products/hooks/use-products";
import { applyShopFilters } from "@/features/products/utils/filter-products";
import { toProductCardItem } from "@/features/products/utils/product-card-item";

export function ShopPage() {
  const productsQuery = useProducts();
  const categoriesQuery = useCategories();
  const { filters, update } = useShopFilters();
  const addToCart = useAddProductToCart(productsQuery.data);

  const result = applyShopFilters(productsQuery.data ?? [], filters);
  const items = result.items.map(toProductCardItem);
  const hasProducts = (productsQuery.data ?? []).length > 0;

  return (
    <>
      <PageBanner image="/images/common/common-10.jpg" title="Shop" />

      <ShopToolbar
        categories={categoriesQuery.data ?? []}
        filters={filters}
        from={result.from}
        onChange={update}
        to={result.to}
        total={result.total}
      />

      <section className="py-16">
        <Container max={1236}>
          <QueryState
            error={productsQuery.error}
            isError={productsQuery.isError}
            isLoading={productsQuery.isLoading}
            loadingLabel="Loading products..."
            onRetry={() => void productsQuery.refetch()}
          />

          {hasProducts && items.length === 0 ? (
            <div className="grid place-items-center gap-3 py-16 text-center">
              <p className="text-xl font-medium text-dark">No products match your filters.</p>
              <button
                className="font-semibold text-brand underline"
                onClick={() => update({ search: "", category: "" })}
                type="button"
              >
                Clear filters
              </button>
            </div>
          ) : null}

          {items.length > 0 ? (
            <>
              <ProductGrid items={items} onAddToCart={(item) => addToCart(item.slug)} />
              <Pagination
                onChange={(page) => update({ page })}
                page={result.page}
                totalPages={result.totalPages}
              />
            </>
          ) : null}
        </Container>
      </section>

      <FeatureStrip />
    </>
  );
}
