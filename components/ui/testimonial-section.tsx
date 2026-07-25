"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialSection({
  testimonials,
  title = "What Our Customers Are Saying",
}: {
  testimonials: Testimonial[];
  title?: string;
}) {
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);
  const row3 = testimonials.slice(6, 9);
  const rows = [row1, row2, row3].filter((row) => row.length > 0);

  return (
    <div className="relative w-full overflow-hidden bg-brand-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      </div>

      <div className="relative mt-4 w-full">
        <div className="pointer-events-none absolute inset-0 z-0 border-y border-white/10 bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] bg-[length:10px_10px] text-white opacity-10" />

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-40 bg-gradient-to-r from-brand-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-40 bg-gradient-to-l from-brand-black to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center gap-8 overflow-hidden py-12">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="flex min-w-max items-center gap-6"
              animate={{
                x: rowIndex % 2 === 0 ? ["0%", "-25%"] : ["-25%", "0%"],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...row, ...row, ...row, ...row].map((testimonial, i) => (
                <Capsule
                  key={`${testimonial.id}-${i}`}
                  testimonial={testimonial}
                  onClick={() => setSelected(testimonial)}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-50 w-full max-w-lg rounded-2xl border-2 border-brand-red bg-brand-charcoal p-8 text-white shadow-2xl md:p-12"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-4 top-4 p-2 text-neutral-500 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <p className="mb-8 text-xl font-medium leading-relaxed md:text-2xl">
                  &ldquo;{selected.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand-red">
                    <img
                      src={selected.image}
                      alt={selected.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-bold text-white">{selected.name}</h4>
                    <p className="text-sm text-neutral-400">{selected.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Capsule({
  testimonial,
  onClick,
}: {
  testimonial: Testimonial;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-4 rounded-full border border-white/15 bg-black/60 p-2 pr-8 shadow-sm transition-all hover:border-dashed hover:border-brand-red hover:shadow-md"
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/20 transition-colors group-hover:border-brand-red">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-col items-start leading-tight">
        <span className="text-sm font-bold text-white">{testimonial.name}</span>
        <span className="text-xs text-neutral-400">{testimonial.role}</span>
      </div>
    </motion.div>
  );
}
