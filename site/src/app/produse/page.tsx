import type { Metadata } from "next";
import Link from "next/link";
import { categories, productsIn } from "@/lib/products";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Produse: carne de vită maturată, platouri și brânzeturi",
  description:
    "Toate produsele Prime Cut Meat: tomahawk, T-bone, antricot și vrăbioară maturate 14-21 de zile, platouri de brânzeturi pentru 6, 10 sau 16 persoane și Gouda olandez.",
  alternates: { canonical: "/produse/" },
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-32 sm:px-6 md:pt-40">
      <Breadcrumbs items={[{ name: "Produse", href: "/produse/" }]} />
      <h1 className="font-display mt-6 text-4xl font-semibold md:text-6xl">Produse</h1>
      <div className="mt-8">
        <CategoryTabs />
      </div>

      {categories.map((c, ci) => (
        <section key={c.slug} aria-labelledby={c.slug} className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <div>
              <h2 id={c.slug} className="font-display text-2xl font-semibold md:text-3xl">
                {c.name}
              </h2>
              <p className="mt-2 max-w-xl text-muted">{c.description}</p>
            </div>
            <Link href={`/produse/${c.slug}/`} className="text-sm font-semibold text-ember underline-offset-4 hover:underline">
              Doar {c.name.toLowerCase()}
            </Link>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {productsIn(c.slug).map((p, i) => (
              <li key={p.slug}>
                {/* First row of the first category is on screen right away. */}
                <ProductCard product={p} priority={ci === 0 && i === 0} eager={ci === 0 && i < 3} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
