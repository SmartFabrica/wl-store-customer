import { z } from "zod";

export const quoteSchema = z
  .object({
    deliveryAddress: z
      .string()
      .trim()
      .min(10, "Teslimat adresini eksiksiz girin"),
    billingSameAsDelivery: z.boolean(),
    billingAddress: z.string().trim(),
    note: z.string().trim().max(1000, "Not en fazla 1000 karakter olabilir"),
  })
  .refine(
    (data) =>
      data.billingSameAsDelivery || data.billingAddress.trim().length >= 10,
    {
      message: "Fatura adresini eksiksiz girin",
      path: ["billingAddress"],
    },
  );

export type QuoteInput = z.infer<typeof quoteSchema>;

export const QUOTE_FORM_DEFAULTS: QuoteInput = {
  deliveryAddress: "",
  billingSameAsDelivery: true,
  billingAddress: "",
  note: "",
};
