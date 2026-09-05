"use client";

import { useId, useTransition } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { register as submitApplication } from "@/app/(auth)/_actions/auth-actions";
import { AccountTypeTabs } from "@/components/auth/account-type-tabs";
import { CorporateFields } from "@/components/auth/corporate-fields";
import { IndividualFields } from "@/components/auth/individual-fields";
import { FormErrorAlert } from "@/components/shared/form-error-alert";
import { InfoCallout } from "@/components/shared/info-callout";
import { PasswordField } from "@/components/shared/password-field";
import { SubmitButton } from "@/components/shared/submit-button";
import { TextField } from "@/components/shared/text-field";
import {
  REGISTER_FORM_DEFAULTS,
  registerSchema,
  type RegisterFormValues,
  type RegisterInput,
} from "@/lib/validations/auth";

const resolver = zodResolver(
  registerSchema,
) as unknown as Resolver<RegisterFormValues>;

export const RegisterForm = () => {
  const [pending, startTransition] = useTransition();
  const emailId = useId();
  const passwordId = useId();
  const passwordConfirmId = useId();

  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver,
    defaultValues: REGISTER_FORM_DEFAULTS,
  });

  const accountType = useWatch({ control, name: "accountType" });

  const onSubmit = (values: RegisterFormValues) => {
    startTransition(async () => {
      const result = await submitApplication(values as RegisterInput);

      for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
        setError(field as keyof RegisterFormValues, { message });
      }
      if (result.formError) {
        setError("root", { message: result.formError });
      }
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <AccountTypeTabs
        value={accountType}
        onValueChange={(next) =>
          setValue("accountType", next, { shouldValidate: false })
        }
      />

      <FormErrorAlert message={errors.root?.message} />

      <TextField
        id={emailId}
        label="E-posta"
        type="email"
        autoComplete="email"
        placeholder="ornek@firma.com"
        required
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="grid gap-3.5 sm:grid-cols-2">
        <PasswordField
          id={passwordId}
          label="Şifre"
          autoComplete="new-password"
          placeholder="••••••••"
          required
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordField
          id={passwordConfirmId}
          label="Şifre tekrar"
          autoComplete="new-password"
          placeholder="••••••••"
          required
          error={errors.passwordConfirm?.message}
          {...register("passwordConfirm")}
        />
      </div>

      {accountType === "corporate" ? (
        <CorporateFields register={register} errors={errors} />
      ) : (
        <IndividualFields register={register} errors={errors} />
      )}

      <InfoCallout>
        Başvurun onaylandıktan sonra giriş yapabilirsin.
      </InfoCallout>

      <SubmitButton pending={pending}>Başvuru oluştur</SubmitButton>
    </form>
  );
};
