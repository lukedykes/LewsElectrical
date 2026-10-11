# Lews Electrical Ltd · Concept website

A concept landing page for [Lews Electrical Ltd](https://www.lewselectrical.co.uk), electrical contractors for homes,
businesses and the rail industry across Essex and London. Designed and built by
[Own Time Studios](https://www.owntimestudios.com) as a "see it before you spend a penny" demo.

**Demo link (once GitHub Pages is switched on):** https://lukedykes.github.io/LewsElectrical/

The page carries a slim "Concept demo" bar and a `noindex` tag so it isn't mistaken for the live site or picked up by
search engines before sign-off.

## What's in it

- **Light-switch hero.** The house photo starts in darkness and the lights flicker on (a night-graded copy of the photo
  sits under the lit original). Visitors can flick the switch themselves; spec callouts appear with the lights.
- **Wire wordmark.** "LEWS" drawn as a bundle of brown, blue and green-and-yellow cables with stripped copper ends,
  after the client's logo. It draws itself in the footer.
- **Sectors.** Domestic, commercial and rail as expanding photo panels.
- **Services index.** Numbered rows with a photo that follows the cursor; clicking a row starts a quote for that
  service.
- **60-second rewire check.** Tick the warning signs and a voltmeter-style dial gives a verdict and the right call to
  action.
- **Before / after.** A draggable comparison of a salon with tired versus designed lighting (keyboard accessible).
- **How it works.** Three cables sag between four steps and "conduct" as you scroll.
- **Refer & earn.** The £50 / £150 referral scheme from the client's flyer as raffle tickets.
- **Coverage map.** A rail-map style schematic of Essex and London plus a postcode checker.
- **FAQ** and a **three-step quote form** with validation and a light-bulb success state.
- Smooth scrolling, a scroll "current" bar, a sticky call/quote bar on phones, and full `prefers-reduced-motion`
  support.

## Stack

- React 19 + TypeScript 7
- [Panda CSS](https://panda-css.com) 2 for styling (design tokens in `panda.config.ts`)
- Vite 8 (Rolldown) on Node.js
- framer-motion for animation, Lenis for smooth scrolling, lucide-react icons
- `server.mjs`: a zero-dependency Node server that serves the build and accepts quote requests

## Getting the GitHub link

1. Make sure Pages is available for the repository. Pages on a **private** repo needs a paid GitHub plan; on the free
   plan, make the repo public first (Settings → General → Danger zone → Change visibility).
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Merge this branch into `main`. The `GitHub Pages` workflow builds and deploys, and the site appears at
   https://lukedykes.github.io/LewsElectrical/. You can also deploy any branch by hand from the Actions tab
   (GitHub Pages → Run workflow); if GitHub refuses with "environment protection rules", add the branch under
   Settings → Environments → github-pages.

## Single-file demo

`demo/lews-electrical-demo.html` is the whole site in one self-contained HTML file (about 1.8 MB, images and fonts
included). Open it straight from disk, send it as an attachment, or host it anywhere static. Rebuild it with
`npm run build:single`.

## Running locally

```bash
npm install          # also generates the Panda styled-system
npm run dev          # Vite dev server at http://localhost:5173
npm run build        # type-check and build to dist/
npm start            # serve dist/ with the Node server at http://localhost:4173
npm run build:single # rebuild demo/lews-electrical-demo.html
```

When the site is served by `npm start`, the quote form posts to `POST /api/enquiry` and enquiries are stored in
`data/enquiries.ndjson`. On static hosting (GitHub Pages, the single file) the form runs in demo mode and says so.

## Project layout

```
src/
  App.tsx              page composition
  data/site.ts         all business details and copy (phone, services, FAQs, coverage)
  sections/            one file per page section
  components/          nav, demo bar, wordmark, shared UI
  lib/                 smooth scroll and quote-form state
  assets/images/       stock photography (see CREDITS.md)
  assets/fonts/        Archivo, Inter and JetBrains Mono (SIL OFL)
panda.config.ts        colours, type styles, keyframes
server.mjs             production server + enquiry endpoint
scripts/inline-build.mjs  builds the single-file demo
```

## Before going live

- Swap the stock photos for real project photos, and the drawn wordmark for the client's logo files.
- Add genuine reviews (none are shown, so nothing is invented).
- Connect `/api/enquiry` to email or a CRM, or point the form at a form service.
- Remove the demo bar and the `noindex` meta tag and `robots.txt` rule, then point www.lewselectrical.co.uk at the
  host.
- Confirm the coverage list, accreditations and referral terms with the client.
