"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Decorative shell shared by every highlight-style card on the site: dark
 * gradient card, hover scale/rotate, animated blobs + shimmer sweep, corner
 * accents. Takes arbitrary children so it can wrap either the compact
 * icon/title/description layout (see `HighlightCard` below) or bespoke
 * content (e.g. a logo + long copy + buttons).
 */
export function HighlightCardShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="group w-full transform cursor-pointer transition-all duration-500 hover:-rotate-1 hover:scale-105">
      <Card
        className={cn(
          "hover:shadow-3xl relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-black via-neutral-950 to-brand-black text-white shadow-2xl backdrop-blur-xl hover:border-brand-red/40 hover:shadow-brand-red/10",
          className
        )}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-40 transition-opacity duration-500 group-hover:opacity-60" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 animate-bounce rounded-full bg-gradient-to-tr from-brand-red/20 to-transparent opacity-30 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-50" />
          <div className="absolute top-10 left-10 h-16 w-16 animate-ping rounded-full bg-white/5 blur-xl" />
          <div className="absolute bottom-16 right-16 h-12 w-12 animate-ping rounded-full bg-white/5 blur-lg" />
          <div className="absolute inset-0 -skew-x-12 translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[-200%]" />
        </div>

        {children}

        <div className="absolute top-0 left-0 h-20 w-20 rounded-br-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-0 right-0 h-20 w-20 rounded-tl-3xl bg-gradient-to-tl from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Card>
    </div>
  );
}

interface HighlightCardProps {
  title: string;
  description: string[];
  icon?: ReactNode;
}

export const HighlightCard: FC<HighlightCardProps> = ({ title, description, icon }) => {
  return (
    <HighlightCardShell>
      <div className="relative z-10 flex flex-col items-center p-8 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-brand-red/20" />
          <div className="absolute inset-0 animate-pulse rounded-full border border-white/10" />

          <div className="rounded-full border border-white/20 bg-gradient-to-br from-black/80 to-black/60 p-6 shadow-2xl transition-all duration-500 hover:shadow-brand-red/20 group-hover:scale-110 group-hover:rotate-12">
            <div className="transition-transform duration-700 group-hover:rotate-180">{icon}</div>
          </div>
        </div>

        <h3 className="mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-3xl font-bold text-transparent transition-transform duration-300 group-hover:scale-105">
          {title}
        </h3>

        <div className="max-w-sm space-y-1">
          {description.map((line, idx) => (
            <p
              key={idx}
              className="text-sm leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-6 h-0.5 w-1/3 rounded-full bg-gradient-to-r from-transparent via-brand-red to-transparent transition-all duration-500 group-hover:h-1 group-hover:w-1/2" />

        <div className="mt-4 flex space-x-2 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-2 w-2 animate-bounce rounded-full bg-brand-red" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-brand-red" style={{ animationDelay: "0.1s" }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-brand-red" style={{ animationDelay: "0.2s" }} />
        </div>
      </div>
    </HighlightCardShell>
  );
};
