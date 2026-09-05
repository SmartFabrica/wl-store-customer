"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AccountType } from "@/lib/validations/auth";

const OPTIONS: { value: AccountType; label: string }[] = [
  { value: "corporate", label: "Kurumsal" },
  { value: "individual", label: "Bireysel" },
];

export const AccountTypeTabs = ({
  value,
  onValueChange,
}: {
  value: AccountType;
  onValueChange: (value: AccountType) => void;
}) => {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onValueChange(next as AccountType)}
    >
      <TabsList className="h-auto w-full gap-2 rounded-xl bg-muted p-1.5">
        {OPTIONS.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className="h-10 rounded-[9px] text-sm font-semibold data-active:border-warning-border data-active:bg-card data-active:text-accent"
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
