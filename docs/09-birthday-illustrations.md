# Birthday overlay: illustration prompts (optional upgrade)

The overlay (`src/components/Birthday.tsx`) already works with the existing peony and garland.
These prompts give it dedicated birthday art in the **same watercolor style** as the rest of the site.
Same prerequisite as `08`: the project instructions from `07-illustration-project-context.md` are set in the ChatGPT project.

Why not 3D: the whole site is soft watercolor on ivory and burgundy. A glossy 3D render would look like it came from another site. If one 3D-ish piece is wanted, use it only inside the overlay, never mixed with the page art.

**File** = exact name to save in `public/images/`. All are transparent cut-outs with crisp edges, no vignette, no text.

## H1 · `h1-birthday-cake.png` · 1:1 (1024×1024)
```
A small two-tier birthday cake in soft watercolor, ivory frosting, decorated with fresh peonies, a few roses and sage leaves in cherry red and blush pink, three slim lit candles with tiny golden flames. Delicate, elegant, hand-painted. Transparent background, crisp edges, no vignette, no text.
```

## H2 · `h2-gift-bouquet.png` · 1:1 (1024×1024)
```
A gift box wrapped in blush paper with a burgundy satin ribbon bow, a small bouquet of peonies and ranunculus peeking out of the top, sage leaves. Soft watercolor, no ink outline. Transparent background, crisp edges, no vignette, no text.
```

## H3 · `h3-bunting.png` · 3:2 (1536×1024)
```
A hanging bunting garland of small pennant flags in burgundy, blush and ivory with tiny gold edges and little flowers between the flags, drawn in soft watercolor, curved gently like a smile across the top of the canvas. Transparent background, crisp edges, no vignette, no text.
```

## After generating
Save them in `public/images/`, then set `image` in the `birthday` block of `src/content.ts` (for example `"h1-birthday-cake"`). Tell me and I will place H2 and H3 in the overlay too.

## Turning the overlay off
In `src/content.ts` set `birthday.enabled` to `false`. It shows once per session; add `?birthday` to the URL to force it.
