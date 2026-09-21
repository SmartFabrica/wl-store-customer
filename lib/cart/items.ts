import "server-only";

import { apiFetch } from "@/lib/api/client";

export const addCartItem = (productId: string, quantity: number) =>
  apiFetch<void>({
    path: "/api/customer/cart/items",
    method: "POST",
    body: { productId, quantity },
    auth: true,
  });
