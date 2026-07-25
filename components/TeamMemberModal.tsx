"use client";

import { useEffect } from "react";
import type { TeamMember } from "@/lib/team";

export function TeamMemberModal({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 gap-6 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-6 shadow-2xl sm:grid-cols-[240px_1fr] sm:gap-8 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-700"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <img
          src={member.photo}
          alt={member.name}
          className="h-64 w-full rounded-lg object-cover sm:h-full"
        />

        <div>
          <h2 className="text-3xl font-bold text-neutral-800">
            {member.name} - {member.title}
          </h2>
          {(member.phone || member.email) && (
            <p className="mt-2 text-neutral-500">
              {member.phone}
              {member.phone && member.email && " - "}
              {member.email}
            </p>
          )}

          <div className="mt-6 font-serif text-neutral-700">
            <p>{member.greeting}</p>
            <p>{member.roleLine}</p>
          </div>

          <div className="mt-4 space-y-4 font-serif leading-relaxed text-neutral-700">
            {member.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
