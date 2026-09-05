import { CircleHelpIcon } from "lucide-react";
import { cn } from "cn";

import { formatPrice } from "@/lib/format";

const SIZES = {
  sm: { price: "text-[17px]", fallback: "text-[13px]", icon: "size-3.5" },
  md: { price: "text-[21px]", fallback: "text-sm", icon: "size-3.75" },
  lg: { price: "text-[30px]", fallback: "text-[17px]", icon: "size-4.5" },
} as const;

export const PriceDisplay = ({
  price,
  size = "md",
  showNote = true,
  className,
}: {
  price: number | null;
  size?: keyof typeof SIZES;
  showNote?: boolean;
  className?: string;
}) => {
  const scale = SIZES[size];

  if (price === null) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <CircleHelpIcon
          aria-hidden
          className={cn(scale.icon, "text-placeholder")}
        />
        <span
          className={cn(scale.fallback, "font-medium text-muted-foreground")}
        >
          Fiyat için teklif alın
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className={cn(scale.price, "font-heading font-bold text-foreground")}>
        {formatPrice(price)}
      </p>
      {showNote ? (
        <p className="mt-px text-[10.5px] font-medium text-placeholder">
          Referans fiyat · KDV hariç
        </p>
      ) : null}
    </div>
  );
};
