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

const featuredStockNumbers = [
  "BB-MAV-HD-60",
  "BB-ZT-ELITE-60",
  "BB-ZT-AVG-54",
  "BB-1022-LDR",
  "BB-1025-BH",
  "BB-1025-LDR",
];

async function main() {
  await prisma.equipment.updateMany({
    where: { stockNumber: { in: featuredStockNumbers } },
    data: { featured: true },
  });
  await prisma.equipment.updateMany({
    where: { stockNumber: "BB-E54-01" },
    data: { featured: false },
  });
  console.log("Updated featured flags.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
