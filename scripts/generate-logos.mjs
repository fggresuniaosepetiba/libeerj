import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const blocksFile = join(root, "src", "lib", "data", "blocks.ts");
const outDir = join(root, "public", "assets", "images", "logos");

const source = readFileSync(blocksFile, "utf8");
const slugs = [
  ...source.matchAll(/slug:\s*"([a-z0-9-]+)"/g),
  ...source.matchAll(/\["([a-z0-9-]+)"/g),
].map((m) => m[1]);

const paletteA = {
  bg1: "#001050",
  bg2: "#003C98",
  ring: "#D9A21B",
  ringLight: "#F2C94C",
  text: "#FFFFFF",
  accent: "#F2C94C",
};

const paletteB = {
  bg1: "#001848",
  bg2: "#001050",
  ring: "#F2C94C",
  ringLight: "#D9A21B",
  text: "#FFFFFF",
  accent: "#F2C94C",
};

const hash = (value) => {
  let h = 7;
  for (let i = 0; i < value.length; i++) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h;
};

const initials = (slug) =>
  slug
    .split("-")
    .filter((part) => part.length > 0 && !["do", "da", "de", "das", "dos"].includes(part))
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const buildSvg = (slug) => {
  const p = hash(slug) % 2 === 0 ? paletteA : paletteB;
  const mono = initials(slug);
  const stamp = String(hash(slug) % 90 + 10);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${slug}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.bg1}"/>
      <stop offset="1" stop-color="${p.bg2}"/>
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="63" fill="url(#bg)"/>
  <circle cx="64" cy="64" r="56" fill="none" stroke="${p.ring}" stroke-width="3"/>
  <circle cx="64" cy="64" r="50" fill="none" stroke="${p.ringLight}" stroke-width="1.2" opacity="0.7"/>
  <path d="M20 104 A 56 56 0 0 0 108 104" fill="none" stroke="${p.accent}" stroke-width="2" opacity="0.55"/>
  <text x="64" y="58" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="bold" fill="${p.text}">${mono}</text>
  <text x="64" y="84" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="4" fill="${p.accent}">${stamp}</text>
</svg>
`;
};

mkdirSync(outDir, { recursive: true });
let written = 0;
const seen = new Set();
for (const slug of slugs) {
  if (seen.has(slug)) continue;
  seen.add(slug);
  writeFileSync(join(outDir, `${slug}.svg`), buildSvg(slug), "utf8");
  written++;
}
console.log(`generated ${written} logos in public/assets/images/logos`);