import { CASES_BY_MODEL, MODELS_BY_BRAND, PRODUCTS } from "@/lib/catalog/data";
import {
  SORT_OPTIONS,
  type CatalogFilters,
  type Product,
  type SortValue,
} from "@/lib/catalog/types";

export const CATALOG_PATH = "/catalog";

export const FILTER_PARAM = {
  q: "q",
  category: "kategori",
  brands: "marka",
  models: "model",
  cases: "kasa",
  inStock: "stok",
  sort: "sirala",
} as const;

type RawSearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const toList = (value: string | string[] | undefined) => {
  const raw = Array.isArray(value) ? value.join(",") : (value ?? "");
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const isSortValue = (value: string | undefined): value is SortValue =>
  SORT_OPTIONS.some((option) => option.value === value);

export const parseCatalogFilters = (
  searchParams: RawSearchParams,
): CatalogFilters => {
  const brands = toList(searchParams[FILTER_PARAM.brands]);
  const allowedModels = new Set(
    brands.flatMap((brand) => MODELS_BY_BRAND[brand] ?? []),
  );
  const models = toList(searchParams[FILTER_PARAM.models]).filter((model) =>
    allowedModels.has(model),
  );

  const allowedCases = new Set(
    models.flatMap((model) => CASES_BY_MODEL[model] ?? []),
  );
  const cases = toList(searchParams[FILTER_PARAM.cases]).filter((item) =>
    allowedCases.has(item),
  );

  const sort = first(searchParams[FILTER_PARAM.sort]);

  return {
    q: (first(searchParams[FILTER_PARAM.q]) ?? "").trim(),
    category: first(searchParams[FILTER_PARAM.category]) ?? null,
    brands,
    models,
    cases,
    inStock: first(searchParams[FILTER_PARAM.inStock]) === "1",
    sort: isSortValue(sort) ? sort : "new",
  };
};

export const buildCatalogHref = (filters: CatalogFilters) => {
  const params = new URLSearchParams();

  if (filters.q) params.set(FILTER_PARAM.q, filters.q);
  if (filters.category) params.set(FILTER_PARAM.category, filters.category);
  if (filters.brands.length)
    params.set(FILTER_PARAM.brands, filters.brands.join(","));
  if (filters.models.length)
    params.set(FILTER_PARAM.models, filters.models.join(","));
  if (filters.cases.length)
    params.set(FILTER_PARAM.cases, filters.cases.join(","));
  if (filters.inStock) params.set(FILTER_PARAM.inStock, "1");
  if (filters.sort !== "new") params.set(FILTER_PARAM.sort, filters.sort);

  const query = params.toString();
  return query ? `${CATALOG_PATH}?${query}` : CATALOG_PATH;
};

const toggleInList = (list: string[], value: string) =>
  list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];

export const toggleFilter = (
  filters: CatalogFilters,
  change:
    | { type: "category"; value: string }
    | { type: "brand"; value: string }
    | { type: "model"; value: string }
    | { type: "case"; value: string }
    | { type: "inStock" },
): CatalogFilters => {
  switch (change.type) {
    case "category":
      return {
        ...filters,
        category: filters.category === change.value ? null : change.value,
      };
    case "brand":
      return {
        ...filters,
        brands: toggleInList(filters.brands, change.value),
        models: [],
        cases: [],
      };
    case "model":
      return {
        ...filters,
        models: toggleInList(filters.models, change.value),
        cases: [],
      };
    case "case":
      return { ...filters, cases: toggleInList(filters.cases, change.value) };
    case "inStock":
      return { ...filters, inStock: !filters.inStock };
  }
};

export const clearedFilters = (filters: CatalogFilters): CatalogFilters => ({
  q: filters.q,
  category: null,
  brands: [],
  models: [],
  cases: [],
  inStock: false,
  sort: filters.sort,
});

export const activeFilterCount = (filters: CatalogFilters) =>
  (filters.category ? 1 : 0) +
  filters.brands.length +
  filters.models.length +
  filters.cases.length +
  (filters.inStock ? 1 : 0);

export const availableModels = (brands: string[]) => [
  ...new Set(brands.flatMap((brand) => MODELS_BY_BRAND[brand] ?? [])),
];

export const availableCases = (models: string[]) => [
  ...new Set(models.flatMap((model) => CASES_BY_MODEL[model] ?? [])),
];

const matchesQuery = (product: Product, q: string) => {
  const needle = q.toLocaleLowerCase("tr");
  return [product.name, product.brand, product.mpn, product.category].some(
    (field) => field.toLocaleLowerCase("tr").includes(needle),
  );
};

const sortProducts = (products: Product[], sort: SortValue) => {
  const sorted = [...products];
  if (sort === "az") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name, "tr"));
  }
  if (sort === "price_asc" || sort === "price_desc") {
    return sorted.sort((a, b) => {
      if (a.price == null) return 1;
      if (b.price == null) return -1;
      return sort === "price_asc" ? a.price - b.price : b.price - a.price;
    });
  }
  return sorted;
};

export const filterProducts = (filters: CatalogFilters) => {
  const filtered = PRODUCTS.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.brands.length && !filters.brands.includes(product.brand))
      return false;
    if (filters.inStock && !product.inStock) return false;
    if (filters.q && !matchesQuery(product, filters.q)) return false;
    return true;
  });

  return sortProducts(filtered, filters.sort);
};
