import "server-only";

import { cookies } from "next/headers";

import { getProductById } from "@/lib/catalog/data";
import {
  MAX_QUANTITY,
  MIN_QUANTITY,
  type Cart,
  type CartItem,
  type CartLine,
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

export const getCart = async (): Promise<Cart> => {
  const lines = await readCartLines();

  const items = lines.flatMap<CartItem>((line) => {
    const product = getProductById(line.productId);
    if (!product) return [];

    return [
      {
        product,
        quantity: line.quantity,
        lineTotal:
          product.price === null ? null : product.price * line.quantity,
      },
    ];
  });

  return {
    items,
    itemCount: items.length,
    totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + (item.lineTotal ?? 0), 0),
    quoteOnlyCount: items.filter((item) => item.lineTotal === null).length,
  };
};
