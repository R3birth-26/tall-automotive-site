export function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      {children}
    </div>
  );
}
