"use client";

import { useId, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@/app/(auth)/_actions/auth-actions";
import { FormErrorAlert } from "@/components/shared/form-error-alert";
import { PasswordField } from "@/components/shared/password-field";
import { SubmitButton } from "@/components/shared/submit-button";
import { TextField } from "@/components/shared/text-field";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export const LoginForm = () => {
  const [pending, startTransition] = useTransition();
  const emailId = useId();
  const passwordId = useId();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = (values: LoginInput) => {
    startTransition(async () => {
      const result = await login(values);

      for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
        setError(field as keyof LoginInput, { message });
      }
      if (result.formError) {
        setError("root", { message: result.formError });
      }
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

      <PasswordField
        id={passwordId}
        label="Şifre"
        autoComplete="current-password"
        placeholder="••••••••"
        required
        error={errors.password?.message}
        {...register("password")}
      />

      <SubmitButton pending={pending} className="mt-1.5">
        Giriş yap
      </SubmitButton>
    </form>
  );
};
