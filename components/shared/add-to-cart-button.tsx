"use client";

import { useTransition } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "cn";

import { addToCart } from "@/app/(shop)/_actions/cart-actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

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

  return (
    <Button
      type="button"
      disabled={pending}
      aria-label={`${productName} ürününü sepete ekle`}
      onClick={() =>
        startTransition(async () => {
          await addToCart(productId, quantity);
        })
      }
      className={cn("w-full gap-1.5 font-semibold", className)}
    >
      {pending ? (
        <Spinner className={cn("size-3.75", iconClassName)} />
      ) : (
        <PlusIcon
          className={cn("size-3.75", iconClassName)}
          strokeWidth={2.2}
        />
      )}
      Sepete ekle
    </Button>
  );
};
