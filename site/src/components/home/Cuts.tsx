import Link from "next/link";
import { productHref, productsIn } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";

export function Cuts() {
  const cuts = productsIn("carne-de-vita");
  return (
    <section aria-labelledby="taieturi" className="py-24 md:py-32">
      <Reveal className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
        <h2 id="taieturi" className="font-display max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
          Patru tăieturi, fiecare cu gustul ei.
        </h2>
        <Link href="/produse/carne-de-vita/" className="text-sm font-semibold text-ember underline-offset-4 hover:underline">
          Toată carnea de vită
        </Link>
      </Reveal>

      {/* Native horizontal scroll with snap; the edge padding lines the first card up with the page grid. */}
      <ul
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:thin] sm:scroll-px-6 sm:px-6 xl:scroll-px-[calc((100vw-80rem)/2+1.5rem)] xl:px-[calc((100vw-80rem)/2+1.5rem)]"
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
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold transition-colors group-hover:text-ember">{p.name}</h3>
                <p className="mt-1.5 text-muted">{p.short}</p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
