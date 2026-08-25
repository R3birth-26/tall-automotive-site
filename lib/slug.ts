// Equipment detail pages use a human/keyword-readable slug for SEO, with the
// database id appended as the last hyphen-free segment so lookups stay exact
// and stable even if year/make/model/trim are edited later. Since cuids never
// contain hyphens, `slug.split("-").pop()` reliably recovers the id back out
// — including for old bare-id links (`/inventory/{id}`), which still resolve
// because splitting a hyphen-free string just returns the string itself.
function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function equipmentSlug(equipment: {
  id: string;
  year: number | null;
  make: string;
  model: string;
  trim: string | null;
}) {
  const parts = [equipment.year, equipment.make, equipment.model, equipment.trim]
    .filter((p): p is string | number => p != null && p !== "")
    .map(String);
  const words = slugify(parts.join(" "));
  return words ? `${words}-${equipment.id}` : equipment.id;
}

export function idFromSlug(slug: string) {
  const parts = slug.split("-");
  return parts[parts.length - 1];
}
