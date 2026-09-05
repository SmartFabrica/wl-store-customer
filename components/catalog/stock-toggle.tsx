import Link from "next/link";
import { cn } from "cn";

import { buildCatalogHref, toggleFilter } from "@/lib/catalog/filters";
import type { CatalogFilters } from "@/lib/catalog/types";

export const StockToggle = ({ filters }: { filters: CatalogFilters }) => {
  const href = buildCatalogHref(toggleFilter(filters, { type: "inStock" }));

  return (
    <Link
      href={href}
      scroll={false}
      className="flex items-center justify-between gap-3 rounded-lg py-0.5 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      <span className="text-[13.5px] font-semibold text-foreground">
        Sadece stoktakiler
      </span>
      <span
        aria-hidden
        className={cn(
          "relative h-5.75 w-10 flex-none rounded-full transition-colors",
          filters.inStock ? "bg-primary" : "bg-border",
        )}
      >
        <span
          className={cn(
            "absolute top-[2.5px] size-4.5 rounded-full bg-white shadow transition-all",
            filters.inStock ? "left-5" : "left-[2.5px]",
          )}
        />
      </span>
      <span className="sr-only">
        {filters.inStock ? "açık, kapat" : "kapalı, aç"}
      </span>
    </Link>
  );
};
