import Link from "next/link";
import { DraftNotice } from "@/components/DraftNotice";
import { TestimonialSection } from "@/components/ui/testimonial-section";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { testimonials } from "@/lib/testimonials";
import { business } from "@/lib/site";

export default function OurStoryPage() {
  return (
    <div className="relative">
      <FixedGradientBackground />

      <section className="px-4 py-20 text-center sm:px-6 sm:py-28">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
          Hampstead, NH &middot; Serving Since 2016
        </p>
        <h1 className="font-display text-shine mt-4 text-6xl font-extrabold uppercase tracking-tight sm:text-8xl">
          Honest, Reliable
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
          Equipment &amp; machinery sales and service — trusted by our community since 2016.
        </p>
      </section>

      <section className="border-t border-white/10 bg-brand-black px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-4xl font-bold text-white sm:text-5xl">
            About {business.name}
          </h2>

          <div className="mt-8 space-y-4 text-neutral-300">
            <p>
              {business.name} has proudly served our community since 2016. We are a full-service
              equipment and machinery sales and repair facility offering professional in-shop
              service.
            </p>
            <p>
              Our fully equipped shop and highly trained technicians provide quality maintenance
              and repairs for mowers, tractors, and outdoor power equipment.
            </p>
            <p>
              We also sell new and used equipment and are proud to be an Authorized Bad Boy
              Dealer, offering new Bad Boy zero-turn mowers, tractors, implements, parts, warranty
              service, and repairs.
            </p>
            <p>
              At {business.name}, we are committed to honest service, quality workmanship, and
              dependable support for every customer.
            </p>
          </div>

          <blockquote className="mt-10 rounded-xl border border-white/10 bg-white/5 p-8">
            <p className="border-l-4 border-brand-red pl-6 text-xl italic leading-relaxed text-white">
              &ldquo;At {business.name}, we treat every piece of equipment as if it were our own.
              We take pride in doing the job right and standing behind our work. More importantly,
              we treat every customer like family—with honesty, respect, and the kind of service
              we&apos;d expect ourselves. Thank you for trusting us with your equipment
              needs.&rdquo;
            </p>
            <footer className="mt-4 pl-6 font-display text-sm font-bold uppercase tracking-wide text-brand-red">
              — Josh Tall, Owner
            </footer>
          </blockquote>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={business.phoneHref}
              className="rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
            >
              Call {business.phone}
            </a>
            <Link
              href="/service"
              className="rounded-md border border-white/30 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10"
            >
              Schedule Service
            </Link>
            <Link
              href="/inventory"
              className="rounded-md border border-white/30 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10"
            >
              See Inventory
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <DraftNotice>
          Sample testimonials below — swap in real customer reviews before this goes live.
        </DraftNotice>
      </div>
      <TestimonialSection testimonials={testimonials} />
    </div>
  );
}
