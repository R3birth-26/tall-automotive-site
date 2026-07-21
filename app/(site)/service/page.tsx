import { business } from "@/lib/site";
import { ScheduleServiceForm } from "@/components/ScheduleServiceForm";

export default function ServicePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-neutral-900">Schedule Service</h1>
      <p className="mt-2 max-w-2xl text-neutral-600">
        We sell trucks, vans, and Bad Boy Mowers, tractors, and handheld equipment — and we
        specialize in repair, but we service everything that comes through the door. Pick a
        service below, or call to talk it through first.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={business.phoneHref}
          className="rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
        >
          Call {business.phone}
        </a>
        <div className="text-sm text-neutral-600">
          {business.hours.map((h) => (
            <div key={h.days} className="flex gap-2">
              <span className="font-semibold text-neutral-800">{h.days}:</span>
              <span>{h.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <ScheduleServiceForm />
      </div>
    </div>
  );
}
