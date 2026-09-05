"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CopyMpnButton = ({ mpn }: { mpn: string }) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(mpn);
    } catch {
      return;
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1400);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      onClick={copy}
      aria-label="MPN kopyala"
      className="gap-1.5 bg-card text-[11px] font-semibold text-muted-foreground hover:text-foreground"
    >
      {copied ? (
        <CheckIcon className="size-3.25" />
      ) : (
        <CopyIcon className="size-3.25" />
      )}
      {copied ? "Kopyalandı" : "Kopyala"}
    </Button>
  );
};
