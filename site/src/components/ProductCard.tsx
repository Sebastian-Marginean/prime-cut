import Link from "next/link";
import { isCutout, productHref, type Product } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";
import { CardPrice } from "@/components/Price";

export function ProductCard({ product: p, priority, eager }: { product: Product; priority?: boolean; eager?: boolean }) {
  const cutout = isCutout(p.slug);
  // Meat is shot wide on a long board; a wide frame keeps the whole cut in view.
  const frame = p.category === "carne-de-vita" ? "aspect-[37/20]" : "aspect-[4/3]";
  return (
    <Link href={productHref(p)} className="group block">
      <div
        className={`overflow-hidden rounded-2xl border border-line ${
          cutout ? "bg-[radial-gradient(ellipse_at_50%_35%,rgb(233_165_75/0.14),transparent_70%)] p-3" : ""
        }`}
      >
        <ProductImage
          slug={p.slug}
          alt={p.name}
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          priority={priority}
          eager={eager}
          className={`w-full transition-transform duration-[1.2s] ease-out-expo ${
            cutout
              ? "aspect-square object-contain drop-shadow-[0_18px_28px_rgb(0_0_0/0.55)] group-hover:-translate-y-2"
              : `${frame} object-cover group-hover:scale-105`
          }`}
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-ember">{p.name}</h3>
      <p className="mt-1 text-sm text-muted">{p.short}</p>
      <CardPrice product={p} />
    </Link>
  );
}
