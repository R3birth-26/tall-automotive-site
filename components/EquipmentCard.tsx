import Link from "next/link";
import { GlowCard } from "@/components/ui/glow-card";
import { EquipmentCardActions } from "@/components/EquipmentCardActions";
import { business } from "@/lib/site";

export function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export type EquipmentCardData = {
  id: string;
  category: string;
  year: number | null;
  make: string;
  model: string;
  trim: string | null;
  hours: number | null;
  mileage: number | null;
  condition: string;
  cashPrice: number;
  financePrice: number | null;
  monthlyPrice: number | null;
  status: string;
  photos: { url: string }[];
};

export function EquipmentCard({ equipment }: { equipment: EquipmentCardData }) {
  const photo = equipment.photos[0]?.url ?? "/equipment-placeholder.svg";
  const sold = equipment.status !== "available";
  const alt = `${equipment.year ?? ""} ${equipment.make} ${equipment.model}`;
  const financeExternal = Boolean(business.financeApplicationUrl);
  const financeHref =
    business.financeApplicationUrl || `/financing?unit=${encodeURIComponent(alt.trim())}#apply`;

  return (
    <GlowCard className="group">
      <Link href={`/inventory/${equipment.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
          <img
            src={photo}
            alt={alt}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
          {sold && (
            <span className="absolute left-2 top-2 rounded bg-brand-black px-2 py-1 text-xs font-bold uppercase text-white">
              {equipment.status}
            </span>
          )}
          {equipment.condition === "New" && !sold && (
            <span className="absolute left-2 top-2 rounded bg-brand-red px-2 py-1 text-xs font-bold uppercase text-white">
              New
            </span>
          )}
          <span className="absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-xs font-bold uppercase text-white backdrop-blur">
            {equipment.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-display text-xl font-semibold leading-tight text-white">
            {equipment.year} {equipment.make} {equipment.model}
          </h3>
          {equipment.trim && <p className="text-sm text-white/50">{equipment.trim}</p>}
          {equipment.hours != null && (
            <p className="mt-1 text-xs text-white/40">{equipment.hours.toLocaleString()} hours</p>
          )}
          {equipment.mileage != null && (
            <p className="mt-1 text-xs text-white/40">{equipment.mileage.toLocaleString()} miles</p>
          )}

          <div className="mt-3 flex items-end justify-between border-t border-white/10 pt-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/40">Starting At</p>
              {equipment.monthlyPrice != null ? (
                <p className="font-display text-xl font-bold text-brand-red">
                  {money(equipment.monthlyPrice)}
                  <span className="text-sm font-semibold">/mo</span>
                </p>
              ) : (
                <p className="font-display text-xl font-bold text-brand-red">{money(equipment.cashPrice)}</p>
              )}
            </div>
            <div className="rounded-md border border-brand-red/30 bg-brand-red/10 px-3 py-1.5 text-right">
              <p className="font-display text-sm font-bold uppercase leading-tight text-brand-red">
                0% Interest
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">48 Months</p>
            </div>
          </div>
        </div>
      </Link>

      <EquipmentCardActions
        photos={equipment.photos}
        alt={alt}
        financeHref={financeHref}
        financeExternal={financeExternal}
      />
    </GlowCard>
  );
}
