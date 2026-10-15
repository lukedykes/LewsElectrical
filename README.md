# Lews Electrical Ltd · Concept website

A concept website for [Lews Electrical Ltd](https://www.lewselectrical.co.uk), electrical contractors for homes,
businesses and the rail industry across Essex and London. Designed and built by
[Own Time Studios](https://www.owntimestudios.com) as a "see it before you spend a penny" demo.

**Demo link (once GitHub Pages is switched on):** https://lukedykes.github.io/LewsElectrical/

A slim strip at the top says it is a concept by Own Time Studios, and a `noindex` tag keeps it out of search results
until the client signs off.

## Design approach

The site is built from the client's own printed flyers rather than a generic template, so it looks like their business:

- **Their colours and type.** Deep navy, signal red and white, with heavy italic condensed capitals for headlines
  (Barlow Condensed) and the slanted red banner behind key words, as on the flyers. Body text is Barlow.
- **Their words.** Headlines, checklists and offers come from the flyers: "Expert electrical solutions", "Do you need
  your home rewired?", "Got a shop or salon that needs modernising?", "Refer a friend and be rewarded!", the red tick
  lists and the round "A safer, brighter home starts here" badge.
- **Their logo and their own work.** The real cable-lettering logo, and Lews Electrical's own job photos throughout:
  the media wall in the hero, first fix and finished kitchen in the rewires section, a new consumer unit, and a
  filterable gallery of 16 jobs. Every photo is cleaned up, upscaled and colour-graded the same way (see below).
- **Local scenery where there's no job photo yet.** Commercial, rail and the areas map still use photos of Southend,
  Islington, Chappel Viaduct and Leigh-on-Sea from Wikimedia Commons (plus one example of an old fuse board), credited
  in the footer. No trains or stations, at the
  client's request.
- **Plain and practical.** Gentle motion only (and none if the visitor has reduced motion turned on). Phone number on
  every screen, a sticky call bar on phones, a simple contact form, and photos sized for each screen.

## Sections

1. Header with accreditations, phone, email and a sticky menu
2. Hero: "Expert electrical solutions" for homes, businesses and the rail industry
3. Domestic, commercial and rail panels
4. Services (the seven services from the flyer)
5. Our work: a gallery of real jobs in justified rows, with filters and a full-screen viewer (keyboard, swipe,
   thumbnails)
6. Home rewires, with a before-and-after pair, warning signs and fuse board photos
7. Shops, salons and workplaces
8. Rail infrastructure
9. How it works and why choose Lews
10. Refer a friend (£50 / £150)
11. Areas covered
12. FAQs
13. Contact form and details

## Stack

- React 19 + TypeScript 7
- [Panda CSS](https://panda-css.com) 2 for styling (design tokens in `panda.config.ts`)
- Vite 8 (Rolldown) on Node.js
- `server.mjs`: a zero-dependency Node server that serves the build and accepts enquiries

## Getting the GitHub link

1. Make sure Pages is available for the repository. Pages on a **private** repo needs a paid GitHub plan; on the free
   plan, make the repo public first (Settings → General → Danger zone → Change visibility).
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**. Don't add any of the suggested workflows
   GitHub offers there: this repo already has its own (`.github/workflows/pages.yml`).
3. Merge this branch into `main`. The `GitHub Pages` workflow builds and deploys, and the site appears at
   https://lukedykes.github.io/LewsElectrical/. You can also deploy any branch by hand from the Actions tab
   (GitHub Pages → Run workflow); if GitHub refuses with "environment protection rules", add the branch under
   Settings → Environments → github-pages.

## Single-file demo

`demo/lews-electrical-demo.html` is the whole site in one self-contained HTML file, with images and fonts included.
Open it straight from disk, send it as an attachment, or host it anywhere static. Rebuild it with
`npm run build:single`.

## Running locally

```bash
npm install          # also generates the Panda styled-system
npm run dev          # Vite dev server at http://localhost:5173
npm run build        # type-check and build to dist/
npm start            # serve dist/ with the Node server at http://localhost:4173
npm run build:single # rebuild demo/lews-electrical-demo.html
```

When the site is served by `npm start`, the contact form posts to `POST /api/enquiry` and enquiries are stored in
`data/enquiries.ndjson`. On static hosting (GitHub Pages, the single file) the form runs in demo mode and says so.

## Project layout

```
src/
  App.tsx              page composition
  data/site.ts         all business details and wording (phone, services, checklists, FAQs, areas)
  sections/            one file per page section
  components/          header, logo, shared UI (buttons, tick lists, red highlight)
  data/gallery.ts      gallery order, captions' tags and filters
  lib/contact.tsx      "get a quote" buttons that jump to the form with the service picked
  lib/justify.ts       justified-rows layout for the gallery
  assets/images/work/  graded job photos (generated, see below)
  assets/images/       local scenery photography (see CREDITS.md)
  assets/brand/        the logo, for dark and light backgrounds (generated)
  assets/fonts/        Barlow and Barlow Condensed (SIL OFL)
photos/originals/      the client's untouched photos and logo
panda.config.ts        colours, type styles
server.mjs             production server + enquiry endpoint
scripts/inline-build.mjs  builds the single-file demo
scripts/photos/grade.py   grades the job photos, logo and sharing image
```

## Job photos

Originals go in `photos/originals/`. `scripts/photos/grade.py` has a short recipe for each photo (crop, then how much
white balance, exposure, shadow lift, contrast, clarity, vibrance, warm-and-navy split tone and vignette). It cleans
up JPEG noise, upscales anything small 2x with the FSRCNN super-resolution model, grades it, and writes a large and a
small WebP to `src/assets/images/work/` with the sizes in `manifest.json`. It also makes the two logo files and
`public/og.jpg`.

```bash
pip install pillow numpy opencv-contrib-python-headless fonttools brotli
python3 scripts/photos/grade.py --sheet   # all photos, plus a before/after contact sheet in scripts/photos/.cache/
python3 scripts/photos/grade.py media-wall # just one
```

To add a photo: drop it in `photos/originals/`, add a recipe in `grade.py`, run it, then add it to
`src/assets/images/work.ts` (alt text and caption) and `src/data/gallery.ts` (position and filters).

## Before going live

- Swap the remaining Wikimedia photos (commercial panel and bar, rail, areas, and the "older fuse board" example) for
  job photos when there are some, and confirm the kitchen first fix and finished photos are the same job (they're
  shown as a before and after).
- Add genuine Google or Checkatrade reviews (none are shown, so nothing is invented).
- Connect `/api/enquiry` to email or a CRM, or point the form at a form service.
- Remove the concept strip, the `noindex` meta tag and the `robots.txt` rule, then point www.lewselectrical.co.uk at
  the host.
- Confirm the areas covered, the FAQ answers, the rail wording and the referral terms with the client.
