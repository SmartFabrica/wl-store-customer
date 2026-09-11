/**
 * Reddedilen teklifler sistemde tutulmadığı için "rejected" durumu yoktur.
 * Teklifin kabulü yönetici ekranından yapılır; müşteri yalnızca izler.
 */
export const QUOTE_STATUSES = ["reviewing", "quoted", "accepted"] as const;

export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

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
