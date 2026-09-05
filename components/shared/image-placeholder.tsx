import { cn } from "cn";

// Görsel servisi bağlanana kadar kullanılan çapraz taramalı yer tutucu.
export const ImagePlaceholder = ({
  label,
  className,
  labelClassName,
  children,
}: {
  label: string;
  className?: string;
  labelClassName?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-[repeating-linear-gradient(45deg,var(--muted)_0_9px,var(--border)_9px_18px)]",
        className,
      )}
    >
      <span
        className={cn(
          "font-mono text-[10px] font-medium tracking-[0.5px] text-placeholder",
          labelClassName,
        )}
      >
        {label}
      </span>
      {children}
    </div>
  );
};
