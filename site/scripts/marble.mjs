// Renders the black-and-ember marble background used site-wide.
// Classic procedural marble: fBm value noise + domain warping, veins where a
// warped sine wave crosses zero.
import sharp from "sharp";

const W = 2400, H = 1500;

function hash(x, y, s) {
  let h = (x * 374761393 + y * 668265263 + s * 982451653) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
const fade = (t) => t * t * (3 - 2 * t);
function noise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
  const u = fade(xf), v = fade(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, s, oct = 6) {
  let v = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { v += amp * noise(x * f, y * f, s + i); f *= 2.03; amp *= 0.5; }
  return v;
}

const px = Buffer.alloc(W * H * 3);
const S = 1 / 520;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const nx = x * S, ny = y * S;
    const wx = fbm(nx + 3.1, ny + 1.7, 7), wy = fbm(nx - 2.3, ny + 4.9, 13);
    const t = fbm(nx + 2.2 * wx, ny + 2.2 * wy, 21);
    // main veins: diagonal sine bands bent by the warp
    const main = Math.pow(1 - Math.abs(Math.sin((nx * 1.4 + ny * 0.9) * 3.2 + t * 9)), 42);
    const fine = Math.pow(1 - Math.abs(Math.sin((nx * 0.6 - ny * 1.3) * 6.5 + fbm(nx * 2, ny * 2, 31) * 14)), 70);
    const cloud = fbm(nx * 0.8, ny * 0.8, 41, 5);
    const grain = hash(x, y, 99) * 6;
    // base: warm near-black with soft cloudy variation
    let r = 13 + cloud * 14 + grain, g = 11 + cloud * 10 + grain * 0.9, b = 10 + cloud * 7 + grain * 0.8;
    const vein = Math.min(1, main * 0.85 + fine * 0.45);
    r += vein * 196; g += vein * 118; b += vein * 46;
    const i = (y * W + x) * 3;
    px[i] = Math.min(255, r); px[i + 1] = Math.min(255, g); px[i + 2] = Math.min(255, b);
  }
}
const img = sharp(px, { raw: { width: W, height: H, channels: 3 } });
await img.clone().webp({ quality: 72 }).toFile("public/img/marble.webp");
await img.clone().resize(1200).webp({ quality: 70 }).toFile("public/img/marble-1200.webp");
console.log("marble ok");
