import Link from "next/link";
import { productHref, productsIn } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";

export function Cheeses() {
  const cheeses = productsIn("branzeturi");
  // Rendered twice so the CSS marquee can loop seamlessly.
  const loop = [...cheeses, ...cheeses];

  return (
    <section aria-labelledby="branzeturi" className="py-24 md:py-32">
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 id="branzeturi" className="font-display max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
          20 de feluri de Gouda, din Olanda.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          De la clasicul cu chimion până la trufe negre, lavandă sau lapte de capră. Toate de la Huizer Kaas-Gilde.
        </p>
      </Reveal>

      <div className="marquee mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul className="marquee-track flex w-max gap-6">
          {loop.map((p, i) => (
            <li key={`${p.slug}-${i}`} className="w-44 shrink-0 md:w-56" aria-hidden={i >= cheeses.length || undefined}>
              <Link href={productHref(p)} tabIndex={i >= cheeses.length ? -1 : undefined} className="group block text-center">
                <ProductImage
                  slug={p.slug}
                  alt={p.name}
                  sizes="224px"
                  eager
                  className="aspect-square w-full object-contain drop-shadow-[0_18px_28px_rgb(0_0_0/0.55)] transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
                />
                <span className="mt-3 block text-sm text-cream/85 transition-colors group-hover:text-ember">{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
        <Link href="/produse/branzeturi/" className="text-sm font-semibold text-ember underline-offset-4 hover:underline">
          Toate brânzeturile
        </Link>
      </div>
    </section>
  );
}
