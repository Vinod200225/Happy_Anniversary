import { motion } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'
import FloatingHearts from './FloatingHearts'
import { heroContent } from '../data/content'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-blush-100 to-cream-100 px-5 md:px-6"
    >
      <FloatingHearts count={20} />

      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-cream-200/40 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-20 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
          className="flex justify-center mb-6"
        >
          <Heart
            size={48}
            className="text-rose-500 animate-heartbeat"
            fill="currentColor"
          />
        </motion.div>

        <h1 className="font-serif text-elegant text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-burgundy-600 mb-6 tracking-tight break-words">
          {heroContent.title}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="font-script text-xl sm:text-2xl md:text-3xl text-rose-700 max-w-2xl mx-auto leading-relaxed"
        >
          {heroContent.tagline}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.6, duration: 1 },
          y: { delay: 1.6, duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-6 md:bottom-10 z-20 flex flex-col items-center text-rose-600 px-4 text-center"
      >
        <span className="font-sans text-xs sm:text-sm tracking-widest uppercase mb-2 opacity-80">
          {heroContent.scrollHint}
        </span>
        <ChevronDown size={28} />
      </motion.div>
    </section>
  )
}
