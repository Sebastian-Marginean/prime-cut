import type { CSSProperties } from "react";
import { Button } from "@/components/Button";
import { srcSet } from "@/components/ProductImage";

// Server component: the photo and headline are in the HTML and animate with
// CSS (.hero-zoom / .rise in globals.css), so they never wait for JavaScript.
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden md:justify-center">
      {/* Photo: stacked on mobile, full-bleed behind the copy from md up. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden md:absolute md:inset-0 md:-z-10 md:aspect-auto">
        <img
          src="/img/tomahawk-800.webp"
          srcSet={srcSet("tomahawk")}
          sizes="100vw"
          alt="Tomahawk de vită maturat, pe un fund de lemn, cu roșii cherry, sare și cimbru"
          width={1600}
          height={865}
          fetchPriority="high"
          decoding="async"
          className="hero-zoom size-full object-cover object-[30%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40 md:bg-gradient-to-l md:from-ink md:from-30% md:via-ink/85 md:via-50% md:to-ink/0" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:pt-24">
        <div className="-mt-16 max-w-xl md:ml-auto md:mt-0 lg:max-w-[38rem]">
          <img
            src="/img/logo-wide-720.webp"
            srcSet="/img/logo-wide-360.webp 360w, /img/logo-wide-540.webp 540w, /img/logo-wide-720.webp 720w"
            sizes="(min-width: 768px) 320px, 256px"
            alt="Prime Cut Meat"
            width={360}
            height={240}
            style={delay(0.15)}
            className="rise -ml-6 w-64 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_72%)] md:w-80"
          />
          <h1 style={delay(0.3)} className="rise font-display mt-2 text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-6xl">
            Vită maturată, aleasă cu răbdare.
          </h1>
          <p style={delay(0.45)} className="rise mt-6 max-w-md text-lg leading-relaxed text-muted">
            Carne maturată 14-21 de zile, brânzeturi olandeze și platouri pregătite la comandă.
          </p>
          <div style={delay(0.6)} className="rise mt-9 flex flex-wrap gap-3">
            <Button href="/produse/">Vezi produsele</Button>
            <Button href="/#contact" variant="ghost">
              Contactează-ne
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
