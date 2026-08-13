export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-md bg-white px-3 py-1.5 ${className}`}>
      <img src="/images/TEMLOGO.png" alt="Tall Equipment and Machinery" className="h-9 w-auto" />
    </span>
  );
}
