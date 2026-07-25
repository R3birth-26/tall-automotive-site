// Applies prisma/migrations/*/migration.sql directly to a Turso (libSQL)
// database via @libsql/client. `prisma migrate deploy` can't target Turso
// with this project's driver-adapter setup (its migrate engine only
// understands file: URLs for the sqlite provider), so this is the one-time
// (and future-migration) way to sync schema changes to production.
import { createClient } from "@libsql/client";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN before running this.");
  process.exit(1);
}

const client = createClient({ url, authToken });

const migrationsDir = path.join(__dirname, "migrations");
const dirs = readdirSync(migrationsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

async function main() {
  for (const dir of dirs) {
    const sqlPath = path.join(migrationsDir, dir, "migration.sql");
    const sql = readFileSync(sqlPath, "utf8");
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);

    for (const statement of statements) {
      await client.execute(statement);
    }
    console.log(`Applied ${dir}`);
  }
}

main()
  .then(() => {
    console.log("Turso schema sync complete.");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
