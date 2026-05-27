import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import FloatingHearts from './FloatingHearts'

interface Props {
  onStart: () => void
}

export default function Landing({ onStart }: Props) {
  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-blush-100 to-cream-100 px-5 md:px-6"
    >
      <FloatingHearts count={16} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-cream-200/40 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="relative z-20 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
          className="flex justify-center mb-6"
        >
          <Heart
            size={56}
            className="text-rose-500 animate-heartbeat"
            fill="currentColor"
          />
        </motion.div>

        <h1 className="font-serif text-elegant text-4xl sm:text-5xl md:text-7xl text-burgundy-600 mb-6 tracking-tight break-words">
          For You, My Love
        </h1>

        <p className="font-script text-lg sm:text-xl md:text-2xl text-rose-700 max-w-xl mx-auto leading-relaxed mb-10 px-2">
          A little story I wrote with my whole heart — pressed into pages, set to music.
        </p>

        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-sans text-base font-medium px-7 sm:px-8 py-3.5 rounded-full shadow-lg ring-1 ring-rose-300/60 transition"
        >
          <Heart size={18} fill="currentColor" />
          Get Started
        </motion.button>

        <p className="font-sans text-xs tracking-widest uppercase text-rose-500/70 mt-6">
          Soft music will play
        </p>
      </motion.div>
    </motion.section>
  )
}
