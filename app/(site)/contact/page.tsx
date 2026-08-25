import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${business.name} in ${business.address.city}, ${business.address.state} — call, text, or send a message to schedule service or ask about a piece of equipment.`,
  alternates: { canonical: "/contact" },
};

const email = "tallautomotive@gmail.com";

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.zip}`
)}&z=14&output=embed`;

export default function ContactPage() {
  return (
    <div className="relative">
      <FixedGradientBackground />

      <section className="relative overflow-hidden px-4 py-24 text-center sm:px-6 sm:py-32">
        <img
          src="/images/mower-repair.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-brand-black" />
        <div className="relative">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
            We&apos;d Love to Hear From You
          </p>
          <h1 className="font-display mt-3 text-5xl font-bold text-white sm:text-6xl">Contact Us</h1>
          <p className="mt-3 text-sm text-neutral-400">
            <Link href="/" className="hover:text-brand-red">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-300">Contact</span>
          </p>
        </div>
      </section>

      <section className="relative border-t border-white/10 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent" />
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
              Contact Us
            </p>
            <h2 className="font-display mt-2 text-4xl font-bold text-white">Get In Touch</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div>
            <p className="max-w-md text-neutral-300">
              Questions about service or a piece of equipment? Send us a message, give us a
              call, or stop by the shop — whichever&apos;s easiest for you.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ContactInfoItem icon={Phone} label="Phone Number" value={business.phone} href={business.phoneHref} />
              <ContactInfoItem icon={Mail} label="Email Address" value={email} href={`mailto:${email}`} />
              <ContactInfoItem icon={MessageCircle} label="Text Us" value={business.phone} href={business.smsHref} />
              <ContactInfoItem
                icon={MapPin}
                label="Our Office"
                value={`${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.zip}`}
                href={business.directionsUrl}
                external
              />
            </div>

            <p className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
              Find Us
            </p>
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title={`Map to ${business.name}`}
                src={mapSrc}
                className="h-64 w-full grayscale invert-[0.9]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-brand-red/10 via-white/5 to-transparent px-8 py-8 sm:px-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
                Prefer to Talk?
              </p>
              <h3 className="font-display mt-1 text-2xl font-bold text-white sm:text-3xl">
                Call the Shop Directly
              </h3>
              <p className="mt-2 max-w-md text-sm text-neutral-300">
                Real people, real answers — no phone tree. We&apos;re happy to help you find the
                right equipment or get service scheduled.
              </p>
            </div>
            <a
              href={business.phoneHref}
              className="shrink-0 rounded-full bg-brand-red px-8 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactInfoItem({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-brand-red/50 hover:bg-white/10"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/40 transition group-hover:border-brand-red/60">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-display text-sm font-bold uppercase tracking-wide text-white">{label}</p>
        <p className="mt-1 text-sm text-neutral-400">{value}</p>
      </div>
    </a>
  );
}
