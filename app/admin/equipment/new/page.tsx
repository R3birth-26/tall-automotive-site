import { createEquipmentAction } from "@/lib/actions/equipment-actions";
import { EquipmentForm } from "@/components/admin/EquipmentForm";

export default function NewEquipmentPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">Add Equipment</h1>
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <EquipmentForm action={createEquipmentAction} submitLabel="Add Equipment" />
      </div>
    </div>
  );
}
