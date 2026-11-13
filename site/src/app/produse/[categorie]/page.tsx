import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, productsIn } from "@/lib/products";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ProductCard } from "@/components/ProductCard";
import { CustomPlatter } from "@/components/CustomPlatter";

type Params = { params: Promise<{ categorie: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ categorie: c.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCategory((await params).categorie);
  return c ? { title: c.name, description: c.description } : {};
}

export default async function CategoryPage({ params }: Params) {
  const c = getCategory((await params).categorie);
  if (!c) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-32 sm:px-6 md:pt-40">
      <h1 className="font-display text-4xl font-semibold md:text-6xl">{c.name}</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{c.description}</p>
      <div className="mt-8">
        <CategoryTabs current={c.slug} />
      </div>
      <h2 className="sr-only">Produse</h2>
      <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {productsIn(c.slug).map((p, i) => (
          <li key={p.slug}>
            {/* The first row is on screen right away: load it first. */}
            <ProductCard product={p} priority={i === 0} eager={i < 3} />
          </li>
        ))}
      </ul>
      {c.slug === "platouri" && (
        <div className="-mx-4 sm:-mx-6">
          <CustomPlatter />
        </div>
      )}
    </div>
  );
}
