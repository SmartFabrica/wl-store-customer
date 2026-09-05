import type { ReactNode } from "react";
import { cn } from "cn";

export const StatusBadge = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-warning-border bg-warning px-4 py-2 text-[13px] font-semibold text-warning-foreground",
        className,
      )}
    >
      <span aria-hidden className="size-2 rounded-full bg-accent" />
      {children}
    </span>
  );
};
