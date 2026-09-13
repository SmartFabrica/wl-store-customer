import "server-only";

const DEFAULT_TIMEOUT_MS = 10_000;

const readBaseUrl = () => {
  const raw = process.env.API_BASE_URL?.trim();

  if (!raw) {
    throw new Error(
      "API_BASE_URL tanımlı değil. .env.local dosyasına ekleyin (örn. http://localhost:4000).",
    );
  }

  return raw.replace(/\/+$/, "");
};

export const getApiBaseUrl = readBaseUrl;

export const getApiTimeoutMs = () => {
  const raw = Number(process.env.API_TIMEOUT_MS);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_TIMEOUT_MS;
};
