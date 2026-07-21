import React from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps children in a rotating conic-gradient glow border (multiple stacked,
 * blurred layers that spin faster on hover/focus). Adapted from an animated
 * search-bar reference — kept just the border chrome, sized to fit any box
 * instead of a fixed input width.
 *
 * The glow layers bleed outward past the opaque inner box (negative inset)
 * so the blur has room to show as a halo around the edge — sizing them
 * exactly to the box (inset-0) hides the glow completely underneath it.
 */
export function GlowBorderBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="group relative isolate flex">
      <div
        className="absolute -inset-[3px] z-[-1] overflow-hidden rounded-xl blur-[2px]
                   before:absolute before:top-1/2 before:left-1/2 before:z-[-2] before:h-[999px] before:w-[999px]
                   before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60 before:bg-no-repeat before:content-['']
                   before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)]
                   before:transition-all before:duration-2000
                   group-hover:before:rotate-[-120deg] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms]"
      />
      <div
        className="absolute -inset-[2px] z-[-1] overflow-hidden rounded-xl blur-[1.5px]
                   before:absolute before:top-1/2 before:left-1/2 before:z-[-2] before:h-[600px] before:w-[600px]
                   before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg] before:bg-no-repeat before:content-['']
                   before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)]
                   before:transition-all before:duration-2000
                   group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]"
      />
      <div
        className="absolute -inset-px z-[-1] overflow-hidden rounded-lg blur-[1px]
                   before:absolute before:top-1/2 before:left-1/2 before:z-[-2] before:h-[600px] before:w-[600px]
                   before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg] before:bg-no-repeat before:content-['']
                   before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)]
                   before:brightness-140 before:transition-all before:duration-2000
                   group-hover:before:rotate-[-97deg] group-focus-within:before:rotate-[443deg] group-focus-within:before:duration-[4000ms]"
      />
      <div
        className="absolute -inset-px z-[-1] overflow-hidden rounded-xl blur-[0.5px]
                   before:absolute before:top-1/2 before:left-1/2 before:z-[-2] before:h-[600px] before:w-[600px]
                   before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70 before:bg-no-repeat before:content-['']
                   before:bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)]
                   before:brightness-130 before:transition-all before:duration-2000
                   group-hover:before:rotate-[-110deg] group-focus-within:before:rotate-[430deg] group-focus-within:before:duration-[4000ms]"
      />

      <div className={cn("relative w-full rounded-xl bg-black/60 backdrop-blur-sm", className)}>
        {children}
      </div>
    </div>
  );
}
