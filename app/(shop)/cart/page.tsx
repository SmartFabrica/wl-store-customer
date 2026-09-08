import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

import { CartLineItem } from "@/components/cart/cart-line-item";
import { MobileCheckoutBar } from "@/components/cart/mobile-checkout-bar";
import { OrderSummary } from "@/components/cart/order-summary";
import { EmptyState } from "@/components/shared/empty-state";
import { SiteHeader } from "@/components/shared/site-header";
import { buttonVariants } from "@/components/ui/button";
import { getCart } from "@/lib/cart/cart";
import { CATALOG_PATH } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Sepetim",
};

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-280 px-4 pt-7 pb-24 sm:px-7 lg:pb-14">
        {cart.items.length === 0 ? (
          <EmptyState
            className="my-15"
            icon={<ShoppingCartIcon className="size-9.5" strokeWidth={1.8} />}
            title="Sepetin boş"
            description="Henüz sepete ürün eklemedin. Kataloğa göz atarak ihtiyacın olan parçaları ekleyebilirsin."
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
          <>
            <h1 className="mb-5.5 font-heading text-2xl font-bold text-foreground">
              Sepetim{" "}
              <span className="font-semibold text-placeholder">
                ({cart.itemCount})
              </span>
            </h1>

            <div className="grid items-start gap-5 lg:grid-cols-[1fr_350px] lg:gap-7">
              <ul className="divide-y divide-border/70 rounded-xl border border-border bg-card px-5.5">
                {cart.items.map((item) => (
                  <CartLineItem key={item.product.id} item={item} />
                ))}
              </ul>

              <OrderSummary cart={cart} />
            </div>

            <MobileCheckoutBar subtotal={cart.subtotal} />
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
