// Attaches the generated marketing flyers to their listings, keyed by
// stockNumber (stable across local dev.db and production Turso, unlike the
// cuid ids). Copies each PNG into public/images/flyers/ (the committed,
// served location) and REPLACES the listing's photos with that one flyer —
// the old flyer graphics carried outdated branding/pricing and are meant to
// go away. Idempotent: rerunning just re-copies and re-points the same photo.
// Any stockNumber not found in the target DB is reported and skipped, never
// a crash (production is still missing 14 units until seed-new-inventory runs).
//
// Run locally:      npx tsx prisma/attach-flyers.ts
// Run vs production: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npx tsx prisma/attach-flyers.ts
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = process.env.TURSO_DATABASE_URL
  ? new PrismaLibSql({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  : new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL ?? "file:./dev.db",
    });
const prisma = new PrismaClient({ adapter });

const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "generated-flyers");
const DEST_DIR = path.join(ROOT, "public", "images", "flyers");

// generated-flyers filename -> stockNumber
const flyers: Record<string, string> = {
  // Tractors
  "00-1022-v2.png": "BB-1022-LDR",
  "01-1022-BH-v2.png": "BB1022HILB",
  "02-1025-v2.png": "BB-1025-LDR",
  "03-1025-BH-v2.png": "BB-1025-BH",
  "04-3026-v2.png": "3026HIL",
  "05-3026-BH-v2.png": "BB3026HILB",
  "06-4035-Cab-v2.png": "BB4035CHIL",
  // Mowers
  "mower-00-ZT-AVG-54.png": "BB-ZT-AVG-54",
  "mower-01-ZT-AVG-60.png": "BAZ60FR691",
  "mower-02-ZT-ELITE-54.png": "BZS54FR730",
  "mower-03-ZT-ELITE-60.png": "BB-ZT-ELITE-60",
  "mower-04-MAVERICK-54.png": "BMR54FS730",
  "mower-00-MAV-HD-54.png": "BMH54FX730",
  "mower-01-MAV-HD-60.png": "BB-MAV-HD-60",
  "mower-02-MZ-MAGNUM-48.png": "BMZ48FR651",
  "mower-03-MZ-MAGNUM-54.png": "BMZ54FR651",
  "mower-04-REBEL-61.png": "BRB61EVO820",
  "mower-05-REVOLT-54.png": "BRV54EVO781",
  "mower-06-REVOLT-SD-42.png": "BRV42FS600",
  "mower-07-ROGUE-61.png": "BRG61385KA",
};

async function main() {
  mkdirSync(DEST_DIR, { recursive: true });
  let attached = 0;
  const missing: string[] = [];

  for (const [file, stockNumber] of Object.entries(flyers)) {
    const src = path.join(SRC_DIR, file);
    if (!existsSync(src)) {
      console.log(`MISSING FILE ${file} — skipped`);
      continue;
    }

    const equipment = await prisma.equipment.findFirst({ where: { stockNumber } });
    if (!equipment) {
      missing.push(stockNumber);
      continue;
    }

    const destName = `${stockNumber.toLowerCase()}.png`;
    copyFileSync(src, path.join(DEST_DIR, destName));
    const url = `/images/flyers/${destName}`;

    await prisma.photo.deleteMany({ where: { equipmentId: equipment.id } });
    await prisma.photo.create({ data: { equipmentId: equipment.id, url, order: 0 } });
    console.log(`Attached ${stockNumber} -> ${url}`);
    attached++;
  }

  console.log(`\nDone. ${attached} attached.`);
  if (missing.length) {
    console.log(`Not in this database (skipped): ${missing.join(", ")}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
