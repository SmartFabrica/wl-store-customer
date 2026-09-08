import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { QUOTE_NEW_PATH } from "@/lib/routes";

export const MobileCheckoutBar = ({ subtotal }: { subtotal: number }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-45 flex items-center gap-3.5 border-t border-border bg-card px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] lg:hidden">
      <div className="flex-none">
        <p className="text-[11px] font-medium text-placeholder">Ara toplam</p>
        <p className="font-heading text-[17px] font-bold text-foreground">
          {formatPrice(subtotal)}
        </p>
      </div>
      <Link
        href={QUOTE_NEW_PATH}
        className={buttonVariants({
          className: "h-13 flex-1 text-[15px] font-semibold",
        })}
      >
        Teklif oluştur
      </Link>
    </div>
  );
};
