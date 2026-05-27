# How to add photos

The website does **not** have an upload button. Photos are picked up from two folders inside this project. Drop your files in, run a build, and they appear on the page.

There are exactly two photo locations:

| Folder | What it's for | Naming |
| --- | --- | --- |
| `public/timeline/` | The 3 fixed story photos | `year1.*`, `year2.*`, `year3.*` |
| `public/gallery/` | The dynamic memory slideshow | anything (40-50+ supported) |

Supported formats for both: `.jpg .jpeg .png .webp .gif .avif`

---

## 1. Story timeline (3 fixed photos)

These are the photos next to the Year 1 / Year 2 / Year 3 milestones.

Open `public/timeline/` and drop in **exactly three** files:

```
public/timeline/
├── year1.jpg     →  Year One: When you fell for me
├── year2.jpg     →  Year Two: When I lost my way
└── year3.jpg     →  Year Three: Finding my way back to you
```

The matcher just looks for `year1`, `year2`, or `year3` somewhere in the filename, so all of these work:

- `year1.jpg`
- `year1.png`
- `year-1.webp`
- `Year1Memory.jpeg`

If a slot is empty, that milestone shows a soft rose gradient with the year label until you add the photo. The rest of the page is unaffected.

---

## 2. Memory gallery (dynamic, 40-50+ photos)

These are the photos in the auto-playing slideshow.

Open `public/gallery/` and drop in as many photos as you want. Names are up to you. **Numeric names sort naturally**, so this ordering is recommended:

```
public/gallery/
├── photo1.jpg
├── photo2.jpg
├── photo3.jpg
...
├── photo49.jpg
└── photo50.jpg
```

(`photo10.jpg` correctly lands between `photo9.jpg` and `photo11.jpg` — no zero-padding needed.)

There is **no count limit**. Drop in 1, 50, or 200 photos. The slideshow, thumbnail strip, and counter all adjust automatically.

If the folder is empty, the gallery shows ~48 soft gradient placeholders with romantic phrases until you add photos.

---

## 3. Apply the change

After dropping photos in:

### If running locally (`npm run dev`)
Just save — Vite hot-reloads and the photos appear immediately.

### If publishing to GitHub Pages
```bash
git add public/gallery public/timeline
git commit -m "added memories"
git push
npm run deploy
```

`npm run deploy` rebuilds the site and pushes to the `gh-pages` branch. GitHub Pages picks up the new build within ~30-60 seconds.

---

## 4. Performance tips

GitHub Pages serves over a CDN, but every photo lands inside the build, so file size matters.

- **Target ~1500px wide** for landscape photos (~1000px wide for portrait).
- **Convert to WebP** if you can — usually 30-50% smaller than JPEG at the same quality.
- **JPEG quality 80-82%** is visually indistinguishable from 100%.

Free tools:
- [Squoosh](https://squoosh.app/) — drag-and-drop in your browser. Best for occasional batches.
- `cwebp` (CLI) — `cwebp -q 82 input.jpg -o output.webp`
- `magick mogrify` (ImageMagick CLI) — `magick mogrify -resize 1500x -quality 82 *.jpg`

A 50-photo gallery sitting at ~150 KB each is ~7.5 MB total — well within GitHub Pages' comfort zone.

---

## 5. Common questions

**Can she upload photos from her phone?**
No. The site is purely static. Whatever's in `public/gallery/` and `public/timeline/` when you deploy is what everyone sees forever (until you redeploy).

**Can the gallery have more than the 3 timeline photos AND the 50 gallery photos?**
Yes — the 3 timeline photos and the gallery photos are independent. You can have 3 timeline photos + 200 gallery photos.

**Can I add more than 3 timeline milestones?**
Yes, but it requires a tiny code edit. Add a 4th entry to `timelineContent` in `src/data/content.ts`, then drop a `year4.jpg` into `public/timeline/`. The component renders one block per array item.

**The site loads but photos 404 on GitHub Pages.**
Confirm `vite.config.ts` `base` matches your repo name exactly (case-sensitive: `/anniversary-webpage/`), then `npm run deploy` again.

**Does deleting a photo from the folder remove it from the site?**
Yes — only what's in the folder at build time gets bundled. Delete file → rebuild → it's gone.

---

## TL;DR

1. Drop story photos in `public/timeline/` named `year1.jpg`, `year2.jpg`, `year3.jpg`.
2. Drop memory photos in `public/gallery/` (any names, 1-200+).
3. `npm run deploy` to publish.

That's it.
