"use client";

import { useActionState } from "react";
import type { EquipmentFormState } from "@/lib/actions/equipment-actions";
import { equipmentCategories } from "@/lib/site";

type ExistingPhoto = { id: string; url: string };

type Equipment = {
  category: string;
  year: number | null;
  make: string;
  model: string;
  trim: string | null;
  stockNumber: string | null;
  serialNumber: string | null;
  hours: number | null;
  condition: string;
  color: string | null;
  transmission: string | null;
  driveType: string | null;
  fuelType: string | null;
  engine: string | null;
  description: string | null;
  cashPrice: number;
  financePrice: number | null;
  monthlyPrice: number | null;
  status: string;
  featured: boolean;
};

export function EquipmentForm({
  action,
  equipment,
  existingPhotos,
  submitLabel,
}: {
  action: (state: EquipmentFormState, formData: FormData) => Promise<EquipmentFormState>;
  equipment?: Equipment;
  existingPhotos?: ExistingPhoto[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-8" encType="multipart/form-data">
      {state?.error && (
        <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      )}

      <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <legend className="mb-2 text-sm font-semibold text-neutral-700">Equipment Info</legend>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Category</label>
          <select
            name="category"
            defaultValue={
              equipment && equipmentCategories.includes(equipment.category as never)
                ? equipment.category
                : equipmentCategories[0]
            }
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          >
            {equipmentCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <Field label="Year" name="year" type="number" defaultValue={equipment?.year} />
        <Field
          label="Make / Brand"
          name="make"
          defaultValue={equipment?.make}
          required
          placeholder="Bad Boy Mowers"
        />
        <Field label="Model" name="model" defaultValue={equipment?.model} required />
        <Field
          label="Trim / Deck Size"
          name="trim"
          defaultValue={equipment?.trim ?? ""}
          placeholder="54&quot;"
        />
        <Field label="Stock #" name="stockNumber" defaultValue={equipment?.stockNumber ?? ""} />
        <Field label="Serial #" name="serialNumber" defaultValue={equipment?.serialNumber ?? ""} />
        <Field label="Hours" name="hours" type="number" defaultValue={equipment?.hours ?? ""} />
        <div>
          <label className="block text-sm font-medium text-neutral-700">Condition</label>
          <select
            name="condition"
            defaultValue={equipment?.condition ?? "New"}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <Field label="Color" name="color" defaultValue={equipment?.color ?? ""} />
        <Field
          label="Transmission"
          name="transmission"
          defaultValue={equipment?.transmission ?? ""}
          placeholder="Hydrostatic, Manual…"
        />
        <Field
          label="Drivetrain"
          name="driveType"
          defaultValue={equipment?.driveType ?? ""}
          placeholder="4WD, 2WD…"
        />
        <Field label="Fuel Type" name="fuelType" defaultValue={equipment?.fuelType ?? ""} />
        <Field
          label="Engine"
          name="engine"
          defaultValue={equipment?.engine ?? ""}
          placeholder="24HP Kawasaki"
        />
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-neutral-700">Description</legend>
        <textarea
          name="description"
          rows={4}
          defaultValue={equipment?.description ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
        />
      </fieldset>

      <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <legend className="mb-2 text-sm font-semibold text-neutral-700">Pricing &amp; Status</legend>
        <Field label="Cash Price ($)" name="cashPrice" type="number" defaultValue={equipment?.cashPrice} required />
        <Field
          label="Finance Price ($)"
          name="financePrice"
          type="number"
          defaultValue={equipment?.financePrice ?? ""}
        />
        <Field
          label="Monthly Price ($/mo)"
          name="monthlyPrice"
          type="number"
          defaultValue={equipment?.monthlyPrice ?? ""}
          placeholder="149"
        />
        <div>
          <label className="block text-sm font-medium text-neutral-700">Status</label>
          <select
            name="status"
            defaultValue={equipment?.status ?? "available"}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" name="featured" defaultChecked={equipment?.featured} />
          Feature on homepage
        </label>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-neutral-700">Photos</legend>
        {existingPhotos && existingPhotos.length > 0 && (
          <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {existingPhotos.map((p) => (
              <label key={p.id} className="relative block cursor-pointer">
                <img src={p.url} alt="" className="h-20 w-full rounded object-cover" />
                <span className="mt-1 flex items-center gap-1 text-xs text-neutral-600">
                  <input type="checkbox" name="removePhotoIds" value={p.id} /> Remove
                </span>
              </label>
            ))}
          </div>
        )}
        <input
          type="file"
          name="photos"
          multiple
          accept="image/*"
          className="block w-full text-sm text-neutral-600 file:mr-3 file:rounded file:border-0 file:bg-neutral-200 file:px-3 file:py-2"
        />
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
      />
    </div>
  );
}
