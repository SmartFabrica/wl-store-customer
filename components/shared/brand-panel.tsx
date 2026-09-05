import { BrandLogo } from "@/components/shared/brand-logo";
import {
  SamplePartCard,
  type SamplePart,
} from "@/components/shared/sample-part-card";
import { BRAND_DESCRIPTION, BRAND_TAGLINE } from "@/lib/brand";

const SHOWCASE_PART: SamplePart = {
  mpn: "MPN-4471-XG",
  name: "Hidrolik Pompa Contası",
  brand: "Bosch",
  category: "Sızdırmazlık",
  compatibleModels: "CX-220 · CX-240 · LT-90 Serisi",
};

export const BrandPanel = () => {
  return (
    <aside className="relative hidden flex-col overflow-hidden bg-linear-160 from-brand-from via-brand-via to-brand-to px-10 py-11 text-white lg:flex">
      <BrandLogo />

      <div className="mt-13">
        <h2 className="max-w-75 font-heading text-2xl leading-tight font-bold text-balance">
          {BRAND_TAGLINE}
        </h2>
        <p className="mt-3.5 max-w-75 text-sm leading-relaxed text-white/80">
          {BRAND_DESCRIPTION}
        </p>
      </div>

      <div className="mt-auto pt-12">
        <div className="mb-3 font-mono text-[11px] font-medium tracking-[0.6px] text-white/60 uppercase">
          Örnek parça
        </div>
        <SamplePartCard part={SHOWCASE_PART} />
      </div>
    </aside>
  );
};
