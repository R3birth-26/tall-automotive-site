"use client";

import { useState } from "react";
import type { TeamMember } from "@/lib/team";
import { TeamMemberModal } from "@/components/TeamMemberModal";

export function TeamShowcase({ team }: { team: TeamMember[] }) {
  const [active, setActive] = useState<TeamMember | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-start sm:justify-center sm:gap-0">
        {team.map((member, i) => (
          <button
            key={member.id}
            type="button"
            onClick={() => setActive(member)}
            className={`group relative text-left sm:w-[240px] ${i > 0 ? "sm:-ml-6" : ""}`}
            style={{ zIndex: team.length - i }}
          >
            <div
              className="relative aspect-[3/4] overflow-hidden bg-neutral-800 transition-transform duration-300 sm:group-hover:z-20 sm:group-hover:scale-[1.04]"
              style={{ clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)" }}
            >
              <img
                src={member.photo}
                alt={member.name}
                className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <span className="absolute left-3 top-3 h-6 w-2.5 -skew-x-12 bg-brand-red" />
            </div>
            <div
              className="relative -mt-5 bg-brand-black py-3 pl-8 pr-4 sm:group-hover:z-20"
              style={{ clipPath: "polygon(7% 0%, 100% 0%, 93% 100%, 0% 100%)" }}
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-red" />
              <p className="font-display truncate text-sm font-bold uppercase tracking-wide text-white">
                {member.name}
              </p>
              <p className="truncate text-xs italic text-neutral-400">{member.title}</p>
            </div>
          </button>
        ))}
      </div>

      {active && <TeamMemberModal member={active} onClose={() => setActive(null)} />}
    </div>
  );
}
