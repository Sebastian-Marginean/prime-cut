// Converts assets/source/*.jpg into web-ready WebP files in public/img.
// Cheese photos are shot on white, so their background is removed (flood fill
// from the edges) to let the wheels sit directly on the dark marble.
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC = "assets/source";
const OUT = "public/img";
// Photos: in-between widths so phones and laptops don't download a size up.
const WIDTHS = [480, 800, 1200, 1600];
const CUTOUT = /^(gouda-|branza-|tricolore-)/;

await fs.mkdir(OUT, { recursive: true });

// Platter photos are close to square, but every frame on the site is 4:3, so
// cropping cut the plate off. Instead the whole platter is placed on a 4:3
// canvas whose sides are filled with a blurred, darkened copy of the photo.
async function framed(file) {
  const { data, info } = await sharp(file).rotate().toBuffer({ resolveWithObject: true });
  const H = Math.round(info.height * 1.06);
  const W = Math.round((H * 4) / 3);
  const fg = await sharp(data)
    .resize({ width: Math.round(W * 0.94), height: Math.round(H * 0.94), fit: "inside" })
    .toBuffer({ resolveWithObject: true });
  const bg = await sharp(data).resize(W, H, { fit: "cover" }).blur(40).modulate({ brightness: 0.4 }).toBuffer();
  return sharp(bg)
    .composite([{ input: fg.data, left: Math.round((W - fg.info.width) / 2), top: Math.round((H - fg.info.height) / 2) }])
    .jpeg({ quality: 95 })
    .toBuffer();
}

async function photo(file, name) {
  const input = /^platou-/.test(name) ? await framed(file) : file;
  for (const w of WIDTHS) {
    await sharp(input)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }
}

function isBackground(d, i) {
  const r = d[i], g = d[i + 1], b = d[i + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  // Near-white and grey (the studio backdrop and its soft shadow), never the cream of a cheese.
  return min > 205 && max - min < 18;
}

async function cutout(file, name) {
  const { data, info } = await sharp(file)
    .rotate()
    .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const bg = new Uint8Array(W * H);
  const stack = [];
  const seed = (x, y) => {
    const p = y * W + x;
    if (!bg[p] && isBackground(data, p * 4)) { bg[p] = 1; stack.push(p); }
  };
  for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H - 1); }
  for (let y = 0; y < H; y++) { seed(0, y); seed(W - 1, y); }
  while (stack.length) {
    const p = stack.pop();
    const x = p % W, y = (p / W) | 0;
    if (x > 0) seed(x - 1, y);
    if (x < W - 1) seed(x + 1, y);
    if (y > 0) seed(x, y - 1);
    if (y < H - 1) seed(x, y + 1);
  }
  // Eat 2px into the object: that rim is where the white backdrop bleeds in as a halo.
  for (let pass = 0; pass < 2; pass++) {
    const edge = [];
    for (let p = 0; p < W * H; p++) {
      if (bg[p]) continue;
      const x = p % W, y = (p / W) | 0;
      if ((x > 0 && bg[p - 1]) || (x < W - 1 && bg[p + 1]) || (y > 0 && bg[p - W]) || (y < H - 1 && bg[p + W])) edge.push(p);
    }
    for (const p of edge) bg[p] = 1;
  }
  // Soft 1px edge: pixels next to the background get partial alpha.
  for (let p = 0; p < W * H; p++) {
    const i = p * 4;
    if (bg[p]) { data[i + 3] = 0; continue; }
    const x = p % W, y = (p / W) | 0;
    let n = 0;
    if (x > 0 && bg[p - 1]) n++;
    if (x < W - 1 && bg[p + 1]) n++;
    if (y > 0 && bg[p - W]) n++;
    if (y < H - 1 && bg[p + W]) n++;
    if (n) data[i + 3] = Math.round(255 * (1 - n * 0.2));
  }
  const trimmed = await sharp(data, { raw: { width: W, height: H, channels: 4 } }).trim().png().toBuffer();
  // Every cheese gets the same frame: the product fills 82% of a square canvas,
  // centered, standing on a shared baseline, so they line up in grids and the
  // drop shadow and hover lift have room instead of being cut off.
  for (const w of [200, 480, 640, 900]) {
    const box = Math.round(w * 0.82);
    const fitted = await sharp(trimmed).resize({ width: box, height: box, fit: "inside" }).toBuffer({ resolveWithObject: true });
    const { width: fw, height: fh } = fitted.info;
    await sharp({ create: { width: w, height: w, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: fitted.data, left: Math.round((w - fw) / 2), top: Math.round(w * 0.93) - fh }])
      .webp({ quality: 82, alphaQuality: 90 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }
}

const files = (await fs.readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));
for (const f of files) {
  const name = f.replace(/\.[^.]+$/, "");
  const file = path.join(SRC, f);
  if (name === "logo-round") {
    await sharp(file).resize(512).webp({ quality: 85 }).toFile(path.join(OUT, "logo-round-512.webp"));
    // Header logo is shown at 44px: 144px covers 3x screens.
    await sharp(file).resize(144).webp({ quality: 82 }).toFile(path.join(OUT, "logo-round-144.webp"));
    await sharp(file).resize(180).png().toFile("src/app/icon.png");
    await sharp(file).resize(180).png().toFile("src/app/apple-icon.png");
  } else if (name === "logo-wide") {
    await sharp(file).resize(1400).webp({ quality: 85 }).toFile(path.join(OUT, "logo-wide-1400.webp"));
    // Hero and footer show it at most 320px wide.
    for (const w of [360, 540, 720]) await sharp(file).resize(w).webp({ quality: 80 }).toFile(path.join(OUT, `logo-wide-${w}.webp`));
  } else if (CUTOUT.test(name)) {
    await cutout(file, name);
  } else {
    await photo(file, name);
  }
  console.log("ok", name);
}
