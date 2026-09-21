export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 999;

export type CartLine = {
  productId: string;
  quantity: number;
};

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  title: string;
  mpn: string;
  price_visible: boolean;
  price: string | null;
  brand_name: string;
  images: string[];
};

export type CartResponse = {
  items: CartItem[];
  total_items: number;
  total_quantity: number;
};

export type Cart = {
  items: CartItem[];
  itemCount: number;
  totalQuantity: number;
  subtotal: number;
  quoteOnlyCount: number;
};
