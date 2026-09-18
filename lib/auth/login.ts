import "server-only";

import { apiFetch } from "@/lib/api/client";
import type { UserAggregate } from "@/lib/auth/types";
import type { LoginInput } from "@/lib/validations/auth";

export type LoginResult = {
  token: string;
  user: UserAggregate;
};

export const loginRequest = (values: LoginInput) =>
  apiFetch<LoginResult>({
    path: "/api/auth/login",
    method: "POST",
    body: {
      email: values.email,
      password: values.password,
    },
  });
