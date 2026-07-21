"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export type UserFormState = { error?: string; success?: string } | undefined;

export async function createAdminUserAction(
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  await requireSession();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    return { error: "A user with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.create({ data: { email, passwordHash } });

  revalidatePath("/admin/users");
  return { success: `Added ${email}.` };
}

export async function deleteAdminUserAction(id: string) {
  const session = await requireSession();

  if (session.sub === id) {
    throw new Error("You can't delete your own account while logged in.");
  }

  const count = await prisma.adminUser.count();
  if (count <= 1) {
    throw new Error("Can't delete the last remaining admin user.");
  }

  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/users");
}

export async function changePasswordAction(
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const session = await requireSession();

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmNewPassword = String(formData.get("confirmNewPassword") ?? "");

  if (!currentPassword || !newPassword) {
    return { error: "All fields are required." };
  }
  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }
  if (newPassword !== confirmNewPassword) {
    return { error: "New passwords do not match." };
  }

  const user = await prisma.adminUser.findUnique({ where: { id: session.sub } });
  if (!user) {
    return { error: "User not found." };
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    return { error: "Current password is incorrect." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash } });

  return { success: "Password updated." };
}
