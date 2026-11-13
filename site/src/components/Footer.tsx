import Link from "next/link";
import { ArrowUpRight, FacebookLogo, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/lib/products";
import { showWhatsapp, site, telHref, whatsappHref, WHATSAPP_MISSING } from "@/lib/site";

const explore = [
  { href: "/#maturare", label: "Cum maturăm carnea" },
  { href: "/#platou-personalizat", label: "Platou personalizat" },
  { href: "/#contact", label: "Comenzi și contact" },
];

const socials = [
  { href: site.instagram, label: "Instagram", handle: "@prime_cut_meat", Icon: InstagramLogo },
  { href: site.facebook, label: "Facebook", handle: "Prime Cut Meat", Icon: FacebookLogo },
  ...(showWhatsapp
    ? [{ href: whatsappHref() || "#contact", label: "WhatsApp", handle: "Scrie-ne direct", Icon: WhatsappLogo }]
    : []),
].filter((s) => s.href);
const isExternal = (href: string) => href.startsWith("http");

const link = "transition-colors duration-200 hover:text-ember";
const heading = "font-wide text-xs font-semibold uppercase tracking-[0.2em] text-ember";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    // A solid panel lifted off the marble: full-bleed on phones, a rounded
    // sheet with a gold top edge from lg up.
    <footer className="mt-24 lg:px-6">
      <div className="relative overflow-hidden border-t border-line bg-[#110e0c] shadow-[0_-24px_60px_rgb(0_0_0/0.45)] lg:mx-auto lg:max-w-[96rem] lg:rounded-t-[2.5rem] lg:border-x">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/70 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_50%_0%,rgb(233_165_75/0.10),transparent_70%)]" />
        {/* Call to action */}
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-b border-line px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <p className={heading}>Prime Cut Meat</p>
            <p className="font-display mt-4 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
              Masa ta, pregătită cu răbdare.
            </p>
          </div>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 self-start rounded-full bg-ember py-2 pl-6 pr-2 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-[#f2b768] md:self-auto"
          >
            Fă o comandă
            <span className="grid size-9 place-items-center rounded-full bg-ink text-ember transition-transform duration-500 ease-out-expo group-hover:rotate-45">
              <ArrowUpRight size={16} weight="bold" />
            </span>
          </Link>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div>
            <img
              src="/img/logo-wide-720.webp"
              srcSet="/img/logo-wide-360.webp 360w, /img/logo-wide-540.webp 540w, /img/logo-wide-720.webp 720w"
              sizes="208px"
              alt="Prime Cut Meat"
              width={280}
              height={187}
              loading="lazy"
              className="-ml-4 w-52 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_72%)]"
            />
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{site.description}</p>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : { title: WHATSAPP_MISSING })}
                      aria-label={`${site.name} pe ${label}`}
                      className="grid size-11 place-items-center rounded-full border border-cream/20 text-cream transition-[background-color,border-color,color] duration-300 hover:border-ember hover:bg-ember hover:text-ink"
                    >
                      <Icon size={20} weight="regular" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Produse">
            <h2 className={heading}>Produse</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/produse/${c.slug}/`} className={link}>
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/produse/" className={link}>
                  Toate produsele
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Explorează">
            <h2 className={heading}>Explorează</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {site.phone && (
                <li>
                  <a href={telHref(site.phone)} className={link}>{site.phone}</a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className={link}>{site.email}</a>
                </li>
              )}
              {site.address && <li>{site.address}</li>}
              {socials.map(({ href, label, handle }) => (
                <li key={label}>
                  <a href={href} {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={link}>
                    {label} <span className="text-muted">· {handle}</span>
                  </a>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-1.5 text-sm">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-muted">{h.days}</dt>
                  <dd className="tabular-nums text-cream/90">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 pb-8 text-xs text-muted/70 sm:px-6">
          <p>© {year} {site.name}. Toate drepturile rezervate.</p>
          <a href="#continut" className={link}>
            Înapoi sus ↑
          </a>
        </div>

        {/* Oversized wordmark, cropped by the bottom edge. */}
        <p
          aria-hidden
          className="font-wide pointer-events-none -mb-[0.28em] select-none whitespace-nowrap text-center text-[13.5vw] font-bold uppercase leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgb(233_165_75/0.18)] xl:text-[11.5rem]"
        >
          Prime Cut
        </p>
      </div>
    </footer>
  );
}
