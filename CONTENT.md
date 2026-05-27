# Personalization checklist

All text lives in [`src/data/content.ts`](src/data/content.ts). All photos live in [`public/gallery/`](public/gallery/) and [`public/timeline/`](public/timeline/). Nothing else needs touching.

## Photos

### Memory gallery (dynamic, 40-50+ photos)
Drop into [`public/gallery/`](public/gallery/) — any count, any names. Numeric names sort naturally. Supports `.jpg .jpeg .png .webp .gif .avif`.

### Timeline (fixed, 3 photos)
Drop into [`public/timeline/`](public/timeline/) named:
- `year1.jpg` → Year 1: When you fell for me
- `year2.jpg` → Year 2: When I lost my way
- `year3.jpg` → Year 3: Finding my way back to you

## Text — `src/data/content.ts`

### 1. Hero (top of page)
| Variable | What it is |
| --- | --- |
| `heroContent.title` | Big title (default: "3 Years of Us") |
| `heroContent.tagline` | Script-font subtitle |
| `heroContent.startDate` | `YYYY-MM-DD` — drives the live counter |
| `heroContent.scrollHint` | Small scroll-down label |

### 2. Timeline (3 milestones)
`timelineContent` is an array of three `{ year, title, body, accent }` objects.
- `accent`: `'rose'`, `'burgundy'`, or `'gold'` — controls the milestone's color chip and dot.

### 3. Promise letter
- `promiseLetter.greeting` — opens the letter
- `promiseLetter.lines` — array; each string is one fade-in line. Empty strings = soft gap.
- `promiseLetter.signOff`, `promiseLetter.signature`

### 4. Things I love about you
`thingsILoveAboutYou` — array of `{ front, back }` flip cards. Add as many as you want.

### 5. What I'll do differently
`promisesForward` — flat array of strings. Each becomes a check-off-able row.

### 6. Final section
`finalSection.question`, `subline`, `buttonText`, `buttonAfter`.

### 7. Section headings
`sectionMeta.timeline`, `sectionMeta.thingsILove`, `sectionMeta.promises`, `photoSlideshowMeta.title/subtitle`.

## Counter / "We have been us for…"
Driven by `heroContent.startDate`. Set the right `YYYY-MM-DD` and it ticks correctly.

## Background music
Default = generated soft synth pad (no file required).
To use your own song: drop an mp3 in `public/`, then in `src/App.tsx` change `<BackgroundMusic />` to `<BackgroundMusic audioSrc="/anniversary-webpage/your-song.mp3" />`.

## Color palette / fonts
- Palette: edit `tailwind.config.js`
- Custom CSS (polaroid, letter paper, waveform): edit `src/styles/index.css`
- Google Fonts (Playfair Display, Inter, Dancing Script, Caveat): edit the `<link>` in `index.html`
