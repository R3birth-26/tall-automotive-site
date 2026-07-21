import Link from "next/link";
import { Logo } from "@/components/Logo";
import { GlowBorderBox } from "@/components/ui/glow-border-box";
import { business, nav } from "@/lib/site";

const infoItems = [
  {
    title: "Trucks & Vans",
    body: "We sell trucks and vans, and specialize in repair — but we service everything that comes through the door.",
  },
  {
    title: "Financing Available",
    body: "Every truck, van, mower, tractor, and handheld listing shows both a cash price and a finance price up front.",
  },
  {
    title: "Bad Boy Equipment",
    body: "Authorized Bad Boy dealer for mowers, tractors, and handheld equipment — sales, parts, and service.",
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-black text-neutral-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-16 sm:px-6 md:grid-cols-3">
        {infoItems.map((item) => (
          <GlowBorderBox key={item.title}>
            <div className="p-6 text-center">
              <h3 className="font-display text-lg font-bold text-brand-red">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-300">{item.body}</p>
            </div>
          </GlowBorderBox>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-neutral-400">{business.tagline}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Visit Us
          </h3>
          <p className="mt-3 text-sm">
            {business.address.line1}
            <br />
            {business.address.city}, {business.address.state} {business.address.zip}
          </p>
          <a
            href={business.phoneHref}
            className="mt-2 inline-block text-sm font-semibold text-brand-red hover:underline"
          >
            {business.phone}
          </a>
          <ul className="mt-4 space-y-1 text-sm text-neutral-400">
            {business.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-red">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-neutral-500 sm:px-6">
        <p>&copy; {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p className="mt-1">
          {business.name} &middot; {business.address.line1}, {business.address.city},{" "}
          {business.address.state} {business.address.zip} &middot; {business.phone}
        </p>
        <p className="mt-1">
          Another Site Made With ❤️ By{" "}
          <a
            href="https://shiftorigin.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-neutral-400 hover:text-brand-red"
          >
            Origin
          </a>
        </p>
      </div>
    </footer>
  );
}
