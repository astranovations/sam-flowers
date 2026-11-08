// Generates richer placeholder SVGs (watercolour washes + stitched details) in public/images/placeholders/
// Real illustrations (PNG) dropped in public/images/ with the same base name replace them automatically.
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../public/images/placeholders/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const BURG = "#5C1A22";
const CHERRY = "#9B1B30";
const GOLD = "#B48A4A";

const DEFS = `<defs>
<radialGradient id="gb" cx="50%" cy="65%" r="70%"><stop offset="0" stop-color="#fdf3f2"/><stop offset=".55" stop-color="#f3d2d4"/><stop offset="1" stop-color="#e5aab2"/></radialGradient>
<radialGradient id="gc" cx="50%" cy="65%" r="70%"><stop offset="0" stop-color="#e58a9a"/><stop offset=".55" stop-color="#c4415a"/><stop offset="1" stop-color="#9b1b30"/></radialGradient>
<radialGradient id="gg" cx="50%" cy="65%" r="70%"><stop offset="0" stop-color="#f6e7c8"/><stop offset="1" stop-color="#dcb878"/></radialGradient>
<linearGradient id="gl" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#7f8f6e"/><stop offset="1" stop-color="#b5c0a2"/></linearGradient>
<linearGradient id="gp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1e6d2"/><stop offset="1" stop-color="#dcc9a6"/></linearGradient>
<filter id="wc" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="8"/></filter>
</defs>`;

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none" stroke="${BURG}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${DEFS}${body}</svg>`;
const save = (name, w, h, body) => writeFileSync(new URL(`${name}.svg`, OUT), svg(w, h, body));

const TONE = { blush: "gb", cherry: "gc", gold: "gg" };

// One petal: watercolour fill (displaced edge) + ink outline + dashed "stitch" along the centre.
const petal = (cx, cy, angle, len, wid, tone = "blush", op = 0.95) => {
  const d = `M0 0 C ${-wid} ${-len * 0.35}, ${-wid * 0.9} ${-len}, 0 ${-len} C ${wid * 0.9} ${-len}, ${wid} ${-len * 0.35}, 0 0 Z`;
  return `<g transform="translate(${cx} ${cy}) rotate(${angle})">
<path d="${d}" fill="url(#${TONE[tone]})" fill-opacity="${op}" stroke="none" filter="url(#wc)"/>
<path d="${d}" stroke-width="2"/>
<path d="M0 ${-len * 0.12} L0 ${-len * 0.78}" stroke="${CHERRY}" stroke-opacity=".7" stroke-width="1.6" stroke-dasharray="2 6"/>
</g>`;
};

const head = (cx, cy, s, rings, tone = "blush", centre = CHERRY) => {
  let out = "";
  rings.forEach(({ n, len, wid, off }, k) => {
    for (let i = 0; i < n; i++) {
      out += petal(cx, cy, (360 / n) * i + off + k * 11, len * s, wid * s, tone);
    }
  });
  out += `<circle cx="${cx}" cy="${cy - 4 * s}" r="${15 * s}" fill="${centre}" fill-opacity=".55" stroke="none"/>`;
  for (let i = 0; i < 7; i++) {
    const a = (Math.PI * 2 * i) / 7;
    out += `<circle cx="${cx + Math.cos(a) * 22 * s}" cy="${cy - 4 * s + Math.sin(a) * 22 * s}" r="${3.2 * s}" fill="${GOLD}" stroke="none"/>`;
  }
  return out;
};

const leaf = (x, y, angle, len) => {
  const d = `M0 0 C -${len * 0.28} -${len * 0.3}, -${len * 0.22} -${len * 0.8}, 0 -${len} C ${len * 0.22} -${len * 0.8}, ${len * 0.28} -${len * 0.3}, 0 0 Z`;
  return `<g transform="translate(${x} ${y}) rotate(${angle})"><path d="${d}" fill="url(#gl)" fill-opacity=".8" stroke="none" filter="url(#wc)"/><path d="${d}" stroke-width="1.8"/><path d="M0 -${len * 0.08} L0 -${len * 0.85}" stroke-width="1.2" stroke-dasharray="2 5" stroke-opacity=".7"/></g>`;
};

// ---------- A: one peony growing, canvas 800x1000 ----------
const stem = (ty) => `<path d="M400 1000 C 400 ${1000 - (1000 - ty) * 0.45}, 340 ${ty + (1000 - ty) * 0.35}, 400 ${ty}" stroke-width="3"/>`;
const leaves = (ty, k = 1) =>
  leaf(392, 1000 - (1000 - ty) * 0.3, -55, 125 * k) + leaf(372, 1000 - (1000 - ty) * 0.52, 58, 112 * k) + leaf(400, 1000 - (1000 - ty) * 0.72, -40, 80 * k);

save("a1-sprout", 800, 1000, stem(820) + leaves(820, 0.55));
save("a2-bud", 800, 1000,
  stem(560) + leaves(560) +
  `<ellipse cx="400" cy="530" rx="34" ry="48" fill="url(#gc)" fill-opacity=".85" stroke="none" filter="url(#wc)"/><ellipse cx="400" cy="530" rx="34" ry="48"/><path d="M366 548 C 380 590, 420 590, 434 548"/><path d="M400 484 C 392 506, 392 522, 400 540" stroke-dasharray="2 6"/>`);
save("a3-opening", 800, 1000,
  stem(520) + leaves(520) +
  head(400, 515, 1, [{ n: 5, len: 66, wid: 28, off: -54 }], "blush") +
  `<ellipse cx="400" cy="480" rx="22" ry="34" fill="url(#gc)" fill-opacity=".7" stroke="none"/>`);
save("a4-half-open", 800, 1000,
  stem(480) + leaves(480) +
  head(400, 480, 1.2, [{ n: 7, len: 80, wid: 30, off: 0 }, { n: 6, len: 60, wid: 26, off: 20 }], "blush"));
save("a5-bloom", 800, 1000,
  stem(470) + leaves(470) +
  head(400, 470, 1.55, [{ n: 9, len: 92, wid: 34, off: 0 }, { n: 8, len: 74, wid: 30, off: 14 }, { n: 6, len: 52, wid: 24, off: 28 }], "blush") +
  petal(560, 700, 120, 46, 18) + petal(250, 780, -70, 40, 16));

// ---------- B: bouquets 800x1000 ----------
const bouquet = (flowers, tone) => {
  let s = "";
  flowers.forEach(([x, y]) => { s += `<path d="M${x} ${y + 50} C ${x} ${y + 300}, 400 700, 400 770" stroke-width="2.6"/>`; });
  s += leaf(360, 650, -40, 130) + leaf(440, 660, 40, 130) + leaf(400, 620, 0, 100);
  flowers.forEach(([x, y, sc, n]) => {
    s += head(x, y, sc, [{ n, len: 70, wid: 26, off: 0 }, { n: n - 2, len: 48, wid: 20, off: 18 }], tone);
  });
  // wrapping paper + ribbon
  s += `<path d="M330 735 L470 735 L435 915 L365 915 Z" fill="url(#gp)" fill-opacity=".9" stroke="none" filter="url(#wc)"/><path d="M330 735 L470 735 L435 915 L365 915 Z"/><path d="M345 800 L455 800" stroke-dasharray="2 6" stroke="${GOLD}"/>`;
  s += `<path d="M360 790 C 400 815, 440 815, 440 790 C 420 780, 380 780, 360 790 Z" fill="${BURG}" fill-opacity=".85"/><path d="M400 805 L378 862 M400 805 L426 858" stroke-width="3"/>`;
  return s;
};
save("b1-pivoines", 800, 1000, bouquet([[330, 380, 1.1, 8], [470, 360, 1.15, 8], [400, 270, 1, 7], [300, 500, 0.9, 7], [500, 500, 0.9, 7]], "blush"));
save("b2-roses", 800, 1000, bouquet([[340, 400, 0.9, 6], [460, 380, 0.9, 6], [400, 300, 0.85, 6], [310, 520, 0.8, 6], [490, 520, 0.8, 6], [400, 480, 0.8, 6]], "cherry"));
save("b3-renoncules", 800, 1000, bouquet([[350, 400, 0.85, 10], [450, 390, 0.85, 10], [400, 300, 0.8, 9], [330, 520, 0.75, 9], [480, 520, 0.75, 9]], "gold"));
save("b4-tulipes", 800, 1000, bouquet([[340, 380, 0.7, 5], [400, 330, 0.7, 5], [460, 380, 0.7, 5], [370, 470, 0.65, 5], [430, 470, 0.65, 5]], "cherry"));
save("b5-anemones", 800, 1000, bouquet([[350, 400, 0.8, 7], [450, 390, 0.8, 7], [400, 310, 0.75, 7], [380, 500, 0.7, 7]], "blush"));

// ---------- C: landscape 900x600 ----------
const scene = (label) =>
  `<path d="M60 470 H840"/><path d="M200 470 C 200 380, 300 330, 450 330 C 600 330, 700 380, 700 470" fill="url(#gp)" fill-opacity=".7" stroke="none"/><path d="M200 470 C 200 380, 300 330, 450 330 C 600 330, 700 380, 700 470"/>` +
  `<path d="M450 340 V470"/>` + leaf(450, 440, -50, 70) + leaf(450, 420, 50, 60) + head(450, 300, 1, [{ n: 8, len: 70, wid: 26, off: 0 }]) +
  `<text x="450" y="540" text-anchor="middle" font-size="20" fill="${BURG}" stroke="none" font-family="serif" opacity=".6">${label}</text>`;
save("c1-hands", 900, 600, scene("illustration à venir"));
save("c2-workshop", 900, 600, scene("illustration à venir"));

// ---------- D: icons 400x400 ----------
save("d1-icon-fresh", 400, 400, `<path d="M200 340 V210"/>` + leaf(200, 300, -50, 80) + leaf(200, 280, 50, 70) + head(200, 200, 0.9, [{ n: 6, len: 70, wid: 26, off: 0 }]));
save("d2-icon-handmade", 400, 400, `<path d="M140 340 C 140 270, 170 250, 200 250 L 270 250 C 290 250, 290 280, 270 285 L 230 285" fill="url(#gp)" fill-opacity=".6"/><path d="M200 250 V120"/>` + head(200, 110, 0.7, [{ n: 6, len: 70, wid: 26, off: 0 }]));
save("d3-icon-gift", 400, 400, `<rect x="110" y="190" width="180" height="130" rx="6" fill="url(#gp)" fill-opacity=".8" stroke="none"/><rect x="110" y="190" width="180" height="130" rx="6"/><path d="M200 190 V320"/><path d="M110 240 H290" stroke="${GOLD}"/>` + head(200, 170, 0.5, [{ n: 6, len: 70, wid: 26, off: 0 }]));

// ---------- E: decorative ----------
save("e1-divider", 1200, 150, `<path d="M40 75 C 300 55, 500 100, 1160 75" stroke-width="2"/>` + leaf(300, 66, -70, 36) + leaf(460, 84, 70, 36) + leaf(800, 82, 70, 36) + head(600, 76, 0.22, [{ n: 5, len: 70, wid: 26, off: 0 }]));
let pat = "";
for (const [x, y] of [[100, 100], [300, 220], [160, 330], [330, 40]]) pat += head(x, y, 0.35, [{ n: 5, len: 70, wid: 26, off: 0 }]) + leaf(x + 40, y + 60, 40, 30);
save("e2-pattern", 400, 400, pat);
save("e3-petals", 900, 600, petal(150, 300, 20, 90, 34) + petal(330, 200, -40, 80, 30, "cherry") + petal(520, 380, 70, 95, 36) + petal(690, 220, 140, 85, 32, "cherry") + petal(780, 440, -100, 70, 28));
save("f1-logo", 400, 400, head(200, 220, 0.9, [{ n: 5, len: 90, wid: 30, off: 0 }]) + `<path d="M200 220 V340"/>`);

// ---------- G: ornaments ----------
// G1: floral corner (top-left), 500x500
let corner = `<path d="M30 470 C 30 200, 200 40, 470 30" stroke-width="2.6"/>`;
[[70, 330, 0.5, 6], [120, 190, 0.6, 7], [250, 80, 0.55, 6]].forEach(([x, y, s, n], i) => {
  corner += leaf(x + 20, y + 40, -30 + i * 20, 70) + head(x, y, s, [{ n, len: 70, wid: 26, off: 0 }], i === 1 ? "cherry" : "blush");
});
corner += leaf(40, 420, 10, 60) + leaf(330, 50, 80, 60) + `<circle cx="180" cy="130" r="5" fill="${GOLD}" stroke="none"/><circle cx="60" cy="260" r="4" fill="${GOLD}" stroke="none"/>`;
save("g1-corner", 500, 500, corner);

// G2: arch garland, 900x560 — flowers along a semicircle, transparent centre
let garland = `<path d="M60 560 A 390 390 0 0 1 840 560" stroke-width="2" stroke-dasharray="2 7" stroke="${GOLD}"/>`;
for (let i = 0; i <= 10; i++) {
  const t = Math.PI * (0.06 + (0.88 * i) / 10);
  const x = 450 - Math.cos(t) * 390;
  const y = 560 - Math.sin(t) * 390;
  garland += leaf(x, y, (t * 180) / Math.PI - 90 + (i % 2 ? 40 : -40), 60);
}
for (let i = 0; i <= 10; i++) {
  const t = Math.PI * (0.06 + (0.88 * i) / 10);
  const x = 450 - Math.cos(t) * 390;
  const y = 560 - Math.sin(t) * 390;
  const big = i % 3 === 0;
  garland += head(x, y, big ? 0.55 : 0.36, [{ n: big ? 8 : 6, len: 70, wid: 26, off: i * 9 }, { n: big ? 6 : 4, len: 46, wid: 20, off: 18 }], i % 2 ? "cherry" : "blush");
}
save("g2-arch-garland", 900, 560, garland);

console.log("placeholders written");
