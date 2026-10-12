"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden md:justify-center">
      {/* Photo: stacked on mobile, full-bleed behind the copy from md up. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden md:absolute md:inset-0 md:-z-10 md:aspect-auto">
        <motion.img
          src="/img/tomahawk-1600.webp"
          srcSet="/img/tomahawk-800.webp 800w, /img/tomahawk-1600.webp 1600w"
          sizes="100vw"
          alt="Tomahawk de vită maturat, pe un fund de lemn, cu roșii cherry, sare și cimbru"
          className="size-full object-cover object-[30%_50%]"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40 md:bg-gradient-to-l md:from-ink md:from-30% md:via-ink/85 md:via-50% md:to-ink/0" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:pt-24">
        <div className="-mt-16 max-w-xl md:ml-auto md:mt-0 lg:max-w-[38rem]">
          <motion.img
            {...rise(0.15)}
            src="/img/logo-wide-1400.webp"
            alt="Prime Cut Meat"
            width={360}
            height={240}
            className="-ml-6 w-64 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_72%)] md:w-80"
          />
          <motion.h1
            {...rise(0.3)}
            className="font-display mt-2 text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-6xl"
          >
            Vită maturată, aleasă cu răbdare.
          </motion.h1>
          <motion.p {...rise(0.45)} className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Tăieturi maturate 14-21 de zile, brânzeturi olandeze și platouri pregătite la comandă.
          </motion.p>
          <motion.div {...rise(0.6)} className="mt-9 flex flex-wrap gap-3">
            <Button href="/produse/">Vezi produsele</Button>
            <Button href="/#contact" variant="ghost">
              Contactează-ne
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
