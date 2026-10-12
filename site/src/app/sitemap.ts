import type { MetadataRoute } from "next";
import { categories, productHref, products } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/produse/", ...categories.map((c) => `/produse/${c.slug}/`), ...products.map(productHref)];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
