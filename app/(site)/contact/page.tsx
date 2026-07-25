import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { DraftNotice } from "@/components/DraftNotice";
import { TestimonialSection } from "@/components/ui/testimonial-section";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { testimonials } from "@/lib/testimonials";
import { business } from "@/lib/site";

const email = "tallautomotive@gmail.com";

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.zip}`
)}&z=14&output=embed`;

export default function ContactPage() {
  return (
    <div className="relative">
      <FixedGradientBackground />

      <section className="px-4 py-16 text-center sm:px-6 sm:py-20">
        <h1 className="font-display text-5xl font-bold text-white sm:text-6xl">Contact Us</h1>
        <p className="mt-3 text-sm text-neutral-400">
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-300">Contact</span>
        </p>
      </section>

      <section className="border-t border-white/10 bg-brand-black px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
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

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
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

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title={`Map to ${business.name}`}
                src={mapSrc}
                className="h-64 w-full grayscale invert-[0.9]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-24 sm:px-6">
        <img
          src="/images/Tall-Hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
            Need Service?
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold text-white sm:text-5xl">
            We&apos;re Always Ready To Get You Back On The Road
          </h2>
          <Link
            href="/service"
            className="mt-8 inline-block rounded-full border border-white/40 bg-white px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-black hover:bg-neutral-200"
          >
            Schedule Service
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <DraftNotice>
          Sample testimonials below — swap in real customer reviews before this goes live.
        </DraftNotice>
      </div>
      <TestimonialSection testimonials={testimonials} />
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
      className="group flex flex-col items-center gap-3 rounded-xl border border-transparent p-4 text-center transition hover:border-white/10 hover:bg-white/5"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition group-hover:border-brand-red">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-display text-sm font-bold uppercase tracking-wide text-white">{label}</p>
        <p className="mt-1 text-sm text-neutral-400">{value}</p>
      </div>
    </a>
  );
}
