import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PhotoGallery } from "@/components/PhotoGallery";
import { money } from "@/components/EquipmentCard";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { business, siteUrl } from "@/lib/site";
import { equipmentSlug, idFromSlug } from "@/lib/slug";

async function getEquipment(slug: string) {
  const id = idFromSlug(slug);
  return prisma.equipment.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });
}

export async function generateMetadata({
  params,
}: PageProps<"/inventory/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const equipment = await getEquipment(slug);
  if (!equipment) return {};

  const title = `${equipment.year ?? ""} ${equipment.make} ${equipment.model}${equipment.trim ? ` ${equipment.trim}` : ""}`.trim();
  const description =
    equipment.description ||
    `${title} — ${equipment.condition} ${equipment.category.toLowerCase()} for sale at ${business.name} in ${business.address.city}, ${business.address.state}. ${money(equipment.cashPrice)} cash price with easy financing available.`;
  const canonicalSlug = equipmentSlug(equipment);
  const image = equipment.photos[0]?.url;

  return {
    title,
    description,
    alternates: { canonical: `/inventory/${canonicalSlug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/inventory/${canonicalSlug}`,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function EquipmentDetailPage({ params }: PageProps<"/inventory/[slug]">) {
  const { slug } = await params;
  const equipment = await getEquipment(slug);

  if (!equipment) notFound();

  const canonicalSlug = equipmentSlug(equipment);
  if (slug !== canonicalSlug) {
    permanentRedirect(`/inventory/${canonicalSlug}`);
  }

  const specs: [string, string | number | null][] = [
    ["Category", equipment.category],
    ["Hours", equipment.hours != null ? `${equipment.hours.toLocaleString()} hrs` : null],
    ["Mileage", equipment.mileage != null ? `${equipment.mileage.toLocaleString()} mi` : null],
    ["Condition", equipment.condition],
    ["Color", equipment.color],
    ["Transmission", equipment.transmission],
    ["Drivetrain", equipment.driveType],
    ["Fuel Type", equipment.fuelType],
    ["Engine", equipment.engine],
    ["Stock #", equipment.stockNumber],
    ["Serial # / VIN", equipment.serialNumber],
  ];

  const sold = equipment.status !== "available";
  const title = `${equipment.year ?? ""} ${equipment.make} ${equipment.model}`.trim();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${title}${equipment.trim ? ` ${equipment.trim}` : ""}`,
    description: equipment.description || title,
    sku: equipment.stockNumber || undefined,
    brand: { "@type": "Brand", name: equipment.make },
    category: equipment.category,
    image: equipment.photos.map((p) => (p.url.startsWith("http") ? p.url : `${siteUrl}${p.url}`)),
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/inventory/${canonicalSlug}`,
      priceCurrency: "USD",
      price: equipment.cashPrice,
      availability:
        equipment.status === "available"
          ? "https://schema.org/InStock"
          : equipment.status === "pending"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/OutOfStock",
      itemCondition:
        equipment.condition === "New"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",
    },
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <FixedGradientBackground />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <PhotoGallery
            photos={equipment.photos}
            alt={`${equipment.year ?? ""} ${equipment.make} ${equipment.model}`}
          />

          <div>
            {sold && (
              <span className="mb-3 inline-block rounded bg-brand-red px-3 py-1 text-xs font-bold uppercase text-white">
                {equipment.status}
              </span>
            )}
            <h1 className="font-display text-4xl font-bold text-white">
              {equipment.year} {equipment.make} {equipment.model}
            </h1>
            {equipment.trim && <p className="mt-1 text-lg text-white/50">{equipment.trim}</p>}

            <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">Starting At</p>
                {equipment.monthlyPrice != null ? (
                  <>
                    <p className="font-display text-3xl font-bold text-brand-red">
                      {money(equipment.monthlyPrice)}
                      <span className="text-lg font-semibold">/mo</span>
                    </p>
                    <p className="mt-1 text-xs text-white/40">{money(equipment.cashPrice)} cash price</p>
                  </>
                ) : (
                  <p className="font-display text-3xl font-bold text-brand-red">{money(equipment.cashPrice)}</p>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">Financing</p>
                <p className="font-display text-2xl font-bold text-white">Easy Financing</p>
                <p className="text-sm font-semibold text-white/60">Through Sheffield Financial</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={business.phoneHref}
                className="rounded-md bg-brand-red px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
              >
                Call {business.phone}
              </a>
              <a
                href={business.smsHref}
                className="rounded-md border border-white/20 px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-white/5"
              >
                Text Us
              </a>
              <a
                href={business.financeApplicationUrl || `/financing?unit=${encodeURIComponent(`${equipment.year ?? ""} ${equipment.make} ${equipment.model}`.trim())}#apply`}
                target={business.financeApplicationUrl ? "_blank" : undefined}
                rel={business.financeApplicationUrl ? "noreferrer" : undefined}
                className="rounded-md border border-brand-red/40 bg-brand-red/10 px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-brand-red hover:bg-brand-red/20"
              >
                Apply for Financing
              </a>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm">
              {specs
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-white/10 pb-2">
                    <dt className="text-white/50">{label}</dt>
                    <dd className="font-medium text-white">{value}</dd>
                  </div>
                ))}
            </dl>

            {equipment.description && (
              <div className="mt-6">
                <h2 className="font-display text-xl font-bold text-white">Description</h2>
                <p className="mt-2 whitespace-pre-line text-white/60">{equipment.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
