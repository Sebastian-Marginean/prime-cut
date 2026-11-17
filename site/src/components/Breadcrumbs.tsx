import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

// Visible trail ("Acasă / Produse / ...") plus the same trail for Google,
// which shows it under the page title in search results.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Acasă", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-cream/90">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="transition-colors hover:text-ember">
                    {c.name}
                  </Link>
                  <span aria-hidden className="text-muted">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
