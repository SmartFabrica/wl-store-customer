import Link from "next/link";
import { cn } from "cn";

import { QuoteStatusBadge } from "@/components/quotes/quote-status-badge";
import { buttonVariants } from "@/components/ui/button";
import { isFullyPriced, quoteAmount } from "@/lib/quotes/filters";
import { formatDate, formatPrice } from "@/lib/format";
import { quoteDetailPath } from "@/lib/routes";
import type { Quote } from "@/lib/quotes/types";

export const QuoteListItem = ({ quote }: { quote: Quote }) => {
  const amount = quoteAmount(quote);
  const highlighted = quote.status === "quoted";

  return (
    <li
      className={cn(
        "relative rounded-xl border bg-card px-5.5 py-4.5",
        highlighted
          ? "border-primary/30 pl-6.5 shadow-[0_4px_16px_rgba(46,125,50,0.10)]"
          : "border-border",
      )}
    >
      {highlighted ? (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-primary"
        />
      ) : null}

      <div className="flex flex-wrap items-start gap-4.5">
        <div className="min-w-45 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[15px] font-semibold tracking-[0.3px] text-foreground">
              {quote.number}
            </span>
            <QuoteStatusBadge status={quote.status} />
          </div>
          <div className="flex flex-wrap items-center gap-3.5 text-[12.5px] font-medium text-placeholder">
            <span>{formatDate(quote.createdAt)}</span>
            <span aria-hidden className="size-0.75 rounded-full bg-border" />
            <span>{quote.items.length} ürün</span>
          </div>
        </div>

        <div className="flex-none text-right">
          {amount === null ? (
            <p className="text-[13px] font-medium text-muted-foreground">
              Fiyat teklifte
            </p>
          ) : (
            <>
              <p className="font-heading text-lg font-bold text-foreground">
                {formatPrice(amount)}
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-placeholder">
                {isFullyPriced(quote) ? "Teklif tutarı" : "Kısmi · KDV hariç"}
              </p>
            </>
          )}
        </div>

        <div className="flex-none self-center">
          <Link
            href={quoteDetailPath(quote.number)}
            className={buttonVariants({
              variant: "outline",
              className: "h-9.5 bg-card px-4 text-[13px] font-semibold",
            })}
          >
            Detayı gör
          </Link>
        </div>
      </div>
    </li>
  );
};
