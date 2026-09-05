import { CircleHelpIcon, ClockIcon } from "lucide-react";
import { cn } from "cn";

import { AddToCartButton } from "@/components/catalog/add-to-cart-button";
import type { Product } from "@/lib/catalog/types";

const priceFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 2,
});

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(31,41,55,0.10)]">
      <div className="relative flex aspect-4/3 items-center justify-center bg-[repeating-linear-gradient(45deg,var(--muted)_0_9px,var(--border)_9px_18px)]">
        <span className="font-mono text-[10px] font-medium tracking-[0.5px] text-placeholder">
          ÜRÜN GÖRSELİ
        </span>
        <span
          className={cn(
            "absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full border px-2.25 py-1 text-[11px] font-semibold",
            product.inStock
              ? "border-primary/30 bg-success-surface text-primary"
              : "border-border bg-muted text-muted-foreground",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "size-1.75 rounded-full",
              product.inStock ? "bg-primary" : "bg-placeholder",
            )}
          />
          {product.inStock ? "Stokta" : "Stokta yok"}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3.75 pt-3.5 pb-4">
        <p className="mb-0.75 text-[11px] font-medium text-placeholder">
          {product.brand}
        </p>
        <h3 className="min-h-9.75 font-heading text-[14.5px] leading-snug font-semibold text-foreground">
          {product.name}
        </h3>

        <div className="mt-2.25 mb-2">
          <span className="inline-block rounded-[7px] bg-muted px-2.25 py-1 text-[11px] font-semibold text-slate-600">
            {product.category}
          </span>
        </div>

        <p className="font-mono text-xs font-medium text-placeholder">
          MPN: {product.mpn}
        </p>

        <span className="mt-2.25 inline-flex items-center gap-1.5 self-start rounded-[7px] border border-border bg-background px-2.25 py-1">
          <ClockIcon aria-hidden className="size-3 text-muted-foreground" />
          <span className="text-[11px] font-semibold text-slate-600">
            {product.lead}
          </span>
        </span>

        <div className="mt-3 flex h-11 flex-col justify-end">
          {product.price === null ? (
            <div className="flex items-center gap-1.75">
              <CircleHelpIcon
                aria-hidden
                className="size-3.75 text-placeholder"
              />
              <span className="text-sm font-medium text-muted-foreground">
                Fiyat için teklif alın
              </span>
            </div>
          ) : (
            <>
              <p className="font-heading text-[21px] font-bold text-foreground">
                {priceFormatter.format(product.price)}
              </p>
              <p className="mt-px text-[10.5px] font-medium text-placeholder">
                Referans fiyat · KDV hariç
              </p>
            </>
          )}
        </div>

        <AddToCartButton productId={product.id} productName={product.name} />
      </div>
    </article>
  );
};
