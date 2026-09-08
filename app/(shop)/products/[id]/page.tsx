import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoIcon } from "lucide-react";

import { CompatibleModels } from "@/components/product/compatible-models";
import { CopyMpnButton } from "@/components/product/copy-mpn-button";
import { ProductActions } from "@/components/product/product-actions";
import { ProductGallery } from "@/components/product/product-gallery";
import { SpecTable } from "@/components/product/spec-table";
import { PriceDisplay } from "@/components/shared/price-display";
import { ProductCard } from "@/components/shared/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { SiteHeader } from "@/components/shared/site-header";
import { StockBadge } from "@/components/shared/stock-badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getProductById,
  getProductDetail,
  getSimilarProducts,
} from "@/lib/catalog/data";
import { buildCatalogHref, parseCatalogFilters } from "@/lib/catalog/filters";
import { CATALOG_PATH } from "@/lib/routes";

export const generateMetadata = async ({
  params,
}: PageProps<"/products/[id]">): Promise<Metadata> => {
  const product = getProductById((await params).id);
  if (!product) return { title: "Ürün bulunamadı" };

  return {
    title: product.name,
    description: `${product.brand} · ${product.mpn} — ${product.category}`,
  };
};

const ProductDetailPage = async ({ params }: PageProps<"/products/[id]">) => {
  const product = getProductById((await params).id);
  if (!product) notFound();

  const detail = getProductDetail();
  const similar = getSimilarProducts(product);

  const categoryHref = buildCatalogHref({
    ...parseCatalogFilters({}),
    category: product.category,
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-295 px-5 pt-6 pb-14 sm:px-7">
        <Breadcrumb className="mb-5.5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href={CATALOG_PATH} />}>
                Katalog
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href={categoryHref} />}>
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-6.5 lg:grid-cols-2 lg:gap-10">
          <ProductGallery imageLabels={detail.imageLabels} />

          <div>
            <h1 className="mb-3 font-heading text-[27px] leading-tight font-bold text-foreground">
              {product.name}
            </h1>

            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-lg bg-muted px-2.75 py-1.25 text-xs font-semibold text-slate-600">
                Marka: {product.brand}
              </span>
              <span className="rounded-lg bg-muted px-2.75 py-1.25 text-xs font-semibold text-slate-600">
                {product.category}
              </span>
              <StockBadge inStock={product.inStock} />
            </div>

            <div className="mb-5.5 flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[13px] font-medium text-muted-foreground">
                MPN: {product.mpn}
              </span>
              <CopyMpnButton mpn={product.mpn} />
            </div>

            <div className="mb-4.5 rounded-xl border border-border bg-card px-5 py-4.5">
              <PriceDisplay price={product.price} size="lg" />
            </div>

            <ProductActions product={product} />

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-placeholder">
              <InfoIcon
                aria-hidden
                className="mt-0.25 size-3.5 flex-none text-accent"
              />
              Bu bir sipariş değil, teklif akışıdır. Gösterilen fiyat referans
              amaçlıdır; nihai fiyat teklifte netleşir.
            </p>
          </div>
        </div>

        <section className="mt-11">
          <SectionHeading className="mb-3.5">Açıklama</SectionHeading>
          <div className="rounded-xl border border-border bg-card px-6 py-5.5">
            <p className="max-w-190 text-[14.5px] leading-[1.75] text-slate-600">
              {detail.description}
            </p>
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading className="mb-3.5">Teknik özellikler</SectionHeading>
          <SpecTable specs={detail.specs} />
        </section>

        <section className="mt-10">
          <CompatibleModels groups={detail.compatibility} />
        </section>

        {similar.length > 0 ? (
          <section className="mt-11">
            <SectionHeading className="mb-4">Benzer ürünler</SectionHeading>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1.5">
              {similar.map((item) => (
                <ProductCard key={item.id} product={item} variant="compact" />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetailPage;
