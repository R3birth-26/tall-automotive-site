import { writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/**
 * Saves an uploaded photo and returns its public URL.
 *
 * Uses Vercel Blob when BLOB_READ_WRITE_TOKEN is set (auto-injected once a
 * Blob store is connected to the Vercel project) — Vercel's filesystem is
 * ephemeral, so local disk writes don't persist there. Falls back to writing
 * under public/uploads for local dev / traditional Node hosting.
 */
export async function savePhoto(file: File): Promise<string> {
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${randomUUID()}${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(filename, file, { access: "public" });
    return blob.url;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}
