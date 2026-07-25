import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const items = [
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "MAVERICK HD",
    trim: "60\"",
    stockNumber: "BB-MAV-HD-60",
    condition: "New",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "24HP Kawasaki",
    description:
      "Commercial-grade zero-turn with a 60\" deck and 24HP Kawasaki engine — built to handle big acreage day after day.",
    cashPrice: 8519,
    financePrice: 9019,
    featured: false,
    photo: "/images/639185039582555983-1.webp",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "ZT ELITE",
    trim: "60\"",
    stockNumber: "BB-ZT-ELITE-60",
    condition: "New",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "24HP Kawasaki",
    description:
      "Front suspension and a full back seat with arm rests make this 60\" zero-turn one of the most comfortable rides in the lineup.",
    cashPrice: 6199,
    financePrice: 6699,
    featured: false,
    photo: "/images/639184929673339636-3.webp",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "ZT AVENGER",
    trim: "54\"",
    stockNumber: "BB-ZT-AVG-54",
    condition: "New",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "23HP Kawasaki",
    description:
      "A 54\" zero-turn with LED lights for early starts and late finishes — a strong value pick for mid-size properties.",
    cashPrice: 5199,
    financePrice: 5699,
    featured: false,
    photo: "/images/639184934853341009.webp",
  },
  {
    category: "Tractors",
    year: 2026,
    make: "Bad Boy Tractors",
    model: "1022",
    trim: "With Loader",
    stockNumber: "BB-1022-LDR",
    condition: "New",
    driveType: "4WD",
    fuelType: "Diesel",
    engine: "22HP",
    description:
      "22HP compact tractor with a front loader, 617 lb lift capacity, and a 7-year warranty.",
    cashPrice: 14844,
    financePrice: 15344,
    featured: false,
    photo: "/images/639190314695456660.webp",
  },
  {
    category: "Tractors",
    year: 2026,
    make: "Bad Boy Tractors",
    model: "1025",
    trim: "With Loader & Backhoe",
    stockNumber: "BB-1025-BH",
    condition: "New",
    driveType: "4WD",
    fuelType: "Diesel",
    engine: "25HP",
    description:
      "25HP compact tractor with front loader and backhoe, 992 lb lift capacity, and a 7-year warranty — ready for dig work out of the box.",
    cashPrice: 23739,
    financePrice: 24239,
    featured: false,
    photo: "/images/639190331283734468.webp",
  },
  {
    category: "Tractors",
    year: 2026,
    make: "Bad Boy Tractors",
    model: "1025",
    trim: "With Loader",
    stockNumber: "BB-1025-LDR",
    condition: "New",
    driveType: "4WD",
    fuelType: "Diesel",
    engine: "25HP",
    description:
      "25HP compact tractor with a front loader, 992 lb lift capacity, and a 7-year warranty.",
    cashPrice: 17688,
    financePrice: 18188,
    featured: false,
    photo: "/images/639190342735498494-1.webp",
  },
];

async function main() {
  for (const { photo, ...data } of items) {
    const existing = await prisma.equipment.findFirst({
      where: { stockNumber: data.stockNumber },
    });
    if (existing) {
      console.log(`Skipping ${data.stockNumber} (already exists)`);
      continue;
    }
    await prisma.equipment.create({
      data: {
        ...data,
        status: "available",
        photos: { create: [{ url: photo, order: 0 }] },
      },
    });
    console.log(`Seeded ${data.stockNumber}`);
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
