import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { finalSection, heroContent } from '../data/content'

function useTimeTogether(startISO: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const start = new Date(startISO).getTime()
  const diff = Math.max(now - start, 0)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function HeartBurst() {
  const hearts = Array.from({ length: 14 })
  return (
    <div className="absolute inset-0 pointer-events-none">
      {hearts.map((_, i) => {
        const angle = (i / hearts.length) * Math.PI * 2
        const distance = 80 + Math.random() * 80
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{ x, y, opacity: 0, scale: 1.4, rotate: Math.random() * 180 - 90 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2"
          >
            <Heart size={20} className="text-rose-500" fill="currentColor" />
          </motion.div>
        )
      })}
    </div>
  )
}

export default function FinalSection() {
  const t = useTimeTogether(heroContent.startDate)
  const [pressed, setPressed] = useState(false)
  const [bursts, setBursts] = useState<number[]>([])

  function handlePress() {
    setPressed(true)
    const id = Date.now()
    setBursts((b) => [...b, id])
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x !== id))
    }, 1500)
  }

  return (
    <section
      id="final"
      className="relative py-24 md:py-40 px-5 md:px-6 bg-gradient-to-b from-blush-100 via-rose-200 to-burgundy-500/10 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-3xl sm:text-4xl md:text-6xl text-burgundy-600 mb-6 leading-tight break-words"
        >
          {finalSection.question}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-script text-xl sm:text-2xl md:text-3xl text-rose-700 mb-10"
        >
          {finalSection.subline}
        </motion.p>

        <div className="relative inline-flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.92 }}
            onClick={handlePress}
            className="relative inline-flex items-center justify-center gap-3 bg-gradient-to-br from-rose-500 to-burgundy-500 hover:from-rose-600 hover:to-burgundy-600 text-white font-serif text-lg sm:text-xl md:text-2xl px-7 sm:px-10 py-4 sm:py-5 rounded-full shadow-2xl text-center max-w-full"
          >
            <Heart
              size={24}
              fill="currentColor"
              className={`shrink-0 ${pressed ? 'animate-heartbeat' : ''}`}
            />
            <span className="break-words">{finalSection.buttonText}</span>
            <AnimatePresence>
              {bursts.map((id) => (
                <HeartBurst key={id} />
              ))}
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {pressed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-6 font-script text-xl sm:text-2xl text-burgundy-600 max-w-md px-2"
              >
                {finalSection.buttonAfter}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Counter */}
        <div className="mt-12 sm:mt-16">
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-rose-700/70 mb-4">
            We have been us for
          </p>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3 max-w-xl mx-auto">
            {[
              { label: 'days', value: t.days },
              { label: 'hours', value: t.hours },
              { label: 'minutes', value: t.minutes },
              { label: 'seconds', value: t.seconds },
            ].map((u) => (
              <div
                key={u.label}
                className="rounded-xl bg-white/70 backdrop-blur ring-1 ring-rose-200 py-3 sm:py-4 px-1"
              >
                <div className="font-serif text-xl sm:text-3xl md:text-4xl text-burgundy-600 tabular-nums">
                  {u.value.toString().padStart(2, '0')}
                </div>
                <div className="font-sans text-[9px] sm:text-[11px] tracking-widest uppercase text-rose-700/70 mt-1">
                  {u.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 sm:mt-20 font-script text-lg sm:text-xl text-rose-700/70 px-2">
          made with every honest piece of me — for you
        </p>
      </div>
    </section>
  )
}
