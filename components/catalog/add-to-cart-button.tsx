"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Sepete ekleme. TODO: Sepet servisi bağlanınca gerçek mutasyona bağlanacak. */
export const AddToCartButton = ({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) => {
  return (
    <Button
      type="button"
      aria-label={`${productName} ürününü sepete ekle`}
      onClick={() => {
        // TODO: Sepet API'si bağlanacak.
        console.info("sepete ekle", productId);
      }}
      className="mt-3.5 h-10 w-full gap-1.5 text-[13.5px] font-semibold"
    >
      <PlusIcon className="size-3.75" strokeWidth={2.2} />
      Sepete ekle
    </Button>
  );
};
