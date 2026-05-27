import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { promisesForward, sectionMeta } from '../data/content'

export default function PromisesForward() {
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  return (
    <section
      id="promises"
      className="relative py-20 md:py-32 px-5 md:px-6 bg-gradient-to-b from-rose-50 to-blush-100"
    >
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-burgundy-600 mb-3">
          {sectionMeta.promises.title}
        </h2>
        <p className="font-script text-xl sm:text-2xl text-rose-700">{sectionMeta.promises.subtitle}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {promisesForward.map((p, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
            className={`w-full text-left flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur ring-1 transition-all ${
              checked[i]
                ? 'ring-rose-400 bg-rose-100/80'
                : 'ring-rose-100 hover:ring-rose-300 hover:bg-white'
            }`}
          >
            <span
              className={`shrink-0 mt-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition ${
                checked[i]
                  ? 'bg-rose-500 text-white'
                  : 'bg-white ring-2 ring-rose-300 text-transparent'
              }`}
            >
              <Check size={16} strokeWidth={3} />
            </span>
            <span
              className={`font-serif text-base sm:text-lg md:text-xl text-burgundy-700 transition break-words ${
                checked[i] ? 'opacity-80' : ''
              }`}
            >
              {p}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
