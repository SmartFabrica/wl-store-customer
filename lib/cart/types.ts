import type { Product } from "@/lib/catalog/types";

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 999;

export type CartLine = {
  productId: string;
  quantity: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  lineTotal: number | null;
};

export type Cart = {
  items: CartItem[];
  itemCount: number;
  totalQuantity: number;
  subtotal: number;
  quoteOnlyCount: number;
};
