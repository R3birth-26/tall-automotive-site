"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { savePhoto } from "@/lib/storage";
import { equipmentCategories } from "@/lib/site";

const equipmentSchema = z.object({
  category: z.enum(equipmentCategories),
  year: z.coerce.number().int().min(1900).max(2100).optional(),
  make: z.string().trim().min(1, "Make is required"),
  model: z.string().trim().min(1, "Model is required"),
  trim: z.string().trim().optional(),
  stockNumber: z.string().trim().optional(),
  serialNumber: z.string().trim().optional(),
  hours: z.coerce.number().int().min(0).optional(),
  mileage: z.coerce.number().int().min(0).optional(),
  condition: z.enum(["New", "Used"]),
  color: z.string().trim().optional(),
  transmission: z.string().trim().optional(),
  driveType: z.string().trim().optional(),
  fuelType: z.string().trim().optional(),
  engine: z.string().trim().optional(),
  description: z.string().trim().optional(),
  cashPrice: z.coerce.number().int().min(0),
  financePrice: z.coerce.number().int().min(0).optional(),
  status: z.enum(["available", "pending", "sold"]),
  featured: z.coerce.boolean().optional(),
});

export type EquipmentFormState = { error?: string } | undefined;

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function parseEquipmentForm(formData: FormData) {
  const raw = {
    category: formData.get("category"),
    year: formData.get("year") || undefined,
    make: formData.get("make"),
    model: formData.get("model"),
    trim: formData.get("trim") || undefined,
    stockNumber: formData.get("stockNumber") || undefined,
    serialNumber: formData.get("serialNumber") || undefined,
    hours: formData.get("hours") || undefined,
    mileage: formData.get("mileage") || undefined,
    condition: formData.get("condition"),
    color: formData.get("color") || undefined,
    transmission: formData.get("transmission") || undefined,
    driveType: formData.get("driveType") || undefined,
    fuelType: formData.get("fuelType") || undefined,
    engine: formData.get("engine") || undefined,
    description: formData.get("description") || undefined,
    cashPrice: formData.get("cashPrice"),
    financePrice: formData.get("financePrice") || undefined,
    status: formData.get("status") ?? "available",
    featured: formData.get("featured") === "on",
  };

  return equipmentSchema.parse(raw);
}

async function uploadNewPhotos(formData: FormData, equipmentId: string, startOrder: number) {
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  let order = startOrder;
  for (const file of files) {
    const url = await savePhoto(file);
    await prisma.photo.create({ data: { equipmentId, url, order: order++ } });
  }
}

export async function createEquipmentAction(
  _prevState: EquipmentFormState,
  formData: FormData
): Promise<EquipmentFormState> {
  await requireSession();

  let data: z.infer<typeof equipmentSchema>;
  try {
    data = parseEquipmentForm(formData);
  } catch (e) {
    if (e instanceof z.ZodError) return { error: e.issues[0]?.message ?? "Invalid input." };
    throw e;
  }

  const equipment = await prisma.equipment.create({ data });
  await uploadNewPhotos(formData, equipment.id, 0);

  revalidatePath("/admin");
  revalidatePath("/inventory");
  redirect("/admin");
}

export async function updateEquipmentAction(
  id: string,
  _prevState: EquipmentFormState,
  formData: FormData
): Promise<EquipmentFormState> {
  await requireSession();

  let data: z.infer<typeof equipmentSchema>;
  try {
    data = parseEquipmentForm(formData);
  } catch (e) {
    if (e instanceof z.ZodError) return { error: e.issues[0]?.message ?? "Invalid input." };
    throw e;
  }

  const removeIds = formData.getAll("removePhotoIds").map(String);
  if (removeIds.length > 0) {
    await prisma.photo.deleteMany({ where: { id: { in: removeIds }, equipmentId: id } });
  }

  const existingCount = await prisma.photo.count({ where: { equipmentId: id } });
  await uploadNewPhotos(formData, id, existingCount);

  await prisma.equipment.update({ where: { id }, data });

  revalidatePath("/admin");
  revalidatePath("/inventory");
  revalidatePath(`/inventory/${id}`);
  redirect("/admin");
}

export async function deleteEquipmentAction(id: string) {
  await requireSession();
  await prisma.equipment.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/inventory");
}

export async function toggleFeaturedAction(id: string, featured: boolean) {
  await requireSession();
  await prisma.equipment.update({ where: { id }, data: { featured } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function setStatusAction(id: string, status: "available" | "pending" | "sold") {
  await requireSession();
  await prisma.equipment.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
  revalidatePath("/inventory");
}
