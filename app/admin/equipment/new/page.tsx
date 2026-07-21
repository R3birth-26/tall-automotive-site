import { createEquipmentAction } from "@/lib/actions/equipment-actions";
import { EquipmentForm } from "@/components/admin/EquipmentForm";

export default async function NewEquipmentPage({
  searchParams,
}: PageProps<"/admin/equipment/new">) {
  const sp = await searchParams;
  const kind = sp.kind === "vehicle" ? "vehicle" : "equipment";

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">
        {kind === "vehicle" ? "Add Vehicle" : "Add Equipment"}
      </h1>
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <EquipmentForm
          action={createEquipmentAction}
          submitLabel={kind === "vehicle" ? "Add Vehicle" : "Add Equipment"}
          kind={kind}
        />
      </div>
    </div>
  );
}
