import { cn } from "cn";

import { QUOTE_STATUS_META } from "@/lib/quotes/data";
import type { QuoteStatus } from "@/lib/quotes/types";

const TONE_CLASSES = {
  warning: "border-warning-border bg-warning text-warning-foreground",
  success: "border-primary/30 bg-success-surface text-primary",
} as const;

export const QuoteStatusBadge = ({
  status,
  size = "sm",
  className,
}: {
  status: QuoteStatus;
  size?: "sm" | "lg";
  className?: string;
}) => {
  const meta = QUOTE_STATUS_META[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-semibold",
        TONE_CLASSES[meta.tone],
        size === "lg"
          ? "px-3.5 py-1.75 text-[13px]"
          : "px-2.5 py-1 text-[11.5px]",
        className,
      )}
    >
      {meta.label}
    </span>
  );
};
