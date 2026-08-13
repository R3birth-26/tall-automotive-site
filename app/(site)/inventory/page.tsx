import { prisma } from "@/lib/prisma";
import { EquipmentCard } from "@/components/EquipmentCard";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { equipmentCategories } from "@/lib/site";
import type { Prisma } from "@/app/generated/prisma/client";

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
        <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">Inventory</h1>
        <p className="mt-1 text-white/50">{items.length} items found</p>

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
