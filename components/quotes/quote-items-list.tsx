import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { formatPrice } from "@/lib/format";
import type { QuoteItem } from "@/lib/quotes/types";

export const QuoteItemsList = ({ items }: { items: QuoteItem[] }) => {
  return (
    <ul className="divide-y divide-border/70 rounded-xl border border-border bg-card px-5.5">
      {items.map((item) => (
        <li key={item.mpn} className="flex items-start gap-3.5 py-4">
          <ImagePlaceholder
            label="GÖRSEL"
            className="size-15 flex-none rounded-[10px]"
            labelClassName="text-[8px]"
          />

          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm leading-snug font-semibold text-foreground">
              {item.name}
            </p>
            <p className="mt-0.75 font-mono text-[11.5px] font-medium text-placeholder">
              MPN: {item.mpn}
            </p>
            <p className="mt-0.75 text-xs font-medium text-muted-foreground">
              Adet: {item.quantity}
            </p>
          </div>

          <div className="min-w-28 flex-none text-right">
            {item.unitPrice === null ? (
              <span className="text-xs font-medium text-placeholder">
                bekleniyor
              </span>
            ) : (
              <>
                <p className="font-heading text-[15px] font-bold text-foreground">
                  {formatPrice(item.unitPrice * item.quantity)}
                </p>
                <p className="mt-0.5 font-mono text-[11px] font-medium text-placeholder">
                  {formatPrice(item.unitPrice)} × {item.quantity}
                </p>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
