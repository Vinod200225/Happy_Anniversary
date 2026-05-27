# public/gallery/

Drop your memory-gallery photos here. They will appear in the auto-playing slideshow on the page automatically.

## Naming

Use any name you like. Numeric names sort naturally:

```
photo1.jpg
photo2.jpg
photo3.jpg
...
photo50.jpg
```

(`photo10.jpg` will correctly land between `photo9.jpg` and `photo11.jpg`.)

## Supported formats

`.jpg` `.jpeg` `.png` `.webp` `.gif` `.avif`

## How many?

Add as many as you want — 1, 50, 200. The gallery is fully dynamic. There's no count limit.

## Performance tip

Compress photos before adding them. ~1500px wide JPEG/WebP at 80% quality looks great and keeps the GitHub Pages build small.

## After adding photos

```bash
npm run build      # picks up the new files
npm run deploy     # publishes to GitHub Pages
```

In dev mode (`npm run dev`) the photos appear immediately on save.
