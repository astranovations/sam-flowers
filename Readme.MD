# Sam Flowers

Minimalist landing page (French) for Sam Flowers. React + Vite + TypeScript.

## Run
```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Where things are
- `src/content.ts`: all French text and the list of creations (edit copy here)
- `src/styles/tokens.css`: palette, fonts, spacing, easing
- `src/components/`: one component per section
- `docs/`: brief, sections, design system, plan, illustration prompts

## Illustrations
Every illustration slot has a placeholder in `public/images/placeholders/`.
To use a real illustration, save it as `public/images/<name>.png` (names are listed in
`docs/08-illustration-prompts.md`, for example `a1-sprout.png` or `b1-pivoines.png`).
The page picks it up automatically, no code change needed.
To regenerate the placeholders: `node scripts/make-placeholders.mjs`.
