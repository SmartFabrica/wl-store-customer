import "server-only";

import { apiFetch } from "@/lib/api/client";
import { apiTags } from "@/lib/api/tags";
import type { Brand } from "@/lib/catalog/types";

export const getBrands = () =>
  apiFetch<Brand[]>({
    path: "/api/customer/brands",
    tags: [apiTags.brands],
    revalidate: 3600,
    auth: true,
  });
