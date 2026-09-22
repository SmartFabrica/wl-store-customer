"use client";

import { useState, useTransition } from "react";
import { Trash2Icon } from "lucide-react";

import { removeFromCart } from "@/app/(shop)/_actions/cart-actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export const RemoveLineButton = ({
  itemId,
  productName,
}: {
  itemId: string;
  productName: string;
}) => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={pending}
        aria-label={`${productName} ürününü sepetten kaldır`}
        onClick={() =>
          startTransition(async () => {
            const state = await removeFromCart(itemId);
            setError(state.error);
          })
        }
        className="cursor-pointer gap-1.5 px-1.5 text-[12.5px] font-semibold text-placeholder hover:bg-transparent hover:text-destructive disabled:cursor-default"
      >
        {pending ? (
          <Spinner className="size-3.75" />
        ) : (
          <Trash2Icon className="size-3.75" />
        )}
        Kaldır
      </Button>

      {error ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </>
  );
};
