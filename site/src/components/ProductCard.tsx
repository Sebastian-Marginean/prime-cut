import Link from "next/link";
import { isCutout, productHref, type Product } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";

export function ProductCard({ product: p }: { product: Product }) {
  const cutout = isCutout(p.slug);
  return (
    <Link href={productHref(p)} className="group block">
      <div
        className={`overflow-hidden rounded-2xl border border-line ${
          cutout ? "bg-[radial-gradient(ellipse_at_50%_35%,rgb(233_165_75/0.14),transparent_70%)] p-6" : ""
        }`}
      >
        <ProductImage
          slug={p.slug}
          alt={p.name}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className={`w-full transition-transform duration-[1.2s] ease-out-expo ${
            cutout
              ? "aspect-square object-contain drop-shadow-[0_18px_28px_rgb(0_0_0/0.55)] group-hover:-translate-y-2"
              : "aspect-[4/3] object-cover group-hover:scale-105"
          }`}
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-ember">{p.name}</h3>
      <p className="mt-1 text-sm text-muted">{p.short}</p>
    </Link>
  );
}
