"use client";

import { useState, type FormEvent } from "react";

// TODO: replace with Tall Automotive's own Web3Forms access key (web3forms.com).
const WEB3FORMS_KEY = "";

const fieldClass =
  "w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-brand-red focus:outline-none";

export function ContactForm() {
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
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-green-300">
        Thanks for reaching out — we&apos;ll be in touch soon.
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
        <input name="name" required placeholder="Your Name..." className={fieldClass} />
        <input name="phone" placeholder="Your Phone..." className={fieldClass} />
      </div>
      <input type="email" name="email" required placeholder="example@yourmail.com" className={fieldClass} />
      <textarea
        name="message"
        rows={5}
        required
        placeholder="Type Here..."
        className="w-full rounded-3xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-brand-red focus:outline-none"
      />

      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong — please call us instead.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full border border-white/30 px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Now"}
      </button>
    </form>
  );
}
