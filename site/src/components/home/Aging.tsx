import { Reveal } from "@/components/Reveal";

const days = [
  { day: "Ziua 1", text: "Carnea începe maturarea, la temperatură controlată." },
  { day: "Ziua 7", text: "Enzimele naturale din carne încep să înmoaie fibrele." },
  { day: "Ziua 14", text: "Carnea e vizibil mai fragedă. Vrăbioara e gata." },
  { day: "Ziua 21", text: "Tăieturile cu os ajung la gust deplin și textură fragedă." },
];

export function Aging() {
  return (
    <section id="maturare" aria-labelledby="maturare-titlu" className="scroll-mt-24 border-y border-line bg-ink/60">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 md:grid-cols-[1fr_1.1fr] md:gap-20 md:py-32">
        <Reveal>
          <p className="font-wide text-xs font-semibold uppercase tracking-[0.2em] text-ember">Maturare</p>
          <h2 id="maturare-titlu" className="font-display mt-5 flex items-baseline gap-4">
            <span className="text-[7rem] font-bold leading-none text-ember md:text-[10rem]">21</span>
            <span className="text-3xl font-semibold md:text-4xl">de zile</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Atât lăsăm tăieturile cu os să se maturizeze înainte să ajungă la tine. Timpul face carnea mai fragedă
            și îi dă un gust mai profund decât al cărnii proaspăt tăiate.
          </p>
        </Reveal>

        <ol className="relative self-center border-l border-line pl-8 md:pl-10">
          {days.map((d, i) => (
            <li key={d.day} className="relative pb-10 last:pb-0">
              <Reveal delay={i * 0.08}>
                <span
                  aria-hidden
                  className={`absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full md:-left-[calc(2.5rem+5px)] ${
                    i === days.length - 1 ? "bg-ember" : "bg-cream/40"
                  }`}
                />
                <p className="font-wide text-sm font-semibold uppercase tracking-[0.12em] text-cream">{d.day}</p>
                <p className="mt-2 max-w-sm leading-relaxed text-muted">{d.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
