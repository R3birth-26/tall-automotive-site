export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img src="/images/TEM-RED.png" alt="Tall Equipment and Machinery" className="h-9 w-auto" />
      <span className="flex flex-col leading-tight">
        <span className="font-display text-sm font-bold uppercase tracking-wide text-white sm:text-base">
          Tall Equipment &amp; Machinery
        </span>
        <span className="font-display text-[10px] font-semibold uppercase tracking-wide text-neutral-400 sm:text-xs">
          Sales and Service
        </span>
      </span>
    </span>
  );
}
