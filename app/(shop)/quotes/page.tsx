import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardListIcon } from "lucide-react";

import { QuoteListItem } from "@/components/quotes/quote-list-item";
import { StatusFilterTabs } from "@/components/quotes/status-filter-tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { SiteHeader } from "@/components/shared/site-header";
import { buttonVariants } from "@/components/ui/button";
import { filterQuotes, parseStatusFilter } from "@/lib/quotes/filters";
import { CATALOG_PATH } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Tekliflerim",
};

const QuotesPage = async ({ searchParams }: PageProps<"/quotes">) => {
  const status = parseStatusFilter(await searchParams);
  const quotes = filterQuotes(status);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-250 px-4 pt-7 pb-14 sm:px-7">
        <h1 className="mb-5 font-heading text-2xl font-bold text-foreground">
          Tekliflerim
        </h1>

        <div className="mb-5.5">
          <StatusFilterTabs active={status} />
        </div>

        {quotes.length === 0 ? (
          <EmptyState
            className="my-14"
            icon={<ClipboardListIcon className="size-9" strokeWidth={1.7} />}
            title={status ? "Bu durumda teklif yok" : "Henüz teklifin yok"}
            description={
              status
                ? "Seçtiğin duruma ait teklif bulunmuyor. Diğer sekmelere göz atabilirsin."
                : "Sepetine ürün ekleyip teklif oluşturduğunda buradan takip edebilirsin."
            }
            action={
              <Link
                href={CATALOG_PATH}
                className={buttonVariants({
                  className: "h-12 px-6.5 text-sm font-semibold",
                })}
              >
                Ürünlere göz at
              </Link>
            }
          />
        ) : (
          <ul className="flex flex-col gap-3.5">
            {quotes.map((quote) => (
              <QuoteListItem key={quote.number} quote={quote} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuotesPage;
