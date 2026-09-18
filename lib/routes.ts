export const CATALOG_PATH = "/catalog";

export const LOGIN_PATH = "/login";

export const LOGOUT_PATH = "/logout";

export const REGISTER_PATH = "/register";

export const REGISTER_SUBMITTED_PATH = "/register/submitted";

export const PUBLIC_PATHS = [
  LOGIN_PATH,
  REGISTER_PATH,
  REGISTER_SUBMITTED_PATH,
];

export const CART_PATH = "/cart";

export const QUOTE_NEW_PATH = "/quote/new";

export const QUOTES_PATH = "/quotes";

export const quoteSubmittedPath = (quoteNumber: string) =>
  `/quote/submitted/${quoteNumber}`;

export const productPath = (id: string) => `/products/${id}`;

export const quoteDetailPath = (quoteNumber: string) =>
  `/quotes/${quoteNumber}`;
