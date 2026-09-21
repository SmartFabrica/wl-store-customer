import "server-only";

import { apiFetch } from "@/lib/api/client";
import { apiTags } from "@/lib/api/tags";
import type { CatalogFilters, Product } from "@/lib/catalog/types";

export type ProductList = {
  items: Product[];
  total: number;
};

export const getProducts = (filters: CatalogFilters) =>
  apiFetch<ProductList>({
    path: "/api/customer/products",
    query: {
      q: filters.q,
      category: filters.category,
      brands: filters.brands.join(","),
      models: filters.models.join(","),
      chassis: filters.cases.join(","),
      sort: filters.sort,
    },
    tags: [apiTags.products],
    revalidate: 300,
    auth: true,
  });
