import type { ReactNode } from "react";
import { cn } from "cn";

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  variant = "plain",
  className,
}: {
  icon: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  variant?: "plain" | "boxed";
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center px-6 text-center",
        variant === "boxed" &&
          "rounded-xl border border-dashed border-border bg-card py-16",
        className,
      )}
    >
      <span className="mb-5 flex size-21 items-center justify-center rounded-full bg-muted text-placeholder">
        {icon}
      </span>
      <h2 className="font-heading text-[22px] font-bold text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-2.5 max-w-105 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
};
