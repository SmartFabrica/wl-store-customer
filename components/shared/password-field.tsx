"use client";

import { useId, useState, type ComponentProps } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FieldShell,
  controlClassName,
  type FieldShellProps,
} from "@/components/shared/field-shell";

type PasswordFieldProps = Omit<ComponentProps<typeof Input>, "id" | "type"> &
  Pick<FieldShellProps, "id" | "label" | "required" | "error">;

export const PasswordField = ({
  id,
  label,
  required,
  error,
  className,
  ...props
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);
  const toggleId = useId();

  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={toggleId}
          className={cn(controlClassName, "h-11 pr-11", className)}
          {...props}
        />
        <Button
          id={toggleId}
          type="button"
          variant="ghost"
          size="icon-sm"
          tabIndex={-1}
          aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}
          onClick={() => setVisible((current) => !current)}
          className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </div>
    </FieldShell>
  );
};
