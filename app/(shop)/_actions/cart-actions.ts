"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { getProductById } from "@/lib/catalog/data";
import {
  CART_COOKIE,
  clampQuantity,
  readCartLines,
  serializeCartLines,
} from "@/lib/cart/cart";
import type { CartLine } from "@/lib/cart/types";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const writeCart = async (lines: CartLine[]) => {
  const store = await cookies();
  store.set(CART_COOKIE, serializeCartLines(lines), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  revalidatePath("/", "layout");
};

export const addToCart = async (productId: string, quantity = 1) => {
  if (!getProductById(productId)) return;

  const lines = await readCartLines();
  const existing = lines.find((line) => line.productId === productId);

  const next = existing
    ? lines.map((line) =>
        line.productId === productId
          ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
          : line,
      )
    : [...lines, { productId, quantity: clampQuantity(quantity) }];

  await writeCart(next);
};

export const setCartQuantity = async (productId: string, quantity: number) => {
  const lines = await readCartLines();
  await writeCart(
    lines.map((line) =>
      line.productId === productId
        ? { ...line, quantity: clampQuantity(quantity) }
        : line,
    ),
  );
};

export const removeFromCart = async (productId: string) => {
  const lines = await readCartLines();
  await writeCart(lines.filter((line) => line.productId !== productId));
};
