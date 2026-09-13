export type FacetOption = {
  name: string;
  count: number;
};

export type Product = {
  id: string;
  title: string;
  mpn: string;
  price_visible: boolean;
  price: string | null;
  brand_name: string;
  category_name: string;
  inStock?: boolean;
  lead?: string;
};

export type SpecRow = {
  label: string;
  value: string;
};

export type CompatibilityGroup = {
  brand: string;
  models: string[];
};

export type ProductDetail = {
  description: string;
  specs: SpecRow[];
  compatibility: CompatibilityGroup[];
  imageLabels: string[];
};

export const SORT_OPTIONS = [
  { value: "new", label: "Yeniler" },
  { value: "price_asc", label: "Artan Fiyat" },
  { value: "price_desc", label: "Azalan Fiyat" },
  { value: "az", label: "A-Z" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export type CatalogFilters = {
  q: string;
  category: string | null;
  brands: string[];
  models: string[];
  cases: string[];
  inStock: boolean;
  sort: SortValue;
};
