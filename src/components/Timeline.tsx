import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { timelineContent, sectionMeta } from '../data/content'
import { timelinePhotos } from '../data/timelineManifest'

const accentMap: Record<string, { dot: string; ring: string; chip: string }> = {
  rose: {
    dot: 'bg-rose-400',
    ring: 'ring-rose-200',
    chip: 'bg-rose-100 text-rose-700',
  },
  burgundy: {
    dot: 'bg-burgundy-500',
    ring: 'ring-rose-300',
    chip: 'bg-rose-200 text-burgundy-600',
  },
  gold: {
    dot: 'bg-gold-500',
    ring: 'ring-cream-200',
    chip: 'bg-cream-200 text-gold-600',
  },
}

function MilestonePhoto({ src, year, index }: { src: string | null; year: string; index: number }) {
  // Soft gradient fallback per milestone — keeps the layout warm if the photo isn't there yet.
  const fallbackBg = [
    'linear-gradient(135deg, #fecdd3 0%, #fda4af 100%)',
    'linear-gradient(135deg, #fda4af 0%, #be123c 100%)',
    'linear-gradient(135deg, #fef3e2 0%, #fda4af 100%)',
  ][index] || 'linear-gradient(135deg, #fecdd3 0%, #fda4af 100%)'

  return (
    <div className="polaroid vignette relative aspect-[4/5] w-full overflow-hidden bg-rose-50">
      {src ? (
        <img src={src} alt={year} className="w-full h-full object-cover" />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: fallbackBg }}
        >
          <span className="font-script text-2xl text-white/85 text-elegant px-6 text-center">
            {year}
          </span>
        </div>
      )}
    </div>
  )
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative py-20 md:py-32 px-5 md:px-6 bg-gradient-to-b from-cream-50 via-rose-50 to-blush-50"
    >
      <div className="max-w-5xl mx-auto text-center mb-14 md:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-burgundy-600 mb-4"
        >
          {sectionMeta.timeline.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-script text-xl sm:text-2xl text-rose-700"
        >
          {sectionMeta.timeline.subtitle}
        </motion.p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-200 via-rose-400 to-rose-200 -translate-x-1/2" />

        <div className="space-y-16 md:space-y-40">
          {timelineContent.map((m, i) => {
            const accent = accentMap[m.accent] ?? accentMap.rose
            const isEven = i % 2 === 0
            return (
              <div key={i} className="relative">
                <div className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 z-10">
                  <span
                    className={`w-5 h-5 rounded-full ${accent.dot} ring-8 ${accent.ring} shadow-lg`}
                  />
                </div>

                <div
                  className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                    isEven ? '' : 'md:[&>*:first-child]:order-2'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className={isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}
                  >
                    <span
                      className={`inline-block ${accent.chip} font-sans text-[11px] sm:text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-4`}
                    >
                      {m.year}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-burgundy-600 mb-5 flex items-center gap-3">
                      <Heart
                        size={20}
                        className="text-rose-500 inline-block shrink-0"
                        fill="currentColor"
                      />
                      <span className="break-words">{m.title}</span>
                    </h3>
                    <p className="font-sans text-base md:text-lg leading-relaxed text-rose-900/80 whitespace-pre-line">
                      {m.body}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40, rotate: isEven ? 2 : -2 }}
                    whileInView={{ opacity: 1, x: 0, rotate: isEven ? 1.5 : -1.5 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="max-w-[280px] sm:max-w-sm w-full mx-auto"
                  >
                    <MilestonePhoto src={timelinePhotos[i]} year={m.year} index={i} />
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
