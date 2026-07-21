import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { deleteAdminUserAction } from "@/lib/actions/user-actions";
import { AddUserForm } from "@/components/admin/AddUserForm";

export default async function AdminUsersPage() {
  const session = await getSession();
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">Admin Users</h1>

      <div className="mb-8 overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Added</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 font-medium text-neutral-900">
                  {u.email}
                  {u.id === session?.sub && (
                    <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-500">
                      You
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {u.createdAt.toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  {u.id !== session?.sub && users.length > 1 ? (
                    <form
                      action={async () => {
                        "use server";
                        await deleteAdminUserAction(u.id);
                      }}
                      className="inline"
                    >
                      <button type="submit" className="text-neutral-400 hover:text-red-600 hover:underline">
                        Delete
                      </button>
                    </form>
                  ) : (
                    <span className="text-neutral-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserForm />
    </div>
  );
}
