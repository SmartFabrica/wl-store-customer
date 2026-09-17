import type { Product } from "@/lib/catalog/types";

// TODO: Katalog API'si bağlanınca bu sabitler yerine sunucudan gelen veri
// kullanılacak. Şimdilik tasarımdaki örnek veri birebir taşındı.

/**
 * Marka listesi API'den geliyor; yanındaki ürün adedi henüz dönmediği için
 * geçici olarak buradan okunuyor.
 */
const MOCK_BRAND_COUNTS: Record<string, number> = {
  Bosch: 1726,
  SKF: 1133,
  Festo: 921,
  Parker: 714,
  Mann: 506,
  Schaeffler: 388,
  Continental: 274,
  Mahle: 219,
};

export const mockBrandCount = (name: string) => MOCK_BRAND_COUNTS[name] ?? 0;

export const PRODUCTS: Product[] = [
  {
    id: "mpn-4471-xg",
    title: "Hidrolik Pompa Contası",
    brand_name: "Bosch",
    category_name: "Sızdırmazlık",
    mpn: "MPN-4471-XG",
    price_visible: true,
    price: "1250.00",
    inStock: true,
    lead: "Aynı gün kargo",
  },
  {
    id: "rb-6204-2rs",
    title: "Radyal Bilyalı Rulman",
    brand_name: "SKF",
    category_name: "Rulman",
    mpn: "RB-6204-2RS",
    price_visible: false,
    price: null,
    inStock: true,
    lead: "Termin: 2-3 iş günü",
  },
  {
    id: "dsbc-32-100",
    title: "Pnömatik Silindir Kiti",
    brand_name: "Festo",
    category_name: "Hidrolik",
    mpn: "DSBC-32-100",
    price_visible: true,
    price: "3480.00",
    inStock: false,
    lead: "Termin: 7-10 iş günü",
  },
  {
    id: "hu-719-7-x",
    title: "Yağ Filtresi Elemanı",
    brand_name: "Mann",
    category_name: "Filtre",
    mpn: "HU-719-7-X",
    price_visible: true,
    price: "420.00",
    inStock: true,
    lead: "Aynı gün kargo",
  },
  {
    id: "pv-016-r1",
    title: "Hidrolik Valf Bloğu",
    brand_name: "Parker",
    category_name: "Hidrolik",
    mpn: "PV-016-R1",
    price_visible: false,
    price: null,
    inStock: false,
    lead: "Termin: 5-7 iş günü",
  },
  {
    id: "or-115-nbr",
    title: "O-Ring Sızdırmazlık Seti",
    brand_name: "Bosch",
    category_name: "Sızdırmazlık",
    mpn: "OR-115-NBR",
    price_visible: true,
    price: "185.00",
    inStock: true,
    lead: "Termin: 3-5 iş günü",
  },
  {
    id: "tr-30206-j2",
    title: "Konik Makaralı Rulman",
    brand_name: "SKF",
    category_name: "Rulman",
    mpn: "TR-30206-J2",
    price_visible: false,
    price: null,
    inStock: true,
    lead: "Termin: 2-3 iş günü",
  },
  {
    id: "spab-p10r",
    title: "Basınç Sensörü",
    brand_name: "Festo",
    category_name: "Elektrik",
    mpn: "SPAB-P10R",
    price_visible: true,
    price: "2740.00",
    inStock: false,
    lead: "Termin: 10-14 iş günü",
  },
  {
    id: "c-25-860-2",
    title: "Hava Filtre Kartuşu",
    brand_name: "Mann",
    category_name: "Filtre",
    mpn: "C-25-860-2",
    price_visible: true,
    price: "960.00",
    inStock: true,
    lead: "Termin: 3-5 iş günü",
  },
];

export const getProductById = (id: string) =>
  PRODUCTS.find((product) => product.id === id) ?? null;
