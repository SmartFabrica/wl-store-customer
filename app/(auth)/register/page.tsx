import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";
import { AuthHeading } from "@/components/shared/auth-heading";

export const metadata: Metadata = {
  title: "Başvuru oluştur",
};

const RegisterPage = () => {
  return (
    <>
      <AuthHeading
        title="Başvuru oluştur"
        description="Hesap türünüzü seçin ve bilgilerinizi girin."
        className="mb-5"
      />

      <RegisterForm />

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Zaten hesabın var mı?{" "}
        <Link
          href="/login"
          className="font-semibold text-accent underline-offset-4 hover:underline"
        >
          Giriş yap
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
