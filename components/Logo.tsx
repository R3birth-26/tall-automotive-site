export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/uploads/logo2.png"
      alt="Tall Automotive"
      className={`h-12 w-auto ${className}`}
    />
  );
}
