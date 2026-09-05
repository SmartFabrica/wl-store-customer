import type { FacetOption, Product } from "@/lib/catalog/types";

// TODO: Katalog API'si bağlanınca bu sabitler yerine sunucudan gelen veri
// kullanılacak. Şimdilik tasarımdaki örnek veri birebir taşındı.

export const CATEGORIES: FacetOption[] = [
  { name: "Sızdırmazlık", count: 842 },
  { name: "Hidrolik", count: 631 },
  { name: "Rulman", count: 528 },
  { name: "Filtre", count: 419 },
  { name: "Elektrik", count: 208 },
];

/** Uyumlu marka listesi. */
export const BRANDS: FacetOption[] = [
  { name: "Bosch", count: 1726 },
  { name: "SKF", count: 1133 },
  { name: "Festo", count: 921 },
  { name: "Parker", count: 714 },
  { name: "Mann", count: 506 },
  { name: "Schaeffler", count: 388 },
  { name: "Continental", count: 274 },
  { name: "Mahle", count: 219 },
];

/** Uyumlu model listesi — seçili uyumlu markalara göre daralır. */
export const MODELS_BY_BRAND: Record<string, string[]> = {
  Bosch: ["CX-220", "CX-240", "LT-90"],
  SKF: ["RB-6204", "RB-6205", "TR-30206"],
  Festo: ["DSBC-32", "DSBC-40"],
  Parker: ["PV-016", "PV-020"],
  Mann: ["HU-719"],
  Schaeffler: ["FAG-6203", "INA-KH20"],
  Continental: ["CT-1028"],
  Mahle: ["OX-123D"],
};

/** Uyumlu kasa listesi — seçili uyumlu modellere göre daralır. */
export const CASES_BY_MODEL: Record<string, string[]> = {
  "CX-220": ["4x2 Kasa", "6x4 Kasa"],
  "CX-240": ["6x4 Kasa", "8x4 Kasa"],
  "LT-90": ["Sabit Kasa", "Damper Kasa"],
  "RB-6204": ["Standart Kasa"],
  "RB-6205": ["Standart Kasa", "Ağır Hizmet Kasa"],
  "TR-30206": ["Ağır Hizmet Kasa"],
  "DSBC-32": ["Kompakt Kasa"],
  "DSBC-40": ["Kompakt Kasa", "Uzun Strok Kasa"],
  "PV-016": ["Blok Kasa"],
  "PV-020": ["Blok Kasa", "Manifold Kasa"],
  "HU-719": ["Vidalı Kasa"],
  "FAG-6203": ["Standart Kasa"],
  "INA-KH20": ["Lineer Kasa"],
  "CT-1028": ["Sabit Kasa"],
  "OX-123D": ["Kartuş Kasa"],
};

export const PRODUCTS: Product[] = [
  {
    id: "mpn-4471-xg",
    name: "Hidrolik Pompa Contası",
    brand: "Bosch",
    category: "Sızdırmazlık",
    mpn: "MPN-4471-XG",
    price: 1250,
    inStock: true,
    lead: "Aynı gün kargo",
  },
  {
    id: "rb-6204-2rs",
    name: "Radyal Bilyalı Rulman",
    brand: "SKF",
    category: "Rulman",
    mpn: "RB-6204-2RS",
    price: null,
    inStock: true,
    lead: "Termin: 2-3 iş günü",
  },
  {
    id: "dsbc-32-100",
    name: "Pnömatik Silindir Kiti",
    brand: "Festo",
    category: "Hidrolik",
    mpn: "DSBC-32-100",
    price: 3480,
    inStock: false,
    lead: "Termin: 7-10 iş günü",
  },
  {
    id: "hu-719-7-x",
    name: "Yağ Filtresi Elemanı",
    brand: "Mann",
    category: "Filtre",
    mpn: "HU-719-7-X",
    price: 420,
    inStock: true,
    lead: "Aynı gün kargo",
  },
  {
    id: "pv-016-r1",
    name: "Hidrolik Valf Bloğu",
    brand: "Parker",
    category: "Hidrolik",
    mpn: "PV-016-R1",
    price: null,
    inStock: false,
    lead: "Termin: 5-7 iş günü",
  },
  {
    id: "or-115-nbr",
    name: "O-Ring Sızdırmazlık Seti",
    brand: "Bosch",
    category: "Sızdırmazlık",
    mpn: "OR-115-NBR",
    price: 185,
    inStock: true,
    lead: "Termin: 3-5 iş günü",
  },
  {
    id: "tr-30206-j2",
    name: "Konik Makaralı Rulman",
    brand: "SKF",
    category: "Rulman",
    mpn: "TR-30206-J2",
    price: null,
    inStock: true,
    lead: "Termin: 2-3 iş günü",
  },
  {
    id: "spab-p10r",
    name: "Basınç Sensörü",
    brand: "Festo",
    category: "Elektrik",
    mpn: "SPAB-P10R",
    price: 2740,
    inStock: false,
    lead: "Termin: 10-14 iş günü",
  },
  {
    id: "c-25-860-2",
    name: "Hava Filtre Kartuşu",
    brand: "Mann",
    category: "Filtre",
    mpn: "C-25-860-2",
    price: 960,
    inStock: true,
    lead: "Termin: 3-5 iş günü",
  },
];
