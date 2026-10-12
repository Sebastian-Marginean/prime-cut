import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Prime Cut Meat | Carne de vită maturată", template: "%s | Prime Cut Meat" },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: site.name,
    images: [{ url: "/img/tomahawk-1600.webp", width: 1600, height: 865 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0c0b",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={archivo.variable}>
      <body className="min-h-dvh">
        <a
          href="#continut"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-20 focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:text-ink"
        >
          Sari la conținut
        </a>
        <Header />
        <main id="continut">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
