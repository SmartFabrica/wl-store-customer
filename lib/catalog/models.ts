import "server-only";

import { apiFetch } from "@/lib/api/client";
import { apiTags } from "@/lib/api/tags";
import type { BrandModel } from "@/lib/catalog/types";

export const getModels = (brands: string[]): Promise<BrandModel[]> =>
  brands.length === 0
    ? Promise.resolve([])
    : apiFetch<BrandModel[]>({
        path: "/api/customer/models",
        query: { brands: brands.join(",") },
        tags: [apiTags.models],
        revalidate: 3600,
      });
