// New inventory found on tallautosales.com (2026-08-30) that wasn't yet on
// tallequipment.com. Scraped from the DealerCarSearch listings. The dealer
// site hides cash pricing behind "Get ePrice", but the listing photos carry
// real financing offers — monthlyPrice values below come straight from those
// graphics (Revolt SD and Revolt 54 show actual cash prices). Any cashPrice
// of 0 is a PLACEHOLDER: fill in real cash prices (admin panel or edit here)
// before these go live. Idempotent: skips any stockNumber that already exists.
//
// Run locally:      npx tsx prisma/seed-new-inventory.ts
// Run vs production: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npx tsx prisma/seed-new-inventory.ts
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

const PRICE_TBD = 0; // placeholder — dealer site is "Get ePrice" only

const items = [
  // ---------------- Mowers ----------------
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "ZT ELITE",
    trim: "54\"",
    stockNumber: "BZS54FR730",
    serialNumber: "ZS54FR73006260377",
    condition: "New",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "24HP Kawasaki FR730",
    color: "Orange",
    description:
      "54\" zero-turn with a 24HP Kawasaki FR730, Hydro-Gear 3100 drives, and a 7-gauge steel slope-nosed deck. 4 on hand.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 140,
    photo: "/images/639216514934524902.jpg",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "MZ MAGNUM",
    trim: "54\"",
    stockNumber: "BMZ54FR651",
    serialNumber: "MZ54ER65106260019",
    condition: "New",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "22HP Kawasaki FR651",
    description:
      "54\" MZ Magnum zero-turn with a 22HP Kawasaki FR651 — a proven entry point into the Bad Boy lineup. 2 on hand.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 100,
    photo: "/images/639216239707628941.jpg",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "MZ MAGNUM",
    trim: "48\"",
    stockNumber: "BMZ48FR651",
    serialNumber: "MZ48ER65106260251",
    condition: "New",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "22HP Kawasaki FR651",
    description:
      "48\" MZ Magnum zero-turn with a 22HP Kawasaki FR651 — compact deck for tighter yards. 3 on hand.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 97,
    photo: "/images/639216259428670162.jpg",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "ZT AVENGER",
    trim: "60\"",
    stockNumber: "BAZ60FR691",
    serialNumber: "AZ60F69309290060",
    condition: "New",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "23HP Kawasaki FR691",
    description:
      "60\" ZT Avenger with a 23HP Kawasaki FR691 — the wide-deck version of our most popular value zero-turn. 1 on hand.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 120,
    photo: "/images/639216292141251627.jpg",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "MAVERICK",
    trim: "54\"",
    stockNumber: "BMR54FS730",
    serialNumber: "MR54FS73006260111",
    condition: "New",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "24HP Kawasaki FS730",
    description:
      "54\" Maverick zero-turn with a 24HP Kawasaki FS730 — prosumer build quality for larger properties. 1 on hand.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 169,
    photo: "/images/639216526450942132.jpg",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "MAVERICK HD",
    trim: "54\"",
    stockNumber: "BMH54FX730",
    serialNumber: "MH54FX73006260282",
    condition: "New",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "23.5HP Kawasaki FX730",
    description:
      "54\" Maverick HD with a commercial-grade 23.5HP Kawasaki FX730 — same heavy-duty platform as our 60\", tighter cut width. 2 on hand.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 193,
    photo: "/images/639216535817574569.jpg",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "REVOLT SD",
    trim: "42\"",
    stockNumber: "BRV42FS600",
    serialNumber: "RV42F860000626004",
    condition: "Used",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "18.5HP Kawasaki FS600",
    description:
      "42\" Revolt SD with an 18.5HP Kawasaki FS600 — compact zero-turn sized for smaller lots. 1 on hand.",
    cashPrice: 5939,
    photo: "/images/639185048564616609.jpg",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "REVOLT",
    trim: "54\"",
    stockNumber: "BRV54EVO781",
    serialNumber: "RV54EVO7810626002",
    condition: "New",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "31HP Kawasaki EVO781 EFI",
    description:
      "54\" Revolt with a 31HP Kawasaki EVO781 EFI — serious power in a residential-friendly package. 1 on hand.",
    cashPrice: 8719,
    photo: "/images/639185062004296745.jpg",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "REBEL",
    trim: "61\"",
    stockNumber: "BRB61EVO820",
    serialNumber: "BRB61EVO820062006",
    condition: "Used",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "34HP Kawasaki",
    description:
      "61\" Rebel commercial zero-turn with a 34HP Kawasaki — built for all-day mowing. 1 on hand.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 269,
    photo: "/images/639217072823944087.jpg",
  },
  {
    category: "Mowers",
    year: 2026,
    make: "Bad Boy Mowers",
    model: "ROGUE",
    trim: "61\"",
    stockNumber: "BRG61385KA",
    serialNumber: "BRG61385KA0626015",
    condition: "Used",
    transmission: "Hydrostatic",
    fuelType: "Gasoline",
    engine: "38.5HP Kawasaki FX1000 EFI",
    description:
      "61\" Rogue — Bad Boy's flagship commercial zero-turn with a 38.5HP Kawasaki FX1000 EFI. 1 on hand.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 328,
    photo: "/images/639217055317300916.jpg",
  },
  // ---------------- Tractors ----------------
  {
    category: "Tractors",
    year: 2026,
    make: "Bad Boy Tractors",
    model: "3026",
    trim: "With Loader",
    stockNumber: "3026HIL",
    condition: "Used",
    driveType: "4WD",
    fuelType: "Diesel",
    engine: "25HP Kukje",
    description:
      "25HP compact tractor with a front loader, 1,314 lb lift capacity, and a 6-year warranty — the step up from the 10 series for heavier property work.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 318,
    photo: "/images/639216217269712186.jpg",
  },
  {
    category: "Tractors",
    year: 2026,
    make: "Bad Boy Tractors",
    model: "1022",
    trim: "With Loader & Backhoe",
    stockNumber: "BB1022HILB",
    condition: "New",
    driveType: "4WD",
    fuelType: "Diesel",
    engine: "22HP",
    description:
      "22HP compact tractor with front loader, backhoe, and mid-mount mower deck — 617 lb lift capacity and a 7-year warranty. Dig-ready right off the lot.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 364,
    photo: "/images/639216184672451136.jpg",
  },
  {
    category: "Tractors",
    year: 2026,
    make: "Bad Boy Tractors",
    model: "3026",
    trim: "With Loader & Backhoe",
    stockNumber: "BB3026HILB",
    condition: "New",
    driveType: "4WD",
    fuelType: "Diesel",
    engine: "25HP Kukje",
    description:
      "25HP compact tractor with front loader and backhoe attachment — 1,314 lb lift capacity and a 6-year warranty. The biggest dig-ready package in the lineup.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 410,
    photo: "/images/639216211257464869.jpg",
  },
  {
    category: "Tractors",
    year: 2026,
    make: "Bad Boy Tractors",
    model: "4035",
    trim: "With Cab & Loader",
    stockNumber: "BB4035CHIL",
    condition: "New",
    driveType: "4WD",
    fuelType: "Diesel",
    engine: "35HP",
    description:
      "35HP compact tractor with a fully enclosed heated & AC cab and front loader — 2,200 lb lift capacity and a 6-year warranty. Year-round comfort for serious acreage.",
    cashPrice: PRICE_TBD,
    monthlyPrice: 518,
    photo: "/images/639216213968356973.jpg",
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
        featured: false,
        photos: { create: [{ url: photo, order: 0 }] },
      },
    });
    console.log(`Seeded ${data.stockNumber}${data.cashPrice === 0 ? "  (PRICE TBD)" : ""}`);
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
