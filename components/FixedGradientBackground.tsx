import { BGPattern } from "@/components/ui/bg-pattern";

export function FixedGradientBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-brand-charcoal to-black" />
      <BGPattern
        variant="diagonal-stripes"
        mask="fade-y"
        size={32}
        fill="rgba(255,255,255,0.1)"
        className="absolute inset-0 z-0"
      />
    </div>
  );
}
