"use client";

import { useEffect, useRef, useState } from "react";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";

const days = [
  {
    day: 1,
    img: "aging-01",
    title: "Proaspătă",
    text: "Carnea începe maturarea, la temperatură controlată.",
  },
  {
    day: 7,
    img: "aging-07",
    title: "Fibrele încep să se descompună",
    text: "Enzimele naturale din carne încep să frăgezească fibrele.",
  },
  {
    day: 14,
    img: "aging-14",
    title: "Mai fragedă",
    text: "Carnea e vizibil mai fragedă.",
  },
  {
    day: 21,
    img: "aging-21",
    title: "Gata de servit",
    text: "Carnea ajunge la punctul optim de maturare: gust profund, aromă bogată și o textură care se taie ușor și rămâne suculentă.",
  },
];

// Position of a day on the 1 → 21 rail, in percent.
const at = (day: number) => ((day - 1) / 20) * 100;
const pad = (n: number) => String(n).padStart(2, "0");

export function Aging() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  // The step crossing the middle of the viewport drives the sticky photo (desktop).
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => steps.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  const current = days[active];

  return (
    <section id="maturare" aria-labelledby="maturare-titlu" className="scroll-mt-24 border-y border-line bg-ink/60">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
        <Reveal className="grid gap-8 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <div>
            <p className="font-wide text-xs font-semibold uppercase tracking-[0.2em] text-ember">Maturare</p>
            <h2 id="maturare-titlu" className="font-display mt-5 flex items-baseline gap-4">
              <span className="text-[7rem] font-bold leading-none text-ember md:text-[10rem]">21</span>
              <span className="text-3xl font-semibold md:text-4xl">de zile</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted md:pb-6">
            Atât lăsăm carnea să se maturizeze înainte să ajungă la tine. Timpul o face mai fragedă și îi dă un gust
            mai profund decât al cărnii proaspăt tăiate. Așa arată aceeași bucată, de la prima zi până la ultima.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Desktop: one sticky photo that follows the step in view. */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-ink-2">
                {days.map((d, i) => (
                  <ProductImage
                    key={d.img}
                    slug={d.img}
                    alt={`Carne de vită în ziua ${d.day} de maturare`}
                    sizes="(min-width: 1280px) 42rem, 52vw"
                    className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[900ms] ease-out-expo ${
                      i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/0 to-ink/0" />
                <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4">
                  <p className="font-wide text-xs font-semibold uppercase tracking-[0.2em] text-cream/80">
                    Ziua <span className="tabular-nums">{current.day}</span> din 21
                  </p>
                  <p
                    key={current.day}
                    aria-hidden
                    className="font-display animate-[day-in_0.6s_var(--ease-out-expo)] text-7xl font-bold leading-[0.8] tabular-nums text-cream"
                  >
                    {pad(current.day)}
                  </p>
                </div>
              </div>

              {/* 1 → 21 rail, with a stop for each photographed day. */}
              <div className="relative mt-10 h-px bg-line" aria-hidden>
                <div
                  className="absolute inset-y-0 left-0 bg-ember transition-[width] duration-700 ease-out-expo"
                  style={{ width: `${at(current.day)}%` }}
                />
              </div>
              <ol className="relative mt-0 h-12" aria-label="Zilele de maturare">
                {days.map((d, i) => (
                  <li key={d.day} className="absolute top-0 -translate-x-1/2" style={{ left: `${at(d.day)}%` }}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? "step" : undefined}
                      className="group flex flex-col items-center gap-3 px-2 pt-0"
                    >
                      <span
                        className={`-mt-[5px] size-2.5 rounded-full transition-[background-color,transform] duration-500 ${
                          d.day <= current.day ? "bg-ember" : "bg-cream/30"
                        } ${i === active ? "scale-150" : "group-hover:scale-125"}`}
                      />
                      <span
                        className={`whitespace-nowrap text-xs font-semibold tabular-nums transition-colors ${
                          i === active ? "text-cream" : "text-muted group-hover:text-cream"
                        }`}
                      >
                        Ziua {d.day}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ol className="space-y-14 lg:space-y-0">
            {days.map((d, i) => (
              <li
                key={d.day}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                data-i={i}
                className="lg:flex lg:min-h-[62vh] lg:items-center"
              >
                <Reveal>
                  {/* Mobile and tablet: each day carries its own photo. */}
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl border border-line lg:hidden">
                    <ProductImage
                      slug={d.img}
                      alt={`Carne de vită în ziua ${d.day} de maturare`}
                      sizes="(min-width: 640px) 90vw, 100vw"
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0" />
                    <p className="font-display absolute bottom-4 right-5 text-6xl font-bold leading-[0.8] tabular-nums text-cream">
                      {pad(d.day)}
                    </p>
                  </div>

                  <div
                    className={`transition-opacity duration-500 lg:border-l lg:pl-10 ${
                      i === active ? "lg:border-ember lg:opacity-100" : "lg:border-line lg:opacity-40"
                    }`}
                  >
                    <p className="font-wide text-xs font-semibold uppercase tracking-[0.2em] text-ember">
                      Ziua {d.day}
                    </p>
                    <h3 className="font-display mt-3 text-2xl font-semibold md:text-3xl">{d.title}</h3>
                    <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">{d.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
