import type { FacetOption, Product, ProductDetail } from "@/lib/catalog/types";

// TODO: Katalog API'si bağlanınca bu sabitler yerine sunucudan gelen veri
// kullanılacak. Şimdilik tasarımdaki örnek veri birebir taşındı.

export const CATEGORIES: FacetOption[] = [
  { name: "Sızdırmazlık", count: 842 },
  { name: "Hidrolik", count: 631 },
  { name: "Rulman", count: 528 },
  { name: "Filtre", count: 419 },
  { name: "Elektrik", count: 208 },
];

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

/**
 * Ürün detayı. Tasarımda tek bir ürün için detay verisi olduğundan tüm
 * ürünlerde aynı örnek içerik gösteriliyor; katalog API'si bağlanınca yerini
 * ürüne özel veri alacak.
 */
export const DEFAULT_PRODUCT_DETAIL: ProductDetail = {
  description:
    "Yüksek basınçlı hidrolik pompa sistemleri için tasarlanmış NBR esaslı sızdırmazlık contası. Aşınmaya ve yağa dayanıklı yapısı sayesinde uzun servis ömrü sunar. Endüstriyel iş makineleri ve sabit hidrolik ünitelerinde orijinal parça yerine kullanıma uygundur. Çalışma sıcaklığı −30 °C ile +120 °C arasındadır.",
  specs: [
    { label: "Malzeme", value: "NBR (Nitril Kauçuk)" },
    { label: "İç çap", value: "42 mm" },
    { label: "Dış çap", value: "56 mm" },
    { label: "Kalınlık", value: "6,5 mm" },
    { label: "Çalışma sıcaklığı", value: "−30 / +120 °C" },
    { label: "Basınç dayanımı", value: "350 bar" },
    { label: "Sertlik", value: "70 Shore A" },
    { label: "Ağırlık", value: "18 g" },
  ],
  compatibility: [
    {
      brand: "Bosch",
      models: ["CX-220", "CX-240", "LT-90", "LT-110", "GX-300"],
    },
    { brand: "SKF", models: ["RB-6204", "RB-6205"] },
    { brand: "Parker", models: ["PV-016", "PV-020", "PV-024", "PH-330"] },
    { brand: "Festo", models: ["DSBC-32", "DSBC-40", "DNC-50"] },
    { brand: "Continental", models: ["CT-1028", "CT-1044"] },
  ],
  imageLabels: ["ANA GÖRSEL", "GÖRSEL 2", "GÖRSEL 3", "GÖRSEL 4"],
};

export const getProductById = (id: string) =>
  PRODUCTS.find((product) => product.id === id) ?? null;

export const getProductDetail = (): ProductDetail => DEFAULT_PRODUCT_DETAIL;

/** Aynı kategorideki diğer ürünler; yetmezse katalogdan tamamlanır. */
export const getSimilarProducts = (product: Product, limit = 5) => {
  const others = PRODUCTS.filter((item) => item.id !== product.id);
  const sameCategory = others.filter(
    (item) => item.category_name === product.category_name,
  );
  const rest = others.filter(
    (item) => item.category_name !== product.category_name,
  );
  return [...sameCategory, ...rest].slice(0, limit);
};
