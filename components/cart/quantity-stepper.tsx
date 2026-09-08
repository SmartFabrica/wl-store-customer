"use client";

import { useOptimistic, useTransition } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { cn } from "cn";

import { setCartQuantity } from "@/app/(shop)/_actions/cart-actions";
import { Button } from "@/components/ui/button";
import { MAX_QUANTITY, MIN_QUANTITY } from "@/lib/cart/types";

export const QuantityStepper = ({
  productId,
  quantity,
  className,
}: {
  productId: string;
  quantity: number;
  className?: string;
}) => {
  const [pending, startTransition] = useTransition();
  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

  const update = (next: number) => {
    const clamped = Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, next));
    if (clamped === quantity) return;

    startTransition(async () => {
      setOptimisticQuantity(clamped);
      await setCartQuantity(productId, clamped);
    });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-lg border border-border bg-card",
        pending && "opacity-70",
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        aria-label="Azalt"
        disabled={optimisticQuantity <= MIN_QUANTITY}
        onClick={() => update(optimisticQuantity - 1)}
        className="h-9 w-8.5 rounded-none text-slate-600"
      >
        <MinusIcon className="size-3.5" />
      </Button>
      <span
        aria-live="polite"
        className="min-w-10 text-center font-mono text-sm font-semibold text-foreground"
      >
        {optimisticQuantity}
      </span>
      <Button
        type="button"
        variant="ghost"
        aria-label="Artır"
        disabled={optimisticQuantity >= MAX_QUANTITY}
        onClick={() => update(optimisticQuantity + 1)}
        className="h-9 w-8.5 rounded-none text-slate-600"
      >
        <PlusIcon className="size-3.5" />
      </Button>
    </div>
  );
};
