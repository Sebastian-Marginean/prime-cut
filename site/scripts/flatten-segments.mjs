// Next 16 static export writes per-segment prefetch files as nested folders
// (__next.produse/$d$categorie/__PAGE__.txt) while the client requests the
// dotted name (__next.produse.$d$categorie.__PAGE__.txt). Plain static hosts
// would answer 404, so we add a dotted copy next to each nested file.
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
let count = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (!e.isDirectory()) continue;
    if (e.name.startsWith("__next.")) flatten(p, dir, e.name);
    else walk(p);
  }
}

function flatten(dir, base, prefix) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    const name = `${prefix}.${e.name}`;
    if (e.isDirectory()) flatten(p, base, name);
    else { fs.copyFileSync(p, path.join(base, name)); count++; }
  }
}

walk(OUT);
console.log(`flatten-segments: ${count} files`);
