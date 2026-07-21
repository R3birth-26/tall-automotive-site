"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Glass card shell with a 3D mouse-tilt and a traveling light-beam border
 * that animates around the edge on hover. Purely decorative chrome — drop
 * any content in as children.
 */
export function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [6, -6]);
  const rotateY = useTransform(mouseX, [-150, 150], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative"
      >
        <div className="pointer-events-none absolute -inset-px overflow-hidden rounded-2xl">
          <motion.div
            className="absolute left-0 top-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"
            animate={{ left: ["-50%", "100%"] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
          />
          <motion.div
            className="absolute right-0 top-0 h-1/2 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 0.6 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"
            animate={{ right: ["-50%", "100%"] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.2 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-1/2 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"
            animate={{ bottom: ["-50%", "100%"] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.8 }}
          />
        </div>

        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition-colors duration-300 group-hover:border-white/20",
            className
          )}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
