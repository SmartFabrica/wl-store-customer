import Link from "next/link";

import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { RemoveLineButton } from "@/components/cart/remove-line-button";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { formatPrice } from "@/lib/format";
import { productPath } from "@/lib/routes";
import type { CartItem } from "@/lib/cart/types";

export const CartLineItem = ({ item }: { item: CartItem }) => {
  const { product, quantity, lineTotal } = item;

  return (
    <li className="flex flex-wrap items-start gap-4.5 py-5 sm:flex-nowrap">
      <ImagePlaceholder
        label="GÖRSEL"
        className="size-21 flex-none rounded-[10px]"
        labelClassName="text-[8px]"
      />

      <div className="min-w-0 flex-1">
        <Link
          href={productPath(product.id)}
          className="font-heading text-[15px] leading-snug font-semibold text-foreground hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="mt-0.75 text-[11px] font-medium text-placeholder">
          {product.brand}
        </p>
        <p className="mt-0.5 font-mono text-[11.5px] font-medium text-placeholder">
          MPN: {product.mpn}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <QuantityStepper productId={product.id} quantity={quantity} />
          <RemoveLineButton productId={product.id} productName={product.name} />
        </div>
      </div>

      <div className="min-w-30 flex-none text-right">
        {lineTotal === null ? (
          <p className="text-[13px] leading-snug font-medium text-muted-foreground">
            Fiyat için
            <br />
            teklif alın
          </p>
        ) : (
          <>
            <p className="font-heading text-[17px] font-bold text-foreground">
              {formatPrice(lineTotal)}
            </p>
            <p className="mt-0.75 font-mono text-[11px] font-medium text-placeholder">
              {formatPrice(product.price ?? 0)} × {quantity}
            </p>
          </>
        )}
      </div>
    </li>
  );
};
