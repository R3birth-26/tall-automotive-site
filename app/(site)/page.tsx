import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { EquipmentCard } from "@/components/EquipmentCard";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { business } from "@/lib/site";

// Always render on request rather than prerendering at build time — this
// page queries live equipment data, so a build-time snapshot would go stale
// the moment someone adds/edits inventory through /admin.
export const dynamic = "force-dynamic";

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
        <img
          src="/images/zt-elite-hero.jpg"
          alt="Tall Equipment and Machinery"
          className="absolute inset-0 h-full w-full object-cover object-center sm:object-[25%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
          <div className="max-w-xl">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
              Hampstead, NH — Mowers, Tractors &amp; Equipment
            </p>
            <h1 className="font-display mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Mowers, Tractors &amp; Power Equipment Sales and Service in Hampstead, NH
            </h1>
            <p className="mt-4 text-base text-neutral-200 sm:text-lg">
              Shop residential and commercial mowers, tractors, mini excavators, and handheld
              power equipment. Plus expert sales, parts, and service for Bad Boy Mowers and
              more.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/inventory"
                className="rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
              >
                Shop Now
              </Link>
              <Link
                href="/financing"
                className="rounded-md border border-white/30 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10"
              >
                Get 0 Down Financing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <QuickLinkTile title="Inventory" subline="See Inventory" href="/inventory" />
          <QuickLinkTile
            title="Schedule Service"
            subline="Equipment & Machinery Repair"
            href="/contact"
          />
          <QuickLinkTile
            title="Get Directions"
            subline="Find Us Fast"
            href={business.directionsUrl}
            external
          />
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img
              src="/images/mower-repair-2.png"
              alt="Bad Boy zero-turn mower up on a lift in the Tall Equipment and Machinery shop"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
              Full-Service Shop
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">
              Real Techs. Real Service.
            </h2>
            <p className="mt-4 max-w-md text-neutral-300">
              Our techs turn wrenches on Bad Boy equipment every day — blade sharpening, hydraulic
              service, engine work, and everything in between. Whether you bought it from us or
              not, we&apos;ll keep it running.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-brand-red px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
              >
                Schedule Service
              </Link>
              <a
                href={business.phoneHref}
                className="rounded-md border border-white/30 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10"
              >
                Call {business.phone}
              </a>
            </div>
          </div>
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

      <section className="relative px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img
              src="/images/badboy-bg.jpg"
              alt="Bad Boy ZT Elite zero-turn mower"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/50 to-black/90" />

            <div className="relative z-10 flex min-h-[420px] items-center justify-end px-8 py-16 sm:px-12">
              <div className="max-w-md">
                <img src="/bb-logo-horizontal-orange.svg" alt="Bad Boy Mowers" className="h-10 w-auto sm:h-12" />
                <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
                  Your Local Authorized Bad Boy Dealer
                </h2>
                <p className="mt-4 text-neutral-300">
                  Look no further than {business.name}&apos;s lineup of Bad Boy Mowers, tractors,
                  and handheld equipment. Choose from cost-effective daily mowers to heavy-duty
                  tractors built to match your property. Contact us today and we&apos;ll help find
                  the perfect fit for your yard or job site!
                </p>

                <div className="mt-6 h-0.5 w-1/3 rounded-full bg-gradient-to-r from-brand-red to-transparent" />

                <div className="mt-8 flex max-w-sm flex-col gap-3">
                  <Link
                    href="/inventory"
                    className="rounded-lg bg-white px-6 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-black hover:bg-neutral-200"
                  >
                    Shop Bad Boy Equipment &rarr;
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-lg border border-white/30 px-6 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
