import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { promiseLetter } from '../data/content'

export default function PromiseLetter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section
      id="letter"
      className="relative py-20 md:py-32 px-5 md:px-6 bg-gradient-to-b from-cream-50 via-rose-50 to-cream-50"
    >
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="letter-paper rounded-md px-6 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16"
        >
          <p className="font-script text-2xl sm:text-3xl md:text-4xl text-burgundy-600 mb-8 break-words">
            {promiseLetter.greeting}
          </p>

          <div className="space-y-4 font-hand text-xl sm:text-2xl md:text-3xl text-rose-900/85 leading-snug break-words">
            {promiseLetter.lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: line ? 1 : 0.0001, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.35, ease: 'easeOut' }}
                className={line ? '' : 'h-3'}
              >
                {line || ' '}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 + promiseLetter.lines.length * 0.05 + 0.2, duration: 0.5 }}
            className="mt-10"
          >
            <p className="font-hand text-xl sm:text-2xl md:text-3xl text-rose-900/80">
              {promiseLetter.signOff}
            </p>
            <p className="font-script text-3xl sm:text-4xl md:text-5xl text-burgundy-600 mt-2 break-words">
              {promiseLetter.signature}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
