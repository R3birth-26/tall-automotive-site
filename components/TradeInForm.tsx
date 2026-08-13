"use client";

import { useState, type FormEvent } from "react";

// TODO: replace with Tall Equipment and Machinery's own Web3Forms access key (web3forms.com)
// so trade-in leads land in the dealership's inbox, not a placeholder. Runs in
// demo mode (no network call) until this is set.
const WEB3FORMS_KEY = "";

export function TradeInForm() {
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

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-800">
        Thanks! We received your info and will reach out shortly.
        {!WEB3FORMS_KEY && (
          <p className="mt-2 text-xs text-green-700">
            (Demo mode — connect a Web3Forms key to actually deliver submissions.)
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-neutral-200 bg-white p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Name</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Phone</label>
          <input
            name="phone"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Year</label>
          <input name="tradeYear" className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Make</label>
          <input name="tradeMake" className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Model</label>
          <input name="tradeModel" className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700">Additional Details</label>
        <textarea
          name="message"
          rows={4}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          placeholder="Hours, condition, anything else we should know"
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
        {status === "sending" ? "Sending…" : "Get My Quote"}
      </button>
    </form>
  );
}
