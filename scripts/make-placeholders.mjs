// Generates simple line-art placeholder SVGs in public/images/placeholders/
// Real illustrations (PNG) dropped in public/images/ with the same base name replace them automatically.
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../public/images/placeholders/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const BURG = "#5C1A22";
const CHERRY = "#9B1B30";
const BLUSH = "#F3E3E1";

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none" stroke="${BURG}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

const save = (name, w, h, body) => writeFileSync(new URL(`${name}.svg`, OUT), svg(w, h, body));

// One petal: an ellipse-ish path pointing up from (0,0), rotated and moved.
const petal = (cx, cy, angle, len, wid, fill = BLUSH, op = 0.9) =>
  `<path transform="translate(${cx} ${cy}) rotate(${angle})" d="M0 0 C ${-wid} ${-len * 0.35}, ${-wid * 0.9} ${-len}, 0 ${-len} C ${wid * 0.9} ${-len}, ${wid} ${-len * 0.35}, 0 0 Z" fill="${fill}" fill-opacity="${op}"/>`;

const head = (cx, cy, s, rings) => {
  let out = "";
  rings.forEach(({ n, len, wid, off, fill }, k) => {
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i + off + k * 11;
      out += petal(cx, cy, a, len * s, wid * s, fill ?? BLUSH, 0.92);
    }
  });
  return out;
};

const leaf = (x, y, angle, len) =>
  `<path transform="translate(${x} ${y}) rotate(${angle})" d="M0 0 C -${len * 0.25} -${len * 0.3}, -${len * 0.2} -${len * 0.8}, 0 -${len} C ${len * 0.2} -${len * 0.8}, ${len * 0.25} -${len * 0.3}, 0 0 Z" fill="${BLUSH}" fill-opacity=".5"/>`;

// A1–A5: one peony growing, same canvas 800x1000
const stem = (ty) => `<path d="M400 1000 C 400 ${1000 - (1000 - ty) * 0.45}, 340 ${ty + (1000 - ty) * 0.35}, 400 ${ty}"/>`;
const leaves = (ty) =>
  leaf(392, 1000 - (1000 - ty) * 0.35, -55, 120) + leaf(372, 1000 - (1000 - ty) * 0.55, 58, 110);

save("a1-sprout", 800, 1000, stem(820) + leaves(820).replaceAll("120", "70").replaceAll("110", "60"));
save("a2-bud", 800, 1000,
  stem(560) + leaves(560) +
  `<ellipse cx="400" cy="530" rx="34" ry="48" fill="${BLUSH}"/><path d="M366 545 C 380 585, 420 585, 434 545"/><path d="M400 482 C 392 505, 392 520, 400 540"/>`);
save("a3-opening", 800, 1000,
  stem(520) + leaves(520) +
  head(400, 515, 1, [{ n: 5, len: 62, wid: 26, off: -90 + 36 }]) +
  `<ellipse cx="400" cy="480" rx="22" ry="34" fill="${CHERRY}" fill-opacity=".35"/>`);
save("a4-half-open", 800, 1000,
  stem(480) + leaves(480) +
  head(400, 480, 1.2, [
    { n: 7, len: 80, wid: 30, off: 0 },
    { n: 6, len: 60, wid: 26, off: 20 },
  ]) + `<circle cx="400" cy="450" r="16" fill="${CHERRY}" fill-opacity=".45"/>`);
save("a5-bloom", 800, 1000,
  stem(470) + leaves(470) +
  head(400, 470, 1.55, [
    { n: 9, len: 92, wid: 34, off: 0 },
    { n: 8, len: 74, wid: 30, off: 14 },
    { n: 6, len: 52, wid: 24, off: 28 },
  ]) + `<circle cx="400" cy="420" r="22" fill="${CHERRY}" fill-opacity=".5"/>` +
  petal(560, 700, 120, 46, 18) + petal(250, 780, -70, 40, 16));

// B1–B5: bouquets (4:5 → 800x1000)
const bouquet = (flowers, ribbon = true) => {
  let s = "";
  flowers.forEach(([x, y, sc, n]) => {
    s += `<path d="M${x} ${y + 50} C ${x} ${y + 300}, 400 700, 400 760"/>`;
  });
  s += leaf(360, 640, -40, 120) + leaf(440, 650, 40, 120);
  flowers.forEach(([x, y, sc, n]) => {
    s += head(x, y, sc, [{ n, len: 70, wid: 26, off: 0 }, { n: n - 2, len: 48, wid: 20, off: 18 }]);
    s += `<circle cx="${x}" cy="${y - 6}" r="${10 * sc}" fill="${CHERRY}" fill-opacity=".4"/>`;
  });
  s += `<path d="M340 740 L460 740 L430 900 L370 900 Z" fill="${BLUSH}" fill-opacity=".6"/>`;
  if (ribbon) s += `<path d="M360 790 C 400 810, 440 810, 440 790"/><path d="M400 800 L380 850 M400 800 L425 845"/>`;
  return s;
};
save("b1-pivoines", 800, 1000, bouquet([[330, 380, 1.1, 8], [470, 360, 1.15, 8], [400, 280, 1, 7], [300, 500, 0.9, 7], [500, 500, 0.9, 7]]));
save("b2-roses", 800, 1000, bouquet([[340, 400, 0.9, 6], [460, 380, 0.9, 6], [400, 300, 0.85, 6], [310, 520, 0.8, 6], [490, 520, 0.8, 6], [400, 480, 0.8, 6]]));
save("b3-renoncules", 800, 1000, bouquet([[350, 400, 0.85, 10], [450, 390, 0.85, 10], [400, 300, 0.8, 9], [330, 520, 0.75, 9]]));
save("b4-tulipes", 800, 1000, bouquet([[340, 380, 0.7, 5], [400, 330, 0.7, 5], [460, 380, 0.7, 5], [370, 470, 0.65, 5], [430, 470, 0.65, 5]]));
save("b5-anemones", 800, 1000, bouquet([[350, 400, 0.8, 7], [450, 390, 0.8, 7], [400, 310, 0.75, 7]]));

// C1/C2: landscape 3:2 → 900x600
const tablePlaceholder = (label) =>
  `<path d="M60 470 H840"/><path d="M200 470 C 200 380, 300 330, 450 330 C 600 330, 700 380, 700 470"/>` +
  head(450, 300, 1, [{ n: 8, len: 70, wid: 26, off: 0 }]) + `<path d="M450 340 V470"/>` +
  `<text x="450" y="540" text-anchor="middle" font-size="20" fill="${BURG}" stroke="none" font-family="serif" opacity=".6">${label}</text>`;
save("c1-hands", 900, 600, tablePlaceholder("illustration à venir"));
save("c2-workshop", 900, 600, tablePlaceholder("illustration à venir"));

// D1–D3: icons 1:1 → 400x400
save("d1-icon-fresh", 400, 400, `<path d="M200 340 V210"/>` + leaf(200, 300, -50, 80) + leaf(200, 280, 50, 70) + head(200, 200, 0.9, [{ n: 6, len: 70, wid: 26, off: 0 }]));
save("d2-icon-handmade", 400, 400, `<path d="M140 340 C 140 270, 170 250, 200 250 L 270 250 C 290 250, 290 280, 270 285 L 230 285"/><path d="M200 250 V120"/>` + head(200, 110, 0.7, [{ n: 6, len: 70, wid: 26, off: 0 }]));
save("d3-icon-gift", 400, 400, `<rect x="110" y="190" width="180" height="130" rx="6" fill="${BLUSH}" fill-opacity=".6"/><path d="M200 190 V320"/><path d="M110 240 H290"/>` + head(200, 170, 0.5, [{ n: 6, len: 70, wid: 26, off: 0 }]));

// E1 divider 8:1 → 1200x150, E2 pattern, E3 petals, F1 logo
save("e1-divider", 1200, 150, `<path d="M40 75 C 300 55, 500 100, 1160 75" stroke-width="2"/>` + leaf(300, 66, -70, 36) + leaf(460, 84, 70, 36) + leaf(800, 82, 70, 36) + `<circle cx="600" cy="80" r="6" fill="${CHERRY}" fill-opacity=".5"/>`);
let pat = "";
for (const [x, y] of [[100, 100], [300, 220], [160, 330], [330, 40]]) pat += head(x, y, 0.35, [{ n: 5, len: 70, wid: 26, off: 0 }]);
save("e2-pattern", 400, 400, pat);
save("e3-petals", 900, 600, petal(150, 300, 20, 90, 34) + petal(330, 200, -40, 80, 30) + petal(520, 380, 70, 95, 36) + petal(690, 220, 140, 85, 32) + petal(780, 440, -100, 70, 28));
save("f1-logo", 400, 400, head(200, 220, 0.9, [{ n: 5, len: 90, wid: 30, off: 0 }]) + `<path d="M200 220 V340"/>`);

console.log("placeholders written");
