export type Category = {
  id: string;
  name: string;
};

export type Brand = {
  id: string;
  name: string;
};

export type BrandModel = {
  id: string;
  brand_id: string;
  name: string;
};

export type ModelChassis = {
  id: string;
  model_id: string;
  name: string;
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

export type ProductCompat = {
  model_id: string;
  model_name: string;
  chassis_id: string;
  chassis_name: string;
};

/** Uyumluluk listesi modele göre gruplanır, altında kasalar listelenir. */
export type CompatibilityGroup = {
  model: string;
  chassis: string[];
};

export type ProductDetail = Product & {
  description: string | null;
  specs: SpecRow[] | null;
  brand_id: string;
  category_id: string;
  images: string[];
  compat: ProductCompat[];
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
