"use client";

import { useId, useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCount } from "@/lib/format";
import type { CompatibilityGroup } from "@/lib/catalog/types";

const COLLAPSED_PER_BRAND = 3;

export const CompatibleModels = ({
  groups,
}: {
  groups: CompatibilityGroup[];
}) => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const searchId = useId();

  const totalCount = useMemo(
    () => groups.reduce((total, group) => total + group.models.length, 0),
    [groups],
  );

  const searching = query.trim().length > 0;

  const matched = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("tr");
    if (!needle) return groups;
    return groups
      .map((group) => ({
        ...group,
        models: group.models.filter((model) =>
          model.toLocaleLowerCase("tr").includes(needle),
        ),
      }))
      .filter((group) => group.models.length > 0);
  }, [groups, query]);

  const collapsed = !expanded && !searching;
  const shownWhenCollapsed = matched.reduce(
    (total, group) =>
      total + Math.min(COLLAPSED_PER_BRAND, group.models.length),
    0,
  );
  const canExpand = !searching && totalCount > shownWhenCollapsed;

  return (
    <div className="rounded-2xl border border-border bg-card p-6.5 shadow-[0_4px_18px_rgba(31,41,55,0.05)]">
      <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
        <span aria-hidden className="h-5.5 w-1.25 rounded-sm bg-accent" />
        <h2 className="font-heading text-[19px] font-bold text-foreground">
          Uyumlu modeller
        </h2>
        <span className="rounded-full border border-warning-border bg-warning px-2.5 py-0.75 text-xs font-semibold text-warning-foreground">
          {formatCount(totalCount)} model
        </span>
      </div>
      <p className="mb-4.5 text-[13px] leading-relaxed text-placeholder">
        Bu parçanın uyduğu marka ve modeller. Doğru parçayı seçtiğinizden emin
        olmak için modelinizi arayın.
      </p>

      <div className="relative mb-5 max-w-90">
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-3.75 -translate-y-1/2 text-placeholder"
        />
        <Input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Model ara"
          aria-label="Uyumlu model ara"
          className="h-10 rounded-lg bg-background pr-3 pl-9 text-[13.5px] placeholder:text-placeholder focus-visible:bg-card"
        />
      </div>

      {matched.length === 0 ? (
        <p className="py-1 text-[13px] text-placeholder">
          Aramanızla eşleşen model bulunamadı.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {matched.map((group) => {
            const models = collapsed
              ? group.models.slice(0, COLLAPSED_PER_BRAND)
              : group.models;

            return (
              <div key={group.brand}>
                <div className="mb-2.5 flex items-baseline gap-2">
                  <h3 className="font-heading text-sm font-bold text-foreground">
                    {group.brand}
                  </h3>
                  <span className="font-mono text-[11px] font-medium text-placeholder">
                    {group.models.length} model
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {models.map((model) => (
                    <li
                      key={model}
                      className="rounded-lg border border-border bg-background px-2.75 py-1.5 font-mono text-[12.5px] font-semibold text-slate-600"
                    >
                      {model}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {canExpand || expanded ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setExpanded((value) => !value)}
          className="mt-5 h-10 bg-card px-4.5 text-[13px] font-semibold text-primary hover:border-primary"
        >
          {expanded
            ? "Daha az göster"
            : `Tüm modelleri göster (${formatCount(totalCount)})`}
        </Button>
      ) : null}
    </div>
  );
};
