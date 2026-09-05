import Link from "next/link";
import { XIcon } from "lucide-react";

import {
  buildCatalogHref,
  clearedFilters,
  toggleFilter,
} from "@/lib/catalog/filters";
import type { CatalogFilters } from "@/lib/catalog/types";

type Chip = { key: string; label: string; href: string };

const buildChips = (filters: CatalogFilters): Chip[] => {
  const chips: Chip[] = [];

  if (filters.category) {
    chips.push({
      key: `category-${filters.category}`,
      label: `Kategori: ${filters.category}`,
      href: buildCatalogHref({ ...filters, category: null }),
    });
  }

  for (const brand of filters.brands) {
    chips.push({
      key: `brand-${brand}`,
      label: `Uyumlu marka: ${brand}`,
      href: buildCatalogHref(
        toggleFilter(filters, { type: "brand", value: brand }),
      ),
    });
  }

  for (const model of filters.models) {
    chips.push({
      key: `model-${model}`,
      label: `Uyumlu model: ${model}`,
      href: buildCatalogHref(
        toggleFilter(filters, { type: "model", value: model }),
      ),
    });
  }

  for (const item of filters.cases) {
    chips.push({
      key: `case-${item}`,
      label: `Uyumlu kasa: ${item}`,
      href: buildCatalogHref(
        toggleFilter(filters, { type: "case", value: item }),
      ),
    });
  }

  if (filters.inStock) {
    chips.push({
      key: "in-stock",
      label: "Sadece stoktakiler",
      href: buildCatalogHref({ ...filters, inStock: false }),
    });
  }

  return chips;
};

export const ActiveFilterChips = ({ filters }: { filters: CatalogFilters }) => {
  const chips = buildChips(filters);
  if (chips.length === 0) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Link
          key={chip.key}
          href={chip.href}
          scroll={false}
          className="inline-flex items-center gap-1.5 rounded-full border border-warning-border bg-warning py-1.5 pr-2 pl-3 text-xs font-semibold text-warning-foreground transition-colors hover:border-accent/50 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          {chip.label}
          <span
            aria-hidden
            className="flex size-4.25 items-center justify-center rounded-full bg-accent/20"
          >
            <XIcon className="size-2.75" strokeWidth={3} />
          </span>
          <span className="sr-only">filtresini kaldır</span>
        </Link>
      ))}

      <Link
        href={buildCatalogHref(clearedFilters(filters))}
        scroll={false}
        className="ml-1 text-xs font-semibold text-accent underline-offset-4 hover:underline"
      >
        Tümünü temizle
      </Link>
    </div>
  );
};
