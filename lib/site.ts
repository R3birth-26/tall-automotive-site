export const business = {
  name: "Tall Automotive",
  tagline: "Truck & Equipment Sales & Service — Trucks, Vans, Bad Boy Mowers & Tractors",
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
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  {
    label: "Inventory",
    href: "/inventory",
    children: [
      { label: "Trucks", href: "/inventory?category=Trucks" },
      { label: "Vans", href: "/inventory?category=Vans" },
      { label: "Zero Turns", href: "/inventory?category=Mowers" },
      { label: "New Tractors", href: "/inventory?category=Tractors&condition=New" },
      { label: "Used Inventory", href: "/inventory?condition=Used" },
    ],
  },
  { label: "Service", href: "/service" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Our Team", href: "/about/team" },
      { label: "Finance Info", href: "/financing" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const vehicleCategories = ["Trucks", "Vans"] as const;
export const equipmentOnlyCategories = ["Mowers", "Tractors", "Handhelds"] as const;
export const equipmentCategories = [...vehicleCategories, ...equipmentOnlyCategories] as const;
