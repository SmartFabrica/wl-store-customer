import { cn } from "cn";

import type { SpecRow } from "@/lib/catalog/types";

export const SpecTable = ({ specs }: { specs: SpecRow[] }) => {
  return (
    <dl className="overflow-hidden rounded-xl border border-border bg-card">
      {specs.map((spec, index) => (
        <div
          key={spec.label}
          className={cn(
            "flex gap-4 px-5 py-3",
            index % 2 === 1 && "bg-background",
            index < specs.length - 1 && "border-b border-border/70",
          )}
        >
          <dt className="basis-11/25 text-[13.5px] font-medium text-muted-foreground">
            {spec.label}
          </dt>
          <dd className="flex-1 font-mono text-[13.5px] font-semibold text-foreground">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
