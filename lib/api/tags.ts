export const apiTags = {
  products: "products",
  product: (id: string) => `product:${id}`,
  categories: "categories",
  brands: "brands",
  models: "models",
  chassis: "chassis",
  quotes: "quotes",
  quote: (quoteNumber: string) => `quote:${quoteNumber}`,
};
