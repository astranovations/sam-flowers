# ChatGPT Project: context to paste

Create a ChatGPT Project named **Sam Flowers – Illustrations**. Paste the block below into the project's **Instructions** (project context). Then each prompt in `08-illustration-prompts.md` is short and can be pasted on its own, one by one, in the same project.

Tip: in the same chat/project, after the first image you like (A5, the full-bloom peony), say "keep exactly this style for all next images" and attach it as reference for the following ones.

---

## Paste this into the Project Instructions

```
You generate illustrations for "Sam Flowers", a minimalist French flower shop landing page. Every image must follow this style exactly, so all images look like one set:

STYLE
- Minimalist botanical line-art, fine hand-drawn ink linework in deep burgundy #5C1A22.
- Delicate thin strokes with slightly varied line weight.
- Soft watercolor wash used sparingly: blush pink #F3E3E1 and cherry red #9B1B30.
- Elegant, airy, lots of empty space, editorial, romantic but modern.
- Background: plain transparent PNG. If transparency is not possible, flat ivory #F6F0E9.
- Subject centered with generous margin on all sides, never cropped.

NEVER include
- Text, letters, numbers, watermark, signature, frame or border.
- Photo-realism, 3D, heavy shading, drop shadows, clutter, neon colors, cartoon style.

OUTPUT
- Generate ONE image per request, at the highest resolution available.
- Use the aspect ratio given in the request (default 4:5 portrait).
- Do not add anything that was not asked for. Do not describe the image afterwards; just generate it.
- When I say "same flower" or "same canvas", keep the exact same flower design, stem curve, size and position as in the previous image of the series.

PALETTE (only these)
- Burgundy #5C1A22 (lines)
- Cherry #9B1B30 (accents, flower centers)
- Blush #F3E3E1 (washes)
- Ivory #F6F0E9 (background if needed)
```

---

## Workflow
1. Generate the images in order (A1 to A5 first, they are the most important).
2. If one is off-style, say: "Regenerate, thinner lines, more empty space, less color."
3. Download each image and rename it with the file name from `08-illustration-prompts.md`.
4. Put them in `public/images/` (replacing the placeholders with the same name) and tell Claude when they are ready.
