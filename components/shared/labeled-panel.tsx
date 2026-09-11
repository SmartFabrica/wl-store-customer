import type { ReactNode } from "react";
import { cn } from "cn";

export const LabeledPanel = ({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card px-5 py-4.5",
        className,
      )}
    >
      <p className="mb-2.25 text-[11px] font-semibold tracking-[0.5px] text-placeholder uppercase">
        {label}
      </p>
      {children}
    </div>
  );
};
