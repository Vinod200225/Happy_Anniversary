// Fixed photos for the 3-year story timeline.
// Drop the three story photos into public/timeline/ named exactly:
//   year1.jpg   (or .png/.webp)   — Year 1: When you fell for me
//   year2.jpg                     — Year 2: When I lost my way
//   year3.jpg                     — Year 3: Finding my way back to you
// Any extension works; the manifest picks the first match per slot.

const BASE = import.meta.env.BASE_URL

const modules = import.meta.glob('/public/timeline/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function findForYear(n: number): string | null {
  const match = Object.keys(modules).find((p) => /year(\d)/i.exec(p)?.[1] === String(n))
  if (!match) return null
  const file = match.split('/').pop() || ''
  return `${BASE}timeline/${file}`.replace(/\/+/g, '/')
}

export const timelinePhotos: (string | null)[] = [
  findForYear(1),
  findForYear(2),
  findForYear(3),
]
