import { business, siteUrl } from "@/lib/site";

// Structured hours mirror business.hours in lib/site.ts (Mon–Fri, fixed) —
// keep both in sync if hours change. Saturday ("By Appointment") and Sunday
// (closed) are omitted since schema.org has no clean way to express
// "by appointment" as an opens/closes pair.
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    url: siteUrl,
    image: `${siteUrl}/images/tem-logo.png`,
    telephone: business.phone,
    email: business.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Bad Boy Equipment Repair & Service",
        description:
          "In-house repair and maintenance for Bad Boy mowers, tractors, and handheld equipment.",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
