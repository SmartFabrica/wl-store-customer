import Link from "next/link";
import { cn } from "cn";

import { QUOTE_STATUS_META } from "@/lib/quotes/data";
import {
  buildQuotesHref,
  countByStatus,
  type QuoteStatusFilter,
} from "@/lib/quotes/filters";
import { QUOTE_STATUSES } from "@/lib/quotes/types";

const TABS: { value: QuoteStatusFilter; label: string }[] = [
  { value: null, label: "Tümü" },
  ...QUOTE_STATUSES.map((status) => ({
    value: status as QuoteStatusFilter,
    label: QUOTE_STATUS_META[status].tabLabel,
  })),
];

export const StatusFilterTabs = ({ active }: { active: QuoteStatusFilter }) => {
  return (
    <nav
      aria-label="Teklif durumu"
      className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1"
    >
      {TABS.map((tab) => {
        const isActive = tab.value === active;
        const count = countByStatus(tab.value);

        return (
          <Link
            key={tab.label}
            href={buildQuotesHref(tab.value)}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex flex-none items-center gap-2 rounded-lg border px-3.75 py-2.25 text-[13px] font-semibold whitespace-nowrap transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
              isActive
                ? "border-warning-border bg-warning text-warning-foreground"
                : "border-border bg-card text-slate-600 hover:border-placeholder/40",
            )}
          >
            {tab.label}
            <span
              className={cn(
                "rounded-md px-1.5 py-px font-mono text-[10.5px] font-semibold",
                isActive
                  ? "bg-accent/15 text-accent"
                  : "bg-muted text-placeholder",
              )}
            >
              {count}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
