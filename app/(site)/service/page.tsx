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
import { TestimonialSection } from "@/components/ui/testimonial-section";
import { DraftNotice } from "@/components/DraftNotice";
import { testimonials } from "@/lib/testimonials";

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

      <section className="px-4 py-16 sm:px-6">
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
              handheld equipment — but we service everything that comes through the door, whether
              you bought it from us or not.
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

        <div className="mx-auto mt-12 max-w-5xl">
          <h3 className="font-display text-center text-2xl font-bold uppercase tracking-wide text-white">
            Come to Us For
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {repairServices.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-brand-red/50 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/40 transition group-hover:border-brand-red/60">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-semibold leading-tight text-neutral-200">
                  {label}
                </span>
              </div>
            ))}
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

      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
        <DraftNotice>
          Sample testimonials below — swap in real customer reviews before this goes live.
        </DraftNotice>
      </div>
      <TestimonialSection testimonials={testimonials} />
    </div>
  );
}
