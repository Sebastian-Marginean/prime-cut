// Converts assets/source/*.jpg into web-ready WebP files in public/img.
// Cheese photos are shot on white, so their background is removed (flood fill
// from the edges) to let the wheels sit directly on the dark marble.
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC = "assets/source";
const OUT = "public/img";
const WIDTHS = [800, 1600];
const CUTOUT = /^(gouda-|branza-|tricolore-)/;

await fs.mkdir(OUT, { recursive: true });

async function photo(file, name) {
  for (const w of WIDTHS) {
    await sharp(file)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }
}

function isBackground(d, i) {
  const r = d[i], g = d[i + 1], b = d[i + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  return min > 228 && max - min < 16;
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
  const img = sharp(data, { raw: { width: W, height: H, channels: 4 } }).trim();
  const trimmed = await img.png().toBuffer();
  for (const w of [480, 900]) {
    await sharp(trimmed)
      .resize({ width: w, height: w, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
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
    await sharp(file).resize(180).png().toFile("src/app/icon.png");
    await sharp(file).resize(180).png().toFile("src/app/apple-icon.png");
  } else if (name === "logo-wide") {
    await sharp(file).resize(1400).webp({ quality: 85 }).toFile(path.join(OUT, "logo-wide-1400.webp"));
  } else if (CUTOUT.test(name)) {
    await cutout(file, name);
  } else {
    await photo(file, name);
  }
  console.log("ok", name);
}
