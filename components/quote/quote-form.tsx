"use client";

import { useId, useTransition, type ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createQuote } from "@/app/(shop)/_actions/quote-actions";
import { FormCard } from "@/components/shared/form-card";
import { FormErrorAlert } from "@/components/shared/form-error-alert";
import { SubmitButton } from "@/components/shared/submit-button";
import { TextareaField } from "@/components/shared/textarea-field";
import { Switch } from "@/components/ui/switch";
import { formatPrice } from "@/lib/format";
import {
  QUOTE_FORM_DEFAULTS,
  quoteSchema,
  type QuoteInput,
} from "@/lib/validations/quote";

export const QuoteForm = ({
  summary,
  subtotal,
}: {
  summary: ReactNode;
  subtotal: number;
}) => {
  const [pending, startTransition] = useTransition();
  const deliveryId = useId();
  const billingId = useId();
  const noteId = useId();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: QUOTE_FORM_DEFAULTS,
  });

  const sameAsDelivery = useWatch({ control, name: "billingSameAsDelivery" });

  const onSubmit = (values: QuoteInput) => {
    startTransition(async () => {
      const result = await createQuote(values);

      for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
        setError(field as keyof QuoteInput, { message });
      }
      if (result.formError) {
        setError("root", { message: result.formError });
      }
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid items-start gap-5 lg:grid-cols-[1fr_372px] lg:gap-7"
    >
      <div className="flex flex-col gap-5">
        <FormErrorAlert message={errors.root?.message} />

        <FormCard
          title="Teslimat adresi"
          description="Ürünlerin teslim edileceği adres."
          required
        >
          <TextareaField
            id={deliveryId}
            label="Teslimat adresi"
            labelHidden
            rows={3}
            placeholder="Firma / kişi, açık adres, ilçe, il, posta kodu"
            autoComplete="street-address"
            error={errors.deliveryAddress?.message}
            {...register("deliveryAddress")}
          />
        </FormCard>

        <FormCard
          title="Fatura adresi"
          description="Teslimat adresiyle aynı"
          action={
            <Switch
              checked={sameAsDelivery}
              onCheckedChange={(checked) =>
                setValue("billingSameAsDelivery", checked, {
                  shouldValidate: true,
                })
              }
              aria-label="Fatura adresi teslimat adresiyle aynı"
            />
          }
        >
          {sameAsDelivery ? null : (
            <div className="border-t border-border/70 pt-4">
              <TextareaField
                id={billingId}
                label="Fatura adresi"
                labelHidden
                rows={3}
                placeholder="Fatura ünvanı, adres, vergi dairesi ve vergi no"
                error={errors.billingAddress?.message}
                {...register("billingAddress")}
              />
            </div>
          )}
        </FormCard>

        <FormCard title="Alıcı notu" description="İsteğe bağlı">
          <TextareaField
            id={noteId}
            label="Alıcı notu"
            labelHidden
            rows={3}
            placeholder="Satıcıya iletmek istedikleriniz (özel talepler, termin vb.)"
            error={errors.note?.message}
            {...register("note")}
          />
        </FormCard>
      </div>

      <aside className="rounded-xl border border-border bg-card p-5.5 max-lg:order-first lg:sticky lg:top-21.5">
        {summary}

        <SubmitButton pending={pending} className="mt-5 h-13 max-lg:hidden">
          Teklifi gönder
        </SubmitButton>

        <p className="mt-4 border-t border-border/70 pt-4 text-[11.5px] leading-relaxed text-placeholder">
          Kesin fiyat ve koşullar satıcının teklifiyle netleşecektir.
        </p>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-45 flex items-center gap-3.5 border-t border-border bg-card px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] lg:hidden">
        <div className="flex-none">
          <p className="text-[11px] font-medium text-placeholder">Ara toplam</p>
          <p className="font-heading text-[17px] font-bold text-foreground">
            {formatPrice(subtotal)}
          </p>
        </div>
        <SubmitButton pending={pending} className="h-13 flex-1">
          Teklifi gönder
        </SubmitButton>
      </div>
    </form>
  );
};
