export const apiTags = {
  products: "products",
  product: (id: string) => `product:${id}`,
  facets: "facets",
  brands: "brands",
  models: "models",
  chassis: "chassis",
  quotes: "quotes",
  quote: (quoteNumber: string) => `quote:${quoteNumber}`,
};
