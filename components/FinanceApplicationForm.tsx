"use client";

import { useState, type FormEvent } from "react";

// TODO: replace with Tall Equipment and Machinery's own Web3Forms access key (web3forms.com)
// so finance applications land in the shop's inbox, not a placeholder. Runs in
// demo mode (no network call) until this is set.
const WEB3FORMS_KEY = "";

export function FinanceApplicationForm({ defaultUnit }: { defaultUnit?: string }) {
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
    "mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-brand-red focus:outline-none";
  const labelClass = "block text-sm font-medium text-neutral-300";

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-6 text-green-300">
        Thanks! We received your application and will follow up shortly.
        {!WEB3FORMS_KEY && (
          <p className="mt-2 text-xs text-green-400">
            (Demo mode — connect a Web3Forms key to actually deliver submissions.)
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div>
        <label className={labelClass}>Unit of Interest</label>
        <input
          name="unit"
          defaultValue={defaultUnit}
          placeholder="e.g. 2026 Bad Boy Mowers ZT Elite"
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass}>Additional Details</label>
        <textarea
          name="message"
          rows={4}
          className={fieldClass}
          placeholder="Desired down payment, trade-in, or anything else we should know"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong — please call us instead.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark disabled:opacity-60"
      >
        {status === "sending" ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
