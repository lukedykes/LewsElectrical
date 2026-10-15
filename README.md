# Lews Electrical Ltd · Concept website

A concept website for [Lews Electrical Ltd](https://www.lewselectrical.co.uk), electrical contractors for homes,
businesses and the rail industry across Essex and London. Designed and built by
[Own Time Studios](https://www.owntimestudios.com) as a "see it before you spend a penny" demo.

**Demo link (once GitHub Pages is switched on):** https://lukedykes.github.io/LewsElectrical/

A slim strip at the top says it is a concept by Own Time Studios, and a `noindex` tag keeps it out of search results
until the client signs off.

## Design approach

The site is built from the client's own printed flyers and photos, laid out in the style of a reference site the
client liked:

- **Their colours, the reference's layout.** Deep navy, signal red and white from the flyers. From the reference:
  heavy upright condensed capitals (Barlow Condensed 800/900) with the key word in red, tracked red labels with a
  short rule, thick dividers under each section intro, soft icon tiles, red square bullets, a scrolling services band,
  contact rows, and an always-visible Call / WhatsApp / Free quote bar on phones. Body text is Barlow.
- **Their words.** Headlines, checklists and offers come from the flyers: "Expert electrical solutions", "Do you need
  your home rewired?", "Got a shop or salon that needs modernising?", "Refer a friend and be rewarded!", the red tick
  lists and the round "A safer, brighter home starts here" badge.
- **Their logo and their own work.** The real cable-lettering logo, and Lews Electrical's own job photos throughout:
  the media wall in the hero, first fix and finished kitchen in the rewires section, a new consumer unit, and a
  filterable gallery of 16 job photos. Every photo is cleaned up, upscaled where needed and colour-graded the same
  way (see below), and house numbers are blurred.
- **Local scenery where there's no job photo yet.** The commercial panel and section and the areas map still use photos
  of Southend, Islington and Leigh-on-Sea from Wikimedia Commons (plus one example of an old fuse board), credited in
  the footer. Rail has an icon tile instead of a picture: no trains or stations, at the client's request.
- **Plain and practical.** Gentle motion only (the scrolling band can be paused, and nothing moves if the visitor has
  reduced motion turned on). Phone number on every screen, a simple contact form, and photos sized for each screen.

## Sections

1. Header with accreditations, phone, email and a sticky menu
2. Hero: "Expert electrical solutions." with the media wall photo
3. Scrolling band of services (pausable)
4. Who we work for: domestic, commercial and rail
5. Services (the seven services from the flyer, each with key points)
6. Photo library: real jobs in justified rows, with filters and a full-screen viewer (keyboard, swipe, thumbnails)
7. Home rewires, with work-in-progress and finished photos, warning signs and fuse board photos
8. Lighting design and installation
9. Shops, salons and workplaces
10. Rail infrastructure
11. How it works and why choose Lews
12. Refer a friend (£50 / £150)
13. Areas covered
14. FAQs
15. Contact: call, WhatsApp, email and the quote form

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

- Confirm 07964 154458 is on WhatsApp. The contact section, footer and phone bar link to it (`whatsappHref` in
  `src/data/site.ts`).
- Swap the remaining Wikimedia photos (commercial panel and bar, areas, and the "older fuse board" example) for job
  photos when there are some, add a rail job photo if there is one, and confirm the kitchen first fix and finished photos are the same job (they're
  shown side by side in the rewires section).
- Add genuine Google or Checkatrade reviews (none are shown, so nothing is invented).
- Connect `/api/enquiry` to email or a CRM, or point the form at a form service.
- Remove the concept strip, the `noindex` meta tag and the `robots.txt` rule, then point www.lewselectrical.co.uk at
  the host.
- Confirm the areas covered, the FAQ answers, the rail wording and the referral terms with the client.
