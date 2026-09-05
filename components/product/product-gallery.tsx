"use client";

import { useState } from "react";
import { cn } from "cn";

import { ImagePlaceholder } from "@/components/shared/image-placeholder";

export const ProductGallery = ({ imageLabels }: { imageLabels: string[] }) => {
  const [active, setActive] = useState(0);

  return (
    <div>
      <ImagePlaceholder
        label={imageLabels[active]}
        className="aspect-square rounded-xl border border-border"
        labelClassName="text-xs"
      />

      <div className="mt-3.5 flex gap-2.5">
        {imageLabels.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            className={cn(
              "flex size-17.5 flex-none items-center justify-center rounded-[10px] border-2 bg-[repeating-linear-gradient(45deg,var(--muted)_0_7px,var(--border)_7px_14px)] transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
              index === active ? "border-primary" : "border-border",
            )}
          >
            <span className="font-mono text-[8px] font-medium text-placeholder">
              {index + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
