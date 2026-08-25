import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocalBusinessSchema />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
