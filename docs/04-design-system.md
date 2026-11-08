# Design System

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
| Headings | Elegant serif | TBD |
| Body | Clean sans-serif | TBD |
| Scale | Large, airy headings; small, quiet body | TBD |

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
