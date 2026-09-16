import "server-only";

import { apiFetch } from "@/lib/api/client";
import { apiTags } from "@/lib/api/tags";
import type { ModelChassis } from "@/lib/catalog/types";

export const getChassis = (models: string[]): Promise<ModelChassis[]> =>
  models.length === 0
    ? Promise.resolve([])
    : apiFetch<ModelChassis[]>({
        path: "/api/customer/chassis",
        query: { models: models.join(",") },
        tags: [apiTags.chassis],
        revalidate: 3600,
      });
