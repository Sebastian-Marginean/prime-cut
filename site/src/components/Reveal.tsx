"use client";

import { useEffect, useRef, type ReactNode } from "react";

// One shared observer for every Reveal on the page.
let observer: IntersectionObserver | null = null;
function observe(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-visible");
        observer?.unobserve(e.target);
      }
    },
    // Trigger a bit before the element is fully in view; works for tall blocks too.
    { rootMargin: "0px 0px -15% 0px" },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}

// Fades content up as it enters the viewport. The animation is CSS (.reveal in
// globals.css); reduced motion shows everything as is.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? observe(ref.current) : undefined), []);
  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
