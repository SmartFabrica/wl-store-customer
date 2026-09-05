import type { ReactNode } from "react";
import { InfoIcon } from "lucide-react";
import { cn } from "cn";

export const InfoCallout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-lg bg-warning px-3.5 py-3 text-warning-foreground",
        className,
      )}
    >
      <InfoIcon aria-hidden className="mt-0.5 size-4 flex-none text-accent" />
      <p className="text-[13px] leading-relaxed font-medium">{children}</p>
    </div>
  );
};
