import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { EquipmentCard } from "@/components/EquipmentCard";
import { HighlightCardShell } from "@/components/ui/highlight-card";
import { TestimonialSection } from "@/components/ui/testimonial-section";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { DraftNotice } from "@/components/DraftNotice";
import { testimonials } from "@/lib/testimonials";
import { business } from "@/lib/site";

export default async function HomePage() {
  const featured = await prisma.equipment.findMany({
    where: { featured: true, status: "available" },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: { photos: { orderBy: { order: "asc" }, take: 1 } },
  });

  const fallback =
    featured.length > 0
      ? []
      : await prisma.equipment.findMany({
          where: { status: "available" },
          orderBy: { createdAt: "desc" },
          take: 6,
          include: { photos: { orderBy: { order: "asc" }, take: 1 } },
        });

  const items = featured.length > 0 ? featured : fallback;

  return (
    <div>
      <FixedGradientBackground />
      <section className="relative overflow-hidden bg-brand-charcoal">
        <div className="relative h-[clamp(360px,50vw,640px)] w-full">
          <img
            src="/uploads/Tall-Hero.jpg"
            alt="Tall Automotive shop"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
              <div className="max-w-xl">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
                  Hampstead, NH — Trucks, Vans, Mowers, Tractors
                </p>
                <h1 className="font-display mt-3 text-[clamp(2rem,5vw,3.75rem)] font-bold leading-tight text-white">
                  Truck &amp; Equipment Sales &amp; Service
                </h1>
                <p className="mt-4 text-base text-neutral-200 sm:text-lg">
                  Shop trucks, vans, and Bad Boy Mowers, tractors, and handheld equipment — every
                  unit listed with a cash price and a finance price up front. Plus full-service
                  repair on everything we sell and more.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={business.phoneHref}
                    className="rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
                  >
                    Schedule Service
                  </a>
                  <Link
                    href="/inventory"
                    className="rounded-md border border-white/30 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10"
                  >
                    See Inventory
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <QuickLinkTile title="Inventory" subline="See Inventory" href="/inventory" />
          <QuickLinkTile
            title="Schedule Service"
            subline="Auto, Truck, Equipment Repair"
            href="/service"
          />
          <QuickLinkTile
            title="Get Directions"
            subline="Find Us Fast"
            href={business.directionsUrl}
            external
          />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Featured Inventory
          </h2>
          <Link href="/inventory" className="text-sm font-semibold text-brand-red hover:underline">
            View All &rarr;
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-white/50">New inventory is on its way — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((v) => (
              <EquipmentCard key={v.id} equipment={v} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-brand-black px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <HighlightCardShell>
            <div className="relative z-10 px-8 py-16 text-center">
              <img
                src="/bb-logo-horizontal-orange.svg"
                alt="Bad Boy Mowers"
                className="mx-auto h-10 w-auto sm:h-12"
              />
              <h2 className="mb-4 mt-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-4xl font-bold text-transparent transition-transform duration-300 group-hover:scale-105 sm:text-5xl">
                Your Local Authorized Bad Boy Dealer
              </h2>
              <p className="mx-auto max-w-xl text-neutral-300 transition-colors duration-300 group-hover:text-gray-200">
                Look no further than Tall Automotive&apos;s lineup of Bad Boy Mowers, tractors, and
                handheld equipment. Choose from cost-effective daily mowers to heavy-duty tractors
                built to match your property. Contact us today and we&apos;ll help find the perfect
                fit for your yard or job site!
              </p>

              <div className="mx-auto mt-6 h-0.5 w-1/3 rounded-full bg-gradient-to-r from-transparent via-brand-red to-transparent transition-all duration-500 group-hover:h-1 group-hover:w-1/2" />

              <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
                <Link
                  href="/inventory"
                  className="rounded-lg bg-white px-6 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-black hover:bg-neutral-200"
                >
                  Shop Bad Boy Equipment &rarr;
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg border border-white/20 px-6 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-white/5"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </HighlightCardShell>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <DraftNotice>
          Sample testimonials below — swap in real customer reviews before this goes live.
        </DraftNotice>
      </div>
      <TestimonialSection testimonials={testimonials} />
    </div>
  );
}

function QuickLinkTile({
  title,
  subline,
  href,
  external,
}: {
  title: string;
  subline: string;
  href: string;
  external?: boolean;
}) {
  const className =
    "group flex flex-col items-center justify-center gap-1.5 px-6 py-10 text-center transition hover:bg-white/5";

  const content = (
    <>
      <span className="font-display text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
        {title}
      </span>
      <span className="font-display text-sm font-semibold uppercase tracking-widest text-brand-red">
        {subline}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
