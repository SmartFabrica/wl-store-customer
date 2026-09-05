"use client";

import type { ComponentProps } from "react";
import { cn } from "cn";

import { Input } from "@/components/ui/input";
import {
  FieldShell,
  controlClassName,
  type FieldShellProps,
} from "@/components/shared/field-shell";

type TextFieldProps = Omit<ComponentProps<typeof Input>, "id"> &
  Pick<FieldShellProps, "id" | "label" | "required" | "error">;

export const TextField = ({
  id,
  label,
  required,
  error,
  className,
  ...props
}: TextFieldProps) => {
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <Input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(controlClassName, "h-11", className)}
        {...props}
      />
    </FieldShell>
  );
};
