"use client";

import type { ReactNode } from "react";
import { cn } from "cn";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
};

export const FieldShell = ({
  id,
  label,
  required,
  error,
  className,
  children,
}: FieldShellProps) => {
  return (
    <Field data-invalid={error ? true : undefined} className={cn(className)}>
      <FieldLabel
        htmlFor={id}
        className={cn(
          "text-xs font-semibold",
          required ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
        {required ? (
          <span aria-hidden className="text-accent">
            *
          </span>
        ) : null}
      </FieldLabel>
      {children}
      <FieldError>{error}</FieldError>
    </Field>
  );
};

export const controlClassName =
  "rounded-lg border-border bg-card px-3.5 text-sm placeholder:text-placeholder";
