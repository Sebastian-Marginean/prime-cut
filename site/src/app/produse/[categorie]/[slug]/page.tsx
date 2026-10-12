import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getCategory, getProduct, isCutout, products, productsIn } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";

type Params = { params: Promise<{ categorie: string; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ categorie: p.category, slug: p.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categorie, slug } = await params;
  const p = getProduct(categorie, slug);
  if (!p) return {};
  const img = isCutout(p.slug) ? `/img/${p.slug}-900.webp` : `/img/${p.slug}-1600.webp`;
  return { title: p.name, description: p.description, openGraph: { images: [img] } };
}

export default async function ProductPage({ params }: Params) {
  const { categorie, slug } = await params;
  const p = getProduct(categorie, slug);
  const c = getCategory(categorie);
  if (!p || !c) notFound();
  const cutout = isCutout(p.slug);
  const related = productsIn(c.slug)
    .filter((x) => x.slug !== p.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 md:pt-36">
      <Link
        href={`/produse/${c.slug}/`}
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ember"
      >
        <ArrowLeft size={16} weight="bold" /> {c.name}
      </Link>

      <div className="mt-8 grid items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div
          className={`overflow-hidden rounded-2xl border border-line ${
            cutout ? "bg-[radial-gradient(ellipse_at_50%_35%,rgb(233_165_75/0.16),transparent_70%)] p-10" : ""
          }`}
        >
          <ProductImage
            slug={p.slug}
            alt={p.name}
            sizes="(min-width: 768px) 55vw, 100vw"
            priority
            className={
              cutout
                ? "mx-auto aspect-square w-full max-w-lg object-contain drop-shadow-[0_24px_40px_rgb(0_0_0/0.6)]"
                : "aspect-[4/3] w-full object-cover"
            }
          />
        </div>

        <div>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] md:text-5xl">{p.name}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{p.description}</p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {p.facts.map((f, i) => (
              <div
                key={f.label}
                className={`rounded-2xl border border-line p-5 ${i === p.facts.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ember">{f.label}</dt>
                <dd className="mt-2 font-semibold leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <Button href="/#contact">Contactează-ne</Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="similare" className="mt-28">
          <h2 id="similare" className="font-display text-2xl font-semibold md:text-3xl">
            Din aceeași categorie
          </h2>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ProductCard product={r} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
