export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/images/logo2.png"
      alt="Tall Automotive"
      className={`h-12 w-auto ${className}`}
    />
  );
}
