import { readFileSync } from "fs";
import { join } from "path";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
const lines = css.split("\n");
const out = [];
const navyMaybe = (s) => /navy-[6789]|navy-50|navy-100/.test(s);
const lightTxt = (s) => /(paper|gold-(?:50|100)|gold-300|gold-400|navy-50|navy-100)/.test(s:a);
const report = [];

for (let i = 0; i < lines.length; i++) {
  const ln = lines[i];
  // hover/focus/active/selected + a color rule in same block
  if (/:(hover|focus|active|selected|focus-visible)\b/.test(ln)) {
    // find co-located color in this line
    const c = ln.match(/color:\s*([^;]+);/);
    const bg = ln.match(/basic\w*(?:-color)?:\s*([^;]+);/);
  }
}
