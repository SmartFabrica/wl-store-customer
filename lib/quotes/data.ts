import type { Quote, QuoteStatus } from "@/lib/quotes/types";

export const QUOTE_STATUS_META: Record<
  QuoteStatus,
  { label: string; tabLabel: string; tone: "warning" | "success"; note: string }
> = {
  reviewing: {
    label: "Satıcı inceliyor",
    tabLabel: "İnceleniyor",
    tone: "warning",
    note: "Satıcı teklifini hazırlıyor. Fiyatlar tamamlandığında burada görünecek.",
  },
  quoted: {
    label: "Teklif hazır",
    tabLabel: "Teklif verildi",
    tone: "success",
    note: "Satıcı teklifini hazırladı. Kabul süreci yönetici tarafından yürütülür; sonucu bu sayfadan takip edebilirsin.",
  },
  accepted: {
    label: "Kabul edildi",
    tabLabel: "Kabul edildi",
    tone: "success",
    note: "Bu teklif kabul edildi. Satıcı süreci başlattı; gelişmeleri e-posta ile alacaksın.",
  },
};

const DEFAULT_DELIVERY_ADDRESS =
  "Yılmaz Endüstri A.Ş.\nOrganize Sanayi Bölgesi 4. Cad. No:18\nNilüfer / Bursa · 16140";

// TODO: Teklif API'si bağlanınca bu liste sunucudan gelecek.
export const QUOTES: Quote[] = [
  {
    number: "TKF-2026-00042",
    createdAt: "2026-07-24",
    status: "quoted",
    deliveryAddress: DEFAULT_DELIVERY_ADDRESS,
    billingAddress: null,
    taxInfo: "VD: Nilüfer · VKN: 1234567890",
    note: "Termin 2 hafta içinde olmalı; fatura e-arşiv olarak iletilsin.",
    items: [
      {
        name: "Hidrolik Pompa Contası",
        mpn: "MPN-4471-XG",
        quantity: 2,
        unitPrice: 1250,
      },
      {
        name: "Radyal Bilyalı Rulman",
        mpn: "RB-6204-2RS",
        quantity: 1,
        unitPrice: 980,
      },
      {
        name: "Yağ Filtresi Elemanı",
        mpn: "HU-719-7-X",
        quantity: 4,
        unitPrice: 420,
      },
    ],
  },
  {
    number: "TKF-2026-00039",
    createdAt: "2026-07-22",
    status: "reviewing",
    deliveryAddress: DEFAULT_DELIVERY_ADDRESS,
    billingAddress: null,
    taxInfo: "VD: Nilüfer · VKN: 1234567890",
    note: "",
    items: [
      {
        name: "Pnömatik Silindir Kiti",
        mpn: "DSBC-32-100",
        quantity: 1,
        unitPrice: null,
      },
      {
        name: "Basınç Sensörü",
        mpn: "SPAB-P10R",
        quantity: 2,
        unitPrice: null,
      },
    ],
  },
  {
    number: "TKF-2026-00031",
    createdAt: "2026-07-18",
    status: "accepted",
    deliveryAddress: DEFAULT_DELIVERY_ADDRESS,
    billingAddress:
      "Yılmaz Endüstri A.Ş.\nBarbaros Mah. 12. Sok. No:4\nOsmangazi / Bursa · 16050",
    taxInfo: "VD: Osmangazi · VKN: 1234567890",
    note: "",
    items: [
      {
        name: "O-Ring Sızdırmazlık Seti",
        mpn: "OR-115-NBR",
        quantity: 6,
        unitPrice: 185,
      },
      { name: "Kapak Contası", mpn: "GC-880-R", quantity: 3, unitPrice: 260 },
    ],
  },
];

export const getQuoteByNumber = (quoteNumber: string) =>
  QUOTES.find((quote) => quote.number === quoteNumber) ?? null;
