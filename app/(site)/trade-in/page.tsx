import type { Metadata } from "next";
import { TradeInForm } from "@/components/TradeInForm";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trade-In Quote",
  description: `Get a trade-in quote toward your next purchase at ${business.name} in ${business.address.city}, ${business.address.state}.`,
  alternates: { canonical: "/trade-in" },
};

export default function TradeInPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-neutral-900">Get a Trade-In Quote</h1>
      <p className="mt-2 text-neutral-600">
        Tell us about your mower, tractor, or equipment and we&apos;ll follow up with a quote
        toward your next purchase. Prefer to talk now? Call{" "}
        <a href={business.phoneHref} className="font-semibold text-brand-red">
          {business.phone}
        </a>
        .
      </p>
      <div className="mt-8">
        <TradeInForm />
      </div>
    </div>
  );
}
