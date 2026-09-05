import type { ReactNode } from "react";
import { cn } from "cn";

export const FilterSection = ({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn("mb-6", className)}>
      <h3 className="mb-2.5 text-[11px] font-semibold tracking-[0.5px] text-placeholder uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
};

export const FilterLockedHint = ({ children }: { children: ReactNode }) => {
  return (
    <p className="rounded-[9px] border border-dashed border-border bg-background px-3 py-2.5 text-[12.5px] leading-relaxed text-placeholder">
      {children}
    </p>
  );
};
