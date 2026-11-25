"use client";

import Link from "next/link";
import { useState } from "react";
import { productHref, productsIn } from "@/lib/products";
import { srcSet } from "@/components/ProductImage";
import { Price } from "@/components/Price";

export function Platters() {
  const platters = productsIn("platouri");
  const [current, setCurrent] = useState(1);
  const p = platters[current];

  return (
    <section aria-labelledby="platouri" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <div className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-ink-2">
          {/* All sizes stay mounted and crossfade; the hidden ones load lazily. */}
          {platters.map((item, i) => (
            <img
              key={item.slug}
              src={`/img/${item.slug}-800.webp`}
              srcSet={srcSet(item.slug)}
              sizes="(min-width: 768px) 55vw, 100vw"
              alt={i === current ? `${item.name}: brânzeturi colorate, ceafă, struguri și nuci` : ""}
              aria-hidden={i !== current || undefined}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out-expo motion-reduce:transition-none ${
                i === current ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
        </div>

        <div>
          <h2 id="platouri" className="font-display text-3xl font-semibold leading-tight md:text-5xl">
            Platouri gata de pus pe masă.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Gouda în mai multe arome, cubulețe de brânză maturată 1 an, ceafă în mijloc, struguri și nuci. Alegi mărimea, noi le aranjăm.
          </p>

          <div role="tablist" aria-label="Mărimea platoului" className="mt-8 inline-flex rounded-full border border-line p-1">
            {platters.map((item, i) => (
              <button
                key={item.slug}
                role="tab"
                type="button"
                aria-selected={i === current}
                onClick={() => setCurrent(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  i === current ? "bg-ember text-ink" : "text-cream/80 hover:text-cream"
                }`}
              >
                {item.facts[0].value}
              </button>
            ))}
          </div>

          <div aria-live="polite">
            <Price product={p} className="mt-8 max-w-md" />
            <p className="mt-5 max-w-md leading-relaxed text-muted">{p.description}</p>
          </div>
          <Link
            href={productHref(p)}
            className="mt-6 inline-block text-sm font-semibold text-ember underline-offset-4 hover:underline"
          >
            Detalii despre {p.name.toLowerCase()}
          </Link>
          <a
            href="#platou-personalizat"
            className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-line p-5 transition-colors duration-300 hover:border-ember"
          >
            <span>
              <span className="block font-semibold">Vrei alte brânzeturi?</span>
              <span className="mt-1 block text-sm text-muted">Compune-ți singur platoul, din cele 18 sortimente.</span>
            </span>
            <span aria-hidden className="text-xl text-ember">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
