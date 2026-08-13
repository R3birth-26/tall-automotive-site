export type Testimonial = {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
};

/**
 * Placeholder testimonials — sample copy only. Swap in real customer
 * reviews (name, role/location, quote, photo if available) before launch.
 */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mike T.",
    role: "Mower Owner",
    image: "/person-placeholder.svg",
    quote: "Quick, honest, and fair — exactly what you want from a repair shop.",
  },
  {
    id: "2",
    name: "Dana R.",
    role: "Equipment Buyer",
    image: "/person-placeholder.svg",
    quote: "They walked me through the financing options and made it easy.",
  },
  {
    id: "3",
    name: "Chris B.",
    role: "Local Customer",
    image: "/person-placeholder.svg",
    quote: "Friendly staff, and my mower was ready faster than expected.",
  },
  {
    id: "4",
    name: "Laura P.",
    role: "Mower Customer",
    image: "/person-placeholder.svg",
    quote: "Found the right mower for my property without any pressure.",
  },
  {
    id: "5",
    name: "Steve K.",
    role: "Repeat Customer",
    image: "/person-placeholder.svg",
    quote: "Straightforward pricing — no surprises at the counter.",
  },
  {
    id: "6",
    name: "Andre F.",
    role: "Tractor Owner",
    image: "/person-placeholder.svg",
    quote: "My tractor runs better now than when I bought it.",
  },
  {
    id: "7",
    name: "Nicole H.",
    role: "Handheld Equipment Owner",
    image: "/person-placeholder.svg",
    quote: "They service everything, not just what they sell — big plus.",
  },
  {
    id: "8",
    name: "Tom W.",
    role: "Equipment Customer",
    image: "/person-placeholder.svg",
    quote: "Financing made a new mower actually affordable for us.",
  },
  {
    id: "9",
    name: "Karen S.",
    role: "Longtime Customer",
    image: "/person-placeholder.svg",
    quote: "Been coming here for years — always solid work.",
  },
];
