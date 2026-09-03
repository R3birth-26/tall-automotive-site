import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { EquipmentCard } from "@/components/EquipmentCard";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { equipmentCategories } from "@/lib/site";
import type { Prisma } from "@/app/generated/prisma/client";

// Category-specific hero copy, keyed by the ?category= value the "Shop
// Mowers" / "Shop Tractors" nav links set. The "" key is the unfiltered
// Shop All page (the page reads `category ?? ""`). Any category without an
// entry (e.g. Handhelds) falls back to the plain "Inventory" heading.
// When a category has a `hero` banner (title + sub already baked into the
// artwork), the banner is shown in place of the text heading; the h1 stays
// in the DOM as sr-only for search engines and screen readers.
const categoryCopy: Record<
  string,
  { title: string; sub: string; hero?: { src: string; width: number; height: number } }
> = {
  "": {
    // Title-only banner, so sub is empty: the img alt ends up "" and the
    // sr-only h1 carries the text — screen readers hear it once, not twice.
    title: "Power. Performance. Attitude.",
    sub: "",
    hero: { src: "/images/inventory-hero.jpg", width: 1672, height: 941 },
  },
  Mowers: {
    title: "Mow With Attitude",
    sub: "Meet the commercial and residential mowers that revolutionized the zero-turn lawnmower game.",
    hero: { src: "/images/mowers-hero.jpg", width: 1672, height: 941 },
  },
  Tractors: {
    title: "Work With Attitude",
    sub: "Say hello to our new line of tractors that maintain our history of power, performance, and attitude.",
    hero: { src: "/images/tractors-hero.jpg", width: 1672, height: 941 },
  },
};

export async function generateMetadata({ searchParams }: PageProps<"/inventory">): Promise<Metadata> {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const title = category ? `Shop ${category}` : "Shop Inventory";
  const description = category
    ? `Browse new and used Bad Boy ${category.toLowerCase()} for sale in Hampstead, NH — cash pricing and easy financing on every listing.`
    : "Browse our full inventory of Bad Boy mowers, tractors, and handheld equipment for sale in Hampstead, NH — cash pricing and easy financing on every listing.";

  return { title, description, alternates: { canonical: "/inventory" } };
}

const SORT_OPTIONS = {
  "price-asc": { label: "Price: Low to High", orderBy: { cashPrice: "asc" as const } },
  "price-desc": { label: "Price: High to Low", orderBy: { cashPrice: "desc" as const } },
  "year-desc": { label: "Year: New to Old", orderBy: { year: "desc" as const } },
  "year-asc": { label: "Year: Old to New", orderBy: { year: "asc" as const } },
  "hours-asc": { label: "Hours: Low to High", orderBy: { hours: "asc" as const } },
  newest: { label: "Newest Listings", orderBy: { createdAt: "desc" as const } },
} as const;

type SortKey = keyof typeof SORT_OPTIONS;

export default async function InventoryPage({
  searchParams,
}: PageProps<"/inventory">) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const make = typeof sp.make === "string" ? sp.make : undefined;
  const condition = typeof sp.condition === "string" ? sp.condition : undefined;
  const sortKey: SortKey = typeof sp.sort === "string" && sp.sort in SORT_OPTIONS ? (sp.sort as SortKey) : "newest";

  const where: Prisma.EquipmentWhereInput = {
    status: { not: "sold" },
    ...(category ? { category } : {}),
    ...(make ? { make } : {}),
    ...(condition ? { condition } : {}),
  };

  const [items, makes] = await Promise.all([
    prisma.equipment.findMany({
      where,
      orderBy: SORT_OPTIONS[sortKey].orderBy,
      include: { photos: { orderBy: { order: "asc" }, take: 1 } },
    }),
    prisma.equipment.findMany({
      where: { status: { not: "sold" } },
      distinct: ["make"],
      select: { make: true },
      orderBy: { make: "asc" },
    }),
  ]);

  return (
    <div className="relative">
      <FixedGradientBackground />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {categoryCopy[category ?? ""]?.hero ? (
          <>
            <h1 className="sr-only">{categoryCopy[category ?? ""].title}</h1>
            <img
              src={categoryCopy[category ?? ""].hero!.src}
              width={categoryCopy[category ?? ""].hero!.width}
              height={categoryCopy[category ?? ""].hero!.height}
              alt={categoryCopy[category ?? ""].sub}
              className="w-full rounded-2xl border border-white/10"
            />
          </>
        ) : (
          <>
            <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {categoryCopy[category ?? ""]?.title ?? "Inventory"}
            </h1>
            {categoryCopy[category ?? ""] && (
              <p className="mt-2 max-w-2xl text-lg text-neutral-300">
                {categoryCopy[category ?? ""].sub}
              </p>
            )}
          </>
        )}
        <p className="mt-1 text-sm text-white/50">{items.length} items found</p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          <form method="get" className="lg:col-span-1">
            <div className="space-y-5 rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div>
                <label className="block text-sm font-semibold text-white/70">Category</label>
                <select
                  name="category"
                  defaultValue={category ?? ""}
                  className="mt-1 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm text-white"
                >
                  <option value="">Any</option>
                  {equipmentCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/70">Make</label>
                <select
                  name="make"
                  defaultValue={make ?? ""}
                  className="mt-1 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm text-white"
                >
                  <option value="">Any</option>
                  {makes.map((m) => (
                    <option key={m.make} value={m.make}>
                      {m.make}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/70">Condition</label>
                <select
                  name="condition"
                  defaultValue={condition ?? ""}
                  className="mt-1 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm text-white"
                >
                  <option value="">Any</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/70">Sort By</label>
                <select
                  name="sort"
                  defaultValue={sortKey}
                  className="mt-1 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm text-white"
                >
                  {Object.entries(SORT_OPTIONS).map(([key, opt]) => (
                    <option key={key} value={key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-brand-red py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
              >
                Apply Filters
              </button>
              <a href="/inventory" className="block text-center text-xs text-white/40 hover:underline">
                Clear all
              </a>
            </div>
          </form>

          <div className="lg:col-span-3">
            {items.length === 0 ? (
              <p className="text-white/50">No inventory matches those filters.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((v) => (
                  <EquipmentCard key={v.id} equipment={v} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
