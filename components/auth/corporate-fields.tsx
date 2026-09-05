"use client";

import { useId } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { TextField } from "@/components/shared/text-field";
import { TextareaField } from "@/components/shared/textarea-field";
import type { RegisterFormValues } from "@/lib/validations/auth";

export const CorporateFields = ({
  register,
  errors,
}: {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
}) => {
  const ids = {
    companyName: useId(),
    phone: useId(),
    taxNumber: useId(),
    taxOffice: useId(),
    website: useId(),
    address: useId(),
  };

  return (
    <div className="flex flex-col gap-4">
      <TextField
        id={ids.companyName}
        label="Firma adı"
        placeholder="Örn. Yılmaz Endüstri A.Ş."
        autoComplete="organization"
        required
        error={errors.companyName?.message}
        {...register("companyName")}
      />

      <div className="grid gap-3.5 sm:grid-cols-2">
        <TextField
          id={ids.phone}
          label="Telefon"
          type="tel"
          placeholder="0 (5xx) xxx xx xx"
          autoComplete="tel"
          required
          error={errors.phone?.message}
          {...register("phone")}
        />
        <TextField
          id={ids.taxNumber}
          label="Vergi no"
          inputMode="numeric"
          placeholder="0000000000"
          className="font-mono"
          error={errors.taxNumber?.message}
          {...register("taxNumber")}
        />
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <TextField
          id={ids.taxOffice}
          label="Vergi dairesi"
          placeholder="Örn. Kadıköy"
          error={errors.taxOffice?.message}
          {...register("taxOffice")}
        />
        <TextField
          id={ids.website}
          label="Web sitesi"
          placeholder="www.firma.com"
          autoComplete="url"
          error={errors.website?.message}
          {...register("website")}
        />
      </div>

      <TextareaField
        id={ids.address}
        label="Adres"
        rows={2}
        placeholder="Fatura ve teslimat adresi"
        autoComplete="street-address"
        error={errors.address?.message}
        {...register("address")}
      />
    </div>
  );
};
