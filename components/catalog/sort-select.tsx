"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buildCatalogHref } from "@/lib/catalog/filters";
import {
  SORT_OPTIONS,
  type CatalogFilters,
  type SortValue,
} from "@/lib/catalog/types";

export const SortSelect = ({ filters }: { filters: CatalogFilters }) => {
  const router = useRouter();

  return (
    <Select
      value={filters.sort}
      onValueChange={(value) =>
        router.push(
          buildCatalogHref({ ...filters, sort: value as SortValue }),
          {
            scroll: false,
          },
        )
      }
    >
      <SelectTrigger
        aria-label="Sıralama"
        className="h-9.5 rounded-lg bg-card px-3.5 text-[13px] font-semibold"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
