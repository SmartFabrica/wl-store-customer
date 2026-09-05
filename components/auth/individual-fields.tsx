"use client";

import { useId } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { TextField } from "@/components/shared/text-field";
import type { RegisterFormValues } from "@/lib/validations/auth";

export const IndividualFields = ({
  register,
  errors,
}: {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
}) => {
  const ids = {
    firstName: useId(),
    lastName: useId(),
    phone: useId(),
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <TextField
          id={ids.firstName}
          label="Ad"
          placeholder="Adınız"
          autoComplete="given-name"
          required
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <TextField
          id={ids.lastName}
          label="Soyad"
          placeholder="Soyadınız"
          autoComplete="family-name"
          required
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <TextField
        id={ids.phone}
        label="Telefon"
        type="tel"
        placeholder="0 (5xx) xxx xx xx"
        autoComplete="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />
    </div>
  );
};
