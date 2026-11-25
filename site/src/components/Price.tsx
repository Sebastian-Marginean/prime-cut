import type { Product } from "@/lib/products";

const unit = "font-wide text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-cream/60";
// "180-250 g" -> "180–250 g": a real range dash reads cleaner at large sizes.
const range = (s: string) => s.replace(/(\d)-(\d)/g, "$1–$2");

/** Product page price: the card's price row at a larger size, between two hairlines. */
export function Price({ product: { price }, className = "" }: { product: Product; className?: string }) {
  if (!price) return null;
  return (
    <div className={`flex items-baseline justify-between gap-6 border-y border-line py-5 ${className}`}>
      <p className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold leading-none tabular-nums text-ember md:text-5xl">
          {price.lei}
        </span>
        <span className={unit}>{price.perKg ? "lei / kg" : "lei"}</span>
      </p>
      <p className="text-right tabular-nums text-muted md:text-lg">
        {range(price.weight)}
        {price.perKg && " / buc."}
      </p>
    </div>
  );
}

/** Price row at the bottom of a product card. */
export function CardPrice({ product: { price } }: { product: Product }) {
  if (!price) return null;
  return (
    <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
      <p className="flex items-baseline gap-1.5">
        <span className="font-display text-2xl font-semibold leading-none tabular-nums text-ember">{price.lei}</span>
        <span className={unit}>{price.perKg ? "lei / kg" : "lei"}</span>
      </p>
      <p className="text-sm tabular-nums text-muted">
        {range(price.weight)}
        {price.perKg && " / buc."}
      </p>
    </div>
  );
}
