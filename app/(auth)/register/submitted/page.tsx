import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Başvurun alındı",
};

const RegisterSubmittedPage = () => {
  return (
    <div className="pt-6 text-center">
      <div className="mx-auto mb-6 flex size-19 items-center justify-center rounded-full bg-success-surface">
        <CheckIcon
          aria-hidden
          className="size-8.5 text-primary"
          strokeWidth={2.6}
        />
      </div>

      <h1 className="font-heading text-[28px] leading-tight font-bold text-foreground">
        Başvurun alındı
      </h1>
      <p className="mx-auto mt-3 max-w-85 text-[15px] leading-relaxed text-muted-foreground">
        Ekibimiz başvurunu inceliyor, onaylandığında e-posta ile haber
        vereceğiz.
      </p>

      <StatusBadge className="mt-5.5">Durum: Onay bekliyor</StatusBadge>

      <div className="mt-8">
        <Link
          href="/login"
          className={buttonVariants({
            className: "h-11.5 px-7.5 text-[15px] font-semibold",
          })}
        >
          Girişe dön
        </Link>
      </div>
    </div>
  );
};

export default RegisterSubmittedPage;
