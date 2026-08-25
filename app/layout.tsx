import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const title = "Tall Equipment and Machinery | Bad Boy Mowers & Tractors – Hampstead, NH";
const description =
  "Tall Equipment and Machinery in Hampstead, NH sells and services Bad Boy Mowers, tractors, and handheld equipment — with cash pricing and easy financing on every listing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | Tall Equipment and Machinery` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Tall Equipment and Machinery",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/mower-service-hero.jpg", width: 1800, height: 1004 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/mower-service-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
