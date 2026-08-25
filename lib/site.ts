export const siteUrl = "https://tallequipment.com";

export const business = {
  name: "Tall Equipment and Machinery",
  tagline: "Equipment & Machinery Sales and Service — Bad Boy Mowers, Tractors & Handheld Equipment",
  phone: "603-489-1754",
  phoneHref: "tel:6034891754",
  smsHref: "sms:6034891754",
  address: {
    line1: "285 Stage Rd",
    city: "Hampstead",
    state: "NH",
    zip: "03841",
  },
  hours: [
    { days: "Mon – Fri", time: "8:00 AM – 5:00 PM" },
    { days: "Saturday", time: "By Appointment" },
    { days: "Sunday", time: "Closed" },
  ],
  directionsUrl: "https://maps.google.com/?q=285+Stage+Rd+Hampstead+NH+03841",
  financeApplicationUrl: "https://prequalify.sheffieldfinancial.com/Apply/Landing?source=web&dealer=62317",
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  {
    label: "Our Store",
    href: "/inventory",
    children: [
      { label: "Shop All", href: "/inventory" },
      { label: "Shop Mowers", href: "/inventory?category=Mowers" },
      { label: "Shop Tractors", href: "/inventory?category=Tractors" },
      { label: "Shop Handhelds", href: "/inventory?category=Handhelds" },
    ],
  },
  { label: "Financing", href: "/financing" },
  { label: "Contact", href: "/contact" },
];

export const equipmentCategories = ["Mowers", "Tractors", "Handhelds"] as const;
