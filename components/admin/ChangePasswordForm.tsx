"use client";

import { useActionState } from "react";
import { changePasswordAction } from "@/lib/actions/user-actions";

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePasswordAction, undefined);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-neutral-200 bg-white p-6">
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
        <label className="block text-sm font-medium text-neutral-700">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          required
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            required
            minLength={8}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
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
        {pending ? "Saving…" : "Update Password"}
      </button>
    </form>
  );
}
