export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img src="/images/tem-logo.png" alt="Tall Equipment and Machinery" className="h-9 w-auto" />
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base font-bold uppercase tracking-wide text-white">
          Tall Equipment &amp; Machinery
        </span>
        <span className="font-display text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Sales and Service
        </span>
      </span>
    </span>
  );
}
