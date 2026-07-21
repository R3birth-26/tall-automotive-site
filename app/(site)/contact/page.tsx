import { ContactForm } from "@/components/ContactForm";
import { business } from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-neutral-900">Contact Us</h1>
      <p className="mt-2 max-w-2xl text-neutral-600">
        Questions about service or a piece of equipment? Call{" "}
        <a href={business.phoneHref} className="font-semibold text-brand-red">
          {business.phone}
        </a>{" "}
        or send us a message below.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-neutral-200 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-neutral-900">Visit Us</h2>
            <p className="mt-2 text-sm text-neutral-600">
              {business.address.line1}
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
            </p>
            <a
              href={business.phoneHref}
              className="mt-2 inline-block text-sm font-semibold text-brand-red hover:underline"
            >
              {business.phone}
            </a>

            <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-neutral-900">
              Hours
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-neutral-600">
              {business.hours.map((h) => (
                <li key={h.days} className="flex justify-between">
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>

            <a
              href={business.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block rounded-md bg-brand-red px-5 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
