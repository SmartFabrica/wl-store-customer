import Link from "next/link";

import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { RemoveLineButton } from "@/components/cart/remove-line-button";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { itemTotal } from "@/lib/cart/cart";
import { formatPrice } from "@/lib/format";
import { productPath } from "@/lib/routes";
import type { CartItem } from "@/lib/cart/types";

export const CartLineItem = ({ item }: { item: CartItem }) => {
  const total = itemTotal(item);

  return (
    <li className="flex flex-wrap items-start gap-4.5 py-5 sm:flex-nowrap">
      <ImagePlaceholder
        label="GÖRSEL"
        className="size-21 flex-none rounded-[10px]"
        labelClassName="text-[8px]"
      />

      <div className="min-w-0 flex-1">
        <Link
          href={productPath(item.product_id)}
          className="font-heading text-[15px] leading-snug font-semibold text-foreground hover:text-primary"
        >
          {item.title}
        </Link>
        <p className="mt-0.75 text-[11px] font-medium text-placeholder">
          {item.brand_name}
        </p>
        <p className="mt-0.5 font-mono text-[11.5px] font-medium text-placeholder">
          MPN: {item.mpn}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <QuantityStepper
            productId={item.product_id}
            quantity={item.quantity}
          />
          <RemoveLineButton itemId={item.id} productName={item.title} />
        </div>
      </div>

      <div className="min-w-30 flex-none text-right">
        {total === null ? (
          <p className="text-[13px] leading-snug font-medium text-muted-foreground">
            Fiyat için
            <br />
            teklif alın
          </p>
        ) : (
          <>
            <p className="font-heading text-[17px] font-bold text-foreground">
              {formatPrice(total)}
            </p>
            <p className="mt-0.75 font-mono text-[11px] font-medium text-placeholder">
              {formatPrice(Number(item.price))} × {item.quantity}
            </p>
          </>
        )}
      </div>
    </li>
  );
};
