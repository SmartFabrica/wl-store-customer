const priceFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 2,
});

export const formatPrice = (value: number) => priceFormatter.format(value);

export const formatCount = (value: number) => value.toLocaleString("tr-TR");

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const formatDate = (isoDate: string) =>
  dateFormatter.format(new Date(isoDate));
