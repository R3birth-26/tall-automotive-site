import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteEquipmentAction, toggleFeaturedAction } from "@/lib/actions/equipment-actions";
import { StatusSelect } from "@/components/admin/StatusSelect";

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default async function AdminInventoryPage() {
  const items = await prisma.equipment.findMany({
    orderBy: { createdAt: "desc" },
    include: { photos: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Inventory ({items.length})</h1>
        <Link
          href="/admin/equipment/new"
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          + Add Equipment
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Cash Price</th>
              <th className="px-4 py-3">Finance Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((v) => (
              <tr key={v.id}>
                <td className="px-4 py-3">
                  <img
                    src={v.photos[0]?.url ?? "/equipment-placeholder.svg"}
                    alt=""
                    className="h-12 w-16 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-neutral-900">
                    {v.year} {v.make} {v.model} {v.trim}
                  </div>
                  <div className="text-xs text-neutral-500">Stock# {v.stockNumber ?? "—"}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-700">
                    {v.category}
                  </span>
                </td>
                <td className="px-4 py-3">{money(v.cashPrice)}</td>
                <td className="px-4 py-3">{v.financePrice ? money(v.financePrice) : "—"}</td>
                <td className="px-4 py-3">
                  <StatusSelect equipmentId={v.id} status={v.status as "available" | "pending" | "sold"} />
                </td>
                <td className="px-4 py-3">
                  <form
                    action={async () => {
                      "use server";
                      await toggleFeaturedAction(v.id, !v.featured);
                    }}
                  >
                    <button
                      type="submit"
                      className={`rounded px-2 py-1 text-xs font-semibold ${
                        v.featured ? "bg-red-100 text-red-700" : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {v.featured ? "Featured" : "Not Featured"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/equipment/${v.id}`} className="mr-3 text-red-600 hover:underline">
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteEquipmentAction(v.id);
                    }}
                    className="inline"
                  >
                    <button type="submit" className="text-neutral-400 hover:text-red-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-neutral-400">
                  No equipment yet. Add your first item.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
