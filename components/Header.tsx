"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { business, nav } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-brand-black/70 backdrop-blur-md" : "bg-brand-black"
      }`}
    >
      <div className="border-b border-white/10 bg-black/40 text-xs text-neutral-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6">
          <span>
            {business.address.line1}, {business.address.city}, {business.address.state}{" "}
            {business.address.zip}
          </span>
          <a href={business.phoneHref} className="font-semibold text-white hover:text-brand-red">
            {business.phone}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative py-2">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-neutral-200 hover:text-brand-red"
                >
                  {item.label}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <div className="invisible absolute left-0 top-full min-w-[200px] rounded-md border border-neutral-800 bg-brand-black py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-white/5 hover:text-brand-red"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold uppercase tracking-wide text-neutral-200 hover:text-brand-red"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <Link
          href="/inventory"
          className="rounded-md bg-brand-red px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark md:hidden"
        >
          Inventory
        </Link>
      </div>
    </header>
  );
}
