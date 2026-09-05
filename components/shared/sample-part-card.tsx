export type SamplePart = {
  mpn: string;
  name: string;
  brand: string;
  category: string;
  compatibleModels: string;
};

export const SamplePartCard = ({ part }: { part: SamplePart }) => {
  return (
    <div className="rounded-xl bg-card p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
      <div className="flex items-start gap-3">
        <div
          aria-hidden
          className="flex size-14 flex-none items-center justify-center rounded-[10px] bg-[repeating-linear-gradient(45deg,var(--muted)_0_7px,var(--border)_7px_14px)] text-center font-mono text-[8px] font-medium text-placeholder"
        >
          GÖRSEL
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[11px] font-semibold tracking-[0.3px] text-primary">
            {part.mpn}
          </div>
          <div className="mt-1 font-heading text-sm leading-tight font-semibold text-card-foreground">
            {part.name}
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        <span className="rounded-[7px] bg-muted px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">
          Marka: {part.brand}
        </span>
        <span className="rounded-[7px] bg-muted px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">
          Kategori: {part.category}
        </span>
      </div>

      <div className="mt-3 border-t border-border/70 pt-3">
        <div className="mb-1.5 text-[10px] font-medium tracking-[0.5px] text-placeholder uppercase">
          Model uyumu
        </div>
        <div className="font-mono text-xs leading-relaxed font-medium text-slate-600">
          {part.compatibleModels}
        </div>
      </div>
    </div>
  );
};
