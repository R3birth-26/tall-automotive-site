export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-3 ${className}`}>
      <img
        src="/images/TEM-RED.png"
        alt="Tall Equipment and Machinery"
        className="h-16 w-auto md:h-9"
      />
      <span className="flex flex-col items-center leading-tight md:items-start">
        <span className="font-display text-lg font-bold uppercase tracking-wide text-white md:text-base">
          Tall Equipment &amp; Machinery
        </span>
        <span className="font-display text-lg font-semibold uppercase tracking-wide text-brand-red md:text-sm">
          Sales and Service
        </span>
      </span>
    </span>
  );
}
