import { InfoCallout } from "@/components/shared/info-callout";
import { QUOTE_STATUS_META } from "@/lib/quotes/data";
import { isFullyPriced, quoteAmount } from "@/lib/quotes/filters";
import { formatPrice } from "@/lib/format";
import type { Quote } from "@/lib/quotes/types";

export const QuoteTotals = ({ quote }: { quote: Quote }) => {
  const amount = quoteAmount(quote);
  const totalsReady = amount !== null && isFullyPriced(quote);

  return (
    <aside className="rounded-xl border border-border bg-card p-5.5 lg:sticky lg:top-21.5">
      <h2 className="mb-4 font-heading text-base font-bold text-foreground">
        Özet
      </h2>

      {totalsReady ? (
        <dl className="flex flex-col gap-2.75">
          <div className="flex justify-between gap-3">
            <dt className="text-[13px] font-medium text-muted-foreground">
              Ara toplam
            </dt>
            <dd className="font-mono text-sm font-semibold text-foreground">
              {formatPrice(amount)}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-border/70 pt-2.75">
            <dt className="text-sm font-semibold text-foreground">Toplam</dt>
            <dd className="font-heading text-[19px] font-bold text-foreground">
              {formatPrice(amount)}
            </dd>
          </div>
        </dl>
      ) : (
        <InfoCallout className="px-3.5 py-3 text-[12.5px]">
          Tutar, satıcı teklifini tamamladığında görünecek.
        </InfoCallout>
      )}

      <p className="mt-4.5 border-t border-border/70 pt-4 text-[12.5px] leading-relaxed text-placeholder">
        {QUOTE_STATUS_META[quote.status].note}
      </p>
    </aside>
  );
};
