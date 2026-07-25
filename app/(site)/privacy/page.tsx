import { DraftNotice } from "@/components/DraftNotice";
import { business } from "@/lib/site";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-neutral-900">Privacy Policy</h1>

      <DraftNotice>
        Generic starter policy — have a lawyer review this before publishing, and update the
        "Last updated" date whenever it changes.
      </DraftNotice>

      <div className="space-y-6 text-sm text-neutral-700">
        <p className="text-neutral-500">Last updated: [date]</p>

        <section>
          <h2 className="font-display text-xl font-bold text-neutral-900">Information We Collect</h2>
          <p className="mt-2">
            When you submit a form on this site — contact, trade-in, or service request — we
            collect the information you provide, such as your name, phone number, email address,
            and any details about your vehicle or equipment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-neutral-900">How We Use It</h2>
          <p className="mt-2">
            We use this information only to respond to your inquiry, schedule service, or follow
            up on a trade-in or equipment purchase. We do not sell your information to third
            parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-neutral-900">Cookies</h2>
          <p className="mt-2">
            This site does not use advertising or tracking cookies. Basic technical data may be
            collected by our hosting provider to keep the site running securely.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-neutral-900">Contact Us</h2>
          <p className="mt-2">
            Questions about this policy or your information? Reach out at{" "}
            <a href={business.phoneHref} className="font-semibold text-brand-red hover:underline">
              {business.phone}
            </a>{" "}
            or through our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
