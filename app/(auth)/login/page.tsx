import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { AuthHeading } from "@/components/shared/auth-heading";

export const metadata: Metadata = {
  title: "Giriş yap",
};

const LoginPage = () => {
  return (
    <>
      <AuthHeading
        title="Giriş yap"
        description="Hesabınıza erişmek için bilgilerinizi girin."
      />

      <LoginForm />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Hesabın yok mu?{" "}
        <Link
          href="/register"
          className="font-semibold text-accent underline-offset-4 hover:underline"
        >
          Başvuru oluştur
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
