import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { InfoCallout } from "@/components/shared/info-callout";
import { formatPrice } from "@/lib/format";
import type { Cart } from "@/lib/cart/types";

export const QuoteSummary = ({ cart }: { cart: Cart }) => {
  return (
    <>
      <h2 className="mb-4 font-heading text-base font-bold text-foreground">
        Teklif özeti
      </h2>

      <ul className="-mx-1 mb-1 max-h-74.5 divide-y divide-border/70 overflow-auto px-1">
        {cart.items.map((item) => (
          <li key={item.product.id} className="flex items-start gap-3 py-3.5">
            <ImagePlaceholder
              label="GÖR"
              className="size-12 flex-none rounded-[9px]"
              labelClassName="text-[7px]"
            />

            <div className="min-w-0 flex-1">
              <p className="font-heading text-[13px] leading-snug font-semibold text-foreground">
                {item.product.name}
              </p>
              <p className="mt-0.5 font-mono text-[11px] font-medium text-placeholder">
                MPN: {item.product.mpn}
              </p>
              <p className="mt-0.75 text-[11px] font-medium text-muted-foreground">
                Adet: {item.quantity}
              </p>
            </div>

            <div className="flex-none text-right">
              {item.lineTotal === null ? (
                <span className="text-[11.5px] font-medium text-placeholder">
                  teklife bağlı
                </span>
              ) : (
                <span className="font-heading text-[13.5px] font-bold text-foreground">
                  {formatPrice(item.lineTotal)}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex items-baseline justify-between gap-3 border-t border-border/70 pt-3.5">
        <span className="text-[13.5px] font-medium text-muted-foreground">
          Ara toplam
        </span>
        <span className="font-heading text-lg font-bold text-foreground">
          {formatPrice(cart.subtotal)}
        </span>
      </div>

      {cart.quoteOnlyCount > 0 ? (
        <InfoCallout className="mt-3 px-3 py-2.5 text-xs">
          {cart.quoteOnlyCount} ürünün fiyatı teklifte belirlenecek.
        </InfoCallout>
      ) : null}

      <dl className="mt-3.5 flex flex-col gap-2.25 border-t border-border/70 pt-3.5">
        <div className="flex justify-between gap-3">
          <dt className="text-[13px] font-medium text-muted-foreground">
            Toplam ürün
          </dt>
          <dd className="font-mono text-[13px] font-semibold text-foreground">
            {cart.itemCount}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-[13px] font-medium text-muted-foreground">
            Toplam adet
          </dt>
          <dd className="font-mono text-[13px] font-semibold text-foreground">
            {cart.totalQuantity}
          </dd>
        </div>
      </dl>
    </>
  );
};
