# Brand logo assets — selective manual update guide

Official NaviG8r logo files live in **`apps/www/public/brand/`**.  
They are **not wired into the live marketing layout** by default (site-wide auto-swap looked jarring on hero/header/footer). Use this guide to place them **selectively** later.

## Asset inventory

| File | Use on |
|------|--------|
| `logo-horizontal-light-transparent.png` | Light backgrounds (header on mist/cream, light sections) |
| `logo-horizontal-light-white-bg.png` | Same as above when you need an opaque plate |
| `logo-horizontal-light.svg` | Prefer for crisp header at any DPR (fonts may need Poppins) |
| `logo-horizontal-dark-navy-bg.png` | Dark navy plate — footer or compact badge only; **avoid large hero overlays** |
| `logo-horizontal-dark.svg` | Dark full-bleed SVG (includes navy rect) |
| `logo-horizontal-on-dark.svg` | Dark wordmark without full canvas (better for overlays if refined) |
| `logo-monochrome-*.png` / `.svg` | Single-color treatments, watermarks, print |
| `icon-mark.svg` / `icon-mark-512.png` | Favicon, app icon, small nav mark, social avatar |

## Recommended placements (do one at a time)

1. **Favicon first** — safest  
   - Copy `icon-mark.svg` → `apps/www/public/favicon.svg`  
   - Optional: `icon-mark-512.png` → `apple-touch-icon.png` + `<link rel="apple-touch-icon" …>` in `index.html`

2. **Header only** — next safest  
   - Replace the `.brand` text/`brand-mark` span with:
     ```html
     <img class="brand-logo" src="/brand/logo-horizontal-light-transparent.png" width="200" height="57" alt="NaviG8r" />
     ```
   - CSS: `.brand-logo { height: 2.25rem; width: auto; display: block; }`  
   - Keep hero wordmark as typography so the first viewport stays one composition.

3. **Footer** — optional small plate  
   - Prefer a **scaled** dark logo (~180–220px wide), not hero-scale.  
   - Or use `icon-mark` + text “NaviG8r” to avoid a heavy navy rectangle.

4. **Hero** — only with design review  
   - Do **not** drop `logo-horizontal-dark-navy-bg.png` as a large floating card over photography without mockups.  
   - Prefer: keep display type “NaviG8r” **or** a transparent on-dark wordmark after visual QA.  
   - Brand-test: after removing nav, the logo/wordmark must still read as NaviG8r without competing with the headline.

## What to avoid

- Replacing header + hero + footer logos in one change (visual weight stacks).  
- Using the navy-background horizontal PNG at hero scale (reads as a sticker on the photo).  
- Stretching logos; always lock aspect ratio (`height` + `width: auto`).  
- Mixing light logo on dark sections (or dark plate on light) without checking contrast.

## QA checklist before shipping a selective swap

- [ ] Desktop header (~1280px) and mobile (~390px)  
- [ ] Scrolled vs unscrolled header (blur/background)  
- [ ] Hero first viewport: brand still dominant, headline not crushed  
- [ ] Favicon tab + iOS home-screen icon if apple-touch added  
- [ ] Refresh PR preview screenshots after the change  

## Local preview

```bash
cd apps/www && npm install && npm run dev
```
