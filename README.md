# 3 Years of Us — anniversary webpage

A static, single-page React site built for one person, one anniversary, one apology, one ask. It's built with Vite + React + TypeScript + Tailwind + Framer Motion, deploys to GitHub Pages with one command, and is fully **content-driven**: drop your photos into folders, edit text in one file, that's it.

There is **no upload UI on the website**. All photos are bundled at build time from `public/gallery/` and `public/timeline/`.

---

## What's on the page (in order)

1. **Hero** — Full-screen landing with floating hearts, "3 Years of Us" in Playfair serif, soft rose gradient, animated scroll indicator.
2. **Our Story (Timeline)** — Three milestones with **fixed** photos pulled from `public/timeline/` (`year1.jpg`, `year2.jpg`, `year3.jpg`). Each milestone alternates left/right with smooth scroll-in animations.
   - Year 1: *When you fell for me*
   - Year 2: *When I lost my way* (honest about the breakup, not pitying)
   - Year 3: *Finding my way back to you*
3. **Our Memory Gallery** — A **dynamic** auto-playing slideshow. Reads every image in `public/gallery/` at build time, sorted naturally (`photo1`, `photo2`, … `photo10`, `photo11`, …). Fade transitions, prev/next arrows, play/pause, thumbnail strip, keyboard ←/→ support. Falls back to ~48 soft gradient placeholders if the folder is empty.
4. **Promise Letter** — Handwritten-style on letter paper. Hand font (Caveat) for the body, script font (Dancing Script) for the signature. Lines fade in one at a time as the letter scrolls into view.
5. **Things I Love About You** — 12 flip cards. Hover (desktop) or tap (mobile) to read the back. Pre-written, easy to swap.
6. **What I'll Do Differently** — Checklist of going-forward commitments. Tap a row to "check it off."
7. **Final Section** — *"Will you give us another chance?"* with a heart button that bursts on press, plus a live counter showing days/hours/minutes/seconds you've been together (driven by `heroContent.startDate`).
8. **Floating UI** — Soft rose petals falling continuously across the page. A bottom-right toggle for ambient background music (defaults to a generated soft synth pad — zero asset weight; pluggable mp3 if you want a real song).

Color palette: soft rose, blush pink, cream, warm gold accents, deep burgundy for emphasis.
Typography: Playfair Display (serif headings), Inter (body sans), Dancing Script (script accents), Caveat (handwriting).
Mobile-responsive throughout. No dark mode by design.

---

## Folder structure

```
anniversary-webpage/
├── public/
│   ├── gallery/                  ← drop photo1.jpg, photo2.jpg, … here (any count)
│   ├── timeline/                 ← drop year1.jpg, year2.jpg, year3.jpg here
│   └── (any other static asset, e.g. our-song.mp3)
├── src/
│   ├── App.tsx                   composes all sections
│   ├── main.tsx                  React entry
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Timeline.tsx          ← reads timelineManifest
│   │   ├── PhotoSlideshow.tsx    ← reads galleryManifest
│   │   ├── PromiseLetter.tsx
│   │   ├── ThingsILove.tsx
│   │   ├── PromisesForward.tsx
│   │   ├── FinalSection.tsx
│   │   ├── BackgroundMusic.tsx
│   │   ├── FloatingHearts.tsx
│   │   └── RosePetals.tsx
│   ├── data/
│   │   ├── content.ts            ← ALL editable text lives here
│   │   ├── galleryManifest.ts    ← auto-scans public/gallery/ at build time
│   │   └── timelineManifest.ts   ← auto-scans public/timeline/ at build time
│   └── styles/index.css          Tailwind + custom polaroid/letter/waveform CSS
├── index.html                    favicon + Google Fonts
├── vite.config.ts                base: '/anniversary-webpage/'
├── tailwind.config.js            rose / blush / cream / burgundy / gold palette
├── tsconfig.json
├── package.json                  incl. "deploy" script via gh-pages
├── CONTENT.md                    text personalization checklist
└── README.md                     ← you are here
```

---

## How it works (the photo magic)

`src/data/galleryManifest.ts` and `src/data/timelineManifest.ts` use Vite's `import.meta.glob('/public/.../*.{jpg,…}', { eager: true, query: '?url' })` to scan the folders at build time and produce an ordered list of public URLs. No runtime fetches, no server, no JSON manifest to maintain. You add a file → Vite picks it up next build → it appears on the site.

This means:
- ✅ Pure static — works on GitHub Pages with no backend.
- ✅ Dynamic — 1 photo or 200, no code change.
- ✅ Survives refresh (it's part of the build, not browser storage).
- ✅ Visible on every device that opens the URL — not just yours.

---

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Vite prints a URL — usually `http://localhost:5173/anniversary-webpage/`. Hot reload picks up new photos and text changes instantly.

## Build

```bash
npm run build
npm run preview     # optional — serves dist/ locally to test the production build
```

The production site lands in `dist/`.

---

## Deploy to GitHub Pages — exact steps

The project is pre-configured to be served from `https://<your-username>.github.io/anniversary-webpage/` (`base` is set in `vite.config.ts`).

### 1. Create the GitHub repo

Repo **must be named `anniversary-webpage`** (matches the `base` path). If you must use a different name, edit `vite.config.ts` → `base: '/<your-repo-name>/'` first.

### 2. Push your code

From the project folder:

```bash
git init
git add .
git commit -m "first version"
git branch -M main
git remote add origin https://github.com/<your-username>/anniversary-webpage.git
git push -u origin main
```

### 3. Deploy

```bash
npm run deploy
```

This runs `npm run build` first (via `predeploy`), then pushes the `dist/` folder to a `gh-pages` branch using the `gh-pages` package.

### 4. Enable GitHub Pages in the repo settings

1. Open your repo on GitHub
2. **Settings → Pages**
3. **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` / `(root)`
4. Click **Save**
5. Wait ~30–60 seconds. Your site is live at:
   `https://<your-username>.github.io/anniversary-webpage/`

### Re-deploying after changes

Any time you add photos or edit text:

```bash
git add .
git commit -m "added more memories"
git push
npm run deploy
```

GitHub Pages picks up the new `gh-pages` branch within a minute.

### Custom domain (optional)

In **Settings → Pages**, enter your custom domain. Then create `public/CNAME` containing the domain. Re-deploy.

---

## How to add **photos**

### Memory gallery (the slideshow — dynamic, 40-50+ photos)

Drop image files into `public/gallery/`. Naming is up to you, but numeric names sort naturally:

```
public/gallery/
├── photo1.jpg
├── photo2.jpg
├── photo3.jpg
...
├── photo50.jpg
```

Supported: `.jpg .jpeg .png .webp .gif .avif`

There's **no count limit** — add 50, 100, 200. They all show up in the slideshow with thumbnail navigation. Until you add any, the gallery shows ~48 soft gradient placeholders.

**Performance tip**: GitHub Pages serves over a CDN but the build size affects clone/deploy time. Compress photos to ~1500px wide JPEG/WebP at 80% quality before adding. You can use [Squoosh](https://squoosh.app/) (browser) or `cwebp` / `magick mogrify` (CLI).

### Story timeline (the 3 milestones — fixed)

Drop **exactly three** photos into `public/timeline/`:

```
public/timeline/
├── year1.jpg     → Year One: When you fell for me
├── year2.jpg     → Year Two: When I lost my way
└── year3.jpg     → Year Three: Finding my way back to you
```

The manifest matches the `yearN` part of the filename, so `year1.jpg`, `year1.png`, `year-1.jpg`, `Year1Memory.jpg` all work. If a slot is empty, that milestone shows a small "drop a photo here" hint while the rest of the page is unaffected.

---

## How to customize the text

Every editable string lives in [`src/data/content.ts`](src/data/content.ts). Search the file for `// TODO: Personalize` and you'll land on each spot.

Key items:
- `heroContent.title` — big headline ("3 Years of Us")
- `heroContent.tagline` — script-font subtitle
- `heroContent.startDate` — `YYYY-MM-DD` of when you became "us" (drives the live counter)
- `timelineContent[0..2]` — the three milestone bodies
- `promiseLetter.lines` — each string becomes one fade-in line of the handwritten letter
- `thingsILoveAboutYou` — 12 flip cards (front + back)
- `promisesForward` — checklist commitments
- `finalSection.question / subline / buttonText` — the closing ask

[`CONTENT.md`](CONTENT.md) has a more readable map of every personalization spot.

## Background music

By default, a soft generated synth pad plays through Web Audio when you click the bottom-right toggle. **Zero asset weight** — nothing extra to include.

To use your own song instead:
1. Drop an mp3 into `public/`, e.g. `public/our-song.mp3`
2. In `src/App.tsx`, change `<BackgroundMusic />` to:

   ```tsx
   <BackgroundMusic audioSrc="/anniversary-webpage/our-song.mp3" />
   ```

(Keep mp3s under ~5 MB to stay friendly with GitHub Pages.)

---

## Tech stack

- **Vite 5** + **React 18** + **TypeScript 5** — fast dev, tiny prod bundle
- **Tailwind CSS 3** — custom rose/blush/cream/burgundy/gold palette
- **Framer Motion** — scroll-in fades, slide-ins, heart bursts
- **Lucide React** — icons
- **gh-pages** — one-command deploy
- **Vite `import.meta.glob`** — content-driven photo manifests

Production bundle: ~300 KB JS / ~28 KB CSS (gzipped: ~97 KB / ~6 KB) — adds the weight of your photos on top.

---

## Quick FAQ

**Q. Can she upload her own memories on her phone?**
No — by design. The page is purely a static site reading from the bundled folder. Whatever's in your repo at build time is what everyone sees.

**Q. I want to tweak a color.**
Edit `tailwind.config.js` (palette) or `src/styles/index.css` (custom utilities like polaroid / letter paper).

**Q. Can the timeline have more than 3 milestones?**
Yes — add entries to `timelineContent` in `src/data/content.ts`, then add matching `year4.jpg`, `year5.jpg`, etc. to `public/timeline/`. The component renders one block per array item.

**Q. The site loads but photos 404 on GitHub Pages.**
Check that `vite.config.ts` `base` matches your repo name exactly (case-sensitive), redeploy.

---

Made with every honest piece of me — for her.
