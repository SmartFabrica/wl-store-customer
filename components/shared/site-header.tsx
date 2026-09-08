import Link from "next/link";
import { SearchIcon, ShoppingCartIcon, UserRoundIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FILTER_PARAM } from "@/lib/catalog/filters";
import { getCart } from "@/lib/cart/cart";
import { BRAND_NAME } from "@/lib/brand";
import { CART_PATH, CATALOG_PATH } from "@/lib/routes";

export const SiteHeader = async ({ query = "" }: { query?: string }) => {
  const { itemCount } = await getCart();

  return (
    <header className="sticky top-0 z-40 flex h-16.5 items-center gap-6 border-b border-border bg-card px-5 sm:px-7">
      <Link href={CATALOG_PATH} className="flex flex-none items-center gap-2.5">
        <span
          aria-hidden
          className="flex size-8.5 items-center justify-center rounded-[9px] bg-primary font-heading text-[15px] font-extrabold text-primary-foreground"
        >
          {BRAND_NAME.charAt(0)}
        </span>
        <span className="font-heading text-[17px] font-bold tracking-[0.2px] text-foreground">
          {BRAND_NAME}
        </span>
      </Link>

      <form
        action={CATALOG_PATH}
        className="relative hidden max-w-155 flex-1 md:block"
      >
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3.5 size-4.25 -translate-y-1/2 text-placeholder"
        />
        <Input
          type="search"
          name={FILTER_PARAM.q}
          defaultValue={query}
          placeholder="Parça no, ürün adı veya marka ara"
          aria-label="Ürün ara"
          className="h-10.5 rounded-lg bg-background pr-3.5 pl-10 text-sm placeholder:text-placeholder focus-visible:bg-card"
        />
      </form>

      <div className="flex flex-1 items-center justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="Hesap"
          className="size-10 rounded-lg bg-card"
        >
          <UserRoundIcon className="size-4.75 text-slate-600" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          aria-label={`Sepet, ${itemCount} ürün`}
          render={<Link href={CART_PATH} />}
          className="relative size-10 rounded-lg bg-card"
        >
          <ShoppingCartIcon className="size-4.75 text-slate-600" />
          {itemCount > 0 ? (
            <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full border-2 border-card bg-accent px-1 text-[10px] font-bold text-accent-foreground">
              {itemCount}
            </span>
          ) : null}
        </Button>
      </div>
    </header>
  );
};
