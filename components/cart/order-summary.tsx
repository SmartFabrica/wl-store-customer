import Link from "next/link";

import { InfoCallout } from "@/components/shared/info-callout";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { CATALOG_PATH, QUOTE_NEW_PATH } from "@/lib/routes";
import type { Cart } from "@/lib/cart/types";

export const OrderSummary = ({ cart }: { cart: Cart }) => {
  return (
    <aside className="rounded-xl border border-border bg-card p-5.5 lg:sticky lg:top-21.5">
      <h2 className="mb-4.5 font-heading text-base font-bold text-foreground">
        Sipariş özeti
      </h2>

      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span className="text-[13.5px] font-medium text-muted-foreground">
          Ara toplam
        </span>
        <span className="font-heading text-lg font-bold text-foreground">
          {formatPrice(cart.subtotal)}
        </span>
      </div>

      {cart.quoteOnlyCount > 0 ? (
        <InfoCallout className="mb-3.5 px-3 py-2.5 text-xs">
          {cart.quoteOnlyCount} ürünün fiyatı teklifte belirlenecek.
        </InfoCallout>
      ) : null}

      <dl className="mt-0.5 flex flex-col gap-2.25 border-t border-border/70 pt-3.5">
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

      <Link
        href={QUOTE_NEW_PATH}
        className={buttonVariants({
          className: "mt-5 h-13 w-full text-[15px] font-semibold",
        })}
      >
        Teklif oluştur
      </Link>

      <div className="mt-3.5 text-center">
        <Link
          href={CATALOG_PATH}
          className={buttonVariants({
            variant: "link",
            className: "text-[13px] font-semibold text-accent",
          })}
        >
          Alışverişe devam et
        </Link>
      </div>

      <p className="mt-4 border-t border-border/70 pt-4 text-[11.5px] leading-relaxed text-placeholder">
        Bu bir teklif akışıdır. Kesin fiyat ve koşullar satıcının teklifiyle
        netleşir.
      </p>
    </aside>
  );
};
