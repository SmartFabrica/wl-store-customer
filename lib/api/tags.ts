export const apiTags = {
  products: "products",
  product: (id: string) => `product:${id}`,
  facets: "facets",
  quotes: "quotes",
  quote: (quoteNumber: string) => `quote:${quoteNumber}`,
};
