/** Durumu satıcı/yönetici belirler; müşteri yalnızca izler. */
export enum QuoteStatus {
  PENDING = "pending",
  APPROVED = "approved",
  SHIPPED = "shipped",
  COMPLETED = "completed",
}

export const QUOTE_STATUSES = Object.values(QuoteStatus);

/** POST /api/customer/quotes yanıtındaki ham kayıtlar. */
export type QuoteRow = {
  id: string;
  quote_number: string;
  buyer_id: string;
  vendor_id: string | null;
  status: QuoteStatus;
  shipping_address: string;
  billing_address?: string;
  buyer_note?: string;
  created_at: string;
  updated_at: string;
};

/** GET /api/customer/quotes listesindeki satır. */
export type QuoteListItem = Pick<
  QuoteRow,
  "id" | "quote_number" | "status" | "created_at"
> & {
  item_count: number;
  /** Fiyatı gizli ürünler toplama dahil değil; hiç görünür fiyat yoksa `null`. */
  total_price: string | null;
  has_hidden_price: boolean;
};

export type QuoteItemRow = {
  id: string;
  quote_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
};

export type QuoteCreateResult = {
  quote: QuoteRow;
  items: QuoteItemRow[];
};

export type QuoteItem = {
  name: string;
  mpn: string;
  quantity: number;
  /** Satıcı fiyatlandırmadıysa `null`. */
  unitPrice: number | null;
};

export type Quote = {
  number: string;
  /** ISO tarih. */
  createdAt: string;
  status: QuoteStatus;
  items: QuoteItem[];
  deliveryAddress: string;
  /** `null` ise teslimat adresiyle aynı. */
  billingAddress: string | null;
  taxInfo: string | null;
  note: string;
};
