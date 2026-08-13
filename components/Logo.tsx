export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/images/TEMLOGO.png"
      alt="Tall Equipment and Machinery"
      className={`h-9 w-auto ${className}`}
    />
  );
}
