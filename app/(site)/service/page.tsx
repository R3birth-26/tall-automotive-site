import {
  ClipboardCheck,
  Wrench,
  Droplets,
  Cog,
  Fuel,
  Battery,
  Filter,
  RotateCw,
  Snowflake,
  Gauge,
} from "lucide-react";
import { business } from "@/lib/site";
import { ScheduleServiceForm } from "@/components/ScheduleServiceForm";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";

const repairServices = [
  { label: "Equipment Checkup / Inspection", icon: ClipboardCheck },
  { label: "Blade Sharpening & Balancing", icon: Wrench },
  { label: "Oil & Filter Change", icon: Droplets },
  { label: "Belt & Deck Service", icon: Cog },
  { label: "Hydraulic System Service", icon: Gauge },
  { label: "Fuel System Service", icon: Fuel },
  { label: "Electrical & Battery Service", icon: Battery },
  { label: "Filter Replacement", icon: Filter },
  { label: "Tire & Wheel Service", icon: RotateCw },
  { label: "Winterization & Storage Prep", icon: Snowflake },
];

export default function ServicePage() {
  return (
    <div className="relative">
      <FixedGradientBackground />

      <section className="relative overflow-hidden">
        <img
          src="/images/mower-service-hero.jpg"
          alt="Bad Boy zero-turn mower up on a lift in the Tall Equipment and Machinery shop"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
                Hampstead, NH
              </p>
              <h1 className="font-display mt-3 text-5xl font-bold leading-tight text-white sm:text-6xl">
                Equipment &amp; Machinery Service Done Right
              </h1>
              <p className="mt-4 max-w-xl text-lg text-neutral-300">
                Specializing in maintenance, diagnostics, and repair for mowers, tractors, and
                handheld equipment — but we service everything that comes through the door,
                whether you bought it from us or not.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={business.phoneHref}
                  className="rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
                >
                  Call {business.phone}
                </a>
                <a
                  href={business.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-white/30 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div>
              <ScheduleServiceForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-brand-black px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
            Founded 2016
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold text-white sm:text-5xl">
            Equipment &amp; Machinery Service in Hampstead
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-neutral-300">
            {business.name} is a locally owned and operated equipment and machinery service
            facility based in New Hampshire, built on nearly two decades of hands-on industry
            experience. We specialize in the maintenance, diagnostics, and repair of mowers,
            tractors, and handheld equipment, delivering reliable, high-quality service with a
            straightforward, no-nonsense approach. From routine maintenance to complex repairs,
            every piece of equipment is handled with precision to keep customers up and running.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <h3 className="font-display text-center text-2xl font-bold uppercase tracking-wide text-white">
            Come to Us For
          </h3>
          <div className="mt-6 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/images/mower-repair-2.png"
                alt="Bad Boy mower service and repair"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              {repairServices.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-brand-red/50 hover:bg-white/10"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 transition group-hover:border-brand-red/60">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold leading-tight text-neutral-200">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-neutral-300">
          Whether you purchased your equipment from us or not, we are here to help! Call us today
          and let us show you how we&apos;ve built a better way.
        </p>
        <div className="mt-6 flex justify-center">
          <a
            href={business.phoneHref}
            className="rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
          >
            Schedule Service Today
          </a>
        </div>
      </section>
    </div>
  );
}
