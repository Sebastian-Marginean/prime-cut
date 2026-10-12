"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { productHref, productsIn } from "@/lib/products";

export function Platters() {
  const platters = productsIn("platouri");
  const [current, setCurrent] = useState(1);
  const reduce = useReducedMotion();
  const p = platters[current];

  return (
    <section aria-labelledby="platouri" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <div className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-ink-2">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={p.slug}
              src={`/img/${p.slug}-1600.webp`}
              srcSet={`/img/${p.slug}-800.webp 800w, /img/${p.slug}-1600.webp 1600w`}
              sizes="(min-width: 768px) 55vw, 100vw"
              alt={`${p.name}: brânzeturi colorate, mezeluri, struguri și nuci`}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
        </div>

        <div>
          <h2 id="platouri" className="font-display text-3xl font-semibold leading-tight md:text-5xl">
            Platouri gata de pus pe masă.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Brânzeturi în mai multe arome, mezeluri fine, struguri și nuci. Alegi mărimea, noi le aranjăm.
          </p>

          <div role="tablist" aria-label="Mărimea platoului" className="mt-8 inline-flex rounded-full border border-line p-1">
            {platters.map((item, i) => (
              <button
                key={item.slug}
                role="tab"
                type="button"
                aria-selected={i === current}
                onClick={() => setCurrent(i)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  i === current ? "text-ink" : "text-cream/80 hover:text-cream"
                }`}
              >
                {i === current && (
                  <motion.span
                    layoutId="platter-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-ember"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{item.facts[0].value}</span>
              </button>
            ))}
          </div>

          <p className="mt-6 max-w-md leading-relaxed text-muted" aria-live="polite">
            {p.description}
          </p>
          <Link
            href={productHref(p)}
            className="mt-6 inline-block text-sm font-semibold text-ember underline-offset-4 hover:underline"
          >
            Detalii despre {p.name.toLowerCase()}
          </Link>
        </div>
      </div>
    </section>
  );
}
