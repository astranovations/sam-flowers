# Implementation Plan (React, v1)

Defaults are proposals; change any of them before we start.

## Stack
| Area | Choice | Why |
|------|--------|-----|
| Build tool | Vite + React | Fast, simple, static output |
| Language | TypeScript | Fewer bugs, easy to grow into a shop |
| Styling | Plain CSS with design tokens (CSS variables) | Full control, no extra dependency, matches the design system doc |
| Animation | Framer Motion (`motion`) for reveals; SVG + scroll progress for the blooming flower | Smooth scroll-linked animation with little code |
| Smooth scroll | Native CSS `scroll-behavior`; Lenis only if needed | Keep it light |
| Fonts | Cormorant Garamond + Jost, self-hosted via Fontsource | Fast, no third-party requests |
| Icons | Hand-made SVG (line style) | Consistent, tiny |
| Hosting | Vercel or Netlify (free), or GitHub Pages | Static site, easy previews |
| Language | French only; text kept in one `content.ts` file | Easy to edit, ready to add Arabic later |

## Folder structure
```
sam-flowers/
├─ docs/
├─ public/            images, favicon, og-image
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ content.ts      all French copy and creations data
│  ├─ styles/
│  │  ├─ tokens.css   colours, fonts, spacing, radii, easing
│  │  ├─ base.css     reset and global styles
│  │  └─ sections.css
│  ├─ components/
│  │  ├─ Header.tsx
│  │  ├─ Hero.tsx
│  │  ├─ BloomingFlower.tsx   scroll-linked SVG
│  │  ├─ Story.tsx
│  │  ├─ Creations.tsx
│  │  ├─ CreationCard.tsx
│  │  ├─ Values.tsx
│  │  ├─ Quote.tsx
│  │  ├─ Contact.tsx
│  │  ├─ Footer.tsx
│  │  └─ ui/ Button.tsx, Eyebrow.tsx, Reveal.tsx
│  └─ hooks/ useScrollProgress.ts, useReducedMotion.ts
└─ index.html
```

## Phases

### Phase 0: Decisions (before any code)
- Shop name, logo, tagline
- Palette and fonts final
- Photos or illustration
- Which creative concepts to keep
- Contact details (Instagram, WhatsApp, phone, city)

### Phase 1: Foundation
- Scaffold Vite + React + TypeScript
- Add `tokens.css` (palette, fonts, spacing, radius, easing) and base styles
- Self-host fonts, set up `content.ts`
- Basic layout, header, footer, `Reveal` fade-up component
- Deploy a first empty preview so she can see it live early

### Phase 2: Hero (the "wow")
- Rounded inset hero block with a slow blush-to-burgundy gradient
- Word-by-word tagline entrance
- `BloomingFlower` SVG: stem grows and flower opens with scroll
- Soft "Découvrir" button + scroll hint

### Phase 3: Content sections
- Notre histoire
- Nos créations: cards with name, poetic flower meaning, no price, subtle hover/tilt
- Ce qui nous distingue: 3 points with line icons
- Citation band
- Contact (links only, no form) and footer

### Phase 4: Polish
- Responsive pass: phone first, then tablet and desktop
- Motion: respect `prefers-reduced-motion`, tune timings
- Accessibility: contrast, focus states, alt text, semantic headings
- Performance: image sizes (WebP), font subsets, Lighthouse check
- SEO and sharing: title, description, Open Graph image, favicon, `lang="fr"`

### Phase 5: Launch
- Real photos and final copy swapped in
- Domain (optional) and hosting
- Show it to her

## Definition of done (v1)
- Looks right on phones (360px) up to large desktop
- Lighthouse performance and accessibility above 90
- No prices or buy buttons; contact links work
- All text editable from `content.ts`
- Branch merged to `main` and deployed

## Later (v2 ideas, not now)
- Arabic / RTL
- Real catalogue with prices and an order form or WhatsApp ordering
- Online payment (CIB / Edahabia)
- Small admin to update photos without code

## Risks and notes
- No photos means the page relies on illustration; the blooming flower SVG needs to be drawn carefully. This is the main design effort.
- Keep animations light so low-end phones stay smooth.
- Reference site is inspiration only; all code and assets are original.
