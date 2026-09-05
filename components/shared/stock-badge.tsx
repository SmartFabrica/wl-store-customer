import { cn } from "cn";

export const StockBadge = ({
  inStock,
  className,
}: {
  inStock: boolean;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.75 py-1.25 text-xs font-semibold",
        inStock
          ? "border-primary/30 bg-success-surface text-primary"
          : "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.75 rounded-full",
          inStock ? "bg-primary" : "bg-placeholder",
        )}
      />
      {inStock ? "Stokta" : "Stokta yok"}
    </span>
  );
};
