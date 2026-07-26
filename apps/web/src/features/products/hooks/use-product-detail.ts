import { useMemo } from "react";
import type { ProductDetail } from "@/types/api";
import { resolveProductDetail } from "../utils/product-detail";
import { useProductDetails, useProducts } from "./use-products";

export type UseProductDetailResult = {
  detail: ProductDetail | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * Combines the detail document with the catalogue so slugs missing from the
 * mock `productDetails` payload still render a full page.
 */
export function useProductDetail(slug: string | undefined): UseProductDetailResult {
  const detailsQuery = useProductDetails();
  const productsQuery = useProducts();

  const details = detailsQuery.data;
  const products = productsQuery.data;

  const detail = useMemo(
    () => resolveProductDetail(slug, details ?? [], products ?? []),
    [slug, details, products]
  );

  return {
    detail,
    isLoading: detailsQuery.isLoading || productsQuery.isLoading,
    isError: detailsQuery.isError || productsQuery.isError,
    error: detailsQuery.error ?? productsQuery.error,
    refetch: () => {
      void detailsQuery.refetch();
      void productsQuery.refetch();
    }
  };
}
