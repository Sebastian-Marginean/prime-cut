"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The builder is ~900 SVG elements plus its own code. Rendering it with the
// page made the HTML and first load much heavier, so it is fetched and drawn
// only when the visitor scrolls near it (or lands on #platou-personalizat).
const PlatterBuilder = dynamic(() => import("@/components/PlatterBuilder").then((m) => m.PlatterBuilder), {
  ssr: false,
});

export function LazyPlatterBuilder() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setShow(true);
        io.disconnect();
      },
      { rootMargin: "1000px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // Until it mounts, keep roughly its height so the page below doesn't jump.
    <div ref={ref} className={show ? undefined : "min-h-[72rem] sm:min-h-[60rem] lg:min-h-[46rem]"}>
      {show && <PlatterBuilder />}
    </div>
  );
}
