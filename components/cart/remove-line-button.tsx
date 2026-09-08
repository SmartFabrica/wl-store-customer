"use client";

import { useTransition } from "react";
import { Trash2Icon } from "lucide-react";

import { removeFromCart } from "@/app/(shop)/_actions/cart-actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export const RemoveLineButton = ({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) => {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={pending}
      aria-label={`${productName} ürününü sepetten kaldır`}
      onClick={() =>
        startTransition(async () => {
          await removeFromCart(productId);
        })
      }
      className="gap-1.5 px-1.5 text-[12.5px] font-semibold text-placeholder hover:bg-transparent hover:text-destructive"
    >
      {pending ? (
        <Spinner className="size-3.75" />
      ) : (
        <Trash2Icon className="size-3.75" />
      )}
      Kaldır
    </Button>
  );
};
