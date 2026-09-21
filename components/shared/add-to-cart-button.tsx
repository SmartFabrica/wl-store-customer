"use client";

import { useEffect, useState, useTransition } from "react";
import { CheckIcon, PlusIcon } from "lucide-react";
import { cn } from "cn";

import { addToCart } from "@/app/(shop)/_actions/cart-actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const FEEDBACK_MS = 2500;

export const AddToCartButton = ({
  productId,
  productName,
  quantity = 1,
  className,
  iconClassName,
}: {
  productId: string;
  productName: string;
  quantity?: number;
  className?: string;
  iconClassName?: string;
}) => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <>
      <Button
        type="button"
        disabled={pending}
        aria-label={`${productName} ürününü sepete ekle`}
        onClick={() =>
          startTransition(async () => {
            const state = await addToCart(productId, quantity);
            setError(state.error);
            setAdded(!state.error);
          })
        }
        className={cn(
          "w-full cursor-pointer gap-1.5 font-semibold disabled:cursor-default",
          added &&
            "border border-primary/30 bg-success-surface text-primary hover:bg-success-surface",
          className,
        )}
      >
        {pending ? (
          <Spinner className={cn("size-3.75", iconClassName)} />
        ) : added ? (
          <CheckIcon
            className={cn("size-3.75", iconClassName)}
            strokeWidth={2.6}
          />
        ) : (
          <PlusIcon
            className={cn("size-3.75", iconClassName)}
            strokeWidth={2.2}
          />
        )}
        {added ? "Sepete eklendi" : "Sepete ekle"}
      </Button>

      <p role="status" aria-live="polite" className="sr-only">
        {added ? `${productName} sepete eklendi` : ""}
      </p>

      {error ? (
        <p role="alert" className="mt-2 text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </>
  );
};
