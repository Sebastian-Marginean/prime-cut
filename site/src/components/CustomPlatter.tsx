import { PlatterBuilder } from "@/components/PlatterBuilder";
import { Reveal } from "@/components/Reveal";

export function CustomPlatter() {
  return (
    <section
      id="platou-personalizat"
      aria-labelledby="platou-personalizat-titlu"
      className="scroll-mt-24 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <Reveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-wide text-xs font-semibold uppercase tracking-[0.2em] text-ember">Platou personalizat</p>
          <h2 id="platou-personalizat-titlu" className="font-display mt-5 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
            Compune-ți singur platoul.
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-muted">
          Alege mărimea, pune brânzeturile preferate și așază-le cum vrei. Vezi platoul pe loc, apoi ne trimiți cererea.
        </p>
      </Reveal>
      <div className="mt-12">
        <PlatterBuilder />
      </div>
    </section>
  );
}
