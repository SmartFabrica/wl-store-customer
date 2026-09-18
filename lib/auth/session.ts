import "server-only";

import { cookies } from "next/headers";

import { SESSION_COOKIE, SESSION_USER_COOKIE } from "@/lib/auth/cookies";
import type { UserAggregate } from "@/lib/auth/types";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE,
} as const;

export const createSession = async (token: string, user: UserAggregate) => {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, cookieOptions);
  store.set(SESSION_USER_COOKIE, JSON.stringify(user), cookieOptions);
};

export const getSessionToken = async () => {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value;
};

export const getSessionUser = async (): Promise<UserAggregate | null> => {
  const store = await cookies();
  const raw = store.get(SESSION_USER_COOKIE)?.value;
  return raw ? (JSON.parse(raw) as UserAggregate) : null;
};

export const clearSession = async () => {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(SESSION_USER_COOKIE);
};
