import { QUOTES } from "@/lib/quotes/data";
import {
  QUOTE_STATUSES,
  type Quote,
  type QuoteStatus,
} from "@/lib/quotes/types";
import { QUOTES_PATH } from "@/lib/routes";

export const STATUS_PARAM = "durum";

/** `null` = "Tümü" sekmesi. */
export type QuoteStatusFilter = QuoteStatus | null;

type RawSearchParams = Record<string, string | string[] | undefined>;

export const parseStatusFilter = (
  searchParams: RawSearchParams,
): QuoteStatusFilter => {
  const raw = searchParams[STATUS_PARAM];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return QUOTE_STATUSES.includes(value as QuoteStatus)
    ? (value as QuoteStatus)
    : null;
};

export const buildQuotesHref = (status: QuoteStatusFilter) =>
  status ? `${QUOTES_PATH}?${STATUS_PARAM}=${status}` : QUOTES_PATH;

export const filterQuotes = (status: QuoteStatusFilter) =>
  status ? QUOTES.filter((quote) => quote.status === status) : QUOTES;

export const countByStatus = (status: QuoteStatusFilter) =>
  filterQuotes(status).length;

/** Fiyatlanmış satırların toplamı; hiçbiri fiyatlanmadıysa `null`. */
export const quoteAmount = (quote: Quote) => {
  const priced = quote.items.filter((item) => item.unitPrice !== null);
  if (priced.length === 0) return null;
  return priced.reduce(
    (total, item) => total + (item.unitPrice ?? 0) * item.quantity,
    0,
  );
};

export const isFullyPriced = (quote: Quote) =>
  quote.items.every((item) => item.unitPrice !== null);
