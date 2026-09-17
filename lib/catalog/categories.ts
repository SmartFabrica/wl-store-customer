import "server-only";

import { apiFetch } from "@/lib/api/client";
import { apiTags } from "@/lib/api/tags";
import type { Category } from "@/lib/catalog/types";

export const getCategories = () =>
  apiFetch<Category[]>({
    path: "/api/customer/categories",
    tags: [apiTags.categories],
    revalidate: 3600,
  });
