"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

import { AddToCartButton } from "@/components/shared/add-to-cart-button";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/catalog/types";

export const ProductActions = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <div className="mb-3.5 flex items-center gap-3.5">
        <span className="text-[13px] font-semibold text-foreground">Adet</span>
        <div className="inline-flex items-center overflow-hidden rounded-lg border border-border bg-card">
          <Button
            type="button"
            variant="ghost"
            aria-label="Azalt"
            disabled={quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="h-10.5 w-10 rounded-none text-slate-600"
          >
            <MinusIcon className="size-4" />
          </Button>
          <span
            aria-live="polite"
            className="min-w-11.5 text-center font-mono text-[15px] font-semibold text-foreground"
          >
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            aria-label="Artır"
            onClick={() => setQuantity((value) => value + 1)}
            className="h-10.5 w-10 rounded-none text-slate-600"
          >
            <PlusIcon className="size-4" />
          </Button>
        </div>
      </div>

      <AddToCartButton
        productId={product.id}
        productName={product.name}
        quantity={quantity}
        className="h-13 gap-2 text-[15px]"
        iconClassName="size-4"
      />
    </div>
  );
};
