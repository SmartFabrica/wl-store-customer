"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";

import { toUserMessage } from "@/lib/api/errors";
import {
  CART_COOKIE,
  clampQuantity,
  readCartLines,
  serializeCartLines,
} from "@/lib/cart/cart";
import { addCartItem, removeCartItem } from "@/lib/cart/items";
import type { CartLine } from "@/lib/cart/types";

export type CartActionState = {
  error?: string;
};

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

export const addToCart = async (
  productId: string,
  quantity = 1,
): Promise<CartActionState> => {
  const amount = clampQuantity(quantity);

  try {
    await addCartItem(productId, amount);
  } catch (error) {
    unstable_rethrow(error);
    return { error: toUserMessage(error) };
  }

  revalidatePath("/", "layout");

  return {};
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

export const removeFromCart = async (
  itemId: string,
): Promise<CartActionState> => {
  try {
    await removeCartItem(itemId);
  } catch (error) {
    unstable_rethrow(error);
    return { error: toUserMessage(error) };
  }

  revalidatePath("/", "layout");

  return {};
};

export const clearCart = async () => {
  await writeCart([]);
};
