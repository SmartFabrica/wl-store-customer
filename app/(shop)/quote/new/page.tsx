import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { QuoteForm } from "@/components/quote/quote-form";
import { QuoteSummary } from "@/components/quote/quote-summary";
import { SiteHeader } from "@/components/shared/site-header";
import { getSessionUser } from "@/lib/auth/session";
import { profileAddress } from "@/lib/auth/types";
import { getCart } from "@/lib/cart/cart";
import { CART_PATH } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Teklif oluştur",
};

const NewQuotePage = async () => {
  const cart = await getCart();
  if (cart.items.length === 0) redirect(CART_PATH);

  const user = await getSessionUser();
  const address = user ? profileAddress(user) : "";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-280 px-4 pt-7 pb-24 sm:px-7 lg:pb-14">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Teklif oluştur
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Bilgileri gönder, satıcı teklifini hazırlasın.
          </p>
        </div>

        <QuoteForm
          summary={<QuoteSummary cart={cart} />}
          subtotal={cart.subtotal}
          address={address}
        />
      </div>
    </div>
  );
};

export default NewQuotePage;
