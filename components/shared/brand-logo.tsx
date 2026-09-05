import { cn } from "cn";

import { BRAND_NAME } from "@/lib/brand";

export const BrandLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden
        className="flex size-9.5 items-center justify-center rounded-[10px] bg-white/15 font-heading text-[17px] font-extrabold"
      >
        {BRAND_NAME.charAt(0)}
      </span>
      <span className="font-heading text-[17px] font-bold tracking-[0.2px]">
        {BRAND_NAME}
      </span>
    </div>
  );
};
