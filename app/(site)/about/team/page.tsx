import { TeamShowcase } from "@/components/TeamShowcase";
import { FixedGradientBackground } from "@/components/FixedGradientBackground";
import { team } from "@/lib/team";

export default function OurTeamPage() {
  return (
    <div className="relative">
      <FixedGradientBackground />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="font-display text-center text-5xl font-extrabold uppercase italic tracking-wide text-brand-red sm:text-6xl">
          Our Team
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-neutral-400 sm:text-base">
          The people behind Tall Automotive&apos;s sales and service — click a photo to read
          their full bio.
        </p>

        <div className="mt-12">
          <TeamShowcase team={team} />
        </div>
      </div>
    </div>
  );
}
