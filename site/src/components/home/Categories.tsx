import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";

const [meat, platters, cheese] = categories;

function TileText({ name, tagline }: { name: string; tagline: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h3 className="font-display text-2xl font-semibold md:text-3xl">{name}</h3>
        <p className="mt-1 text-sm text-cream/75">{tagline}</p>
      </div>
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-cream/25 transition-[background-color,border-color,color,transform] duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
        <ArrowUpRight size={18} weight="bold" />
      </span>
    </div>
  );
}

export function Categories() {
  return (
    <section aria-labelledby="categorii" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <Reveal>
        <h2 id="categorii" className="font-display max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
          Trei categorii, alese pentru mesele care contează.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
        <Reveal className="md:col-span-2 md:row-span-2">
          <Link
            href={`/produse/${meat.slug}/`}
            className="group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl border border-line p-6 md:min-h-[36rem] md:p-8"
          >
            <ProductImage
              slug={meat.cover}
              alt="T-bone de vită maturat, pe fund de lemn"
              sizes="(min-width: 768px) 66vw, 100vw"
              className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
            <TileText name={meat.name} tagline={meat.tagline} />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href={`/produse/${platters.slug}/`}
            className="group relative isolate flex h-full min-h-[17rem] flex-col justify-end overflow-hidden rounded-2xl border border-line p-6"
          >
            <ProductImage
              slug={platters.cover}
              alt="Platou cu brânzeturi colorate, mezeluri, struguri și nuci"
              sizes="(min-width: 768px) 33vw, 100vw"
              className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />
            <TileText name={platters.name} tagline={platters.tagline} />
          </Link>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href={`/produse/${cheese.slug}/`}
            className="group relative isolate flex h-full min-h-[17rem] flex-col justify-end overflow-hidden rounded-2xl border border-line bg-[radial-gradient(ellipse_at_70%_20%,rgb(233_165_75/0.22),transparent_65%)] p-6"
          >
            <div aria-hidden className="absolute -right-6 -top-4 flex w-[85%] transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-2">
              {["gouda-pesto-verde", "gouda-trufe-negre", "gouda-lavanda"].map((s, i) => (
                <ProductImage
                  key={s}
                  slug={s}
                  alt=""
                  sizes="160px"
                  className={`w-1/2 drop-shadow-[0_12px_24px_rgb(0_0_0/0.5)] ${i ? "-ml-[22%]" : ""} ${i === 1 ? "relative z-[1] -mt-2" : "mt-6"}`}
                />
              ))}
            </div>
            <TileText name={cheese.name} tagline={cheese.tagline} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
