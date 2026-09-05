"use client";

import { PlusIcon } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";

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
  return (
    <Button
      type="button"
      aria-label={`${productName} ürününü sepete ekle`}
      onClick={() => {
        // TODO: Sepet API'si bağlanacak.
        console.info("sepete ekle", productId, quantity);
      }}
      className={cn("w-full gap-1.5 font-semibold", className)}
    >
      <PlusIcon className={cn("size-3.75", iconClassName)} strokeWidth={2.2} />
      Sepete ekle
    </Button>
  );
};
