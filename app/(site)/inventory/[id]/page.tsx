import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PhotoGallery } from "@/components/PhotoGallery";
import { money } from "@/components/EquipmentCard";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { business } from "@/lib/site";

export default async function EquipmentDetailPage({ params }: PageProps<"/inventory/[id]">) {
  const { id } = await params;
  const equipment = await prisma.equipment.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  if (!equipment) notFound();

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

  return (
    <div className="relative">
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
                <p className="text-xs uppercase tracking-wide text-white/40">Cash Price</p>
                <p className="font-display text-3xl font-bold text-brand-red">{money(equipment.cashPrice)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">Finance Price</p>
                <p className="font-display text-3xl font-bold text-white">
                  {equipment.financePrice ? money(equipment.financePrice) : "Call for details"}
                </p>
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
