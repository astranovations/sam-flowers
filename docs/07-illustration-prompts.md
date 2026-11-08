# Illustration Prompts (Sam Flowers)

Prompts for an external image-generation AI. Generate one by one.

**Always paste the STYLE ANCHOR first, then the specific prompt.** Use the same tool, model and (if available) the same style reference image / seed for every illustration so they look like one set.

## Style anchor (prepend to every prompt)
```
Minimalist botanical line-art illustration, fine hand-drawn ink linework in deep burgundy (#5C1A22), delicate thin strokes with slightly varied line weight, a touch of soft watercolor wash in blush pink (#F3E3E1) and cherry red (#9B1B30) used sparingly, elegant, airy, lots of empty space, editorial, refined, romantic but modern. Plain transparent background (or flat ivory #F6F0E9 if transparency is not possible). No text, no letters, no watermark, no frame, no shadows, no photo-realism, no 3D.
```

## Negative prompt (if the tool supports it)
```
text, watermark, signature, frame, border, photo, realistic, 3D render, heavy shading, clutter, neon colors, cartoon, multiple objects overlapping, cropped flower
```

## Technical settings
- Square or 4:5 portrait, as large as possible (2048px+), PNG with transparent background if possible.
- Subject centered, with generous margin around it (it will be placed on different backgrounds).
- Keep the **same flower, same size and same canvas** for the 5 bloom stages (A1 to A5).

---

## A. Hero: the blooming flower (one peony, 5 stages)
Same canvas, same centered stem base position, same stem curve in every image.

**A1, seed / sprout**
```
[STYLE ANCHOR] A single thin curved stem just emerging from the bottom center, with two tiny leaves, no flower yet, very minimal, vertical composition, stem base at bottom center.
```
**A2, closed bud**
```
[STYLE ANCHOR] The same single curved stem, now taller, with two leaves and a small tight closed peony bud on top, vertical composition, stem base at bottom center.
```
**A3, bud opening**
```
[STYLE ANCHOR] The same single curved stem with leaves, and a peony bud beginning to open, a few outer petals loosening, vertical composition, stem base at bottom center.
```
**A4, half open**
```
[STYLE ANCHOR] The same single curved stem with leaves, and a peony half open, layered ruffled petals unfolding, soft blush wash on petals with cherry-red at the center, vertical composition, stem base at bottom center.
```
**A5, full bloom**
```
[STYLE ANCHOR] The same single curved stem with leaves, and a peony in full bloom, many layered ruffled petals, blush wash with deeper cherry-red toward the heart, one or two falling petals nearby, vertical composition, stem base at bottom center.
```

---

## B. "Nos créations": five bouquet illustrations
Each one: one bouquet, centered, vertical 4:5, lots of space.

**B1, Pivoines (peonies)**
```
[STYLE ANCHOR] A loose hand-tied bouquet of five peonies in full bloom with leaves, wrapped in simple paper tied with a thin ribbon, front view.
```
**B2, Roses**
```
[STYLE ANCHOR] A romantic bouquet of seven garden roses in varying stages of bloom, with a few leaves and thorny stems, tied with a thin ribbon, front view.
```
**B3, Renoncules (ranunculus)**
```
[STYLE ANCHOR] A delicate bouquet of ranunculus flowers with ruffled spiral petals and a few buds, loosely arranged with small leaves, tied with twine.
```
**B4, Tulipes (tulips)**
```
[STYLE ANCHOR] A simple bouquet of tulips with graceful curved stems and long leaves, slightly asymmetric, tied with a ribbon.
```
**B5, Anémones**
```
[STYLE ANCHOR] A small bouquet of anemones with dark centers and open petals, with fine stems and a few leaves, wrapped in paper.
```

---

## C. "Notre histoire" (about)
**C1, the florist's hands**
```
[STYLE ANCHOR] Two hands arranging flowers into a bouquet over a simple table, a pair of scissors and a few loose stems nearby, minimal composition, horizontal 3:2.
```
**C2, workshop corner (optional)**
```
[STYLE ANCHOR] A small flower bucket with assorted stems, a ribbon spool and kraft paper roll, simple still life, horizontal 3:2.
```

---

## D. "Ce qui nous distingue": three small icons
Same line weight, single color (burgundy), no wash, 1:1, very simple.
```
[STYLE ANCHOR, but only burgundy line, no color wash] A minimalist icon of a single fresh flower with two leaves, simple, centered.
```
```
[STYLE ANCHOR, but only burgundy line, no color wash] A minimalist icon of a hand holding a flower stem, simple, centered.
```
```
[STYLE ANCHOR, but only burgundy line, no color wash] A minimalist icon of a small gift box tied with a ribbon with one flower on top, simple, centered.
```

---

## E. Decorative elements
**E1, section divider**
```
[STYLE ANCHOR] A very thin horizontal hand-drawn branch with a few small leaves and two tiny buds, extremely light, wide panoramic 8:1 ratio, burgundy line only.
```
**E2, background pattern (for the quote band)**
```
[STYLE ANCHOR] A seamless, very low-contrast botanical pattern of scattered small wildflowers and leaves in faint blush and burgundy lines on flat ivory background, subtle, tileable, square.
```
**E3, falling petals (for animation)**
```
[STYLE ANCHOR] Five separate loose flower petals in different orientations, spread apart on a transparent background, blush with cherry-red edges, each petal isolated.
```

---

## F. Brand mark
**F1, logo mark / favicon**
```
Minimalist monogram logo, a single abstract flower made from a few continuous thin burgundy (#5C1A22) lines, simple, geometric-organic, centered, flat vector style, plain ivory (#F6F0E9) background, no text.
```

---

## Delivery checklist (when images are ready)
- [ ] A1 to A5 (hero stages, same canvas)
- [ ] B1 to B5 (creations)
- [ ] C1 (and optionally C2)
- [ ] D (3 icons)
- [ ] E1, E2, E3
- [ ] F1

Name files like `a1-sprout.png`, `b1-pivoines.png` and put them in `public/images/`. If possible, also ask the AI for SVG output (a vector version) for the hero stages: it makes the bloom animation smoother and lighter.
