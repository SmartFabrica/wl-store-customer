import "server-only";

import { cookies } from "next/headers";

import { apiFetch } from "@/lib/api/client";
import {
  MAX_QUANTITY,
  MIN_QUANTITY,
  type Cart,
  type CartItem,
  type CartLine,
  type CartResponse,
} from "@/lib/cart/types";

export const CART_COOKIE = "cart";

export const clampQuantity = (value: number) =>
  Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.trunc(value)));

const parseLines = (raw: string | undefined): CartLine[] => {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((entry) => {
      if (typeof entry !== "object" || entry === null) return [];
      const { productId, quantity } = entry as Partial<CartLine>;
      if (typeof productId !== "string" || typeof quantity !== "number") {
        return [];
      }
      return [{ productId, quantity: clampQuantity(quantity) }];
    });
  } catch {
    return [];
  }
};

export const readCartLines = async () => {
  const store = await cookies();
  return parseLines(store.get(CART_COOKIE)?.value);
};

export const serializeCartLines = (lines: CartLine[]) => JSON.stringify(lines);

export const itemTotal = (item: CartItem) =>
  item.price === null ? null : Number(item.price) * item.quantity;

export const getCart = async (): Promise<Cart> => {
  const { items, total_items, total_quantity } = await apiFetch<CartResponse>({
    path: "/api/customer/cart",
    auth: true,
  });

  return {
    items,
    itemCount: total_items,
    totalQuantity: total_quantity,
    subtotal: items.reduce((total, item) => total + (itemTotal(item) ?? 0), 0),
    quoteOnlyCount: items.filter((item) => item.price === null).length,
  };
};
