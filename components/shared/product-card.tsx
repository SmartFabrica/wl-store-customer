import Link from "next/link";
import { ClockIcon } from "lucide-react";
import { cn } from "cn";

import { AddToCartButton } from "@/components/shared/add-to-cart-button";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PriceDisplay } from "@/components/shared/price-display";
import { StockBadge } from "@/components/shared/stock-badge";
import { productPath } from "@/lib/routes";
import type { Product } from "@/lib/catalog/types";

export const ProductCard = ({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: "grid" | "compact";
}) => {
  const compact = variant === "compact";
  const href = productPath(product.id);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.75 hover:shadow-[0_8px_24px_rgba(31,41,55,0.10)]",
        compact && "w-59 flex-none snap-start",
      )}
    >
      <Link href={href} className="block focus-visible:outline-none">
        <ImagePlaceholder label="ÜRÜN GÖRSELİ" className="aspect-4/3">
          {compact ? null : (
            <StockBadge
              inStock={product.inStock}
              className="absolute top-2.5 left-2.5 rounded-full text-[11px]"
            />
          )}
        </ImagePlaceholder>
      </Link>

      <div
        className={cn(
          "flex flex-1 flex-col",
          compact ? "px-3.5 pt-3.25 pb-3.75" : "px-3.75 pt-3.5 pb-4",
        )}
      >
        <p className="mb-0.75 text-[11px] font-medium text-placeholder">
          {product.brand}
        </p>

        <h3
          className={cn(
            "font-heading leading-snug font-semibold text-foreground",
            compact ? "min-h-9.5 text-sm" : "min-h-9.75 text-[14.5px]",
          )}
        >
          <Link
            href={href}
            className="rounded-sm outline-offset-2 group-hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
          >
            {product.name}
          </Link>
        </h3>

        {compact ? null : (
          <div className="mt-2.25 mb-2">
            <span className="inline-block rounded-[7px] bg-muted px-2.25 py-1 text-[11px] font-semibold text-slate-600">
              {product.category}
            </span>
          </div>
        )}

        <p
          className={cn(
            "font-mono font-medium text-placeholder",
            compact ? "mt-1.5 text-[11.5px]" : "text-xs",
          )}
        >
          MPN: {product.mpn}
        </p>

        {compact ? null : (
          <span className="mt-2.25 inline-flex items-center gap-1.5 self-start rounded-[7px] border border-border bg-background px-2.25 py-1">
            <ClockIcon aria-hidden className="size-3 text-muted-foreground" />
            <span className="text-[11px] font-semibold text-slate-600">
              {product.lead}
            </span>
          </span>
        )}

        <div
          className={cn(
            "flex flex-col justify-end",
            compact ? "mt-2.5 h-7.5" : "mt-3 h-11",
          )}
        >
          <PriceDisplay
            price={product.price}
            size={compact ? "sm" : "md"}
            showNote={!compact}
          />
        </div>

        <AddToCartButton
          productId={product.id}
          productName={product.name}
          className={cn(
            compact ? "mt-3 h-9 text-[12.5px]" : "mt-3.5 h-10 text-[13.5px]",
          )}
        />
      </div>
    </article>
  );
};
