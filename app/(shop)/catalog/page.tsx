import type { Metadata } from "next";
import { PackageSearchIcon } from "lucide-react";

import { ActiveFilterChips } from "@/components/catalog/active-filter-chips";
import { FilterDrawer } from "@/components/catalog/filter-drawer";
import { FilterPanel } from "@/components/catalog/filter-panel";
import { SortSelect } from "@/components/catalog/sort-select";
import { EmptyState } from "@/components/shared/empty-state";
import { ProductCard } from "@/components/shared/product-card";
import { SiteHeader } from "@/components/shared/site-header";
import {
  activeFilterCount,
  filterProducts,
  parseCatalogFilters,
} from "@/lib/catalog/filters";

export const metadata: Metadata = {
  title: "Ürün kataloğu",
};

const CatalogPage = async ({ searchParams }: PageProps<"/catalog">) => {
  const filters = parseCatalogFilters(await searchParams);
  const products = filterProducts(filters);
  const activeCount = activeFilterCount(filters);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader query={filters.q} />

      <div className="grid flex-1 items-start lg:grid-cols-[270px_1fr]">
        <aside className="sticky top-16.5 hidden max-h-[calc(100vh-4.125rem)] self-stretch overflow-auto border-r border-border bg-card lg:block">
          <FilterPanel filters={filters} />
        </aside>

        <main className="min-w-0 px-5 pt-6 pb-10 sm:px-7">
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <FilterDrawer activeCount={activeCount}>
              <FilterPanel filters={filters} />
            </FilterDrawer>

            <p className="font-heading text-xl font-bold text-foreground">
              {products.length}{" "}
              <span className="font-sans text-sm font-normal text-muted-foreground">
                ürün
              </span>
            </p>

            <div className="ml-auto flex items-center gap-2.25">
              <span className="hidden text-[13px] font-medium text-muted-foreground sm:inline">
                Sırala
              </span>
              <SortSelect filters={filters} />
            </div>
          </div>

          <ActiveFilterChips filters={filters} />

          {products.length === 0 ? (
            <EmptyState
              variant="boxed"
              icon={<PackageSearchIcon className="size-9" strokeWidth={1.8} />}
              title="Sonuç bulunamadı"
              description="Seçtiğiniz filtrelerle eşleşen ürün yok. Filtreleri gevşetip tekrar deneyin."
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 min-[1100px]:grid-cols-3 min-[1500px]:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;
