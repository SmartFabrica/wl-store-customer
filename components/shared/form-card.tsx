import type { ReactNode } from "react";
import { cn } from "cn";

export const FormCard = ({
  title,
  description,
  required,
  action,
  children,
  className,
}: {
  title: string;
  description?: ReactNode;
  required?: boolean;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-card px-6 py-5.5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-[15px] font-bold text-foreground">
            {title}
            {required ? (
              <span aria-hidden className="text-accent">
                {" "}
                *
              </span>
            ) : null}
          </h2>
          {description ? (
            <p className="mt-1 text-[12.5px] text-placeholder">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children ? <div className="mt-3.5">{children}</div> : null}
    </section>
  );
};
