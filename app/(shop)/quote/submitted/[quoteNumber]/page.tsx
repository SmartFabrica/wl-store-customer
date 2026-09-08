import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { SiteHeader } from "@/components/shared/site-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { CATALOG_PATH, QUOTES_PATH } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Teklifin oluşturuldu",
};

const QuoteSubmittedPage = async ({
  params,
}: PageProps<"/quote/submitted/[quoteNumber]">) => {
  const { quoteNumber } = await params;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-115 px-6 py-17 text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-success-surface">
          <CheckIcon
            aria-hidden
            className="size-9 text-primary"
            strokeWidth={2.6}
          />
        </div>

        <h1 className="font-heading text-[26px] leading-tight font-bold text-foreground">
          Teklifin oluşturuldu
        </h1>
        <p className="mx-auto mt-3 max-w-95 text-[15px] leading-relaxed text-muted-foreground">
          Satıcı teklifini inceleyip sana dönecek. Durumunu tekliflerim
          sayfasından takip edebilirsin.
        </p>

        <div className="mt-6 mb-7 inline-flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-7 py-5">
          <div>
            <p className="mb-1.25 text-[11px] font-medium tracking-[0.5px] text-placeholder uppercase">
              Teklif no
            </p>
            <p className="font-mono text-lg font-semibold tracking-[0.5px] text-foreground">
              {decodeURIComponent(quoteNumber)}
            </p>
          </div>
          <StatusBadge>Durum: İnceleniyor</StatusBadge>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={QUOTES_PATH}
            className={buttonVariants({
              className: "h-11.5 px-6 text-sm font-semibold",
            })}
          >
            Tekliflerime git
          </Link>
          <Link
            href={CATALOG_PATH}
            className={buttonVariants({
              variant: "outline",
              className: "h-11.5 bg-card px-6 text-sm font-semibold",
            })}
          >
            Alışverişe devam et
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuoteSubmittedPage;
