import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { cn } from "cn";

export const FilterCheckItem = ({
  href,
  label,
  count,
  checked,
}: {
  href: string;
  label: string;
  count?: number;
  checked: boolean;
}) => {
  return (
    <Link
      href={href}
      scroll={false}
      className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-background focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      <span
        aria-hidden
        className={cn(
          "flex size-4 flex-none items-center justify-center rounded-[4px] border transition-colors",
          checked
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border bg-card",
        )}
      >
        {checked ? <CheckIcon className="size-3" strokeWidth={3} /> : null}
      </span>

      <span
        className={cn(
          "flex-1 text-[13.5px]",
          checked
            ? "font-semibold text-foreground"
            : "font-medium text-slate-600",
        )}
      >
        {label}
      </span>

      {count === undefined ? null : (
        <span
          className={cn(
            "font-mono text-[11px] font-medium",
            checked ? "text-accent" : "text-placeholder",
          )}
        >
          {count.toLocaleString("tr-TR")}
        </span>
      )}

      <span className="sr-only">
        {checked ? "seçili, filtreden kaldır" : "filtreye ekle"}
      </span>
    </Link>
  );
};
