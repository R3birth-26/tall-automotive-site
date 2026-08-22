"use client";

import { useState, type FormEvent } from "react";

// TODO: replace with Tall Equipment and Machinery's own Web3Forms access key
// (web3forms.com) so service requests land in the shop's inbox, not a
// placeholder. Runs in demo mode (no network call) until this is set.
const WEB3FORMS_KEY = "";

export const SERVICE_TYPES = [
  { title: "Equipment Repair" },
  { title: "Diagnostics" },
  { title: "Routine Maintenance" },
  { title: "Parts & Accessories" },
] as const;

export function ScheduleServiceForm() {
  const [serviceType, setServiceType] = useState<string>(SERVICE_TYPES[0].title);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!WEB3FORMS_KEY) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-brand-red focus:outline-none [color-scheme:dark]";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400";

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-green-300">
          Thanks! We received your request and will call to confirm a time.
          {!WEB3FORMS_KEY && (
            <p className="mt-2 text-xs text-green-400">
              (Demo mode — connect a Web3Forms key to actually deliver submissions.)
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
        Book a Visit
      </p>
      <h2 className="font-display mt-1 text-2xl font-bold text-white">Request an Appointment</h2>
      <p className="mt-1 text-sm text-neutral-400">
        Tell us what&apos;s going on and we&apos;ll call to confirm a time.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input type="hidden" name="serviceType" value={serviceType} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Name</label>
            <input name="name" required className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input name="phone" required className={fieldClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input type="email" name="email" required className={fieldClass} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Service Type</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className={fieldClass}
            >
              {SERVICE_TYPES.map((s) => (
                <option key={s.title} value={s.title} className="bg-neutral-900">
                  {s.title}
                </option>
              ))}
              <option value="Other" className="bg-neutral-900">
                Other
              </option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Preferred Date</label>
            <input type="date" name="preferredDate" className={fieldClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Equipment</label>
          <input name="itemDescription" placeholder="e.g. Bad Boy Mower ELITE 54" className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>What&apos;s going on?</label>
          <textarea
            name="message"
            rows={4}
            className={`${fieldClass} rounded-3xl`}
            placeholder="Describe the issue or the service you need"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-400">Something went wrong — please call us instead.</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-red-dark disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Request Appointment"}
        </button>
      </form>
    </div>
  );
}
