// AUTO-USED BY THE GALLERY.
// Vite scans /public/gallery/ at build time via import.meta.glob.
// Drop photos named photo1.jpg, photo2.jpg, ... photoN.jpg (or .png/.webp/.jpeg) into public/gallery/.
// They will appear in the slideshow automatically — no code changes needed.
// Sort is natural (photo2 before photo10).

const BASE = import.meta.env.BASE_URL // e.g. "/anniversary-webpage/"

// Eagerly grab every image in public/gallery as a URL string.
// `query: '?url'` + `import: 'default'` returns the resolved public URL.
const modules = import.meta.glob('/public/gallery/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function naturalSort(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

export const galleryPhotos: string[] = Object.keys(modules)
  .sort(naturalSort)
  .map((path) => {
    // path looks like "/public/gallery/photo1.jpg" — convert to served URL
    const file = path.split('/').pop() || ''
    return `${BASE}gallery/${file}`.replace(/\/+/g, '/')
  })

// Number of soft gradient placeholder slots to show when no photos have been added yet.
export const PLACEHOLDER_COUNT = 48
