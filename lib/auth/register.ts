import "server-only";

import { apiFetch } from "@/lib/api/client";
import type { RegisterInput } from "@/lib/validations/auth";

type RegisterPayload = {
  role: string;
  email: string;
  password: string;
  phone?: string;
  company_name?: string;
  address?: string;
  tax_number?: string;
  tax_office?: string;
  first_name?: string;
  last_name?: string;
};

const toPayload = (values: RegisterInput): RegisterPayload => {
  const base = {
    role: values.accountType,
    email: values.email,
    password: values.password,
    phone: values.phone,
  };

  if (values.accountType === "corporate") {
    return {
      ...base,
      company_name: values.companyName,
      address: values.address,
      tax_number: values.taxNumber,
      tax_office: values.taxOffice,
    };
  }

  return {
    ...base,
    first_name: values.firstName,
    last_name: values.lastName,
  };
};

export const registerAccount = (values: RegisterInput) =>
  apiFetch<void>({
    path: "/api/auth/register",
    method: "POST",
    body: toPayload(values),
  });
