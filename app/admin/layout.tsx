import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth-actions";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-sm font-bold uppercase tracking-wide text-white">
            {business.name} <span className="text-red-500">Admin</span>
          </Link>
          <Link href="/admin" className="text-sm text-neutral-300 hover:text-white">
            Inventory
          </Link>
          <Link href="/admin/users" className="text-sm text-neutral-300 hover:text-white">
            Users
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/account" className="text-sm text-neutral-300 hover:text-white">
            {session.email}
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-sm text-neutral-400 hover:text-white">
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
