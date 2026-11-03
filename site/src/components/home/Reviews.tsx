import { Star } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { placeholder, reviews } from "@/lib/reviews";

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5 text-ember" role="img" aria-label={`${rating} din 5 stele`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} weight={i < rating ? "fill" : "regular"} className={i < rating ? "" : "opacity-40"} />
      ))}
    </span>
  );
}

export function Reviews() {
  // Example reviews never reach the published site.
  if (!reviews.length || (placeholder && process.env.NODE_ENV === "production")) return null;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const [featured, ...rest] = reviews;

  return (
    <section id="recenzii" aria-labelledby="recenzii-titlu" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      {placeholder && (
        <p className="mb-10 rounded-xl border border-dashed border-ember/50 p-4 text-sm text-ember">
          Recenzii de exemplu. Înlocuiește-le în src/lib/reviews.ts; până atunci secțiunea nu apare pe site-ul
          publicat. (Mesaj vizibil doar în dezvoltare.)
        </p>
      )}

      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <Reveal>
          <p className="font-wide text-xs font-semibold uppercase tracking-[0.2em] text-ember">Recenzii</p>
          <h2 id="recenzii-titlu" className="font-display mt-5 text-3xl font-semibold leading-tight md:text-5xl">
            Ce spun clienții noștri.
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-display text-6xl font-bold leading-none tabular-nums">
              {average.toFixed(1).replace(".", ",")}
            </span>
            <span>
              <Stars rating={Math.round(average)} size={18} />
              <span className="mt-1.5 block text-sm text-muted">din {reviews.length} recenzii</span>
            </span>
          </div>

          <figure className="mt-12 border-l-2 border-ember pl-6">
            <blockquote className="font-display text-xl font-medium leading-snug text-cream md:text-2xl">
              „{featured.text}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              <span className="font-semibold text-cream">{featured.name}</span>, {featured.city} · {featured.product}
            </figcaption>
          </figure>
        </Reveal>

        <ul className="columns-1 gap-4 sm:columns-2 [&>li]:mb-4">
          {rest.map((r, i) => (
            <li key={r.name} className="break-inside-avoid">
              <Reveal delay={(i % 2) * 0.08}>
                <figure className="rounded-2xl border border-line bg-ink-2/60 p-6">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-4 leading-relaxed text-cream/90">„{r.text}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid size-9 shrink-0 place-items-center rounded-full bg-ember/15 text-sm font-semibold text-ember"
                    >
                      {r.name.replace(/^Exemplu: /, "").charAt(0)}
                    </span>
                    <span className="text-sm leading-tight">
                      <span className="block font-semibold text-cream">{r.name}</span>
                      <span className="text-muted">
                        {r.city} · {r.product}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
