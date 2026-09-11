import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

import { QuoteItemsList } from "@/components/quotes/quote-items-list";
import { QuoteStatusBadge } from "@/components/quotes/quote-status-badge";
import { QuoteTotals } from "@/components/quotes/quote-totals";
import { LabeledPanel } from "@/components/shared/labeled-panel";
import { SiteHeader } from "@/components/shared/site-header";
import { getQuoteByNumber } from "@/lib/quotes/data";
import { formatDate } from "@/lib/format";
import { QUOTES_PATH } from "@/lib/routes";

export const generateMetadata = async ({
  params,
}: PageProps<"/quotes/[quoteNumber]">): Promise<Metadata> => {
  const { quoteNumber } = await params;
  return { title: decodeURIComponent(quoteNumber) };
};

const QuoteDetailPage = async ({
  params,
}: PageProps<"/quotes/[quoteNumber]">) => {
  const { quoteNumber } = await params;
  const quote = getQuoteByNumber(decodeURIComponent(quoteNumber));
  if (!quote) notFound();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-270 px-4 pt-6 pb-14 sm:px-7">
        <Link
          href={QUOTES_PATH}
          className="mb-4.5 inline-flex items-center gap-1.75 rounded-md py-1.5 pr-1.5 text-[13px] font-semibold text-muted-foreground hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          <ChevronLeftIcon aria-hidden className="size-4" />
          Tekliflerim
        </Link>

        <div className="grid items-start gap-5 lg:grid-cols-[1fr_340px] lg:gap-7">
          <div>
            <div className="mb-5.5 flex flex-wrap items-start gap-3.5">
              <div className="min-w-50 flex-1">
                <p className="font-mono text-[22px] font-bold tracking-[0.4px] text-foreground">
                  {quote.number}
                </p>
                <p className="mt-1.25 text-[13px] font-medium text-placeholder">
                  {formatDate(quote.createdAt)} · {quote.items.length} ürün
                </p>
              </div>
              <QuoteStatusBadge status={quote.status} size="lg" />
            </div>

            <QuoteItemsList items={quote.items} />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <LabeledPanel label="Teslimat adresi">
                <p className="text-[13px] leading-relaxed whitespace-pre-line text-slate-600">
                  {quote.deliveryAddress}
                </p>
              </LabeledPanel>

              <LabeledPanel label="Fatura adresi">
                <p className="text-[13px] leading-relaxed whitespace-pre-line text-slate-600">
                  {quote.billingAddress ?? "Teslimat adresiyle aynı"}
                </p>
                {quote.taxInfo ? (
                  <p className="mt-1 font-mono text-xs font-medium text-placeholder">
                    {quote.taxInfo}
                  </p>
                ) : null}
              </LabeledPanel>
            </div>

            {quote.note ? (
              <LabeledPanel label="Alıcı notu" className="mt-4">
                <p className="text-[13.5px] leading-relaxed text-slate-600">
                  {quote.note}
                </p>
              </LabeledPanel>
            ) : null}
          </div>

          <QuoteTotals quote={quote} />
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailPage;
