import "server-only";

import { apiFetch } from "@/lib/api/client";
import type { QuoteListItem } from "@/lib/quotes/types";

export const getQuotes = () =>
  apiFetch<QuoteListItem[]>({
    path: "/api/customer/quotes",
    auth: true,
  });
