import { motion } from 'framer-motion'
import { useState } from 'react'
import { Heart } from 'lucide-react'
import { thingsILoveAboutYou, sectionMeta } from '../data/content'

export default function ThingsILove() {
  // Tap-to-flip on touch; hover-to-flip handled by CSS for desktop
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  return (
    <section
      id="things-i-love"
      className="relative py-20 md:py-32 px-5 md:px-6 bg-gradient-to-b from-cream-50 to-rose-50"
    >
      <div className="max-w-5xl mx-auto text-center mb-10 md:mb-14">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-burgundy-600 mb-3">
          {sectionMeta.thingsILove.title}
        </h2>
        <p className="font-script text-xl sm:text-2xl text-rose-700">{sectionMeta.thingsILove.subtitle}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
        {thingsILoveAboutYou.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (i % 4) * 0.08, duration: 0.6 }}
            className={`card-flip aspect-[3/4] ${flipped[i] ? 'is-flipped' : ''}`}
            onClick={() =>
              setFlipped((f) => ({ ...f, [i]: !f[i] }))
            }
          >
            <div className="card-flip-inner h-full">
              <div className="card-face bg-gradient-to-br from-rose-200 to-rose-400 text-burgundy-700 flex flex-col items-center justify-center p-3 sm:p-5 shadow-xl ring-1 ring-rose-300/50">
                <Heart size={22} className="mb-2 sm:mb-3 text-burgundy-600 shrink-0" fill="currentColor" />
                <p className="font-serif text-base sm:text-xl md:text-2xl text-center leading-snug break-words">
                  {item.front}
                </p>
                <span className="mt-3 sm:mt-4 font-sans text-[10px] sm:text-[11px] tracking-widest uppercase text-burgundy-700/70">
                  tap to read
                </span>
              </div>
              <div className="card-face card-back bg-gradient-to-br from-cream-50 to-rose-100 text-burgundy-700 flex items-center justify-center p-3 sm:p-5 shadow-xl ring-1 ring-rose-200">
                <p className="font-script text-base sm:text-xl md:text-2xl text-center leading-snug break-words">
                  {item.back}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
