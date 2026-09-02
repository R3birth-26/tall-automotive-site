import Link from "next/link";
import { Wrench, CreditCard, Tractor } from "lucide-react";
import { Logo } from "@/components/Logo";
import { HighlightCard } from "@/components/ui/highlight-card";
import { business, nav } from "@/lib/site";

const quickLinks = [
  nav[0],
  { label: "Schedule Service", href: "/contact" },
  ...nav.slice(1),
];

const infoItems = [
  {
    title: "Bad Boy Authorized Factory Repair Shop",
    body: "We can repair Bad Boy equipment in-house — no shipping hassle or waiting months for a costly in-home tech.",
    icon: <Wrench className="h-8 w-8 text-white" />,
    cta: { label: "Schedule Service", href: "/contact" },
  },
  {
    title: "Easy Financing",
    body: "Every mower, tractor, and handheld listing qualifies for easy financing through our partner, Sheffield Financial.",
    icon: <CreditCard className="h-8 w-8 text-white" />,
    cta: { label: "Apply & Get Approved", href: business.financeApplicationUrl, external: true },
  },
  {
    title: "Bad Boy Equipment",
    body: "Authorized Bad Boy dealer for mowers, tractors, and handheld equipment — sales, parts, and service.",
    icon: <Tractor className="h-8 w-8 text-white" />,
    cta: { label: "Shop Now", href: "/inventory" },
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-black text-neutral-300">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
        {infoItems.map((item) => (
          <HighlightCard
            key={item.title}
            title={item.title}
            description={[item.body]}
            icon={item.icon}
            cta={item.cta}
          />
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 border-t border-white/10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-neutral-400">{business.tagline}</p>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">
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
          <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {quickLinks.map((item) => (
              <li key={item.label}>
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
          <Link href="/privacy" className="hover:text-brand-red hover:underline">
            Privacy Policy
          </Link>
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
