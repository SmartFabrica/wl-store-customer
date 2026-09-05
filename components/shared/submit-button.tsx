"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "type"> & {
  pending?: boolean;
  children: ReactNode;
};

export const SubmitButton = ({
  pending,
  disabled,
  className,
  children,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className={cn("h-11.5 w-full text-[15px] font-semibold", className)}
      {...props}
    >
      {pending ? <Spinner /> : null}
      {children}
    </Button>
  );
};
