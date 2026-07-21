"use client";

import { useRef, useState, type FormEvent } from "react";

// TODO: replace with Tall Automotive's own Web3Forms access key (web3forms.com)
// so service requests land in the shop's inbox, not a placeholder. Runs in
// demo mode (no network call) until this is set.
const WEB3FORMS_KEY = "";

export const SERVICE_TYPES = [
  {
    title: "Auto & Truck Repair",
    body: "Full-service repair and maintenance for cars and trucks — brakes, suspension, electrical, and more.",
  },
  {
    title: "Diagnostics",
    body: "Computer diagnostics to track down check-engine lights and drivability issues.",
  },
  {
    title: "Equipment Service",
    body: "Tune-ups, repairs, and maintenance for mowers, tractors, and handheld equipment — Bad Boy and other brands.",
  },
  {
    title: "Parts & Accessories",
    body: "Genuine parts and accessories for vehicles and Bad Boy equipment.",
  },
] as const;

export function ScheduleServiceForm() {
  const [serviceType, setServiceType] = useState<string>(SERVICE_TYPES[0].title);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLDivElement>(null);

  function selectService(title: string) {
    setServiceType(title);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {SERVICE_TYPES.map((s) => (
          <button
            key={s.title}
            type="button"
            onClick={() => selectService(s.title)}
            className={`rounded-lg border p-6 text-left transition ${
              serviceType === s.title
                ? "border-brand-red bg-red-50"
                : "border-neutral-200 bg-white hover:border-neutral-300"
            }`}
          >
            <h2 className="font-display text-lg font-bold text-neutral-900">{s.title}</h2>
            <p className="mt-2 text-sm text-neutral-600">{s.body}</p>
          </button>
        ))}
      </div>

      <div ref={formRef} className="mt-10 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold text-neutral-900">Request an Appointment</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Selected: <span className="font-semibold text-brand-red">{serviceType}</span>
        </p>

        {status === "sent" ? (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-6 text-green-800">
            Thanks! We received your request and will call to confirm a time.
            {!WEB3FORMS_KEY && (
              <p className="mt-2 text-xs text-green-700">
                (Demo mode — connect a Web3Forms key to actually deliver submissions.)
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 rounded-lg border border-neutral-200 bg-white p-6">
            <input type="hidden" name="serviceType" value={serviceType} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Name</label>
                <input name="name" required className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Phone</label>
                <input name="phone" required className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
                >
                  {SERVICE_TYPES.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Preferred Date</label>
                <input type="date" name="preferredDate" className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">Vehicle or Equipment</label>
              <input
                name="itemDescription"
                placeholder="e.g. 2019 RAM 2500, or Bad Boy Mower ELITE 54"
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">What's going on?</label>
              <textarea
                name="message"
                rows={4}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
                placeholder="Describe the issue or the service you need"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600">Something went wrong — please call us instead.</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Request Appointment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
