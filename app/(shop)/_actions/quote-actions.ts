"use server";

import { redirect } from "next/navigation";

import { clearCart } from "@/app/(shop)/_actions/cart-actions";
import { getCart } from "@/lib/cart/cart";
import { quoteSchema, type QuoteInput } from "@/lib/validations/quote";
import { quoteSubmittedPath } from "@/lib/routes";

export type QuoteActionState = {
  formError?: string;
  fieldErrors?: Record<string, string>;
};

const toFieldErrors = (issues: { path: PropertyKey[]; message: string }[]) => {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const field = issue.path.join(".");
    if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
  }
  return fieldErrors;
};

// TODO: Teklif numarası API tarafından üretilecek.
const generateQuoteNumber = () => {
  const year = new Date().getFullYear();
  const sequence = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  return `TKF-${year}-${sequence}`;
};

export const createQuote = async (
  values: QuoteInput,
): Promise<QuoteActionState> => {
  const parsed = quoteSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error.issues) };
  }

  const cart = await getCart();
  if (cart.items.length === 0) {
    return { formError: "Sepetiniz boş, teklif oluşturulamadı." };
  }

  // TODO: Teklif API'ye gönderilecek; şimdilik sepet boşaltılıp onay
  // ekranına yönlendiriliyor.
  const quoteNumber = generateQuoteNumber();
  await clearCart();

  redirect(quoteSubmittedPath(quoteNumber));
};
