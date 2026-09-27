import "server-only";

import { apiFetch } from "@/lib/api/client";
import type { QuoteCreateResult } from "@/lib/quotes/types";

export type QuoteCreateInput = {
  shipping_address: string;
  billing_address: string;
  buyer_note: string;
};

export const createQuoteRequest = (input: QuoteCreateInput) =>
  apiFetch<QuoteCreateResult>({
    path: "/api/customer/quotes",
    method: "POST",
    body: input,
    auth: true,
  });
