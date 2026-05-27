import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { photoSlideshowMeta } from '../data/content'
import { galleryPhotos, PLACEHOLDER_COUNT } from '../data/galleryManifest'

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #fecdd3 0%, #fda4af 100%)',
  'linear-gradient(135deg, #ffe4e6 0%, #fef3e2 100%)',
  'linear-gradient(135deg, #fda4af 0%, #fb7185 100%)',
  'linear-gradient(135deg, #fef3e2 0%, #fecdd3 100%)',
  'linear-gradient(135deg, #fce7eb 0%, #fbcfd9 100%)',
  'linear-gradient(135deg, #f7a8b9 0%, #fda4af 100%)',
  'linear-gradient(135deg, #fffaf3 0%, #ffe4e6 100%)',
  'linear-gradient(135deg, #fbcfd9 0%, #f17593 100%)',
  'linear-gradient(135deg, #ffe4e6 0%, #fda4af 100%)',
  'linear-gradient(135deg, #fef3e2 0%, #fbcfd9 100%)',
  'linear-gradient(135deg, #fecdd3 0%, #f7a8b9 100%)',
  'linear-gradient(135deg, #fce7eb 0%, #fda4af 100%)',
]

const PLACEHOLDER_PHRASES = [
  'a memory waiting',
  'us, somewhere',
  'a quiet moment',
  'something we said',
  'a soft afternoon',
  'a laugh I remember',
  'the way you looked',
  'a small forever',
  'an ordinary day',
  'us being us',
  'a thursday with you',
  'something only we know',
]

type Slide =
  | { kind: 'real'; src: string; id: string }
  | { kind: 'placeholder'; bg: string; phrase: string; id: string }

export default function PhotoSlideshow() {
  const slides: Slide[] =
    galleryPhotos.length > 0
      ? galleryPhotos.map((src, i) => ({ kind: 'real', src, id: `photo-${i}` }))
      : Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => ({
          kind: 'placeholder',
          bg: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length],
          phrase: PLACEHOLDER_PHRASES[i % PLACEHOLDER_PHRASES.length],
          id: `placeholder-${i}`,
        }))

  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { margin: '-25% 0px -25% 0px' })

  useEffect(() => {
    if (index >= slides.length) setIndex(0)
  }, [slides.length, index])

  const next = useCallback(
    () => setIndex((i) => (i + 1) % Math.max(slides.length, 1)),
    [slides.length],
  )
  const prev = useCallback(
    () =>
      setIndex(
        (i) => (i - 1 + Math.max(slides.length, 1)) % Math.max(slides.length, 1),
      ),
    [slides.length],
  )

  useEffect(() => {
    if (!isPlaying || !inView || slides.length <= 1) return
    const t = setTimeout(next, photoSlideshowMeta.autoplayMs)
    return () => clearTimeout(t)
  }, [index, isPlaying, inView, slides.length, next])

  // Keyboard support — left/right arrows
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const current = slides[index]

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-20 md:py-32 px-5 md:px-6 bg-gradient-to-b from-blush-50 to-rose-100"
    >
      <div className="max-w-5xl mx-auto text-center mb-10 md:mb-12">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-burgundy-600 mb-3">
          {photoSlideshowMeta.title}
        </h2>
        <p className="font-script text-xl sm:text-2xl text-rose-700">
          {photoSlideshowMeta.subtitle}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl ring-1 ring-rose-200">
          <div className="relative aspect-[4/3] md:aspect-[16/10] vignette overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.id ?? index}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                {current?.kind === 'real' ? (
                  <img
                    src={current.src}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: current?.bg }}
                  >
                    <span className="font-script text-2xl sm:text-3xl text-white/85 text-elegant px-4 text-center">
                      {current?.phrase}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-rose-700 rounded-full p-1.5 sm:p-2 shadow-lg backdrop-blur transition"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-rose-700 rounded-full p-1.5 sm:p-2 shadow-lg backdrop-blur transition"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/85 rounded-full px-3 py-1.5 shadow-md backdrop-blur">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="text-rose-700 hover:text-burgundy-600"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <span className="font-sans text-xs text-rose-700 tabular-nums">
                {slides.length === 0 ? 0 : index + 1} / {slides.length}
              </span>
            </div>
          </div>
        </div>

        {galleryPhotos.length > 0 && (
          <div className="mt-6 sm:mt-8 flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {slides.map((s, i) =>
              s.kind === 'real' ? (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden ring-2 transition ${
                    i === index
                      ? 'ring-rose-500'
                      : 'ring-transparent hover:ring-rose-300'
                  }`}
                  aria-label={`Show photo ${i + 1}`}
                >
                  <img src={s.src} alt="" className="w-full h-full object-cover" />
                </button>
              ) : null,
            )}
          </div>
        )}

      </div>
    </section>
  )
}
