import { useQuery } from "@tanstack/react-query";
import { getCategories, getProductDetails, getProducts } from "../api/products.api";

export const productQueryKeys = {
  all: ["products"] as const,
  details: ["product-details"] as const,
  categories: ["categories"] as const
};

export function useProducts() {
  return useQuery({
    queryKey: productQueryKeys.all,
    queryFn: getProducts
  });
}

export function useProductDetails() {
  return useQuery({
    queryKey: productQueryKeys.details,
    queryFn: getProductDetails
  });
}

export function useCategories() {
  return useQuery({
    queryKey: productQueryKeys.categories,
    queryFn: getCategories
  });
}
