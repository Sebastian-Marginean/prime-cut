"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { productHref, productsIn } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import { CardPrice } from "@/components/Price";

const arrow =
  "grid size-11 place-items-center rounded-full border border-cream/20 text-cream transition-[background-color,border-color,color,opacity] duration-300 hover:border-ember hover:bg-ember hover:text-ink disabled:pointer-events-none disabled:opacity-30";

export function Cuts() {
  const cuts = productsIn("carne-de-vita");
  const track = useRef<HTMLUListElement>(null);
  // Visible share of the track and how far it is scrolled, both 0..1.
  const [view, setView] = useState({ size: 1, progress: 0 });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setView({ size: el.clientWidth / el.scrollWidth, progress: max > 0 ? el.scrollLeft / max : 0 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (el && card) el.scrollBy({ left: dir * (card.clientWidth + 20), behavior: "smooth" });
  };

  const scrollable = view.size < 0.999;

  return (
    <section aria-labelledby="taieturi" className="py-24 md:py-32">
      <Reveal className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
        <h2 id="taieturi" className="font-display max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
          Cinci tăieturi, fiecare cu gustul ei.
        </h2>
        <Link href="/produse/carne-de-vita/" className="text-sm font-semibold text-ember underline-offset-4 hover:underline">
          Toată carnea de vită
        </Link>
      </Reveal>

      {/* Native horizontal scroll with snap; the edge padding lines the first card up with the page grid. */}
      <ul
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 sm:scroll-px-6 sm:px-6 xl:scroll-px-[calc((100vw-80rem)/2+1.5rem)] xl:px-[calc((100vw-80rem)/2+1.5rem)]"
        aria-label="Tăieturi de vită"
      >
        {cuts.map((p, i) => (
          <li key={p.slug} className="w-[85vw] shrink-0 snap-start sm:w-[28rem] lg:w-[34rem]">
            <Reveal delay={i * 0.06}>
              <Link href={productHref(p)} className="group block">
                <div className="overflow-hidden rounded-2xl border border-line">
                  <ProductImage
                    slug={p.slug}
                    alt={p.name}
                    sizes="(min-width: 1024px) 34rem, (min-width: 640px) 28rem, 85vw"
                    className="aspect-[37/20] w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                  />
                          </div>
                <h3 className="mt-5 text-xl font-semibold transition-colors group-hover:text-ember">{p.name}</h3>
                <p className="mt-1.5 text-muted">{p.short}</p>
                <CardPrice product={p} />
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      {scrollable && (
        <div className="mx-auto mt-10 flex max-w-7xl items-center gap-6 px-4 sm:px-6">
          <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-cream/10" aria-hidden>
            <div
              className="absolute inset-y-0 rounded-full bg-ember transition-[left] duration-150 ease-out"
              style={{ width: `${view.size * 100}%`, left: `${view.progress * (1 - view.size) * 100}%` }}
            />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} disabled={view.progress <= 0.01} aria-label="Tăietura anterioară" className={arrow}>
              <ArrowLeft size={18} weight="bold" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={view.progress >= 0.99} aria-label="Tăietura următoare" className={arrow}>
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
