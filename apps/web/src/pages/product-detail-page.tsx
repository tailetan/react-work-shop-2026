import { Link, useParams } from "react-router";
import { routes } from "@/app/routes";
import { BreadcrumbBar } from "@/components/breadcrumb-bar";
import { Container } from "@/components/container";
import { QueryState } from "@/components/query-state";
import { useAddProductToCart } from "@/features/cart/hooks/use-add-product-to-cart";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { ProductGrid } from "@/features/products/components/product-grid";
import { ProductSummary } from "@/features/products/components/product-summary";
import { ProductTabs } from "@/features/products/components/product-tabs";
import { useProductDetail } from "@/features/products/hooks/use-product-detail";
import { useProducts } from "@/features/products/hooks/use-products";
import { relatedToProductCardItem } from "@/features/products/utils/product-card-item";
import { NotFoundPage } from "./not-found-page";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { detail, error, isError, isLoading, refetch } = useProductDetail(slug);
  const productsQuery = useProducts();
  const addToCart = useAddProductToCart(productsQuery.data);

  if (isLoading || isError) {
    return (
      <Container>
        <QueryState
          error={error}
          isError={isError}
          isLoading={isLoading}
          loadingLabel="Loading product..."
          onRetry={refetch}
        />
      </Container>
    );
  }

  if (!detail) {
    return <NotFoundPage />;
  }

  const relatedItems = detail.relatedProducts.map(relatedToProductCardItem);

  return (
    <>
      <BreadcrumbBar items={detail.breadcrumb} />

      <section className="py-9">
        <Container className="grid gap-10 lg:grid-cols-[553px_1fr] lg:gap-20">
          <ProductGallery gallery={detail.gallery} name={detail.name} />
          {/* Remount per product so size/colour/quantity reset on navigation. */}
          <ProductSummary detail={detail} key={detail.slug} />
        </Container>
      </section>

      <ProductTabs detail={detail} />

      {relatedItems.length > 0 ? (
        <section className="py-14">
          <Container max={1236}>
            <h2 className="mb-7 text-center text-3xl font-medium md:text-4xl">
              Related Products
            </h2>
            <ProductGrid items={relatedItems} onAddToCart={(item) => addToCart(item.slug)} />
            <div className="mt-11 text-center">
              <Link
                className="inline-flex border border-brand px-[74px] py-3 font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                to={routes.shop}
              >
                Show More
              </Link>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
