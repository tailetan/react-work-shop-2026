import { endpoints } from "@/services/endpoints";
import { httpClient } from "@/services/http";
import type {
  Category,
  CategoryListResponse,
  Product,
  ProductDetail,
  ProductDetailListResponse,
  ProductListResponse
} from "@/types/api";

export async function getProducts(): Promise<Product[]> {
  const response = await httpClient.get<ProductListResponse>(endpoints.products);

  return response?.items ?? [];
}

export async function getProductDetails(): Promise<ProductDetail[]> {
  const response = await httpClient.get<ProductDetailListResponse>(endpoints.productDetails);

  return response?.items ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const response = await httpClient.get<CategoryListResponse>(endpoints.categories);

  return response?.items ?? [];
}
