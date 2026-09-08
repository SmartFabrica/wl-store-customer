export const CATALOG_PATH = "/catalog";

export const CART_PATH = "/cart";

export const QUOTE_NEW_PATH = "/quote/new";

export const QUOTES_PATH = "/quotes";

export const quoteSubmittedPath = (quoteNumber: string) =>
  `/quote/submitted/${quoteNumber}`;

export const productPath = (id: string) => `/products/${id}`;
