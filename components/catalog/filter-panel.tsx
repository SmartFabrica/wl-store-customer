import Link from "next/link";

import { CategoryFilter } from "@/components/catalog/category-filter";
import { FilterCheckItem } from "@/components/catalog/filter-check-item";
import {
  FilterLockedHint,
  FilterSection,
} from "@/components/catalog/filter-section";
import { StockToggle } from "@/components/catalog/stock-toggle";
import { BRANDS, CATEGORIES } from "@/lib/catalog/data";
import {
  activeFilterCount,
  availableCases,
  availableModels,
  buildCatalogHref,
  clearedFilters,
  toggleFilter,
} from "@/lib/catalog/filters";
import type { CatalogFilters } from "@/lib/catalog/types";

export const FilterPanel = ({ filters }: { filters: CatalogFilters }) => {
  const models = availableModels(filters.brands);
  const cases = availableCases(filters.models);
  const hasActive = activeFilterCount(filters) > 0;

  return (
    <div className="px-5 pt-5.5 pb-7">
      <div className="mb-4.5 flex min-h-5 items-center justify-between gap-3">
        <h2 className="font-heading text-[13px] font-bold tracking-[0.6px] text-foreground uppercase">
          Filtreler
        </h2>
        {hasActive ? (
          <Link
            href={buildCatalogHref(clearedFilters(filters))}
            scroll={false}
            className="text-xs font-semibold text-accent underline-offset-4 hover:underline"
          >
            Filtreleri temizle
          </Link>
        ) : null}
      </div>

      <FilterSection title="Kategoriler">
        <CategoryFilter categories={CATEGORIES} filters={filters} />
      </FilterSection>

      <FilterSection title="Uyumlu Marka">
        <div className="-mx-1.5 flex max-h-49 flex-col gap-px overflow-auto px-1.5">
          {BRANDS.map((brand) => (
            <FilterCheckItem
              key={brand.name}
              href={buildCatalogHref(
                toggleFilter(filters, { type: "brand", value: brand.name }),
              )}
              label={brand.name}
              count={brand.count}
              checked={filters.brands.includes(brand.name)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Uyumlu Model">
        {models.length === 0 ? (
          <FilterLockedHint>
            Uyumlu model seçmek için önce marka seçin.
          </FilterLockedHint>
        ) : (
          <div className="-mx-1.5 flex max-h-45 flex-col gap-px overflow-auto px-1.5">
            {models.map((model) => (
              <FilterCheckItem
                key={model}
                href={buildCatalogHref(
                  toggleFilter(filters, { type: "model", value: model }),
                )}
                label={model}
                checked={filters.models.includes(model)}
              />
            ))}
          </div>
        )}
      </FilterSection>

      <FilterSection title="Uyumlu Kasa">
        {cases.length === 0 ? (
          <FilterLockedHint>
            Uyumlu kasa seçmek için önce model seçin.
          </FilterLockedHint>
        ) : (
          <div className="-mx-1.5 flex max-h-45 flex-col gap-px overflow-auto px-1.5">
            {cases.map((item) => (
              <FilterCheckItem
                key={item}
                href={buildCatalogHref(
                  toggleFilter(filters, { type: "case", value: item }),
                )}
                label={item}
                checked={filters.cases.includes(item)}
              />
            ))}
          </div>
        )}
      </FilterSection>

      <div className="border-t border-border/70 pt-5">
        <StockToggle filters={filters} />
      </div>
    </div>
  );
};
