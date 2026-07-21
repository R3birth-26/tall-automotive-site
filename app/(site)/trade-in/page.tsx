import { TradeInForm } from "@/components/TradeInForm";
import { business } from "@/lib/site";

export default function TradeInPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-neutral-900">Get a Trade-In Quote</h1>
      <p className="mt-2 text-neutral-600">
        Tell us about your truck, van, mower, tractor, or equipment and we&apos;ll follow up with a
        quote toward your next purchase. Prefer to talk now? Call{" "}
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
