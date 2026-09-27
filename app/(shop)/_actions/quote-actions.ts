"use server";

import { revalidatePath } from "next/cache";
import { redirect, unstable_rethrow } from "next/navigation";

import { toUserMessage } from "@/lib/api/errors";
import { createQuoteRequest } from "@/lib/quotes/create";
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

export const createQuote = async (
  values: QuoteInput,
): Promise<QuoteActionState> => {
  const parsed = quoteSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error.issues) };
  }

  const { deliveryAddress, billingSameAsDelivery, billingAddress, note } =
    parsed.data;

  let quoteNumber: string;
  try {
    const { quote } = await createQuoteRequest({
      shipping_address: deliveryAddress,
      billing_address: billingSameAsDelivery ? deliveryAddress : billingAddress,
      buyer_note: note,
    });
    quoteNumber = quote.quote_number;
  } catch (error) {
    unstable_rethrow(error);
    return { formError: toUserMessage(error) };
  }

  revalidatePath("/", "layout");

  redirect(quoteSubmittedPath(quoteNumber));
};
