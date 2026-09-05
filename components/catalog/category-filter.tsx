import Link from "next/link";
import { cn } from "cn";

import { buildCatalogHref, toggleFilter } from "@/lib/catalog/filters";
import type { CatalogFilters, FacetOption } from "@/lib/catalog/types";

export const CategoryFilter = ({
  categories,
  filters,
}: {
  categories: FacetOption[];
  filters: CatalogFilters;
}) => {
  return (
    <div className="flex flex-col gap-0.5">
      {categories.map((category) => {
        const active = filters.category === category.name;
        const href = buildCatalogHref(
          toggleFilter(filters, { type: "category", value: category.name }),
        );

        return (
          <Link
            key={category.name}
            href={href}
            scroll={false}
            className={cn(
              "flex items-center justify-between rounded-[9px] px-2.5 py-2 text-[13.5px] transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
              active
                ? "bg-warning font-semibold text-warning-foreground"
                : "font-medium text-slate-600 hover:bg-background",
            )}
          >
            <span>{category.name}</span>
            <span
              className={cn(
                "font-mono text-[11px] font-medium",
                active ? "text-accent" : "text-border",
              )}
            >
              {category.count.toLocaleString("tr-TR")}
            </span>
            <span className="sr-only">
              {active ? "seçili, filtreden kaldır" : "filtreye ekle"}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
