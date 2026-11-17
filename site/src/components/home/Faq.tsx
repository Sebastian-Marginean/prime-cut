import Link from "next/link";
import type { ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

const link = "text-ember underline decoration-ember/40 underline-offset-4 transition-colors hover:decoration-ember";

// Answers to what people actually search for. Plain text in the HTML (native
// <details>, no JavaScript), so search engines read every answer.
const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Ce înseamnă carne de vită maturată?",
    a: (
      <>
        Carnea se maturează în spații cu temperatură controlată. Enzimele naturale frăgezesc fibrele, iar gustul
        devine mai profund decât al cărnii proaspăt tăiate. Poți vedea{" "}
        <Link href="/#maturare" className={link}>
          cum arată aceeași bucată de la ziua 1 la ziua 21
        </Link>
        .
      </>
    ),
  },
  {
    q: "Ce tăieturi de vită maturată aveți?",
    a: (
      <>
        Tomahawk, T-bone, antricot cu os, antricot fără os și vrăbioară, toate maturate. Le găsești la{" "}
        <Link href="/produse/carne-de-vita/" className={link}>
          carne de vită maturată
        </Link>
        .
      </>
    ),
  },
  {
    q: "Cum comand un platou de brânzeturi?",
    a: (
      <>
        Alegi un{" "}
        <Link href="/produse/platouri/" className={link}>
          platou pentru 6, 10 sau 16 persoane
        </Link>{" "}
        sau îți compui singur platoul din cele 18 sortimente de brânză, apoi ne trimiți cererea. Platourile se
        pregătesc la comandă, cu cel puțin o zi înainte.
      </>
    ),
  },
  {
    q: "De unde sunt brânzeturile?",
    a: (
      <>
        Sunt roți de Gouda de la Huizer Kaas-Gilde, din Olanda: 18 sortimente, de la clasicul cu chimen la trufe
        negre, lavandă sau brânză de capră.{" "}
        <Link href="/produse/branzeturi/" className={link}>
          Vezi toate brânzeturile
        </Link>
        .
      </>
    ),
  },
  {
    q: "Cum pot plasa o comandă?",
    a: (
      <>
        {site.phone ? `Ne suni la ${site.phone}, ne scrii pe WhatsApp` : "Ne scrii pe WhatsApp"} sau ne trimiți un mesaj
        din{" "}
        <Link href="/#contact" className={link}>
          formularul de contact
        </Link>
        . Programul este {site.hours.map((h) => `${h.days.toLowerCase()} ${h.time}`).join(", ")}.
      </>
    ),
  },
];

export function Faq() {
  return (
    <section aria-labelledby="intrebari" className="border-y border-line bg-ink/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="font-wide text-xs font-semibold uppercase tracking-[0.2em] text-ember">Întrebări frecvente</p>
          <h2 id="intrebari" className="font-display mt-5 text-3xl font-semibold leading-tight md:text-5xl">
            Ce vrei să știi?
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted">
            Cele mai des primite întrebări despre carne, platouri și comenzi.
          </p>
          <p className="mt-8 text-sm text-muted">
            Nu găsești răspunsul?{" "}
            <Link href="/#contact" className={link}>
              Scrie-ne
            </Link>
          </p>
        </Reveal>

        <Reveal>
          <ol className="space-y-3">
            {faqs.map((f, i) => (
              <li key={f.q}>
                <details className="group rounded-2xl border border-line bg-ink-2 transition-colors duration-300 open:border-ember/40 hover:border-ember/30">
                  <summary className="flex cursor-pointer list-none items-center gap-5 p-5 md:gap-8 md:p-7 [&::-webkit-details-marker]:hidden">
                    <span
                      aria-hidden
                      className="font-display text-2xl font-semibold tabular-nums text-ember/50 transition-colors duration-300 group-open:text-ember md:text-3xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-lg font-semibold leading-snug md:text-xl">{f.q}</span>
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-ember transition-[transform,background-color,color] duration-300 ease-out-expo group-open:rotate-180 group-open:bg-ember group-open:text-ink"
                    >
                      <CaretDown size={16} weight="bold" />
                    </span>
                  </summary>
                  <div className="px-5 pb-6 md:pl-[6.125rem] md:pr-20 md:pb-8">
                    <p className="max-w-2xl border-l-2 border-ember/60 pl-5 leading-relaxed text-cream/85 md:border-0 md:pl-0">
                      {f.a}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
