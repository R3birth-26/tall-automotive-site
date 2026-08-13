import Link from "next/link";
import { DraftNotice } from "@/components/DraftNotice";
import { FinanceApplicationForm } from "@/components/FinanceApplicationForm";
import { business } from "@/lib/site";

export default async function FinancingPage({ searchParams }: PageProps<"/financing">) {
  const sp = await searchParams;
  const unit = typeof sp.unit === "string" ? sp.unit : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-neutral-900">Finance Info</h1>

      <DraftNotice>
        Placeholder — add {business.name}&apos;s actual lender partner(s), approval process, and
        any promotional financing terms before this goes live.
      </DraftNotice>

      <div className="space-y-6 text-neutral-700">
        <div className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-neutral-900">0% Interest for 48 Months</h2>
          <p className="mt-2 text-sm">
            Every mower, tractor, and piece of handheld equipment on our site is listed with a{" "}
            <strong>cash price</strong>, plus 0% interest financing for 48 months on approved
            credit — so you know exactly where you stand before you ever apply.
          </p>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-neutral-900">How Financing Works</h2>
          <p className="mt-2 text-sm">
            Stop by or call and we&apos;ll walk you through available terms, monthly payment
            estimates, and what&apos;s needed to apply. Most approvals are quick, and we&apos;ll
            help you find a plan that fits your budget.
          </p>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-neutral-900">Ready to Get Started?</h2>
          <p className="mt-2 text-sm">
            Browse our current{" "}
            <Link href="/inventory" className="font-semibold text-brand-red hover:underline">
              inventory
            </Link>{" "}
            or call us at{" "}
            <a href={business.phoneHref} className="font-semibold text-brand-red hover:underline">
              {business.phone}
            </a>{" "}
            to discuss financing on a specific unit.
          </p>
        </div>
      </div>

      <div id="apply" className="mt-10 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-neutral-900">Apply for Financing</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Fill this out and we&apos;ll follow up with next steps.
        </p>
        <div className="mt-4">
          <FinanceApplicationForm defaultUnit={unit} />
        </div>
      </div>
    </div>
  );
}
