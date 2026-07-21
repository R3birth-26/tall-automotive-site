export type TeamMember = {
  id: string;
  name: string;
  title: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  greeting: string;
  roleLine: string;
  bio: string[];
  photo: string;
  draft?: boolean;
};

export const team: TeamMember[] = [
  {
    id: "justin",
    name: "Justin",
    title: "Service Technician",
    phone: "603-489-1754",
    phoneHref: "tel:6034891754",
    email: "tallautomotive@gmail.com",
    greeting: "Meet Justin",
    roleLine: "Automotive Maintenance Technician",
    bio: [
      "Justin is a bright young technician who brings a positive attitude and a smile wherever he goes. His friendly personality and strong work ethic make him a valued member of the Tall Automotive Sales and Service Corp. team.",
      "Specializing in general automotive maintenance, Justin takes pride in his attention to detail and commitment to customer safety. Every vehicle he services receives a thorough 22-point inspection to help ensure it is safe, reliable, and ready for the road.",
      "Justin believes that every customer deserves quality workmanship and honest service, and he works hard to make sure each vehicle leaves the shop in top condition.",
    ],
    photo: "/uploads/justin.jpg",
  },
  {
    id: "tristan",
    name: "Tristan",
    title: "Service Technician",
    phone: "603-489-1754",
    phoneHref: "tel:6034891754",
    email: "tallautomotive@gmail.com",
    greeting: "Meet Tristan",
    roleLine: "Automotive Repair Technician",
    bio: [
      "Tristan is the Swiss Army knife of the automotive industry. Having grown up around cars and racing, his passion for the industry began at a young age while spending time at New England Dragway.",
      "As a highly skilled automotive repair technician, Tristan has the knowledge and experience to tackle everything from routine maintenance to complex repairs. He takes tremendous pride in his craftsmanship, paying close attention to every detail and ensuring each repair is completed with precision.",
      "Known for his clean workmanship and meticulous attention to detail, Tristan approaches every job with the goal of making it look and perform as though it came straight from the factory. His dedication to quality and commitment to doing the job right make him an invaluable member of the Tall Automotive Sales and Service Corp. team.",
    ],
    photo: "/uploads/tristan.jpg",
  },
  {
    id: "gary",
    name: "Gary Tall",
    title: "Sales",
    phone: "603-489-1754",
    phoneHref: "tel:6034891754",
    email: "tallautomotive@gmail.com",
    greeting: "Meet Gary Tall",
    roleLine: "Sales",
    bio: [
      "Gary has been in the automotive sales industry for over 40 years, bringing decades of experience and product knowledge to every customer he serves. His career began in 1984, selling Porsche, Mercedes-Benz, and BMW in southern Massachusetts, where he built a reputation for outstanding customer service and professionalism.",
      "Known for his friendly personality and extensive knowledge, Gary takes pride in helping each customer find the right solution for their needs. Whether you're shopping for new or used equipment, Gary is committed to making the buying process easy, honest, and enjoyable. His goal is simple—to ensure every customer leaves confident they received the right equipment at a fair price.",
    ],
    photo: "/uploads/gary.jpg",
  },
  {
    id: "josh",
    name: "Josh Tall",
    title: "Owner Operator",
    phone: "603-489-1754",
    phoneHref: "tel:6034891754",
    email: "tallautomotive@gmail.com",
    greeting: "Meet Josh Tall",
    roleLine: "Owner & Operator",
    bio: [
      "Josh Tall is the owner and operator of Tall Automotive Sales and Service Corp. With nearly 20 years of experience in the automotive repair industry, Josh combines hands-on expertise with a strong educational background, holding college degrees in Business Science and Automotive Technology.",
      "Growing up in the automotive industry, Josh has been around vehicles and equipment his entire life. He began working alongside his father at his dealership at just five years old, where he developed the work ethic, values, and customer-first approach that continue to guide the business today.",
      "Whether you're purchasing new equipment, maintaining your vehicle, or repairing your lawn and commercial equipment, Josh believes in treating every customer like family. He takes the time to understand each customer's needs, works within their budget whenever possible, and is committed to providing honest advice, quality workmanship, and a fair deal every time.",
      "For Josh, success isn't just about fixing vehicles or selling equipment—it's about building lasting relationships based on trust, integrity, and exceptional service.",
    ],
    photo: "/uploads/josh.jpg",
  },
];
