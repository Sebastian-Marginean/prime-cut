---
name: taste
description: Design taste for building user interfaces. Use whenever creating or restyling a web page, component, landing page, dashboard, app screen or any HTML/CSS/React/Tailwind UI — before writing the first line of markup. Covers typography, spacing, color, layout, motion and copy, and lists the patterns that make UI look generic or AI-made.
---

# Taste

Good UI comes from a few deliberate decisions applied consistently, not from decoration. Before writing markup, decide the points below, then build.

## 1. Decide first

Write down (in your head or a short comment) before coding:

- **Purpose**: what is the one thing a visitor must do or understand on this screen?
- **Tone**: pick one — calm/editorial, sharp/technical, warm/friendly, bold/playful. Every later choice follows it.
- **Type pairing**: one typeface, or at most two (display + text).
- **Palette**: one neutral ramp + one accent. That's it.
- **Spacing scale**: 4px base — 4, 8, 12, 16, 24, 32, 48, 64, 96.

## 2. Typography

- Body text 16–18px, line-height 1.5–1.7, measure 60–75 characters (`max-width: 65ch`).
- Headings: tighter line-height (1.1–1.25) and slight negative tracking (`-0.01em` to `-0.03em`) at large sizes.
- Use a clear type scale (e.g. 1.25 ratio). Never more than 5–6 sizes on one screen.
- Hierarchy through size, weight and color — not through boxes, borders and icons.
- Numbers in tables and stats: `font-variant-numeric: tabular-nums`.
- Good defaults: Inter, Geist, IBM Plex Sans, Source Serif, Fraunces, Instrument Serif, JetBrains Mono. Always give a system fallback stack.

## 3. Spacing and layout

- Only use values from the spacing scale. No 13px, no 22px.
- Related things close, unrelated things far — proximity is the main grouping tool, before borders or cards.
- Generous whitespace around sections (64–128px vertical on desktop).
- Align to a grid; left-align text by default. Center only short hero copy.
- Every layout must work at 375px wide: stack, wrap, never horizontal-scroll the page.

## 4. Color

- Neutrals carry 90% of the interface. Tint them slightly toward the accent hue instead of pure gray.
- One accent color, used for the primary action and key highlights only.
- Text contrast at least 4.5:1 (WCAG AA); large text 3:1.
- Define colors as CSS variables / tokens; support dark mode by swapping tokens, not by rewriting components.
- Dark mode backgrounds: near-black with a hint of hue (e.g. `#0f1115`), never pure `#000`; text off-white, not pure `#fff`.

## 5. Components

- One primary button per view. Secondary actions are quieter (outline or text).
- Border radius: pick one value family (e.g. 6/10/16) and keep it consistent.
- Shadows: soft, low-opacity, layered — or none. Prefer a 1px border with low-contrast color over heavy shadows.
- Icons: one set, one stroke width, sized to the adjacent text.
- Real states: hover, focus-visible (clearly visible ring), active, disabled, loading, empty, error.

## 6. Motion

- 150–250ms for UI feedback, ease-out for entering, ease-in for leaving.
- Animate opacity and transform only.
- Respect `prefers-reduced-motion`.
- Motion explains change; it is never decoration.

## 7. Copy

- Specific beats clever: "Export to CSV" not "Unleash your data".
- Sentence case for headings and buttons.
- Buttons say what happens: "Save changes", "Delete project" — not "OK", "Submit".
- Use realistic sample content, never lorem ipsum.

## 8. Avoid — these read as generic / AI-made

- Purple-to-blue gradients, gradient text on headings, glowing blobs in the background.
- Emoji as icons or bullet points.
- Everything in a card; cards nested in cards.
- Three identical feature cards with an icon, a title and two lines of filler.
- Center-aligned everything.
- Over-rounded pill shapes on every element.
- Glassmorphism without a reason.
- Badge spam ("New!", "AI-powered", "✨").
- Hero copy like "Revolutionize your workflow" / "Supercharge your productivity".
- Too many font weights, sizes or colors on one screen.

## 9. Final check

Before finishing, review the result against this list:

1. Is the primary action obvious within 3 seconds?
2. Does every spacing value come from the scale?
3. Is there exactly one accent color?
4. Does it hold up at 375px and in dark mode?
5. Are focus states visible and contrast ratios met?
6. Does anything from section 8 appear? Remove it.
