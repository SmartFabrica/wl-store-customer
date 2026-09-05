import type { ReactNode } from "react";
import { cn } from "cn";

export const AuthHeading = ({
  title,
  description,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mb-7", className)}>
      <h1 className="font-heading text-[28px] leading-tight font-bold text-foreground">
        {title}
      </h1>
      {description ? (
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
};
