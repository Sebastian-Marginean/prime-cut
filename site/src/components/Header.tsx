"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { categories } from "@/lib/products";

const links = [
  ...categories.map((c) => ({ href: `/produse/${c.slug}/`, label: c.slug === "carne-de-vita" ? "Carne de vită" : c.name })),
  { href: "/#maturare", label: "Maturare" },
];

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-10 px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full pl-2 pr-2 transition-[background-color,border-color,box-shadow] duration-500 md:pl-3 ${
          scrolled || open ? "glass backdrop-blur-xl backdrop-saturate-150" : "border border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-3" aria-label="Prime Cut Meat, pagina principală">
          <img src="/img/logo-round-512.webp" alt="" width={44} height={44} className="size-11 rounded-full" />
          <span className="font-wide text-[13px] font-bold uppercase tracking-[0.14em] max-sm:hidden">Prime Cut</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 hover:text-ember ${
                active(l.href) ? "text-ember" : "text-cream/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-[#f2b768] active:scale-[0.98] sm:inline-flex"
          >
            Contactează-ne
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            className="grid size-11 place-items-center rounded-full border border-cream/15 text-cream lg:hidden"
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Meniu mobil"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass relative z-20 bg-ink/90 backdrop-blur-xl backdrop-saturate-150 mx-auto mt-2 max-w-7xl rounded-2xl p-3 lg:hidden"
          >
            {[...links, { href: "/#contact", label: "Contactează-ne" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3.5 text-lg ${active(l.href) ? "text-ember" : "text-cream"} hover:bg-cream/5`}
              >
                {l.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
