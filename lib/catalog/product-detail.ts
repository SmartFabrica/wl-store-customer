import "server-only";

import { apiFetch } from "@/lib/api/client";
import { isApiError } from "@/lib/api/errors";
import { apiTags } from "@/lib/api/tags";
import type {
  CompatibilityGroup,
  ProductCompat,
  ProductDetail,
} from "@/lib/catalog/types";

export const getProduct = async (id: string) => {
  try {
    return await apiFetch<ProductDetail>({
      path: `/api/customer/products/${id}`,
      tags: [apiTags.product(id)],
      revalidate: 300,
    });
  } catch (error) {
    if (isApiError(error) && error.status === 404) return null;
    throw error;
  }
};

export const groupCompatibility = (
  compat: ProductCompat[],
): CompatibilityGroup[] => {
  const byModel = new Map<string, string[]>();

  for (const item of compat) {
    const chassis = byModel.get(item.model_name) ?? [];
    chassis.push(item.chassis_name);
    byModel.set(item.model_name, chassis);
  }

  return [...byModel].map(([model, chassis]) => ({ model, chassis }));
};
