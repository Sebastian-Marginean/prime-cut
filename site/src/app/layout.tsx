import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { businessJsonLd, inCity, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Carne de vită maturată, platouri și brânzeturi${inCity} | Prime Cut Meat`,
    template: "%s | Prime Cut Meat",
  },
  description: `Carne de vită maturată 14-21 de zile (tomahawk, T-bone, antricot), platouri de brânzeturi pregătite la comandă și 18 sortimente de Gouda olandez${inCity}.`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: site.name,
    url: "/",
    images: [{ url: "/img/tomahawk-1600.webp", width: 1600, height: 865 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  ...(site.googleVerification && { verification: { google: site.googleVerification } }),
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
        <WhatsappButton />
        <JsonLd data={businessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
