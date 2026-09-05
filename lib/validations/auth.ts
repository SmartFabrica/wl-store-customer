import { z } from "zod";

export const ACCOUNT_TYPES = ["corporate", "individual"] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];

const email = z
  .string()
  .trim()
  .min(1, "E-posta zorunlu")
  .pipe(z.email("Geçerli bir e-posta girin"));

const password = z.string().min(8, "Şifre en az 8 karakter olmalı");

const phoneRegex = /^[0-9\s()+-]{10,20}$/;

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Şifre zorunlu"),
});

export type LoginInput = z.infer<typeof loginSchema>;

const credentialsFields = {
  email,
  password,
  passwordConfirm: z.string().min(1, "Şifre tekrarı zorunlu"),
};

const corporateSchema = z.object({
  ...credentialsFields,
  accountType: z.literal("corporate"),
  companyName: z.string().trim().min(2, "Firma adı zorunlu"),
  phone: z
    .string()
    .trim()
    .min(1, "Telefon zorunlu")
    .regex(phoneRegex, "Geçerli bir telefon girin"),
  taxNumber: z
    .string()
    .trim()
    .regex(/^\d{10,11}$/, "Vergi no 10 haneli olmalı")
    .optional()
    .or(z.literal("")),
  taxOffice: z.string().trim().optional(),
  website: z.string().trim().optional(),
  address: z.string().trim().optional(),
});

const individualSchema = z.object({
  ...credentialsFields,
  accountType: z.literal("individual"),
  firstName: z.string().trim().min(2, "Ad zorunlu"),
  lastName: z.string().trim().min(2, "Soyad zorunlu"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Geçerli bir telefon girin")
    .optional()
    .or(z.literal("")),
});

export const registerSchema = z
  .discriminatedUnion("accountType", [corporateSchema, individualSchema])
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor",
    path: ["passwordConfirm"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type CorporateInput = z.infer<typeof corporateSchema>;
export type IndividualInput = z.infer<typeof individualSchema>;

export type RegisterFormValues = {
  accountType: AccountType;
  email: string;
  password: string;
  passwordConfirm: string;
  companyName: string;
  phone: string;
  taxNumber: string;
  taxOffice: string;
  website: string;
  address: string;
  firstName: string;
  lastName: string;
};

export const REGISTER_FORM_DEFAULTS: RegisterFormValues = {
  accountType: "corporate",
  email: "",
  password: "",
  passwordConfirm: "",
  companyName: "",
  phone: "",
  taxNumber: "",
  taxOffice: "",
  website: "",
  address: "",
  firstName: "",
  lastName: "",
};
