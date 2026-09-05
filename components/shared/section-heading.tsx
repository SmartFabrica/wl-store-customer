import type { ReactNode } from "react";
import { cn } from "cn";

export const SectionHeading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "font-heading text-lg font-bold text-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
};
