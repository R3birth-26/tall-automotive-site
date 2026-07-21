"use client";

import { useTransition } from "react";
import { setStatusAction } from "@/lib/actions/equipment-actions";

export function StatusSelect({
  equipmentId,
  status,
}: {
  equipmentId: string;
  status: "available" | "pending" | "sold";
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const value = e.target.value as "available" | "pending" | "sold";
        startTransition(() => {
          setStatusAction(equipmentId, value);
        });
      }}
      className="rounded border border-neutral-300 px-2 py-1 text-xs disabled:opacity-50"
    >
      <option value="available">Available</option>
      <option value="pending">Pending</option>
      <option value="sold">Sold</option>
    </select>
  );
}
