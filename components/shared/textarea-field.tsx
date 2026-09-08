"use client";

import type { ComponentProps } from "react";
import { cn } from "cn";

import { Textarea } from "@/components/ui/textarea";
import {
  FieldShell,
  controlClassName,
  type FieldShellProps,
} from "@/components/shared/field-shell";

type TextareaFieldProps = Omit<ComponentProps<typeof Textarea>, "id"> &
  Pick<FieldShellProps, "id" | "label" | "required" | "error" | "labelHidden">;

export const TextareaField = ({
  id,
  label,
  required,
  error,
  labelHidden,
  className,
  ...props
}: TextareaFieldProps) => {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      error={error}
      labelHidden={labelHidden}
    >
      <Textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(controlClassName, "min-h-20 py-2.5", className)}
        {...props}
      />
    </FieldShell>
  );
};
