import type { Metadata } from "next";
import { PackageSearchIcon } from "lucide-react";

import { ActiveFilterChips } from "@/components/catalog/active-filter-chips";
import { FilterDrawer } from "@/components/catalog/filter-drawer";
import { FilterPanel } from "@/components/catalog/filter-panel";
import { SortSelect } from "@/components/catalog/sort-select";
import { EmptyState } from "@/components/shared/empty-state";
import { ProductCard } from "@/components/shared/product-card";
import { SiteHeader } from "@/components/shared/site-header";
import { activeFilterCount, parseCatalogFilters } from "@/lib/catalog/filters";
import { getBrands } from "@/lib/catalog/brands";
import { getCategories } from "@/lib/catalog/categories";
import { getChassis } from "@/lib/catalog/chassis";
import { getModels } from "@/lib/catalog/models";
import { getProducts } from "@/lib/catalog/products";

export const metadata: Metadata = {
  title: "Ürün kataloğu",
};

const CatalogPage = async ({ searchParams }: PageProps<"/catalog">) => {
  const params = await searchParams;
  const filters = parseCatalogFilters(params);

  const [{ items: products, total }, categories, brands, models, chassis] =
    await Promise.all([
      getProducts(filters),
      getCategories(),
      getBrands(),
      getModels(filters.brands),
      getChassis(filters.models),
    ]);

  const activeCount = activeFilterCount(filters);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader query={filters.q} />

      <div className="grid flex-1 items-start lg:grid-cols-[270px_1fr]">
        <aside className="sticky top-16.5 hidden max-h-[calc(100vh-4.125rem)] self-stretch overflow-auto border-r border-border bg-card lg:block">
          <FilterPanel
            filters={filters}
            categories={categories}
            brands={brands}
            models={models}
            chassis={chassis}
          />
        </aside>

        <main className="min-w-0 px-5 pt-6 pb-10 sm:px-7">
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <FilterDrawer activeCount={activeCount}>
              <FilterPanel
                filters={filters}
                categories={categories}
                brands={brands}
                models={models}
                chassis={chassis}
              />
            </FilterDrawer>

            <p className="font-heading text-xl font-bold text-foreground">
              {total}{" "}
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
