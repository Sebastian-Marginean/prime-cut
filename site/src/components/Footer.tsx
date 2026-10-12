import Link from "next/link";
import { categories } from "@/lib/products";
import { site, telHref } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img
            src="/img/logo-wide-1400.webp"
            alt="Prime Cut Meat"
            width={280}
            height={187}
            loading="lazy"
            className="w-56 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_72%)]"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
        </div>
        <nav aria-label="Produse">
          <h2 className="text-sm font-semibold text-cream">Produse</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/produse/${c.slug}/`} className="transition-colors hover:text-ember">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/produse/" className="transition-colors hover:text-ember">
                Toate produsele
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-cream">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {site.phone && (
              <li>
                <a href={telHref(site.phone)} className="transition-colors hover:text-ember">{site.phone}</a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-ember">{site.email}</a>
              </li>
            )}
            {site.address && <li>{site.address}</li>}
            {site.instagram && (
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ember">Instagram</a>
              </li>
            )}
            {site.facebook && (
              <li>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ember">Facebook</a>
              </li>
            )}
            <li>
              <Link href="/#contact" className="transition-colors hover:text-ember">Program și comenzi</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-4 pb-10 text-xs text-muted/70 sm:px-6">© {year} {site.name}</p>
    </footer>
  );
}
