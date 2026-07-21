import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateEquipmentAction } from "@/lib/actions/equipment-actions";
import { EquipmentForm } from "@/components/admin/EquipmentForm";
import { vehicleCategories } from "@/lib/site";

export default async function EditEquipmentPage({ params }: PageProps<"/admin/equipment/[id]">) {
  const { id } = await params;
  const equipment = await prisma.equipment.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  if (!equipment) notFound();

  const kind = vehicleCategories.includes(equipment.category as never) ? "vehicle" : "equipment";
  const boundAction = updateEquipmentAction.bind(null, equipment.id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">
        Edit {equipment.year} {equipment.make} {equipment.model}
      </h1>
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <EquipmentForm
          action={boundAction}
          equipment={equipment}
          existingPhotos={equipment.photos}
          submitLabel="Save Changes"
          kind={kind}
        />
      </div>
    </div>
  );
}
