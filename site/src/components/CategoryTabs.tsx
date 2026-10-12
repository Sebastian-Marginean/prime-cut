import Link from "next/link";
import { categories } from "@/lib/products";

export function CategoryTabs({ current }: { current?: string }) {
  const items = [{ slug: "", name: "Toate" }, ...categories];
  return (
    <nav aria-label="Categorii" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2">
        {items.map((c) => {
          const active = (current ?? "") === c.slug;
          return (
            <li key={c.slug || "toate"}>
              <Link
                href={c.slug ? `/produse/${c.slug}/` : "/produse/"}
                aria-current={active ? "page" : undefined}
                className={`inline-block whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  active ? "border-ember bg-ember text-ink" : "border-line text-cream/80 hover:border-ember hover:text-ember"
                }`}
              >
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
