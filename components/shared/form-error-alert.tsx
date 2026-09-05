import { AlertCircleIcon } from "lucide-react";
import { cn } from "cn";

import { Alert, AlertTitle } from "@/components/ui/alert";

export const FormErrorAlert = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
  if (!message) return null;

  return (
    <Alert
      variant="destructive"
      aria-live="polite"
      className={cn(
        "border-destructive/30 bg-destructive/5 px-3 py-2.5",
        className,
      )}
    >
      <AlertCircleIcon />
      <AlertTitle className="font-normal">{message}</AlertTitle>
    </Alert>
  );
};
