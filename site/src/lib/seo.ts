// Structured data (schema.org JSON-LD) that tells Google who we are, how to
// reach us and where each page sits in the site. Everything is built from
// src/lib/site.ts and src/lib/products.ts, so it stays in sync with the page.
import { mapsHref, site } from "@/lib/site";

export const abs = (path: string) => `${site.url}${path}`;

// " în Cluj-Napoca", or nothing until the city is filled in.
export const inCity = site.city ? ` în ${site.city}` : "";

const DAYS: Record<string, string> = {
  luni: "Monday",
  marți: "Tuesday",
  miercuri: "Wednesday",
  joi: "Thursday",
  vineri: "Friday",
  sâmbătă: "Saturday",
  duminică: "Sunday",
};
const ORDER = Object.keys(DAYS);

// "Luni - Vineri" -> Monday..Friday, "Sâmbătă" -> Saturday.
function dayRange(label: string) {
  const [from, to = from] = label.toLowerCase().split("-").map((s) => s.trim());
  const a = ORDER.indexOf(from);
  const b = ORDER.indexOf(to);
  return a < 0 || b < 0 ? [] : ORDER.slice(a, b + 1).map((d) => DAYS[d]);
}

export function businessJsonLd() {
  const sameAs = [site.instagram, site.facebook].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "ButcherShop",
    "@id": abs("/#business"),
    name: site.name,
    legalName: site.legalName,
    url: abs("/"),
    description: site.description,
    logo: abs("/img/logo-round-512.webp"),
    image: [abs("/img/tomahawk-1600.webp"), abs("/img/platou-10-persoane-1600.webp")],
    ...(site.phone && { telephone: site.phone.replace(/\s/g, "") }),
    ...(site.email && { email: site.email }),
    ...(site.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address,
        ...(site.city && { addressLocality: site.city }),
        ...(site.county && { addressRegion: site.county }),
        ...(site.postalCode && { postalCode: site.postalCode }),
        addressCountry: "RO",
      },
    }),
    ...(site.city && { areaServed: { "@type": "City", name: site.city } }),
    openingHoursSpecification: site.hours.map((h) => {
      const [opens, closes] = h.time.split("-").map((s) => s.trim());
      return { "@type": "OpeningHoursSpecification", dayOfWeek: dayRange(h.days), opens, closes };
    }),
    ...(mapsHref && { hasMap: mapsHref }),
    ...(sameAs.length && { sameAs }),
    priceRange: "$$",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    name: site.name,
    url: abs("/"),
    inLanguage: "ro-RO",
    publisher: { "@id": abs("/#business") },
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.href) })),
  };
}
