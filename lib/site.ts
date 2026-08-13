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
  // TODO: replace with the real 0%-for-48-months financing application link
  // once provided — falls back to the on-site /financing page until then.
  financeApplicationUrl: "",
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

export const equipmentCategories = ["Mowers", "Tractors", "Handhelds"] as const;
