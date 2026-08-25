import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ClipboardList, Handshake, ArrowRight } from "lucide-react";
import { FinanceApplicationForm } from "@/components/FinanceApplicationForm";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Financing",
  description: `Easy financing on every mower, tractor, and handheld listing at ${business.name}, through our partner Sheffield Financial — prequalify online with no impact to your credit score.`,
  alternates: { canonical: "/financing" },
};

const steps = [
  {
    icon: ShieldCheck,
    title: "Prequalify Online",
    body: "See if you prequalify in minutes — checking has no impact to your credit score.",
  },
  {
    icon: ClipboardList,
    title: "Complete Your Application",
    body: "Once prequalified, answer a few more questions with Sheffield Financial to get pre-approved.",
  },
  {
    icon: Handshake,
    title: "Visit the Shop",
    body: `Bring your pre-approval to ${business.name} and we'll finalize your purchase on the spot.`,
  },
];

export default async function FinancingPage({ searchParams }: PageProps<"/financing">) {
  const sp = await searchParams;
  const unit = typeof sp.unit === "string" ? sp.unit : undefined;

  return (
    <div className="relative">
      <FixedGradientBackground />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
            Financing Made Simple
          </p>
          <h1 className="font-display mt-3 text-5xl font-bold leading-tight text-white sm:text-6xl">
            Easy Financing, Made Simple
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            Every mower, tractor, and piece of handheld equipment on our site is listed with a
            straightforward cash price, plus easy financing on approved credit through our
            partner, Sheffield Financial — so you know exactly where you stand before you ever
            apply.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={business.financeApplicationUrl || "#apply"}
              target={business.financeApplicationUrl ? "_blank" : undefined}
              rel={business.financeApplicationUrl ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
            >
              Prequalify Now <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={business.phoneHref}
              className="rounded-md border border-white/30 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10"
            >
              Call {business.phone}
            </a>
          </div>
          <p className="mt-4 text-xs uppercase tracking-wide text-neutral-500">
            No impact to your credit score to check
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-brand-black px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-bold uppercase tracking-wide text-white">
            How It Works
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-neutral-400">
            Ready to get started? Here&apos;s our fast online process through Sheffield Financial.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="relative rounded-xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <span className="font-display absolute left-4 top-4 text-4xl font-bold text-white/10">
                  {i + 1}
                </span>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/40">
                  <Icon className="h-5 w-5 text-brand-red" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href={business.financeApplicationUrl || "#apply"}
              target={business.financeApplicationUrl ? "_blank" : undefined}
              rel={business.financeApplicationUrl ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
            >
              Prequalify with Sheffield Financial <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
              Prefer We Reach Out?
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white" id="apply">
              Have Us Call You Instead
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              Not ready to apply online? Leave your info and a specific unit you&apos;re
              interested in, and we&apos;ll follow up to walk you through financing.
            </p>
            <div className="mt-6">
              <FinanceApplicationForm defaultUnit={unit} />
            </div>
            <p className="mt-4 text-sm text-neutral-400">
              Browse our current{" "}
              <Link href="/inventory" className="font-semibold text-brand-red hover:underline">
                inventory
              </Link>{" "}
              first if you haven&apos;t already.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
