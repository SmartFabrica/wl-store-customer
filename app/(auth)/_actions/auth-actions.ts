"use server";

import { redirect } from "next/navigation";

import { toUserMessage } from "@/lib/api/errors";
import { loginRequest } from "@/lib/auth/login";
import { registerAccount } from "@/lib/auth/register";
import { createSession } from "@/lib/auth/session";
import { CATALOG_PATH } from "@/lib/routes";
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

  try {
    const { token, user } = await loginRequest(parsed.data);
    await createSession(token, user);
  } catch (error) {
    return { formError: toUserMessage(error) };
  }

  redirect(CATALOG_PATH);
};

export const register = async (
  values: RegisterInput,
): Promise<AuthActionState> => {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error.issues) };
  }

  try {
    await registerAccount(parsed.data);
  } catch (error) {
    return { formError: toUserMessage(error) };
  }

  redirect("/register/submitted");
};
