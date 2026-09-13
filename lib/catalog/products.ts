import "server-only";

import { apiFetch } from "@/lib/api/client";
import { apiTags } from "@/lib/api/tags";
import type { Product } from "@/lib/catalog/types";

export type ProductQuery = {
  categoryId?: string;
  modelId?: string;
  chassisId?: string;
};

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const parseProductQuery = (
  searchParams: Record<string, string | string[] | undefined>,
): ProductQuery => ({
  categoryId: first(searchParams.categoryId),
  modelId: first(searchParams.modelId),
  chassisId: first(searchParams.chassisId),
});

export const getProducts = (query: ProductQuery = {}) =>
  apiFetch<Product[]>({
    path: "/api/customer/products",
    query,
    tags: [apiTags.products],
    revalidate: 300,
  });
