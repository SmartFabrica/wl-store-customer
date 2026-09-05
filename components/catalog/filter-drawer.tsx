"use client";

import { useState, type ReactNode } from "react";
import { SlidersHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const FilterDrawer = ({
  activeCount,
  children,
}: {
  activeCount: number;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="h-9.5 gap-2 rounded-lg bg-card px-3.5 text-[13px] font-semibold lg:hidden"
          />
        }
      >
        <SlidersHorizontalIcon className="size-3.75 text-slate-600" />
        Filtrele{activeCount > 0 ? ` (${activeCount})` : ""}
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-82.5 max-w-[86vw] gap-0 overflow-auto p-0 sm:max-w-[86vw]"
      >
        <SheetHeader className="sticky top-0 z-10 border-b border-border bg-popover px-5 py-4">
          <SheetTitle className="font-heading text-[15px] font-bold">
            Filtreler
          </SheetTitle>
        </SheetHeader>
        <div onClick={() => setOpen(false)}>{children}</div>
      </SheetContent>
    </Sheet>
  );
};
