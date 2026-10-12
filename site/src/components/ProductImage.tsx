import { isCutout } from "@/lib/products";

type Props = {
  slug: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  eager?: boolean;
};

// Responsive <img> for the pre-generated WebP files in /public/img.
export function ProductImage({ slug, alt, sizes, className, priority, eager }: Props) {
  const [sm, lg] = isCutout(slug) ? [480, 900] : [800, 1600];
  return (
    <img
      src={`/img/${slug}-${sm}.webp`}
      srcSet={`/img/${slug}-${sm}.webp ${sm}w, /img/${slug}-${lg}.webp ${lg}w`}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority || eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
