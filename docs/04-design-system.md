# Design System

> **Direction update:** richer, not strictly minimalist. Keep elegance and whitespace, but add layered illustration, ornament and texture: watercolour + stitched (embroidery-like) flowers, gold hairline frames, arch windows, a wax-seal monogram, paper grain, and alternating burgundy / ivory sections. Implemented in `src/` (see `Ornaments.tsx`, `Intro.tsx`, `Hero.tsx`).

Additions to the palette: gold `#b48a4a` (hairlines, tiny accents, use sparingly), soft gold `#dcc08c` (text accents on dark), sage `#8a9a7b` (leaves only).

> To be decided together. Suggestions below are starting points only.

## Palette (direction: cherry / burgundy)
Hex values are proposals to test visually, not final.

| Role | Proposal | Hex |
|------|----------|-----|
| Background | Warm ivory | `#FAF5F0` |
| Surface / soft band | Blush | `#F3E3E1` |
| Primary | Deep burgundy (same as the inspiration site's theme colour) | `#4A2028` |
| Accent | Cherry | `#9B1B30` |
| Text | Dark wine, near-black | `#2B0F14` |
| Optional detail | Muted gold, used very sparingly | `#B8935A` |

Rule: ivory and blush do most of the work; burgundy for text and key areas; cherry only for small accents (links, hover, one highlight) so it stays minimalist.

## Inspiration: thedigitalyes.com
What we could confirm from the page text: burgundy theme colour, clear heading hierarchy with small uppercase "eyebrow" labels above sections, numbered steps (01, 02, 03), card grids with a short tagline per item, short imperative button labels plus secondary text links with arrows ("Découvrir →"), and an interactive tilt effect on one module.
Not confirmed (needs a visual inspection): exact fonts, spacing, hover and scroll animations.
We take the feel and ideas, not code or assets; components are rebuilt from scratch.

Candidate ideas to borrow:
- Eyebrow labels + numbered sections (01 / 02 / 03)
- Clean card grid for "Nos créations" with a small tagline
- Arrow text links as secondary actions
- Subtle tilt-on-hover for one featured card

## Typography
| Role | Suggestion | Final |
|------|------------|-------|
| Headings | Elegant serif, light weight, with italics for emphasis | TBD |
| Body | Clean sans-serif | TBD |
| Labels / eyebrows | Small uppercase sans, wide letter-spacing (about .14em to .2em) | TBD |
| Scale | Large, airy headings; small, quiet body | TBD |

Font candidates (all free on Google Fonts):
- **Cormorant Garamond** (headings): refined, high contrast, beautiful italic. Reference site uses it for headings.
- **Montserrat** (body): clean and neutral. Reference site uses it for body text.
- **Playfair Display**: a bolder serif alternative for headings.
- **Jost**: a geometric sans alternative for body, a bit more distinctive than Montserrat.

To make hers feel different from the reference, a possible pairing is Cormorant Garamond + Jost.

## Confirmed from the reference site's CSS (design tokens only)
- Fonts: Cormorant Garamond + Montserrat (also loads Playfair Display, Inter, Jost).
- Palette: ivory/cream `#f6f0e9` / `#f7f3ec`, paper `#efe7d9`, oxblood `#5c1a22` (deep `#431218`), ink `#2b2320`, hairline borders at about 8% ink opacity.
- Small radii on controls (4 to 8px), large rounded hero (22px on mobile, 56px on desktop) inset from the screen edges (12px mobile, 28px desktop).
- Generous vertical rhythm: section spacing 56px on mobile, 84px on desktop.
- Soft, low-opacity shadows; no hard borders.
- Easing: `cubic-bezier(.16, 1, .3, 1)` (fast start, long gentle stop) for entrances; short micro-transitions (about .15s to .3s).
- Slow "aurora" blurred gradient backgrounds in burgundy and champagne tones.
- Animations present: word-by-word text entrance, hero rise/drift, fade-up, shimmer, floating elements.
- Section structure: big headline sections, numbered steps, plan cards, FAQ accordion, testimonials.

These are used as inspiration only. All code, assets and copy are written from scratch for this project.

## Layout
- Mobile first, single column that opens up on desktop
- Generous whitespace, narrow text width
- Consistent spacing scale (to define)

## Components
- Buttons: soft, rounded, one primary style
- Cards (creations): image, name, one-line meaning, no price
- Section dividers: thin line, possibly hand-drawn
- Icons: minimal line icons, one stroke weight

## Motion
- Slow, gentle, never flashy
- Respect `prefers-reduced-motion`
- Signature animation: blooming flower on scroll (if concept 1 is chosen)

## Imagery
- Real photos of her work whenever possible
- Illustration (line art) as fallback and accent
- Consistent crop and tone across photos

## Voice (French)
- Warm, poetic, short sentences
- Vouvoiement vs tutoiement: TBD
