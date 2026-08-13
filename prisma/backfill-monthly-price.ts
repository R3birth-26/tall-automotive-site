// One-off: sets monthlyPrice on the 6 seeded mockup listings by stockNumber.
// Run after the add_monthly_price migration has been applied.
import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN before running this.");
  process.exit(1);
}

const client = createClient({ url, authToken });

const prices: Record<string, number> = {
  "BB-MAV-HD-60": 161,
  "BB-ZT-ELITE-60": 110,
  "BB-ZT-AVG-54": 98,
  "BB-1022-LDR": 172,
  "BB-1025-BH": 205,
  "BB-1025-LDR": 205,
};

async function main() {
  for (const [stockNumber, monthlyPrice] of Object.entries(prices)) {
    const result = await client.execute({
      sql: `UPDATE Equipment SET monthlyPrice = ? WHERE stockNumber = ?`,
      args: [monthlyPrice, stockNumber],
    });
    console.log(`${stockNumber}: ${result.rowsAffected} row(s) updated`);
  }
}

main();
