"use client";

import { useActionState } from "react";
import { createAdminUserAction } from "@/lib/actions/user-actions";

export function AddUserForm() {
  const [state, formAction, pending] = useActionState(createAdminUserAction, undefined);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="text-lg font-bold text-neutral-900">Add Admin User</h2>

      {state?.error && (
        <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded-md bg-green-50 px-4 py-2 text-sm text-green-700" role="status">
          {state.success}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-700">Email</label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            minLength={8}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
      >
        {pending ? "Adding…" : "Add User"}
      </button>
    </form>
  );
}
