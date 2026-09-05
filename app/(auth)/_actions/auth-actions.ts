"use server";

import { redirect } from "next/navigation";

import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/validations/auth";

export type AuthActionState = {
  formError?: string;
  fieldErrors?: Record<string, string>;
};

const toFieldErrors = (issues: { path: PropertyKey[]; message: string }[]) => {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const field = issue.path.join(".");
    if (field && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return fieldErrors;
};

export const login = async (values: LoginInput): Promise<AuthActionState> => {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error.issues) };
  }

  // TODO: Gerçek kimlik doğrulama API'sine bağlanacak; başarılı yanıtta
  // oturum çerezi yazılıp kullanıcı ana sayfaya yönlendirilecek.
  return {
    formError:
      "Giriş servisi henüz bağlanmadı. Lütfen daha sonra tekrar deneyin.",
  };
};

export const register = async (
  values: RegisterInput,
): Promise<AuthActionState> => {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error.issues) };
  }

  // TODO: Başvuruyu API'ye gönder. Şimdilik doğrulama geçtiğinde
  // başvuru alındı ekranına yönlendiriyoruz.
  redirect("/register/submitted");
};
