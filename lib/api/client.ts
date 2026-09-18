import "server-only";

import { redirect } from "next/navigation";

import { getApiBaseUrl, getApiTimeoutMs } from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";
import type { ApiResponse } from "@/lib/api/types";
import { getSessionToken } from "@/lib/auth/session";
import { LOGOUT_PATH } from "@/lib/routes";

type QueryValue = string | number | boolean | null | undefined;

export type ApiQuery = Record<string, QueryValue | QueryValue[]>;

export type ApiRequest = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: ApiQuery;
  body?: unknown;
  tags?: string[];
  revalidate?: number;
  headers?: Record<string, string>;
  timeoutMs?: number;
  auth?: boolean;
};

const buildUrl = (path: string, query?: ApiQuery) => {
  const url = new URL(
    path.startsWith("/") ? path : `/${path}`,
    `${getApiBaseUrl()}/`,
  );

  for (const [key, value] of Object.entries(query ?? {})) {
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item === undefined || item === null || item === "") continue;
      url.searchParams.append(key, String(item));
    }
  }

  return url;
};

export const apiFetch = async <T>({
  path,
  method = "GET",
  query,
  body,
  tags,
  revalidate,
  headers,
  timeoutMs,
  auth,
}: ApiRequest): Promise<T> => {
  const shouldCache =
    method === "GET" && (tags !== undefined || revalidate !== undefined);

  const token = auth ? await getSessionToken() : undefined;

  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), {
      method,
      headers: {
        Accept: "application/json",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs ?? getApiTimeoutMs()),
      cache: shouldCache ? "force-cache" : "no-store",
      ...(shouldCache ? { next: { tags, revalidate } } : {}),
    });
  } catch (cause) {
    throw new ApiError({
      message: `API'ye ulaşılamadı: ${method} ${path}`,
      status: 0,
      path,
      cause,
    });
  }

  if (response.status === 401 && auth) {
    redirect(LOGOUT_PATH);
  }

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new ApiError({
      message: payload.message,
      status: response.status,
      path,
    });
  }

  return payload.data as T;
};
