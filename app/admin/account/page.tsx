import { getSession } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export default async function AdminAccountPage() {
  const session = await getSession();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-neutral-900">My Account</h1>
      <p className="mb-6 text-sm text-neutral-500">{session?.email}</p>
      <ChangePasswordForm />
    </div>
  );
}
