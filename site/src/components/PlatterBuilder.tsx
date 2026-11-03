"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowsClockwise, PaperPlaneTilt, Shuffle, Trash, WhatsappLogo, X } from "@phosphor-icons/react";
import { productsIn } from "@/lib/products";
import { looks, shapes, PREFILL_EVENT, PREFILL_KEY, type Prefill } from "@/lib/platter";
import { showWhatsapp, whatsappHref, WHATSAPP_MISSING } from "@/lib/site";
import { ProductImage } from "@/components/ProductImage";

/*
  Custom platter builder. The board is drawn in SVG to match our real platters:
  glass plate with a beaded gold rim, charcuterie rosette in the middle, cheese
  slices fanned around it and grapes + walnuts on the edge.

  Everything is laid out on a circle of radius 200 and then stretched
  horizontally for the oval platters.

  Interactions
  - tap a cheese: it goes into the selected section, or the first empty one
  - tap a section, then another: they swap
  - mouse / pen: drag cheeses onto sections, drag sections onto each other to
    swap, or off the plate to remove
*/

const R = 200;
const BEADS = 191;
const GARNISH = 171;
const OUTER = 150;
const INNER = 68;

const cheeses = productsIn("branzeturi");
const nameOf = (slug: string) => cheeses.find((c) => c.slug === slug)?.name ?? slug;

const f = (n: number) => Math.round(n * 100) / 100;
const polar = (r: number, a: number) => [f(r * Math.cos(a)), f(r * Math.sin(a))] as const;

function sector(r1: number, r2: number, a0: number, a1: number) {
  const [x0, y0] = polar(r2, a0);
  const [x1, y1] = polar(r2, a1);
  const [x2, y2] = polar(r1, a1);
  const [x3, y3] = polar(r1, a0);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${x0} ${y0}A${r2} ${r2} 0 ${large} 1 ${x1} ${y1}L${x2} ${y2}A${r1} ${r1} 0 ${large} 0 ${x3} ${y3}Z`;
}

// Small deterministic PRNG so speckles look random but never jump between renders.
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hash = (s: string) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);

const ellipseLength = (a: number, b: number) => Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));

type Drag = { slug: string; from: number | null; sx: number; sy: number; moved: boolean };

export function PlatterBuilder() {
  const reduce = useReducedMotion();
  const [shapeIndex, setShapeIndex] = useState(1);
  const shape = shapes[shapeIndex];
  const [slots, setSlots] = useState<(string | null)[]>(() => [...shape.preset]);
  const [selected, setSelected] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [ghost, setGhost] = useState<{ slug: string; x: number; y: number } | null>(null);
  const [notice, setNotice] = useState("");
  const drag = useRef<Drag | null>(null);
  const swallowClick = useRef(false);

  const n = shape.slots;
  const span = (Math.PI * 2) / n;
  const start = -Math.PI / 2 - span / 2;
  const perSlot = n <= 6 ? 4 : 3;
  const s = shape.stretch;

  const changeShape = (i: number) => {
    setShapeIndex(i);
    setSelected(null);
    setSlots((old) => Array.from({ length: shapes[i].slots }, (_, k) => old[k] ?? shapes[i].preset[k] ?? null));
  };

  const place = (slug: string, at?: number | null) => {
    const target = at ?? selected ?? slots.indexOf(null);
    if (target < 0) {
      setNotice("Platoul e plin. Atinge o secțiune ca s-o înlocuiești.");
      return;
    }
    setSlots((old) => old.map((v, i) => (i === target ? slug : v)));
    setSelected(null);
    setNotice("");
  };

  const swap = (a: number, b: number) =>
    setSlots((old) => {
      const next = [...old];
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });

  const remove = (i: number) => {
    setSlots((old) => old.map((v, k) => (k === i ? null : v)));
    setSelected(null);
  };

  const tapSlot = (i: number) => {
    setNotice("");
    if (selected === null) return setSelected(i);
    if (selected !== i) swap(selected, i);
    setSelected(null);
  };

  const surprise = () => {
    const pool = [...cheeses.map((c) => c.slug)].sort(() => Math.random() - 0.5);
    setSlots(Array.from({ length: n }, (_, i) => pool[i % pool.length]));
    setSelected(null);
    setNotice("");
  };

  // Mouse/pen drag. Touch keeps native scrolling and uses taps instead.
  useEffect(() => {
    const slotAt = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y)?.closest<SVGElement>("[data-slot]");
      return el ? Number(el.dataset.slot) : null;
    };
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 6) return;
      d.moved = true;
      setGhost({ slug: d.slug, x: e.clientX, y: e.clientY });
      setOver(slotAt(e.clientX, e.clientY));
    };
    const up = (e: PointerEvent) => {
      const d = drag.current;
      drag.current = null;
      if (!d?.moved) return;
      // The click that follows this pointerup must not also count as a tap.
      swallowClick.current = true;
      setTimeout(() => (swallowClick.current = false), 0);
      const target = slotAt(e.clientX, e.clientY);
      setGhost(null);
      setOver(null);
      setSelected(null);
      if (target === null) {
        const onPlate = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-plate]");
        if (d.from !== null && !onPlate) remove(d.from);
      } else if (d.from === null) {
        setSlots((old) => old.map((v, i) => (i === target ? d.slug : v)));
      } else if (d.from !== target) {
        swap(d.from, target);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const startDrag = (e: React.PointerEvent, slug: string, from: number | null) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    e.preventDefault();
    drag.current = { slug, from, sx: e.clientX, sy: e.clientY, moved: false };
  };
  const unlessDragged = (fn: () => void) => () => {
    if (swallowClick.current) {
      swallowClick.current = false;
      return;
    }
    fn();
  };

  const filled = slots.filter(Boolean) as string[];
  const tally = new Map<string, number>();
  for (const slug of filled) tally.set(slug, (tally.get(slug) ?? 0) + 1);
  const counts = [...tally.entries()];

  const lines = counts.map(([slug, c]) => `- ${nameOf(slug)}${c > 1 ? ` (${c} secțiuni)` : ""}`);
  const order = `Bună ziua! Aș dori un platou personalizat pentru ${shape.persons} persoane (${shape.name.toLowerCase()}), cu:\n${lines.join("\n")}\n\nData la care am nevoie de el: `;
  const whatsapp = whatsappHref(order);

  const send = () => {
    const prefill: Prefill = { subject: "Platou personalizat", message: order };
    try {
      sessionStorage.setItem(PREFILL_KEY, JSON.stringify(prefill));
    } catch {}
    const form = document.getElementById("contact");
    if (form) {
      window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: prefill }));
      form.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  // Static garnish geometry for the current shape.
  const garnish = useMemo(() => {
    const count = Math.round(ellipseLength(GARNISH * s, GARNISH) / 34);
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + 0.12;
      return { x: f(GARNISH * s * Math.cos(a)), y: f(GARNISH * Math.sin(a)), a, grape: i % 3 !== 2 };
    });
  }, [s]);
  const beads = useMemo(() => {
    const count = Math.round(ellipseLength(BEADS * s, BEADS) / 8.5);
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      return { x: f(BEADS * s * Math.cos(a)), y: f(BEADS * Math.sin(a)) };
    });
  }, [s]);

  const W = R * s + 14;
  const hint =
    notice ||
    (selected !== null
      ? `Secțiunea ${selected + 1} e selectată. Alege o brânză pentru ea sau atinge altă secțiune ca să le schimbi între ele.`
      : "Atinge o brânză ca s-o pui pe platou. Cu mouse-ul poți trage brânzeturile direct pe platou și le poți muta între ele.");

  return (
    <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
      {/* Board */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-[radial-gradient(ellipse_at_50%_45%,rgb(233_165_75/0.10),transparent_70%)] px-3 py-6 sm:px-6 sm:py-10">
          <svg
            data-plate
            viewBox={`${-W} ${-R - 14} ${W * 2} ${R * 2 + 28}`}
            className="mx-auto block w-full max-w-[40rem] select-none"
            role="group"
            aria-label={`Platou ${shape.name.toLowerCase()} pentru ${shape.persons} persoane`}
          >
            <defs>
              <radialGradient id="pb-glass" cx="50%" cy="38%" r="70%">
                <stop offset="0%" stopColor="#d9d4cc" stopOpacity="0.20" />
                <stop offset="75%" stopColor="#a9a39a" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.22" />
              </radialGradient>
              <radialGradient id="pb-bead" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#fff3cf" />
                <stop offset="45%" stopColor="#d9a84e" />
                <stop offset="100%" stopColor="#6e4a17" />
              </radialGradient>
              <radialGradient id="pb-grape" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#f1f7c4" />
                <stop offset="55%" stopColor="#bcd168" />
                <stop offset="100%" stopColor="#6f8a2a" />
              </radialGradient>
              <radialGradient id="pb-sheen" gradientUnits="userSpaceOnUse" cx="0" cy="0" r={OUTER}>
                <stop offset="45%" stopColor="#000" stopOpacity="0.16" />
                <stop offset="80%" stopColor="#fff" stopOpacity="0" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.12" />
              </radialGradient>
              <filter id="pb-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>

            {/* Plate */}
            <ellipse cx="0" cy="12" rx={R * s} ry={R} fill="#000" opacity="0.35" filter="url(#pb-shadow)" />
            <ellipse cx="0" cy="0" rx={R * s} ry={R} fill="url(#pb-glass)" stroke="rgb(255 255 255 / 0.30)" strokeWidth="1" />
            <ellipse cx="0" cy="0" rx={(R - 18) * s} ry={R - 18} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="1" />
            {beads.map((b, i) => (
              <circle key={i} cx={b.x} cy={b.y} r="3.4" fill="url(#pb-bead)" />
            ))}

            {/* Garnish: grapes and walnuts around the rim */}
            {garnish.map((g, i) =>
              g.grape ? (
                <g key={i} transform={`translate(${g.x} ${g.y}) rotate(${f((g.a * 180) / Math.PI + 90)})`}>
                  <ellipse rx="10.5" ry="8" fill="url(#pb-grape)" stroke="#5a7020" strokeOpacity="0.4" strokeWidth="0.6" />
                  <ellipse cx="-3" cy="-2.5" rx="2.6" ry="1.6" fill="#fff" opacity="0.55" />
                </g>
              ) : (
                <g key={i} transform={`translate(${g.x} ${g.y}) rotate(${f((g.a * 180) / Math.PI)})`}>
                  <path
                    d="M-9 0C-9-6-4-8 0-6C4-8 9-6 9 0C9 6 4 8 0 6C-4 8-9 6-9 0Z"
                    fill="#9a6a35"
                    stroke="#5c3a17"
                    strokeWidth="0.8"
                  />
                  <path d="M0-6V6M-5-4C-3 0-3 0-5 4M5-4C3 0 3 0 5 4" stroke="#5c3a17" strokeWidth="0.7" fill="none" opacity="0.8" />
                </g>
              ),
            )}

            <g transform={`scale(${s} 1)`}>
              {/* Cheese sections */}
              {slots.map((slug, i) => {
                const a0 = start + i * span;
                const a1 = a0 + span;
                const gap = 0.025;
                const isSel = selected === i;
                const isOver = over === i;
                const label = slug ? nameOf(slug) : "gol";

                return (
                  <g
                    key={i}
                    data-slot={i}
                    role="button"
                    tabIndex={0}
                    aria-label={`Secțiunea ${i + 1}: ${label}`}
                    aria-pressed={isSel}
                    onClick={unlessDragged(() => tapSlot(i))}
                    onPointerDown={(e) => slug && startDrag(e, slug, i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        tapSlot(i);
                      } else if ((e.key === "Delete" || e.key === "Backspace") && slug) remove(i);
                    }}
                    className={`cursor-pointer outline-none ${slug ? "md:cursor-grab" : ""}`}
                  >
                    {slug ? (
                      <Slices key={slug} slug={slug} index={i} a0={a0 + gap} a1={a1 - gap} count={perSlot} animate={!reduce} />
                    ) : (
                      <path
                        d={sector(INNER + 4, OUTER, a0 + gap, a1 - gap)}
                        fill="rgb(243 236 228 / 0.03)"
                        stroke="rgb(243 236 228 / 0.28)"
                        strokeDasharray="4 5"
                        vectorEffect="non-scaling-stroke"
                      />
                    )}
                    {/* Hit area + selection ring */}
                    <path
                      d={sector(INNER, OUTER + 4, a0 + gap / 2, a1 - gap / 2)}
                      fill="transparent"
                      stroke={isSel || isOver ? "#e9a54b" : "transparent"}
                      strokeWidth={isSel || isOver ? 2.5 : 0}
                      vectorEffect="non-scaling-stroke"
                      className="slot-ring transition-[stroke] duration-200"
                    />
                  </g>
                );
              })}

              {/* Charcuterie rosette */}
              <Rosette />
            </g>

            {/* Plus marks on empty sections (drawn unstretched) */}
            {slots.map((slug, i) => {
              if (slug) return null;
              const a = start + (i + 0.5) * span;
              const r = (INNER + OUTER) / 2;
              return (
                <g key={i} transform={`translate(${f(r * s * Math.cos(a))} ${f(r * Math.sin(a))})`} pointerEvents="none">
                  <circle r="11" fill="rgb(233 165 75 / 0.14)" />
                  <path d="M-4.5 0H4.5M0-4.5V4.5" stroke="#e9a54b" strokeWidth="1.8" strokeLinecap="round" />
                </g>
              );
            })}
          </svg>

          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-muted" aria-live="polite">
            {hint}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div>
        <p className="text-sm font-semibold text-cream">1. Mărimea platoului</p>
        <div role="radiogroup" aria-label="Mărimea platoului" className="mt-3 grid grid-cols-3 gap-2">
          {shapes.map((sh, i) => (
            <button
              key={sh.persons}
              type="button"
              role="radio"
              aria-checked={i === shapeIndex}
              onClick={() => changeShape(i)}
              className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 transition-colors duration-300 ${
                i === shapeIndex ? "border-ember bg-ember/10 text-cream" : "border-line text-cream/75 hover:border-ember/60"
              }`}
            >
              <span
                aria-hidden
                className={`block h-6 rounded-[50%] border-2 ${i === shapeIndex ? "border-ember" : "border-cream/40"}`}
                style={{ width: `${1.5 * sh.stretch}rem` }}
              />
              <span className="text-sm font-semibold tabular-nums">{sh.persons} persoane</span>
              <span className="text-xs text-muted">{sh.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-9 flex items-baseline justify-between gap-4">
          <p className="text-sm font-semibold text-cream">2. Alege brânzeturile</p>
          <p className="text-sm tabular-nums text-muted">
            {filled.length} din {n} secțiuni
          </p>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {cheeses.map((c) => {
            const used = filled.filter((x) => x === c.slug).length;
            const look = looks[c.slug];
            return (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={unlessDragged(() => place(c.slug))}
                  onPointerDown={(e) => startDrag(e, c.slug, null)}
                  className={`group relative flex w-full items-center gap-2.5 rounded-xl border p-2 text-left transition-colors duration-200 md:cursor-grab ${
                    used ? "border-ember/50 bg-ember/[0.06]" : "border-line hover:border-ember/50"
                  }`}
                >
                  <span className="relative size-11 shrink-0">
                    <ProductImage slug={c.slug} alt="" sizes="44px" className="size-full object-contain" />
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-ink"
                      style={{ background: look?.paste }}
                    />
                  </span>
                  <span className="pr-5 text-[13px] leading-tight text-cream/90">{c.name.replace(/^Gouda cu /, "Gouda ")}</span>
                  {used > 0 && (
                    <span className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-ember text-[11px] font-bold tabular-nums text-ink">
                      {used}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={surprise}
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-ember hover:text-ember"
          >
            <Shuffle size={16} weight="bold" /> Alege pentru mine
          </button>
          <button
            type="button"
            onClick={() => {
              setSlots(Array(n).fill(null));
              setSelected(null);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-ember hover:text-ember"
          >
            <ArrowsClockwise size={16} weight="bold" /> Golește
          </button>
          {selected !== null && slots[selected] && (
            <button
              type="button"
              onClick={() => remove(selected)}
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-ember hover:text-ember"
            >
              <Trash size={16} weight="bold" /> Scoate secțiunea {selected + 1}
            </button>
          )}
          {selected !== null && (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-cream"
            >
              <X size={14} weight="bold" /> Renunță
            </button>
          )}
        </div>

        <div className="mt-9 rounded-2xl border border-line p-5">
          <p className="text-sm font-semibold text-cream">3. Platoul tău</p>
          {counts.length ? (
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {counts.map(([slug, c]) => (
                <li key={slug} className="flex items-center gap-3">
                  <span aria-hidden className="size-3 shrink-0 rounded-full" style={{ background: looks[slug]?.paste }} />
                  <span className="flex-1">{nameOf(slug)}</span>
                  {c > 1 && <span className="tabular-nums text-cream/70">×{c}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">Încă nu ai ales nicio brânză.</p>
          )}
          <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-muted">
            Pentru {shape.persons} persoane. În centru punem mezeluri fine, iar pe margine struguri și nuci, ca la
            platourile noastre clasice.
          </p>
          <button
            type="button"
            onClick={send}
            disabled={!counts.length}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition-[background-color,transform] duration-300 hover:bg-[#f2b768] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
          >
            <PaperPlaneTilt size={18} weight="bold" /> Cere ofertă pentru acest platou
          </button>
          {showWhatsapp && counts.length > 0 && (
            <a
              href={whatsapp || "#contact"}
              {...(whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : { title: WHATSAPP_MISSING })}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/20 px-6 py-3 text-sm font-semibold text-cream transition-colors duration-300 hover:border-ember hover:text-ember"
            >
              <WhatsappLogo size={18} weight="bold" /> Trimite pe WhatsApp
            </a>
          )}
        </div>
      </div>

      {ghost && (
        <div
          aria-hidden
          className="pointer-events-none fixed z-30 size-20 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_16px_24px_rgb(0_0_0/0.6)]"
          style={{ left: ghost.x, top: ghost.y }}
        >
          <ProductImage slug={ghost.slug} alt="" sizes="80px" eager className="size-full object-contain" />
        </div>
      )}
    </div>
  );
}

function Slices({
  slug,
  index,
  a0,
  a1,
  count,
  animate,
}: {
  slug: string;
  index: number;
  a0: number;
  a1: number;
  count: number;
  animate: boolean;
}) {
  const look = looks[slug] ?? { paste: "#f0d68c", speck: [], rind: "#d79a2a" };
  const step = (a1 - a0) / count;
  const rand = rng(hash(slug) + index * 97);
  const specks: { x: number; y: number; r: number; c: string }[] = [];
  if (look.speck.length) {
    for (let k = 0; k < count * 14; k++) {
      const a = a0 + rand() * (a1 - a0);
      const r = INNER + 8 + rand() * (OUTER - INNER - 18);
      const [x, y] = polar(r, a);
      specks.push({ x, y, r: f(0.6 + rand() * 1.1), c: look.speck[k % look.speck.length] });
    }
  }
  return (
    <g className={animate ? "slice-in" : undefined}>
      {Array.from({ length: count }, (_, k) => {
        const s0 = a0 + k * step;
        const s1 = s0 + step;
        return (
          <g key={k}>
            <path d={sector(INNER + 4, OUTER, s0, s1)} fill={look.paste} stroke="rgb(0 0 0 / 0.28)" strokeWidth="0.7" />
            <path d={sector(OUTER - 5, OUTER, s0, s1)} fill={look.rind} />
          </g>
        );
      })}
      {specks.map((p, k) => (
        <circle key={k} cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity="0.85" />
      ))}
      <path d={sector(INNER + 4, OUTER, a0, a1)} fill="url(#pb-sheen)" pointerEvents="none" />
    </g>
  );
}

// Folded slices of cured ham, drawn once: two rings of overlapping folds.
function Rosette() {
  const ring = (count: number, radius: number, rx: number, ry: number, offset: number) =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + offset;
      const [x, y] = polar(radius, a);
      return { x, y, deg: f((a * 180) / Math.PI + 90), tone: i % 3 };
    });
  const tones = ["#b8434c", "#c9575d", "#a8363f"];
  const fold = (p: { x: number; y: number; deg: number; tone: number }, rx: number, ry: number, k: string) => (
    <g key={k} transform={`translate(${p.x} ${p.y}) rotate(${p.deg})`}>
      <ellipse rx={rx} ry={ry} fill={tones[p.tone]} />
      <path d={`M${-rx + 3} ${f(-ry * 0.35)}Q0 ${f(-ry - 2)} ${rx - 3} ${f(-ry * 0.35)}`} stroke="#f4dcd5" strokeOpacity="0.85" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d={`M${f(-rx * 0.5)} ${f(ry * 0.2)}Q0 ${f(ry * 0.45)} ${f(rx * 0.55)} ${f(ry * 0.1)}`} stroke="#f4dcd5" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
    </g>
  );
  return (
    <g pointerEvents="none">
      <circle r={INNER - 2} fill="#6e232b" />
      {ring(11, 44, 21, 13, 0).map((p, i) => fold(p, 21, 13, `o${i}`))}
      {ring(8, 24, 17, 11, 0.3).map((p, i) => fold(p, 17, 11, `m${i}`))}
      {ring(4, 8, 12, 9, 0.7).map((p, i) => fold(p, 12, 9, `c${i}`))}
    </g>
  );
}
